// ── Pages ─────────────────────────────────────────────────────────
const pages=[];let curPage=0;
function snapThumb(){renderer.render(scene,activeCam());return renderer.domElement.toDataURL('image/jpeg',.35);}
function saveCurPage(){
  var existingViews=pages[curPage]&&pages[curPage].views||[];
  pages[curPage]={strokes:strokes.map(s=>({pts:s.pts.map(p=>({x:p.x,y:p.y,z:p.z})),color:s.color,sz:s.sz,op:s.op,flat:s.flat,matType:s.matType||'default',layer:s.layer!=null?s.layer:1,mx:s.mesh.matrix.elements.slice()})),thumb:snapThumb(),views:existingViews,primitives:window._savePrimitivesForPage?window._savePrimitivesForPage():[]};
  refreshPageStrip();
}
function loadPage(idx){saveCurPage();clearAll();if(window._clearAllPrimitives)window._clearAllPrimitives();curPage=idx;const pg=pages[idx];if(pg)loadData({strokes:pg.strokes||[],primitives:pg.primitives||[]});refreshPageStrip();refreshViewStrip();}
function addPage(){saveCurPage();clearAll();if(window._clearAllPrimitives)window._clearAllPrimitives();pages.push({strokes:[],thumb:null,primitives:[]});curPage=pages.length-1;refreshPageStrip();toast('Page '+(curPage+1));}
function deletePage(idx){
  if(pages.length<=1){toast('Need at least 1 page');return;}
  if(idx!==curPage)saveCurPage();
  pages.splice(idx,1);
  if(curPage>=pages.length)curPage=pages.length-1;
  else if(idx<curPage)curPage--;
  clearAll();
  if(window._clearAllPrimitives)window._clearAllPrimitives();
  const pg=pages[curPage];if(pg)loadData({strokes:pg.strokes||[],primitives:pg.primitives||[]});
  refreshPageStrip();
  refreshViewStrip();
  toast('Page deleted');
}
// Pages edit mode — off by default, long-press thumbnail to toggle
var _pgEditMode=false;
var _pgEditIdx=-1; // which thumb is selected for reorder (-1=none)
function setPgEditMode(on){
  _pgEditMode=on;
  _pgEditIdx=-1;
  refreshPageStrip();
  if(on)toast('Tap to reorder · tap away to exit');
}
function movePage(from,to){
  if(to<0||to>=pages.length)return;
  saveCurPage();
  var pg=pages.splice(from,1)[0];
  pages.splice(to,0,pg);
  if(curPage===from)curPage=to;
  else if(from<curPage&&to>=curPage)curPage--;
  else if(from>curPage&&to<=curPage)curPage++;
  _pgEditIdx=to;
  refreshPageStrip();
  refreshViewStrip();
}

function refreshPageStrip(){
  var strip=document.getElementById('pages');
  strip.querySelectorAll('.pg-thumb').forEach(function(x){x.remove();});
  var addBtn=document.getElementById('pg-add');
  pages.forEach(function(pg,i){
    var d=document.createElement('div');
    d.className='pg-thumb'+(i===curPage?' on':'');
    if(_pgEditMode&&_pgEditIdx===i)d.className+=' editing';
    if(pg.thumb){var img=new Image();img.src=pg.thumb;d.appendChild(img);}
    var num=document.createElement('span');num.className='pg-num';num.textContent=i+1;d.appendChild(num);
    if(_pgEditMode&&pages.length>1){
      // In edit mode: show delete badge always; if this thumb is selected, show reorder arrows
      var del=document.createElement('button');
      del.textContent='×';
      del.style.cssText='position:absolute;top:2px;right:2px;width:18px;height:18px;border-radius:4px;border:none;background:rgba(176,48,32,.85);color:#fff;font-size:10px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;z-index:10';
      (function(idx){del.addEventListener('click',function(e){e.stopPropagation();deletePage(idx);});})(i);
      d.appendChild(del);
      if(_pgEditIdx===i){
        if(i>0){
          var al=document.createElement('button');al.className='reorder-arrow arr-l';al.textContent='◀';
          (function(idx){al.addEventListener('click',function(e){e.stopPropagation();movePage(idx,idx-1);});})(i);
          d.appendChild(al);
        }
        if(i<pages.length-1){
          var ar=document.createElement('button');ar.className='reorder-arrow arr-r';ar.textContent='▶';
          (function(idx){ar.addEventListener('click',function(e){e.stopPropagation();movePage(idx,idx+1);});})(i);
          d.appendChild(ar);
        }
      }
      // Tap on thumb in edit mode selects it for reorder
      (function(idx){d.addEventListener('click',function(e){
        e.stopPropagation();
        _pgEditIdx=(_pgEditIdx===idx)?-1:idx;
        refreshPageStrip();
      });})(i);
    } else {
      d.addEventListener('click',function(){loadPage(i);});
    }
    strip.insertBefore(d,addBtn);
  });
}
pages.push({strokes:[],thumb:null,primitives:[]});refreshPageStrip();

// Long-press any thumbnail to toggle delete mode; tap empty area to exit
(function(){
  var strip=document.getElementById('pages');
  var _lpt=null;
  function startLong(){
    _lpt=setTimeout(function(){_lpt=null;setPgEditMode(!_pgEditMode);},500);
  }
  function cancelLong(){if(_lpt){clearTimeout(_lpt);_lpt=null;}}
  strip.addEventListener('touchstart',function(e){
    var el=e.touches[0],target=document.elementFromPoint(el.clientX,el.clientY);
    while(target&&target!==strip){if(target.classList.contains('pg-thumb')){startLong();return;}target=target.parentElement;}
    // Tapped empty area of strip — exit edit mode
    if(_pgEditMode){setPgEditMode(false);}
  },{passive:true});
  strip.addEventListener('touchend',cancelLong);
  strip.addEventListener('touchcancel',cancelLong);
  strip.addEventListener('touchmove',cancelLong,{passive:true});
  strip.addEventListener('mousedown',function(e){
    var el=e.target;
    while(el&&el!==strip){if(el.classList.contains('pg-thumb')){startLong();return;}el=el.parentElement;}
    // Clicked empty area — exit edit mode
    if(_pgEditMode){setPgEditMode(false);}
  });
  strip.addEventListener('mouseup',cancelLong);
  strip.addEventListener('mouseleave',cancelLong);
}());
function togglePages(){
  var pb=document.getElementById('narrow-bar');
  if(pb&&pb.classList.contains('active')){
    var h=pb.getBoundingClientRect().height;
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    document.documentElement.style.setProperty('--pb-h',(h/s)+'px');
  }
  var open=document.getElementById('pages').classList.toggle('open');
  document.body.classList.toggle('pages-open',open);
  document.getElementById('pgbtn').classList.toggle('on',open);
  var pbBtn=document.getElementById('pb-pgbtn');if(pbBtn)pbBtn.classList.toggle('on',open);
  if(open)refreshPageStrip();
  var vs=document.getElementById('views');
  if(vs.classList.contains('open')){
    if(open){vs.classList.add('pages-also-open');}
    else{vs.classList.remove('pages-also-open');}
  }
  setTimeout(positionLclFloat,50);
}
document.getElementById('pgbtn').addEventListener('click',togglePages);
document.getElementById('pb-pgbtn').addEventListener('click',togglePages);
document.getElementById('pg-add').addEventListener('click',addPage);

// ── Saved Views ───────────────────────────────────────────────────
// Each page has a views[] array: [{cam, surf, thumb}, ...]
// Views are per-page, saved in JSON inside pages[]

function snapViewThumb(){renderer.render(scene,activeCam());return renderer.domElement.toDataURL('image/jpeg',.35);}

function saveView(){
  if(!pages[curPage])return;
  if(!pages[curPage].views)pages[curPage].views=[];
  var v={
    cam:{theta:cam.theta,phi:cam.phi,radius:cam.radius,tx:cam.target.x,ty:cam.target.y,tz:cam.target.z,ortho:useOrtho,orthoZoom:orthoZoom},
    surf:{type:surfType,plane:curPlane,px:surfPos.x,py:surfPos.y,pz:surfPos.z,rx:surfEuler.x,ry:surfEuler.y,rz:surfEuler.z,sc:surfScale,sax:surfScaleAxes.x,say:surfScaleAxes.y,saz:surfScaleAxes.z},
    thumb:snapViewThumb()
  };
  pages[curPage].views.push(v);
  refreshViewStrip();
  toast('View saved');
}

function deleteView(idx){
  if(!pages[curPage]||!pages[curPage].views)return;
  pages[curPage].views.splice(idx,1);
  refreshViewStrip();
}

// Smooth lerp to saved view — duration scales with distance (1s–3s)
var _vwLerp=null;
function recallView(v){
  // Restore plane instantly
  if(v.surf){
    surfType=v.surf.type||surfType;curPlane=v.surf.plane||curPlane;
    surfPos.set(v.surf.px||0,v.surf.py||0,v.surf.pz||0);
    surfEuler.set(v.surf.rx||0,v.surf.ry||0,v.surf.rz||0);
    surfScale=v.surf.sc||1;surfScaleAxes.set(v.surf.sax||1,v.surf.say||1,v.surf.saz||1);
    buildSurf();syncSurf();
    document.querySelectorAll('[data-surf]').forEach(function(b){b.classList.toggle('on',b.dataset.surf===surfType);});
    document.querySelectorAll('[data-plane]').forEach(function(b){b.classList.toggle('on',b.dataset.plane===curPlane);});
  }
  // Smooth lerp camera
  var c=v.cam;
  var startTheta=cam.theta,startPhi=cam.phi,startRadius=cam.radius;
  var startTx=cam.target.x,startTy=cam.target.y,startTz=cam.target.z;
  var endTheta=c.theta,endPhi=c.phi,endRadius=c.radius;
  var endTx=c.tx||0,endTy=c.ty||0,endTz=c.tz||0;
  // Scale duration by how far the camera needs to travel (1s–3s)
  var dTheta=Math.abs(endTheta-startTheta),dPhi=Math.abs(endPhi-startPhi);
  var dTarget=Math.sqrt(Math.pow(endTx-startTx,2)+Math.pow(endTy-startTy,2)+Math.pow(endTz-startTz,2));
  var dRadius=Math.abs(endRadius-startRadius);
  var angularDist=Math.sqrt(dTheta*dTheta+dPhi*dPhi); // radians
  var totalDist=angularDist/Math.PI+dTarget/5+dRadius/10; // normalised 0..1+
  var dur=Math.min(3000,Math.max(1000,totalDist*2500));

  // ── Smooth ortho/persp transition ──
  // Instead of snapping useOrtho at the end, lerp orthoZoom to/from a value
  // that matches the perspective frustum, so the visual transition is gradual.
  var targetOrtho=c.ortho||false;
  var targetOrthoZoom=c.orthoZoom||8;
  var startOrthoZoom=orthoZoom;
  var needsOrthoTransition=targetOrtho!==useOrtho;
  var CAM_FOV_HALF_TAN=Math.tan(27.5*Math.PI/180); // half of 55° FOV

  if(needsOrthoTransition){
    if(targetOrtho){
      // Persp → Ortho: switch to ortho immediately with zoom matching perspective
      useOrtho=true;
      startOrthoZoom=startRadius*CAM_FOV_HALF_TAN;
      orthoZoom=startOrthoZoom;
      syncOrtho();
    } else {
      // Ortho → Persp: keep ortho during animation, lerp zoom toward perspective-matching
      // value, then flip at the very end
      startOrthoZoom=orthoZoom;
      targetOrthoZoom=endRadius*CAM_FOV_HALF_TAN;
    }
  } else if(useOrtho){
    // Both ortho — just lerp zoom directly
    startOrthoZoom=orthoZoom;
  }

  if(_vwLerp)cancelAnimationFrame(_vwLerp);
  if(typeof _orthoLerp!=='undefined'&&_orthoLerp){cancelAnimationFrame(_orthoLerp);_orthoLerp=null;}
  var startT=performance.now();
  function step(){
    var t=Math.min(1,(performance.now()-startT)/dur);
    var e=t<1?t*(2-t):1; // ease out quad
    cam.theta=startTheta+(endTheta-startTheta)*e;
    cam.phi=startPhi+(endPhi-startPhi)*e;
    cam.radius=startRadius+(endRadius-startRadius)*e;
    cam.target.x=startTx+(endTx-startTx)*e;
    cam.target.y=startTy+(endTy-startTy)*e;
    cam.target.z=startTz+(endTz-startTz)*e;
    // Lerp orthoZoom during transition
    if(needsOrthoTransition&&!targetOrtho&&useOrtho&&e>=0.85){
      // Ortho→Persp: flip to persp slightly before end so remaining motion masks the switch
      useOrtho=false;
    }
    if(useOrtho){
      orthoZoom=startOrthoZoom+(targetOrthoZoom-startOrthoZoom)*e;
      syncOrtho();
    }
    updCam();markDirty();
    if(t<1){_vwLerp=requestAnimationFrame(step);}
    else{
      _vwLerp=null;
      // Finalize ortho state
      if(needsOrthoTransition&&!targetOrtho){
        // Ortho→Persp: now flip to persp
        useOrtho=false;
      }
      orthoZoom=targetOrtho?(c.orthoZoom||8):orthoZoom;
      syncOrtho();updCam();
      var txt=useOrtho?'ORTHO':'PERSP';
      ['bpersp','nav-persp','pb-nav-persp'].forEach(function(id){
        var b=document.getElementById(id);
        if(b){b.textContent=txt;b.classList.toggle('on',useOrtho);}
      });
      markDirty();
    }
  }
  step();
}

// Views edit mode — off by default, long-press thumbnail to toggle
var _vwEditMode=false;
var _vwEditIdx=-1; // which view thumb is selected for reorder
function setVwEditMode(on){
  _vwEditMode=on;
  _vwEditIdx=-1;
  refreshViewStrip();
  if(on)toast('Tap to reorder · tap away to exit');
}
function moveView(from,to){
  var views=pages[curPage]&&pages[curPage].views;
  if(!views||to<0||to>=views.length)return;
  var v=views.splice(from,1)[0];
  views.splice(to,0,v);
  _vwEditIdx=to;
  refreshViewStrip();
}

function refreshViewStrip(){
  var strip=document.getElementById('views');
  strip.querySelectorAll('.vw-thumb').forEach(function(x){x.remove();});
  var addBtn=document.getElementById('vw-add');
  var views=pages[curPage]&&pages[curPage].views||[];
  views.forEach(function(v,i){
    var d=document.createElement('div');
    d.className='vw-thumb';
    if(_vwEditMode&&_vwEditIdx===i)d.className+=' editing';
    if(v.thumb){var img=new Image();img.src=v.thumb;d.appendChild(img);}
    var num=document.createElement('span');num.className='vw-num';num.textContent=i+1;d.appendChild(num);
    if(_vwEditMode){
      var del=document.createElement('button');
      del.textContent='×';
      del.style.cssText='position:absolute;top:2px;right:2px;width:18px;height:18px;border-radius:4px;border:none;background:rgba(176,48,32,.85);color:#fff;font-size:10px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;z-index:10';
      (function(idx){del.addEventListener('click',function(e){e.stopPropagation();deleteView(idx);});})(i);
      d.appendChild(del);
      if(_vwEditIdx===i){
        if(i>0){
          var al=document.createElement('button');al.className='reorder-arrow arr-l';al.textContent='◀';
          (function(idx){al.addEventListener('click',function(e){e.stopPropagation();moveView(idx,idx-1);});})(i);
          d.appendChild(al);
        }
        if(i<views.length-1){
          var ar=document.createElement('button');ar.className='reorder-arrow arr-r';ar.textContent='▶';
          (function(idx){ar.addEventListener('click',function(e){e.stopPropagation();moveView(idx,idx+1);});})(i);
          d.appendChild(ar);
        }
      }
      (function(idx){d.addEventListener('click',function(e){
        e.stopPropagation();
        _vwEditIdx=(_vwEditIdx===idx)?-1:idx;
        refreshViewStrip();
      });})(i);
    } else {
      d.addEventListener('click',function(){recallView(v);});
    }
    strip.insertBefore(d,addBtn);
  });
}

// Long-press any thumbnail to toggle delete mode; tap empty area to exit
(function(){
  var strip=document.getElementById('views');
  var _lpt=null;
  function startLong(){
    _lpt=setTimeout(function(){_lpt=null;setVwEditMode(!_vwEditMode);},500);
  }
  function cancelLong(){if(_lpt){clearTimeout(_lpt);_lpt=null;}}
  strip.addEventListener('touchstart',function(e){
    var el=e.touches[0],target=document.elementFromPoint(el.clientX,el.clientY);
    while(target&&target!==strip){if(target.classList.contains('vw-thumb')){startLong();return;}target=target.parentElement;}
    if(_vwEditMode){setVwEditMode(false);}
  },{passive:true});
  strip.addEventListener('touchend',cancelLong);
  strip.addEventListener('touchcancel',cancelLong);
  strip.addEventListener('touchmove',cancelLong,{passive:true});
  strip.addEventListener('mousedown',function(e){
    var el=e.target;
    while(el&&el!==strip){if(el.classList.contains('vw-thumb')){startLong();return;}el=el.parentElement;}
    if(_vwEditMode){setVwEditMode(false);}
  });
  strip.addEventListener('mouseup',cancelLong);
  strip.addEventListener('mouseleave',cancelLong);
}());

function toggleViews(){
  var viewsStrip=document.getElementById('views');
  var pagesStrip=document.getElementById('pages');
  var isHidden=document.body.classList.contains('ui-hidden');
  var open;
  if(isHidden){
    // In screen-recording mode: use recording-open class, always bottom:0
    open=viewsStrip.classList.toggle('recording-open');
    viewsStrip.classList.toggle('open',open);
  } else {
    open=viewsStrip.classList.toggle('open');
    viewsStrip.classList.remove('recording-open');
  }
  document.body.classList.toggle('views-open',open);
  document.getElementById('vwbtn').classList.toggle('on',open);
  var pbBtn=document.getElementById('pb-vwbtn');if(pbBtn)pbBtn.classList.toggle('on',open);
  var hvBtn=document.getElementById('bviews-hidden');if(hvBtn)hvBtn.classList.toggle('on',open);
  if(open){
    refreshViewStrip();
    if(!isHidden&&pagesStrip.classList.contains('open')){viewsStrip.classList.add('pages-also-open');}
    else{viewsStrip.classList.remove('pages-also-open');}
  }
  setTimeout(positionLclFloat,50);
}
document.getElementById('vwbtn').addEventListener('click',toggleViews);
document.getElementById('pb-vwbtn').addEventListener('click',toggleViews);
document.getElementById('bviews-hidden').addEventListener('click',toggleViews);
document.getElementById('vw-add').addEventListener('click',saveView);

// Narrow bar hide tab
document.getElementById('pb-tab').addEventListener('click',function(){
  var pb=document.getElementById('narrow-bar');
  var collapsed=pb.classList.toggle('pb-collapsed');
  // After toggle, re-measure and update --pb-h so pages strip / pgbtn stay above bar
  setTimeout(function(){
    var h=pb.getBoundingClientRect().height;
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    document.documentElement.style.setProperty('--pb-h',(h/s)+'px');
  },50);
  toast(collapsed?'Panel hidden':'Panel shown',900);
});
