// ================================================================
//  FPS NAV CONTROLS — dual joysticks, vertical buttons, canvas drag,
//  keyboard WASD/arrows, scroll wheel vertical
//
//  Activated when navState===2 (FPS toggle). All UI is inside
//  #fps-overlay and only receives events when body.fps-active.
//  Drawing still works: 1-finger on canvas = draw (when not on FPS UI).
//  In STYLUS mode, pen draws, 1-finger = FPS look drag on canvas.
// ================================================================
(function(){
  // ── Constants ──
  var FPS_MOVE_SPEED=0.012;
  var FPS_MOVE_BOOST=0.028;
  var FPS_VT_SPEED=0.015;
  var FPS_ORBIT_SENS=0.004;
  var FPS_LOOK_JOY_RATE=0.015;
  var FPS_JOY_DEADZONE=0.15;
  var FPS_KB_LOOK_RATE=0.015;

  // ── Joystick Factory (adapted from prototype) ──
  function createFpsJoystick(wrapId,onTick,opts){
    opts=opts||{};
    var wrap=document.getElementById(wrapId);
    if(!wrap)return null;
    var el=wrap.querySelector('canvas');
    if(!el)return null;
    var ctx=el.getContext('2d');
    var W=el.width,H=el.height,CX=W/2,CY=H/2;
    var PAD_R=Math.min(W,H)/2-8;
    var KNOB_R=Math.min(W,H)*0.14;
    var MAX_D=PAD_R-KNOB_R-2;
    var DEADZONE_PX=MAX_D*FPS_JOY_DEADZONE;
    var active=false,kx=0,ky=0,rafId=null;
    var touchId=null;
    var labels=opts.labels||null;

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.save();
      var isLook=!!labels;
      // Outer rim
      ctx.strokeStyle=_themeInk(.2);ctx.lineWidth=1.5;
      ctx.beginPath();ctx.arc(CX,CY,PAD_R,0,Math.PI*2);ctx.stroke();
      // Deadzone ring (dashed)
      ctx.strokeStyle=_themeInk(.1);ctx.lineWidth=1;ctx.setLineDash([3,5]);
      ctx.beginPath();ctx.arc(CX,CY,DEADZONE_PX,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
      // Crosshair lines
      ctx.strokeStyle=_themeInk(.1);ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(CX,CY-PAD_R+6);ctx.lineTo(CX,CY+PAD_R-6);ctx.stroke();
      ctx.beginPath();ctx.moveTo(CX-PAD_R+6,CY);ctx.lineTo(CX+PAD_R-6,CY);ctx.stroke();
      // Labels for look joystick or arrows for move joystick
      if(!active&&kx===0&&ky===0){
        if(isLook&&labels){
          ctx.fillStyle=_themeInk(.18);
          ctx.font='600 11px Inter, -apple-system, sans-serif';
          ctx.textAlign='center';ctx.textBaseline='middle';
          var lr=PAD_R-14;
          ctx.fillText(labels[0],CX,CY-lr);ctx.fillText(labels[2],CX,CY+lr);
          ctx.fillText(labels[1],CX-lr,CY);ctx.fillText(labels[3],CX+lr,CY);
        } else {
          var aR2=PAD_R-6,aS2=4;
          ctx.fillStyle=_themeInk(.25);
          [[CX,CY-aR2,0,-1],[CX,CY+aR2,0,1],[CX-aR2,CY,-1,0],[CX+aR2,CY,1,0]].forEach(function(a){
            ctx.beginPath();
            if(a[3]===0){ctx.moveTo(a[0],a[1]);ctx.lineTo(a[0]-a[2]*aS2*1.4+a[3]*aS2,a[1]-a[3]*aS2*1.4+a[2]*aS2);ctx.lineTo(a[0]-a[2]*aS2*1.4-a[3]*aS2,a[1]-a[3]*aS2*1.4-a[2]*aS2);}
            else{ctx.moveTo(a[0],a[1]);ctx.lineTo(a[0]+aS2,a[1]-a[3]*aS2*1.4);ctx.lineTo(a[0]-aS2,a[1]-a[3]*aS2*1.4);}
            ctx.closePath();ctx.fill();
          });
        }
      }
      // Direction line when dragging
      if(active&&(kx!==0||ky!==0)){
        ctx.strokeStyle=_themeInk(.22);ctx.lineWidth=1.5;ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(CX,CY);ctx.lineTo(CX+kx,CY+ky);ctx.stroke();
      }
      // Knob with gradient
      var kg2=ctx.createRadialGradient(CX+kx,CY+ky,0,CX+kx,CY+ky,KNOB_R);
      kg2.addColorStop(0,active?_themeInk(.35):_themeInk(.2));
      kg2.addColorStop(1,active?_themeInk(.18):_themeInk(.08));
      ctx.fillStyle=kg2;
      ctx.strokeStyle=_themeInk(active?.35:.22);ctx.lineWidth=1.5;
      ctx.beginPath();ctx.arc(CX+kx,CY+ky,KNOB_R,0,Math.PI*2);ctx.fill();ctx.stroke();
      // Center dot
      ctx.fillStyle=_themeInk(active?.45:.25);
      ctx.beginPath();ctx.arc(CX+kx,CY+ky,2,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }

    function getNorm(){
      var dist=Math.sqrt(kx*kx+ky*ky);
      if(dist<DEADZONE_PX)return{nx:0,ny:0,norm:0};
      var effDist=(dist-DEADZONE_PX)*(MAX_D/(MAX_D-DEADZONE_PX));
      var s=effDist/dist;
      return{nx:(kx*s)/MAX_D,ny:(ky*s)/MAX_D,norm:effDist/MAX_D};
    }

    function clamp(dx,dy){
      var d=Math.sqrt(dx*dx+dy*dy);
      if(d>MAX_D)return{x:dx/d*MAX_D,y:dy/d*MAX_D};
      return{x:dx,y:dy};
    }

    function getPos(e){
      var r=el.getBoundingClientRect();
      var src=null;
      if(e.touches){
        if(touchId!==null){
          for(var i=0;i<e.touches.length;i++){
            if(e.touches[i].identifier===touchId){src=e.touches[i];break;}
          }
        }
        if(!src&&e.touches.length>0)src=e.touches[0];
        if(!src&&e.changedTouches&&e.changedTouches.length>0)src=e.changedTouches[0];
      }
      if(!src)src=e;
      var rw=r.width||1,rh=r.height||1;
      return{x:(src.clientX-r.left)*(W/rw),y:(src.clientY-r.top)*(H/rh)};
    }

    function startLoop(){
      if(rafId)return;
      function loop(){
        if(!active){rafId=null;return;}
        var n=getNorm();
        if(n.norm>0)onTick(n.nx,n.ny,n.norm);
        rafId=requestAnimationFrame(loop);
      }
      rafId=requestAnimationFrame(loop);
    }

    function onStart(e){
      e.preventDefault();e.stopPropagation();
      if(active)return;
      if(e.touches){
        var t=e.changedTouches?e.changedTouches[0]:e.touches[0];
        touchId=t.identifier;
      }
      active=true;
      var p=getPos(e),c=clamp(p.x-CX,p.y-CY);
      kx=c.x;ky=c.y;
      var n=getNorm();
      if(n.norm>0)onTick(n.nx,n.ny,n.norm);
      draw();
      setTimeout(function(){if(active)startLoop();},100);
    }
    function onMoveTouch(e){
      e.preventDefault();e.stopPropagation();
      if(!active)return;
      if(touchId!==null&&e.touches){
        var found=false;
        for(var i=0;i<e.touches.length;i++){
          if(e.touches[i].identifier===touchId){found=true;break;}
        }
        if(!found)return;
      }
      var p=getPos(e),c=clamp(p.x-CX,p.y-CY);
      kx=c.x;ky=c.y;draw();
    }
    function onEnd(e){
      if(!active)return;
      if(touchId!==null&&e.touches){
        for(var i=0;i<e.touches.length;i++){
          if(e.touches[i].identifier===touchId)return;
        }
      }
      e.stopPropagation();
      active=false;kx=0;ky=0;touchId=null;
      if(rafId){cancelAnimationFrame(rafId);rafId=null;}
      draw();
    }

    var mouseActive=false;
    function onMouseDown(e){
      e.preventDefault();e.stopPropagation();
      mouseActive=true;active=true;
      var p=getPos(e),c=clamp(p.x-CX,p.y-CY);
      kx=c.x;ky=c.y;
      var n=getNorm();
      if(n.norm>0)onTick(n.nx,n.ny,n.norm);
      draw();
      setTimeout(function(){if(active)startLoop();},100);
    }
    function onMouseMove(e){if(!mouseActive)return;var p=getPos(e),c=clamp(p.x-CX,p.y-CY);kx=c.x;ky=c.y;draw();}
    function onMouseUp(){if(!mouseActive)return;mouseActive=false;active=false;kx=0;ky=0;if(rafId){cancelAnimationFrame(rafId);rafId=null;}draw();}

    el.addEventListener('touchstart',onStart,{passive:false});
    el.addEventListener('touchmove',onMoveTouch,{passive:false});
    el.addEventListener('touchend',onEnd);
    el.addEventListener('touchcancel',onEnd);
    el.addEventListener('mousedown',onMouseDown);
    el.addEventListener('mousemove',onMouseMove);
    el.addEventListener('mouseup',onMouseUp);
    el.addEventListener('mouseleave',onMouseUp);

    draw();
    return{redraw:draw};
  }

  // ── Movement Joystick (left) — FPS ground movement, inside nav card ──
  function fpsMoveTick(nx,ny,norm){
    if(!_fpsMode)return;
    var sinT=Math.sin(cam.theta),cosT=Math.cos(cam.theta);
    var sinP=Math.sin(cam.phi);
    // Ground-projected forward (XY plane, Z-up)
    var fx=sinP*cosT,fy=sinP*sinT;
    var gfLen=Math.sqrt(fx*fx+fy*fy);
    var gfx,gfy;
    if(gfLen<0.001){gfx=cosT;gfy=sinT;}
    else{gfx=fx/gfLen;gfy=fy/gfLen;}
    // Ground right: perpendicular on XY plane
    var grx=gfy,gry=-gfx;
    // Acceleration curve
    var curved=norm*norm;
    var speed=FPS_MOVE_SPEED+curved*FPS_MOVE_BOOST;
    // stick up (ny<0) → forward, stick right (nx>0) → strafe right
    cam.target.x+=(-ny*gfx+nx*grx)*speed;
    cam.target.y+=(-ny*gfy+nx*gry)*speed;
    updCam();
  }
  createFpsJoystick('fps-move-card',fpsMoveTick,{labels:null});
  createFpsJoystick('pb-fps-move-card',fpsMoveTick,{labels:null});

  // ── Look Joystick (right) — FPS look rotation ──
  var _fpsLookTick=function(nx,ny,norm){
    if(!_fpsMode)return;
    cam.theta-=nx*FPS_LOOK_JOY_RATE;
    cam.phi=Math.max(0.05,Math.min(Math.PI-0.05,cam.phi+ny*FPS_LOOK_JOY_RATE));
    updCam();
  };
  createFpsJoystick('fps-joy-look',_fpsLookTick,{labels:['U','L','D','R']});
  createFpsJoystick('pb-fps-joy-look',_fpsLookTick,{labels:['U','L','D','R']});

  // ── Vertical buttons — hold to move up/down ──
  function wireFpsVtBtn(id,dir){
    var btn=document.getElementById(id);
    if(!btn)return;
    var rafId2=null,holdTimer=null,held=false;
    function step(){
      if(!_fpsMode)return;
      cam.target.z+=dir*FPS_VT_SPEED;
      updCam();
      rafId2=requestAnimationFrame(step);
    }
    function onDown(e){
      e.preventDefault();e.stopPropagation();
      if(!_fpsMode)return;
      held=true;btn.classList.add('held');
      cam.target.z+=dir*FPS_VT_SPEED;
      updCam();
      holdTimer=setTimeout(function(){
        if(held)rafId2=requestAnimationFrame(step);
      },150);
    }
    function onUp(e){
      if(e)e.stopPropagation();
      held=false;btn.classList.remove('held');
      clearTimeout(holdTimer);holdTimer=null;
      if(rafId2){cancelAnimationFrame(rafId2);rafId2=null;}
    }
    btn.addEventListener('mousedown',onDown);
    btn.addEventListener('mouseup',onUp);
    btn.addEventListener('mouseleave',onUp);
    btn.addEventListener('touchstart',onDown,{passive:false});
    btn.addEventListener('touchend',onUp);
    btn.addEventListener('touchcancel',onUp);
  }
  wireFpsVtBtn('fps-vt-up',1);
  wireFpsVtBtn('fps-vt-down',-1);
  wireFpsVtBtn('pb-fps-vt-up',1);
  wireFpsVtBtn('pb-fps-vt-down',-1);
  wireFpsVtBtn('fps-look-vt-up',1);
  wireFpsVtBtn('fps-look-vt-down',-1);
  wireFpsVtBtn('pb-fps-look-vt-up',1);
  wireFpsVtBtn('pb-fps-look-vt-down',-1);

  // ── Canvas look-drag ──
  // FPS look on desktop: right-click orbit (doOrbit has FPS branch), keyboard arrows,
  // or right joystick. Left-click stays free for drawing.
  // On mobile: STYLUS mode 1-finger = orbit (which becomes FPS look via doOrbit FPS branch).
  // Non-STYLUS mode: 1-finger = draw, look via right joystick only.

  function _fpsIsOnUI(x,y){
    var els=[document.getElementById('fps-joy-look'),document.getElementById('fps-plane-ctrl'),document.getElementById('pb-panel-look')];
    for(var i=0;i<els.length;i++){
      if(!els[i])continue;
      var r=els[i].getBoundingClientRect();
      var pad=10;
      if(x>=r.left-pad&&x<=r.right+pad&&y>=r.top-pad&&y<=r.bottom+pad)return true;
    }
    return false;
  }

  // Scroll wheel = vertical movement in FPS (handled in main wheel handler via _fpsMode check)

  // ── Keyboard — WASD move, Arrow look, Q/E vertical ──
  var _fpsKeys={};
  window.addEventListener('keydown',function(e){
    if(!_fpsMode)return;
    if(document.activeElement.tagName==='INPUT'||document.activeElement.tagName==='TEXTAREA')return;
    _fpsKeys[e.key.toLowerCase()]=true;
    if(e.code)_fpsKeys[e.code]=true;
  });
  window.addEventListener('keyup',function(e){
    _fpsKeys[e.key.toLowerCase()]=false;
    if(e.code)_fpsKeys[e.code]=false;
  });

  // FPS keyboard tick — runs every frame
  function fpsTick(){
    requestAnimationFrame(fpsTick);
    if(!_fpsMode)return;
    var moved=false;
    // Movement (WASD)
    var fwd=0,strafe=0;
    if(_fpsKeys['w'])fwd+=1;
    if(_fpsKeys['s'])fwd-=1;
    if(_fpsKeys['d'])strafe+=1;
    if(_fpsKeys['a'])strafe-=1;

    if(fwd!==0||strafe!==0){
      var sinT=Math.sin(cam.theta),cosT=Math.cos(cam.theta);
      var sinP=Math.sin(cam.phi);
      var fx=sinP*cosT,fy=sinP*sinT;
      var gfLen=Math.sqrt(fx*fx+fy*fy);
      var gfx,gfy;
      if(gfLen<0.001){gfx=cosT;gfy=sinT;}
      else{gfx=fx/gfLen;gfy=fy/gfLen;}
      var grx=gfy,gry=-gfx;
      var len=Math.sqrt(fwd*fwd+strafe*strafe);
      var nfwd=fwd/len,nstrafe=strafe/len;
      cam.target.x+=(nfwd*gfx+nstrafe*grx)*FPS_MOVE_SPEED;
      cam.target.y+=(nfwd*gfy+nstrafe*gry)*FPS_MOVE_SPEED;
      moved=true;
    }
    // Vertical (Q up, E down)
    if(_fpsKeys['q']){cam.target.z+=FPS_MOVE_SPEED*0.5;moved=true;}
    if(_fpsKeys['e']){cam.target.z-=FPS_MOVE_SPEED*0.5;moved=true;}
    // Look (arrows)
    if(_fpsKeys['arrowleft']){cam.theta+=FPS_KB_LOOK_RATE;moved=true;}
    if(_fpsKeys['arrowright']){cam.theta-=FPS_KB_LOOK_RATE;moved=true;}
    if(_fpsKeys['arrowup']){cam.phi=Math.max(0.05,cam.phi-FPS_KB_LOOK_RATE);moved=true;}
    if(_fpsKeys['arrowdown']){cam.phi=Math.min(Math.PI-0.05,cam.phi+FPS_KB_LOOK_RATE);moved=true;}

    if(moved)updCam();
  }
  fpsTick();

  window._fpsMoveTick = fpsMoveTick;
  window._fpsLookTick = _fpsLookTick;
})();
