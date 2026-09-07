// ================================================================
//  NARROW CYCLE BUTTONS — plane / surf / axis
//  Tap = cycle to next. Long-press (400ms) = open popover upward.
//  Popover auto-dismisses on selection or outside tap.
// ================================================================
(function(){
  const PLANES=['xz','xy','yz'];
  const PLANE_LABELS={xz:'Front',xy:'Top',yz:'Side'};
  const SURFS=['plane','cube','cylinder','sphere','cone','loft','model','none'];
  const SURF_LABELS={plane:'Plane',cube:'Cube',cylinder:'Cylinder',sphere:'Sphere',cone:'Cone',loft:'Loft',model:'Model',none:'Off'};
  const AXES=['all','x','y','z'];

  let openPop=null;

  function closeAllPops(){
    ['pop-plane','pop-surf','pop-axis','pop-mode','pop-plane2','pop-axis2','pop-surf2'].forEach(function(id){
      const p=document.getElementById(id);if(p)p.classList.remove('open');
    });
    openPop=null;
  }
  document.addEventListener('click',function(e){
    if(openPop&&!e.target.closest('.cyc-pop')&&!e.target.closest('.cyc-btn'))closeAllPops();
  });

  function positionPop(pop,btn){
    const br=btn.getBoundingClientRect();
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    pop.style.bottom=((window.innerHeight-br.top+4)/s)+'px';
    pop.style.left=(Math.max(4,Math.min(br.left,window.innerWidth-pop.getBoundingClientRect().width-4))/s)+'px';
    pop.style.top='auto';
  }

  function openPop2(popId,btn){
    closeAllPops();
    const pop=document.getElementById(popId);if(!pop)return;
    pop.classList.add('open');
    openPop=popId;
    positionPop(pop,btn);
    // Mark current item
    pop.querySelectorAll('.cyc-pop-item').forEach(function(it){it.classList.remove('cur');});
  }

  function makeCycBtn(btnId,popId,getItems,getCur,applyCur,getLabel){
    const btn=document.getElementById(btnId);if(!btn)return;
    let holdTimer=null;
    function onStart(e){
      e.preventDefault();e.stopPropagation();
      holdTimer=setTimeout(function(){
        holdTimer=null;
        openPop2(popId,btn);
      },400);
    }
    function onEnd(e){
      e.stopPropagation();
      if(holdTimer){
        clearTimeout(holdTimer);holdTimer=null;
        // Short tap — cycle to next
        const items=getItems();const cur=getCur();
        const next=items[(items.indexOf(cur)+1)%items.length];
        applyCur(next);
        btn.textContent=getLabel(next);
        closeAllPops();
      }
    }
    btn.addEventListener('mousedown',onStart);
    btn.addEventListener('touchstart',onStart,{passive:false});
    btn.addEventListener('mouseup',onEnd);
    btn.addEventListener('touchend',onEnd);
    btn.addEventListener('mouseleave',function(){if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}});
    btn.addEventListener('touchcancel',function(){if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}});
  }

  // ── Plane cycle ──────────────────────────────────────────────────
  makeCycBtn('pb-cyc-plane','pop-plane',
    function(){return PLANES;},
    function(){return curPlane;},
    function(v){
      curPlane=v;
      document.querySelectorAll('[data-plane]').forEach(function(b){b.classList.toggle('on',b.dataset.plane===v);});
      if(surfFillMat)surfFillMat.color.setHex(_activeSurfTrace());
      if(surfWireMat)surfWireMat.color.setHex(_activeSurfTrace());
      syncSurf();
      const btn=document.getElementById('pb-cyc-plane');if(btn)btn.textContent=PLANE_LABELS[v]||v.toUpperCase();
    },
    function(v){return PLANE_LABELS[v]||v.toUpperCase();}
  );
  document.querySelectorAll('[data-cyc-plane]').forEach(function(it){
    it.addEventListener('click',function(){
      const v=this.dataset.cycPlane;
      curPlane=v;
      document.querySelectorAll('[data-plane]').forEach(function(b){b.classList.toggle('on',b.dataset.plane===v);});
      syncSurf();
      const btn=document.getElementById('pb-cyc-plane');if(btn)btn.textContent=PLANE_LABELS[v]||v.toUpperCase();
      closeAllPops();
    });
  });

  // ── Shared surf type application — handles none/loft/standard ────
  // Exposed on window so bindings outside this IIFE (data-surf buttons) can call it
  function applySurfType(v){
    if(v==='none'){
      // Hide surface entirely — no drawing surface active
      surfType='none';
      surfGroup.visible=false;
      document.querySelectorAll('[data-surf]').forEach(function(b){b.classList.remove('on');});
      var bsurf=document.getElementById('bsurf');if(bsurf)bsurf.classList.remove('on');
      _updateLoftDelBtn();
      markDirty();
      toast('No active plane · drawing disabled');
      return;
    }
    if(v==='loft'){
      // Tap while already on loft with stored geo → clear it
      if(surfType==='loft' && window._loftGeo){
        if(window._clearLoft) window._clearLoft();
        _updateLoftDelBtn();
        return;
      }
      document.querySelectorAll('[data-surf]').forEach(function(b){b.classList.remove('on');});
      if(window._loftGeo){
        // Activate stored loft geometry
        if(window._activateLoft) window._activateLoft();
      } else {
        // No loft built yet — switch to select mode so user can pick strokes
        surfType='loft';
        surfGroup.visible=false;
        var bsurf2=document.getElementById('bsurf');if(bsurf2)bsurf2.classList.remove('on');
        markDirty();
        setMode('select');
        toast('Select 2+ strokes · then tap ⟁ Loft');
      }
      _updateLoftDelBtn();
      return;
    }
    if(v==='model'){
      if(window._modelCanvasGeo){
        if (surfType === 'model' && window.toggleModelCanvasHUD) {
          window.toggleModelCanvasHUD();
        } else if(window._activateModelCanvas) {
          window._activateModelCanvas();
        }
      } else {
        toast('Drop a .glb/.obj file or pick from Templates to create a 3D model canvas');
      }
      _updateLoftDelBtn();
      return;
    }
    // Standard surf types
    surfType=v;
    surfGroup.visible=true;
    var bsurf3=document.getElementById('bsurf');if(bsurf3)bsurf3.classList.add('on');
    document.querySelectorAll('[data-surf]').forEach(function(b){b.classList.toggle('on',b.dataset.surf===v);});
    buildSurf();
    _updateLoftDelBtn();
  }
  window._applySurfType=applySurfType;

  // Show/hide the topbar "Delete loft" button based on current surface state.
  // Visible only when a loft or model surface is active.
  function _updateLoftDelBtn(){
    var btn=document.getElementById('bdelloft');
    if(!btn)return;
    var isActiveLoft=(surfType==='loft')&&!!window._loftGeo;
    var isActiveModel=(surfType==='model')&&!!window._modelCanvasGeo;
    btn.style.display=(isActiveLoft||isActiveModel)?'':'none';
    btn.textContent=isActiveModel?'Delete Model Canvas':'Delete Loft';
  }
  window._updateLoftDelBtn=_updateLoftDelBtn;
  // Wire the delete button
  (function(){
    var btn=document.getElementById('bdelloft');
    if(!btn)return;
    btn.addEventListener('click',function(){
      if(surfType==='model'&&window._clearModelCanvas){
        window._clearModelCanvas();
      } else if(window._clearLoft){
        window._clearLoft();
      }
      _updateLoftDelBtn();
    });
  })();

  // ── Surface type cycle ───────────────────────────────────────────
  makeCycBtn('pb-cyc-surf','pop-surf',
    function(){return SURFS;},
    function(){return surfType;},
    function(v){
      applySurfType(v);
      const btn=document.getElementById('pb-cyc-surf');if(btn)btn.textContent=SURF_LABELS[v]||v;
    },
    function(v){return SURF_LABELS[v]||v;}
  );
  document.querySelectorAll('[data-cyc-surf]').forEach(function(it){
    it.addEventListener('click',function(){
      const v=this.dataset.cycSurf;
      applySurfType(v);
      const btn=document.getElementById('pb-cyc-surf');if(btn)btn.textContent=SURF_LABELS[v]||v;
      closeAllPops();
    });
  });

  // ── Axis cycle ───────────────────────────────────────────────────
  makeCycBtn('pb-cyc-axis','pop-axis',
    function(){return AXES;},
    function(){return document.getElementById('ga-all')&&document.getElementById('ga-all').classList.contains('on')?'all':['x','y','z'].find(function(a){const b=document.getElementById('ga-'+a);return b&&b.classList.contains('on');})||'all';},
    function(v){
      if(window._setAxisFilter)window._setAxisFilter(v);
      const btn=document.getElementById('pb-cyc-axis');if(btn)btn.textContent=v==='all'?'All':v.toUpperCase();
    },
    function(v){return v==='all'?'All':v.toUpperCase();}
  );
  document.querySelectorAll('[data-cyc-axis]').forEach(function(it){
    it.addEventListener('click',function(){
      const v=this.dataset.cycAxis;
      if(window._setAxisFilter)window._setAxisFilter(v);
      const btn=document.getElementById('pb-cyc-axis');if(btn)btn.textContent=v==='all'?'All':v.toUpperCase();
      closeAllPops();
    });
  });

  // ── Gizmo panel 4-button cycle row ───────────────────────────────
  // Helper: get current gizmo mode label
  function getGizmoModeLabel(m){return m==='all'?'All':m==='move'?'Move':m==='rotate'?'Rotate':'Scale';}
  function getCurMode(){return window._getGizmoMode?window._getGizmoMode():'all';}

  // Mode button
  makeCycBtn('pb-cyc-mode','pop-mode',
    function(){return['all','move','rotate','scale'];},
    getCurMode,
    function(v){
      if(window._setGizmoMode)window._setGizmoMode(v);
      const btn=document.getElementById('pb-cyc-mode');if(btn)btn.textContent=getGizmoModeLabel(v);
    },
    getGizmoModeLabel
  );
  document.querySelectorAll('[data-cyc-mode]').forEach(function(it){
    it.addEventListener('click',function(){
      const v=this.dataset.cycMode;
      if(window._setGizmoMode)window._setGizmoMode(v);
      const btn=document.getElementById('pb-cyc-mode');if(btn)btn.textContent=getGizmoModeLabel(v);
      closeAllPops();
    });
  });

  // Plane button (gizmo panel)
  makeCycBtn('pb-cyc-plane2','pop-plane2',
    function(){return PLANES;},
    function(){return curPlane;},
    function(v){
      curPlane=v;
      document.querySelectorAll('[data-plane]').forEach(function(b){b.classList.toggle('on',b.dataset.plane===v);});
      syncSurf();
      const btn=document.getElementById('pb-cyc-plane2');if(btn)btn.textContent=PLANE_LABELS[v]||v.toUpperCase();
      const sb=document.getElementById('sb-cyc-plane');if(sb)sb.textContent=PLANE_LABELS[v]||v.toUpperCase();
      // sync old cycle bar button if still present
      const b2=document.getElementById('pb-cyc-plane');if(b2)b2.textContent=PLANE_LABELS[v]||v.toUpperCase();
    },
    function(v){return PLANE_LABELS[v]||v.toUpperCase();}
  );
  document.querySelectorAll('[data-cyc-plane2]').forEach(function(it){
    it.addEventListener('click',function(){
      const v=this.dataset.cycPlane2;
      curPlane=v;
      document.querySelectorAll('[data-plane]').forEach(function(b){b.classList.toggle('on',b.dataset.plane===v);});
      syncSurf();
      const btn=document.getElementById('pb-cyc-plane2');if(btn)btn.textContent=PLANE_LABELS[v]||v.toUpperCase();
      const sb=document.getElementById('sb-cyc-plane');if(sb)sb.textContent=PLANE_LABELS[v]||v.toUpperCase();
      closeAllPops();
    });
  });

  // Axis button (gizmo panel)
  makeCycBtn('pb-cyc-axis2','pop-axis2',
    function(){return AXES;},
    function(){return document.getElementById('ga-all')&&document.getElementById('ga-all').classList.contains('on')?'all':['x','y','z'].find(function(a){const b=document.getElementById('ga-'+a);return b&&b.classList.contains('on');})||'all';},
    function(v){
      if(window._setAxisFilter)window._setAxisFilter(v);
      const btn=document.getElementById('pb-cyc-axis2');if(btn)btn.textContent=v==='all'?'All':v.toUpperCase();
    },
    function(v){return v==='all'?'All':v.toUpperCase();}
  );
  document.querySelectorAll('[data-cyc-axis2]').forEach(function(it){
    it.addEventListener('click',function(){
      const v=this.dataset.cycAxis2;
      if(window._setAxisFilter)window._setAxisFilter(v);
      const btn=document.getElementById('pb-cyc-axis2');if(btn)btn.textContent=v==='all'?'All':v.toUpperCase();
      closeAllPops();
    });
  });

  // Surface button (gizmo panel)
  makeCycBtn('pb-cyc-surf2','pop-surf2',
    function(){return SURFS;},
    function(){return surfType;},
    function(v){
      applySurfType(v);
      const btn=document.getElementById('pb-cyc-surf2');if(btn)btn.textContent=SURF_LABELS[v]||v;
      const sb=document.getElementById('sb-cyc-surf');if(sb)sb.textContent=SURF_LABELS[v]||v;
    },
    function(v){return SURF_LABELS[v]||v;}
  );
  document.querySelectorAll('[data-cyc-surf2]').forEach(function(it){
    it.addEventListener('click',function(){
      const v=this.dataset.cycSurf2;
      applySurfType(v);
      const btn=document.getElementById('pb-cyc-surf2');if(btn)btn.textContent=SURF_LABELS[v]||v;
      const sb=document.getElementById('sb-cyc-surf');if(sb)sb.textContent=SURF_LABELS[v]||v;
      closeAllPops();
    });
  });

  // ── Sidebar gizmo 4-button cycle row ─────────────────────────────
  // Mode
  makeCycBtn('sb-cyc-mode','pop-mode',
    function(){return['all','move','rotate','scale'];},
    getCurMode,
    function(v){
      if(window._setGizmoMode)window._setGizmoMode(v);
      const btn=document.getElementById('sb-cyc-mode');if(btn)btn.textContent=getGizmoModeLabel(v);
    },
    getGizmoModeLabel
  );
  // Plane
  makeCycBtn('sb-cyc-plane','pop-plane2',
    function(){return PLANES;},
    function(){return curPlane;},
    function(v){
      curPlane=v;
      document.querySelectorAll('[data-plane]').forEach(function(b){b.classList.toggle('on',b.dataset.plane===v);});
      syncSurf();
      const btn=document.getElementById('sb-cyc-plane');if(btn)btn.textContent=PLANE_LABELS[v]||v.toUpperCase();
      var b2=document.getElementById('pb-cyc-plane2');if(b2)b2.textContent=PLANE_LABELS[v]||v.toUpperCase();
    },
    function(v){return PLANE_LABELS[v]||v.toUpperCase();}
  );
  // Axis
  makeCycBtn('sb-cyc-axis','pop-axis2',
    function(){return AXES;},
    function(){return document.getElementById('ga-all')&&document.getElementById('ga-all').classList.contains('on')?'all':(['x','y','z'].find(function(a){var b=document.getElementById('ga-'+a);return b&&b.classList.contains('on');})||'all');},
    function(v){
      if(window._setAxisFilter)window._setAxisFilter(v);
      var btn=document.getElementById('sb-cyc-axis');if(btn)btn.textContent=v==='all'?'All':v.toUpperCase();
    },
    function(v){return v==='all'?'All':v.toUpperCase();}
  );
  // Surface type
  makeCycBtn('sb-cyc-surf','pop-surf2',
    function(){return SURFS;},
    function(){return surfType;},
    function(v){
      applySurfType(v);
      var btn=document.getElementById('sb-cyc-surf');if(btn)btn.textContent=SURF_LABELS[v]||v;
      var b2=document.getElementById('pb-cyc-surf2');if(b2)b2.textContent=SURF_LABELS[v]||v;
    },
    function(v){return SURF_LABELS[v]||v;}
  );

  // Keep sidebar surface button in sync when narrow buttons change plane state
  // (plane sync is handled directly in each applyCur callback above)
})();

// ── UI bindings ───────────────────────────────────────────────────
document.getElementById('sdraw').addEventListener('click',function(){setMode('draw');});
document.getElementById('sselect').addEventListener('click',function(){setMode('select');});
document.getElementById('pb-draw').addEventListener('click',function(){setMode('draw');});
document.getElementById('pb-select').addEventListener('click',function(){setMode('select');});
var pbFill = document.getElementById('pb-fill'); if(pbFill) pbFill.addEventListener('click',function(){setMode('fill');});
var pbSmudge = document.getElementById('pb-smudge'); if(pbSmudge) pbSmudge.addEventListener('click',function(){setMode('smudge');});
var pbCurve = document.getElementById('pb-curve'); if(pbCurve) pbCurve.addEventListener('click',function(){setMode('curve');});

// Erase buttons: tap = setMode('erase'), long-press = toggle partial erase
(function(){
  var LONG_MS=450;
  function _syncEraseVisual(){
    var ids=['serase','pb-erase','scx-erase'];
    for(var i=0;i<ids.length;i++){
      var b=document.getElementById(ids[i]);
      if(b)b.classList.toggle('partial-erase',_partialErase);
    }
  }
  function wireEraseLongPress(id){
    var btn=document.getElementById(id);if(!btn)return;
    var _lpTimer=null,_didLong=false;
    function onStart(e){
      _didLong=false;
      _lpTimer=setTimeout(function(){
        _didLong=true;
        _partialErase=!_partialErase;
        _syncEraseVisual();
        toast(_partialErase?'Partial erase':'Line erase');
        if(mode!=='erase')setMode('erase');
      },LONG_MS);
    }
    function onEnd(e){
      clearTimeout(_lpTimer);
      if(!_didLong){setMode('erase');}
    }
    function onCancel(){clearTimeout(_lpTimer);_didLong=false;}
    btn.addEventListener('pointerdown',onStart);
    btn.addEventListener('pointerup',onEnd);
    btn.addEventListener('pointercancel',onCancel);
    btn.addEventListener('pointerleave',onCancel);
    // Suppress click so it doesn't fire after pointerup
    btn.addEventListener('click',function(e){e.stopImmediatePropagation();e.preventDefault();});
  }
  wireEraseLongPress('serase');
  wireEraseLongPress('pb-erase');
  wireEraseLongPress('scx-erase');
  window._syncEraseVisual=_syncEraseVisual;
})();

document.getElementById('sflat').addEventListener('click',function(){flatBrush=!flatBrush;this.classList.toggle('on',flatBrush);var pb=document.getElementById('pb-flat');if(pb)pb.classList.toggle('on',flatBrush);var scx=document.getElementById('scx-flat');if(scx)scx.classList.toggle('on',flatBrush);toast(flatBrush?'Marker brush':'Round brush');});
document.getElementById('pb-flat').addEventListener('click',()=>document.getElementById('sflat').click());

document.getElementById('ssmooth').addEventListener('click',function(){smoothingOn=!smoothingOn;LAZY=smoothingOn?LAZY_ON:LAZY_OFF;this.classList.toggle('on',smoothingOn);var pb=document.getElementById('pb-smooth');if(pb)pb.classList.toggle('on',smoothingOn);var scx=document.getElementById('scx-smooth');if(scx)scx.classList.toggle('on',smoothingOn);toast(smoothingOn?'Smoothing on':'Raw tracking');});
document.getElementById('pb-smooth').addEventListener('click',()=>document.getElementById('ssmooth').click());

document.getElementById('svel').addEventListener('click',function(){velocityTaper=!velocityTaper;this.classList.toggle('on',velocityTaper);var pb=document.getElementById('pb-vel');if(pb)pb.classList.toggle('on',velocityTaper);var scx=document.getElementById('scx-vel');if(scx)scx.classList.toggle('on',velocityTaper);toast(velocityTaper?'Velocity taper on':'Uniform thickness');});
document.getElementById('pb-vel').addEventListener('click',()=>document.getElementById('svel').click());

// ── Hidden-UI mini-toolbar wiring (v14.2) ───────────────────────────
// Toggle button shows/hides the bar. All tool buttons delegate to existing sidecol handlers.
(function(){
  var tgl=document.getElementById('sc-hidden-toggle');
  var bar=document.getElementById('sc-hidden-bar');
  if(!tgl||!bar)return;
  tgl.addEventListener('click',function(){
    var open=bar.classList.toggle('scx-open');
    tgl.classList.toggle('lit',open);
  });
  // Mode buttons → delegate to sidecol equivalents
  var pairs=[['scx-draw','sdraw'],['scx-select','sselect'],
             ['scx-flat','sflat'],['scx-smooth','ssmooth'],['scx-vel','svel'],
             ['scx-undo','s-undo'],['scx-redo','s-redo'],
             ['sz-trig-scx','sz-trig-sb'],['op-trig-scx','op-trig-sb']];
  pairs.forEach(function(p){
    var src=document.getElementById(p[0]),tgt=document.getElementById(p[1]);
    if(src&&tgt)src.addEventListener('click',function(e){e.stopPropagation();tgt.click();});
  });
  // data-sz / data-op / .cw clicks are already handled by the global querySelectorAll
  // listeners, so no per-button wiring needed — they dispatch directly.
  // When the UI toggles from hidden→shown, auto-close the bar to avoid stale state
  var _mo=new MutationObserver(function(){
    if(!document.body.classList.contains('ui-hidden')){
      bar.classList.remove('scx-open');
      tgl.classList.remove('lit');
    }
  });
  _mo.observe(document.body,{attributes:true,attributeFilter:['class']});
})();

var _bu=document.getElementById('bundo');if(_bu)_bu.addEventListener('click',undo);
var _br=document.getElementById('bredo');if(_br)_br.addEventListener('click',redo);
document.getElementById('pb-undo').addEventListener('click',undo);
document.getElementById('pb-redo').addEventListener('click',redo);
document.getElementById('s-undo').addEventListener('click',undo);
document.getElementById('s-redo').addEventListener('click',redo);
document.getElementById('bclear').addEventListener('click',()=>{if(confirm('Clear all strokes?'))clearAll();});

// Visibility helper functions (called from view-pop and narrow-bar)
function toggleAxis(on){axisLinesOn=on;axisGroup.visible=on;var b=document.getElementById('baxis');if(b)b.classList.toggle('on',on);var pb=document.getElementById('pb-axis');if(pb)pb.classList.toggle('on',on);if(window._syncViewToggle)window._syncViewToggle();markDirty();}

// Depth plane opacity — affects tint mesh only, not grid dots/lines
function cycleDepthOp(){
  _depthOpIdx=(_depthOpIdx+1)%_depthOpSteps.length;
  var op=_depthOpSteps[_depthOpIdx];
  var lbl=_depthOpLabels[_depthOpIdx];
  if(_frostedMat){_frostedMat.opacity=op;_frostedMat.needsUpdate=true;}
  if(_fpsFrosted){_fpsFrosted.material.opacity=op;_fpsFrosted.material.needsUpdate=true;}
  var tb=document.getElementById('bdepth-op');if(tb)tb.textContent='Depth: '+lbl;
  var pb=document.getElementById('pb-depthop');if(pb)pb.textContent=lbl;
  markDirty();toast('Plane '+lbl);
}
document.getElementById('pb-depthop').addEventListener('click',cycleDepthOp);

// Surface grid cycle — DOT → GRD → OFF (outline always stays)
function cycleSurfGrid(){
  _surfGridMode=(_surfGridMode+1)%3;
  var lbl=_surfGridLabels[_surfGridMode];
  var isOn=_surfGridMode>0;
  var tb=document.getElementById('bsurfgrid');if(tb){tb.textContent='Grid: '+lbl;tb.classList.toggle('on',isOn);}
  var pb=document.getElementById('pb-surfgrid');if(pb){pb.textContent=lbl;pb.classList.toggle('on',isOn);}
  applyFrostedGridTex();
  toast('Grid '+lbl);
}
document.getElementById('pb-surfgrid').addEventListener('click',cycleSurfGrid);

function togglePersp(){
  setOrtho(!useOrtho);
}
var _orthoLerp=null;
function setOrtho(on){
  if(on===useOrtho){return;}
  // Cancel any in-progress ortho lerp
  if(_orthoLerp){cancelAnimationFrame(_orthoLerp);_orthoLerp=null;}
  var CAM_FOV_HALF_TAN=Math.tan(27.5*Math.PI/180);
  var dur=400;
  var startT=performance.now();
  if(on){
    // Persp → Ortho: flip immediately, lerp zoom from perspective-matching to target
    useOrtho=true;
    var startZoom=cam.radius*CAM_FOV_HALF_TAN;
    var endZoom=orthoZoom; // current orthoZoom is the target (last saved value)
    orthoZoom=startZoom;
    syncOrtho();
    function stepToOrtho(){
      var t=Math.min(1,(performance.now()-startT)/dur);
      var e=t<1?t*(2-t):1;
      orthoZoom=startZoom+(endZoom-startZoom)*e;
      syncOrtho();updCam();markDirty();
      if(t<1){_orthoLerp=requestAnimationFrame(stepToOrtho);}
      else{_orthoLerp=null;orthoZoom=endZoom;syncOrtho();updCam();}
    }
    _orthoLerp=requestAnimationFrame(stepToOrtho);
  } else {
    // Ortho → Persp: keep ortho, lerp zoom toward persp-matching, flip at end
    var startZoom2=orthoZoom;
    var endZoom2=cam.radius*CAM_FOV_HALF_TAN;
    function stepToPersp(){
      var t=Math.min(1,(performance.now()-startT)/dur);
      var e=t<1?t*(2-t):1;
      orthoZoom=startZoom2+(endZoom2-startZoom2)*e;
      syncOrtho();updCam();markDirty();
      if(t<1){_orthoLerp=requestAnimationFrame(stepToPersp);}
      else{_orthoLerp=null;useOrtho=false;syncOrtho();updCam();}
    }
    _orthoLerp=requestAnimationFrame(stepToPersp);
  }
  var txt=on?'ORTHO':'PERSP';
  ['bpersp','nav-persp','pb-nav-persp'].forEach(function(id){
    var b=document.getElementById(id);
    if(b){b.textContent=txt;b.classList.toggle('on',on);}
  });
}
document.getElementById('nav-persp').addEventListener('click',togglePersp);
document.getElementById('pb-nav-persp').addEventListener('click',togglePersp);

// Narrow-bar delegates — scene toggles
document.getElementById('pb-depth').addEventListener('click',function(){document.getElementById('bdepth').click();});
document.getElementById('pb-surf').addEventListener('click',function(){document.getElementById('bsurf').click();});
document.getElementById('pb-grid').addEventListener('click',function(){document.getElementById('bgrid').click();});
document.getElementById('pb-axis').addEventListener('click',function(){document.getElementById('baxis').click();});
// Narrow-bar delegates — input modes
document.getElementById('pb-gestswap').addEventListener('click',function(){document.getElementById('bgestswap').click();});
document.getElementById('pb-stylus').addEventListener('click',function(){stylusOnly=!stylusOnly;updateStylusLabel();updateGestLabel();toast(stylusOnly?'Stylus mode: pen draws, finger navigates':'Stylus mode off');});
document.getElementById('bstylus').addEventListener('click',function(){stylusOnly=!stylusOnly;updateStylusLabel();updateGestLabel();toast(stylusOnly?'Stylus mode: pen draws, finger navigates':'Stylus mode off');});
// Narrow-bar delegates — actions
document.getElementById('pb-clear').addEventListener('click',function(){document.getElementById('bclear').click();});
document.getElementById('pb-bg').addEventListener('click',function(e){
  e.stopPropagation();
  var pop=document.getElementById('bgpop');
  var isOpen=pop.classList.toggle('open');
  document.getElementById('bbg').classList.toggle('on',isOpen);
  if(isOpen){
    var br=this.getBoundingClientRect();
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    var left=Math.max(4,Math.min(br.left,window.innerWidth-180*s));
    var top=br.top-54*s;
    if(top<4)top=br.bottom+4;
    pop.style.top=(top/s)+'px';pop.style.left=(left/s)+'px';
  }
});
document.getElementById('pb-new').addEventListener('click',function(e){e.stopPropagation();if(window._openExpMenu)window._openExpMenu(this);else document.getElementById('bnew').click();});
// Narrow-bar delegates — file operations
document.getElementById('pb-save').addEventListener('click',saveFile);
document.getElementById('pb-load').addEventListener('click',loadFile);
document.getElementById('pb-exp').addEventListener('click',function(e){
  e.stopPropagation();
  var menu=document.getElementById('expmenu');
  var open=menu.classList.toggle('vis');
  if(open){
    var br=this.getBoundingClientRect();
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    var mw=140*s;
    var left=Math.max(4,Math.min(br.left,window.innerWidth-mw-4));
    var top=br.top-150*s;
    if(top<4)top=br.bottom+4;
    menu.style.top=(top/s)+'px';
    menu.style.right='auto';
    menu.style.left=(left/s)+'px';
  }
});
document.getElementById('pb-png').addEventListener('click',expPNG);

// Hide UI
document.getElementById('bhide').addEventListener('click',function(){
  const hidden=document.body.classList.toggle('ui-hidden');
  // Swap icon between eye and eye-off
  this.innerHTML=hidden
    ?'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="12" y2="12"/><path d="M5 4.5Q6 4 7 4Q11 4 13 7Q10.5 9.8 7.5 10"/><path d="M1 7Q2.5 4.5 5 3.5"/><circle cx="7" cy="7" r="2" stroke-dasharray="1 2"/></svg>'
    :'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7Q3 4 7 4Q11 4 13 7Q11 10 7 10Q3 10 1 7Z"/><circle cx="7" cy="7" r="2"/></svg>';
  // Close strips when hiding UI so canvas is fully clear
  if(hidden){
    document.getElementById('pages').classList.remove('open');
    document.getElementById('views').classList.remove('open','recording-open','pages-also-open');
    document.body.classList.remove('pages-open','views-open');
    document.getElementById('pgbtn').classList.remove('on');
    document.getElementById('vwbtn').classList.remove('on');
    var pbp=document.getElementById('pb-pgbtn');if(pbp)pbp.classList.remove('on');
    var pbv=document.getElementById('pb-vwbtn');if(pbv)pbv.classList.remove('on');
  }
  // Float card: show/hide based on UI state and layout mode
  var _vvp2=window.visualViewport;
  var isNarrow=(window.FORCE_MOBILE||new URLSearchParams(window.location.search).get('mobile')==='1')||((_vvp2?_vvp2.width:window.innerWidth)/(_vvp2?_vvp2.height:window.innerHeight)<(2/3));
  var card=document.getElementById('pb-float-card');
  var fab=document.getElementById('pb-fab');
  if(hidden){
    // UI turning off: show float card in both narrow and tablet mode
    // Undock if currently docked (card must be floating when UI is off)
    if(card&&card.classList.contains('fc-docked-bottom')){
      card.classList.remove('fc-docked-bottom');
      card.style.left=(window._fcLastLeft||8)+'px';
      card.style.top=(window._fcLastTop||52)+'px';
      card.style.width=(window._fcLastW||Math.min(window.innerWidth-16,340))+'px';
      card.style.right='';card.style.bottom='';
      var db=document.getElementById('fc-dock-btn');
      if(db)db.textContent='⊞';
    }
    // In tablet mode: reparent panels into float card now
    // …unless the user has already detached sc-groups — those serve the role
    // of the float card and showing both would duplicate UI.
    if(!isNarrow&&!_scState.detached){
      _fcReparent();
      if(!window._fcEverActivated){window._fcEverActivated=true;}
    }
    if(!window._cardHidden&&!(_scState.detached&&!isNarrow)){
      if(card)card.classList.add('fc-visible');
      if(fab)fab.classList.remove('fab-visible');
    }
    // If wide + ui-hidden + detached: show detached cards (they're already visible
    // unless user hid them) and FAB if they were hidden.
    if(!isNarrow&&_scState.detached){
      applySidecol();
      _updateScFab();
    }
    setTimeout(_fcResizeCanvases,50);
  } else {
    // UI turning on: in tablet mode, hide float card and return panels to sidebar
    if(!isNarrow){
      if(card)card.classList.remove('fc-visible');
      if(fab)fab.classList.remove('fab-visible');
      window._cardHidden=false;
      _fcReturn();
    }
    // In narrow mode, card visibility is already managed by updateLayoutMode/narrow state
  }
  // Sync LCL float position to new ui-hidden state.
  // Docked path never called applySidecol(), so LCL would stay at its old
  // sg-bottom position and overlap the ≡ toggle. Call immediately on hide;
  // defer on show so sidecol layout is restored before measuring sg-bottom.
  if(hidden){positionLclFloat();}else{setTimeout(positionLclFloat,0);}
});

// ── Background color ──────────────────────────────────────────────
var BG_PRESETS={beige:'#cdb899',white:'#ffffff',black:'#2a2a2e'};
var _curBgKey='white';
function setBgColor(hex,key){
  var c=new THREE.Color(hex);
  scene.background=c;
  scene.fog.color=c;
  renderer.setClearColor(c,1);
  BG_COL.set(hex);
  if(_frostedMat)_frostedMat.color.set(hex);
  if(_fpsFrosted&&_fpsFrosted.material)_fpsFrosted.material.color.set(hex);
  document.documentElement.style.setProperty('--bg',hex);
  markDirty();
  // Sync swatch active state — both bgpop and view-pop
  _curBgKey=key||'custom';
  document.querySelectorAll('.bgpop-swatch').forEach(function(sw){sw.classList.remove('on');});
  var pick=document.getElementById('bgpop-pick');if(pick)pick.classList.remove('on');
  var vpPick=document.getElementById('vp-bgpick');if(vpPick)vpPick.classList.remove('on');
  if(key){
    var sw=document.getElementById('bgpop-'+key);if(sw)sw.classList.add('on');
    var vp=document.getElementById('vp-bg-'+key);if(vp)vp.classList.add('on');
  } else {
    if(pick)pick.classList.add('on');
    if(vpPick)vpPick.classList.add('on');
  }
  // Adapt grid/plane colors to match bg hue
  if(_uiTheme!=='eink'){
    _syncGridToBg(c);
  }
  var cwBg=document.getElementById('cw-bg');
  if(cwBg){
    cwBg.style.background=hex;
    cwBg.dataset.c=hex;
  }
  // Sync theme selector if exists
  _syncThemeBtns();
}
(function(){
  var btn=document.getElementById('bbg');
  var pop=document.getElementById('bgpop');
  if(!btn||!pop)return;
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var isOpen=pop.classList.toggle('open');
    btn.classList.toggle('on',isOpen);
    if(isOpen){
      var br=btn.getBoundingClientRect();
      var left=Math.max(4,Math.min(br.left,window.innerWidth-180));
      var top=br.bottom+4;
      if(top+50>window.innerHeight)top=br.top-54;
      pop.style.top=top+'px';pop.style.left=left+'px';
    }
  });
  document.getElementById('bgpop-beige').addEventListener('click',function(){setBgColor('#cdb899','beige');});
  document.getElementById('bgpop-white').addEventListener('click',function(){setBgColor('#ffffff','white');});
  document.getElementById('bgpop-black').addEventListener('click',function(){setBgColor('#2a2a2e','black');});
  var customInput=document.getElementById('bgpop-custom');
  if(customInput)customInput.addEventListener('input',function(){setBgColor(this.value,null);});
  document.addEventListener('click',function(e){
    if(pop.classList.contains('open')&&!pop.contains(e.target)&&e.target!==btn){
      pop.classList.remove('open');btn.classList.remove('on');
    }
  });
})();

// ── UI Theme buttons wiring ──────────────────────────────────────
function _syncThemeBtns(){
  document.querySelectorAll('.theme-btn').forEach(function(b){
    b.classList.toggle('on',b.getAttribute('data-theme')===_uiTheme);
  });
}
document.querySelectorAll('.theme-btn').forEach(function(b){
  b.addEventListener('click',function(e){
    e.stopPropagation();
    var th=b.getAttribute('data-theme');
    setUITheme(th);
    _syncThemeBtns();
    if(th==='eink'){
      setBgColor('#ffffff','eink');
    }
  });
});

// ── UI Scale Management ──────────────────────────────────────────
window.getUiScale = function() {
  var v = parseFloat(document.documentElement.style.getPropertyValue('--ui-scale'));
  return (!isNaN(v) && v > 0) ? v : 1.0;
};

window.setUiScale = function(scale, showNotification) {
  scale = Math.max(0.70, Math.min(2.0, Math.round(scale * 100) / 100));
  document.documentElement.style.setProperty('--ui-scale', String(scale));
  document.body.setAttribute('data-ui-scale', String(scale));
  try {
    localStorage.setItem('sk3d_ui_scale', String(scale));
  } catch(e) {}

  var pct = Math.round(scale * 100) + '%';
  var lbl = document.getElementById('vp-scale-label');
  if (lbl) lbl.textContent = pct;

  document.querySelectorAll('.ui-scale-preset').forEach(function(btn) {
    var val = parseFloat(btn.getAttribute('data-scale'));
    btn.classList.toggle('on', Math.abs(val - scale) < 0.04);
  });

  // Re-sync narrow-bar unscaled height
  var pb = document.getElementById('narrow-bar');
  if (pb && pb.classList.contains('active')) {
    var h = pb.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--pb-h', (h / scale) + 'px');
  }

  if (typeof applySidecol === 'function') applySidecol();
  if (typeof applyMergedNavLayout === 'function') applyMergedNavLayout();
  if (typeof _fcResizeCanvases === 'function') _fcResizeCanvases();
  if (typeof positionStab === 'function') positionStab();
  if (typeof positionLclFloat === 'function') positionLclFloat();
  if (typeof _syncRenderer === 'function') _syncRenderer();
  if (typeof markDirty === 'function') markDirty();

  if (showNotification && typeof toast === 'function') {
    toast('UI Scale: ' + pct);
  }
};

(function(){
  // Load saved UI scale
  var saved = null;
  try { saved = localStorage.getItem('sk3d_ui_scale'); } catch(e) {}
  if (saved) {
    var val = parseFloat(saved);
    if (!isNaN(val) && val >= 0.7 && val <= 2.0) {
      window.setUiScale(val, false);
    }
  }

  var btnDec = document.getElementById('vp-scale-dec');
  var btnInc = document.getElementById('vp-scale-inc');

  if (btnDec) {
    btnDec.addEventListener('click', function(e){
      e.stopPropagation();
      var cur = window.getUiScale();
      window.setUiScale(cur - 0.10, true);
    });
  }
  if (btnInc) {
    btnInc.addEventListener('click', function(e){
      e.stopPropagation();
      var cur = window.getUiScale();
      window.setUiScale(cur + 0.10, true);
    });
  }

  document.querySelectorAll('.ui-scale-preset').forEach(function(b){
    b.addEventListener('click', function(e){
      e.stopPropagation();
      var s = parseFloat(b.getAttribute('data-scale')) || 1.0;
      window.setUiScale(s, true);
    });
  });

  // Keyboard shortcuts: Ctrl+Alt+= (grow), Ctrl+Alt+- (shrink), Ctrl+Alt+0 (reset)
  document.addEventListener('keydown', function(e){
    if ((e.ctrlKey || e.metaKey) && e.altKey) {
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        window.setUiScale(window.getUiScale() + 0.10, true);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        window.setUiScale(window.getUiScale() - 0.10, true);
      } else if (e.key === '0') {
        e.preventDefault();
        window.setUiScale(1.0, true);
      }
    }
  });

  // Topbar smooth touch/drag swipe scroll support
  var tb = document.getElementById('topbar');
  if(tb){
    var isPointerDown = false;
    var startX = 0;
    var scrollStart = 0;
    var hasMoved = false;

    tb.addEventListener('pointerdown', function(e){
      if(e.button > 1) return;
      isPointerDown = true;
      startX = e.clientX;
      scrollStart = tb.scrollLeft;
      hasMoved = false;
    }, {passive: true});

    window.addEventListener('pointermove', function(e){
      if(!isPointerDown) return;
      var s = typeof window.getUiScale === 'function' ? window.getUiScale() : 1.0;
      var dx = (e.clientX - startX) / s;
      if(Math.abs(dx) > 3){
        hasMoved = true;
        tb.scrollLeft = scrollStart - dx;
      }
    }, {passive: true});

    window.addEventListener('pointerup', function(e){
      if(isPointerDown && hasMoved){
        var suppressClick = function(ce){
          ce.stopPropagation();
          ce.preventDefault();
        };
        window.addEventListener('click', suppressClick, {capture: true, once: true});
        setTimeout(function(){
          window.removeEventListener('click', suppressClick, {capture: true});
        }, 100);
      }
      isPointerDown = false;
      hasMoved = false;
    }, {passive: true});

    window.addEventListener('pointercancel', function(){
      isPointerDown = false;
      hasMoved = false;
    }, {passive: true});
  }
})();

// ── View toggle (tap=all on/off, long-press=popover) ─────────────
(function(){
  var btn=document.getElementById('bview-toggle');
  var arrow=document.getElementById('bview-arrow');
  var pop=document.getElementById('view-pop');
  if(!btn||!pop)return;
  // Track individual saved states for restore
  var _viewSaved={surf:true,grid:true,axis:true,depth:true};
  var _viewAllOn=true;

  function syncToggleIcon(){
    var anyOn=surfGroup.visible||gridH.visible||axisLinesOn||depthCuesOn;
    btn.classList.toggle('on',anyOn);
  }

  function openPop(){
    // Sync .on states with current visibility
    document.getElementById('bsurf').classList.toggle('on',surfGroup.visible);
    document.getElementById('bgrid').classList.toggle('on',gridH.visible);
    document.getElementById('baxis').classList.toggle('on',axisLinesOn);
    document.getElementById('bdepth').classList.toggle('on',depthCuesOn);
    var bnavMerge=document.getElementById('bnav-merge');
    if(bnavMerge)bnavMerge.classList.toggle('on',typeof _scState!=='undefined'&&!!_scState.mergedNav);
    pop.classList.add('open');
    var br=(arrow||btn).getBoundingClientRect();
    var s = typeof window.getUiScale==='function'?window.getUiScale():1.0;
    pop.style.top=((br.bottom+4)/s)+'px';
    pop.style.left=(Math.max(4,Math.min(br.left,window.innerWidth-pop.getBoundingClientRect().width-4))/s)+'px';
    if(arrow)arrow.classList.add('on');
  }
  function closePop(){pop.classList.remove('open');if(arrow)arrow.classList.remove('on');}

  // Tap eye: toggle all 4 on/off
  function tapToggle(){
    var anyOn=surfGroup.visible||gridH.visible||axisLinesOn||depthCuesOn;
    if(anyOn){
      // Save current states, then turn all off
      _viewSaved.surf=surfGroup.visible;
      _viewSaved.grid=gridH.visible;
      _viewSaved.axis=axisLinesOn;
      _viewSaved.depth=depthCuesOn;
      _viewAllOn=false;
      surfGroup.visible=false;gridH.visible=false;
      axisLinesOn=false;axisGroup.visible=false;
      depthCuesOn=false;
      if(_frostedMesh)_frostedMesh.visible=false;
      if(_frostedGridMesh)_frostedGridMesh.visible=false;
      if(window._syncFpsDepth)window._syncFpsDepth();
    } else {
      // Restore saved states
      surfGroup.visible=_viewSaved.surf;
      gridH.visible=_viewSaved.grid;
      axisLinesOn=_viewSaved.axis;axisGroup.visible=_viewSaved.axis;
      depthCuesOn=_viewSaved.depth;
      if(_frostedMesh)_frostedMesh.visible=depthCuesOn;
      if(_frostedGridMesh)_frostedGridMesh.visible=depthCuesOn&&_surfGridMode>0;
      if(window._syncFpsDepth)window._syncFpsDepth();
      _viewAllOn=true;
    }
    // Sync all buttons
    document.getElementById('bsurf').classList.toggle('on',surfGroup.visible);
    document.getElementById('bgrid').classList.toggle('on',gridH.visible);
    document.getElementById('baxis').classList.toggle('on',axisLinesOn);
    document.getElementById('bdepth').classList.toggle('on',depthCuesOn);
    var pb;
    pb=document.getElementById('pb-surf');if(pb)pb.classList.toggle('on',surfGroup.visible);
    pb=document.getElementById('pb-grid');if(pb)pb.classList.toggle('on',gridH.visible);
    pb=document.getElementById('pb-axis');if(pb)pb.classList.toggle('on',axisLinesOn);
    pb=document.getElementById('pb-depth');if(pb)pb.classList.toggle('on',depthCuesOn);
    syncToggleIcon();
    markDirty();
    toast(anyOn?'View off':'View on');
  }

  // Eye icon tap = toggle all
  btn.addEventListener('click',function(e){e.stopPropagation();tapToggle();});

  // Arrow button = open/close popover
  if(arrow){
    arrow.addEventListener('click',function(e){
      e.stopPropagation();
      if(pop.classList.contains('open')){closePop();}
      else{openPop();}
    });
  }

  // Close popover when tapping canvas (starting a draw/orbit action)
  renderer.domElement.addEventListener('pointerdown',function(){
    if(pop.classList.contains('open'))closePop();
  });

  function _syncAllPlaneButtons(isVis) {
    document.querySelectorAll('#bsurf, #pb-surf, #ghud-hide-surf, #pb-hide-surf, #stg-surf, #nav-toggle-plane').forEach(function(b) {
      if (!b) return;
      b.classList.toggle('on', isVis);
      if (b.id === 'nav-toggle-plane' || b.id === 'ghud-hide-surf' || b.id === 'pb-hide-surf') {
        b.textContent = isVis ? 'Plane: ON' : 'Plane: OFF';
      }
    });
  }
  window._syncAllPlaneButtons = _syncAllPlaneButtons;

  function _togglePlaneVis() {
    surfGroup.visible = !surfGroup.visible;
    _syncAllPlaneButtons(surfGroup.visible);
    if (typeof syncStagePop === 'function') syncStagePop();
    syncToggleIcon();
    markDirty();
    if (window.toast) window.toast(surfGroup.visible ? 'Drawing Plane: Visible' : 'Drawing Plane: Hidden');
  }
  window._togglePlaneVis = _togglePlaneVis;

  document.getElementById('bsurf').addEventListener('click', function(e) {
    e.stopPropagation();
    _togglePlaneVis();
  });
  var navTogPlane = document.getElementById('nav-toggle-plane');
  if (navTogPlane) {
    navTogPlane.addEventListener('click', function(e) {
      e.stopPropagation();
      _togglePlaneVis();
    });
  }
  var ghudHideSurf = document.getElementById('ghud-hide-surf');
  if (ghudHideSurf) {
    ghudHideSurf.addEventListener('click', function(e) {
      e.stopPropagation();
      _togglePlaneVis();
    });
  }
  document.getElementById('bgrid').addEventListener('click',function(e){
    e.stopPropagation();
    gridH.visible=!gridH.visible;
    this.classList.toggle('on',gridH.visible);
    var pb=document.getElementById('pb-grid');if(pb)pb.classList.toggle('on',gridH.visible);
    syncToggleIcon();markDirty();
  });
  document.getElementById('baxis').addEventListener('click',function(e){
    e.stopPropagation();
    toggleAxis(!axisLinesOn);
    syncToggleIcon();
  });
  document.getElementById('bdepth').addEventListener('click',function(e){
    e.stopPropagation();
    depthCuesOn=!depthCuesOn;
    this.classList.toggle('on',depthCuesOn);
    var pb=document.getElementById('pb-depth');if(pb)pb.classList.toggle('on',depthCuesOn);
    if(_frostedMesh)_frostedMesh.visible=depthCuesOn;
    if(_frostedGridMesh)_frostedGridMesh.visible=depthCuesOn&&_surfGridMode>0;
    if(window._syncFpsDepth)window._syncFpsDepth();
    syncToggleIcon();markDirty();
    toast(depthCuesOn?'Depth on':'Depth off');
  });
  document.getElementById('bdepth-op').addEventListener('click',function(e){
    e.stopPropagation();cycleDepthOp();
  });
  document.getElementById('bsurfgrid').addEventListener('click',function(e){
    e.stopPropagation();cycleSurfGrid();
  });
  document.getElementById('bpersp').addEventListener('click',function(e){
    e.stopPropagation();togglePersp();
    this.textContent=useOrtho?'ORTHO':'PERSP';
  });
  document.getElementById('bgestswap').addEventListener('click',function(e){
    e.stopPropagation();
    twoFingerMode=twoFingerMode==='orbit'?'pan':'orbit';
    updateGestLabel();
    if(stylusOnly){
      toast('1-finger = '+(twoFingerMode==='orbit'?'orbit':'pan'));
    } else {
      toast('2-finger = '+(twoFingerMode==='orbit'?'orbit':'pan'));
    }
  });
  // Merged dual navigator toggle
  var bnavMerge=document.getElementById('bnav-merge');
  if(bnavMerge){
    bnavMerge.addEventListener('click',function(e){
      e.stopPropagation();
      _scState.mergedNav=!_scState.mergedNav;
      _saveScState();
      if(window._applyMergedNavLayout)window._applyMergedNavLayout();
      bnavMerge.classList.toggle('on',_scState.mergedNav);
      toast(_scState.mergedNav?'Merged Navigator ON':'Stacked Navigator ON');
    });
  }
  // Scale overlay toggle
  document.getElementById('bscaleoverlay').addEventListener('click',function(e){
    e.stopPropagation();
    toggleGraphicScale(!_gscaleOn);
    toast(_gscaleOn?'Scale cage on':'Scale cage off');
  });
  // Scale select — opens scale picker
  document.getElementById('bscaleselect').addEventListener('click',function(e){
    e.stopPropagation();
    openScalePicker(this);
  });
  // View-pop BG swatches
  document.getElementById('vp-bg-beige').addEventListener('click',function(e){e.stopPropagation();setBgColor('#cdb899','beige');});
  document.getElementById('vp-bg-white').addEventListener('click',function(e){e.stopPropagation();setBgColor('#ffffff','white');});
  document.getElementById('vp-bg-black').addEventListener('click',function(e){e.stopPropagation();setBgColor('#2a2a2e','black');});
  var vpCustom=document.getElementById('vp-bg-custom');
  if(vpCustom)vpCustom.addEventListener('input',function(e){e.stopPropagation();setBgColor(this.value,null);});

  // Close popover on outside click (but not on view-pop itself or toggle buttons)
  document.addEventListener('click',function(e){
    if(pop.classList.contains('open')&&!pop.contains(e.target)&&e.target!==btn&&e.target!==arrow&&!btn.contains(e.target)&&!(arrow&&arrow.contains(e.target))){
      closePop();
    }
  });
  // Also close view-pop in newScene
  window._closeViewPop=closePop;
  window._syncViewToggle=syncToggleIcon;
})();

// ── Scale Picker popup ───────────────────────────────────────────
(function(){
  var pop=document.getElementById('scale-pop');
  if(!pop)return;
  // Build items — show "1 sq = Xm" for each scale
  var html='<div class="sp-hdr">1 SQUARE =</div>';
  for(var i=0;i<SCALE_LABELS.length;i++){
    var lbl=SCALE_LABELS[i];
    var displayLbl=i===0?'OFF':'1 sq = '+lbl;
    var cls='sp-item'+(i===exportScaleIdx?' active':'');
    html+='<button class="'+cls+'" data-si="'+i+'">'+displayLbl+'</button>';
  }
  pop.innerHTML=html;

  function syncActive(){
    pop.querySelectorAll('.sp-item').forEach(function(b){
      b.classList.toggle('active',parseInt(b.dataset.si)===exportScaleIdx);
    });
    var isOff=SCALE_STEPS[exportScaleIdx]===null;
    var sqLbl=isOff?'OFF':'1 sq = '+SCALE_LABELS[exportScaleIdx];
    // Sync the view-pop label
    var lbl=document.getElementById('bscaleselect');
    if(lbl)lbl.textContent=sqLbl;
    // Sync em-scale in file menu
    var em=document.getElementById('em-scale');
    if(em){
      em.textContent='Scale: '+(isOff?'OFF':SCALE_LABELS[exportScaleIdx]);
      em.style.opacity=isOff?'0.45':'';
    }
  }

  pop.addEventListener('click',function(e){
    var btn=e.target.closest('.sp-item');
    if(!btn)return;
    e.stopPropagation();
    var idx=parseInt(btn.dataset.si);
    exportScaleIdx=idx;
    syncActive();
    buildScaleBar();updateScaleBarLabel();
    if(_gscaleOn)updateScaleCage();
    // Sync hidden bscale
    var bs=document.getElementById('bscale');
    if(bs){var isOff=SCALE_STEPS[idx]===null;bs.textContent=SCALE_LABELS[idx];bs.style.opacity=isOff?'0.45':'';bs.classList.toggle('on',!isOff);}
    toast(SCALE_STEPS[idx]===null?'Scale off':'1 sq = '+SCALE_LABELS[idx]);
    closeScalePicker();
  });

  function closeScalePicker(){pop.classList.remove('open');}

  window.openScalePicker=function(anchor){
    syncActive();
    pop.classList.add('open');
    var br=anchor.getBoundingClientRect();
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    // Position to the right of the anchor or below
    var left=br.right+6;
    var top=br.top;
    // If goes off right edge, position below
    if(left+120*s>window.innerWidth){left=Math.max(4,br.left);top=br.bottom+4;}
    // If goes off bottom, scroll up
    if(top+320*s>window.innerHeight)top=Math.max(4,window.innerHeight-324*s);
    pop.style.top=(top/s)+'px';
    pop.style.left=(left/s)+'px';
  };
  window.closeScalePicker=closeScalePicker;

  // Close on outside click
  document.addEventListener('click',function(e){
    if(pop.classList.contains('open')&&!pop.contains(e.target)){
      closeScalePicker();
    }
  });
  // Close on canvas tap
  renderer.domElement.addEventListener('pointerdown',function(){
    if(pop.classList.contains('open'))closeScalePicker();
  });
})();

// ── Look around & Pan buttons ───────────────────────────────────
(function(){
  var btn=document.getElementById('blook');
  if(btn){
    btn.addEventListener('click',function(){
      if(mode==='orbit'){
        // Return to previous draw mode
        setMode(prevDrawMode||'draw');
        btn.classList.remove('on');
      } else {
        // Enter look-around mode (orbit)
        setMode('orbit');
        btn.classList.add('on');
      }
    });
  }

  var panBtn=document.getElementById('bpan-tb');
  if(panBtn){
    panBtn.addEventListener('click',function(e){
      e.stopPropagation();
      if(mode==='pan'){
        setMode(prevDrawMode||'draw');
        panBtn.classList.remove('on');
      } else {
        setMode('pan');
        panBtn.classList.add('on');
      }
    });
  }

  // Keep look and pan buttons in sync when mode changes from other sources (keyboard, etc.)
  window._syncLookBtn=function(){
    if(btn)btn.classList.toggle('on',mode==='orbit');
    if(panBtn)panBtn.classList.toggle('on',mode==='pan');
  };
})();

// ── File menu button ─────────────────────────────────────────────
(function(){
  var btn=document.getElementById('bfile');
  if(!btn)return;
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var menu=document.getElementById('expmenu');
    var open=menu.classList.toggle('vis');
    if(open){
      var br=btn.getBoundingClientRect();
      var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
      var mw=160*s;
      var left=Math.max(4,Math.min(br.left,window.innerWidth-mw-4));
      var top=br.bottom+4;
      if(top+300*s>window.innerHeight)top=br.top-4;
      menu.style.top=(top/s)+'px';
      menu.style.right='auto';
      menu.style.left=(left/s)+'px';
    }
  });
  // Wire topbar and file menu items
  var bsaveTb=document.getElementById('bsave-tb');if(bsaveTb)bsaveTb.addEventListener('click',saveFile);
  var bloadTb=document.getElementById('bload-tb');if(bloadTb)bloadTb.addEventListener('click',loadFile);
  document.getElementById('em-save').addEventListener('click',function(){document.getElementById('expmenu').classList.remove('vis');saveFile();});
  document.getElementById('em-load').addEventListener('click',function(){document.getElementById('expmenu').classList.remove('vis');loadFile();});
  document.getElementById('em-png').addEventListener('click',function(){document.getElementById('expmenu').classList.remove('vis');expPNG();});
  document.getElementById('em-svg').addEventListener('click',function(){document.getElementById('expmenu').classList.remove('vis');promptExportName('sketch3d','.svg',expSVG);});
  var emScale=document.getElementById('em-scale');
  var _emScaleLpTimer=null;
  var _emScaleDidLp=false;
  emScale.addEventListener('pointerdown',function(e){
    _emScaleDidLp=false;
    var self=this;
    _emScaleLpTimer=setTimeout(function(){
      _emScaleDidLp=true;
      document.getElementById('expmenu').classList.remove('vis');
      openScalePicker(self);
    },400);
  });
  emScale.addEventListener('pointerup',function(){clearTimeout(_emScaleLpTimer);});
  emScale.addEventListener('pointercancel',function(){clearTimeout(_emScaleLpTimer);});
  emScale.addEventListener('contextmenu',function(e){e.preventDefault();});
  emScale.addEventListener('click',function(e){
    if(_emScaleDidLp){_emScaleDidLp=false;return;}
    e.stopPropagation();
    exportScaleIdx=(exportScaleIdx+1)%SCALE_STEPS.length;
    var lbl=SCALE_LABELS[exportScaleIdx];
    var isOff=SCALE_STEPS[exportScaleIdx]===null;
    this.textContent='Scale: '+(isOff?'OFF':lbl);
    this.style.opacity=isOff?'0.45':'';
    // Sync hidden bscale element
    var bs=document.getElementById('bscale');
    if(bs){bs.textContent=isOff?'OFF':lbl;bs.style.opacity=isOff?'0.45':'';bs.classList.toggle('on',!isOff);}
    // Sync view-pop label
    var vps=document.getElementById('bscaleselect');
    if(vps)vps.textContent=isOff?'OFF':'1 sq = '+lbl;
    buildScaleBar();updateScaleBarLabel();
    if(_gscaleOn)updateScaleCage();
    toast(isOff?'Scale off':'1 sq = '+lbl);
  });
})();

// ── New Scene ─────────────────────────────────────────────────────
function newScene(){
  // ── Cancel recording if active ──
  if(_recState)stopRecordViews(true);
  // ── Exit FPS mode if active ──
  if(_fpsMode&&window._exitFps)window._exitFps();
  // ── Reset navState to NavCube (fixes stale JOY/FPS label) ──
  if(window._resetNavState)window._resetNavState();
  // ── Exit hidden-UI mode ──
  if(document.body.classList.contains('ui-hidden')){
    document.getElementById('bhide').click();
  }
  // ── Close any open strips ──
  document.getElementById('pages').classList.remove('open');
  document.getElementById('views').classList.remove('open','recording-open','pages-also-open');
  document.body.classList.remove('pages-open','views-open');
  document.getElementById('pgbtn').classList.remove('on');
  document.getElementById('vwbtn').classList.remove('on');
  var _pbp=document.getElementById('pb-pgbtn');if(_pbp)_pbp.classList.remove('on');
  var _pbv=document.getElementById('pb-vwbtn');if(_pbv)_pbv.classList.remove('on');
  var _hvb=document.getElementById('bviews-hidden');if(_hvb)_hvb.classList.remove('on');
  // ── Close any open popovers / menus ──
  document.querySelectorAll('#bgpop,#sz-pop,#op-pop,#fx-pop,#layers-pop,#prims-pop,#prim-bar,#view-pop,#scale-pop,#ruler-pop').forEach(function(p){p.classList.remove('open');});
  document.querySelectorAll('.cyc-pop').forEach(function(p){p.classList.remove('open');});
  var _exm=document.getElementById('expmenu');if(_exm)_exm.classList.remove('vis');
  document.getElementById('bbg').classList.remove('on');
  // ── Hide align-to-view slider ──
  if(window._hideGviewSlider)window._hideGviewSlider();
  // ── Reset page/view edit mode ──
  _pgEditMode=false;_pgEditIdx=-1;
  _vwEditMode=false;_vwEditIdx=-1;
  // ── Reset strokes + undo ──
  clearAll();
  _redoStack.length=0;redoStack.length=0;
  // ── Clear primitives ──
  if(window._clearAllPrimitives)window._clearAllPrimitives();
  if(window._closePrimsStrip)window._closePrimsStrip();
  // ── Reset pages ──
  pages.length=0;curPage=0;
  pages.push({strokes:[],thumb:null,views:[],primitives:[]});
  refreshPageStrip();refreshViewStrip();
  // ── Clear loft ──
  if(window._loftGeo){window._loftGeo.dispose();window._loftGeo=null;}
  window._loftCen=null;
  // ── Reset depth / frosted state before buildSurf ──
  depthCuesOn=true;
  document.querySelectorAll('#bdepth,#pb-depth').forEach(function(b){if(b)b.classList.add('on');});
  _depthOpIdx=0;
  var _bdop=document.getElementById('bdepth-op');if(_bdop)_bdop.textContent='Depth: '+_depthOpLabels[0];
  var _pbdop=document.getElementById('pb-depthop');if(_pbdop)_pbdop.textContent=_depthOpLabels[0];
  _surfGridMode=2;
  var _bsg=document.getElementById('bsurfgrid');if(_bsg){_bsg.textContent='Grid: '+_surfGridLabels[2];}
  var _pbsg=document.getElementById('pb-surfgrid');if(_pbsg)_pbsg.textContent=_surfGridLabels[2];
  // ── Reset surface to default plane XZ ──
  surfType='plane';curPlane='xz';
  surfPos.set(0,0,0);surfEuler.set(0,0,0);surfScale=1;surfScaleAxes.set(1,1,1);
  surfGroup.visible=true;
  buildSurf();
  document.querySelectorAll('[data-surf]').forEach(function(b){b.classList.toggle('on',b.dataset.surf==='plane');});
  document.querySelectorAll('[data-plane]').forEach(function(b){b.classList.toggle('on',b.dataset.plane==='xz');});
  ['pb-cyc-plane','pb-cyc-plane2','sb-cyc-plane'].forEach(function(id){
    var b=document.getElementById(id);if(b)b.textContent='Front';
  });
  ['pb-cyc-surf','pb-cyc-surf2','sb-cyc-surf'].forEach(function(id){
    var b=document.getElementById(id);if(b)b.textContent='Pln';
  });
  var bsurf=document.getElementById('bsurf');if(bsurf)bsurf.classList.add('on');
  // ── Reset grid + axis visibility ──
  gridH.visible=true;
  document.querySelectorAll('#bgrid,#pb-grid').forEach(function(b){if(b)b.classList.add('on');});
  axisLinesOn=true;axisGroup.visible=true;
  document.querySelectorAll('#baxis,#pb-axis').forEach(function(b){if(b)b.classList.add('on');});
  // ── Reset export scale to OFF ──
  exportScaleIdx=0;
  scaleBarGroup.visible=false;_sbMesh.visible=false;
  // ── Reset brush toggles ──
  flatBrush=true;thinPaint=false;
  document.querySelectorAll('#sflat,#pb-flat,#scx-flat').forEach(function(b){if(b)b.classList.add('on');});
  document.querySelectorAll('#sthin,#pb-thin,#scx-thin').forEach(function(b){if(b)b.classList.remove('on');});
  _gscaleOn=false;_gscaleGroup.visible=false;_gscaleLastIdx=-1;
  var _bso=document.getElementById('bscaleoverlay');if(_bso)_bso.classList.remove('on');
  var _bss=document.getElementById('bscaleselect');if(_bss)_bss.textContent='OFF';
  if(window.closeScalePicker)closeScalePicker();
  var _bscale=document.getElementById('bscale');
  if(_bscale){_bscale.textContent='OFF';_bscale.style.opacity='0.45';_bscale.classList.remove('on');}
  // ── Reset camera ──
  cam.theta=-Math.PI/2;cam.phi=Math.PI/2;cam.radius=10;cam.target.set(0,0,0);
  useOrtho=false;orthoZoom=8;
  document.querySelectorAll('#bpersp,#nav-persp,#pb-nav-persp').forEach(function(b){if(b){b.classList.remove('on');b.textContent='PERSP';}});
  updCam();
  // ── Reset bg color to light studio and theme to default ──
  setBgColor('#f5f7f9','white');
  setUITheme('default');
  _syncThemeBtns();
  // ── Reset mode + brush ──
  setMode('draw');
  if(window._applySize) window._applySize(1);
  if(window._applyOpacity) window._applyOpacity(95);
  // ── Reset brush toggles ──
  flatBrush=false;
  document.querySelectorAll('#sflat,#pb-flat,#scx-flat').forEach(function(b){if(b)b.classList.remove('on');});
  smoothingOn=false;LAZY=LAZY_OFF;
  document.querySelectorAll('#ssmooth,#pb-smooth,#scx-smooth').forEach(function(b){if(b)b.classList.remove('on');});
  velocityTaper=true;
  document.querySelectorAll('#svel,#pb-vel,#scx-vel').forEach(function(b){if(b)b.classList.add('on');});
  // ── Reset color to black ──
  setBrushColor('#000000', false);
  // ── Reset 2-finger gesture mode ──
  twoFingerMode='orbit';
  updateGestLabel();
  // ── Reset snap to ON ──
  if(window._setSnapEnabled)window._setSnapEnabled(true);
  // ── Reset layers ──
  setActiveLayer(1);
  for(var i=0;i<4;i++){layerVisible[i]=true;}
  applyLayerVisibility();
  showMergeLayerRow(false);
  // ── Reset ruler ──
  if(window._rulerToggle&&window._rulerIsOn&&window._rulerIsOn())window._rulerToggle();
  // ── Reset gizmo scale toggles ──
  if(window._resetGcScale)window._resetGcScale();
  if(window._resetSgScaleMode)window._resetSgScaleMode();
  // ── Clear IDB autosave ──
  try{idbSave(JSON.stringify(sceneData()));}catch(e){}
  // ── Sync view toggle + popover labels ──
  if(window._syncViewToggle)window._syncViewToggle();
  var _vpersp=document.getElementById('bpersp');if(_vpersp)_vpersp.textContent='PERSP';
  twoFingerMode='orbit';updateGestLabel();
  var _emsc=document.getElementById('em-scale');if(_emsc){_emsc.textContent='Scale: OFF';_emsc.style.opacity='0.45';}
  toast('New scene');
}
(function(){
  var modal=document.getElementById('new-scene-modal');
  function showModal(){modal.classList.add('vis');}
  function hideModal(){modal.classList.remove('vis');}
  document.getElementById('bnew').addEventListener('click',function(){
    if(strokes.length===0&&pages.length<=1){newScene();return;}
    showModal();
  });
  document.getElementById('nsm-save').addEventListener('click',function(){
    hideModal();saveFileWithName('sketch3d',newScene);
  });
  document.getElementById('nsm-discard').addEventListener('click',function(){
    hideModal();newScene();
  });
  var nsmLoad=document.getElementById('nsm-load');
  if(nsmLoad)nsmLoad.addEventListener('click',function(){
    hideModal();loadFile();
  });
  document.getElementById('nsm-cancel').addEventListener('click',hideModal);
  modal.addEventListener('click',function(e){if(e.target===modal)hideModal();});
})();
(function(){
  var snmod=document.getElementById('save-name-modal');
  var inp=document.getElementById('save-name-input');
  function hideSnm(){snmod.classList.remove('vis');}
  function confirm(){
    var name=inp.value.trim()||'sketch3d';
    var cb=snmod._onComplete;
    snmod._onComplete=null;
    hideSnm();
    _doSaveFile(name);
    if(cb)cb();
  }
  function cancel(){
    snmod._onComplete=null;
    hideSnm();
  }
  document.getElementById('snm-save').addEventListener('click',confirm);
  document.getElementById('snm-cancel').addEventListener('click',cancel);
  snmod.addEventListener('click',function(e){if(e.target===snmod)cancel();});
  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'){confirm();}
    if(e.key==='Escape'){cancel();}
  });
})();
// ── Export name modal handler ──
(function(){
  var enmod=document.getElementById('export-name-modal');
  var inp=document.getElementById('export-name-input');
  function hideEnm(){enmod.classList.remove('vis');}
  function confirm(){
    var name=inp.value.trim()||'sketch3d';
    var cb=enmod._expCallback;
    enmod._expCallback=null;
    hideEnm();
    if(cb)cb(name);
  }
  function cancel(){
    enmod._expCallback=null;
    hideEnm();
  }
  document.getElementById('enm-export').addEventListener('click',confirm);
  document.getElementById('enm-cancel').addEventListener('click',cancel);
  enmod.addEventListener('click',function(e){if(e.target===enmod)cancel();});
  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'){confirm();}
    if(e.key==='Escape'){cancel();}
  });
})();
document.addEventListener('click',()=>document.getElementById('expmenu').classList.remove('vis'));
document.getElementById('expmenu').addEventListener('click',e=>e.stopPropagation());
document.getElementById('exgltf').addEventListener('click',()=>{document.getElementById('expmenu').classList.remove('vis');promptExportName('sketch3d','.glb',expGLTF);});
document.getElementById('exobj').addEventListener('click',()=>{document.getElementById('expmenu').classList.remove('vis');promptExportName('sketch3d','.obj',expOBJ);});
document.getElementById('exusd').addEventListener('click',()=>{document.getElementById('expmenu').classList.remove('vis');promptExportName('sketch3d','.usda',expUSD);});
document.getElementById('exusdz').addEventListener('click',()=>{document.getElementById('expmenu').classList.remove('vis');promptExportName('sketch3d','.usdz',expUSDZ);});
var _exJson=document.getElementById('exjson');if(_exJson)_exJson.addEventListener('click',()=>{document.getElementById('expmenu').classList.remove('vis');saveFile();});
document.getElementById('exrecord').addEventListener('click',function(){document.getElementById('expmenu').classList.remove('vis');startRecordViews();});
document.getElementById('vw-rec').addEventListener('click',function(){startRecordViews();});
document.getElementById('rec-stop-btn').addEventListener('click',function(){stopRecordViews(false);});

// Surface / plane
document.querySelectorAll('[data-plane]').forEach(b=>b.addEventListener('click',function(){document.querySelectorAll('[data-plane]').forEach(x=>x.classList.remove('on'));this.classList.add('on');curPlane=this.dataset.plane;if(surfFillMat)surfFillMat.color.setHex(_activeSurfTrace());if(surfWireMat)surfWireMat.color.setHex(_activeSurfTrace());syncSurf();}));
document.querySelectorAll('[data-surf]').forEach(b=>b.addEventListener('click',function(){document.querySelectorAll('[data-surf]').forEach(x=>x.classList.remove('on'));this.classList.add('on');if(window._applySurfType)window._applySurfType(this.dataset.surf);}));

// Colors
function setBrushColor(col, isCustom){
  if(!col) return;
  curColor = col;

  var dot = document.getElementById('cur-color-dot');
  if(dot) dot.style.background = col;
  var popPrev = document.getElementById('pop-color-preview');
  if(popPrev) popPrev.style.background = col;
  var popHex = document.getElementById('pop-hex-val');
  if(popHex) popHex.textContent = col.toUpperCase();
  var popPick = document.getElementById('pop-cpick');
  if(popPick && typeof col === 'string' && col.startsWith('#') && col.length === 7) popPick.value = col;

  if(typeof addRecentColor === 'function') addRecentColor(col);

  // Sync all swatch buttons (.cw and .easy-col-dot) across all UI cards
  var matchedSwatch = false;
  document.querySelectorAll('.cw, .easy-col-dot').forEach(function(c){
    var isMatch = ((c.dataset.c && c.dataset.c.toLowerCase() === col.toLowerCase()) || 
                   (c.dataset.col && c.dataset.col.toLowerCase() === col.toLowerCase()));
    c.classList.toggle('on', isMatch);
    if(isMatch) matchedSwatch = true;
  });

  // Sync all color picker inputs
  ['cpick', 'pb-cpick', 'scx-cpick'].forEach(function(id){
    var el = document.getElementById(id);
    if(el && typeof col === 'string' && col.startsWith('#') && col.length === 7){
      el.value = col;
    }
  });

  // Custom color picker border indicator: lit only if it's a custom picked color (not matching presets)
  var isCustomLit = !!isCustom && !matchedSwatch;
  ['ccpick-btn', 'pb-ccpick-btn', 'scx-ccpick-btn', 'color-wheel-trig-btn'].forEach(function(id){
    var btn = document.getElementById(id);
    if(btn) btn.style.borderColor = isCustomLit ? 'var(--ink)' : '';
  });

  // Update line preview materials
  if(typeof _prevMat !== 'undefined' && _prevMat && _prevMat.color) { _prevMat.color.set(curColor); }
  if(typeof _symPrevMat1 !== 'undefined' && _symPrevMat1 && _symPrevMat1.color) { _symPrevMat1.color.set(curColor); }
  if(typeof _symPrevMat2 !== 'undefined' && _symPrevMat2 && _symPrevMat2.color) { _symPrevMat2.color.set(curColor); }
  if(typeof _symPrevMat3 !== 'undefined' && _symPrevMat3 && _symPrevMat3.color) { _symPrevMat3.color.set(curColor); }

  // If strokes are currently selected in select mode, apply color to selected strokes as well
  if(typeof selectedStrokes !== 'undefined' && selectedStrokes.length > 0 && typeof mode !== 'undefined' && mode === 'select' && window._syncSgControls){
    var sgSw = document.querySelector('#sg-colors .pg-csw[data-sc="' + col + '"]');
    if(sgSw){
      sgSw.click();
    } else {
      var sgCp = document.getElementById('sg-cpick');
      if(sgCp){
        sgCp.value = col;
        sgCp.dispatchEvent(new Event('input'));
      }
    }
    if(window._updateGhudSel) window._updateGhudSel();
  }

  // Redraw brush preview swatches
  if(typeof redrawAll === 'function') redrawAll();
}
window._setBrushColor = setBrushColor;

document.querySelectorAll('.cw').forEach(function(sw){
  sw.addEventListener('click', function(e){
    e.stopPropagation();
    setBrushColor(this.dataset.c, false);
  });
});

['cpick', 'pb-cpick', 'scx-cpick'].forEach(function(id){
  var el = document.getElementById(id);
  if(el){
    el.addEventListener('input', function(e){
      setBrushColor(this.value, true);
    });
  }
});

// ── Brush preview canvases + size/opacity pickers ─────────────────
(function(){

  function drawSzCanvas(canvas,sz,color){
    if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);
    var r=Math.max(1,sz*0.42*Math.min(W,H)/40);
    ctx.beginPath();ctx.arc(W/2,H/2,r,0,Math.PI*2);
    ctx.fillStyle=color||_themeInk(1);ctx.fill();
  }

  function drawOpCanvas(canvas,op100,color){
    if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);
    var pad=Math.max(2,Math.round(W*0.12));
    ctx.globalAlpha=op100/100;
    ctx.beginPath();ctx.arc(W/2,H/2,W/2-pad,0,Math.PI*2);
    ctx.fillStyle=color||_themeInk(1);ctx.fill();
    ctx.globalAlpha=1;
  }

  function redrawAll(){
    var col=_themeInk(1); // adapts to theme for visibility
    var op=Math.round(brushOp*100);
    var szStr = (brushSz >= 10 ? brushSz.toFixed(0) : brushSz.toFixed(1)).replace('.0', '');
    
    // Single active size canvases + labels
    ['sz-cur-canvas', 'sz-cur-canvas-pb', 'sz-cur-canvas-scx'].forEach(function(id){
      drawSzCanvas(document.getElementById(id), brushSz, col);
    });
    var szLbl = document.getElementById('sz-cur-label');
    if (szLbl) szLbl.textContent = szStr + 'px';
    var szLblPb = document.getElementById('sz-cur-label-pb');
    if (szLblPb) szLblPb.textContent = szStr;
    var szLblScx = document.getElementById('sz-cur-label-scx');
    if (szLblScx) szLblScx.textContent = szStr;

    // Fallback preset canvases if present
    drawSzCanvas(document.getElementById('sz-p1'),1,col);
    drawSzCanvas(document.getElementById('sz-p3'),3,col);
    drawSzCanvas(document.getElementById('sz-p6'),6,col);
    drawOpCanvas(document.getElementById('op-p30'),30,col);
    drawOpCanvas(document.getElementById('op-p60'),60,col);
    drawOpCanvas(document.getElementById('op-p95'),95,col);
    drawSzCanvas(document.getElementById('sz-p1-pb'),1,col);
    drawSzCanvas(document.getElementById('sz-p3-pb'),3,col);
    drawSzCanvas(document.getElementById('sz-p6-pb'),6,col);
    drawOpCanvas(document.getElementById('op-p30-pb'),30,col);
    drawOpCanvas(document.getElementById('op-p60-pb'),60,col);
    drawOpCanvas(document.getElementById('op-p95-pb'),95,col);
    drawSzCanvas(document.getElementById('sz-p1-scx'),1,col);
    drawSzCanvas(document.getElementById('sz-p3-scx'),3,col);
    drawSzCanvas(document.getElementById('sz-p6-scx'),6,col);
    drawOpCanvas(document.getElementById('op-p30-scx'),30,col);
    drawOpCanvas(document.getElementById('op-p60-scx'),60,col);
    drawOpCanvas(document.getElementById('op-p95-scx'),95,col);
    drawSzCanvas(document.getElementById('sz-prev-pop'),brushSz,col);
    drawOpCanvas(document.getElementById('op-prev-pop'),op,col);
    document.querySelectorAll('[data-sz]').forEach(function(b){b.classList.toggle('cur',+b.dataset.sz===brushSz);});
    document.querySelectorAll('[data-op]').forEach(function(b){b.classList.toggle('cur',+b.dataset.op===op);});
  }
  window._brushRedraw=redrawAll;

  function applySize(v){
    v=Math.min(40,Math.max(1,+v));
    // If strokes selected, apply to selection instead of brush
    if(selectedStrokes.length>0){
      var sgW=document.getElementById('sg-width');if(sgW){sgW.value=v;sgW.dispatchEvent(new Event('input'));}
      if(window._updateGhudSel)window._updateGhudSel();
      return;
    }
    brushSz=v;
    var sld=document.getElementById('sz-sld');if(sld)sld.value=v;
    redrawAll();
  }
  function applyOpacity(v){
    v=Math.min(100,Math.max(10,+v));
    // If strokes selected, apply to selection instead of brush
    if(selectedStrokes.length>0){
      var sgO=document.getElementById('sg-opacity');if(sgO){sgO.value=v;sgO.dispatchEvent(new Event('input'));}
      if(window._updateGhudSel)window._updateGhudSel();
      return;
    }
    brushOp=v/100;
    var sld=document.getElementById('op-sld');if(sld)sld.value=v;
    redrawAll();
  }
  window._applySize=applySize;
  window._applyOpacity=applyOpacity;

  // Drawing Brushes & Presets (Left Side Tools & Bottom Dock)
  var BRUSH_PRESETS={
    // Official Feather 3D Presets
    sketch:{name:'Sketch',sz:1,op:70,flat:true,vel:true,smooth:false,mat:'shadeless',img:'assets/brush_previews/preview_hb_pencil.png'},
    character:{name:'Character',sz:4,op:90,flat:true,vel:true,smooth:true,mat:'shadeless',img:'assets/brush_previews/preview_broad_marker.png'},
    cloth:{name:'Cloth Line',sz:2,op:100,flat:true,vel:true,smooth:true,mat:'shadeless',img:'assets/brush_previews/preview_fountain_pen.png'},
    tree1:{name:'Tree 1',sz:2.5,op:85,flat:true,vel:true,smooth:false,mat:'foliage_leaf',img:'assets/brush_previews/preview_gesture_vine.png'},
    tree2:{name:'Tree 2',sz:1.5,op:80,flat:true,vel:true,smooth:false,mat:'foliage_fir',img:'assets/brush_previews/preview_foliage_fir.png'},
    balloon:{name:'Balloon',sz:8,op:100,flat:false,vel:false,smooth:true,mat:'shaded',img:'assets/brush_previews/preview_thick_oil.png'},
    // Studio Basics & Pencils
    pencil:{name:'Pencil',sz:1,op:95,flat:true,vel:true,smooth:false,mat:'pencil',img:'assets/brush_previews/preview_hb_pencil.png'},
    pen:{name:'Pen',sz:2,op:100,flat:true,vel:false,smooth:true,mat:'default',img:'assets/brush_previews/preview_fountain_pen.png'},
    ink:{name:'Ink',sz:1,op:100,flat:true,vel:false,smooth:false,mat:'default',img:'assets/brush_previews/preview_indian_ink.png'},
    marker:{name:'Marker',sz:6,op:95,flat:true,vel:false,smooth:false,mat:'marker',img:'assets/brush_previews/preview_broad_marker.png'},
    chalk:{name:'Chalk',sz:4,op:70,flat:true,vel:true,smooth:false,mat:'pencil',img:'assets/brush_previews/preview_schoolhouse_chalk.png'},
    charcoal:{name:'Charcoal',sz:6,op:80,flat:true,vel:true,smooth:false,mat:'pencil',img:'assets/brush_previews/preview_soft_charcoal.png'},
    oil:{name:'Oil',sz:8,op:100,flat:true,vel:false,smooth:false,mat:'acrylic',img:'assets/brush_previews/preview_thick_oil.png'},
    airbrush:{name:'Airbrush',sz:3,op:40,flat:true,vel:false,smooth:false,mat:'watercolor',img:'assets/brush_previews/preview_soft_airbrush.png'},
    watercolor:{name:'Watercolor',sz:4,op:80,flat:true,vel:false,smooth:true,mat:'watercolor',img:'assets/brush_previews/preview_wet_paper.png'},
    leaf:{name:'Leaf',sz:3,op:85,flat:true,vel:true,smooth:false,mat:'foliage_leaf',img:'assets/brush_previews/preview_gesture_vine.png'},
    wood:{name:'Wood',sz:5,op:95,flat:true,vel:false,smooth:false,mat:'acrylic',img:'assets/brush_previews/preview_wood.png'}
  };

  // Procedural Textures & Shaders (Topbar PROCEDURAL menu & Special Effects Drawer)
  var PROCEDURAL_PRESETS={
    flat:{name:'Flat Solid',mat:'default'},
    lightning:{name:'Electric Lightning',mat:'lightning',color:'#4080ff',img:'assets/brush_previews/preview_fx_lightning.png'},
    glitter:{name:'Fairy Glitter',mat:'glitter',color:'#ffddff',img:'assets/brush_previews/preview_fx_glitter.png'},
    candy:{name:'Candy Swirl',mat:'candy',color:'#ff4070',img:'assets/brush_previews/preview_fx_candy.png'},
    slime:{name:'Bubbling Slime',mat:'slime',color:'#39ff14',img:'assets/brush_previews/preview_fx_slime.png'},
    sparkler:{name:'Firework Sparkler',mat:'sparkler',color:'#ffcc00',img:'assets/brush_previews/preview_fx_sparkler.png'},
    waterfall:{name:'Waterfall',mat:'waterfall',color:'#1d9fd6',img:'assets/brush_previews/preview_fx_waterfall.png'},
    caustic:{name:'Caustic',mat:'caustic',color:'#1ca8b8',img:'assets/brush_previews/preview_fx_caustic.png'},
    foam:{name:'Foam',mat:'foam',color:'#2488aa',img:'assets/brush_previews/preview_fx_foam.png'},
    ripple:{name:'Ripple',mat:'ripple',color:'#3078a0',img:'assets/brush_previews/preview_fx_ripple.png'},
    glow:{name:'Neon Glow',mat:'glow',color:'#00ffff',img:'assets/brush_previews/preview_fx_glow.png'},
    shaded:{name:'Shaded',mat:'shaded',img:'assets/brush_previews/preview_fx_shaded.png'},
    toon:{name:'Toon',mat:'cel_shaded',color:'#f39c12',img:'assets/brush_previews/preview_fx_toon.png'},
    rainbow:{name:'Rainbow',mat:'rainbow',color:'#ffffff',img:'assets/brush_previews/preview_fx_rainbow.png'},
    stardust:{name:'Stardust',mat:'stardust',color:'#ffd700',img:'assets/brush_previews/preview_fx_stardust.png'},
    lava:{name:'Lava',mat:'lava',color:'#ff4500',img:'assets/brush_previews/preview_fx_lava.png'},
    galaxy:{name:'Galaxy',mat:'galaxy',color:'#6a0dad',img:'assets/brush_previews/preview_fx_galaxy.png'},
    acrylic:{name:'Acrylic',mat:'acrylic'},
    watercolor:{name:'Watercolor',mat:'watercolor',color:'#3498db',img:'assets/brush_previews/preview_fx_watercolor.png'},
    leaf:{name:'Leaf',mat:'foliage_leaf',color:'#2e8b57',img:'assets/brush_previews/preview_fx_leaf.png'},
    fir:{name:'Fir',mat:'foliage_fir',color:'#228b22',img:'assets/brush_previews/preview_fx_fir.png'},
    halftone:{name:'Halftone',mat:'halftone',color:'#2563a8',img:'assets/brush_previews/preview_fx_halftone.png'},
    hatch:{name:'Hatch',mat:'hatch'},
    cross:{name:'Cross',mat:'crosshatch'},
    stipple:{name:'Stipple',mat:'stipple'},
    dry_brush:{name:'Dry Brush',mat:'acrylic'},
    wood:{name:'Wood',mat:'acrylic'},
    terrazzo:{name:'Terrazzo',mat:'terrazzo'},
    cutout:{name:'Cutout',mat:'cutout'},
    cloud:{name:'Puffy Cloud',mat:'cloud',color:'#ffffff',img:'assets/brush_previews/preview_fx_cloud.png'},
    jelly:{name:'Gummy Jelly',mat:'jelly',color:'#2ecc71',img:'assets/brush_previews/preview_fx_jelly.png'},
    plasma:{name:'Plasma Core',mat:'plasma',color:'#d946ef',img:'assets/brush_previews/preview_fx_plasma.png'},
    rim_light:{name:'Anime Rim Light',mat:'rim_light',color:'#ffaa44',img:'assets/brush_previews/preview_fx_toon.png'},
    anime_cel:{name:'Crisp Cel AA',mat:'anime_cel',color:'#ff5533',img:'assets/brush_previews/preview_fx_toon.png'},
    volumetric_plasma:{name:'Plasma Nebula',mat:'volumetric_plasma',color:'#ff7700',img:'assets/brush_previews/preview_fx_plasma.png'},
    jelly_warp:{name:'Liquid Goo 3D',mat:'jelly_warp',color:'#2ecc71',img:'assets/brush_previews/preview_fx_jelly.png'},
    posterize_ink:{name:'Comic Poster & Ink',mat:'posterize_ink',color:'#e67e22',img:'assets/brush_previews/preview_fx_toon.png'}
  };
  var MATERIAL_PRESETS=Object.assign({}, PROCEDURAL_PRESETS, BRUSH_PRESETS);
  var _curMatKey='pencil';
  window._curStrokeMatType='pencil';

  function applyBrushPreset(key){
    var infBrush = (window.getInfiniteBrush && window.getInfiniteBrush(key)) || null;
    var p = infBrush || BRUSH_PRESETS[key] || PROCEDURAL_PRESETS[key] || MATERIAL_PRESETS[key];
    if(!p)return;
    var mType=p.mat||'default';
    _curMatKey=key;
    window._curStrokeMatType=mType;
    var name=p.name||(key.charAt(0).toUpperCase()+key.slice(1));

    if(p.sz!==undefined) brushSz=p.sz;
    if(p.op!==undefined) brushOp=p.op/100;
    if(p.flat!==undefined) flatBrush=p.flat;
    if(p.vel!==undefined) velocityTaper=p.vel;
    if(p.smooth!==undefined){ smoothingOn=p.smooth; LAZY=p.smooth?LAZY_ON:LAZY_OFF; }

    var fxCol = p.color || (typeof DEFAULT_FX_COLORS !== 'undefined' ? DEFAULT_FX_COLORS[mType] : null);
    if(fxCol && (p.color || !curColor || curColor === '#000000')){
      setBrushColor(fxCol, false);
    }

    ['sdraw','pb-draw','scx-draw'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.add('on');});
    ['sflat','pb-flat','scx-flat'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.toggle('on',flatBrush);});
    ['ssmooth','pb-smooth','scx-smooth'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.toggle('on',smoothingOn);});
    ['svel','pb-vel','scx-vel'].forEach(function(id){var el=document.getElementById(id);if(el)el.classList.toggle('on',velocityTaper);});
    var sld=document.getElementById('sz-sld');if(sld)sld.value=brushSz;
    var oSld=document.getElementById('op-sld');if(oSld)oSld.value=Math.round(brushOp*100);

    document.querySelectorAll('[data-bp]').forEach(function(b){b.classList.toggle('cur',b.dataset.bp===key);});

    // Sync Infinite Painter Brush Studio Hero Card
    var heroImg = document.getElementById('bs-hero-img');
    var heroName = document.getElementById('bs-hero-name');
    var heroDesc = document.getElementById('bs-hero-desc');
    var heroFav = document.getElementById('bs-hero-fav');
    if(heroImg && p.img) heroImg.src = p.img;
    if(heroName) heroName.textContent = name;
    if(heroDesc) heroDesc.textContent = (p.cat ? p.cat.toUpperCase() : 'MEDIUM') + ' · ' + (p.mat || 'default');
    if(heroFav && window.INFINITE_BRUSHES_BY_CAT && window.INFINITE_BRUSHES_BY_CAT.favorites){
      heroFav.classList.toggle('on', window.INFINITE_BRUSHES_BY_CAT.favorites.some(function(item){return item.key===key;}));
    }

    // Sync bottom dock active indicator labels & images
    var curLbl=document.getElementById('bpreset-cur-label');
    if(curLbl)curLbl.textContent=name;
    var pbCurLbl=document.getElementById('pb-bpreset-cur-label');
    if(pbCurLbl)pbCurLbl.textContent=name;
    var sbImg=document.getElementById('sb-brush-preview-img');
    if(sbImg && p.img) sbImg.src=p.img;
    var pbImg=document.getElementById('pb-brush-preview-img');
    if(pbImg && p.img) pbImg.src=p.img;

    // If strokes are currently selected, also update their material immediately!
    if(selectedStrokes.length>0){
      var oldProps=selectedStrokes.map(function(s){return {stroke:s,color:s.color,sz:s.sz,op:s.op,matType:s.matType||'default'};});
      selectedStrokes.forEach(function(s){
        var fn = typeof _rebuildStrokeMesh === 'function' ? _rebuildStrokeMesh : window._rebuildStrokeMesh;
        if(fn) fn(s,s.color,s.sz,s.op,mType);
      });
      updateSelHighlights();
      markDirty();
      pushUndo({
        type:'stroke_rebuild_multi',
        oldProps:oldProps,
        newProps:selectedStrokes.map(function(s){return {stroke:s,color:s.color,sz:s.sz,op:s.op,matType:mType};})
      });
    }

    redrawAll();
    toast(name+(p.sz?' · sz '+p.sz+' · op '+p.op:''));
  }
  document.querySelectorAll('[data-bp]').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();
      applyBrushPreset(this.dataset.bp);
      if(this.closest('#mat-pop'))closePops();
    });
  });
  window._applyBrushPreset=applyBrushPreset;

  var openPopEl=null;
  var _lastPopTrigger=null;

  function positionPop(pop,trigger){
    if(!pop) return;
    if(trigger) _lastPopTrigger = trigger;
    trigger = trigger || _lastPopTrigger;
    if(pop.classList.contains('bs-studio-modal')) {
      pop.style.top='';pop.style.left='';pop.style.bottom='';pop.style.right='';pop.style.transform='';
      return;
    }
    if(!trigger) return;
    var br=trigger.getBoundingClientRect();
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    var ph=(pop.offsetHeight||240);
    var pw=(pop.offsetWidth||260);
    var pad=8;
    var top=br.top>(ph*s)+12 ? br.top-(ph*s)-8 : br.bottom+6;
    top=Math.max(pad, Math.min(top, window.innerHeight - (ph*s) - pad));
    var left=Math.max(pad, Math.min(br.left, window.innerWidth - (pw*s) - pad));
    pop.style.top=(top/s)+'px';
    pop.style.left=(left/s)+'px';
  }

  function openPop(pop,trigger){
    if(window._closeAllDropdowns)window._closeAllDropdowns(pop.id);
    if(openPopEl&&openPopEl!==pop)openPopEl.classList.remove('open');
    redrawAll();pop.classList.add('open');openPopEl=pop;_lastPopTrigger=trigger;positionPop(pop,trigger);
    var tbProc=document.getElementById('bprocedural-tb');
    if(tbProc)tbProc.classList.toggle('on',pop===matPop);
  }

  function closePops(){
    if(openPopEl){openPopEl.classList.remove('open');openPopEl=null;_lastPopTrigger=null;}
    var tbProc=document.getElementById('bprocedural-tb');
    if(tbProc)tbProc.classList.remove('on');
  }

  window.addEventListener('resize', function(){
    if(openPopEl && _lastPopTrigger) {
      positionPop(openPopEl, _lastPopTrigger);
    }
  });
  window.addEventListener('orientationchange', function(){
    if(openPopEl && _lastPopTrigger) {
      setTimeout(function(){ positionPop(openPopEl, _lastPopTrigger); }, 50);
    }
  });
  document.addEventListener('fullscreenchange', function(){
    if(openPopEl && _lastPopTrigger) {
      setTimeout(function(){ positionPop(openPopEl, _lastPopTrigger); }, 50);
    }
  });

  document.addEventListener('click',function(e){
    if(openPopEl&&!openPopEl.contains(e.target)&&!e.target.closest('.bprev-more')&&!e.target.closest('#fx-lbl-trig')&&!e.target.closest('#fx-trig-sb')&&!e.target.closest('#fx-trig-pb')&&!e.target.closest('#color-wheel-trig-btn')&&!e.target.closest('#ccpick-btn')&&!e.target.closest('#pb-ccpick-btn')&&!e.target.closest('#scx-ccpick-btn')&&!e.target.closest('#bpreset-cur-btn')&&!e.target.closest('#pb-bpreset-cur-btn')&&!e.target.closest('#pb-brush-btn')&&!e.target.closest('#bprocedural-tb')&&!e.target.closest('#bproc-browse-btn')&&!e.target.closest('#gc-sel-proc-btn')&&!e.target.closest('#pb-sel-proc-btn'))closePops();
  });

  document.querySelectorAll('[data-sz]').forEach(function(b){
    b.addEventListener('click',function(e){e.stopPropagation();applySize(+this.dataset.sz);closePops();});
  });
  document.querySelectorAll('[data-op]').forEach(function(b){
    b.addEventListener('click',function(e){e.stopPropagation();applyOpacity(+this.dataset.op);closePops();});
  });

  var szPop=document.getElementById('sz-pop');
  var opPop=document.getElementById('op-pop');
  var matPop=document.getElementById('mat-pop');
  var fxPop=document.getElementById('fx-pop');
  var colorPop=document.getElementById('color-pop');

  ['sz-trig-sb','sz-trig-pb','sz-cur-btn','sz-cur-btn-pb','sz-cur-btn-scx'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.addEventListener('click',function(e){e.stopPropagation();szPop.classList.contains('open')?closePops():openPop(szPop,this);});
  });
  ['op-trig-sb','op-trig-pb'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.addEventListener('click',function(e){e.stopPropagation();opPop.classList.contains('open')?closePops():openPop(opPop,this);});
  });
  ['fx-trig-sb','fx-lbl-trig','fx-trig-pb'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.addEventListener('click',function(e){e.stopPropagation();fxPop.classList.contains('open')?closePops():openPop(fxPop,this);});
  });
  ['color-wheel-trig-btn','ccpick-btn','pb-ccpick-btn','scx-ccpick-btn'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){
      el.addEventListener('click',function(e){
        e.stopPropagation();
        if(colorPop.classList.contains('open')){
          closePops();
        } else {
          renderRecentColorsGrid();
          var prev=document.getElementById('pop-color-preview');
          if(prev)prev.style.background=curColor;
          var hex=document.getElementById('pop-hex-val');
          if(hex)hex.textContent=(curColor||'#000000').toUpperCase();
          var popCp=document.getElementById('pop-cpick');
          if(popCp&&curColor&&curColor.startsWith('#')&&curColor.length===7)popCp.value=curColor;
          openPop(colorPop,this);
        }
      });
    }
  });
  
  // ── FX texture scale sliders (FX popover & Selection HUDs) ──
  function _handleFxScaleInput(val) {
    window._curFxScale = val;
    ['fx-scale-slider', 'ghud-sel-fxscale', 'pb-ghud-sel-fxscale'].forEach(function(id){
      var el = document.getElementById(id);
      if(el && Math.abs(parseFloat(el.value) - val) > 0.05) el.value = val;
    });
    ['fx-scale-val', 'ghud-sel-fxscale-val', 'pb-ghud-sel-fxscale-val'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.textContent = val.toFixed(1);
    });
    if(selectedStrokes.length > 0){
      selectedStrokes.forEach(function(s){
        s.fxScale = val;
        s.mesh.traverse(function(c){
          if(c.material && c.material.uniforms && c.material.uniforms.uScale){
            c.material.uniforms.uScale.value = val;
          }
        });
      });
      markDirty();
    } else if(surfMesh && surfMesh.material && surfMesh.material.uniforms && surfMesh.material.uniforms.uScale){
      surfMesh.material.uniforms.uScale.value = val;
      surfMesh.userData.currentFxScale = val;
      markDirty();
    }
  }

  function _handleFxScaleChange(val) {
    window._curFxScale = val;
    if(selectedStrokes.length > 0){
      var oldProps = selectedStrokes.map(function(s){
        return {stroke: s, color: s.color, sz: s.sz, op: s.op, matType: s.matType||'default', fxScale: s._oldFxScale || undefined};
      });
      selectedStrokes.forEach(function(s){
        _rebuildStrokeMesh(s, s.color, s.sz, s.op, s.matType, val);
        s._oldFxScale = val;
      });
      updateSelHighlights();
      markDirty();
      pushUndo({
        type: 'stroke_rebuild_multi',
        oldProps: oldProps,
        newProps: selectedStrokes.map(function(s){
          return {stroke: s, color: s.color, sz: s.sz, op: s.op, matType: s.matType||'default', fxScale: val};
        })
      });
    }
  }

  ['fx-scale-slider', 'ghud-sel-fxscale', 'pb-ghud-sel-fxscale'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){
      el.addEventListener('input', function(e){
        _handleFxScaleInput(parseFloat(e.target.value));
      });
      el.addEventListener('change', function(e){
        _handleFxScaleChange(parseFloat(e.target.value));
      });
    }
  });

  var fxClose=document.getElementById('fx-pop-close');
  if(fxClose)fxClose.addEventListener('click',function(e){e.stopPropagation();closePops();});
  var colorClose=document.getElementById('color-pop-close');
  if(colorClose)colorClose.addEventListener('click',function(e){e.stopPropagation();closePops();});

  // Recent Colors (Last 10 Used)
  var _recentColors = JSON.parse(localStorage.getItem('sb_recent_colors') || '["#000000","#ffffff","#c0392b","#2563a8","#cdb899","#2ecc71","#f1c40f","#e67e22","#9b59b6","#1abc9c"]');
  function renderRecentColorsGrid(){
    var grid=document.getElementById('recent-colors-grid');
    if(!grid)return;
    grid.innerHTML='';
    _recentColors.forEach(function(c){
      var sw=document.createElement('div');
      sw.className='cw'+(c.toLowerCase()===(curColor||'').toLowerCase()?' on':'');
      sw.style.background=c;
      sw.style.width='18px';
      sw.style.height='18px';
      sw.style.borderRadius='9px';
      sw.style.cursor='pointer';
      if(c.toLowerCase()==='#ffffff')sw.style.border='1px solid var(--bdr)';
      sw.dataset.c=c;
      sw.addEventListener('click',function(e){
        e.stopPropagation();
        setBrushColor(c,true);
        var prev=document.getElementById('pop-color-preview');
        if(prev)prev.style.background=c;
        var hex=document.getElementById('pop-hex-val');
        if(hex)hex.textContent=c.toUpperCase();
        var popCp=document.getElementById('pop-cpick');
        if(popCp&&c.startsWith('#')&&c.length===7)popCp.value=c;
      });
      grid.appendChild(sw);
    });
  }
  function addRecentColor(col){
    if(!col||typeof col!=='string'||!col.startsWith('#')||col.length!==7)return;
    col=col.toLowerCase();
    if(_recentColors[0]===col)return;
    _recentColors=_recentColors.filter(function(c){return c.toLowerCase()!==col;});
    _recentColors.unshift(col);
    if(_recentColors.length>10)_recentColors=_recentColors.slice(0,10);
    try{localStorage.setItem('sb_recent_colors',JSON.stringify(_recentColors));}catch(e){}
    renderRecentColorsGrid();
  }
  window.addRecentColor=addRecentColor;
  renderRecentColorsGrid();

  var popCpick=document.getElementById('pop-cpick');
  if(popCpick){
    popCpick.addEventListener('input',function(){
      var col=this.value;
      setBrushColor(col,true);
      var prev=document.getElementById('pop-color-preview');
      if(prev)prev.style.background=col;
      var hex=document.getElementById('pop-hex-val');
      if(hex)hex.textContent=col.toUpperCase();
    });
  }

  document.querySelectorAll('#default-colors-grid .cw').forEach(function(sw){
    sw.addEventListener('click',function(e){
      e.stopPropagation();
      var col=this.dataset.c;
      setBrushColor(col,false);
      var prev=document.getElementById('pop-color-preview');
      if(prev)prev.style.background=col;
      var hex=document.getElementById('pop-hex-val');
      if(hex)hex.textContent=col.toUpperCase();
      var popCp=document.getElementById('pop-cpick');
      if(popCp&&col.startsWith('#')&&col.length===7)popCp.value=col;
    });
  });

  // Action Tools Grid Handlers (D, E, Q, F, S, W, Undo, Redo)
  document.querySelectorAll('.act-tool-btn[data-acttool]').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var tool=this.dataset.acttool;
      if(tool==='draw')setMode('draw');
      else if(tool==='erase')setMode('erase');
      else if(tool==='select')setMode('select');
      else if(tool==='fill')setMode('fill');
      else if(tool==='smudge')setMode('smudge');
      else if(tool==='curve')setMode('curve');
      document.querySelectorAll('.act-tool-btn[data-acttool]').forEach(function(b){
        b.classList.toggle('on',b.dataset.acttool===tool);
      });
    });
  });
  var gridUndo=document.getElementById('grid-undo-btn');
  if(gridUndo)gridUndo.addEventListener('click',function(e){e.stopPropagation();if(typeof undo==='function')undo();});
  var gridRedo=document.getElementById('grid-redo-btn');
  if(gridRedo)gridRedo.addEventListener('click',function(e){e.stopPropagation();if(typeof redo==='function')redo();});

  // ── UI Mode Switcher: EASY (Kids) vs PRO (Feather 3D Studio) ──
  var currentUIMode = localStorage.getItem('sk3d_ui_mode') || 'easy';

  function setUIMode(m) {
    currentUIMode = m;
    localStorage.setItem('sk3d_ui_mode', m);
    if (m === 'easy') {
      document.body.classList.add('mode-easy');
      document.body.classList.remove('mode-pro');
      var btn = document.getElementById('bmode-toggle');
      if (btn) {
        btn.textContent = 'EASY';
        btn.title = 'Current Mode: EASY (Kid-friendly). Click to switch to PRO Studio.';
      }
    } else {
      document.body.classList.add('mode-pro');
      document.body.classList.remove('mode-easy');
      var btn = document.getElementById('bmode-toggle');
      if (btn) {
        btn.textContent = 'PRO';
        btn.title = 'Current Mode: PRO (Feather 3D Studio). Click to switch to EASY.';
      }
    }
  }

  var bModeToggle = document.getElementById('bmode-toggle');
  if (bModeToggle) {
    bModeToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      setUIMode(currentUIMode === 'easy' ? 'pro' : 'easy');
      if (window.toast) toast('Switched to ' + (currentUIMode === 'easy' ? 'Easy (Kid) Mode' : 'Pro (Feather 3D) Mode'));
    });
  }

  // Easy Mode Brush Buttons
  document.querySelectorAll('.easy-brush-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var ekey = this.dataset.ekey;
      applyBrushPreset(ekey);
      document.querySelectorAll('.easy-brush-btn').forEach(function(b) {
        b.classList.toggle('on', b.dataset.ekey === ekey);
      });
      if (window.toast) toast(this.textContent + ' brush selected');
    });
  });

  // Easy Mode Color Dots
  document.querySelectorAll('.easy-col-dot').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var col = this.dataset.col;
      setBrushColor(col, false);
    });
  });

  var easyWheelBtn = document.getElementById('easy-wheel-btn');
  if (easyWheelBtn) {
    easyWheelBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var cpop = document.getElementById('color-wheel-popover');
      if (cpop) {
        var isVis = (cpop.style.display !== 'none');
        cpop.style.display = isVis ? 'none' : 'block';
      }
    });
  }

  // Boot UI Mode
  setUIMode(currentUIMode);

  var _curStudioCat = 'paint';
  var _recentBrushes = [];

  function renderBrushStudio(catKey) {
    if (!catKey) catKey = _curStudioCat;
    _curStudioCat = catKey;

    var catTitle = document.getElementById('bs-active-cat-title');
    if (catTitle) catTitle.textContent = catKey.toUpperCase() + ' BRUSHES';

    document.querySelectorAll('#bs-sidebar .bs-cat-btn').forEach(function(b) {
      b.classList.toggle('on', b.dataset.bscat === catKey);
    });

    var listEl = document.getElementById('bs-brush-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    var brushes = [];
    if (catKey === 'recent') {
      brushes = _recentBrushes.length > 0 ? _recentBrushes : (window.INFINITE_BRUSHES_BY_CAT ? window.INFINITE_BRUSHES_BY_CAT.paint.slice(0, 10) : []);
    } else if (catKey === 'favorites') {
      brushes = (window.INFINITE_BRUSHES_BY_CAT && window.INFINITE_BRUSHES_BY_CAT.favorites) || [];
    } else if (window.getInfiniteBrushesByCat) {
      brushes = window.getInfiniteBrushesByCat(catKey);
    }

    if (!brushes || brushes.length === 0) {
      listEl.innerHTML = '<div style="color:#8c93a0;font-size:11px;padding:20px;text-align:center">No brushes found</div>';
      return;
    }

    brushes.forEach(function(b) {
      var card = document.createElement('div');
      card.className = 'bs-brush-card' + (_curMatKey === b.key ? ' cur' : '');
      card.dataset.bp = b.key;

      var img = document.createElement('img');
      img.className = 'bs-card-img';
      img.src = b.img;
      img.alt = b.name;
      img.loading = 'lazy';

      var lbl = document.createElement('span');
      lbl.className = 'bs-card-label';
      lbl.textContent = b.name;

      card.appendChild(img);
      card.appendChild(lbl);

      card.addEventListener('click', function(e) {
        e.stopPropagation();
        applyBrushPreset(b.key);
        document.querySelectorAll('.bs-brush-card').forEach(function(c) { c.classList.toggle('cur', c === card); });
        // Update hero card
        var heroImg = document.getElementById('bs-hero-img');
        var heroName = document.getElementById('bs-hero-name');
        if (heroImg) heroImg.src = b.img;
        if (heroName) heroName.textContent = b.name;
        // Update sidebar trigger button
        var sbImg = document.getElementById('sb-brush-preview-img');
        var sbLbl = document.getElementById('bpreset-cur-label');
        if (sbImg) sbImg.src = b.img;
        if (sbLbl) sbLbl.textContent = b.name;
        if (_recentBrushes.indexOf(b) === -1) {
          _recentBrushes.unshift(b);
          if (_recentBrushes.length > 20) _recentBrushes.pop();
        }
      });

      listEl.appendChild(card);
    });
  }

  // Bind category clicks in left sidebar
  document.querySelectorAll('#bs-sidebar .bs-cat-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      renderBrushStudio(this.dataset.bscat);
    });
  });

  // Hero card favorite button
  var heroFav = document.getElementById('bs-hero-fav');
  if (heroFav) {
    heroFav.addEventListener('click', function(e) {
      e.stopPropagation();
      var b = window.getInfiniteBrush ? window.getInfiniteBrush(_curMatKey) : null;
      if (!b || !window.INFINITE_BRUSHES_BY_CAT) return;
      var favs = window.INFINITE_BRUSHES_BY_CAT.favorites;
      var idx = favs.findIndex(function(item){ return item.key === b.key; });
      if (idx >= 0) {
        favs.splice(idx, 1);
        heroFav.classList.remove('on');
      } else {
        favs.push(b);
        heroFav.classList.add('on');
      }
      if (_curStudioCat === 'favorites') renderBrushStudio('favorites');
    });
  }

  // Wire modal open triggers
  ['bpreset-cur-btn','pb-bpreset-cur-btn','pb-brush-btn','mat-trig-sb','mat-trig-pb','bprocedural-tb','bproc-browse-btn','gc-sel-proc-btn','pb-sel-proc-btn'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function(e){
      e.stopPropagation();
      if (matPop.classList.contains('open') && matPop._lastTrig === this) {
        closePops();
      } else {
        matPop._lastTrig = this;
        openPop(matPop, this);
        renderBrushStudio(_curStudioCat);
      }
    });
  });
  var matClose = document.getElementById('mat-pop-close');
  if (matClose) matClose.addEventListener('click', function(e){ e.stopPropagation(); closePops(); });

  var szSld=document.getElementById('sz-sld');
  if(szSld)szSld.addEventListener('input',function(){applySize(+this.value);});
  var opSld=document.getElementById('op-sld');
  if(opSld)opSld.addEventListener('input',function(){applyOpacity(+this.value);});

  redrawAll();
})();


// ── Fullscreen & PWA Install Handlers ──
(function(){
  function toggleFullscreen(){
    if(!document.fullscreenElement && !document.webkitFullscreenElement){
      var docEl = document.documentElement;
      if(docEl.requestFullscreen){
        docEl.requestFullscreen().catch(function(err){console.warn('Fullscreen error:',err);});
      } else if(docEl.webkitRequestFullscreen){
        docEl.webkitRequestFullscreen();
      }
    } else {
      if(document.exitFullscreen){
        document.exitFullscreen().catch(function(err){console.warn('Exit fullscreen error:',err);});
      } else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
      }
    }
  }

  function updateFullscreenUI(){
    var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    var emFs = document.getElementById('em-fullscreen');
    if(emFs) emFs.textContent = isFs ? 'Exit Fullscreen' : 'Fullscreen';
    var bfs = document.getElementById('bfullscreen');
    if(bfs){
      bfs.classList.toggle('on', isFs);
      var svgEnter = document.getElementById('svg-fs-enter');
      var svgExit = document.getElementById('svg-fs-exit');
      if(svgEnter) svgEnter.style.display = isFs ? 'none' : 'block';
      if(svgExit) svgExit.style.display = isFs ? 'block' : 'none';
    }
  }

  document.addEventListener('fullscreenchange', updateFullscreenUI);
  document.addEventListener('webkitfullscreenchange', updateFullscreenUI);

  var emFullscreen = document.getElementById('em-fullscreen');
  if(emFullscreen){
    emFullscreen.addEventListener('click', function(){
      var expmenu = document.getElementById('expmenu');
      if(expmenu) expmenu.classList.remove('vis');
      toggleFullscreen();
    });
  }

  var bFullscreen = document.getElementById('bfullscreen');
  if(bFullscreen){
    bFullscreen.addEventListener('click', function(){
      toggleFullscreen();
    });
  }

  // PWA Install Prompt
  var _deferredPwaPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    _deferredPwaPrompt = e;
    var emInst = document.getElementById('em-install');
    if(emInst) emInst.style.display = 'block';
    var bInst = document.getElementById('binstall');
    if(bInst) bInst.style.display = 'inline-flex';
  });

  window.addEventListener('appinstalled', function(){
    _deferredPwaPrompt = null;
    var emInst = document.getElementById('em-install');
    if(emInst) emInst.style.display = 'none';
    var bInst = document.getElementById('binstall');
    if(bInst) bInst.style.display = 'none';
    if(typeof toast === 'function') toast('App installed successfully');
  });

  function triggerPwaInstall(){
    if(_deferredPwaPrompt){
      _deferredPwaPrompt.prompt();
      _deferredPwaPrompt.userChoice.then(function(choice){
        _deferredPwaPrompt = null;
        var emInst = document.getElementById('em-install');
        if(emInst) emInst.style.display = 'none';
        var bInst = document.getElementById('binstall');
        if(bInst) bInst.style.display = 'none';
      });
    } else {
      if(/iPhone|iPad|iPod/.test(navigator.userAgent)){
        if(typeof toast === 'function') toast('Tap Safari Share, then "Add to Home Screen"');
      } else if(window.matchMedia('(display-mode: standalone)').matches){
        if(typeof toast === 'function') toast('Already running in standalone app mode');
      } else {
        if(typeof toast === 'function') toast('Open browser menu and choose "Install App" or "Add to Home screen"');
      }
    }
  }

  var emInstall = document.getElementById('em-install');
  if(emInstall){
    emInstall.addEventListener('click', function(){
      var expmenu = document.getElementById('expmenu');
      if(expmenu) expmenu.classList.remove('vis');
      triggerPwaInstall();
    });
  }

  var bInstall = document.getElementById('binstall');
  if(bInstall){
    bInstall.addEventListener('click', function(){
      triggerPwaInstall();
    });
  }

  var emStorage = document.getElementById('em-storage');
  if(emStorage){
    emStorage.addEventListener('click', function(){
      var expmenu = document.getElementById('expmenu');
      if(expmenu) expmenu.classList.remove('vis');
      if(window.requestPersistentStorage){
        window.requestPersistentStorage(true);
      }
    });
  }
})();


// ── Stage & 3D Model Loader Menu Triggers ──
(function(){
  var emStage = document.getElementById('em-stage');
  if(emStage){
    emStage.addEventListener('click', function(){
      var expmenu = document.getElementById('expmenu');
      if(expmenu) expmenu.classList.remove('vis');
      if(window._stageSystem){
        window._stageSystem.activeTab = 'env';
        window._stageSystem.show();
      }
    });
  }
  var emLoad3d = document.getElementById('em-load3d');
  if(emLoad3d){
    emLoad3d.addEventListener('click', function(){
      var expmenu = document.getElementById('expmenu');
      if(expmenu) expmenu.classList.remove('vis');
      if(window._stageSystem){
        window._stageSystem.activeTab = 'assets';
        window._stageSystem.show();
      }
    });
  }
})();

// ── Symmetry & Showcase Menu Triggers ──
(function(){
  var bSymm = document.getElementById('bsymm');
  if(bSymm){
    bSymm.addEventListener('click', function(e){
      e.stopPropagation();
      var cur = window._symmetryMode || 'off';
      var next = cur === 'off' ? 'mirror_x' : (cur === 'mirror_x' ? 'mirror_y' : (cur === 'mirror_y' ? 'radial_4' : 'off'));
      if(window.setSymmetryMode) window.setSymmetryMode(next);
      var names = {off:'Symmetry Off', mirror_x:'Mirror X (Left/Right)', mirror_y:'Mirror Y (Top/Bottom)', radial_4:'4-Way Radial Symmetry'};
      if(typeof toast === 'function') toast(names[next]);
    });
  }

  var bShowcaseTb = document.getElementById('bshowcase-tb');
  if(bShowcaseTb){
    bShowcaseTb.addEventListener('click', function(e){
      e.stopPropagation();
      if(window._toggleShowcase) window._toggleShowcase();
    });
  }

  var navShowcase = document.getElementById('nav-showcase');
  if(navShowcase){
    navShowcase.addEventListener('click', function(e){
      e.stopPropagation();
      if(window._toggleShowcase) window._toggleShowcase();
    });
  }

  var bRaycastDbgTb = document.getElementById('braycast-dbg-tb');
  if(bRaycastDbgTb){
    bRaycastDbgTb.addEventListener('click', function(e){
      e.stopPropagation();
      if(window.toggleRaycastDebug) window.toggleRaycastDebug();
    });
  }

  var bRaycastDebug = document.getElementById('braycast-debug');
  if(bRaycastDebug){
    bRaycastDebug.addEventListener('click', function(e){
      e.stopPropagation();
      if(window.toggleRaycastDebug) window.toggleRaycastDebug();
      if(window._closeAllDropdowns) window._closeAllDropdowns();
    });
  }
})();
