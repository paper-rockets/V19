import{A as e,G as t,Gt as n,It as r,Mt as i,Nt as a,O as o,T as s,dt as c,ft as l,jt as u,w as d,x as f,yt as p}from"./index-eKs5Uldr.js";var m=-1.05,h=.262,g=0,_=class{constructor(r,a={}){this.canvas=r,this.reducedMotion=!!a.reducedMotion,this.tier=a.tier||`high`,this.ok=!1,this.running=!1,this.t=0,this._raf=0,this._last=0,this._token=0,this.N=this.tier===`low`?240:384,this.RIM=9e3,this.CORE=.2,this.SN=this.tier===`low`?208:288,this.SHALF=2900,this.CX=-120,this.CZ=-60,this.sun=new n(Math.cos(h)*Math.sin(m),Math.sin(h),Math.cos(h)*Math.cos(m)).normalize();try{this.renderer=new f({canvas:r,antialias:!0,alpha:!1,stencil:!1,powerPreference:`default`})}catch{this.renderer=null;return}if(!this.renderer.getContext()){this.renderer=null;return}this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.tier===`low`?1:1.5)),this.renderer.outputColorSpace=u,this.renderer.toneMapping=6,this.renderer.toneMappingExposure=.97,this.renderer.setClearColor(659221,1),this.ok=!0,this.scene=new i,this.haze=new e(11123915),this.scene.fog=new t(this.haze.clone(),26e-5),this.camera=new p(38,1,5,4e4),this._baseFov=38,this._buildSky(),this._buildHorizonPlate(),this.terrain=null,this.water=null,this._onLost=e=>{e.preventDefault(),this.ok=!1,this.stop()},r.addEventListener(`webglcontextlost`,this._onLost,!1)}_buildSky(){let t={uZenith:{value:new e(2776222)},uHorizon:{value:new e(8826579)},uHaze:{value:this.haze.clone()},uSunColor:{value:new e(16765852)},uSunDir:{value:this.sun.clone()},uTime:{value:0},uCloudY:{value:2100}};this.skyUniforms=t;let n=new a({uniforms:t,side:1,depthWrite:!1,depthTest:!1,fog:!1,vertexShader:`
        varying vec3 vDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vDir = wp.xyz - cameraPosition;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,fragmentShader:`
        varying vec3 vDir;
        uniform vec3 uZenith, uHorizon, uHaze, uSunColor, uSunDir;
        uniform float uTime, uCloudY;

        float h21(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }
        float vnoise(vec2 p){
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = h21(i), b = h21(i + vec2(1.0, 0.0)), c = h21(i + vec2(0.0, 1.0)), d = h21(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        float fbm(vec2 p){
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; }
          return v;
        }

        void main() {
          vec3 d = normalize(vDir);
          float y = d.y;
          vec3 col = mix(uHorizon, uZenith, pow(clamp(y, 0.0, 1.0), 0.58));
          col = mix(col, uHaze, exp(-max(y, 0.0) * 13.0) * 0.90);
          col = mix(col, uHaze * 0.92, smoothstep(0.0, -0.08, y));

          float sd = max(dot(d, uSunDir), 0.0);
          col += uSunColor * (pow(sd, 1800.0) * 16.0 + pow(sd, 30.0) * 0.40 + pow(sd, 5.0) * 0.20);

          // flat cloud deck projected onto a plane -> real perspective convergence at the horizon
          if (y > 0.006) {
            float tPlane = (uCloudY - cameraPosition.y) / y;
            vec2 pw = (cameraPosition.xz + d.xz * tPlane) * 0.00040 + vec2(uTime * 0.0032, uTime * 0.0011);
            float f = fbm(pw * 3.0);
            float cov = smoothstep(0.44, 0.80, f) * smoothstep(0.010, 0.15, y) * (1.0 - smoothstep(0.72, 1.0, y) * 0.3);
            float lit = 0.80 + 0.95 * pow(sd, 2.0) + 0.40 * smoothstep(0.45, 0.9, f);
            vec3 cloud = mix(vec3(0.70, 0.74, 0.80), uSunColor * 1.2, 0.45 * pow(sd, 1.3) + 0.14) * lit;
            col = mix(col, cloud, cov * 0.9);
          }

          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`});this.skyMat=n,this.sky=new c(new r(2e4,32,20),n),this.sky.frustumCulled=!1,this.sky.renderOrder=-10,this.scene.add(this.sky)}_buildHorizonPlate(){let e=new o(34e3,48).rotateX(-Math.PI/2),t=new l({color:this.haze.clone(),fog:!1});this.plate=new c(e,t),this.plate.position.y=-14,this.plate.renderOrder=-5,this.scene.add(this.plate)}_axis(e){let t=this.N,n=this.RIM,r=this.CORE,i=new Float64Array(t);for(let a=0;a<t;a++){let o=a/(t-1)*2-1,s=o<0?-1:1,c=Math.abs(o);i[a]=e+n*(r*o+(1-r)*s*c*c*c)}return i}async setSource(e){if(!this.ok)return;let t=++this._token,n=this.N,r=this._axis(this.CX),i=this._axis(this.CZ),a=new Float32Array(n*n);for(let o=0;o<n;o+=24){let s=Math.min(n,o+24);for(let t=o;t<s;t++){let o=i[t],s=t*n;for(let t=0;t<n;t++)a[s+t]=e.sample(r[t],o,1)}if(s<n&&(await x(),t!==this._token))return}let o=await this._bakeShadows(e,t);if(t!==this._token||!o)return;let s=this._buildTerrainGeometry(a,r,i,o);if(t!==this._token){s.dispose();return}if(await x(),t!==this._token){s.dispose();return}let c=this._buildWaterGeometry(a,r,i);if(t!==this._token){s.dispose(),c&&c.dispose();return}this._swapTerrain(s),this._swapWater(c),this.running||this.renderOnce()}async _bakeShadows(e,t){let n=this.SN,r=this.SHALF,i=r*2/(n-1),a=this.CX-r,o=this.CZ-r,s=new Float32Array(n*n);for(let r=0;r<n;r+=32){let c=Math.min(n,r+32);for(let t=r;t<c;t++){let r=o+t*i;for(let o=0;o<n;o++)s[t*n+o]=e.sample(a+o*i,r,1)}if(c<n&&(await x(),t!==this._token))return null}let c=n,l=i,u=new Float32Array(c*c),d=this.sun.x,f=this.sun.y,p=this.sun.z,m=new Float32Array(24),h=12;for(let e=0;e<24;e++)m[e]=h,h*=1.235;let g=(e,t)=>{let r=(e-a)/i,c=(t-o)/i;r<0?r=0:r>n-1.001&&(r=n-1.001),c<0?c=0:c>n-1.001&&(c=n-1.001);let l=r|0,u=c|0,d=r-l,f=c-u,p=s[u*n+l],m=s[u*n+l+1],h=s[(u+1)*n+l],g=s[(u+1)*n+l+1];return(p+(m-p)*d)*(1-f)+(h+(g-h)*d)*f};for(let e=0;e<c;e++){let t=o+e*l;for(let n=0;n<c;n++){let r=a+n*l,i=g(r,t),o=0;for(let e=0;e<24;e++){let n=m[e],a=g(r+d*n,t+p*n)-(i+f*n+1);if(a>0){let e=a>10?1:a/10;if(e>o&&(o=e),o>=.995)break}}u[e*c+n]=1-o*o*(3-2*o)}}return u.K=c,u.kStep=l,u.x0=a,u.z0=o,u.half=r,u}_buildTerrainGeometry(t,n,r,i){let a=this.N,o=a*a,c=new Float32Array(o*3),l=new Float32Array(o*3),{K:u,kStep:f,x0:p,z0:m,half:h}=i,_=t=>new e(t),v=_(12823938),x=_(4876846),S=_(6783292),ee=_(8288844),C=_(5787976),te=_(3814959),w=_(15134194),T=_(3555631),E=_(1451055),ne=_(2570524),D=_(8882253),O=_(16770240),k=_(9418466),A=_(5858623),j=new e,re=this.sun.x,ie=this.sun.y,ae=this.sun.z;for(let e=0;e<a;e++){let o=r[e],s=(e<a-1?r[e+1]:r[e])-(e>0?r[e-1]:r[e]);for(let r=0;r<a;r++){let d=e*a+r,_=n[r],M=t[d];c[d*3]=_,c[d*3+1]=M,c[d*3+2]=o;let N=(r<a-1?n[r+1]:n[r])-(r>0?n[r-1]:n[r]),P=t[e*a+(r>0?r-1:r)],oe=t[e*a+(r<a-1?r+1:r)],F=t[(e>0?e-1:e)*a+r],I=t[(e<a-1?e+1:e)*a+r],L=N>0?(oe-P)/N:0,R=s>0?(I-F)/s:0,z=1/Math.sqrt(L*L+R*R+1);-L*z;let B=z;-R*z;let V=1-B,H=(y(_*.026+11.3,o*.026-4.1)-.5)*.3,U=(y(_*.026-19.7,o*.026+7.9)-.5)*.3,W=1/Math.sqrt((L+H)*(L+H)+(R+U)*(R+U)+1),se=-(L+H)*W,G=W,ce=-(R+U)*W,le=y(_*.0042,o*.0042),K=y(_*.0125+5.2,o*.0125-8.8);j.copy(x).lerp(S,le*.6+K*.4),j.lerp(D,b(.58,.92,K)*.55*(1-b(.3,.55,V)));let q=b(.44,.66,y(_*.009+31.7,o*.009-12.3)*.72+y(_*.029,o*.029)*.28)*(1-b(.34,.62,V))*b(2.2,6,M)*(1-b(80,145,M));q>.01&&j.lerp(ne,q*.95),M>22&&j.lerp(ee,b(22,60,M)*.38),M>48&&j.lerp(C,b(48,112,M)*.92),V>.2&&j.lerp(C,b(.22,.58,V)),V>.48&&j.lerp(te,b(.5,.86,V)*.85),M<4.5&&j.lerp(v,b(4.5,1,M)*(1-b(.32,.58,V))),M>155&&j.lerp(w,b(166,232,M)*(1-b(.46,.78,V)*.92)),M<g&&(j.lerp(T,b(.4,-2,M)),j.lerp(E,b(-2,-16,M)));let J=1;if(Math.abs(_-this.CX)<h&&Math.abs(o-this.CZ)<h){let e=(_-p)/f,t=(o-m)/f;e<0?e=0:e>u-1.001&&(e=u-1.001),t<0?t=0:t>u-1.001&&(t=u-1.001);let n=e|0,r=t|0,a=e-n,s=t-r,c=i[r*u+n],l=i[r*u+n+1],d=i[(r+1)*u+n],h=i[(r+1)*u+n+1];J=(c+(l-c)*a)*(1-s)+(d+(h-d)*a)*s}let Y=se*re+G*ie+ce*ae;Y<0&&(Y=0);let X=1.95*Y*J,Z=(.12+.22*G)*(.7+.3*J),Q=.1*(1-B),$=.9+.2*y(_*.052+7.1,o*.052-3.4);l[d*3]=j.r*(O.r*X+k.r*Z+A.r*Q)*$,l[d*3+1]=j.g*(O.g*X+k.g*Z+A.g*Q)*$,l[d*3+2]=j.b*(O.b*X+k.b*Z+A.b*Q)*$}}let M=new(o>65535?Uint32Array:Uint16Array)((a-1)*(a-1)*6),N=0;for(let e=0;e<a-1;e++)for(let t=0;t<a-1;t++){let n=e*a+t,r=n+1,i=n+a,o=i+1;M[N++]=n,M[N++]=i,M[N++]=r,M[N++]=r,M[N++]=i,M[N++]=o}let P=new s;return P.setAttribute(`position`,new d(c,3)),P.setAttribute(`color`,new d(l,3)),P.setIndex(new d(M,1)),P.computeBoundingSphere(),P}_buildWaterGeometry(e,t,n){let r=this.N,i=[],a=[],o=[],c=0;for(let s=0;s<r-1;s++)for(let l=0;l<r-1;l++){let u=e[s*r+l],d=e[s*r+l+1],f=e[(s+1)*r+l],p=e[(s+1)*r+l+1];if(Math.min(u,d,f,p)>=.25)continue;let m=t[l],h=t[l+1],_=n[s],v=n[s+1];i.push(m,g,_,h,g,_,m,g,v,h,g,v),a.push(Math.max(0,-u),Math.max(0,-d),Math.max(0,-f),Math.max(0,-p)),o.push(c,c+2,c+1,c+1,c+2,c+3),c+=4}if(!c)return null;let l=new s;return l.setAttribute(`position`,new d(new Float32Array(i),3)),l.setAttribute(`aDepth`,new d(new Float32Array(a),1)),l.setIndex(c>65535?new d(new Uint32Array(o),1):new d(new Uint16Array(o),1)),l.computeBoundingSphere(),l}_swapTerrain(e){this.terrainMat||=new l({vertexColors:!0,fog:!0}),this.terrain?(this.terrain.geometry.dispose(),this.terrain.geometry=e):(this.terrain=new c(e,this.terrainMat),this.terrain.frustumCulled=!1,this.scene.add(this.terrain))}_swapWater(t){this.waterMat||=(this.waterUniforms={uSunDir:{value:this.sun.clone()},uSunColor:{value:new e(16765852)},uSkyTop:{value:new e(2973596)},uSkyHorizon:{value:new e(10338524)},uShallow:{value:new e(3108724)},uDeep:{value:new e(730676)},uFogColor:{value:this.haze.clone()},uFogDensity:{value:this.scene.fog.density},uTime:{value:0}},new a({uniforms:this.waterUniforms,transparent:!0,depthWrite:!1,vertexShader:`
          attribute float aDepth;
          varying vec3 vWorld;
          varying float vDepth;
          void main(){
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorld = wp.xyz;
            vDepth = aDepth;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }`,fragmentShader:`
          varying vec3 vWorld;
          varying float vDepth;
          uniform vec3 uSunDir, uSunColor, uSkyTop, uSkyHorizon, uShallow, uDeep, uFogColor;
          uniform float uTime, uFogDensity;
          void main(){
            vec3 V = normalize(cameraPosition - vWorld);
            vec2 p = vWorld.xz;
            float w1 = sin(p.x * 0.029 + p.y * 0.016 + uTime * 0.55);
            float w2 = sin(p.x * -0.018 + p.y * 0.041 + uTime * 0.41);
            float w3 = sin(p.x * 0.083 - p.y * 0.058 + uTime * 0.95);
            vec3 Nn = normalize(vec3(0.05 * (w1 + 0.55 * w3), 1.0, 0.05 * (w2 - 0.55 * w3)));

            float fres = 0.025 + 0.975 * pow(1.0 - clamp(dot(Nn, V), 0.0, 1.0), 5.0);
            vec3 R = reflect(-V, Nn);
            vec3 sky = mix(uSkyHorizon, uSkyTop, pow(clamp(R.y, 0.0, 1.0), 0.5));

            float sdot = max(dot(R, uSunDir), 0.0);
            float spec = pow(sdot, 300.0) * 7.0 + pow(sdot, 26.0) * 0.35;

            vec3 body = mix(uShallow, uDeep, smoothstep(0.5, 12.0, vDepth));
            vec3 col = mix(body, sky, fres) + uSunColor * spec;

            float foam = (1.0 - smoothstep(0.0, 1.2, vDepth)) * 0.45;
            col = mix(col, vec3(0.80, 0.85, 0.88), foam);

            float dist = length(cameraPosition - vWorld);
            float fogF = 1.0 - exp(-pow(uFogDensity * dist, 2.0));
            col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));

            gl_FragColor = vec4(col, mix(0.82, 0.97, smoothstep(0.0, 3.0, vDepth)));
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`})),this.water?(this.water.geometry.dispose(),t?(this.water.geometry=t,this.water.visible=!0):this.water.visible=!1):t&&(this.water=new c(t,this.waterMat),this.water.frustumCulled=!1,this.water.renderOrder=2,this.scene.add(this.water))}_updateCamera(){let e=this.reducedMotion?8:this.t,t=-.26+e*.006,n=.188+.012*Math.sin(e*.043),r=1020+90*Math.sin(e*.03+1.2)-e*1.1,i=-190+22*Math.sin(e*.021),a=-240+16*Math.cos(e*.026),o=Math.cos(n),s=Math.sin(n);this.camera.position.set(i+Math.sin(t)*o*r,46+s*r,a+Math.cos(t)*o*r),this.camera.lookAt(i,42,a),this.sky.position.copy(this.camera.position),this.plate.position.set(this.camera.position.x,-14,this.camera.position.z)}resize(){if(!this.ok)return;let e=Math.max(2,this.canvas.clientWidth||window.innerWidth),t=Math.max(2,this.canvas.clientHeight||window.innerHeight);this.renderer.setSize(e,t,!1);let n=e/t;this.camera.aspect=n;let r=this._baseFov*Math.PI/180,i=16/9;this.camera.fov=n>=i?this._baseFov:Math.min(54,2*Math.atan(Math.tan(r/2)*(i/n))*180/Math.PI),this.camera.updateProjectionMatrix(),this.running||this.renderOnce()}renderOnce(){if(!(!this.ok||!this.terrain)){this._updateCamera(),this.skyUniforms.uTime.value=this.t,this.waterUniforms&&(this.waterUniforms.uTime.value=this.t);try{this.renderer.render(this.scene,this.camera)}catch{this.ok=!1}}}start(){if(!this.ok||this.running)return;this.running=!0,this._last=performance.now();let e=()=>{if(!this.running)return;this._raf=requestAnimationFrame(e);let t=performance.now();if(t-this._last<24)return;let n=Math.min(.05,(t-this._last)/1e3);this._last=t,!document.hidden&&(this.reducedMotion||(this.t+=n),this.renderOnce())};this._raf=requestAnimationFrame(e)}stop(){this.running=!1,this._raf&&cancelAnimationFrame(this._raf),this._raf=0}dispose(){this.stop(),this._token++,this.canvas.removeEventListener(`webglcontextlost`,this._onLost);for(let e of[this.terrain,this.water,this.sky,this.plate])e&&(this.scene.remove(e),e.geometry.dispose(),e.material&&e.material.dispose());if(this.terrain=this.water=this.sky=this.plate=null,this.renderer){this.renderer.dispose();try{this.renderer.forceContextLoss()}catch{}this.renderer=null}this.ok=!1}};function v(e,t){let n=Math.imul(e|0,668265261)^Math.imul(t|0,2246822507);return n=Math.imul(n^n>>>15,625341585),((n^n>>>13)>>>0)/4294967296}function y(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r;i=i*i*(3-2*i),a=a*a*(3-2*a);let o=v(n,r),s=v(n+1,r),c=v(n,r+1),l=v(n+1,r+1);return(o+(s-o)*i)*(1-a)+(c+(l-c)*i)*a}function b(e,t,n){let r=(n-e)/(t-e);return r=r<0?0:r>1?1:r,r*r*(3-2*r)}function x(){return new Promise(e=>setTimeout(e,0))}export{_ as Backdrop};