import{A as e,Et as t,Gt as n,I as r,It as i,Kt as a,M as o,Mt as s,Nt as c,Ot as l,R as u,Ut as d,Wt as f,Y as p,a as m,at as h,c as g,ct as _,dt as v,i as y,it as b,k as x,kt as S,l as C,lt as ee,m as w,o as T,q as E,qt as D,s as O,u as k,ut as A,v as j,wt as M,y as N}from"./index-eKs5Uldr.js";import{t as te}from"./noise-D8FvdR-x.js";var P={planetRadius:6371e3,atmosphereRadius:6471e3,betaR:[5802e-9,13558e-9,331e-7],betaM:3996e-9,betaMA:44e-7,betaO:[195e-8,564e-8,25e-8],HR:8e3,HM:1200,mieG:.8,sunE:4,scatterBoost:2.3,msK:.04,msSpectrum:[.6,.82,1.35],msSunAtten:.45,mieBoost:.75,sunDiscRadiance:5,sunAngularRadius:.00465*1.15,moonAngularRadius:.01242},F=new n;function ne(e,t,n){let r=e.dot(t),i=e.dot(e)-n*n,a=r*r-i;return a<0?[-1,-1]:(a=Math.sqrt(a),[-r-a,-r+a])}function re(e,t){return t[0]=Math.exp(-e/P.HR),t[1]=Math.exp(-e/P.HM),t[2]=Math.max(0,1-Math.abs(e-25e3)/15e3),t}var I=[0,0,0],L=[0,0,0],ie=new n;function ae(e,t,n,r){let[,i]=ne(e,t,P.atmosphereRadius),a=-e.dot(t),o=1;if(a>0){F.copy(e).addScaledVector(t,a);let n=F.length()-P.planetRadius;o=k(-6e3,800,n)}if(r[0]=r[1]=r[2]=0,o<=0)return 0;let s=i/n;for(let i=0;i<n;i++)F.copy(e).addScaledVector(t,(i+.5)*s),re(Math.max(0,F.length()-P.planetRadius),I),r[0]+=I[0]*s,r[1]+=I[1]*s,r[2]+=I[2]*s;return o}function oe(e,t){let n=t*t;return(1-n)/(4*Math.PI*(1+n-2*t*e)**1.5)}function R(t,r,i,a=12,o=5,s={radiance:new e,transmittance:new e}){let c=ie.set(0,P.planetRadius+Math.max(1,r),0),[,l]=ne(c,t,P.atmosphereRadius),u=l,[d]=ne(c,t,P.planetRadius),f=d>0;f&&(u=d);let p=P.betaR,m=P.betaO,h=i.turbidity??2,g=i.scatterBoost??P.scatterBoost,_=P.betaM*h,v=(P.betaM+P.betaMA)*h,y=t.dot(i.sunDir),b=3/(16*Math.PI)*(1+y*y),x=oe(y,P.mieG),S=i.moonE>1e-5,C=S?t.dot(i.moonDir):0,ee=3/(16*Math.PI)*(1+C*C),w=oe(C,P.mieG),T=[0,0,0],E=[0,0,0],D=[0,0,0],O=[0,0,0],k=[0,0,0],A=[0,0,0],j=L,M=new n,N=[0,0,0];for(let e=0;e<a;e++){let n=e/a,r=(e+1)/a,s=u*n*n,l=u*r*r,d=l-s,f=.5*(s+l);M.copy(c).addScaledVector(t,f),re(Math.max(0,M.length()-P.planetRadius),N),A[0]+=N[0]*d,A[1]+=N[1]*d,A[2]+=N[2]*d;let h=ae(M,i.sunDir,o,j);if(h>0)for(let e=0;e<3;e++){let t=p[e]*A[0]+v*A[1]+m[e]*A[2],n=p[e]*j[0]+v*j[1]+m[e]*j[2],r=Math.exp(-(t+n))*h;T[e]+=r*N[0]*d,E[e]+=r*N[1]*d,k[e]+=Math.exp(-t-(p[e]*j[0]+v*j[1])*P.msSunAtten)*h*N[0]*d}if(S&&(h=ae(M,i.moonDir,o,j),h>0))for(let e=0;e<3;e++){let t=p[e]*(A[0]+j[0])+v*(A[1]+j[1])+m[e]*(A[2]+j[2]),n=Math.exp(-t)*h;D[e]+=n*N[0]*d,O[e]+=n*N[1]*d}}let te=s.radiance,F=s.transmittance,I=[0,0,0],R=[0,0,0];for(let e=0;e<3;e++)R[e]=Math.exp(-(p[e]*A[0]+v*A[1]+m[e]*A[2])),I[e]=i.sunE*(T[e]*p[e]*b*g+E[e]*_*x*P.mieBoost+k[e]*p[e]*P.msSpectrum[e]*P.msK),S&&(I[e]+=i.moonE*(D[e]*p[e]*ee*g+O[e]*_*w*P.mieBoost));return te.setRGB(I[0],I[1],I[2]),F.setRGB(R[0],R[1],R[2]),s.hitsGround=f,s}function se(t,n,r,i=new e){let a=ae(ie.set(0,P.planetRadius+Math.max(1,n),0),t,24,L),o=P.betaR,s=P.betaO,c=(P.betaM+P.betaMA)*r,l=a*Math.exp(-(o[0]*L[0]+c*L[1]+s[0]*L[2])),u=a*Math.exp(-(o[1]*L[0]+c*L[1]+s[1]*L[2])),d=a*Math.exp(-(o[2]*L[0]+c*L[1]+s[2]*L[2]));return i.setRGB(l,u,d)}function ce(e){return[0,31,59,90,120,151,181,212,243,273,304,334][T((e.month||6)-1,0,11)]+T(e.day||1,1,31)}function z(e){return 23.44*y*Math.sin(2*Math.PI*(284+e)/365)}function B(e,t,r=new n){let i=Math.cos(e);return r.set(i*Math.sin(t),Math.sin(e),-i*Math.cos(t))}function V(e,t,n){let r=Math.sin(n)*Math.sin(e)+Math.cos(n)*Math.cos(e)*Math.cos(t),i=Math.asin(T(r,-1,1)),a=Math.max(1e-6,Math.cos(i)),o=(Math.sin(e)-Math.sin(i)*Math.sin(n))/(a*Math.cos(n)),s=Math.acos(T(o,-1,1));return Math.sin(t)>0&&(s=2*Math.PI-s),{alt:i,az:s}}function le(e,t,r,i={}){let a=r*y,o=z(t),s=(e-12)*15*y,c=V(o,s,a);i.sunAltitude=c.alt,i.sunAzimuth=c.az,i.sunDir=B(c.alt,c.az,i.sunDir||new n);let l=((t+e/24)*1+12.6)%29.53,u=l/29.53*2*Math.PI;i.moonPhase=l/29.53,i.moonIllumination=.5*(1-Math.cos(u));let d=V(23.44*y*Math.sin(2*Math.PI*(284+t)/365+u)*1.1,s-u,a);return i.moonAltitude=d.alt,i.moonAzimuth=d.az,i.moonDir=B(d.alt,d.az,i.moonDir||new n),i.siderealAngle=(e/24*2*Math.PI+t/365.25*2*Math.PI+1.7)%(2*Math.PI),i}function ue(e){let t=[[-90,3.15],[-14,3.15],[-10,3.1],[-8,3],[-6,2.82],[-5,2.66],[-4,2.48],[-3,2.25],[-2,2.02],[-1,1.85],[0,2.14],[2,2.09],[4,2.03],[6,1.93],[10,1.75],[18,1.52],[30,1.37],[90,1.37]];for(let n=1;n<t.length;n++)if(e<=t[n][0]){let r=k(t[n-1][0],t[n][0],e);return C(t[n-1][1],t[n][1],r)}return t[t.length-1][1]}function de(e){return O(1-k(-1,3,e))}var fe=e=>.2126*e.r+.7152*e.g+.0722*e.b,pe=256,me=.7;function he(e,t,n,r){switch(e){case 0:return r.set(1,-n,-t);case 1:return r.set(-1,-n,t);case 2:return r.set(t,1,n);case 3:return r.set(t,-1,-n);case 4:return r.set(t,-n,1);default:return r.set(-t,-n,-1)}}function ge(e){let r=w(e^22337),i=new te(e^2513),a=pe,s=[];for(let e=0;e<6;e++)s.push(new Float32Array(a*a*3));let c=62.9*Math.PI/180,l=r()*Math.PI*2,f=new n(0,Math.cos(c),Math.sin(c)).applyAxisAngle(new n(0,1,0),l).normalize(),p=new n(1,0,0).applyAxisAngle(new n(0,1,0),l);p.sub(f.clone().multiplyScalar(p.dot(f))).normalize();let m=new n().crossVectors(f,p).normalize(),h=[],g=new n;for(let e=0;e<6;e++){let t=new Float32Array(27648);for(let n=0;n<96;n++)for(let r=0;r<96;r++){he(e,2*(r+.5)/96-1,2*(n+.5)/96-1,g).normalize();let a=Math.asin(_.clamp(g.dot(f),-1,1)),o=Math.atan2(g.dot(m),g.dot(p)),s=Math.exp(-(o*o)/(1.1*.55)),c=.085+.12*s,l=Math.exp(-(a*a)/(2*c*c)),u=Math.exp(-(a*a)/.18)*.16,d=.55+.45*i.fbm2D(o*2.2+3.1,a*9,4),h=i.fbm2D(o*5.5-7,a*22+2,4),v=_.smoothstep(h,.05,.55)*(.6+.4*s)*l,y=(l*(.6+1.2*s)*d+u)*(1-.9*v);y=Math.max(0,y)*.3;let b=s*.5+.2;t[(n*96+r)*3]=y*(.86+.16*b),t[(n*96+r)*3+1]=y*(.88+.06*b),t[(n*96+r)*3+2]=y*(1-.18*b)}h.push(t)}for(let e=0;e<6;e++){let t=h[e],n=s[e];for(let e=0;e<a;e++){let r=(e+.5)/a*96-.5,i=Math.max(0,Math.floor(r)),o=Math.min(95,i+1),s=Math.min(1,Math.max(0,r-i));for(let r=0;r<a;r++){let c=(r+.5)/a*96-.5,l=Math.max(0,Math.floor(c)),u=Math.min(95,l+1),d=Math.min(1,Math.max(0,c-l)),f=(e*a+r)*3;for(let e=0;e<3;e++){let r=t[(i*96+l)*3+e]*(1-d)+t[(i*96+u)*3+e]*d,a=t[(o*96+l)*3+e]*(1-d)+t[(o*96+u)*3+e]*d;n[f+e]=r*(1-s)+a*s}}}}let v=[];for(let e=0;e<6;e++){let n=s[e],r=new Uint8Array(a*a*4);for(let e=0;e<a*a;e++){let t=n[e*3],i=n[e*3+1],a=n[e*3+2],o=Math.max(t,i,a,1e-6),s=Math.min(1,o/me);r[e*4]=Math.round(t/o*255),r[e*4+1]=Math.round(i/o*255),r[e*4+2]=Math.round(a/o*255),r[e*4+3]=Math.round(s*255)}let i=new u(r,a,a,t,d);v.push(i)}let y=new o(v);return y.format=t,y.type=d,y.colorSpace=``,y.minFilter=b,y.magFilter=b,y.generateMipmaps=!1,y.flipY=!1,y.needsUpdate=!0,y}function _e(e){let n=w(e^14974),r=new te(e^119),i=new Uint8Array(524288),a=new Float32Array(131072);for(let e=0;e<256;e++){let t=(e+.5)/256*Math.PI;for(let n=0;n<512;n++){let i=(n+.5)/512*Math.PI*2,o=Math.sin(t)*Math.cos(i),s=Math.cos(t),c=Math.sin(t)*Math.sin(i),l=.5+.5*r.noise3D(o*3.1,s*3.1,c*3.1)*.5+.5*r.noise3D(o*9,s*9,c*9)*.25,u=r.noise3D(o*1.6+5,s*1.6,c*1.6-3)*.6+r.noise3D(o*3.5,s*3.5+2,c*3.5)*.4,d=_.smoothstep(u,.12,.42);a[e*512+n]=_.lerp(.62+.14*(l-.5),.34+.05*(l-.5),d)}}for(let e=0;e<180;e++){let e=n()*512,t=n()*256,r=2+n()**2.2*26,i=.25+n()*.35,o=Math.ceil(r*1.5);for(let n=-o;n<=o;n++){let s=Math.round(t+n);if(s<0||s>=256)continue;let c=1/Math.max(.25,Math.sin((s+.5)/256*Math.PI));for(let t=-o*c;t<=o*c;t++){let o=(Math.round(e+t)%512+512)%512,l=Math.hypot(t/c,n)/r;if(l>1.5)continue;let u=s*512+o,d=0;d=l<.85?-i*(1-l*l*.5):l<1.05?.22*(1-Math.abs(l-.95)/.1):-.04*(1-(l-1.05)/.45),a[u]=Math.max(.05,Math.min(1,a[u]+d*.5))}}}for(let e=0;e<131072;e++){let t=Math.round(Math.min(1,Math.max(0,a[e]))*255);i[e*4]=t,i[e*4+1]=t,i[e*4+2]=t,i[e*4+3]=255}let o=new u(i,512,256,t,d);return o.colorSpace=``,o.wrapS=S,o.wrapT=x,o.minFilter=h,o.magFilter=b,o.generateMipmaps=!0,o.needsUpdate=!0,o}var H=e=>Number.isInteger(e)?e.toFixed(1):String(e),U=`
const float PI = 3.14159265359;
const float R_PLANET = ${H(P.planetRadius)};
const float R_ATMOS = ${H(P.atmosphereRadius)};
const vec3 BETA_R = vec3(${P.betaR.join(`, `)});
const float BETA_M = ${P.betaM};
const float BETA_MA = ${P.betaMA};
const vec3 BETA_O = vec3(${P.betaO.join(`, `)});
const float H_R = ${H(P.HR)};
const float H_M = ${H(P.HM)};
const float MIE_G = ${P.mieG};
const float SCATTER_BOOST = ${P.scatterBoost};
const float MIE_BOOST = ${P.mieBoost};
const float MS_K = ${P.msK};
const vec3 MS_SPECTRUM = vec3(${P.msSpectrum.join(`, `)});
const float MS_SUN_ATTEN = ${P.msSunAtten};

vec2 raySphere(vec3 ro, vec3 rd, float R) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - R * R;
  float h = b * b - c;
  if (h < 0.0) return vec2(-1.0);
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}
vec3 atmDensities(float h) {
  return vec3(exp(-h / H_R), exp(-h / H_M), max(0.0, 1.0 - abs(h - 25000.0) / 15000.0));
}
float phaseHG(float mu, float g) {
  float g2 = g * g;
  return (1.0 - g2) / (4.0 * PI * pow(1.0 + g2 - 2.0 * g * mu, 1.5));
}
float phaseRayleigh(float mu) { return 3.0 / (16.0 * PI) * (1.0 + mu * mu); }

// optical depth [R,M,O] from p toward light L, returns soft planet occlusion in .w
vec4 opticalDepthToLight(vec3 p, vec3 L, int steps) {
  float b = -dot(p, L);
  float occl = 1.0;
  if (b > 0.0) {
    float hmin = length(p + L * b) - R_PLANET;
    occl = smoothstep(-75000.0, 1500.0, hmin); // soft terminator ≈ multiple-scattering twilight glow
  }
  if (occl <= 0.0) return vec4(0.0);
  float tFar = raySphere(p, L, R_ATMOS).y;
  float ds = tFar / float(steps);
  vec3 od = vec3(0.0);
  for (int i = 0; i < steps; i++) {
    vec3 q = p + L * ((float(i) + 0.5) * ds);
    od += atmDensities(max(0.0, length(q) - R_PLANET)) * ds;
  }
  return vec4(od, occl);
}

struct SkySample { vec3 radiance; vec3 transmittance; bool ground; };

// Single scattering along rd from altitude alt. Quadratic sample spacing (dense near the camera).
SkySample skyScatter(vec3 rd, float alt, vec3 sunDir, vec3 sunE, vec3 moonDir, float moonE, float turbidity, float scatterBoost, int N, int LSTEPS) {
  vec3 ro = vec3(0.0, R_PLANET + max(alt, 1.0), 0.0);
  float tmax = raySphere(ro, rd, R_ATMOS).y;
  vec2 tp = raySphere(ro, rd, R_PLANET);
  bool ground = tp.x > 0.0;
  if (ground) tmax = tp.x;
  float bM = BETA_M * turbidity;
  float bME = (BETA_M + BETA_MA) * turbidity;
  float muS = dot(rd, sunDir);
  float phRS = phaseRayleigh(muS), phMS = phaseHG(muS, MIE_G);
  float muM = dot(rd, moonDir);
  float phRM = phaseRayleigh(muM), phMM = phaseHG(muM, MIE_G);
  vec3 sumRS = vec3(0.0), sumMS = vec3(0.0), sumRM = vec3(0.0), sumMM = vec3(0.0), sumMSR = vec3(0.0);
  vec3 od = vec3(0.0);
  bool hasMoon = moonE > 1e-5;
  for (int i = 0; i < N; i++) {
    float s0 = float(i) / float(N), s1 = float(i + 1) / float(N);
    float t0 = tmax * s0 * s0, t1 = tmax * s1 * s1;
    float ds = t1 - t0;
    vec3 p = ro + rd * (0.5 * (t0 + t1));
    vec3 dens = atmDensities(max(0.0, length(p) - R_PLANET));
    od += dens * ds;
    vec4 odL = opticalDepthToLight(p, sunDir, LSTEPS);
    if (odL.w > 0.0) {
      vec3 tauCam = BETA_R * od.x + bME * od.y + BETA_O * od.z;
      vec3 tauSun = BETA_R * odL.x + bME * odL.y + BETA_O * odL.z;
      vec3 att = exp(-(tauCam + tauSun)) * odL.w;
      sumRS += att * dens.x * ds;
      sumMS += att * dens.y * ds;
      // multiple scattering: sky-lit (white-blue) in-scatter along the camera path, only mildly sun-coloured
      sumMSR += exp(-tauCam - (BETA_R * odL.x + bME * odL.y) * MS_SUN_ATTEN) * odL.w * dens.x * ds;
    }
    if (hasMoon) {
      vec4 odM = opticalDepthToLight(p, moonDir, LSTEPS);
      if (odM.w > 0.0) {
        vec3 tau = BETA_R * (od.x + odM.x) + bME * (od.y + odM.y) + BETA_O * (od.z + odM.z);
        vec3 att = exp(-tau) * odM.w;
        sumRM += att * dens.x * ds;
        sumMM += att * dens.y * ds;
      }
    }
  }
  SkySample s;
  s.transmittance = exp(-(BETA_R * od.x + bME * od.y + BETA_O * od.z));
  s.radiance = sunE * (sumRS * BETA_R * phRS * scatterBoost + sumMS * bM * phMS * MIE_BOOST + sumMSR * BETA_R * MS_SPECTRUM * MS_K);
  if (hasMoon) s.radiance += moonE * (sumRM * BETA_R * phRM * scatterBoost + sumMM * bM * phMM * MIE_BOOST);
  s.ground = ground;
  return s;
}
`,ve=`
varying vec3 vDir;
void main() {
  vDir = normalize(mat3(modelMatrix) * position);
  vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  clip.z = clip.w * 0.999999; // always at the far plane; depth test rejects covered pixels
  gl_Position = clip;
}
`,ye=`
${U}
varying vec3 vDir;
out vec4 fragColor;
uniform vec3 uCamPos;
uniform vec3 uSunDir;        // toward the sun
uniform vec3 uMoonDir;       // toward the moon
uniform vec3 uSunE;          // sun irradiance at top of atmosphere (rgb)
uniform float uMoonE;        // moon irradiance used for sky scattering
uniform float uTurbidity;
uniform float uEnvMode;      // 1 while rendering the reflection probe
uniform vec3 uHorizonColor;  // used below the horizon in the main pass
uniform vec3 uGroundRadiance;// used below the horizon in env mode
uniform vec3 uNightGlow;     // airglow floor
uniform float uNightAmount;
uniform mat3 uStarRot;       // world → celestial frame
uniform samplerCube uStars;
uniform float uStarIntensity;
uniform float uStarSeed;
uniform sampler2D uMoonTex;
uniform float uMoonRadius;   // angular radius (rad)
uniform float uMoonBright;   // radiance multiplier for the disc
uniform float uSunRadius;
uniform float uSunDisc;      // disc radiance scale
uniform float uCloudCover;   // dims stars slightly under a deck (clouds are drawn separately)
uniform float uTime;
uniform float uSkyFog;       // 0..1: how much the dome dissolves into the (luminous) fog colour
uniform vec4 uFogSun;        // xyz toward the sun, w = strength of the sun glow seen through fog
uniform float uGlowKnee;     // soft-knee luminance for the in-scatter glow around the sun (main pass)
uniform float uSkySat;       // saturation lift (AgX desaturates bright colours; higher at low sun)
uniform float uTwilight;     // 0..1 civil/nautical twilight: adds the anti-solar purple belt + solar-side warm belt
uniform float uScatterBoost; // Rayleigh multiple-scattering compensation (lower at low sun: the glow stays a gradient)
uniform vec3 uSunTint;       // disc tint (low sun: 2200 K so the tonemapper lands orange, not white)
uniform float uMilkyWay;     // Milky Way gain (falls with moonlight / cloud cover)

// --- procedural star field on the celestial sphere (cube-face grid, 3x3 neighbourhood) ---
vec4 hash4(vec3 p) {
  vec4 q = vec4(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)), dot(p, vec3(419.2, 371.9, 43.7)));
  return fract(sin(q) * 43758.5453123);
}
vec3 starField(vec3 sd) {
  vec3 a = abs(sd);
  float faceId; vec2 uv;
  if (a.x >= a.y && a.x >= a.z) { faceId = sd.x > 0.0 ? 0.0 : 1.0; uv = vec2(-sd.z * sign(sd.x), -sd.y) / a.x; }
  else if (a.y >= a.z) { faceId = sd.y > 0.0 ? 2.0 : 3.0; uv = vec2(sd.x, sd.z * sign(sd.y)) / a.y; }
  else { faceId = sd.z > 0.0 ? 4.0 : 5.0; uv = vec2(sd.x * sign(sd.z), -sd.y) / a.z; }
  const float GRID = 72.0;
  vec2 g = (uv * 0.5 + 0.5) * GRID;
  vec2 cell = floor(g);
  float px = clamp(length(fwidth(g)), 1e-4, 0.25); // one screen pixel in grid units (clamped: fwidth explodes on face seams)
  vec3 acc = vec3(0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      if (c.x < 0.0 || c.y < 0.0 || c.x >= GRID || c.y >= GRID) continue; // each cell belongs to exactly one face
      vec4 h = hash4(vec3(c, faceId * 17.0 + uStarSeed));
      if (h.z > 0.50) continue; // star density
      vec2 sp = c + 0.1 + 0.8 * h.xy;
      float d = length(g - sp);
      vec4 h2 = hash4(vec3(c + 31.0, faceId * 5.0 + uStarSeed));
      float mag = pow(h2.x, 7.0);                 // brightness distribution: many faint, few bright
      float bright = 0.05 + mag * 4.0 + pow(h2.x, 40.0) * 6.0;
      float size0 = 0.018 + mag * 0.05;          // angular size in grid units
      float size = max(size0, px * 0.8);         // never thinner than a pixel
      float e = bright * clamp(size0 / size, 0.35, 1.0); // partial energy conservation: faint stars stay visible
      float sIn = exp(-(d * d) / (size * size));
      // colour by spectral class
      vec3 col = h2.y < 0.22 ? vec3(0.70, 0.80, 1.0) : h2.y < 0.72 ? vec3(0.94, 0.96, 1.0) : h2.y < 0.93 ? vec3(1.0, 0.95, 0.88) : vec3(1.0, 0.85, 0.70);
      float tw = 1.0 + 0.25 * sin(uTime * (3.0 + 5.0 * h2.z) + h2.w * 40.0);
      acc += col * e * sIn * tw;
    }
  }
  return acc * 0.92;
}

vec3 moonDisc(vec3 rd, vec3 T) {
  float cosA = dot(rd, uMoonDir);
  float ang = acos(clamp(cosA, -1.0, 1.0));
  if (ang > uMoonRadius) return vec3(0.0);
  // local basis on the disc
  vec3 up = abs(uMoonDir.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 right = normalize(cross(up, uMoonDir));
  vec3 upv = cross(uMoonDir, right);
  float x = dot(rd, right) / uMoonRadius;
  float y = dot(rd, upv) / uMoonRadius;
  float r2 = x * x + y * y;
  float z = sqrt(max(0.0, 1.0 - r2));
  vec3 n = normalize(-uMoonDir * z + right * x + upv * y); // surface normal (toward viewer = -moonDir)
  float ndl = max(0.0, dot(n, uSunDir));
  // phase-consistent texture lookup (fixed lunar face, rotated with the disc basis)
  vec2 uv = vec2(atan(x, z) / (2.0 * PI) + 0.5, acos(clamp(y, -1.0, 1.0)) / PI);
  float alb = texture2D(uMoonTex, uv).r;
  alb = 0.42 + 0.58 * alb;                       // maria vs highlands: keep the map's contrast off the clip point
  float edge = 1.0 - smoothstep(0.985, 1.0, sqrt(r2));
  // limb darkening (Lommel-Seeliger-ish): the real disc is brightest at the sub-solar point and falls at the rim
  float limb = 0.62 + 0.38 * pow(max(z, 0.0), 0.42);
  // earthshine keeps the dark side barely visible
  float light = ndl * limb + 0.012;
  // 0.30: at uMoonBright 2 and a night exposure of 3.15 the disc used to land at 6 display units, i.e. a clipped
  // white circle with neither the terminator nor the maria visible (r3 critic). This lands the sub-solar point
  // just over 1.0 so AgX still reads it as the brightest object in frame, with the surface intact.
  return vec3(alb) * light * uMoonBright * 0.30 * T * edge;
}

void main() {
  vec3 rd = normalize(vDir);
  float alt = uCamPos.y;
  bool envMode = uEnvMode > 0.5;
  int N = envMode ? 8 : 12;
  int L = envMode ? 4 : 5;
  vec3 color;
  if (rd.y < -0.002) {
    // below the horizon: distant haze (main pass) or lit ground (reflection probe)
    if (envMode) color = mix(uHorizonColor, uGroundRadiance, smoothstep(0.0, -0.22, rd.y));
    else color = uHorizonColor;
    fragColor = vec4(color, 1.0);
    return;
  }
  vec3 rdSky = rd;
  rdSky.y = max(rdSky.y, 0.0005);
  rdSky = normalize(rdSky);
  // the reflection probe carries no sun disc, so also damp the forward Mie glow there (direct light is the CSM sun)
  SkySample s = skyScatter(rdSky, alt, uSunDir, uSunE, uMoonDir, uMoonE, envMode ? uTurbidity * 0.4 : uTurbidity, uScatterBoost, N, L);
  color = s.radiance;
  // probe: damp the low-elevation band so the diffuse irradiance is dominated by the (blue) upper sky — shadows at
  // golden hour stay cool against the amber key instead of a beige wash. Under fog / heavy overcast the medium IS
  // the light source, so the damping is lifted (otherwise the probe keeps a blue sky the frame no longer shows).
  if (envMode) color *= mix(mix(0.45, 1.0, uSkyFog), 1.0, smoothstep(0.0, 0.45, rd.y));
  // twilight belts (the missing multiple scattering of the single-scatter model): a warm amber/rose belt on the
  // solar side and the blue-violet "belt of Venus" opposite, both fading with elevation
  if (uTwilight > 0.001) {
    vec3 sunH = normalize(vec3(uSunDir.x, 0.0, uSunDir.z) + vec3(1e-4, 0.0, 0.0));
    float az = dot(normalize(vec3(rd.x, 0.0, rd.z) + vec3(1e-4, 0.0, 0.0)), sunH);
    float belt = exp(-max(rd.y, 0.0) * 9.0);
    float solar = smoothstep(-0.2, 1.0, az);
    vec3 warm = vec3(0.30, 0.13, 0.05) * pow(solar, 1.5) * belt;
    vec3 venus = vec3(0.045, 0.03, 0.075) * (1.0 - solar) * exp(-max(rd.y, 0.0) * 5.0);
    vec3 dusk = vec3(0.016, 0.028, 0.085) * (1.0 - 0.5 * rd.y); // twilight zenith: deep saturated blue
    color += (warm + venus + dusk) * uTwilight;
  }
  // soft knee on the in-scatter glow around a low sun: the disc stays the brightest thing, the glow
  // stays a glow instead of a wall that the tonemapper flattens to white
  {
    float knee = envMode ? 0.55 : uGlowKnee; // the IBL probe gets a tighter knee so the glow never dominates the ambient
    float l0 = dot(color, vec3(0.2126, 0.7152, 0.0722));
    if (l0 > knee) color *= (knee + (l0 - knee) / (1.0 + (l0 - knee) / knee)) / l0;
  }
  // saturation lift (AgX desaturates bright blues / oranges)
  color = max(mix(vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), color, uSkySat), 0.0);
  // airglow / starlight floor: dark saturated blue night, brighter toward the horizon
  color += uNightGlow * uNightAmount * (1.0 + 1.4 * (1.0 - rd.y));

  // stars: procedural (pixel-exact) + baked Milky Way cube; attenuated by transmittance, washed out by sky brightness
  vec3 sd = uStarRot * rd;
  float skyLum = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float wash = exp(-skyLum * 10.0);
  vec4 mw = textureCube(uStars, sd);
  vec3 stars = mw.rgb * (mw.a * ${H(me)} * 2.4 * uMilkyWay) + starField(sd);
  color += stars * uStarIntensity * wash * s.transmittance * (1.0 - 0.6 * uCloudCover);

  // moon + soft halo (forward scattering of moonlight by haze)
  color += moonDisc(rd, s.transmittance);
  {
    float cosM = dot(rd, uMoonDir);
    // tight corona + haze aureole + a wide moonlit-sky lift so the moon is felt even when the disc is out of frame
    float halo = exp(-(1.0 - cosM) * 900.0) * 0.06 + exp(-(1.0 - cosM) * 60.0) * 0.007 + exp(-(1.0 - cosM) * 11.0) * 0.0032;
    color += halo * uMoonBright * vec3(0.7, 0.8, 1.0) * s.transmittance * step(0.0, uMoonDir.y);
  }

  if (!envMode) {
    // sun disc with limb darkening
    float cosS = dot(rd, uSunDir);
    float angS = acos(clamp(cosS, -1.0, 1.0));
    if (angS < uSunRadius) {
      float q = angS / uSunRadius;
      float limb = 1.0 - 0.55 * (1.0 - sqrt(max(0.0, 1.0 - q * q)));
      float edge = 1.0 - smoothstep(0.93, 1.0, q);
      color += uSunDisc * uSunTint * limb * edge * s.transmittance;
    }
    // soft blend into the haze band right at the horizon
    color = mix(uHorizonColor, color, smoothstep(0.0, 0.012, rd.y));
  }
  // dense fog / overcast: the sky dissolves into the luminous fog colour (high-key by day), with a soft glow
  // toward the sun so the frame keeps a light direction
  if (uSkyFog > 0.001) {
    // flat profile: at skyFog 0.9 even the zenith is 80 % milk, so the PMREM probe and the visible dome agree
    float fogMix = uSkyFog * (0.72 + 0.28 * exp(-max(rd.y, 0.0) * 4.0));
    float glow = uFogSun.w * pow(max(dot(rd, uFogSun.xyz), 0.0), 10.0);
    color = mix(color, uHorizonColor * (1.0 + glow), clamp(fogMix, 0.0, 1.0));
  }
  fragColor = vec4(color, 1.0);
}
`,be=ve,W=`
varying vec3 vDir;
out vec4 fragColor;
uniform vec3 uCamPos;
uniform vec3 uLightDir;      // toward the dominant light (sun or moon)
uniform vec3 uLightColor;    // irradiance at cloud altitude
uniform vec3 uAmbientTop;
uniform vec3 uAmbientBottom;
uniform vec3 uAmbientSunSide;// warm horizon radiance on the sun side (golden hour), lights bases / sun-facing flanks
uniform vec3 uHazeColor;
uniform float uHazeDensity;
uniform float uCoverage;     // 0..1 weather coverage
uniform float uCloudType;    // 0 stratus .. 1 cumulus
uniform float uDensity;      // extinction scale (1/m at full density)
uniform float uPrecip;       // darkens bases
uniform float uCloudBase;
uniform float uCloudTop;
uniform float uCurvatureRadius;
uniform vec3 uWindOffset;    // metres
uniform vec2 uWindDir;       // unit XZ wind direction (cirrus streaks)
uniform float uTime;
uniform float uEnvMode;
uniform int uSteps;
uniform int uLightSteps;
uniform sampler3D uNoise;
uniform sampler2D uWeather;
uniform sampler2D uCirrus;   // R fibrous streak noise, G broad patches (both rank-equalised)
uniform float uCirrusCover;  // 0..1
uniform float uCirrusAlt;    // metres
uniform float uCirrusScale;  // metres per cirrus tile
uniform float uWeatherScale; // metres per weather tile
uniform float uBaseScale;    // metres per base-noise tile
uniform float uDetailScale;
// temporal accumulation (main pass only)
uniform sampler2D uHistory;
uniform mat4 uPrevViewProj;  // previous frame projection * rotation-only view
uniform float uHistoryWeight;
uniform int uFrame;
uniform float uPixelAngle;   // radians per render-target pixel
uniform int uDebug;          // 0 off, 1 fixed jitter, 2 no detail erosion, 3 no weather-map base shift / column tops
uniform float uScatterGain;  // in-scatter gain: sunlit cumulus must be the brightest thing in a daylight frame
uniform float uBaseJitter;   // per-column base-height jitter as a fraction of the shell thickness

const float PI = 3.14159265359;

float remap01(float v, float a, float b) { return clamp((v - a) / (b - a), 0.0, 1.0); }
float hg(float mu, float g) { float g2 = g * g; return (1.0 - g2) / (4.0 * PI * pow(1.0 + g2 - 2.0 * g * mu, 1.5)); }

vec2 raySphere(vec3 ro, vec3 rd, float R) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - R * R;
  float h = b * b - c;
  if (h < 0.0) return vec2(-1.0);
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}

// weather-map coverage → local cloud coverage; the covered sky fraction tracks uCoverage. Wide ramp: the
// coverage field itself shapes the cloud (thin ragged fringe → dense core)
float coverageAt(vec4 w) {
  float th = 1.0 - uCoverage;
  return smoothstep(th - 0.08, th + 0.20, w.r + (w.b - 0.5) * 0.28);
}

// per-column top (fraction of the shell thickness): small patches stay flatter, big fronts tower
float columnTop(float cov, vec4 w2) {
  return clamp(mix(0.44, 1.05, pow(cov, 0.5)) * mix(0.60, 1.30, w2.b), 0.18, 1.0);
}
// per-column base height offset (fraction of the shell thickness): two decorrelated weather octaves so the deck
// never sits on one plane — the r2 critic's 'row of pancakes with a shared dead-flat base'
// per-cloud base wobble: the weather map is km-scale, so on its own every cumulus in a row is still cut off by
// the same base plane (the r3 critic's 'dead-flat horizontal base'). Two decorrelated sine lattices at ~620 m and
// ~290 m give each cell its own base height at no texture cost.
float baseWobble(vec2 pw) {
  vec2 q = pw * (1.0 / 620.0);
  float a = sin(q.x * 1.7 + sin(q.y * 1.3) * 2.1) * cos(q.y * 1.9 - sin(q.x * 0.7) * 1.7);
  vec2 r = pw * (1.0 / 291.0);
  float b = sin(r.x * 2.3 - cos(r.y * 1.1) * 1.9) * cos(r.y * 1.5 + sin(r.x * 1.3) * 1.3);
  return a * 0.64 + b * 0.36;
}
float columnBase(vec4 wHi, vec4 w2, vec2 pw) {
  float km = (wHi.b - 0.5) * 0.62 + (w2.g - 0.5) * 0.38;
  return (km * 1.30 + baseWobble(pw) * 0.42) * 2.0 * uBaseJitter;
}
// per-pixel, per-frame white jitter (no spatial structure: the exponential history leaves no stripes behind)
float jitterHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// vertical profile in normalised column height hn (0 = base, 1 = local top): flat dense base, rounded top
float heightGradient(float hn, float type) {
  float stratus = smoothstep(0.0, 0.06, hn) * (1.0 - smoothstep(0.25, 0.65, hn));
  float cumulus = smoothstep(0.0, 0.16, hn) * (1.0 - smoothstep(0.52, 1.0, hn));
  return mix(stratus, cumulus, type);
}

// mip level for a noise tile of scale metres (64 texels) seen at distance t: footprint in texels → log2.
// aniso: at grazing elevations adjacent pixel ROWS sample the layer hundreds of metres apart while columns are metres
// apart — the vertical footprint is 1/sin(elevation) larger, and without this the far deck aliases into stripes
float noiseLod(float t, float scale, float pixAng, float aniso) {
  if (uDebug == 4) return 0.0;
  if (uDebug == 5) return 2.0;
  return log2(max(1.0, t * pixAng * aniso * 64.0 / scale));
}

// density at world position p; hn = normalised column height; detail in [0,1] scales the erosion samples;
// lodB / lodD: explicit mip levels for the base / detail lookups (far clouds must not alias into dashes)
float cloudDensity(vec3 p, float hn, float weatherCov, float cloudType, float detail, float lodB, float lodD) {
  vec3 q = (p + uWindOffset) / uBaseScale;
  q.y *= 0.85; // near-isotropic: cumulus heaps, not smeared sheets
  vec4 n = textureLod(uNoise, q, lodB);
  float lowFbm = n.g * 0.625 + n.b * 0.25 + n.a * 0.125;
  float base = remap01(n.r, -(1.0 - lowFbm) * 0.85, 1.0);
  float type = clamp(mix(0.15, 0.95, uCloudType) * (0.42 + 1.16 * cloudType), 0.05, 1.0);
  // ragged base: the height gradient alone cuts every column off at exactly the same plane (the r2 critic's
  // 'row of pancakes'). n.b is the 16-cell Worley octave (~350 m cells) already fetched above, so this wobbles
  // the base and the cap by +/- 11 % of the column for free.
  float wob = (n.b - 0.5) * 0.22;
  base *= heightGradient(clamp(hn - wob, 0.0, 1.0), type);
  // coverage carves the base shape; density grows with height (bases wispy, cores dense)
  float dens = remap01(base, 1.0 - weatherCov, 1.0) * weatherCov;
  dens *= mix(0.65, 1.0, smoothstep(0.0, 0.35, hn));
  if (detail > 0.001 && dens > 0.0) {
    vec3 qd = (p + uWindOffset * 0.6 + vec3(uTime * 6.0, uTime * 1.5, 0.0)) / uDetailScale;
    vec4 hn4 = textureLod(uNoise, qd, lodD);
    float hfbm = hn4.g * 0.625 + hn4.b * 0.25 + hn4.a * 0.125;
    // wispy erosion at the base (subtract fbm), billowy at the top (subtract inverted fbm)
    float erode = mix(hfbm, 1.0 - hfbm, clamp(hn * 5.0, 0.0, 1.0));
    float strength = mix(0.66, 0.46, smoothstep(0.1, 0.5, hn)) * detail;
    dens = remap01(dens, erode * strength, 1.0);
    // cauliflower: two high-frequency Worley octaves (3.1x and 6.4x the detail tile) biting into the silhouette.
    // The bite scales with sqrt(coverage) so dense cores stay solid while fringes break into billows.
    if (dens > 0.0 && dens < 0.72) {
      float edge = 1.0 - dens / 0.72;
      float bite = detail * sqrt(clamp(weatherCov, 0.0, 1.0)) * edge;
      float f1 = textureLod(uNoise, qd * 3.1 + vec3(0.21, 0.57, 0.13), lodD + 1.63).a;
      float f2 = textureLod(uNoise, qd * 6.4 + vec3(0.73, 0.11, 0.47), lodD + 2.68).a;
      dens = remap01(dens, ((1.0 - f1) * 0.30 + (1.0 - f2) * 0.16) * bite, 1.0);
    }
  }
  return dens;
}

void main() {
  vec3 rd = normalize(vDir);
  vec3 ro = uCamPos;
  bool envMode = uEnvMode > 0.5;
  if (rd.y < -0.02) discard;
  // spherical shell centred below the camera → clouds curve down to the horizon
  vec3 C = vec3(ro.x, -uCurvatureRadius, ro.z);
  vec3 roC = ro - C;
  float rIn = uCurvatureRadius + uCloudBase;
  float rOut = uCurvatureRadius + uCloudTop;
  float camR = length(roC);
  float tStart, tEnd;
  vec2 tIn = raySphere(roC, rd, rIn);
  vec2 tOut = raySphere(roC, rd, rOut);
  bool hasShell = true;
  if (camR < rIn) { tStart = tIn.y; tEnd = tOut.y; }
  else if (camR < rOut) { tStart = 0.0; tEnd = (tIn.x > 0.0) ? tIn.x : tOut.y; }
  else { if (tOut.x < 0.0) hasShell = false; tStart = tOut.x; tEnd = (tIn.x > 0.0) ? tIn.x : tOut.y; }
  if (tEnd <= tStart) hasShell = false;
  float maxLen = 22000.0;
  tEnd = min(tEnd, tStart + maxLen);
  float pathLen = max(tEnd - tStart, 1.0);

  float mu = dot(rd, uLightDir);
  float thick = uCloudTop - uCloudBase;
  vec3 col = vec3(0.0);
  float T = 1.0;
  float firstHitT = -1.0;
  float sigma = uDensity;
  vec2 weatherOfs = uWindOffset.xz * 0.35;
  // interleaved gradient noise + golden-ratio temporal offset: every frame marches a different start offset and
  // the history buffer integrates them. The probe (no history) uses a fixed offset so the PMREM stays noise-free.
  // stratified temporal jitter: per-pixel random phase + golden-ratio sequence over frames (converges far faster
  // than white noise under the exponential history)
  float ign = (envMode || uDebug == 1) ? 0.5 : fract(jitterHash(gl_FragCoord.xy) + 0.61803398875 * float(uFrame));
  float pixAng = envMode ? 0.0035 : uPixelAngle;
  // anisotropic footprint at grazing elevations (see noiseLod); the layer curves down with the shell so use the
  // elevation relative to the shell tangent at the entry point
  float elev = clamp(abs(rd.y) + tStart / (2.0 * uCurvatureRadius), 0.03, 1.0);
  float aniso = pow(1.0 / elev, 0.6);

  if (hasShell && uCoverage > 0.003) {
    // step budget scales with the path length (grazing rays are long) up to a hard cap
    float targetStep = 5200.0 / float(uSteps);  // ~160 m at 32 steps
    int steps = int(clamp(pathLen / targetStep, 16.0, envMode ? 16.0 : min(float(uSteps) * 2.0, 64.0)));
    float ds = pathLen / float(steps);
    float t = tStart + ds * ign;
    // phase: dual-lobe HG octaves (Hillaire) — forward lobe brightens sun-facing flanks, back lobe keeps the
    // anti-solar side from going black
    float ph0 = 4.0 * PI * mix(hg(mu, 0.72), hg(mu, -0.24), 0.40);
    float ph1 = 4.0 * PI * mix(hg(mu, 0.45), hg(mu, -0.14), 0.40);
    float ph2 = 4.0 * PI * mix(hg(mu, 0.26), hg(mu, -0.08), 0.40);
    ph0 = min(ph0, 3.0);
    // silver lining: a very narrow forward lobe that survives only through thin, sun-facing edges
    float silverPh = min(4.0 * PI * hg(mu, 0.93), 40.0);
    float stepScale = 1.0;
    int emptyRun = 0;
    for (int i = 0; i < 84; i++) {
      if (t >= tEnd) break;
      vec3 p = ro + rd * t;
      float h = length(p - C) - uCurvatureRadius;
      vec2 wuv = (p.xz + weatherOfs) / uWeatherScale;
      vec4 w = texture(uWeather, wuv);
      vec4 w2 = texture(uWeather, wuv * 0.41 + vec2(0.37, 0.61)); // large-scale column structure (top height)
      float cov = coverageAt(w);
      // grazing rays stack dozens of cells: thin the far field a little so a 25 %-cover sky keeps its blue gaps
      cov *= 1.0 - 0.5 * smoothstep(3000.0, 14000.0, t);
      float dens = 0.0;
      float hn = 0.0;
      if (cov > 0.01) {
        // ~1 km-scale lookup: neighbouring columns must get decorrelated bases, or the deck is one plane
        vec4 wHi = texture(uWeather, wuv * 2.7 + vec2(0.19, 0.83));
        float baseShift = uDebug == 3 ? 0.0 : columnBase(wHi, w2, p.xz) * thick;  // undulating, per-column cloud base
        float topF = uDebug == 3 ? 1.0 : columnTop(cov, w2);
        float hf = (h - uCloudBase - baseShift) / thick;
        hn = hf / topF;
        if (hn > 0.0 && hn < 1.0) {
          float detail = (envMode || uDebug == 2) ? 0.0 : 1.0 - smoothstep(12000.0, 24000.0, t); // detail erosion resolvable to ~15 km
          dens = cloudDensity(p, hn, cov, w.g, detail, noiseLod(t, uBaseScale, pixAng, aniso), noiseLod(t, uDetailScale, pixAng, aniso));
        }
      }
      if (dens > 0.002) {
        if (stepScale > 0.75) {
          // entered a cloud with a coarse step: back up and refine
          t -= ds * stepScale * 0.65;
          stepScale = 0.35;
          emptyRun = 0;
          continue;
        }
        emptyRun = 0;
        float dsl = ds * stepScale;
        if (firstHitT < 0.0) firstHitT = t;
        // light march toward the light (exponentially growing steps: fine near the sample, coarse far away)
        float odL = 0.0;
        vec3 lp = p;
        float ls = 34.0;
        for (int j = 0; j < 6; j++) {
          if (j >= uLightSteps) break;
          lp += uLightDir * ls;
          float lh = length(lp - C) - uCurvatureRadius;
          if (lh > uCloudTop + 200.0 || lh < uCloudBase - 200.0) break;
          vec2 lwuv = (lp.xz + weatherOfs) / uWeatherScale;
          vec4 lw = texture(uWeather, lwuv);
          vec4 lw2 = texture(uWeather, lwuv * 0.41 + vec2(0.37, 0.61));
          float lcov = coverageAt(lw);
          float ltopF = columnTop(lcov, lw2);
          vec4 lwHi = texture(uWeather, lwuv * 2.7 + vec2(0.19, 0.83));
          float lhn = ((lh - uCloudBase - columnBase(lwHi, lw2, lp.xz) * thick) / thick) / ltopF;
          if (lhn > 0.0 && lhn < 1.0) odL += cloudDensity(lp, lhn, lcov, lw.g, 0.0, noiseLod(t, uBaseScale, pixAng, aniso) + 0.5, 0.0) * ls;
          ls *= 1.9;
        }
        float tauL = odL * sigma * 0.55;
        // multiple-scattering approximation (Hillaire): octaves of attenuated single scattering
        float lightE = exp(-tauL) * ph0 + 0.45 * exp(-tauL * 0.42) * ph1 + 0.20 * exp(-tauL * 0.18) * ph2;
        // Beer-powder: the eye sees less in-scatter at the freshly lit surface of dense cloud (sun side only)
        float powder = 1.0 - 0.55 * exp(-2.4 * (dens * sigma * dsl + odL * sigma * 0.12)) * clamp(mu, 0.0, 1.0);
        lightE *= powder;
        // single scattering alone leaves cumulus a mid-grey smudge (the r2 critic's 'blurry smudges'): a real deck
        // is many-times-scattered and reads as the brightest surface in the frame. uScatterGain lifts it there, the
        // clamp keeps it from blowing the white point (auto-exposure would then sink the ground).
        lightE = min(lightE * uScatterGain, 5.2);
        lightE += min(silverPh * exp(-tauL * 2.2) * 0.34 * (1.0 - smoothstep(0.0, 0.5, dens)), 1.4);
        // sky ambient: top/bottom gradient, occluded by the cloud above; precipitation darkens the bases
        vec3 ambient = mix(uAmbientBottom, uAmbientTop, smoothstep(0.0, 0.75, hn)) * (1.0 - 0.45 * uPrecip * (1.0 - hn));
        ambient *= 0.46 + 0.54 * exp(-tauL * 0.55);
        // golden hour: the warm sun-side horizon lights bases and sun-facing flanks (exp(-tauL) ≈ "faces the sun").
        // Bases pick it up most (the belt is below them), which is what turns an evening deck orange from underneath.
        ambient += uAmbientSunSide * (0.35 + 1.15 * (1.0 - hn)) * (0.22 + 0.78 * exp(-tauL * 0.8));
        vec3 sctr = uLightColor * lightE * (1.0 / PI) + ambient;
        // optical step capped: grazing rays take 500 m+ steps, and an opaque hit-or-miss per sample is variance the
        // history cannot average — capping keeps the far deck soft and the accumulation converged in ~40 frames
        float aStep = 1.0 - exp(-dens * sigma * min(dsl, 260.0));
        col += sctr * aStep * T;
        T *= 1.0 - aStep;
        if (T < 0.02) break;
      } else {
        emptyRun++;
        if (emptyRun > 2) stepScale = 1.0;
      }
      t += ds * stepScale;
    }
  }

  // --- cirrus / alto-stratus veil: a 2D sheet high above the deck, strongly forward scattering (ice) ---
  if (uCirrusCover > 0.003 && T > 0.01) {
    float rC = uCurvatureRadius + uCirrusAlt;
    float tC = raySphere(roC, rd, rC).y;
    if (tC > 0.0) {
      vec3 pc = ro + rd * tC;
      vec2 wd = normalize(uWindDir + vec2(1e-4, 0.0));
      vec2 uvw = (pc.xz + uWindOffset.xz * 1.9) / uCirrusScale;
      // streaks along the wind: anisotropic lookup in the wind frame
      vec2 uv = vec2(dot(uvw, wd) * 0.28, dot(uvw, vec2(-wd.y, wd.x)));
      float fib = texture(uCirrus, uv).r;
      float fib2 = texture(uCirrus, uv * 2.3 + vec2(0.13, 0.71)).r;
      float patchN = texture(uCirrus, uvw * 0.16 + vec2(0.5, 0.27)).g;
      float th = 1.0 - uCirrusCover;
      float covC = smoothstep(th - 0.05, th + 0.30, patchN * 0.72 + fib * 0.28);
      float densC = covC * (fib * 0.7 + fib2 * 0.3);
      densC *= densC;
      float alphaC = clamp(densC * 0.7, 0.0, 0.40);
      float phC = min(4.0 * PI * (0.42 * hg(mu, 0.86) + 0.30 * hg(mu, 0.45) + 0.28 * hg(mu, -0.12)), 2.0);
      vec3 cirCol = uLightColor * phC * (0.9 / PI) * (0.55 + 0.45 * (1.0 - alphaC)) + uAmbientTop * 0.9 + uAmbientSunSide * 0.5;
      float hazeC = 1.0 - exp(-pow(tC * uHazeDensity * 0.6, 1.3));
      cirCol = mix(cirCol, uHazeColor, clamp(hazeC, 0.0, 1.0));
      col += cirCol * alphaC * T;
      T *= 1.0 - alphaC;
    }
  }

  float alpha = 1.0 - T;
  // aerial perspective on the deck: blend toward the horizon haze with distance
  float dist = firstHitT > 0.0 ? firstHitT : tStart;
  float haze = 1.0 - exp(-pow(dist * uHazeDensity, 1.3));
  haze = clamp(haze, 0.0, 1.0);
  col = mix(col, uHazeColor * alpha, haze);
  // fade the deck into the horizon band so it never cuts the sky abruptly
  float horizonFade = smoothstep(-0.008, 0.02, rd.y);
  alpha *= horizonFade;
  col *= horizonFade;
  vec4 cur = vec4(col, alpha);

  // --- temporal accumulation: reproject by direction (clouds are far, camera translation is negligible) ---
  if (!envMode && uHistoryWeight > 0.001) {
    vec4 pc = uPrevViewProj * vec4(rd, 0.0);
    if (pc.w > 1e-4) {
      vec2 puv = pc.xy / pc.w * 0.5 + 0.5;
      if (puv.x > 0.0 && puv.x < 1.0 && puv.y > 0.0 && puv.y < 1.0) {
        vec4 hist = texture(uHistory, puv);
        vec2 edge = smoothstep(0.0, 0.03, puv) * smoothstep(1.0, 0.97, puv);
        // exponential history (jumps in time / weather reset it from the CPU side)
        float w = uHistoryWeight * edge.x * edge.y;
        cur = mix(cur, hist, w);
      }
    }
  }
  if (cur.a < 0.002 && envMode) discard;
  fragColor = cur;
}
`,xe=class{constructor({seed:t}){this.stars=ge(t),this.moonTex=_e(t),this.uniforms={uCamPos:{value:new n},uSunDir:{value:new n(0,1,0)},uMoonDir:{value:new n(0,-1,0)},uSunE:{value:new n(P.sunE,P.sunE,P.sunE)},uMoonE:{value:0},uTurbidity:{value:2.2},uEnvMode:{value:0},uHorizonColor:{value:new e(.6,.7,.85)},uGroundRadiance:{value:new e(.2,.2,.17)},uNightGlow:{value:new e(.0011,.0031,.0125)},uNightAmount:{value:0},uStarRot:{value:new ee},uStars:{value:this.stars},uStarIntensity:{value:.4},uStarSeed:{value:t%1e3*.37},uMoonTex:{value:this.moonTex},uMoonRadius:{value:P.moonAngularRadius},uMoonBright:{value:1.1},uSunRadius:{value:P.sunAngularRadius},uSunDisc:{value:P.sunDiscRadiance},uCloudCover:{value:.3},uTime:{value:0},uSkyFog:{value:0},uFogSun:{value:new a(0,1,0,0)},uGlowKnee:{value:1.4},uSkySat:{value:1.35},uTwilight:{value:0},uScatterBoost:{value:P.scatterBoost},uSunTint:{value:new e(1,1,1)},uMilkyWay:{value:1}},this.material=new c({name:`env-sky`,glslVersion:E,uniforms:this.uniforms,vertexShader:ve,fragmentShader:ye,side:1,depthWrite:!1,depthTest:!0,fog:!1,lights:!1});let r=new i(1,32,16);this.mesh=new v(r,this.material),this.mesh.name=`env-sky`,this.mesh.scale.setScalar(9e3),this.mesh.frustumCulled=!1,this.mesh.renderOrder=900,this.mesh.castShadow=!1,this.mesh.receiveShadow=!1,this.probeMesh=new v(r,this.material),this.probeMesh.name=`env-sky-probe`,this.probeMesh.scale.setScalar(9e3),this.probeMesh.frustumCulled=!1}setStarRotation(e,t){let r=new n(0,Math.sin(e),-Math.cos(e)),i=new M().setFromAxisAngle(r,-t),a=new M().setFromUnitVectors(r,new n(0,1,0)).multiply(i),o=new A().makeRotationFromQuaternion(a);this.uniforms.uStarRot.value.setFromMatrix4(o)}dispose(){this.stars.dispose(),this.moonTex.dispose(),this.material.dispose(),this.mesh.geometry.dispose()}},G=class{constructor(e,t=16){let n=w(e);this.period=t;let r=new Uint8Array(256);for(let e=0;e<256;e++)r[e]=e;for(let e=255;e>0;e--){let t=Math.floor(n()*(e+1)),i=r[e];r[e]=r[t],r[t]=i}this.perm=new Uint8Array(512);for(let e=0;e<512;e++)this.perm[e]=r[e&255];this.grad=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],[1,1,0],[-1,1,0],[0,-1,1],[0,-1,-1]]}_g(e,t,n,r){let i=this.perm;return e=(e%r+r)%r,t=(t%r+r)%r,n=(n%r+r)%r,this.grad[i[e+i[t+i[n]]]&15]}noise(e,t,n,r=this.period){let i=Math.floor(e),a=Math.floor(t),o=Math.floor(n),s=e-i,c=t-a,l=n-o,u=we(s),d=we(c),f=we(l),p=0;for(let e=0;e<2;e++)for(let t=0;t<2;t++)for(let n=0;n<2;n++){let m=this._g(i+n,a+t,o+e,r),h=m[0]*(s-n)+m[1]*(c-t)+m[2]*(l-e),g=(n?u:1-u)*(t?d:1-d)*(e?f:1-f);p+=g*h}return p*1.15}fbm(e,t,n,r=3,i=this.period){let a=.5,o=0,s=0,c=1;for(let l=0;l<r;l++)o+=a*this.noise(e*c,t*c,n*c,i*c),s+=a,a*=.5,c*=2;return .5+o/s*.5}},Se=class{constructor(e,t=4){this.cells=t;let n=w(e),r=t*t*t;this.points=new Float32Array(r*3);for(let e=0;e<r;e++)this.points[e*3]=n(),this.points[e*3+1]=n(),this.points[e*3+2]=n()}sample(e,t,n){let r=this.cells,i=e*r,a=t*r,o=n*r,s=Math.floor(i),c=Math.floor(a),l=Math.floor(o),u=1e9;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++){let d=s+n,f=c+t,p=l+e,m=(d%r+r)%r,h=(f%r+r)%r,g=(p%r+r)%r,_=(m+h*r+g*r*r)*3,v=d+this.points[_]-i,y=f+this.points[_+1]-a,b=p+this.points[_+2]-o,x=v*v+y*y+b*b;x<u&&(u=x)}return 1-Math.min(1,Math.sqrt(u))}},Ce=class{constructor(e,t=8){this.p3=new G(e,t),this.period=t}fbm(e,t,n=4,r=this.period,i=.5){let a=.5,o=0,s=0,c=1;for(let l=0;l<n;l++)o+=a*this.p3.noise(e*c,t*c,.37,r*c),s+=a,a*=i,c*=2;return .5+o/s*.5}};function we(e){return e*e*e*(e*(e*6-15)+10)}var Te=(e,t,n,r,i)=>r+(e-t)/(n-t)*(i-r),K=e=>e<0?0:e>1?1:e,Ee=64,De=256;function Oe(e){let n=Ee,i=new G(e^20907,4),a=new Se(e^4097,4),o=new Se(e^4098,8),s=new Se(e^4099,16),c=new Se(e^4100,32),l=new Uint8Array(4096*n*4),u=0;for(let e=0;e<n;e++)for(let t=0;t<n;t++)for(let r=0;r<n;r++){let d=(r+.5)/n,f=(t+.5)/n,p=(e+.5)/n,m=i.fbm(d*4,f*4,p*4,3,4),h=a.sample(d,f,p),g=o.sample(d,f,p),_=s.sample(d,f,p),v=c.sample(d,f,p),y=K(Te(m,0,1,h*.625+g*.25+_*.125,1));l[u++]=Math.round(K(y)*255),l[u++]=Math.round(K(g)*255),l[u++]=Math.round(K(_)*255),l[u++]=Math.round(K(v)*255)}let f=new r(l,n,n,n);return f.format=t,f.type=d,f.minFilter=h,f.magFilter=b,f.generateMipmaps=!0,f.wrapS=f.wrapT=f.wrapR=S,f.unpackAlignment=1,f.needsUpdate=!0,f}function ke(e){let n=De,r=new Ce(e^32257,4),i=new Ce(e^32258,8),a=new Uint8Array(n*n*4),o=new Float32Array(n*n),s=new Float32Array(n*n);for(let e=0;e<n;e++)for(let t=0;t<n;t++){let a=(t+.5)/n,c=(e+.5)/n,l=r.fbm(a*4,c*4,5,4),u=i.fbm(a*8,c*8,3,8);o[e*n+t]=l*.72+u*.28,s[e*n+t]=u}let c=Array.from(o.keys()).sort((e,t)=>o[e]-o[t]),l=new Float32Array(n*n);for(let e=0;e<c.length;e++)l[c[e]]=(e+.5)/c.length;for(let e=0;e<n;e++)for(let t=0;t<n;t++){let r=(t+.5)/n,o=(e+.5)/n,c=e*n+t,u=K(Te(i.fbm(r*8+.31,o*8+.77,3,8),.3,.7,0,1));a[c*4]=Math.round(l[c]*255),a[c*4+1]=Math.round(u*255),a[c*4+2]=Math.round(s[c]*255),a[c*4+3]=255}let f=new u(a,n,n,t,d);return f.wrapS=f.wrapT=S,f.minFilter=b,f.magFilter=b,f.generateMipmaps=!1,f.colorSpace=``,f.needsUpdate=!0,f}function Ae(e){let n=new Ce(e^11281,6),r=new Ce(e^11282,2),i=new Float32Array(65536),a=new Float32Array(65536);for(let e=0;e<256;e++)for(let t=0;t<256;t++){let o=(t+.5)/256,s=(e+.5)/256,c=1-Math.abs(2*n.fbm(o*6,s*6,4,6)-1),l=1-Math.abs(2*n.fbm(o*6+.37,s*6+.11,5,6,.6)-1),u=n.fbm(o*6+.71,s*6+.29,3,6);i[e*256+t]=K(K(c*.6+l*.4)**1.25*.55+u*.45),a[e*256+t]=r.fbm(o*2,s*2,3,2)}let o=e=>{let t=Array.from(e.keys()).sort((t,n)=>e[t]-e[n]),n=new Float32Array(e.length);for(let e=0;e<t.length;e++)n[t[e]]=(e+.5)/t.length;return n},s=o(i),c=o(a),l=new Uint8Array(262144);for(let e=0;e<65536;e++)l[e*4]=Math.round(s[e]*255),l[e*4+1]=Math.round(c[e]*255),l[e*4+2]=0,l[e*4+3]=255;let f=new u(l,256,256,t,d);return f.wrapS=f.wrapT=S,f.minFilter=b,f.magFilter=b,f.generateMipmaps=!1,f.colorSpace=``,f.needsUpdate=!0,f}var je=class{constructor({seed:r,quality:a}){this.noise=Oe(r),this.weather=ke(r),this.cirrus=Ae(r);let o={low:14,medium:22,high:32,ultra:40}[a?.name]??32,l={low:3,medium:4,high:5,ultra:6}[a?.name]??5;this.uniforms={uCamPos:{value:new n},uLightDir:{value:new n(0,1,0)},uLightColor:{value:new e(1,1,1)},uAmbientTop:{value:new e(.3,.4,.6)},uAmbientBottom:{value:new e(.15,.18,.25)},uAmbientSunSide:{value:new e(0,0,0)},uHazeColor:{value:new e(.6,.7,.85)},uHazeDensity:{value:3e-5},uCoverage:{value:.3},uCloudType:{value:.7},uDensity:{value:.04},uPrecip:{value:0},uCloudBase:{value:1e3},uCloudTop:{value:3350},uCurvatureRadius:{value:24e5},uWindOffset:{value:new n},uWindDir:{value:new f(1,0)},uTime:{value:0},uEnvMode:{value:0},uSteps:{value:o},uLightSteps:{value:l},uNoise:{value:this.noise},uWeather:{value:this.weather},uWeatherScale:{value:22e3},uBaseScale:{value:5600},uDetailScale:{value:1050},uCirrus:{value:this.cirrus},uCirrusCover:{value:.4},uCirrusAlt:{value:7200},uCirrusScale:{value:3e4},uHistory:{value:null},uPrevViewProj:{value:new A},uHistoryWeight:{value:0},uFrame:{value:0},uPixelAngle:{value:.0015},uDebug:{value:0},uScatterGain:{value:2.6},uBaseJitter:{value:.24}},this.material=new c({name:`env-clouds`,glslVersion:E,uniforms:this.uniforms,vertexShader:be,fragmentShader:W,side:1,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,fog:!1,lights:!1});let p=new i(1,24,12);this.mesh=new v(p,this.material),this.mesh.name=`env-clouds-raymarch`,this.mesh.scale.setScalar(9e3),this.mesh.frustumCulled=!1,this.offscreenScene=new s,this.offscreenScene.add(this.mesh),this.resolutionScale={low:1/3,medium:.5,high:.75,ultra:1}[a?.name]??.75,this.targets=[null,null],this.target=null,this.targetSize=new f,this.historyValid=!1,this.historyWeight=.94,this._rotView=new A,this._viewProj=new A,this.compositeUniforms={uTex:{value:null},uResolution:{value:new f(1,1)},uTexel:{value:new f(1,1)}},this.compositeMaterial=new c({name:`env-clouds-composite`,glslVersion:E,uniforms:this.compositeUniforms,vertexShader:be,fragmentShader:`
        varying vec3 vDir;
        out vec4 fragColor;
        uniform sampler2D uTex;
        uniform vec2 uResolution;
        uniform vec2 uTexel;
        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution;
          // Gaussian reconstruction in render-target texel space (sigma 0.75 texel, 4x4 texel-centred taps): a
          // smooth magnification with no grid beat, and no edge-aware weighting that would turn residual
          // temporal noise into worms along the (horizontally coherent) far deck
          vec2 tc = uv / uTexel - 0.5;
          vec2 base = floor(tc);
          vec2 f = tc - base;
          vec4 c = vec4(0.0);
          float wsum = 0.0;
          for (int j = -1; j <= 2; j++) {
            for (int i = -1; i <= 2; i++) {
              vec2 d = vec2(float(i), float(j)) - f;
              float w = exp(-dot(d, d) / (2.0 * 0.52 * 0.52));
              c += texture2D(uTex, (base + vec2(float(i), float(j)) + 0.5) * uTexel) * w;
              wsum += w;
            }
          }
          c /= wsum;
          if (c.a < 0.002) discard;
          fragColor = c;
        }
      `,side:1,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,fog:!1,lights:!1}),this.compositeMesh=new v(p,this.compositeMaterial),this.compositeMesh.name=`env-clouds`,this.compositeMesh.scale.setScalar(9e3),this.compositeMesh.frustumCulled=!1,this.compositeMesh.renderOrder=-900,this.compositeMesh.castShadow=!1,this.compositeMesh.receiveShadow=!1,this.probeMesh=new v(p,this.material),this.probeMesh.name=`env-clouds-probe`,this.probeMesh.scale.setScalar(9e3),this.probeMesh.frustumCulled=!1,this.probeMesh.renderOrder=-900,this._size=new f,this._clear=new e(0,0,0),this._dummy=new u(new Uint8Array([0,0,0,0]),1,1,t,d),this._dummy.needsUpdate=!0,this.uniforms.uHistory.value=this._dummy}resetHistory(){this.historyValid=!1}renderOffscreen(e,n){e.getDrawingBufferSize(this._size);let r=Math.max(2,Math.round(this._size.x*this.resolutionScale)),i=Math.max(2,Math.round(this._size.y*this.resolutionScale)),a=this.targets[0],o=this.targets[1];(!a||a.width!==r||a.height!==i)&&(a&&a.dispose(),a=new D(r,i,{type:p,format:t,depthBuffer:!1,stencilBuffer:!1,minFilter:b,magFilter:b,generateMipmaps:!1}),a.texture.name=`env-clouds-rt`),this.targetSize.set(r,i);let s=this.uniforms;s.uPixelAngle.value=n.fov*Math.PI/180/i;let c=this.historyValid&&o;s.uHistory.value=c?o.texture:this._dummy,s.uHistoryWeight.value=c?this.historyWeight:0,s.uFrame.value=(s.uFrame.value+1)%1024,this.compositeUniforms.uResolution.value.copy(this._size),this.compositeUniforms.uTexel.value.set(1/r,1/i),this.mesh.position.copy(n.position);let l=e.getRenderTarget(),u=e.autoClear,d=e.getClearAlpha();e.getClearColor(this._clear),e.setRenderTarget(a),e.setClearColor(0,0),e.autoClear=!0,e.clear(!0,!1,!1),e.render(this.offscreenScene,n),e.setClearColor(this._clear,d),e.autoClear=u,e.setRenderTarget(l),this._rotView.extractRotation(n.matrixWorld).invert(),this._viewProj.multiplyMatrices(n.projectionMatrix,this._rotView),s.uPrevViewProj.value.copy(this._viewProj),this.targets[0]=o,this.targets[1]=a,this.target=a,this.compositeUniforms.uTex.value=a.texture,this.historyValid=!0}setVisible(e){this.compositeMesh.visible=e,this.probeMesh.visible=e}dispose(){this.noise.dispose(),this.weather.dispose(),this.cirrus.dispose(),this.material.dispose(),this.compositeMaterial.dispose();for(let e of this.targets)e&&e.dispose();this.mesh.geometry.dispose()}},Me=512,Ne=5600,Pe=e=>e<0?0:e>1?1:e,q=(e,t,n)=>{let r=Pe((n-e)/(t-e));return r*r*(3-2*r)},Fe=class{constructor(e,t,n=22e3,{noiseTile:r=780,shapeK:i=1}={}){this.shapeK=i;let a=Me;this.size=a,this.field=new Float32Array(a*a),this.base=new Float32Array(a*a);let o=e.image,s=o.width,c=o.data,f=t.image,p=f.width,m=f.data,g=e=>(e%s+s)%s,_=e=>(e%p+p)%p,v=Math.max(1,Math.round(n/r)),y=1089.7/Ne*p,x=Math.floor(y),C=y-x,ee=_(x),w=_(x+1),T=(e,t)=>{let n=Math.floor(e),r=e-n,i=_(n),a=_(n+1),o=Math.floor(t),s=t-o,c=_(o),l=_(o+1),u=0,d=0,f=0,h=0,g=[[i,ee,c,(1-r)*(1-C)*(1-s)],[a,ee,c,r*(1-C)*(1-s)],[i,w,c,(1-r)*C*(1-s)],[a,w,c,r*C*(1-s)],[i,ee,l,(1-r)*(1-C)*s],[a,ee,l,r*(1-C)*s],[i,w,l,(1-r)*C*s],[a,w,l,r*C*s]];for(let[e,t,n,r]of g){let i=((n*p+t)*p+e)*4;u+=m[i]*r,d+=m[i+1]*r,f+=m[i+2]*r,h+=m[i+3]*r}return[u/255,d/255,f/255,h/255]};for(let e=0;e<a;e++){let t=(e+.5)/a,n=t*s-.5,r=Math.floor(n),i=n-r,o=g(r),l=g(r+1);for(let n=0;n<a;n++){let r=(n+.5)/a,u=r*s-.5,d=Math.floor(u),f=u-d,m=g(d),h=g(d+1),_=(o*s+m)*4,y=(o*s+h)*4,b=(l*s+m)*4,x=(l*s+h)*4,S=((c[_]*(1-f)+c[y]*f)*(1-i)+(c[b]*(1-f)+c[x]*f)*i)/255,C=((c[_+2]*(1-f)+c[y+2]*f)*(1-i)+(c[b+2]*(1-f)+c[x+2]*f)*i)/255;this.field[e*a+n]=S+(C-.5)*.3;let[ee,w]=T(r*v*p,t*v*p);this.base[e*a+n]=Pe(ee*.8+(1-w)*.2)*.92}}let E=Array.from(this.base.keys()).sort((e,t)=>this.base[e]-this.base[t]);for(let e=0;e<E.length;e++)this.base[E[e]]=(e+.5)/E.length;this.data=new Uint8Array(a*a).fill(255);let D=new u(this.data,a,a,l,d);D.name=`env-cloud-shadow`,D.wrapS=D.wrapT=S,D.minFilter=h,D.magFilter=b,D.generateMipmaps=!0,D.colorSpace=``,D.unpackAlignment=1,D.needsUpdate=!0,this.texture=D,this.bakedCover=-1,this.bakedStrength=-1,this.shadowFraction=0}update(e,t){if(Math.abs(e-this.bakedCover)<.012&&Math.abs(t-this.bakedStrength)<.02)return!1;let n=1-e,r=n-.3,i=n+.16,a=1-(.42+.58*q(.3,.9,e)*this.shapeK),o=this.field,s=this.base,c=this.data,l=0;for(let e=0;e<o.length;e++){let n=q(r,i,o[e]),u=1;if(n>.002){let r=n*q(a-.08,a+.16,s[e]);u=1-t*(1-Math.exp(-r*6.5))}l+=1-u,c[e]=Math.round(u*255)}return this.shadowFraction=l/o.length,this.texture.needsUpdate=!0,this.bakedCover=e,this.bakedStrength=t,!0}dispose(){this.texture.dispose()}},J={clear:{cover:.3,type:.88,cirrus:.26,fog:56e-5,fogH:620,fogFloor:.38,turbidity:2,sun:1,diffuse:.55,milk:0,skyFog:0,wind:.35,rain:0,snow:0,temp:22,density:.04},cloudy:{cover:.6,type:.72,cirrus:.45,fog:72e-5,fogH:560,fogFloor:.42,turbidity:3,sun:.72,diffuse:.55,milk:.35,skyFog:.18,wind:.55,rain:0,snow:0,temp:16,density:.042},rain:{cover:.96,type:.3,cirrus:.2,fog:.00105,fogH:420,fogFloor:.46,turbidity:5,sun:.08,diffuse:.38,milk:.6,skyFog:.55,wind:.85,rain:1,snow:0,temp:12,density:.045},fog:{cover:.55,type:.35,cirrus:0,fog:.0023,fogH:150,fogFloor:.42,turbidity:5.5,sun:.26,diffuse:.62,milk:1,skyFog:.92,wind:.1,rain:0,snow:0,temp:9,density:.035},snow:{cover:.93,type:.35,cirrus:.1,fog:.00115,fogH:400,fogFloor:.46,turbidity:5.5,sun:.13,diffuse:.5,milk:.8,skyFog:.65,wind:.5,rain:0,snow:1,temp:-3,density:.04}},Ie=[`cover`,`type`,`cirrus`,`fog`,`fogH`,`fogFloor`,`turbidity`,`sun`,`diffuse`,`milk`,`skyFog`,`density`],Le=class{constructor(e,t=`clear`){this.noise=new te(e^30698),this.name=J[t]?t:`clear`;let n=J[this.name];this.state={...n,precipitation:n.rain||n.snow},this.wetness=+!!n.rain,this.snowCover=+!!n.snow,this.wind=new f(.7,.3).normalize(),this.windStrength=n.wind,this.time=0,this._windAngleBase=this.noise.noise2D(.5,.5)*Math.PI}set(e,t=!1){return J[e]?(this.name=e,t&&this.snap(),!0):!1}snap(){let e=J[this.name];Object.assign(this.state,e,{precipitation:e.rain||e.snow}),this.wetness=+!!e.rain,this.snowCover=+!!e.snow,this.windStrength=e.wind}update(e,t=null){this.time=t==null?this.time+e:t/180;let n=J[this.name],r=this.state,i=.32;for(let t of Ie)r[t]=g(r[t],n[t],i,e);r.temp=g(r.temp,n.temp,.1,e),r.precipitation=g(r.precipitation,n.rain||n.snow,i,e);let a=n.rain;this.wetness=a>this.wetness?Math.min(1,this.wetness+e/18):Math.max(0,this.wetness-e/120);let o=n.snow;this.snowCover=o>this.snowCover?Math.min(1,this.snowCover+e/45):Math.max(0,this.snowCover-e/240),this.windStrength=g(this.windStrength,n.wind*(.85+.3*(.5+.5*this.noise.noise2D(this.time*.02,3.7))),.2,e);let s=this._windAngleBase+this.noise.noise2D(this.time*.004,11.3)*1.2;this.wind.set(Math.cos(s),Math.sin(s))}get driftWind(){return J[this.name].wind}get cloudCover(){return O(this.state.cover)}get sunFactor(){return C(1,this.state.sun,1)}},Re=class{constructor(e,t,n,{size:r=512}={}){this.renderer=e,this.size=r,this.sky=t,this.clouds=n,this.scene=new s,this.scene.name=`env-probe-scene`,this.scene.add(t.probeMesh),this.scene.add(n.probeMesh),this.pmrem=new j(e),this.target=null,this.texture=null,this.lastRefresh=-1e9,this.count=0}refresh(e=0){this.sky.uniforms.uEnvMode.value=1,this.clouds.uniforms.uEnvMode.value=1;let t=null;try{t=this.pmrem.fromScene(this.scene,0,20,4e4,{size:this.size})}finally{this.sky.uniforms.uEnvMode.value=0,this.clouds.uniforms.uEnvMode.value=0}return this.target&&this.target!==t&&this.target.dispose(),this.target=t,this.texture=t.texture,this.lastRefresh=e,this.count++,this.texture}dispose(){this.target&&this.target.dispose(),this.pmrem.dispose()}},ze=`varying vec3 vFcWorldPos;
`,Be=`
{
  vec4 fcP = vec4( transformed, 1.0 );
  #ifdef USE_BATCHING
    fcP = batchingMatrix * fcP;
  #endif
  #ifdef USE_INSTANCING
    fcP = instanceMatrix * fcP;
  #endif
  vFcWorldPos = ( modelMatrix * fcP ).xyz;
}
`,Ve=`uniform float uWetness;
`,Y=`
uniform sampler2D uSunModulation;
uniform vec4 uSunModulationXf;
uniform vec2 uFogHeight;
uniform vec3 uFcFogParams; // x: uniform-haze floor 0..1 (1 = plain exp2 fog), y: sun-glow strength through fog, z: max fog opacity
uniform vec3 uFcSunDir;    // toward the sun
uniform vec3 uFcFogWarm;   // aerial-perspective tint toward the sun (golden hour: warm)
uniform vec3 uFcFogCool;   // aerial-perspective tint away from the sun (golden hour: cool blue)
varying vec3 vFcWorldPos;
// mean height-fog density factor along the camera→fragment segment (analytic integral of exp(-y/H))
float fcHeightFogFactor( float depth, float density ) {
  float H = max( uFogHeight.y, 1.0 );
  float yc = max( cameraPosition.y - uFogHeight.x, -2.5 * H );
  float yf = max( vFcWorldPos.y - uFogHeight.x, -2.5 * H );
  float ea = exp( -yc / H );
  float eb = exp( -yf / H );
  float dy = yf - yc;
  float avg = abs( dy ) > 0.5 ? ( ea - eb ) * H / dy : ea;
  avg = clamp( avg, 0.0, 8.0 );
  float d = density * mix( avg, 1.0, uFcFogParams.x );
  // Aerial perspective saturates: real haze lifts distant blacks toward the sky but never erases the silhouette.
  // CS2's far third keeps 35-52 % of the near field's local contrast (LOOK_TARGET row 12), so cap the opacity.
  return ( 1.0 - exp( -d * d * depth * depth ) ) * uFcFogParams.z;
}
`,He=`
#ifdef USE_FOG
  #ifdef FOG_EXP2
    float fogFactor = fcHeightFogFactor( vFogDepth, fogDensity );
  #else
    float fogFactor = smoothstep( fogNear, fogFar, vFogDepth ) * uFcFogParams.z;
  #endif
  // directional aerial perspective: the haze is warm in the sun-facing hemisphere and stays cool blue away from it
  // (a single scene fog colour cannot do this, and a uniformly warm haze is what made golden hour read khaki).
  // Plus forward scattering in a fog medium: a soft glow toward the sun (depth cue, keeps a light direction in fog).
  vec3 fcV = normalize( vFcWorldPos - cameraPosition );
  float fcAz = dot( normalize( vec3( fcV.x, 0.0, fcV.z ) + vec3( 1e-5, 0.0, 0.0 ) ), normalize( vec3( uFcSunDir.x, 0.0, uFcSunDir.z ) + vec3( 1e-5, 0.0, 0.0 ) ) );
  vec3 fcFogCol = fogColor * mix( uFcFogCool, uFcFogWarm, smoothstep( -0.35, 0.85, fcAz ) );
  if ( uFcFogParams.y > 0.001 ) {
    fcFogCol *= 1.0 + uFcFogParams.y * pow( max( dot( fcV, uFcSunDir ), 0.0 ), 10.0 );
  }
  // aerial perspective also DESATURATES: distant hills approach neutral before they approach the sky colour
  // (LOOK_TARGET rows 11/12 — our far field used to be crisper and more chromatic than our foreground).
  gl_FragColor.rgb = mix( gl_FragColor.rgb, vec3( dot( gl_FragColor.rgb, vec3( 0.2126, 0.7152, 0.0722 ) ) ), 0.55 * fogFactor );
  gl_FragColor.rgb = mix( gl_FragColor.rgb, fcFogCol, fogFactor );
#endif
`,X=`float fcSunMod = texture2D( uSunModulation, vFcWorldPos.xz * uSunModulationXf.xy + uSunModulationXf.zw ).r;
`,Ue=/getDirectionalLightInfo\(\s*directionalLights?(?:\s*\[\s*\d+\s*\])?\s*,\s*directLight\s*\);/g;function We(e,t){let n=null,r=e.globalUniforms,i={seen:0,patched:0,fog:0,sunMod:0,sunModAnchors:0};a.stats=i;function a(e,a){if(i.seen++,a&&a.userData&&a.userData.noEnvHook)return;let o=e.vertexShader;if(typeof o!=`string`||o.includes(`vFcWorldPos`))return;if(o.includes(`#include <fog_vertex>`))o=o.replace(`#include <fog_vertex>`,`#include <fog_vertex>`+Be);else if(o.includes(`#include <worldpos_vertex>`))o=o.replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>`+Be);else if(o.includes(`#include <project_vertex>`))o=o.replace(`#include <project_vertex>`,`#include <project_vertex>`+Be);else return;e.vertexShader=ze+o,i.patched++;let s=e.fragmentShader;if(s=Y+(/uniform\s+float\s+uWetness\s*;/.test(s)?``:Ve)+s,s.includes(`#include <fog_fragment>`)&&(s=s.replace(`#include <fog_fragment>`,He),i.fog++),s.includes(`#include <lights_fragment_begin>`)){if(!n){let e=0;n=N.lights_fragment_begin.replace(Ue,t=>(e++,t+` directLight.color *= fcSunMod;`)),i.sunModAnchors=e}s=s.replace(`#include <lights_fragment_begin>`,X+n),i.sunMod++}e.fragmentShader=s,e.uniforms.uSunModulation=r.uSunModulation,e.uniforms.uSunModulationXf=r.uSunModulationXf,e.uniforms.uFogHeight=r.uFogHeight,e.uniforms.uWetness=r.uWetness,e.uniforms.uFcFogParams=t.uFcFogParams,e.uniforms.uFcSunDir=t.uFcSunDir,e.uniforms.uFcFogWarm=t.uFcFogWarm,e.uniforms.uFcFogCool=t.uFcFogCool}return a}var Ge=`environment`,Ke=new e(.62,.72,1),qe=.26,Je=.065,Ye=new e(.3,.29,.24),Xe=new e(.78,.8,.86),Ze=new e(.36,.47,.85),Qe=new e(.4,.5,.78),$e=new e(.62,.7,.92),et=new e(.0159,.0226,.0398),tt=2.5*y,nt=1700,rt=.3276,it=3.3,at=new e(1,.935,.8),Z=null;async function ot(t){let{engine:r,scene:i,world:o,events:s,config:c,renderer:l}=t,u=o.seed,d=new xe({seed:u}),f=new je({seed:u,quality:r.quality}),p=new Le(u,c.weather),m=new Re(l,d,f),h=new Fe(f.weather,f.noise,f.uniforms.uWeatherScale.value);i.add(d.mesh),i.add(f.compositeMesh),Z={ctx:t,engine:r,scene:i,world:o,events:s,sky:d,clouds:f,weather:p,probe:m,cloudShadow:h,latitude:47.3,lastHour:NaN,elapsed:0,sampleTimer:0,probeDirtyUntil:-1,lastWeatherName:p.name,cel:{},skyAvg:new e(.3,.45,.8),horizonAvg:new e(.7,.8,.95),sunSideAvg:new e(0,0,0),skyAvgTarget:new e(.3,.45,.8),horizonAvgTarget:new e(.7,.8,.95),sunSideAvgTarget:new e(0,0,0),sunT:new e(1,1,1),sunTHigh:new e(1,1,1),moonT:new e(1,1,1),tmpC:new e,tmpC2:new e,tmpC3:new e,sunColor:new e,moonColor:new e,hemiSky:new e,hemiCol:new e,hemiGround:new e,milk:new e,sunTint:new e(1,1,1),fogWarm:new e(1,1,1),fogCool:new e(1,1,1),groundRad:new e,fogColor:new e,diffuseCol:new e,grey:new e,tmpV:new n,tmpV2:new n,lightDir:new n(0,-1,0),forward:new n(0,0,-1),sunModXf:new a(1/22e3,1/22e3,0,0),cloudsEnabled:!0,cloudShadowsEnabled:!0,scatterBoost:P.scatterBoost,envIntensity:.75,cloudOffsetExtra:new n,sampleOut:{radiance:new e,transmittance:new e},hookUniforms:{uFcFogParams:{value:new n(.7,0,.78)},uFcSunDir:{value:new n(0,1,0)},uFcFogWarm:{value:new e(1,1,1)},uFcFogCool:{value:new e(1,1,1)}},removeHook:null},Z.hook=We(r,Z.hookUniforms),Z.removeHook=r.addMaterialHook(Z.hook),r.setSunModulation(h.texture,Z.sunModXf),r.setFogHeight(o.terrain&&o.terrain.waterLevel||0,150);let g=o.env;g.weather=p.name,g.moonDirection=new n(0,1,0),g.lightDirection=new n(0,-1,0),g.horizonColor=new e,g.moonColor=Ke.clone(),g.sunAltitude=0,g.sunAzimuth=0,g.moonAltitude=0,g.moonPhase=0,g.moonIllumination=0,g.exposure=1,g.precipitation=0,g.wetness=0,g.latitude=Z.latitude,g.dayOfYear=ce(o.time),g.cloudsVisible=!0,g.fogHeight={y0:0,H:150},g.api={setWeather:(e,{instant:t=!1}={})=>st(e,t),getWeather:()=>p.name,weatherTypes:Object.keys(J),setLatitude:e=>{Z.latitude=T(e,-80,80),g.latitude=Z.latitude,ct()},setWind:(e,t,n)=>{p.wind.set(e,t).normalize(),n!=null&&(p.windStrength=n)},sunDirection:(e=o.time.hour,t=new n)=>t.copy(le(e,ce(o.time),Z.latitude,{}).sunDir),moonDirection:(e=o.time.hour,t=new n)=>t.copy(le(e,ce(o.time),Z.latitude,{}).moonDir),sampleSky:(t,n=new e)=>gt(t,n),refresh:()=>ct(),setCloudsVisible:e=>{Z.cloudsEnabled=!!e,f.setVisible(!!e),g.cloudsVisible=!!e},probeCount:()=>m.count,weatherState:()=>({...p.state,wetness:p.wetness,snowCover:p.snowCover}),cloudShadowTexture:()=>h.texture,cloudShadowFraction:()=>h.shadowFraction,cloudShadowAt:(e,t)=>dt(e,t),setCloudShadows:e=>{Z.cloudShadowsEnabled=!!e},setCloudHistory:e=>{f.historyWeight=T(e,0,.99)},hookStats:()=>({...Z.hook.stats}),setCloudOffset:(e,t)=>{Z.cloudOffsetExtra.set(e,0,t),f.resetHistory()},cloudOffsetGain:()=>.35,sunModXf:()=>Z.sunModXf.toArray(),setCloudDebug:e=>{f.uniforms.uDebug.value=e|0},cloudState:()=>({historyValid:f.historyValid,historyWeight:f.uniforms.uHistoryWeight.value,frame:f.uniforms.uFrame.value,rt:f.targetSize.toArray(),prevViewProj:f.uniforms.uPrevViewProj.value.toArray(),visible:f.compositeMesh.visible}),lightingState:()=>({sunAltitude:g.sunAltitude,exposure:g.exposure,sunIntensity:g.sunIntensity,ambientIntensity:g.ambientIntensity,ambientKey:g.ambientIntensity*g.exposure,nightFactor:g.nightFactor,hemiRaw:Z.dbgHemiRaw,floor:Z.dbgFloor,envIntensity:Z.envIntensity,fogDensity:g.fogDensity,hemiSky:Z.engine.hemi?Z.engine.hemi.color.toArray():null,hemiGround:Z.engine.hemi?Z.engine.hemi.groundColor.toArray():null,sunColor:g.sunColor.toArray(),skyAvg:Z.skyAvg.toArray(),horizonAvg:Z.horizonAvg.toArray(),sunSide:Z.sunSideAvg.toArray()})},s.on(`time:set`,()=>ct()),s.on(`weather:set`,e=>st(e,!1)),ct()}function st(e,t){if(!Z)return!1;let n=Z.weather.set(e,t);return n&&(Z.world.env.weather=e,Z.probeDirtyUntil=Z.elapsed+14,t&&ct()),n}function ct(){Z&&(Z.lastHour=NaN,ut(0,Z.elapsed,!0))}function lt(e,t){Z&&(Z.elapsed=t,ut(e,t,!1))}function ut(e,t,n){let{world:r,engine:i,sky:a,clouds:o,weather:s,probe:c,cloudShadow:l,tmpC:u,tmpC2:d,tmpC3:f}=Z,p=r.env,h=r.time,g=h.hour,_=n||!Number.isFinite(Z.lastHour)||Math.abs(g-Z.lastHour)>.02;Z.lastHour=g;let v=((h.totalDays??(h.day||1))*24+g)*3600;s.update(e,v),_&&n&&s.snap();let b=ce(h),x=le(g,b,Z.latitude,Z.cel),S=x.sunAltitude*m,ee=x.moonAltitude*m,w=i.camera,E=Math.max(1,w.position.y),D=s.state.turbidity,A=1-k(4,20,S);Z.scatterBoost=C(1.95,P.scatterBoost,k(2,22,S));let j=O(1-k(-13,-1,S));se(x.sunDir,E,D,Z.sunT),se(x.sunDir,2600,D,Z.sunTHigh),se(x.moonDir,E,D,Z.moonT);let M=k(-1.8,1.2,S),N=Math.max(Z.sunT.r,Z.sunT.g,Z.sunT.b,1e-4),te=P.sunE*N**+C(1,.6,A)*M*s.sunFactor,F=Z.sunColor.copy(Z.sunT).multiplyScalar(1/N);{let e=fe(F);F.lerp(Z.grey.setRGB(e,e,e),C(.28,.2,A)),F.multiplyScalar(1/Math.max(F.r,F.g,F.b,1e-4)),F.r=Math.max(F.r,1),F.g=Math.max(F.g,.5),F.b=Math.max(F.b,.2)}F.lerp(Z.tmpC3.copy(at),.55*(1-k(8,46,S))),A>0&&F.lerp(Z.tmpC3.setRGB(1,.55,.25),.55*A*M);let ne=k(-1,6,ee),re=Math.max(Z.moonT.r,Z.moonT.g,Z.moonT.b,1e-4),I=qe*x.moonIllumination*re*ne*C(1,s.sunFactor,.85),L=Z.moonColor.copy(Z.moonT).multiplyScalar(1/re).lerp(Z.grey.setRGB(1,1,1),.6).multiply(Ke),ie=Je*x.moonIllumination*ne,ae=de(S),oe=(1-k(-2,10,S))*O((s.cloudCover-.55)*2.2)*.7,R=O(Math.max(ae,oe)),z=s.cloudCover,B=s.state,V=ue(S);V*=1+.1*k(.45,.95,z)*(1-R)+.06*B.precipitation,V*=C(1,.93,k(16,42,S));let pe=I*Math.max(0,x.moonDir.y);V*=1-.5*O(pe/.12)*j,i.setExposure(V),Z.sampleTimer-=e,(_||Z.sampleTimer<=0)&&(Z.sampleTimer=.15,ht(x,E,D,ie,j));let me=_?1e9:5;pt(Z.skyAvg,Z.skyAvgTarget,me,e),pt(Z.horizonAvg,Z.horizonAvgTarget,me,e),pt(Z.sunSideAvg,Z.sunSideAvgTarget,me,e);let he,ge,_e;te>=I?(he=F,ge=te,_e=x.sunDir):(he=L,ge=I,_e=x.moonDir);let H=Z.lightDir.copy(_e).negate();if(H.y>-Math.sin(tt)){let e=Math.hypot(H.x,H.z)||1,t=Math.cos(tt);H.set(H.x/e*t,-Math.sin(tt),H.z/e*t)}H.normalize(),i.setSun(H,he,Math.max(.02,ge));let U=Z.skyAvg,ve=Z.horizonAvg,ye=fe(U),be=P.sunE*N*M*Math.max(0,x.sunDir.y)*(1-s.sunFactor)*B.diffuse/Math.PI,W=Z.diffuseCol.copy(F).multiplyScalar(be);{let e=fe(W);W.lerp(Z.grey.setRGB(e,e,e),.6)}let xe=ye*1.15,G=Z.hemiSky.setRGB(C(U.r,xe,z*.85)+W.r,C(U.g,xe,z*.85)+W.g,C(U.b,xe,z*.85)+W.b);G.r+=L.r*I*.033,G.g+=L.g*I*.033,G.b+=L.b*I*.033;let Se=s.snowCover,Ce=u.lerpColors(Ye,Xe,Se),we=te*Math.max(0,x.sunDir.y)+I*Math.max(0,x.moonDir.y)*.5,Te=Z.groundRad.setRGB(Ce.r*(F.r*we/Math.PI+G.r*.9),Ce.g*(F.g*we/Math.PI+G.g*.9),Ce.b*(F.b*we/Math.PI+G.b*.9));G.r=Math.max(G.r,et.r*j),G.g=Math.max(G.g,et.g*j),G.b=Math.max(G.b,et.b*j);let K=Math.max(G.r,G.g,G.b,1e-5),Ee=1+.45*A*M,De=K*it*Ee,Oe=T(De,.01,.95),ke=rt*(1+1.05*k(-13,-1,S)*(1-k(.5,4.5,S)))*C(1,.88,j)/V,Ae=0;Oe<ke&&(Ae=1-Oe/ke,Oe=ke);let je=Z.hemiCol.copy(G).multiplyScalar(1/K);je.lerp(Ze,Ae*(1-j*.5));let Me=A*M*(1-.6*z);je.lerp(Qe,.45*Me);let Ne=Z.hemiGround.copy(Te).multiplyScalar(1/Math.max(Te.r,Te.g,Te.b,1e-5));{let e=fe(Ne);Ne.lerp(Z.grey.setRGB(e,e,e),C(.5,.82,Math.max(Me,j))),Ne.lerp($e,.42*Math.max(Me,j)),Ne.multiplyScalar(C(.34,.3,Math.max(Me,j)))}Z.dbgHemiRaw=De,Z.dbgFloor=ke,i.setHemisphere(je,Ne,Oe);let Pe=1-k(3,20,S),q=Z.fogColor.lerpColors(ve,U,C(.45,.6,Pe)),Fe=fe(q);q.lerp(Z.grey.setRGB(Fe,Fe,Fe),z*.45);let J=Z.milk.setRGB(U.r*1.05+W.r,U.g*1.05+W.g,U.b*1.05+W.b);{let e=fe(J);J.lerp(Z.grey.setRGB(e,e,e),.35)}J.r=Math.max(J.r,q.r),J.g=Math.max(J.g,q.g),J.b=Math.max(J.b,q.b),q.lerp(J,B.milk),q.r=Math.max(q.r,.01*Ae/V),q.g=Math.max(q.g,.015*Ae/V),q.b=Math.max(q.b,.034*Ae/V);let Ie=B.fog*(1+.25*R);i.setFog(q,Ie);let Le=r.terrain&&Number.isFinite(r.terrain.waterLevel)?r.terrain.waterLevel:0,Re=B.fogH*(1-.2*R);i.setFogHeight(Le-4,Re);let ze=B.milk*M*1.6*k(.02,.4,s.sunFactor+.2),Be=C(.8,1,O(B.milk*1.1));Z.hookUniforms.uFcFogParams.value.set(B.fogFloor,ze,Be),Z.hookUniforms.uFcSunDir.value.copy(x.sunDir);{let e=A*M*(1-.55*B.milk);Z.fogWarm.setRGB(C(1,1.22,e),C(1,1.02,e),C(1,.8,e)),Z.fogCool.setRGB(C(1,.84,e),C(1,.93,e),C(1,1.16,e)),Z.hookUniforms.uFcFogWarm.value.copy(Z.fogWarm),Z.hookUniforms.uFcFogCool.value.copy(Z.fogCool)}p.fogHeight.y0=Le-4,p.fogHeight.H=Re;let Ve=s.wetness*(1-s.snowCover);i.globalUniforms.uWetness.value=Ve;let Y=a.uniforms;Y.uCamPos.value.copy(w.position),Y.uSunDir.value.copy(x.sunDir),Y.uMoonDir.value.copy(x.moonDir),Y.uMoonE.value=ie,Y.uTurbidity.value=D,Y.uHorizonColor.value.copy(q),Y.uGroundRadiance.value.copy(Te),Y.uNightAmount.value=j,Y.uCloudCover.value=z,Y.uTime.value=t,Y.uMoonBright.value=2*C(1,.4,O(z*1.1)),Y.uStarIntensity.value=C(.55,1.45,j)*C(1,.55,O(I/.14)),Y.uSkyFog.value=B.skyFog,Y.uFogSun.value.set(x.sunDir.x,x.sunDir.y,x.sunDir.z,ze*.8);let He=k(2,14,S);Y.uGlowKnee.value=C(T(.4/V,.2,1.2),1.15,He)*C(.75,1,k(-1.5,1,S)),Y.uSkySat.value=C(1.95,1.6,k(0,14,S)),Y.uScatterBoost.value=Z.scatterBoost,Y.uTwilight.value=k(-14,-7,S)*(1-k(-1,3,S))*(1-.7*B.skyFog),Y.uSunDisc.value=P.sunDiscRadiance*C(.34,1,k(1,16,S)),Z.sunTint.setRGB(1,1,1).lerp(Z.tmpC3.setRGB(1,.52,.2),.85*A*M),Y.uSunTint.value.copy(Z.sunTint),Y.uMilkyWay.value=3.6*C(1,.3,O(I/.12))*(1-.75*z)*j,a.setStarRotation(Z.latitude*y,x.siderealAngle),a.mesh.position.copy(w.position);let X=o.uniforms;if(X.uCamPos.value.copy(w.position),X.uLightDir.value.copy(_e),_e===x.sunDir){let e=X.uLightColor.value.copy(Z.sunTHigh),t=fe(e);e.lerp(Z.grey.setRGB(t,t,t),.18);let n=Math.max(e.r,e.g,e.b,1e-4);e.multiplyScalar(n**+C(1,.7,A)/n*P.sunE*C(1,.5,A)*k(-3.5,.2,S))}else X.uLightColor.value.copy(L).multiplyScalar(qe*x.moonIllumination*ne*.85);let Ue=d.copy(L).multiplyScalar(I*.16),We=Y.uNightGlow.value;X.uAmbientTop.value.copy(U).multiplyScalar(.7).add(u.copy(We).multiplyScalar(j*3)).add(Ue),X.uAmbientBottom.value.lerpColors(U,ve,C(.35,.12,A)).multiplyScalar(.66).add(u.copy(Te).multiplyScalar(C(.1,.03,A))).add(u.copy(We).multiplyScalar(j*1.3)).add(u.copy(Ue).multiplyScalar(.45)),X.uAmbientSunSide.value.copy(Z.sunSideAvg).multiplyScalar(1.25*A*M*(1-.6*z)),X.uScatterGain.value=C(2.9,1.5,j),X.uHazeColor.value.lerpColors(q,U,.35),X.uHazeDensity.value=Ie*.3,X.uCoverage.value=z,X.uCloudType.value=B.type,X.uDensity.value=B.density,X.uPrecip.value=B.precipitation,X.uCirrusCover.value=B.cirrus,X.uWindDir.value.set(s.wind.x,s.wind.y),X.uTime.value=t;{let e=.075*s.driftWind*v,t=X.uWeatherScale.value*4,n=e=>e-Math.floor(e/t)*t;X.uWindOffset.value.x=n(s.wind.x*e)+Z.cloudOffsetExtra.x,X.uWindOffset.value.z=n(s.wind.y*e)+Z.cloudOffsetExtra.z}o.compositeMesh.position.copy(w.position);let Ge=Z.cloudsEnabled&&(z>.005||B.cirrus>.005);o.compositeMesh.visible=Ge,o.probeMesh.visible=Ge,_&&o.resetHistory(),Ge&&e>0&&o.renderOffscreen(i.renderer,w);let ot=(.62+.26*k(.3,.9,z))*C(.35,1,k(4,15,S));l.update(Ge&&Z.cloudShadowsEnabled?z:0,ot);{let e=_e,t=Math.max(e.y,.32),n=X.uWeatherScale.value,r=e.x/t*nt+X.uWindOffset.value.x*.35,a=e.z/t*nt+X.uWindOffset.value.z*.35;Z.sunModXf.set(1/n,1/n,r/n,a/n),i.setSunModulation(l.texture,Z.sunModXf)}p.sunDirection.copy(x.sunDir).negate(),p.moonDirection.copy(x.moonDir),p.lightDirection.copy(H),p.sunColor.copy(F),p.sunIntensity=te,p.moonIntensity=I,p.moonColor.copy(L),p.skyColor.copy(je).multiplyScalar(Math.max(Oe,.02)/.8),p.skyColor.r=Math.max(p.skyColor.r,.004),p.skyColor.g=Math.max(p.skyColor.g,.006),p.skyColor.b=Math.max(p.skyColor.b,.012),p.groundColor.copy(Te),p.horizonColor.copy(q),p.ambientIntensity=Oe,p.nightFactor=R,p.sunAltitude=S,p.sunAzimuth=x.sunAzimuth*m,p.moonAltitude=ee,p.moonPhase=x.moonPhase,p.moonIllumination=x.moonIllumination,p.cloudCover=z,p.cirrusCover=B.cirrus,p.rain=Ve,p.wetness=Ve,p.snow=s.snowCover,p.precipitation=s.state.precipitation,p.fogDensity=Ie,p.wind.copy(s.wind),p.windStrength=s.windStrength,p.temperature=s.state.temp,p.exposure=V,p.dayOfYear=b,p.weather=s.name,s.name!==Z.lastWeatherName&&(Z.lastWeatherName=s.name,Z.probeDirtyUntil=t+14);let st=Math.abs(S)<12,ct=t<Z.probeDirtyUntil?.5:st||h.speed>1?.8:2;(_||t-c.lastRefresh>=ct)&&(Z.envIntensity=C(.4,.52,k(1,16,S))*(1-j)+.85*j,i.setEnvironment(c.refresh(t),Z.envIntensity))}function dt(e,t){if(!Z)return 1;let n=Z.sunModXf,r=Z.cloudShadow,i=r.size,a=e*n.x+n.z,o=t*n.y+n.w;a-=Math.floor(a),o-=Math.floor(o);let s=Math.min(i-1,Math.floor(a*i)),c=Math.min(i-1,Math.floor(o*i));return r.data[c*i+s]/255}function ft(e,t){let n=fe(e);return n>t&&e.multiplyScalar(t/n),e}function pt(e,t,n,r){return n>1e6?e.copy(t):(e.r=g(e.r,t.r,n,r),e.g=g(e.g,t.g,n,r),e.b=g(e.b,t.b,n,r),e)}var Q=new n,mt=new n,$={sunDir:null,moonDir:null,sunE:0,moonE:0,turbidity:2,scatterBoost:P.scatterBoost};function ht(e,t,n,r,i){$.sunDir=e.sunDir,$.moonDir=e.moonDir,$.sunE=P.sunE,$.moonE=r,$.turbidity=n,$.scatterBoost=Z.scatterBoost;let a=Z.sampleOut,o=Z.skyAvgTarget.setRGB(0,0,0),s=Z.horizonAvgTarget.setRGB(0,0,0),c=Z.sunSideAvgTarget.setRGB(0,0,0);Z.engine.camera.getWorldDirection(Z.forward);let l=Z.forward,u=0,d=0,f=1-k(3,20,e.sunAltitude*m),p=[[.5*Math.PI,1,C(.45,.6,f)],[50*y,6,C(.4,.32,f)],[14*y,8,C(.15,.08,f)]],h=mt.set(e.sunDir.x,0,e.sunDir.z).normalize();for(let[e,n,r]of p)for(let i=0;i<n;i++){let s=i/n*Math.PI*2+.3;Q.set(Math.cos(e)*Math.sin(s),Math.sin(e),-Math.cos(e)*Math.cos(s)),R(Q,t,$,10,4,a);let c=r/n*(1-.6*f*Math.max(0,Q.dot(h)));ft(a.radiance,.4),o.r+=a.radiance.r*c,o.g+=a.radiance.g*c,o.b+=a.radiance.b*c,u+=c}o.multiplyScalar(1/u);for(let e=0;e<10;e++){let n=e/10*Math.PI*2+.15,r=1.6*y;Q.set(Math.cos(r)*Math.sin(n),Math.sin(r),-Math.cos(r)*Math.cos(n)),R(Q,t,$,10,4,a),ft(a.radiance,.7);let i=.55+.45*Math.max(0,Q.x*l.x+Q.z*l.z);s.r+=a.radiance.r*i,s.g+=a.radiance.g*i,s.b+=a.radiance.b*i,d+=i}if(s.multiplyScalar(1/d),Math.hypot(e.sunDir.x,e.sunDir.z)>.001){let e=Math.atan2(h.x,-h.z),n=5*y;for(let r of[-30*y,0,30*y]){let i=e+r;Q.set(Math.cos(n)*Math.sin(i),Math.sin(n),-Math.cos(n)*Math.cos(i)),R(Q,t,$,10,4,a),ft(a.radiance,1.4),c.r+=a.radiance.r/3,c.g+=a.radiance.g/3,c.b+=a.radiance.b/3}}let g=Z.sky.uniforms.uNightGlow.value;o.r+=g.r*i*1.4,o.g+=g.g*i*1.4,o.b+=g.b*i*1.4,s.r+=g.r*i*2.4,s.g+=g.g*i*2.4,s.b+=g.b*i*2.4}function gt(e,t){if(!Z)return t.setRGB(.3,.45,.8);let n=Z.cel;$.sunDir=n.sunDir,$.moonDir=n.moonDir,$.sunE=P.sunE,$.moonE=Z.sky.uniforms.uMoonE.value,$.turbidity=Z.weather.state.turbidity,$.scatterBoost=Z.scatterBoost;let r=R(Q.copy(e).normalize(),Math.max(1,Z.engine.camera.position.y),$,12,5,Z.sampleOut);return t.copy(r.radiance)}function _t(){Z&&=(Z.removeHook&&Z.removeHook(),Z.engine.setSunModulation(null),Z.engine.setFogHeight(0,1e9),Z.engine.globalUniforms.uWetness.value=0,Z.scene.remove(Z.sky.mesh),Z.scene.remove(Z.clouds.compositeMesh),Z.sky.dispose(),Z.clouds.dispose(),Z.probe.dispose(),Z.cloudShadow.dispose(),null)}export{_t as dispose,ot as init,Ge as name,lt as update};