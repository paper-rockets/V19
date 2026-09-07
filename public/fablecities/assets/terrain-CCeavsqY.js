import{$ as e,A as t,B as n,E as r,Et as i,F as a,Ft as o,Gt as s,J as c,K as l,Kt as u,L as d,Mt as f,Nt as p,Ot as m,R as h,S as g,T as _,Ut as v,Wt as y,Y as b,Z as x,at as S,bt as C,dt as w,f as T,ht as E,it as D,jt as O,k,kt as A,l as j,m as M,mt as ee,n as N,o as P,qt as F,u as I,ut as te,vt as L,w as R,wt as z,xt as ne,yt as re,z as ie}from"./index-eKs5Uldr.js";import{t as B}from"./noise-D8FvdR-x.js";import{Heightmap as ae}from"./Heightmap-BIXR67n6.js";var oe=150;function se(e,t){let n=new B(t*7+21),r=new B(t*7+22),i=T(t,4242),a=e.waterLevel,o=(e,t)=>{let n=e+26*r.noise2D(e/70+31,t/70),a=t+26*r.noise2D(e/70,t/70-17),o=Math.floor(n/oe),s=Math.floor(a/oe),c=1/0,l=1/0,u=0;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let r=o+t,d=s+e,f=T(T(i,r*7919),d*104729),p=(f&65535)/65535*.8+.1,m=(f>>>16&65535)/65535*.8+.1,h=(r+p)*oe,g=(d+m)*oe,_=(n-h)*1.25,v=(a-g)*.85,y=Math.sqrt(_*_+v*v);y<c?(l=c,c=y,u=f%1e3/1e3):y<l&&(l=y)}return{id:u,edge:(l-c)*.5}},s=(t,n)=>({gx:(e.getHeightAny(t+4,n)-e.getHeightAny(t-4,n))/8,gz:(e.getHeightAny(t,n+4)-e.getHeightAny(t,n-4))/8}),c=(e,t,n,r,i,s)=>{let c=I(26,14,n-a)*I(1.2,3,n-a)*(1-I(.06,.13,r))*(1-I(s+70,s+20,i));if(c<=.001)return{w:0,id:0,edge:999};let l=o(e,t);return{w:c,id:l.id,edge:l.edge}},l=(t,i,s,c,l=null)=>{let u=s-a,d,f,p,m;if(l)d=l.gully,f=l.ridge,p=l.rd,m=l.rw;else{let n=e.relief(t,i,1);d=n.gully,f=n.ridge,p=e.riverDistance(t,i),m=e.riverHalfWidth(i)}let h=n.fbm2D(t/420,i/420,3),g=n.fbm2D(t/130+7.1,i/130-3.3,2),_=.6*d-.25*f,v=h*.75+g*.42+.3*_,y=I(16,42,u),b=j(.3,-.02,y),x=I(b-.05,b+.11,v)*(.82+.18*I(-.5,.5,g));x=Math.max(x,.004);let S=p-m,C=I(.3,.62,.5+.5*n.noise2D(i/75+3,t/75)),w=I(34,16,S)*I(3.5,9,S)*C*.72;if(x=Math.max(x,w),u>2&&u<28&&c<.1&&S>40){let e=o(t,i),n=I(.42,.58,.5+.5*r.noise2D(t/90+55,i/90-21)),a=(1-I(1.2,3.4,e.edge))*n*.6;x=Math.max(x,a)}x*=1-I(.3,.44,c);let T=112+18*n.noise2D(t/400+3,i/400);return x*=1-I(T-10,T+12,u),P(x,0,1)};return{controlAt:(t,n,i,o,u)=>{let d=i-a,f=e.relief(t,n,1),p=f.gully,m=f.ridge,h=f.upland,g=e.riverDistance(t,n),_=e.riverHalfWidth(n),v=l(t,n,i,o,{gully:p,ridge:m,rd:g,rw:_}),y=n-e.coastZ(t);u??=Math.min(g-_,-y);let b=c(t,n,i,o,g,_),x=s(t,n),S=Math.hypot(x.gx,x.gz),C=S>1e-4?P(x.gz/S,-1,1):0,w=I(.02,.12,S),T=.55*r.fbm2D(t/110,n/110,3)+.32*r.fbm2D(t/24+3,n/24,2),E=I(.16,.62,T+.22*C*w+.22*(m-.5)*h-.45*p+.14*I(8,40,d))*(1-.7*v);if(b.w>0){let e=I(.35,.8,b.id)*.65,t=I(2.5,9,b.edge);E=j(E,e*t+E*(1-t)*.5,b.w*.85)}let D=0;if(S>.03){let e=x.gx/S,i=x.gz/S,a=t*e+n*i,o=-t*i+n*e,s=r.noise2D(a/55+9,o/16);D+=I(.55,.9,s)*w*(.35+.65*I(.35,.6,T+.5))*.42}D+=p*h*I(.03,.09,S)*.34,D+=I(.22,.38,o)*.3*I(.35,.75,.5+.5*r.noise2D(t/33+12,n/33-5)),b.w>0&&(D=Math.max(D,b.w*I(3.2,.8,b.edge)*.32*I(.35,.7,.5+.5*r.noise2D(t/40-9,n/40+4))));let O=0,k=1-I(.08,.17,S),A=.5+.5*r.noise2D(t/48+17,n/48-8);if(y>-140&&d<6&&(O=I(-70-30*A,-12,y)*k*I(3.5,1,d-.6*A)),g<_+40&&d<4){let i=e.riverCurvature(n),a=t-e.riverX(n),o=I(3e-4,8e-4,a*i)*I(.6,.78,A)*k,s=Math.max(u,0),c=I(.3,.62,.5+.5*r.noise2D(t/13+41,n/13-7)+.45*(1-I(.5,5,s)));O=Math.max(O,o*I(4+6*A,.8,s)*c)}let M=Math.max(I(78,115,d)*(.45+.55*I(-.2,.5,r.fbm2D(t/90+40,n/90,2))),I(.62,.85,m)*h*I(.1,.24,S)*.85);return{dry:P(E,0,1),dirt:P(D,0,1),sand:P(O,0,1),rock:P(M,0,1),forest:v,field:b.w,fieldEdge:b.edge}},forestMask:l,fields:o,fieldAt:c}}var ce=[{name:`grass`,dir:`Grass004`,scale:5},{name:`drygrass`,dir:`Grass003`,scale:5.5},{name:`dirt`,dir:`Ground048`,scale:4.5},{name:`rock`,dir:`Rock030`,scale:7},{name:`sand`,dir:`Ground033`,scale:4},{name:`mud`,dir:`Ground054`,scale:4},{name:`rock2`,dir:`Rock035`,scale:9},{name:`forestfloor`,dir:`forest_floor`,scale:4}],V=e=>new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`image failed `+e)),r.src=e});function H(e,t){let n=document.createElement(`canvas`);n.width=t,n.height=t;let r=n.getContext(`2d`,{willReadFrequently:!0});return r.drawImage(e,0,0,t,t),r.getImageData(0,0,t,t).data}async function le(e=1024,t=16){let n=ce.length,r=new Uint8Array(e*e*4*n),a=new Uint8Array(e*e*4*n),o=ce.map(()=>[.5,.5,.5]);await Promise.all(ce.map(async(t,n)=>{let i=`./assets/shared/${t.dir}/`,[s,c,l,u]=await Promise.all([V(i+`color.jpg`),V(i+`normal.jpg`),V(i+`roughness.jpg`),V(i+`ao.jpg`).catch(()=>null)]),d=H(s,e),f=H(c,e),p=H(l,e),m=u?H(u,e):null,h=n*e*e*4,g=0,_=0,v=0,y=0;for(let t=0;t<e*e*4;t+=4)r[h+t]=d[t],r[h+t+1]=d[t+1],r[h+t+2]=d[t+2],r[h+t+3]=m?m[t]:255,a[h+t]=f[t],a[h+t+1]=f[t+1],a[h+t+2]=f[t+2],a[h+t+3]=p[t],t&124||(g+=d[t],_+=d[t+1],v+=d[t+2],y++);o[n]=[g/y/255,_/y/255,v/y/255]}));let s=(r,a)=>{let o=new d(r,e,e,n);return o.format=i,o.type=v,o.colorSpace=a?O:``,o.wrapS=o.wrapT=A,o.minFilter=S,o.magFilter=D,o.generateMipmaps=!0,o.anisotropy=t,o.needsUpdate=!0,o};return{albedo:s(r,!0),normal:s(a,!1),size:e,avg:o}}function U(e,t,n,r,i){let a=(t,n)=>.5+.5*e.fbm2D(t*r,n*r,i),o=a(t,n),s=a(t-1,n),c=a(t,n-1),l=a(t-1,n-1),u=t*t*(3-2*t),d=n*n*(3-2*n),f=o*(1-u)+s*u,p=c*(1-u)+l*u;return f*(1-d)+p*d}function ue(e=512,t=1){let n=new B(t+11),r=new B(t+12),a=new B(t+13),o=new B(t+14),s=new Uint8Array(e*e*4);for(let t=0;t<e;t++){let i=t/e;for(let c=0;c<e;c++){let l=c/e,u=(t*e+c)*4;s[u]=255*U(n,l,i,2,3),s[u+1]=255*U(r,l,i,5,4),s[u+2]=255*U(a,l,i,13,4);let d=U(o,l,i,7,2);s[u+3]=255*Math.abs(d*2-1)**.6}}let c=new h(s,e,e,i,v);return c.wrapS=c.wrapT=A,c.minFilter=S,c.magFilter=D,c.generateMipmaps=!0,c.colorSpace=``,c.needsUpdate=!0,c}function de(e=512,t=3){let n=M(t),r=[];for(let e=0;e<18;e++){let e=n.int(-7,7),t=n.int(-7,7);if(e===0&&t===0)continue;let i=Math.hypot(e,t);r.push({kx:e,ky:t,amp:.55/i*n.range(.4,1),phase:n.range(0,Math.PI*2),sharp:n.range(1,2.2)})}let a=new B(t+99),o=new Uint8Array(e*e*4),s=(e,t)=>{let n=0;for(let i of r){let r=Math.sin(2*Math.PI*(i.kx*e+i.ky*t)+i.phase);n+=i.amp*Math.sign(r)*Math.abs(r)**+i.sharp}return n+=2.4*(U(a,e,t,5,4)-.5)+.9*(U(a,e+.37,t+.61,11,3)-.5),n},c=1/e,l=.035;for(let t=0;t<e;t++){let n=t/e;for(let r=0;r<e;r++){let i=r/e,a=(s(i+c,n)-s(i-c,n))/(2*c)*l,u=(s(i,n+c)-s(i,n-c))/(2*c)*l,d=Math.hypot(a,u,1),f=(t*e+r)*4;o[f]=255*(.5-.5*a/d),o[f+1]=255*(.5-.5*u/d),o[f+2]=255*(.5+.5/d),o[f+3]=255}}let u=new h(o,e,e,i,v);return u.wrapS=u.wrapT=A,u.minFilter=S,u.magFilter=D,u.generateMipmaps=!0,u.colorSpace=``,u.needsUpdate=!0,u}function W(e,{srgb:t=!0,anisotropy:n=8}={}){let i=new r(e);return i.colorSpace=t?O:``,i.wrapS=i.wrapT=k,i.minFilter=S,i.magFilter=D,i.anisotropy=n,i.generateMipmaps=!0,i.premultiplyAlpha=!1,i.needsUpdate=!0,i}function fe(e,t,n,r=t){let i=e.getImageData(0,0,t,r),a=i.data,o=new Uint8Array(t*r);for(let e=0,t=0;e<a.length;e+=4,t++)o[t]=+(a[e+3]>=8);let s=o;for(let e=0;e<6;e++){let e=new Uint8Array(s);for(let n=0;n<r;n++)for(let i=0;i<t;i++){let o=n*t+i;if(s[o])continue;let c=0,l=0,u=0,d=0;for(let e=-1;e<=1;e++)for(let o=-1;o<=1;o++){let f=i+o,p=n+e;if(f<0||p<0||f>=t||p>=r)continue;let m=p*t+f;s[m]&&(c+=a[m*4],l+=a[m*4+1],u+=a[m*4+2],d++)}d&&(a[o*4]=c/d,a[o*4+1]=l/d,a[o*4+2]=u/d,e[o]=1)}s.set(e)}for(let e=0,t=0;e<a.length;e+=4,t++)!o[t]&&a[e+3]<8&&(s[t]||(a[e]=n[0],a[e+1]=n[1],a[e+2]=n[2]),a[e+3]=0);e.putImageData(i,0,0)}var G=(e,t,n)=>`hsl(${e.toFixed(1)},${(t*100).toFixed(0)}%,${(n*100).toFixed(0)}%)`;function pe(e,t=2.4){let n=e.width,r=e.height,i=e.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,n,r).data,a=new Float32Array(n*r);for(let e=0,t=0;e<i.length;e+=4,t++){let n=i[e+3]/255;a[t]=n*(.3*i[e]+.59*i[e+1]+.11*i[e+2])/255}let o=document.createElement(`canvas`);o.width=n,o.height=r;let s=o.getContext(`2d`),c=s.createImageData(n,r),l=c.data,u=(e,t)=>a[Math.min(r-1,Math.max(0,t))*n+Math.min(n-1,Math.max(0,e))];for(let e=0;e<r;e++)for(let r=0;r<n;r++){let i=u(r+1,e-1)+2*u(r+1,e)+u(r+1,e+1)-(u(r-1,e-1)+2*u(r-1,e)+u(r-1,e+1)),a=u(r-1,e+1)+2*u(r,e+1)+u(r+1,e+1)-(u(r-1,e-1)+2*u(r,e-1)+u(r+1,e-1)),o=-i*t,s=-a*t,c=Math.hypot(o,s,1),d=(e*n+r)*4;l[d]=255*(.5+.5*o/c),l[d+1]=255*(.5+.5*s/c),l[d+2]=255*(.5+.5/c),l[d+3]=255}return s.putImageData(c,0,0),W(o,{srgb:!1})}function K(e=512,t=5,n=100,r=.26,i=.34){let a=M(t),o=document.createElement(`canvas`);o.width=e,o.height=e;let s=o.getContext(`2d`,{willReadFrequently:!0});s.clearRect(0,0,e,e);let c=e*.5,l=e*.52,u=e*.455,d=[];for(let e=0;e<5;e++)d.push({k:e+2,a:a.range(.05,.17)/(e*.6+1),p:a.range(0,Math.PI*2)});let f=[];for(let e=0;e<3;e++)f.push({a:a.range(0,Math.PI*2),w:a.range(.35,.7),d:a.range(.22,.42)});let p=e=>{let t=.8;for(let n of d)t+=n.a*Math.sin(n.k*e+n.p);for(let n of f){let r=Math.abs((e-n.a+Math.PI*3)%(Math.PI*2)-Math.PI);t-=n.d*Math.max(0,1-r/n.w)**2}return Math.max(.24,t)*u};s.lineCap=`round`;let m=[];for(let e=0;e<5;e++){let t=-Math.PI*.5+(e/4-.5)*2.45+a.range(-.16,.16),n=p(t)*a.range(.72,.98);m.push({x0:c,y0:l+u*.62,x1:c+Math.cos(t)*n,y1:l+u*.62+Math.sin(t)*n,w:.0075,a:t})}for(let e of m.slice())for(let t=0;t<3;t++){let t=a.range(.35,.9),n=e.x0+(e.x1-e.x0)*t,r=e.y0+(e.y1-e.y0)*t,i=e.a+(a()<.5?1:-1)*a.range(.35,.85),o=u*a.range(.14,.3);m.push({x0:n,y0:r,x1:n+Math.cos(i)*o,y1:r+Math.sin(i)*o,w:.004,a:i})}for(let t of m)s.strokeStyle=G(28,.26,.13+(t.w>.005?.03:0)),s.lineWidth=e*t.w,s.beginPath(),s.moveTo(t.x0,t.y0),s.lineTo(t.x1,t.y1),s.stroke();let h=(e,t,n,r,i,a,o)=>{s.save(),s.translate(e,t),s.rotate(r);let c=s.createLinearGradient(0,-n,0,n);c.addColorStop(0,G(i+5,a*.9,Math.min(.62,o*1.22))),c.addColorStop(1,G(i-7,a,o*.66)),s.fillStyle=c,s.beginPath(),s.moveTo(0,-n),s.bezierCurveTo(n*.62,-n*.55,n*.6,n*.5,0,n),s.bezierCurveTo(-n*.6,n*.5,-n*.62,-n*.55,0,-n),s.fill(),s.strokeStyle=G(i-12,a*.45,o*.48),s.lineWidth=Math.max(.7,n*.055),s.beginPath(),s.moveTo(0,-n*.85),s.lineTo(0,n*.85),s.stroke(),s.restore()},g=[];for(let e=0;e<900;e++){let e=a.range(0,Math.PI*2),t=p(e),n=a()<.1,r=n?t*a.range(1,1.22):t*a()**.52,i=c+Math.cos(e)*r,o=l+Math.sin(e)*r*.98;g.push({x:i,y:o,out:n,t:r/t})}g.sort((e,t)=>t.y*.75+Math.abs(t.x-c)*.25-(e.y*.75+Math.abs(e.x-c)*.25)),g.forEach((t,o)=>{let s=o/900,c=e*a.range(.026,.044)*(t.out?.86:1),d=n+a.range(-11,13)+(t.out?4:0),f=1-(t.y-(l-u))/(2*u),p=r*(.62+.5*s+.42*f)+a.range(-.028,.028);h(t.x,t.y,c,a.range(0,Math.PI*2),d,a.range(i-.09,i+.09),Math.max(.09,p))}),s.globalCompositeOperation=`destination-out`;for(let t=0;t<4;t++){let t=a.range(0,Math.PI*2),n=p(t)*a.range(.15,.62),r=c+Math.cos(t)*n,i=l+Math.sin(t)*n,o=e*a.range(.024,.046),u=s.createRadialGradient(r,i,0,r,i,o);u.addColorStop(0,`rgba(0,0,0,1)`),u.addColorStop(.72,`rgba(0,0,0,0.95)`),u.addColorStop(1,`rgba(0,0,0,0)`),s.fillStyle=u,s.beginPath(),s.arc(r,i,o,0,Math.PI*2),s.fill()}s.globalCompositeOperation=`source-over`;let _=pe(o,2);return fe(s,e,[42,62,30]),{map:W(o),normalMap:_}}function me(e=512,t=9,n=118,r=.24){let i=M(t),a=document.createElement(`canvas`);a.width=e,a.height=e;let o=a.getContext(`2d`,{willReadFrequently:!0});o.clearRect(0,0,e,e);let s=e*.03,c=e*.5,l=e*.94;o.lineCap=`round`;let u=t=>({x:s+l*t,y:c+e*.085*t*t}),d=[];for(let t=0;t<15;t++){let n=.05+t/14*.93,r=u(n),a=e*(.42*(1-n*.8)+.045)*i.range(.82,1.1);for(let e of[-1,1]){let t=e*(Math.PI*.5-i.range(.55,.95)),o=r.x+Math.cos(t)*a*.3+a*.42,s=r.y+Math.sin(t)*a;d.push({x0:r.x,y0:r.y,x1:o,y1:s,u:n,side:e})}if(t<14){let t=n+.93/14*.5,r=u(t),a=e*(.42*(1-t*.8)+.045)*i.range(.42,.62);for(let e of[-1,1]){let n=e*(Math.PI*.5-i.range(.5,.9));d.push({x0:r.x,y0:r.y,x1:r.x+Math.cos(n)*a*.3+a*.42,y1:r.y+Math.sin(n)*a,u:t,side:e})}}}o.strokeStyle=G(26,.28,.14),o.lineWidth=e*.011,o.beginPath(),o.moveTo(s,c);for(let e=.05;e<=1.0001;e+=.05){let t=u(e);o.lineTo(t.x,t.y)}o.stroke();for(let t of d){let i=(t.x0+t.x1)*.5,a=(t.y0+t.y1)*.5,s=Math.hypot(t.x1-t.x0,t.y1-t.y0);o.save(),o.translate(i,a),o.rotate(Math.atan2(t.y1-t.y0,t.x1-t.x0)),o.fillStyle=G(n-8,.32,r*.62),o.globalAlpha=.85,o.beginPath(),o.ellipse(0,0,s*.52,e*.017*(1-.4*t.u),0,0,Math.PI*2),o.fill(),o.restore(),o.strokeStyle=G(28,.26,.16),o.lineWidth=e*.0032*(1-t.u*.5),o.globalAlpha=1,o.beginPath(),o.moveTo(t.x0,t.y0),o.lineTo(t.x1,t.y1),o.stroke()}for(let t=0;t<2;t++)for(let a of d){let s=Math.hypot(a.x1-a.x0,a.y1-a.y0),c=Math.max(10,Math.round(s/(e*.01))),l=Math.atan2(a.y1-a.y0,a.x1-a.x0);for(let s=0;s<c;s++){let u=(s+i())/c,d=a.x0+(a.x1-a.x0)*u,f=a.y0+(a.y1-a.y0)*u,p=l+(i()<.5?1:-1)*i.range(.7,1.45)+(t?i.range(-.2,.2):i.range(-.45,.45)),m=e*i.range(.03,.052)*(1-.3*a.u)*(1-.35*u)*(t?.85:1),h=r*(t?1.7:1)+.1*i()+.1*(1-u)*t;o.strokeStyle=G(n+i.range(-14,12),i.range(.24,.42),Math.min(.58,h)),o.lineWidth=e*(t?.004:.0052),o.beginPath(),o.moveTo(d,f),o.lineTo(d+Math.cos(p)*m,f+Math.sin(p)*m),o.stroke()}}let f=pe(a,2.6);return fe(a.getContext(`2d`,{willReadFrequently:!0}),e,[26,46,30]),{map:W(a),normalMap:f}}function he(e=1024,t=21){let n=M(t),r=document.createElement(`canvas`);r.width=e,r.height=e/2;let i=r.getContext(`2d`,{willReadFrequently:!0});i.clearRect(0,0,e,e/2);let a=e/4,o=e=>[e%4*a,Math.floor(e/4)*a],s=(e,t,r,s,c,l,u,d,f=.5,p=.96,m=1)=>{let[h,g]=o(e),_=h+a*.5,v=g+a*.99;for(let e=0;e<t;e++){let e=-Math.PI/2+n.range(-u,u),t=a*n.range(f,p),o=n.range(-.5,.5)*a*.3,h=a*n.range(.016,.03)*m,g=r+n.range(-10,12),y=_+n.range(-1,1)*a*(u>1?.42:.08),b=i.createLinearGradient(y,v,y,v-t);b.addColorStop(0,G(g-6,s,c)),b.addColorStop(.65,G(g,s+.05,(c+l)*.5)),b.addColorStop(1,G(g+8,s+.08,l)),i.fillStyle=b;let x=y+Math.cos(e)*t+o,S=v+Math.sin(e)*t,C=y+Math.cos(e)*t*.5+o*.35,w=v+Math.sin(e)*t*.5;i.beginPath(),i.moveTo(y-h,v),i.quadraticCurveTo(C-h*.6,w,x,S),i.quadraticCurveTo(C+h*.6,w,y+h,v),i.closePath(),i.fill(),d&&n()<.4&&(i.fillStyle=G(g+10,.3,.5),i.beginPath(),i.ellipse(x,S,h*1.6,h*3.2,e+Math.PI/2,0,Math.PI*2),i.fill())}},c=(e,t,r,s,c)=>{let[l,u]=o(e);for(let e=0;e<t;e++){let e=l+a*n.range(.12,.88),t=u+a*n.range(s,c),o=a*n.range(.012,.022);i.fillStyle=n.pick(r),i.beginPath(),i.arc(e,t,o,0,Math.PI*2),i.fill(),i.fillStyle=`rgba(255,240,120,0.9)`,i.beginPath(),i.arc(e,t,o*.4,0,Math.PI*2),i.fill()}};s(0,46,96,.27,.15,.38,.34,!1,.62,.99,.62),s(1,20,76,.24,.16,.42,1.15,!0,.7,1,.75),s(2,30,52,.22,.17,.36,.72,!0,.45,.88,.85);{let[e,t]=o(3),r=e+a*.5,s=t+a*.99;for(let e=0;e<9;e++){let e=-Math.PI/2+n.range(-1.1,1.1),t=a*n.range(.45,.85),o=108+n.range(-10,10),c=r,l=s;for(let r=1;r<=14;r++){let s=r/14,u=e+s*s*.9*Math.sign(Math.cos(e)||1),d=c+Math.cos(u)*t/14,f=l+Math.sin(u)*t/14;i.strokeStyle=G(o-8,.32,.2),i.lineWidth=a*.008*(1-s*.6),i.beginPath(),i.moveTo(c,l),i.lineTo(d,f),i.stroke();let p=a*.08*(1-s*.7);for(let e of[-1,1]){let t=u+e*1.25;i.fillStyle=G(o+n.range(-6,6),.34,.2+.16*s+n.range(-.03,.03)),i.beginPath(),i.ellipse(d+Math.cos(t)*p*.5,f+Math.sin(t)*p*.5,p*.5,p*.16,t,0,Math.PI*2),i.fill()}c=d,l=f}}}s(4,150,100,.24,.13,.31,.6,!1,.32,.7,.8),s(5,44,104,.23,.15,.31,.7,!1,.26,.5,1);{let[e,t]=o(5);for(let r=0;r<46;r++){let r=e+a*n.range(.1,.9),o=t+a*n.range(.62,.97),s=a*n.range(.02,.036);i.fillStyle=G(104+n.range(-8,8),.3,.2+n.range(0,.14));for(let e=0;e<3;e++){let t=e/3*Math.PI*2+n.range(-.2,.2);i.beginPath(),i.ellipse(r+Math.cos(t)*s*.55,o+Math.sin(t)*s*.55,s*.6,s*.42,t,0,Math.PI*2),i.fill()}}}return s(6,26,86,.25,.15,.39,.7,!1,.55,.95,.7),c(6,7,[`#cfc9b6`,`#d2b64a`,`#b8749a`,`#d8d4c6`],.12,.55),s(7,130,56,.2,.15,.33,.62,!0,.32,.7,.8),fe(i,e,[40,66,30],e/2),W(r)}function ge({albedoArray:e,normalArray:t,controlTex:n,control2Tex:r,normalTex:i,noiseTex:a,shoreTex:o=null,shoreN:c=1,spacing:l=2,half:u,size:d,waterLevel:f,horizon:p=!1,globalUniforms:m=null}){let h=new E({color:16777215,roughness:.85,metalness:0});h.name=p?`terrain-splat-horizon`:`terrain-splat`;let g={uAlbedo:{value:e},uNormalArr:{value:t},uControl:{value:n},uControl2:{value:r},uTerrainNormal:{value:i},uNoise:{value:a},uShore:{value:o},uShoreN:{value:c},uSpacing:{value:l},uHalf:{value:u},uSize:{value:d},uWaterLevel:{value:f},uScales:{value:ce.map(e=>e.scale)},uDetailFade:{value:new y(480,2200)},uNearFade:{value:new y(70,300)},uSnowLine:{value:172},uInfoTint:{value:0},uNight:{value:0},uWetness:{value:0},uMoonDir:{value:new s(.3,.9,.3)}};return h.userData.uniforms=g,h.defines=h.defines||{},p&&(h.defines.HORIZON_CTRL=1),h.onBeforeCompile=e=>{Object.assign(e.uniforms,g),m&&m.uWetness&&(e.uniforms.uWetness=m.uWetness),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vTWorld;
varying vec3 vTNormal;
#ifdef HORIZON_CTRL
attribute vec4 aCtrl;
varying vec4 vCtrl;
#endif`).replace(`#include <project_vertex>`,`#include <project_vertex>
vTWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
vTNormal = normalize(mat3(modelMatrix) * objectNormal);
#ifdef HORIZON_CTRL
vCtrl = aCtrl;
#endif`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
precision highp sampler2DArray;
uniform sampler2DArray uAlbedo;
uniform sampler2DArray uNormalArr;
uniform sampler2D uControl;
uniform sampler2D uControl2;
uniform sampler2D uTerrainNormal;
uniform sampler2D uNoise;
uniform sampler2D uShore;
uniform float uShoreN;
uniform float uSpacing;
uniform float uHalf;
uniform float uSize;
uniform float uWaterLevel;
uniform float uScales[8];
uniform vec2 uDetailFade;
uniform vec2 uNearFade;
uniform float uSnowLine;
uniform float uInfoTint;
uniform float uNight;
uniform float uWetness;
uniform vec3 uMoonDir;
varying vec3 vTWorld;
varying vec3 vTNormal;
#ifdef HORIZON_CTRL
varying vec4 vCtrl;
#endif

const mat2 ROT2 = mat2(0.8, -0.6, 0.6, 0.8);
const mat2 ROT3 = mat2(0.36, 0.93, -0.93, 0.36);
const vec3 LUMW = vec3(0.3, 0.59, 0.11);

// two-scale anti-tiling sample of one layer (top projection). alb: rgb colour, a AO; nrm: rgb normal, a roughness
void sampleLayer(float layer, vec2 p, float scale, float blend, float macro, out vec4 alb, out vec4 nrm) {
  vec2 uv1 = p / scale;
  vec2 uv2 = (ROT2 * p) / (scale * 4.3);
  vec4 a1 = texture(uAlbedo, vec3(uv1, layer));
  vec4 a2 = texture(uAlbedo, vec3(uv2, layer));
  vec4 n1 = texture(uNormalArr, vec3(uv1, layer));
  vec4 n2 = texture(uNormalArr, vec3(uv2, layer));
  alb = mix(a1, a2, blend);
  nrm = mix(n1, n2, blend);
  // 20x scale of the SAME photographic set. Beyond ~150 m the 1-4 m scales have mipped down to a flat
  // wash (the "airbrush smudge" look); this band keeps real ground structure at aerial distance.
  if (macro > 0.004) {
    vec3 uv3 = vec3((ROT3 * p) / (scale * 20.0) + 0.63, layer);
    vec3 a3 = texture(uAlbedo, uv3).rgb;
    float mean3 = max(dot(textureLod(uAlbedo, uv3, 7.0).rgb, LUMW), 0.02);
    alb.rgb *= mix(vec3(1.0), clamp(a3 / mean3, vec3(0.42), vec3(2.1)), macro);
  }
}

// triplanar sample of one rock layer; returns world-space normal perturbation in nPert
void sampleRockLayer(float layer, vec3 p, vec3 w, float scale, float big, out vec4 alb, out vec3 nPert, out float rough) {
  vec4 aX = texture(uAlbedo, vec3(p.zy / scale, layer));
  vec4 aY = texture(uAlbedo, vec3(p.xz / scale, layer));
  vec4 aZ = texture(uAlbedo, vec3(p.xy / scale, layer));
  vec4 nX = texture(uNormalArr, vec3(p.zy / scale, layer));
  vec4 nY = texture(uNormalArr, vec3(p.xz / scale, layer));
  vec4 nZ = texture(uNormalArr, vec3(p.xy / scale, layer));
  if (big > 0.0) {
    // rotate the macro sample so the two scales never line up into a visible grid
    vec4 aX2 = texture(uAlbedo, vec3((ROT2 * p.zy) / (scale * 3.7) + 0.31, layer));
    vec4 aY2 = texture(uAlbedo, vec3((ROT2 * p.xz) / (scale * 3.7) + 0.11, layer));
    vec4 aZ2 = texture(uAlbedo, vec3((ROT2 * p.xy) / (scale * 3.7) + 0.57, layer));
    aX = mix(aX, aX2, big); aY = mix(aY, aY2, big); aZ = mix(aZ, aZ2, big);
  }
  alb = aX * w.x + aY * w.y + aZ * w.z;
  vec3 tX = nX.xyz * 2.0 - 1.0, tY = nY.xyz * 2.0 - 1.0, tZ = nZ.xyz * 2.0 - 1.0;
  nPert = vec3(0.0, tX.y, tX.x) * w.x + vec3(tY.x, 0.0, tY.y) * w.y + vec3(tZ.x, tZ.y, 0.0) * w.z;
  rough = nX.a * w.x + nY.a * w.y + nZ.a * w.z;
}

vec3 tangentPert(vec4 n) { return (n.xyz * 2.0 - 1.0).xyy * vec3(1.0, 0.0, 1.0); }`).replace(`#include <map_fragment>`,`
// ---------------------------------------------------------------- terrain splat -----------------
vec3 tAlbedo; vec3 tNormalWorld; float tRough; float tAO; vec3 tNightFill;
{
  vec2 uvW = (vTWorld.xz + uHalf) / uSize;
  vec4 nzMacro = texture(uNoise, vTWorld.xz / 95.0 + 0.29);     // 30-95 m ground-cover patches
  vec4 nzMid = texture(uNoise, vTWorld.xz / 43.0 + 0.37);
  vec4 nzHuge = texture(uNoise, vTWorld.xz / 1150.0 + 0.71);
  vec4 nzReg = texture(uNoise, vTWorld.xz / 430.0 + 0.13);      // 100-430 m regional colour
  vec4 nzSmall = texture(uNoise, vTWorld.xz / 19.0 + 0.83);     // 6-19 m cover mottling
#ifdef HORIZON_CTRL
  vec3 gN = normalize(vTNormal);
  vec4 ctrl = vec4(vCtrl.x, vCtrl.y, 0.0, vCtrl.w);
  float canopy = vCtrl.z * 0.7;
  float curv = 0.5;
#else
  vec3 gN = normalize(texture(uTerrainNormal, uvW).xyz * 2.0 - 1.0);
  vec4 ctrl = texture(uControl, uvW);
  vec4 ctrl2 = texture(uControl2, uvW);
  float canopy = ctrl2.r;
  float curv = ctrl2.a;                                           // 0.5 flat, < 0.5 hollow, > 0.5 knoll
#endif
  float slope = 1.0 - gN.y;
  float grade = length(gN.xz) / max(gN.y, 0.05);
  // 40 m planform curvature straight off the world-normal map: > 0 in hollows/gullies, < 0 on ridges.
  // This is the landform itself, so the pattern it drives reads as drainage geology, not as airbrush.
  float conc = 0.0;
#ifndef HORIZON_CTRL
  {
    float e = 40.0 / uSize;
    float gx = texture(uTerrainNormal, uvW + vec2(e, 0.0)).r - texture(uTerrainNormal, uvW - vec2(e, 0.0)).r;
    float gz = texture(uTerrainNormal, uvW + vec2(0.0, e)).b - texture(uTerrainNormal, uvW - vec2(0.0, e)).b;
    conc = -(gx + gz) * 3.0;
  }
#endif
  float valleyF = smoothstep(0.03, 0.45, conc);
  float ridgeF = smoothstep(0.03, 0.45, -conc);
  float hAbove = vTWorld.y - uWaterLevel;
  // signed distance to the waterline (+ land). In-map from the distance texture (smooth across facets)
#ifdef HORIZON_CTRL
  float shoreD = clamp(hAbove / max(grade, 0.03), -8.0, 32.0);
#else
  vec2 uvS = ((vTWorld.xz + uHalf) / uSpacing + 0.5) / uShoreN;
  float shoreD = (texture(uShore, uvS).r * 255.0 - 128.0) * 0.25;
#endif
  float viewDist = length(vViewPosition);
  float detail = 1.0 - smoothstep(uDetailFade.x, uDetailFade.y, viewDist);
  float nearF = 1.0 - smoothstep(uNearFade.x, uNearFade.y, viewDist);
  float midF = 1.0 - smoothstep(90.0, 260.0, viewDist);
  float blend = smoothstep(0.32, 0.68, nzMid.g);
  float macroW = 1.0 * smoothstep(60.0, 260.0, viewDist);

  // --- weights ---
  float jitter = (nzMid.b - 0.5) * 0.10;
  float highland = smoothstep(14.0, 42.0, hAbove);
  // rock outcrops from ~36°, solid rock by ~53°; hills expose more than the low banks
  float rockSlope = smoothstep(0.19 + jitter, 0.40 + jitter, slope);
  // break the soil/rock boundary with high-frequency noise so hillsides never read as a soft grey smear
  rockSlope *= smoothstep(0.20, 0.66, 0.42 + 0.8 * (nzMid.b - 0.5) + 0.6 * (nzMacro.g - 0.5) + 1.1 * smoothstep(0.28, 0.50, slope));
  float steep = smoothstep(0.30, 0.47, slope);
  float cut = smoothstep(0.26, 0.44, slope) * (1.0 - highland);   // low, steep river bluffs / cut banks
  // turf and scrub still hold on below ~50°, so rock is not a solid slab on every moderate slope
  float rock = rockSlope * mix(0.62, 1.0, highland) * mix(0.55, 1.0, smoothstep(0.26, 0.46, slope));
  rock = max(rock, ridgeF * smoothstep(0.28, 0.50, slope) * highland * 0.55
    * smoothstep(0.38, 0.74, 0.45 + 0.7 * (nzMid.b - 0.5) + 0.5 * (nzMacro.g - 0.5)));   // broken outcrop on convex breaks
  rock = max(rock, ctrl.a * smoothstep(0.06, 0.20, slope + ctrl.a * 0.3));
  // cut banks: rock strata broken by noise instead of a smooth beige dirt ribbon
  float cutRock = cut * smoothstep(0.32, 0.62, 0.45 + 0.55 * nzMid.r + 0.3 * (nzMacro.b - 0.5));
  rock = max(rock, cutRock * 0.45);
  // scree / thin turf: only on genuinely steep ground, and broken up so it never smears over hillsides
  float scree = smoothstep(0.17, 0.30, slope) * (1.0 - rockSlope) * smoothstep(0.38, 0.68, 0.5 + 0.6 * (nzMacro.g - 0.5) + 0.5 * (nzMid.b - 0.5));
  float bankDirt = cut * 0.38 + scree * 0.14;
  // wet band: a darkening of whatever lies at the waterline (not its own dark mud layer)
  float wetK = (1.0 - smoothstep(0.15, 2.2 + 1.3 * nzMid.r, shoreD)) * smoothstep(-1.1, -0.05, shoreD);
  float bed = smoothstep(0.15, -2.2, shoreD);                      // river / sea bed: silt
  // sand: noise-broken threshold, so beaches have ragged fingers instead of a constant-width ribbon
  float sandBreak = smoothstep(0.30, 0.72, ctrl.b * 1.45 + 0.42 * (nzMid.b - 0.5) + 0.34 * (nzMacro.b - 0.5));
  float sand = sandBreak * (1.0 - smoothstep(0.10, 0.24, slope));
  // snow: line wanders ±50 m at 600-1500 m, lower on north-facing slopes, none on cliffs; wide,
  // soft transition, accumulation in hollows, wind-scoured knolls
  vec4 nzSnowA = texture(uNoise, vTWorld.xz / 1500.0 + 0.23);
  vec4 nzSnowB = texture(uNoise, vTWorld.xz / 620.0 + 0.61);
  float northness = clamp(-gN.z * 2.5, 0.0, 1.0) * smoothstep(0.06, 0.25, slope);
  float snowLine = uSnowLine + 100.0 * (nzSnowA.r - 0.5) + 44.0 * (nzSnowB.r - 0.5) + 14.0 * (nzMid.g - 0.5) - 25.0 * northness + 30.0 * (curv - 0.5);
  float snowSlope = 1.0 - smoothstep(0.16, 0.62, slope + 0.16 * (nzMid.r - 0.5) + 0.12 * (nzMacro.g - 0.5));
  float snow = smoothstep(snowLine - 70.0, snowLine + 80.0, vTWorld.y) * snowSlope;
  // wind-blown transition: ragged fingers of snow reaching down, bare rock reaching up
  snow *= smoothstep(0.24, 0.78, 0.30 + 0.70 * (nzMid.b * 0.5 + nzSmall.r * 0.3 + nzMacro.g * 0.2)
    + 1.30 * smoothstep(snowLine - 5.0, snowLine + 95.0, vTWorld.y));
  float patches = smoothstep(snowLine - 95.0, snowLine - 10.0, vTWorld.y)
    * smoothstep(0.46, 0.92, nzMid.r * 0.5 + nzSnowB.g * 0.5 + 0.18 * (1.0 - smoothstep(0.05, 0.2, slope)) + 0.25 * (0.5 - curv))
    * (1.0 - smoothstep(0.12, 0.30, slope));
  snow = max(snow, patches * 0.9);
  float farFade = 1.0 - 0.55 * smoothstep(150.0, 600.0, viewDist);
  float wMud = bed * 0.55 * (1.0 - sand) * farFade;
  float wSand = sand * (1.0 - wMud);
  float wRock = rock * (1.0 - wMud - wSand);
  float rest = max(0.0, 1.0 - wMud - wSand - wRock);
  float wForest = smoothstep(0.25, 0.85, canopy) * (0.42 + 0.38 * smoothstep(0.35, 0.7, nzMid.b)) * rest;
  float wDirt = clamp(max(ctrl.g, bankDirt), 0.0, 1.0) * (rest - wForest);
  float wDry = clamp(ctrl.r * 0.52 + scree * 0.10, 0.0, 1.0) * (rest - wForest - wDirt);
  float wGrass = max(0.0, rest - wForest - wDirt - wDry);
  // snow replaces everything but a little rock
  float snowW = snow * (1.0 - 0.42 * wRock);
  float keep = 1.0 - snowW;
  wMud *= keep; wSand *= keep; wRock *= keep; wForest *= keep; wDirt *= keep; wDry *= keep; wGrass *= keep;

  // regional colour drift: cool damp green ↔ warm olive/khaki over 100-430 m, so no two hills match
  vec3 region = mix(vec3(0.95, 1.00, 0.94), vec3(1.03, 1.00, 0.90), smoothstep(0.30, 0.72, nzReg.r * 0.65 + nzHuge.g * 0.35));
  region *= 0.96 + 0.08 * nzReg.g;

  vec3 alb = vec3(0.0); vec3 nP = vec3(0.0); float rgh = 0.0; float ao = 0.0;
  vec4 a, n;
  if (wGrass > 0.004) {
    sampleLayer(0.0, vTWorld.xz, uScales[0], blend, macroW, a, n);
    // olive meadow ↔ straw in 30-95 m patches; hollows keep more moisture, knolls burn off
    vec3 tint = mix(vec3(0.44, 0.50, 0.32), vec3(0.60, 0.58, 0.37), smoothstep(0.30, 0.78, nzMacro.r * 0.7 + 0.3 * curv));
    tint = mix(tint, tint * vec3(0.88, 1.02, 0.92), smoothstep(0.5, 0.18, curv));
    alb += a.rgb * tint * region * wGrass; nP += tangentPert(n) * 1.35 * wGrass; rgh += mix(0.94, 1.06, n.a) * wGrass;                    // grass 0.85 ao += a.a * wGrass;
  }
  if (wDry > 0.004) {
    sampleLayer(1.0, vTWorld.xz, uScales[1], blend, macroW, a, n);
    vec3 tint = mix(vec3(0.44, 0.46, 0.32), vec3(0.56, 0.54, 0.38), nzMacro.g);
    alb += a.rgb * tint * region * wDry; nP += tangentPert(n) * 1.35 * wDry; rgh += (0.95 + 0.13 * n.a) * wDry;                       // dry cover 0.86 ao += a.a * wDry;
  }
  if (wDirt > 0.004) {
    sampleLayer(2.0, vTWorld.xz, uScales[2], blend, macroW, a, n);
    // bank / trail soil is damp brown, not pale beige
    vec3 tint = mix(vec3(0.46, 0.40, 0.31), vec3(0.63, 0.57, 0.45), nzMacro.b * 0.6 + 0.4 * (1.0 - cut));
    alb += a.rgb * tint * wDirt; nP += tangentPert(n) * 1.4 * wDirt; rgh += (1.06 + 0.12 * n.a) * wDirt;                      // bare soil 0.95 ao += a.a * wDirt;
  }
  if (wForest > 0.004) {
    sampleLayer(7.0, vTWorld.xz, uScales[7], blend, macroW, a, n);
    vec3 tint = mix(vec3(0.26, 0.25, 0.18), vec3(0.38, 0.35, 0.25), nzMacro.b);
    alb += a.rgb * tint * wForest; nP += tangentPert(n) * wForest; rgh += (0.98 + 0.11 * n.a) * wForest;                    // forest floor 0.88 ao += a.a * wForest;
  }
  if (wRock > 0.004 || snowW > 0.004) {
    vec3 w3 = pow(abs(gN), vec3(5.0)); w3 /= (w3.x + w3.y + w3.z);
    vec3 rpA, rpB; float rrA, rrB; vec4 aA, aB;
    float bigF = 0.42 * (1.0 - smoothstep(260.0, 850.0, viewDist));   // the macro rock scale would moire at range
    sampleRockLayer(3.0, vTWorld, w3, uScales[3], bigF, aA, rpA, rrA);
    sampleRockLayer(6.0, vTWorld, w3, uScales[6], 0.0, aB, rpB, rrB);
    // two rock sets blended by altitude + huge noise: warm ochre gneiss low down, cooler grey up high
    float rockMix = clamp(smoothstep(0.35, 0.65, nzHuge.b + 0.35 * (nzMid.r - 0.5)) * 0.6 + 0.55 * smoothstep(30.0, 150.0, hAbove), 0.0, 1.0);
    vec4 ar = mix(aA, aB, rockMix); vec3 rp = mix(rpA, rpB, rockMix); float rr = mix(rrA, rrB, rockMix);
    // strata: horizontal banding on steep faces (stronger on cut banks)
    // the analytic strata band has no mip chain — fade it out before it aliases into a moire grid
    float strataF = smoothstep(0.3, 0.55, slope) * (1.0 - smoothstep(180.0, 620.0, viewDist));
    float strata = 1.0 - (0.16 + 0.14 * cut) * strataF + (0.30 + 0.20 * cut) * strataF * smoothstep(0.25, 0.75, fract(vTWorld.y * 0.11 + nzMid.g * 0.5));
    vec3 lowTint = vec3(0.86, 0.79, 0.66);          // warm ochre / buff
    vec3 highTint = vec3(0.92, 0.90, 0.93);         // cool grey granite — kept light so faces are not charcoal
    vec3 tint = mix(lowTint, highTint, smoothstep(20.0, 130.0, hAbove)) * mix(0.90, 1.10, nzMacro.r) * strata;
    tint *= mix(1.0, 0.95, smoothstep(0.62, 0.88, slope));
    // low cut banks: exposed soil / clay between the rock strata
    tint = mix(tint, vec3(0.98, 0.84, 0.66) * strata, cut * (0.35 + 0.35 * smoothstep(0.7, 0.3, fract(vTWorld.y * 0.11 + nzMid.g * 0.5 + 0.5))));
    // lichen / moss on gentler rock
    tint = mix(tint, tint * vec3(0.70, 0.90, 0.58), smoothstep(0.42, 0.78, nzMid.r * 0.6 + nzMacro.g * 0.4) * (1.0 - smoothstep(0.32, 0.55, slope)) * 0.75);
    alb += ar.rgb * tint * wRock; nP += rp * (1.5 + 1.0 * steep) * wRock; rgh += mix(0.88, 1.00, clamp(rr, 0.0, 1.0)) * wRock;     // rock 0.80 ao += mix(1.0, ar.a, 0.7) * wRock;
    // snow: bright, slightly blue, follows the rock relief faintly; wind-scoured on ridges, rock
    // pokes through on the steepest faces so the caps never end in a hard bright edge
    float scour = smoothstep(0.15, 0.3, slope) * 0.14 + smoothstep(0.6, 0.85, curv) * 0.08;
    vec3 snowCol = vec3(0.74, 0.78, 0.85) * (0.84 + 0.16 * nzMid.b) * (1.0 - scour);
    alb += snowCol * snowW; nP += rp * 0.4 * snowW; rgh += (0.44 + 0.14 * nzMid.b) * snowW;                  // snow 0.42 - snow has a sheen ao += mix(1.0, ar.a, 0.35) * snowW;
  }
  if (wSand > 0.004) {
    sampleLayer(4.0, vTWorld.xz, uScales[4], blend, macroW, a, n);
    vec3 tint = mix(vec3(0.44, 0.40, 0.33), vec3(0.58, 0.53, 0.43), nzMacro.g);
    alb += a.rgb * tint * wSand; nP += tangentPert(n) * 1.2 * wSand; rgh += (1.00 + 0.11 * n.a) * wSand;                      // sand 0.90 ao += a.a * wSand;
  }
  if (wMud > 0.004) {
    sampleLayer(5.0, vTWorld.xz, uScales[5], blend, macroW, a, n);
    alb += a.rgb * vec3(0.52, 0.48, 0.40) * wMud; nP += tangentPert(n) * 1.1 * wMud; rgh += (0.62 + 0.18 * n.a) * wMud;                       // wet river bed 0.60 ao += a.a * wMud;
  }

  // --- near-field micro detail ------------------------------------------------------------------
  float grassLike = wGrass + wDry + wForest * 0.6;
  if (nearF > 0.01 && grassLike > 0.02) {
    // 0.55 m grass structure: local contrast (sample / local mean) keeps the macro colour, adds blades
    vec3 duv = vec3(vTWorld.xz / 0.55, 0.0);
    vec4 dA = texture(uAlbedo, duv);
    vec4 dN = texture(uNormalArr, duv);
    float lumMean = max(dot(textureLod(uAlbedo, duv, 6.0).rgb, LUMW), 0.01);
    float ratio = clamp(pow(dot(dA.rgb, LUMW) / lumMean, 1.7), 0.35, 1.7);
    float k = nearF * clamp(grassLike, 0.0, 1.0);
    alb *= mix(1.0, ratio, k * 1.0);
    nP += tangentPert(dN) * 3.6 * k;
    ao = mix(ao, ao * dA.a, k * 0.55);
    // a second, 2.2 m clumping octave so the near ground is not a single frequency
    vec3 duv2 = vec3(vTWorld.xz / 2.2 + 0.41, 0.0);
    vec4 d2 = texture(uAlbedo, duv2);
    alb *= mix(1.0, clamp(0.70 + 0.75 * dot(d2.rgb, LUMW) / max(lumMean, 0.02), 0.72, 1.35), k * 0.4);
    nP += tangentPert(texture(uNormalArr, duv2)) * 1.0 * k;
  }
  if (midF > 0.01 && (wGrass + wDry) > 0.02) {
    // sparse, high-frequency scree / worn dirt where the turf is thin — small and broken, never a blotch
    vec4 nzFine = texture(uNoise, vTWorld.xz / 6.0 + 0.13);
    vec4 nzFine2 = texture(uNoise, vTWorld.xz / 2.1 + 0.63);
    float wornP = smoothstep(0.70, 0.86, nzFine.g * 0.45 + nzFine2.b * 0.35 + nzMid.b * 0.2 + 0.10 * wDry + 0.10 * smoothstep(0.04, 0.14, grade)) * clamp(wGrass + wDry, 0.0, 1.0) * midF;
    if (wornP > 0.003) {
      vec3 puv = vec3(vTWorld.xz / 2.2 + 0.2, 2.0);
      vec4 pA = texture(uAlbedo, puv);
      vec4 pN = texture(uNormalArr, puv);
      alb = mix(alb, pA.rgb * vec3(0.70, 0.63, 0.51), wornP * 0.55);
      nP = mix(nP, tangentPert(pN) * 1.8, wornP * 0.7);
      rgh = mix(rgh, 1.06 + 0.10 * pN.a, wornP * 0.6);         // worn soil 0.95
    }
  }

  // --- geology, not airbrush ---------------------------------------------------------------------
  // (a) drainage: hollows hold water — darker, greener, and they READ as a network because curv comes
  //     from the real 8 m Laplacian of the heightmap, so the pattern follows the actual landform
  float cav = (curv - 0.5) * 2.0;
  float turf = clamp(wGrass + wDry + wForest, 0.0, 1.0);
  alb *= mix(vec3(1.0), vec3(0.70, 0.79, 0.66), clamp(-cav, 0.0, 1.0) * 0.45 * turf);
  alb *= mix(vec3(1.0), vec3(0.60, 0.72, 0.56), valleyF * 0.62 * turf);          // gullies / drainage lines
  // (b) ridges dry out, but only slightly — the old +10 % pale wash is what read as chalk streaks
  alb *= mix(vec3(1.0), vec3(1.05, 1.02, 0.94), clamp(cav, 0.0, 1.0) * 0.30 * turf);
  alb *= mix(vec3(1.0), vec3(1.03, 1.01, 0.96), ridgeF * 0.20 * turf);
  // (c) contour bedding / soil-creep terracettes: horizontal banding that follows the CONTOURS, which
  //     is what makes a real hillside read as geology instead of a smooth painted gradient
  // NOTE the distance fade. band is fract() of the *interpolated* world Y, which on a chunk-LOD
  // mesh is piecewise linear — so past a few hundred metres the contour lines kink at every triangle
  // edge and the 3.3 m period drops below the pixel footprint. That is the diagonal "diamond mesh
  // moiré" on the dark mountain faces: it is this band, not shadow acne (raising the CSM normal bias
  // 8x and setting shadow.intensity = 0 both leave it untouched). Gone by 520 m, amplitude halved.
  float bedF = smoothstep(0.10, 0.30, slope) * (1.0 - smoothstep(140.0, 520.0, viewDist));
  float band = fract(vTWorld.y * 0.30 + nzMacro.r * 1.7 + nzMid.g * 0.6);
  float bedBand = smoothstep(0.18, 0.46, band) - smoothstep(0.56, 0.86, band);
  alb *= 1.0 + (bedBand - 0.28) * 0.10 * bedF;
  alb *= mix(vec3(1.0), vec3(1.03, 0.99, 0.93), max(bedBand - 0.3, 0.0) * bedF * 0.7);
  alb *= 0.97 + 0.06 * nzMid.r;
  // (d) 6-19 m cover mottling: patchy sward, richer in the hollows (fades out past ~350 m)
  float small = (nzSmall.b * 0.55 + nzSmall.g * 0.45 - 0.5) * (1.0 - smoothstep(120.0, 380.0, viewDist));
  alb *= mix(vec3(1.0), vec3(0.88, 0.98, 0.84), clamp(small * 1.5, 0.0, 1.0) * (wGrass + wDry));
  alb *= mix(vec3(1.0), vec3(1.05, 1.02, 0.93), clamp(-small * 1.5, 0.0, 1.0) * (wGrass + wDry));
  // rain: wet ground is darker and MUCH glossier. Until now uWetness only touched albedo, which is
  // why our rain frames read as "a matte pale-tan surface with zero specular reflection".
  float wetRain = uWetness * (1.0 - 0.55 * snowW);
  alb *= mix(1.0, 0.70, wetRain);
  rgh = mix(rgh, 0.26, wetRain * 0.88);
  // wet shoreline band: darken and smooth whatever cover is there, peaking exactly at the waterline
  float wetShore = wetK * farFade;
  alb *= mix(1.0, 0.62, wetShore);
  // wet sand is glossy in daylight only — at night that gloss was the brightest thing on the map
  rgh = mix(rgh, 0.235, wetShore * 0.92 * (1.0 - 0.55 * uNight));   // wet sand 0.20
  // global slight desaturation towards a warm grey — natural ground is never fully saturated
  alb = mix(alb, vec3(dot(alb, LUMW)) * vec3(1.04, 1.0, 0.92), 0.24);
  // night: vegetated ground goes fully matte (no grazing specular smears) and takes a cool cast
  float veg = clamp(wGrass + wDry + wForest, 0.0, 1.0);
  rgh = mix(rgh, max(rgh, 1.06), uNight * veg * 0.85 * (1.0 - uWetness));
  alb *= mix(vec3(1.0), vec3(0.90, 0.96, 1.14), uNight * 0.5);
  // sand / silt no longer form a pale glowing ribbon along every shore after dark
  // the beach must never be the brightest thing on the map after dark (the "glowing shoreline")
  float shoreCover = clamp(wSand + wMud + wetShore + snowW * 0.5, 0.0, 1.0);
  alb = mix(alb, alb * vec3(0.17, 0.20, 0.25), uNight * shoreCover);
  // moonlit modelling: without this the whole landscape is a flat dark grey-green with no readable form
  float moonWrap = clamp(dot(gN, normalize(uMoonDir)) * 0.62 + 0.38, 0.0, 1.0);
  alb *= mix(1.0, 0.88 + 0.30 * moonWrap * moonWrap, uNight);
  // info-view overlay: desaturate + darken so coloured overlays read clearly
  if (uInfoTint > 0.0) { float l = dot(alb, LUMW); alb = mix(alb, vec3(l) * 0.75, uInfoTint * 0.7); }

  // real ground never reflects more than ~55 % (only snow goes higher) — keeps sunlit sand/rock from blowing out
  alb = min(alb, vec3(0.32) + vec3(0.34) * snowW);
  tAlbedo = alb;
  tRough = clamp(rgh, mix(mix(0.24, 0.80, veg), 0.90, uNight * veg), 1.28);
  tAO = mix(1.0, ao, 0.8);
  // Night sky bounce. At 21:00 the engine hands the terrain an ambient of 0.10 x sky (0.05,0.07,0.13):
  // essentially nothing, so without this the landscape is literally black. Its directionality (sky
  // visibility + the twilight glow behind the sun) is what puts modelling back into the relief.
  {
    float tw = clamp(dot(gN, normalize(uMoonDir)) * 0.5 + 0.5, 0.0, 1.0);
    tNightFill = vec3(0.160, 0.196, 0.300) * uNight * (0.30 + 0.50 * clamp(gN.y, 0.0, 1.0) + 0.55 * tw * tw)
      * (1.0 - 0.55 * shoreCover);
  }
  // final world normal: geometric normal + detail perturbation (xz components), faded with distance
  vec3 pert = vec3(nP.x, 0.0, nP.z) * (0.9 * detail * detail);
  tNormalWorld = normalize(gN + pert);
}
diffuseColor.rgb *= tAlbedo;
// ------------------------------------------------------------------------------------------------`).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = roughness * tRough;`).replace(`#include <normal_fragment_maps>`,`normal = normalize((viewMatrix * vec4(tNormalWorld, 0.0)).xyz);`).replace(`#include <aomap_fragment>`,`reflectedLight.indirectDiffuse *= tAO;
reflectedLight.indirectSpecular *= tAO;
// night sky bounce: nearly achromatic, so it models the relief without painting the ground green
reflectedLight.indirectDiffuse += mix(vec3(dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11))), diffuseColor.rgb, 0.3) * tNightFill;
#if NUM_DIR_LIGHTS > 0
// daytime sky/bounce fill: shadowed ground must read as shadow, not as a hole punched in the frame
reflectedLight.indirectDiffuse += diffuseColor.rgb * directionalLights[0].color * 0.038 * tAO;
#endif
#if NUM_HEMI_LIGHTS > 0
// hard sky-bounce floor. CS2 measures 0.00% pure-black pixels in every reference frame; our near
// bank measured 27%. Ground under an open sky cannot be darker than the bounce it receives.
{
  vec3 skyFill = mix(hemisphereLights[0].groundColor, hemisphereLights[0].skyColor, 0.66);
  reflectedLight.indirectDiffuse = max(reflectedLight.indirectDiffuse, diffuseColor.rgb * skyFill * 0.85 * tAO);
  vec3 albMin = max(diffuseColor.rgb, diffuseColor.rgb * 0.80 + vec3(0.030, 0.034, 0.024));
  reflectedLight.indirectDiffuse = max(reflectedLight.indirectDiffuse, albMin * skyFill * 1.95 * tAO);
}
#endif`)},h.customProgramCacheKey=()=>p?`fable-terrain-horizon-v20`:`fable-terrain-splat-v20`,h}var _e=[128,64,32,16],ve=new g,ye=class{constructor({heightmap:e,material:t,horizonMaterial:n,controlAt:r,chunkSize:i=256,lodDistances:a=[100,320,800],castShadow:o=!0,horizon:s=!0}){this.hm=e,this.material=t,this.horizonMaterial=n||t,this.controlAt=r,this.chunkSize=i,this.lodDistances=a,this.castShadow=o,this.group=new c,this.group.name=`terrain-chunks`,this.group.matrixAutoUpdate=!1,this.chunks=[],this.horizonTiles=[],this.count=Math.round(e.size/i),this._buildChunks(),this._buildSuperChunks(),s&&this._buildHorizon()}_buildSuperChunks(){let e=this.chunkSize*4,t=this.count/4;this.supers=[];for(let n=0;n<t;n++)for(let r=0;r<t;r++){let t=-this.hm.half+r*e,i=-this.hm.half+n*e,a=[];for(let e=0;e<4;e++)for(let t=0;t<4;t++)a.push(this.chunks[(n*4+e)*this.count+r*4+t]);let o=1/0,s=-1/0;for(let e of a)o=Math.min(o,e.minH),s=Math.max(s,e.maxH);let c={x0:t,z0:i,children:a,geo:null,mesh:null,minH:o,maxH:s};c.geo=q(this.hm,t,i,e,_e[3]*4,15+(s-o)*.12);let l=new w(c.geo,this.material);l.name=`terrain-super-${r}-${n}`,l.castShadow=this.castShadow&&s-o>4,l.receiveShadow=!0,l.matrixAutoUpdate=!1,l.layers.enable(3),l.visible=!1,c.mesh=l;for(let e of a)e.superChunk=c;this.group.add(l),this.supers.push(c)}}_buildChunks(){let{count:e,chunkSize:t,hm:n}=this;for(let r=0;r<e;r++)for(let i=0;i<e;i++){let e=-n.half+i*t,a=-n.half+r*t,o={cx:i,cz:r,x0:e,z0:a,x1:e+t,z1:a+t,geos:[null,null,null,null],lod:-1,minH:0,maxH:0,mesh:null};this._measure(o);let s=new w(this._geometry(o,3),this.material);s.name=`terrain-chunk-${i}-${r}`,s.castShadow=this.castShadow&&o.maxH-o.minH>4,s.receiveShadow=!0,s.matrixAutoUpdate=!1,s.layers.enable(3),o.mesh=s,o.lod=3,this.group.add(s),this.chunks.push(o)}}_measure(e){let{hm:t}=this,n=Math.round((e.x0+t.half)/t.spacing),r=Math.round((e.x1+t.half)/t.spacing),i=Math.round((e.z0+t.half)/t.spacing),a=Math.round((e.z1+t.half)/t.spacing),o=1/0,s=-1/0;for(let e=i;e<=a;e++)for(let i=n;i<=r;i++){let n=t.data[e*t.N+i];n<o&&(o=n),n>s&&(s=n)}e.minH=o,e.maxH=s}_geometry(e,t){if(e.geos[t])return e.geos[t];let n=q(this.hm,e.x0,e.z0,this.chunkSize,_e[t],3+t*4+(e.maxH-e.minH)*.12);return e.geos[t]=n,n}update(e){let t=e.position,n=this.lodDistances;for(let e of this.chunks){ve.min.set(e.x0,e.minH,e.z0),ve.max.set(e.x1,e.maxH,e.z1);let r=ve.distanceToPoint(t),i=r<n[0]?0:r<n[1]?1:r<n[2]?2:3;i===0&&t.y-e.maxH>n[0]*.9&&(i=1),i!==e.lod&&(e.lod=i,e.mesh.geometry=this._geometry(e,i))}for(let e of this.supers){let t=!0;for(let n of e.children)if(n.lod!==3){t=!1;break}e.mesh.visible=t;for(let n of e.children)n.mesh.visible=!t}}rebuildRegion(e,t,n,r){let{chunkSize:i,hm:a,count:o}=this,s=Math.max(0,Math.floor((Math.min(e,n)+a.half)/i)),c=Math.min(o-1,Math.floor((Math.max(e,n)+a.half)/i)),l=Math.max(0,Math.floor((Math.min(t,r)+a.half)/i)),u=Math.min(o-1,Math.floor((Math.max(t,r)+a.half)/i)),d=[];for(let e=l;e<=u;e++)for(let t=s;t<=c;t++){let n=this.chunks[e*o+t];for(let e of n.geos)e&&e.dispose();n.geos=[null,null,null,null],this._measure(n),n.mesh.castShadow=this.castShadow&&n.maxH-n.minH>4,n.mesh.geometry=this._geometry(n,n.lod),n.superChunk&&!n.superChunk._dirty&&(n.superChunk._dirty=!0,d.push(n.superChunk))}for(let e of d){e._dirty=!1;let t=1/0,n=-1/0;for(let r of e.children)t=Math.min(t,r.minH),n=Math.max(n,r.maxH);e.minH=t,e.maxH=n,e.geo.dispose(),e.geo=q(this.hm,e.x0,e.z0,this.chunkSize*4,_e[3]*4,15+(n-t)*.12),e.mesh.geometry=e.geo}}_buildHorizon(){let{hm:e}=this,t=e.half,n=(e,t,n,r,i,a,o)=>{let s=Math.round(n*2/r);for(let c=0;c<s;c++)for(let l=0;l<s;l++){let s=-n+l*r,u=-n+c*r;if(s>=-t&&s<t&&u>=-t&&u<t)continue;let d=be(e,s,u,r,i,a,this.controlAt),f=new w(d,this.horizonMaterial);f.name=`terrain-horizon-${o}-${l}-${c}`,f.castShadow=o===`near`&&d.boundingBox.max.y-d.boundingBox.min.y>30,f.receiveShadow=!0,f.matrixAutoUpdate=!1,f.frustumCulled=!0,f.layers.enable(3),this.group.add(f),this.horizonTiles.push(f)}};n(e.outer,t,t*2,512,64,40,`near`),n(e.far,t*2,t*4,2048,64,90,`far`)}dispose(){for(let e of this.chunks)for(let t of e.geos)t&&t.dispose();for(let e of this.supers)e.geo.dispose();for(let e of this.horizonTiles)e.geometry.dispose()}};function q(e,t,n,r,i,a){let o=i+1,s=r/i,c=Math.round(s/e.spacing),l=Math.round((t+e.half)/e.spacing),u=Math.round((n+e.half)/e.spacing),d=e.N,f=e.data,p=o*o+4*o,m=new Float32Array(p*3),h=new Float32Array(p*3),g=new Uint32Array(i*i*6+4*i*6),v=(e,t)=>f[Math.min(d-1,Math.max(0,t))*d+Math.min(d-1,Math.max(0,e))],y=0;for(let r=0;r<o;r++)for(let i=0;i<o;i++){let a=l+i*c,o=u+r*c,p=t+i*s,g=n+r*s;m[y]=p,m[y+1]=f[o*d+a],m[y+2]=g;let _=v(a+1,o)-v(a-1,o),b=v(a,o+1)-v(a,o-1),x=-_/(2*e.spacing),S=-b/(2*e.spacing),C=Math.hypot(x,1,S);h[y]=x/C,h[y+1]=1/C,h[y+2]=S/C,y+=3}xe(m,h,g,o,i,a,J(g,o,i),null);let b=new _;return b.setAttribute(`position`,new R(m,3)),b.setAttribute(`normal`,new R(h,3)),b.setIndex(new R(g,1)),b.computeBoundingBox(),b.computeBoundingSphere(),b}function be(e,t,n,r,i,a,o){let s=i+1,c=r/i,l=s*s+4*s,u=new Float32Array(l*3),d=new Float32Array(l*3),f=new Float32Array(l*4),p=new Uint32Array(i*i*6+4*i*6),m=new Float32Array((s+2)*(s+2));for(let r=-1;r<=s;r++)for(let i=-1;i<=s;i++)m[(r+1)*(s+2)+i+1]=e.getHeight(t+i*c,n+r*c);let h=(e,t)=>m[(t+1)*(s+2)+e+1],g=0;for(let e=0;e<s;e++)for(let r=0;r<s;r++){let i=t+r*c,a=n+e*c,s=h(r,e);u[g]=i,u[g+1]=s,u[g+2]=a;let l=(h(r+1,e)-h(r-1,e))/(2*c),p=(h(r,e+1)-h(r,e-1))/(2*c),m=-l,_=-p,v=Math.hypot(m,1,_);if(d[g]=m/v,d[g+1]=1/v,d[g+2]=_/v,o){let e=o(i,a,s,1-1/Math.sqrt(1+l*l+p*p)),t=g/3*4;f[t]=e.dry,f[t+1]=e.dirt,f[t+2]=e.forest,f[t+3]=e.rock}g+=3}xe(u,d,p,s,i,a,J(p,s,i),f);let v=new _;return v.setAttribute(`position`,new R(u,3)),v.setAttribute(`normal`,new R(d,3)),v.setAttribute(`aCtrl`,new R(f,4)),v.setIndex(new R(p,1)),v.computeBoundingBox(),v.computeBoundingSphere(),v}function J(e,t,n){let r=0;for(let i=0;i<n;i++)for(let a=0;a<n;a++){let n=i*t+a,o=(i+1)*t+a,s=(i+1)*t+a+1,c=i*t+a+1;e[r++]=n,e[r++]=o,e[r++]=c,e[r++]=o,e[r++]=s,e[r++]=c}return r}function xe(e,t,n,r,i,a,o,s){let c=r*r,l=(e,t)=>e===0?t:e===1?(r-1)*r+t:e===2?t*r:t*r+(r-1);for(let u=0;u<4;u++){for(let n=0;n<r;n++){let r=l(u,n),i=c+n;e[i*3]=e[r*3],e[i*3+1]=e[r*3+1]-a,e[i*3+2]=e[r*3+2],t[i*3]=t[r*3],t[i*3+1]=t[r*3+1],t[i*3+2]=t[r*3+2],s&&(s[i*4]=s[r*4],s[i*4+1]=s[r*4+1],s[i*4+2]=s[r*4+2],s[i*4+3]=s[r*4+3])}for(let e=0;e<i;e++){let t=l(u,e),r=l(u,e+1),i=c+e,a=c+e+1;u===1||u===2?(n[o++]=t,n[o++]=i,n[o++]=r,n[o++]=i,n[o++]=a,n[o++]=r):(n[o++]=t,n[o++]=r,n[o++]=i,n[o++]=r,n[o++]=a,n[o++]=i)}c+=r}}var Y=new C,Se=new s,Ce=new s,we=new s,Te=new te,Ee=new s(0,0,-1),X=new u,De=new s,Oe=new s,ke=new u,Ae=new y,je=new t;function Me(e){let t=e.N,n=new Uint16Array(t*t),r=new h(n,t,t,m,b);r.minFilter=D,r.magFilter=D,r.wrapS=r.wrapT=k,r.generateMipmaps=!1,r.colorSpace=``,r.internalFormat=`R16F`;let i=()=>{let t=e.data;for(let e=0;e<t.length;e++)n[e]=ie.toHalfFloat(t[e]);r.needsUpdate=!0};return i(),{tex:r,update:i,N:t}}var Ne=class{constructor({heightmap:e,noiseTex:n,normalTex:r,shoreTex:i=null,chunkSize:a=128,reflections:o=!0,reflectionScale:c=.5,renderer:l,engine:u=null,noAoLayer:d=null}){this.hm=e,this.waterLevel=e.waterLevel,this.reflectionsEnabled=o,this.renderer=l,this.engine=u,this.heightFine=Me(e),this.heightOuter=e.outer?Me(e.outer):this.heightFine,this.heightFar=e.far?Me(e.far):this.heightOuter;let f=new y;l.getDrawingBufferSize(f),this.reflectionScale=c,this.reflectionRT=new F(Math.max(256,Math.floor(f.x*c)),Math.max(256,Math.floor(f.y*c)),{type:b,depthBuffer:!0,stencilBuffer:!1,samples:0}),this.reflectionRT.texture.minFilter=D,this.reflectionRT.texture.magFilter=D,this.reflectionRT.texture.generateMipmaps=!1,this.virtualCamera=new re,this.virtualCamera.layers.set(3),this.textureMatrix=new te,this.hasReflection=!1;let p={uTime:{value:0},uHeightTex:{value:null},uHeightN:{value:this.heightFine.N},uHeightOuter:{value:null},uOuterN:{value:this.heightOuter.N},uOuterHalf:{value:e.outer?e.outer.half:e.half},uOuterSpacing:{value:e.outer?e.outer.spacing:e.spacing},uHeightFar:{value:null},uFarN:{value:this.heightFar.N},uFarHalf:{value:e.far?e.far.half:e.half},uFarSpacing:{value:e.far?e.far.spacing:e.spacing},uHalf:{value:e.half},uSpacing:{value:e.spacing},uWaterLevel:{value:this.waterLevel},uNormalTex:{value:null},uNoise:{value:null},uShore:{value:null},uShoreN:{value:e.N},uSunDir:{value:new s(.35,.8,-.45)},uSunColor:{value:new t(1,.96,.9)},uSunIntensity:{value:3},uMoonDir:{value:new s(0,1,0)},uMoonColor:{value:new t(.6,.7,.9)},uMoonIntensity:{value:0},uSkyColor:{value:new t(.55,.7,1)},uHorizonColor:{value:new t(.75,.82,.92)},uAmbient:{value:.6},uShallowColor:{value:new t(1.9,1.45,1.05)},uDeepColor:{value:new t(.42,.62,.98)},uReflection:{value:null},uReflectionMatrix:{value:this.textureMatrix},uReflectionStrength:{value:0},uNightFactor:{value:0},uWind:{value:new y(.7,.3)},uSkyFloor:{value:new t(.03,.04,.062)},uRain:{value:0},uNightSheen:{value:new t(0,0,0)}};p.uHeightTex.value=this.heightFine.tex,p.uHeightOuter.value=this.heightOuter.tex,p.uHeightFar.value=this.heightFar.tex,p.uNormalTex.value=r,p.uNoise.value=n,p.uShore.value=i,p.uReflection.value=this.reflectionRT.texture,p.uReflectionMatrix.value=this.textureMatrix,this.uniforms=p;let m=new ee({name:`water`,color:new t(1255471),roughness:.04,metalness:0,ior:1.333,envMapIntensity:2,transparent:!0,depthWrite:!1,fog:!0,side:0});m.onBeforeCompile=e=>{Object.assign(e.uniforms,p),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform mat4 uReflectionMatrix;
varying vec3 vWorld;
varying vec4 vReflUv;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
{
  vec4 wp = modelMatrix * vec4(transformed, 1.0);
  vWorld = wp.xyz;
  vReflUv = uReflectionMatrix * wp;
}`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+Pe).replace(`#include <map_fragment>`,Fe).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = roughness + 0.085 * smoothstep(160.0, 1700.0, gWDist) + gWFoam * 0.62 + uRain * 0.24;`).replace(`#include <normal_fragment_begin>`,`float faceDirection = 1.0;
vec3 normal = normalize((viewMatrix * vec4(gWN, 0.0)).xyz);
vec3 nonPerturbedNormal = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);`).replace(`#include <lights_fragment_maps>`,`#include <lights_fragment_maps>
#ifdef USE_ENVMAP
if (uReflectionStrength > 0.0) {
  vec4 ruv = vReflUv;
  ruv.xy += vec2(gWN.x, gWN.z) * (0.030 + 0.070 * gWDetail) * ruv.w;
  vec2 pv = ruv.xy / max(ruv.w, 1e-4);
  // the distorted lookup can walk off the reflection target; fade back to the sky probe at its
  // border instead of smearing a clamped column of pixels down the edge of the frame
  vec2 fade = smoothstep(vec2(0.0), vec2(0.035), pv) * smoothstep(vec2(0.0), vec2(0.035), 1.0 - pv);
  float inside = fade.x * fade.y;
  vec4 planar = texture2DProj(uReflection, ruv);
  // a reflected black tree must still sit on a faintly lit surface, never on a hole
  radiance = mix(radiance, max(planar.rgb, radiance * 0.14), clamp(planar.a, 0.0, 1.0) * uReflectionStrength * inside);
}
#endif
// CS2's water measures OKLab chroma 0.028 — a desaturated slate, never a blue field. The reflected
// sky is pulled towards its own luminance; the sun glitter is added later so it stays white.
radiance = mix(radiance, vec3(dot(radiance, vec3(0.2126, 0.7152, 0.0722))), 0.46);`).replace(`#include <aomap_fragment>`,`#include <aomap_fragment>
reflectedLight.directSpecular += gWGlitter;
reflectedLight.indirectDiffuse += diffuseColor.rgb * uSkyFloor;
// absolute floor: deep water at low fresnel has an almost black diffuse body, and a reflected dark
// bank is near zero too, so without this the near river measures as a hole in the frame
reflectedLight.indirectDiffuse = max(reflectedLight.indirectDiffuse, uSkyFloor * 1.35);
reflectedLight.indirectSpecular += uNightSheen * (0.16 + 0.84 * pow(1.0 - gWNdotV, 3.0));`)},m.customProgramCacheKey=()=>`fable-water-pbr-v9`,this.material=m,u&&u.registerMaterial&&u.registerMaterial(m),this.horizonExtent=e.far?e.far.half:e.half*3,this.mesh=new w(this._buildGeometry(a,this.horizonExtent),this.material),this.mesh.name=`water`,this.mesh.renderOrder=10,this.mesh.frustumCulled=!0,this.mesh.receiveShadow=!1,this.mesh.castShadow=!1,this.mesh.matrixAutoUpdate=!1,d==null?this.mesh.layers.set(0):this.mesh.layers.set(d),this.chunkSize=a}updateHeightTexture(){this.heightFine.update()}rebuildGeometry(){this.mesh.geometry.dispose(),this.mesh.geometry=this._buildGeometry(this.chunkSize,this.horizonExtent)}_buildGeometry(e,t){let n=this.hm,r=Math.round(n.size/e),i=[],a=this.waterLevel;for(let t=0;t<r;t++)for(let o=0;o<r;o++){let r=-n.half+o*e,s=-n.half+t*e,c=Math.round((r+n.half)/n.spacing),l=Math.round((s+n.half)/n.spacing),u=Math.round(e/n.spacing),d=1/0;for(let e=l;e<=l+u;e++)for(let t=c;t<=c+u;t++){let r=n.data[e*n.N+t];r<d&&(d=r)}d<a+.8&&i.push([r,s,r+e,s+e])}let o=n.half,s=t;i.push([-s,-s,s,-o],[-s,o,s,s],[-s,-o,-o,o],[o,-o,s,o]),this.waterQuads=i;let c=new Float32Array(i.length*4*3),l=new Uint32Array(i.length*6);i.forEach(([e,t,n,r],i)=>{let o=i*12;c.set([e,a,t,n,a,t,n,a,r,e,a,r],o);let s=i*4;l.set([s,s+2,s+1,s,s+3,s+2],i*6)});let u=new _;u.setAttribute(`position`,new R(c,3));let d=new Float32Array(c.length);for(let e=1;e<d.length;e+=3)d[e]=1;return u.setAttribute(`normal`,new R(d,3)),u.setIndex(new R(l,1)),u.computeBoundingSphere(),u.computeBoundingBox(),u}update(e,t,n,r){let i=this.uniforms;if(i.uTime.value=t,r&&r.sunDirection)i.uSunDir.value.copy(r.sunDirection).negate().normalize();else{let e=n.csm.lightDirection;i.uSunDir.value.set(-e.x,-e.y,-e.z).normalize()}r&&r.sunColor?i.uSunColor.value.copy(r.sunColor):i.uSunColor.value.copy(n.sunColor),i.uSunIntensity.value=r&&r.sunIntensity!=null?r.sunIntensity:n.sunIntensity,r&&r.moonDirection&&i.uMoonDir.value.copy(r.moonDirection).normalize(),r&&r.moonColor&&i.uMoonColor.value.copy(r.moonColor),i.uMoonIntensity.value=r&&r.moonIntensity!=null?r.moonIntensity:0,r&&r.skyColor?i.uSkyColor.value.copy(r.skyColor):i.uSkyColor.value.copy(n.hemi.color),i.uAmbient.value=r&&r.ambientIntensity!=null?r.ambientIntensity:n.hemi.intensity,r&&r.horizonColor?i.uHorizonColor.value.copy(r.horizonColor):i.uHorizonColor.value.copy(n.scene.fog?n.scene.fog.color:n.hemi.color);let a=r?r.nightFactor:0;i.uNightFactor.value=a,r&&r.wind&&r.wind.lengthSq()>1e-6&&i.uWind.value.copy(r.wind).normalize();let o=n&&n.scene,s=o&&o.environmentIntensity!=null?o.environmentIntensity:1;this.material.envMapIntensity=Math.min(2.6,Math.max(.6,1.05/Math.max(s,.18)));let c=i.uSkyColor.value,l=i.uAmbient.value;i.uSkyFloor.value.setRGB(c.r*l*.055+.0055*a,c.g*l*.055+.0068*a,c.b*l*.055+.0105*a);{let e=i.uSkyFloor.value,t=.2126*e.r+.7152*e.g+.0722*e.b;e.setRGB(e.r*.45+t*.55,e.g*.45+t*.55,e.b*.45+t*.55)}let u=n&&n.globalUniforms;i.uRain.value=u&&u.uWetness?Math.min(1,u.uWetness.value):0;let d=Math.max(1e-4,.2126*c.r+.7152*c.g+.0722*c.b);i.uNightSheen.value.copy(c).multiplyScalar(a*a*.024/d)}renderReflection(e,t,n){if(!this.reflectionsEnabled){this.uniforms.uReflectionStrength.value=0;return}let r=e.getDrawingBufferSize(Ae),i=Math.max(256,Math.floor(r.x*this.reflectionScale)),a=Math.max(256,Math.floor(r.y*this.reflectionScale));if((this.reflectionRT.width!==i||this.reflectionRT.height!==a)&&this.reflectionRT.setSize(i,a),Ce.set(0,this.waterLevel,0),we.setFromMatrixPosition(n.matrixWorld),we.y<this.waterLevel){this.uniforms.uReflectionStrength.value=0;return}Te.identity(),Se.set(0,1,0),De.subVectors(Ce,we),De.reflect(Se).negate(),De.add(Ce),Te.extractRotation(n.matrixWorld),Ee.set(0,0,-1),Ee.applyMatrix4(Te),Ee.add(we),Oe.subVectors(Ce,Ee),Oe.reflect(Se).negate(),Oe.add(Ce);let o=this.virtualCamera;o.position.copy(De),o.up.set(0,1,0),o.up.applyMatrix4(Te),o.up.reflect(Se),o.lookAt(Oe),o.far=n.far,o.near=n.near,o.fov=n.fov,o.aspect=n.aspect,o.updateMatrixWorld(),o.projectionMatrix.copy(n.projectionMatrix),this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(o.projectionMatrix),this.textureMatrix.multiply(o.matrixWorldInverse),Y.setFromNormalAndCoplanarPoint(Se,Ce),Y.applyMatrix4(o.matrixWorldInverse),X.set(Y.normal.x,Y.normal.y,Y.normal.z,Y.constant);let s=o.projectionMatrix;ke.x=(Math.sign(X.x)+s.elements[8])/s.elements[0],ke.y=(Math.sign(X.y)+s.elements[9])/s.elements[5],ke.z=-1,ke.w=(1+s.elements[10])/s.elements[14],X.multiplyScalar(2/X.dot(ke)),s.elements[2]=X.x,s.elements[6]=X.y,s.elements[10]=X.z+1-5e-4,s.elements[14]=X.w;let c=e.getRenderTarget(),l=e.xr.enabled,u=e.shadowMap.autoUpdate,d=e.autoClear;e.getClearColor(je);let f=e.getClearAlpha();e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,this.mesh.visible=!1;let p=t.background;t.background=null,e.setRenderTarget(this.reflectionRT),e.setClearColor(0,0),e.autoClear=!1,e.state.buffers.depth.setMask(!0),e.clear(!0,!0,!1),e.render(t,o),t.background=p,this.mesh.visible=!0,e.autoClear=d,e.setClearColor(je,f),e.xr.enabled=l,e.shadowMap.autoUpdate=u,e.setRenderTarget(c),this.uniforms.uReflectionStrength.value=1,this.hasReflection=!0}dispose(){this.mesh.geometry.dispose(),this.material.dispose(),this.heightFine.tex.dispose(),this.heightOuter!==this.heightFine&&this.heightOuter.tex.dispose(),this.heightFar!==this.heightOuter&&this.heightFar.tex.dispose(),this.reflectionRT.dispose()}},Pe=`
uniform float uTime;
uniform sampler2D uHeightTex; uniform float uHeightN;
uniform sampler2D uHeightOuter; uniform float uOuterN; uniform float uOuterHalf; uniform float uOuterSpacing;
uniform sampler2D uHeightFar; uniform float uFarN; uniform float uFarHalf; uniform float uFarSpacing;
uniform float uHalf;
uniform float uSpacing;
uniform float uWaterLevel;
uniform sampler2D uNormalTex;
uniform sampler2D uNoise;
uniform sampler2D uShore; uniform float uShoreN;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform vec3 uMoonDir;
uniform vec3 uMoonColor;
uniform float uMoonIntensity;
uniform vec3 uSkyColor;
uniform vec3 uHorizonColor;
uniform float uAmbient;
uniform vec3 uShallowColor;
uniform vec3 uDeepColor;
uniform sampler2D uReflection;
uniform mat4 uReflectionMatrix;
uniform float uReflectionStrength;
uniform float uNightFactor;
uniform vec2 uWind;
uniform vec3 uSkyFloor;
uniform vec3 uNightSheen;
uniform float uRain;
varying vec3 vWorld;
varying vec4 vReflUv;

// globals filled by WATER_BODY and consumed by the roughness / normal / lighting injections
vec3  gWN      = vec3(0.0, 1.0, 0.0);
vec3  gWGlitter = vec3(0.0);
float gWDist   = 0.0;
float gWDetail = 0.0;
float gWFoam   = 0.0;
float gWNdotV  = 1.0;

float waterTerrainHeight(vec2 xz) {
  float r = max(abs(xz.x), abs(xz.y));
  if (r <= uHalf) {
    vec2 uv = ((xz + uHalf) / uSpacing + 0.5) / uHeightN;
    return texture2D(uHeightTex, uv).r;
  }
  if (r <= uOuterHalf) {
    vec2 uv = ((xz + uOuterHalf) / uOuterSpacing + 0.5) / uOuterN;
    return texture2D(uHeightOuter, uv).r;
  }
  vec2 uv = ((xz + uFarHalf) / uFarSpacing + 0.5) / uFarN;
  return texture2D(uHeightFar, uv).r;
}

vec3 waterNrm(vec2 uv, float bias) { return texture2D(uNormalTex, uv, bias).xyz * 2.0 - 1.0; }
`,Fe=`
// ---- water body, ripples, foam and alpha --------------------------------------------------------
{
  vec3 Vw = normalize(cameraPosition - vWorld);
  float dist = length(cameraPosition - vWorld);
  gWDist = dist;
  float h = waterTerrainHeight(vWorld.xz);
  float depth = max(uWaterLevel - h, 0.0);
  // metres from the waterline into the water: in-map from the signed shore-distance texture (smooth
  // across triangle facets), outside from the depth
  float toShore;
  if (max(abs(vWorld.x), abs(vWorld.z)) <= uHalf) {
    vec2 uvS = ((vWorld.xz + uHalf) / uSpacing + 0.5) / uShoreN;
    toShore = max(-(texture2D(uShore, uvS).r * 255.0 - 128.0) * 0.25, 0.0);
  } else toShore = depth * 6.0;

  // --- animated ripple normals: five octaves from a 150 m swell down to a 2.4 m chop. The two
  //     smallest fade with distance so the far water calms instead of shimmering into pixel noise,
  //     but the 23 m and 61 m layers stay on out to the horizon, so there is ALWAYS ripple detail.
  vec2 wdir = normalize(uWind + vec2(0.0001));
  vec2 perp = vec2(-wdir.y, wdir.x);
  float t = uTime;
  float bias = 1.35 * smoothstep(150.0, 1100.0, dist);
  const mat2 R37 = mat2(0.7986, -0.6018, 0.6018, 0.7986);
  vec3 nS = waterNrm((R37 * vWorld.xz) / 150.0 + wdir * t * 0.005, bias);
  vec3 n0 = waterNrm((R37 * vWorld.xz) / 61.0 + wdir * t * 0.010, bias);
  vec3 n1 = waterNrm(vWorld.xz / 23.0 + wdir * t * 0.020 + perp * t * 0.004, bias);
  vec3 n2 = waterNrm((R37 * vWorld.xz) / 7.5 - wdir * t * 0.035 + perp * t * 0.011 + 0.37, bias);
  vec3 n3 = waterNrm(vWorld.xz / 2.4 + wdir * t * 0.055 + 0.71, bias);
  float detailFade = 1.0 - smoothstep(50.0, 520.0, dist);
  float midFade = 1.0 - smoothstep(180.0, 1800.0, dist);
  float farFade = 1.0 - smoothstep(400.0, 3000.0, dist);
  float calm = 0.45 + 0.55 * smoothstep(0.0, 2.5, toShore);      // the shallows near the bank are calmer
  gWDetail = detailFade;
  vec2 nxy = (nS.xy * 0.15
            + n0.xy * (0.10 + 0.13 * farFade)
            + n1.xy * (0.07 + 0.16 * midFade)
            + n2.xy * (0.03 + 0.13 * detailFade)
            + n3.xy * 0.09 * detailFade) * (0.60 + 0.40 * calm) * (0.20 + 0.26 * uRain);
  // At roughness 0.04 the sky probe is a sharp mirror, so the ripple slope has to be REAL: a few
  // degrees, not a crumpled foil. 0.20 keeps every octave visible without the reflection swinging
  // between sky and ground per pixel.
  gWN = normalize(vec3(nxy.x, 1.0, nxy.y));
  // a second, sharper normal used only for the sun glitter: this is what makes the sun path read as
  // thousands of individual sparks instead of one soft sheen
  // rain dimples: a fast counter-scrolling pair of the finest octave, near-field only
  if (uRain > 0.01) {
    vec3 r0 = waterNrm(vWorld.xz / 1.1 + vec2(t * 0.31, -t * 0.27), 0.0);
    vec3 r1 = waterNrm(vWorld.xz / 0.7 - vec2(t * 0.24, t * 0.33) + 0.29, 0.0);
    gWN = normalize(gWN + vec3(r0.x + r1.x, 0.0, r0.y + r1.y) * 0.22 * uRain * detailFade);
    nxy += (r0.xy + r1.xy) * 0.10 * uRain * detailFade;
  }
  vec2 gxy = nxy + (n3.xy * 0.30 + n2.xy * 0.22) * detailFade + n1.xy * 0.09 * midFade;
  vec3 Ng = normalize(vec3(gxy.x, 1.0, gxy.y));

  // --- body: absorption. Shallow water is a dark teal, deep water a navy; both are DIFFUSE only —
  //     everything bright on this surface is reflected sky, which is what makes it read as water.
  float absorb = 1.0 - exp(-depth * 0.62);
  diffuseColor.rgb *= mix(uShallowColor, uDeepColor, absorb);
  // river bed shows through the first metre (sand / mud)
  float bedShow = exp(-depth * 2.4);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.058, 0.052, 0.040), bedShow * 0.45);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722))), 0.30);

  // --- sun & moon glitter: a tight GGX lobe on the SHARP normal, added on top of three's own
  //     direct specular so the sun path breaks into sparks instead of one smooth smear.
  float cosT = max(dot(gWN, Vw), 0.0);
  gWNdotV = cosT;
  float ndv = max(cosT, 1e-3);
  float a = 0.040 + 0.055 * (1.0 - detailFade) + 0.05 * smoothstep(500.0, 2600.0, dist);
  float a2 = a * a;
  float moonUp = smoothstep(0.0, 0.15, uMoonDir.y);
  {
    vec3 Hs = normalize(uSunDir + Vw);
    float ndh = max(dot(Ng, Hs), 0.0), ndlS = max(dot(Ng, uSunDir), 0.0);
    float dd = ndh * ndh * (a2 - 1.0) + 1.0;
    float D = a2 / (PI * dd * dd);
    float Fh = 0.02 + 0.98 * pow(1.0 - max(dot(Hs, Vw), 0.0), 5.0);
    float Vis = 0.5 / max(ndlS * sqrt(ndv * ndv * (1.0 - a2) + a2) + ndv * sqrt(ndlS * ndlS * (1.0 - a2) + a2), 1e-3);
    float sunUp = smoothstep(-0.05, 0.12, uSunDir.y);
    gWGlitter += uSunColor * uSunIntensity * sunUp * min(D * Fh * Vis * ndlS, 0.9 + 1.7 * detailFade);
  }
  {
    vec3 Hm = normalize(uMoonDir + Vw);
    float ndh = max(dot(Ng, Hm), 0.0), ndlM = max(dot(Ng, uMoonDir), 0.0);
    float dd = ndh * ndh * (a2 - 1.0) + 1.0;
    float D = a2 / (PI * dd * dd);
    float Fh = 0.02 + 0.98 * pow(1.0 - max(dot(Hm, Vw), 0.0), 5.0);
    float Vis = 0.5 / max(ndlM * sqrt(ndv * ndv * (1.0 - a2) + a2) + ndv * sqrt(ndlM * ndlM * (1.0 - a2) + a2), 1e-3);
    gWGlitter += uMoonColor * uMoonIntensity * moonUp * min(D * Fh * Vis * ndlM, 5.0) * 1.4;
  }

  // --- shoreline: a narrow (<= 1.6 m) noise-broken foam lace, plus rare whitecaps on open water.
  //     Foam is a rough diffuse surface, so it goes into the albedo and lifts roughnessFactor.
  vec2 fuv = vWorld.xz / 9.0;
  float fN = texture2D(uNoise, fuv + wdir * t * 0.04).a * 0.55 + texture2D(uNoise, fuv * 2.7 - wdir * t * 0.07 + 0.3).b * 0.45;
  float band = 1.0 - smoothstep(0.12, 1.30, toShore);
  float swell = 0.5 + 0.5 * sin(t * 1.1 - toShore * 1.6 + fN * 4.0 + vWorld.x * 0.05);
  float foam = band * smoothstep(0.66, 0.88, fN * 0.78 + 0.26 * swell * band) * 0.34;
  foam = max(foam, (1.0 - smoothstep(0.0, 0.42, toShore)) * smoothstep(0.44, 0.70, fN + 0.16 * sin(t * 1.6 + vWorld.x * 0.3 + vWorld.z * 0.23)) * 0.36);
  foam *= 1.0 - smoothstep(260.0, 1000.0, dist);
  foam *= 1.0 - 0.92 * uNightFactor;
  float caps = smoothstep(0.955, 0.995, texture2D(uNoise, vWorld.xz / 11.0 + wdir * t * 0.06 + 0.5).b)
    * smoothstep(0.80, 0.97, texture2D(uNoise, vWorld.xz / 70.0 - wdir * t * 0.02 + 0.2).r)
    * midFade * calm * smoothstep(1.2, 4.0, depth) * 0.10;
  foam = max(foam, caps * (1.0 - 0.92 * uNightFactor));
  gWFoam = foam;
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.34, 0.36, 0.375), foam);

  // --- transparency. The waterline dissolves through a dithered ramp instead of ending on a line:
  //     an interleaved-gradient pattern breaks the last 1.4 m into wet grains, which is what a real
  //     shore looks like and what kills the hard tan seam.
  float fres = 0.020 + 0.55 * pow(1.0 - cosT, 5.0);
  float alpha = 1.0 - exp(-depth * 2.2);
  alpha = max(alpha, fres * 0.8 * smoothstep(0.0, 0.4, depth));
  alpha = max(alpha, foam * 0.85);
  float edge = smoothstep(0.0, 1.40, toShore) * smoothstep(0.0, 0.05, depth);
  float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  float grain = texture2D(uNoise, vWorld.xz * 0.9).g;
  edge = clamp(edge * 1.22 - 0.11 + (ign * 0.6 + grain * 0.4 - 0.5) * 0.30 * edge * (1.0 - edge) * 4.0, 0.0, 1.0);
  diffuseColor.a *= clamp(alpha, 0.0, 1.0) * edge;
}
`,Ie=new l,Le=new te,Re=new o,ze=new s(1e9,0,0),Be=new s,Z=new s,Ve=new s(0,1,0),He=8,Ue=[[1,.25,.25],[.25,1,.25],[.3,.45,1]];function We(e,t,n,r,i,o,s,c=1){let l=new a(t,e,n,r,1,!0);l.translate(0,n/2,0);let u=l.attributes.uv;for(let e=0;e<u.count;e++)u.setXY(e,u.getX(e)*s[0],u.getY(e)*s[1]);let d=new z().setFromUnitVectors(Ve,o.clone().normalize());l.applyQuaternion(d),l.translate(i.x,i.y,i.z);let f=new Float32Array(l.attributes.position.count*3),p=l.attributes.position;for(let e=0;e<p.count;e++){let t=c*(.7+.3*I(0,3,p.getY(e)));f[e*3]=t,f[e*3+1]=t,f[e*3+2]=t}return l.setAttribute(`color`,new R(f,3)),l}function Ge(e,t,n,r,i,a,o=0,s=0){let c=new ne(e,t);(o||s)&&c.translate(o*e,s*t,0),c.applyQuaternion(r),c.translate(n.x,n.y,n.z);let l=c.attributes.normal;for(let e=0;e<l.count;e++)l.setXYZ(e,i.x,i.y,i.z);let u=new Float32Array(l.count*3);for(let e=0;e<l.count;e++)u[e*3]=a,u[e*3+1]=a,u[e*3+2]=a;return c.setAttribute(`color`,new R(u,3)),c}function Ke(e,t){let n=new z().setFromUnitVectors(new s(0,0,1),e.clone().normalize());return new z().setFromAxisAngle(e.clone().normalize(),t).multiply(n)}var qe=new s(1,0,0),Je=new s(0,1,0),Ye=new s(0,0,1);function Xe(e,t){return new z().setFromAxisAngle(Je,e).multiply(new z().setFromAxisAngle(Ye,-t)).multiply(new z().setFromAxisAngle(qe,-Math.PI/2))}function Ze(e){let t=0,n=0;for(let r of e){r.computeBoundingBox();let e=r.boundingBox;t=Math.max(t,e.max.y),n=Math.max(n,Math.abs(e.min.x),Math.abs(e.max.x),Math.abs(e.min.z),Math.abs(e.max.z))}return{height:t,width:n*2}}function Qe(e,t,n=0){let r=n===2,i=n===1,a=r?e.range(11.5,14.5):i?e.range(7.2,9.2):e.range(9.6,12.8),o=new s(e.range(-.08,.08),1,e.range(-.08,.08)).normalize(),c=a*(r||i?.32:.35),l=r||i?.3:.38,u=[We(l*1.25,l*.62,c,t?6:9,new s(0,-.2,0),o,[2.2,a*.45],.92)],d=o.clone().multiplyScalar(c),f=r?e.range(3.2,4):i?e.range(4.4,5.4):e.range(4.2,5.4),p=r?e.range(4.4,5.4):i?e.range(2.8,3.5):e.range(3.6,4.5),m=f*e.range(.82,1.16),h=d.clone().add(new s(e.range(-.6,.6),p*(r?.76:.7),e.range(-.6,.6))),g=[],_=t?5:6;for(let n=0;n<_;n++){let a=n/_*Math.PI*2+e.range(-.42,.42),d=r?e.range(.85,1.6):i?e.range(.38,.85):e.range(.55,1.15),m=new s(Math.cos(a)*.92,d,Math.sin(a)*.92).normalize(),h=Math.min(f,p)*e.range(.52,.85),v=o.clone().multiplyScalar(c*e.range(.5,.96));u.push(We(l*.5,l*.2,h,t?4:6,v,m,[1.2,2],.82));let y=v.clone().add(m.clone().multiplyScalar(h*.96));for(let t=0;t<2;t++){let n=a+(t?1:-1)*e.range(.28,.85),i=new s(Math.cos(n)*.98,r?e.range(.5,1.2):e.range(.22,.9),Math.sin(n)*.98).normalize(),o=h*e.range(.42,.72);u.push(We(l*.22,l*.07,o,4,y,i,[1,2],.8)),g.push({p:y.clone().add(i.clone().multiplyScalar(o)),d:i,w:1}),g.push({p:y.clone().add(i.clone().multiplyScalar(o*.55)),d:i,w:.8})}g.push({p:y.clone(),d:m,w:.9})}let v=N(u,!1),y=[],b=Math.min(f,p),x=(t,n,r,i)=>{let a=t.clone().sub(h),o=Math.hypot(a.x/f,a.y/p,a.z/m);o>1.05&&(a.multiplyScalar(1.05/o),t.copy(h).add(a));let c=new s(a.x/(f*f),a.y/(p*p),a.z/(m*m));c.lengthSq()<1e-6&&c.set(0,1,0),c.normalize();let l=c.clone().multiplyScalar(.55).add(n.clone().multiplyScalar(.35)).add(new s(0,i?-.15:.28,0)).normalize(),u=c.clone().multiplyScalar(.42).add(new s(0,.72,0)).normalize(),d=b*r*(1+.35*P((t.y-h.y)/Math.max(p,.001),0,1)),g=P((t.y-(h.y-p))/(2*p),0,1),_=P(a.length()/Math.max(f,p),0,1),v=.46+.54*(.62*g+.38*_);y.push(Ge(d,d*e.range(.86,1.14),t,Ke(l,e.range(0,Math.PI*2)),u,v))};for(let n of g){let r=t?3:4;for(let t=0;t<r;t++){let t=new s(e.range(-.9,.9),e.range(-.7,.9),e.range(-.9,.9));x(n.p.clone().add(n.d.clone().multiplyScalar(e.range(-.3,.7))).add(t),n.d,e.range(1,1.5)*n.w,i&&e()<.45)}}let S=t?4:5;for(let t=0;t<S;t++){let t=e.range(0,Math.PI*2),n=e.range(-.5,.9),r=e.range(.25,.62),i=new s(Math.cos(t)*Math.cos(n)*f*r,Math.sin(n)*p*r,Math.sin(t)*Math.cos(n)*m*r).add(h);x(i,i.clone().sub(h).normalize(),e.range(.85,1.25),!1)}let C=N(y,!1),w=Ze([v,C]);return{trunk:v,foliage:C,height:w.height,width:w.width}}function $e(e,t,n=0){let r=n===2,i=r?e.range(14,18):n?e.range(15,19.5):e.range(12,16.5),a=new s(e.range(-.02,.02),1,e.range(-.02,.02)).normalize(),o=We(r?.34:.28,r?.09:.04,i*(r?.92:.99),t?5:8,new s(0,-.2,0),a,[2.4,i*.5],.7),c=[],l=r?t?6:8:t?14:17,u=i*(r?.5:n?.12:.085),d=i*(r?.92:.96),f=r?3:n?2.5:3.4;for(let n=0;n<l;n++){let i=l>1?n/(l-1):1,a=j(u,d,i)+e.range(-.18,.18),o=j(f,.4,i**(r?.7:1.05))*e.range(.82,1.18),p=r?4:Math.max(4,Math.round((t?6:7)*(1-.3*i)));for(let l=0;l<p;l++){let u=l/p*Math.PI*2+n*.83+e.range(-.32,.32),d=j(r?.3:.92,.34,i)*e.range(.82,1.2),f=Xe(u,d),m=Ye.clone().applyQuaternion(f),h=o*e.range(1,1.3),g=o*e.range(.95,1.35),_=.44+.56*(.55*i+.45*e.range(.45,1));if(c.push(Ge(h,g,new s(0,a,0),f,m,_,.5,0)),l%(t?3:2)==0){let e=Xe(u+.5,d*1.35);c.push(Ge(o*.62,o*.8,new s(0,a+.25,0),e,Ye.clone().applyQuaternion(e),_*.82,.5,0))}}}for(let e=0;e<2;e++){let t=Xe(e*Math.PI/2+.4,-Math.PI*.4),n=Ye.clone().applyQuaternion(t);c.push(Ge(i*.07+.8,i*.06+.8,new s(0,d-.5,0),t,n,1,.5,0))}let p=N(c,!1),m=Ze([o,p]);return{trunk:o,foliage:p,height:m.height,width:m.width}}var et=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
vec3 normal = normalize( vNormal );
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tt=`
#if NUM_HEMI_LIGHTS > 0
{
  vec3 skyFill = mix(hemisphereLights[0].groundColor, hemisphereLights[0].skyColor, 0.68);
  reflectedLight.indirectDiffuse = max(reflectedLight.indirectDiffuse, diffuseColor.rgb * skyFill);
  // ...and a MINIMUM-ALBEDO floor. The measured black pixels sit at rgb (1,3,4)/255 on a near-zero
  // albedo texel (baked AO in the atlas), so a floor proportional to albedo alone can never lift
  // them. 3% is about as dark as real foliage gets. Tinting the floor by the SURFACE and not by the
  // sky is what stops shadowed undergrowth turning blue.
  vec3 albMin = max(diffuseColor.rgb, diffuseColor.rgb * 0.80 + vec3(0.030, 0.038, 0.022));
  reflectedLight.indirectDiffuse = max(reflectedLight.indirectDiffuse, albMin * skyFill * 2.10);
}
#endif`,nt=`
#ifdef USE_ALPHATEST
{
  float ignA = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  if (diffuseColor.a < alphaTest * (0.62 + 0.76 * ignA)) discard;
}
#endif`,rt=`
#ifdef USE_MAP
{
  vec2 tsz = vec2(textureSize(map, 0));
  vec2 ddx = dFdx(vMapUv * tsz), ddy = dFdy(vMapUv * tsz);
  float lodF = 0.5 * log2(max(dot(ddx, ddx), dot(ddy, ddy)) + 1e-6);
  diffuseColor.a *= 1.0 + max(lodF, 0.0) * uMipBoost;
}
#endif`;function it(e,t,n,r){Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime; uniform vec2 uWindDir; uniform float uWindStrength;`).replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position);
#ifdef USE_INSTANCING
{
  vec3 iPos = vec3(instanceMatrix[3]);
  float phase = dot(iPos.xz, vec2(0.031, 0.047)) + uTime * 1.15;
  float heightF = smoothstep(${r[0].toFixed(2)}, ${r[1].toFixed(2)}, position.y);
  float sway = (sin(phase) * 0.6 + sin(phase * 2.17 + 1.3) * 0.4) * uWindStrength * ${n.toFixed(3)} * heightF;
  transformed.xz += uWindDir * sway;
  transformed += normal * sin(uTime * 3.3 + phase * 4.0 + position.y * 2.0) * 0.04 * uWindStrength * heightF;
}
#endif`)}function at(e,n,r,i,a=.55,o=.42){let s=new ee({map:e.map,normalMap:e.normalMap||null,alphaTest:.3,side:2,roughness:.7,metalness:0,color:new t(...n),vertexColors:!0,clearcoat:.3,clearcoatRoughness:.28});return e.normalMap&&s.normalScale.set(.55,.55),s.name=`tree-leaves`,s.onBeforeCompile=e=>{it(e,r,.32,[0,6]),e.uniforms.uTrans={value:a},e.uniforms.uMipBoost={value:o},e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_begin>`,et).replace(`#include <common>`,`#include <common>
uniform float uTrans;
uniform float uMipBoost;`).replace(`#include <map_fragment>`,`#include <map_fragment>`+rt).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
#if NUM_DIR_LIGHTS > 0
{
  vec3 Lv = normalize(directionalLights[0].direction);
  float back = clamp(dot(normalize(vViewPosition), -Lv), 0.0, 1.0);
  float wrapped = clamp(dot(normal, Lv) * 0.4 + 0.6, 0.0, 1.0);
  vec3 warm = vec3(1.06, 1.0, 0.72);
  reflectedLight.directDiffuse += diffuseColor.rgb * warm * directionalLights[0].color * (uTrans * pow(back, 2.5) * wrapped);
  // sky/canopy bounce: leaves in shadow keep a little light, so a forest clump is never a black hole
  reflectedLight.indirectDiffuse += diffuseColor.rgb * directionalLights[0].color * 0.048;
}
#endif`+tt).replace(`#include <alphatest_fragment>`,nt)},s.customProgramCacheKey=()=>`fable-leaf-v14`,i.registerMaterial(s),s}function ot(e,t,n){let r=new E({map:e.map||null,normalMap:e.normalMap||null,roughnessMap:e.roughnessMap||null,roughness:.85,metalness:0,color:16777215,vertexColors:!0});return r.name=`tree-bark`,r.onBeforeCompile=e=>{it(e,t,.32,[0,6]),e.fragmentShader=e.fragmentShader.replace(`#include <aomap_fragment>`,`#include <aomap_fragment>`+tt)},r.customProgramCacheKey=()=>`fable-bark-v9`,n.registerMaterial(r),r}function st(e,t,n){let r=new E({map:e,normalMap:t,alphaTest:.42,roughness:.72,metalness:0,side:0,color:16777215});return r.normalScale.set(1,1),r.name=`tree-impostor`,r.onBeforeCompile=e=>{e.uniforms.uMipBoost={value:.5},e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uMipBoost;`).replace(`#include <map_fragment>`,`#include <map_fragment>`+rt).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
#if NUM_DIR_LIGHTS > 0
{
  vec3 Lv = normalize(directionalLights[0].direction);
  float wrapped = clamp(dot(normal, Lv) * 0.34 + 0.66, 0.0, 1.0);
  float back = clamp(dot(normalize(vViewPosition), -Lv), 0.0, 1.0);
  vec3 warm = vec3(1.05, 1.0, 0.80);
  reflectedLight.directDiffuse += diffuseColor.rgb * warm * directionalLights[0].color
    * (0.55 * wrapped * wrapped + 0.30 * pow(back, 2.0) * wrapped);
  reflectedLight.indirectDiffuse += diffuseColor.rgb * directionalLights[0].color * 0.062;
}
#endif
#if NUM_HEMI_LIGHTS > 0
// sky fill floor: a crown at 600 m is never darker than the ambient it sits in
{
  vec3 fill = mix(hemisphereLights[0].groundColor, hemisphereLights[0].skyColor, 0.68);
  reflectedLight.indirectDiffuse = max(reflectedLight.indirectDiffuse, diffuseColor.rgb * fill * 0.78);
  vec3 albMinI = max(diffuseColor.rgb, diffuseColor.rgb * 0.80 + vec3(0.030, 0.038, 0.022));
  reflectedLight.indirectDiffuse = max(reflectedLight.indirectDiffuse, albMinI * fill * 2.10);
}
#endif`).replace(`#include <alphatest_fragment>`,nt),e.vertexShader=e.vertexShader.replace(`#include <uv_vertex>`,`#include <uv_vertex>
float impAng = 0.0;
#ifdef USE_INSTANCING
{
  vec3 iPos = vec3(instanceMatrix[3]);
  vec3 c0 = instanceMatrix[0].xyz;
  float yawI = atan(-c0.z, c0.x);
  vec2 toCam = cameraPosition.xz - iPos.xz;
  float bbAng = atan(toCam.x, toCam.y);
  impAng = bbAng - yawI;
  float k = mod(floor(impAng / (PI2 / ${He.toFixed(1)}) + 0.5) + ${32 .toFixed(1)}, ${He.toFixed(1)});
  vec2 cell = vec2(mod(k, 4.0), floor(k / 4.0));
  #ifdef USE_MAP
  vMapUv = (vMapUv + cell) / vec2(4.0, 2.0);
  #endif
  #ifdef USE_NORMALMAP
  vNormalMapUv = (vNormalMapUv + cell) / vec2(4.0, 2.0);
  #endif
}
#endif`).replace(`#include <beginnormal_vertex>`,`vec3 objectNormal = vec3(normal);
#ifdef USE_INSTANCING
objectNormal = vec3(sin(impAng), 0.0, cos(impAng));
#endif
#ifdef USE_TANGENT
vec3 objectTangent = vec3( tangent.xyz );
#endif`).replace(`#include <begin_vertex>`,`vec3 transformed = vec3(position);
#ifdef USE_INSTANCING
{
  float bs = sin(impAng), bc = cos(impAng);
  transformed.xz = vec2(transformed.x * bc, -transformed.x * bs);
}
#endif`)},r.customProgramCacheKey=()=>`fable-impostor-v12`,n.registerMaterial(r),r}var ct=`
varying vec2 vUv; varying vec3 vN; varying vec3 vC; varying float vH;
uniform float uH;
void main() { vUv = uv; vN = normalize(normalMatrix * normal); vC = color; vH = position.y / uH; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,lt=`
uniform sampler2D map; uniform vec3 color; uniform int mode; uniform int useMap; uniform float uBelly;
varying vec2 vUv; varying vec3 vN; varying vec3 vC; varying float vH;
void main() {
  vec4 c = useMap == 1 ? texture2D(map, vUv) : vec4(1.0);
  if (useMap == 1) {
    vec2 tsz = vec2(textureSize(map, 0));
    vec2 ddx = dFdx(vUv * tsz), ddy = dFdy(vUv * tsz);
    c.a *= 1.0 + max(0.5 * log2(max(dot(ddx, ddx), dot(ddy, ddy)) + 1e-6), 0.0) * 0.5;
  }
  if (c.a < 0.5) discard;
  if (mode == 0) {
    float belly = mix(1.0 - uBelly, 1.0, smoothstep(0.05, 0.75, vH));
    gl_FragColor = vec4(c.rgb * color * vC * belly, 1.0);
  } else { vec3 n = normalize(vN); n.z = abs(n.z) * 0.8 + 0.2; n = normalize(n); gl_FragColor = vec4(n * 0.5 + 0.5, 1.0); }
}`;function ut(e,n,r=256){let i=new f,a=n.width,o=n.height,s=new L(-a/2,a/2,o,0,.1,200),c=(e,n,r,i)=>new p({vertexShader:ct,fragmentShader:lt,side:2,vertexColors:!0,uniforms:{map:{value:n},color:{value:new t(r)},mode:{value:e},useMap:{value:+!!n},uH:{value:o},uBelly:{value:i}}}),l=new w(n.trunk,null),d=new w(n.foliage,null);i.add(l,d);let m={},h=e.getRenderTarget(),g=new t;e.getClearColor(g);let _=e.getClearAlpha(),y=new u,x=new u;e.getViewport(y),e.getScissor(x);let C=e.getScissorTest(),T=r*4,E=r*2;for(let t of[0,1]){let a=new F(T,E,{type:t===0?b:v,depthBuffer:!0,generateMipmaps:!0,minFilter:S,magFilter:D});a.texture.colorSpace=``,a.texture.anisotropy=4,l.material=c(t,n.barkMap,16777215,.18),d.material=c(t,n.leafMap,n.leafTint||16777215,.26),a.scissorTest=!0,a.viewport.set(0,0,T,E),a.scissor.set(0,0,T,E),e.setRenderTarget(a),e.setClearColor(t===0?2902562:8421631,0),e.clear(!0,!0,!0);for(let t=0;t<He;t++){let n=t/He*Math.PI*2;s.position.set(Math.sin(n)*60,0,Math.cos(n)*60),s.up.set(0,1,0),s.lookAt(0,0,0),s.updateMatrixWorld(),s.updateProjectionMatrix();let o=t%4*r,c=Math.floor(t/4)*r;a.viewport.set(o,c,r,r),a.scissor.set(o,c,r,r),e.setRenderTarget(a),e.render(i,s)}a.viewport.set(0,0,T,E),a.scissor.set(0,0,T,E),a.scissorTest=!1,l.material.dispose(),d.material.dispose(),m[t===0?`albedo`:`normal`]=a.texture,m[t===0?`albedoRT`:`normalRT`]=a}return e.setRenderTarget(h),e.setViewport(y),e.setScissor(x),e.setScissorTest(C),e.setClearColor(g,_),{...m,width:a,height:o}}var dt=class{constructor({renderer:e,engine:t,heightmap:n,seed:r,quality:i,forestMask:a,groundInfo:o,groundTint:s=null,isBlocked:l=null,bark:u,half:d}){this.renderer=e,this.engine=t,this.hm=n,this.seed=r,this.quality=i,this.forestMask=a,this.groundInfo=o,this.groundTint=s,this.isBlocked=l,this.bark=u,this.half=d,this.group=new c,this.group.name=`vegetation`,this.group.matrixAutoUpdate=!1,this.windUniforms={uTime:{value:0},uWindDir:{value:new y(.7,.3)},uWindStrength:{value:.35}};let f=Math.sqrt(P(i.density,.3,1.4));this.lodDistances=[Math.round(165*f),Math.round(520*f)],this.caps=[Math.round(820*i.density),Math.round(3e3*i.density)],this.kinds=[],this.treeCount=0,this._forceUpdate=!0,this._frame=0,this.debugLod=!1,this.clusterNoise=new B(T(r,909)),this.clumpSeed=T(r,5151),this.maskCell=4,this.maskN=Math.ceil(d*2/this.maskCell),this.clearMask=new Uint8Array(this.maskN*this.maskN),this.layerNoAo=t.LAYER_NO_AO==null?1:t.LAYER_NO_AO,this.layerReflected=t.LAYER_REFLECTED==null?3:t.LAYER_REFLECTED}build(){let e=M(T(this.seed,777)),n=this.renderer,r=K(512,T(this.seed,1),96,.26,.33),i=K(512,T(this.seed,2),79,.3,.3),a=K(512,T(this.seed,5),112,.23,.36),o=me(512,T(this.seed,3),126,.19),s=me(512,T(this.seed,4),108,.22),c=[{name:`oak-a`,species:0,variant:0,build:Qe,leafMap:r,bark:this.bark.oak,tint:[.66,.7,.58]},{name:`oak-b`,species:0,variant:1,build:Qe,leafMap:a,bark:this.bark.oak,tint:[.6,.67,.55]},{name:`oak-c`,species:0,variant:2,build:Qe,leafMap:r,bark:this.bark.oak,tint:[.65,.71,.57]},{name:`birch-a`,species:1,variant:0,build:Qe,leafMap:i,bark:this.bark.oak,tint:[.74,.75,.56]},{name:`birch-b`,species:1,variant:1,build:Qe,leafMap:i,bark:this.bark.oak,tint:[.71,.74,.55]},{name:`birch-c`,species:1,variant:2,build:Qe,leafMap:a,bark:this.bark.oak,tint:[.69,.74,.57]},{name:`spruce-a`,species:2,variant:0,build:$e,leafMap:o,bark:this.bark.fir,tint:[.44,.52,.43]},{name:`spruce-b`,species:2,variant:1,build:$e,leafMap:o,bark:this.bark.fir,tint:[.41,.49,.42]},{name:`pine-c`,species:2,variant:2,build:$e,leafMap:s,bark:this.bark.fir,tint:[.52,.57,.42]}];return c.forEach((e,r)=>{let i=e.build(M(T(this.seed,1e3+r*7)),0,e.variant),a=e.build(M(T(this.seed,1001+r*7)),1,e.variant),o=ut(n,{...i,barkMap:e.bark.map||null,leafMap:e.leafMap.map,leafTint:new t(...e.tint).multiplyScalar(.88)},256),s=at(e.leafMap,e.tint,this.windUniforms,this.engine,e.species===2?.3:.62,e.species===2?.62:.4),c=ot(e.bark,this.windUniforms,this.engine),l=st(o.albedo,o.normal,this.engine),u=new ne(o.width,o.height);u.translate(0,o.height/2,0),this.kinds.push({def:e,lod0:i,lod1:a,imp:o,leafMat:s,barkMat:c,impMat:l,impGeo:u,meshes:null})}),this.kindsBySpecies=[[],[],[]],c.forEach((e,t)=>this.kindsBySpecies[e.species].push(t)),this._distribute(e),this._createInstancedMeshes(),this._buildUndergrowth(),this}_clump(e,t){return this._worley(e,t,46,3)*this._worley(e,t,15,11)}_worley(e,t,n,r){let i=Math.floor(e/n),a=Math.floor(t/n),o=1/0,s=0;for(let c=-1;c<=1;c++)for(let l=-1;l<=1;l++){let u=i+l,d=a+c,f=T(T(T(this.clumpSeed,r),u*7919),d*104729),p=(u+(f&65535)/65535)*n,m=(d+(f>>>16&65535)/65535)*n,h=e-p,g=t-m,_=h*h+g*g;_<o&&(o=_,s=f)}o=Math.sqrt(o);let c=(s>>>8&255)/255;if(c<.16)return .05;let l=n*(.52+.44*c),u=1-I(l*.55,l,o);return Math.min(1.25,(.55+.85*c)*(.3+.7*u))}_distribute(e){let t=this.hm,n=t.waterLevel,r=P(this.quality.density,.3,1.4),i=4.6/Math.sqrt(r),a=this.half-6,o=[],s=this.kindsBySpecies,c=(t,r,i,a,c,l)=>{if(e()>c)return;let u=P(I(20,70,i-n)*.85+.06+.35*this.clusterNoise.fbm2D(t/190+4,r/190-9,2),0,1),d=e()<u?2:e()<.62?0:1,f=s[d],p=f[Math.min(f.length-1,Math.floor(e()*f.length))],m=P(1+e.gaussian()*.13,.74,1.32)*(l?1.15:1),h=m*e.range(.9,1.15),g=e.range(-1,1),_=e.range(.85,1.15),v=_*(1+.16*g),y=_*(1+.02*g),b=_*(1-.22*g);d!==2&&e()<.07&&(v*=1.18,y*=.96,b*=.68),d===2&&(v*=.95,b*=1.04),o.push({x:t,y:i-.12,z:r,sxz:m,sy:h,yaw:e.range(0,Math.PI*2),kind:p,species:d,horizon:l,alive:1,r:v,g:y,b})};for(let r=-a;r<=a;r+=i)for(let o=-a;o<=a;o+=i){let a=o+e.range(-.48,.48)*i,s=r+e.range(-.48,.48)*i,l=t.getHeight(a,s);if(l<n+1.6)continue;let u=t.getSlope(a,s);if(u>.42)continue;let d=this.forestMask(a,s,l,u);if(d<.01)continue;let f=this.groundInfo(a,s);if(f.rock>.35||f.sand>.6)continue;d*=1-I(.28,.42,u);let p=this._clump(a,s);p<.62||(d*=1.5*j(.18,1,P((p-.55)/.62,0,1)),c(a,s,l,u,d,0))}if(t.outer){let r=9.5,i=t.outer.half-12;for(let a=-i;a<=i;a+=r)for(let o=-i;o<=i;o+=r){if(Math.abs(o)<this.half+2&&Math.abs(a)<this.half+2)continue;let i=o+e.range(-.48,.48)*r,s=a+e.range(-.48,.48)*r,l=t.outer.getHeight(i,s);if(l<n+1.6)continue;let u=t.getSlopeAny(i,s);if(u>.4)continue;let d=this._clump(i,s),f=this.forestMask(i,s,l,u);d<.62||c(i,s,l,u,f*1.3*(1-I(.28,.4,u))*j(.18,1,P((d-.55)/.62,0,1)),1)}}this.trees=o,this.treeCount=o.length,this.cell=32,this.grid=new Map,o.forEach((e,t)=>{if(e.horizon)return;let n=this._cellKey(e.x,e.z),r=this.grid.get(n);r||(r=[],this.grid.set(n,r)),r.push(t)})}_cellKey(e,t){return Math.floor((e+this.half)/this.cell)<<12|Math.floor((t+this.half)/this.cell)}_createInstancedMeshes(){let t=this.trees.length;for(let r=0;r<this.kinds.length;r++){let i=this.kinds[r],a=this.caps[0],o=this.caps[1],s=Math.max(1,t),c=(t,r,a,o,s,c)=>{let l=new e(t,r,Math.max(1,a));return l.count=0,l.frustumCulled=!1,l.castShadow=o,l.receiveShadow=!0,l.matrixAutoUpdate=!1,l.instanceMatrix.setUsage(n),c&&l.layers.set(this.layerNoAo),l.layers.enable(this.layerReflected),s&&(l.instanceColor=new x(new Float32Array(Math.max(1,a)*3),3),l.instanceColor.setUsage(n)),l.name=`trees-${i.def.name}`,this.group.add(l),l};i.meshes=[[c(i.lod0.trunk,i.barkMat,a,!0,!1,!1),c(i.lod0.foliage,i.leafMat,a,!0,!0,!0)],[c(i.lod1.trunk,i.barkMat,o,!0,!1,!1),c(i.lod1.foliage,i.leafMat,o,!0,!0,!0)],[c(i.impGeo,i.impMat,s,!1,!0,!0)]],i.caps=[a,o,s]}this._cand0=[],this._cand1=[]}update(e,t,n,r){let i=this.windUniforms;if(i.uTime.value=n,r&&(i.uWindStrength.value=.15+(r.windStrength||0)*.85,r.wind&&i.uWindDir.value.copy(r.wind).normalize()),this._frame++,e.getWorldDirection(Z),!(e.position.distanceToSquared(ze)>1||Z.dot(Be)<.9995)&&!this._forceUpdate){this._updateUndergrowth(e,!1);return}this._forceUpdate=!1,ze.copy(e.position),Be.copy(Z),Le.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),Ie.setFromProjectionMatrix(Le);for(let e of Ie.planes)e.constant+=45;let a=this.lodDistances[0]**2,o=this.lodDistances[1]**2,s=e.position.x,c=e.position.y,l=e.position.z,u=this.kinds,d=u.map(()=>[0,0,0]),f=this.trees,p=this._cand0,m=this._cand1;p.length=0,m.length=0;for(let e=0;e<f.length;e++){let t=f[e];if(!t.alive)continue;let n=t.x-s,r=t.y+6-c,i=t.z-l,u=n*n+r*r+i*i;if(Re.center.set(t.x,t.y+7*t.sy,t.z),Re.radius=10*t.sxz,Ie.intersectsSphere(Re)){if(t.horizon||u>=o){this._writeInstance(t,2,d);continue}u<a?p.push(u,e):m.push(u,e)}}let h=this.caps[0],g=this.caps[1],_=(e,t,n)=>{let r=e.length/2;if(r<=t)return null;let i=Array(r);for(let e=0;e<r;e++)i[e]=e;i.sort((t,n)=>e[t*2]-e[n*2]);let a=[],o=[];for(let n=0;n<r;n++)(n<t?a:o).push(e[i[n]*2],e[i[n]*2+1]);e.length=0;for(let t of a)e.push(t);if(n)for(let e of o)n.push(e);else return o;return null};_(p,h,m);let v=_(m,g,null);for(let e=0;e<p.length;e+=2)this._writeInstance(f[p[e+1]],0,d);for(let e=0;e<m.length;e+=2)this._writeInstance(f[m[e+1]],1,d);if(v)for(let e=0;e<v.length;e+=2)this._writeInstance(f[v[e+1]],2,d);for(let e=0;e<u.length;e++){let t=u[e];for(let n=0;n<3;n++){let r=d[e][n],i=t.meshes[n][0];for(let e of t.meshes[n])e.count=r,e!==i&&e.instanceMatrix.array.set(i.instanceMatrix.array.subarray(0,r*16)),e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}}this._updateUndergrowth(e,!0)}_writeInstance(e,t,n){let r=this.kinds[e.kind],i=n[e.kind];if(i[t]>=r.caps[t])return;let a=i[t]++,o=r.meshes[t][0].instanceMatrix.array,s=a*16,c=Math.cos(e.yaw)*e.sxz,l=Math.sin(e.yaw)*e.sxz;o[s]=c,o[s+1]=0,o[s+2]=-l,o[s+3]=0,o[s+4]=0,o[s+5]=e.sy,o[s+6]=0,o[s+7]=0,o[s+8]=l,o[s+9]=0,o[s+10]=c,o[s+11]=0,o[s+12]=e.x,o[s+13]=e.y,o[s+14]=e.z,o[s+15]=1;let u=r.meshes[t][r.meshes[t].length-1];if(u.instanceColor){let n=u.instanceColor.array;if(this.debugLod){let e=Ue[t];n[a*3]=e[0],n[a*3+1]=e[1],n[a*3+2]=e[2]}else{let t=.3*e.r+.59*e.g+.11*e.b,r=t<.45?.45/Math.max(t,.001):1;n[a*3]=e.r*r,n[a*3+1]=e.g*r,n[a*3+2]=e.b*r}}}_forEachTreeIn(e,t,n,r,i){let a=Math.floor((e+this.half)/this.cell),o=Math.floor((n+this.half)/this.cell),s=Math.floor((t+this.half)/this.cell),c=Math.floor((r+this.half)/this.cell);for(let e=s;e<=c;e++)for(let t=a;t<=o;t++){let n=this.grid.get(t<<12|e);if(n)for(let e of n)i(this.trees[e])}}_markMask(e,t,n,r,i){let a=this.maskN,o=this.maskCell,s=this.half,c=P(Math.floor((e+s)/o),0,a-1),l=P(Math.floor((n+s)/o),0,a-1),u=P(Math.floor((t+s)/o),0,a-1),d=P(Math.floor((r+s)/o),0,a-1);for(let e=u;e<=d;e++)for(let t=c;t<=l;t++){let n=-s+(t+.5)*o,r=-s+(e+.5)*o;(!i||i(n,r))&&(this.clearMask[e*a+t]=1)}this._undergrowthDirty=!0}isCleared(e,t){let n=Math.floor((e+this.half)/this.maskCell),r=Math.floor((t+this.half)/this.maskCell);return n<0||r<0||n>=this.maskN||r>=this.maskN?!1:this.clearMask[r*this.maskN+n]===1}clearRect(e,t,n,r){let i=Math.min(e,n),a=Math.max(e,n),o=Math.min(t,r),s=Math.max(t,r),c=0;return this._forEachTreeIn(i,o,a,s,e=>{e.alive&&e.x>=i&&e.x<=a&&e.z>=o&&e.z<=s&&(e.alive=0,c++)}),this._markMask(i,o,a,s,null),c&&(this._forceUpdate=!0),c}clearCircle(e,t,n){let r=0,i=n*n;return this._forEachTreeIn(e-n,t-n,e+n,t+n,n=>{n.alive&&(n.x-e)**2+(n.z-t)**2<=i&&(n.alive=0,r++)}),this._markMask(e-n,t-n,e+n,t+n,(r,i)=>(r-e)**2+(i-t)**2<=(n+2)**2),r&&(this._forceUpdate=!0),r}clearOriented(e,t,n,r,i=0,a=0){let o=n/2+a,s=r/2+a,c=Math.cos(i),l=Math.sin(i),u=Math.hypot(o,s),d=(n,r)=>{let i=n-e,a=r-t,u=i*c+a*l,d=-i*l+a*c;return Math.abs(u)<=o&&Math.abs(d)<=s},f=0;return this._forEachTreeIn(e-u,t-u,e+u,t+u,e=>{e.alive&&d(e.x,e.z)&&(e.alive=0,f++)}),this._markMask(e-u,t-u,e+u,t+u,d),f&&(this._forceUpdate=!0),f}clearPolyline(e,t){let n=t/2,r=0;for(let t=0;t<e.length-1;t++){let i=e[t],a=e[t+1],o=a.x-i.x,s=a.z-i.z,c=o*o+s*s||1,l=Math.min(i.x,a.x)-n,u=Math.max(i.x,a.x)+n,d=Math.min(i.z,a.z)-n,f=Math.max(i.z,a.z)+n,p=(e,t,n)=>{let r=P(((e-i.x)*o+(t-i.z)*s)/c,0,1);return(e-(i.x+o*r))**2+(t-(i.z+s*r))**2<=n*n};this._forEachTreeIn(l,d,u,f,e=>{e.alive&&p(e.x,e.z,n)&&(e.alive=0,r++)}),this._markMask(l,d,u,f,(e,t)=>p(e,t,n+2))}return r&&(this._forceUpdate=!0),r}resnap(e,t,n,r){this._forEachTreeIn(Math.min(e,n),Math.min(t,r),Math.max(e,n),Math.max(t,r),e=>{e.y=this.hm.getHeight(e.x,e.z)-.12}),this._forceUpdate=!0,this._undergrowthDirty=!0}aliveCount(){let e=0;for(let t of this.trees)e+=t.alive;return e}canopyCoverage(e,t){t||=new Float32Array(e*e);let n=this.half*2/e;for(let r of this.trees){if(!r.alive||r.horizon)continue;let i=this.kinds[r.kind].lod0.width*.5*r.sxz*1.15,a=Math.max(0,Math.floor((r.x-i+this.half)/n)),o=Math.min(e-1,Math.floor((r.x+i+this.half)/n)),s=Math.max(0,Math.floor((r.z-i+this.half)/n)),c=Math.min(e-1,Math.floor((r.z+i+this.half)/n));for(let l=s;l<=c;l++){let s=-this.half+(l+.5)*n-r.z;for(let c=a;c<=o;c++){let a=-this.half+(c+.5)*n-r.x,o=Math.hypot(a,s)/i;if(o>=1)continue;let u=l*e+c;t[u]=Math.min(1,t[u]+.7*(1-o*o))}}}return t}_buildUndergrowth(){if(this.quality.density<.5){this.grass=null;return}let t=he(1024,T(this.seed,44)),r=[];for(let e=0;e<3;e++){let t=new ne(1,1);t.translate(0,.5,0),t.rotateY(e/3*Math.PI+.29);let n=t.attributes.normal;for(let e=0;e<n.count;e++)n.setXYZ(e,0,1,0);r.push(t)}let i=N(r,!1),a=Math.round(52e3*P(this.quality.density,.5,1.3)),o=new x(new Float32Array(a),1);o.setUsage(n),i.setAttribute(`aVar`,o),this.grassRadius=64;let s={uGrassCenter:{value:new y},uGrassRadius:{value:this.grassRadius}},c=new E({map:t,alphaTest:.42,side:2,roughness:.85,metalness:0,color:16777215});c.name=`undergrowth`,c.onBeforeCompile=e=>{it(e,this.windUniforms,.2,[0,.9]),Object.assign(e.uniforms,s),e.uniforms.uMipBoost={value:.45},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vGWorld;
varying float vCardY;
attribute float aVar;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>
vCardY = uv.y;
#ifdef USE_MAP
vMapUv = vMapUv * vec2(0.25, 0.5) + vec2(mod(aVar, 4.0), floor(aVar * 0.25 + 0.01)) * vec2(0.25, 0.5);
#endif`).replace(`#include <project_vertex>`,`#include <project_vertex>
{ vec4 gw = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  gw = instanceMatrix * gw;
#endif
  vGWorld = (modelMatrix * gw).xz; }`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec2 uGrassCenter; uniform float uGrassRadius; uniform float uMipBoost; varying vec2 vGWorld; varying float vCardY;`).replace(`#include <normal_fragment_begin>`,et).replace(`#include <map_fragment>`,`#include <map_fragment>`+rt+`
// root shadow: the bottom fifth of every card darkens towards the ground so tufts sit IN the turf
diffuseColor.rgb *= mix(0.84, 1.0, smoothstep(0.0, 0.3, vCardY));`).replace(`#include <alphatest_fragment>`,`diffuseColor.a *= 1.0 - smoothstep(uGrassRadius * 0.5, uGrassRadius * 0.95, distance(vGWorld, uGrassCenter));`+nt).replace(`#include <aomap_fragment>`,`#include <aomap_fragment>`+tt)},c.customProgramCacheKey=()=>`fable-undergrowth-v11`,this.engine.registerMaterial(c);let l=new e(i,c,a);l.count=0,l.frustumCulled=!1,l.castShadow=!1,l.receiveShadow=!0,l.matrixAutoUpdate=!1,l.name=`undergrowth`,l.layers.set(this.layerNoAo),l.instanceMatrix.setUsage(n),l.instanceColor=new x(new Float32Array(a*3),3),l.instanceColor.setUsage(n),this.group.add(l),this.grass={mesh:l,uniforms:s,cap:a,varAttr:o,lastCenter:new y(1e9,1e9)}}_updateUndergrowth(e,t){let n=this.grass;if(!n)return;let r=e.position;e.getWorldDirection(Z);let i=P(Z.y<-.05?-(r.y-this.hm.getHeight(r.x,r.z))/Z.y:1e6,0,55),a=r.x+Z.x*i,o=r.z+Z.z*i;if(r.y-this.hm.getHeight(r.x,r.z)>170){n.mesh.count&&(n.mesh.count=0);return}if(!t&&n.mesh.count&&!this._undergrowthDirty||!this._undergrowthDirty&&Math.hypot(a-n.lastCenter.x,o-n.lastCenter.y)<6&&n.mesh.count)return;this._undergrowthDirty=!1,n.lastCenter.set(a,o),n.uniforms.uGrassCenter.value.set(a,o);let s=this.grassRadius,c=n.mesh.instanceMatrix.array,l=n.mesh.instanceColor.array,u=n.varAttr.array,d=0,f=Math.floor((a-s)/8),p=Math.floor((a+s)/8),m=Math.floor((o-s)/8),h=Math.floor((o+s)/8),g=96*this.quality.density,_=this.hm.waterLevel,v=this.half,y=[.24,.32,.16],b=[0,0,0],x=this.isBlocked;outer:for(let e=m;e<=h;e++)for(let t=f;t<=p;t++){let r=(t+.5)*8,i=(e+.5)*8,f=Math.hypot(r-a,i-o);if(f>s+6||Math.abs(r)>v||Math.abs(i)>v)continue;let p=M(T(T(this.seed,t*73856093),e*19349663)),m=this.groundInfo(r,i),h=I(-.35,.45,this.clusterNoise.fbm2D(r/19,i/19,2)),S=(m.grass+m.dry*.8)*(1-I(.25,.4,m.slope))*(.35+.65*h)*(1-.85*m.sand),C=m.forest*I(.4,.8,m.forest)*(1-I(.3,.45,m.slope))*.45,w=1+7*(1-I(14,55,f)),E=Math.round(g*.35*C*w),D=Math.round(g*P(S,0,1)*w)+E;if(!D)continue;let O=1,k=1,A=1;this.groundTint&&(this.groundTint(r,i,b),O=j(1,P(b[0]/y[0],.78,1.3),.55),k=j(1,P(b[1]/y[1],.78,1.3),.55),A=j(1,P(b[2]/y[2],.78,1.3),.55));let ee=m.dry/Math.max(.05,m.grass+m.dry);for(let r=0;r<D;r++){let i=t*8+p()*8,a=e*8+p()*8,o=r<E,s=this.hm.getHeight(i,a);if(s<_+.5||this.isCleared(i,a)||x&&x(i,a))continue;let f=p()<ee,m=p(),h,g,v;o?(h=3,g=p.range(.85,1.45),v=g*p.range(.8,1.15)):m<.4?(h=f?2:0,g=p.range(.3,.52),v=p.range(.44,.86)):m<.6?(h=1,g=p.range(.34,.6),v=p.range(.52,1)):m<.82?(h=f?7:4,g=p.range(.62,1.1),v=p.range(.24,.44)):m<.9?(h=5,g=p.range(.34,.58),v=p.range(.2,.34)):(h=f?2:6,g=p.range(.28,.5),v=p.range(.4,.72));let y=p.range(0,Math.PI),b=Math.cos(y)*g,S=Math.sin(y)*g,C=d*16;c[C]=b,c[C+1]=0,c[C+2]=-S,c[C+3]=0,c[C+4]=0,c[C+5]=v,c[C+6]=0,c[C+7]=0,c[C+8]=S,c[C+9]=0,c[C+10]=b,c[C+11]=0,c[C+12]=i,c[C+13]=s-.07,c[C+14]=a,c[C+15]=1;let w=p.range(.66,1.14)*(f?.88:1),T=p.range(-.14,.14),D=o?.4:1;if(l[d*3]=P(w*(1+T)*j(1,O,D),.18,1.25),l[d*3+1]=P(w*(1+T*.15)*j(1,k,D),.18,1.25),l[d*3+2]=P(w*(1-T*1.35)*j(1,A,D),.18,1.25),u[d]=h,d++,d>=n.cap)break outer}}n.mesh.count=d,n.mesh.instanceMatrix.needsUpdate=!0,n.mesh.instanceColor.needsUpdate=!0,n.varAttr.needsUpdate=!0}dispose(){for(let e of this.kinds)e.lod0.trunk.dispose(),e.lod0.foliage.dispose(),e.lod1.trunk.dispose(),e.lod1.foliage.dispose(),e.impGeo.dispose(),e.leafMat.dispose(),e.barkMat.dispose(),e.impMat.dispose(),e.def.leafMap&&(e.def.leafMap.map.dispose(),e.def.leafMap.normalMap&&e.def.leafMap.normalMap.dispose()),e.imp.albedoRT.dispose(),e.imp.normalRT.dispose();this.grass&&(this.grass.mesh.geometry.dispose(),this.grass.mesh.material.map&&this.grass.mesh.material.map.dispose(),this.grass.mesh.material.dispose())}},ft=`terrain`,Q=512,$=null;async function pt(e){let{engine:t,scene:n,world:r,events:a,assets:o,camera:c}=e,l=t.quality,u=performance.now(),d=le(l.textureSize>=2048?1024:512,t.maxAnisotropy),f=Promise.all([o.loadPBR({map:`./assets/shared/Bark012/color.jpg`,normalMap:`./assets/shared/Bark012/normal.jpg`,roughnessMap:`./assets/shared/Bark012/roughness.jpg`}),o.loadPBR({map:`./assets/shared/Bark014/color.jpg`,normalMap:`./assets/shared/Bark014/normal.jpg`,roughnessMap:`./assets/shared/Bark014/roughness.jpg`})]),p=new ae({size:r.size,spacing:2,seed:r.seed}).generate(),g=p.half,{controlAt:_,forestMask:y}=se(p,r.seed),b=p.computeShoreDistance(),x=new h(b,p.N,p.N,m,v);x.minFilter=D,x.magFilter=D,x.wrapS=x.wrapT=k,x.generateMipmaps=!1,x.colorSpace=``,x.unpackAlignment=1,x.needsUpdate=!0;let C=(e,t)=>{let n=P(Math.round((e+g)/p.spacing),0,p.N-1),r=P(Math.round((t+g)/p.spacing),0,p.N-1);return(b[r*p.N+n]-128)*.25},w=(e,t,n)=>{let r=(p.getHeight(e+8,t)+p.getHeight(e-8,t)+p.getHeight(e,t+8)+p.getHeight(e,t-8)-4*n)/64;return P(.5-r*45,.05,.95)},T=new Uint8Array(Q*Q*4),E=new Uint8Array(Q*Q*4),O=r.size/Q;for(let e=0;e<Q;e++){let t=-g+(e+.5)*O;for(let n=0;n<Q;n++){let r=-g+(n+.5)*O,i=(e*Q+n)*4,a=p.getHeight(r,t),o=_(r,t,a,p.getSlope(r,t),C(r,t));T[i]=255*o.dry,T[i+1]=255*o.dirt,T[i+2]=255*o.sand,T[i+3]=255*o.rock,E[i]=255*o.forest,E[i+1]=255*P(o.field,0,1),E[i+2]=0,E[i+3]=255*w(r,t,a)}}let A=e=>{let t=new h(e,Q,Q,i,v);return t.minFilter=D,t.magFilter=D,t.wrapS=t.wrapT=k,t.generateMipmaps=!1,t.colorSpace=``,t.needsUpdate=!0,t},M=A(T),ee=A(E),N=p.N-1,F=new Uint8Array(N*N*4),te=(e,t,n,r)=>{let i=p.N,a=p.data,o=p.spacing;for(let s=n;s<=r;s++)for(let n=e;n<=t;n++){let e=Math.max(0,n-1),t=Math.min(i-1,n+2),r=Math.max(0,s-1),c=Math.min(i-1,s+2),l=(a[s*i+e]+a[(s+1)*i+e])*.5,u=(a[s*i+t]+a[(s+1)*i+t])*.5,d=(a[r*i+n]+a[r*i+n+1])*.5,f=(a[c*i+n]+a[c*i+n+1])*.5,p=-(u-l)/((t-e)*o),m=-(f-d)/((c-r)*o),h=Math.hypot(p,1,m),g=(s*N+n)*4;F[g]=255*(.5+.5*p/h),F[g+1]=255*(.5+.5/h),F[g+2]=255*(.5+.5*m/h),F[g+3]=255}};te(0,N-1,0,N-1);let L=new h(F,N,N,i,v);L.minFilter=S,L.magFilter=D,L.wrapS=L.wrapT=k,L.generateMipmaps=!0,L.colorSpace=``,L.anisotropy=Math.min(16,t.maxAnisotropy),L.needsUpdate=!0;let R=performance.now(),z=ue(256,r.seed),ne=de(256,r.seed);ne.anisotropy=Math.min(8,t.maxAnisotropy);let re=performance.now()-u,ie={heightmapAndMaps:Math.round(R-u),noiseTex:Math.round(performance.now()-R)},B=performance.now(),oe=await d;ie.layersAwait=Math.round(performance.now()-B);let ce={albedoArray:oe.albedo,normalArray:oe.normal,controlTex:M,control2Tex:ee,normalTex:L,noiseTex:z,shoreTex:x,shoreN:p.N,spacing:p.spacing,half:g,size:r.size,waterLevel:p.waterLevel,globalUniforms:t.globalUniforms},V=ge(ce),H=ge({...ce,horizon:!0});t.registerMaterial(V),t.registerMaterial(H);let U=performance.now(),W=new ye({heightmap:p,material:V,horizonMaterial:H,controlAt:_,chunkSize:256,lodDistances:[125,420,1e3],castShadow:!0,horizon:!0});n.add(W.group),ie.chunks=Math.round(performance.now()-U);let fe=new Ne({heightmap:p,noiseTex:z,normalTex:ne,shoreTex:x,chunkSize:128,reflections:!!l.reflections,reflectionScale:l.name===`ultra`?.6:.5,renderer:t.renderer,engine:t,noAoLayer:t.LAYER_NO_AO==null?1:t.LAYER_NO_AO});n.add(fe.mesh);let[G,pe]=await f,K=(e,t)=>{let n=P(Math.floor((e+g)/O),0,511),r=(P(Math.floor((t+g)/O),0,511)*Q+n)*4,i=p.getHeight(e,t),a=p.getSlope(e,t),o=T[r]/255,s=T[r+1]/255,c=T[r+2]/255,l=T[r+3]/255,u=E[r]/255,d=i-p.waterLevel,f=C(e,t),m=I(14,42,d),h=I(.24,.4,a)*(1-m),_=I(.19,.4,a),v=Math.max(_*j(.62,1,m),l*I(.06,.2,a+l*.3),h*.7),y=Math.max(s,h*.45+I(.12,.24,a)*(1-_)*.28),b=(1-I(.3,2,f))*I(-6,-1,f),x=Math.max(c,I(.2,-1.6,f)*.6)*(1-I(.1,.22,a)),S=Math.max(0,1-b*.55-x*(1-b)-v*(1-b-x*(1-b)));return{h:i,slope:a,grass:S*(1-y)*(1-o*.4),dry:S*o,dirt:S*y,sand:x,rock:v,wet:b,forest:u,shoreD:f}},me=[[.46,.55,.4],[.5,.51,.38],[.55,.49,.38],[.9,.88,.9],[.51,.47,.38],[.52,.48,.4],[.9,.88,.9],[.32,.3,.22]],he=(e,t,n=[0,0,0])=>{let r=K(e,t),i=[r.grass,r.dry,r.dirt,r.rock,r.sand,r.wet*.35,0,r.forest*.5*r.grass],a=0;n[0]=n[1]=n[2]=0;for(let e=0;e<8;e++){let t=i[e];if(t<=.001)continue;let r=oe.avg[e],o=me[e];n[0]+=t*r[0]*o[0],n[1]+=t*r[1]*o[1],n[2]+=t*r[2]*o[2],a+=t}return a>0?(n[0]/=a,n[1]/=a,n[2]/=a):(n[0]=.3,n[1]=.38,n[2]=.18),n},_e=(e,t)=>{let n=r.roads&&r.roads.api;return!!(n&&n.isOnRoad&&n.isOnRoad(e,t))},ve=performance.now(),q=new dt({renderer:t.renderer,engine:t,heightmap:p,seed:r.seed,quality:l,forestMask:y,groundInfo:K,groundTint:he,isBlocked:_e,bark:{oak:G,fir:pe},half:g}).build();n.add(q.group);let be=q.canopyCoverage(Q);for(let e=0,t=Q*Q;e<t;e++)E[e*4]=255*be[e];ee.needsUpdate=!0,ie.vegetation=Math.round(performance.now()-ve),$={ctx:e,hm:p,chunks:W,water:fe,vegetation:q,material:V,horizonMaterial:H,controlTex:M,normalTex:L,fillNormals:te,dirty:[],camera:c,groundInfo:K,forestMask:y,ctrlStep:O,ctrlData:T,shoreData:b,shoreTex:x,shoreDirty:!1};let J=r.terrain;J.ready=!0,J.size=r.size,J.waterLevel=p.waterLevel,J.getHeight=(e,t)=>p.getHeight(e,t),J.getNormal=(e,t,n=new s)=>p.getNormal(e,t,n),J.isWater=(e,t)=>p.getHeight(e,t)<p.waterLevel,J.raycast=(e,t)=>p.raycast(e,t);let xe=(e,t,n,r,i)=>{e&&$.dirty.push({...e,x0:Math.min(t,r),z0:Math.min(n,i),x1:Math.max(t,r),z1:Math.max(n,i)})};J.api={heightmap:p,slope:(e,t)=>p.getSlope(e,t),biome:(e,t)=>{let n=p.getHeight(e,t);if(n<p.waterLevel)return`water`;let r=K(e,t);return r.wet>.5?`wetland`:r.sand>.5?`beach`:r.rock>.5?`rock`:r.forest>.45&&n>p.waterLevel+1.6?`forest`:r.dry>.45?`meadow`:`grass`},groundInfo:K,forestMask:(e,t)=>y(e,t,p.getHeight(e,t),p.getSlope(e,t)),river:(e,t)=>({distance:p.riverDistance(e,t),halfWidth:p.riverHalfWidth(t)}),coastZ:e=>p.coastZ(e),flatten:(e,t,n=1,i=1,a)=>{let o=-r.half+e*r.cellSize,s=-r.half+t*r.cellSize;return J.api.flattenRect(o,s,o+n*r.cellSize,s+i*r.cellSize,a)},flattenRect:(e,t,n,r,i,a=6)=>(i??=p.averageHeight(e,t,n,r),i=Math.max(i,p.waterLevel+.6),xe(p.flattenRect(e,t,n,r,i,a),Math.min(e,n)-a,Math.min(t,r)-a,Math.max(e,n)+a,Math.max(t,r)+a),q.clearRect(Math.min(e,n)-1.5,Math.min(t,r)-1.5,Math.max(e,n)+1.5,Math.max(t,r)+1.5),i),conformPath:(e,t,n=6)=>{if(!e||e.length<2)return;let r=t/2+n,i=1/0,a=-1/0,o=1/0,s=-1/0;for(let t of e)i=Math.min(i,t.x),a=Math.max(a,t.x),o=Math.min(o,t.z),s=Math.max(s,t.z);xe(p.conformPath(e,t,n),i-r,o-r,a+r,s+r),q.clearPolyline(e,t+3)},conformDisc:(e,t,n,r,i=6)=>{r??=p.getHeight(e,t),xe(p.conformDisc(e,t,n,r,i),e-n-i,t-n-i,e+n+i,t+n+i),q.clearCircle(e,t,n+1.5)},clearVegetation:(e,t,n,r)=>q.clearRect(e,t,n,r),clearVegetationRect:(e,t,n,r)=>q.clearRect(e,t,n,r),clearVegetationCircle:(e,t,n)=>q.clearCircle(e,t,n),clearVegetationPath:(e,t)=>q.clearPolyline(e,t),clearVegetationOriented:(e,t,n,r,i=0,a=0)=>q.clearOriented(e,t,n,r,i,a),isCleared:(e,t)=>q.isCleared(e,t),treeCount:()=>q.aliveCount(),trees:q.trees,refresh:()=>{q._forceUpdate=!0,q._undergrowthDirty=!0},setInfoTint:e=>{V.userData.uniforms.uInfoTint.value=e,H.userData.uniforms.uInfoTint.value=e},stats:()=>({cpuMs:Math.round(re),timing:ie,trees:q.aliveCount(),chunks:W.chunks.length,waterQuads:fe.waterQuads.length,minH:p.minH,maxH:p.maxH}),vegetation:q,chunks:W,water:fe,material:V,horizonMaterial:H},a.on(`roads:changed`,()=>{let e=r.roads&&r.roads.segments;if(!(!e||!e.size))for(let t of e.values()){if(t._terrainCleared===r.roads.version)continue;let e=t.points&&t.points.length?t.points:null;e&&(q.clearPolyline(e,(t.width||12)+3),t._terrainCleared=r.roads.version)}}),a.on(`building:added`,e=>{!e||e.x==null||q.clearOriented(e.x,e.z,e.w||8,e.d||8,e.yaw||0,1.5)}),a.on(`zones:changed`,()=>{let e=r.zones&&r.zones.lots;if(e)for(let t of e)t._terrainCleared||t.buildingId==null||(t._terrainCleared=!0,q.clearOriented(t.x,t.z,t.w||8,t.d||8,t.yaw||0,.5))});let Y=()=>{let e=r.services&&r.services.list;if(e)for(let t of e)t._terrainCleared||(t._terrainCleared=!0,q.clearOriented(t.x,t.z,t.w||16,t.d||16,t.yaw||0,5))};a.on(`service:added`,Y),a.on(`services:changed`,Y),a.on(`infoview:changed`,e=>{let t=e&&e.view&&e.terrain!==!1?1:0;J.api.setInfoTint(t)}),W.update(c),q.update(c,0,0,r.env);try{t.renderer.compile(n,c)}catch{}a.emit(`terrain:ready`,J),ie.total=Math.round(performance.now()-u),e.config.debug&&console.log(`[terrain] ready`,J.api.stats())}function mt(e,t){if(!$)return;let{ctx:n,chunks:r,water:i,vegetation:a,hm:o}=$,{camera:s,engine:c,world:l,scene:u}=n;if($.dirty.length){let e=8,t=1/0,s=-1/0,c=1/0,l=-1/0;for(;$.dirty.length&&e-->0;){let e=$.dirty.shift();r.rebuildRegion(e.x0,e.z0,e.x1,e.z1),a.resnap(e.x0,e.z0,e.x1,e.z1),t=Math.min(t,e.i0),s=Math.max(s,e.i1),c=Math.min(c,e.j0),l=Math.max(l,e.j1)}let u=o.N-1;$.fillNormals(Math.max(0,t-1),Math.min(u-1,s+1),Math.max(0,c-1),Math.min(u-1,l+1)),$.normalTex.needsUpdate=!0,i.updateHeightTexture();let d=o.N,f=o.data,p=o.waterLevel;for(let e=Math.max(0,c);e<=Math.min(d-1,l)&&!$.shoreDirty;e+=2)for(let n=Math.max(0,t);n<=Math.min(d-1,s);n+=2)if(f[e*d+n]<p+3){$.shoreDirty=!0;break}$.shoreDirty&&!$.dirty.length&&(o.computeShoreDistance($.shoreData),$.shoreTex.needsUpdate=!0,$.shoreDirty=!1),n.events.emit(`terrain:changed`)}let d=l.env&&l.env.nightFactor||0;$.material.userData.uniforms.uNight.value=d,$.horizonMaterial.userData.uniforms.uNight.value=d;let f=$.material.userData.uniforms.uMoonDir.value,p=l.env&&l.env.moonDirection;p&&p.y>.08?f.copy(p):l.env&&l.env.sunDirection&&(f.set(-l.env.sunDirection.x,0,-l.env.sunDirection.z),f.lengthSq()<1e-6?f.set(0,1,0):f.normalize().multiplyScalar(.82).setY(.57)),$.horizonMaterial.userData.uniforms.uMoonDir.value.copy(f),r.update(s),a.update(s,e,t,l.env),i.update(e,t,c,l.env),i.reflectionsEnabled&&i.renderReflection(c.renderer,u,s)}function ht(){if(!$)return;let{ctx:e,chunks:t,water:n,vegetation:r}=$;e.scene.remove(t.group,n.mesh,r.group),t.dispose(),n.dispose(),r.dispose(),$=null}export{ht as dispose,pt as init,ft as name,mt as update};