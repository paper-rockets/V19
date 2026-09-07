const cam={theta:-Math.PI/2 + 0.45,phi:Math.PI/2 - 0.35,radius:10,target:new THREE.Vector3(),active:false,panActive:false,sx:0,sy:0,st:0,sp:0,panAnchor:null,panTargetAtStart:new THREE.Vector3()};
function syncOrtho(){var _vvp=window.visualViewport;var a=(_vvp?_vvp.width:innerWidth)/(_vvp?_vvp.height:innerHeight);ortho.left=-orthoZoom*a;ortho.right=orthoZoom*a;ortho.top=orthoZoom;ortho.bottom=-orthoZoom;ortho.updateProjectionMatrix();}
// FPS mode state — declared here (var hoisted) so updCam can reference
var _fpsMode=false;
var _fpsSavedCam=null; // {theta,phi,radius,tx,ty,tz} saved on enter
var _fpsPlaneGroup=null;    // Group: fill+frosted+grid for follow-plane
var _fpsPlaneFill=null;     // fill mesh
var _fpsFrosted=null;       // frosted depth-cue mesh
var _fpsFrostedGrid=null;   // grid mesh
var _fpsSurfMode=0;         // 0=NONE  1=FOLLOW  2=SCENE
var _fpsPlaneDist=5;        // distance from eye to follow-plane
var _fpsPlaneSz=6;          // follow-plane size (world units)

function updCam(){
  if(_fpsMode){
    // FPS: camera IS at target, look along theta/phi forward vector
    var sinP=Math.sin(cam.phi),cosP=Math.cos(cam.phi);
    var sinT=Math.sin(cam.theta),cosT=Math.cos(cam.theta);
    var fx=sinP*cosT,fy=sinP*sinT,fz=cosP;
    camera.position.copy(cam.target);
    camera.up.set(0,0,1);
    camera.lookAt(cam.target.x+fx,cam.target.y+fy,cam.target.z+fz);
    ortho.position.copy(cam.target);
    ortho.up.set(0,0,1);
    ortho.lookAt(cam.target.x+fx,cam.target.y+fy,cam.target.z+fz);
    syncOrtho();
    // Reposition follow-plane group: center at eye + forward * dist, facing camera
    if(_fpsPlaneGroup){
      _fpsPlaneGroup.position.set(
        cam.target.x+fx*_fpsPlaneDist,
        cam.target.y+fy*_fpsPlaneDist,
        cam.target.z+fz*_fpsPlaneDist
      );
      _fpsPlaneGroup.quaternion.copy(camera.quaternion);
    }
  } else {
    var theta=cam.theta,phi=cam.phi,radius=cam.radius,target=cam.target;
    var p=new THREE.Vector3(target.x+radius*Math.sin(phi)*Math.cos(theta),target.y+radius*Math.sin(phi)*Math.sin(theta),target.z+radius*Math.cos(phi));
    camera.position.copy(p);camera.up.set(0,0,1);camera.lookAt(target);
    ortho.position.copy(p);ortho.up.set(0,0,1);ortho.lookAt(target);syncOrtho();
  }
  markDirty();
  if(window._gDraw)window._gDraw();if(window._ncDraw)window._ncDraw();
  if(window._pbNcDraw)window._pbNcDraw();if(window._pbGcDraw)window._pbGcDraw();
  if(window._sgGcDraw)window._sgGcDraw();
  if(window._pgGcDraw)window._pgGcDraw();
}
updCam();

// ── Renderer rect cache — getBoundingClientRect is a forced layout; cache it ──
var _cachedRect={left:0,top:0,width:innerWidth,height:innerHeight};
function _refreshRect(){_cachedRect=renderer.domElement.getBoundingClientRect();}
_refreshRect();
// Keep rect fresh on resize / orientation change
window.addEventListener('resize',function(){
  if(typeof _syncRenderer==='function')_syncRenderer();
  if(typeof updateLayoutMode==='function')updateLayoutMode();
});
// visualViewport fires in PWA standalone when window.resize doesn't (e.g. Android system bar settle)
if(window.visualViewport){
  window.visualViewport.addEventListener('resize',function(){
    if(typeof _syncRenderer==='function')_syncRenderer();
    if(typeof updateLayoutMode==='function')updateLayoutMode();
  });
}

// ── Raycasting ───────────────────────────────────────────────────
const drawRC=new THREE.Raycaster();
var _lastDrawHit = null;
window._resetLastDrawHit = function() { _lastDrawHit = null; };

function s2w(px,py){
  var r=_cachedRect;
  var ndcX=((px-r.left)/r.width)*2-1, ndcY=-((py-r.top)/r.height)*2+1;
  var ndc=new THREE.Vector2(ndcX,ndcY);
  if(_fpsMode&&_fpsSurfMode===1&&_fpsPlaneFill){
    drawRC.setFromCamera(ndc,activeCam());
    _fpsPlaneFill.material.side=THREE.DoubleSide;
    var fhits=drawRC.intersectObject(_fpsPlaneFill,false);
    return fhits.length?fhits[0].point.clone():null;
  }
  // Prims-as-plane mode: raycast against all prim meshes
  if(window._primsAsPlane && window._primRaycast){
    drawRC.setFromCamera(ndc,activeCam());
    var ph=window._primRaycast(drawRC);
    if(ph) return ph.point.clone();
    return null;
  }
  if(!surfMesh)return null;
  if(surfType==='none')return null;
  if(surfType==='loft'&&!window._loftGeo)return null;
  if(surfType==='model'&&!window._modelCanvasGeo)return null;

  var cam = activeCam();
  drawRC.setFromCamera(ndc, cam);
  var rayDir = drawRC.ray.direction;

  var prevSide = surfMesh.material.side;
  // Models: Raycast ONLY front faces facing the camera to prevent punching into interior/back of model
  if (surfType === 'model') {
    surfMesh.material.side = THREE.FrontSide;
  } else {
    surfMesh.material.side = THREE.DoubleSide;
  }

  var shits = drawRC.intersectObject(surfMesh, false);
  surfMesh.material.side = prevSide;

  if (surfType === 'model') {
    if (shits && shits.length > 0) {
      var normMat = new THREE.Matrix3().getNormalMatrix(surfMesh.matrixWorld);
      var bestHit = null;
      for (var i = 0; i < shits.length; i++) {
        var h = shits[i];
        if (h.face && h.face.normal) {
          var wn = h.face.normal.clone().applyMatrix3(normMat).normalize();
          // Must face camera
          if (wn.dot(rayDir) < 0.1) {
            bestHit = h;
            bestHit._worldNorm = wn;
            break;
          }
        }
      }
      if (!bestHit) {
        bestHit = shits[0];
        if (bestHit.face && bestHit.face.normal) {
          bestHit._worldNorm = bestHit.face.normal.clone().applyMatrix3(normMat).normalize();
        }
      }

      var hitPt = bestHit.point.clone();
      var worldNorm = bestHit._worldNorm || (bestHit.face && bestHit.face.normal ?
        bestHit.face.normal.clone().applyMatrix3(normMat).normalize() :
        rayDir.clone().negate());
      if (worldNorm.dot(rayDir) > 0) worldNorm.negate();

      hitPt.normal = worldNorm.clone();
      _lastDrawHit = { pt: hitPt.clone(), norm: worldNorm.clone(), dist: bestHit.distance };

      if (window._updateRaycastDebug) {
        window._updateRaycastDebug({
          hitPt: hitPt,
          ray: drawRC.ray,
          surfType: surfType,
          bestHit: bestHit,
          faceIndex: bestHit.faceIndex,
          distance: bestHit.distance,
          hitCount: shits.length
        });
      }
      return hitPt;
    } else {
      // Ray missed the model — return null, drawing loop skips this point.
      // No tangent-plane projection: on round models it launches strokes into space.
      if (window._updateRaycastDebug) {
        window._updateRaycastDebug({
          hitPt: null,
          ray: drawRC.ray,
          surfType: surfType,
          status: 'MISSED'
        });
      }
      return null;
    }
  }

  // Standard non-model surfaces
  if(!shits.length) {
    if (window._updateRaycastDebug) {
      window._updateRaycastDebug({
        hitPt: null,
        ray: drawRC.ray,
        surfType: surfType,
        status: 'MISSED'
      });
    }
    return null;
  }
  var bestHit = shits[0];
  var hitPt = bestHit.point.clone();
  var worldNorm = (bestHit.face && bestHit.face.normal) ?
    bestHit.face.normal.clone().transformDirection(surfMesh.matrixWorld).normalize() :
    rayDir.clone().negate();
  if (worldNorm.dot(rayDir) > 0) worldNorm.negate();
  hitPt.normal = worldNorm.clone();

  if (window._updateRaycastDebug) {
    window._updateRaycastDebug({
      hitPt: hitPt,
      ray: drawRC.ray,
      surfType: surfType,
      bestHit: bestHit,
      faceIndex: bestHit.faceIndex,
      distance: bestHit.distance,
      hitCount: shits.length
    });
  }
  return hitPt;
}
const hoverRC=new THREE.Raycaster();
function checkHover(px,py){
  var r=_cachedRect;
  var ndcX=((px-r.left)/r.width)*2-1, ndcY=-((py-r.top)/r.height)*2+1;
  var ndc=new THREE.Vector2(ndcX,ndcY);
  if(_fpsMode&&_fpsSurfMode===1&&_fpsPlaneFill){
    hoverRC.setFromCamera(ndc,activeCam());
    _fpsPlaneFill.material.side=THREE.DoubleSide;
    var fhits=hoverRC.intersectObject(_fpsPlaneFill,false);
    return fhits.length>0;
  }
  // Prims-as-plane mode: hover check against prim meshes
  if(window._primsAsPlane && window._primRaycast){
    hoverRC.setFromCamera(ndc,activeCam());
    var ph=window._primRaycast(hoverRC);
    return ph !== null;
  }
  if(!surfMesh)return false;
  if(surfType==='none')return false;
  if(surfType==='loft'&&!window._loftGeo)return false;
  if(surfType==='model'&&!window._modelCanvasGeo)return false;
  hoverRC.setFromCamera(ndc,activeCam());
  var prev=surfMesh.material.side;surfMesh.material.side=THREE.DoubleSide;
  var shits=hoverRC.intersectObject(surfMesh,false);surfMesh.material.side=prev;
  return shits.length>0;
}

// ── Depth system — frosted glass (v5.6) ──────────────────────────
// Depth cue is now the _frostedMesh in surfGroup. No per-vertex recoloring.
const BG_COL=new THREE.Color(0xffffff);

// ── UI Theme System ─────────────────────────────────────────────
// _uiTheme: 'default' | 'dark' | 'light'
var _uiTheme='dark';
// JS-side ink RGB for canvas drawing — updated by setUITheme
var _inkRGB={r:224,g:224,b:228};
// Helper: returns 'rgba(r,g,b, alpha)' for canvas drawing
function _themeInk(a){return 'rgba('+_inkRGB.r+','+_inkRGB.g+','+_inkRGB.b+','+a+')';}
// Contrasting highlight color for canvas hover overlays
var _themeHilight='#333';
// E-ink desaturation: convert any CSS color to grayscale luminance when eink theme active
function _einkDesat(col){
  if(_uiTheme!=='eink')return col;
  // Parse hex
  var m=col.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if(m){
    var r=parseInt(m[1],16),g=parseInt(m[2],16),b=parseInt(m[3],16);
    var l=Math.round(0.299*r+0.587*g+0.114*b);
    var h=l.toString(16);if(h.length<2)h='0'+h;
    return '#'+h+h+h;
  }
  return col;
}

// Sync world grid + surface + drawing plane colors for eink vs normal themes
var SURF_TRACE_EINK=0x888888;
function _activeSurfTrace(){return _uiTheme==='eink'?SURF_TRACE_EINK:_curSurfTrace;}

// Track surface grid HSL for texture generation
var _surfGridHSL=null;

// Derive grid/plane colors from bg color (non-eink themes)
function _syncGridToBg(bgCol){
  var hsl={};bgCol.getHSL(hsl);
  var isDark=hsl.l<0.4;
  if(surfFillMat){
    surfFillMat.color.setHex(isDark?0x343844:0xffffff);
    surfFillMat.opacity=isDark?0.45:0.65;
  }
  if(surfWireMat){
    surfWireMat.color.setHex(isDark?0x7a8292:0xa0a8b4);
    surfWireMat.opacity=0.85;
  }
  if(surfGroup){surfGroup.children.forEach(function(c){
    if(c.isLineSegments&&c.material&&(c.renderOrder===8||c.renderOrder===9)){
      c.material.color.setHex(isDark?0xffffff:0x222630);
      c.material.opacity=1.0;
    }
  });}
  if(_fpsPlaneFill&&_fpsPlaneFill.material){
    _fpsPlaneFill.material.color.setHex(isDark?0x343844:0xffffff);
    _fpsPlaneFill.material.opacity=isDark?0.45:0.65;
  }
  // World ground grid: clean neutral grey lines
  var gc1=new THREE.Color(isDark?0x8890a0:0x8892a2);
  var gc2=new THREE.Color(isDark?0x3a404c:0xcdd4de);
  var newGrid=new THREE.GridHelper(20,20,gc1.getHex(),gc2.getHex());
  gridH.geometry.dispose();
  gridH.geometry=newGrid.geometry;
  if(gridH.material.vertexColors===undefined)gridH.material.vertexColors=true;
  gridH.material.needsUpdate=true;
  newGrid.material.dispose();
  // Store HSL for surface grid texture
  _surfGridHSL={h:0,s:0,l:isDark?0.8:0.2};
  applyFrostedGridTex();
  markDirty();
}
function _syncGridColors(eink){
  if(eink){
    _curSurfTrace=SURF_TRACE_EINK;
    _surfGridHSL=null;
    // World grid gray
    var newGrid=new THREE.GridHelper(20,20,0x999999,0xcccccc);
    gridH.geometry.dispose();
    gridH.geometry=newGrid.geometry;
    if(gridH.material.vertexColors===undefined)gridH.material.vertexColors=true;
    gridH.material.needsUpdate=true;
    newGrid.material.dispose();
    // Surface/plane materials gray
    if(surfFillMat)surfFillMat.color.setHex(SURF_TRACE_EINK);
    if(surfWireMat)surfWireMat.color.setHex(SURF_TRACE_EINK);
    if(surfGroup){surfGroup.children.forEach(function(c){
      if(c.isLineSegments&&c.material&&c.renderOrder===8)c.material.color.setHex(SURF_TRACE_EINK);
    });}
    if(_fpsPlaneFill&&_fpsPlaneFill.material)_fpsPlaneFill.material.color.setHex(SURF_TRACE_EINK);
    applyFrostedGridTex();
    markDirty();
  } else {
    // Re-derive from current bg
    var bgCol=scene.background||new THREE.Color(0xcdb899);
    _syncGridToBg(bgCol);
  }
}

function setUITheme(theme){
  _uiTheme=theme||'default';
  if(_uiTheme==='dark'){
    _inkRGB={r:255,g:255,b:255};
    _themeHilight='#444';
    document.body.setAttribute('data-theme','dark');
  } else if(_uiTheme==='light'){
    _inkRGB={r:20,g:21,b:26};
    _themeHilight='#fff';
    document.body.setAttribute('data-theme','light');
  } else if(_uiTheme==='eink'){
    _inkRGB={r:0,g:0,b:0};
    _themeHilight='#ccc';
    document.body.setAttribute('data-theme','eink');
    _syncGridColors(true);
  } else {
    _inkRGB={r:20,g:21,b:26};
    _themeHilight='#fff';
    document.body.setAttribute('data-theme','default');
  }
  if(_uiTheme!=='eink')_syncGridColors(false);
  // Update meta theme-color
  var mt=document.querySelector('meta[name="theme-color"]');
  if(mt){
    var st=getComputedStyle(document.documentElement);
    mt.setAttribute('content',st.getPropertyValue('--bg').trim());
  }
  // Redraw all canvases
  if(window._gDraw)window._gDraw();
  if(window._pbGcDraw)window._pbGcDraw();
  if(window._ncDraw)window._ncDraw();
  if(window._pbNcDraw)window._pbNcDraw();
  if(window._sgGcDraw)window._sgGcDraw();
  if(window._pgGcDraw)window._pgGcDraw();
  if(window._brushRedraw)window._brushRedraw();
  markDirty();
}

function getDrawPlane(){const n=new THREE.Vector3(0,0,1).applyQuaternion(surfGroup.quaternion);return{n,d:n.dot(surfPos)};}
function signedDist(pt,plane){return plane.n.dot(pt)-plane.d;}
// Stubs kept for undo/redo references
var _lastPlaneKey='';
function updateDepth(){}
function resetDepthColors(){}

// ── Material cache & Shader Materials (Paper Rockets Effects & Textures) ──────────
const _matCache=new Map();
const _animatedUniformsList=[];

const _EFFECT_VERT_SHADER=`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const _COMMON_GLSL_HEAD=`
  precision highp float;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uScale;
  uniform vec3 uLightDirection;
  uniform vec2 uResolution;

  float hash2d(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise2d(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash2d(i + vec2(0.0, 0.0)), hash2d(i + vec2(1.0, 0.0)), u.x),
      mix(hash2d(i + vec2(0.0, 1.0)), hash2d(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm2(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    vec2 coord = p;
    for (int i = 0; i < 3; i++) {
      v += noise2d(coord) * amp;
      coord *= 2.03;
      amp *= 0.5;
    }
    return v;
  }

  float voronoi(vec2 p, float w, float offset, float t) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float m = 8.0;
    for (int j = -2; j <= 2; j++) {
      for (int i = -2; i <= 2; i++) {
        vec2 g = vec2(float(i), float(j));
        float o = hash2d(n + g);
        vec2 animO = vec2(offset) + sin(vec2(t + o * 6.2831853) + p) * 0.3;
        float d = length(g - f + animO);
        float h = smoothstep(-1.0, 1.0, (m - d) / w);
        m = mix(m, d, h) - h * (1.0 - h) * w / (1.0 + w * 3.0);
      }
    }
    return m;
  }
`;

// ── Turntable 360 Showcase Mode ──
var _showcaseMode = false;
var _showcaseRaf = null;
var _showcaseLastTime = 0;

function startShowcase() {
  if (_showcaseMode) return;
  _showcaseMode = true;
  _showcaseLastTime = performance.now();

  // Center camera target on artwork bounding center if strokes exist
  if (typeof strokes !== 'undefined' && strokes.length > 0) {
    var box = new THREE.Box3();
    strokes.forEach(function(s){
      s.pts.forEach(function(p){ box.expandByPoint(p); });
    });
    if (!box.isEmpty()) {
      box.getCenter(cam.target);
    }
  }

  function loop(now) {
    if (!_showcaseMode) return;
    var dt = Math.min(0.1, (now - _showcaseLastTime) * 0.001);
    _showcaseLastTime = now;

    cam.theta += 0.5 * dt;
    cam.phi = (Math.PI / 2 - 0.28) + Math.sin(now * 0.0012) * 0.12;

    updCam();
    _showcaseRaf = requestAnimationFrame(loop);
  }
  _showcaseRaf = requestAnimationFrame(loop);

  var scBtn = document.getElementById('nav-showcase');
  if (scBtn) scBtn.classList.add('on');
  var topScBtn = document.getElementById('bshowcase-tb');
  if (topScBtn) topScBtn.classList.add('on');
  if (window.toast) window.toast('Showcase Mode · Tap anywhere to exit');
}

function stopShowcase() {
  if (!_showcaseMode) return;
  _showcaseMode = false;
  if (_showcaseRaf) {
    cancelAnimationFrame(_showcaseRaf);
    _showcaseRaf = null;
  }
  var scBtn = document.getElementById('nav-showcase');
  if (scBtn) scBtn.classList.remove('on');
  var topScBtn = document.getElementById('bshowcase-tb');
  if (topScBtn) topScBtn.classList.remove('on');
  markDirty();
}

function toggleShowcase() {
  if (_showcaseMode) stopShowcase();
  else startShowcase();
}

window._startShowcase = startShowcase;
window._stopShowcase = stopShowcase;
window._toggleShowcase = toggleShowcase;

window.cam = cam;
window.updCam = updCam;
window.syncOrtho = syncOrtho;
window.s2w = s2w;
window.checkHover = checkHover;
window.setUITheme = setUITheme;
window._matCache = _matCache;
window._animatedUniformsList = _animatedUniformsList;
