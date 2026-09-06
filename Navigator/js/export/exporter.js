// ── Export filename prompt ──────────────────────────────────────
// Generic prompt for export filename — reuses its own modal (#export-name-modal).
// ext includes the dot, e.g. '.glb'. callback receives (name) with no ext.
function promptExportName(defaultName, ext, callback){
  var enmod=document.getElementById('export-name-modal');
  var inp=document.getElementById('export-name-input');
  var extSpan=document.getElementById('export-name-ext');
  inp.value=defaultName||'sketch3d';
  extSpan.textContent=ext;
  enmod._expCallback=callback;
  enmod._expExt=ext;
  enmod.classList.add('vis');
  inp.focus();inp.select();
}

// ── PNG export ────────────────────────────────────────────────────
function expPNG(){var _sg=gridH.visible,_sa=axisGroup.visible,_ss=surfGroup.visible;gridH.visible=false;axisGroup.visible=false;surfGroup.visible=false;renderer.render(scene,activeCam());const url=renderer.domElement.toDataURL('image/png');const a=document.createElement('a');a.href=url;a.download='sketch3d.png';a.click();gridH.visible=_sg;axisGroup.visible=_sa;surfGroup.visible=_ss;markDirty();toast('PNG saved');}

function expSVG(expName){
  if(!strokes.length){alert('Nothing to export.');return;}
  _refreshRect();
  var r=_cachedRect;
  var W=r.width,H=r.height,ac=activeCam();
  ac.updateMatrixWorld(false);
  var tmpV=new THREE.Vector3();
  var paths=[];
  for(var i=0;i<strokes.length;i++){
    var s=strokes[i];
    if(!s.mesh.visible)continue;
    if(s.pts.length<2)continue;
    s.mesh.updateMatrixWorld(false);
    var mw=s.mesh.matrixWorld;
    // Project all points to screen space
    var proj=[];
    for(var j=0;j<s.pts.length;j++){
      tmpV.copy(s.pts[j]).applyMatrix4(mw);tmpV.project(ac);
      // Skip points behind camera
      if(tmpV.z>1)continue;
      proj.push({x:(tmpV.x*.5+.5)*W,y:(-tmpV.y*.5+.5)*H});
    }
    if(proj.length<2)continue;
    // Build SVG path data
    var d='M'+proj[0].x.toFixed(2)+' '+proj[0].y.toFixed(2);
    for(var k=1;k<proj.length;k++){
      d+=' L'+proj[k].x.toFixed(2)+' '+proj[k].y.toFixed(2);
    }
    // Stroke width: map brush size to screen pixels (approximate)
    // s.sz=1 → baseR=0.011 in world units; project a small offset to estimate pixel width
    var midIdx=Math.floor(s.pts.length/2);
    var p0=tmpV.copy(s.pts[midIdx]).applyMatrix4(mw);
    var sx0=new THREE.Vector3().copy(p0).project(ac);
    var baseR=s.sz*0.011;
    var p1=new THREE.Vector3(p0.x+baseR,p0.y,p0.z);
    var sx1=p1.project(ac);
    var sw=Math.abs((sx1.x-sx0.x)*0.5*W)*2;
    if(isNaN(sw)||sw<0.5)sw=0.5;
    if(sw>50)sw=50;
    // Opacity
    var op=s.op!==undefined?s.op:1;
    paths.push('<path d="'+d+'" fill="none" stroke="'+s.color+'" stroke-width="'+sw.toFixed(2)+'" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="'+op.toFixed(2)+'"/>');
  }
  if(!paths.length){alert('No visible strokes to export.');return;}
  var svg='<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'">\n<rect width="100%" height="100%" fill="none"/>\n'+paths.join('\n')+'\n</svg>';
  var blob=new Blob([svg],{type:'image/svg+xml'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');a.href=url;a.download=(expName||'sketch3d')+'.svg';a.click();
  URL.revokeObjectURL(url);toast('SVG exported');
}

// ── Save / Load / Export ──────────────────────────────────────────
function sceneData(){
  const allPages=pages.map(function(pg,i){
    var pgViews=pg.views||[];
    if(i===curPage){
      return{strokes:strokes.map(s=>({pts:s.pts.map(p=>({x:p.x,y:p.y,z:p.z})),color:s.color,sz:s.sz,op:s.op,flat:s.flat,matType:s.matType||'default',layer:s.layer!=null?s.layer:1,mx:s.mesh.matrix.elements.slice()})),views:pgViews,primitives:window._serializePrimitives?window._serializePrimitives():[]};
    }
    return{strokes:(pg.strokes||[]),views:pgViews,primitives:pg.primitives||[]};
  });
  return{version:4.4,curPage:curPage,pages:allPages,strokes:strokes.map(s=>({pts:s.pts.map(p=>({x:p.x,y:p.y,z:p.z})),color:s.color,sz:s.sz,op:s.op,flat:s.flat,matType:s.matType||'default',layer:s.layer!=null?s.layer:1,mx:s.mesh.matrix.elements.slice()})),primitives:window._serializePrimitives?window._serializePrimitives():[],surf:{type:(surfType==='loft'||surfType==='none')?'plane':surfType,plane:curPlane,px:surfPos.x,py:surfPos.y,pz:surfPos.z,rx:surfEuler.x,ry:surfEuler.y,rz:surfEuler.z,sc:surfScale,sax:surfScaleAxes.x,say:surfScaleAxes.y,saz:surfScaleAxes.z}};
}
function loadData(data){
  clearAll();
  if(data.surf){surfType=data.surf.type||'plane';curPlane=data.surf.plane||'xz';surfPos.set(data.surf.px||0,data.surf.py||0,data.surf.pz||0);surfEuler.set(data.surf.rx||0,data.surf.ry||0,data.surf.rz||0);surfScale=data.surf.sc||1;surfScaleAxes.set(data.surf.sax||1,data.surf.say||1,data.surf.saz||1);buildSurf();document.querySelectorAll('[data-surf]').forEach(b=>b.classList.toggle('on',b.dataset.surf===surfType));document.querySelectorAll('[data-plane]').forEach(b=>b.classList.toggle('on',b.dataset.plane===curPlane));var _pl={'xz':'Front','xy':'Top','yz':'Side'};['pb-cyc-plane','pb-cyc-plane2','sb-cyc-plane'].forEach(function(id){var b=document.getElementById(id);if(b)b.textContent=_pl[curPlane]||curPlane;});}
  if(data.strokes){
    data.strokes.forEach(s=>{
      const pts=s.pts.map(p=>new THREE.Vector3(p.x,p.y,p.z)),vels=computeVels(pts),g=new THREE.Group();
      const mType=s.matType||'default';
      const tube=buildTube(pts,vels,s.color,s.sz,s.op,s.flat||false,mType);if(tube)g.add(tube);
      if(!(s.flat||false)){g.add(buildCap(pts[0],s.color,s.sz,s.op,mType));g.add(buildCap(pts[pts.length-1],s.color,s.sz,s.op,mType));}
      if(s.mx){g.matrix.fromArray(s.mx);g.matrix.decompose(g.position,g.quaternion,g.scale);g.matrixAutoUpdate=false;}
      scene.add(g);
      strokes.push({pts,vels,color:s.color,sz:s.sz,op:s.op,flat:s.flat||false,matType:mType,layer:s.layer!=null?s.layer:1,mesh:g,_depthKey:''});
    });
  }
  applyLayerVisibility();
  // Show merge layer row if any strokes are on layer 3
  showMergeLayerRow(strokes.some(function(s){return s.layer===3;}));
  // Load primitives
  if(data.primitives && window._deserializePrimitives) window._deserializePrimitives(data.primitives);
}
function loadAllPages(data){
  if(data.pages&&data.pages.length){
    pages.length=0;
    data.pages.forEach(function(pg){pages.push({strokes:pg.strokes||[],thumb:null,views:pg.views||[],primitives:pg.primitives||[]});});
    curPage=Math.min(data.curPage||0,pages.length-1);
    clearAll();
    if(window._clearAllPrimitives)window._clearAllPrimitives();
    const pg=pages[curPage];if(pg&&pg.strokes)loadData(Object.assign({},data,{strokes:pg.strokes,primitives:pg.primitives}));
    refreshPageStrip();
    refreshViewStrip();
  } else {
    loadData(data);
    pages[0]={strokes:strokes.map(s=>({pts:s.pts.map(p=>({x:p.x,y:p.y,z:p.z})),color:s.color,sz:s.sz,op:s.op,flat:s.flat,matType:s.matType||'default',layer:s.layer!=null?s.layer:1,mx:s.mesh.matrix.elements.slice()})),thumb:null,views:[],primitives:window._savePrimitivesForPage?window._savePrimitivesForPage():[]};
    refreshPageStrip();
    refreshViewStrip();
  }
}
function _doSaveFile(name){renderer.render(scene,activeCam());var src=renderer.domElement;var tmp=document.createElement('canvas');tmp.width=120;tmp.height=84;var tc=tmp.getContext('2d');tc.drawImage(src,0,0,120,84);var thumb=tmp.toDataURL('image/jpeg',0.5);var data=sceneData();data.thumb=thumb;var b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download=(name||'sketch3d')+'.json';a.click();URL.revokeObjectURL(u);toast('Saved');}
function saveFileWithName(defaultName,onComplete){var snmod=document.getElementById('save-name-modal');var inp=document.getElementById('save-name-input');inp.value=defaultName||'sketch3d';snmod._onComplete=onComplete||null;snmod.classList.add('vis');inp.focus();inp.select();}
function saveFile(){saveFileWithName('sketch3d',null);}
function loadFile(){document.getElementById('filein').click();}
document.getElementById('filein').addEventListener('change',function(){const f=this.files[0];if(!f)return;const r=new FileReader();r.onload=function(ev){try{loadAllPages(JSON.parse(ev.target.result));toast('Loaded');}catch(e){alert('Invalid file.');}};r.readAsText(f);this.value='';});
// ── Persistent Storage & Local Storage Permission ────────────────────
async function requestPersistentStorage(notifyUser) {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      var isPersisted = await navigator.storage.persisted();
      if (!isPersisted) {
        isPersisted = await navigator.storage.persist();
      }
      var estimateInfo = '';
      if (navigator.storage.estimate) {
        var est = await navigator.storage.estimate();
        var usageMb = ((est.usage || 0) / (1024 * 1024)).toFixed(1);
        var quotaMb = ((est.quota || 0) / (1024 * 1024)).toFixed(0);
        estimateInfo = ' (' + usageMb + ' MB / ' + quotaMb + ' MB)';
      }
      if (notifyUser && typeof toast === 'function') {
        if (isPersisted) {
          toast('Persistent storage granted' + estimateInfo);
        } else {
          toast('Storage standard mode' + estimateInfo);
        }
      }
      return isPersisted;
    } catch(err) {
      console.warn('Storage persistence query failed:', err);
      if (notifyUser && typeof toast === 'function') toast('Storage permission query failed');
      return false;
    }
  } else {
    if (notifyUser && typeof toast === 'function') toast('Storage persistence API unavailable');
    return false;
  }
}
window.requestPersistentStorage = requestPersistentStorage;

if (typeof window !== 'undefined') {
  window.addEventListener('load', function() {
    requestPersistentStorage(false);
  });
}

// ── IndexedDB auto-save (replaces localStorage) ────────────────────
// Same 30s interval, same JSON format, much higher quota
// Falls back to localStorage if IndexedDB unavailable
var _idb=null;
var _idbReadyCallbacks=[];
function _onIdbReady(cb){if(_idb){cb(_idb);}else{_idbReadyCallbacks.push(cb);}}
(function(){
  try{
    var req=indexedDB.open('sketch3d',1);
    req.onupgradeneeded=function(e){
      var db=e.target.result;
      if(!db.objectStoreNames.contains('autosave'))db.createObjectStore('autosave');
    };
    req.onsuccess=function(e){
      _idb=e.target.result;
      // One-time migration from localStorage
      try{
        var old=localStorage.getItem('sk3d_auto');
        if(old){
          var tx=_idb.transaction('autosave','readwrite');
          tx.objectStore('autosave').put(old,'sk3d_auto');
          localStorage.removeItem('sk3d_auto');
        }
      }catch(e2){}
      // Fire all waiting callbacks
      var cbs=_idbReadyCallbacks.splice(0);
      for(var i=0;i<cbs.length;i++){try{cbs[i](_idb);}catch(e3){}}
    };
    req.onerror=function(){_idb=null;};
  }catch(e){_idb=null;}
})();

function idbSave(dataStr){
  if(_idb){
    try{
      var tx=_idb.transaction('autosave','readwrite');
      tx.objectStore('autosave').put(dataStr,'sk3d_auto');
      return;
    }catch(e){}
  }
  try{localStorage.setItem('sk3d_auto',dataStr);}catch(e){}
}

function idbLoad(cb){
  if(_idb){
    try{
      var tx=_idb.transaction('autosave','readonly');
      var req=tx.objectStore('autosave').get('sk3d_auto');
      req.onsuccess=function(e){cb(e.target.result||null);};
      req.onerror=function(){cb(null);};
      return;
    }catch(e){}
  }
  // Fallback to localStorage
  try{cb(localStorage.getItem('sk3d_auto'));}catch(e){cb(null);}
}

var _sceneDirtyForSave=false;
var _origMarkDirty=markDirty;
markDirty=function(){_sceneDirtyForSave=true;_origMarkDirty();};
setInterval(function(){if(!_sceneDirtyForSave)return;_sceneDirtyForSave=false;try{idbSave(JSON.stringify(sceneData()));}catch(e){}},30000);

// Save on tab/PWA visibility changes and page unload — Android aggressively
// backgrounds and reclaims PWAs; without these handlers, up to 30 seconds of
// work was lost between autosave ticks when the user swiped away.
(function(){
  var _lastSaveAt=0;
  function _flushSave(){
    try{
      // Rate-limit to once per 500ms so rapid visibility thrashes don't thrash IDB
      var now=Date.now();if(now-_lastSaveAt<500)return;
      _lastSaveAt=now;
      var str=JSON.stringify(sceneData());
      // Synchronous localStorage write is our safety net — IDB writes are async
      // and may not flush before the page is killed. localStorage always flushes.
      try{localStorage.setItem('sk3d_auto',str);}catch(e){}
      // Best-effort IDB write
      try{idbSave(str);}catch(e){}
    }catch(e){}
  }
  // visibilitychange fires when tab is hidden — Android PWA triggers this reliably
  document.addEventListener('visibilitychange',function(){
    if(document.visibilityState==='hidden')_flushSave();
  });
  // pagehide is the modern, reliable unload trigger — fires on iOS Safari too
  window.addEventListener('pagehide',_flushSave);
  // beforeunload for desktop browsers and legacy fallback
  window.addEventListener('beforeunload',_flushSave);
  // Expose for manual triggers (e.g. after destructive actions)
  window._flushAutosave=_flushSave;
})();

function expGLTF(expName){
  const meshes=[];
  const sc=exportScaleMult();
  strokes.forEach(s=>{if(s.pts.length<2)return;try{
    const wpts=s.pts.map(p=>p.clone().applyMatrix4(s.mesh.matrix).multiplyScalar(sc));
    const geo=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wpts),Math.max(wpts.length*3,8),s.sz*.011*sc,6,false);
    const c=new THREE.Color(s.color);meshes.push({geo,col:[c.r,c.g,c.b],op:s.op!=null?s.op:1});}catch(e){}});
  if(!meshes.length){alert('Nothing to export.');return;}
  const bvs=[],accs=[],mds=[],mts=[],cks=[];let bo=0;
  meshes.forEach((m,mi)=>{const pos=m.geo.attributes.position,idx=m.geo.index;const pb=new Float32Array(pos.array),ib=idx?new Uint32Array(idx.array):null;bvs.push({buffer:0,byteOffset:bo,byteLength:pb.byteLength,target:34962});let mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];for(let i=0;i<pos.array.length;i+=3){mn[0]=Math.min(mn[0],pos.array[i]);mn[1]=Math.min(mn[1],pos.array[i+1]);mn[2]=Math.min(mn[2],pos.array[i+2]);mx[0]=Math.max(mx[0],pos.array[i]);mx[1]=Math.max(mx[1],pos.array[i+1]);mx[2]=Math.max(mx[2],pos.array[i+2]);}accs.push({bufferView:bvs.length-1,componentType:5126,count:pos.count,type:'VEC3',min:mn,max:mx});cks.push(new Uint8Array(pb.buffer));bo+=pb.byteLength;let pr={attributes:{POSITION:accs.length-1},mode:4};if(ib){bvs.push({buffer:0,byteOffset:bo,byteLength:ib.byteLength,target:34963});accs.push({bufferView:bvs.length-1,componentType:5125,count:idx.count,type:'SCALAR'});pr.indices=accs.length-1;cks.push(new Uint8Array(ib.buffer));bo+=ib.byteLength;}pr.material=mi;mds.push({primitives:[pr]});mts.push({pbrMetallicRoughness:{baseColorFactor:[m.col[0],m.col[1],m.col[2],m.op],metallicFactor:.04,roughnessFactor:.55},alphaMode:m.op<1?'BLEND':'OPAQUE'});});
  const nodes=mds.map((_,i)=>({mesh:i}));const gltf={asset:{version:'2.0',generator:'Sketch3D v4.1'},scene:0,scenes:[{nodes:nodes.map((_,i)=>i)}],nodes,meshes:mds,materials:mts,accessors:accs,bufferViews:bvs,buffers:[{byteLength:bo}]};
  const jb=new TextEncoder().encode(JSON.stringify(gltf)),jl=jb.length,jp=(4-jl%4)%4;const bin=new Uint8Array(bo);let off=0;cks.forEach(c=>{bin.set(c,off);off+=c.byteLength;});const bl=bin.length,bp=(4-bl%4)%4,tot=12+8+(jl+jp)+8+(bl+bp);const out=new ArrayBuffer(tot);const dv=new DataView(out);let p=0;dv.setUint32(p,0x46546C67,true);p+=4;dv.setUint32(p,2,true);p+=4;dv.setUint32(p,tot,true);p+=4;dv.setUint32(p,jl+jp,true);p+=4;dv.setUint32(p,0x4E4F534A,true);p+=4;new Uint8Array(out,p).set(jb);for(let i=0;i<jp;i++)new Uint8Array(out)[p+jl+i]=0x20;p+=jl+jp;dv.setUint32(p,bl+bp,true);p+=4;dv.setUint32(p,0x004E4942,true);p+=4;new Uint8Array(out,p).set(bin);
  const blob=new Blob([out],{type:'model/gltf-binary'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=(expName||'sketch3d')+'.glb';a.click();URL.revokeObjectURL(url);toast('GLB exported');
}
function expOBJ(expName){if(!strokes.length){alert('Nothing to export.');return;}
  const sc=exportScaleMult();
  const lines=['# Sketch3D v5','# Export scale: '+SCALE_LABELS[exportScaleIdx],''];let vo=1;
  strokes.forEach((s,si)=>{if(s.pts.length<2)return;
    const wpts=s.pts.map(p=>p.clone().applyMatrix4(s.mesh.matrix).multiplyScalar(sc));
    let geo;try{geo=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wpts),Math.max(wpts.length*3,8),s.sz*.011*sc,6,false);}catch(e){return;}
    const pa=geo.attributes.position,ix=geo.index;lines.push('g stroke_'+si);
    for(let i=0;i<pa.count;i++)lines.push('v '+pa.getX(i).toFixed(5)+' '+pa.getY(i).toFixed(5)+' '+pa.getZ(i).toFixed(5));
    if(ix)for(let i=0;i<ix.count;i+=3)lines.push('f '+(ix.getX(i)+vo)+' '+(ix.getX(i+1)+vo)+' '+(ix.getX(i+2)+vo));
    vo+=pa.count;lines.push('');geo.dispose();});
  const blob=new Blob([lines.join('\n')],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=(expName||'sketch3d')+'.obj';a.click();URL.revokeObjectURL(url);toast('OBJ exported ('+SCALE_LABELS[exportScaleIdx]+')');}
function buildUSDA(){
  const sc=exportScaleMult();
  const lines=['#usda 1.0','(','    defaultPrim = "Sketch3D"','    upAxis = "Z"','    metersPerUnit = '+sc.toFixed(2),')','','def Xform "Sketch3D" {'];
  strokes.forEach((s,si)=>{if(s.pts.length<2)return;
    const wpts=s.pts.map(p=>p.clone().applyMatrix4(s.mesh.matrix).multiplyScalar(sc));
    let geo;try{geo=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wpts),Math.max(wpts.length*3,8),s.sz*.011*sc,6,false);}catch(e){return;}
    const pa=geo.attributes.position,ix=geo.index,col=new THREE.Color(s.color);
    const pts=[];for(let i=0;i<pa.count;i++)pts.push('('+pa.getX(i).toFixed(4)+', '+pa.getY(i).toFixed(4)+', '+pa.getZ(i).toFixed(4)+')');
    const counts=[],indices=[];if(ix)for(let i=0;i<ix.count;i+=3){counts.push(3);indices.push(ix.getX(i),ix.getX(i+1),ix.getX(i+2));}
    lines.push('    def Mesh "stroke_'+si+'" {');
    lines.push('        point3f[] points = ['+pts.join(', ')+']');
    if(counts.length){lines.push('        int[] faceVertexCounts = ['+counts.join(', ')+']');lines.push('        int[] faceVertexIndices = ['+indices.join(', ')+']');}
    lines.push('        color3f[] primvars:displayColor = [('+col.r.toFixed(3)+', '+col.g.toFixed(3)+', '+col.b.toFixed(3)+')]');
    lines.push('        float primvars:displayOpacity = '+(s.op!=null?s.op:1).toFixed(3));
    lines.push('        uniform token subdivisionScheme = "none"');
    lines.push('    }');geo.dispose();});
  lines.push('}');return lines.join('\n');
}
function expUSD(expName){if(!strokes.length){alert('Nothing to export.');return;}const b=new Blob([buildUSDA()],{type:'model/vnd.usda'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=(expName||'sketch3d')+'.usda';a.click();URL.revokeObjectURL(u);toast('USDA exported');}
function expUSDZ(expName){if(!strokes.length){alert('Nothing to export.');return;}
  const usda=buildUSDA(),enc=new TextEncoder(),data=enc.encode(usda),name=enc.encode('sketch3d.usda');
  function u16(n){const b=new Uint8Array(2);new DataView(b.buffer).setUint16(0,n,true);return b;}
  function u32(n){const b=new Uint8Array(4);new DataView(b.buffer).setUint32(0,n,true);return b;}
  function crc32(buf){let c=0xFFFFFFFF;const t=new Uint32Array(256);for(let i=0;i<256;i++){let v=i;for(let j=0;j<8;j++)v=v&1?(0xEDB88320^(v>>>1)):(v>>>1);t[i]=v;}for(let i=0;i<buf.length;i++)c=t[(c^buf[i])&0xFF]^(c>>>8);return(c^0xFFFFFFFF)>>>0;}
  function pad64(offset){return(64-offset%64)%64;}
  const crc=crc32(data);
  // Local file header (30 bytes) + filename
  const lhdrFixed=new Uint8Array([0x50,0x4B,0x03,0x04,20,0,0,0,0,0,0,0,0,0,...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),0,0]);
  // Pad so data starts on 64-byte boundary
  const lhdrLen=lhdrFixed.length+name.length;
  const dataOffset=lhdrLen+pad64(lhdrLen);
  const extraLen=dataOffset-lhdrLen;
  // Rebuild local header with correct extra field length
  const lhdr=new Uint8Array([0x50,0x4B,0x03,0x04,20,0,0,0,0,0,0,0,0,0,...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(extraLen),...name,...new Uint8Array(extraLen)]);
  const cdOffset=lhdr.length+data.length;
  const cdhdr=new Uint8Array([0x50,0x4B,0x01,0x02,20,0,20,0,0,0,0,0,0,0,0,0,...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),0,0,0,0,0,0,0,0,0,0,0,0,...u32(0),...name]);
  const eocd=new Uint8Array([0x50,0x4B,0x05,0x06,0,0,0,0,1,0,1,0,...u32(cdhdr.length),...u32(cdOffset),0,0]);
  const total=new Uint8Array(lhdr.length+data.length+cdhdr.length+eocd.length);
  let off=0;[lhdr,data,cdhdr,eocd].forEach(b=>{total.set(b,off);off+=b.length;});
  const blob=new Blob([total],{type:'model/vnd.usdz+zip'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=(expName||'sketch3d')+'.usdz';a.click();URL.revokeObjectURL(url);toast('USDZ exported');}
