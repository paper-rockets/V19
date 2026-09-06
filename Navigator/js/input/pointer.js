function clearAll(){
  clearSelection();
  while(strokes.length){const s=strokes.pop();scene.remove(s.mesh);s.mesh.traverse(c=>{if(c.geometry)c.geometry.dispose();if(c.material)c.material.dispose();});}
  redoStack.length=0;_undoStack.length=0;_redoStack.length=0;showMergeLayerRow(false);markDirty();
}

// -- High-Contrast Precision Cursors for Light & Dark Themes -------------------
var _CROSSHAIR_CURSOR = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 2v7M12 15v7M2 12h7M15 12h7' stroke='%23ffffff' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M12 3v5M12 16v5M3 12h5M16 12h5' stroke='%23000000' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\") 12 12, crosshair";

var _ERASE_CURSOR = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect x='4' y='4' width='16' height='16' rx='2' fill='rgba(220,38,38,0.2)' stroke='%23dc2626' stroke-width='2'/%3E%3C/svg%3E\") 12 12, crosshair";

var _SELECT_CURSOR = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M3 3l7 17 2.5-6.5L19 11 3 3z' fill='%230f172a' stroke='%23ffffff' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E\") 3 3, default";

var _DEFAULT_CURSOR = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M3 2l6 18 2.5-6.5L18 11 3 2z' fill='%230f172a' stroke='%23ffffff' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E\") 2 2, default";

function setCanvasCursor(cur) {
  var resolved = _CROSSHAIR_CURSOR;
  if (cur === 'crosshair' || cur === 'draw' || cur === 'fill' || cur === 'smudge' || cur === 'curve') {
    resolved = _CROSSHAIR_CURSOR;
  } else if (cur === 'erase' || cur === 'eraser') {
    resolved = _ERASE_CURSOR;
  } else if (cur === 'select') {
    resolved = _SELECT_CURSOR;
  } else if (cur === 'grab') {
    resolved = 'grab';
  } else if (cur === 'grabbing') {
    resolved = 'grabbing';
  } else if (cur === 'ns-resize') {
    resolved = 'ns-resize';
  } else if (cur === 'ew-resize') {
    resolved = 'ew-resize';
  } else if (cur === 'move') {
    resolved = 'move';
  } else if (cur === 'default' || cur === 'arrow') {
    resolved = _DEFAULT_CURSOR;
  } else if (cur) {
    resolved = cur;
  }

  if (renderer && renderer.domElement) {
    renderer.domElement.style.cursor = resolved;
  }
}
window.setCanvasCursor = setCanvasCursor;

// -- Preview line
// Avoids creating new BufferGeometry + LineBasicMaterial on every touchmove.
// Buffer is sized for MAX_PREV_PTS; drawRange tells Three.js how many to draw.
var MAX_PREV_PTS=2048;
var _prevBuf=new Float32Array(MAX_PREV_PTS*3);
var _prevGeo=new THREE.BufferGeometry();
_prevGeo.setAttribute('position',new THREE.BufferAttribute(_prevBuf,3));
_prevGeo.setDrawRange(0,0);
var _prevMat=new THREE.LineBasicMaterial({color:0x1a1a2e,transparent:true,opacity:.85,linewidth:2,depthTest:false,depthWrite:false});
var prevLine=new THREE.Line(_prevGeo,_prevMat);
prevLine.renderOrder=999;
prevLine.frustumCulled=false;
// Not added to scene until first draw; toggled via visible flag
prevLine.visible=false;
scene.add(prevLine);

// ── 3D Symmetry Mode & Secondary Preview Lines ──
var _symmetryMode = 'off'; // 'off' | 'mirror_x' | 'mirror_y' | 'radial_4'
window._symmetryMode = _symmetryMode;
window._brushVariation = false;
window._brushWidthMult = 1.0; // flat brush width multiplier (model surface painting)

var _symPrevBuf1 = new Float32Array(MAX_PREV_PTS * 3);
var _symPrevGeo1 = new THREE.BufferGeometry();
_symPrevGeo1.setAttribute('position', new THREE.BufferAttribute(_symPrevBuf1, 3));
_symPrevGeo1.setDrawRange(0, 0);
var _symPrevMat1 = new THREE.LineBasicMaterial({color: 0x1a1a2e, transparent: true, opacity: .85, linewidth: 2, depthTest: false, depthWrite: false});
var _symPrevLine1 = new THREE.Line(_symPrevGeo1, _symPrevMat1);
_symPrevLine1.renderOrder = 999; _symPrevLine1.frustumCulled = false; _symPrevLine1.visible = false;
scene.add(_symPrevLine1);

var _symPrevBuf2 = new Float32Array(MAX_PREV_PTS * 3);
var _symPrevGeo2 = new THREE.BufferGeometry();
_symPrevGeo2.setAttribute('position', new THREE.BufferAttribute(_symPrevBuf2, 3));
_symPrevGeo2.setDrawRange(0, 0);
var _symPrevMat2 = new THREE.LineBasicMaterial({color: 0x1a1a2e, transparent: true, opacity: .85, linewidth: 2, depthTest: false, depthWrite: false});
var _symPrevLine2 = new THREE.Line(_symPrevGeo2, _symPrevMat2);
_symPrevLine2.renderOrder = 999; _symPrevLine2.frustumCulled = false; _symPrevLine2.visible = false;
scene.add(_symPrevLine2);

var _symPrevBuf3 = new Float32Array(MAX_PREV_PTS * 3);
var _symPrevGeo3 = new THREE.BufferGeometry();
_symPrevGeo3.setAttribute('position', new THREE.BufferAttribute(_symPrevBuf3, 3));
_symPrevGeo3.setDrawRange(0, 0);
var _symPrevMat3 = new THREE.LineBasicMaterial({color: 0x1a1a2e, transparent: true, opacity: .85, linewidth: 2, depthTest: false, depthWrite: false});
var _symPrevLine3 = new THREE.Line(_symPrevGeo3, _symPrevMat3);
_symPrevLine3.renderOrder = 999; _symPrevLine3.frustumCulled = false; _symPrevLine3.visible = false;
scene.add(_symPrevLine3);

// Symmetry Visual Guide Plane
var _symPlaneGeo = new THREE.PlaneGeometry(16, 16);
var _symPlaneMat = new THREE.MeshBasicMaterial({
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.08,
  side: THREE.DoubleSide,
  depthWrite: false
});
var _symPlaneHelper = new THREE.Mesh(_symPlaneGeo, _symPlaneMat);
_symPlaneHelper.visible = false;
scene.add(_symPlaneHelper);

function setSymmetryMode(mode) {
  _symmetryMode = mode || 'off';
  window._symmetryMode = _symmetryMode;
  if (_symmetryMode === 'mirror_x') {
    _symPlaneHelper.rotation.set(0, Math.PI / 2, 0);
    _symPlaneHelper.position.set(0, 0, 0);
    _symPlaneHelper.visible = true;
  } else if (_symmetryMode === 'mirror_y') {
    _symPlaneHelper.rotation.set(Math.PI / 2, 0, 0);
    _symPlaneHelper.position.set(0, 0, 0);
    _symPlaneHelper.visible = true;
  } else if (_symmetryMode === 'radial_4') {
    _symPlaneHelper.rotation.set(0, 0, 0);
    _symPlaneHelper.position.set(0, 0, 0);
    _symPlaneHelper.visible = true;
  } else {
    _symPlaneHelper.visible = false;
  }
  var btn = document.getElementById('bsymm');
  if (btn) {
    btn.classList.toggle('on', _symmetryMode !== 'off');
    var label = _symmetryMode === 'mirror_x' ? 'Symm: X' : (_symmetryMode === 'mirror_y' ? 'Symm: Y' : (_symmetryMode === 'radial_4' ? 'Symm: 4X' : 'Symmetry'));
    btn.textContent = label;
  }
  markDirty();
}
window.setSymmetryMode = setSymmetryMode;

function updPrev(pts){
  var n=Math.min(pts.length,MAX_PREV_PTS);
  if(n<2){
    prevLine.visible=false;_symPrevLine1.visible=false;_symPrevLine2.visible=false;_symPrevLine3.visible=false;
    markDirty();return;
  }
  // Sync material color/opacity to current brush
  _prevMat.color.set(curColor);_prevMat.opacity=brushOp*.75;
  _symPrevMat1.color.set(curColor);_symPrevMat1.opacity=brushOp*.75;
  _symPrevMat2.color.set(curColor);_symPrevMat2.opacity=brushOp*.75;
  _symPrevMat3.color.set(curColor);_symPrevMat3.opacity=brushOp*.75;

  for(var i=0;i<n;i++){
    var p = pts[i];
    _prevBuf[i*3]=p.x;_prevBuf[i*3+1]=p.y;_prevBuf[i*3+2]=p.z;
    if (_symmetryMode === 'mirror_x') {
      _symPrevBuf1[i*3]=-p.x;_symPrevBuf1[i*3+1]=p.y;_symPrevBuf1[i*3+2]=p.z;
    } else if (_symmetryMode === 'mirror_y') {
      _symPrevBuf1[i*3]=p.x;_symPrevBuf1[i*3+1]=-p.y;_symPrevBuf1[i*3+2]=p.z;
    } else if (_symmetryMode === 'radial_4') {
      _symPrevBuf1[i*3]=-p.x;_symPrevBuf1[i*3+1]=p.y;_symPrevBuf1[i*3+2]=p.z;
      _symPrevBuf2[i*3]=p.x;_symPrevBuf2[i*3+1]=-p.y;_symPrevBuf2[i*3+2]=p.z;
      _symPrevBuf3[i*3]=-p.x;_symPrevBuf3[i*3+1]=-p.y;_symPrevBuf3[i*3+2]=p.z;
    }
  }
  _prevGeo.attributes.position.needsUpdate=true;_prevGeo.setDrawRange(0,n);prevLine.visible=true;

  if (_symmetryMode === 'mirror_x' || _symmetryMode === 'mirror_y') {
    _symPrevGeo1.attributes.position.needsUpdate=true;_symPrevGeo1.setDrawRange(0,n);_symPrevLine1.visible=true;
    _symPrevLine2.visible=false;_symPrevLine3.visible=false;
  } else if (_symmetryMode === 'radial_4') {
    _symPrevGeo1.attributes.position.needsUpdate=true;_symPrevGeo1.setDrawRange(0,n);_symPrevLine1.visible=true;
    _symPrevGeo2.attributes.position.needsUpdate=true;_symPrevGeo2.setDrawRange(0,n);_symPrevLine2.visible=true;
    _symPrevGeo3.attributes.position.needsUpdate=true;_symPrevGeo3.setDrawRange(0,n);_symPrevLine3.visible=true;
  } else {
    _symPrevLine1.visible=false;_symPrevLine2.visible=false;_symPrevLine3.visible=false;
  }
  markDirty();
}

function _buildSingleStrokeObj(pts, curColor, brushSz, brushOp, flatBrush, curMatType, activeLayer) {
  if (pts.length === 1) {
    var dp = _clonePointWithNorm ? _clonePointWithNorm(pts[0]) : pts[0].clone();
    if(pts[0].normal){
      var n = pts[0].normal;
      var t = new THREE.Vector3(0,1,0);
      if(Math.abs(n.y) > 0.9) t.set(1,0,0);
      var side = new THREE.Vector3().crossVectors(n, t).normalize();
      dp.addScaledVector(side, 0.002);
    } else {
      dp.x += 0.002;
    }
    pts.push(dp);
  }
  var vels = computeVels(pts);
  var g = new THREE.Group();
  var tube = buildTube(pts, vels, curColor, brushSz, brushOp, flatBrush, curMatType);
  if (tube) g.add(tube);
  var s = { pts: pts, vels: vels, color: curColor, sz: brushSz, op: brushOp, flat: true, thin: !!window.thinPaint, matType: curMatType, layer: activeLayer, mesh: g, _depthKey: '' };
  g.matrixAutoUpdate = false; g.updateMatrix();
  scene.add(g); strokes.push(s);
  return s;
}

// ── Magnetic Lines ───────────────────────────────────────────────
// Snaps a freehand stroke to a clean geometric shape when the drawn
// path is close enough to a line, arc, or full circle.
window._magneticLines = true; // set false to disable

function _magneticSnap(pts){
  if(!window._magneticLines) return null;
  if(pts.length < 4) return null;

  // Work in the drawing plane — use x and z, ignore y (close to constant)
  var xs = pts.map(function(p){ return p.x; });
  var zs = pts.map(function(p){ return p.z; });
  var ys = pts.map(function(p){ return p.y; });
  var n = pts.length;
  var avgY = ys.reduce(function(a,b){return a+b;},0)/n;

  // Bounding box span used for relative threshold
  var xMin=Infinity,xMax=-Infinity,zMin=Infinity,zMax=-Infinity;
  for(var i=0;i<n;i++){if(xs[i]<xMin)xMin=xs[i];if(xs[i]>xMax)xMax=xs[i];if(zs[i]<zMin)zMin=zs[i];if(zs[i]>zMax)zMax=zs[i];}
  var span = Math.sqrt((xMax-xMin)*(xMax-xMin)+(zMax-zMin)*(zMax-zMin));
  if(span < 0.05) return null; // tap, skip

  // ── 1. Line fit (PCA in x/z) ────────────────────────────────────
  var mx=xs.reduce(function(a,b){return a+b;},0)/n;
  var mz=zs.reduce(function(a,b){return a+b;},0)/n;
  var sxx=0,szz=0,sxz=0;
  for(var i=0;i<n;i++){var dx=xs[i]-mx,dz=zs[i]-mz;sxx+=dx*dx;szz+=dz*dz;sxz+=dx*dz;}
  // Eigenvector of 2x2 cov matrix = principal axis
  var lx,lz;
  if(Math.abs(sxz)<1e-10){lx=(sxx>=szz?1:0);lz=(sxx>=szz?0:1);}
  else{var t=((szz-sxx)+Math.sqrt((sxx-szz)*(sxx-szz)+4*sxz*sxz))/(2*sxz);var mag=Math.sqrt(1+t*t);lx=1/mag;lz=t/mag;}
  // Max perpendicular deviation from line through centroid
  var lineErr=0;
  for(var i=0;i<n;i++){var dx=xs[i]-mx,dz=zs[i]-mz;var perp=Math.abs(dx*lz-dz*lx);if(perp>lineErr)lineErr=perp;}
  var lineRel = lineErr/span;

  if(lineRel < 0.06){
    // Snap to straight line: project start/end onto principal axis
    var ts = pts.map(function(p){return (p.x-mx)*lx+(p.z-mz)*lz;});
    var tMin=Math.min.apply(null,ts),tMax=Math.max.apply(null,ts);
    var steps=32;
    var snapped=[];
    for(var i=0;i<=steps;i++){
      var t=tMin+(tMax-tMin)*(i/steps);
      snapped.push(new THREE.Vector3(mx+t*lx, avgY, mz+t*lz));
    }
    return {pts:snapped, label:'Line'};
  }

  // ── 2. Circle/arc fit (Kåsa algebraic method) ───────────────────
  // Solve: x²+z² + Dx + Ez + F = 0 → least squares
  var A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;
  for(var i=0;i<n;i++){
    var x=xs[i],z=zs[i],r2=x*x+z*z;
    A+=x*x;B+=x*z;C+=z*z;D+=x;E+=z;F+=1;G+=r2*x;H+=r2*z;
  }
  // 3×3 normal equations for [cx, cz, d] where cx,cz = circle center
  // Using the Pratt form simplified: solve via Cramer (3x3)
  var m00=A,m01=B,m02=D,m10=B,m11=C,m12=E,m20=D,m21=E,m22=F;
  var rhs0=G/2,rhs1=H/2,rhs2=(A+C)/2;
  // Wait — simpler 3×3 Kåsa form: [sum(x²) sum(xz) sum(x)] [cx]   [sum(r²x)/2]
  //                                  [sum(xz)  sum(z²) sum(z)] [cz] = [sum(r²z)/2]
  //                                  [sum(x)   sum(z)  n     ] [d ]   [sum(r²)/2  ]
  // Use Cramer's rule
  function det3(a,b,c,d,e,f,g,h,k){return a*(e*k-f*h)-b*(d*k-f*g)+c*(d*h-e*g);}
  var sumR2=(A+C);
  var det=det3(A,B,D,B,C,E,D,E,F);
  if(Math.abs(det)<1e-10) return null;
  var cx=det3(rhs0,B,D,rhs1,C,E,rhs2,E,F)/det;
  var cz=det3(A,rhs0,D,B,rhs1,E,D,rhs2,F)/det;
  var radius=0;
  for(var i=0;i<n;i++){var dx=xs[i]-cx,dz=zs[i]-cz;radius+=Math.sqrt(dx*dx+dz*dz);}
  radius/=n;
  if(radius<0.01) return null;
  // Max radial deviation
  var circErr=0;
  for(var i=0;i<n;i++){var dx=xs[i]-cx,dz=zs[i]-cz;var dev=Math.abs(Math.sqrt(dx*dx+dz*dz)-radius);if(dev>circErr)circErr=dev;}
  var circRel=circErr/radius;

  if(circRel < 0.07){
    // Find angular span
    var angles=pts.map(function(p){return Math.atan2(p.z-cz,p.x-cx);});
    var aStart=angles[0],aEnd=angles[n-1];
    // Determine winding: count sign of successive angle differences
    var cwCount=0,ccwCount=0;
    for(var i=1;i<angles.length;i++){
      var da=angles[i]-angles[i-1];
      if(da>Math.PI)da-=2*Math.PI;
      if(da<-Math.PI)da+=2*Math.PI;
      if(da>0)ccwCount++;else cwCount++;
    }
    var totalAngle=0;
    for(var i=1;i<angles.length;i++){
      var da=angles[i]-angles[i-1];
      if(da>Math.PI)da-=2*Math.PI;
      if(da<-Math.PI)da+=2*Math.PI;
      totalAngle+=da;
    }
    var isFullCircle=Math.abs(Math.abs(totalAngle)-2*Math.PI)<0.8;
    var steps=isFullCircle?64:48;
    var snapped=[];
    if(isFullCircle){
      for(var i=0;i<=steps;i++){
        var a=aStart+2*Math.PI*(i/steps);
        snapped.push(new THREE.Vector3(cx+radius*Math.cos(a),avgY,cz+radius*Math.sin(a)));
      }
    } else {
      for(var i=0;i<=steps;i++){
        var a=aStart+totalAngle*(i/steps);
        snapped.push(new THREE.Vector3(cx+radius*Math.cos(a),avgY,cz+radius*Math.sin(a)));
      }
    }
    return {pts:snapped, label: isFullCircle?'Circle':'Arc'};
  }

  return null;
}

function _clonePointWithNorm(p){
  if(!p) return null;
  var cp = p.clone();
  if(p.normal) cp.normal = p.normal.clone();
  return cp;
}

function finStroke(){
  prevLine.visible=false;_prevGeo.setDrawRange(0,0);
  _symPrevLine1.visible=false;_symPrevGeo1.setDrawRange(0,0);
  _symPrevLine2.visible=false;_symPrevGeo2.setDrawRange(0,0);
  _symPrevLine3.visible=false;_symPrevGeo3.setDrawRange(0,0);
  var pts=(smoothPts.length>=2?smoothPts:rawPts).map(_clonePointWithNorm);
  rawPts=[];smoothPts=[];velHistory=[];lazyPos=null;
  if(pts.length<1)return;
  // Single-point tap: duplicate with micro-offset so buildTube can make a dot
  if(pts.length===1){
    var dp=_clonePointWithNorm(pts[0]);
    if(pts[0].normal){
      var n = pts[0].normal;
      var t = new THREE.Vector3(0,1,0);
      if(Math.abs(n.y) > 0.9) t.set(1,0,0);
      var side = new THREE.Vector3().crossVectors(n, t).normalize();
      dp.addScaledVector(side, 0.002);
    } else {
      dp.x+=0.002;
    }
    pts.push(dp);
  }
  // Trim trailing points that reverse or hook at end of stroke.
  // Smooth mode: trim shallow hooks too (dot < 0.15) since lazy smoothing can
  // leave a lagging tail. Raw mode (v14.2): trim disabled entirely (-1.1) so
  // even full reversals survive — preserves the user's original line shape.
  var _trimThresh=smoothingOn?0.15:-1.1;
  if(pts.length>3){
    var _safety=0;
    while(pts.length>3&&_safety<12){
      _safety++;
      var _n=pts.length;
      var _d1=new THREE.Vector3().subVectors(pts[_n-2],pts[_n-3]).normalize();
      var _d2=new THREE.Vector3().subVectors(pts[_n-1],pts[_n-2]).normalize();
      if(_d1.dot(_d2)<_trimThresh){pts=pts.slice(0,_n-1);}
      else{break;}
    }
  }

  // ── Magnetic snap ─────────────────────────────────────────────
  var _snap = _magneticSnap(pts);
  if(_snap){ pts = _snap.pts; toast(_snap.label+' snapped ✦', 900); }

  var curMatType=window._curStrokeMatType||'default';

  var _jSz=brushSz, _jOp=brushOp, _jCol=curColor;
  if(window._brushVariation!==false){
    _jSz=brushSz*(0.85+Math.random()*0.30);
    _jOp=Math.min(1,Math.max(0.1, brushOp*(0.90+Math.random()*0.20)));
    var _tc=new THREE.Color(curColor);
    var _hsl={};_tc.getHSL(_hsl);
    _hsl.h=(_hsl.h+(Math.random()-0.5)*0.04+1)%1;
    _hsl.s=Math.min(1,Math.max(0,_hsl.s+(Math.random()-0.5)*0.06));
    _tc.setHSL(_hsl.h,_hsl.s,_hsl.l);
    _jCol='#'+_tc.getHexString();
  }
  var primaryStroke = _buildSingleStrokeObj(pts, _jCol, _jSz, _jOp, flatBrush, curMatType, activeLayer);

  if (_symmetryMode === 'mirror_x') {
    var symPts = pts.map(function(p){ var sp = new THREE.Vector3(-p.x, p.y, p.z); if(p.normal) sp.normal = new THREE.Vector3(-p.normal.x, p.normal.y, p.normal.z); return sp; });
    var symStroke = _buildSingleStrokeObj(symPts, _jCol, _jSz, _jOp, flatBrush, curMatType, activeLayer);
    pushUndo({ type: 'stroke_add_multi', strokes: [primaryStroke, symStroke] });
  } else if (_symmetryMode === 'mirror_y') {
    var symPts = pts.map(function(p){ var sp = new THREE.Vector3(p.x, -p.y, p.z); if(p.normal) sp.normal = new THREE.Vector3(p.normal.x, -p.normal.y, p.normal.z); return sp; });
    var symStroke = _buildSingleStrokeObj(symPts, _jCol, _jSz, _jOp, flatBrush, curMatType, activeLayer);
    pushUndo({ type: 'stroke_add_multi', strokes: [primaryStroke, symStroke] });
  } else if (_symmetryMode === 'radial_4') {
    var symPts1 = pts.map(function(p){ var sp = new THREE.Vector3(-p.x, p.y, p.z); if(p.normal) sp.normal = new THREE.Vector3(-p.normal.x, p.normal.y, p.normal.z); return sp; });
    var symPts2 = pts.map(function(p){ var sp = new THREE.Vector3(p.x, -p.y, p.z); if(p.normal) sp.normal = new THREE.Vector3(p.normal.x, -p.normal.y, p.normal.z); return sp; });
    var symPts3 = pts.map(function(p){ var sp = new THREE.Vector3(-p.x, -p.y, p.z); if(p.normal) sp.normal = new THREE.Vector3(-p.normal.x, -p.normal.y, p.normal.z); return sp; });
    var s1 = _buildSingleStrokeObj(symPts1, _jCol, _jSz, _jOp, flatBrush, curMatType, activeLayer);
    var s2 = _buildSingleStrokeObj(symPts2, _jCol, _jSz, _jOp, flatBrush, curMatType, activeLayer);
    var s3 = _buildSingleStrokeObj(symPts3, _jCol, _jSz, _jOp, flatBrush, curMatType, activeLayer);
    pushUndo({ type: 'stroke_add_multi', strokes: [primaryStroke, s1, s2, s3] });
  } else {
    pushUndo({ type: 'stroke_add', stroke: primaryStroke });
  }
  markDirty();
}

// ── Eraser ───────────────────────────────────────────────────────
function tryErase(px,py){
  _refreshRect();
  var r=_cachedRect;
  const sx=px-r.left,sy=py-r.top,W=r.width,H=r.height,ac=activeCam();
  const THRESH=22,tmpV=new THREE.Vector3();
  var bestI=-1,bestDist=THRESH,bestPtIdx=-1;
  for(let i=strokes.length-1;i>=0;i--){
    const s=strokes[i];
    if(!s.mesh.visible)continue;
    s.mesh.updateMatrixWorld(false);
    var mw=s.mesh.matrixWorld;
    const step=Math.max(1,Math.floor(s.pts.length/60));
    var minDist=Infinity,nearMiss=false,minPtIdx=0;
    // Coarse pass
    for(let j=0;j<s.pts.length;j+=step){
      tmpV.copy(s.pts[j]).applyMatrix4(mw);tmpV.project(ac);
      if(tmpV.z<=1.0){
        var d=Math.hypot((tmpV.x*.5+.5)*W-sx,(-tmpV.y*.5+.5)*H-sy);
        if(d<minDist){minDist=d;minPtIdx=j;}
        if(d<THRESH*2)nearMiss=true;
      }
    }
    // Dense pass if coarse pass was close — scan the full point list to get true minimum
    if(nearMiss){
      for(let jj=0;jj<s.pts.length;jj++){
        tmpV.copy(s.pts[jj]).applyMatrix4(mw);tmpV.project(ac);
        if(tmpV.z<=1.0){
          var dd=Math.hypot((tmpV.x*.5+.5)*W-sx,(-tmpV.y*.5+.5)*H-sy);
          if(dd<minDist){minDist=dd;minPtIdx=jj;}
        }
      }
    }
    if(minDist<bestDist){bestDist=minDist;bestI=i;bestPtIdx=minPtIdx;}
  }
  if(bestI>-1){
    const s=strokes[bestI];const i=bestI;
    if(s===_hoverStroke)setHoverStroke(null);

    if(_partialErase){
      // Partial erase: remove points within screen radius around touch, split remainder
      s.mesh.updateMatrixWorld(false);
      var mw2=s.mesh.matrixWorld;
      var ERASE_R=12+brushSz*3; // sz1→15, sz3→21, sz6→30
      // Use bestPtIdx as center — find contiguous range of points near the touch
      var keepL=[],keepR=[],hitZone=false,pastZone=false;
      for(var pi=0;pi<s.pts.length;pi++){
        tmpV.copy(s.pts[pi]).applyMatrix4(mw2);tmpV.project(ac);
        var pd=Math.hypot((tmpV.x*.5+.5)*W-sx,(-tmpV.y*.5+.5)*H-sy);
        if(pd<ERASE_R){hitZone=true;}
        else if(hitZone&&!pastZone){pastZone=true;keepR.push(s.pts[pi]);}
        else if(pastZone){keepR.push(s.pts[pi]);}
        else{keepL.push(s.pts[pi]);}
      }
      // If no points in radius, do nothing (don't fall through to whole delete)
      if(!hitZone)return false;
      // If entire stroke is within radius, delete the whole thing
      if(!keepL.length&&!keepR.length){
        pushUndo({type:'stroke_delete',stroke:s,index:i});
        strokes.splice(i,1);scene.remove(s.mesh);
        s.mesh.traverse(function(c){if(c.geometry)c.geometry.dispose();if(c.material)c.material.dispose();});
        markDirty();return true;
      }
      // Remove original stroke from scene (keep mesh alive for undo)
      scene.remove(s.mesh);
      strokes.splice(i,1);
      // Build halves from remaining points
      var newStrokes=[];
      var halves=[keepL,keepR];
      for(var hi=0;hi<halves.length;hi++){
        var hp=halves[hi];
        if(hp.length<2)continue;
        var hpts=hp.map(function(p){return p.clone();});
        var hvels=computeVels(hpts);
        var hg=new THREE.Group();
        var _prevThin=window.thinPaint;window.thinPaint=!!s.thin;
        var htube=buildTube(hpts,hvels,s.color,s.sz,s.op,s.flat,s.matType);
        window.thinPaint=_prevThin;
        if(htube)hg.add(htube);
        // Copy original stroke transform
        hg.matrix.copy(s.mesh.matrix);
        hg.matrix.decompose(hg.position,hg.quaternion,hg.scale);
        hg.matrixAutoUpdate=false;
        var ns={pts:hpts,vels:hvels,color:s.color,sz:s.sz,op:s.op,flat:true,matType:s.matType||'default',layer:s.layer,mesh:hg,_depthKey:''};
        scene.add(hg);strokes.push(ns);
        newStrokes.push(ns);
      }
      pushUndo({type:'stroke_split',original:s,originalIndex:i,newStrokes:newStrokes});
      markDirty();return true;
    }

    // Whole-line erase (default)
    pushUndo({type:'stroke_delete',stroke:s,index:i});
    strokes.splice(i,1);scene.remove(s.mesh);
    s.mesh.traverse(function(c){if(c.geometry)c.geometry.dispose();if(c.material)c.material.dispose();});
    markDirty();return true;
  }
  return false;
}

// ── Selection & hover visuals ─────────────────────────────────────
// selectedStrokes: strokes currently selected (yellow line + emissive tint)
// _hoverStroke:    stroke under pointer in select mode (blue/green line, no touch)
//
// All highlight lines use depthTest:false so they always show above geometry.
// Hover: blue = will be added to selection; green = will be removed (already selected).

let selectedStrokes=[],selHighlights=[];
var _hoverStroke=null,_hoverHighlight=null;

var _matSelLine  =new THREE.LineBasicMaterial({color:0xf5c842,transparent:true,opacity:.9,depthTest:false,depthWrite:false});
var _matHoverBlue=new THREE.LineBasicMaterial({color:0x3a9eff,transparent:true,opacity:.85,depthTest:false,depthWrite:false});
var _matHoverGreen=new THREE.LineBasicMaterial({color:0x22dd66,transparent:true,opacity:.85,depthTest:false,depthWrite:false});

function _strokeOverlay(s,mat){
  // Clone each mesh in the stroke group with geometry baked into world space.
  // Uses matrixWorld (not matrix) so it works correctly regardless of scene hierarchy.
  // depthTest:false ensures overlay always shows above all other geometry.
  s.mesh.updateMatrixWorld(true);
  var grp=new THREE.Group();
  grp.frustumCulled=false;
  s.mesh.traverse(function(c){
    if(!c.isMesh||!c.geometry)return;
    var geo=c.geometry.clone();
    // Build combined world matrix: group world * child local matrix
    var worldMat=new THREE.Matrix4();
    worldMat.multiplyMatrices(s.mesh.matrixWorld,c.matrix);
    geo.applyMatrix4(worldMat);
    var m=new THREE.Mesh(geo,mat);
    m.renderOrder=9;m.frustumCulled=false;
    grp.add(m);
  });
  return grp;
}

function _disposeObj(obj){
  if(!obj)return;
  obj.traverse(function(c){
    if(c.geometry)c.geometry.dispose();
    // Don't dispose shared materials (_matSelLine etc) — only per-object ones
  });
  scene.remove(obj);
}

// ── Selected highlights ───────────────────────────────────────────
function updateSelHighlights(){
  selHighlights.forEach(_disposeObj);
  selHighlights=[];
  var mat=new THREE.MeshBasicMaterial({color:0xf5c842,transparent:true,opacity:.75,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
  selectedStrokes.forEach(function(s){
    var grp=_strokeOverlay(s,mat);
    grp.renderOrder=8;
    scene.add(grp);selHighlights.push(grp);
  });
  // Refresh hover color (blue↔green) after selection changes
  var pending=_hoverStroke;
  _hoverStroke=null;
  _updateHoverLine(pending);
  applySelectionTint();
  markDirty();
}

// ── Hover highlight ───────────────────────────────────────────────
function _updateHoverLine(s){
  _disposeObj(_hoverHighlight);
  _hoverHighlight=null;
  _hoverStroke=s||null;
  if(!s){markDirty();return;}
  var col;
  if(mode==='erase'){
    col=0xff2233; // red — will be erased
  } else {
    var isSelected=selectedStrokes.indexOf(s)>-1;
    col=isSelected?0x22dd66:0x3a9eff; // green = deselect, blue = select
  }
  var mat=new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.82,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
  var grp=_strokeOverlay(s,mat);
  grp.renderOrder=9;
  scene.add(grp);_hoverHighlight=grp;
  markDirty();
}

function setHoverStroke(s){
  var isSel=s&&selectedStrokes.indexOf(s)>-1;
  var isErase=mode==='erase';
  // Skip if same stroke and same color would result
  if(s===_hoverStroke&&_hoverHighlight){
    var curColor=_hoverHighlight.children&&_hoverHighlight.children[0]&&
      _hoverHighlight.children[0].material&&
      _hoverHighlight.children[0].material.color.getHex();
    var wantColor=isErase?0xff2233:(isSel?0x22dd66:0x3a9eff);
    if(curColor===wantColor)return;
  } else if(s===_hoverStroke&&!_hoverHighlight&&!s){
    return;
  }
  _updateHoverLine(s);
}

var _fnsVFrustum=new THREE.Frustum();
var _fnsVProjMat=new THREE.Matrix4();
function findNearestStroke(px,py){
  _refreshRect();
  var r=_cachedRect;
  var sx=px-r.left,sy=py-r.top,W=r.width,H=r.height,ac=activeCam();
  // Build frustum for culling
  ac.updateMatrixWorld(false);
  _fnsVProjMat.multiplyMatrices(ac.projectionMatrix,ac.matrixWorldInverse);
  _fnsVFrustum.setFromProjectionMatrix(_fnsVProjMat);
  var THRESH=32,tmpV=new THREE.Vector3();
  var bestStroke=null,bestDist=THRESH;
  for(var i=strokes.length-1;i>=0;i--){
    var s=strokes[i];
    if(!s.mesh.visible)continue;
    s.mesh.updateMatrixWorld(false);
    var mw=s.mesh.matrixWorld;
    // Quick frustum cull using bounding sphere of stroke points
    if(s.pts.length>4){
      var mid=s.pts[Math.floor(s.pts.length/2)];
      tmpV.copy(mid).applyMatrix4(mw);
      if(!_fnsVFrustum.containsPoint(tmpV)){
        // Check endpoints too before skipping
        tmpV.copy(s.pts[0]).applyMatrix4(mw);
        var ep0In=_fnsVFrustum.containsPoint(tmpV);
        if(!ep0In){
          tmpV.copy(s.pts[s.pts.length-1]).applyMatrix4(mw);
          if(!_fnsVFrustum.containsPoint(tmpV))continue;
        }
      }
    }
    var step=Math.max(1,Math.floor(s.pts.length/60));
    var minDist=Infinity,nearMiss=false;
    for(var j=0;j<s.pts.length;j+=step){
      tmpV.copy(s.pts[j]).applyMatrix4(mw);tmpV.project(ac);
      var d=Math.hypot((tmpV.x*.5+.5)*W-sx,(-tmpV.y*.5+.5)*H-sy);
      if(d<minDist)minDist=d;
      if(d<THRESH){nearMiss=false;break;}
      if(d<THRESH*2)nearMiss=true;
    }
    // Dense pass if coarse pass was close but not inside threshold
    if(nearMiss){
      for(var jj=0;jj<s.pts.length;jj++){
        tmpV.copy(s.pts[jj]).applyMatrix4(mw);tmpV.project(ac);
        var dd=Math.hypot((tmpV.x*.5+.5)*W-sx,(-tmpV.y*.5+.5)*H-sy);
        if(dd<minDist)minDist=dd;
      }
    }
    if(minDist<bestDist){bestDist=minDist;bestStroke=s;}
  }
  return bestStroke;
}

// ── Emissive tint for selected strokes ────────────────────────────
var SEL_EMISSIVE=new THREE.Color(0xf5c842);
var SEL_EMISSIVE_INT=0.35;
function applySelectionTint(){
  strokes.forEach(function(s){
    var isSel=selectedStrokes.indexOf(s)>-1;
    s.mesh.traverse(function(c){
      if(!c.isMesh||!c.material||!c.material.emissive)return;
      c.material.emissive=isSel?SEL_EMISSIVE.clone():new THREE.Color(0x000000);
      c.material.emissiveIntensity=isSel?SEL_EMISSIVE_INT:0;
      c.material.needsUpdate=true;
    });
  });
  markDirty();
}

// ── clearSelection ────────────────────────────────────────────────
function clearSelection(){
  selectedStrokes=[];
  selHighlights.forEach(_disposeObj);selHighlights=[];
  _updateHoverLine(null);
  applySelectionTint();
  _hideSgizmo();
  if(window._sgGcDraw)window._sgGcDraw();
  if(window._syncLoftSolidBtn)window._syncLoftSolidBtn();
  markDirty();
}

// ── selectStroke (on click/tap) ───────────────────────────────────
function selectStroke(px,py,addToSelection){
  if(!addToSelection)clearSelection();
  var bestStroke=findNearestStroke(px,py);
  if(bestStroke){
    var idx=selectedStrokes.indexOf(bestStroke);
    if(idx>-1)selectedStrokes.splice(idx,1);
    else selectedStrokes.push(bestStroke);
    updateSelHighlights();
    if(selectedStrokes.length>0){
      positionStrokeGizmo();
      _showSgizmo();
      if(window._sgGcDraw)window._sgGcDraw();
      if(window._syncLoftSolidBtn)window._syncLoftSolidBtn();
      if(window._syncSgControls)window._syncSgControls();
    } else {
      _hideSgizmo();
    }
    return true;
  }
  if(!addToSelection)_hideSgizmo();
  if(window._syncLoftSolidBtn)window._syncLoftSolidBtn();
  return false;
}
var _sgizmoDragged=false;
function positionStrokeGizmo(){
  const sg=document.getElementById('sgizmo');
  if(!_sgizmoDragged){
    sg.style.left='10px';sg.style.top='52px';sg.style.right='';
  }
  sg.style.maxHeight='calc(100dvh - 120px)';
}
// Show/hide sgizmo — when visible, add gc-hosted class to hide canvas
// (gc canvas renders the gizmo instead), show only property controls
function _showSgizmo(){
  var sg=document.getElementById('sgizmo');
  sg.classList.add('vis');
  sg.classList.add('gc-hosted');
  if(window._updateGhudSel)window._updateGhudSel();
}
function _hideSgizmo(){
  var sg=document.getElementById('sgizmo');
  sg.classList.remove('vis');
  sg.classList.remove('gc-hosted');
  if(window._updateGhudSel)window._updateGhudSel();
}

// ── Sgizmo drag ──
(function(){
  var sg=document.getElementById('sgizmo');
  var handle=document.getElementById('sgizmo-handle');
  if(!sg||!handle)return;
  var dragState=null;
  function onStart(e){
    e.preventDefault();e.stopPropagation();
    var src=e.touches?e.touches[0]:e;
    var r=sg.getBoundingClientRect();
    dragState={ox:src.clientX-r.left,oy:src.clientY-r.top};
  }
  function onMove(e){
    if(!dragState)return;
    e.preventDefault();
    var src=e.touches?e.touches[0]:e;
    var nx=src.clientX-dragState.ox;
    var ny=src.clientY-dragState.oy;
    var sw=sg.offsetWidth,sh=sg.offsetHeight;
    nx=Math.max(0,Math.min(window.innerWidth-sw,nx));
    ny=Math.max(0,Math.min(window.innerHeight-sh,ny));
    sg.style.left=nx+'px';sg.style.top=ny+'px';
    _sgizmoDragged=true;
  }
  function onEnd(){dragState=null;}
  handle.addEventListener('touchstart',onStart,{passive:false});
  handle.addEventListener('touchmove',onMove,{passive:false});
  handle.addEventListener('touchend',onEnd);
  handle.addEventListener('mousedown',onStart);
  document.addEventListener('mousemove',function(e){if(dragState)onMove(e);});
  document.addEventListener('mouseup',onEnd);
})();

// ── Multi-select add mode ─────────────────────────────────────────
// Always-on: every tap appends/toggles selection — no need to press +ADD.
// _selAddMode stays true permanently; clearSelection no longer resets it.
var _selAddMode=true;
function setSelAddMode(on){
  _selAddMode=on;
  var btn=document.getElementById('sg-addmode');
  if(btn)btn.classList.toggle('on',on);
}
function deleteSelected(){
  if(!selectedStrokes.length)return;
  const count=selectedStrokes.length;
  selectedStrokes.slice().forEach(s=>{
    const i=strokes.indexOf(s);
    if(i>-1){pushUndo({type:'stroke_delete',stroke:s,index:i});strokes.splice(i,1);scene.remove(s.mesh);s.mesh.traverse(c=>{if(c.geometry)c.geometry.dispose();if(c.material)c.material.dispose();});}
  });
  clearSelection();toast('Deleted '+count+' stroke'+(count>1?'s':''));
}
function duplicateSelected(){
  if(!selectedStrokes.length)return;
  const duped=[];
  selectedStrokes.forEach(s=>{
    const newG=new THREE.Group();
    const newPts=s.pts.map(p=>p.clone());
    const vels=computeVels(newPts);
    var _pt=window.thinPaint;window.thinPaint=!!s.thin;
    const tube=buildTube(newPts,vels,s.color,s.sz,s.op,true,s.matType);window.thinPaint=_pt;if(tube)newG.add(tube);
    // Copy the source mesh's transform matrix exactly — duplicate lands on the original
    newG.matrix.copy(s.mesh.matrix);
    newG.matrix.decompose(newG.position,newG.quaternion,newG.scale);
    newG.matrixAutoUpdate=false;
    const ns={pts:newPts,vels,color:s.color,sz:s.sz,op:s.op,flat:true,matType:s.matType||'default',layer:s.layer,mesh:newG,_depthKey:''};
    scene.add(newG);strokes.push(ns);
    pushUndo({type:'stroke_duplicate',newStroke:ns});
    duped.push(ns);
  });
  // Re-select the duplicates
  clearSelection();
  selectedStrokes=duped;
  updateSelHighlights();
  if(selectedStrokes.length>0){positionStrokeGizmo();_showSgizmo();}
  if(window._sgGcDraw)window._sgGcDraw();
  if(window._syncSgControls)window._syncSgControls();
  toast('Duplicated');
}

// ── Layer system ─────────────────────────────────────────────────
// activeLayer = which layer new strokes go on (one at a time)
// layerVisible = eye toggle per layer (independent)
// Layer 3 = Merged (special, created by merge operation)
let activeLayer=0;const layerVisible=[true,true,true,true];

function setActiveLayer(i){
  activeLayer=i;
  [0,1,2,3].forEach(j=>{
    const tb=document.getElementById('tb-lrow'+j);if(tb)tb.classList.toggle('active',j===i);
  });
  // Sync narrow layer dot color
  var dotColors=['#b03020',_themeInk(1),'#1a9940','#8b5cf6'];
  var dot=document.getElementById('pb-layer-dot');
  if(dot)dot.style.background=dotColors[i]||_themeInk(1);
}
function setLayerVisible(i,v){
  layerVisible[i]=v;
  const tbeye=document.getElementById('tb-leye'+i);
  if(tbeye){tbeye.textContent=v?'◉':'○';tbeye.classList.toggle('vis',v);}
  applyLayerVisibility();
}
function applyLayerVisibility(){strokes.forEach(s=>{const layer=s.layer!=null?s.layer:1;s.mesh.visible=layerVisible[layer]!==false;});markDirty();}

function showMergeLayerRow(show){
  var row=document.getElementById('tb-lrow3');
  if(row)row.style.display=show?'flex':'none';
}

// ── Merge layer ────────────────────────────────────────────────────
function mergeLayer(srcLayer){
  var toMerge=strokes.filter(function(s){return(s.layer!=null?s.layer:1)===srcLayer;});
  if(!toMerge.length){toast('Nothing on layer');return;}

  // Build merged group with all geometry baked to world space
  var mergedGroup=new THREE.Group();
  toMerge.forEach(function(s){
    s.mesh.traverse(function(c){
      if(!c.isMesh||!c.geometry)return;
      var geo=c.geometry.clone();
      geo.applyMatrix4(s.mesh.matrix);
      var mat=c.material.clone();
      var m=new THREE.Mesh(geo,mat);
      m.renderOrder=3;
      mergedGroup.add(m);
    });
  });
  mergedGroup.matrixAutoUpdate=false;
  mergedGroup.updateMatrix();

  // Remove any existing merged stroke on layer 3
  var replacedMerged=strokes.filter(function(s){return s.layer===3;});
  replacedMerged.forEach(function(s){
    var idx=strokes.indexOf(s);
    if(idx>-1){strokes.splice(idx,1);}
    scene.remove(s.mesh);
  });

  // Remove originals
  var savedOrigIndices=[];
  toMerge.forEach(function(s){
    var idx=strokes.indexOf(s);
    if(idx>-1)savedOrigIndices.push(idx);
    scene.remove(s.mesh);
  });
  savedOrigIndices.sort(function(a,b){return b-a;}).forEach(function(i){strokes.splice(i,1);});

  scene.add(mergedGroup);
  var mergeColor=toMerge[0]?toMerge[0].color:'#1a1a2e';
  var mergedStroke={pts:[new THREE.Vector3()],vels:[0],color:mergeColor,sz:1,op:1,flat:false,layer:3,mesh:mergedGroup,_depthKey:''};
  strokes.push(mergedStroke);

  _undoStack.push({type:'merge_layer',srcLayer:srcLayer,origStrokes:toMerge,savedOrigIndices:savedOrigIndices,mergedStroke:mergedStroke,replacedMerged:replacedMerged});
  _redoStack.length=0;redoStack.length=0;

  showMergeLayerRow(true);
  applyLayerVisibility();
  markDirty();
  toast('Merged to layer 3');
}

[0,1,2,3].forEach(i=>{
  // Topbar layers popover — row click = set active layer
  const tblb=document.getElementById('tb-lrow'+i);
  if(tblb)tblb.addEventListener('click',function(e){
    if(e.target===document.getElementById('tb-leye'+i))return;
    if(e.target===document.getElementById('tb-merge'+i))return;
    setActiveLayer(i);
  });
  const tbeye=document.getElementById('tb-leye'+i);
  if(tbeye)tbeye.addEventListener('click',function(e){e.stopPropagation();setLayerVisible(i,!layerVisible[i]);});
  // Merge buttons (layers 0-2 only)
  const tbmerge=document.getElementById('tb-merge'+i);
  if(tbmerge)tbmerge.addEventListener('click',function(e){e.stopPropagation();mergeLayer(i);});
});

// Topbar LAYERS button — open/close popover below button
window._closeAllDropdowns=function(exceptId){
  var allPops=['layers-pop','mat-pop','view-pop','bgpop','sz-pop','op-pop','ruler-pop','scale-pop','prims-pop'];
  allPops.forEach(function(id){
    if(id!==exceptId){
      var el=document.getElementById(id);if(el)el.classList.remove('open');
    }
  });
  if(exceptId!=='layers-pop'){var bl=document.getElementById('blayers');if(bl)bl.classList.remove('on');}
  if(window._stageSystem && exceptId!=='stage-panel'){window._stageSystem.hide();}
  if(exceptId!=='mat-pop'){var bp=document.getElementById('bprocedural-tb');if(bp)bp.classList.remove('on');}
};

// Topbar LAYERS button — open/close popover below button
(function(){
  var btn=document.getElementById('blayers');
  var pop=document.getElementById('layers-pop');
  if(!btn||!pop)return;
  function openLayersPop(trigger){
    if(window._closeAllDropdowns)window._closeAllDropdowns('layers-pop');
    pop.classList.add('open');
    btn.classList.add('on');
    var br=trigger.getBoundingClientRect();
    var s=typeof window.getUiScale==='function'?window.getUiScale():1.0;
    pop.style.top=((br.bottom+6)/s)+'px';
    pop.style.left=(Math.max(4,Math.min(br.left,window.innerWidth-pop.getBoundingClientRect().width-4))/s)+'px';
  }
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    if(pop.classList.contains('open')){pop.classList.remove('open');btn.classList.remove('on');}
    else{openLayersPop(btn);}
  });
  // Narrow layer dot — also opens layers popover
  var dot=document.getElementById('pb-layer-dot');
  if(dot)dot.addEventListener('click',function(e){
    e.stopPropagation();
    if(pop.classList.contains('open')){pop.classList.remove('open');btn.classList.remove('on');}
    else{openLayersPop(dot);}
  });
  document.addEventListener('click',function(e){
    if(!pop.contains(e.target)&&e.target!==btn&&e.target!==dot){
      pop.classList.remove('open');
      btn.classList.remove('on');
    }
  });
})();

// Topbar STAGE button — toggles unified Stage & Environment system
(function(){
  var btn=document.getElementById('btn-stage-toggle');
  if(!btn)return;
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    if(window._closeAllDropdowns)window._closeAllDropdowns('stage-panel');
    if(window._stageSystem){
      window._stageSystem.toggle();
    }
  });
})();

// ── Toast ─────────────────────────────────────────────────────────
let toastTimer=null;
function toast(msg,dur=1400){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),dur);}

// ── Gesture swap ─────────────────────────────────────────────────
// twoFingerMode: 'orbit' (default) | 'draw' (2-finger=pan, 1-finger=draw but on canvas only)
let twoFingerMode='orbit';
function updateGestLabel(){
  var txt;
  if(stylusOnly){
    txt=twoFingerMode==='orbit'?'1F: Spin':'1F: Move';
  } else {
    txt=twoFingerMode==='orbit'?'2F: Spin':'2F: Move';
  }
  const b=document.getElementById('bgestswap');if(b)b.textContent=txt;
  var pb=document.getElementById('pb-gestswap');if(pb)pb.textContent=txt;
}
// stylusOnly: when true, finger touch = navigate (1F orbit, 2F pan); only pen draws
let stylusOnly=false;
function updateStylusLabel(){
  var txt=stylusOnly?'STYLUS':'FINGER';
  var b=document.getElementById('bstylus');if(b){b.textContent=txt;if(stylusOnly){b.classList.add('on');}else{b.classList.remove('on');}}
  var pb=document.getElementById('pb-stylus');if(pb){pb.textContent=txt;if(stylusOnly){pb.classList.add('on');}else{pb.classList.remove('on');}}
}

// ── Pointer / gesture handling ────────────────────────────────────
// Store the identifier of the finger that started drawing so we track the right finger even if indices shift
let _drawTouchId=null;
// _touchDragMode: tracks active touch drag in erase/select ('erase'|'select'|null)
var _touchDragMode=null;
// _dragSelectMode: 'add'|'remove' — set on first stroke touched, held for entire drag
var _dragSelectMode=null;
function ppos(e){
  if(e.touches){
    // If we have a stored drawing touch ID, find it specifically
    if(_drawTouchId!==null){
      for(let i=0;i<e.touches.length;i++){if(e.touches[i].identifier===_drawTouchId)return{x:e.touches[i].clientX,y:e.touches[i].clientY};}
    }
    return{x:e.touches[0].clientX,y:e.touches[0].clientY};
  }
  return{x:e.clientX,y:e.clientY};
}
let lastPD=null,lastTouchTime=0;
// Gesture lock for 2-finger: 'none' | 'zoom' | 'navigate' | 'both'
let _twoFingerLock='none',_twoFingerStartD=0,_twoFingerStartCX=0,_twoFingerStartCY=0;
function pinchD(e){return Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);}
let threeFingerPan=false,tf3Anchor=null,tf3TargetAtStart=null;

// Reusable temp vectors for panUnproject — avoids per-call GC pressure
var _puOrigin=new THREE.Vector3(),_puDir=new THREE.Vector3(),_puFwd=new THREE.Vector3(),_puTmp=new THREE.Vector3(),_puResult=new THREE.Vector3();
function panUnproject(sx,sy){
  var r=_cachedRect;
  const ndcX=(sx/r.width)*2-1,ndcY=-(sy/r.height)*2+1;
  if(useOrtho){
    // For ortho: unproject NDC directly to world space on the Z=target.z plane
    const ac=ortho;
    _puResult.set(ndcX,ndcY,0).unproject(ac);
    return _puResult;
  }
  const ac=camera;
  _puOrigin.setFromMatrixPosition(ac.matrixWorld);
  _puDir.set(ndcX,ndcY,.5).unproject(ac).sub(_puOrigin).normalize();
  _puFwd.subVectors(cam.target,_puOrigin).normalize();
  const denom=_puFwd.dot(_puDir);if(Math.abs(denom)<1e-6)return cam.target.clone();
  const t=_puFwd.dot(_puTmp.subVectors(cam.target,_puOrigin))/denom;
  _puResult.copy(_puOrigin).addScaledVector(_puDir,t);
  return _puResult;
}
function resetGesture(){cam.active=false;cam.panActive=false;lastPD=null;threeFingerPan=false;tf3Anchor=null;_twoFingerLock='none';_touchDragMode=null;_dragSelectMode=null;}
function cancelDraw(){if(isDrawing){isDrawing=false;rawPts=[];smoothPts=[];velHistory=[];lazyPos=null;_drawTouchId=null;prevLine.visible=false;_prevGeo.setDrawRange(0,0);if(window._rulerStrokeEnd) window._rulerStrokeEnd();}; _touchDragMode=null;_dragSelectMode=null;}
function startOrbit(e){const p=ppos(e);cam.active=true;cam.sx=p.x;cam.sy=p.y;cam.st=cam.theta;cam.sp=cam.phi;
}
function startPan(e){const p=ppos(e);cam.panActive=true;cam.panAnchor=panUnproject(p.x-_cachedRect.left,p.y-_cachedRect.top).clone();cam.panTargetAtStart.copy(cam.target);cam._panPrevX=p.x;cam._panPrevY=p.y;}
function doOrbit(e){const p=ppos(e);
  if(_fpsMode){
    cam.theta=cam.st+(p.x-cam.sx)*.013;
    cam.phi=Math.max(.05,Math.min(Math.PI-.05,cam.sp-(p.y-cam.sy)*.013));
  } else {
    cam.theta=cam.st-(p.x-cam.sx)*.013;
    cam.phi=Math.max(.05,Math.min(Math.PI-.05,cam.sp-(p.y-cam.sy)*.013));
  }
  updCam();
}
function doPan(e,overrideCX,overrideCY){
  var cx,cy;
  if(overrideCX!=null){cx=overrideCX;cy=overrideCY;}
  else{const p=ppos(e);cx=p.x;cy=p.y;}
  var prevX=cam._panPrevX!=null?cam._panPrevX:cx;
  var prevY=cam._panPrevY!=null?cam._panPrevY:cy;
  var dx=cx-prevX,dy=cy-prevY;
  cam._panPrevX=cx;cam._panPrevY=cy;
  if(Math.abs(dx)<0.3&&Math.abs(dy)<0.3)return;
  var r=_cachedRect;
  if(useOrtho){
    var ac=ortho;
    var worldW=(ac.right-ac.left);var worldH=(ac.top-ac.bottom);
    var me=ac.matrixWorld.elements;
    var rightX=me[0],rightY=me[1],rightZ=me[2];
    var upX=me[4],upY=me[5],upZ=me[6];
    var panX=(dx/r.width)*worldW;
    var panY=(dy/r.height)*worldH;
    cam.target.x-=rightX*panX-upX*panY;
    cam.target.y-=rightY*panX-upY*panY;
    cam.target.z-=rightZ*panX-upZ*panY;
  } else {
    var ac=camera;
    var dist=cam.radius || ac.position.distanceTo(cam.target);
    var vFov=ac.fov*Math.PI/180;
    var visibleHeight=2*Math.tan(vFov/2)*dist;
    var visibleWidth=visibleHeight*ac.aspect;
    var me=ac.matrixWorld.elements;
    var rightX=me[0],rightY=me[1],rightZ=me[2];
    var upX=me[4],upY=me[5],upZ=me[6];
    var panX=(dx/r.width)*visibleWidth;
    var panY=(dy/r.height)*visibleHeight;
    cam.target.x-=rightX*panX-upX*panY;
    cam.target.y-=rightY*panX-upY*panY;
    cam.target.z-=rightZ*panX-upZ*panY;
  }
  updCam();
}

// Global Spacebar hold-to-pan
window._isSpaceDown = false;
window.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && !e.repeat && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    window._isSpaceDown = true;
    if (typeof renderer !== 'undefined' && renderer.domElement) renderer.domElement.style.cursor = 'grab';
    e.preventDefault();
  }
});
window.addEventListener('keyup', function(e) {
  if (e.code === 'Space') {
    window._isSpaceDown = false;
    if (typeof renderer !== 'undefined' && renderer.domElement) {
      renderer.domElement.style.cursor = mode === 'draw' ? 'crosshair' : (mode === 'pan' || mode === 'orbit' ? 'grab' : 'default');
    }
  }
});

var _rmRay = new THREE.Raycaster();
var _rmPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
var _rmHit = new THREE.Vector3();
function _slideModelOnGround(clientX, clientY) {
  _refreshRect();
  var r = _cachedRect;
  var ndcX = ((clientX - r.left) / r.width) * 2 - 1;
  var ndcY = -((clientY - r.top) / r.height) * 2 + 1;
  var cam = activeCam();
  _rmRay.setFromCamera(new THREE.Vector2(ndcX, ndcY), cam);
  _rmPlane.constant = -(typeof surfPos !== 'undefined' ? surfPos.z : 0);
  if (_rmRay.ray.intersectPlane(_rmPlane, _rmHit)) {
    if (typeof surfPos !== 'undefined') {
      surfPos.x = Math.round(_rmHit.x * 100) / 100;
      surfPos.y = Math.round(_rmHit.y * 100) / 100;
      if (typeof syncSurf === 'function') syncSurf();
      if (window._updateModelCanvasHUD) window._updateModelCanvasHUD();
      markDirty();
    }
  }
}

function onDown(e){
  // ── Stylus-only mode: finger touches always navigate, only pen draws ──
  // iPad Apple Pencil can arrive via touch pipeline with touchType='stylus'
  // — must NOT be treated as a finger navigate gesture.
  if(stylusOnly&&e.touches){
    var _isStylusTouch=e.touches.length===1&&e.touches[0].touchType==='stylus';
    if(!_isStylusTouch){
      if(e.touches.length===1){
        // 1 finger: orbit or pan depending on gesture swap
        cancelDraw();
        if(twoFingerMode==='orbit'){startOrbit(e);}
        else{startPan(e);}
        return;
      }
      if(e.touches.length===2){
        // 2 finger: pan or orbit depending on gesture swap (+ pinch zoom always)
        cancelDraw();
        cam.active=false;cam.panActive=false;threeFingerPan=false;tf3Anchor=null;
        const d=pinchD(e);
        lastPD=d;_twoFingerLock='none';_twoFingerStartD=d;
        const cx=(e.touches[0].clientX+e.touches[1].clientX)/2,cy=(e.touches[0].clientY+e.touches[1].clientY)/2;
        _twoFingerStartCX=cx;_twoFingerStartCY=cy;
        // Arm navigate immediately — pan or orbit depending on swap
        if(twoFingerMode==='orbit'){
          // 2F=orbit mode → 2F navigates as pan in stylus
          cam.panActive=true;cam._panPrevX=cx;cam._panPrevY=cy;
        } else {
          // 2F=pan mode → 2F navigates as orbit in stylus
          cam.active=true;cam.sx=cx;cam.sy=cy;cam.st=cam.theta;cam.sp=cam.phi;
        }
        return;
      }
    }
    // _isStylusTouch falls through to normal draw/erase/select below
  }
  // ── Two-finger: lock resolves in onMove (zoom vs navigate). Do NOT pre-set
  // cam.active/cam.panActive here — that state leaks if the gesture resolves
  // to pure zoom. Orbit/pan origin is armed lazily when lock becomes 'navigate'.
  if(e.touches&&e.touches.length===2){
    cancelDraw();
    // Clear any prior multi-touch state so a 3→2 step-down starts clean
    cam.active=false;cam.panActive=false;threeFingerPan=false;tf3Anchor=null;
    const d=pinchD(e);
    lastPD=d;
    _twoFingerLock='none';
    _twoFingerStartD=d;
    const cx=(e.touches[0].clientX+e.touches[1].clientX)/2,cy=(e.touches[0].clientY+e.touches[1].clientY)/2;
    _twoFingerStartCX=cx;_twoFingerStartCY=cy;
    // Pre-arm pan so zoom+pan start simultaneously without waiting for lock
    cam.panActive=true;cam._panPrevX=cx;cam._panPrevY=cy;
    return;
  }
  // ── Three-finger: pan (or orbit when swapped). Clear any 2-finger state first
  // so a 2→3 step-up starts clean — previously lastPD/_twoFingerLock/cam.active
  // could leak from the preceding two-finger gesture.
  if(e.touches&&e.touches.length===3){
    cancelDraw();
    cam.active=false;cam.panActive=false;
    lastPD=null;_twoFingerLock='none';
    const mx=(e.touches[0].clientX+e.touches[1].clientX+e.touches[2].clientX)/3;
    const my=(e.touches[0].clientY+e.touches[1].clientY+e.touches[2].clientY)/3;
    if(twoFingerMode==='orbit'){threeFingerPan=true;cam._panPrevX=mx;cam._panPrevY=my;}
    else{cam.active=true;cam.sx=mx;cam.sy=my;cam.st=cam.theta;cam.sp=cam.phi;}
    return;
  }
  // Middle click (button 1): Orbit by default (Blender standard), or Pan with Shift / Alt
  if(e.button===1){
    if(e.shiftKey || e.altKey){
      startPan(e);
    } else {
      startOrbit(e);
    }
    if(e.preventDefault)e.preventDefault();
    return;
  }
  // Right click (button 2): Orbit, or Pan with Shift
  if(e.button===2){
    if(e.shiftKey){
      startPan(e);
    } else {
      startOrbit(e);
    }
    if(e.preventDefault)e.preventDefault();
    return;
  }
  // Left click with modifier keys: Spacebar / Shift / Alt / Tool Modes
  if(e.button===0 && (window._isSpaceDown || e.shiftKey)){
    startPan(e);
    if(e.preventDefault)e.preventDefault();
    return;
  }
  if(e.button===0 && e.altKey){
    startOrbit(e);
    if(e.preventDefault)e.preventDefault();
    return;
  }
  if(mode==='pan'){
    startPan(e);
    if(e.preventDefault)e.preventDefault();
    return;
  }
  if(mode==='orbit'){
    startOrbit(e);
    if(e.preventDefault)e.preventDefault();
    return;
  }
  // ── Primitive select mode intercept (before mode-specific routing) ──
  if(window._primSelectMode && window._primSelectOnTap){
    var _pp = ppos(e);
    if(window._primSelectOnTap(_pp.x, _pp.y)) return;
  }
  // ── 3D Model ground reposition intercept ──
  if (window._modelCanvasReposition && typeof surfType !== 'undefined' && surfType === 'model') {
    const p = ppos(e);
    window._isRepositioningModel = true;
    _slideModelOnGround(p.x, p.y);
    return;
  }
  if(mode==='erase'){setHoverStroke(null);_touchDragMode=e.touches?'erase':null;tryErase(e.clientX||ppos(e).x,e.clientY||ppos(e).y);return;}
  if(mode==='select'){
    const p=ppos(e);
    _touchDragMode=e.touches?'select':null;
    // Determine drag direction from first stroke hit: already selected → remove, else → add
    var firstHit=findNearestStroke(p.x,p.y);
    _dragSelectMode=firstHit&&selectedStrokes.indexOf(firstHit)>-1?'remove':'add';
    selectStroke(p.x,p.y,e.shiftKey||_selAddMode);
    return;
  }
  window._demoTurntable = false;
  if(mode==='draw'){
    if(window._resetLastDrawHit) window._resetLastDrawHit();
    const p=ppos(e);let pt=s2w(p.x,p.y);
    if(!pt)return;
    if(window._rulerSnapPt) pt = window._rulerSnapPt(pt, p.x, p.y) || pt;
    if(window._rulerBlocksPt && window._rulerBlocksPt(p.x, p.y)) { cancelDraw(); return; }
    // Record which finger is drawing so ppos() tracks the right one if indices shift
    if(e.touches&&e.touches.length>0)_drawTouchId=e.touches[0].identifier;
    var _initPt = _clonePointWithNorm(pt);
    isDrawing=true;setSurfHover(false);rawPts=[_initPt];smoothPts=[_initPt];velHistory=[0];lazyPos=_initPt.clone();if(pt.normal)lazyPos.normal=pt.normal.clone();updPrev(smoothPts);
    if(window._hideGviewSlider)window._hideGviewSlider();
  }
}
function onMove(e){
  e.preventDefault();const p=ppos(e);
  if(e.touches&&e.touches.length>=2){
    if(e.touches.length===2){
      // Clear 3-finger state on 3→2 step-down (touchend for lifted finger
      // doesn't re-call onDown, so threeFingerPan can leak from prior gesture)
      if(threeFingerPan){threeFingerPan=false;cam.active=false;cam.panActive=false;}
      const d=pinchD(e);
      const cx=(e.touches[0].clientX+e.touches[1].clientX)/2;
      const cy=(e.touches[0].clientY+e.touches[1].clientY)/2;
      // Stylus-only: 2-finger navigate respects gesture swap (pinch-zoom always works)
      if(stylusOnly){
        if(_twoFingerLock==='none'){
          const pinchDelta=Math.abs(d-_twoFingerStartD);
          const moveDelta=Math.hypot(cx-_twoFingerStartCX,cy-_twoFingerStartCY);
          if(pinchDelta>8)_twoFingerLock='zoom';
          else if(moveDelta>8){
            _twoFingerLock='navigate';
            // Arm navigate based on gesture swap: orbit → 2F=pan, pan → 2F=orbit
            if(twoFingerMode==='orbit'){
              if(!cam.panActive){cam.panActive=true;cam._panPrevX=cx;cam._panPrevY=cy;}
            } else {
              if(!cam.active){cam.active=true;cam.sx=cx;cam.sy=cy;cam.st=cam.theta;cam.sp=cam.phi;}
            }
          }
        }
        if(_twoFingerLock==='zoom'||_twoFingerLock==='none'){
          if(lastPD!==null){
            const delta=lastPD-d;
            var midXs=cx-_cachedRect.left,midYs=cy-_cachedRect.top;
            var wBs=panUnproject(midXs,midYs).clone();
            if(useOrtho){orthoZoom=Math.max(0.5,Math.min(80,orthoZoom+delta*.04));syncOrtho();updCam();var wAs=panUnproject(midXs,midYs);cam.target.add(_puTmp.subVectors(wBs,wAs));}
            else{var oldRs=cam.radius;cam.radius=Math.max(0.5,Math.min(80,cam.radius+delta*.04));var zFs=1-(cam.radius/Math.max(0.001,oldRs));cam.target.addScaledVector(_puTmp.subVectors(wBs,cam.target),zFs*0.35);}
            updCam();
          }
        }
        if(_twoFingerLock==='navigate'){
          if(twoFingerMode==='orbit'&&cam.panActive)doPan(null,cx,cy);
          else if(twoFingerMode==='pan'&&cam.active){cam.theta=cam.st+(cx-cam.sx)*.013;cam.phi=Math.max(.05,Math.min(Math.PI-.05,cam.sp-(cy-cam.sy)*.013));updCam();}
        }
        lastPD=d;
      } else {
      // Simultaneous zoom + pan/orbit: always process both together
      // Arm pan on first significant movement (lazy init)
      if(_twoFingerLock==='none'){
        const pinchDelta=Math.abs(d-_twoFingerStartD);
        const moveDelta=Math.hypot(cx-_twoFingerStartCX,cy-_twoFingerStartCY);
        if(pinchDelta>6||moveDelta>6){
          _twoFingerLock='both';
          // Arm pan origin for simultaneous zoom+pan
          cam.panActive=true;cam._panPrevX=cx;cam._panPrevY=cy;
          if(twoFingerMode==='orbit'){cam.active=true;cam.sx=cx;cam.sy=cy;cam.st=cam.theta;cam.sp=cam.phi;}
        }
      }
      if(_twoFingerLock==='both'||_twoFingerLock==='zoom'||_twoFingerLock==='none'){
        // Always apply pinch zoom
        if(lastPD!==null){
          const delta=lastPD-d;
          var midX=cx-_cachedRect.left, midY=cy-_cachedRect.top;
          var worldBefore2=panUnproject(midX,midY).clone();
          if(useOrtho){
            orthoZoom=Math.max(0.5,Math.min(80,orthoZoom+delta*.04));
            syncOrtho();updCam();
            var worldAfter2=panUnproject(midX,midY);
            cam.target.add(_puTmp.subVectors(worldBefore2,worldAfter2));
          } else {
            var oldR2=cam.radius;
            cam.radius=Math.max(0.5,Math.min(80,cam.radius+delta*.04));
            var zoomFrac2=1-(cam.radius/Math.max(0.001,oldR2));
            cam.target.addScaledVector(_puTmp.subVectors(worldBefore2,cam.target),zoomFrac2*0.35);
          }
          updCam();
        }
      }
      if(_twoFingerLock==='both'||_twoFingerLock==='navigate'){
        // Apply pan simultaneously with zoom (standard mobile 3D behavior)
        if(cam.panActive)doPan(null,cx,cy);
        else if(twoFingerMode==='orbit'&&cam.active){cam.theta=cam.st+(cx-cam.sx)*.013;cam.phi=Math.max(.05,Math.min(Math.PI-.05,cam.sp-(cy-cam.sy)*.013));updCam();}
      }
      lastPD=d;
      }
    }else if(e.touches.length===3){
      if(threeFingerPan){const mx=(e.touches[0].clientX+e.touches[1].clientX+e.touches[2].clientX)/3,my=(e.touches[0].clientY+e.touches[1].clientY+e.touches[2].clientY)/3;doPan(null,mx,my);}
      else if(cam.active){const mx=(e.touches[0].clientX+e.touches[1].clientX+e.touches[2].clientX)/3,my=(e.touches[0].clientY+e.touches[1].clientY+e.touches[2].clientY)/3;cam.theta=cam.st+(mx-cam.sx)*.013;cam.phi=Math.max(.05,Math.min(Math.PI-.05,cam.sp-(my-cam.sy)*.013));updCam();}
    }
    return;
  }
  if(mode==='draw'&&!isDrawing&&!cam.active&&!cam.panActive){
    // Only raycast hover when pointer is actually over the canvas, not UI elements above it
    var _hr=_cachedRect;
    if(p.x>=_hr.left&&p.x<=_hr.right&&p.y>=_hr.top&&p.y<=_hr.bottom){
      if(window._raycastDebug){
        s2w(p.x, p.y);
      }
      setSurfHover(checkHover(p.x,p.y));
    }
  }
  if(window._isRepositioningModel){
    _slideModelOnGround(p.x, p.y);
    return;
  }
  if(cam.panActive){doPan(e);return;}
  if(cam.active){doOrbit(e);return;}
  if((mode==='erase')&&(e.buttons||_touchDragMode==='erase')){tryErase(p.x,p.y);return;}
  if(mode==='select'&&(e.buttons||_touchDragMode==='select')&&!cam.active&&!cam.panActive){
    var ds=findNearestStroke(p.x,p.y);
    if(ds){
      var dsIdx=selectedStrokes.indexOf(ds);
      if(_dragSelectMode==='add'&&dsIdx===-1){
        selectedStrokes.push(ds);
        updateSelHighlights();
        positionStrokeGizmo();
        _showSgizmo();
        if(window._sgGcDraw)window._sgGcDraw();
        if(window._syncSgControls)window._syncSgControls();
      } else if(_dragSelectMode==='remove'&&dsIdx>-1){
        selectedStrokes.splice(dsIdx,1);
        updateSelHighlights();
        if(selectedStrokes.length===0)_hideSgizmo();
        if(window._sgGcDraw)window._sgGcDraw();
      }
    }
    return;
  }
  if(isDrawing&&mode==='draw'){
    var raw=s2w(p.x,p.y);if(!raw)return;
    if(window._rulerSnapPt) raw = window._rulerSnapPt(raw, p.x, p.y) || raw;
    if(!smoothingOn){
      // RAW mode (v14.2): bypass lazyPos entirely — push every point as-is.
      // Gate lowered .003 → .001 so micro-wiggles on slow/precise strokes survive.
      const last=smoothPts[smoothPts.length-1];
      if(last&&raw.distanceTo(last)>.001){
        var cp = _clonePointWithNorm(raw);
        smoothPts.push(cp);rawPts.push(_clonePointWithNorm(raw));velHistory.push(raw.distanceTo(last));updPrev(smoothPts);
      }
    } else {
      // SMOOTH mode: adaptive lazy — reduce smoothing factor for tight/small strokes
      // AND for fast strokes (large step per event) so preview keeps up with finger.
      if(!lazyPos) { lazyPos=_clonePointWithNorm(raw); }
      var effectiveLazy=LAZY_ON;
      var _step=raw.distanceTo(smoothPts[smoothPts.length-1]||raw);
      if(smoothPts.length>2){
        var _p0=smoothPts[smoothPts.length-3],_p1=smoothPts[smoothPts.length-2],_p2=smoothPts[smoothPts.length-1];
        var _d1=new THREE.Vector3().subVectors(_p1,_p0).normalize();
        var _d2=new THREE.Vector3().subVectors(_p2,_p1).normalize();
        var _curve=1-Math.max(0,_d1.dot(_d2));
        var _tightness=Math.min(1,_curve*2+(_step<0.04?0.5:0));
        effectiveLazy=LAZY_ON+(1.0-LAZY_ON)*(_tightness*.72);
      }
      // Fast-stroke boost: if pointer moved > 0.12 units since last sample, the
      // finger is moving quickly — increase lazy toward 1.0 so preview doesn't
      // fall behind. At step=0.30 we're effectively raw. Prevents the "writing
      // fast stroke not keeping up" feeling.
      if(_step>0.12){
        var speedBoost=Math.min(1,(_step-0.12)/0.18);  // 0 at step=0.12, 1 at step=0.30+
        effectiveLazy=effectiveLazy+(1.0-effectiveLazy)*speedBoost;
      }
      lazyPos.lerp(raw,effectiveLazy);
      if(raw.normal) {
        if(!lazyPos.normal) lazyPos.normal = raw.normal.clone();
        else lazyPos.normal.lerp(raw.normal, effectiveLazy).normalize();
      }
      const last=smoothPts[smoothPts.length-1];
      if(last&&lazyPos.distanceTo(last)>.009){
        smoothPts.push(_clonePointWithNorm(lazyPos));rawPts.push(_clonePointWithNorm(raw));velHistory.push(lazyPos.distanceTo(last));updPrev(smoothPts);
      }
    }
  }
}
function onUp(e){
  // Step-down: if fingers remain on screen, re-anchor the continuing gesture
  // instead of nuking all state. Classic case: lifting one finger of a 3-finger
  // pan should leave a 2-finger gesture active, not cancel everything.
  if(e&&e.touches&&e.touches.length>0){
    var remaining=e.touches.length;
    if(remaining===2){
      // Re-anchor for 2-finger zoom/navigate
      const d=pinchD(e);
      lastPD=d;_twoFingerLock='none';_twoFingerStartD=d;
      const cx=(e.touches[0].clientX+e.touches[1].clientX)/2,cy=(e.touches[0].clientY+e.touches[1].clientY)/2;
      _twoFingerStartCX=cx;_twoFingerStartCY=cy;
      threeFingerPan=false;tf3Anchor=null;
      // Seed incremental pan prev position for the continuing gesture
      cam._panPrevX=cx;cam._panPrevY=cy;
      // Carry camera pose forward so navigate branch has a valid origin
      cam.active=false;cam.panActive=false;
      return;
    }
    if(remaining===1){
      // Down to 1 finger — end multi-touch navigation but don't re-arm drawing
      // (user didn't start with a single-finger touch; don't interpret mid-gesture leftover as a draw)
      lastPD=null;_twoFingerLock='none';threeFingerPan=false;tf3Anchor=null;
      cam.active=false;cam.panActive=false;
      _touchDragMode=null;_dragSelectMode=null;
      return;
    }
    // 3+ remaining: rarely hit; let the next touchmove re-anchor
    lastPD=null;_twoFingerLock='none';
    return;
  }
  const wasOrbit=cam.active,wasPan=cam.panActive,wasDraw=isDrawing;
  window._isRepositioningModel = false;
  resetGesture();
  if(wasDraw&&!wasOrbit&&!wasPan){
    isDrawing=false;_drawTouchId=null;
    // In smooth mode: flush the true last raw position so the stroke ends where
    // the user lifted — lazy smoothing lags behind, causing end hooks on curves.
    if(smoothingOn&&rawPts.length>0&&smoothPts.length>0){
      var _lastRaw=rawPts[rawPts.length-1];
      var _lastSmooth=smoothPts[smoothPts.length-1];
      if(_lastRaw.distanceTo(_lastSmooth)>.003){smoothPts.push(_lastRaw.clone());}
    }
    finStroke();
  }
  else if(wasDraw){isDrawing=false;_drawTouchId=null;rawPts=[];smoothPts=[];velHistory=[];lazyPos=null;prevLine.visible=false;_prevGeo.setDrawRange(0,0);}
  if(window._rulerStrokeEnd) window._rulerStrokeEnd();
  // Pan/orbit modes are now sticky — user must manually switch back via buttons or keyboard
}
renderer.domElement.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('contextmenu',function(e){e.preventDefault();});
document.addEventListener('selectstart',function(e){if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;e.preventDefault();});

// ── Unified pointer input routing ─────────────────────────────────
// Pointer Events carry pointerType ('mouse'|'touch'|'pen') so we can
// distinguish stylus from finger for the STYLUS mode toggle.
// Strategy:
//   pen   → routed through pointerdown/move/up directly into onDown/onMove/onUp.
//            Touch events fired by the same pen contact are suppressed via _penActive.
//   touch → routed through touchstart/move/end as before (multi-touch needs e.touches).
//   mouse → routed through mousedown/move/up as before, with synthetic-mouse guard.
// touch-action:none on the canvas is required for pointer events to fire on Android.
renderer.domElement.style.touchAction='none';

// ── iPad Apple Pencil fix: capture-phase preventDefault on stylus touches ──
// iPadOS fires touch events for Apple Pencil contacts. Without preventDefault,
// iPadOS can claim the gesture for system use (scroll, swipe) and suppress
// subsequent events. This must fire in capture phase, BEFORE any other handler
// (including the ruler's document-level capture listeners), so we register on
// the canvas element with capture:true. touchType='stylus' is iPad-only;
// Android doesn't set it, so this is a no-op on other platforms.
renderer.domElement.addEventListener('touchstart',function(e){
  if(e.touches){for(var i=0;i<e.touches.length;i++){if(e.touches[i].touchType==='stylus'){e.preventDefault();return;}}}
},{capture:true,passive:false});
renderer.domElement.addEventListener('touchmove',function(e){
  if(e.touches){for(var i=0;i<e.touches.length;i++){if(e.touches[i].touchType==='stylus'){e.preventDefault();return;}}}
},{capture:true,passive:false});

// _penActive: true while a pen pointer is in contact, used to suppress
// the redundant touch events that Android also fires for stylus contacts.
var _penActive=false;

// ── Double-tap stylus removed — barrel button is the only toggle mechanism ──

renderer.domElement.addEventListener('pointerdown',function(e){
  if(e.pointerType!=='pen')return;
  e.preventDefault();
  _penActive=true;
  try{renderer.domElement.setPointerCapture(e.pointerId);}catch(ex){}

  // Barrel / side button on Android stylus (e.button=2 or 5) toggles draw↔erase
  // Some styli report button=0 but buttons=2 or buttons=32; also check for eraser tip (button=5)
  var _isBarrel=e.button!==0||(e.button===0&&e.buttons>1);
  if(_isBarrel){
    var newMode2=(mode==='draw')?'erase':(mode==='erase'?'draw':'draw');
    setMode(newMode2);
    toast(newMode2==='draw'?'Pen':'Eraser');
    _penActive=false;
    try{renderer.domElement.releasePointerCapture(e.pointerId);}catch(ex){}
    return;
  }

  onDown(e);
},{passive:false});

renderer.domElement.addEventListener('pointermove',function(e){
  if(e.pointerType==='pen'){
    // Prevent iPadOS from stealing pen contacts mid-stroke
    e.preventDefault();
    if(_penActive&&e.buttons>0){
      onMove(e);
      // Also feed hover preview for pens in select/erase mode — many Android
      // styli lack hover-above-screen, so this is the only pointermove they get.
      if(mode==='select'||mode==='erase'){
        _hoverPending={pointerType:e.pointerType,buttons:e.buttons,clientX:e.clientX,clientY:e.clientY};
        if(_hoverRafId==null)_hoverRafId=requestAnimationFrame(_runHover);
      }
    } else {
      // Pen hovering (buttons=0) — feed hover preview
      _hoverPending={pointerType:e.pointerType,buttons:e.buttons,clientX:e.clientX,clientY:e.clientY};
      if(_hoverRafId==null)_hoverRafId=requestAnimationFrame(_runHover);
    }
    return;
  }
  // mouse hover preview
  if(e.pointerType==='mouse'){
    _hoverPending={pointerType:e.pointerType,buttons:e.buttons,clientX:e.clientX,clientY:e.clientY};
    if(_hoverRafId==null)_hoverRafId=requestAnimationFrame(_runHover);
  }
},{passive:false});

renderer.domElement.addEventListener('pointerup',function(e){
  if(e.pointerType!=='pen')return;
  _penActive=false;
  try{renderer.domElement.releasePointerCapture(e.pointerId);}catch(ex){}
  onUp(e);
});

renderer.domElement.addEventListener('pointercancel',function(e){
  if(e.pointerType!=='pen')return;
  _penActive=false;
  try{renderer.domElement.releasePointerCapture(e.pointerId);}catch(ex){}
  cancelDraw();resetGesture();
});

renderer.domElement.addEventListener('pointerover',function(e){
  if(e.pointerType==='touch')return;
  _hoverPending={pointerType:e.pointerType,buttons:e.buttons,clientX:e.clientX,clientY:e.clientY};
  if(_hoverRafId==null)_hoverRafId=requestAnimationFrame(_runHover);
});

renderer.domElement.addEventListener('pointerleave',function(e){
  if(e.pointerType!=='touch')setHoverStroke(null);
});

// ── Hover preview rAF throttle (shared by pen + mouse pointermove above) ──
// rAF throttle — coalesce high-frequency pointermove events into one
// hit-test per animation frame. findNearestStroke is O(strokes × points)
// and was being called at pointer event rate (~120Hz on stylus).
var _hoverPending=null,_hoverRafId=null;
function _runHover(){
  _hoverRafId=null;
  var e=_hoverPending;_hoverPending=null;
  if(!e)return;
  if(e.pointerType==='touch')return;
  var inSelect=mode==='select'&&!cam.active&&!cam.panActive;
  var inErase=mode==='erase'&&!cam.active&&!cam.panActive;
  if((inSelect||inErase)&&(e.buttons===0||(e.pointerType==='pen'&&!isDrawing))){
    setHoverStroke(findNearestStroke(e.clientX,e.clientY));
  } else if(_hoverStroke){
    setHoverStroke(null);
  }
}

// ── Touch events (finger multi-touch, and stylus on devices that don't
//    report pointerType='pen'). Suppressed while a pen pointer is active
//    to avoid double-firing on devices that send both.
renderer.domElement.addEventListener('touchstart',function(e){
  if(_penActive)return; // pen is handled via pointer events
  lastTouchTime=Date.now();onDown(e);
},{passive:false});
renderer.domElement.addEventListener('touchmove',function(e){
  if(_penActive)return;
  lastTouchTime=Date.now();onMove(e);
},{passive:false});
renderer.domElement.addEventListener('touchend',function(e){
  if(_penActive)return;
  lastTouchTime=Date.now();onUp(e);
});
renderer.domElement.addEventListener('touchcancel',function(e){
  if(_penActive)return;
  lastTouchTime=Date.now();cancelDraw();resetGesture();
});

// ── Mouse events (desktop, guarded against synthetic mouse from touch) ──
function isSyntheticMouse(){return Date.now()-lastTouchTime<500;}
renderer.domElement.addEventListener('mousedown',e=>{if(!isSyntheticMouse())onDown(e);});
renderer.domElement.addEventListener('mousemove',e=>{if(!isSyntheticMouse())onMove(e);});
renderer.domElement.addEventListener('mouseup',  e=>{if(!isSyntheticMouse())onUp(e);});
renderer.domElement.addEventListener('mouseleave',function(){if(!isSyntheticMouse())setSurfHover(false);});
renderer.domElement.addEventListener('wheel',e=>{
  e.preventDefault();
  if(e.ctrlKey) return;
  if(_fpsMode){cam.target.z-=e.deltaY*0.003;updCam();return;}
  var mx=e.clientX, my=e.clientY;
  // World point under cursor before zoom (used to re-anchor target)
  var worldBefore=panUnproject(mx-_cachedRect.left, my-_cachedRect.top).clone();
  if(useOrtho){
    orthoZoom=Math.max(0.5,Math.min(80,orthoZoom+e.deltaY*.025));
    syncOrtho();updCam();
    // Re-anchor: shift target so worldBefore stays under cursor
    var worldAfter=panUnproject(mx-_cachedRect.left, my-_cachedRect.top);
    cam.target.add(_puTmp.subVectors(worldBefore,worldAfter));
  } else {
    var oldR=cam.radius;
    cam.radius=Math.max(0.5,Math.min(80,cam.radius+e.deltaY*.02));
    // Re-anchor toward cursor: lerp target toward worldBefore by zoom fraction
    var zoomFrac=1-(cam.radius/oldR);
    cam.target.addScaledVector(_puTmp.subVectors(worldBefore,cam.target),zoomFrac*0.35);
  }
  updCam();
},{passive:false});

// ── Stylus hover highlight for UI buttons ──
(function(){
  var lastHovered=null;
  document.addEventListener('pointermove',function(e){
    if(e.pointerType!=='pen')return;
    var el=document.elementFromPoint(e.clientX,e.clientY);
    var btn=el?el.closest('.btn,.cyc-btn,.emb,.nsm-btn,.cw,.bprev-btn,.bprev-more,.cyc-pop-item,.bgpop-swatch,.tb-lrow,.fc-hdr-btn,.vp-row,.sp-item'):null;
    if(btn===lastHovered)return;
    if(lastHovered)lastHovered.classList.remove('hover');
    lastHovered=btn;
    if(btn)btn.classList.add('hover');
  },{passive:true});
  document.addEventListener('pointerleave',function(e){
    if(e.pointerType!=='pen')return;
    if(lastHovered){lastHovered.classList.remove('hover');lastHovered=null;}
  },{passive:true});
})();

// ── Mode ─────────────────────────────────────────────────────────
var STXT={draw:'DRAW · 2F orbit · 3F pan',erase:'ERASE · click/drag to remove',orbit:'ORBIT · drag to rotate · press R or D to exit',pan:'PAN · drag to pan · press G or D to exit',select:'SELECT · tap a stroke'};
function _getEraseLabel(m){if(m==='erase')return _partialErase?'PARTIAL ERASE · drag to split':'ERASE · click/drag to remove';return STXT[m]||'';}
function setMode(m){
  if(m!=='select'){clearSelection();setHoverStroke(null);}
  else{setHoverStroke(null);}// also clear erase hover when entering select
  if(m==='draw'||m==='erase'||m==='select')prevDrawMode=m;
  mode=m;
  // Toggle all mode buttons: topbar and narrow bar
  // Topbar: pan + orbit only
  ['pan','orbit'].forEach(id=>{const b=document.getElementById('b'+id);if(b)b.classList.toggle('on',m===id);});
  // Sidebar: draw, erase, select
  ['draw','erase','select','fill','smudge','curve'].forEach(id=>{const b=document.getElementById('s'+id);if(b)b.classList.toggle('on',m===id);});
  // Narrow: draw, erase, select
  ['draw','erase','select','fill','smudge','curve'].forEach(id=>{const pb=document.getElementById('pb-'+id);if(pb)pb.classList.toggle('on',m===id);});
  document.querySelectorAll('.act-tool-btn[data-acttool]').forEach(function(b){b.classList.toggle('on',b.dataset.acttool===m);});
  // Hidden-UI bar (v14.2): draw, erase, select
  ['draw','erase','select'].forEach(id=>{const scx=document.getElementById('scx-'+id);if(scx)scx.classList.toggle('on',m===id);});
  var mdotEl=document.getElementById('mdot');
  var dotColors={erase:'#c0392b',orbit:'#e67e22',pan:'#2a9d8f',select:'#1a9940'};
  mdotEl.style.background=dotColors[m]||_themeInk(1);
  document.getElementById('stxt').textContent=_fpsMode?(_getEraseLabel(m)||'')+' · FPS':(_getEraseLabel(m)||'');
  document.body.classList.toggle('erasing',m==='erase');
  if (m === 'draw' || m === 'fill' || m === 'smudge' || m === 'curve') {
    setCanvasCursor('crosshair');
  } else if (m === 'erase') {
    setCanvasCursor('erase');
  } else if (m === 'select') {
    setCanvasCursor('select');
  } else if (m === 'pan' || m === 'orbit') {
    setCanvasCursor('grab');
  } else {
    setCanvasCursor('default');
  }
  // Sync look button
  if(window._syncLookBtn)window._syncLookBtn();
}


updateStylusLabel();
updateGestLabel();

window.onDown = onDown;
window.onMove = onMove;
window.onUp = onUp;
window.setMode = setMode;
window.tryErase = tryErase;
window.clearAll = clearAll;
window.clearSelection = clearSelection;
window.selectStroke = selectStroke;
window.updateSelHighlights = updateSelHighlights;
window.setHoverStroke = setHoverStroke;
window.findNearestStroke = findNearestStroke;
window.setActiveLayer = setActiveLayer;
window.setLayerVisible = setLayerVisible;
window.applyLayerVisibility = applyLayerVisibility;
window.mergeLayer = mergeLayer;
window.updateStylusLabel = updateStylusLabel;
window.updateGestLabel = updateGestLabel;
window.deleteSelected = deleteSelected;
window.duplicateSelected = duplicateSelected;

try {
  Object.defineProperty(window, 'stylusOnly', { get: function(){return stylusOnly;}, set: function(v){stylusOnly=v;updateStylusLabel();}, configurable: true });
  Object.defineProperty(window, 'mode', { get: function(){return mode;}, set: function(v){setMode(v);}, configurable: true });
  Object.defineProperty(window, 'isDrawing', { get: function(){return isDrawing;}, set: function(v){isDrawing=v;}, configurable: true });
  Object.defineProperty(window, 'rawPts', { get: function(){return rawPts;}, set: function(v){rawPts=v;}, configurable: true });
  Object.defineProperty(window, 'smoothPts', { get: function(){return smoothPts;}, set: function(v){smoothPts=v;}, configurable: true });
  Object.defineProperty(window, 'curColor', { get: function(){return curColor;}, set: function(v){curColor=v;}, configurable: true });
  Object.defineProperty(window, 'brushSz', { get: function(){return brushSz;}, set: function(v){brushSz=v;}, configurable: true });
  Object.defineProperty(window, 'brushOp', { get: function(){return brushOp;}, set: function(v){brushOp=v;}, configurable: true });
  Object.defineProperty(window, 'flatBrush', { get: function(){return flatBrush;}, set: function(v){flatBrush=v;}, configurable: true });
  Object.defineProperty(window, '_partialErase', { get: function(){return _partialErase;}, set: function(v){_partialErase=v;}, configurable: true });
  Object.defineProperty(window, 'smoothingOn', { get: function(){return smoothingOn;}, set: function(v){smoothingOn=v;}, configurable: true });
  Object.defineProperty(window, 'twoFingerMode', { get: function(){return twoFingerMode;}, set: function(v){twoFingerMode=v;updateGestLabel();}, configurable: true });
  Object.defineProperty(window, 'activeLayer', { get: function(){return activeLayer;}, set: function(v){setActiveLayer(v);}, configurable: true });
  Object.defineProperty(window, 'selectedStrokes', { get: function(){return selectedStrokes;}, set: function(v){selectedStrokes=v;}, configurable: true });
} catch(e) {}
