// ================================================================
//  FLOAT CARD — narrow nav+gizmo panel system
// ================================================================

window._cardDetached=false;
window._cardHidden=false;

var _syncRafId=null;
function _syncRenderer(){
  // Debounce via RAF: if called multiple times in a frame (e.g. resize + visualViewport
  // both firing), only execute once after the browser has committed the new layout.
  // This also ensures visualViewport.width/height are the final settled values, not
  // mid-transition values from Android freeform→fullscreen expansion.
  if(_syncRafId)cancelAnimationFrame(_syncRafId);
  _syncRafId=requestAnimationFrame(function(){
    _syncRafId=null;
    var _vvp=window.visualViewport;
    var vw=_vvp?_vvp.width:window.innerWidth;
    var vh=_vvp?_vvp.height:window.innerHeight;
    renderer.setSize(vw,vh);
    camera.aspect=vw/vh;
    camera.updateProjectionMatrix();
    syncOrtho();
    _refreshRect();
    // Render synchronously at the new size so the canvas doesn't show a black
    // gap during window-resize reflows. markDirty alone waits for the next
    // rAF (up to ~32ms lag after RAF-debounce + animate tick) — enough for a
    // visible flash when the URL bar animates on Android Chrome.
    renderer.render(scene,activeCam());
    _renderDirty=false;
  });
}

function updateLayoutMode(){
  // Use visualViewport when available — gives correct dimensions in PWA standalone
  // before window.innerWidth/Height have settled after launch
  var _vvp=window.visualViewport;
  var _vw=_vvp?_vvp.width:window.innerWidth;
  var _vh=_vvp?_vvp.height:window.innerHeight;
  var isNarrow=(window.FORCE_MOBILE||new URLSearchParams(window.location.search).get('mobile')==='1')||(_vw <= 768)||(_vw/_vh < 0.95);
  var isUiHidden=document.body.classList.contains('ui-hidden');
  var pb=document.getElementById('narrow-bar');
  var sc=document.getElementById('sidecol');
  var sb=document.getElementById('sbar');
  var card=document.getElementById('pb-float-card');
  var fab=document.getElementById('pb-fab');
  var stab=document.getElementById('stab');
  if(isNarrow){
    if(pb)pb.classList.add('active');
    document.body.classList.add('narrow-mode');
    if(sc)sc.style.display='none';
    if(sb)sb.style.display='none';
    if(stab)stab.style.display='none';
    // Hide any detached sc-group (they're parented on body, not sidecol, so
    // sidecol.display='none' doesn't cascade to them)
    document.querySelectorAll('.sc-group.detached').forEach(function(g){g.style.display='none';});
    _fcReparent();
    if(!window._fcEverActivated){
      window._fcEverActivated=true;
      // Only dock on first activation if UI is visible
      if(!isUiHidden){
        if(card)card.classList.add('fc-docked-bottom');
        var dockBtn2=document.getElementById('fc-dock-btn');
        if(dockBtn2)dockBtn2.textContent='Dock';
      }
    }
    if(!window._cardHidden){
      if(card)card.classList.add('fc-visible');
      if(fab)fab.classList.remove('fab-visible');
    } else {
      if(fab)fab.classList.add('fab-visible');
    }
    setTimeout(function(){
      _syncRenderer();
      _fcResizeCanvases();
      var h=pb.getBoundingClientRect().height;
      var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
      document.documentElement.style.setProperty('--pb-h',(h/s)+'px');
      // Re-sync surface group so plane isn't stale after canvas resize
      if(typeof syncSurf==='function')syncSurf();
      if(window._gDraw)window._gDraw();
      if(window._pbGcDraw)window._pbGcDraw();
      positionLclFloat();
    },50);
  } else {
    if(pb)pb.classList.remove('active');
    document.body.classList.remove('narrow-mode');
    // Tablet mode: show float card only when UI is hidden
    if(isUiHidden){
      _fcReparent();
      if(!window._fcEverActivated){window._fcEverActivated=true;}
      if(!window._cardHidden){
        if(card)card.classList.add('fc-visible');
        if(fab)fab.classList.remove('fab-visible');
      } else {
        if(fab)fab.classList.add('fab-visible');
      }
      setTimeout(function(){
        _syncRenderer();_fcResizeCanvases();
        if(typeof syncSurf==='function')syncSurf();
        if(window._gDraw)window._gDraw();
        if(window._pbGcDraw)window._pbGcDraw();
        positionLclFloat();
      },50);
    } else {
      if(sc)sc.style.display='';
      if(sb)sb.style.display='';
      if(stab)stab.style.display='';
      // Restore any detached sc-group visibility
      document.querySelectorAll('.sc-group.detached').forEach(function(g){g.style.display='';});
      document.documentElement.style.setProperty('--pb-h','0px');
      applyMergedNavLayout();
      // Sync renderer + surface after sidecol becomes visible — layout change doesn't fire resize in PWA
      setTimeout(function(){
        _syncRenderer();
        if(typeof syncSurf==='function')syncSurf();
        if(window._gDraw)window._gDraw();
        if(window._pbGcDraw)window._pbGcDraw();
        if(window._ncDraw)window._ncDraw();
        if(window._pbNcDraw)window._pbNcDraw();
        positionLclFloat();
      },50);
    }
  }
}

function _fcReparent(){
  var fcPanels=document.getElementById('fc-panels');
  var navPanel=document.getElementById('pb-panel-nav');
  var gizPanel=document.getElementById('pb-panel-gizmo');
  var lookPanel=document.getElementById('pb-panel-look');
  var nbSeg=document.getElementById('nb-seg');
  if(nbSeg&&nbSeg.parentElement)nbSeg.parentElement.style.display='none';
  if(!fcPanels||!navPanel||!gizPanel)return;
  if(navPanel.parentNode!==fcPanels)fcPanels.appendChild(navPanel);
  if(gizPanel.parentNode!==fcPanels)fcPanels.appendChild(gizPanel);
  if(lookPanel&&lookPanel.parentNode!==fcPanels)fcPanels.appendChild(lookPanel);
  window._cardDetached=true;
}

function _fcReturn(){
  var pbPanels=document.getElementById('pb-panels');
  var navPanel=document.getElementById('pb-panel-nav');
  var gizPanel=document.getElementById('pb-panel-gizmo');
  var lookPanel=document.getElementById('pb-panel-look');
  var nbSeg=document.getElementById('nb-seg');
  if(nbSeg&&nbSeg.parentElement)nbSeg.parentElement.style.display='flex';
  if(!pbPanels||!navPanel||!gizPanel)return;
  if(navPanel.parentNode!==pbPanels)pbPanels.appendChild(navPanel);
  if(gizPanel.parentNode!==pbPanels)pbPanels.appendChild(gizPanel);
  if(lookPanel&&lookPanel.parentNode!==pbPanels)pbPanels.appendChild(lookPanel);
  window._cardDetached=false;
}

function _fcResizeCanvases(){
  if(window._cardDetached){
    var card=document.getElementById('pb-float-card');
    var navPanel=document.getElementById('pb-panel-nav');
    var gizPanel=document.getElementById('pb-panel-gizmo');
    if(!navPanel||!gizPanel)return;
    var baseW=Math.max(120,(card&&card.clientWidth?card.clientWidth-10:136));
    var nw=(navPanel.clientWidth>80)?(navPanel.clientWidth-2):baseW;
    var nh=Math.round(nw*0.82);
    var nc=document.getElementById('pb-navcube');var nj=document.getElementById('pb-navjoy');
    if(nc){nc.width=nw;nc.height=nh;nc.style.width=nw+'px';nc.style.height=nh+'px';}
    if(nj){nj.width=nw;nj.height=nh;nj.style.width=nw+'px';nj.style.height=nh+'px';}
    var gw=(gizPanel.clientWidth>80)?(gizPanel.clientWidth-6):baseW;
    var gh=Math.round(gw*0.78);
    var gc2=document.getElementById('pb-gc');
    if(gc2){gc2.width=gw;gc2.height=gh;gc2.style.width=gw+'px';gc2.style.height=gh+'px';}
    var hintRow=document.getElementById('pb-greset');
    if(hintRow&&hintRow.parentElement)hintRow.parentElement.style.width=gw+'px';
  } else {
    var navPanel2=document.getElementById('pb-panel-nav');
    var gizPanel2=document.getElementById('pb-panel-gizmo');
    if(navPanel2){
      var nw2=navPanel2.clientWidth-2;var nh2=Math.round(nw2*0.88);
      var nc2=document.getElementById('pb-navcube');var nj2=document.getElementById('pb-navjoy');
      if(nc2){nc2.width=nw2;nc2.height=nh2;nc2.style.width=nw2+'px';nc2.style.height=nh2+'px';}
      if(nj2){nj2.width=nw2;nj2.height=nh2;nj2.style.width=nw2+'px';nj2.style.height=nh2+'px';}
    }
    if(gizPanel2){
      var gw2=gizPanel2.clientWidth-6;var gh2=Math.round(gw2*0.80);
      var gc3=document.getElementById('pb-gc');
      if(gc3){gc3.width=gw2;gc3.height=gh2;gc3.style.width=gw2+'px';gc3.style.height=gh2+'px';}
      var hintRow2=document.getElementById('pb-greset');
      if(hintRow2&&hintRow2.parentElement)hintRow2.parentElement.style.width=gw2+'px';
    }
  }
  if(window._pbNcReinit)window._pbNcReinit();
  if(window._pbJoyReinit)window._pbJoyReinit();
  if(window._applyNavToggle)window._applyNavToggle();
  if(window._pbNcDraw)window._pbNcDraw();
  if(window._pbGcDraw)window._pbGcDraw();
}

// Dual segmented tab controller (Camera vs Surface for Mobile & Desktop Merged)
var _activeNavTab = 'nav';
function syncAllNavTabs(tab){
  if(tab) _activeNavTab = tab;
  var activeTab = _activeNavTab;

  // Mobile & desktop dual merged navigator panels
  var nav=document.getElementById('pb-panel-nav');
  var gizmo=document.getElementById('pb-panel-gizmo');
  if(nav) nav.style.display=(activeTab==='nav')?'flex':'none';
  if(gizmo) gizmo.style.display=(activeTab==='gizmo')?'flex':'none';

  document.querySelectorAll('.seg-btn').forEach(function(b){
    b.classList.toggle('on',b.dataset.tab===activeTab);
  });
  if(window._fcResizeCanvases)window._fcResizeCanvases();
  if(activeTab==='nav'){
    if(window._pbNcDraw)window._pbNcDraw();
    if(window._ncDraw)window._ncDraw();
  }
  if(activeTab==='gizmo'){
    if(window._pbGcDraw)window._pbGcDraw();
    if(window._gDraw)window._gDraw();
  }
  if(typeof positionLclFloat==='function')positionLclFloat();
}
window._syncAllNavTabs=syncAllNavTabs;
window._syncMobileNavTab=syncAllNavTabs;

function applyMergedNavLayout(){
  var isNarrow=document.body.classList.contains('narrow-mode');
  var isUiHidden=document.body.classList.contains('ui-hidden');
  var isMerged=typeof _scState!=='undefined'&&!!_scState.mergedNav;
  var card=document.getElementById('pb-float-card');
  var sgBot=document.getElementById('sg-bottom');
  var bnavMerge=document.getElementById('bnav-merge');
  var fab=document.getElementById('pb-fab');

  if(bnavMerge)bnavMerge.classList.toggle('on',isMerged);

  if(isNarrow){
    syncAllNavTabs();
    return;
  }

  if(isMerged){
    // Desktop with Dual Merged Navigator float card
    if(sgBot)sgBot.style.display='none';
    _fcReparent();
    if(card){
      card.classList.remove('fc-docked-bottom');
      var globalScale = typeof window.getUiScale === 'function' ? window.getUiScale() : 1.0;
      var fcScale = (typeof _scState !== 'undefined' && _scState.fcScale) ? _scState.fcScale : 1.0;
      if (typeof applyZoom === 'function') applyZoom(card, fcScale * globalScale);
      if(!card.style.left||parseInt(card.style.left)<=0||parseInt(card.style.left)>window.innerWidth-100){
        var defaultLeft=_scState.botLeft?_scState.botLeft:Math.max(10,window.innerWidth-165);
        var defaultTop=_scState.botTop?_scState.botTop:56;
        card.style.left=defaultLeft+'px';
        card.style.top=defaultTop+'px';
        card.style.width='160px';
        card.style.right='auto';
        card.style.bottom='auto';
      }
      if(!window._cardHidden){
        card.classList.add('fc-visible');
        if(fab)fab.classList.remove('fab-visible');
      }
    }
    _fcResizeCanvases();
    syncAllNavTabs();
  } else {
    // Desktop with Stacked Navigator
    if(card)card.classList.remove('fc-visible');
    if(fab)fab.classList.remove('fab-visible');
    _fcReturn();
    if(sgBot&&!isUiHidden&&!_scState.detachedHidden){
      sgBot.style.display='';
    }
    if(window._ncDraw)window._ncDraw();
    if(window._gDraw)window._gDraw();
    if(typeof positionLclFloat==='function')positionLclFloat();
  }
}
window._applyMergedNavLayout=applyMergedNavLayout;

(function initDualNavTabToggle(){
  document.addEventListener('click',function(e){
    var seg=e.target.closest('.seg-btn');
    if(seg&&seg.dataset.tab){
      e.stopPropagation();
      syncAllNavTabs(seg.dataset.tab);
    }
  });
  document.querySelectorAll('.seg-ctrl').forEach(function(sc){
    sc.addEventListener('touchstart',function(e){e.stopPropagation();},{passive:true});
    sc.addEventListener('mousedown',function(e){e.stopPropagation();});
    sc.addEventListener('pointerdown',function(e){e.stopPropagation();});
  });
  document.querySelectorAll('.seg-btn').forEach(function(b){
    b.addEventListener('touchstart',function(e){e.stopPropagation();},{passive:true});
    b.addEventListener('pointerdown',function(e){e.stopPropagation();});
    b.addEventListener('click',function(e){
      e.stopPropagation();
      if(this.dataset.tab){
        syncAllNavTabs(this.dataset.tab);
      }
    });
  });
  setTimeout(function(){
    applyMergedNavLayout();
  },50);
})();

// ── Narrow float card interactions ─────────────────────────────
(function(){
  var card=document.getElementById('pb-float-card');
  var handle=document.getElementById('fc-handle');
  var closeBtn=document.getElementById('fc-close');
  var dockBtn=document.getElementById('fc-dock-btn');
  var resizeEl=document.getElementById('fc-resize');
  var snapHint=document.getElementById('fc-snap-hint');
  var fab=document.getElementById('pb-fab');
  if(!card||!handle)return;

  var SNAP_DIST=5;  // narrow range — only snap-redock when almost back to docked position
  var DEFAULT_W=Math.min(window.innerWidth-16,180);
  card.style.width=DEFAULT_W+'px';card.style.left='8px';card.style.top='52px';

  function isDocked(){return card.classList.contains('fc-docked-bottom');}
  function undock(){
    card.classList.remove('fc-docked-bottom');
    card.style.left=(window._fcLastLeft||10)+'px';
    var defaultTop=Math.max(60,window.innerHeight-(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pb-h'))||76)-180);
    card.style.top=(window._fcLastTop||defaultTop)+'px';
    card.style.width=(window._fcLastW||DEFAULT_W)+'px';
    card.style.right='';card.style.bottom='';
    if(dockBtn)dockBtn.textContent='Dock';
    setTimeout(_fcResizeCanvases,30);
  }
  function dockTo(edge){
    if(!isDocked()){
      window._fcLastLeft=parseInt(card.style.left)||10;
      window._fcLastTop=parseInt(card.style.top)||52;
      window._fcLastW=card.offsetWidth||DEFAULT_W;
    }
    card.classList.remove('fc-docked-bottom');
    if(edge==='bottom')card.classList.add('fc-docked-bottom');
    card.style.right='';card.style.bottom='';
    if(isDocked()&&window._fcNavResizeReset)window._fcNavResizeReset();
    if(dockBtn)dockBtn.textContent='Dock';
    setTimeout(_fcResizeCanvases,30);
  }
  window._fcDockTo=dockTo;window._fcUndock=undock;
  if(dockBtn)dockBtn.addEventListener('click',function(e){e.stopPropagation();if(isDocked()){undock();}else if(!document.body.classList.contains('ui-hidden')){dockTo('bottom');}});

  var dragState=null;
  function snapEdge(nx,ny){
    // Never snap to bottom when UI is hidden — card must stay floating
    if(document.body.classList.contains('ui-hidden'))return null;
    var ch=card.offsetHeight,ih=window.innerHeight;
    if(ny+ch>ih-SNAP_DIST)return'bottom';
    return null;
  }
  function onDragStart(e){
    if(e.target.closest('.seg-ctrl')||e.target.closest('.seg-btn')||e.target===closeBtn||e.target===dockBtn)return;
    if(isDocked())undock();
    e.preventDefault();
    var src=e.touches?e.touches[0]:e,r=card.getBoundingClientRect();
    dragState={ox:src.clientX-r.left,oy:src.clientY-r.top};
  }
  function onDragMove(e){
    if(!dragState)return;e.preventDefault();
    var src=e.touches?e.touches[0]:e;
    var nx=src.clientX-dragState.ox,ny=src.clientY-dragState.oy;
    var cw=card.offsetWidth,ch=card.offsetHeight;
    // No clamping — card moves freely anywhere on screen.
    card.style.left=nx+'px';card.style.top=ny+'px';
    if(snapHint){if(snapEdge(nx,ny))snapHint.classList.add('show');else snapHint.classList.remove('show');}
  }
  function onDragEnd(){
    if(!dragState)return;
    var nx=parseInt(card.style.left)||0,ny=parseInt(card.style.top)||0;
    var edge=snapEdge(nx,ny);
    if(edge){dockTo(edge);}else{window._fcLastLeft=nx;window._fcLastTop=ny;window._fcLastW=card.offsetWidth;}
    if(snapHint)snapHint.classList.remove('show');
    dragState=null;
  }
  handle.addEventListener('touchstart',onDragStart,{passive:false});
  handle.addEventListener('touchmove',onDragMove,{passive:false});
  handle.addEventListener('touchend',onDragEnd);
  handle.addEventListener('mousedown',onDragStart);
  document.addEventListener('mousemove',function(e){if(dragState)onDragMove(e);});
  document.addEventListener('mouseup',function(){if(dragState)onDragEnd();});

  // Width resize — right edge
  var resizeState=null;
  function onResizeStart(e){
    if(isDocked())return;e.preventDefault();e.stopPropagation();
    var src=e.touches?e.touches[0]:e;
    resizeState={sx:src.clientX,sw:card.offsetWidth};
  }
  function onResizeMove(e){
    if(!resizeState)return;e.preventDefault();
    var src=e.touches?e.touches[0]:e;
    var nw=Math.max(200,Math.min(window.innerWidth-16,resizeState.sw+(src.clientX-resizeState.sx)));
    card.style.width=nw+'px';
    var cx=parseInt(card.style.left)||0;
    if(cx+nw>window.innerWidth)card.style.left=Math.max(0,window.innerWidth-nw)+'px';
    _fcResizeCanvases();
  }
  function onResizeEnd(){if(resizeState)window._fcLastW=card.offsetWidth;resizeState=null;_fcResizeCanvases();}
  if(resizeEl){
    resizeEl.addEventListener('touchstart',onResizeStart,{passive:false});
    resizeEl.addEventListener('touchmove',onResizeMove,{passive:false});
    resizeEl.addEventListener('touchend',onResizeEnd);
    resizeEl.addEventListener('mousedown',onResizeStart);
    document.addEventListener('mousemove',function(e){if(resizeState)onResizeMove(e);});
    document.addEventListener('mouseup',function(){if(resizeState)onResizeEnd();});
  }

  if(closeBtn)closeBtn.addEventListener('click',function(e){e.stopPropagation();card.classList.remove('fc-visible');window._cardHidden=true;if(fab)fab.classList.add('fab-visible');});

  var fabDrag=null;
  if(fab){
    fab.style.left='8px';fab.style.top='52px';
    fab.addEventListener('touchstart',function(e){var src=e.touches[0],r=fab.getBoundingClientRect();fabDrag={ox:src.clientX-r.left,oy:src.clientY-r.top,moved:false};},{passive:true});
    fab.addEventListener('touchmove',function(e){if(!fabDrag)return;e.preventDefault();fabDrag.moved=true;var src=e.touches[0];var nx=Math.max(0,Math.min(window.innerWidth-36,src.clientX-fabDrag.ox)),ny=Math.max(0,Math.min(window.innerHeight-36,src.clientY-fabDrag.oy));fab.style.left=nx+'px';fab.style.top=ny+'px';},{passive:false});
    fab.addEventListener('touchend',function(){if(fabDrag&&!fabDrag.moved){window._cardHidden=false;card.classList.add('fc-visible');fab.classList.remove('fab-visible');setTimeout(_fcResizeCanvases,30);}fabDrag=null;});
    fab.addEventListener('click',function(){window._cardHidden=false;card.classList.add('fc-visible');fab.classList.remove('fab-visible');setTimeout(_fcResizeCanvases,30);});
  }
})();

// ── Narrow nav inter-panel resize grip ──────────────────────────
(function(){
  var navGrip=document.getElementById('fc-nav-resize');
  var navPanel=document.getElementById('pb-panel-nav');
  var gizPanel=document.getElementById('pb-panel-gizmo');
  if(!navGrip||!navPanel||!gizPanel)return;
  var navState=null;
  function onStart(e){
    if(document.getElementById('pb-float-card').classList.contains('fc-docked-bottom'))return;
    e.preventDefault();e.stopPropagation();
    var src=e.touches?e.touches[0]:e;
    navState={sx:src.clientX,nw:navPanel.offsetWidth,gw:gizPanel.offsetWidth};
  }
  function onMove(e){
    if(!navState)return;e.preventDefault();
    var src=e.touches?e.touches[0]:e,dx=src.clientX-navState.sx,total=navState.nw+navState.gw;
    var newNw=Math.max(80,Math.min(total-80,navState.nw+dx));
    navPanel.style.flex='none';navPanel.style.width=newNw+'px';
    gizPanel.style.flex='none';gizPanel.style.width=(total-newNw)+'px';
    _fcResizeCanvases();
  }
  function onEnd(){navState=null;_fcResizeCanvases();}
  navGrip.addEventListener('touchstart',onStart,{passive:false});
  navGrip.addEventListener('touchmove',onMove,{passive:false});
  navGrip.addEventListener('touchend',onEnd);
  navGrip.addEventListener('mousedown',onStart);
  document.addEventListener('mousemove',function(e){if(navState)onMove(e);});
  document.addEventListener('mouseup',function(){if(navState)onEnd();});
  window._fcNavResizeReset=function(){
    navPanel.style.flex='';navPanel.style.width='';
    gizPanel.style.flex='';gizPanel.style.width='';
    var lookPanel=document.getElementById('pb-panel-look');
    if(lookPanel){lookPanel.style.flex='';lookPanel.style.width='';}
  };
})();

// ── Narrow float card: pinch-to-scale ───────────────────────────
// Two-finger pinch on the card scales its width proportionally.
// Canvases are resized via _fcResizeCanvases after each step.
// Works whether card is docked or floating.
(function(){
  var card=document.getElementById('pb-float-card');
  if(!card)return;
  var pinch=null; // {dist, w}
  function dist(t){
    var dx=t[0].clientX-t[1].clientX,dy=t[0].clientY-t[1].clientY;
    return Math.sqrt(dx*dx+dy*dy);
  }
  card.addEventListener('touchstart',function(e){
    if(e.touches.length===2){
      e.preventDefault();
      pinch={dist:dist(e.touches),w:card.offsetWidth};
    }
  },{passive:false});
  card.addEventListener('touchmove',function(e){
    if(pinch&&e.touches.length===2){
      e.preventDefault();
      var scale=dist(e.touches)/pinch.dist;
      var nw=Math.round(pinch.w*scale);
      nw=Math.max(200,Math.min(window.innerWidth-16,nw));
      card.style.width=nw+'px';
      // Keep card on screen
      if(!card.classList.contains('fc-docked-bottom')){
        var cx=parseInt(card.style.left)||0;
        if(cx+nw>window.innerWidth)card.style.left=Math.max(0,window.innerWidth-nw)+'px';
      }
      if(window._fcResizeCanvases)window._fcResizeCanvases();
    }
  },{passive:false});
  card.addEventListener('touchend',function(e){
    if(e.touches.length<2){
      if(pinch){window._fcLastW=card.offsetWidth;}
      pinch=null;
    }
  });
  card.addEventListener('touchcancel',function(){pinch=null;});
})();

// Keyboard
window.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==='z'&&!e.shiftKey){e.preventDefault();undo();return;}
  if((e.ctrlKey||e.metaKey)&&(e.key==='y'||(e.key==='z'&&e.shiftKey))){e.preventDefault();redo();return;}
  if((e.ctrlKey||e.metaKey)&&e.key==='d'){e.preventDefault();duplicateSelected();return;}
  if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();saveFile();return;}
  if((e.ctrlKey||e.metaKey)&&e.key==='e'){e.preventDefault();var em=document.getElementById('expmenu');em.classList.toggle('vis');return;}
  if((e.ctrlKey||e.metaKey)&&e.key==='n'){e.preventDefault();document.getElementById('bnew').click();return;}
  if(e.key==='Delete'||e.key==='Backspace'){if(selectedStrokes.length){e.preventDefault();deleteSelected();return;}}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(document.activeElement.tagName==='INPUT'||document.activeElement.tagName==='TEXTAREA')return;
  // In FPS mode, WASD/QE/arrows are handled by FPS tick — suppress normal shortcuts
  if(_fpsMode){
    var k=e.key.toLowerCase();
    if(k==='escape'){if(window._exitFps)window._exitFps();return;}
    if('wasdqe'.indexOf(k)>=0)return;
    if(k==='arrowleft'||k==='arrowright'||k==='arrowup'||k==='arrowdown')return;
  }
  switch(e.key.toLowerCase()){
    case 'd':setMode('draw');break;case 'e':setMode('erase');break;case 'q':setMode('select');break;
    case 'g':setMode('pan');break;case 'r':setMode('orbit');break;
    case 'f':document.getElementById('sflat').click();break;
    case 'v':togglePersp();break;case 'x':document.getElementById('bdepth').click();break;
    case 'a':toggleAxis(!axisLinesOn);break;case 's':document.getElementById('ssmooth').click();break;
    case 'w':document.getElementById('svel').click();break;
    case 'l':if(window._rulerToggle) window._rulerToggle();break;
    case 'p':expPNG();break;case 'h':document.getElementById('bhide').click();break;
    case 'escape':clearSelection();setMode(prevDrawMode);break;
    // Brush size: ] increase, [ decrease
    case ']':case '}':var bsEl=document.getElementById('sz-sld');if(bsEl){bsEl.value=Math.min(40,Number(bsEl.value)+1);bsEl.dispatchEvent(new Event('input'));}break;
    case '[':case '{':var bsEl2=document.getElementById('sz-sld');if(bsEl2){bsEl2.value=Math.max(1,Number(bsEl2.value)-1);bsEl2.dispatchEvent(new Event('input'));}break;
    // Opacity: shift+] increase, shift+[ decrease — already handled by }/{ above
    // Pages/views toggle
    case 'n':togglePages();break;
    case 'm':toggleViews();break;
    // Zoom: +/= zoom in, -/_ zoom out
    case '=':case '+':if(useOrtho){orthoZoom=Math.max(1,orthoZoom-1);syncOrtho();}else{cam.radius=Math.max(1,cam.radius-1);}updCam();break;
    case '-':case '_':if(useOrtho){orthoZoom=Math.min(50,orthoZoom+1);syncOrtho();}else{cam.radius=Math.min(40,cam.radius+1);}updCam();break;
    // Save view
    case 'b':saveView();break;
    // Grid toggle
    case 'j':gridH.visible=!gridH.visible;document.getElementById('bgrid').classList.toggle('on',gridH.visible);markDirty();break;
    // Surface / Plane toggle
    case 'k':if(window._togglePlaneVis)window._togglePlaneVis();else{surfGroup.visible=!surfGroup.visible;markDirty();}break;
    // FPS mode
    case 'c':if(window._enterFps)window._enterFps();break;
    // Numpad 1-9 for view recall
    case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
      var vi=parseInt(e.key)-1;var vws=pages[curPage]&&pages[curPage].views;
      if(vws&&vws[vi])recallView(vws[vi]);
      break;
  }
});

// Init
syncSurf();setMode('draw');
document.getElementById('bsurf').classList.add('on');

setActiveLayer(0);
updateGestLabel();updateLayoutMode();_syncRenderer();
// PWA standalone: viewport dimensions may not be final at script execution.
// Retry after paint and after system UI has settled to ensure correct narrow/wide layout.
// _syncRenderer retries ensure camera projection is correct after Android freeform->fullscreen.
setTimeout(updateLayoutMode,200);
setTimeout(updateLayoutMode,600);
setTimeout(_syncRenderer,250);
setTimeout(_syncRenderer,700);
setTimeout(positionLclFloat,220);
setTimeout(positionLclFloat,650);
// Clean startup: default to fresh scene without auto-restoring old session overrides
// (Use the LOAD button or File menu to restore saved scenes)
window._demoTurntable = false;

window._demoTurntable = false;

window.loadAnimatedBrushesDemo = function(){
  clearAll();
  window._demoTurntable = true;

  if(window._stageSystem && window._stageSystem.state){
    window._stageSystem.state.groundGrid = true;
    window._stageSystem.state.depthFog = false;
    window._stageSystem.applyStageSettings();
  }

  var demoStrokes = [];

  // 1. WATERFALL STREAM: cascading down in a graceful curve
  var pts1 = [];
  for(var i=0; i<=35; i++){
    var t = i / 35;
    var y = 2.8 - t * 4.4;
    var x = -2.2 + Math.sin(t * 3.0) * 0.45;
    var z = -0.8 - t * 1.5 + Math.cos(t * 2.0) * 0.3;
    pts1.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts1, color: '#1d9fd6', sz: 8, op: 1.0, flat: true, matType: 'waterfall', layer: 1
  });

  // 2. CAUSTIC LIGHT: undulating pool ribbon
  var pts2 = [];
  for(var i=0; i<=32; i++){
    var t = i / 32;
    var ang = t * Math.PI * 2.5;
    var x = -0.8 + Math.cos(ang) * 1.7;
    var z = Math.sin(ang) * 1.7;
    var y = -1.4 + Math.sin(t * 6.0) * 0.15;
    pts2.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts2, color: '#1ca8b8', sz: 7, op: 0.95, flat: true, matType: 'caustic', layer: 1
  });

  // 3. SEA FOAM: cresting wave curve
  var pts3 = [];
  for(var i=0; i<=28; i++){
    var t = i / 28;
    var x = 0.4 + t * 2.3;
    var y = -1.2 + Math.sin(t * Math.PI) * 1.3;
    var z = -0.6 + Math.cos(t * 3.0) * 0.4;
    pts3.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts3, color: '#2488aa', sz: 7, op: 1.0, flat: true, matType: 'foam', layer: 1
  });

  // 4. RIPPLE STRAND: winding water ribbon
  var pts4 = [];
  for(var i=0; i<=32; i++){
    var t = i / 32;
    var x = -2.0 + t * 4.0;
    var y = -1.5;
    var z = 1.3 + Math.sin(t * 8.0) * 0.45;
    pts4.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts4, color: '#3078a0', sz: 6, op: 1.0, flat: true, matType: 'ripple', layer: 1
  });

  // 5. MOVING RAINBOW: rising spiral in center
  var pts5 = [];
  for(var i=0; i<=42; i++){
    var t = i / 42;
    var ang = t * Math.PI * 4.0;
    var rad = 0.85 * (1.0 - t * 0.3);
    var x = Math.cos(ang) * rad;
    var z = Math.sin(ang) * rad;
    var y = -0.8 + t * 3.4;
    pts5.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts5, color: '#ffffff', sz: 6, op: 1.0, flat: true, matType: 'rainbow', layer: 2
  });

  // 6. STARDUST SPARKLE: orbiting cosmic ring
  var pts6 = [];
  for(var i=0; i<=36; i++){
    var t = i / 36;
    var ang = t * Math.PI * 2.0;
    var x = Math.cos(ang) * 2.5;
    var z = Math.sin(ang) * 2.5;
    var y = 0.8 + Math.sin(ang * 2.0) * 0.4;
    pts6.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts6, color: '#ffd700', sz: 7, op: 1.0, flat: false, matType: 'stardust', layer: 2
  });

  // 7. LAVA FLOW: molten burning arch
  var pts7 = [];
  for(var i=0; i<=30; i++){
    var t = i / 30;
    var x = 1.0 + Math.cos(t * Math.PI) * 1.6;
    var z = 0.9 + t * 1.5;
    var y = -1.3 + Math.sin(t * Math.PI) * 1.8;
    pts7.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts7, color: '#ff4500', sz: 7, op: 1.0, flat: true, matType: 'lava', layer: 3
  });

  // 8. GALAXY SWIRL: celestial nebula arch
  var pts8 = [];
  for(var i=0; i<=35; i++){
    var t = i / 35;
    var ang = t * Math.PI * 3.0;
    var x = -1.4 + Math.sin(ang) * (0.6 + t * 0.9);
    var z = -0.9 + Math.cos(ang) * (0.6 + t * 0.9);
    var y = 0.4 + t * 2.1;
    pts8.push({x: x, y: y, z: z});
  }
  demoStrokes.push({
    pts: pts8, color: '#6a0dad', sz: 7, op: 1.0, flat: true, matType: 'galaxy', layer: 3
  });

  loadData({ strokes: demoStrokes });

  camDist = 7.5;
  camAngleX = 0.35;
  camAngleY = 0.6;
  updateCam();
  toast('Animated Brushes 3D Demo Loaded');
};

// Check ?demo=animated on startup
if(new URLSearchParams(window.location.search).get('demo') === 'animated'){
  setTimeout(function(){
    if(window.loadAnimatedBrushesDemo) window.loadAnimatedBrushesDemo();
  }, 400);
}

function animate(){
  requestAnimationFrame(animate);
  if(window._demoTurntable){
    camAngleY += 0.003;
    updateCam();
    _renderDirty = true;
  }
  if(_animatedUniformsList.length>0){
    _updateAnimatedMaterials();
    _renderDirty=true;
  }
  if(window._stageSystem && window._stageSystem.onFrame){
    if(window._stageSystem.onFrame()) _renderDirty=true;
  }
  if(_renderDirty||isDrawing||_hoverStroke||_recState){
    if(window._stageSystem && window._stageSystem.pipeline && window._stageSystem.pipeline.isEnabled()){
      window._stageSystem.pipeline.render();
    } else {
      renderer.render(scene,activeCam());
    }
    _renderDirty=false;
  }
  // Overlay canvas always synced to the same RAF tick as renderer.render —
  // eliminates the 1-frame phase offset that caused the local gizmo to wiggle during orbit.
  if(window._lgOverlayDraw) window._lgOverlayDraw();
}
animate();
