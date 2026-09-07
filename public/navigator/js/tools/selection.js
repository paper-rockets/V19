// ================================================================
//  GHUD-SEL: in-card selection controls (replaces ghud-bottom)
// ================================================================
(function(){
  var ghudBottom=document.getElementById('ghud-bottom');
  var ghudSel=document.getElementById('ghud-sel');
  var ghudSelPrim=document.getElementById('ghud-sel-prim');
  var ghudSelHint=document.getElementById('ghud-sel-hint');
  if(!ghudBottom||!ghudSel)return;

  // Show/hide the selection panel based on current selection state
  function _updateGhudSel(){
    var hasSel=selectedStrokes.length>0;
    var hasPrim=window._selectedPrim_get&&window._selectedPrim_get();
    var active=hasSel||hasPrim;
    // Sidecol card
    if(active){
      ghudBottom.style.display='none';
      ghudSel.style.display='flex';
      if(ghudSelPrim)ghudSelPrim.style.display=hasPrim?'flex':'none';
      if(ghudSelHint)ghudSelHint.textContent=hasSel?(selectedStrokes.length+' stroke'+(selectedStrokes.length>1?'s':'')+ ' · use tool cards for color/size/op'):(hasPrim?'ref object':'');
      _syncGhudSelControls();
    }else{
      ghudBottom.style.display='';
      ghudSel.style.display='none';
    }
    // Narrow bar (pb-gc bottom)
    var pbBottom=document.getElementById('pb-ghud-bottom');
    var pbSel=document.getElementById('pb-ghud-sel');
    if(pbBottom)pbBottom.style.display=active?'none':'flex';
    if(pbSel)pbSel.style.display=active?'flex':'none';
    // Refresh canvases
    if(window._gDraw)window._gDraw();
    if(window._pbGcDraw)window._pbGcDraw();
  }
  window._updateGhudSel=_updateGhudSel;

  // Precision readout for selection drags (shown in ghud-sel and pb-ghud-sel)
  var _selPrec=document.getElementById('ghud-sel-prec');
  var _pbSelPrec=document.getElementById('pb-ghud-sel-prec');
  window._setSelPrecision=function(text){
    if(_selPrec){
      if(text){_selPrec.textContent=text;_selPrec.style.display='';}
      else{_selPrec.style.display='none';_selPrec.textContent='';}
    }
    if(_pbSelPrec){
      if(text){_pbSelPrec.textContent=text;_pbSelPrec.style.display='';}
      else{_pbSelPrec.style.display='none';_pbSelPrec.textContent='';}
    }
  };

  // Sync inline controls to current selection
  function _syncGhudSelControls(){
    if(selectedStrokes.length>0){
      var first=selectedStrokes[0];
      var mType=first.matType||'default';

      // Sync Paper Rockets Material Bar buttons
      document.querySelectorAll('.gc-sel-mat-btn').forEach(function(b){
        var bMat = b.dataset.selmat;
        var isActive = (bMat === mType) || (mType === 'default' && (bMat === 'default' || bMat === 'flat')) || (mType === 'flat' && (bMat === 'default' || bMat === 'flat')) || (mType === 'cel_shaded' && bMat === 'toon');
        b.classList.toggle('on', isActive);
      });

      // Sync FX scale slider visibility & value
      var isFxMat = (mType !== 'default' && mType !== 'flat');
      var fxScaleVal = first.fxScale || window._curFxScale || 4.0;
      var ghudFxRow = document.getElementById('ghud-sel-fxscale-row');
      var pbGhudFxRow = document.getElementById('pb-ghud-sel-fxscale-row');
      if(ghudFxRow) ghudFxRow.style.display = isFxMat ? 'flex' : 'none';
      if(pbGhudFxRow) pbGhudFxRow.style.display = isFxMat ? 'flex' : 'none';
      var ghudSld = document.getElementById('ghud-sel-fxscale');
      var pbGhudSld = document.getElementById('pb-ghud-sel-fxscale');
      if(ghudSld) ghudSld.value = fxScaleVal;
      if(pbGhudSld) pbGhudSld.value = fxScaleVal;
      var ghudVal = document.getElementById('ghud-sel-fxscale-val');
      var pbGhudVal = document.getElementById('pb-ghud-sel-fxscale-val');
      if(ghudVal) ghudVal.textContent = fxScaleVal.toFixed(1);
      if(pbGhudVal) pbGhudVal.textContent = fxScaleVal.toFixed(1);

      if(typeof MATERIAL_PRESETS!=='undefined'){
        document.querySelectorAll('[data-bp]').forEach(function(b){
          var bpKey=b.dataset.bp;
          var p=MATERIAL_PRESETS[bpKey];
          var matches=(p&&p.mat===mType)||(bpKey===mType)||(mType==='default'&&bpKey==='flat');
          b.classList.toggle('cur',matches);
        });
        var found=null;
        for(var k in MATERIAL_PRESETS){if(MATERIAL_PRESETS[k].mat===mType){found=MATERIAL_PRESETS[k];break;}}
        var curLbl=document.getElementById('bpreset-cur-label');
        if(curLbl)curLbl.textContent=found?found.name:'Flat Solid';
        var pbCurLbl=document.getElementById('pb-bpreset-cur-label');
        if(pbCurLbl)pbCurLbl.textContent=found?found.name:'Flat Solid';
      }
    } else {
      var ghudFxRow = document.getElementById('ghud-sel-fxscale-row');
      var pbGhudFxRow = document.getElementById('pb-ghud-sel-fxscale-row');
      if(ghudFxRow) ghudFxRow.style.display = 'none';
      if(pbGhudFxRow) pbGhudFxRow.style.display = 'none';
    }
    // Only need to sync prim-specific controls here
    if(window._selectedPrim_get&&window._selectedPrim_get()){
      var prim=window._selectedPrim_get();
      document.querySelectorAll('.gc-pc').forEach(function(sw){sw.classList.toggle('active',sw.dataset.pc===prim.color);});
      var pcp=document.getElementById('gc-pcpick');if(pcp)pcp.value=prim.color;
      var pos=document.getElementById('gc-popacity');var pov=document.getElementById('gc-pop-val');
      if(pos){pos.value=Math.round(prim.opacity*100);if(pov)pov.textContent=Math.round(prim.opacity*100);}
    }
  }

  // Wire material buttons for selected strokes / surfaces
  document.querySelectorAll('.gc-sel-mat-btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var matType=this.dataset.selmat;
      document.querySelectorAll('.gc-sel-mat-btn').forEach(function(b){
        b.classList.toggle('on',b.dataset.selmat===matType);
      });
      window._curStrokeMatType=matType;
      if(selectedStrokes.length>0){
        var oldProps=selectedStrokes.map(function(s){return {stroke:s,color:s.color,sz:s.sz,op:s.op,matType:s.matType||'default'};});
        selectedStrokes.forEach(function(s){
          var fn = typeof _rebuildStrokeMesh === 'function' ? _rebuildStrokeMesh : window._rebuildStrokeMesh;
          if(fn) fn(s,s.color,s.sz,s.op,matType);
        });
        updateSelHighlights();
        markDirty();
        pushUndo({
          type:'stroke_rebuild_multi',
          oldProps:oldProps,
          newProps:selectedStrokes.map(function(s){return {stroke:s,color:s.color,sz:s.sz,op:s.op,matType:matType};})
        });
      } else if(surfMesh){
        if(matType === 'default' || matType === 'flat'){
          surfMesh.material = surfFillMat;
          surfMesh.userData.currentMatType = 'default';
        } else {
          var surfColor = '#' + surfFillMat.color.getHexString();
          var surfOp = surfFillMat.opacity || 0.65;
          var fxScale = window._curFxScale;
          surfMesh.material = getStrokeMat(surfColor, surfOp, true, matType, fxScale);
          surfMesh.userData.currentMatType = matType;
          surfMesh.userData.currentFxScale = fxScale;
        }
        markDirty();
      }
    });
  });

  // Wire action buttons
  document.querySelectorAll('.gc-sel-btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var act=this.dataset.selact;
      if(selectedStrokes.length>0){
        if(act==='all'||act==='move'||act==='rotate'||act==='scale'){
          var sgBtn=document.getElementById('sg-'+act);if(sgBtn)sgBtn.click();
        }
        if(act==='dup'){duplicateSelected();}
        if(act==='loft'){var sgL=document.getElementById('sg-loft');if(sgL)sgL.click();}
        if(act==='loft-solid'){var sgLS=document.getElementById('sg-loft-solid');if(sgLS)sgLS.click();}
        if(act==='del'){deleteSelected();}
        if(act==='close'){clearSelection();setMode('draw');}
      }else if(window._selectedPrim_get&&window._selectedPrim_get()){
        if(act==='all'||act==='move'||act==='rotate'||act==='scale'){
          if(window._pgSetMode)window._pgSetMode(act);
        }
        if(act==='dup'&&window._duplicatePrimExt)window._duplicatePrimExt();
        if(act==='del'&&window._removePrimExt)window._removePrimExt();
        if(act==='close'&&window._deselectPrimExt)window._deselectPrimExt();
        if(act==='useplane'&&window._togglePrimsAsPlaneExt)window._togglePrimsAsPlaneExt();
      }
      _updateGhudSel();
    });
  });

  // Wire prim color swatches
  document.querySelectorAll('.gc-pc').forEach(function(sw){
    sw.addEventListener('click',function(){
      if(!window._selectedPrim_get||!window._selectedPrim_get())return;
      if(window._setPrimColorExt)window._setPrimColorExt(this.dataset.pc);
      _syncGhudSelControls();
    });
  });
  var gcPcpick=document.getElementById('gc-pcpick');
  if(gcPcpick)gcPcpick.addEventListener('input',function(){
    if(window._setPrimColorExt)window._setPrimColorExt(this.value);
    _syncGhudSelControls();
  });
  var gcPop=document.getElementById('gc-popacity');
  if(gcPop)gcPop.addEventListener('input',function(){
    if(window._setPrimOpacityExt)window._setPrimOpacityExt(parseInt(this.value)/100);
    var pov=document.getElementById('gc-pop-val');if(pov)pov.textContent=this.value;
  });
})();
