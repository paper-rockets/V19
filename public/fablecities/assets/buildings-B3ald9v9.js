import{$ as e,A as t,B as n,C as r,E as i,F as a,Gt as o,H as s,It as c,T as l,V as u,W as d,Wt as f,Z as p,dt as m,f as h,ft as g,ht as _,j as v,jt as y,k as b,kt as x,m as S,mt as C,p as w,rt as T,tt as E,ut as D,wt as O,xt as k}from"./index-eKs5Uldr.js";import{t as A}from"./noise-D8FvdR-x.js";var j={uNight:{value:0},uTime:{value:0},uInfo:{value:0},uRoofMap:{value:null},uSunDir:{value:null},uSunStrength:{value:1},uSkyUp:{value:null},uSkyHz:{value:null},uSkyDn:{value:null},uGndBounce:{value:null}},M={PLAIN:0,HOUSE:1,APARTMENT:2,RETAIL:3,CURTAIN:4,INDUSTRIAL:5,INDUSTRIAL_METAL:6};function N(e,t){let n=.55,r=Math.max(e-2*n,.5),i=Math.max(1,Math.floor(r/Math.max(t,1.2)+.35));return{sideM:n,usable:r,nB:i,bay:r/i,x0:-e/2+n}}function P(e){let t=Math.max(6.4,e/Math.max(1,Math.floor(e/7.2))),n=Math.max(1,Math.floor(e/t)),r=(e-n*t)*.5;return{dSpace:t,nD:n,doorW:3.9,centre:n=>r+(n+.5)*t-e/2}}function ee(e,t){let n=N(e,t),r=Math.floor(n.nB*.5);return n.x0+(r+.5)*n.bay}var F=`
#ifdef USE_INSTANCING
  vec3 iSc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
#else
  vec3 iSc = vec3(1.0);
#endif
`,te=`
#ifdef USE_MAP
  vMapUv = iUv;
#endif
#ifdef USE_NORMALMAP
  vNormalMapUv = iUv;
#endif
#ifdef USE_ROUGHNESSMAP
  vRoughnessMapUv = iUv;
#endif
#ifdef USE_METALNESSMAP
  vMetalnessMapUv = iUv;
#endif
#ifdef USE_AOMAP
  vAoMapUv = iUv;
#endif
#ifdef USE_EMISSIVEMAP
  vEmissiveMapUv = iUv;
#endif
#ifdef USE_ALPHAMAP
  vAlphaMapUv = iUv;
#endif
`,I=`
attribute vec4 aParams;
attribute vec4 aParams2;
attribute vec3 aTint;
varying vec2 vFacade;
varying vec4 vFaceInfo;
varying vec4 vP1;
varying vec4 vP2;
varying vec3 vTint;
`,L=`
${F}
{
  vec3 fN = normal;
  float fRoof = step(0.5, abs(fN.y));
  vec2 fac; float faceW; float faceH; float faceId;
  if (abs(fN.x) > 0.5) {
    fac = vec2((0.5 - sign(fN.x) * position.z) * iSc.z, position.y * iSc.y);
    faceW = iSc.z; faceH = iSc.y; faceId = fN.x > 0.0 ? 0.0 : 1.0;
  } else if (abs(fN.z) > 0.5) {
    fac = vec2((0.5 + sign(fN.z) * position.x) * iSc.x, position.y * iSc.y);
    faceW = iSc.x; faceH = iSc.y; faceId = fN.z > 0.0 ? 2.0 : 3.0;
  } else {
    fac = vec2((position.x + 0.5) * iSc.x, (position.z + 0.5) * iSc.z);
    faceW = iSc.x; faceH = iSc.z; faceId = 4.0;
  }
  vFacade = fac;
  vFaceInfo = vec4(faceW, faceH, fRoof, faceId);
  vP1 = aParams; vP2 = aParams2; vTint = aTint;
  vec2 iUv = fac / max(aParams2.w, 0.25);
  ${te}
}
`,ne=`
uniform vec3 uSkyUp;
uniform vec3 uSkyHz;
uniform vec3 uSkyDn;
vec3 fSkyAt(float ry) {
  vec3 above = mix(uSkyHz, uSkyUp, smoothstep(0.015, 0.50, ry));
  return mix(uSkyDn, above, smoothstep(-0.22, 0.02, ry));
}
float fSkyFresnel(float ndv) { return 0.140 + 0.72 * pow(1.0 - clamp(ndv, 0.0, 1.0), 4.0); }
`,re=`
uniform float uNight;
uniform float uTime;
uniform float uInfo;
uniform float uSunStrength;
uniform vec3 uSunDir;
uniform sampler2D uRoofMap;
varying vec2 vFacade;
varying vec4 vFaceInfo;
varying vec4 vP1;
varying vec4 vP2;
varying vec3 vTint;
float fHash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float fVal(vec2 p) {
  vec2 i = floor(p), fr = fract(p);
  fr = fr * fr * (3.0 - 2.0 * fr);
  float a = fHash21(i), b = fHash21(i + vec2(1.0, 0.0)), c = fHash21(i + vec2(0.0, 1.0)), d = fHash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, fr.x), mix(c, d, fr.x), fr.y);
}
float fBox2(vec2 d, vec2 aa) { return (1.0 - smoothstep(-aa.x, aa.x, d.x)) * (1.0 - smoothstep(-aa.y, aa.y, d.y)); }
float gWinMask;   // glass + frame coverage, so <aomap_fragment> can skip the wall AO on glazing
float gAO;        // recess / sill / plinth ambient occlusion, applied to the indirect light
${ne}
`,ie=`
{
  gWinMask = 0.0;
  gAO = 1.0;
  float floorH = max(vP1.x, 2.0);
  float style = vP1.y;
  float seed = vP1.z;
  float groundH = max(vP1.w, floorH);
  float bayW = max(vP2.x, 1.2);
  float winFrac = vP2.y;
  float litBias = vP2.z;
  float faceW = vFaceInfo.x, faceH = vFaceInfo.y, roof = vFaceInfo.z, faceId = vFaceInfo.w;
  vec2 f = vFacade;
  float px = max(fwidth(f.x), fwidth(f.y));
  if (roof > 0.5) {
    // flat roof: bitumen/gravel, felt seams, ponding stains and a concrete parapet ring with a coping
    vec3 roofCol = texture2D(uRoofMap, f / 7.0).rgb;
    float ed = min(min(f.x, faceW - f.x), min(f.y, faceH - f.y));
    float parapet = 1.0 - smoothstep(0.30, 0.46, ed);
    float coping = (1.0 - smoothstep(0.06, 0.14, abs(ed - 0.20))) * step(ed, 0.42);
    float grit = fHash21(floor(f * 2.0) + seed);
    float seam = 1.0 - smoothstep(0.02, 0.07, abs(fract(f.y / 2.4 + seed) - 0.5) * 2.4);
    float pond = smoothstep(0.35, 0.9, fHash21(floor(f / 3.5) + seed * 3.0)) * (1.0 - parapet);
    vec3 rc = roofCol * (0.46 + 0.26 * grit) * vec3(0.97, 0.97, 1.0);
    rc *= 1.0 - 0.18 * seam;
    rc *= 1.0 - 0.22 * pond;
    vec3 pc = vec3(0.46, 0.45, 0.43) * (0.9 + 0.12 * grit);
    diffuseColor.rgb = mix(rc, pc, parapet);
    diffuseColor.rgb *= 1.0 + 0.22 * coping;
    diffuseColor.rgb *= 1.0 - 0.30 * (1.0 - smoothstep(0.0, 0.55, ed - 0.44));
    // parapet upstand shades the deck it rings
    gAO = mix(1.0, 0.62, 1.0 - smoothstep(0.0, 1.1, ed - 0.44));
    roughnessFactor = mix(0.93, 0.74, parapet);
    metalnessFactor = 0.0;
  } else {
    // ---------------------------------------------------------------- shared facade frame (view space)
    vec3 upV = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
    vec3 fNv = nonPerturbedNormal;
    vec3 fTv = normalize(cross(upV, fNv) + vec3(1e-5));
    vec3 fBv = cross(fNv, fTv);
    vec3 vDir = -normalize(vViewPosition);            // camera -> fragment
    vec3 ts = vec3(dot(vDir, fTv), dot(vDir, fBv), dot(vDir, fNv));
    vec3 sunV = (viewMatrix * vec4(uSunDir, 0.0)).xyz;
    vec3 Lts = vec3(dot(-sunV, fTv), dot(-sunV, fBv), dot(-sunV, fNv));
    float sunFace = smoothstep(0.02, 0.30, Lts.z) * uSunStrength;
    // low-frequency macro variation kills the tiling of the 1 m albedo sets
    float macro = fVal(f * 0.21 + seed * 11.0) * 0.62 + fVal(f * 0.062 + seed * 4.0) * 0.38;
    float corner = 1.0 - smoothstep(0.0, 0.55, min(f.x, faceW - f.x));

  if (style > 4.5) {
    // ================================================================ INDUSTRIAL (no floor grid)
    // metal-clad halls (style 6) already carry their ribs in the albedo/normal: only the girth
    // rails are drawn there, or the wall turns into a black corduroy field.
    float metalClad = step(5.5, style);
    float panelW = 1.06;
    float pj = abs(fract(f.x / panelW + 0.5) - 0.5) * panelW;          // distance to a vertical joint
    float joint = (1.0 - smoothstep(0.012, 0.034, pj)) * (1.0 - metalClad);
    float hj = abs(fract(f.y / 2.35 + 0.5) - 0.5) * 2.35;
    float hJoint = (1.0 - smoothstep(0.012, 0.030, hj)) * step(1.15, f.y) * mix(1.0, 0.55, metalClad);
    float plinth = 1.0 - smoothstep(1.02, 1.16, f.y);                   // concrete kicker
    float plinthTop = (1.0 - smoothstep(0.0, 0.10, abs(f.y - 1.09)));
    // splash / rain weathering above the plinth and streaks below the eaves
    float splash = (1.0 - smoothstep(0.0, 1.5, f.y - 1.1)) * (0.45 + 0.55 * fVal(vec2(f.x * 1.7, 3.0) + seed));
    float streak = smoothstep(0.55, 1.0, fVal(vec2(f.x * 0.8 + seed * 13.0, 0.5)))
                 * (1.0 - smoothstep(0.0, 5.0, faceH - f.y)) * 0.9;
    float rust = smoothstep(0.62, 1.0, fVal(f * vec2(0.5, 0.28) + seed * 5.0));

    // clerestory strip glazing under the eave
    float sTop = faceH - 0.95, sBot = faceH - 2.25;
    float lite = step(sBot, f.y) * step(f.y, sTop);
    float lx = abs(fract(f.x / 2.6 + 0.5) - 0.5) * 2.6;
    lite *= 1.0 - step(1.14, lx);
    lite *= step(0.6, f.x) * step(f.x, faceW - 0.6);

    // roller / dock doors on the frontage face
    float dSpace = max(6.4, faceW / max(1.0, floor(faceW / 7.2)));
    float nD = max(1.0, floor(faceW / dSpace));
    float du = f.x - (faceW - nD * dSpace) * 0.5;
    float di = floor(du / dSpace);
    float dxc = (fract(du / dSpace) - 0.5) * dSpace;
    float frontFace = step(1.5, faceId) * step(faceId, 2.5);
    float doorOk = frontFace * step(0.0, du) * step(du, nD * dSpace) * step(faceH, 40.0);
    float dW = 3.9, dH = min(4.3, faceH - 2.6);
    float inDoor = doorOk * step(abs(dxc), dW * 0.5) * step(f.y, dH);
    float doorEdge = doorOk * (1.0 - smoothstep(dW * 0.5 - 0.14, dW * 0.5, abs(dxc))) * step(f.y, dH);
    float ribs = 1.0 - smoothstep(0.02, 0.055, abs(fract(f.y / 0.34 + 0.5) - 0.5) * 0.34);
    float lintel = doorOk * (1.0 - smoothstep(0.0, 0.22, abs(f.y - dH - 0.16))) * step(abs(dxc), dW * 0.5 + 0.25);

    vec3 wall = diffuseColor.rgb;
    wall *= 0.88 + 0.24 * macro;
    wall *= 1.0 - 0.22 * joint - 0.14 * hJoint;
    wall *= 1.0 - 0.22 * splash;
    wall *= 1.0 - 0.16 * streak;
    wall = mix(wall, wall * vec3(0.70, 0.50, 0.36), rust * mix(0.30, 0.20, metalClad));
    wall *= 1.0 - 0.10 * corner;
    // concrete kicker
    wall = mix(wall, vec3(0.40, 0.395, 0.385) * (0.86 + 0.28 * macro), plinth);
    wall *= 1.0 - 0.30 * plinthTop;
    // roller door: dark ribbed metal set 0.10 m back
    vec3 doorCol = mix(vec3(0.30, 0.31, 0.32), vec3(0.22, 0.26, 0.30), step(0.5, fHash21(vec2(di, seed * 91.0))));
    doorCol *= 0.82 + 0.30 * ribs;
    wall = mix(wall, doorCol, inDoor);
    wall *= 1.0 - 0.55 * doorEdge;
    wall = mix(wall, vec3(0.30, 0.30, 0.29), lintel * 0.7);
    diffuseColor.rgb = wall;
    roughnessFactor = clamp(roughnessFactor * (0.94 + 0.14 * macro) + 0.10 * splash, 0.2, 1.0);
    metalnessFactor = mix(metalnessFactor, 0.32, inDoor);
    // openings darken the ambient: door reveal + strip glazing head
    gAO = mix(1.0, 0.55, inDoor) * mix(1.0, 0.42, doorEdge) * mix(1.0, 0.70, plinthTop);

    // strip glazing: dark tinted, dirty, with a reveal shadow at its head
    if (lite > 0.5) {
      float headSh = 1.0 - smoothstep(0.0, 0.28, sTop - f.y);
      // dielectric wired glass: a dark, dirty tint plus the same analytic sky reflection the
      // curtain wall uses, so a clerestory strip is a lit band and not a black slot
      vec3 gc = vec3(0.030, 0.034, 0.038) * (0.7 + 0.9 * fHash21(vec2(floor(f.x / 2.6), seed * 17.0)));
      gc *= 1.0 - 0.45 * headSh;
      diffuseColor.rgb = gc;
      roughnessFactor = 0.12;
      metalnessFactor = 0.0;
      float lNdV = clamp(dot(fNv, -vDir), 0.0, 1.0);
      vec3 lSky = fSkyAt(dot(reflect(vDir, fNv), upV));
      totalEmissiveRadiance += lSky * fSkyFresnel(lNdV) * 0.80 * (1.0 - 0.45 * headSh);
      gAO = 0.62 * (1.0 - 0.35 * headSh);
      gWinMask = 1.0;
    }
    // sun-side shading of the recessed door pocket
    diffuseColor.rgb *= 1.0 - 0.35 * inDoor * sunFace;
    diffuseColor.rgb *= 0.86 + 0.14 * smoothstep(0.0, 2.0, f.y);

    float nightOnI = smoothstep(0.06, 0.42, uNight);
    float litI = step(0.62, fHash21(vec2(floor(f.x / 2.6) * 3.0, seed * 29.0))) * nightOnI;
    totalEmissiveRadiance += vec3(0.95, 0.93, 0.82) * lite * litI * 0.45;
  } else if (style > 0.5) {
    // the raw wall albedo, before any of the detail multiplies — blinds and spandrels are keyed off
    // it so a "closed blind" pane can never be brighter than the wall it sits in
    vec3 wallAlb = diffuseColor.rgb;
    // ================================================================ bay / floor layout
    float sideM = 0.55;
    float u = f.x - sideM;
    float usable = max(faceW - 2.0 * sideM, 0.5);
    float nB = max(1.0, floor(usable / bayW + 0.35));
    float bay = usable / nB;
    float bi = floor(u / bay);
    float uu = fract(u / bay);
    float inside = step(0.0, u) * step(u, usable);
    float isGround = step(f.y, groundH);
    float yA = f.y - groundH;
    float fi = mix(floor(yA / floorH) + 1.0, 0.0, isGround);
    float vv = mix(fract(yA / floorH), f.y / groundH, isGround);
    float h = mix(floorH, groundH, isGround);
    // a pitched-roof house has no parapet, so the 0.45 m top margin used by flat-roof blocks was
    // eating its entire upper storey of windows
    float topMargin = mix(0.45, 0.10, 1.0 - step(1.5, style));
    float nFl = floor((faceH - groundH - topMargin) / floorH + 0.001);
    float floorOk = mix(step(fi, nFl), 1.0, isGround);
    float hCell = fHash21(vec2(bi * 7.0 + faceId * 131.0, fi * 13.0 + seed * 977.0));
    float hCell2 = fHash21(vec2(fi * 3.1 + seed * 311.0, bi * 5.7 + faceId * 71.0));
    float isOffice = step(3.5, style) * (1.0 - step(4.5, style));
    float isHouse = 1.0 - step(1.5, style);
    float isRetail = step(2.5, style) * (1.0 - step(3.5, style));
    float shopFront = isRetail * isGround;
    float frontFace = step(1.5, faceId) * step(faceId, 2.5);
    // texel footprint relative to one bay: fades the window grid into its area average (anti-moire)
    float lod = smoothstep(0.10, 0.42, px / max(bay, 1.0));

    float wW = bay * winFrac, wH = h * 0.5, wC = 0.55;
    float isDoor = 0.0;
    vec3 frameCol = vec3(0.72);
    float frameRough = 0.45, frameMet = 0.05;
    // Glass is a DIELECTRIC now (metalness 0): glassTint is the dark room/plenum seen through the
    // pane and glassRefl scales the analytic sky reflection added below. The old metalness-0.9
    // "colour is the F0" trick relied entirely on the env probe, which returns ~0 for a pane that
    // reflects downwards — that is what made every window a black card.
    vec3 glassTint = vec3(0.030, 0.033, 0.038);
    float glassRough = 0.05;
    float glassRefl = 1.0;
    float recessD = 0.16;   // opening depth in metres
    float hasSill = 1.0;
    float plinthH = 0.0;    // masonry / stone base course
    if (isHouse > 0.5) {                                 // detached house
      wW = min(bay * 0.62, 1.85); wH = 1.55; wC = 0.55;
      float doorBay = floor(nB * 0.5);
      isDoor = isGround * step(abs(bi - doorBay), 0.1) * frontFace;
      wW = mix(wW, 1.02, isDoor); wH = mix(wH, 2.15, isDoor); wC = mix(wC, (2.15 * 0.5 + 0.06) / h, isDoor);
      frameCol = vec3(0.84, 0.83, 0.79); frameRough = 0.44;
      // a house window shows a room: dark, but warm and never black
      glassTint = mix(vec3(0.022, 0.020, 0.017), vec3(0.040, 0.037, 0.033), hCell2);
      glassRough = 0.10;
      recessD = mix(0.20, 0.10, isDoor);
      plinthH = 0.34;
    } else if (style < 2.5) {                            // apartment block
      wW = bay * winFrac; wH = h * 0.54; wC = 0.56;
      float tall = step(0.72, hCell2) * (1.0 - isGround);
      wH = mix(wH, h * 0.76, tall); wC = mix(wC, 0.49, tall);
      frameCol = vec3(0.33, 0.34, 0.36); frameRough = 0.40; frameMet = 0.25;
      glassTint = mix(vec3(0.019, 0.018, 0.017), vec3(0.036, 0.034, 0.030), hCell2);
      glassRough = 0.10;
      recessD = 0.21;
      plinthH = 0.85;
      if (isGround > 0.5) {
        float doorBay = floor(nB * 0.5);
        isDoor = step(abs(bi - doorBay), 0.1) * frontFace;
        // lobby: wide, floor-to-soffit glazing either side of the entrance
        float lobby = frontFace * step(abs(bi - doorBay), 1.6) * (1.0 - isDoor);
        wW = mix(wW, 1.9, isDoor); wH = mix(wH, 2.5, isDoor); wC = mix(wC, 1.31 / h, isDoor);
        wW = mix(wW, bay * 0.80, lobby); wH = mix(wH, h * 0.62, lobby); wC = mix(wC, 0.50, lobby);
        recessD = mix(mix(recessD, 0.12, lobby), 0.10, isDoor);
      }
    } else if (isRetail > 0.5) {                         // retail / shopfront
      if (isGround > 0.5) { wW = bay * 0.88; wH = groundH * 0.60; wC = 0.40; recessD = 0.13; hasSill = 0.0; }
      else { wW = bay * winFrac; wH = h * 0.54; wC = 0.56; recessD = 0.16; }
      frameCol = vec3(0.21, 0.22, 0.24); frameRough = 0.30; frameMet = 0.45;
      glassTint = mix(mix(vec3(0.020, 0.019, 0.018), vec3(0.037, 0.035, 0.031), hCell2), vec3(0.018, 0.019, 0.021), isGround);
      glassRough = mix(0.10, 0.05, isGround);
      glassRefl = mix(1.0, 1.10, isGround);
      plinthH = 0.30;
    } else {                                             // curtain wall
      // real mullion width: a 2 m bay carries a 12 cm mullion each side, and every floor gets an
      // opaque spandrel. Without that a tower is 90% mirror and reads as a black monolith.
      wW = bay - 0.24; wH = h - 0.26; wC = 0.5;
      // anodised aluminium mullion: metalness kept low enough that it still has a diffuse read
      // when the probe is dark, otherwise the whole grid measured Y 0.0000
      frameCol = vec3(0.46, 0.47, 0.49); frameRough = 0.32; frameMet = 0.30;
      glassTint = vec3(0.016, 0.019, 0.024) * vec3(1.0 - 0.18 * fract(seed * 3.7), 1.0, 0.90 + 0.24 * fract(seed * 5.13));
      glassRough = 0.05;
      // pane-to-pane variance is now a REFLECTIVITY variance of at most 1.35:1 (it used to be a
      // 200:1 albedo jump, which read as random white stickers rather than glazing)
      glassRefl = 0.86 + 0.34 * hCell;
      recessD = 0.11; hasSill = 0.0;
      plinthH = 0.9;
      if (isGround > 0.5) {   // lobby: taller clear glazing, deeper reveal, no spandrel
        wH = groundH - 1.5; wC = (1.5 * 0.5 + wH * 0.5) / h; wW = bay - 0.16;
        glassTint = vec3(0.030, 0.030, 0.031);
        glassRough = 0.05; glassRefl = 0.90;
        recessD = 0.30;
      }
    }

    // ------------------------------------------------------------------ opening + parallax reveal
    vec2 p = vec2((uu - 0.5) * bay, (vv - wC) * h);
    vec2 hwv = vec2(wW, wH) * 0.5;
    vec2 dd = abs(p) - hwv;
    vec2 aa = fwidth(f) * 0.9 + 0.004;
    float topOk = step(f.y + 0.3, faceH);
    float mask = inside * floorOk * topOk;
    float openF = fBox2(dd, aa) * mask;

    // parallax into the reveal. invZ is clamped hard (grazing angles otherwise stretch the offset
    // without bound, which serrated the jamb) and the AA width grows with it so the edge stays soft.
    float invZ = 1.0 / max(-ts.z, 0.30);
    vec2 pB = p + ts.xy * (recessD * invZ);           // where the ray meets the glass plane
    vec2 aaB = aa * (1.0 + recessD * invZ * 3.0);
    vec2 dBk = abs(pB) - hwv;
    float openB = fBox2(dBk, aaB);
    // where the ray leaves the opening sideways -> depth of the visible reveal point
    float tx = abs(ts.x) > 1e-4 ? ((ts.x > 0.0 ? hwv.x : -hwv.x) - p.x) / ts.x : 1e5;
    float ty = abs(ts.y) > 1e-4 ? ((ts.y > 0.0 ? hwv.y : -hwv.y) - p.y) / ts.y : 1e5;
    float revD = clamp(-ts.z * min(tx, ty), 0.0, recessD);
    float hitX = step(tx, ty);
    vec3 revN = normalize(mix(-sign(ts.y) * fBv, -sign(ts.x) * fTv, hitX) + fNv * 0.30);
    float reveal = clamp(openF - openF * openB, 0.0, 1.0);

    // frame ring sits at the back of the reveal, glass inside it
    float frameT = mix(0.075, 0.085, isOffice);
    float innerOpen = fBox2(dBk + frameT, aaB);
    float glass = openF * innerOpen;
    float frame = max(openF * openB - glass, 0.0);

    // glazing bars: vertical mullions + a transom on tall windows (faded out with distance)
    float paneW = mix(1.05, 1.55, isOffice);
    float panes = max(1.0, floor(wW / paneW + 0.5));
    float pwd = wW / max(panes, 1.0);
    float gx = (pB.x + hwv.x) / pwd;
    float dmx = abs(gx - floor(gx + 0.5)) * pwd;
    float bars = (1.0 - smoothstep(0.026 - aaB.x, 0.026 + aaB.x, dmx)) * step(1.5, panes);
    if (wH > 1.8) bars = max(bars, 1.0 - smoothstep(0.024 - aaB.y, 0.024 + aaB.y, abs(pB.y - (hwv.y - wH * 0.30))));
    bars = clamp(bars, 0.0, 1.0) * (1.0 - lod * mix(1.0, 0.45, isOffice));
    frame += glass * bars;
    glass *= 1.0 - bars;

    // curtain wall: opaque spandrel strip on the lower part of every floor (never on the lobby)
    float spandrel = isOffice * (1.0 - isGround) * step(vv, 0.32) * glass;
    glass -= spandrel;

    // ------------------------------------------------------------------ recess occlusion + sun shadow
    // ambient: a recessed pane sees a reduced slice of sky. This is the dark head band and the
    // shaded jambs, and because it lands on the INDIRECT term it survives into shadowed facades.
    float rd = max(recessD, 0.04);
    float aoHead = smoothstep(0.0, 2.2, (hwv.y - pB.y) / rd);
    float aoSide = smoothstep(0.0, 1.6, (hwv.x - abs(pB.x)) / rd);
    float aoFoot = smoothstep(0.0, 3.0, (pB.y + hwv.y) / rd);
    float glassAO = mix(0.34, 1.0, aoHead) * mix(0.66, 1.0, aoSide) * mix(0.80, 1.0, aoFoot);
    float revAO = mix(1.0, 0.22, revD / rd);

    // sun: the head/jamb of the reveal throws a hard shadow across the pane
    vec2 pS = pB + Lts.xy * (recessD / max(Lts.z, 0.02));
    float sunLit = fBox2(abs(pS) - hwv, aaB * 1.4);
    float shade = mix(1.0, sunLit, sunFace * 0.92);          // 1 = lit, ~0.08 = shadowed

    // ------------------------------------------------------------------ blinds / doors / glass look
    // Blinds are a matte panel BEHIND the glass. Keyed off the WALL albedo and capped at 0.9x it,
    // so a closed blind can never out-shine the wall — the old absolute 0.30-0.40 card was the
    // "bright pane at Y 0.194 against a wall at Y 0.001" the critique measured as a 200:1 jump.
    float blinds = step(mix(0.80, 0.90, isOffice), hCell) * (1.0 - isDoor) * (1.0 - shopFront);
    float wallY = dot(wallAlb, vec3(0.2126, 0.7152, 0.0722));
    vec3 blindHue = mix(vec3(0.86, 0.84, 0.80), vec3(0.78, 0.80, 0.84), isOffice);
    vec3 blindCol = blindHue * clamp(wallY, 0.06, 0.55) * mix(0.52, 0.88, hCell2);
    vec3 doorCol = mix(vec3(0.17, 0.10, 0.06), vec3(0.12, 0.13, 0.15), step(0.5, hCell2));
    // Dielectric pane: the tint is the dark room behind the glass (never black), the sky lives in
    // the explicit reflection below. metalness 0 keeps it off the dead env probe entirely.
    vec3 gcol = glassTint * (0.72 + 0.56 * hCell2);
    // interior floor: the bottom of a punched window shows a warm-lit room, the top shows sky
    gcol *= mix(vec3(1.26, 1.14, 0.98), vec3(0.92, 0.98, 1.10), smoothstep(-hwv.y, hwv.y, pB.y));
    float gmet = 0.0, grou = glassRough;
    // per-pane reflectivity spread, kept inside 0.82-1.18 so no pane can out-shine its neighbours
    float grefl = glassRefl * (0.82 + 0.36 * fract(hCell * 5.31 + hCell2 * 0.37));
    // the pane inherits its FAMILY from the carrier tint, so a downtown reads as bronze / green /
    // blue glass towers instead of one neutral grey-blue block (p4 minor: "narrow palette")
    vec3 wallHue = wallAlb / max(dot(wallAlb, vec3(0.2126, 0.7152, 0.0722)), 1e-3);
    vec3 paneFamily = mix(vec3(1.0), wallHue, 0.55 * isOffice);
    gcol *= paneFamily;
    // shopfront: a dark shop interior below the sky reflection, so a 4 m pane never reads as a sheet
    float interior = shopFront * (1.0 - smoothstep(-hwv.y * 0.5, hwv.y * 0.55, pB.y)) * 0.80;
    vec3 intCol = mix(vec3(0.075, 0.070, 0.062), vec3(0.20, 0.17, 0.13), hCell2) * (0.7 + 0.9 * hCell);
    gcol = mix(gcol, intCol, interior); grou = mix(grou, 0.30, interior); grefl = mix(grefl, 0.62, interior);
    // a shop is lit inside even by day: a faint warm glow behind the glass keeps the band alive
    totalEmissiveRadiance += vec3(1.0, 0.82, 0.58) * interior * glass * (0.030 + 0.075 * hCell) * (0.35 + 0.65 * uNight);
    gcol = mix(gcol, blindCol, blinds);  gmet = mix(gmet, 0.02, blinds);  grou = mix(grou, 0.60, blinds);  grefl = mix(grefl, 0.55, blinds);
    gcol = mix(gcol, doorCol, isDoor);   gmet = mix(gmet, 0.04, isDoor);  grou = mix(grou, 0.55, isDoor);  grefl = mix(grefl, 0.45, isDoor);
    // soffit / canopy shadow across the head of a shopfront pane
    gcol *= 1.0 - 0.45 * shopFront * (1.0 - smoothstep(hwv.y * 0.55, hwv.y * 1.0, pB.y)) * step(hwv.y * 0.55, pB.y);
    gcol *= mix(1.0, 0.55, 1.0 - shade);

    // ------------------------------------------------------------------ wall detail
    // sill: proud cast-stone shelf with a real, sun-directional drop shadow on the wall below
    float sillT = 0.10, sillProj = 0.14;
    float sillTop = step(-hwv.y - sillT, p.y) * step(p.y, -hwv.y + 0.005) * step(abs(p.x), hwv.x + 0.11) * mask * hasSill * (1.0 - isDoor);
    float drop = sillProj * clamp(Lts.y / max(Lts.z, 0.06), 0.0, 8.0);
    float latt = -sillProj * clamp(Lts.x / max(Lts.z, 0.06), -8.0, 8.0);
    float below = -(p.y + hwv.y + sillT);
    float sillShadow = step(0.0, below) * (1.0 - smoothstep(drop * 0.55, drop + 0.06, below))
                     * (1.0 - smoothstep(hwv.x + 0.02, hwv.x + 0.16, abs(p.x - latt)))
                     * mask * hasSill * (1.0 - isDoor) * sunFace;
    float ambSill = step(0.0, below) * (1.0 - smoothstep(0.0, 0.34, below))
                  * (1.0 - smoothstep(hwv.x + 0.02, hwv.x + 0.20, abs(p.x))) * mask * hasSill * (1.0 - isDoor);
    float grime = (1.0 - smoothstep(0.0, 1.7, below)) * (1.0 - smoothstep(hwv.x * 0.85, hwv.x * 1.15, abs(p.x)))
                * (0.4 + 0.6 * fVal(vec2(p.x * 5.0, bi * 3.0 + seed))) * (1.0 - isOffice) * mask;
    float edgeV = min(vv, 1.0 - vv) * h;
    // floor-slab band + the shadow it casts
    float band = (1.0 - smoothstep(0.05, 0.10, edgeV)) * (1.0 - isGround) * inside * (1.0 - isOffice) * step(1.5, style) * (1.0 - lod);
    // plinth: darker base course with a shadow line at its head
    float plinth = plinthH > 0.01 ? 1.0 - smoothstep(plinthH - 0.06, plinthH + 0.06, f.y) : 0.0;
    float plinthLine = plinthH > 0.01 ? (1.0 - smoothstep(0.0, 0.16, abs(f.y - plinthH))) : 0.0;
    // ground-floor head: the first-floor slab / fascia soffit shades the top of the ground storey
    float gfHead = isGround * (1.0 - smoothstep(0.0, 0.55, groundH - f.y)) * inside;

    vec3 wallBase = diffuseColor.rgb;
    // patchy render + weather staining: a 1K plaster map tiled at 3 m mips away to nothing by 30 m,
    // so the mottling that stops a wall reading as a flat colour field has to be procedural
    float stain = fVal(f * vec2(0.9, 0.42) + seed * 23.0);
    float dirtRun = smoothstep(0.55, 1.0, fVal(vec2(f.x * 1.5 + seed * 31.0, 0.5)))
                  * smoothstep(0.0, 0.35, 1.0 - f.y / max(faceH, 1.0));
    diffuseColor.rgb *= 0.80 + 0.40 * macro;
    diffuseColor.rgb *= 0.93 + 0.14 * stain;
    diffuseColor.rgb *= 1.0 - 0.13 * dirtRun;
    roughnessFactor = clamp(roughnessFactor * (0.92 + 0.18 * macro), 0.25, 1.0);
    diffuseColor.rgb *= 1.0 - 0.18 * grime;
    diffuseColor.rgb *= 1.0 - 0.15 * band;
    diffuseColor.rgb *= 1.0 - 0.12 * corner;
    diffuseColor.rgb *= 1.0 - 0.34 * ambSill - 0.34 * sillShadow;
    // plinth: cast stone / painted base, clearly a different material from the wall above
    vec3 plinthCol = mix(vec3(0.30, 0.295, 0.285), wallBase * 0.55, 0.35) * (0.86 + 0.26 * macro);
    diffuseColor.rgb = mix(diffuseColor.rgb, plinthCol, plinth * step(0.5, 1.0 - isHouse) * 0.92 + plinth * isHouse * 0.75);
    diffuseColor.rgb *= 1.0 - 0.26 * plinthLine;
    diffuseColor.rgb *= 1.0 - 0.30 * gfHead;
    // retail fascia (sign band) between shopfront and first floor — muted, never a saturated ribbon
    if (isRetail > 0.5) {
      float fb = step(groundH - 0.92, f.y) * step(f.y, groundH - 0.06) * inside;
      // shop band: a dark painted fascia. Hue is rotated out of the magenta arc and the chroma is
      // capped hard — a saturated violet ribbon above a shopfront reads as a z-fight artifact.
      float hue = fract(seed * 7.13) * 0.62;
      vec3 fascia = 0.5 + 0.5 * cos(6.2831 * (hue + vec3(0.0, 0.33, 0.67)));
      fascia = mix(vec3(0.085, 0.085, 0.088), fascia * 0.085, 0.30);
      diffuseColor.rgb = mix(diffuseColor.rgb, fascia, fb);
      roughnessFactor = mix(roughnessFactor, 0.55, fb);
      metalnessFactor = mix(metalnessFactor, 0.0, fb);
    }
    diffuseColor.rgb *= 0.84 + 0.16 * smoothstep(0.0, 1.8, f.y);
    vec3 wallCol = diffuseColor.rgb;
    float wallRough = roughnessFactor, wallMet = metalnessFactor;

    // ------------------------------------------------------------------ composite reveal / sill / frame / glass
    vec3 revCol = wallCol * mix(0.62, 1.0, shade);
    diffuseColor.rgb = mix(diffuseColor.rgb, revCol, reveal);
    roughnessFactor = mix(roughnessFactor, min(1.0, wallRough * 1.05), reveal);
    // sill: pale cast stone, slightly proud, catches the sky
    // cast stone reads as a lighter version of the wall, never a clean pure-white bar
    vec3 sillCol = clamp(mix(wallAlb * 1.22 + 0.045, vec3(0.46, 0.455, 0.44), 0.40), 0.05, 0.62) * (0.94 + 0.12 * hCell2);
    diffuseColor.rgb = mix(diffuseColor.rgb, sillCol, sillTop * 0.92);
    roughnessFactor = mix(roughnessFactor, 0.62, sillTop * 0.92);
    diffuseColor.rgb = mix(diffuseColor.rgb, frameCol * mix(0.55, 1.0, shade), frame);
    roughnessFactor = mix(roughnessFactor, frameRough, frame);
    metalnessFactor = mix(metalnessFactor, frameMet, frame);
    // spandrel: an opaque painted/enamelled panel — diffuse, so it catches the sun and gives the
    // tower a readable floor banding instead of one unbroken sheet of mirror
    vec3 spanCol = mix(vec3(0.155, 0.160, 0.170), frameCol * 0.55, 0.35) * (0.85 + 0.30 * hCell2);
    diffuseColor.rgb = mix(diffuseColor.rgb, spanCol, spandrel);
    roughnessFactor = mix(roughnessFactor, 0.42, spandrel);
    metalnessFactor = mix(metalnessFactor, 0.22, spandrel);
    diffuseColor.rgb = mix(diffuseColor.rgb, gcol, glass);
    roughnessFactor = mix(roughnessFactor, grou, glass);
    metalnessFactor = mix(metalnessFactor, gmet, glass);

    // ------------------------------------------------------------------ explicit sky reflection
    // The whole reason glass measured Y 0.001: a vertical pane reflects R = reflect(V, N), and a
    // mirror about a horizontal normal leaves R.y = V.y — so from any camera ABOVE street level the
    // pane points at the ground, where the PMREM sky probe is black. fSkyAt() gives it a real dome
    // (sky / horizon / ground-bounce) and fSkyFresnel() floors the specular at ~11.5 % of that, so
    // a frontal pane still lands Y 0.04-0.12 and a grazing one goes bright.
    float paneNdV = clamp(dot(fNv, -vDir), 0.0, 1.0);
    float paneRy = dot(reflect(vDir, fNv), upV);
    vec3 paneSky = fSkyAt(paneRy);
    // within one opening the head sees more sky than the cill: the top-to-bottom gradient the
    // critique asked for, on top of the natural gradient R.y gives down a tall facade
    float paneGrad = 0.74 + 0.52 * smoothstep(-hwv.y, hwv.y, pB.y);
    vec3 paneRefl = paneSky * fSkyFresnel(paneNdV) * paneGrad * mix(vec3(1.0), paneFamily, 0.45);
    // the reveal shades its own pane, and a recessed pane sees less of the dome
    float reflOcc = mix(0.55, 1.0, glassAO) * mix(0.72, 1.0, shade);
    // mullions and spandrels are glazing-system surfaces too — without a share of this the
    // aluminium grid stayed at Y 0.0000 and the tower read as a black monolith
    // The reveal, the mullion AND the strip of carrier wall between bays all catch the sky. On a
    // curtain wall that strip IS the mullion; leaving it out of the reflection is what kept the
    // aluminium grid at Y 0.000 so the tower read as a black monolith with a pane pattern on it.
    float glazedBg = isOffice * inside * clamp(1.0 - glass - frame - spandrel - reveal, 0.0, 1.0);
    float reflW = glass * grefl + frame * 0.46 + spandrel * 0.32 + reveal * 0.24 + glazedBg * 0.36;
    // past the LOD crossover the grid dissolves into its area average, so the reflection has to
    // follow it or a tower would lose all specular exactly where it matters most (hero altitude)
    float reflFar = clamp((wW * wH) / max(bay * h, 0.01), 0.0, 0.88) * mask;
    vec3 skyGlaze = paneRefl * reflOcc * mix(reflW, reflFar * 0.78, lod);
    totalEmissiveRadiance += skyGlaze * (1.0 - uInfo);   // info views stay flat-shaded

    // ------------------------------------------------------------------ ambient occlusion of the openings
    float nearN = 1.0 - lod;
    float ao = 1.0;
    ao *= mix(1.0, glassAO, clamp((glass + frame + spandrel) * nearN, 0.0, 1.0));
    ao *= mix(1.0, revAO, clamp(reveal * nearN, 0.0, 1.0));
    ao *= 1.0 - 0.45 * ambSill * nearN;
    ao *= 1.0 - 0.30 * gfHead;
    ao *= 1.0 - 0.22 * plinthLine;
    ao *= 1.0 - 0.18 * corner;
    ao *= 1.0 - 0.30 * band * nearN;
    gAO = clamp(ao, 0.06, 1.0);

    // normals: reveal side walls face inwards, glass + sill are flat, everything fades at distance
    float gA_pre = clamp((wW * wH) / max(bay * h, 0.01), 0.0, 0.88) * mask;
    normal = normalize(mix(normal, revN, clamp(reveal * nearN, 0.0, 1.0)));
    normal = normalize(mix(normal, fNv, clamp((glass + frame + spandrel) * nearN, 0.0, 1.0)));
    normal = normalize(mix(normal, normalize(fNv * 0.42 + fBv * 0.92), clamp(sillTop * nearN * 0.9, 0.0, 1.0)));

    gWinMask = clamp((glass + frame + spandrel) * nearN + gA_pre * lod, 0.0, 1.0);

    // ------------------------------------------------------------------ distance dissolve
    // The far average has to include the mullions, spandrels and slab edges, or a curtain-wall
    // tower collapses into one black mirror at hero altitude (round-4: "carpet of boxes").
    float gA = gA_pre;
    float frameFrac = mix(0.20, 0.38, isOffice);
    vec3 glassAvg = mix(gcol * 1.25, frameCol, frameFrac);
    float metAvg = mix(gmet, frameMet, frameFrac);
    float rouAvg = mix(grou, frameRough, frameFrac);
    vec3 farCol = mix(wallCol * 0.94, glassAvg, gA);
    diffuseColor.rgb = mix(diffuseColor.rgb, farCol, lod);
    roughnessFactor = mix(roughnessFactor, mix(wallRough, rouAvg, gA), lod);
    metalnessFactor = mix(metalnessFactor, mix(wallMet, metAvg, gA), lod);
    gAO = mix(gAO, 1.0 - 0.16 * gA, lod);

    // ------------------------------------------------------------------ night lights
    float nightOn = smoothstep(0.06, 0.42, uNight);
    float floorLamp = fHash21(vec2(fi * 19.0 + seed * 53.0, 3.0));
    float cell = mix(hCell, mix(hCell, floorLamp, 0.7), isOffice);
    float frac = clamp(litBias * 0.68 * nightOn, 0.0, 1.0);
    float lit = smoothstep(frac + 0.06, frac - 0.06, cell) * (1.0 - isDoor) * nightOn;
    vec3 lc = mix(vec3(1.0, 0.56, 0.24), vec3(1.0, 0.79, 0.53), hCell2);
    lc = mix(lc, vec3(0.62, 0.76, 1.0), step(0.92, hCell2));
    lc = mix(lc, vec3(0.84, 0.90, 1.0), isOffice * step(0.35, hCell2));
    float bright = mix(0.22, 0.85, fract(hCell * 17.0)) * mix(1.0, 0.42, blinds);
    float winMask = mix(glass, gA, lod);
    float emiss = clamp(winMask, 0.0, 1.0) * lit * bright;
    totalEmissiveRadiance += lc * emiss * 0.86;
    // spill onto the reveal so lit windows glow into their own opening
    totalEmissiveRadiance += lc * reveal * lit * bright * 0.34 * nearN;
    diffuseColor.rgb = mix(diffuseColor.rgb, lc * 0.14, min(1.0, emiss));
    metalnessFactor *= 1.0 - 0.85 * min(1.0, emiss);
    gAO = mix(gAO, 1.0, min(1.0, emiss));
  } else {
    diffuseColor.rgb *= (0.88 + 0.24 * macro) * (0.84 + 0.16 * smoothstep(0.0, 1.0, f.y));
    diffuseColor.rgb *= 1.0 - 0.10 * corner;
    gAO = 1.0 - 0.16 * corner;
  }
  }
  float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
  diffuseColor.rgb = mix(diffuseColor.rgb, vTint * (0.35 + 0.65 * lum), uInfo);
  totalEmissiveRadiance += vTint * 0.12 * uInfo;
}
`,R=`
	float ambientOcclusion = 1.0;
#ifdef USE_AOMAP
	ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	ambientOcclusion = mix( ambientOcclusion, 1.0, clamp( gWinMask, 0.0, 1.0 ) );
#endif
	ambientOcclusion *= clamp( gAO, 0.0, 1.0 );
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
`,z=`
#include <lights_fragment_end>
{
  const vec3 bLumW = vec3(0.2126, 0.7152, 0.0722);
  vec3 bInd = reflectedLight.indirectDiffuse;
  float bIl = dot(bInd, bLumW);
  vec3 bAlb = diffuseColor.rgb + 0.012;
  float bAl = max(dot(bAlb, bLumW), 1e-4);
  vec3 bNeutral = bAlb * (bIl / bAl);              // same luminance, illuminant forced to white
  reflectedLight.indirectDiffuse = mix(bNeutral, bInd, 0.16);
  reflectedLight.indirectDiffuse += diffuseColor.rgb * uGndBounce;
}
`;function ae(e){e.fragmentShader.includes(`bLumW`)||(e.fragmentShader.includes(`uniform vec3 uGndBounce`)||(e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec3 uGndBounce;`)),e.fragmentShader=e.fragmentShader.replace(`#include <lights_fragment_end>`,z))}function oe(e,t){let n=e.customProgramCacheKey,r=!n||n.toString().includes(`return ''`)||n.toString().length<40;e.customProgramCacheKey=function(){return t+(r?``:`|`+n.call(this))}}function se(e){let t=e.onBeforeCompile;return e.onBeforeCompile=function(e,n){t&&t.call(this,e,n),Object.assign(e.uniforms,j),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+I).replace(`#include <uv_vertex>`,`#include <uv_vertex>
`+L),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+re).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
 normal = normalize(mix(normal, nonPerturbedNormal, vFaceInfo.z));`).replace(`#include <emissivemap_fragment>`,ie+`
#include <emissivemap_fragment>`).replace(`#include <aomap_fragment>`,R),ae(e)},oe(e,`bld-facade-v15`),e}function B(e,t=`xz`,n=1){let r;switch(t){case`slope`:r=`vec2(iSc.x, sqrt(iSc.y * iSc.y + 0.25 * iSc.z * iSc.z))`;break;case`cyl`:r=`vec2(3.14159 * iSc.x, iSc.y)`;break;case`xy`:r=`vec2(iSc.x, iSc.y)`;break;default:r=`vec2(iSc.x, iSc.z)`}let i=e.onBeforeCompile;return e.onBeforeCompile=function(e,t){i&&i.call(this,e,t),e.uniforms.uGndBounce=j.uGndBounce,e.vertexShader=e.vertexShader.replace(`#include <uv_vertex>`,`#include <uv_vertex>\n${F}\n{ vec2 iUv = uv * ${r} / ${n.toFixed(3)};\n${te}\n}`),ae(e)},oe(e,`bld-iuv2-`+t+`-`+n.toFixed(2)),e}function ce(e,t=2.4,n=.34){let r=e.onBeforeCompile;return e.onBeforeCompile=function(e,i){r&&r.call(this,e,i),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vRoofUv;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>\n${F}\n{ vec2 sl = vec2(iSc.x, sqrt(iSc.y * iSc.y + 0.25 * iSc.z * iSc.z));\n vec2 mUv = uv * sl;\n vRoofUv = vec3(mUv, uv.y);\n vec2 iUv = mUv / ${t.toFixed(3)};\n${te}\n}`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vRoofUv;
float rHash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float rVal(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(rHash(i),rHash(i+vec2(1.,0.)),f.x),mix(rHash(i+vec2(0.,1.)),rHash(i+vec2(1.,1.)),f.x),f.y);}`).replace(`#include <emissivemap_fragment>`,`
{
  float vslope = vRoofUv.z;
  vec2 ruv = vRoofUv.xy;
  float cM = ${n.toFixed(3)};
  float cy = ruv.y / cM;
  float ci = floor(cy);
  float cf = fract(cy);
  // stagger every other course so the butt joints do not line up
  float sx = ruv.x / (cM * 2.6) + 0.5 * mod(ci, 2.0);
  float tab = rHash(vec2(floor(sx), ci));
  float butt = 1.0 - smoothstep(0.0, 0.055, abs(fract(sx) - 0.5) * cM * 2.6);
  float shadowLine = 1.0 - smoothstep(0.0, 0.16, cf);          // shadow under each course butt
  float grain = rVal(ruv * 26.0) * 0.55 + rVal(ruv * 92.0) * 0.45;
  float macro = rVal(ruv * 0.55 + 3.0);
  float eave = 1.0 - smoothstep(0.0, 0.09, vslope);
  float cap = smoothstep(0.945, 0.995, vslope);
  diffuseColor.rgb *= 0.82 + 0.36 * tab;
  diffuseColor.rgb *= 0.82 + 0.36 * grain;
  diffuseColor.rgb *= 0.88 + 0.24 * macro;
  diffuseColor.rgb *= 1.0 - 0.24 * shadowLine;
  diffuseColor.rgb *= 1.0 - 0.28 * butt;
  diffuseColor.rgb *= 1.0 - 0.26 * eave;
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.22 + 0.012, cap);
  roughnessFactor = clamp(roughnessFactor * (0.90 + 0.20 * grain), 0.3, 1.0);
}
#include <emissivemap_fragment>`),e.uniforms.uGndBounce=j.uGndBounce,ae(e)},oe(e,`bld-roof3-`+t.toFixed(2)+`-`+n.toFixed(2)),e}function le(e,t=1){let n=e.onBeforeCompile;return e.onBeforeCompile=function(e,r){n&&n.call(this,e,r),e.uniforms.uSkyUp=j.uSkyUp,e.uniforms.uSkyHz=j.uSkyHz,e.uniforms.uSkyDn=j.uSkyDn,e.uniforms.uGndBounce=j.uGndBounce,e.fragmentShader.includes(`fSkyAt`)||(e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+ne)),e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`
{
  vec3 gUp = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
  vec3 gV = -normalize(vViewPosition);
  vec3 gN = normalize(normal);
  vec3 gSky = fSkyAt(dot(reflect(gV, gN), gUp));
  totalEmissiveRadiance += gSky * fSkyFresnel(clamp(dot(gN, -gV), 0.0, 1.0)) * ${t.toFixed(3)};
}
#include <emissivemap_fragment>`),ae(e)},oe(e,`bld-glasssky-`+t.toFixed(2)),e}function V(e,t=.65){let n=e.onBeforeCompile;return e.onBeforeCompile=function(e,r){n&&n.call(this,e,r),e.uniforms.uSkyUp=j.uSkyUp,e.uniforms.uSkyHz=j.uSkyHz,e.uniforms.uSkyDn=j.uSkyDn,e.uniforms.uGndBounce=j.uGndBounce,e.fragmentShader.includes(`fSkyAt`)||(e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+ne)),e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`
{
  vec3 mUp = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
  vec3 mV = -normalize(vViewPosition);
  vec3 mN = normalize(normal);
  float mNdV = clamp(dot(mN, -mV), 0.0, 1.0);
  vec3 mF0 = mix(vec3(0.04), diffuseColor.rgb, metalnessFactor);
  vec3 mF = mF0 + (1.0 - mF0) * pow(1.0 - mNdV, 5.0);
  totalEmissiveRadiance += fSkyAt(dot(reflect(mV, mN), mUp)) * mF * (1.0 - 0.55 * roughnessFactor) * ${t.toFixed(3)};
}
#include <emissivemap_fragment>`),ae(e)},oe(e,`bld-metalsky-`+t.toFixed(2)),e}function H(e,t=8){let n=e.onBeforeCompile;return e.onBeforeCompile=function(e,r){n&&n.call(this,e,r),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aVariant;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>\n{ vec2 iUv = vec2((uv.x + aVariant) / ${t.toFixed(1)}, uv.y);\n${te}\n}`)},oe(e,`bld-atlas-`+t),e}var U={glass:.05,window:.1,solar:.1,trim:.3,metalPanel:.45,paint:.4,asphalt:.65,foliage:.7,paintedWood:.75,roofTile:.78,concrete:.8,grass:.85,brick:.88,soil:.95},ue=(e,t=1)=>le(e,t),de=(e,t=.65)=>V(e,t),fe=(e,t,n)=>new C({...e,clearcoat:t,clearcoatRoughness:n}),pe=`./assets/shared/`,me={bricks_red:{map:`bricks_red/color.jpg`,normalMap:`bricks_red/normal.jpg`,roughnessMap:`bricks_red/roughness.jpg`,aoMap:`bricks_red/ao.jpg`},bricks_yellow:{map:`bricks_yellow/color.jpg`,normalMap:`bricks_yellow/normal.jpg`,roughnessMap:`bricks_yellow/roughness.jpg`,aoMap:`bricks_yellow/ao.jpg`},bricks_white:{map:`bricks_white/color.jpg`,normalMap:`bricks_white/normal.jpg`,roughnessMap:`bricks_white/roughness.jpg`,aoMap:`bricks_white/ao.jpg`},plaster_modern:{map:`plaster_modern/color.jpg`,normalMap:`plaster_modern/normal.jpg`,roughnessMap:`plaster_modern/roughness.jpg`},plaster_rough:{map:`plaster_rough/color.jpg`,normalMap:`plaster_rough/normal.jpg`,roughnessMap:`plaster_rough/roughness.jpg`},plaster_painted:{map:`plaster_painted/color.jpg`,normalMap:`plaster_painted/normal.jpg`,roughnessMap:`plaster_painted/roughness.jpg`},concrete_wall:{map:`concrete_wall_008/Diffuse.jpg`,normalMap:`concrete_wall_008/nor_gl.jpg`,roughnessMap:`concrete_wall_008/arm.jpg`,aoMap:`concrete_wall_008/arm.jpg`},concrete:{map:`concrete/albedo.jpg`,normalMap:`concrete/normal.jpg`,roughnessMap:`concrete/roughness.jpg`},corrugated:{map:`corrugatedsteel005/color.jpg`,normalMap:`corrugatedsteel005/normalgl.jpg`,roughnessMap:`corrugatedsteel005/roughness.jpg`,metalnessMap:`corrugatedsteel005/metalness.jpg`,aoMap:`corrugatedsteel005/ambientocclusion.jpg`},tiles_a:{map:`roof_tiles_clay/color.jpg`,normalMap:`roof_tiles_clay/normal.jpg`,roughnessMap:`roof_tiles_clay/roughness.jpg`,aoMap:`roof_tiles_clay/ao.jpg`},tiles_b:{map:`roof_tiles_clay_b/color.jpg`,normalMap:`roof_tiles_clay_b/normal.jpg`,roughnessMap:`roof_tiles_clay_b/roughness.jpg`,aoMap:`roof_tiles_clay_b/ao.jpg`},asphalt:{map:`asphalt/albedo.jpg`,normalMap:`asphalt/normal.jpg`,roughnessMap:`asphalt/roughness.jpg`},asphalt_light:{map:`asphalt_light/albedo.jpg`,normalMap:`asphalt_light/normal.jpg`,roughnessMap:`asphalt_light/roughness.jpg`,aoMap:`asphalt_light/ao.jpg`},metalplates:{map:`metalplates006/color.jpg`,normalMap:`metalplates006/normalgl.jpg`,roughnessMap:`metalplates006/roughness.jpg`,metalnessMap:`metalplates006/metalness.jpg`},grass:{map:`grass/albedo.jpg`,normalMap:`grass/normal.jpg`,roughnessMap:`grass/roughness.jpg`,aoMap:`grass/ao.jpg`},paving:{map:`paving_slabs/albedo.jpg`,normalMap:`paving_slabs/normal.jpg`,roughnessMap:`paving_slabs/roughness.jpg`,aoMap:`paving_slabs/ao.jpg`},dirt:{map:`Ground048/color.jpg`,normalMap:`Ground048/normal.jpg`,roughnessMap:`Ground048/roughness.jpg`,aoMap:`Ground048/ao.jpg`},forest_floor:{map:`forest_floor/color.jpg`,normalMap:`forest_floor/normal.jpg`,roughnessMap:`forest_floor/roughness.jpg`,aoMap:`forest_floor/ao.jpg`},wood:{map:`wood_planks/color.jpg`,normalMap:`wood_planks/normal.jpg`,roughnessMap:`wood_planks/roughness.jpg`,aoMap:`wood_planks/ao.jpg`}},he=[`MARKET`,`CAFÉ`,`PIZZA`,`BANK`,`PHARMACY`,`BOOKS`,`BAKERY`,`HOTEL`,`SUSHI`,`DELI`,`CINEMA`,`FLOWERS`,`BURGER`,`OPTIK`,`MODA`,`GYM`,`RAMEN`,`BISTRO`,`SALON`,`TOOLS`,`GROCER`,`VINYL`];function ge(e=8){let t=document.createElement(`canvas`);t.width=512*e,t.height=104;let n=t.getContext(`2d`),r=S(4242),a=[8,32,208,148,22,196,44,0];for(let t=0;t<e;t++){let e=a[t%a.length],i=r.chance(.55),o=t*512;n.fillStyle=i?`hsl(${e} 16% 7%)`:`hsl(${e} 26% ${r.int(14,21)}%)`,n.fillRect(o,0,512,104),n.strokeStyle=`rgba(255,255,255,0.16)`,n.lineWidth=3,n.strokeRect(o+5,4,502,95),n.fillStyle=`rgba(0,0,0,0.45)`,n.fillRect(o,95,512,9),n.fillStyle=`rgba(255,255,255,0.10)`,n.fillRect(o+8,7,496,8);let s=he[(t*5+r.int(0,3))%he.length];n.font=`bold 62px Helvetica, Arial, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`;let c=n.measureText(s).width;n.save(),n.translate(o+256,54),c>442&&n.scale(442/c,1),n.fillStyle=`rgba(0,0,0,0.55)`,n.fillText(s,3,3),n.fillStyle=i?`hsl(${(e+40)%360} 78% 58%)`:`rgba(214,211,205,0.98)`,n.fillText(s,0,0),n.restore()}let o=new i(t);return o.colorSpace=y,o.wrapS=o.wrapT=b,o.anisotropy=8,o}function _e(){let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#000`,t.fillRect(0,0,128,128),t.strokeStyle=`#fff`,t.lineWidth=2.2,t.beginPath();for(let e=-4;e<=8;e++)t.moveTo(e*32,0),t.lineTo(e*32+128,128),t.moveTo(e*32,0),t.lineTo(e*32-128,128);t.stroke();let n=new i(e);return n.wrapS=n.wrapT=x,n.anisotropy=4,n}function ve(){let e=document.createElement(`canvas`);e.width=64,e.height=8;let t=e.getContext(`2d`);t.fillStyle=`#000`,t.fillRect(0,0,64,8);let n=t.createLinearGradient(0,0,64,0);n.addColorStop(0,`#000`),n.addColorStop(.14,`#fff`),n.addColorStop(.62,`#fff`),n.addColorStop(.76,`#000`),t.fillStyle=n,t.fillRect(0,0,64,8);let r=new i(e);return r.wrapS=r.wrapT=x,r.anisotropy=4,r}function ye(){let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=S(9182);t.fillStyle=`#33491f`,t.fillRect(0,0,128,128);for(let e=0;e<2600;e++){let e=n.range(-4,132),r=n.range(-4,132),i=n.range(1,2.6),a=n.range(.72,1.18);t.fillStyle=`rgba(${Math.round(62*a)},${Math.round(92*a)},${Math.round(38*a)},0.7)`,t.beginPath(),t.ellipse(e,r,i,i*.6,n.range(0,3.14),0,6.283),t.fill()}let r=new i(e);r.colorSpace=y,r.wrapS=r.wrapT=x,r.anisotropy=4;let a=document.createElement(`canvas`);a.width=a.height=128;let o=a.getContext(`2d`);o.fillStyle=`#8080ff`,o.fillRect(0,0,128,128);let s=S(9183);for(let e=0;e<1600;e++){let e=s.range(-4,132),t=s.range(-4,132),n=s.range(1.2,3.2),r=o.createRadialGradient(e-n*.35,t-n*.35,0,e,t,n);r.addColorStop(0,`rgba(190,190,255,0.8)`),r.addColorStop(1,`rgba(128,128,255,0)`),o.fillStyle=r,o.beginPath(),o.arc(e,t,n,0,6.283),o.fill()}let c=new i(a);return c.wrapS=c.wrapT=x,c.anisotropy=4,{map:r,normalMap:c}}async function be(e){let{engine:n,assets:r}=e,i={};await Promise.all(Object.entries(me).map(async([e,t])=>{let a={};for(let[e,n]of Object.entries(t))a[e]=pe+n;i[e]=await r.loadPBR(a,{anisotropy:n.maxAnisotropy})})),j.uRoofMap.value=i.asphalt_light.map||null;let a={},o=(e,t)=>(n.registerMaterial(t),t.name=`buildings/`+e,a[e]=t,t),s=(e,t={})=>new _({...e?i[e]:{},roughness:1,metalness:0,...t}),c=(e,t,n,r)=>fe({...e?i[e]:{},roughness:1,metalness:0,...t},n,r),l=(e,t,n)=>o(e,se(s(t,{normalScale:new f(1.9,1.9),...n})));l(`brick_red`,`bricks_red`,{roughness:U.brick}),l(`brick_yellow`,`bricks_yellow`,{roughness:U.brick}),l(`brick_white`,`bricks_white`,{roughness:U.brick}),l(`plaster`,`plaster_modern`,{roughness:U.brick}),l(`plaster_rough`,`plaster_rough`,{roughness:U.brick}),l(`plaster_painted`,`plaster_painted`,{roughness:U.brick}),l(`concrete_wall`,`concrete_wall`,{roughness:U.concrete}),l(`concrete`,`concrete`,{roughness:U.concrete}),l(`siding`,`wood`,{roughness:U.paintedWood}),o(`corrugated`,de(se(s(`corrugated`,{normalScale:new f(1.9,1.9),roughness:U.metalPanel,metalness:.95})),.55)),l(`glass`,null,{color:new t(.4,.42,.45),roughness:U.glass,metalness:0});let u=(e,t,n,r)=>o(e,ce(s(t,r),n));u(`tiles_a`,`tiles_a`,1.6,{roughness:U.roofTile,normalScale:new f(1.8,1.8)}),u(`tiles_b`,`tiles_b`,1.6,{roughness:U.roofTile,normalScale:new f(1.8,1.8)}),u(`shingle`,`asphalt`,1.15,{roughness:U.roofTile,normalScale:new f(2,2)}),o(`corrugated_roof`,de(ce(s(`corrugated`,{roughness:U.metalPanel,metalness:.95}),2),.55)),o(`tiles_ridge`,B(s(`tiles_a`,{roughness:U.roofTile}),`xy`,.9)),o(`tiles_ridge_b`,B(s(`tiles_b`,{roughness:U.roofTile}),`xy`,.9)),o(`shingle_ridge`,B(s(`asphalt`,{roughness:U.roofTile}),`xy`,.7)),o(`metal_ridge`,de(B(c(`corrugated`,{roughness:U.metalPanel,metalness:.95},.3,.14),`xy`,.6))),o(`metal_tank`,de(B(c(`corrugated`,{roughness:U.metalPanel,metalness:.95},.28,.14),`cyl`,3))),o(`concrete_cyl`,B(s(`concrete`,{roughness:U.concrete}),`cyl`,4)),o(`brick_cyl`,B(s(`bricks_red`,{roughness:U.brick}),`cyl`,2.6)),o(`lawn`,B(s(`grass`,{roughness:U.grass}),`xz`,3)),o(`pave_concrete`,B(s(`concrete`,{roughness:U.concrete}),`xz`,4)),o(`pave_slabs`,B(s(`paving`,{roughness:U.concrete}),`xz`,2.5)),o(`yard_asphalt`,B(s(`asphalt_light`,{roughness:U.asphalt}),`xz`,5)),o(`dirt`,B(s(`dirt`,{roughness:U.soil}),`xz`,4)),o(`garden`,B(s(`forest_floor`,{roughness:U.grass}),`xz`,1.6)),o(`wood`,B(s(`wood`,{roughness:U.paintedWood}),`xy`,1.1)),o(`wall_stone`,B(s(`bricks_white`,{roughness:U.brick}),`xy`,1)),o(`paint`,fe({color:16777215,roughness:U.paint,metalness:.08},.45,.1)),o(`metal_dark`,de(fe({color:5330268,roughness:U.metalPanel,metalness:.95},.35,.12))),o(`steel`,de(new _({color:10132896,roughness:U.trim,metalness:.95}),.75)),o(`fabric`,new _({color:16777215,roughness:.92,metalness:0})),o(`glass_dark`,ue(fe({color:1448994,roughness:U.glass,metalness:0},.55,.04))),o(`solar`,ue(fe({color:725280,roughness:U.solar,metalness:0},1,.05),.7)),o(`lamp`,fe({color:16773328,emissive:16763274,emissiveIntensity:0,roughness:.35,metalness:0},.8,.06)),o(`beacon`,fe({color:3149838,emissive:16724768,emissiveIntensity:1.4,roughness:.28,metalness:0},.9,.05));let d=ye();o(`hedge`,B(new _({...d,roughness:U.foliage,metalness:0,normalScale:new f(1.7,1.7)}),`xy`,.3)),o(`chain`,B(de(new _({color:10132896,roughness:U.trim,metalness:.95,alphaMap:_e(),alphaTest:.5,side:2}),.7),`xy`,1)),o(`picket`,B(fe({color:16777215,roughness:U.paintedWood,metalness:.02,alphaMap:ve(),alphaTest:.5,side:2},.3,.14),`xy`,.15));let p=ge(8);return o(`sign`,H(fe({map:p,emissive:16777215,emissiveMap:p,emissiveIntensity:0,roughness:U.paint,metalness:.1},.7,.08),8)),{mats:a,uniforms:j}}function W(e,t,n,r,i,a,o,s,c,l){e.push(...r,...i,...a),t.push(...o,...o,...o),n.push(...s,...c,...l)}function xe(e,t,n,r,i,a,o,s,c,l,u,d){W(e,t,n,r,i,a,s,c,l,u),W(e,t,n,r,a,o,s,c,u,d)}function G(e,t,n){let r=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],i=[n[0]-e[0],n[1]-e[1],n[2]-e[2]],a=[r[1]*i[2]-r[2]*i[1],r[2]*i[0]-r[0]*i[2],r[0]*i[1]-r[1]*i[0]],o=Math.hypot(a[0],a[1],a[2])||1;return[a[0]/o,a[1]/o,a[2]/o]}function Se(e,t,n){let r=new l;return r.setAttribute(`position`,new d(e,3)),r.setAttribute(`normal`,new d(t,3)),r.setAttribute(`uv`,new d(n,2)),r}function Ce(){let e=[],t=[],n=[],r=[-.5,0,.5],i=[.5,0,.5],a=[.5,1,0],o=[-.5,1,0],s=[.5,0,-.5],c=[-.5,0,-.5];return xe(e,t,n,r,i,a,o,G(r,i,a),[0,0],[1,0],[1,1],[0,1]),xe(e,t,n,s,c,o,a,G(s,c,o),[0,0],[1,0],[1,1],[0,1]),W(e,t,n,i,s,a,[1,0,0],[0,0],[1,0],[.5,1]),W(e,t,n,c,r,o,[-1,0,0],[0,0],[1,0],[.5,1]),xe(e,t,n,c,s,i,r,[0,-1,0],[0,0],[1,0],[1,1],[0,1]),Se(e,t,n)}function we(e=.25){let t=[],n=[],r=[],i=[-.5,0,.5],a=[.5,0,.5],o=[.5,0,-.5],s=[-.5,0,-.5],c=[-.5+e,1,0],l=[.5-e,1,0];if(e>=.499){let e=[0,1,0];W(t,n,r,i,a,e,G(i,a,e),[0,0],[1,0],[.5,1]),W(t,n,r,o,s,e,G(o,s,e),[0,0],[1,0],[.5,1]),W(t,n,r,a,o,e,G(a,o,e),[0,0],[1,0],[.5,1]),W(t,n,r,s,i,e,G(s,i,e),[0,0],[1,0],[.5,1])}else xe(t,n,r,i,a,l,c,G(i,a,l),[0,0],[1,0],[1-e,1],[e,1]),xe(t,n,r,o,s,c,l,G(o,s,c),[0,0],[1,0],[1-e,1],[e,1]),W(t,n,r,a,o,l,G(a,o,l),[0,0],[1,0],[.5,1]),W(t,n,r,s,i,c,G(s,i,c),[0,0],[1,0],[.5,1]);return xe(t,n,r,s,o,a,i,[0,-1,0],[0,0],[1,0],[1,1],[0,1]),Se(t,n,r)}function Te(){let e=[],t=[],n=[],r=[-.5,0,.5],i=[.5,0,.5],a=[.5,0,-.5],o=[-.5,0,-.5],s=[.5,1,-.5],c=[-.5,1,-.5];return xe(e,t,n,r,i,s,c,G(r,i,s),[0,0],[1,0],[1,1],[0,1]),xe(e,t,n,a,o,c,s,[0,0,-1],[0,0],[1,0],[1,1],[0,1]),W(e,t,n,i,a,s,[1,0,0],[0,0],[1,0],[1,1]),W(e,t,n,o,r,c,[-1,0,0],[0,0],[1,0],[0,1]),xe(e,t,n,o,a,i,r,[0,-1,0],[0,0],[1,0],[1,1],[0,1]),Se(e,t,n)}function Ee(){let e=new r(1,1,1);e.translate(0,.5,0);let t=new a(.5,.5,1,10,1);t.translate(0,.5,0);let n=new a(.5,.5,1,6,1);n.translate(0,.5,0);let i=new v(.5,1,10,1);i.translate(0,.5,0);let o=new c(.5,10,4,0,Math.PI*2,0,Math.PI/2);o.scale(1,2,1);let s=new c(.5,7,3,0,Math.PI*2,0,Math.PI*.62);s.scale(1,1/.6,1);let l=new k(1,1);l.rotateX(-Math.PI/2);let u=new k(1,1);return u.translate(0,.5,0),{box:e,cyl:t,cylLow:n,cone:i,dome:o,blob:s,plane:l,panel:u,gable:Ce(),hip50:we(.5),hip35:we(.35),hip25:we(.25),wedge:Te()}}var De=new D,Oe=new D,ke=new O,Ae=new s,je=new o,Me=new o,Ne=new Set([`chain`,`sign`,`picket`,`lamp`,`beacon`]),Pe=class{constructor(e,t,n,r){this.r=e,this.geoKey=t,this.matKey=n,this.dynamic=r,this.count=0,this.capacity=0,this.mesh=null,this.owners=[],this.ground=t===`plane`,this._alloc(r?256:128)}_alloc(t){let r=this.r.geometries[this.geoKey].clone(),i=this.r.mats[this.matKey],a=new e(r,i,t);a.count=this.count,a.frustumCulled=!1,a.castShadow=!this.ground&&!Ne.has(this.matKey),a.receiveShadow=!0,a.layers.enable(this.r.layerReflected),a.name=`buildings/${this.dynamic?`detail`:`mass`}/${this.geoKey}/${this.matKey}`,a.userData.entity=`building`,a.userData.buildingAt=e=>this.owners[e]?this.owners[e].owner:null,a.instanceMatrix.setUsage(n);let o=new p(new Float32Array(t*3).fill(1),3),s=new p(new Float32Array(t*4),4),c=new p(new Float32Array(t*4),4),l=new p(new Float32Array(t*3).fill(1),3),u=new p(new Float32Array(t),1);for(let e of[o,s,c,l,u])e.setUsage(n);if(a.instanceColor=o,r.setAttribute(`aParams`,s),r.setAttribute(`aParams2`,c),r.setAttribute(`aTint`,l),r.setAttribute(`aVariant`,u),this.mesh){let e=this.mesh;a.instanceMatrix.array.set(e.instanceMatrix.array.subarray(0,this.count*16)),o.array.set(e.instanceColor.array.subarray(0,this.count*3)),s.array.set(e.geometry.getAttribute(`aParams`).array.subarray(0,this.count*4)),c.array.set(e.geometry.getAttribute(`aParams2`).array.subarray(0,this.count*4)),l.array.set(e.geometry.getAttribute(`aTint`).array.subarray(0,this.count*3)),u.array.set(e.geometry.getAttribute(`aVariant`).array.subarray(0,this.count)),this.r.scene.remove(e),e.geometry.dispose(),e.dispose()}this.mesh=a,this.capacity=t,this.r.scene.add(a),this._dirty()}_dirty(){let e=this.mesh.geometry;this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor.needsUpdate=!0,e.getAttribute(`aParams`).needsUpdate=!0,e.getAttribute(`aParams2`).needsUpdate=!0,e.getAttribute(`aTint`).needsUpdate=!0,e.getAttribute(`aVariant`).needsUpdate=!0}_write(e,t,n){let r=this.mesh.geometry;t.toArray(this.mesh.instanceMatrix.array,e*16);let i=n.color,a=this.mesh.instanceColor.array;i?(a[e*3]=i[0],a[e*3+1]=i[1],a[e*3+2]=i[2]):a[e*3]=a[e*3+1]=a[e*3+2]=1;let o=r.getAttribute(`aParams`).array,s=r.getAttribute(`aParams2`).array,c=n.p1,l=n.p2;c?(o[e*4]=c[0],o[e*4+1]=c[1],o[e*4+2]=c[2],o[e*4+3]=c[3]):(o[e*4]=3,o[e*4+1]=0,o[e*4+2]=0,o[e*4+3]=3),l?(s[e*4]=l[0],s[e*4+1]=l[1],s[e*4+2]=l[2],s[e*4+3]=l[3]):(s[e*4]=3,s[e*4+1]=.5,s[e*4+2]=.5,s[e*4+3]=3),r.getAttribute(`aVariant`).array[e]=n.variant||0}add(e,t,n){this.count>=this.capacity&&this._alloc(this.capacity*2);let r=this.count++;this._write(r,e,t);let i={pool:this,i:r,owner:n};return this.owners[r]=i,this.mesh.count=this.count,this._dirty(),i}setMatrix(e,t){t.toArray(this.mesh.instanceMatrix.array,e.i*16),this.mesh.instanceMatrix.needsUpdate=!0}setTint(e,t,n,r){let i=this.mesh.geometry.getAttribute(`aTint`);i.array[e.i*3]=t,i.array[e.i*3+1]=n,i.array[e.i*3+2]=r,i.needsUpdate=!0}remove(e){if(e.i<0||e.pool!==this)return;let t=this.count-1,n=e.i;if(n!==t){let e=this.mesh.geometry,r=(e,r)=>{for(let i=0;i<r;i++)e[n*r+i]=e[t*r+i]};r(this.mesh.instanceMatrix.array,16),r(this.mesh.instanceColor.array,3),r(e.getAttribute(`aParams`).array,4),r(e.getAttribute(`aParams2`).array,4),r(e.getAttribute(`aTint`).array,3),r(e.getAttribute(`aVariant`).array,1);let i=this.owners[t];i.i=n,this.owners[n]=i}this.owners.length=t,this.count=t,this.mesh.count=t,e.i=-1,this._dirty()}begin(){this.count=0}push(e,t){this.count>=this.capacity&&this._alloc(this.capacity*2),this._write(this.count++,e,t)}end(){this.mesh.count=this.count,this.mesh.visible=this.count>0,this._dirty()}dispose(){this.mesh&&=(this.r.scene.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.dispose(),null)}},Fe=class{constructor({scene:e,geometries:t,mats:n,layerReflected:i,layerNoAo:a}){this.scene=e,this.geometries=t,this.mats=n,this.layerReflected=Number.isInteger(i)?i:3,this.pools=new Map,this.dynamicPools=[],this._buildingMatrix=new D;let o=new r(1,1,1);o.translate(0,.5,0),this.selBox=new m(o,new g({color:6281215,transparent:!0,opacity:.16,depthWrite:!1})),this.selEdges=new T(new u(o),new E({color:10479871,transparent:!0,opacity:.9}));for(let t of[this.selBox,this.selEdges])t.visible=!1,t.frustumCulled=!1,t.renderOrder=50,t.layers.set(a),t.name=`buildings/selection`,e.add(t)}pool(e,t,n=!1){let r=(n?`D:`:`S:`)+e+`|`+t,i=this.pools.get(r);if(!i){if(!this.geometries[e])throw Error(`[buildings] unknown geometry "${e}"`);if(!this.mats[t])throw Error(`[buildings] unknown material "${t}"`);i=new Pe(this,e,t,n),this.pools.set(r,i),n&&this.dynamicPools.push(i)}return i}worldMatrix(e,t,n=De){return this._buildingMatrix.makeRotationY(e.yaw).setPosition(e.x,e.y,e.z),ke.setFromEuler(Ae.set(t.rx||0,t.ry||0,t.rz||0)),Oe.compose(je.set(t.x,t.y,t.z),ke,Me.set(t.w,t.h,t.d)),n.multiplyMatrices(this._buildingMatrix,Oe)}addStatic(e,t){let n=this.worldMatrix(e,t);return this.pool(t.geo,t.mat,!1).add(n,t,e)}updateStatic(e,t,n){e.i<0||e.pool.setMatrix(e,this.worldMatrix(t,n))}removeStatic(e){e.pool.remove(e)}beginDynamic(){for(let e of this.dynamicPools)e.begin()}pushDynamic(e,t){let n=this.worldMatrix(e,t);this.pool(t.geo,t.mat,!0).push(n,t)}endDynamic(){for(let e of this.dynamicPools)e.end()}setSelection(e){let t=!!e;if(this.selBox.visible=this.selEdges.visible=t,!t)return;let n=(e.w||8)+1,r=(e.d||8)+1,i=(e.height||6)+.8;for(let t of[this.selBox,this.selEdges])t.position.set(e.x,e.y-.1,e.z),t.rotation.set(0,e.yaw||0,0),t.scale.set(n,i,r)}dispose(){for(let e of this.pools.values())e.dispose();this.pools.clear(),this.dynamicPools.length=0;for(let e of[this.selBox,this.selEdges])this.scene.remove(e),e.geometry.dispose(),e.material.dispose()}},Ie={brick_red:1.5,brick_yellow:1.5,brick_white:1.7,plaster:3.2,plaster_rough:3,plaster_painted:3,concrete_wall:3.6,concrete:4,corrugated:2,siding:1.5,glass:1},Le=[[.6,.52,.42],[.62,.58,.52],[.52,.44,.36],[.66,.54,.34],[.58,.36,.26],[.46,.48,.4],[.44,.48,.52],[.6,.48,.42],[.4,.42,.44],[.42,.44,.36],[.54,.36,.28],[.36,.4,.43],[.64,.5,.32],[.44,.5,.48],[.68,.46,.34]],Re=[[.62,.6,.55],[.54,.55,.52],[.42,.48,.5],[.34,.4,.38],[.28,.33,.36],[.5,.32,.26],[.34,.25,.21],[.6,.54,.42],[.4,.44,.36],[.24,.29,.32]],K=[[.62,.6,.56],[.54,.55,.56],[.52,.46,.38],[.36,.38,.4],[.6,.55,.48],[.44,.45,.46],[.5,.4,.31],[.4,.43,.38],[.56,.49,.37],[.31,.34,.37]],ze=[[.3,.34,.4],[.32,.39,.35],[.25,.27,.31],[.42,.4,.34],[.28,.31,.42],[.4,.42,.44],[.44,.38,.29],[.31,.36,.33]],Be=[[.74,.76,.78],[.56,.6,.64],[.66,.58,.44],[.44,.5,.52],[.52,.42,.34],[.66,.67,.67]],Ve=[[.3,.09,.08],[.08,.17,.12],[.09,.14,.24],[.36,.28,.1],[.46,.45,.42],[.2,.11,.1],[.1,.1,.11],[.28,.21,.14]],He=[[2.35,2.26,2.15],[2.18,1.81,1.49],[2.84,2.18,1.65],[1.62,1.68,1.81],[1.9,1.78,1.61],[2.57,1.91,1.45],[1.45,1.48,1.49],[2.23,1.99,1.7]],Ue=[[.86,.84,.81],[.79,.74,.71],[.67,.7,.73],[.96,.82,.68],[.6,.6,.62],[.91,.73,.62]],We=[[.6,.2,.15],[.15,.3,.55],[.2,.45,.3],[.7,.55,.15],[.55,.55,.58]],Ge=[[.17,.3,.13],[.22,.36,.16],[.13,.25,.12],[.26,.34,.18]],Ke=[[.68,.66,.62],[.6,.58,.53],[.5,.51,.49],[.64,.61,.55]],qe=[[.34,.3,.26],[.3,.29,.27],[.4,.35,.29],[.25,.25,.24],[.36,.32,.29]],Je=[[.2,.11,.07],[.14,.18,.22],[.1,.22,.18],[.42,.14,.12],[.3,.3,.32],[.55,.5,.42]],Ye=[[.62,.6,.55],[.55,.53,.49],[.47,.46,.43],[.58,.52,.44],[.38,.4,.4],[.5,.44,.37],[.42,.44,.42],[.6,.56,.47]],Xe={tiles_a:`tiles_ridge`,tiles_b:`tiles_ridge_b`,shingle:`shingle_ridge`,corrugated_roof:`metal_ridge`},Ze=[.84,.8,.75],Qe=[.48,.49,.5],$e=[.54,.53,.51],et={stacks:[],vents:[]},tt=()=>0;function q(e,t,n,r,i,a,o,s,c,l){let u={geo:t,mat:n,x:r,y:i,z:a,w:o,h:s,d:c};return l&&(l.ry&&(u.ry=l.ry),l.rx&&(u.rx=l.rx),l.rz&&(u.rz=l.rz),l.color&&(u.color=l.color),l.p1&&(u.p1=l.p1),l.p2&&(u.p2=l.p2),l.variant&&(u.variant=l.variant),l.t!=null&&(u.t=l.t)),e.push(u),u}function J(e,t,n,r,i,a,o,s){return{p1:[n,t,s,r],p2:[i,a,o,Ie[e]||3]}}var nt=e=>J(e,M.PLAIN,3,3,3,.5,.5,0);function Y(e,t,n,r,i,a,o,s,c,l=0){return q(e,`box`,t,n,0,r,i,a,o,{...s,color:c,ry:l})}var rt=[[.31,.32,.33],[.26,.27,.28],[.36,.36,.35],[.23,.24,.26]];function it(e,t,n,r,i,a,o,s,c,l={}){let u=Math.max(1,a*o),d=Math.max(c,Math.min(7,Math.round(u/110)));for(let c=0;c<d;c++){let c=r+n.range(-a/2+1.4,a/2-1.4),u=i+n.range(-o/2+1.4,o/2-1.4),d=n.range(1.1,2.1),f=n.range(-.25,.25),p=n.pick(rt);if(q(e,`box`,`paint`,c,s,u,d*1.05,.16,d*.95,{ry:f,color:[.22,.22,.23]}),q(e,`box`,`paint`,c,s+.16,u,d,d*.66,d*.9,{color:p,ry:f}),q(t,`box`,`paint`,c,s+.16+d*.66,u,d*.94,.06,d*.84,{ry:f,color:[.3,.3,.29],t:1}),q(t,`cylLow`,`paint`,c,s+.12+d*.66,u,d*.62,.18,d*.62,{color:[.21,.22,.23]}),q(t,`cylLow`,`paint`,c,s+.24+d*.66,u,d*.48,.05,d*.48,{color:[.16,.17,.18]}),q(t,`cylLow`,`paint`,c,s+.3+d*.66,u,d*.54,.04,d*.54,{color:[.4,.4,.39]}),q(t,`box`,`paint`,c,s+.32,u+d*.46,d*.72,d*.34,.05,{ry:f,color:[.18,.19,.2]}),q(t,`box`,`paint`,c,s+.34,u-d*.46,d*.72,d*.3,.05,{ry:f,color:[.18,.19,.2]}),l.vents!==!1&&et.vents.push({x:c,y:s+d*.66+.3,z:u}),n.chance(.5)){let e=n.range(1.8,4.2);q(t,`box`,`paint`,c+n.range(-.4,.4),s+.38,u-d*.8-e/2,.55,.5,e,{color:[.44,.44,.42],ry:f,t:1})}}if(l.parapetVent&&a>6)for(let e=0;e<2;e++)q(t,`cylLow`,`steel`,r+(e?1:-1)*a*.3,s,i-o*.35,.34,n.range(.7,1.3),.34,{color:[.46,.47,.48]});if(l.antennas)for(let e=0;e<l.antennas;e++){let e=r+n.range(-a/2+.8,a/2-.8),c=i+n.range(-o/2+.8,o/2-.8),l=n.range(2.5,6);q(t,`cylLow`,`metal_dark`,e,s,c,.1,l,.1,{t:1}),n.chance(.5)?q(t,`box`,`metal_dark`,e,s+l*.7,c,.9,.06,.06,{ry:n.range(0,3)}):q(t,`cylLow`,`steel`,e,s+l*.72,c,1.1,.08,1.1,{rx:n.range(.5,.9),color:[.78,.78,.76]})}if(l.tank){let c=r+n.range(-a/2+2,a/2-2),l=i+n.range(-o/2+2,o/2-2);for(let t=0;t<4;t++){let n=(t+.5)*Math.PI/2;q(e,`box`,`paint`,c+Math.cos(n)*.95,s,l+Math.sin(n)*.95,.16,.9,.16,{color:[.38,.39,.4]})}q(e,`cylLow`,`paint`,c,s+.82,l,2.5,.14,2.5,{color:[.3,.3,.31]}),q(e,`cyl`,`metal_tank`,c,s+.9,l,2.4,2,2.4,{color:[1.1,1.11,1.1]});for(let e=0;e<2;e++)q(t,`cylLow`,`steel`,c,s+1.35+e*.72,l,2.52,.09,2.52,{color:[.52,.53,.54],t:1});q(e,`dome`,`metal_tank`,c,s+2.9,l,2.4,.55,2.4,{color:[1.2,1.2,1.18]}),q(t,`box`,`steel`,c+1.28,s+.9,l,.06,2.2,.42,{color:[.55,.56,.56],t:1})}if(l.solar){let t=Math.max(1,Math.floor((o-3)/2.2)),n=Math.max(1,Math.floor((a-3)/1.8)),c=Math.min(t*n,l.solar),u=0;for(let l=0;l<t&&u<c;l++)for(let t=0;t<n&&u<c;t++,u++)q(e,`box`,`solar`,r-a/2+1.5+t*1.8+.8,s+.35,i-o/2+1.5+l*2.2+.6,1.6,.06,1,{rx:-.42})}}function at(e,t,n,r,i){q(t,`cylLow`,`metal_dark`,n,r,i,.3,.22,.3,{color:[.16,.17,.18],t:1}),q(e,`dome`,`beacon`,n,r+.2,i,.3,.26,.3)}function ot(e,t,n,r,i,a,o,s,c,l,u,d){let f=[.44,.45,.46],p=[.5,.5,.49];if(r===0)return q(e,`box`,`pave_concrete`,i,c-.9,a,o+.5,1.05,s+.5,{color:f}),q(e,`box`,`pave_concrete`,i,c+.15,a,o+.9,.16,s+.9,{color:p}),c+.31;if(r===1){let t=c,r=o,f=s;for(let c=0;c<2;c++){let m=n.range(2.8,4.6),h=c===0?.74:.5;r=o*h,f=s*h,q(e,`box`,l,i,t-.05,a,r,m,f,{...d(.6+c*.31),color:u}),q(e,`box`,`pave_concrete`,i,t+m-.18,a,r+.6,.2,f+.6,{color:p}),t+=m}return t+.2}if(r===2){let t=Math.min(o,s)*n.range(.22,.34);return q(e,`box`,`pave_concrete`,i,c-.7,a,o+.4,.85,s+.4,{color:f}),q(e,o>s*1.25?`hip25`:`hip50`,`corrugated_roof`,i,c+.15,a,o+.5,t,s+.5,{color:n.pick([[.34,.36,.38],[.44,.44,.43],[.3,.33,.36]])}),c+.15+t}if(r===3){q(e,`box`,`pave_concrete`,i,c-.55,a,o+1.5,.75,s+1.5,{color:p}),q(e,`box`,`pave_concrete`,i,c+.2,a,o+.6,.9,s+.6,{color:f});let t=o*.42,r=s*.42,l=n.range(3.2,5.4);return q(e,`box`,`glass`,i,c+1.1,a,t,l,r,{...d(1.9),color:[.13,.16,.19]}),q(e,`box`,`pave_concrete`,i,c+1.1+l,a,t+.7,.22,r+.7,{color:p}),c+1.32+l}if(r===4){q(e,`box`,`pave_concrete`,i,c-.9,a,o+.5,1.05,s+.5,{color:f});let r=n.range(9,20);q(e,`cyl`,`metal_dark`,i,c+.2,a,.44,r,.44,{color:[.52,.53,.55]});let l=Math.max(3,Math.round(r/3.2));for(let e=0;e<l;e+=2)q(t,`cyl`,`paint`,i,c+.24+e/l*r,a,.47,r/l*.94,.47,{color:[.44,.13,.1],t:1});for(let e=1;e<=2;e++)q(t,`cylLow`,`steel`,i,c+.2+e/3*r,a,1.5,.08,1.5,{color:[.62,.63,.64],t:1});return at(e,t,i,c+.2+r*.62,a),at(e,t,i,c+.2+r+2.2,a),q(t,`cone`,`metal_dark`,i,c+.2+r,a,.44,2.2,.44,{color:[.5,.51,.53],t:1}),c+.2+r}let m=n.range(3.4,5.8);return q(e,`box`,`glass`,i,c-.05,a,o*.9,m,s*.9,{...d(2.6),color:[.12,.15,.18]}),q(e,`box`,`pave_concrete`,i,c+m-.2,a,o*.9+.9,.24,s*.9+.9,{color:p}),c+m+.24}function st(e,t,n,r,i,a,o,s,c,l){q(e,`box`,`plaster`,r,a-.08,i,o,c,s,{...nt(`plaster`),color:l||[.66,.66,.65]}),q(e,`box`,`metal_dark`,r,a-.08+c,i,o+.3,.16,s+.3,{color:[.3,.31,.33]}),q(t,`box`,`metal_dark`,r,a+c*.35,i+s/2+.02,o*.35,c*.5,.06,{color:[.22,.23,.25]})}function ct(e,t,n,r,i,a,o,s,c={}){let l=i-n,u=a-r,d=Math.hypot(l,u);if(d<.6)return;let f=Math.atan2(l,u)+Math.PI/2,p=Math.max(1,Math.round(d/(t===`hedge`?2.6:t===`chain`?4:2.4))),m=d/p;for(let i=0;i<p;i++){let a=(i+.5)/p,d=n+l*a,h=r+u*a,g=tt(d,h);if(t===`hedge`){let t=c.thick||.78,n=o*(.88+.24*((i*7+3)%5)/5);q(e,`box`,`hedge`,d,g-.12,h,m+.18,n-.06,t,{ry:f,color:s}),q(e,`blob`,`hedge`,d,g+n-.24,h,m+.2,.34,t+.06,{ry:f,color:s})}else t===`chain`?(q(e,`panel`,`chain`,d,g,h,m,o,1,{ry:f,color:s}),q(e,`cylLow`,`steel`,n+i/p*l,tt(n+i/p*l,r+i/p*u),r+i/p*u,.1,o+.1,.1)):t===`wall`?(q(e,`box`,`wall_stone`,d,g-.15,h,m+.06,o+.15,.3,{ry:f,color:s,t:1}),q(e,`box`,`paint`,d,g+o,h,m+.06,.09,.4,{ry:f,color:[.8,.79,.76]})):t===`picket`?(q(e,`panel`,`picket`,d,g,h,m,o,1,{ry:f,color:s}),q(e,`box`,`paint`,d,g+o-.13,h,m,.07,.05,{ry:f,color:s}),q(e,`box`,`paint`,d,g+o*.34,h,m,.06,.045,{ry:f,color:s})):(q(e,`box`,`wood`,d,g,h,m,o,.045,{ry:f,color:s}),q(e,`box`,`wood`,d,g+o*.62,h,m,.07,.075,{ry:f,color:s}))}if(t!==`hedge`){let i=Math.max(1,Math.round(d/(t===`chain`?4:2.4)));for(let a=0;a<=i;a++){let c=a/i,d=n+l*c,f=r+u*c;t!==`chain`&&q(e,`box`,t===`wall`?`wall_stone`:t===`picket`?`paint`:`wood`,d,tt(d,f)-.15,f,t===`wall`?.42:.1,o+(t===`wall`?.32:.2),t===`wall`?.42:.1,{color:s})}}}function lt(e,t,n,r,i,a,o){let s=t/2-.3,c=n/2-.3;ct(e,i,-s,-c,s,-c,r,a),ct(e,i,-s,-c,-s,c,r,a),ct(e,i,s,-c,s,c,r,a),o&&(ct(e,i,-s,c,-s+Math.max(1,s-o/2),c,r,a),ct(e,i,s-Math.max(1,s-o/2),c,s,c,r,a))}function ut(e,t,n,r,i,a){for(let o=0;o<i;o++){let i=n+t.range(-a,a),o=r+t.range(-a*.5,a*.5),s=t.range(.5,1.05);q(e,`blob`,`hedge`,i,tt(i,o)-.1,o,s*2,s*1.6,s*2,{color:t.pick(Ge)})}}function dt(e,t,n,r,i){let a=e.level,o=t.w,s=t.d,c=n(),l=a<=1?1:a===2?n.int(1,2):a>=5?n.int(2,3):2,u=2.9,d=l*u+.3,f=o>=12.5&&n.chance(a>=2?.93:.62),p=f?a>=4&&o>=23?6:o>=17?3.5:3.05:0,m=o-3,h=Math.min(Math.max(6.6,o*n.range(.42,.58)),15,m-p);a<=1&&(h=Math.min(h,9.5));let g=Math.min(Math.max(3.5,s*n.range(.2,.3)),7),_=Math.min(Math.max(7,s-g-Math.max(4,s*.3)),13),v=h+p,y=-(v/2)+h/2+(f?0:n.range(-1,1)*Math.max(0,(m-v)/4)),b=s/2-g-_/2,x=n(),S,C;x<.3?(S=`siding`,C=n.pick(Re)):x<.55?(S=n.pick([`brick_red`,`brick_yellow`,`brick_white`]),C=n.chance(.35)?[.66,.63,.6]:Ze):x<.8?(S=n.pick([`plaster_painted`,`plaster_rough`]),C=n.pick(Le)):(S=`plaster`,C=n.pick(Le));let w=n.range(2.15,2.75),T=J(S,M.HOUSE,u,u,w,.42,.7,c);Y(r,S,y,b,h,d,_,T,C);let E=h>=_,D=n.range(.42,.62),O=(E?_:h)+2*D,k=n.range(.5,.68),A=O/2*Math.tan(k),j=a>=3&&n.chance(.45)?`shingle`:n.pick([`tiles_a`,`tiles_b`,`shingle`]),N=n.pick(Ye),P=N.map(e=>e*.8),F=j===`shingle`?n.pick(He):n.pick(Ue),te=a>=3&&n.chance(.45),I=h+2*D,L=_+2*D,ne=Math.min(I,L)/Math.max(I,L),re=te?ne>.85?`hip50`:ne>.62?`hip35`:`hip25`:`gable`;E?q(r,re,j,y,d,b,I,A,L,{color:F}):q(r,re,j,y,d,b,L,A,I,{color:F,ry:Math.PI/2}),q(r,`box`,`paint`,y,d-.23,b,I,.22,L,{color:N}),E?(q(r,`box`,`paint`,y,d-.36,b+L/2-.06,I+.06,.13,.14,{color:P}),q(i,`box`,`paint`,y,d-.36,b-L/2+.06,I+.06,.13,.14,{color:P,t:1}),q(r,`box`,`paint`,y+h/2-.2,0,b+_/2+.07,.1,d-.34,.1,{color:P})):(q(r,`box`,`paint`,y+I/2-.06,d-.36,b,.14,.13,L+.06,{color:P}),q(i,`box`,`paint`,y-I/2+.06,d-.36,b,.14,.13,L+.06,{color:P,t:1}),q(r,`box`,`paint`,y+h/2+.07,0,b+_/2-.2,.1,d-.34,.1,{color:P}));let ie=Xe[j]||`tiles_ridge`;{let e=te?re===`hip50`?.34:re===`hip35`?.52:.68:1;E?q(r,`box`,ie,y,d+A-.06,b,I*e,.17,.36,{color:F}):q(r,`box`,ie,y,d+A-.06,b,.36,.17,L*e,{color:F})}let R=y+ee(h,w),z=b+_/2;if(h>9&&n.chance(.45)){let e=Math.min(n.range(.3,.42)*h,5.2),t=n.range(1.7,2.8),i=y+(R>=y?-1:1)*(h/2-e/2-.25),a=b+_/2+t/2-.25,o=l>1&&n.chance(.55)?d:Math.min(d,3.1999999999999997);Y(r,S,i,a,e,o,t+.5,J(S,M.HOUSE,u,u,w,.42,.7,c*1.7),C);let s=.4,f=(e+2*s)/2*Math.tan(k);q(r,`box`,`paint`,i,o-.23,a,t+.5+2*s,.22,e+2*s,{color:N,ry:Math.PI/2}),q(r,`gable`,j,i,o,a,t+.5+2*s,f,e+2*s,{color:F,ry:Math.PI/2})}if(l>=2&&!te&&E&&n.chance(.34)){let e=n.int(1,2);for(let t=0;t<e;t++){let i=y+(e===1?0:(t-.5)*2)*h*.26+(e===1?n.range(-1,1):0),a=b+L*.26,o=d+A*.48;q(r,`box`,S,i,o-.9,a,1.5,1.7,1.5,J(S,M.HOUSE,u,u,1.5,.5,.7,c*2.3),C),q(r,`gable`,j,i,o+.8,a,1.9,.62,1.9,{color:F,ry:Math.PI/2})}}let ae=n.pick(Je),oe=N;q(r,`box`,`paint`,R,0,z+.03,1.36,2.42,.08,{color:oe}),q(r,`box`,`paint`,R,.03,z+.06,1.06,2.22,.07,{color:ae}),q(i,`box`,`steel`,R+.36,1.05,z+.09,.05,.3,.05,{color:[.72,.68,.5]}),q(r,`box`,`pave_concrete`,R,0,z+.12,1.9,.16,.85,{color:[.6,.59,.57]}),q(r,`box`,`paint`,R,2.44,z+.14,1.9,.14,.9,{color:oe}),q(i,`box`,`lamp`,R+.85,2.05,z+.1,.16,.26,.14,{color:[1,.86,.62]});let se=Math.max(1.2,s/2-z);if(q(r,`plane`,`pave_slabs`,R,.05,z+se/2,1.3,1,se,{color:[.64,.64,.62]}),n.chance(.82)){let e=y+(E?h*n.range(-.35,.35):0),t=b+(E?0:_*n.range(-.35,.35)),i=d+A*(1-Math.abs(E?t-b:e-y)/(O/2))-.8;q(r,`box`,`brick_red`,e,i,t,.72,d+A+.95-i,.72,nt(`brick_red`)),q(r,`box`,`metal_dark`,e,d+A+.95,t,.86,.1,.86,{color:[.34,.34,.36]})}let B=null;if(f){let e=v/2-p/2,t=6.2,a=b+_/2-t/2+n.range(-.5,1.2);Y(r,S,e,a,p,2.9,t,nt(S),C);let o=p+.7,c=6.9;q(r,`box`,`paint`,e,2.69,a,o,.2,c,{color:N}),q(r,`gable`,j,e,2.9,a,o,c/2*Math.tan(k*.62),c,{color:F}),q(r,`box`,`paint`,e,.04,a+t/2+.02,p-.55,2.28,.08,{color:n.pick([[.64,.63,.6],[.52,.52,.5],[.28,.24,.21],[.42,.38,.33]])});for(let n=0;n<4;n++)q(i,`box`,`paint`,e,.22+n*.55,a+t/2+.07,p-.62,.035,.03,{color:[.34,.34,.33]});q(r,`box`,`paint`,e,2.3,a+t/2+.05,p-.3,.2,.14,{color:N.map(e=>e*.72)});let l=s/2-(a+t/2);B=e,q(r,`plane`,`yard_asphalt`,e,.04,a+t/2+l/2,p+.4,1,l+.4,{color:[.52,.52,.53]})}else if(o>=15){let e=y+h/2+Math.min(2.4,(o/2-(y+h/2))*.5),t=s/2-b;B=e,q(r,`plane`,`yard_asphalt`,e,.04,b+t/2,3.1,1,t,{color:[.5,.5,.51]})}a>=3&&(q(r,`box`,`paint`,R,2.72,z+1,3,.18,2,{color:N}),q(r,`box`,`pave_concrete`,R,.02,z+1,3,.16,2,{color:[.6,.59,.57]}),q(i,`cylLow`,`paint`,R-1.3,.16,z+1.85,.15,2.6,.15,{color:N,t:1}),q(i,`cylLow`,`paint`,R+1.3,.16,z+1.85,.15,2.6,.15,{color:N,t:1}));let ce=z+.9;q(r,`plane`,`garden`,y-h/2+1.2,.045,ce,Math.max(2,h*.45),1,1.5,{color:[.5,.42,.34]}),ut(i,n,y-h/2+1.2,ce,n.int(2,4),Math.max(.8,h*.2)),n.chance(.6)&&ut(i,n,y+h/2-1,z+.8,n.int(1,2),.8),n.chance(.5)&&ut(i,n,n.range(-o/2+2,o/2-2),-s/2+n.range(2,4),n.int(1,3),1.4);let le=n(),V,H,U;if(le<.24?(V=`none`,H=Qe,U=0):le<.5?(V=`hedge`,H=n.pick(Ge),U=n.range(.9,1.45)):le<.72?(V=`board`,H=n.pick(qe),U=n.range(1.25,1.7)):le<.9?(V=`picket`,H=n.pick(Ke),U=n.range(.95,1.2)):(V=`wall`,H=n.pick([[.58,.56,.52],[.5,.47,.43],[.44,.41,.38]]),U=n.range(.65,.95)),V!==`none`){let e=o/2-.45,t=s/2-.45,r=Math.min(t-.2,b+_/2-.5);if(ct(i,V,-e,-t,e,-t,U,H),ct(i,V,-e,-t,-e,r,U,H),ct(i,V,e,-t,e,r,U,H),(V===`hedge`||V===`picket`)&&n.chance(.65)){let n=Math.min(U,.85),r=Math.min(R,B==null?R:Math.min(R,B))-1.9,a=Math.max(R,B==null?R:Math.max(R,B))+1.9;ct(i,V,-e,t,Math.max(-e,r),t,n,H),ct(i,V,Math.min(e,a),t,e,t,n,H)}}if(q(i,`box`,`paint`,y-h/2-.3,.4,b+n.range(-_/3,_/3),.42,.72,.82,{color:[.56,.56,.55]}),a>=4&&!te&&n.chance(.7)){let e=n.int(3,6);for(let t=0;t<e;t++){let n=(t+.5)/e-.5,r=b+(E?L*.22:n*(h-2)*.9),a=y+(E?n*(h-2)*.9:I*.22),o=d+A*.55+.12;E?q(i,`box`,`solar`,a,o,r,1.6,.05,1,{rx:-k,t:1}):q(i,`box`,`solar`,a,o,r,1,.05,1.6,{rz:k,t:1})}}let ue=2+Math.floor(n.range(0,3))+ +(a>=4);return{height:d+A,floors:l,residents:ue,jobs:0,main:{x:y,z:b,w:h,d:_,h:d}}}function ft(e,t,n,r,i){let a=e.level,o=t.w,s=t.d,c=n(),l=n.range(1.4,2.4),u=n.range(2.6,4.2),d=n.range(2.4,4),f=Math.min(o-2*l,42),p=Math.min(s-u-d,24),m=s/2-u-p/2,h=3+Math.floor(o*s/70),g=Math.max(3,Math.min(h,[3,5,8,12,18][a-1]+n.int(-1,2))),_=a>=3&&t.avenue&&n.chance(.7),v=_?4.2:3.4,y=v+(g-1)*3+.6,b=n.pick([[`concrete_wall`,`brick_red`,`plaster_rough`,`brick_yellow`],[`brick_yellow`,`plaster_rough`,`brick_red`,`plaster_painted`],[`plaster`,`brick_white`,`plaster_painted`,`brick_red`],[`plaster`,`brick_white`,`plaster_painted`,`concrete_wall`],[`glass`,`plaster`,`plaster`,`brick_white`]][a-1]),x=b===`glass`?n.pick(ze):b.startsWith(`brick`)||b===`concrete_wall`?Ze:a>=4?n.pick(K):n.pick(Le),S=b===`glass`?M.CURTAIN:_?M.RETAIL:M.APARTMENT,C=b===`glass`?n.range(1.6,2.2):n.range(3,4.2);if(Y(r,b,0,m,f,y,p,J(b,S,3,v,C,n.range(.42,.55),.6,c),x),a>=2&&n.chance(.7)){let e=f*n.range(.28,.45),t=n.range(-f/2+e/2+1,f/2-e/2-1),i=n.chance(.5)?b:n.pick([`plaster`,`concrete_wall`,`brick_white`]),o=i===b?Array.isArray(x)?x.map(e=>e*.86):x:n.pick(K),s=J(i,i===`glass`?M.CURTAIN:M.APARTMENT,3,v,C,.5,.6,c*.7);Y(r,i,t,m+.9,e,y+(a>=4?1.2:0),p+.1,s,o)}a>=4&&Y(r,b===`glass`?`plaster`:b,n.range(-f*.1,f*.1),m,f*.55,3.2,p*.6,J(b,M.APARTMENT,3,3,C,.6,.6,c*1.3),b===`glass`?K[0]:x,0);let w=y;st(r,i,n,f*.3,m-p*.2,w,3.2,3,3),it(r,i,n,0,m,f,p,w,n.int(1,3)+ +(a>=3),{antennas:n.int(1,3),tank:a<=3&&n.chance(.6),solar:a>=4?n.int(4,12):0,vents:!1});let T=Math.max(1,Math.floor((f-1.1)/C)),E=(f-1.1)/T,D=g*T>40?2:1,O=g*T*2>90?[1]:[1,-1],k=Math.min(E*.62,3.2),A=a>=4,j=A?`glass_dark`:`paint`,N=A?[.13,.16,.19]:n.pick([[.44,.42,.39],[.38,.37,.35],[.34,.34,.33]]),P=Array.isArray(x)?x:[.55,.53,.5],ee=[P[0]*.72+.06,P[1]*.72+.06,P[2]*.7+.055],F=[ee[0]*.52,ee[1]*.52,ee[2]*.52],te=[[.2,.33,.15],[.26,.38,.18],[.16,.28,.13]],I=[[.36,.3,.24],[.3,.33,.36],[.42,.38,.3],[.24,.26,.28]];for(let e=1;e<g;e++){let t=v+(e-1)*3;for(let r=0;r<T;r++){if((r+e)%D!==0)continue;let a=-f/2+.55+(r+.5)*E;for(let e of O){if(n.chance(.26))continue;let r=n.chance(.3)?1.05:1.4,o=k*n.range(.86,1),s=m+e*(p/2+r/2);q(i,`box`,`paint`,a,t-.02,s,o,.18,r,{color:ee,t:1}),q(i,`box`,`paint`,a,t-.2,s,o*.96,.18,r*.94,{color:F,t:1}),q(i,`box`,j,a,t+.16,s+e*(r/2-.06),o,.94,.1,{color:N,t:1}),q(i,`box`,j,a-o/2+.05,t+.16,s,.1,.94,r*.93,{color:N}),q(i,`box`,j,a+o/2-.05,t+.16,s,.1,.94,r*.93,{color:N}),q(i,`box`,`steel`,a,t+1.1,s+e*(r/2-.06),o,.07,.14,{color:[.62,.62,.61]});let c=n();c<.2?q(i,`box`,`hedge`,a+n.range(-o*.3,o*.3),t+.16,s,.42,.62,.42,{color:n.pick(te)}):c<.34&&q(i,`box`,`paint`,a+n.range(-o*.28,o*.28),t+.16,s-e*.18,.52,.72,.48,{ry:n.range(-.4,.4),color:n.pick(I)})}}}q(r,`box`,`pave_concrete`,0,0,m,f+.26,.78,p+.26,{color:[.38,.37,.35]}),q(r,`box`,`pave_concrete`,0,.78,m,f+.38,.12,p+.38,{color:[.48,.47,.45]}),q(r,`box`,`pave_concrete`,0,0,m+p/2+.04,5.6,v-.25,.42,{color:[.42,.41,.39]}),q(r,`box`,`glass_dark`,0,.05,m+p/2+.26,4.4,v-.85,.14,{color:[.11,.13,.15]}),q(i,`box`,`lamp`,0,v-1.15,m+p/2+.36,1.7,.22,.12,{color:[1,.88,.66],t:1}),q(r,`box`,`paint`,0,3.1,m+p/2+1,4.4,.24,2.2,{color:[.56,.55,.53]}),q(i,`cylLow`,`steel`,-1.8,0,m+p/2+1.9,.15,3.1,.15,{t:1}),q(i,`cylLow`,`steel`,1.8,0,m+p/2+1.9,.15,3.1,.15,{t:1}),a>=3&&q(r,`plane`,`pave_concrete`,0,.04,0,o-.5,1,s-.5,{color:[.47,.47,.46]}),q(r,`plane`,`pave_slabs`,0,.045,s/2-u/2-.2,o-.6,1,u+.4,{color:[.62,.62,.61]}),a<=2&&q(r,`plane`,`yard_asphalt`,0,.04,-s/2+d/2+.2,o-.6,1,d+.4,{color:[.5,.5,.5]}),ut(i,n,-o/2+l*.6,m,3,p*.3),ut(i,n,o/2-l*.6,m,3,p*.3);let L=Math.max(2,Math.round(f*p/95))*g,ne=Math.round(L*n.range(1.8,2.6)),re=_?Math.round(f*.8):0;return{height:y+(a>=4?3.2:0),floors:g,residents:ne,jobs:re,main:{x:0,z:m,w:f,d:p,h:y}}}function pt(e,t,n,r,i,a,o){q(e,`wedge`,`fabric`,t,n,r+.78,i,.62,1.55,{color:a,t:1}),q(e,`box`,`fabric`,t,n-.34,r+1.52,i,.36,.05,{color:a}),q(e,`box`,`metal_dark`,t-i/2+.05,n-.02,r+.8,.05,.06,1.5,{color:[.28,.28,.3]}),q(e,`box`,`metal_dark`,t+i/2-.05,n-.02,r+.8,.05,.06,1.5,{color:[.28,.28,.3]})}function mt(e,t,n,r,i){let a=e.level,o=t.w,s=t.d,c=n(),l=n.range(.5,1.1),u=.8,d=o-2*l,f=Math.min(Math.max(8,s*n.range(.55,.72)),22),p=s/2-u-f/2,m=[1,n.int(1,2),2,n.int(2,3),3][a-1],h=4.2,g=3.2,_=h+(m-1)*g+.55,v=[[`concrete`,`brick_red`],[`brick_yellow`,`plaster_painted`],[`plaster`,`brick_red`,`plaster_painted`],[`plaster`,`brick_white`,`plaster`],[`plaster`,`brick_white`,`glass`]][a-1],y=n.pick(v),b=y===`glass`?n.pick(ze):y.startsWith(`brick`)?Ze:a>=4?n.pick(K):n.pick(Le),x=n.range(3.4,4.4);Y(r,y,0,p,d,_,f,J(y,y===`glass`?M.CURTAIN:M.RETAIL,g,h,x,.55,.75,c),b);let S=N(d,x),C=S.nB,w=S.bay,T=n.pick(Ve),E=n.chance(.9),D=p+f/2,O=Math.max(1,Math.round(C/n.int(1,3)));q(r,`box`,`paint`,0,4.140000000000001,D+.1,d,.2,.34,{color:[.44,.43,.41]});for(let e=0;e<C;e++){let t=S.x0+(e+.5)*w;E&&(e%3!=2||C<=2)&&pt(i,t,2.75,D,w-.5,Math.floor(e/O)%2<1?T:n.pick(Ve),n)}for(let e=0;e<C;e+=O){let t=Math.min(O,C-e),i=S.x0+(e+t/2)*w,a=Math.min(t*w-.6,4.2);q(r,`panel`,`sign`,i,3.4000000000000004,D+.08,a,a/5,1,{variant:n.int(0,7)})}if(a>=3&&n.chance(.7)){let e=Math.min(d*.6,9);q(r,`box`,`metal_dark`,0,_+.6,p-f*.2,e+.3,e/5+.4,.16,{color:[.28,.29,.31]}),q(r,`panel`,`sign`,0,_+.8,p-f*.2+.11,e,e/5,1,{variant:n.int(0,7)}),q(i,`cylLow`,`steel`,-e*.35,_,p-f*.2,.12,.7,.12),q(i,`cylLow`,`steel`,e*.35,_,p-f*.2,.12,.7,.12)}st(r,i,n,-d*.28,p-f*.25,_,2.6,2.4,2.4),it(r,i,n,0,p,d,f,_,n.int(1,3),{antennas:n.int(0,2),tank:n.chance(.35),vents:!1});let k=s-u-f-.6;return k>3&&(q(r,`plane`,`yard_asphalt`,0,.04,-s/2+k/2+.3,o-.6,1,k,{color:[.52,.52,.52]}),q(i,`box`,`paint`,-o/2+1.6,0,-s/2+1.4,1.8,1.3,1.1,{color:n.pick([[.15,.4,.2],[.2,.3,.55],[.35,.35,.35]]),t:1}),ct(i,`chain`,-o/2+.3,-s/2+.3,o/2-.3,-s/2+.3,2,Qe)),a>=3&&q(r,`plane`,`pave_concrete`,0,.038,0,o-.5,1,s-.5,{color:[.47,.47,.46]}),q(r,`plane`,`pave_slabs`,0,.045,s/2-u/2,o-.4,1,1.1,{color:[.62,.62,.61]}),{height:_,floors:m,residents:0,jobs:Math.max(3,Math.round(d*f/42+(m-1)*d*f/60)),main:{x:0,z:p,w:d,d:f,h:_}}}function ht(e,t,n,r,i){let a=e.level,o=t.w,s=t.d,c=n(),l=o-2.4,u=s-2.2,d=s/2-1.2-u/2,f=a<=2?2:3,p=4.5,m=3.6,h=p+(f-1)*m+.6,g=n.pick([`plaster`,`concrete_wall`,`brick_white`,`plaster_painted`]),_=g===`concrete_wall`||g===`brick_white`?Ze:n.pick(K),v=n.range(3.6,4.8);Y(r,g,0,d,l,h,u,J(g,M.RETAIL,m,p,v,.6,.7,c),_);let y=N(l,v),b=y.nB,x=y.bay,S=d+u/2;q(r,`box`,`paint`,0,4.44,S+.1,l,.22,.36,{color:[.42,.41,.39]});for(let e=0;e<b;e++){let t=y.x0+(e+.5)*x;e%2==1&&n.chance(.7)&&pt(i,t,3.05,S,x-.5,n.pick(Ve),n),e%2==0&&q(r,`panel`,`sign`,t,3.7199999999999998,S+.08,Math.min(x-.6,6),Math.min(x-.6,6)/5,1,{variant:n.int(0,7)})}let C=n(),w,T;if(C<.32?(w=l*n.range(.8,.94),T=u*n.range(.34,.48)):C<.62?(w=l*n.range(.44,.58),T=u*n.range(.46,.62)):(w=l*n.range(.58,.8),T=u*n.range(.62,.88)),C<.32&&n.chance(.45)){let e=w;w=Math.min(l*.92,T),T=Math.min(u*.92,e)}let E=n.range(-(l-w)/2+.5,(l-w)/2-.5),D=d+n.range(-(u-T)/2+.5,(u-T)/2-.5),O=5+Math.floor(o*s/32),k=Math.max(4,Math.min(O,[5,8,12,18,26][a-1]+n.int(-1,3))),A=3.1,j=k*A+.6,P=a>=4&&n.chance(.62)||a===3&&n.chance(.35),ee=P?`glass`:n.pick([`plaster`,`brick_white`,`concrete_wall`,`plaster_painted`]),F=P?n.pick(ze):ee===`brick_white`||ee===`concrete_wall`?Ze:n.pick(K),te=J(ee,P?M.CURTAIN:M.APARTMENT,A,A,P?n.range(1.5,2.1):n.range(2.8,3.8),.6,.6,c*.5);if(q(r,`box`,ee,E,h-.05,D,w,j,T,{...te,color:F}),a>=4){let e=w*.4,t=P?K[3]:n.pick(ze),i=P?`plaster`:`glass`;q(r,`box`,i,E+(n.chance(.5)?1:-1)*(w/2-e/2+.6),h-.05,D,e,j+3,T*.7,{...J(i,i===`glass`?M.CURTAIN:M.APARTMENT,A,A,i===`glass`?1.8:3.2,.55,.6,c*.3),color:t})}let I=h-.05+j,L=[0,1,2,3,4,5][Math.min(5,Math.floor(n()*(a>=4?6:4)))],ne=ot(r,i,n,L,E,D,w,T,I,ee,F,e=>J(ee,P?M.CURTAIN:M.APARTMENT,A,A,P?1.8:3.2,.6,.6,c*e));L!==4&&st(r,i,n,E+w*.22,D-T*.18,I,w*.34,T*.34,3,[.44,.45,.47]),it(r,i,n,E,D,w,T,I,n.int(2,4),{antennas:n.int(1,3),vents:!1}),ne>45&&(at(r,i,E,ne+.4,D),at(r,i,E+w*.4,I+.2,D-T*.4)),a>=4&&(L===0||L===4)&&(q(r,`box`,`metal_dark`,E,I+1,D-T*.1,Math.min(w*.7,12)+.3,2.6,.2,{color:[.24,.25,.27]}),q(r,`panel`,`sign`,E,I+1.2,D-T*.1+.12,Math.min(w*.7,12),2.2,1,{variant:n.int(0,7)})),it(r,i,n,E>0?-l/4:l/4,d,l/2-1,u-2,h,n.int(1,3),{vents:!1});for(let e=0;e<4;e++)q(i,`box`,`hedge`,E>0?-l/2+2:l/2-2,h,d-u/2+2+e*((u-4)/3),1.6,.6,1.6,{color:n.pick(Ge),t:1});q(r,`plane`,`pave_slabs`,0,.045,0,o-.4,1,s-.4,{color:[.6,.6,.59]});let re=Math.round(l*u*f/45+w*T*k/60),ie=P?0:Math.round(w*T*k/110);return{height:Math.max(ne,I+(a>=4?3:0)),floors:f+k,residents:ie,jobs:re,main:{x:E,z:D,w,d:T,h:I}}}function gt(e,t,n,r,i){let a=e.level,o=t.w,s=t.d,c=n(),l=Math.min(o-4,40),u=Math.min(s-5,32),d=s/2-3.2-u/2,f=3.7,p=4.6,m=8+Math.floor(o*s/24),h;if(a<=2){let e=Math.min(m,a===1?n.int(3,4):n.int(5,7)),t=a===2&&n.chance(.5),g=t?`glass`:n.pick([`concrete_wall`,`plaster`,`brick_white`,`concrete`]),_=t?n.pick(ze):g===`plaster`?n.pick(K):Ze,v=p+(e-1)*f+.7;return Y(r,g,0,d,l,v,u,J(g,t?M.CURTAIN:M.APARTMENT,f,p,t?1.8:n.range(2.6,3.4),.72,.55,c),_),h=v,st(r,i,n,l*.2,d,h,4.2,3.6,2.8,[.56,.57,.59]),it(r,i,n,0,d,l,u,h,n.int(2,4),{antennas:n.int(1,2),solar:n.chance(.5)?n.int(6,14):0,vents:!1}),q(r,`plane`,`pave_slabs`,0,.045,0,o-.4,1,s-.4,{color:[.6,.6,.59]}),{height:h,floors:e,residents:0,jobs:Math.round(l*u*e/20),main:{x:0,z:d,w:l,d:u,h}}}let g=Math.max(8,Math.min(m,[0,0,n.int(10,16),n.int(16,26),n.int(26,40)][a-1])),_=a>=4?3:2,v=_===3?[.4,.35,.25]:[.55,.45],y=_===3?[1,.78,.58]:[1,.72],b=n.pick(ze),x=n.range(1.4,2),S=n.chance(.5),C=0,w=g,T=[],E=`glass`,D=b;for(let e=0;e<_;e++){let t=e===_-1?w:Math.max(2,Math.round(g*v[e]));w-=t;let i=l*y[e],a=u*y[e],o=e===0?0:n.range(-(l-i)/2*.6,(l-i)/2*.6),s=e===0?d:d+n.range(-(u-a)/2*.6,(u-a)/2*.6),m=(e===0?.8999999999999995:0)+t*f+.7,h=S&&e===1?`plaster`:`glass`,O=J(h,h===`glass`?M.CURTAIN:M.APARTMENT,f,e===0?p:f,h===`glass`?x:3,.7,.55,c*(1+e*.37));q(r,`box`,h,o,C-(e?.05:0),s,i,m,a,{...O,color:h===`glass`?b:K[3]}),E=h,D=h===`glass`?b:K[3],T.push({x:o,z:s,w:i,d:a,top:C+m}),C+=m-.05}h=C+.05;let O=T[T.length-1],k=[4,1,3,0,5,2][Math.floor(n()*6)],A=ot(r,i,n,k,O.x,O.z,O.w,O.d,h,E,D,e=>J(`glass`,M.CURTAIN,f,f,x,.7,.55,c*e));k!==4&&st(r,i,n,O.x+O.w*.2,O.z-O.d*.16,h,O.w*.34,O.d*.34,3.4,[.44,.46,.49]),A>45&&at(r,i,O.x+O.w*.42,h+.2,O.z+O.d*.42),h=Math.max(h,A),q(r,`box`,`pave_concrete`,O.x,h,O.z,O.w+.34,.86,O.d+.34,{color:[.44,.44,.43]}),q(r,`box`,`pave_concrete`,O.x,h+.86,O.z,O.w+.52,.13,O.d+.52,{color:[.52,.52,.5]}),q(r,`box`,`pave_concrete`,O.x,h+.1,O.z,O.w-.34,.06,O.d-.34,{color:[.36,.36,.35]});for(let e=0;e<n.int(2,3);e++){let e=O.x+n.range(-O.w/2+2,O.w/2-2),t=O.z+n.range(-O.d/2+2,O.d/2-2),a=n.range(2.2,3.1),o=n.range(2,2.6);q(r,`cyl`,`metal_tank`,e,h,t,o,a,o,{color:[1.24,1.25,1.24]}),q(i,`cylLow`,`steel`,e,h+a*.34,t,o+.1,.11,o+.1,{color:[.6,.61,.62],t:1}),q(i,`cylLow`,`steel`,e,h+a*.7,t,o+.1,.11,o+.1,{color:[.6,.61,.62],t:1}),q(r,`cylLow`,`metal_dark`,e,h+a,t,o*.86,.14,o*.86,{color:[.34,.35,.36]}),q(i,`cylLow`,`steel`,e,h+a+.14,t,o*.62,.3,o*.62,{color:[.3,.31,.32],t:1}),q(i,`box`,`steel`,e+o,h,t,.08,a+.5,.46,{color:[.58,.59,.6],t:1});for(let n=0;n<4;n++)q(i,`cylLow`,`steel`,e,h+a+.9,t+(n-1.5)*o*.55,.06,.9,.06,{color:[.56,.57,.58],t:1})}a>=5&&O.w>16&&O.d>16&&q(r,`cyl`,`pave_concrete`,O.x+O.w*.25,h,O.z+O.d*.2,9,.3,9,{color:[.44,.44,.43]});for(let e=0;e<T.length-1;e++){let t=T[e];it(r,i,n,t.x+(t.w-T[e+1].w)/2*(n.chance(.5)?1:-1)*.8,t.z,(t.w-T[e+1].w)*.7+3,t.d*.6,t.top,n.int(1,3),{vents:!1})}let j=d+u/2;q(r,`box`,`pave_concrete`,0,0,d,l+.3,.95,u+.3,{color:[.4,.39,.37]}),q(r,`box`,`pave_concrete`,0,.95,d,l+.42,.14,u+.42,{color:[.5,.49,.47]}),q(r,`box`,`pave_concrete`,0,0,j+.05,10.4,4.449999999999999,.55,{color:[.44,.43,.41]}),q(r,`box`,`glass_dark`,0,.05,j+.34,9,3.8499999999999996,.16,{color:[.1,.12,.14]}),q(r,`cyl`,`glass_dark`,0,.05,j+.45,2.6,2.7,2.6,{color:[.12,.14,.17]}),q(r,`box`,`glass_dark`,0,4.3,j+2.2,9,.3,4.4,{color:[.13,.15,.18]}),q(i,`cylLow`,`steel`,-3.6,0,j+4,.22,4.3,.22,{t:1}),q(i,`cylLow`,`steel`,3.6,0,j+4,.22,4.3,.22,{t:1}),q(r,`panel`,`sign`,-l/2+3.2,3.0999999999999996,j+.62,3.4,.68,1,{variant:n.int(0,7)});for(let e=0;e<4;e++)q(i,`cylLow`,`steel`,-5.4+e*3.6,0,j+4.6,.18,.95,.18,{color:[.48,.49,.5],t:1});q(r,`plane`,`pave_slabs`,0,.045,0,o-.4,1,s-.4,{color:[.6,.6,.59]});for(let e=0;e<3;e++)q(i,`box`,`hedge`,-o/2+2.5+e*((o-5)/2),0,s/2-1.6,1.8,.6,1.2,{color:n.pick(Ge),t:1});let N=T.reduce((e,t)=>e+t.w*t.d,0)/T.length;return{height:h+1.2,floors:g,residents:0,jobs:Math.round(N*g/22),main:{x:T[0].x,z:T[0].z,w:T[0].w,d:T[0].d,h}}}function _t(e,t,n,r,i){let a=e.level,o=t.w,s=t.d,c=n();q(r,`plane`,`yard_asphalt`,0,.04,0,o-.6,1,s-.6,{color:[.52,.52,.52]});let l=n.range(2.5,4),u=Math.min(o-2*l,44),d=Math.min(Math.max(10,s*n.range(.48,.62)),26),f=-s/2+2.5+d/2,p=[5.5,6.5,8,9.5,11][a-1]+n.range(-.5,.8),m=a>=4,h=a<=2?n.pick([`brick_red`,`concrete_wall`,`corrugated`]):a===3?n.pick([`corrugated`,`corrugated`,`concrete`]):n.pick([`plaster`,`corrugated`,`plaster`]),g=h===`corrugated`?n.pick(Be):h===`plaster`?n.pick(K):Ze,_=a<=2&&h===`brick_red`?M.APARTMENT:h===`corrugated`?M.INDUSTRIAL_METAL:M.INDUSTRIAL;Y(r,h,0,f,u,p,d,J(h,_,_===M.APARTMENT?4:p,_===M.APARTMENT?4:p,n.range(4,5.5),.75,.35,c),g);let v=p;if(m){for(let e=0;e<Math.floor(u/8);e++)q(r,`box`,`glass_dark`,-u/2+4+e*8,p,f,2.4,.5,d*.6,{color:[.42,.48,.54]});it(r,i,n,0,f,u,d,p,n.int(2,5),{solar:n.chance(.5)?n.int(10,24):0})}else{let e=d/2*Math.tan(n.range(.14,.24));q(r,`gable`,`corrugated_roof`,0,p-.05,f,u+.6,e,d+.6,{color:n.pick([[1.02,1.04,1.06],[.78,.81,.85],[.58,.61,.64]])}),v=p+e;for(let t=0;t<Math.floor(u/9);t++)q(r,`cylLow`,`steel`,-u/2+4.5+t*9,p+e-.3,f,.8,1.5,.8,{color:[.6,.6,.62]}),et.vents.push({x:-u/2+4.5+t*9,y:p+e+1.2,z:f})}let y=f+d/2,b=P(u);if(q(r,`box`,`concrete`,0,0,y+1.2,u*.88,1.12,2.4,nt(`concrete`)),q(r,`box`,`paint`,0,1.02,y+2.4,u*.88,.12,.14,{color:[.62,.56,.18]}),_===M.INDUSTRIAL)for(let e=0;e<b.nD;e++){let t=b.centre(e);for(let e of[-1,1])q(r,`box`,`metal_dark`,t+e*(b.doorW/2+.18),.72,y+.12,.26,.42,.26,{color:[.13,.13,.14]});q(i,`box`,`metal_dark`,t,1.02,y+2.42,b.doorW-.5,.1,.3,{color:[.2,.2,.21],t:1}),q(r,`box`,`paint`,t,Math.min(p-.5,4.62),y+.5,b.doorW+.5,.16,1.15,{color:[.46,.45,.43]}),q(i,`cylLow`,`paint`,t+b.doorW/2+.9,0,y+1.9,.22,1,.22,{color:[.6,.5,.14],t:1})}else{let e=Math.max(1,Math.floor((u-4)/5.5));for(let t=0;t<e;t++){let a=-u/2+2+(t+.5)*((u-4)/e);q(r,`box`,`paint`,a,1.15,y+.06,3,3.4,.12,{color:n.pick([[.22,.26,.32],[.36,.36,.37],[.18,.18,.19],[.4,.22,.15]])}),q(i,`box`,`metal_dark`,a,.2,y+2.45,3,.5,.12,{color:[.12,.12,.12],t:1}),q(i,`box`,`paint`,a,4.55,y+.5,3.2,.18,1,{color:[.5,.49,.47]})}}let x=[.44,.45,.46];q(r,`box`,`paint`,0,p-.32,y+.1,u+.2,.16,.18,{color:x});for(let e of[-1,1])q(r,`box`,`paint`,e*(u/2-.35),0,y+.1,.16,p-.3,.16,{color:x}),q(i,`box`,`paint`,e*(u/2-.35),0,f-d/2-.1,.16,p-.3,.16,{color:x,t:1}),q(i,`box`,`pave_concrete`,e*(u/2-.35),0,y+.32,.6,.1,.5,{color:[.48,.47,.45],t:1});{let e=Math.min(u*.34,7.5);q(r,`box`,`metal_dark`,-u*.24,p-1.5,y+.1,e+.24,e/5+.24,.1,{color:[.24,.25,.26]}),q(r,`panel`,`sign`,-u*.24,p-1.4,y+.17,e,e/5,1,{variant:n.int(0,7)})}let S=Math.min(10,u*.35),C=a>=3?6.8:3.6,w=n.pick([`plaster`,`brick_white`,`concrete_wall`]);if(Y(r,w,-u/2+S/2+.5,y+3,S,C,6,J(w,M.APARTMENT,3.2,3.2,3,.6,.5,c*.6),w===`plaster`?n.pick(K):Ze),a>=3&&n.chance(a>=4?.42:.24)){let e=n.range(18,34),t=n.range(1.4,2.4);q(r,`cyl`,a<=3?`brick_cyl`:`concrete_cyl`,u/2-2.5,0,f-d/2+2.5,t,e,t),q(r,`cyl`,`metal_dark`,u/2-2.5,e,f-d/2+2.5,t+.3,.6,t+.3,{color:[.3,.3,.32]}),et.stacks.push({x:u/2-2.5,y:e+.6,z:f-d/2+2.5,r:t/2})}let T=o/2-l/2-1;if(a>=2&&l>3.2){let e=n.int(1,3);for(let t=0;t<e;t++){let e=Math.min(l-1.2,n.range(3.5,6)),a=n.range(5,9),o=f-d/2+3+t*(e+1.5);if(o+e/2>y)break;q(r,`cyl`,`metal_tank`,T,0,o,e,a,e,{color:[1.02,1.04,1.05]}),q(r,`dome`,`metal_tank`,T,a,o,e,e*.22,e,{color:[1.12,1.13,1.12]}),q(i,`cylLow`,`steel`,T-e/2-.4,0,o,.3,a*.9,.3,{t:1}),q(i,`cylLow`,`steel`,T-e/2-.4-(T-e/2-.4-u/2)/2,a*.8,o,.3,T-e/2-.4-u/2,.3,{rz:Math.PI/2})}}if(a>=4&&s-d-5>8){let e=n.int(2,4);for(let t=0;t<e;t++){let e=-u/2+3+t*3.6,i=y+9;if(i>s/2-2)break;q(r,`cyl`,`paint`,e,0,i,3,n.range(11,15),3,{color:[.6,.59,.56]}),q(r,`cone`,`metal_dark`,e,13,i,3.2,1.6,3.2,{color:[.6,.6,.62]})}}let E=n.int(1,4);for(let e=0;e<E;e++){let e=n.range(-o/2+4,o/2-4),t=n.range(y+4,s/2-4);if(!(t<y+3.5)){if(n.chance(.6))q(r,`box`,`paint`,e,0,t,n.chance(.5)?6:12,2.6,2.4,{color:n.pick(We),ry:n.chance(.5)?0:Math.PI/2});else for(let r=0;r<3;r++)q(i,`box`,`wood`,e+r*1.3,0,t,1.2,n.range(.6,1.4),1.2)}}lt(i,o,s,2.2,`chain`,Qe,9);let D=Math.max(4,Math.round(u*d/(a>=4?90:60)+6));return{height:v,floors:1+ +(a>=3),residents:0,jobs:D,main:{x:0,z:f,w:u,d,h:p}}}var vt={"res-low":dt,"res-high":ft,"com-low":mt,"com-high":ht,office:gt,ind:_t};function yt(e,t,n,r){let i=vt[e.type]||vt[`res-low`],a=[],o=[];et={stacks:[],vents:[]},tt=r&&typeof r.ground==`function`?r.ground:()=>0;let s={mass:a,detail:o,...i(e,t,n,a,o),stacks:et.stacks,vents:et.vents};return et={stacks:[],vents:[]},tt=()=>0,s}function bt(e,t){let n=[],r=Math.max(.05,Math.min(1,t)),i={mat:`concrete`,p1:[3,0,0,3],p2:[3,.5,.5,4]};for(let t of e.mass){if(t.geo===`plane`){n.push({...t,mat:`dirt`,color:[.9,.85,.8]});continue}if(t.geo!==`box`||!Ie[t.mat])continue;let e=Math.max(.35,t.h*Math.min(1,r*1.15));n.push({...t,...i,color:$e,h:e,w:t.w*.94,d:t.d*.94});let a=Math.min(16,Math.floor(e/3.3));for(let e=1;e<=a;e++)n.push({...t,...i,color:[.8,.79,.76],y:(t.y||0)+e*3.3-.13,h:.26,w:t.w+.5,d:t.d+.5})}return n}function xt(e,t,n,r){let i=[],a=Math.max(.05,Math.min(1,n)),o=t.main,s=Math.max(.5,o.h*Math.min(1,a*1.15)),c=.8,l=o.w/2+c,u=o.d/2+c,d=Math.max(1,Math.floor(s/2)),f=(e,t,n,r)=>{let a=Math.hypot(n-e,r-t),o=Math.max(1,Math.round(a/2.5)),c=Math.atan2(n-e,r-t)+Math.PI/2;for(let a=0;a<=o;a++){let c=a/o;i.push({geo:`cylLow`,mat:`steel`,x:e+(n-e)*c,y:0,z:t+(r-t)*c,w:.09,h:s+1.6,d:.09,t:1})}for(let o=1;o<=d;o++)i.push({geo:`box`,mat:`steel`,x:(e+n)/2,y:o*2,z:(t+r)/2,w:a,h:.06,d:.06,ry:c,t:1}),o%2==0&&i.push({geo:`box`,mat:`wood`,x:(e+n)/2,y:o*2+.04,z:(t+r)/2,w:a,h:.05,d:.9,ry:c,color:[.8,.7,.55],t:1})};if(f(o.x-l,o.z-u,o.x+l,o.z-u),f(o.x+l,o.z-u,o.x+l,o.z+u),f(o.x+l,o.z+u,o.x-l,o.z+u),f(o.x-l,o.z+u,o.x-l,o.z-u),i.push({geo:`box`,mat:`fabric`,x:o.x,y:Math.max(0,s-1.6),z:o.z,w:o.w+2*c+.2,h:1.8,d:.05,color:[.2,.55,.3],t:1}),o.h>12){let e=o.x+o.w/2+4.5,t=o.z-o.d/2+2,n=o.h+14,a=[.66,.47,.1],c=[.42,.43,.44],l=.85;i.push({geo:`box`,mat:`pave_concrete`,x:e,y:0,z:t,w:5,h:.6,d:5,color:[.46,.46,.45],t:1});for(let r=0;r<4;r++){let o=(r&1?1:-1)*l,s=(r&2?1:-1)*l;i.push({geo:`box`,mat:`paint`,x:e+o,y:.6,z:t+s,w:.2,h:n-.6,d:.2,color:a,t:1})}let u=Math.max(3,Math.round((n-.6)/2.6));for(let r=1;r<=u;r++){let o=.6+r/u*(n-.6);i.push({geo:`box`,mat:`paint`,x:e,y:o,z:t-l,w:l*2,h:.13,d:.13,color:a,t:1}),i.push({geo:`box`,mat:`paint`,x:e,y:o,z:t+l,w:l*2,h:.13,d:.13,color:a,t:1}),i.push({geo:`box`,mat:`paint`,x:e-l,y:o,z:t,w:.13,h:.13,d:l*2,color:a,t:1}),i.push({geo:`box`,mat:`paint`,x:e+l,y:o,z:t,w:.13,h:.13,d:l*2,color:a,t:1});let s=r%2?1:-1;i.push({geo:`box`,mat:`paint`,x:e,y:o-1.3,z:t-l,w:2.9,h:.11,d:.11,rz:s*.63,color:a,t:1}),i.push({geo:`box`,mat:`paint`,x:e-l,y:o-1.3,z:t,w:.11,h:.11,d:2.9,rx:-s*.63,color:a,t:1})}let d=Math.max(o.w,o.d)*.8+14,f=r.range(0,Math.PI*2);i.push({geo:`box`,mat:`paint`,x:e,y:n,z:t,w:1.3,h:1.4,d:1.3,color:c,t:1});for(let r of[-1,1])i.push({geo:`box`,mat:`paint`,x:e-Math.sin(f)*(d/2-3)+Math.cos(f)*r*.42,y:n+1.2,z:t-Math.cos(f)*(d/2-3)-Math.sin(f)*r*.42,w:.22,h:.22,d,ry:f,color:a,t:1});i.push({geo:`box`,mat:`paint`,x:e-Math.sin(f)*(d/2-3),y:n+2.5,z:t-Math.cos(f)*(d/2-3),w:.14,h:.14,d:d*.9,ry:f,color:a,t:1}),i.push({geo:`box`,mat:`paint`,x:e+Math.sin(f)*5,y:n+1.2,z:t+Math.cos(f)*5,w:.9,h:1.1,d:8,ry:f,color:a,t:1}),i.push({geo:`box`,mat:`metal_dark`,x:e+Math.sin(f)*8.5,y:n+.6,z:t+Math.cos(f)*8.5,w:2.2,h:2.4,d:2.2,ry:f,color:[.34,.35,.36],t:1}),i.push({geo:`box`,mat:`glass_dark`,x:e-Math.sin(f)*1.2,y:n+1.4,z:t-Math.cos(f)*1.2,w:1.6,h:1.8,d:1.8,ry:f,color:[.13,.15,.17],t:1}),i.push({geo:`dome`,mat:`beacon`,x:e,y:n+2.9,z:t,w:.34,h:.3,d:.34,t:1});let p=r.range(.35,.8)*d*.8,m=e-Math.sin(f)*p,h=t-Math.cos(f)*p;i.push({geo:`cylLow`,mat:`metal_dark`,x:m,y:s+3,z:h,w:.05,h:n-s-2,d:.05,t:1}),i.push({geo:`box`,mat:`metal_dark`,x:m,y:s+1.5,z:h,w:1.4,h:1.5,d:1.4,color:[.48,.48,.49],t:1})}let p={mat:`concrete`,color:$e,p1:[3,0,0,3],p2:[3,.5,.5,4]};for(let e=0;e<8;e++){let t=e/8*Math.PI*2,n=o.x+Math.cos(t)*o.w*.42,r=o.z+Math.sin(t)*o.d*.42;i.push({geo:`box`,...p,x:n,y:s-.5,z:r,w:.6,h:3.4,d:.6,t:1}),i.push({geo:`cylLow`,mat:`steel`,x:n,y:s+2.8,z:r,w:.07,h:1.2,d:.07,t:1})}lt(i,e.w,e.d,2,`chain`,Qe,8),i.push({geo:`box`,mat:`paint`,x:-e.w/2+2.2,y:0,z:e.d/2-4.5,w:2.4,h:2.6,d:6,ry:Math.PI/2,color:[.2,.35,.6],t:1}),i.push({geo:`cone`,mat:`fabric`,x:e.w/2-3,y:0,z:e.d/2-3.5,w:4.5,h:1.6,d:4.5,color:[.55,.45,.35],t:1});for(let t=0;t<3;t++)i.push({geo:`box`,mat:`wood`,x:e.w/2-6-t*1.4,y:0,z:e.d/2-2.8,w:1.2,h:.9+.2*t,d:1.2,color:[.75,.68,.55]});for(let e=0;e<3;e++){let t=(e+.5)/3;i.push({geo:`box`,mat:`lamp`,x:o.x-o.w/2+t*o.w,y:Math.max(1.5,s-.6),z:o.z+o.d/2+c,w:.5,h:.34,d:.28,color:[1,.92,.74],t:1})}return i}var St={"res-low":{w:[16,16,24],d:[16,24]},"res-high":{w:[24,32],d:[24,32]},"com-low":{w:[16,24,24],d:[16,24]},"com-high":{w:[32],d:[32]},office:{w:[32,32,40],d:[32]},ind:{w:[32,40],d:[32,40]}};function Ct(e){let t=Math.cos(e.yaw),n=Math.sin(e.yaw),r={x:t,z:-n},i={x:n,z:t},a=e.w/2,o=e.d/2;return[{x:e.x+r.x*a+i.x*o,z:e.z+r.z*a+i.z*o},{x:e.x-r.x*a+i.x*o,z:e.z-r.z*a+i.z*o},{x:e.x-r.x*a-i.x*o,z:e.z-r.z*a-i.z*o},{x:e.x+r.x*a-i.x*o,z:e.z+r.z*a-i.z*o}]}function wt(e,t){let n=1/0,r=-1/0;for(let i of e){let e=i.x*t.x+i.z*t.z;e<n&&(n=e),e>r&&(r=e)}return[n,r]}function Tt(e,t,n=.4){let r=Ct(e),i=Ct(t);for(let a of[e,t]){let e=Math.cos(a.yaw),t=Math.sin(a.yaw);for(let a of[{x:e,z:-t},{x:t,z:e}]){let[e,t]=wt(r,a),[o,s]=wt(i,a);if(t+n<o||s+n<e)return!1}}return!0}var Et=class{constructor(e=32){this.cell=e,this.map=new Map}_keys(e){let t=Math.hypot(e.w,e.d)/2,n=Math.floor((e.x-t)/this.cell),r=Math.floor((e.x+t)/this.cell),i=Math.floor((e.z-t)/this.cell),a=Math.floor((e.z+t)/this.cell),o=[];for(let e=n;e<=r;e++)for(let t=i;t<=a;t++)o.push(e+`:`+t);return o}add(e){for(let t of this._keys(e))this.map.has(t)||this.map.set(t,[]),this.map.get(t).push(e)}collides(e,t){let n=new Set;for(let r of this._keys(e)){let i=this.map.get(r);if(i){for(let r of i)if(!n.has(r)&&(n.add(r),Tt(e,r,t)))return!0}}return!1}};function Dt(e,t=7){let n=new A(t);return(t,r,i)=>{let a=n.noise2D(r/420,i/420),o=n.noise2D(r/150+31,i/150-17),s=Math.hypot(r,i)/e.half;return t.type===`avenue`?a>.3?`office`:a>-.15?`com-high`:o>.2?`com-low`:`res-high`:a<-.5&&s>.2?`ind`:o>.55?`com-low`:a>.2?`res-high`:`res-low`}}function Ot(e,t){let n=e.roads&&e.roads.api,r=[];if(!n||typeof n.sampleEdge!=`function`)return r;let{rng:i,typeFor:a}=t,o=new Et;for(let e of t.existing||[])o.add(e);let s=t.idStart||1,c=e.terrain,l=t.segments||e.roads.segments.values(),u=e.cellSize||8,d=e.half-12,f=(e,t,r)=>{let i=n.nearest(e,t,24);return i?i.segment.id===r?i.distance<i.segment.width*.5+.6:i.distance<i.segment.width*.5+2:!1};for(let t of l){if(!t||t.type===`highway`||t.type===`path`)continue;let l=t.length||0,p=t.type===`avenue`?15:11;if(!(l<p*2+16))for(let m of[-1,1]){let h=p,g=0;for(;h+16<=l-p&&g++<400;){let g=n.sampleEdge(t.id,(h+8)/l,m);if(!g)break;let _=a(t,g.x+g.nx*12,g.z+g.nz*12);if(!_||!St[_]){h+=u;continue}let v=i.pick(St[_].w),y=i.pick(St[_].d);if(h+v>l-p){v>16&&(h+=0);break}let b=n.sampleEdge(t.id,h/l,m),x=n.sampleEdge(t.id,(h+v)/l,m);if(!b||!x)break;let S=Math.hypot(x.x-b.x,x.z-b.z),C=Math.min(v,Math.max(12,S)),w=(b.x+x.x)/2,T=(b.z+x.z)/2,E=(b.y+x.y)/2,D=b.nx+x.nx,O=b.nz+x.nz,k=Math.hypot(D,O)||1;D/=k,O/=k;let A={id:s,cells:[],x:w+D*(y/2+1),z:T+O*(y/2+1),w:C,d:y,yaw:Math.atan2(-D,-O),type:_,roadSegmentId:t.id,frontage:{x:w,y:E,z:T,nx:D,nz:O},buildingId:null,avenue:t.type===`avenue`},j=Math.abs(A.x)<d&&Math.abs(A.z)<d;if(j){let e=Ct(A),n=[];for(let r of e){if(Math.abs(r.x)>d||Math.abs(r.z)>d){j=!1;break}if(c.isWater&&c.isWater(r.x,r.z)){j=!1;break}if(n.push(c.getHeight(r.x,r.z)),f(r.x+(A.x-r.x)*.18,r.z+(A.z-r.z)*.18,t.id)){j=!1;break}}j&&(c.isWater&&c.isWater(A.x,A.z)||Math.max(...n)-Math.min(...n)>4.5+y*.08||f(A.x,A.z,t.id)||f(A.x+D*(y/2-2),A.z+O*(y/2-2),t.id)||o.collides(A,.3))&&(j=!1)}if(j){let t=e.toCell(A.x,A.z),n=Math.max(1,Math.round(C/u)),i=Math.max(1,Math.round(y/u));for(let e=0;e<n;e++)for(let r=0;r<i;r++)A.cells.push({cx:t.cx-Math.floor(n/2)+e,cz:t.cz-Math.floor(i/2)+r});o.add(A),r.push(A),s++,h+=C}else h+=u}}}return r}var kt=`buildings`,At=86400,jt={"res-low":`residential`,"res-high":`residential`,"com-low":`commercial`,"com-high":`commercial`,ind:`industrial`,office:`office`},Mt={"res-low":`#8fd95a`,"res-high":`#2ea86f`,"com-low":`#62c6ff`,"com-high":`#2b6fdc`,ind:`#f1b634`,office:`#b57cf0`},Nt={"res-low":1.1,"res-high":2.2,"com-low":1.5,"com-high":3,office:3,ind:1.9},Pt=10,Ft=3.5,It=8,Lt=240,Rt=3600,zt=21600,Bt=50400,Vt=8,Ht=[`res-low`,`res-high`,`com-low`,`com-high`,`office`,`ind`],X=null,Z=null,Ut=null,Wt=null,Gt=0,Kt=1,Q=new Map,qt=new Map,Jt=new Map,Yt=64,Xt=null,Zt=[],Qt=null,$t=0,en=0,tn=0,nn=-1,rn=!0,an=!1,on=null,sn=!0,cn=null,ln=1,un=1,dn=new o(1/0,1/0,1/0),fn=new o,pn=new t,mn={spawned:0,completed:0,levelUps:0,removed:0,detailInstances:0,detailBuildings:0};function hn(e,t){return Math.floor(e/Yt)+`:`+Math.floor(t/Yt)}function gn(e){let t=hn(e.b.x,e.b.z),n=Jt.get(t);n||Jt.set(t,n=[]),n.push(e),e.gridKey=t}function _n(e){let t=Jt.get(e.gridKey);if(!t)return;let n=t.indexOf(e);n>=0&&t.splice(n,1),t.length||Jt.delete(e.gridKey)}function vn(e,t){let n=X.world.terrain;return n&&typeof n.getHeight==`function`?n.getHeight(e,t):0}function yn(e){let t=Math.cos(e.yaw),n=Math.sin(e.yaw),r=e.w/2,i=e.d/2,a=[];for(let[o,s]of[[-r,-i],[r,-i],[r,i],[-r,i]])a.push({x:e.x+o*t+s*n,z:e.z-o*n+s*t});return a}function bn(e,t){return S(h(e.seed|0,t))()}function xn(e,t){return(Nt[e]||1.6)*(1+.18*(t-1))*3600}function Sn(e){let t=X.world.economy,n=t&&t.demand?t.demand[jt[e]]:null;return Math.max(.1,Math.min(1.25,(Number.isFinite(n)?n:.5)*1.5))}function Cn(){let e=X.world.zones;if(e&&e.api&&typeof e.api.lotsFor==`function`){try{return e.api.lotsFor()}catch{}return e.lots||[]}return e&&Array.isArray(e.lots)&&e.lots.length?e.lots:Xt||[]}function wn(e,t){let n=Math.cos(e.yaw),r=Math.sin(e.yaw);return{x:e.x+t.x*n+t.z*r,y:e.y+t.y,z:e.z-t.x*r+t.z*n,r:t.r}}function Tn(e){let t=e.b,n=t.state===`construction`?bt(e.recipe,t.progress):e.recipe.mass;return e.plinth?n.concat([e.plinth]):n}function En(e){e.refs=[];for(let t of Tn(e))e.refs.push(Z.addStatic(e.b,t));on&&sn&&Yn(e)}function Dn(e){for(let t of e.refs)Z.removeStatic(t);e.refs=[]}function On(e){Dn(e),En(e),e.detail=null,rn=!0}function kn(e){let t=Math.cos(e.yaw),n=Math.sin(e.yaw);return(r,i)=>{let a=vn(e.x+r*t+i*n,e.z-r*n+i*t);return Number.isFinite(a)?Math.max(-3.5,Math.min(1.2,a-e.y)):0}}function An(e){let t=e.b,n=yt(t,e.lot,S(h(t.seed|0,t.level)),{ground:kn(t)});e.recipe=n,t.height=Math.round(n.height*100)/100,t.floors=n.floors,t.residents=n.residents,t.jobs=n.jobs,t.stacks=n.stacks.map(e=>wn(t,e)),t.vents=n.vents.map(e=>wn(t,e)),t.chimneys=t.stacks}function jn(e){let t=e.b;if(t.state!==`construction`)return e.recipe.detail;let n=Math.floor(t.progress*Vt);return(!e.detail||e.detailStep!==n)&&(e.detail=xt(t,e.recipe,t.progress,S(h(t.seed|0,991))),e.detailStep=n),e.detail}function Mn(e,t){let n=X.world.terrain;if(!n||!n.api||typeof n.api.flattenRect!=`function`||Math.abs(Math.sin(2*e.yaw))>.25)return!1;let r=yn(e),i=1/0,a=-1/0,o=1/0,s=-1/0;for(let e of r)i=Math.min(i,e.x),a=Math.max(a,e.x),o=Math.min(o,e.z),s=Math.max(s,e.z);let c=Math.sin(e.yaw),l=Math.cos(e.yaw),u=3.2;if(Math.abs(c)>Math.abs(l)?c>0?a-=u:i+=u:l>0?s-=u:o+=u,i+=.6,a-=.6,o+=.6,s-=.6,a-i<4||s-o<4)return!1;try{return n.api.flattenRect(i,o,a,s,t,3),!0}catch{return!1}}function Nn(e){let t=yn(e),n=1/0,r=-1/0;for(let e of t){let t=vn(e.x,e.z);n=Math.min(n,t),r=Math.max(r,t)}let i=vn(e.x,e.z);n=Math.min(n,i),r=Math.max(r,i);let a=e.frontage&&e.frontage.y!=null?e.frontage.y:e.frontage?vn(e.frontage.x,e.frontage.z):i,o=X.world.roads&&X.world.roads.api;if(o&&e.frontage&&typeof o.surfaceHeight==`function`){let t=e.frontage.x-e.frontage.nx*1,n=e.frontage.z-e.frontage.nz*1,r=o.surfaceHeight(t,n);r!=null&&Number.isFinite(r)&&(a=r)}let s=X.world.terrain&&X.world.terrain.waterLevel!=null?X.world.terrain.waterLevel:-1/0,c=Math.max(a,(n+r)*.5-.2,s+.7);c=Math.round(c*100)/100;let l=null;if(r-n>.14||c-n>.14){let t=Mn(e,c),r=Math.max(.5,c-n+.6);(!t||c-n>.9)&&(l={geo:`box`,mat:`concrete`,x:0,y:-r,z:0,w:e.w-.5,h:r+.02,d:e.d-.5,p1:[3,0,0,3],p2:[3,.5,.5,4],color:[.66,.66,.64]})}return{y:c,plinth:l}}function Pn(e,t){X.events.emit(e,t)}function Fn(){X.world.buildings.version++}function In(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.z)||!e.w||!e.d)return null;let n=qt.get(e.id);if(n)return n.b;if(e.buildingId!=null&&Q.has(e.buildingId))return Q.get(e.buildingId).b;let r=Ht.includes(e.type)?e.type:`res-low`,i=Kt++,a=Number.isFinite(t.seed)?t.seed|0:h(Gt,i),o=Math.max(1,Math.min(5,Math.round(t.level||1))),s=Nn(e),c=t.state===`construction`||t.state==null&&t.built!==!0?`construction`:`built`,l=c===`built`?1:Math.max(0,Math.min(.999,t.progress||0)),u={id:i,lotId:e.id,type:r,level:o,x:e.x,y:s.y,z:e.z,yaw:e.yaw||0,w:e.w,d:e.d,height:0,floors:0,residents:0,jobs:0,state:c,progress:l,seed:a,age:0,builtAt:null,roadSegmentId:e.roadSegmentId==null?null:e.roadSegmentId,stacks:[],vents:[]},d={b:u,lot:e,recipe:null,refs:[],detail:null,detailStep:-1,plinth:s.plinth,duration:xn(r,o)};return An(d),Q.set(i,d),qt.set(e.id,d),e.buildingId=i,X.world.buildings.list.push(u),gn(d),En(d),rn=!0,mn.spawned++,Fn(),Pn(`building:added`,u),u}function Ln(e){let t=Q.get(e);if(!t)return!1;Dn(t),Q.delete(e),qt.get(t.b.lotId)===t&&qt.delete(t.b.lotId),t.lot&&t.lot.buildingId===e&&(t.lot.buildingId=null),_n(t);let n=X.world.buildings.list,r=n.indexOf(t.b);return r>=0&&n.splice(r,1),cn===e&&(cn=null,Z.setSelection(null)),t.b.state=`removed`,rn=!0,mn.removed++,Fn(),Pn(`building:removed`,t.b),!0}function Rn(e,t){let n=Q.get(e);if(!n)return null;if(t=Math.max(1,Math.min(5,Math.round(t))),t===n.b.level)return n.b;let r=t>n.b.level;return n.b.level=t,An(n),On(n),Fn(),r&&(mn.levelUps++,Pn(`building:levelup`,n.b)),n.b}function zn(e){let t=e.b;t.state=`built`,t.progress=1,t.builtAt=X.world.time&&X.world.time.totalDays||0,On(e),mn.completed++,Fn(),Pn(`building:completed`,t)}function Bn(e){if(!Q.size)return;let t=new Map;for(let n of e)t.set(n.id,n);let n=[];for(let e of Q.values()){let r=t.get(e.b.lotId);if(!r){n.push(e.b.id);continue}if(r.type!==e.b.type||Math.abs(r.w-e.b.w)>.6||Math.abs(r.d-e.b.d)>.6||Math.hypot(r.x-e.b.x,r.z-e.b.z)>.8){n.push(e.b.id);continue}e.lot!==r&&(e.lot=r,qt.set(r.id,e)),r.buildingId=e.b.id}for(let e of n)Ln(e)}function Vn(e){let t=Q.size;return t>=It?1:1+(Math.max(1,Ft*Pt/Math.max(1,e))-1)*(1-t/It)}function Hn(e){let t=e/3600,n=Cn(),r=X.world.zones?X.world.zones.version:0;tn+=e,(r!==nn||tn>=3600)&&(nn=r,tn=0,Bn(n));let i=X.world.economy||{},a=Number.isFinite(i.landValue)?i.landValue:.4,o=Number.isFinite(i.happiness)?i.happiness:.6,s=Vn(n.length-Q.size);for(let e of n){if(e.buildingId!=null||qt.has(e.id)||!Ht.includes(e.type))continue;let n=t/Pt*Sn(e.type)*ln*s;if(Wt()>=n)continue;let r=X.world.terrain;if(r&&typeof r.isWater==`function`&&r.isWater(e.x,e.z))continue;let i=1;Wt()<a*.9&&i++,Wt()<a*.35&&i++,In(e,{level:i})}for(let t of Q.values()){let n=t.b;if(n.age+=e,n.state===`construction`){let r=Math.floor(n.progress*Vt);n.progress=Math.min(1,n.progress+e*un/t.duration),n.progress>=1?zn(t):Math.floor(n.progress*Vt)!==r&&On(t)}}if(en+=e,en>=zt){let e=Math.floor(en/zt);en-=e*zt;let t=.06*(e*zt/At)*(.35+.65*o)*(.4+.6*a);for(let e of Q.values()){let n=e.b;if(n.state!==`built`||n.level>=5||n.age<Bt)continue;let r=t/(1+.8*(n.level-1));Wt()<r&&Rn(n.id,n.level+1)}}}function Un(e){$t+=e;let t=an?Rt:Lt,n=an?8760:400;for(;$t>=t&&n-->0;)Hn(t),$t-=t;n<=0&&($t=0)}function Wn(e){if(!(!Number.isFinite(e)||e<=0)){an=!0;try{Un(Math.min(e,400*At))}finally{an=!1}Kn(!0);try{X.renderer.compile(X.scene,X.camera)}catch{}}}function Gn(e){let t=X.cameraController;return t&&t.target?e.copy(t.target):e.copy(X.camera.position)}function Kn(e){if(!Z)return;let t=Gn(fn),n=Math.max(6,X.camera.position.distanceTo(t)*.05);if(!e&&!rn&&t.distanceToSquared(dn)<n*n)return;dn.copy(t),rn=!1;let r=X.engine.quality||{},i=Number.isFinite(r.density)?r.density:1,a=X.camera.position.distanceTo(t),o=Math.max(.3,Math.min(1,190/Math.max(a,1))),s=130*(.7+.3*i)*o,c=250*(.6+.4*i)*o,l=Math.round(22e3*(.5+.5*i)),u=s*s,d=c*c,f=[],p=Math.floor((t.x-c)/Yt),m=Math.floor((t.x+c)/Yt),h=Math.floor((t.z-c)/Yt),g=Math.floor((t.z+c)/Yt);for(let e=p;e<=m;e++)for(let n=h;n<=g;n++){let r=Jt.get(e+`:`+n);if(r)for(let e of r){let n=e.b.x-t.x,r=e.b.z-t.z,i=n*n+r*r;i<=d&&f.push({e,d2:i})}}f.sort((e,t)=>e.d2-t.d2),Z.beginDynamic();let _=0,v=0;for(let{e,d2:t}of f){let n=jn(e),r=t<=u||e.b.state===`construction`;v++;for(let t of n)!r&&(t.t==null?Math.max(t.w,t.h,t.d)<2.2:t.t<1)||(Z.pushDynamic(e.b,t),_++);if(_>l)break}Z.endDynamic(),mn.detailInstances=_,mn.detailBuildings=v}function qn(e,t){return e=Math.max(0,Math.min(1,e)),e<.5?t.setRGB(.85,.2+1.1*e,.15).convertSRGBToLinear():t.setRGB(.95-1.4*(e-.5),.75+.1*(e-.5),.2+.3*(e-.5)).convertSRGBToLinear()}function Jn(e){let t=X.world,n=t.economy||{},r=bn(e,17)-.5;switch(on){case`zoning`:return null;case`happiness`:return(Number.isFinite(e.happiness)?e.happiness:Number.isFinite(n.happiness)?n.happiness:.6)+r*.2;case`landvalue`:return(Number.isFinite(e.landValue)?e.landValue:Number.isFinite(n.landValue)?n.landValue:.4)+(e.type===`office`||e.type===`com-high`?.15:e.type===`ind`?-.2:0)+(e.level-1)*.05+r*.15;case`pollution`:{let t=e.type===`ind`?.85:e.type.startsWith(`com`)?.35:e.type===`office`?.2:.1;return 1-Math.min(1,t+Math.max(0,Number.isFinite(n.pollution)?n.pollution-.3:0)+r*.1)}default:{let n=t.services&&t.services.api;if(n&&typeof n.coverageAt==`function`)try{let t=n.coverageAt(e.x,e.z,on);if(Number.isFinite(t))return t}catch{}return null}}}function Yn(e){let t=e.b,n=null;if(on===`zoning`){let e=X.world.zones&&X.world.zones.api&&X.world.zones.api.types,r=Array.isArray(e)?e.find(e=>e.id===t.type):null;n=pn.set(r&&r.color||Mt[t.type]||`#ffffff`).convertSRGBToLinear()}else{let e=Jn(t);e!=null&&(n=qn(e,pn))}if(!n){for(let t of e.refs)t.pool.setTint(t,1,1,1);return}for(let t of e.refs)t.pool.setTint(t,n.r,n.g,n.b)}function Xn(){let e=!!(on&&sn&&on!==`traffic`);if(j.uInfo.value=+!!e,e)for(let e of Q.values())Yn(e)}function Zn(e,t=!0){on=e||null,sn=t!==!1,Xn()}function Qn(e,t){let n=Math.floor(e/Yt),r=Math.floor(t/Yt);for(let i=n-1;i<=n+1;i++)for(let n=r-1;n<=r+1;n++){let r=Jt.get(i+`:`+n);if(r)for(let n of r){let r=n.b,i=e-r.x,a=t-r.z,o=Math.cos(r.yaw),s=Math.sin(r.yaw),c=i*o-a*s,l=i*s+a*o;if(Math.abs(c)<=r.w/2&&Math.abs(l)<=r.d/2)return r}}return null}async function $n(e){X=e;let{engine:t,scene:n,world:r,events:i,config:a}=e;Gt=h(a.seed|0,w(`buildings`)),Wt=r.rng.fork(w(`buildings-growth`)),j.uSunDir.value=new o(-.4,-.85,-.35).normalize(),j.uSunStrength.value=1,j.uSkyUp.value=new o(.65,.93,1.75),j.uSkyHz.value=new o(.62,.66,.74),j.uSkyDn.value=new o(.42,.42,.44),j.uGndBounce.value=new o(.03,.026,.022),Ut=(await be(e)).mats,Z=new Fe({scene:n,geometries:Ee(),mats:Ut,layerReflected:t.LAYER_REFLECTED,layerNoAo:t.LAYER_NO_AO}),r.buildings.version=r.buildings.version||0,r.buildings.list=r.buildings.list||[],r.buildings.list.length=0;let s={types:Ht,spawn:In,remove:Ln,fastForward:Wn,get:e=>Q.has(e)?Q.get(e).b:null,at:Qn,levelUp:e=>{let t=Q.get(e);return t?Rn(e,t.b.level+1):null},setLevel:Rn,setLots:e=>{Xt=Array.isArray(e)?e:null,rn=!0},autoZone:(e={})=>{let t=Ot(r,{rng:r.rng.fork(w(`buildings-autozone`)),typeFor:e.typeFor||Dt(r,a.seed),existing:Xt||[],idStart:(Xt?Xt.length:0)+1});return Xt=(Xt||[]).concat(t),t},refresh:()=>{rn=!0,Kn(!0)},setInfoView:Zn,setGrowthRate:e=>{ln=Math.max(0,e)},setConstructionSpeed:e=>{un=Math.max(0,e)},stats:()=>{let e={},t={construction:0,built:0},n=0,i=0;for(let r of Q.values()){let a=r.b;e[a.type]=(e[a.type]||0)+1,t[a.state]=(t[a.state]||0)+1,a.state===`built`&&(n+=a.residents,i+=a.jobs)}let a=0,o=0;for(let e of Z.pools.values())a++,o+=e.count;return{buildings:Q.size,byType:e,...t,residents:n,jobs:i,pools:a,instances:o,...mn,version:r.buildings.version}},internals:()=>({entries:Q,renderer:Z,mats:Ut,grid:Jt,fallbackLots:Xt})};r.buildings.api=s,Zt.push(i.on(`zones:changed`,()=>{rn=!0,Bn(Cn())})),Zt.push(i.on(`entity:selected`,e=>{let t=e&&e.kind===`building`?e.id:null;cn=t,Z.setSelection(t!=null&&Q.has(t)?Q.get(t).b:null)})),Zt.push(i.on(`infoview:changed`,e=>Zn(e&&e.view?e.view:null,!e||e.buildings!==!1))),Zt.push(i.on(`terrain:ready`,()=>{for(let e of Q.values()){let t=Nn(e.lot);(Math.abs(t.y-e.b.y)>.05||!!t.plinth!=!!e.plinth)&&(e.b.y=t.y,e.plinth=t.plinth,An(e),On(e))}})),a.debug&&console.log(`[buildings] ready`,Object.keys(Ut).length,`materials`)}var er=2.7,$=new o;function tr(e,t){let n=.2126*e.x+.7152*e.y+.0722*e.z;e.set(e.x+(n-e.x)*t,e.y+(n-e.y)*t,e.z+(n-e.z)*t)}function nr(e,t){let n=j;if(!e||!n.uSkyUp.value)return;let r=e.skyColor,i=e.horizonColor,a=e.groundColor;if(!r)return;let o=er*(1-.34*t);n.uSkyUp.value.set(r.r,r.g,r.b).multiplyScalar(o),tr(n.uSkyUp.value,.17+.2*t);let s=.2126*n.uSkyUp.value.x+.7152*n.uSkyUp.value.y+.0722*n.uSkyUp.value.z;i?n.uSkyHz.value.set(i.r,i.g,i.b).multiplyScalar(o*1.15):n.uSkyHz.value.copy(n.uSkyUp.value).multiplyScalar(.7);let c=Math.max(1e-4,.2126*n.uSkyHz.value.x+.7152*n.uSkyHz.value.y+.0722*n.uSkyHz.value.z);c<s*.45&&n.uSkyHz.value.multiplyScalar(s*.45/c),a?$.set(a.r,a.g,a.b):$.set(.09,.08,.07),$.multiplyScalar(4.2*(1-.3*t));let l=Math.max(1e-4,.2126*$.x+.7152*$.y+.0722*$.z),u=s*.62;l<u&&$.multiplyScalar(u/l),tr($,.3),n.uSkyDn.value.copy($);let d=.42*(1-.65*t);n.uGndBounce.value.set($.x*.052*d,$.y*.046*d,$.z*.038*d)}function rr(e){if(!X||!Z)return;let t=X.world,n=t.env&&Number.isFinite(t.env.nightFactor)?t.env.nightFactor:0;j.uNight.value=n,j.uTime.value=X.engine.elapsed||0;let r=t.env&&t.env.sunDirection;if(r&&j.uSunDir.value&&j.uSunDir.value.copy(r),j.uSunStrength.value=Math.max(0,1-n*1.35),nr(t.env,n),Ut.sign&&(Ut.sign.emissiveIntensity=.03+.85*n),Ut.lamp&&(Ut.lamp.emissiveIntensity=.02+2.4*n),Ut.beacon){let e=X.engine.elapsed||0;Ut.beacon.emissiveIntensity=(1.15+4.2*n)*(.34+.66*Math.max(0,Math.sin(e*1.6))**6)}let i=t.time||{},a;Number.isFinite(i.elapsedGameSeconds)?(Qt??=i.elapsedGameSeconds,a=i.elapsedGameSeconds-Qt,Qt=i.elapsedGameSeconds):a=e*(i.paused?0:[0,1,2,4][i.speed|0]||1)*(3600/(i.secondsPerHour||20)),a>0&&Un(Math.min(a,120*At)),Kn(!1)}function ir(){for(let e of Zt)typeof e==`function`&&e();Zt=[],Z&&Z.dispose(),Z=null,Q.clear(),qt.clear(),Jt.clear(),X&&(X.world.buildings.list.length=0,X.world.buildings.api=null),X=null,Qt=null}export{ir as dispose,$n as init,kt as name,rr as update};