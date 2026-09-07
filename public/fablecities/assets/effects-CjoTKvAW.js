import{A as e,B as t,Et as n,Ft as r,Gt as i,Ht as a,J as o,Kt as s,Mt as c,Nt as l,Q as u,R as d,T as f,Ut as p,W as m,Wt as h,Y as g,Z as _,_ as v,at as y,b,c as x,ct as S,dt as C,g as w,gt as T,h as E,it as D,k as O,lt as k,m as A,mt as j,o as M,p as N,qt as P,s as F,st as I,u as L,ut as R,w as z}from"./index-eKs5Uldr.js";import{t as B}from"./noise-D8FvdR-x.js";function V(e,t,r,i={}){let a=new d(e,t,r,n,p);return a.colorSpace=``,a.wrapS=a.wrapT=O,a.minFilter=y,a.magFilter=D,a.generateMipmaps=!0,a.anisotropy=i.anisotropy||1,a.flipY=!1,a.needsUpdate=!0,a.name=i.name||`effects-sprite`,a}function ee(e,t=256,n=4,r=4,i=1){let a=t*n,o=t*r,s=new Uint8Array(a*o*4),c=new B(e^368846),l=A(e^81),u=new Float32Array(t*t);for(let e=0;e<r;e++)for(let r=0;r<n;r++){let n=[],i=6+l.int(0,4);for(let e=0;e<i;e++){let t=l()*Math.PI*2,r=e===0?0:.09+l()*.25;n.push({x:.5+Math.cos(t)*r,y:.5+Math.sin(t)*r,s:e===0?.28:.11+l()*.15})}let o=l()*100,d=3+l()*2,f=.4+l()*.16;for(let e=0;e<t;e++)for(let r=0;r<t;r++){let i=(r+.5)/t,a=(e+.5)/t,s=0;for(let e of n){let t=i-e.x,n=a-e.y,r=Math.sqrt(t*t+n*n)/e.s;s+=Math.max(0,1-r*r)}let l=c.fbm2D(i*d+o,a*d+o*.7,3,2.15,.55),p=c.fbm2D(i*d*3.1+o*1.9,a*d*3.1+o*.3,2,2,.5),m=F(s*.8)*(.55+.45*(l*.5+.5)),h=L(f*(.6-l*.35),1,m+p*.16),g=i-.5,_=a-.5,v=Math.sqrt(g*g+_*_)*2;h*=1-L(.72+p*.1,.98,v),u[e*t+r]=F(h)}for(let n=0;n<t;n++)for(let i=0;i<t;i++){let o=u[n*t+i],c=u[n*t+Math.max(0,i-1)],l=u[n*t+Math.min(t-1,i+1)],d=u[Math.max(0,n-1)*t+i],f=u[Math.min(t-1,n+1)*t+i],p=(c-l)*7*t/256,m=(d-f)*7*t/256,h=1,g=(i+.5)/t-.5,_=(n+.5)/t-.5,v=Math.min(1,Math.sqrt(g*g+_*_)*2.2),y=Math.sqrt(Math.max(0,1-v*v));p=p*.85+g*2.2*.65,m=m*.85+_*2.2*.65,h=h*.85+y*.65;let b=Math.hypot(p,m,h)||1;p/=b,m/=b,h/=b;let x=L(0,.82,o)**1.1,S=((e*t+n)*a+(r*t+i))*4;s[S]=Math.round((p*.5+.5)*255),s[S+1]=Math.round((m*.5+.5)*255),s[S+2]=Math.round((h*.5+.5)*255),s[S+3]=Math.round(x*255)}}return{texture:V(s,a,o,{anisotropy:i,name:`effects-smoke-atlas`}),cols:n,rows:r}}function te(e=32,t=256){let n=new Uint8Array(e*t*4);for(let r=0;r<t;r++){let i=(r+.5)/t,a=(i-.62)/.3,o=Math.exp(-a*a)*(.35+.65*L(0,.3,i))*(1-L(.9,1,i)),s=.55+.45*L(.15,.75,i);for(let t=0;t<e;t++){let i=((t+.5)/e-.5)*2/s,a=Math.exp(-i*i*4.5),c=F(a*o),l=(r*e+t)*4;n[l]=255,n[l+1]=255,n[l+2]=255,n[l+3]=Math.round(c*255)}}return V(n,e,t,{name:`effects-rain-streak`})}function ne(e,t=64){let n=new Uint8Array(t*t*4),r=A(e^373157),i=[],a=5+r.int(0,2);for(let e=0;e<a;e++){let t=(e+.5)/a*Math.PI*.9+Math.PI*.05+(r()-.5)*.25,n=.28+r()*.16;i.push({x:.5+Math.cos(t)*n,y:.15+Math.sin(t)*n,s:.035+r()*.03})}for(let e=0;e<t;e++)for(let r=0;r<t;r++){let a=(r+.5)/t,o=(e+.5)/t,s=0;for(let e of i){let t=Math.hypot(a-e.x,o-e.y)/e.s;s+=Math.max(0,1-t*t)}let c=a-.5,l=o-.12,u=Math.hypot(c,l*1.2),d=Math.max(0,1-u/.46)*L(-.02,.1,l)*.26,f=Math.exp(-((u/.095)**2))*.7;s=F(s*.8+d+f);let p=(e*t+r)*4;n[p]=255,n[p+1]=255,n[p+2]=255,n[p+3]=Math.round(s*255)}return V(n,t,t,{name:`effects-spray`})}function re(e=64){let t=new Uint8Array(e*e*4);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=(r+.5)/e-.5,a=(n+.5)/e-.5,o=Math.sqrt(i*i+a*a)*2,s=Math.exp(-(((o-.68)/.2)**2)),c=Math.exp(-(((o-.36)/.12)**2))*.5,l=F(s+c)*(1-L(.86,1,o)),u=(n*e+r)*4;t[u]=255,t[u+1]=255,t[u+2]=255,t[u+3]=Math.round(l*255)}return V(t,e,e,{name:`effects-ring`})}function ie(e=32){let t=new Uint8Array(e*e*4);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=(r+.5)/e-.5,a=(n+.5)/e-.5,o=Math.sqrt(i*i+a*a)*2,s=Math.atan2(a,i),c=o/(1+.06*Math.sin(s*5+.7)+.04*Math.sin(s*3)),l=F((1-L(.2,.62,c))*.92+(1-L(.55,1,c))*.3),u=(n*e+r)*4;t[u]=255,t[u+1]=255,t[u+2]=255,t[u+3]=Math.round(l*255)}return V(t,e,e,{name:`effects-snowflake`})}var H=`
uniform sampler2D tDepth;
uniform float uHasDepth;
uniform vec2 uResolution;
uniform vec2 uNearFar;
#include <packing>
float effectsSceneViewZ() {
  float d = texture2D(tDepth, gl_FragCoord.xy / uResolution).x;
  return perspectiveDepthToViewZ(d, uNearFar.x, uNearFar.y);
}
`,ae=`
precision highp float;
attribute vec2 aCorner;
attribute vec3 aOrigin;
attribute vec3 aVel;
attribute vec4 aParam;   // phase, life, size0, size1
attribute vec4 aStyle;   // spriteIdx, rotSpeed, buoyancy, drag
attribute vec4 aColor;   // albedo rgb, opacity
attribute vec2 aKind;    // x: 0 smoke/steam, 1 dust — y: optical density (0 thin steam … 1 thick soot)

uniform float uTime;
uniform vec3 uWind;      // world wind velocity (m/s) at plume height
uniform vec2 uAtlas;     // cols, rows
uniform vec2 uFade;      // distance fade start, end
uniform float uSizeBoost;
uniform float uDustFade; // 1 dry … 0 raining (dust is knocked down by rain)

varying vec2 vUv;
varying vec4 vColor;     // albedo + alpha
varying vec3 vRot;       // cos, sin of billboard rotation, mirror sign
varying float vViewZ;
varying vec3 vViewPos;   // view-space position of the billboard centre
varying float vSoft;
varying float vAge;
varying float vKind;
varying float vDens;
varying float vNear;

#include <fog_pars_vertex>

void main() {
  float phase = aParam.x;
  float life = aParam.y;
  float t = fract(uTime / life + phase) * life;
  float u = t / life;
  float dust = step(0.5, aKind.x);

  // drag-limited initial velocity
  float k = max(aStyle.w, 0.02);
  vec3 p = aOrigin + aVel * (1.0 - exp(-k * t)) / k;
  // buoyancy: accelerates then settles to a terminal rise (negative for dust: settles back down)
  p.y += aStyle.z * t * min(t, 4.0) * 0.5;
  if (dust > 0.5) p.y = max(p.y, aOrigin.y + 0.15);
  // wind entrainment: velocity approaches wind speed with tau = 3.5 s (dust stays low: half the wind)
  float tau = 3.5 - 1.5 * dust;
  p += uWind * (t - tau * (1.0 - exp(-t / tau))) * (1.0 - 0.5 * dust);
  // coherent turbulence: keyed on the EMISSION time so puffs born together meander together (one column
  // that snakes, not 250 sprites wandering) + a small per-puff jitter that grows with age
  float eh = aOrigin.x * 0.37 + aOrigin.z * 0.71 + aOrigin.y * 0.13;
  float te = uTime - t;
  float rise = min(t, 8.0);
  p += vec3(sin(te * 0.55 + eh) + 0.5 * sin(te * 1.35 + eh * 1.7), 0.0, cos(te * 0.43 + eh * 1.3) + 0.5 * cos(te * 1.1 + eh * 0.6)) * rise * (0.16 - 0.06 * dust);
  float sp = phase * 43.7;
  float tb = min(t, 6.0) * (0.09 + 0.10 * dust);
  p += vec3(sin(t * 1.31 + sp), sin(t * 0.83 + sp * 1.7) * 0.6 * (1.0 - 0.6 * dust), cos(t * 1.07 + sp * 0.6)) * tb;

  // growth: the puff leaves the mouth at ~0.6 stack diameters and STAYS tight for the first third of its
  // life (the dense, opaque column), then blooms as it entrains air — pow() delays the widening
  float grow = pow(1.0 - exp(-t / (life * 0.34)), 0.92);
  float size = mix(aParam.z, aParam.w, grow) * uSizeBoost;
  float ang = aStyle.y * t + phase * 6.2831853;
  float c = cos(ang), s = sin(ang);
  float mirror = fract(phase * 17.31) < 0.5 ? -1.0 : 1.0;
  vRot = vec3(c, s, mirror);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  float dist = -mvPosition.z;
  vViewPos = mvPosition.xyz;
  // keep far plumes readable: grow slightly with distance, then fade out
  size *= 1.0 + dist * 0.0008;
  vec2 corner = vec2(aCorner.x * c - aCorner.y * s, aCorner.x * s + aCorner.y * c) * size * 0.5;
  mvPosition.xy += corner;

  // optical mass conservation: a puff that grows N× in diameter thins out
  float conserve = pow(aParam.z / max(mix(aParam.z, aParam.w, grow), 1e-3), 0.56);
  float fadeIn = smoothstep(0.0, 0.02, u);
  // the plume must END: after ~60 % of the life the puff dissolves into haze instead of roping on
  float fadeOut = pow(1.0 - u, 1.35) * exp(-0.75 * u);
  float distFade = 1.0 - smoothstep(uFade.x, uFade.y, dist);
  float nearFade = smoothstep(1.5, 6.0, dist);
  // dust: densest close to the ground, thinning as it lifts, gone in rain
  float lift = 1.0 - 0.55 * dust * clamp((p.y - aOrigin.y) / 4.0, 0.0, 1.0);
  float rainOff = mix(1.0, uDustFade, dust);
  vColor = vec4(aColor.rgb, aColor.a * fadeIn * fadeOut * conserve * distFade * nearFade * lift * rainOff);

  float col = mod(aStyle.x, uAtlas.x);
  float row = floor(aStyle.x / uAtlas.x);
  vUv = (vec2(col, row) + vec2(aCorner.x * mirror, aCorner.y) * 0.5 + 0.5) / uAtlas;
  vViewZ = mvPosition.z;
  vSoft = mix(0.7, 4.0, u) * (0.5 + 0.5 * size / max(aParam.w, 1e-3));
  vAge = u;
  vKind = aKind.x;
  vDens = aKind.y;
  vNear = 1.0 - smoothstep(6.0, 22.0, dist);

  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,oe=`
precision highp float;
uniform sampler2D uAtlasTex;
uniform vec3 uLightDirView;  // direction light travels (view space) — sun by day, moon by night
uniform vec3 uLightColor;    // radiance scale of that light
uniform vec3 uAmbient;       // sky radiance reaching the plume
uniform vec3 uGroundBounce;  // ground radiance from below
uniform vec4 uLocalPos[4];    // view-space xyz, range
uniform vec3 uLocalColor[4];  // colour × intensity (cd)
uniform int uLocalCount;

varying vec2 vUv;
varying vec4 vColor;
varying vec3 vRot;
varying float vViewZ;
varying vec3 vViewPos;
varying float vSoft;
varying float vAge;
varying float vKind;
varying float vDens;
varying float vNear;

#include <fog_pars_fragment>
${H}

void main() {
  vec4 tex = texture2D(uAtlasTex, vUv);
  float alpha = tex.a * vColor.a;
  // occlusion + soft edge against the real scene depth (depthTest is off)
  if (uHasDepth > 0.5) {
    float dz = vViewZ - effectsSceneViewZ();      // > 0 when the particle is in front of the scene
    alpha *= clamp(dz / vSoft, 0.0, 1.0);
  }
  if (alpha < 0.003) discard;

  // lobe pseudo-normal, mirrored + rotated with the billboard
  vec3 n = tex.rgb * 2.0 - 1.0;
  n.x *= vRot.z;
  n.xy = vec2(n.x * vRot.x - n.y * vRot.y, n.x * vRot.y + n.y * vRot.x);
  n = normalize(n);
  vec3 viewDir = normalize(-vViewPos);
  vec3 L = -uLightDirView;
  float ndl = dot(n, L);
  // terminator on every lobe: a hard-ish lit side and a shadow side. Dense (sooty) smoke has a narrow
  // wrap and a dark shadow side; thin steam wraps almost all the way round (strong multiple scattering).
  float wrap = mix(0.55, 0.16, vDens);
  float lit = mix(0.34, 0.05, vDens) + (1.0 - mix(0.34, 0.05, vDens)) * smoothstep(-wrap, wrap + 0.30, ndl);
  // forward scattering: looking towards the light through the thin fringe — backlit plumes glow at sunset
  float vl = max(dot(viewDir, -L), 0.0);
  float thin = 1.0 - tex.a * 0.75;
  float forward = pow(vl, 8.0) * thin * (1.6 + 0.6 * vKind);
  // silhouette rim pow(1 − n·v, 3): the fringe of every puff lights up when the light is behind it
  float ndv = max(dot(n, viewDir), 0.0);
  float rim = pow(1.0 - ndv, 3.0) * smoothstep(0.1, 0.95, vl) * 1.3 * (0.5 + 0.5 * thin);
  // self-shadowing: the dense young core is much darker than the fringe — this is what makes an
  // industrial plume read as a lit VOLUME with an opaque body instead of a white airbrush smear
  float core = 1.0 - (0.22 + 0.62 * vDens + 0.10 * vKind) * tex.a * (1.0 - vAge * 0.55);
  // thick medium: sky light arrives from all sides (slight top bias), ground bounce from below.
  // A dense plume swallows most of the sky light; steam is almost pure multiple scattering.
  vec3 sky = uAmbient * (0.82 + 0.18 * n.y) * (1.0 - 0.72 * vDens) + uGroundBounce * (0.30 - 0.22 * n.y);
  vec3 light = sky * core + uLightColor * (lit * core + forward + rim);
  // local lights (floodlights, street lamps): inverse-square with a smooth range cutoff
  for (int i = 0; i < 4; i++) {
    if (i >= uLocalCount) break;
    vec3 toL = uLocalPos[i].xyz - vViewPos;
    float d2 = dot(toL, toL);
    float d = sqrt(d2);
    float range = uLocalPos[i].w;
    float win = clamp(1.0 - d / range, 0.0, 1.0);
    float att = win * win / (d2 + 1.0);
    vec3 Ld = toL / max(d, 1e-3);
    float w = dot(n, Ld) * 0.5 + 0.5;
    light += uLocalColor[i] * att * (w * w * core + 0.25);
  }
  // soot dilutes as the plume entrains air: a young puff is dark grey-brown, an old one pale haze
  vec3 albedo = vColor.rgb * (0.85 + 0.55 * vAge * vDens);
  vec3 col = albedo * light;

  gl_FragColor = vec4(col, alpha);
  #include <fog_fragment>
}
`,U={industrial:{count:360,life:[6.5,12],rise:[3.4,4.8],lateral:.34,size:[1.45,7.6],albedo:[.295,.276,.252],opacity:1,drag:.22,buoyancy:.1,rot:.12,jitter:.26,sprites:[0,16],dens:1},steam:{count:90,life:[2.2,4.2],rise:[3,4.2],lateral:.28,size:[.55,4.2],albedo:[.9,.91,.94],opacity:.46,drag:.7,buoyancy:.1,rot:.3,jitter:.22,sprites:[0,16],dens:.18},chimney:{count:110,life:[3.6,7],rise:[1.7,2.6],lateral:.18,size:[.34,3.6],albedo:[.415,.402,.386],opacity:.88,drag:.55,buoyancy:.06,rot:.3,jitter:.14,sprites:[0,16],dens:.8},dust:{count:150,life:[2.6,5.5],rise:[.35,1],lateral:1.5,size:[1.5,4.6],albedo:[.55,.455,.325],opacity:.62,drag:1,buoyancy:-.05,rot:.2,jitter:1,sprites:[0,16],kind:1,bursts:5,dens:.72},exhaust:{count:14,life:[1,1.8],rise:[.6,1],lateral:.4,size:[.18,1],albedo:[.42,.41,.4],opacity:.34,drag:1.5,buoyancy:.02,rot:.4,jitter:.13,sprites:[0,16],dens:.8}},se=class n{constructor({atlas:n,maxParticles:o,name:c=`effects-smoke`}){this.max=o,this.count=0;let d=new u;d.setAttribute(`position`,new m(new Float32Array(12),3)),d.setAttribute(`aCorner`,new m(new Float32Array([-1,-1,1,-1,1,1,-1,1]),2)),d.setIndex([0,1,2,0,2,3]),this.origin=new Float32Array(o*3),this.vel=new Float32Array(o*3),this.param=new Float32Array(o*4),this.style=new Float32Array(o*4),this.color=new Float32Array(o*4),this.kind=new Float32Array(o*2);let f=(e,n)=>{let r=new _(e,n);return r.setUsage(t),r};d.setAttribute(`aOrigin`,f(this.origin,3)),d.setAttribute(`aVel`,f(this.vel,3)),d.setAttribute(`aParam`,f(this.param,4)),d.setAttribute(`aStyle`,f(this.style,4)),d.setAttribute(`aColor`,f(this.color,4)),d.setAttribute(`aKind`,f(this.kind,2)),d.instanceCount=0,d.boundingSphere=new r(new i,1e6),this.geometry=d,this.uniforms=a.merge([b.fog,{uTime:{value:0},uWind:{value:new i},uAtlas:{value:new h(n.cols,n.rows)},uAtlasTex:{value:null},uFade:{value:new h(700,1100)},uSizeBoost:{value:1},uDustFade:{value:1},uLightDirView:{value:new i(0,-1,0)},uLightColor:{value:new e(1,1,1)},uAmbient:{value:new e(.3,.3,.3)},uGroundBounce:{value:new e(.1,.1,.1)},uLocalPos:{value:Array.from({length:4},()=>new s(0,0,0,1))},uLocalColor:{value:Array.from({length:4},()=>new e(0,0,0))},uLocalCount:{value:0},tDepth:{value:null},uHasDepth:{value:0},uResolution:{value:new h(1,1)},uNearFar:{value:new h(1,15e3)}}]),this.uniforms.uAtlasTex.value=n.texture,this.material=new l({vertexShader:ae,fragmentShader:oe,uniforms:this.uniforms,transparent:!0,depthWrite:!1,depthTest:!1,blending:1,fog:!0,lights:!1,name:c}),this.mesh=new C(d,this.material),this.mesh.name=c,this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.receiveShadow=!1,this.mesh.renderOrder=900,this.mesh.matrixAutoUpdate=!1}static countFor(e){let t=U[e.kind]||U.industrial,n=e.scale??1;return Math.max(1,Math.round(t.count*n**1.3*(e.density??1)))}build(e,t){let r=0;for(let t of e)r+=n.countFor(t);let i=r>this.max?this.max/r:1,a=0,o=this.origin,s=this.vel,c=this.param,l=this.style,u=this.color,d=this.kind;for(let r of e){let e=U[r.kind]||U.industrial,f=r.scale??1,p=Math.max(1,Math.round(n.countFor(r)*i)),m=f**.6,h=e.bursts||0,g=Math.min(1.6,1/Math.sqrt(i));for(let n=0;n<p&&a<this.max;n++,a++){let n=r.x,i=r.y,p=r.z;if(r.rect){let{w:e,d:i,yaw:a}=r.rect,o=t.int(0,3),s=t()*2-1,c=o===0||o===1?s*e*.5:o===2?e*.5:-e*.5,l=o===0?i*.5:o===1?-i*.5:s*i*.5,u=Math.cos(a),d=Math.sin(a);n+=c*u-l*d,p+=c*d+l*u}else{let r=t()*Math.PI*2,i=Math.sqrt(t())*e.jitter*Math.sqrt(f);n+=Math.cos(r)*i,p+=Math.sin(r)*i}o[a*3]=n,o[a*3+1]=i,o[a*3+2]=p;let _=t.range(e.rise[0],e.rise[1])*(.65+.35*f),v=t()*Math.PI*2,y=e.lateral*(.3+t()*.7),b=Math.cos(v)*y,x=Math.sin(v)*y;if(r.rect){let t=n-r.x,i=p-r.z,a=Math.hypot(t,i)||1;b+=t/a*e.lateral*.8,x+=i/a*e.lateral*.8}s[a*3]=b,s[a*3+1]=_,s[a*3+2]=x;let S=t.range(e.life[0],e.life[1])*t.range(.85,1.25)*(.8+.2*f);c[a*4]=h?(t.int(0,h-1)+t()*.22)/h:t(),c[a*4+1]=S,c[a*4+2]=e.size[0]*m*t.range(.75,1.25),c[a*4+3]=e.size[1]*m*t.range(.7,1.35),l[a*4]=t.int(e.sprites[0],e.sprites[1]-1),l[a*4+1]=(t()<.5?-1:1)*e.rot*t.range(.5,1.2),l[a*4+2]=e.buoyancy*f,l[a*4+3]=e.drag;let C=.92+t()*.16,w=r.albedo||e.albedo;u[a*4]=w[0]*C,u[a*4+1]=w[1]*C,u[a*4+2]=w[2]*C,u[a*4+3]=Math.min(1,(r.opacity??e.opacity)*t.range(.8,1.15)*g),d[a*2]=e.kind||0,d[a*2+1]=r.dens??e.dens??1}if(a>=this.max)break}this.count=a,this.geometry.instanceCount=a,this.mesh.visible=a>0;for(let e of[`aOrigin`,`aVel`,`aParam`,`aStyle`,`aColor`,`aKind`])this.geometry.getAttribute(e).needsUpdate=!0;return a}dispose(){this.geometry.dispose(),this.material.dispose()}},W=`
vec2 fxHash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float fxHash1(vec2 p) { return fxHash2(p).x; }
float fxValueNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = fxHash1(i), b = fxHash1(i + vec2(1.0, 0.0)), c = fxHash1(i + vec2(0.0, 1.0)), d = fxHash1(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
/**
 * Puddle height field on the ground plane (0..1). ONE low-frequency field (two large, smooth octaves,
 * nothing under ~5 m): pools are clean mirrors with soft shores, never speckle. Pools are the high values.
 */
float fxPuddleField(vec2 xz) {
  return fxValueNoise(xz * 0.085) * 0.68 + fxValueNoise(xz * 0.21 + 17.3) * 0.32;
}
/**
 * Puddle mask for a wetness level: 0 dry … 1 inside the pool (≈ 20 % of a flat surface when soaked).
 * rim returns the damp shore band just outside the pool (0..1). Pools shrink as the ground dries.
 */
float fxPuddleMask(vec2 xz, float wet, out float rim) {
  float pn = fxPuddleField(xz);
  float thr = 0.655 - 0.075 * wet;
  float fill = smoothstep(0.10, 0.55, wet);
  rim = smoothstep(thr - 0.10, thr, pn) * fill;
  return smoothstep(thr - 0.004, thr + 0.03, pn) * fill;
}
`,ce=`
precision highp float;
attribute vec2 aCorner;
attribute vec4 aSeed;      // rx, ry, rz in [0,1), speed factor

uniform float uTime;
uniform vec3 uCenter;      // volume centre (world)
uniform vec3 uVolume;      // volume size (world)
uniform vec3 uVelocity;    // base fall velocity (world, m/s) incl. wind
uniform float uMode;       // 0 = rain streak, 1 = snow flake
uniform float uStreak;     // exposure length factor (seconds of motion blur)
uniform vec2 uSize;        // streak width (m), flake size (m)
uniform float uPixel;      // world size of one pixel at z = 1
uniform float uMinPx;      // minimum on-screen width (px)
uniform float uSway;       // lateral sway amplitude (snow)
uniform vec4 uDistFade;    // fade-in start/end, fade-out start/end (m)

varying vec2 vUv;
varying float vAlpha;
varying float vViewZ;
varying float vNear;     // 1 = right in front of the lens (defocused), 0 = far
#include <fog_pars_vertex>

void main() {
  float speed = mix(0.75, 1.25, aSeed.w);
  vec3 vel = uVelocity * speed;
  vec3 base = aSeed.xyz * uVolume;
  vec3 travel = vel * uTime;
  if (uMode > 0.5) {
    float ph = aSeed.x * 37.0 + aSeed.z * 11.0;
    // drift + tumble: slow sway, a faster flutter and a per-flake fall-speed wobble (turbulence)
    travel.x += sin(uTime * 0.9 + ph) * uSway + sin(uTime * 2.3 + ph * 0.7) * uSway * 0.3 + sin(uTime * 4.1 + ph * 2.3) * 0.06;
    travel.z += cos(uTime * 0.7 + ph * 1.3) * uSway + cos(uTime * 1.9 + ph) * uSway * 0.3 + cos(uTime * 3.7 + ph * 1.9) * 0.06;
    travel.y += sin(uTime * 1.7 + ph * 3.1) * 0.12;
  }
  vec3 local = mod(base + travel - uCenter + uVolume * 0.5, uVolume) - uVolume * 0.5;
  vec3 p = uCenter + local;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = -mv.z;
  float px = uPixel * dist;       // metres per pixel at this depth

  vec2 c = aCorner;
  float alpha = 1.0;
  vec3 vv = mat3(viewMatrix) * vel;
  vec2 dir = vv.xy;
  float l2 = dot(dir, dir);
  dir = l2 > 1e-6 ? dir / sqrt(l2) : vec2(0.0, -1.0);
  vec2 perp = vec2(-dir.y, dir.x);
  float near = 0.0;
  if (uMode < 0.5) {
    // streak: motion-blur length, width never under uMinPx pixels; right in front of the lens the drop
    // is out of focus (wider, fainter)
    // per-drop exposure length: real rain is a mix of long and short strokes, never one ruled length
    float len = max(length(vv) * uStreak * mix(0.55, 1.45, aSeed.z), px * 4.0);
    float wid = max(uSize.x, px * uMinPx);
    near = 1.0 - smoothstep(0.6, 3.0, dist);
    wid *= 1.0 + 1.2 * near;
    // drops thin out with distance: a 200 m drop is a hint of haze, not the same rod as a 5 m one
    alpha *= (1.0 - 0.45 * near) * mix(0.62, 1.0, aSeed.y) * (1.0 - 0.55 * smoothstep(25.0, 140.0, dist));
    mv.xy += dir * c.y * len * 0.5 + perp * c.x * wid * 0.5;
  } else {
    // flakes: PHYSICAL size (∝ 1/depth) with a wide spread — near flakes are fat defocused bokeh discs,
    // far ones collapse towards a 1.2 px dot, so the fall reads as a depth volume instead of confetti
    near = 1.0 - smoothstep(1.2, 5.0, dist);
    float big = smoothstep(0.80, 1.0, aSeed.y);
    float s = uSize.y * mix(0.30, 1.0, aSeed.y * aSeed.y) * (1.0 + 1.8 * big) * (1.0 + 1.9 * near);
    s = max(s, px * uMinPx);
    alpha *= (1.0 - 0.82 * near) * mix(0.45, 1.0, aSeed.y) * (1.0 - 0.45 * smoothstep(30.0, 90.0, dist));
    float len = s + length(vv) * uStreak;
    mv.xy += dir * c.y * len * 0.5 + perp * c.x * s * 0.5;
  }
  vNear = near;

  vec3 e = abs(local) / (uVolume * 0.5);
  float edge = (1.0 - smoothstep(0.7, 1.0, e.x)) * (1.0 - smoothstep(0.7, 1.0, e.z)) * (1.0 - smoothstep(0.85, 1.0, e.y));
  float df = smoothstep(uDistFade.x, uDistFade.y, dist) * (1.0 - smoothstep(uDistFade.z, uDistFade.w, dist));
  vAlpha = edge * df * alpha;
  vUv = c * 0.5 + 0.5;
  vViewZ = mv.z;
  vec4 mvPosition = mv;
  gl_Position = projectionMatrix * mv;
  #include <fog_vertex>
}
`,le=`
precision highp float;
uniform sampler2D uTex;
uniform sampler2D tScene;   // scene colour of this frame (background)
uniform vec3 uColor;        // sky-lit colour of the drop / flake
uniform float uOpacity;
uniform float uLumaFade;    // 0..1 how much a near-white sky hides the drops
uniform float uMode;
varying vec2 vUv;
varying float vAlpha;
varying float vViewZ;
varying float vNear;
#include <fog_pars_fragment>
${H}
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
void main() {
  float tex = texture2D(uTex, vUv).a;
  if (uMode > 0.5 && vNear > 0.15) {
    // defocused near flake: a flat bokeh disc with a faintly brighter rim, not a hard dot
    float r = length(vUv * 2.0 - 1.0);
    float boke = (1.0 - smoothstep(0.72, 1.0, r)) * (0.72 + 0.28 * smoothstep(0.30, 0.85, r));
    tex = mix(tex, boke, smoothstep(0.15, 0.75, vNear));
  }
  float a = tex * vAlpha * uOpacity;
  if (uHasDepth > 0.5) a *= clamp((vViewZ - effectsSceneViewZ()) / 0.35, 0.0, 1.0);
  if (a < 0.003) discard;
  vec3 bg = texture2D(tScene, gl_FragCoord.xy / uResolution).rgb;
  float bl = dot(bg, LUMA);
  vec3 col;
  if (uMode < 0.5) {
    // A raindrop is a LENS, not a white rod: it shows the (slightly dimmed, defocused) background behind
    // it plus a small lift of sky radiance. Then a hard contrast limiter keeps the streak within ~22 % of
    // the local background luminance, so drops read over dark asphalt AND over a bright overcast sky
    // without ever looking like scratches painted on the frame.
    col = bg * 0.86 + uColor * 0.55;
    float cl = dot(col, LUMA);
    // over a dark surface the floor dominates (a drop is clearly brighter than wet asphalt); over a bright
    // overcast sky the ratio dominates (only ~35 % lift) so the streaks never read as scratches
    float lim = bl * 1.35 + 0.075;
    col *= min(1.0, lim / max(cl, 1e-4));
    // never darker than ~85 % of the background either
    float lo = bl * 0.86;
    col *= max(1.0, lo / max(dot(col, LUMA), 1e-4));
    a *= 1.0 - uLumaFade * smoothstep(1.4, 5.0, bl / max(dot(uColor, LUMA), 1e-4));
  } else {
    // flakes are never darker than what is behind them (no dark specks against a bright overcast sky)
    col = max(uColor, bg * 1.12 + vec3(0.01));
  }
  gl_FragColor = vec4(col, a);
  #include <fog_fragment>
}
`,ue=`
precision highp float;
attribute vec2 aCorner;
attribute vec3 aPos;       // world position on the ground
attribute vec4 aSeed;      // phase, life, size, rotation
attribute float aKind;     // 0 = spray crown (camera-facing), 1 = impact ring (ground, puddles only)
uniform float uTime;
uniform vec3 uAnchor;
uniform float uRadius;
uniform float uWet;        // wetness → puddle mask (same field as WetSurfaces)
varying vec2 vUv;
varying float vAlpha;
varying float vViewZ;
varying float vKind;
#include <fog_pars_vertex>
${W}
void main() {
  float life = aSeed.y;
  float t = fract(uTime / life + aSeed.x) * life;
  float u = t / life;
  float d = length(aPos.xz - uAnchor.xz) / uRadius;
  float area = 1.0 - smoothstep(0.6, 1.0, d);
  vec3 p = aPos;
  float alpha;
  if (aKind < 0.5) {
    // crown: stands on the ground, faces the camera about the vertical axis, shoots up then falls
    vec3 camRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    camRight.y = 0.0;
    camRight = normalize(camRight + vec3(1e-4, 0.0, 0.0));
    float w = aSeed.z;                                   // 0.12-0.22 m
    float h = w * 1.4 * (0.35 + 0.65 * smoothstep(0.0, 0.4, u)) * (1.0 - 0.35 * smoothstep(0.6, 1.0, u));
    p += camRight * aCorner.x * w * 0.5 + vec3(0.0, (aCorner.y + 1.0) * 0.5 * h, 0.0);
    alpha = smoothstep(0.0, 0.06, u) * pow(1.0 - u, 1.3);
  } else {
    // ring: expands fast then decelerates; only inside puddles
    float rim;
    float puddle = fxPuddleMask(aPos.xz, uWet, rim);
    float s = aSeed.z * 2.8 * (0.15 + 0.85 * sqrt(u));   // final diameter 0.20-0.36 m
    float c = cos(aSeed.w), sn = sin(aSeed.w);
    vec2 rc = vec2(aCorner.x * c - aCorner.y * sn, aCorner.x * sn + aCorner.y * c) * s * 0.5;
    p += vec3(rc.x, 0.005, rc.y);
    alpha = smoothstep(0.0, 0.04, u) * pow(1.0 - u, 1.1) * smoothstep(0.2, 0.6, puddle);
  }
  vKind = aKind;
  vUv = aCorner * 0.5 + 0.5;
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  vViewZ = mvPosition.z;
  // A splash crown is a 15 cm object: past ~20 m it is sub-pixel and a field of them reads as gravel
  // grain on the tarmac rather than as rain. Rings are 3x larger, so they survive a little further.
  float far = -mvPosition.z;
  float dfade = aKind < 0.5 ? 1.0 - smoothstep(15.0, 38.0, far) : 1.0 - smoothstep(26.0, 62.0, far);
  vAlpha = alpha * area * dfade;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,de=`
precision highp float;
uniform sampler2D uTexCrown;
uniform sampler2D uTexRing;
uniform vec3 uColor;        // crown colour
uniform vec3 uColorRing;
uniform float uOpacity;
varying vec2 vUv;
varying float vAlpha;
varying float vViewZ;
varying float vKind;
#include <fog_pars_fragment>
${H}
void main() {
  float tex = vKind < 0.5 ? texture2D(uTexCrown, vUv).a : texture2D(uTexRing, vUv).a;
  float a = tex * vAlpha * uOpacity;
  // both kinds sit ON the ground: bias towards the camera so the surface itself never occludes them
  if (uHasDepth > 0.5) a *= clamp((vViewZ - effectsSceneViewZ() + 0.2) / 0.3, 0.0, 1.0);
  if (a < 0.003) discard;
  float fogAtt = 1.0;
  #ifdef USE_FOG
    #ifdef FOG_EXP2
      fogAtt = exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
    #else
      fogAtt = 1.0 - smoothstep(fogNear, fogFar, vFogDepth);
    #endif
  #endif
  vec3 col = vKind < 0.5 ? uColor : uColorRing;
  gl_FragColor = vec4(col * a * fogAtt, a);
}
`;function fe(){return{tDepth:{value:null},uHasDepth:{value:0},uResolution:{value:new h(1,1)},uNearFar:{value:new h(1,15e3)}}}var G=class{constructor({count:t,texture:n,mode:o,name:c}){let d=new u;d.setAttribute(`position`,new m(new Float32Array(12),3)),d.setAttribute(`aCorner`,new m(new Float32Array([-1,-1,1,-1,1,1,-1,1]),2)),d.setIndex([0,1,2,0,2,3]),this.seed=new Float32Array(t*4),d.setAttribute(`aSeed`,new _(this.seed,4)),d.instanceCount=t,d.boundingSphere=new r(new i,1e6),this.count=t,this.uniforms=a.merge([b.fog,fe(),{uTime:{value:0},uCenter:{value:new i},uVolume:{value:new i(80,50,80)},uVelocity:{value:new i(0,-10,0)},uMode:{value:o},uStreak:{value:.05},uSize:{value:new h(.004,.03)},uPixel:{value:.001},uMinPx:{value:1.8},uSway:{value:.6},uDistFade:{value:new s(1.2,3.2,40,90)},uTex:{value:null},tScene:{value:null},uColor:{value:new e(.6,.65,.7)},uOpacity:{value:0},uLumaFade:{value:0}}]),this.uniforms.uTex.value=n,this.material=new l({vertexShader:ce,fragmentShader:le,uniforms:this.uniforms,transparent:!0,depthWrite:!1,depthTest:!1,blending:1,fog:!0,side:2,name:c}),this.mesh=new C(d,this.material),this.mesh.name=c,this.mesh.frustumCulled=!1,this.mesh.castShadow=this.mesh.receiveShadow=!1,this.mesh.renderOrder=950,this.mesh.matrixAutoUpdate=!1,this.mesh.visible=!1,this.geometry=d}fill(e){for(let t=0;t<this.count;t++)this.seed[t*4]=e(),this.seed[t*4+1]=e(),this.seed[t*4+2]=e(),this.seed[t*4+3]=e();this.geometry.getAttribute(`aSeed`).needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}},pe=class{constructor({count:n,crownTexture:o,ringTexture:s,name:c=`effects-splashes`}){let d=new u;d.setAttribute(`position`,new m(new Float32Array(12),3)),d.setAttribute(`aCorner`,new m(new Float32Array([-1,-1,1,-1,1,1,-1,1]),2)),d.setIndex([0,1,2,0,2,3]),this.pos=new Float32Array(n*3),this.seed=new Float32Array(n*4),this.kind=new Float32Array(n);let f=new _(this.pos,3);f.setUsage(t),d.setAttribute(`aPos`,f),d.setAttribute(`aSeed`,new _(this.seed,4)),d.setAttribute(`aKind`,new _(this.kind,1)),d.instanceCount=n,d.boundingSphere=new r(new i,1e6),this.count=n,this.uniforms=a.merge([b.fog,fe(),{uTime:{value:0},uAnchor:{value:new i},uRadius:{value:40},uWet:{value:0},uTexCrown:{value:null},uTexRing:{value:null},uColor:{value:new e(.7,.75,.8)},uColorRing:{value:new e(.7,.75,.8)},uOpacity:{value:0}}]),this.uniforms.uTexCrown.value=o,this.uniforms.uTexRing.value=s,this.material=new l({vertexShader:ue,fragmentShader:de,uniforms:this.uniforms,transparent:!0,depthWrite:!1,depthTest:!1,blending:2,fog:!0,side:2,name:c}),this.mesh=new C(d,this.material),this.mesh.name=c,this.mesh.frustumCulled=!1,this.mesh.castShadow=this.mesh.receiveShadow=!1,this.mesh.renderOrder=940,this.mesh.matrixAutoUpdate=!1,this.mesh.visible=!1,this.geometry=d,this.offsets=new Float32Array(n*2)}fill(e){for(let t=0;t<this.count;t++){let n=e()*Math.PI*2,r=Math.sqrt(e());this.offsets[t*2]=Math.cos(n)*r,this.offsets[t*2+1]=Math.sin(n)*r;let i=e()<.55;this.kind[t]=+!!i,this.seed[t*4]=e(),this.seed[t*4+1]=i?.28+e()*.16:.2+e()*.12,this.seed[t*4+2]=i?.06+e()*.05:.085+e()*.07,this.seed[t*4+3]=e()*Math.PI*2}this.geometry.getAttribute(`aSeed`).needsUpdate=!0,this.geometry.getAttribute(`aKind`).needsUpdate=!0}place(e,t,n){let r=this.pos;for(let i=0;i<this.count;i++){let a=e.x+this.offsets[i*2]*t,o=e.z+this.offsets[i*2+1]*t;r[i*3]=a,r[i*3+1]=n(a,o),r[i*3+2]=o}this.geometry.getAttribute(`aPos`).needsUpdate=!0,this.uniforms.uAnchor.value.set(e.x,0,e.z),this.uniforms.uRadius.value=t}dispose(){this.geometry.dispose(),this.material.dispose()}},me=`
precision highp float;
attribute vec2 aCorner;
attribute vec4 aEmit;      // rear x, y, z, direction x
attribute vec4 aVel;       // direction z, speed (m/s), strength 0..1, unused
attribute vec4 aSeed;      // phase, lateral offset (m), size (m), rand

uniform float uTime;
uniform float uWet;
varying vec2 vUv;
varying float vAlpha;
varying float vViewZ;
#include <fog_pars_vertex>
void main() {
  float strength = aVel.z * uWet;
  float life = 0.42 + aSeed.w * 0.34;
  float u = fract(uTime / life + aSeed.x);
  float age = u * life;
  vec3 dir = vec3(aEmit.w, 0.0, aVel.x);
  vec3 side = vec3(-dir.z, 0.0, dir.x);
  float speed = aVel.y;
  vec3 p = aEmit.xyz;
  // thrown backwards at (roughly) the vehicle's own speed, fanning out and up, then settling
  p -= dir * (speed * age * 0.55);
  p += side * aSeed.y * (0.55 + 1.9 * u);
  p.y += 0.04 + (0.95 * u - 0.78 * u * u) * (0.40 + 0.055 * speed);
  float s = aSeed.z * (0.45 + 3.2 * u) * (0.65 + 0.055 * speed);
  vAlpha = smoothstep(0.0, 0.08, u) * pow(1.0 - u, 1.5) * strength;
  vUv = aCorner * 0.5 + 0.5;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  mv.xy += aCorner * s * 0.5;
  vViewZ = mv.z;
  vec4 mvPosition = mv;
  gl_Position = projectionMatrix * mv;
  #include <fog_vertex>
}
`,he=`
precision highp float;
uniform sampler2D uTex;
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vAlpha;
varying float vViewZ;
#include <fog_pars_fragment>
${H}
void main() {
  float a = texture2D(uTex, vUv).a * vAlpha * uOpacity;
  if (uHasDepth > 0.5) a *= clamp((vViewZ - effectsSceneViewZ() + 0.15) / 0.4, 0.0, 1.0);
  if (a < 0.003) discard;
  float fogAtt = 1.0;
  #ifdef USE_FOG
    #ifdef FOG_EXP2
      fogAtt = exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
    #else
      fogAtt = 1.0 - smoothstep(fogNear, fogFar, vFogDepth);
    #endif
  #endif
  gl_FragColor = vec4(uColor * a * fogAtt, a);
}
`,ge=class{constructor({emitters:n,perEmitter:o,texture:s}){this.emitters=n,this.per=o;let c=n*o;this.count=c;let d=new u;d.setAttribute(`aCorner`,new m([-1,-1,1,-1,1,1,-1,1],2)),d.setIndex([0,1,2,0,2,3]),d.setAttribute(`position`,new m(new Float32Array(12),3)),this.emit=new Float32Array(c*4),this.vel=new Float32Array(c*4);let f=new Float32Array(c*4),p=2654435769,g=()=>(p^=p<<13,p^=p>>>17,p^=p<<5,(p>>>0)%1e5/1e5);for(let e=0;e<n;e++)for(let t=0;t<o;t++){let n=(e*o+t)*4,r=t%2==0?-1:1;f[n]=(t+g()*.6)/o,f[n+1]=r*(.62+g()*.3),f[n+2]=.4+g()*.44,f[n+3]=g()}d.setAttribute(`aEmit`,new _(this.emit,4).setUsage(t)),d.setAttribute(`aVel`,new _(this.vel,4).setUsage(t)),d.setAttribute(`aSeed`,new _(f,4)),d.instanceCount=0,d.boundingSphere=new r(new i,1e6),this.geometry=d,this.uniforms=a.merge([b.fog,{uTime:{value:0},uWet:{value:0},uTex:{value:null},uColor:{value:new e(.6,.65,.7)},uOpacity:{value:1},tDepth:{value:null},uHasDepth:{value:0},uResolution:{value:new h(1,1)},uNearFar:{value:new h(1,15e3)}}]),this.uniforms.uTex.value=s,this.material=new l({vertexShader:me,fragmentShader:he,uniforms:this.uniforms,transparent:!0,depthTest:!1,depthWrite:!1,blending:2,fog:!0,side:2,name:`effects-vehicle-spray`}),this.mesh=new C(d,this.material),this.mesh.name=`effects-vehicle-spray`,this.mesh.frustumCulled=!1,this.mesh.renderOrder=12,this._prev=new Map,this._live=0}get live(){return this._live}sync(e,t,n,r){if(!e||!e.length||n<.1)return this._live=0,this.geometry.instanceCount=0,0;let i=this.per,a=this.emitters,o=this.emit,s=this.vel,c=r*r,l=0;for(let n=0;n<e.length&&l<a;n++){let a=e[n];if(!a||a.dead)continue;let u=a.v||0;if(u<1.8)continue;let d=a.x-t.x,f=a.z-t.z,p=a.y-t.y,m=d*d+f*f+p*p;if(m>c)continue;let h=this._prev.get(a.id);h||(h={x:a.x,z:a.z,dx:0,dz:1},this._prev.set(a.id,h));let g=a.x-h.x,_=a.z-h.z,v=Math.hypot(g,_);v>1e-4&&(h.dx=g/v,h.dz=_/v),h.x=a.x,h.z=a.z;let y=a.half||2,b=a.x-h.dx*y*.82,x=a.z-h.dz*y*.82,S=Math.min(1,(u-1.6)/5)*(1-Math.sqrt(m)/r)**.6,C=l*i*4;for(let e=0;e<i;e++){let t=C+e*4;o[t]=b,o[t+1]=a.y+.05,o[t+2]=x,o[t+3]=h.dx,s[t]=h.dz,s[t+1]=u,s[t+2]=S,s[t+3]=0}l++}return this._prev.size>a*8&&this._prev.clear(),this._live=l,this.geometry.instanceCount=l*i,l&&(this.geometry.getAttribute(`aEmit`).needsUpdate=!0,this.geometry.getAttribute(`aVel`).needsUpdate=!0),l}dispose(){this.geometry.dispose(),this.material.dispose()}},_e=`
precision highp float;
uniform sampler2D tScene;
uniform sampler2D tPrev;
uniform float uBlend;     // 0 → snap to the measurement, →1 keep the previous value
varying vec2 vUv;
void main() {
  float sumLog = 0.0;
  float p4 = 0.0;
  for (int j = 0; j < 16; j++) {
    for (int i = 0; i < 16; i++) {
      vec2 uv = (vec2(float(i), float(j)) + 0.5) / 16.0;
      vec3 c = texture2D(tScene, uv).rgb;
      float l = clamp(dot(c, vec3(0.2126, 0.7152, 0.0722)), 1e-4, 64.0);
      sumLog += log2(l);
      float l2 = l * l;
      p4 += l2 * l2;
    }
  }
  vec2 m = vec2(exp2(sumLog / 256.0), pow(p4 / 256.0, 0.25));
  vec2 prev = texture2D(tPrev, vec2(0.5)).rg;
  if (prev.y <= 0.0) prev = m;
  gl_FragColor = vec4(mix(m, prev, uBlend), 0.0, 1.0);
}
`,ve=`
precision highp float;
uniform sampler2D tDiffuse;
uniform sampler2D tOcc;      // 1×1: fraction of sky around the sun (EffectsPass probe)
uniform sampler2D tMeter;    // 1×1: geometric-mean luminance, p4 power-mean luminance
uniform vec2 uResolution;
uniform float uTime;

uniform vec4 uAuto;          // white target, gain min, gain max, strength
uniform float uExposure;
uniform float uContrast;
uniform float uToe;          // -1..1 shadow toe: < 0 crush (day), > 0 lift (night)
uniform float uShoulder;     // 0..1 highlight roll-off
uniform float uBlack;        // linear black level pulled to 0
uniform float uSaturation;
uniform float uMidSat;       // extra saturation around mid grey
uniform float uHiDesat;      // highlight desaturation
uniform vec3 uTint;
uniform vec3 uLift;
uniform vec3 uGain;
uniform vec3 uShadowTint;
uniform vec3 uHighlightTint;
uniform vec2 uVignette;      // strength, radius

uniform vec4 uSun;           // ndc x, ndc y, visibility, unused
uniform vec3 uSunColor;
uniform float uGlare;

uniform sampler2D tLUT;
uniform float uLUTSize;
uniform float uLUTAmount;

uniform vec4 uShimmer[6];  // uv.x, uv.y, radius (uv), strength
uniform int uShimmerCount;

varying vec2 vUv;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

// 2D-strip LUT lookup (N tiles of N×N along x). Input in [0,1].
vec3 lut(vec3 c) {
  float n = uLUTSize;
  float b = c.b * (n - 1.0);
  float b0 = floor(b), b1 = min(b0 + 1.0, n - 1.0);
  vec2 uv0 = vec2((b0 + c.r * (n - 1.0) / n + 0.5 / n) / n, c.g * (n - 1.0) / n + 0.5 / n);
  vec2 uv1 = vec2((b1 + c.r * (n - 1.0) / n + 0.5 / n) / n, uv0.y);
  return mix(texture2D(tLUT, uv0).rgb, texture2D(tLUT, uv1).rgb, b - b0);
}

// soft aperture disc with a slightly brighter rim (lens ghost)
float ghostDisc(float gd) {
  return smoothstep(1.0, 0.6, gd) * (0.55 + 0.45 * smoothstep(0.35, 0.95, gd));
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;

  // --- heat shimmer: warp UV inside a soft ellipse above each hot source ---
  for (int i = 0; i < 6; i++) {
    if (i >= uShimmerCount) break;
    vec4 s = uShimmer[i];
    vec2 d = (uv - s.xy) * vec2(aspect, 1.0);
    float above = smoothstep(-0.2 * s.z, 0.6 * s.z, d.y);           // mostly above the source
    float m = (1.0 - smoothstep(0.0, s.z, length(d * vec2(1.0, 0.45)))) * above;
    if (m > 0.0) {
      float n1 = sin(uv.y * 160.0 * aspect + uTime * 7.0 + uv.x * 40.0);
      float n2 = cos(uv.y * 110.0 + uTime * 5.3 + uv.x * 90.0);
      uv += vec2(n1, n2 * 0.6) * m * s.w;
    }
  }

  vec3 c = texture2D(tDiffuse, uv).rgb;

  // --- white-point anchoring (auto exposure from the meter) ---
  {
    vec2 m = texture2D(tMeter, vec2(0.5)).rg;
    float gain = clamp(uAuto.x / max(m.y, 1e-3), uAuto.y, uAuto.z);
    c *= mix(1.0, gain, uAuto.w);
  }

  // --- white balance & exposure trim ---
  c *= uTint * uExposure;

  // --- log S-curve around mid grey: contrast, small toe, soft shoulder ---
  {
    vec3 lc = log2(max(c, vec3(1e-5)) / 0.18);
    lc *= uContrast;
    // toe below -3 stops: NEGATIVE uToe crushes the shadows towards black (day — CS2 blacks are black),
    // positive lifts them (night — the dark scene keeps its detail)
    vec3 below = min(lc + 3.0, 0.0);
    lc += below * (uToe < 0.0 ? -uToe * 0.55 : -uToe * 0.35);
    // shoulder: only the top ~4 stops (above +2.9 stops = 1.35 linear) roll off, gently — white halls,
    // clouds and snow must reach paper white, not sit at mid grey
    vec3 above = max(lc - 2.9, 0.0);
    lc -= above * uShoulder * 0.3;
    c = 0.18 * exp2(lc);
    // Black level, SOFT. The old max(c - black, 0) sent an entire RANGE of the frame to exactly
    // RGB(0,0,0) — measured at 20-36 % of every daytime pixel against 0.0-0.1 % in the CS2 references —
    // which is not shadow, it is missing data (ground_shadow_ratio explodes because the denominator is
    // zero). c*c/(c+black) subtracts the same amount from anything well above the black point and rolls
    // smoothly into a floor below it: p10 still lands on the 0.010-0.015 target, nothing clips flat.
    c = (c * c) / (c + vec3(uBlack) + 1e-6) / (1.0 - uBlack);
  }

  // --- saturation: base, mid-tone boost, highlight desaturation ---
  {
    float l = luma(c);
    float stops = log2(max(l, 1e-4) / 0.18);
    float mid = exp(-stops * stops * 0.35);                 // gaussian around mid grey (±1.7 stops)
    float hi = smoothstep(0.5, 3.0, stops);
    float sat = uSaturation * (1.0 + uMidSat * mid) * (1.0 - uHiDesat * hi);
    c = mix(vec3(l), c, sat);
  }

  // --- split toning + lift / gain ---
  {
    float l = luma(c);
    float sh = 1.0 - smoothstep(0.015, 0.22, l);
    float hi = smoothstep(0.35, 2.5, l);
    c *= mix(vec3(1.0), uShadowTint, sh) * mix(vec3(1.0), uHighlightTint, hi);
    c = c * uGain + uLift * sh;
  }

  // --- sun glare (restrained): core + halo, weak anamorphic streak, 3 small chromatic ghosts ---
  float vis = uSun.z * texture2D(tOcc, vec2(0.5)).r;
  if (vis > 0.001) {
    vec2 sunUv = uSun.xy * 0.5 + 0.5;
    vec2 d = (vUv - sunUv) * vec2(aspect, 1.0);
    float dist = length(d);
    float glow = exp(-dist * dist * 260.0) * 2.2 + exp(-dist * 9.0) * 0.42 + exp(-dist * 2.4) * 0.05;
    // horizontal anamorphic streak only (no vertical shaft)
    float streak = exp(-abs(d.y) * 95.0) * exp(-abs(d.x) * 2.4) * 0.75;
    vec3 flare = uSunColor * (glow + streak);
    // ghosts on the line through the centre, small, faint, chromatic
    vec2 centre = vec2(0.5);
    vec2 axis = (centre - sunUv) * vec2(aspect, 1.0);
    vec2 p = (vUv - centre) * vec2(aspect, 1.0);
    vec3 gcol = vec3(0.0);
    const int NG = 3;
    float ks[NG]; ks[0] = -0.6; ks[1] = -1.25; ks[2] = 0.35;
    float rs[NG]; rs[0] = 0.035; rs[1] = 0.05; rs[2] = 0.022;
    float bs[NG]; bs[0] = 0.08; bs[1] = 0.06; bs[2] = 0.07;
    for (int i = 0; i < NG; i++) {
      vec2 gp = -axis * ks[i];
      float gd = length(p - gp) / rs[i];
      vec3 disc = vec3(ghostDisc(gd * 0.94), ghostDisc(gd), ghostDisc(gd * 1.07));
      vec3 tint = mix(vec3(0.6, 0.85, 1.0), vec3(1.0, 0.75, 0.6), float(i) / float(NG - 1));
      gcol += tint * disc * bs[i];
    }
    flare += gcol * max(uSunColor.g, 0.2);
    c += flare * vis * uGlare;
  }

  // --- vignette ---
  float vr = length((vUv - 0.5) * vec2(aspect, 1.0)) / length(vec2(aspect, 1.0) * 0.5);   // 0 centre … 1 corners
  float vig = 1.0 - uVignette.x * smoothstep(uVignette.y, 1.05, vr);
  c *= vig;

  // --- optional LUT in a display-referred domain (c/(1+c) → LUT → invert) ---
  if (uLUTAmount > 0.001) {
    vec3 t = c / (1.0 + c);
    vec3 g2 = lut(clamp(t, 0.0, 1.0));
    vec3 back = g2 / max(1.0 - g2, 1e-3);
    c = mix(c, back, uLUTAmount);
  }

  gl_FragColor = vec4(max(c, vec3(0.0)), 1.0);
}
`,ye=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,be=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,xe=class extends E{constructor(){let t={tDiffuse:{value:null},tOcc:{value:null},tMeter:{value:null},uResolution:{value:new h(1920,1080)},uTime:{value:0},uAuto:{value:new s(2.5,.9,1.85,0)},uExposure:{value:1},uContrast:{value:1.35},uToe:{value:.2},uShoulder:{value:.34},uBlack:{value:.0012},uSaturation:{value:1},uMidSat:{value:.18},uHiDesat:{value:.15},uTint:{value:new i(1,1,1)},uLift:{value:new i(0,0,0)},uGain:{value:new i(1,1,1)},uShadowTint:{value:new i(.93,.965,1.07)},uHighlightTint:{value:new i(1.06,1,.93)},uVignette:{value:new h(.14,.52)},uSun:{value:new s(0,0,0,0)},uSunColor:{value:new e(1,.95,.85)},uGlare:{value:1},tLUT:{value:null},uLUTSize:{value:16},uLUTAmount:{value:0},uShimmer:{value:Array.from({length:6},()=>new s)},uShimmerCount:{value:0}},r=new l({uniforms:t,vertexShader:ye,fragmentShader:ve,name:`effects-color-grading`});super(r,`tDiffuse`),this.name=`ColorGradingPass`,this.needsSwap=!0;let a=()=>{let e=new P(1,1,{type:g,format:n,minFilter:T,magFilter:T,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});return e.texture.name=`effects-luma-meter`,e};this.meterRT=[a(),a()],this.meterIndex=0,this.meterMat=new l({uniforms:{tScene:{value:null},tPrev:{value:null},uBlend:{value:0}},vertexShader:be,fragmentShader:_e,depthTest:!1,depthWrite:!1,blending:0,name:`effects-luma-meter`}),this.meterQuad=new w(this.meterMat),this.adaptRate=1.5}setSize(e,t){this.uniforms.uResolution.value.set(e,t)}render(e,t,n,r,i){let a=this.meterRT[this.meterIndex],o=this.meterRT[this.meterIndex^1];this.meterIndex^=1,this.meterMat.uniforms.tScene.value=n.texture,this.meterMat.uniforms.tPrev.value=a.texture;let s=Number.isFinite(r)&&r>0?Math.min(r,.1):1/60;this.meterMat.uniforms.uBlend.value=Math.exp(-this.adaptRate*s);let c=e.getRenderTarget();e.setRenderTarget(o),this.meterQuad.render(e),e.setRenderTarget(c),this.uniforms.tMeter.value=o.texture,super.render(e,t,n,r,i)}dispose(){super.dispose?.(),this.meterMat.dispose(),this.meterQuad.dispose();for(let e of this.meterRT)e.dispose()}},Se=`
precision highp float;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float uHasDepth;
uniform vec2 uNearFar;
uniform vec3 uHorizon;
uniform vec3 uGlowColor;
varying vec2 vUv;
#include <packing>
void main() {
  vec4 c = texture2D(tDiffuse, vUv);
  if (uHorizon.z > 0.0001 && uHasDepth > 0.5) {
    float d = texture2D(tDepth, vUv).x;
    float vz = -perspectiveDepthToViewZ(d, uNearFar.x, uNearFar.y);
    float far = max(uNearFar.y * 0.4, 1500.0);
    float sky = smoothstep(far * 0.7, far, vz);
    float dy = (vUv.y * 2.0 - 1.0) - uHorizon.x;
    float band = exp(-max(dy, 0.0) * uHorizon.y) * smoothstep(-0.10, 0.0, dy);
    float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
    c.rgb += uGlowColor * (l * 1.4 + 0.0012) * band * sky * uHorizon.z;
  }
  gl_FragColor = c;
}
`,Ce=`
precision highp float;
uniform sampler2D tDepth;
uniform vec2 uSunUv;
uniform vec2 uTexel;
uniform vec2 uNearFar;
uniform float uRadius;    // px
uniform float uActive;    // 0 → write 0 (sun off screen / below horizon)
#include <packing>
float lin(vec2 uv) {
  float d = texture2D(tDepth, clamp(uv, vec2(0.001), vec2(0.999))).x;
  return -perspectiveDepthToViewZ(d, uNearFar.x, uNearFar.y);
}
void main() {
  float far = max(uNearFar.y * 0.4, 1500.0);          // sky dome / clear depth are beyond this
  float occ = step(far, lin(uSunUv));
  for (int k = 0; k < 12; k++) {
    float a = float(k) * 0.5235988;
    float r = (k < 6) ? uRadius * 0.5 : uRadius;
    vec2 o = vec2(cos(a), sin(a)) * r * uTexel;
    occ += step(far, lin(uSunUv + o));
  }
  gl_FragColor = vec4(occ / 13.0 * uActive, 0.0, 0.0, 1.0);
}
`,we=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,Te=class extends v{constructor(t,r){super(),this.name=`EffectsPass`,this.needsSwap=!0,this.mainScene=t,this.camera=r,this.fxScene=new c,this.fxScene.name=`effects-particles`,this.fxScene.matrixWorldAutoUpdate=!0,this.sceneDepth=null,this.ground=null,this.onBeforeParticles=null,this.width=1,this.height=1,this.copyMat=new l({uniforms:{tDiffuse:{value:null},tDepth:{value:null},uHasDepth:{value:0},uNearFar:{value:new h(1,15e3)},uHorizon:{value:new i(0,9,0)},uGlowColor:{value:new e(1,.72,.42)}},vertexShader:we,fragmentShader:Se,depthTest:!1,depthWrite:!1,blending:0,name:`effects-copy`}),this.copyQuad=new w(this.copyMat),this.probeMat=new l({uniforms:{tDepth:{value:null},uSunUv:{value:new h(.5,.5)},uTexel:{value:new h(1/1920,1/1080)},uNearFar:{value:new h(1,15e3)},uRadius:{value:9},uActive:{value:0}},vertexShader:we,fragmentShader:Ce,depthTest:!1,depthWrite:!1,blending:0,name:`effects-sun-probe`}),this.probeQuad=new w(this.probeMat),this.occRT=new P(1,1,{minFilter:T,magFilter:T,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,type:p,format:n}),this.occRT.texture.name=`effects-sun-occlusion`,this.probeActive=!1}get occlusionTexture(){return this.occRT.texture}setSize(e,t){this.width=e,this.height=t,this.probeMat.uniforms.uTexel.value.set(1/Math.max(1,e),1/Math.max(1,t))}render(e,t,n){let r=n.depthTexture||null;this.sceneDepth=r;let i=e.autoClear;r&&(this.probeMat.uniforms.tDepth.value=r,this.probeMat.uniforms.uActive.value=+!!this.probeActive,e.setRenderTarget(this.occRT),this.probeQuad.render(e)),e.setRenderTarget(this.renderToScreen?null:t),e.autoClear=!1,this.ground&&this.ground.enabled!==!1?this.ground.renderCopy(e,n.texture,r):(this.copyMat.uniforms.tDiffuse.value=n.texture,this.copyMat.uniforms.tDepth.value=r,this.copyMat.uniforms.uHasDepth.value=+!!r,this.copyMat.uniforms.uNearFar.value.set(this.camera.near,this.camera.far),this.copyQuad.render(e)),this.onBeforeParticles&&this.onBeforeParticles(r,n.texture,n.width,n.height),this.fxScene.fog=this.mainScene.fog,e.render(this.fxScene,this.camera),e.autoClear=i}dispose(){this.copyMat.dispose(),this.copyQuad.dispose(),this.probeMat.dispose(),this.probeQuad.dispose(),this.occRT.dispose()}},Ee=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,De=`
precision highp float;
#include <packing>
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float uHasDepth;
uniform vec2 uResolution;
uniform vec2 uNearFar;
uniform mat4 uProj;
uniform mat4 uProjInv;
uniform mat4 uViewInv;
uniform mat4 uView;
uniform vec3 uUpView;        // world up in view space
uniform vec3 uSunView;       // direction TOWARD the sun, view space
uniform float uTime;

uniform vec2 uContact;       // strength, length (m)
uniform vec2 uAO;            // strength, radius (m)
uniform float uWet;          // 0 dry … 1 soaked
uniform float uReflect;      // reflection strength multiplier
uniform vec3 uSkyColor;      // fallback reflected radiance (renderer units)
uniform vec4 uAerial;        // density (1/m), desaturation, lift, unused
uniform vec3 uHaze;          // haze colour (renderer units)
uniform float uRipple;       // rain intensity → wobble in the mirror
uniform vec3 uHorizon;       // ndc y of the horizon, falloff, strength (night light-pollution glow)
uniform vec3 uGlowColor;
uniform vec2 uOcclusion;     // occlusion strength, cool sky-bounce fraction
uniform sampler2D uPoolMap;  // world-space drainage map from PuddleField (R pool, G tyre band, B corridor)
uniform vec4 uPoolXf;        // originX, originZ, 1/spanMetres, hasMap

varying vec2 vUv;
${W}

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
/** (pool, tyre band, road corridor) at a world XZ; 0 outside the mapped area. */
vec3 drainage(vec2 xz) {
  if (uPoolXf.w < 0.5) return vec3(0.0);
  vec2 uv = (xz - uPoolXf.xy) * uPoolXf.z;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec3(0.0);
  return texture2D(uPoolMap, uv).rgb;
}
float rawDepth(vec2 uv) { return texture2D(tDepth, uv).x; }
float viewZ(float d) { return perspectiveDepthToViewZ(d, uNearFar.x, uNearFar.y); }   // negative
vec3 viewPos(vec2 uv, float d) {
  vec4 ndc = vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec4 p = uProjInv * ndc;
  return p.xyz / p.w;
}
/** view → (uv, ndc depth 0..1) */
vec3 project(vec3 v) {
  vec4 c = uProj * vec4(v, 1.0);
  vec3 n = c.xyz / max(abs(c.w), 1e-6) * sign(c.w);
  return vec3(n.xy * 0.5 + 0.5, n.z * 0.5 + 0.5);
}

void main() {
  vec4 src = texture2D(tDiffuse, vUv);
  vec3 c = src.rgb;
  if (uHasDepth < 0.5) { gl_FragColor = vec4(c, src.a); return; }

  float d0 = rawDepth(vUv);
  if (d0 >= 0.99999) {
    // sky: only the night light-pollution band above the horizon (this shader replaces the old copy step)
    if (uHorizon.z > 0.0001) {
      float dy = (vUv.y * 2.0 - 1.0) - uHorizon.x;
      float band = exp(-max(dy, 0.0) * uHorizon.y) * smoothstep(-0.10, 0.0, dy);
      c += uGlowColor * (luma(c) * 1.4 + 0.0012) * band * uHorizon.z;
    }
    gl_FragColor = vec4(c, src.a);
    return;
  }

  vec2 texel = 1.0 / uResolution;
  vec3 P = viewPos(vUv, d0);
  float dist = length(P);
  vec3 V = P / max(dist, 1e-4);                                       // camera → surface

  // ---- normal from depth (pick the smaller of the two one-sided differences on each axis) ----
  vec3 dxP = viewPos(vUv + vec2(texel.x, 0.0), rawDepth(vUv + vec2(texel.x, 0.0))) - P;
  vec3 dxM = P - viewPos(vUv - vec2(texel.x, 0.0), rawDepth(vUv - vec2(texel.x, 0.0)));
  vec3 dyP = viewPos(vUv + vec2(0.0, texel.y), rawDepth(vUv + vec2(0.0, texel.y))) - P;
  vec3 dyM = P - viewPos(vUv - vec2(0.0, texel.y), rawDepth(vUv - vec2(0.0, texel.y)));
  vec3 ddx = abs(dxP.z) < abs(dxM.z) ? dxP : dxM;
  vec3 ddy = abs(dyP.z) < abs(dyM.z) ? dyP : dyM;
  vec3 N = normalize(cross(ddx, ddy));
  if (dot(N, V) > 0.0) N = -N;

  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);

  // ---------------- fine ambient occlusion (0.4-0.6 m: kerbs, eaves, object bases) ----------------
  float ao = 1.0;
  if (uAO.x > 0.001) {
    float r = uAO.y;
    float occ = 0.0;
    // 8 fixed hemisphere directions; the only per-pixel variation is a 2x2 Bayer rotation INSIDE one
    // sector, so the term is essentially noise-free (a white-noise rotation reads as dirt on the lens)
    float bay = mod(floor(gl_FragCoord.x), 2.0) + 2.0 * mod(floor(gl_FragCoord.y), 2.0);
    float a0 = bay * 0.19634954;
    for (int i = 0; i < 8; i++) {
      float a = a0 + float(i) * 0.7853982;
      float rad = r * (0.30 + 0.70 * fract(float(i) * 0.37 + bay * 0.25));
      vec3 t = normalize(abs(N.z) < 0.9 ? cross(N, vec3(0.0, 0.0, 1.0)) : cross(N, vec3(1.0, 0.0, 0.0)));
      vec3 b = cross(N, t);
      vec3 dir = normalize(t * cos(a) + b * sin(a) + N * 0.55);
      vec3 sp = P + dir * rad;
      vec3 pr = project(sp);
      if (pr.x < 0.0 || pr.x > 1.0 || pr.y < 0.0 || pr.y > 1.0) continue;
      float sz = viewZ(rawDepth(pr.xy));
      float dz = sz - sp.z;                       // > 0 → the scene is in front of the sample
      float range = smoothstep(0.0, 1.0, r / max(abs(sz - P.z), 1e-3));
      occ += step(0.02, dz) * range;
    }
    ao = 1.0 - uAO.x * (occ / 8.0);
    ao = clamp(mix(1.0, ao, 1.0 - smoothstep(140.0, 460.0, dist)), 0.0, 1.0);
  }

  // ---------------- contact shadow (short march toward the sun) ----------------
  float shadow = 1.0;
  if (uContact.x > 0.001) {
    float len = uContact.y * (1.0 + smoothstep(20.0, 220.0, dist) * 2.2);   // keep it readable at range
    float stepLen = len / 12.0;
    vec3 O = P + N * (0.012 + dist * 0.0025);
    float hit = 0.0;
    for (int i = 1; i <= 12; i++) {
      vec3 sp = O + uSunView * (stepLen * (float(i) - 0.5 + dither * 0.9));
      vec3 pr = project(sp);
      if (pr.x < 0.0 || pr.x > 1.0 || pr.y < 0.0 || pr.y > 1.0) break;
      float sz = viewZ(rawDepth(pr.xy));
      float dz = sz - sp.z;
      float bias = 0.03 + abs(sp.z) * 0.004;
      if (dz > bias && dz < bias + 1.6) { hit = 1.0 - (float(i) - 1.0) / 12.0 * 0.35; break; }
    }
    shadow = 1.0 - uContact.x * hit * (1.0 - smoothstep(120.0, 380.0, dist));
  }

  float shade = min(ao, shadow);
  // Occlusion is an AMBIENT term, and in daylight the ambient IS the sky. Multiplying it toward black is
  // what turned every object base into a hole (20-36 % of the frame clipped to RGB(0,0,0)); instead the
  // occluded fraction is replaced by a dim, COOL sky bounce. The crease then reads deeper *and* bluer
  // than the lit surface, which is LOOK_TARGET row 13 (CS2 shadows measure 1.3-2.2x bluer per unit red;
  // ours measured 0.35-0.65 — the wrong way round).
  float occ = (1.0 - shade) * uOcclusion.x;
  c = c * (1.0 - occ) + uSkyColor * (luma(c) + 0.0015) * occ * uOcclusion.y;

  // ---------------- wet reflections ----------------
  float up = dot(N, uUpView);
  float flat_ = smoothstep(0.80, 0.96, up);
  float lum = luma(c);
  float green = (c.g - max(c.r, c.b)) / max(lum, 1e-3);
  float notGreen = 1.0 - smoothstep(0.06, 0.22, green);                 // grass never becomes a mirror
  float wetMask = uWet * flat_ * notGreen * uReflect;
  if (wetMask > 0.004 && dist < 700.0) {
    vec3 W = (uViewInv * vec4(P, 1.0)).xyz;
    float rim;
    // On the road the pools are real geometry (PuddleField.js) and the drainage map says exactly where
    // they are, so the mirror sharpens on the water and stays a soft smear on the damp tarmac beside it.
    // Off the mapped area the old world-noise field still supplies pavement / forecourt pools.
    vec3 drain = drainage(W.xz);
    float poolMap = smoothstep(0.12, 0.55, drain.r) * smoothstep(0.10, 0.45, uWet);
    float offRoad = 1.0 - smoothstep(0.25, 0.65, drain.b);
    float pool = max(poolMap, fxPuddleMask(W.xz, uWet, rim) * offRoad);
    // ripples / micro-relief: plain damp tarmac wobbles the mirror (long vertical light smears),
    // a pool is nearly flat so it reflects sharply
    float rough = mix(0.85, 0.16, pool);
    vec2 g = vec2(
      fxValueNoise(W.xz * 1.7 + vec2(uTime * 0.05, 0.0)) - fxValueNoise(W.xz * 1.7 + vec2(0.3 + uTime * 0.05, 0.0)),
      fxValueNoise(W.xz * 1.7 + vec2(0.0, uTime * 0.05)) - fxValueNoise(W.xz * 1.7 + vec2(0.0, 0.3 + uTime * 0.05)));
    g += vec2(fxValueNoise(W.xz * 1.45) - 0.5, fxValueNoise(W.xz * 1.45 + 31.0) - 0.5) * (0.30 + 0.5 * uRipple);
    float NdV = clamp(-dot(N, V), 0.0, 1.0);
    float F = 0.028 + 0.972 * pow(1.0 - NdV, 4.5);
    // world-space tilt → view space: long, soft vertical smears on damp tarmac, a clean mirror in a pool.
    // The wobble is scaled by NdV: at grazing angles a 2° tilt moves the reflected sample tens of metres,
    // which turns the mirror into per-pixel speckle.
    vec3 tilt = mat3(uView) * vec3(g.x, 0.0, g.y);
    float wob = rough * 0.05 * (0.16 + 0.84 * NdV) * (1.0 - smoothstep(60.0, 200.0, dist));
    vec3 R = reflect(V, normalize(N + tilt * wob));

    // what a MISSED ray sees: near-horizontal rays look at the horizon haze, steep ones at the sky.
    // Using the zenith colour for everything is what turns a grazing wet road into a white sheet.
    vec3 Rw = mat3(uViewInv) * reflect(V, N);
    vec3 miss = mix(uHaze, uSkyColor, smoothstep(0.03, 0.40, Rw.y)) * 0.75;
    vec3 refl = miss;
    float conf = 0.0;
    if (R.z < 0.35) {                                   // ray not flying straight at the camera
      float t = 0.30 + dist * 0.010;
      vec3 prev = P;
      for (int i = 0; i < 22; i++) {
        vec3 sp = P + R * t;
        vec3 pr = project(sp);
        if (pr.x < -0.02 || pr.x > 1.02 || pr.y < -0.02 || pr.y > 1.02 || sp.z > -uNearFar.x) break;
        float sd = rawDepth(clamp(pr.xy, vec2(0.0), vec2(1.0)));
        float sz = viewZ(sd);
        float dz = sz - sp.z;
        float thick = min(0.55 + t * 0.22, 5.5);
        // a grazing ray skims its own surface for tens of metres: the minimum accepted gap has to grow
        // with the march distance or the road reflects ITSELF as a huge smeared ghost
        float minDz = 0.06 + t * 0.035;
        if (dz > minDz && dz < thick && sd < 0.99999) {
          // one bisection refine so the smear starts at the right place
          vec3 lo = prev, hi = sp;
          for (int k = 0; k < 4; k++) {
            vec3 mid = (lo + hi) * 0.5;
            vec3 pm = project(mid);
            float zm = viewZ(rawDepth(clamp(pm.xy, vec2(0.0), vec2(1.0))));
            if (zm - mid.z > minDz) hi = mid; else lo = mid;
          }
          vec3 pf = project(hi);
          vec2 huv = clamp(pf.xy, vec2(0.0), vec2(1.0));
          refl = texture2D(tDiffuse, huv).rgb;
          vec2 e = smoothstep(vec2(0.0), vec2(0.11), huv) * (1.0 - smoothstep(vec2(0.89), vec2(1.0), huv));
          conf = e.x * e.y;
          break;
        }
        prev = sp;
        t *= 1.28;
        t += 0.14;
        if (t > 260.0) break;
      }
    }
    refl = mix(miss, refl, conf);
    // horizon-grazing pixels get the strongest mirror — that is where a wet street reads as wet
    // a ray that hit real geometry is trusted; a miss only gets a fraction of the weight, so an
    // unresolved grazing road can never flatten into one opaque sheet
    // Damp tarmac is DARK and only faintly reflective; the mirror belongs to the standing water. Giving
    // the whole carriageway a 0.38 floor is what turned a rain frame into one pale blue sheet.
    float k = clamp(F * wetMask * (0.18 + 0.82 * pool) * mix(0.18, 1.0, conf), 0.0, 0.82);
    c = mix(c, refl, k);
    // a pool is water, not paint: extra darkening under it keeps the mirror readable
    c *= 1.0 - 0.20 * pool * uWet;
  }

  // ---------------- aerial perspective (lifts blacks toward the sky, desaturates) ----------------
  if (uAerial.x > 0.0) {
    float f = 1.0 - exp(-dist * uAerial.x);
    float l = luma(c);
    c = mix(c, vec3(l), uAerial.y * f);
    c += uHaze * uAerial.z * f;
  }

  gl_FragColor = vec4(max(c, vec3(0.0)), src.a);
}
`,Oe=class extends v{constructor(t){super(),this.name=`GroundFXPass`,this.needsSwap=!0,this.camera=t,this.uniforms={tDiffuse:{value:null},tDepth:{value:null},uHasDepth:{value:0},uResolution:{value:new h(1280,720)},uNearFar:{value:new h(1,15e3)},uProj:{value:new R},uProjInv:{value:new R},uViewInv:{value:new R},uView:{value:new R},uUpView:{value:new i(0,1,0)},uSunView:{value:new i(0,1,0)},uTime:{value:0},uContact:{value:new h(.55,1.1)},uAO:{value:new h(.55,.5)},uWet:{value:0},uReflect:{value:1},uSkyColor:{value:new e(.25,.32,.45)},uAerial:{value:new s(35e-5,.35,.006,0)},uHaze:{value:new e(.35,.42,.55)},uRipple:{value:0},uHorizon:{value:new i(0,9,0)},uGlowColor:{value:new e(1,.72,.42)},uOcclusion:{value:new h(.95,.3)},uPoolMap:{value:null},uPoolXf:{value:new s(0,0,0,0)}},this.material=new l({uniforms:this.uniforms,vertexShader:Ee,fragmentShader:De,depthTest:!1,depthWrite:!1,blending:0,name:`effects-groundfx`}),this.quad=new w(this.material),this.sunWorld=new i(0,-1,0),this._nm=new k}setSize(e,t){this.uniforms.uResolution.value.set(e,t)}setSun(e){this.sunWorld.copy(e)}_syncCamera(){let e=this.camera,t=this.uniforms;t.uProj.value.copy(e.projectionMatrix),t.uProjInv.value.copy(e.projectionMatrixInverse),t.uViewInv.value.copy(e.matrixWorld),t.uView.value.copy(e.matrixWorldInverse),t.uNearFar.value.set(e.near,e.far),this._nm.setFromMatrix4(e.matrixWorldInverse),t.uUpView.value.set(0,1,0).applyMatrix3(this._nm).normalize(),t.uSunView.value.copy(this.sunWorld).negate().applyMatrix3(this._nm).normalize()}renderCopy(e,t,n){this._syncCamera(),this.uniforms.tDiffuse.value=t,this.uniforms.tDepth.value=n||null,this.uniforms.uHasDepth.value=+!!n,this.quad.render(e)}dispose(){this.material.dispose(),this.quad.dispose()}},K={uFxRipple:{value:0},uFxSnow:{value:0},uFxTime:{value:0},uFxSky:{value:new e(.3,.4,.6)},uFxSun:{value:0},uFxPoolMap:{value:null},uFxPoolXf:{value:new s(0,0,0,0)}},ke=`
uniform float uFxWet;
uniform float uFxWetStrength;
uniform float uFxPuddleStrength;   // per material: 0 on terrain / vegetation (ground cover pokes through pools)
uniform float uFxSnowStrength;     // per material: carriageways keep a partly cleared surface (0.3)
uniform float uFxTrack;            // 1 on carriageway materials: ploughed tyre bands from the drainage map
uniform float uFxRipple;
uniform float uFxSnow;
uniform float uFxTime;
uniform vec3 uFxSky;
uniform float uFxSun;
uniform sampler2D uFxPoolMap;
uniform vec4 uFxPoolXf;
${W}
/** (pool, tyre band, road corridor) at a world XZ position; all 0 outside the mapped area. */
vec3 fxDrainage(vec2 xz) {
  if (uFxPoolXf.w < 0.5) return vec3(0.0);
  vec2 uv = (xz - uFxPoolXf.xy) * uFxPoolXf.z;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec3(0.0);
  return texture2D(uFxPoolMap, uv).rgb;
}
/** gradient (dh/dx, dh/dz) of a field of expanding rain rings on a 1-unit grid. */
vec2 fxRingGradient(vec2 p, float t, float speed) {
  vec2 g = vec2(0.0);
  vec2 cell = floor(p);
  for (int j = -1; j <= 0; j++) for (int i = -1; i <= 0; i++) {
    vec2 c = cell + vec2(float(i), float(j));
    vec2 h = fxHash2(c);
    vec2 centre = c + 0.5 + (h - 0.5) * 0.9;
    float ph = fract(t * speed + h.x * 7.31 + h.y * 3.17);       // 0..1 over one ring lifetime
    vec2 d = p - centre;
    float r = length(d);
    float ring = ph * 0.8;
    float w = 0.04 + ph * 0.05;
    float x = (r - ring) / w;
    float amp = exp(-x * x) * (1.0 - ph) * (1.0 - ph);
    g += (d / max(r, 1e-3)) * amp * (-2.0 * x / w);
  }
  return g;
}
`,Ae=`
float fxPuddle = 0.0;
float fxSnowW = 0.0;
float fxNdV = 1.0;
float fxWetSheen = 0.0;
{
  float fxW = uFxWet * uFxWetStrength;
  float fxS = uFxSnow * uFxWetStrength * uFxSnowStrength;
  if (fxW + fxS > 0.002) {
    vec3 fxWorld = cameraPosition + (-vViewPosition) * mat3(viewMatrix);      // view → world (rigid)
    vec3 fxUpV = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);      // world up in view space
    vec3 fxN0 = normalize(nonPerturbedNormal);
    float fxUp = clamp(dot(fxN0, fxUpV), 0.0, 1.0);
    float fxFlat = smoothstep(0.80, 0.97, fxUp);
    float fxDist = length(vViewPosition);
    fxNdV = clamp(dot(fxN0, normalize(vViewPosition)), 0.0, 1.0);
    vec3 fxDry = diffuseColor.rgb;

    // ---------- wet ----------
    if (fxW > 0.002) {
      // walls: darker in vertical streaks (run-off), stronger low on the wall; roofs/ground: uniform soak
      float streak = fxValueNoise(vec2(fxWorld.x + fxWorld.z, fxWorld.y * 0.12) * vec2(2.6, 1.0)) * 0.55
                   + fxValueNoise(vec2(fxWorld.x - fxWorld.z, fxWorld.y * 0.35) * vec2(7.0, 1.0)) * 0.45;
      float wallW = fxW * (0.30 + 0.45 * smoothstep(0.35, 0.8, streak));
      float wetW = mix(wallW, fxW, fxUp);
      // Wet asphalt: albedo x0.55 on the flat (docs/MATERIAL_TARGET.md). The previous x0.44 crushed the
      // road into the black floor; the target is a DARK surface with a specular lobe, not a black card.
      diffuseColor.rgb *= 1.0 - mix(0.26, 0.45, fxUp) * wetW;
      // THE number this whole pass exists for: wet asphalt roughness 0.20 (dry is 0.65-0.90). Below ~0.20
      // a normal-mapped surface starts aliasing its own specular into white grains, so the floor rises
      // with distance instead of the grain being erased.
      float fxLod = smoothstep(14.0, 70.0, fxDist);
      float wetRough = mix(0.20, 0.34, fxLod);
      roughnessFactor = mix(roughnessFactor, min(roughnessFactor, wetRough), wetW);
      // Water fills the pores a LITTLE. The old 0.82-0.98 flatten erased the aggregate grain and made the
      // wet road measurably flatter than the dry one (local luminance std 0.218 -> 0.164) — the exact
      // regression the critic named. Damp tarmac keeps its normal map; only standing water is glass.
      normal = normalize(mix(normal, fxN0, wetW * mix(0.16, 0.30, fxLod)));

      // ---- where the water actually stands ----
      // Road pools are GEOMETRY now (PuddleField.js) — real discs in the gutters and wheel ruts, built
      // from world.roads. The drainage map tells us where the road corridor is so this shader-side field
      // does not double up on it; off-road hard surfaces (pavement, forecourts, roofs, yards) still get
      // their pools from here, where there is no polyline to hang geometry off.
      vec3 drain = fxDrainage(fxWorld.xz);
      float offRoad = 1.0 - smoothstep(0.25, 0.65, drain.b);
      float pn = fxValueNoise(fxWorld.xz * 0.20) * 0.70 + fxValueNoise(fxWorld.xz * 0.52 + 17.3) * 0.30;
      float thr = 0.735 - 0.075 * fxW;
      float fill = smoothstep(0.22, 0.70, fxW);
      float rim = smoothstep(thr - 0.09, thr, pn) * fill;
      float mask = smoothstep(thr - 0.005, thr + 0.022, pn) * fill;
      float distF = (1.0 - smoothstep(120.0, 320.0, fxDist)) * uFxPuddleStrength * offRoad;
      fxPuddle = mask * fxFlat * distF;
      rim *= fxFlat * distF;
      if (rim > 0.001) {
        // shore band: saturated, darker than the plain damp ground, still rough (no gloss ring)
        diffuseColor.rgb *= 1.0 - 0.16 * rim;
        roughnessFactor = mix(roughnessFactor, mix(0.22, 0.36, fxLod), rim);
      }
      if (fxPuddle > 0.001) {
        // inside the pool: standing water over a dark bed at the MATERIAL_TARGET puddle roughness of
        // 0.06. The IMAGE in the mirror comes from the sky probe plus the GroundFXPass screen-space
        // march; the material supplies the dark water, the flat normal and the specular lobe.
        diffuseColor.rgb = mix(diffuseColor.rgb, fxDry * 0.18, fxPuddle);
        roughnessFactor = mix(roughnessFactor, 0.06, fxPuddle);
        metalnessFactor = mix(metalnessFactor, 0.0, fxPuddle);
        normal = normalize(mix(normal, fxUpV, fxPuddle * 0.97));
        float rip = uFxRipple * smoothstep(0.2, 0.6, fxPuddle) * (1.0 - smoothstep(26.0, 70.0, fxDist));
        if (rip > 0.002) {
          vec2 g = fxRingGradient(fxWorld.xz * 2.4, uFxTime, 2.4) * 0.6 + fxRingGradient(fxWorld.xz * 1.1 + 5.0, uFxTime, 1.6) * 0.4;
          vec3 gv = mat3(viewMatrix) * vec3(g.x, 0.0, g.y);
          normal = normalize(normal - gv * rip * 0.035);
        }
      }
      // impact rings on the DAMP sheen outside the pools too — wet asphalt within ~26 m of the camera
      // shimmers with rain hits, which is what sells "it is raining" on a close-up street shot
      float ripF = uFxRipple * fxFlat * (1.0 - fxPuddle) * (1.0 - smoothstep(12.0, 34.0, fxDist)) * uFxPuddleStrength;
      if (ripF > 0.002) {
        vec2 g = fxRingGradient(fxWorld.xz * 3.1 + 2.0, uFxTime, 3.0);
        vec3 gv = mat3(viewMatrix) * vec3(g.x, 0.0, g.y);
        normal = normalize(normal - gv * ripF * 0.012);
      }
      // the sheen a wet surface owes the sky. scene.environmentIntensity is 0.52, so a wet road that is
      // physically a 0.20-roughness dielectric still returns almost nothing from the probe — this is the
      // compensation, weighted to flat, upward faces, and it is what makes rain read as WET not matte.
      fxWetSheen = fxW * fxFlat;
    }
    // ---------- snow ----------
    if (fxS > 0.002) {
      // coverage ∝ fxS: a noise height field is thresholded so a 30 % cover (carriageways) really shows
      // ~30 % of the surface white — patchy at low cover, continuous with soft drifts when deep; walls and
      // tank sides stay clean (fxUp > ~0.6)
      // LOW-frequency coverage field: metre-scale drifts, not centimetre speckle. The finest octave is
      // only 15 % of the field so a partly-cleared road reads as smooth patches, never as confetti.
      float sn = fxValueNoise(fxWorld.xz * 0.30) * 0.55 + fxValueNoise(fxWorld.xz * 1.05 + 7.0) * 0.30
               + fxValueNoise(fxWorld.xz * 3.7) * 0.15;
      float drift = fxValueNoise(fxWorld.xz * 0.11 + 41.0);
      float upW = smoothstep(0.50, 0.74, fxUp);
      float cov = clamp(fxS * (0.80 + 0.45 * drift), 0.0, 1.0) * upW;
      float slush = 0.0;
      float band = 0.30;                       // threshold softness → smooth shores
      // Tyre tracks come from the drainage map's G channel — the REAL wheel positions of the REAL lanes,
      // rasterised from world.roads. (The previous version read vUv.x inside an #ifdef USE_UV; three r185
      // never defines USE_UV for a standard material, so that branch never compiled in and every snow
      // frame fell through to the un-ploughed path.)
      if (uFxTrack > 0.5) {
        float g = fxDrainage(fxWorld.xz).g;
        slush = smoothstep(0.18, 0.85, g) * smoothstep(0.02, 0.15, fxS);
        cov *= 1.0 - 0.98 * slush;
        band = mix(band, 0.11, smoothstep(0.1, 0.5, g));
      }
      float thr = 1.0 - cov;
      float snowW = smoothstep(thr - band, thr + 0.10, sn) * smoothstep(0.02, 0.2, fxS) * upW;
      fxSnowW = snowW;
      if (slush > 0.001) {
        // wet dark slush in the wheel grooves
        float sl = slush * (1.0 - snowW) * fxUp;
        diffuseColor.rgb *= 1.0 - 0.40 * sl;
        roughnessFactor = mix(roughnessFactor, 0.5, sl * 0.6);
      }
      if (snowW > 0.001) {
        // fresh snow is one of the brightest natural surfaces (albedo ≈ 0.85): it must reach paper white
        // under sun, with a metre-scale mottle that still reads from the 235 m hero distance
        float mottle = fxValueNoise(fxWorld.xz * 0.22 + 13.0);
        vec3 snowCol = vec3(0.955, 0.965, 0.995) * (0.88 + 0.12 * sn) * (0.93 + 0.09 * drift) * (0.94 + 0.11 * mottle);
        // partly cleared surfaces carry dirty grey slush instead of clean snow
        float dirt = clamp((1.0 - uFxSnowStrength) * 1.2, 0.0, 0.8);
        snowCol = mix(snowCol, vec3(0.52, 0.53, 0.55), dirt * (0.45 + 0.55 * (1.0 - sn)));
        // micro-normals from the noise gradient (finite differences) so the sheet catches light
        float e = 0.08;
        float h0 = fxValueNoise(fxWorld.xz * 3.7) * 0.7 + fxValueNoise(fxWorld.xz * 11.0) * 0.3;
        float hx = fxValueNoise((fxWorld.xz + vec2(e, 0.0)) * 3.7) * 0.7 + fxValueNoise((fxWorld.xz + vec2(e, 0.0)) * 11.0) * 0.3;
        float hz = fxValueNoise((fxWorld.xz + vec2(0.0, e)) * 3.7) * 0.7 + fxValueNoise((fxWorld.xz + vec2(0.0, e)) * 11.0) * 0.3;
        vec2 grad = vec2(hx - h0, hz - h0) / e;
        float nAmp = 0.5 * (1.0 - smoothstep(60.0, 220.0, fxDist));
        // large-scale drift undulation on top of the fine crust
        float dx = fxValueNoise((fxWorld.xz + vec2(0.5, 0.0)) * 0.11 + 41.0) - drift;
        float dz = fxValueNoise((fxWorld.xz + vec2(0.0, 0.5)) * 0.11 + 41.0) - drift;
        vec3 snowN = normalize(mat3(viewMatrix) * vec3(-grad.x * nAmp - dx * 2.0, 1.0, -grad.y * nAmp - dz * 2.0));
        // sparkle: 2-3 % sub-centimetre ice facets, twinkling, in direct sun, fading out by ~90 m
        // cells grow with distance so a facet never falls below a pixel (that is what turns sparkle into
        // aliased white dots), and the whole term is gone by 70 m
        float cellScale = mix(22.0, 5.0, smoothstep(8.0, 70.0, fxDist));
        vec3 cellP = floor(fxWorld * cellScale);
        float gh = fxHash1(cellP.xz * 1.7 + cellP.y * 3.1);
        float tw = 0.5 + 0.5 * sin(uFxTime * 4.0 + gh * 60.0 + fxNdV * 20.0);
        float glint = step(0.974, gh) * tw * (1.0 - smoothstep(12.0, 70.0, fxDist)) * uFxSun * (1.0 - dirt);
        diffuseColor.rgb = mix(diffuseColor.rgb, snowCol + glint * 1.8, snowW);
        roughnessFactor = mix(roughnessFactor, 0.62 + 0.1 * dirt, snowW);
        metalnessFactor = mix(metalnessFactor, 0.0, snowW);
        normal = normalize(mix(normal, mix(nonPerturbedNormal, snowN, fxUp), snowW * 0.85));
      }
    }
  }
}
#include <lights_physical_fragment>
`,je=`
#include <lights_fragment_end>
{
  if (fxWetSheen > 0.001) {
    // THE fix for "it is raining hard and the asphalt has zero specular reflection". A 0.20-roughness
    // dielectric should return a bright, Fresnel-weighted sky; scene.environmentIntensity is 0.52, so it
    // returns half of one. Restore the missing half on wet, upward faces only — grazing angles brightest,
    // which is exactly where a wet street reads as wet.
    float Fw = 0.04 + 0.96 * pow(1.0 - fxNdV, 5.0);
    reflectedLight.indirectSpecular *= 1.0 + 0.40 * fxWetSheen;
    reflectedLight.indirectSpecular += uFxSky * Fw * fxWetSheen * 0.045;
  }
  if (fxPuddle > 0.001) {
    // Fresnel-weighted sky term: a pool mirrors the sky even when the scene has no environment probe,
    // and at grazing angles (F → 1) it goes bright — which is what makes a puddle READ as standing water
    float F = 0.03 + 0.97 * pow(1.0 - fxNdV, 4.0);
    reflectedLight.indirectSpecular += uFxSky * F * fxPuddle * 0.15;
  }
  if (fxSnowW > 0.001) {
    // snow shadows read blue: tint the indirect (sky) light, leave the direct sun white
    reflectedLight.indirectDiffuse *= mix(vec3(1.0), vec3(0.80, 0.88, 1.16), fxSnowW);
    reflectedLight.indirectSpecular *= mix(vec3(1.0), vec3(0.88, 0.94, 1.10), fxSnowW);
  }
}
`,Me=/sky|cloud|water|glass|window|ocean|river|lake/i,Ne=/terrain|ground|grass|veg|verge|median|leaf|leaves|foliage|tree|bark|undergrowth|plant|flower|hedge|lawn|impostor|dirt|gravel/i;function Pe(e){let t=e.userData||{};if(typeof t.snow==`number`)return Math.max(0,Math.min(1,t.snow));let n=e.name||``;return/^roads\/asphalt/.test(n)?.48:/^roads\/(sidewalk|curb|kerb|apron|verge|path|barrier)/.test(n)?.92:/^roads\//.test(n)?.85:1}function Fe(e){let t=e.userData||{};return typeof t.snowTracks==`number`?t.snowTracks:e.name&&/^roads\/asphalt/.test(e.name)?1:0}function Ie(e){let t=e.userData||{};return t.noPuddles?0:typeof t.puddles==`number`?Math.max(0,Math.min(1,t.puddles)):e.alphaTest>0||e.name&&Ne.test(e.name)?0:1}function Le(e){let t=e.userData||{};return t.noWetness?0:typeof t.wetness==`number`?Math.max(0,Math.min(1,t.wetness)):e.transmission>0||e.name&&Me.test(e.name)?0:1}function Re(e,t,n){let r={patched:0},i=new WeakSet,a=e.globalUniforms,o=e.addMaterialHook((e,t)=>{if(!t||!(t.isMeshStandardMaterial||t.isMeshPhysicalMaterial)||t.userData&&t.userData.__wetness||t.userData&&t.userData.fxSkipHook)return;let n=e.fragmentShader;if(n.indexOf(`#include <lights_physical_fragment>`)<0||n.indexOf(`#include <lights_fragment_end>`)<0||n.indexOf(`uFxWet`)>=0)return;e.uniforms.uFxWet=a.uWetness,e.uniforms.uFxWetStrength={value:Le(t)},e.uniforms.uFxPuddleStrength={value:Ie(t)},e.uniforms.uFxSnowStrength={value:Pe(t)},e.uniforms.uFxTrack={value:Fe(t)},e.uniforms.uFxRipple=K.uFxRipple,e.uniforms.uFxSnow=K.uFxSnow,e.uniforms.uFxTime=K.uFxTime,e.uniforms.uFxSky=K.uFxSky,e.uniforms.uFxSun=K.uFxSun,e.uniforms.uFxPoolMap=K.uFxPoolMap,e.uniforms.uFxPoolXf=K.uFxPoolXf;let o=n.indexOf(`#include <normal_fragment_begin>`)>=0||n.indexOf(`nonPerturbedNormal`)>=0?Ae:Ae.replace(/nonPerturbedNormal/g,`normal`);e.fragmentShader=n.replace(`#include <common>`,`#include <common>
`+ke).replace(`#include <lights_physical_fragment>`,o).replace(`#include <lights_fragment_end>`,je),i.has(t)||(i.add(t),r.patched++)}),s=e=>{if(!e||!(e.isMeshStandardMaterial||e.isMeshPhysicalMaterial)||e.userData.__fxWetKey)return;e.userData.__fxWetKey=!0;let t=e.customProgramCacheKey,n=!t||t===I.prototype.customProgramCacheKey;e.customProgramCacheKey=function(){return(n?``:String(t.call(this)))+`|fxwet5`},e.needsUpdate=!0},c=e._registeredList instanceof Set?Array.from(e._registeredList):[];c.length?c.forEach(s):t.traverse(e=>{let t=e.material;Array.isArray(t)?t.forEach(s):s(t)});let l=()=>(e.markMaterialsDirty(),r.patched),u=[n.on(`modules:ready`,l),n.on(`game:ready`,l),n.on(`terrain:ready`,l)];return{state:r,sweep:l,update(e,t,n,r,i,o){a.uWetness.value=e,K.uFxRipple.value=t,K.uFxSnow.value=n,K.uFxTime.value=r,i&&K.uFxSky.value.copy(i),K.uFxSun.value=o??1},dispose(){for(let e of u)e();o()}}}var q=8,ze=2800,Be=.84,Ve=.022,He=.6,Ue=2048,We=`
uniform float uPudTime;
uniform float uPudRain;
uniform float uPudWet;
uniform float uPudFade;
${W}
vec2 pudRings(vec2 p, float t, float speed) {
  vec2 g = vec2(0.0);
  vec2 cell = floor(p);
  for (int j = -1; j <= 0; j++) for (int i = -1; i <= 0; i++) {
    vec2 c = cell + vec2(float(i), float(j));
    vec2 h = fxHash2(c);
    vec2 centre = c + 0.5 + (h - 0.5) * 0.9;
    float ph = fract(t * speed + h.x * 7.31 + h.y * 3.17);
    vec2 d = p - centre;
    float r = length(d);
    float ring = ph * 0.8;
    float w = 0.04 + ph * 0.05;
    float x = (r - ring) / w;
    float amp = exp(-x * x) * (1.0 - ph) * (1.0 - ph);
    g += (d / max(r, 1e-3)) * amp * (-2.0 * x / w);
  }
  return g;
}
`,Ge=`
{
  vec3 pudWorld = cameraPosition + (-vViewPosition) * mat3(viewMatrix);
  float pudDist = length(vViewPosition);
  // slow surface undulation: a real pool is never an optically flat mirror
  vec2 wob = vec2(
    fxValueNoise(pudWorld.xz * 1.25 + vec2(uPudTime * 0.07, 0.0)) - 0.5,
    fxValueNoise(pudWorld.xz * 1.25 + vec2(0.0, uPudTime * 0.07) + 19.0) - 0.5);
  vec2 g = wob * 0.55;
  // rain impact rings, near the camera only (they are 10-30 cm features)
  float rip = uPudRain * (1.0 - smoothstep(30.0, 85.0, pudDist));
  if (rip > 0.002) {
    g += (pudRings(pudWorld.xz * 2.4, uPudTime, 2.4) * 0.6 + pudRings(pudWorld.xz * 1.15 + 5.0, uPudTime, 1.6) * 0.4) * rip * 0.55;
  }
  vec3 gv = mat3(viewMatrix) * vec3(g.x, 0.0, g.y);
  normal = normalize(normal - gv * 0.030);
  // dry → gone; far → gone (a 2 m pool under 2 px is nothing but specular aliasing)
  diffuseColor.a *= uPudWet * (1.0 - smoothstep(uPudFade * 0.62, uPudFade, pudDist));
  if (diffuseColor.a < 0.004) discard;
}
#include <lights_physical_fragment>
`,Ke=class{constructor({engine:t,scene:n,world:r,seed:i}){this.engine=t,this.scene=n,this.world=r,this.seed=i>>>0,this.count=0,this.version=-1,this.uniforms={uPudTime:{value:0},uPudRain:{value:0},uPudWet:{value:0},uPudFade:{value:300}};let a=new j({name:`effects/puddle`,color:new e(658704),roughness:.06,metalness:0,envMapIntensity:1.9,transparent:!0,depthWrite:!1,vertexColors:!0,side:0,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-6});a.userData.noWetness=!0,a.userData.noPuddles=!0,a.userData.fxSkipHook=!0,a.onBeforeCompile=e=>{Object.assign(e.uniforms,this.uniforms),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+We).replace(`#include <lights_physical_fragment>`,Ge)},a.customProgramCacheKey=()=>`effects-puddle-v1`,t.registerMaterial(a),this.material=a,this.group=new o,this.group.name=`effects-puddles`,this.group.matrixAutoUpdate=!1,n.add(this.group),this.mesh=null,this.map=null,this.mapXf=K.uFxPoolXf.value,this.mapUniforms={uFxPoolMap:K.uFxPoolMap,uFxPoolXf:K.uFxPoolXf}}build(){let e=typeof performance<`u`?performance.now():0,t=this.world.roads,r=t&&t.api,i=t&&t.segments?Array.from(t.segments.values()):[];if(this._clearMesh(),this.count=0,!i.length)return this.mapXf.w=0,0;let a=1/0,o=-1/0,s=1/0,c=-1/0;for(let e of i)for(let t of e.points||[])t.x<a&&(a=t.x),t.x>o&&(o=t.x),t.z<s&&(s=t.z),t.z>c&&(c=t.z);if(!Number.isFinite(a))return this.mapXf.w=0,0;a-=24,s-=24,o+=24,c+=24;let l=Math.max(o-a,c-s),u=Math.min(Ue,Math.max(256,1<<Math.ceil(Math.log2(l/He)))),p=l/u,m=new Uint8Array(u*u*4),h=(e,t,n,r)=>{let i=(e-a)/l*u|0,o=(t-s)/l*u|0;if(i<0||o<0||i>=u||o>=u)return;let c=(o*u+i)*4+n,d=r*255;d>m[c]&&(m[c]=d)},g=[],_=e=>r&&r.types&&r.types[e]&&r.types[e].definition||null,v=Math.max(.45,p*.75);for(let e of i){let t=e.points;if(!t||t.length<2)continue;let n=_(e.type),r=n?n.cwHalf:Math.max(2,(e.width||12)*.34);if(r<1.6)continue;let i=n&&n.medianHalf||0,a=n&&n.laneWidth||3.6,o=r+(n?n.sidewalk||0:1.6)+1.2,s=[];for(let e=0;;e++){let t=i+a*(e+.5);if(t+.9>r||(s.push(t-.85,t+.85),e>6))break}let c=A((N(String(e.id))^this.seed^40235)>>>0),l=c.range(2,11),u=c.range(6,26);for(let e=0;e<t.length-1;e++){let n=t[e],i=t[e+1],a=i.x-n.x,d=i.z-n.z,f=Math.hypot(a,d);if(f<1e-4)continue;a/=f,d/=f;let p=-d,m=a;for(let e=0;e<f;e+=v){let t=n.x+a*e,i=n.z+d*e;for(let e=-o;e<=o;e+=v){let n=t+p*e,a=i+m*e;h(n,a,2,1);let o=Math.abs(e);if(o<=r){let e=0;for(let t=0;t<s.length;t++)e=Math.max(e,1-Math.abs(o-s[t])/.95);e>0&&h(n,a,1,Math.min(1,e))}}}let _=l;for(;_<f;){let e=(c()<.5?-1:1)*(r-.35-c.range(0,.75)),t=c.range(1.5,4.4),i=Math.min(c.range(.65,1.55),r*.34),o=n.x+a*_+p*e,s=n.z+d*_+m*e;g.push({x:o,z:s,tx:a,tz:d,ra:t,rb:i,str:c.range(.85,1)}),_+=c.range(5,15)}if(l=_-f,s.length){let e=u;for(;e<f;){let t=s[c()*s.length|0],r=(c()<.5?-1:1)*t,i=c.range(1,3),o=c.range(.4,.85),l=n.x+a*e+p*r,u=n.z+d*e+m*r;g.push({x:l,z:u,tx:a,tz:d,ra:i,rb:o,str:c.range(.6,.9)}),e+=c.range(9,26)}u=e-f}}}let y=r&&typeof r.surfaceHeight==`function`?r.surfaceHeight:null,b=[];for(let e of g){if(b.length>=ze)break;let t=null;if(y)try{t=y(e.x,e.z)}catch{t=null}if(Number.isFinite(t)||(t=this.world.terrain?this.world.terrain.getHeight(e.x,e.z)+.05:null),!Number.isFinite(t))continue;if(e.y=t+Ve,e.slope=0,y){let t=-e.tz,n=e.tx,r=Math.max(.5,e.rb),i=null,a=null;try{i=y(e.x+t*r,e.z+n*r),a=y(e.x-t*r,e.z-n*r)}catch{}Number.isFinite(i)&&Number.isFinite(a)&&(e.slope=(i-a)/(2*r))}b.push(e);let n=Math.max(e.ra,e.rb),r=Math.max(.35,p*.9);for(let t=-n;t<=n;t+=r)for(let i=-n;i<=n;i+=r){let n=(t*e.tx+i*e.tz)/e.ra,r=(-t*e.tz+i*e.tx)/e.rb,a=Math.sqrt(n*n+r*r);a<=1.05&&h(e.x+t,e.z+i,0,e.str*Math.min(1,1.3-a*.9))}}for(let e=3;e<m.length;e+=4)m[e]=255;this.map&&this.map.dispose();let x=new d(m,u,u,n);if(x.name=`effects/drainage`,x.needsUpdate=!0,x.minFilter=D,x.magFilter=D,x.wrapS=x.wrapT=O,x.generateMipmaps=!1,this.map=x,K.uFxPoolMap.value=x,this.mapXf.set(a,s,1/l,1),this.count=b.length,!b.length)return 0;let S=new Float32Array(b.length*17*3),w=new Float32Array(b.length*17*3),T=new Float32Array(b.length*17*4),E=new Uint32Array(b.length*24*3),k=0,j=0;for(let e of b){let t=k;S[k*3]=e.x,S[k*3+1]=e.y,S[k*3+2]=e.z,w[k*3+1]=1,T[k*4]=T[k*4+1]=T[k*4+2]=1,T[k*4+3]=1,k++;for(let t=0;t<2;t++){let n=t===0?Be:1,r=+(t===0);for(let t=0;t<q;t++){let i=t/q*Math.PI*2,a=Math.cos(i)*e.ra*n,o=Math.sin(i)*e.rb*n,s=e.x+a*e.tx-o*e.tz,c=e.z+a*e.tz+o*e.tx;S[k*3]=s,S[k*3+1]=e.y+e.slope*o,S[k*3+2]=c,w[k*3+1]=1,T[k*4]=T[k*4+1]=T[k*4+2]=1,T[k*4+3]=r,k++}}let n=t+1,r=t+1+q;for(let e=0;e<q;e++){let i=(e+1)%q;E[j++]=t,E[j++]=n+i,E[j++]=n+e,E[j++]=n+e,E[j++]=n+i,E[j++]=r+i,E[j++]=n+e,E[j++]=r+i,E[j++]=r+e}}let M=new f;M.setAttribute(`position`,new z(S,3)),M.setAttribute(`normal`,new z(w,3)),M.setAttribute(`color`,new z(T,4)),M.setIndex(new z(E.subarray(0,j),1)),M.computeBoundingSphere();let P=new C(M,this.material);return P.name=`effects-puddles`,P.castShadow=!1,P.receiveShadow=!0,P.renderOrder=1,P.layers.enable(this.engine.LAYER_NO_AO),this.mesh=P,this.group.add(P),this.engine.registerObject?this.engine.registerObject(P):this.engine.registerMaterial(this.material),this.buildMs=+((typeof performance<`u`?performance.now():0)-e).toFixed(1),b.length}update(e,t,n,r){let i=this.uniforms;i.uPudTime.value=n,i.uPudRain.value=t,i.uPudWet.value=Math.max(0,Math.min(1,(e-.12)/.35)),i.uPudFade.value=Math.max(120,Math.min(420,r*.42)),this.mesh&&(this.mesh.visible=i.uPudWet.value>.004)}_clearMesh(){this.mesh&&=(this.group.remove(this.mesh),this.mesh.geometry.dispose(),null)}dispose(){this._clearMesh(),this.group.parent&&this.group.parent.remove(this.group),this.map&&this.map.dispose(),this.material.dispose()}},qe=`effects`,J=null,Y=new i,Je=new i,X=new i,Ye=new h,Xe=new e,Z=new e,Q=new e,$=new e;async function Ze(e){let{engine:t,scene:n,world:r,events:a,config:s,camera:c,cameraController:l}=e,u=t.quality,d=u.particles??1,f=r.seed;J={ctx:e,engine:t,scene:n,world:r,events:a,camera:c,cameraController:l,enabled:{smoke:!0,rain:!0,snow:!0,splashes:!0,spray:!0,grading:!0,flare:!0,shimmer:!0,wet:!0,autoExposure:!0,reflections:!0,contact:!0,aerial:!0},time:0,dirty:!0,dirtyAt:0,lastBuildVersion:-1,lastCold:null,warmed:!1,sources:new Map,nextSourceId:1,hotSpots:[],rainAmt:0,snowAmt:0,wetness:0,snowCover:0,splashAnchor:new i(1e9,0,1e9),splashRadius:0,cpuMs:0,grade:{exposure:1,contrast:1,saturation:1,vignette:1,glare:1},surface:{contact:1,ao:1,aoRadius:1,reflect:1,aerial:1,desat:1},counts:{smoke:0,rain:0,snow:0,splashes:0},plates:[],lights:[],lightScanAt:-1e9,localLights:0},J.wet=Re(t,n,a),J.puddles=new Ke({engine:t,scene:n,world:r,seed:f}),J.puddleVersion=-1;let p=ee(f,u.textureSize>=2048?256:128,4,4,t.maxAnisotropy),m=te(),g=ne(f),_=re(),v=ie();J.textures=[p.texture,m,g,_,v],J.fxPass=new Te(n,c),J.groundFX=new Oe(c),J.fxPass.ground=J.groundFX;{let e=t.composer.passes.indexOf(t.renderPass);t.composer.insertPass(J.fxPass,e>=0?e+1:1)}let y=new o;y.name=`effects`,y.matrixAutoUpdate=!1,J.group=y,J.fxPass.fxScene.add(y),J.smoke=new se({atlas:p,maxParticles:Math.round(64e3*d)}),J.rain=new G({count:Math.round(9e3*d),texture:m,mode:0,name:`effects-rain`}),J.rain.fill(A(f^31258)),J.rainNear=new G({count:Math.round(2600*d),texture:m,mode:0,name:`effects-rain-near`}),J.rainNear.fill(A(f^31260)),J.rainFar=new G({count:Math.round(7e3*d),texture:m,mode:0,name:`effects-rain-far`}),J.rainFar.fill(A(f^31259)),J.snow=new G({count:Math.round(44e3*d),texture:v,mode:1,name:`effects-snow`}),J.snow.fill(A(f^23055)),J.splash=new pe({count:Math.round(3e3*d),crownTexture:g,ringTexture:_}),J.splash.fill(A(f^23418)),J.spray=new ge({emitters:Math.max(8,Math.round(44*d)),perEmitter:14,texture:g}),J.systems=[J.smoke,J.rain,J.rainNear,J.rainFar,J.snow,J.splash,J.spray];for(let e of J.systems)e.mesh.layers.enable(t.LAYER_NO_AO),y.add(e.mesh);J.fxPass.onBeforeParticles=(e,t,n,r)=>{let i=+!!e;for(let a of J.systems){let o=a.uniforms;o.tDepth.value=e,o.uHasDepth.value=i,o.uResolution.value.set(n,r),o.uNearFar.value.set(c.near,c.far),o.tScene&&(o.tScene.value=t)}},J.grading=new xe,J.grading.uniforms.tOcc.value=J.fxPass.occlusionTexture;let b=t.renderer.getDrawingBufferSize(new h);J.grading.setSize(b.x,b.y),J.fxPass.setSize(b.x,b.y),J.groundFX.setSize(b.x,b.y),t.post.insertBeforeOutput(J.grading),t.post.colorGrading=J.grading;let x=()=>{J.dirty=!0},S=()=>{J.puddleVersion=-1};J.offs=[a.on(`roads:changed`,S),a.on(`terrain:ready`,S),a.on(`building:added`,x),a.on(`building:removed`,x),a.on(`building:levelup`,x),a.on(`buildings:changed`,x),a.on(`weather:set`,x),a.on(`engine:resize`,()=>{let e=t.renderer.getDrawingBufferSize(new h);J.grading.setSize(e.x,e.y),J.fxPass.setSize(e.x,e.y),J.groundFX.setSize(e.x,e.y)})],r.effects={api:rt()},s.debug&&console.log(`[effects] ready`,{maxSmoke:J.smoke.max,rain:J.rain.count+J.rainFar.count,snow:J.snow.count})}function Qe(e,t){if(!J)return;let n=performance.now(),{world:r,engine:i,camera:a}=J,o=r.env;J.time+=e;let s=J.group.parent===J.scene;!i.postEnabled&&!s?(J.fxPass.fxScene.remove(J.group),J.scene.add(J.group)):i.postEnabled&&s&&(J.scene.remove(J.group),J.fxPass.fxScene.add(J.group));let c=o.sunDirection,l=L(-.04,.1,-c.y),u=F(o.nightFactor??0),d=(o.sunIntensity??3)*l,f=o.moonDirection,p=(o.moonIntensity??0)*(f?L(-.02,.1,f.y):0),m=i.renderer.getDrawingBufferSize(Ye),h=r.time?.hour??12,g=F(o.cloudCover??.3),_=i.hemi;if(Q.copy(o.skyColor||Z.setRGB(0,0,0)),_){let e=_.intensity/Math.PI;Q.r=Math.max(Q.r,_.color.r*e),Q.g=Math.max(Q.g,_.color.g*e),Q.b=Math.max(Q.b,_.color.b*e)}let v=Q,y=o.groundColor,b=J.scene.fog?J.scene.fog.color:null;$.copy(v),b&&($.r=Math.max($.r,b.r),$.g=Math.max($.g,b.g),$.b=Math.max($.b,b.b));let C=$.multiplyScalar(1+.6*g),w=String(o.weather||``).toLowerCase(),T=w===`snow`,E=w===`rain`||w===`storm`,D=o.precipitation==null?null:F(o.precipitation),O=T?0:E?D??.9:D==null&&o.rain>0?F(o.rain):0,k=T?D??.9:0;J.warmed||(J.warmed=!0,J.rainAmt=O,J.snowAmt=k,J.wetness=O>.02?Math.max(F(o.wetness??1),Math.min(O+.3,1)):F(o.wetness??0),J.snowCover=k>.02?1:F(o.snow??0)),J.rainAmt=x(J.rainAmt,O,2.5,e),J.snowAmt=x(J.snowAmt,k,2.5,e);let A=o.wetness==null?o.rain>0?F(o.rain):null:F(o.wetness),j=A==null?J.rainAmt>.02?Math.max(J.rainAmt,.7):0:Math.max(A,J.rainAmt>.02?Math.min(J.rainAmt+.3,1):0);j>=J.wetness?J.wetness=x(J.wetness,j,1.5,e):J.wetness=Math.max(j,J.wetness-e/300*(.3+.7*l*(1-.6*g)));let N=o.snow==null?null:F(o.snow),P=N==null?+(J.snowAmt>.02):Math.max(N,+(J.snowAmt>.02));P>=J.snowCover?J.snowCover=x(J.snowCover,P,N==null?.25:3,e):J.snowCover=Math.max(P,J.snowCover-e/600*(.2+.8*l)),J.wetness<.002&&(J.wetness=0),J.snowCover<.002&&(J.snowCover=0);let I=J.enabled.wet;J.wet.update(I?J.wetness:0,I?J.rainAmt:0,I?J.snowCover:0,J.time,v,l*(1-.8*g));{let e=r.roads?r.roads.version??0:-1;e!==J.puddleVersion&&J.time-(J.puddleBuiltAt??-9)>1.2&&(J.puddleVersion=e,J.puddleBuiltAt=J.time,J.puddleCount=J.puddles.build()),J.puddles.update(I?J.wetness:0,I?J.rainAmt:0,J.time,i.quality.drawDistance)}{let e=J.groundFX;e.enabled=i.postEnabled;let t=e.uniforms;e.setSun(c),t.uTime.value=J.time;let n=l*(1-.62*g)*(1-u),r=J.surface;t.uContact.value.set(J.enabled.contact?.8*n*r.contact:0,1.55),t.uAO.value.set(J.enabled.contact?.78*r.ao:0,.55*r.aoRadius);let a=I&&J.enabled.reflections?J.wetness:0;t.uWet.value=a,t.uReflect.value=(.95+.35*u)*r.reflect,t.uRipple.value=J.rainAmt,t.uSkyColor.value.copy(v).multiplyScalar(1.05).addScalar(.003*(1-u));let o=b||v;t.uHaze.value.copy(o);let s=Math.max(o.r,o.g,o.b),d=+!!J.enabled.aerial;t.uAerial.value.set(55e-5*d*r.aerial,.42*r.desat,s>1e-4?.42*r.aerial:0,0),t.uPoolMap.value=J.puddles.mapUniforms.uFxPoolMap.value,t.uPoolXf.value.copy(J.puddles.mapUniforms.uFxPoolXf.value),t.uOcclusion.value.set(J.enabled.contact?.95:0,.3+.1*u)}let R=o.temperature!=null&&o.temperature<10||T||J.snowAmt>.3;R!==J.lastCold&&(J.lastCold=R,J.dirty=!0),r.buildings.version!==J.lastBuildVersion&&(J.lastBuildVersion=r.buildings.version,J.dirty=!0),J.dirty&&(J.time-J.dirtyAt>.3||J.smoke.count===0)&&nt();{let e=J.smoke.uniforms;e.uTime.value=J.time;let t=(o.windStrength??.35)*5.5;e.uWind.value.set(o.wind.x*t,0,o.wind.y*t);let n=d*.36,r=p*.2;n>=r||!f?(e.uLightDirView.value.copy(c).transformDirection(a.matrixWorldInverse),e.uLightColor.value.copy(o.sunColor).multiplyScalar(n)):(e.uLightDirView.value.copy(f).negate().transformDirection(a.matrixWorldInverse),e.uLightColor.value.copy(o.moonColor||Z.setRGB(.6,.7,1)).multiplyScalar(r)),e.uAmbient.value.copy(C).multiplyScalar(.85-.3*u),e.uGroundBounce.value.copy(y).multiplyScalar(.8*(1-.6*u)),e.uDustFade.value=F(1-J.rainAmt*1.2-J.snowAmt*1.2);let s=1+.15*(1-L(6,10,h))*L(3,6,h);e.uSizeBoost.value=s,e.uFade.value.set(i.quality.drawDistance*.16,i.quality.drawDistance*.26),J.smoke.mesh.visible=J.enabled.smoke&&J.smoke.count>0,$e(e)}let z=2*Math.tan(S.degToRad(a.fov)*.5)/Math.max(1,m.y);a.getWorldDirection(Y);let B=J.cameraController?J.cameraController.distance:200,V=Je.copy(a.position).addScaledVector(Y,M(B*.4,10,24)),ee=(o.windStrength??.35)*8;{let e=o.wind.x*ee,t=o.wind.y*ee,n=Math.hypot(e,t),r=2.6;if(n<r){let i=n>.001?Math.atan2(t,e):J.world.seed%360*Math.PI/180;e=Math.cos(i)*r,t=Math.sin(i)*r}X.set(e,0,t)}Xe.copy(v).multiplyScalar(.85).add(Z.copy(o.sunColor).multiplyScalar(d*.04));{let e=J.rain.uniforms,t=J.enabled.rain&&J.rainAmt>.01;J.rain.mesh.visible=t,t&&(e.uTime.value=J.time,e.uCenter.value.copy(V),e.uVolume.value.set(60,40,60),e.uVelocity.value.set(X.x,-9.5,X.z),e.uStreak.value=.055,e.uSize.value.set(.004,.03),e.uMinPx.value=1.9,e.uPixel.value=z,e.uDistFade.value.set(4,9,34,80),e.uLumaFade.value=.45,e.uColor.value.copy(Xe),e.uOpacity.value=.78*J.rainAmt)}{let e=J.rainNear.uniforms,t=J.enabled.rain&&J.rainAmt>.01;J.rainNear.mesh.visible=t,t&&(e.uTime.value=J.time,e.uCenter.value.copy(a.position).addScaledVector(Y,7),e.uVolume.value.set(20,14,20),e.uVelocity.value.set(X.x,-9.5,X.z),e.uStreak.value=.032,e.uSize.value.set(.004,.03),e.uMinPx.value=2.6,e.uPixel.value=z,e.uDistFade.value.set(.4,1.2,11,17),e.uLumaFade.value=.35,e.uColor.value.copy(Xe).multiplyScalar(1.08),e.uOpacity.value=.42*J.rainAmt)}{let e=J.rainFar.uniforms,t=J.enabled.rain&&J.rainAmt>.01&&B<900;J.rainFar.mesh.visible=t,t&&(e.uTime.value=J.time,e.uCenter.value.copy(a.position).addScaledVector(Y,M(B*.6,40,130)),e.uVolume.value.set(280,110,280),e.uVelocity.value.set(X.x,-9.5,X.z),e.uStreak.value=.036,e.uSize.value.set(.003,.03),e.uMinPx.value=1.15,e.uPixel.value=z,e.uDistFade.value.set(35,75,210,320),e.uLumaFade.value=.55,e.uColor.value.copy(Xe).multiplyScalar(1.05),e.uOpacity.value=.3*J.rainAmt*(1-L(500,900,B)))}{let e=J.snow.uniforms,t=J.enabled.snow&&J.snowAmt>.01;if(J.snow.mesh.visible=t,t){e.uTime.value=J.time,e.uCenter.value.copy(V);let t=M(B*.7,56,110);e.uVolume.value.set(t,44,t);let n=(o.windStrength??.35)*3;e.uVelocity.value.set(o.wind.x*n,-1.4,o.wind.y*n),e.uSize.value.set(.004,.105),e.uStreak.value=.02,e.uSway.value=.45,e.uMinPx.value=1.35,e.uPixel.value=z,e.uDistFade.value.set(1.5,4,95,150),e.uLumaFade.value=0,e.uColor.value.copy(v).multiplyScalar(1.7).add(Z.copy(o.sunColor).multiplyScalar(d*.12)).addScalar(.03),e.uOpacity.value=.95*J.snowAmt*(1-.6*L(260,700,B))}}{let e=J.splash.uniforms,t=1-L(120,240,B),n=J.enabled.splashes&&J.rainAmt>.02&&t>.01;if(J.splash.mesh.visible=n,n){let n=J.cameraController?J.cameraController.target:a.position,r=M(B*.4,10,40);(Math.hypot(n.x-J.splashAnchor.x,n.z-J.splashAnchor.z)>r*.2||Math.abs(r-J.splashRadius)>r*.25)&&(J.splashAnchor.copy(n),J.splashRadius=r,J.splash.place(n,r,tt));let i=M((r/40)**2,.8,1)*(.3+.7*L(.05,1,J.rainAmt));J.splash.geometry.instanceCount=Math.round(J.splash.count*i),e.uTime.value=J.time,e.uWet.value=J.wetness,e.uColor.value.copy(v).multiplyScalar(.85).add(Z.copy(o.sunColor).multiplyScalar(d*.1)).addScalar(.01),e.uColorRing.value.copy(v).multiplyScalar(1.7).add(Z.copy(o.sunColor).multiplyScalar(d*.2)).addScalar(.016),e.uOpacity.value=.36*J.rainAmt*t}}{let e=J.spray,t=J.enabled.spray&&J.wetness>.1&&!T;if(e.mesh.visible=t,t){let t=e.uniforms;t.uTime.value=J.time,t.uWet.value=L(.12,.55,J.wetness),t.uColor.value.copy(v).multiplyScalar(.85).addScalar(.006+.075*u),t.uOpacity.value=1.35*(.45+.55*J.rainAmt),e.sync(J.world.traffic?.list||J.world.traffic?.vehicles,a.position,J.wetness,150)}else e.geometry.instanceCount&&(e.geometry.instanceCount=0)}{let t=J.grading;t.enabled=J.enabled.grading;let n=t.uniforms;n.uTime.value=J.time;let r=J.wetness,i=J.snowCover,s=J.snowAmt,d=(1-L(.06,.42,-c.y))*l*(1-u),f=J.grade,p=1-Math.exp(-5*e),h=1-u;n.uContrast.value=x(n.uContrast.value,(1.52-u*.26-g*.05-r*.03-s*.08-i*.06)*f.contrast,5,e),n.uToe.value=x(n.uToe.value,-.58*h*(1-.15*g)*(1-.12*r)*(1-.6*i)+.18*u+.1*i*h,5,e),n.uShoulder.value=x(n.uShoulder.value,.34+i*.06+d*.2,5,e),n.uBlack.value=x(n.uBlack.value,.0072*h*(1-.15*g)*(1-i*.7)+.0026*u,5,e);let _=n.uAuto.value;{let e=L(.35,.75,-c.y),t=3.6+.55*i+.15*g,a=n.uShoulder.value,o=Math.max(n.uContrast.value,.5),s=Math.log2(t/.18);s>2.9&&(s=(s-.87*a)/(1-.3*a));let l=.18*2**(s/o),d=(1.22+.32*g+.14*r-.1*e)*h+1.14*u;_.set(l,.72*h+.9*u,d,J.enabled.autoExposure?.5+.2*h:0)}t.adaptRate=1.5,n.uExposure.value=x(n.uExposure.value,f.exposure,5,e),n.uSaturation.value=x(n.uSaturation.value,(1.16-u*.1-r*.08-g*.03-s*.06-i*.02+d*.03)*f.saturation,5,e),n.uMidSat.value=x(n.uMidSat.value,.17*(1-u*.6)*(1-r*.5)*(1-s*.4),5,e),n.uHiDesat.value=x(n.uHiDesat.value,.11+d*.06+s*.06+u*.05,5,e),Y.set(1,1,1),Y.lerp(X.set(.96,.98,1.04),u*.5),Y.lerp(X.set(1.06,1,.93),d*.6),Y.lerp(X.set(.965,.985,1.03),F(r*.8)),Y.lerp(X.set(.985,.995,1.025),s*.6),n.uTint.value.lerp(Y,p),Y.set(.85,.94,1.2).lerp(X.set(.94,.97,1.08),u).lerp(X.set(.85,.93,1.2),i*.7),n.uShadowTint.value.lerp(Y,p),Y.set(1.08,1,.9).lerp(X.set(1.04,1,.96),u).lerp(X.set(1,1,1),F(r+s)),n.uHighlightTint.value.lerp(Y,p),Y.set(.0058,.0064,.0082).lerp(X.set(.0028,.0032,.0044),u).lerp(X.set(.0068,.0074,.0094),i*.5*(1-u)),n.uLift.value.lerp(Y,p);let v=1-r*.04+i*.03;n.uGain.value.lerp(Y.set(v,v,v),p),n.uVignette.value.set(M((.105-u*.03+r*.02)*f.vignette,0,.2),.52);let y=0,b=J.fxPass.probeMat.uniforms,S=o.sunAltitude==null||o.sunAltitude>-2;if(J.enabled.flare&&S){if(Y.copy(a.position).addScaledVector(c,-3e3),Y.project(a),Y.z<1&&Number.isFinite(Y.x)){let e=Math.max(Math.abs(Y.x),Math.abs(Y.y)),t=L(.12,.55,-c.y);y=l*(1-u)*(1-.8*g)*(1-J.rainAmt)*(1-J.snowAmt)*F((o.sunIntensity??3)/2.5)*(1-L(1.1,1.8,e))*(1-.4*t),n.uSun.value.set(Y.x,Y.y,y,0),b.uSunUv.value.set(Y.x*.5+.5,Y.y*.5+.5)}else n.uSun.value.z=0}else n.uSun.value.z=0;J.fxPass.probeActive=y>.001,b.uNearFar.value.set(a.near,a.far),b.uRadius.value=Math.max(6,m.y*.008),n.uSunColor.value.copy(o.sunColor).multiplyScalar(Math.sqrt(M((o.sunIntensity??3)/3.5,.15,1.2))),n.uGlare.value=1*f.glare;let C=0;if(J.enabled.shimmer&&J.hotSpots.length){let e=a.position,t=J.shimmerScratch||(J.shimmerScratch=[]);t.length=0;for(let n of J.hotSpots){let r=(n.x-e.x)**2+(n.y-e.y)**2+(n.z-e.z)**2;r<67600&&t.push(r,n)}for(let e=0;e<t.length&&C<6;e+=2){let r=e;for(let n=e+2;n<t.length;n+=2)t[n]<t[r]&&(r=n);if(r!==e){let n=t[e],i=t[e+1];t[e]=t[r],t[e+1]=t[r+1],t[r]=n,t[r+1]=i}let i=t[e+1],o=Math.sqrt(t[e]);if(Y.set(i.x,i.y,i.z).project(a),Y.z>1||Math.abs(Y.x)>1.2||Math.abs(Y.y)>1.2)continue;let s=.0014*(1-L(90,220,o))*(i.heat??1);s<1e-5||(n.uShimmer.value[C].set(Y.x*.5+.5,Y.y*.5+.5,M(9/o,.03,.14),s),C++)}}n.uShimmerCount.value=C;{let e=(J.fxPass.ground?J.groundFX.uniforms:J.fxPass.copyMat.uniforms).uHorizon.value,t=u*.55*(1-.5*J.rainAmt)*f.glare;t>.001?(a.getWorldDirection(X),X.y=0,X.lengthSq()<1e-6&&X.set(0,0,-1),Y.copy(a.position).addScaledVector(X.normalize(),2e4).project(a),e.set(M(Y.y,-1.5,1.5),7.5,t)):e.z=0}}J.cpuMs=J.cpuMs*.9+(performance.now()-n)*.1}function $e(e){let{scene:t,camera:n,cameraController:r}=J;if(J.time-J.lightScanAt>1.5){J.lightScanAt=J.time;let e=J.lights;e.length=0,t.traverse(t=>{(t.isPointLight||t.isSpotLight)&&t.visible&&t.intensity>.5&&e.length<512&&e.push(t)})}let i=J.lights,a=0;if(i.length){let t=r?r.target:n.position,o=J.lightScratch||(J.lightScratch=[]);o.length=0;for(let e of i){if(!e.parent||e.intensity<=.5)continue;e.getWorldPosition(Y);let n=(Y.x-t.x)**2+(Y.z-t.z)**2;n<16e4&&o.push(n,e)}for(let t=0;t<o.length&&a<4;t+=2){let r=t;for(let e=t+2;e<o.length;e+=2)o[e]<o[r]&&(r=e);if(r!==t){let e=o[t],n=o[t+1];o[t]=o[r],o[t+1]=o[r+1],o[r]=e,o[r+1]=n}let i=o[t+1];i.getWorldPosition(Y).applyMatrix4(n.matrixWorldInverse);let s=i.distance>0?i.distance:60;e.uLocalPos.value[a].set(Y.x,Y.y,Y.z,s),e.uLocalColor.value[a].copy(i.color).multiplyScalar(i.intensity*.35),a++}}e.uLocalCount.value=a,J.localLights=a}function et(){if(J){for(let e of J.offs)e();J.wet.dispose(),J.puddles.dispose(),J.group.parent&&J.group.parent.remove(J.group);for(let e of J.systems)e.dispose();for(let e of J.textures)e.dispose();J.engine.composer.removePass(J.grading),J.engine.composer.removePass(J.fxPass),J.grading.dispose?.(),J.fxPass.dispose(),J.groundFX.dispose(),J.world.effects=null,J=null}}function tt(e,t){let n=J.world.roads?.api;if(n&&typeof n.surfaceHeight==`function`)try{let r=n.surfaceHeight(e,t);if(Number.isFinite(r))return r+.03}catch{}else if(n&&typeof n.nearest==`function`)try{let r=n.nearest(e,t,14);if(r&&r.segment&&r.point&&Number.isFinite(r.point.y)&&r.distance<=(r.segment.width||12)*.5)return r.point.y+.05}catch{}let r=J.world.terrain.getHeight(e,t)+.06;for(let n of J.plates)e>=n.x0&&e<=n.x1&&t>=n.z0&&t<=n.z1&&(r=Math.max(r,n.y+.03));return r}function nt(){let{world:e}=J;J.dirty=!1,J.dirtyAt=J.time;let t=J.lastCold,n=[],r=[],i=[],a=[],o=[],s=[];for(let e of J.sources.values())o.push(e),e.kind===`industrial`&&s.push({x:e.x,y:e.y,z:e.z,heat:e.heat??1});let c=e.buildings.list||[];for(let o of c){if(!o||!Number.isFinite(o.x))continue;let c=String(o.type||``).toLowerCase(),l=A(N(String(o.id??`${o.x},${o.z}`))^485),u=o.w??16,d=o.d??16,f=o.yaw??0,p=o.level??1,m=o.height??10,h=o.y??e.terrain.getHeight(o.x,o.z);if(o.state===`construction`){let e=M(Math.sqrt(u*d)/16,.6,2.2);n.push({kind:`dust`,x:o.x,y:h+.2,z:o.z,scale:e*1.2,rect:{w:u,d,yaw:f},opacity:.6*(1-(o.progress??0)*.35)});continue}if(c.startsWith(`ind`)){let e=Array.isArray(o.stacks)?o.stacks:Array.isArray(o.chimneys)?o.chimneys:null,t=Array.isArray(o.vents)?o.vents:null;if(e||t){for(let t of e||[]){if(!t||!Number.isFinite(t.x)||!Number.isFinite(t.z))continue;let e=Number.isFinite(t.y)?t.y+.3:h+m+1.2,n=M((t.r??1)/1,.6,2)*(.8+p*.1);r.push({kind:`industrial`,x:t.x,y:e,z:t.z,scale:n,density:1}),s.push({x:t.x,y:e,z:t.z,heat:.7+p*.1})}if(t&&t.length){let n=e&&e.length||p<2?-1:l.int(0,t.length-1);for(let e=0;e<t.length;e++){let r=t[e];if(!r||!Number.isFinite(r.x)||!Number.isFinite(r.z))continue;let o=(r.y??h+m)+.35;e===n?(a.push({kind:`chimney`,x:r.x,y:o,z:r.z,scale:.55+p*.09}),s.push({x:r.x,y:o,z:r.z,heat:.35})):l()<.18&&i.push({kind:`steam`,x:r.x,y:o,z:r.z,scale:.34,density:.45,opacity:.2})}}continue}if(p>=3&&l()<.55){let e=(l()*.6-.3)*u,t=(l()*.6-.3)*d,n=Math.cos(f),i=Math.sin(f),a=o.x+e*n-t*i,c=o.z+e*i+t*n,g=h+m+1.2,_=.62+p*.12;r.push({kind:`industrial`,x:a,y:g,z:c,scale:_,density:1}),s.push({x:a,y:g,z:c,heat:.7+p*.1})}else if(p>=2&&l()<.34){let e=(l()*.5-.25)*u,t=(l()*.5-.25)*d,n=Math.cos(f),r=Math.sin(f);i.push({kind:`steam`,x:o.x+e*n-t*r,y:h+m+.6,z:o.z+e*r+t*n,scale:.55,density:.6})}continue}if(c.startsWith(`res`)&&(c.includes(`low`)||p<=2)&&!c.includes(`high`)){if(t&&l()<.7){let e=(l()*.5-.25)*u,t=(l()*.4-.2)*d,n=Math.cos(f),r=Math.sin(f);a.push({kind:`chimney`,x:o.x+e*n-t*r,y:h+m+.6,z:o.z+e*r+t*n,scale:1.05+l()*.35})}continue}if((c.includes(`high`)||c.startsWith(`office`)||c.startsWith(`com`))&&p>=2){let e=Array.isArray(o.vents)?o.vents:null;if(e&&e.length)for(let t of e)!t||!Number.isFinite(t.x)||!Number.isFinite(t.z)||l()>.22||i.push({kind:`steam`,x:t.x,y:(t.y??h+m)+.35,z:t.z,scale:.4,density:.4,opacity:.22})}}let l=o.concat(n,r,i,a);J.hotSpots=s,J.counts.smoke=J.smoke.build(l,A(e.seed^4193991)),J.counts.emitters=l.length,J.counts.byKind={dust:n.length,industrial:r.length,steam:i.length,chimney:a.length,custom:o.length},J.lightScanAt=-1e9,J.ctx.config.debug&&console.log(`[effects] rebuilt ${l.length} emitters → ${J.counts.smoke} particles`)}function rt(){return{addSource(e){let t=e.id??J.nextSourceId++;return J.sources.set(t,{...e,id:t}),J.dirty=!0,t},removeSource(e){J.sources.delete(e)&&(J.dirty=!0)},clearSources(){J.sources.clear(),J.dirty=!0},addGroundPlate(e){J.plates.push(e),J.splashAnchor.set(1e9,0,1e9)},refresh(){J.dirty=!0,nt()},refreshMaterials(){return J.wet.sweep()},grading:J.grade,setLUT(e,t=16,n=1){let r=J.grading.uniforms;e&&(e.colorSpace=``,e.minFilter=e.magFilter=D,e.generateMipmaps=!1),r.tLUT.value=e,r.uLUTSize.value=t,r.uLUTAmount.value=e?n:0},surface(e={}){return Object.assign(J.surface,e),{...J.surface}},setEnabled(e){Object.assign(J.enabled,e)},get enabled(){return J.enabled},get wetness(){return J.wetness},get puddles(){return{count:J.puddleCount??0,visible:!!(J.puddles.mesh&&J.puddles.mesh.visible),map:J.puddles.map,xf:J.puddles.mapXf}},get snowCover(){return J.snowCover},get rain(){return J.rainAmt},get snow(){return J.snowAmt},stats(){return{cpuMs:+J.cpuMs.toFixed(3),smokeParticles:J.smoke.count,emitters:J.counts.emitters??0,byKind:J.counts.byKind??null,hotSpots:J.hotSpots.length,rain:+J.rainAmt.toFixed(2),snow:+J.snowAmt.toFixed(2),wetness:+J.wetness.toFixed(2),snowCover:+J.snowCover.toFixed(2),sources:J.sources.size,wetMaterials:J.wet.state.patched,sceneDepth:!!J.fxPass.sceneDepth,localLights:J.localLights,splashes:J.splash.mesh.visible?J.splash.geometry.instanceCount:0,sprayEmitters:J.spray.live,puddles:J.puddleCount??0,puddlesVisible:!!(J.puddles.mesh&&J.puddles.mesh.visible),puddleBuildMs:J.puddles.buildMs??0,reflect:+J.groundFX.uniforms.uWet.value.toFixed(2),contactAO:+J.groundFX.uniforms.uAO.value.x.toFixed(2)}}}}export{et as dispose,Ze as init,qe as name,Qe as update};