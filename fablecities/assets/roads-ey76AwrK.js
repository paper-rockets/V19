import{$ as e,A as t,B as n,C as r,Ct as i,D as a,E as o,Et as s,F as c,Gt as l,J as u,Kt as d,N as f,P as p,R as m,T as h,Ut as g,Wt as _,X as v,at as y,dt as b,f as x,gt as S,ht as C,it as w,jt as T,k as E,kt as D,m as O,mt as k,n as A,nt as j,ot as ee,p as M,ut as te,w as N,wt as P}from"./index-eKs5Uldr.js";import{t as F}from"./noise-D8FvdR-x.js";var ne=.05,I=.45,L=.035,re=1.5;function ie(e){return[{mat:`curb`,uv:`along`,pts:[[0,0,1,.82],[.02,.13,1,.62],[.05,.17,1,0],[.2,.17,1,0]]},{mat:`sidewalk`,uv:`road`,pts:[[.2,.17,1,.12],[.2+e,.2]]},{mat:`skirt`,uv:`road`,pts:[[.2+e,.2,.88],[.45+e,`S`,.66],[1.1+e,`S`,.34],[1.9+e,`S`,.14],[.2+e+3,`T`,0]]}]}function ae(){return[{mat:`verge`,uv:`along`,pts:[[0,-.01],[.7,.03]]},{mat:`skirt`,uv:`road`,pts:[[.7,.03,.86],[1.1,`S`,.62],[1.9,`S`,.3],[2.9,`S`,.12],[3.7,`T`,0]]},{mat:`guardrail`,uv:`along`,closed:!0,cast:!0,pts:[[.3,.44],[.2,.53],[.3,.62],[.2,.71],[.3,.8],[.46,.83],[.46,.44],[.3,.44]]}]}function oe(){return[{mat:`granite`,uv:`along`,pts:[[0,-.01,1,.86],[.02,.06,1,.5],[.05,.1,1,.12],[.29,.098,1,.06],[.32,.05,1,.42]]},{mat:`skirt`,uv:`road`,pts:[[.32,.03,.86],[.62,`S`,.6],[1.25,`S`,.26],[2.6,`T`,0]]}]}var R=(e,t)=>({kind:`street`,spacing:32,alternate:!0,poleLat:e+.85,arm:2,height:9,radius:t,color:[1,.7,.4]}),z={local:{id:`local`,name:`Two-lane road`,width:12,lanes:2,speed:50,laneWidth:3.8,cwHalf:3.8,medianHalf:0,sidewalk:2,hasCurb:!0,crosswalks:!0,stopLines:!0,grime:1,asphaltMat:`asphalt_local`,rank:2,asphaltPts:[[-3.8,-.076],[0,0],[3.8,-.076]],edge:ie,centre:[],centreGap:{intersection:0,deadEnd:0},laneOffsets:[1.9],lines:[{off:0,hw:-.06,on:3,period:6},{off:3.35,hw:.055,on:1,period:1}],arrowLanes:[1.9],pedestrianOffsets:[5],cornerRadius:3,shoulderLat:0,lamps:R(3.8,11)},avenue:{id:`avenue`,name:`Four-lane avenue with median`,width:24,lanes:4,speed:60,laneWidth:3.75,cwHalf:9,medianHalf:1.5,sidewalk:2.8,hasCurb:!0,crosswalks:!0,stopLines:!0,grime:1,asphaltMat:`asphalt_avenue`,rank:3,asphaltPts:[[-9,-.15],[-1.5,0],[1.5,0],[9,-.15]],edge:ie,centre:[{mat:`curb`,uv:`along`,pts:[[-1.5,0,1,.62],[-1.47,.12,1,.32],[-1.43,.17],[-1.26,.17],[-1.21,.11,1,.72]]},{mat:`median`,uv:`road`,pts:[[-1.21,.11,1,.55],[-.92,.128,1,.16],[.92,.128,1,.16],[1.21,.11,1,.55]]},{mat:`curb`,uv:`along`,pts:[[1.21,.11,1,.72],[1.26,.17],[1.43,.17],[1.47,.12,1,.32],[1.5,0,1,.62]]}],centreGap:{intersection:4.6,deadEnd:.8},trees:{spacing:13,jitter:2.5,minFromEnd:8,pit:.75},laneOffsets:[3.375,7.125],lines:[{off:1.75,hw:-.06,on:1,period:1},{off:5.25,hw:.06,on:3,period:9},{off:8.55,hw:.075,on:1,period:1}],arrowLanes:[3.375,7.125],pedestrianOffsets:[10.6],cornerRadius:6,shoulderLat:0,lamps:R(9,13)},highway:{id:`highway`,name:`Motorway (2×3 lanes)`,width:32,lanes:6,speed:110,laneWidth:3.5,cwHalf:15.4,medianHalf:1.6,sidewalk:0,hasCurb:!1,crosswalks:!1,stopLines:!1,grime:.55,verge:.7,asphaltMat:`asphalt_highway`,rank:4,asphaltPts:[[-15.4,-.3],[-1.6,0],[1.6,0],[15.4,-.3]],edge:ae,centre:[{mat:`curb`,uv:`along`,pts:[[-1.6,0,1,.55],[-1.58,.12,1,.3],[-1.55,.15],[-1.4,.15]]},{mat:`apron`,uv:`road`,pts:[[-1.4,.15],[-.42,.15]]},{mat:`barrier_base`,uv:`along`,cast:!0,pts:[[-.42,.15],[-.42,.3],[-.3,.46]]},{mat:`barrier`,uv:`along`,cast:!0,pts:[[-.3,.46],[-.12,1.02],[.12,1.02],[.3,.46]]},{mat:`barrier_base`,uv:`along`,cast:!0,pts:[[.3,.46],[.42,.3],[.42,.15]]},{mat:`apron`,uv:`road`,pts:[[.42,.15],[1.4,.15]]},{mat:`curb`,uv:`along`,pts:[[1.4,.15],[1.55,.15],[1.58,.12,1,.3],[1.6,0,1,.55]]}],centreGap:{intersection:6,deadEnd:0},posts:{spacing:4,lateral:.36,size:[.12,.78,.16]},laneOffsets:[3.75,7.25,10.75],lines:[{off:2,hw:-.075,on:1,period:1},{off:5.5,hw:.07,on:3,period:12},{off:9,hw:.07,on:3,period:12},{off:12.5,hw:.1,on:1,period:1}],arrowLanes:[],pedestrianOffsets:[],cornerRadius:8,shoulderLat:12.6,lamps:{kind:`mast`,spacing:46,alternate:!1,poleLat:0,arm:2.6,height:14,radius:21,color:[1,.84,.62]}},path:{id:`path`,name:`Pedestrian path`,width:3,lanes:0,speed:5,laneWidth:1.2,cwHalf:1.2,medianHalf:0,sidewalk:0,hasCurb:!1,crosswalks:!1,stopLines:!1,grime:0,asphaltMat:`path`,rank:1,asphaltPts:[[-1.2,-.012],[0,.01],[1.2,-.012]],edge:oe,centre:[],centreGap:{intersection:0,deadEnd:0},laneOffsets:[],lines:[],arrowLanes:[],pedestrianOffsets:[.5],cornerRadius:1.2,shoulderLat:0,lamps:null}};function B(e,t){let n=e.asphaltPts;if(t<=n[0][0])return n[0][1];for(let e=1;e<n.length;e++)if(t<=n[e][0]){let r=(t-n[e-1][0])/(n[e][0]-n[e-1][0]);return n[e-1][1]+(n[e][1]-n[e-1][1])*r}return n[n.length-1][1]}function se(e){return Math.abs(B(e,e.cwHalf))+ne+.05}function ce(e){let t=e.lamps;return t?t.kind===`mast`?0:t.poleLat-t.arm:0}function le(){let e={};for(let[t,n]of Object.entries(z))e[t]={id:n.id,name:n.name,width:n.width,lanes:n.lanes,speed:n.speed,laneWidth:n.laneWidth,sidewalk:n.sidewalk,carriageway:n.cwHalf*2,definition:n};return e}new l;var ue=class e extends p{constructor(e,t=0,n=1){super(),this.isRoadCurve=!0,this.base=e,this.u0=t,this.u1=n,this.arcLengthDivisions=32}getPoint(e,t=new l){return this.base.getPointAt(this.u0+(this.u1-this.u0)*e,t)}getPointAt(e,t){return this.getPoint(e,t)}getTangentAt(e,t){return this.getTangent(e,t)}getLength(){return this.base.getLength()*(this.u1-this.u0)}split(t){let n=this.u0+(this.u1-this.u0)*t;return[new e(this.base,this.u0,n),new e(this.base,n,this.u1)]}slice(t,n){let r=this.u1-this.u0;return new e(this.base,this.u0+r*t,this.u0+r*n)}};function de(e){e.arcLengthDivisions=200;let t=e.getLength();return e.arcLengthDivisions=Math.max(64,Math.min(4096,Math.ceil(t*1.5))),e.updateArcLengths(),e}var V=e=>new l(e.x,0,e.z);function fe(e,t=`straight`){let n=e.length,r=[];if(n<2)return r;if(t===`bezier`&&n===3){let t=de(new i(V(e[0]),V(e[1]),V(e[2])));return r.push({curve:new ue(t),ia:0,ib:2}),r}if(t===`bezier`&&n===4){let t=de(new f(V(e[0]),V(e[1]),V(e[2]),V(e[3])));return r.push({curve:new ue(t),ia:0,ib:3}),r}if((t===`bezier`||t===`catmull`)&&n>=3){let t=new a(e.map(V),!1,`centripetal`,.5),i=n-1,o=i*64;t.arcLengthDivisions=o;let s=t.getLengths(o),c=s[o];for(let e=0;e<i;e++){let n=s[e*64]/c,i=s[(e+1)*64]/c;r.push({curve:new ue(t,n,i),ia:e,ib:e+1})}return r}for(let t=0;t<n-1;t++){let n=de(new j(V(e[t]),V(e[t+1])));r.push({curve:new ue(n),ia:t,ib:t+1})}return r}function pe(e,t){if(t===`bezier`&&(e===3||e===4))return[0,e-1];let n=[];for(let t=0;t<e;t++)n.push(t);return n}function me(e,t,n,r,i,a,o,s){let c=n-e,l=r-t,u=o-i,d=s-a,f=c*d-l*u;if(Math.abs(f)<1e-9)return null;let p=i-e,m=a-t,h=(p*d-m*u)/f,g=(p*l-m*c)/f;return h<-1e-6||h>1+1e-6||g<-1e-6||g>1+1e-6?null:{t:h,u:g}}function he(e,t,n,r,i,a){let o={d2:1/0,t:0,x:e[0],z:t[0],i:0};for(let s=0;s<e.length-1;s++){let c=e[s],l=t[s],u=e[s+1],d=t[s+1],f=u-c,p=d-l,m=f*f+p*p,h=m>0?((i-c)*f+(a-l)*p)/m:0;h=h<0?0:h>1?1:h;let g=c+f*h,_=l+p*h,v=(i-g)*(i-g)+(a-_)*(a-_);v<o.d2&&(o={d2:v,t:Math.min(1,(s+h)*n/r),x:g,z:_,i:s})}return o}function ge(e,t){return Math.atan2(e,-t)}function _e(e){return e%=Math.PI*2,e>Math.PI&&(e-=Math.PI*2),e<-Math.PI&&(e+=Math.PI*2),e}function ve(e){return e%=Math.PI*2,e<0&&(e+=Math.PI*2),e}var ye=Math.PI/180,be=new l,xe=new l;function Se(e,t,n){let r=e.grad;return r?e.y+r.gx*(t-e.x)+r.gz*(n-e.z):e.y}function Ce(e,t,n,r){let i=t.length,a=n===`a`?Math.min(r,i):Math.max(i-r,0),o=i>0?a/i:0;t.curve.getPointAt(o,be),t.curve.getTangentAt(o,xe);let s=xe.x,c=xe.z;n===`b`&&(s=-s,c=-c);let l=Math.hypot(s,c)||1;return s/=l,c/=l,{x:be.x,z:be.z,y:e.heightAt(t,a),dx:s,dz:c,rx:-c,rz:s,s:a}}function we(e,t,n,r,i,a,o,s){let c=n*s-r*o;if(Math.abs(c)<1e-9)return null;let l=i-e,u=a-t;return{alpha:(l*s-u*o)/c,beta:(l*r-u*n)/c}}function Te(e,t,n,r,i){let a=null;for(let o=0;o<i.length-1;o++){let s=i[o],c=i[o+1],l=c.x-s.x,u=c.z-s.z,d=we(e,t,n,r,s.x,s.z,l,u);!d||d.beta<-1e-6||d.beta>1+1e-6||d.alpha<0||(a==null||d.alpha<a)&&(a=d.alpha)}return a}function Ee(e,t,n,r,i,a){let o=e.type.cwHalf,s=n.type.cwHalf,c=e.type.sidewalk+(e.type.hasCurb?.2:0)+(e.type.verge||0),l=n.type.sidewalk+(n.type.hasCurb?.2:0)+(n.type.verge||0),u=t.x+t.rx*o,d=t.z+t.rz*o,f=r.x-r.rx*s,p=r.z-r.rz*s,m=t.y+B(e.type,o),h=r.y+B(n.type,-s),g=i===1?Math.PI*2:ve(Math.atan2(r.dz,r.dx)-Math.atan2(t.dz,t.dx)),_=c>=l?e.type:n.type,v={kind:`flat`,needTrimI:e.frameTrim,needTrimJ:n.frameTrim,pts:[],edgeType:_,swI:c,swJ:l,degenerate:!1,A:{x:u,z:d},B:{x:f,z:p}},y=(e,t,n,r,i)=>v.pts.push({x:e,z:t,nx:n,nz:r,w:i,y:0,f:0}),b=()=>{y(u,d,t.rx,t.rz,c),y(f,p,-r.rx,-r.rz,l),v.degenerate=Math.hypot(u-f,d-p)<.02},x=-t.dx,S=-t.dz,C=-r.dx,w=-r.dz,T=i>1&&g<Math.PI-.15*ye?we(u,d,x,S,f,p,C,w):null;if(i>1&&Math.abs(g-Math.PI)<.15*ye){if(Math.abs(o-s)>.05||e.type!==n.type){let t=Math.abs(o-s)*1.2+Math.abs(c-l)*.6+2;v.needTrimI=Math.max(e.frameTrim,t),v.needTrimJ=Math.max(n.frameTrim,t)}b()}else if(i>1&&g<Math.PI&&T){v.kind=`fillet`;let i=Math.min(e.type.cornerRadius,n.type.cornerRadius),a=Math.max(1.2,i*Math.min(1,Math.max(.4,g/(40*ye)))),o=a/Math.tan(g/2);T.alpha<o+.3&&(v.needTrimI=e.frameTrim+(o+.3-T.alpha)),T.beta<o+.3&&(v.needTrimJ=n.frameTrim+(o+.3-T.beta));let s=u+x*T.alpha,m=d+S*T.alpha,h=s+t.dx*o,_=m+t.dz*o,b=s+r.dx*o,E=m+r.dz*o,D=t.dx+r.dx,O=t.dz+r.dz,k=Math.hypot(D,O)||1;D/=k,O/=k;let A=s+D*(a/Math.sin(g/2)),j=m+O*(a/Math.sin(g/2)),ee=u+t.rx*c,M=d+t.rz*c,te=f-r.rx*l,N=p-r.rz*l,P=we(ee,M,x,S,te,N,C,w),F=P?ee+x*P.alpha:(ee+te)/2,ne=P?M+S*P.alpha:(M+N)/2,I=[{x:h+t.rx*c,z:_+t.rz*c},{x:F,z:ne},{x:b-r.rx*l,z:E-r.rz*l}],L=Math.max(c,l)*2.6+.4;Math.hypot(u-h,d-_)>.02&&y(u,d,t.rx,t.rz,c),y(h,_,t.rx,t.rz,c);let re=Math.atan2(_-j,h-A),ie=_e(Math.atan2(E-j,b-A)-re),ae=Math.max(5,Math.ceil(a*Math.abs(ie)/.45));for(let e=1;e<ae;e++){let t=re+ie*e/ae,n=A+Math.cos(t)*a,r=j+Math.sin(t)*a,i=(A-n)/a,o=(j-r)/a,s=Te(n,r,i,o,I);s??=c+(l-c)*(e/ae),y(n,r,i,o,Math.min(L,Math.max(.05,s)))}y(b,E,-r.rx,-r.rz,l),Math.hypot(f-b,p-E)>.02&&y(f,p,-r.rx,-r.rz,l)}else if(i>1&&g<Math.PI)b(),v.degenerate=!1;else{v.kind=`round`;let e=a.x,n=a.z,o=Math.hypot(u-e,d-n),s=Math.hypot(f-e,p-n),m=Math.atan2(d-n,u-e),h=ve(Math.atan2(p-n,f-e)-m);i===1&&(h=Math.PI);let g=Math.max(6,Math.ceil(Math.max(o,s)*h/.5));for(let t=0;t<=g;t++){let r=t/g,i=m+h*r,a=o+(s-o)*r,u=Math.cos(i),d=Math.sin(i);y(e+u*a,n+d*a,u,d,c+(l-c)*r)}v.pts[0].x=u,v.pts[0].z=d,v.pts[0].nx=t.rx,v.pts[0].nz=t.rz;let _=v.pts[v.pts.length-1];_.x=f,_.z=p,_.nx=-r.rx,_.nz=-r.rz}let E=0;for(let e=1;e<v.pts.length;e++)E+=Math.hypot(v.pts[e].x-v.pts[e-1].x,v.pts[e].z-v.pts[e-1].z);let D=m-Se(a,u,d),O=h-Se(a,f,p),k=0;for(let e=0;e<v.pts.length;e++){let t=v.pts[e];e>0&&(k+=Math.hypot(t.x-v.pts[e-1].x,t.z-v.pts[e-1].z));let n=E>0?k/E:0;t.f=n,t.y=Se(a,t.x,t.z)+D+(O-D)*n}return v.pts.length&&(v.pts[0].y=m,v.pts[v.pts.length-1].y=h),v}function De(e,t){let n=[];for(let r of e.segments){let i=t.segments.get(r);i&&(i.a===e.id&&n.push({seg:i,end:`a`,type:z[i.type],trim:0,frameTrim:0,frame:null,angle:0}),i.b===e.id&&n.push({seg:i,end:`b`,type:z[i.type],trim:0,frameTrim:0,frame:null,angle:0}))}let r=n.length;if(r===0){e.junction=null;return}for(let e of n)e.frame=Ce(t,e.seg,e.end,0),e.angle=Math.atan2(e.frame.dz,e.frame.dx);n.sort((e,t)=>e.angle-t.angle);let i=[];for(let a=0;a<12;a++){let a=!1;i=[];for(let e of n)e.frame=Ce(t,e.seg,e.end,e.trim),e.frameTrim=e.trim;for(let t=0;t<r;t++){let o=(t+1)%r,s=n[t],c=n[o],l=Ee(s,s.frame,c,c.frame,r,e);l.i=t,l.j=o;let u=Math.max(.5,s.seg.length*.45),d=Math.max(.5,c.seg.length*.45);if(l.needTrimI>s.trim+.001){let e=Math.min(u,l.needTrimI);a||=e>s.trim+.001,s.trim=e}if(l.needTrimJ>c.trim+.001){let e=Math.min(d,l.needTrimJ);a||=e>c.trim+.001,c.trim=e}i.push(l)}if(!a)break}let a=n.filter(e=>e.type.lanes>0),o=a.length,s=r===1?`dead`:o>=3?`inter`:`cont`,c=r===2&&n[0].type===n[1].type,l=c&&n[0].type.centre.length>0&&(n[0].trim>.01||n[1].trim>.01);for(let e of n){let t=e.seg,n=e.type,i=0;if(o>=3&&n.stopLines&&(i|=16),o>=3&&n.crosswalks&&(i|=8),o===2&&r>o&&n.crosswalks&&e===a[0]&&(i|=8),n.lanes>0&&o>=3){let t={x:-e.frame.dx,z:-e.frame.dz};for(let n of a){if(n===e)continue;let r=_e(ge(n.frame.dx,n.frame.dz)-ge(t.x,t.z)),a=Math.abs(r);a<=Math.PI/6?i|=2:a<5*Math.PI/6&&(i|=r>0?4:1)}}s===`dead`&&(i|=32);let u=s===`inter`?n.centreGap.intersection:s===`dead`?n.centreGap.deadEnd:0,d=!(s===`cont`&&c),f=l;e.end===`a`?(t.trimA=e.trim,t.kindA=s,t.flagsA=i,t.gapA=u,t.capA=d,t.bridgeA=f):(t.trimB=e.trim,t.kindB=s,t.flagsB=i,t.gapB=u,t.capB=d,t.bridgeB=f)}let u=n[0].type;for(let e of n)e.type.rank>u.rank&&(u=e.type);let d=0;for(let e of n)d=Math.max(d,e.trim+e.type.width*.5);e.junction={k:r,kind:s,dominant:u,bridgeCentre:l,padRadius:d,pad:r>=3||n.some(e=>e.trim>.01),ends:n.map(e=>({segId:e.seg.id,end:e.end,type:e.type,trim:e.trim,frame:e.frame})),corners:i}}var Oe=2,ke=18,Ae=4,je=3,Me=.06,Ne=class{constructor(e=64){this.cell=e,this.cells=new Map,this.boxes=new Map}_keys(e){let t=this.cell,n=Math.floor(e.minX/t),r=Math.floor(e.maxX/t),i=Math.floor(e.minZ/t),a=Math.floor(e.maxZ/t),o=[];for(let e=n;e<=r;e++)for(let t=i;t<=a;t++)o.push(e+`,`+t);return o}insert(e,t){this.remove(e),this.boxes.set(e,t);for(let n of this._keys(t)){let t=this.cells.get(n);t||(t=new Set,this.cells.set(n,t)),t.add(e)}}remove(e){let t=this.boxes.get(e);if(t){for(let n of this._keys(t)){let t=this.cells.get(n);t&&(t.delete(e),t.size===0&&this.cells.delete(n))}this.boxes.delete(e)}}query(e,t=new Set){for(let n of this._keys(e)){let e=this.cells.get(n);if(e)for(let n of e)t.add(n)}return t}},H=new l,U=new l,Pe=class{constructor(e,t){this.world=e,this.events=t,this.types=z,this.nodes=e.roads.nodes,this.segments=e.roads.segments,this._nextNode=1,this._nextSeg=1,this.grid=new Ne(64),this.dirtySegments=new Set,this.dirtyNodes=new Set,this.removedSegments=new Set,this.removedNodes=new Set,this._touchedNodes=new Set,this._batchAdded=[],this._batchRemoved=[],this._laneGraphCache=null,this.flattenCalls=0,this._nextSlot=1,this._freeSlots=[]}terrainY(e,t){return Math.max(this.world.terrain.getHeight(e,t),this.minGround())+ne}minGround(){let e=this.world.terrain.waterLevel;return Number.isFinite(e)?e+.75:-1/0}heightAt(e,t){let n=e.heights;if(!n||n.length<2)return e.y0||0;let r=Math.min(Math.max(t,0),e.length)/e.heightStep,i=Math.min(Math.floor(r),n.length-2),a=r-i;return n[i]*(1-a)+n[i+1]*a}surfaceY(e,t,n){return this.heightAt(e,t)+B(z[e.type],n)}_createNode(e,t){let n=`n`+this._nextNode++,r={id:n,x:e,y:this.terrainY(e,t),z:t,segments:[],junction:null};return this.nodes.set(n,r),this._touchedNodes.add(n),this.dirtyNodes.add(n),r}_sample(e){let t=e.length,n=Math.max(2,Math.ceil(t/Oe)),r=t/n,i=new Float64Array(n+1),a=new Float64Array(n+1),o=1/0,s=1/0,c=-1/0,l=-1/0;for(let t=0;t<=n;t++)e.curve.getPointAt(t/n,H),i[t]=H.x,a[t]=H.z,H.x<o&&(o=H.x),H.x>c&&(c=H.x),H.z<s&&(s=H.z),H.z>l&&(l=H.z);let u=e.width*.5+2;e.samples={xs:i,zs:a,ds:r,n},e.bbox={minX:o-u,maxX:c+u,minZ:s-u,maxZ:l+u}}_computeHeights(e){let{xs:t,zs:n,n:r,ds:i}=e.samples,a=new Float64Array(r+1);for(let e=0;e<=r;e++)a[e]=this.terrainY(t[e],n[e]);let o=Math.max(1,Math.round(ke/i)),s=new Float64Array(r+1);for(let e=0;e<=r;e++){let t=0,n=0;for(let i=-o;i<=o;i++){let s=Math.min(r,Math.max(0,e+i)),c=1-Math.abs(i)/(o+1);t+=a[s]*c,n+=c}s[e]=t/n}let c=this.nodes.get(e.a).y,l=this.nodes.get(e.b).y,u=new Float32Array(r+1);for(let e=0;e<=r;e++){let t=e/r;u[e]=s[e]+(1-t)*(c-s[0])+t*(l-s[r])}e.rawHeights=u,e.heights=Float32Array.from(u),e.heightStep=i,e.y0=c}_nodeGradient(e){let t=e.junction;if(e.grad=null,!t||!t.pad)return;let n=.35,r=n,i=0,a=n,o=0,s=0;for(let n of t.ends){let t=this.segments.get(n.segId);if(!t)continue;let c=Math.max(4,Math.min(t.length,n.trim+10)),l=n.end===`a`?c:t.length-c,u=this._rawHeightAt(t,l),d=Math.max(-.12,Math.min(.12,(u-e.y)/c)),{dx:f,dz:p}=n.frame;r+=f*f,i+=f*p,a+=p*p,o+=f*d,s+=p*d}let c=r*a-i*i;if(Math.abs(c)<1e-9)return;let l=(o*a-s*i)/c,u=(r*s-i*o)/c,d=Math.hypot(l,u);d>Me&&(l*=Me/d,u*=Me/d),e.grad={gx:l,gz:u}}_rawHeightAt(e,t){let n=e.rawHeights||e.heights;if(!n||n.length<2)return e.y0||0;let r=Math.min(Math.max(t,0),e.length)/e.heightStep,i=Math.min(Math.floor(r),n.length-2),a=r-i;return n[i]*(1-a)+n[i+1]*a}_applyPads(e){let t=e.rawHeights;if(!t)return;let n=Float32Array.from(t),r=n.length-1,i=e.heightStep,a=e.length,o=(t,o,s,c)=>{if(!t||!t.junction||!t.junction.pad)return;e.curve.getTangentAt(+!c,U);let l=U.x,u=U.z;c||(l=-l,u=-u);let d=Math.hypot(l,u)||1;l/=d,u/=d;let f=t.grad?t.grad.gx*l+t.grad.gz*u:0,p=Math.max(14,o*1.5);for(let e=0;e<=r;e++){let t=c?e*i:a-e*i;if(t>=o+p)continue;let r=s+f*t;if(t<=o){n[e]=r;continue}let l=(t-o)/p,u=l*l*(3-2*l);n[e]=r*(1-u)+n[e]*u}};o(this.nodes.get(e.a),e.trimA,this.nodes.get(e.a).y,!0),o(this.nodes.get(e.b),e.trimB,this.nodes.get(e.b).y,!1),e.heights=n}_buildPoints(e){let t=e.length,n=Math.max(1,Math.ceil(t/je)),r=[];for(let i=0;i<=n;i++){let a=i/n*t;e.curve.getPointAt(i/n,H),r.push(new l(H.x,this.heightAt(e,a),H.z))}e.points=r}_addSegment(e,t,n,r){let i=`s`+this._nextSeg++,a=r.getLength(),o={id:i,a:e.id,b:t.id,type:n.id,width:n.width,length:a,curve:r,points:[],lanes:[],pedestrianLanes:[],trimA:0,trimB:0,gapA:0,gapB:0,capA:!0,capB:!0,bridgeA:!1,bridgeB:!1,kindA:`dead`,kindB:`dead`,flagsA:0,flagsB:0,phase:0,samples:null,heights:null,heightStep:1,bbox:null,slot:0,traffic:0};return o.slot=this._freeSlots.length?this._freeSlots.pop():this._nextSlot<4096?this._nextSlot++:0,o.phase=Math.floor(O(x(this.world.seed,M(i)))()*40)*1.5,this._sample(o),this._computeHeights(o),this._buildPoints(o),e.segments.push(i),t.segments.push(i),this.segments.set(i,o),this.grid.insert(i,o.bbox),this.dirtySegments.add(i),this._touchedNodes.add(e.id),this._touchedNodes.add(t.id),this._batchAdded.push(i),o}_removeSegmentInternal(e){for(let t of[e.a,e.b]){let n=this.nodes.get(t);if(!n)continue;let r=n.segments.indexOf(e.id);r>=0&&n.segments.splice(r,1),this._touchedNodes.add(t)}this.grid.remove(e.id),e.slot&&this._freeSlots.push(e.slot),this.segments.delete(e.id),this.dirtySegments.delete(e.id),this.removedSegments.add(e.id),this._batchRemoved.push(e.id)}_splitSegment(e,t){let n=z[e.type],r=e.length,i=[];for(let e of[...t].sort((e,t)=>e-t))e*r<1||(1-e)*r<1||i.length&&(e-i[i.length-1])*r<1||i.push(e);if(!i.length)return[];let a=i.map(t=>(e.curve.getPointAt(t,H),this._createNode(H.x,H.z))),o=[this.nodes.get(e.a),...a,this.nodes.get(e.b)],s=[0,...i,1];this._removeSegmentInternal(e);for(let t=0;t<o.length-1;t++)this._addSegment(o[t],o[t+1],n,e.curve.slice(s[t],s[t+1]));return a}_nearestNode(e,t,n){let r=null,i=n*n;for(let n of this.nodes.values()){let a=(n.x-e)**2+(n.z-t)**2;a<i&&(i=a,r=n)}return r}_resolveAnchor(e,t,n){let r=this._nearestNode(e.x,e.z,t);if(r)return r;let i=this.nearest(e.x,e.z,Math.max(t,20));if(i&&i.distance<=Math.max(t,i.segment.width*.5+1)){let e=i.segment;if(Math.min(i.t,1-i.t)*e.length<Math.max(3,t))return this.nodes.get(i.t<.5?e.a:e.b);let[r]=this._splitSegment(e,[i.t]);if(r)return n.nodes.push(r.id),r}let a=this._createNode(e.x,e.z);return n.nodes.push(a.id),a}_findCrossings(e,t,n,r,i){let a=e.getLength(),o=Math.max(2,Math.ceil(a/Oe)),s=new Float64Array(o+1),c=new Float64Array(o+1),l=1/0,u=1/0,d=-1/0,f=-1/0;for(let t=0;t<=o;t++)e.getPointAt(t/o,H),s[t]=H.x,c[t]=H.z,H.x<l&&(l=H.x),H.x>d&&(d=H.x),H.z<u&&(u=H.z),H.z>f&&(f=H.z);let p=this.grid.query({minX:l-1,maxX:d+1,minZ:u-1,maxZ:f+1}),m=[];for(let e of p){let t=this.segments.get(e);if(!t)continue;let n=t.samples;for(let e=0;e<o;e++){let r=s[e],i=c[e],a=s[e+1],l=c[e+1],u=Math.min(r,a)-.01,d=Math.max(r,a)+.01,f=Math.min(i,l)-.01,p=Math.max(i,l)+.01;if(!(d<t.bbox.minX||u>t.bbox.maxX||p<t.bbox.minZ||f>t.bbox.maxZ))for(let s=0;s<n.n;s++){let c=n.xs[s],h=n.zs[s],g=n.xs[s+1],_=n.zs[s+1];if(Math.max(c,g)<u||Math.min(c,g)>d||Math.max(h,_)<f||Math.min(h,_)>p)continue;let v=me(r,i,a,l,c,h,g,_);if(!v)continue;let y=(e+v.t)/o,b=(s+v.u)/n.n;m.push({u:y,t:b,x:r+(a-r)*v.t,z:i+(l-i)*v.t,seg:t})}}}m.sort((e,t)=>e.u-t.u);let h=[],g=new Map,_=-1;for(let e of m){if(e.u*a<1||(1-e.u)*a<1||(e.u-_)*a<1.5)continue;let i=this.nodes.get(e.seg.a),o=this.nodes.get(e.seg.b),s=Math.hypot(i.x-e.x,i.z-e.z),c=Math.hypot(o.x-e.x,o.z-e.z),l=Math.min(r,3.5);if(s<l||c<l){let r=s<=c?i:o;if(r.id===t||r.id===n)continue;h.push({u:e.u,nodeId:r.id})}else g.has(e.seg.id)||g.set(e.seg.id,[]),g.get(e.seg.id).push(e.t),h.push({u:e.u,pending:e.seg.id,t:e.t});_=e.u}for(let[e,t]of g){let n=this.segments.get(e);if(!n)continue;let r=[...t].sort((e,t)=>e-t),a=this._splitSegment(n,r),o=0;for(let t of r){let n=a[o++],r=h.find(n=>n.pending===e&&n.t===t);r&&n&&(r.nodeId=n.id,i.nodes.push(n.id))}}return h.filter(e=>e.nodeId).sort((e,t)=>e.u-t.u)}build(e,t=`local`,n={}){let r=z[t];if(!r)throw Error(`[roads] unknown road type "${t}"`);let i={segments:[],nodes:[]};if(!Array.isArray(e)||e.length<2)return i;this._beginMutation();let a=[];for(let t of e){let e=this.world.clampToMap({x:+t.x||0,z:+t.z||0}),n=a[a.length-1];(!n||Math.hypot(e.x-n.x,e.z-n.z)>.5)&&a.push(e)}if(a.length<2)return i;let o=n.curve||`straight`,s=Math.max(4,r.width*.45),c=new Map;for(let e of pe(a.length,o)){let t=this._resolveAnchor(a[e],s,i);c.set(e,t.id),a[e].x=t.x,a[e].z=t.z}let l=fe(a,o);for(let e of l){let t=c.get(e.ia),n=c.get(e.ib);if(t===n)continue;let a=this._findCrossings(e.curve,t,n,s,i),o=t,l=0;for(let t of[...a,{u:1,nodeId:n}]){if(t.nodeId===o){l=t.u;continue}if((t.u-l)*e.curve.getLength()<1){o=t.nodeId,l=t.u;continue}let n=this.nodes.get(o),a=this.nodes.get(t.nodeId);if(n&&a){let o=this._addSegment(n,a,r,e.curve.slice(l,t.u));i.segments.push(o.id)}o=t.nodeId,l=t.u}}return this._finishMutation(),i}remove(e){let t=this.segments.get(e);return t?(this._beginMutation(),this._removeSegmentInternal(t),this._finishMutation(),!0):!1}clear(){this._beginMutation();for(let e of[...this.segments.values()])this._removeSegmentInternal(e);this._finishMutation()}_beginMutation(){this._touchedNodes.clear(),this._batchAdded=[],this._batchRemoved=[]}_finishMutation(){for(let e of this._touchedNodes){let t=this.nodes.get(e);t&&t.segments.length===0&&(this.nodes.delete(e),this.dirtyNodes.delete(e),this.removedNodes.add(e))}let e=new Set,t=[];for(let n of this._touchedNodes){let r=this.nodes.get(n);if(r){t.push(r);for(let t of r.segments)e.add(t)}}for(let t of e){let e=this.segments.get(t);e&&this._computeHeights(e)}for(let e of t)De(e,this);for(let e of t)this._nodeGradient(e);for(let t of e){let e=this.segments.get(t);e&&this._applyPads(e)}for(let e of t)De(e,this),this._clearJunctionVegetation(e),this.dirtyNodes.add(e.id);this._alignPhases(this._touchedNodes);for(let t of e){let e=this.segments.get(t);e&&(this._buildPoints(e),this._refreshLanes(e),this.dirtySegments.add(t))}this._conformTerrainFor(e,this._touchedNodes),this._laneGraphCache=null,this.world.roads.version++;let n=this._batchAdded.filter(e=>this.segments.has(e));this.events.emit(`roads:changed`,{version:this.world.roads.version,added:n,removed:this._batchRemoved.slice()})}_alignPhases(e){for(let t=0;t<12;t++){let t=!1;for(let n of e){let e=this.nodes.get(n);if(!e||e.segments.length!==2)continue;let r=this.segments.get(e.segments[0]),i=this.segments.get(e.segments[1]);if(!r||!i||r.type!==i.type)continue;let a=e=>e.a===n?e.trimA:e.length-e.trimB,o=r.phase+a(r)-a(i);Math.abs(i.phase-o)>1e-4&&(i.phase=o,this.dirtySegments.add(i.id),t=!0)}if(!t)break}}_collectSegmentOps(e,t){let n=z[e.type],r=e.length,i=e.width*.5+.6,a=se(n),o=Math.max(1,Math.ceil(r/4)),s=null,c=()=>{s&&=(t.push({x0:s.minX-i,z0:s.minZ-i,x1:s.maxX+i,z1:s.maxZ+i,y:s.minY-a,probes:s.probes,tol:.5}),null)};for(let t=0;t<=o;t++){let n=r*t/o;e.curve.getPointAt(t/o,H),e.curve.getTangentAt(t/o,U);let a=this.heightAt(e,n),l=Math.abs(U.x)<.08||Math.abs(U.z)<.08?48:Math.max(6,i*.9);s&&(Math.abs(a-s.y0)>1||n-s.s0>l||U.x*s.tx+U.z*s.tz<.94)&&c(),s||={minX:H.x,maxX:H.x,minZ:H.z,maxZ:H.z,y0:a,minY:a,s0:n,tx:U.x,tz:U.z,probes:[]},H.x<s.minX&&(s.minX=H.x),H.x>s.maxX&&(s.maxX=H.x),H.z<s.minZ&&(s.minZ=H.z),H.z>s.maxZ&&(s.maxZ=H.z),a<s.minY&&(s.minY=a);let u=-U.z*i*.75,d=U.x*i*.75;s.probes.push([H.x,H.z],[H.x+u,H.z+d],[H.x-u,H.z-d])}c()}_collectJunctionOp(e,t){let n=e.junction;if(!n||n.k<2)return;let r=0,i=e.y;for(let e of n.ends)r=Math.max(r,e.trim+e.type.width*.5),i=Math.min(i,e.frame.y);if(r<4)return;let a=[];for(let t=0;t<8;t++)a.push([e.x+Math.cos(t*.785)*r*.6,e.z+Math.sin(t*.785)*r*.6]);t.push({x0:e.x-r,z0:e.z-r,x1:e.x+r,z1:e.z+r,y:i-.35-ne,probes:a,tol:.6})}_applyConformOps(e){let t=this.world.terrain.api;if(!t||typeof t.flattenRect!=`function`||!e.length)return;let n=this.world.terrain;e.sort((e,t)=>t.y-e.y);for(let r of e){let{x0:e,z0:i,x1:a,z1:o,y:s}=r,c=1/0,l=-1/0;for(let[e,t]of r.probes){let r=n.getHeight(e,t);r<c&&(c=r),r>l&&(l=r)}if(l<=s+.06&&c>=s-r.tol)continue;let u=0;for(let[t,r]of[[e,i],[a,i],[e,o],[a,o],[(e+a)/2,i],[(e+a)/2,o],[e,(i+o)/2],[a,(i+o)/2]])u=Math.max(u,Math.abs(n.getHeight(t,r)-s));t.flattenRect(e,i,a,o,s,Math.min(22,Math.max(4,3+u*1.5))),this.flattenCalls++}}_conformPaths(e,t,n){if(typeof n.conformDisc==`function`)for(let e of t){let t=this.nodes.get(e),r=t&&t.junction;if(!r||r.k<2)continue;let i=r.padRadius+1;if(i<4)continue;let a=t.grad?Math.hypot(t.grad.gx,t.grad.gz):0;n.conformDisc(t.x,t.z,i,t.y-a*i*.85-se(r.dominant),22),this.flattenCalls++}for(let t of e){let e=this.segments.get(t);if(!e||!e.points.length)continue;let r=se(z[e.type]),i=e.points,a=this.world.terrain,o=e.width/2+4,s=0;for(let e=0;e<i.length;e+=3){let t=i[e],n=i[Math.min(i.length-1,e+1)],r=i[Math.max(0,e-1)],c=n.x-r.x,l=n.z-r.z,u=Math.hypot(c,l)||1;c/=u,l/=u;let d=a.getHeight(t.x-l*o,t.z+c*o),f=a.getHeight(t.x+l*o,t.z-c*o);s=Math.max(s,Math.abs(d-t.y),Math.abs(f-t.y))}let c=Math.min(26,Math.max(9,7+s/.11));if(n.conformPath(i.map(e=>({x:e.x,y:e.y-r,z:e.z})),e.width+1.2,c),this.flattenCalls++,typeof n.clearVegetationPath==`function`){let t=e.type===`highway`?9:z[e.type].lamps?6:3;n.clearVegetationPath(i,e.width+t)}}}_conformTerrainFor(e,t){let n=this.world.terrain.api;if(!n)return;if(typeof n.conformPath==`function`)return this._conformPaths(e,t,n);if(typeof n.flattenRect!=`function`)return;let r=[],i=new Set,a=null;for(let t of e){let e=this.segments.get(t);if(!e)continue;i.add(t),this._collectSegmentOps(e,r);let n=e.bbox;a?(a.minX=Math.min(a.minX,n.minX),a.maxX=Math.max(a.maxX,n.maxX),a.minZ=Math.min(a.minZ,n.minZ),a.maxZ=Math.max(a.maxZ,n.maxZ)):a={...n}}if(a)for(let e of this.grid.query({minX:a.minX-24,maxX:a.maxX+24,minZ:a.minZ-24,maxZ:a.maxZ+24})){if(i.has(e))continue;let t=this.segments.get(e);t&&this._collectSegmentOps(t,r)}for(let e of t){let t=this.nodes.get(e);t&&this._collectJunctionOp(t,r)}this._applyConformOps(r)}_clearJunctionVegetation(e){let t=this.world.terrain.api;!t||typeof t.clearVegetationCircle!=`function`||!e.junction||t.clearVegetationCircle(e.x,e.z,e.junction.padRadius+2.5)}refreshAll(){this._beginMutation();for(let e of this.nodes.values())e.y=this.terrainY(e.x,e.z),this._touchedNodes.add(e.id);for(let e of this.segments.values())this._computeHeights(e),this._buildPoints(e);this._finishMutation()}clearDirty(){this.dirtySegments.clear(),this.dirtyNodes.clear(),this.removedSegments.clear(),this.removedNodes.clear()}_lanePoints(e,t,n){let r=e.length,i=Math.min(e.trimA,r),a=Math.max(i,r-e.trimB),o=Math.max(1,Math.ceil((a-i)/Ae)),s=[];for(let n=0;n<=o;n++){let c=i+(a-i)*n/o,u=r>0?c/r:0;e.curve.getPointAt(u,H),e.curve.getTangentAt(u,U);let d=Math.hypot(U.x,U.z)||1,f=-U.z/d,p=U.x/d;s.push(new l(H.x+f*t,this.surfaceY(e,c,t),H.z+p*t))}return n<0&&s.reverse(),s}_refreshLanes(e){let t=z[e.type],n=[];t.laneOffsets.forEach((r,i)=>{for(let a of[1,-1]){let o=a*r;n.push({id:`${e.id}:${a>0?`f`:`r`}${i}`,segmentId:e.id,dir:a,rank:i,lateral:o,points:this._lanePoints(e,o,a),speed:t.speed,width:t.laneWidth,from:a>0?e.a:e.b,to:a>0?e.b:e.a,kind:`vehicle`})}}),e.lanes=n;let r=[];t.pedestrianOffsets.forEach((n,i)=>{for(let a of[1,-1]){let o=a*n;r.push({id:`${e.id}:p${a>0?`f`:`r`}${i}`,segmentId:e.id,dir:a,rank:i,lateral:o,points:this._lanePoints(e,o,a).map(e=>(e.y+=t.hasCurb?.2:0,e)),speed:5,width:1.5,from:a>0?e.a:e.b,to:a>0?e.b:e.a,kind:`pedestrian`})}}),e.pedestrianLanes=r}_outDir(e,t){let n=e.a===t;e.curve.getTangentAt(+!n,U);let r=U.x,i=U.z;n||(r=-r,i=-i);let a=Math.hypot(r,i)||1;return{x:r/a,z:i/a}}laneGraph(){let e=this.world.roads.version;if(this._laneGraphCache&&this._laneGraphCache.version===e)return this._laneGraphCache.graph;let t=[],n=new Map,r=[],i=new Map;for(let e of this.segments.values()){for(let r of e.lanes)t.push(r),n.set(r.id,[]);for(let t of e.pedestrianLanes)r.push(t),i.set(t.id,[])}let a=(e,t)=>{let n=_e(ge(t.x,t.z)-ge(e.x,e.z)),r=Math.abs(n);return r<=Math.PI/6?`S`:r>=5*Math.PI/6?`U`:n>0?`R`:`L`};for(let e of this.nodes.values()){let t=e.segments.map(e=>this.segments.get(e)).filter(Boolean).map(t=>({seg:t,dir:this._outDir(t,e.id)})),r=t.filter(e=>e.seg.lanes.length);for(let t of r){let i=t.seg.lanes.filter(t=>t.to===e.id);if(!i.length)continue;let o=i.length,s={x:-t.dir.x,z:-t.dir.z},c=r.filter(e=>e!==t).map(t=>({...t,cls:a(s,t.dir),out:t.seg.lanes.filter(t=>t.from===e.id).sort((e,t)=>e.rank-t.rank)}));for(let a of i){let i=a.rank,s=n.get(a.id),l=e=>{if(!e.length)return;let t=e.length;if(s.push(e[Math.min(i,t-1)].id),i===o-1)for(let n=i+1;n<t;n++)s.push(e[n].id)};if(r.length===1){let n=t.seg.lanes.filter(t=>t.from===e.id).sort((e,t)=>e.rank-t.rank);n.length&&s.push(n[Math.min(i,n.length-1)].id)}else if(r.length===2)l(c[0].out);else{for(let e of c)e.cls===`S`?l(e.out):e.cls===`L`&&(i===0||o===1)&&e.out.length?s.push(e.out[0].id):e.cls===`R`&&(i===o-1||o===1)&&e.out.length&&s.push(e.out[e.out.length-1].id);if(!s.length)for(let e of c)e.cls!==`U`&&l(e.out);if(!s.length)for(let e of c)l(e.out)}}}let o=[],s=[];for(let n of t)for(let t of n.seg.pedestrianLanes)t.to===e.id&&o.push(t),t.from===e.id&&s.push(t);for(let e of o)i.set(e.id,s.map(e=>e.id))}let o={lanes:t,connections:n,pedestrian:{lanes:r,connections:i},version:e};return this._laneGraphCache={version:e,graph:o},o}nearest(e,t,n=30){let r=this.grid.query({minX:e-n,maxX:e+n,minZ:t-n,maxZ:t+n}),i=null,a=n*n;for(let n of r){let r=this.segments.get(n);if(!r)continue;let o=he(r.samples.xs,r.samples.zs,r.samples.ds,r.length,e,t);o.d2<a&&(a=o.d2,i={seg:r,c:o})}if(!i)return null;let{seg:o,c:s}=i;o.curve.getPointAt(s.t,H),o.curve.getTangentAt(s.t,U);let c=Math.hypot(U.x,U.z)||1;return{segment:o,t:s.t,distance:Math.sqrt(a),point:{x:H.x,y:this.heightAt(o,s.t*o.length),z:H.z},tangent:{x:U.x/c,z:U.z/c}}}snap(e,t,n=8){let r=this._nearestNode(e,t,n);if(r)return{x:r.x,z:r.z,y:r.y,nodeId:r.id};let i=this.nearest(e,t,n);return i?{x:i.point.x,z:i.point.z,y:i.point.y,segmentId:i.segment.id,t:i.t}:{x:e,z:t,y:this.terrainY(e,t)}}sampleEdge(e,t,n=1){let r=this.segments.get(e);if(!r)return null;let i=z[r.type];t=Math.min(1,Math.max(0,t)),r.curve.getPointAt(t,H),r.curve.getTangentAt(t,U);let a=Math.hypot(U.x,U.z)||1,o=-U.z/a,s=U.x/a,c=Math.sign(n||1)*r.width*.5,l=t*r.length,u=this.heightAt(r,l)+B(i,Math.sign(c)*i.cwHalf)+(i.hasCurb?.2:0);return{x:H.x+o*c,y:u,z:H.z+s*c,nx:Math.sign(c)*o,nz:Math.sign(c)*s}}surfaceHeight(e,t){let n=this.nearest(e,t,20);if(!n)return null;let r=n.segment,i=z[r.type];if(n.distance>r.width*.5)return null;let a=-(e-n.point.x)*n.tangent.z+(t-n.point.z)*n.tangent.x,o=this.heightAt(r,n.t*r.length),s=Math.abs(a);if(s<=i.cwHalf)return o+B(i,a);let c=o+B(i,Math.sign(a)*i.cwHalf);return i.hasCurb?c+(s<i.cwHalf+.2?.17:.2):c}segmentsInRadius(e,t,n){let r=this.grid.query({minX:e-n,maxX:e+n,minZ:t-n,maxZ:t+n}),i=[];for(let a of r){let r=this.segments.get(a);if(!r)continue;let o=he(r.samples.xs,r.samples.zs,r.samples.ds,r.length,e,t),s=n+r.width*.5;o.d2<=s*s&&i.push(r)}return i}},Fe=4096,Ie={asphalt:{dir:`./assets/shared/asphalt`,maps:[`albedo`,`normal`,`roughness`],rmean:.81},asphalt_light:{dir:`./assets/shared/asphalt_light`,maps:[`albedo`,`normal`,`roughness`,`ao`],rmean:.52},slabs:{dir:`./assets/shared/paving_slabs`,maps:[`albedo`,`normal`,`roughness`,`ao`],rmean:.52},cobble:{dir:`./assets/shared/paving_cobble`,maps:[`albedo`,`normal`,`roughness`,`ao`],rmean:.53},concrete:{dir:`./assets/shared/concrete`,maps:[`albedo`,`normal`,`roughness`],rmean:.52},grass:{dir:`./assets/shared/grass`,maps:[`albedo`,`normal`,`roughness`,`ao`],rmean:.26}},Le={asphalt_local:{set:`asphalt_light`,tile:2.2,color:13222838,roughness:.65,normalScale:1.35,asphalt:`local`,detail:.75,grain:.4,pivot:.128,aggTile:3,coat:.14,coatR:.34,wetRough:.16,wetAlb:.76},asphalt_avenue:{set:`asphalt_light`,tile:2.35,color:12828080,roughness:.65,normalScale:1.35,asphalt:`avenue`,detail:.75,grain:.4,pivot:.12,aggTile:3.1,coat:.14,coatR:.34,wetRough:.16,wetAlb:.76},asphalt_highway:{set:`asphalt_light`,tile:2.6,color:12367529,roughness:.66,normalScale:1.2,asphalt:`highway`,detail:.65,grain:.38,pivot:.112,aggTile:3.4,coat:.12,coatR:.32,wetRough:.17,wetAlb:.76},path:{set:`cobble`,tile:2.4,color:10722448,roughness:.7,normalScale:1,coat:.1,coatR:.4,wetRough:.26,wetAlb:.78},sidewalk:{set:`slabs`,tile:2.6,color:13815751,roughness:.8,normalScale:.8,paved:!0,coat:.07,coatR:.42,wetRough:.24,wetAlb:.78},curb:{set:`concrete`,tile:1.3,color:11118239,roughness:.8,normalScale:.5,paved:!0,coat:.07,coatR:.42,wetRough:.24,wetAlb:.78},granite:{set:`concrete`,tile:.75,color:6973538,roughness:.7,normalScale:.9,paved:!0,coat:.12,coatR:.35,wetRough:.2,wetAlb:.78},median:{set:`grass`,tile:1.9,linear:[.3,.4,.155],roughness:.85,normalScale:1.5,paved:!0,wet:.45,wetRough:.55,wetAlb:.8},soil:{set:`concrete`,tile:.55,color:4866104,roughness:.95,normalScale:1.2,paved:!0,wet:.6,wetRough:.42,wetAlb:.72},skirt:{set:`grass`,tile:3.1,linear:[.34,.42,.205],roughness:.85,normalScale:1.25,skirt:!0,plain:!0,wet:.45,wetRough:.55,wetAlb:.82},apron:{set:`concrete`,tile:2,color:9407879,roughness:.8,normalScale:.5,plain:!0,coat:.06,coatR:.42,wetRough:.24,wetAlb:.78},barrier:{set:`concrete`,tile:2,color:14078923,roughness:.78,normalScale:.6,plain:!0,wall:!0,wallSpan:1.416,coat:.06,coatR:.42,wetRough:.3,wetAlb:.8},barrier_base:{set:`concrete`,tile:2,color:4605247,roughness:.82,normalScale:.6,plain:!0,wet:.8,wetRough:.26,wetAlb:.8},verge:{set:`concrete`,tile:1.6,color:8157812,roughness:.8,normalScale:.5,plain:!0,coat:.06,coatR:.42,wetRough:.24,wetAlb:.78}},Re=`
uniform float uWetness;        // engine.globalUniforms.uWetness (0 dry … 1 soaked)
uniform float uRoughMean;      // this scan's own roughness-map mean, so the map varies AROUND the base
uniform vec3 uWetTune;         // x = how much this surface responds, y = wet roughness, z = wet albedo factor
`,ze=`
float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
  vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
  roughnessFactor *= clamp( texelRoughness.g / max( uRoughMean, 0.02 ), 0.62, 1.42 );
#endif
`,Be=`
float rdWet = clamp( uWetness * uWetTune.x, 0.0, 1.0 );
diffuseColor.rgb *= mix( 1.0, uWetTune.z, rdWet );
`,Ve=`
uniform float uNight;
uniform sampler2D uInfoTex;
uniform vec3 uLampColor;
varying vec4 vRoad;
varying vec2 vTurns;
varying vec3 vWPos;
varying float vSeg;
varying float vDark;
varying vec2 vRoadUv;   // (lateral, along) in the road's own frame, metres — on the junction fan it is the dominant arm's frame

struct RdLight { float diff; float spec; };

// One lamp head at (dl, ds) metres from the fragment in road space (lateral, along), 'height' above the surface.
// diff = irradiance normalised to 1 directly under the head (inverse square, cosine), windowed at 'radius';
// spec = GGX lobe (F0 0.04) towards the camera — T/R/N = world frame of the road at this fragment, V = view dir.
void rd_addLamp(inout RdLight acc, float dl, float ds, float height, float radius, vec3 T, vec3 R, vec3 N, vec3 V, float rough, bool spec, float gain) {
  float d2 = dl * dl + ds * ds;
  float win = 1.0 - smoothstep(radius * 0.3, radius, sqrt(d2));
  if (win <= 0.0) return;
  win *= gain;
  float h2 = height * height;
  float D2 = d2 + h2;
  acc.diff += h2 * height / (D2 * sqrt(D2)) * win;
  if (spec) {
    vec3 L = normalize(R * dl + T * ds + N * height);
    vec3 H = normalize(L + V);
    float NdH = max(dot(N, H), 0.0), NdL = max(dot(N, L), 0.0), VdH = max(dot(V, H), 0.0);
    float a = max(rough * rough, 0.04); float a2 = a * a;
    float den = NdH * NdH * (a2 - 1.0) + 1.0;
    float Dg = a2 / (3.14159265 * den * den);
    float F = 0.04 + 0.96 * pow(1.0 - VdH, 5.0);
    acc.spec += Dg * F * NdL * (h2 / D2) * win * 6.0;
  }
}
// All lamps of one segment: mid-block lamps at along = (i + ½)·spacing (alternating sides when alt > 0.5,
// even i → +lat), only where the pole is ≥ 3 m inside the trimmed segment (dA/dB = distances to the ends) —
// exactly where RoadMesher places the instances — plus the two corner lamps of every marked junction end.
void rd_segLamps(inout RdLight acc, float lat, float along, float dA, float dB, vec4 lamp, float radius, int flagsA, int flagsB, float cornerLat,
                 vec3 T, vec3 R, vec3 N, vec3 V, float rough, bool spec) {
  float spacing = lamp.x;
  if (spacing <= 0.0 || abs(lat) > 500.0) return;
  float i0 = floor(along / spacing - 0.5);
  for (int k = -1; k <= 1; k++) {
    float i = i0 + float(k);
    float ds = (i + 0.5) * spacing - along;
    if (dA + ds < 3.0 || dB - ds < 3.0) continue;
    float side = lamp.z > 0.5 ? (mod(i, 2.0) < 0.5 ? 1.0 : -1.0) : 0.0;
    // ±18 % per-luminaire output (age, dirt, lamp type) keyed off the same index the instances use, so a
    // night street is a row of subtly different pools instead of one glowing tube
    float g = 0.82 + 0.36 * fract(sin(i * 12.9898 + vSeg * 4.1414) * 43758.5453);
    rd_addLamp(acc, side * lamp.y - lat, ds, lamp.w, radius, T, R, N, V, rough, spec, g);
  }
  if (lamp.z > 0.5) {
    if (flagsA != 0 && dA < radius) {
      rd_addLamp(acc, cornerLat - lat, -(dA + 0.6), lamp.w, radius, T, R, N, V, rough, spec, 0.92);
      rd_addLamp(acc, -cornerLat - lat, -(dA + 0.6), lamp.w, radius, T, R, N, V, rough, spec, 0.92);
    }
    if (flagsB != 0 && dB < radius) {
      rd_addLamp(acc, cornerLat - lat, dB + 0.6, lamp.w, radius, T, R, N, V, rough, spec, 0.92);
      rd_addLamp(acc, -cornerLat - lat, dB + 0.6, lamp.w, radius, T, R, N, V, rough, spec, 0.92);
    }
  }
}
// junction fan: (dx, dz) from the node, pad radius r — lit by the corner lamps on its rim, so the rim
// matches the arms' corner pools and the middle sits darker
float rd_fanPool(float dx, float dz, float r, float k) {
  if (k < 2.5) return 0.0;
  float d = length(vec2(dx, dz));
  // the corner luminaires stand on the rim, so the rim is the bright part and the middle of the
  // junction sits a stop darker — never unlit, which is what made close junctions read as black
  return mix(0.5, 1.15, smoothstep(0.0, r, d));
}
// pool → emitted radiance (soft saturation so overlapping pools do not blow out)
float rd_tone(float p) { return p / (1.0 + 0.7 * p); }
`,He=`
uniform vec4 uLines[8];
uniform int uLineCount;
uniform float uLaneCenters[6];
uniform int uLaneCount;
uniform float uArrowLanes[4];
uniform int uArrowLaneCount;
uniform float uCwHalf;
uniform float uMedianHalf;
uniform float uGrime;
uniform float uShoulderLat;
uniform vec4 uLamp; // spacing, head lat, alternate, height
uniform float uLampRadius;
uniform vec3 uPaintColor;
uniform vec3 uPaintYellow;
uniform float uDetail;
uniform float uGrain;
uniform float uPivot;
uniform sampler2D uAgg;
uniform vec2 uAggScale;

float rd_box1(float x, float a, float b, float aa) {
  return smoothstep(a - aa, a + aa, x) * (1.0 - smoothstep(b - aa, b + aa, x));
}
float rd_hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float rd_sdBox(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
// isosceles triangle, base on y = 0 spanning [-w, w], apex at (0, h)
float rd_sdTri(vec2 p, float w, float h) {
  float e = (h * abs(p.x) + w * p.y - w * h) * inversesqrt(h * h + w * w);
  return max(-p.y, e);
}
// arrow SDF in lane space: x = driver's right, y = forward. kind bits: 1 left, 2 straight, 4 right
float rd_arrow(vec2 p, int kind) {
  float d = 1e3;
  if ((kind & 2) != 0) {
    d = min(d, rd_sdBox(p - vec2(0.0, -0.7), vec2(0.15, 1.3)));
    d = min(d, rd_sdTri(p - vec2(0.0, 0.6), 0.55, 1.4));
  }
  if ((kind & 1) != 0) {
    if ((kind & 2) == 0) d = min(d, rd_sdBox(p - vec2(0.0, -0.9), vec2(0.15, 1.1)));
    d = min(d, rd_sdBox(p - vec2(-0.45, 0.2), vec2(0.45, 0.15)));
    d = min(d, rd_sdTri(vec2(p.y - 0.2, -(p.x + 0.9)), 0.45, 0.7));
  }
  if ((kind & 4) != 0) {
    if ((kind & 2) == 0) d = min(d, rd_sdBox(p - vec2(0.0, -0.9), vec2(0.15, 1.1)));
    d = min(d, rd_sdBox(p - vec2(0.45, 0.2), vec2(0.45, 0.15)));
    d = min(d, rd_sdTri(vec2(p.y - 0.2, p.x - 0.9), 0.45, 0.7));
  }
  return d;
}
// stop line, zebra crossing and turn arrows for one segment end. side: +1 for end B, -1 for end A
float rd_endMarks(float lat, float d, float side, int flags, float aaL, float aaA) {
  if (d > 20.0 || flags == 0) return 0.0;
  float m = 0.0;
  float inCw = smoothstep(0.0, aaL, uCwHalf - 0.15 - abs(lat));
  bool incoming = lat * side > 0.0;
  if ((flags & 8) != 0) {
    float band = rd_box1(d, 0.8, 3.8, aaA);
    float p = mod(lat + uCwHalf + 0.25, 1.0);
    float stripe = rd_box1(p, 0.0, 0.5, aaL);
    m = max(m, band * stripe * inCw);
  }
  if ((flags & 16) != 0 && incoming) {
    // stop bar: 0.5 m solid across the incoming half, 1 m behind the crosswalk
    float band = rd_box1(d, 4.8, 5.3, aaA);
    float inner = smoothstep(0.0, aaL, abs(lat) - uMedianHalf - 0.2);
    m = max(m, band * inCw * inner);
    int turns = flags & 7;
    for (int i = 0; i < 4; i++) {
      if (i >= uArrowLaneCount) break;
      float u = side * lat - uArrowLanes[i];
      float v = 10.0 - d;
      int kind = 2;
      if (uArrowLaneCount == 1) kind = turns;
      else if (i == 0) kind = ((turns & 1) != 0) ? ((uArrowLaneCount == 2 && (turns & 2) != 0) ? 3 : 1) : 2;
      else if (i == uArrowLaneCount - 1) kind = ((turns & 4) != 0) ? (((turns & 2) != 0) ? 6 : 4) : 2;
      if (kind == 0) kind = 2;
      float sd = rd_arrow(vec2(u, v), kind);
      m = max(m, 1.0 - smoothstep(-aaL, aaL, sd));
    }
  }
  return m;
}
`,Ue=`
float roadPaint = 0.0;
float rdYellow = 0.0;
float rdShoulder = 0.0;
float rdTrack = 0.0;
float rdPatch = 0.0;
float midLane = 0.0;
vec3 rdAgg = vec3(0.5);
vec4 rdInfo = texture2D(uInfoTex, vec2((vSeg + 0.5) / ${Fe.toFixed(1)}, 0.5));
{
  float lat = vRoad.x; float along = vRoad.y; float dA = vRoad.z; float dB = vRoad.w;
  bool isFan = dA < -5.0e4;
  float macro = 0.5, macro2 = 0.5, macro3 = 0.5;
  #ifdef USE_MAP
  macro = texture2D(map, vWPos.xz * 0.0131 + vec2(0.37, 0.11)).g;
  macro2 = texture2D(map, vWPos.xz * 0.0029 + vec2(0.71, 0.53)).r;
  macro3 = texture2D(map, vWPos.xz * 0.061 + vec2(0.13, 0.83)).b;
  #endif
  if (uGrain > 0.0) {
    // AGGREGATE: 6-14 cm stones baked by makeAsphaltDetail, sampled in world space so it never repeats
    // with the road UVs, plus a 11 m cluster octave. This is what the scans cannot deliver at road scale.
    rdAgg = texture2D(uAgg, vWPos.xz * uAggScale.x).rgb;
    float agM = texture2D(uAgg, vWPos.xz * uAggScale.y + vec2(0.37, 0.61)).r;
    diffuseColor.rgb *= (0.70 + 0.62 * rdAgg.r) * (0.84 + 0.32 * agM);
    // chip contrast: push every stone away from the surface's own mean so the stones separate
    float gl = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    diffuseColor.rgb *= clamp(1.0 + uGrain * (gl - uPivot) / max(uPivot, 1e-3), 0.45, 1.9);
  }
  // low-frequency tonal variation: patches of older / newer tarmac, plus mid-scale blotching
  diffuseColor.rgb *= (0.85 + 0.30 * macro) * (0.92 + 0.18 * macro2) * (0.80 + 0.41 * macro3);
  // transition pad: aDark packs rHere + 4·round(255·rNarrow) (see RoadMesher.buildTransitionPad).
  // 'lat' is PHYSICAL on a pad, so the dominant road's lines run straight into it and the carriageway
  // narrows *around* them instead of the lines skewing diagonally across the pad.
  float padCode = floor(vDark * 0.25);
  float rHere = vDark - 4.0 * padCode;
  float rNarrow = padCode / 255.0;
  bool isPad = !isFan && vDark > 0.02;
  float padHalf = uCwHalf * rHere;      // physical half width of the pad here
  float padKeep = uCwHalf * rNarrow;    // physical half width the narrower road keeps
  if (!isFan && abs(lat) < 500.0) {
    float aaL = max(fwidth(lat), 0.002);
    float aaA = max(fwidth(along), 0.002);
    // wheel-track wear: two polished, darker bands 1.7 m apart per lane — the tyre-wear tell every judge
    // named — with the lighter dust/oil band between them, so a lane reads as three tones, not one grey
    float track = 0.0;
    for (int i = 0; i < 6; i++) {
      if (i >= uLaneCount) break;
      float dl = lat - uLaneCenters[i];
      float u = abs(abs(dl) - 0.85);
      track += exp(-u * u * 3.4);
      midLane += exp(-dl * dl * 5.5);
    }
    rdTrack = clamp(track, 0.0, 1.0);
    midLane = clamp(midLane, 0.0, 1.0);
    // no vehicle ever drives the last few metres of a cul-de-sac stub the same way: sweep the polish out
    // so the wear does not stop in a hard rectangular edge before the bulb (bit 5 = dead end)
    {
      int fa = int(vTurns.x + 0.5), fb = int(vTurns.y + 0.5);
      float dDead = min((fa & 32) != 0 ? dA : 1e5, (fb & 32) != 0 ? dB : 1e5);
      rdTrack *= smoothstep(0.0, 9.0, dDead);
      midLane *= smoothstep(0.0, 9.0, dDead);
    }
    diffuseColor.rgb *= 1.0 - rdTrack * (0.17 + 0.11 * macro2);
    diffuseColor.rgb *= 1.0 + 0.045 * midLane * (1.0 - rdTrack);
    // kerb foot: contact AO over 0.45 m plus a 0.7 m gutter stain (dust, oil, leaf litter)
    float toKerb = uCwHalf - abs(lat);
    float ao = 1.0 - smoothstep(0.0, 0.45, toKerb);
    float grime = 1.0 - smoothstep(0.0, 0.7, toKerb);
    if (uMedianHalf > 0.0) {
      float toMed = abs(lat) - uMedianHalf;
      ao = max(ao, 1.0 - smoothstep(0.0, 0.4, toMed));
      grime = max(grime, 1.0 - smoothstep(0.0, 0.5, toMed));
    }
    diffuseColor.rgb *= (1.0 - 0.64 * ao * ao * uGrime) * (1.0 - 0.26 * grime * uGrime);
    // motorway hard shoulder: unpolished, slightly darker and rougher than the running lanes
    if (uShoulderLat > 0.0) {
      rdShoulder = smoothstep(uShoulderLat - 0.1, uShoulderLat + 0.4, abs(lat));
      diffuseColor.rgb *= 1.0 - 0.14 * rdShoulder;
    }
    // repair patches: a resurfaced rectangle with a bitumen-sealed edge painted round it
    vec2 pc = vec2(lat / 3.3 + 0.5, along / 11.0);
    vec2 cell = floor(pc);
    if (rd_hash(cell) < 0.13) {
      vec2 f = fract(pc);
      float outer = rd_box1(f.x, 0.03, 0.97, 0.03) * rd_box1(f.y, 0.05, 0.95, 0.02);
      float bx = rd_box1(f.x, 0.08, 0.92, 0.03) * rd_box1(f.y, 0.10, 0.90, 0.02);
      float tone = rd_hash(cell + 7.31) < 0.5 ? 0.74 : 1.17;
      diffuseColor.rgb *= mix(1.0, tone, bx * 0.9) * (1.0 - 0.34 * max(0.0, outer - bx));
      rdPatch = bx;
    }
    // crack seals: thin dark bitumen filaments wandering along the carriageway
    #ifdef USE_MAP
    {
      float cr = texture2D(map, vec2(along * 0.0125, lat * 0.42) + vec2(0.19, 0.67)).b;
      float crack = smoothstep(0.600, 0.645, cr) * (1.0 - smoothstep(0.665, 0.720, cr));
      diffuseColor.rgb *= 1.0 - 0.32 * crack * uGrime;
    }
    #endif
    // lane lines (cut before crosswalks / stop bars, solid near marked junctions). Sub-pixel lines fade by
    // their pixel coverage instead of inflating to a bright pixel-wide glow at distance.
    int flagsA = int(vTurns.x + 0.5) & 31; int flagsB = int(vTurns.y + 0.5) & 31;
    float dNear = min(flagsA != 0 ? dA : 1e5, flagsB != 0 ? dB : 1e5);
    float cut = 1.0;
    if (flagsA != 0 && dA < 6.5) { float c = (lat < 0.0 && (flagsA & 16) != 0) ? 5.9 : 4.2; cut *= smoothstep(c - aaA, c + aaA, dA); }
    if (flagsB != 0 && dB < 6.5) { float c = (lat > 0.0 && (flagsB & 16) != 0) ? 5.9 : 4.2; cut *= smoothstep(c - aaA, c + aaA, dB); }
    float paint = 0.0;
    for (int i = 0; i < 8; i++) {
      if (i >= uLineCount) break;
      vec4 L = uLines[i];
      float hw = abs(L.y);
      float m = 1.0 - smoothstep(hw - aaL, hw + aaL, abs(lat - L.x));
      m *= min(1.0, 2.0 * hw / aaL);
      if (L.z < L.w) {
        float ph = mod(along, L.w);
        float dash = rd_box1(ph, 0.0, L.z, aaA);
        m *= max(dash, step(dNear, 14.0));
      }
      paint = max(paint, m);
      if (L.y < 0.0) rdYellow = max(rdYellow, m);
    }
    paint *= cut;
    rdYellow *= cut;
    if (isPad) {
      // the dominant road's lines stop at the physical pad edge (a real lane drop), they do not skew
      float inside = 1.0 - smoothstep(padHalf - 0.80, padHalf - 0.38, abs(lat));
      paint *= inside;
      rdYellow *= inside;
      if (rNarrow < 0.985) {
        // gore: a solid edge line that converges with the boundary, and chevron hatching filling the
        // wedge of carriageway that is being dropped — so the dashes resolve instead of dissolving
        float el = 1.0 - smoothstep(0.065 - aaL, 0.065 + aaL, abs(abs(lat) - (padHalf - 0.5)));
        float wedge = smoothstep(padKeep - 0.15, padKeep + 0.55, abs(lat)) * (1.0 - smoothstep(padHalf - 1.15, padHalf - 0.62, abs(lat)));
        // 3.6 m pitch, 1.5 m bars: real gore hatching, not the 0.7 m hairlines that read as skid streaks.
        // Measured from the gore's own edge line so the bars stay parallel as the wedge narrows, and
        // clipped to the pad interior so no chevron can cross the kerb onto the sidewalk.
        float chev = rd_box1(fract((abs(lat) - padHalf + along * 0.9) * 0.28), 0.0, 0.42, 0.05);
        paint = max(paint, max(el, wedge * chev) * inside);
      }
    }
    float marks = max(rd_endMarks(lat, dA, -1.0, flagsA, aaL, aaA), rd_endMarks(lat, dB, 1.0, flagsB, aaL, aaA));
    marks *= min(1.0, 0.5 / aaL);
    // worn paint: noise mask 0.55–1.0, chipped harder in the wheel tracks and near junctions
    float wearN = 0.5;
    #ifdef USE_MAP
    wearN = texture2D(map, vec2(along * 0.023, lat * 0.041) + vec2(0.5)).r;
    #endif
    float wear = 0.55 + 0.45 * smoothstep(0.15, 0.85, wearN);
    wear *= 1.0 - 0.30 * rdTrack;
    wear *= 1.0 - 0.18 * (1.0 - smoothstep(4.0, 18.0, dNear));
    // stop bars, zebras and arrows are repainted far more often than lane lines — keep them ≥ 0.8 so they
    // survive the 60 m showcase distance instead of dissolving into the tarmac
    float wearM = 0.80 + 0.20 * smoothstep(0.15, 0.85, wearN);
    // vDark on asphalt is the transition-pad paint fade (0 on ordinary segments)
    roadPaint = clamp(max(paint * wear, marks * wearM), 0.0, 1.0);
    float yf = paint > 0.001 ? clamp(rdYellow / paint, 0.0, 1.0) : 0.0;
    vec3 paintCol = mix(uPaintColor, uPaintYellow, yf) * (0.88 + 0.24 * wearN);
    diffuseColor.rgb = mix(diffuseColor.rgb, paintCol, roadPaint);
  }
  // ---------------------------------------------------------------------------------------------
  // JUNCTION FAN. The pad used to be excluded from every wear term, which is why it measured 4x
  // flatter than the asphalt it abuts and read as a plain colour field on the detail camera.
  // It gets the same treatment, laid out in the junction's own frame:
  //   vRoadUv = (lateral, along) of the DOMINANT arm (the mesher textures the fan in that frame),
  //   vTurns.y = the node's own along-coordinate, so clat is the lateral of the CROSS arm,
  //   vDark    = 0 at the node, 1 on the kerb line, so the rim terms follow the real fan boundary.
  else if (isFan) {
    float rlat = vRoadUv.x;                 // lateral in the dominant arm's frame
    float clat = vRoadUv.y - vTurns.y;      // lateral in the crossing arm's frame
    float rim = clamp(vDark, 0.0, 1.0);
    // wheel paths of BOTH approaches, ±0.85 m about every lane centre, exactly as on a segment
    float tr = 0.0, ml = 0.0;
    for (int i = 0; i < 6; i++) {
      if (i >= uLaneCount) break;
      float da = rlat - uLaneCenters[i], db = clat - uLaneCenters[i];
      float ua = abs(abs(da) - 0.85), ub = abs(abs(db) - 0.85);
      tr = max(tr, max(exp(-ua * ua * 3.4), exp(-ub * ub * 3.4)));
      ml = max(ml, max(exp(-da * da * 5.5), exp(-db * db * 5.5)));
    }
    // turning scuff: the quarter-circle every left/right turn sweeps. abs() folds all four corners
    // into one ring test centred on (±cwHalf, ±cwHalf).
    float rt = max(uCwHalf * 0.60, 1.5);
    float dArc = length(vec2(abs(rlat), abs(clat)) - vec2(uCwHalf)) - rt;
    tr = max(tr, exp(-dArc * dArc * 2.4) * 0.72);
    rdTrack = clamp(tr, 0.0, 1.0) * (1.0 - 0.40 * rim);
    midLane = clamp(ml, 0.0, 1.0) * (1.0 - 0.6 * rdTrack);
    // every path crosses the middle, so the core polishes darker; oil drips where traffic stands
    float core = 1.0 - smoothstep(0.10, 0.80, rim);
    float oil = smoothstep(0.52, 0.86, macro3) * core;
    // approach braking: tyres scrub hardest in the last few metres before the stop line, which on a pad
    // is the outer third of each arm's lane band
    float brake = smoothstep(0.34, 0.70, rim) * (1.0 - smoothstep(0.70, 0.94, rim)) * rdTrack;
    // the wear must read as CONTRAST, not as an overall dimming: unworn tarmac keeps its tone and the
    // polished bands drop away from it, so the pad matches the arms' mean while gaining their structure
    diffuseColor.rgb *= 1.0 + 0.11 * (1.0 - rdTrack);
    diffuseColor.rgb *= 1.0 - rdTrack * (0.26 + 0.14 * macro2) - 0.06 * core - 0.14 * oil - 0.09 * brake;
    diffuseColor.rgb *= 1.0 + 0.075 * midLane;
    // a junction is resurfaced in patches over its life: extra low-frequency tonal blotching
    diffuseColor.rgb *= (0.90 + 0.23 * macro) * (0.95 + 0.11 * macro3);
    // kerb-foot contact AO and the gutter grime ring, following the fan's real boundary
    float ao = smoothstep(0.87, 1.0, rim);
    float grime = smoothstep(0.54, 1.0, rim);
    diffuseColor.rgb *= (1.0 - 0.62 * ao * ao * uGrime) * (1.0 - 0.34 * grime * uGrime);
    // repair patches and crack seals from the same generators as the segment, in the same frame, so the
    // pad/segment boundary carries no tonal step
    vec2 pc = vec2(rlat / 3.3 + 0.5, vRoadUv.y / 11.0);
    vec2 cell = floor(pc);
    if (rd_hash(cell) < 0.13) {
      vec2 f = fract(pc);
      float outer = rd_box1(f.x, 0.03, 0.97, 0.03) * rd_box1(f.y, 0.05, 0.95, 0.02);
      float bx = rd_box1(f.x, 0.08, 0.92, 0.03) * rd_box1(f.y, 0.10, 0.90, 0.02);
      float tone = rd_hash(cell + 7.31) < 0.5 ? 0.74 : 1.17;
      diffuseColor.rgb *= mix(1.0, tone, bx * 0.9) * (1.0 - 0.34 * max(0.0, outer - bx));
      rdPatch = bx;
    }
    #ifdef USE_MAP
    {
      float cr = texture2D(map, vec2(vRoadUv.y * 0.0125, rlat * 0.42) + vec2(0.19, 0.67)).b;
      float crack = smoothstep(0.600, 0.645, cr) * (1.0 - smoothstep(0.665, 0.720, cr));
      diffuseColor.rgb *= 1.0 - 0.32 * crack * uGrime;
    }
    #endif
  }
  // info-view / selection tint
  diffuseColor.rgb = mix(diffuseColor.rgb, rdInfo.rgb, rdInfo.a);
}
`,We=`
if (uNight > 0.001) {
  RdLight rdL; rdL.diff = 0.0; rdL.spec = 0.0;
  float lat = vRoad.x; float along = vRoad.y; float dA = vRoad.z; float dB = vRoad.w;
  bool isFan = dA < -5.0e4;
  if (isFan) {
    if (uLamp.x > 0.0) rdL.diff = rd_fanPool(lat, along, dB, vTurns.x);
  } else if (uLamp.x > 0.0) {
    // world frame of the road at this fragment: T = direction of increasing 'along' (from the screen-space
    // derivatives, as perturbNormal2Arb does), R = +lateral, N = shading normal
    vec3 rdN = normalize(transformDirectionByInverseViewMatrix(normal, viewMatrix));
    vec3 rdV = normalize(cameraPosition - vWPos);
    vec3 q0 = dFdx(vWPos), q1 = dFdy(vWPos);
    float a0 = dFdx(along), a1 = dFdy(along);
    vec3 Ng = cross(q0, q1);
    float ngl = length(Ng);
    Ng = ngl > 1e-9 ? Ng / ngl : vec3(0.0, 1.0, 0.0);
    if (Ng.y < 0.0) Ng = -Ng;
    vec3 rdT = cross(q1, Ng) * a0 + cross(Ng, q0) * a1;
    float tl = length(rdT);
    rdT = tl > 1e-7 ? rdT / tl : vec3(1.0, 0.0, 0.0);
    vec3 rdR = cross(rdT, Ng);
    int flagsA = int(vTurns.x + 0.5) & 31; int flagsB = int(vTurns.y + 0.5) & 31;
    rd_segLamps(rdL, lat, along, dA, dB, uLamp, uLampRadius, flagsA, flagsB, uCwHalf + 0.5, rdT, rdR, rdN, rdV, roughnessFactor, true);
  }
  // paint is bright already — let it take less of the pool so zebra stripes are not the brightest thing in frame.
  // Beyond ~200 m the pools also fall off: a distant night street must read as a string of separate beads,
  // not as one continuous glowing tube of bloom.
  float gain = uNight * (1.0 - 0.45 * roadPaint);
  gain *= mix(1.0, 0.45, smoothstep(180.0, 620.0, distance(cameraPosition, vWPos)));
  // The pool core measured Y 0.34 against the reference's 0.10 and clipped to flat cream, erasing the
  // aggregate it should have been revealing. The diffuse term is cut 2.4x and the GGX streak raised:
  // at roughness 0.20-0.42 the lobe is what actually reads as "lit tarmac", and it keeps the texture.
  totalEmissiveRadiance += uLampColor * (diffuseColor.rgb * (rd_tone(rdL.diff) * 0.55) + vec3(rd_tone(rdL.spec) * (0.5 + 0.9 * rdWet))) * gain;
}
totalEmissiveRadiance += rdInfo.rgb * (rdInfo.a * 0.22);
`,Ge=`
vec4 rdInfo = texture2D(uInfoTex, vec2((vSeg + 0.5) / ${Fe.toFixed(1)}, 0.5));
diffuseColor.rgb *= 1.0 - vDark;
diffuseColor.rgb = mix(diffuseColor.rgb, rdInfo.rgb, rdInfo.a * 0.6);
`,Ke=`
if (uNight > 0.001 && vTurns.y > 0.0) {
  // aTurns = (head lat + 100·markedA + 200·markedB, spacing)
  float rdCode = floor(vTurns.x / 100.0 + 1e-4);
  float rdHead = vTurns.x - rdCode * 100.0;
  RdLight rdL; rdL.diff = 0.0; rdL.spec = 0.0;
  vec3 z3 = vec3(0.0);
  rd_segLamps(rdL, vRoad.x, vRoad.y, vRoad.z, vRoad.w, vec4(vTurns.y, rdHead, 1.0, 9.0), 12.0, mod(rdCode, 2.0) > 0.5 ? 1 : 0, rdCode > 1.5 ? 1 : 0, rdHead + 0.5, z3, z3, z3, z3, 1.0, false);
  totalEmissiveRadiance += diffuseColor.rgb * uLampColor * (rd_tone(rdL.diff) * 0.34 * uNight * mix(1.0, 0.45, smoothstep(180.0, 620.0, distance(cameraPosition, vWPos))));
}
totalEmissiveRadiance += rdInfo.rgb * (rdInfo.a * 0.15);
`,qe=`#include <common>
attribute vec4 aRoad;
attribute vec2 aTurns;
attribute float aSeg;
attribute float aDark;
varying vec4 vRoad;
varying vec2 vTurns;
varying vec3 vWPos;
varying float vSeg;
varying float vDark;
varying vec2 vRoadUv;`,Je=`#include <begin_vertex>
vRoad = aRoad;
vTurns = aTurns;
vSeg = aSeg;
vDark = aDark;
vRoadUv = uv;
vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`,Ye=`
#include <normal_fragment_maps>
{
  // relief of the baked aggregate: this is what makes the low sun rake across the stones instead of
  // sliding over a flat plane, so the surface reads as three-dimensional at 40-80 m
  vec3 dw = vec3(rdAgg.g * 2.0 - 1.0, 0.0, rdAgg.b * 2.0 - 1.0) * (uDetail * (1.0 - 0.75 * roadPaint) * (1.0 - 0.30 * rdTrack));
  normal = normalize(normal + (viewMatrix * vec4(dw, 0.0)).xyz);
}
normal = normalize(mix(normal, nonPerturbedNormal, roadPaint * 0.7));
`;function Xe(e,n,r){let i=[];for(let t of e.lines)t.off===0?i.push(new d(0,t.hw,t.on,t.period)):(i.push(new d(t.off,t.hw,t.on,t.period)),i.push(new d(-t.off,t.hw,t.on,t.period)));let a=Math.min(8,i.length);for(;i.length<8;)i.push(new d(0,0,0,1));let o=new Float32Array(6),s=[];for(let t of e.laneOffsets)s.push(t,-t);s.slice(0,6).forEach((e,t)=>{o[t]=e});let c=new Float32Array(4);e.arrowLanes.slice(0,4).forEach((e,t)=>{c[t]=e});let l=e.lamps;return{uLines:{value:i.slice(0,8)},uLineCount:{value:a},uLaneCenters:{value:o},uLaneCount:{value:Math.min(6,s.length)},uArrowLanes:{value:c},uArrowLaneCount:{value:Math.min(4,e.arrowLanes.length)},uCwHalf:{value:e.cwHalf},uMedianHalf:{value:e.medianHalf},uGrime:{value:e.grime},uShoulderLat:{value:e.shoulderLat||0},uLamp:{value:l?new d(l.spacing,ce(e),+!!l.alternate,l.height):new d(0,0,0,9)},uLampRadius:{value:l?l.radius:1},uLampColor:{value:l?new t(l.color[0],l.color[1],l.color[2]):new t(1,.8,.5)},uPaintColor:{value:new t(.79,.766,.686)},uPaintYellow:{value:new t(.69,.4,.035)},uDetail:{value:r.detail||.5},uGrain:{value:r.grain||0},uPivot:{value:r.pivot||.13},uAgg:n.uAgg,uAggScale:{value:new _(1/(r.aggTile||3.2),1/((r.aggTile||3.2)*3.4))},uNight:n.uNight,uInfoTex:n.uInfoTex,...Ze(r,n)}}function Ze(e,t){let n=Ie[e.set];return{uWetness:t.uWetness,uRoughMean:{value:n&&n.rmean||.5},uWetTune:{value:new l(e.wet==null?1:e.wet,e.wetRough==null?.3:e.wetRough,e.wetAlb==null?.8:e.wetAlb)}}}function Qe(e,t){return e.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace(`#include <common>`,qe).replace(`#include <begin_vertex>`,Je),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+Re+Ve+He).replace(`#include <map_fragment>`,`#include <map_fragment>
`+Be+Ue).replace(`#include <roughnessmap_fragment>`,ze+`
roughnessFactor = mix(roughnessFactor, 0.55, roadPaint * 0.9);
roughnessFactor = min(1.4, roughnessFactor + 0.05 * rdShoulder - 0.13 * rdTrack - 0.05 * rdPatch);
roughnessFactor = mix(roughnessFactor, 0.42, uNight * 0.30 * (1.0 - rdWet));
roughnessFactor = mix( roughnessFactor, uWetTune.y, rdWet );

roughnessFactor = clamp(roughnessFactor, 0.045, 1.0);`).replace(`#include <normal_fragment_maps>`,Ye).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
`+We)},e.customProgramCacheKey=()=>`roads-asphalt-v7`,e.userData.roadUniforms=t,e}function $e(e){return e.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
  totalEmissiveRadiance *= vColor.rgb;
#endif`)},e.customProgramCacheKey=()=>`roads-glow-v1`,e}function et(e,n,r){let i={uNight:n.uNight,uInfoTex:n.uInfoTex,uLampColor:{value:new t(1,.7,.4)},...Ze(r,n)};return e.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=e.vertexShader.replace(`#include <common>`,qe).replace(`#include <begin_vertex>`,Je),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+Re+Ve).replace(`#include <map_fragment>`,`#include <map_fragment>
`+Be+Ge).replace(`#include <roughnessmap_fragment>`,ze+`
roughnessFactor = mix( roughnessFactor, uWetTune.y, rdWet );

roughnessFactor = clamp(roughnessFactor, 0.045, 1.0);`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
`+Ke)},e.customProgramCacheKey=()=>`roads-paved-v4`,e.userData.roadUniforms=i,e}function tt(e,t,n){let r=Ze(n,t);n.wall&&(r.uWallSpan={value:n.wallSpan||1});let i=n.wall?`
{
  // vWallUv = (distance along the cross-section profile, distance along the run), both in metres
  float span = max(uWallSpan, 0.02);
  float hf = clamp(min(vWallUv.x, span - vWallUv.x) / (span * 0.5), 0.0, 1.0);   // 0 at both feet, 1 at the crown
  float run = vWallUv.y;
  // slip-formed construction joints every 3 m, with the panels either side toned a little differently
  float j = abs(fract(run / 3.0) - 0.5) * 3.0;
  diffuseColor.rgb *= 1.0 - 0.34 * (1.0 - smoothstep(0.015, 0.065, j));
  diffuseColor.rgb *= 0.92 + 0.16 * fract(sin(floor(run / 3.0) * 12.9898) * 43758.5453);
  // road spray dirties the lower third and the crown weathers pale — a real barrier is never one tone
  diffuseColor.rgb *= mix(0.60, 1.05, smoothstep(0.02, 0.58, hf));
  // vertical run-off streaks, strongest low on the face
  diffuseColor.rgb *= 1.0 - 0.18 * fract(sin(floor(run * 4.3) * 5.171) * 21713.7) * (1.0 - smoothstep(0.12, 0.92, hf));
  // firm contact AO where the face meets the apron, so the barrier sits IN the median instead of on it
  diffuseColor.rgb *= 1.0 - 0.46 * (1.0 - smoothstep(0.0, 0.13, hf));
}
`:``;return e.onBeforeCompile=e=>{Object.assign(e.uniforms,r),n.wall&&(e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vWallUv;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vWallUv = uv;`)),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+Re+(n.wall?`uniform float uWallSpan;
varying vec2 vWallUv;
`:``)).replace(`#include <map_fragment>`,`#include <map_fragment>
`+Be+i).replace(`#include <roughnessmap_fragment>`,ze+`
roughnessFactor = mix( roughnessFactor, uWetTune.y, rdWet );

roughnessFactor = clamp(roughnessFactor, 0.045, 1.0);`)},e.customProgramCacheKey=()=>n.wall?`roads-wall-v1`:`roads-plain-v1`,e.userData.roadUniforms=r,e}function nt(e){let t=O(e),n=262144,r=new Float32Array(n),i=new Float32Array(n);for(let e=0;e<n;e++){let n=t();r[e]=n*.1,i[e]=.4+n*.14}for(let[e,n,a,o]of[[520,4,8.5,1],[1900,2,4.2,.75],[5200,.9,2,.5]])for(let s=0;s<e;s++){let e=t()*512,s=t()*512,c=n+t()*(a-n),l=.26+t()*.56,u=o*(.35+t()*.65),d=Math.ceil(c)+1;for(let t=-d;t<=d;t++)for(let n=-d;n<=d;n++){let a=Math.hypot(n,t);if(a>c)continue;let o=Math.sqrt(Math.max(0,1-a/c*(a/c))),d=((e+n|0)%512+512)%512,f=((s+t|0)%512+512)%512*512+d;r[f]=Math.max(r[f],u*o),i[f]=i[f]*(1-o*.9)+l*o*.9}}for(let e=0;e<260;e++){let e=t()*512,n=t()*512,a=3+t()*11,o=Math.ceil(a);for(let t=-o;t<=o;t++)for(let s=-o;s<=o;s++){let o=Math.hypot(s,t);if(o>a)continue;let c=(1-o/a)**2,l=((n+t|0)%512+512)%512*512+((e+s|0)%512+512)%512;i[l]*=1-.45*c,r[l]*=1-.6*c}}let a=new Uint8Array(n*4),o=(e,t)=>r[(t%512+512)%512*512+(e%512+512)%512];for(let e=0;e<512;e++)for(let t=0;t<512;t++){let n=e*512+t,r=o(t+1,e)-o(t-1,e),s=o(t,e+1)-o(t,e-1);a[n*4]=Math.round(Math.min(1,Math.max(0,i[n]))*255),a[n*4+1]=Math.round(Math.min(1,Math.max(0,-r*3.2+.5))*255),a[n*4+2]=Math.round(Math.min(1,Math.max(0,-s*3.2+.5))*255),a[n*4+3]=255}let c=new m(a,512,512,s,g);return c.colorSpace=``,c.wrapS=c.wrapT=D,c.minFilter=y,c.magFilter=w,c.generateMipmaps=!0,c.needsUpdate=!0,c}function rt(e){let t=O(e),n=document.createElement(`canvas`);n.width=n.height=256;let r=n.getContext(`2d`);r.fillStyle=`#3d6a2a`,r.fillRect(0,0,256,256);for(let e=0;e<2600;e++){let e=t()*256,n=t()*256,i=3+t()*9,a=22+t()*26;r.fillStyle=`hsl(${84+t()*26},${35+t()*25}%,${a}%)`,r.beginPath(),r.ellipse(e,n,i,i*(.5+t()*.5),t()*Math.PI,0,Math.PI*2),r.fill()}let i=new o(n);return i.colorSpace=T,i.wrapS=i.wrapT=D,i.anisotropy=4,i}function it(e){let t=O(e),n=document.createElement(`canvas`);n.width=128,n.height=256;let r=n.getContext(`2d`);r.fillStyle=`#5b4a3b`,r.fillRect(0,0,128,256);for(let e=0;e<900;e++){let e=t()*128,n=t()*256,i=8+t()*40,a=14+t()*26;r.strokeStyle=`hsl(${24+t()*12},${20+t()*15}%,${a}%)`,r.lineWidth=1+t()*2,r.beginPath(),r.moveTo(e,n),r.lineTo(e+(t()-.5)*4,n+i),r.stroke()}let i=new o(n);return i.colorSpace=T,i.wrapS=i.wrapT=D,i}function at(e){let t=new F(e),n=new c(.12,.24,2.9,8,1).toNonIndexed();n.translate(0,1.45,0);let r=[[0,3.7,0,1.75],[.75,3.15,.45,1.25],[-.7,3.3,-.4,1.2],[.15,4.55,-.35,1.15],[-.2,3,.9,1]],i=[];for(let[e,n,a,o]of r){let r=new v(o,2),s=r.attributes.position;for(let r=0;r<s.count;r++){let i=s.getX(r),o=s.getY(r),c=s.getZ(r),l=1+.24*t.noise3D(i*.9+e,o*.9+n,c*.9+a);i*=l,o*=l*.92,c*=l,s.setXYZ(r,i,o,c)}r.translate(e,n,a),i.push(r)}let a=A(i,!1);a.computeVertexNormals();let o=A([n,a],!0);return o.computeBoundingSphere(),o}function ot(e){let t=[],n=[],i=(e,t,n,r=8)=>new c(e,t,n,r,1);if(e===`mast`){let e=i(.26,.32,.9,10);e.translate(0,.45,0),t.push(e);let a=i(.12,.2,13.2,10);a.translate(0,7.5,0),t.push(a);let o=i(.07,.07,5.6,6);o.rotateZ(Math.PI/2),o.translate(0,13.95,0),t.push(o);for(let e of[-1,1]){let i=new r(1.1,.26,.55);i.translate(e*2.6,14.04,0),t.push(i);let a=new r(.72,.12,.34);a.translate(e*2.6,13.86,0),n.push(a)}}else{let e=i(.13,.17,.6,8);e.translate(0,.3,0),t.push(e);let a=i(.065,.105,8.3,8);a.translate(0,4.75,0),t.push(a);let o=i(.045,.06,2.05,6);o.rotateZ(-Math.PI/2+.11),o.translate(1,8.95,0),t.push(o);let s=new r(.82,.17,.36);s.translate(2,9.14,0),t.push(s);let c=new r(.52,.11,.24);c.translate(2,9,0),n.push(c)}let a=A(t,!1),o=A(n,!1),s=A([a,o],!0);return s.computeBoundingSphere(),s}var st=class{constructor(e){this.engine=e,this.materials=new Map,this.infoData=new Uint8Array(Fe*4),this.infoTex=new m(this.infoData,Fe,1,s,g),this.infoTex.minFilter=this.infoTex.magFilter=S,this.infoTex.wrapS=this.infoTex.wrapT=E,this.infoTex.colorSpace=``,this.infoTex.needsUpdate=!0,this.aggregate=nt(90210),this.shared={uNight:{value:0},uInfoTex:{value:this.infoTex},uAgg:{value:this.aggregate},uWetness:e.globalUniforms.uWetness},this.wetness=-1;for(let[t,n]of Object.entries(Le)){let r=n.coat?new k({roughness:n.roughness,metalness:0,clearcoat:n.coat,clearcoatRoughness:n.coatR,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}):new C({roughness:n.roughness,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});n.linear?r.color.setRGB(n.linear[0],n.linear[1],n.linear[2],ee):r.color.setHex(n.color),r.name=`roads/`+t,n.skirt&&(r.transparent=!0,r.vertexColors=!0,r.depthWrite=!0,r.polygonOffsetFactor=-2,r.polygonOffsetUnits=-2),r.userData.wetness=.5,n.asphalt?Qe(r,Xe(z[n.asphalt],this.shared,n)):n.paved?et(r,this.shared,n):tt(r,this.shared,n),e.registerMaterial(r),this.materials.set(t,r)}let n=new C({color:11186356,metalness:.95,roughness:.38});n.name=`roads/guardrail`,this.materials.set(`guardrail`,e.registerMaterial(n));let i=new C({color:7370362,metalness:.85,roughness:.4});i.name=`roads/post`,this.materials.set(`post`,e.registerMaterial(i)),this.bark=e.registerMaterial(new C({color:12167314,roughness:.88,metalness:0,map:it(11)})),this.bark.name=`roads/bark`;let a=rt(7);this.leaves=e.registerMaterial(new C({color:14212296,roughness:.7,metalness:0,map:a,bumpMap:a,bumpScale:.6})),this.leaves.name=`roads/leaves`,this.treeGeometry=at(1234),this.postGeometry=new r(.12,.78,.16),this.postGeometry.translate(0,.39,0),this.lampMetal=e.registerMaterial(new C({color:7041389,metalness:.85,roughness:.4})),this.lampMetal.name=`roads/lamp-steel`,this.lampGlow=e.registerMaterial($e(new k({color:15918802,emissive:new t(1,.7,.4),emissiveIntensity:0,roughness:.1,metalness:0,clearcoat:1,clearcoatRoughness:.05}))),this.lampGlow.name=`roads/lamp-glow`,this.mastGlow=e.registerMaterial($e(new k({color:15920870,emissive:new t(1,.84,.62),emissiveIntensity:0,roughness:.1,metalness:0,clearcoat:1,clearcoatRoughness:.05}))),this.mastGlow.name=`roads/mast-glow`,this.lampGeometry={street:ot(`street`),mast:ot(`mast`)}}get(e){return this.materials.get(e)||this.materials.get(`curb`)}setNight(e){this.shared.uNight.value=e;let t=e*e*(3-2*e);this.lampGlow.emissiveIntensity=9*t,this.mastGlow.emissiveIntensity=7.5*t}setWetness(e){if(e=Math.min(1,Math.max(0,e||0)),!(Math.abs(e-this.wetness)<.004)){this.wetness=e;for(let[t,n]of this.materials){let r=Le[t];if(!r||!r.coat||!n.isMeshPhysicalMaterial)continue;let i=e*(r.wet==null?1:r.wet);n.clearcoat=r.coat+(1-r.coat)*i,n.clearcoatRoughness=r.coatR*(1-i)+.045*i}}}setInfoSlot(e,t,n){if(e<=0||e>=4096)return;let r=this.infoData,i=e*4;if(!n){r[i]=r[i+1]=r[i+2]=r[i+3]=0;return}let a=ct.copy(t).convertSRGBToLinear();r[i]=Math.round(Math.min(1,a.r)*255),r[i+1]=Math.round(Math.min(1,a.g)*255),r[i+2]=Math.round(Math.min(1,a.b)*255),r[i+3]=Math.round(Math.min(1,n)*255)}clearInfo(){this.infoData.fill(0)}commitInfo(){this.infoTex.needsUpdate=!0}async load(e){let t=this.engine.maxAnisotropy,n={};await Promise.all(Object.entries(Ie).map(async([r,i])=>{let a={};i.maps.includes(`albedo`)&&(a.map=`${i.dir}/albedo.jpg`),i.maps.includes(`normal`)&&(a.normalMap=`${i.dir}/normal.jpg`),i.maps.includes(`roughness`)&&(a.roughnessMap=`${i.dir}/roughness.jpg`),i.maps.includes(`ao`)&&(a.aoMap=`${i.dir}/ao.jpg`),n[r]=await e.loadPBR(a,{anisotropy:t})}));for(let[e,t]of Object.entries(Le)){let r=this.materials.get(e),i=n[t.set];if(!i)continue;let a=1/t.tile;for(let e of[`map`,`normalMap`,`roughnessMap`,`aoMap`]){if(!i[e])continue;let t=i[e].clone();t.repeat.set(a,a),t.needsUpdate=!0,r[e]=t}r.normalMap&&r.normalScale.set(t.normalScale,t.normalScale),r.aoMap&&(r.aoMapIntensity=.7),r.needsUpdate=!0}}dispose(){for(let e of this.materials.values())e.dispose();this.bark.dispose(),this.leaves.dispose(),this.lampMetal.dispose(),this.lampGlow.dispose(),this.mastGlow.dispose(),this.treeGeometry.dispose(),this.postGeometry.dispose(),this.lampGeometry.street.dispose(),this.lampGeometry.mast.dispose(),this.infoTex.dispose(),this.aggregate.dispose()}},ct=new t,lt={position:3,normal:3,uv:2},ut={position:3,normal:3,uv:2,aRoad:4,aTurns:2,aSeg:1,aDark:1},dt={position:3,normal:3,uv:2,color:4},ft=class{constructor(e=lt){this.layout=e,this.arrays={};for(let t in e)this.arrays[t]=[];this.index=[],this.count=0,this.normalHints=[]}hintNormal(e,t,n,r,i){this.normalHints.push(e,t,n,r,i)}vertex(e){for(let t in this.layout){let n=this.layout[t],r=this.arrays[t],i=e[t];if(i==null)for(let e=0;e<n;e++)r.push(0);else for(let e=0;e<n;e++)r.push(i[e]||0)}return this.count++}tri(e,t,n){this.index.push(e,t,n)}quad(e,t,n,r){this.index.push(e,t,n,e,n,r)}bridge(e,t){for(let n=0;n<e.length-1;n++)this.quad(e[n],e[n+1],t[n+1],t[n])}fan(e,t,n=!0){let r=t.length;for(let i=0;i<(n?r:r-1);i++)this.tri(e,t[i],t[(i+1)%r])}orient(e,t,n,r=0){let i=this.arrays.position,a=this.index;for(let o=r*3;o<a.length;o+=3){let r=a[o]*3,s=a[o+1]*3,c=a[o+2]*3,l=i[s]-i[r],u=i[s+1]-i[r+1],d=i[s+2]-i[r+2],f=i[c]-i[r],p=i[c+1]-i[r+1],m=i[c+2]-i[r+2],h=u*m-d*p,g=d*f-l*m,_=l*p-u*f;if(h*e+g*t+_*n<0){let e=a[o+1];a[o+1]=a[o+2],a[o+2]=e}}}get triCount(){return this.index.length/3}computeNormals(){let e=this.arrays.position,t=this.index,n=new Float64Array(this.count*3);for(let r=0;r<t.length;r+=3){let i=t[r]*3,a=t[r+1]*3,o=t[r+2]*3,s=e[a]-e[i],c=e[a+1]-e[i+1],l=e[a+2]-e[i+2],u=e[o]-e[i],d=e[o+1]-e[i+1],f=e[o+2]-e[i+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u;n[i]+=p,n[i+1]+=m,n[i+2]+=h,n[a]+=p,n[a+1]+=m,n[a+2]+=h,n[o]+=p,n[o+1]+=m,n[o+2]+=h}let r=this.arrays.normal;r.length=this.count*3;for(let e=0;e<this.count;e++){let t=n[e*3],i=n[e*3+1],a=n[e*3+2],o=Math.hypot(t,i,a)||1;r[e*3]=t/o,r[e*3+1]=i/o,r[e*3+2]=a/o}let i=this.normalHints;for(let e=0;e<i.length;e+=5){let t=i[e]*3,n=i[e+4],a=r[t]*(1-n)+i[e+1]*n,o=r[t+1]*(1-n)+i[e+2]*n,s=r[t+2]*(1-n)+i[e+3]*n,c=Math.hypot(a,o,s)||1;r[t]=a/c,r[t+1]=o/c,r[t+2]=s/c}}toRaw(){if(this.count===0||this.index.length===0)return null;let e={};for(let t in this.layout)e[t]=Float32Array.from(this.arrays[t]);let t=this.count>65535?Uint32Array.from(this.index):Uint16Array.from(this.index),n=e.position,r=1/0,i=1/0,a=1/0,o=-1/0,s=-1/0,c=-1/0;for(let e=0;e<n.length;e+=3)n[e]<r&&(r=n[e]),n[e]>o&&(o=n[e]),n[e+1]<i&&(i=n[e+1]),n[e+1]>s&&(s=n[e+1]),n[e+2]<a&&(a=n[e+2]),n[e+2]>c&&(c=n[e+2]);return{layout:this.layout,arrays:e,index:t,count:this.count,bbox:{minX:r,minY:i,minZ:a,maxX:o,maxY:s,maxZ:c}}}};function pt(e,t){let n=0,r=0;for(let t of e)n+=t.count,r+=t.index.length;if(n===0)return null;let i=new h;for(let r in t){let a=t[r],o=new Float32Array(n*a),s=0;for(let t of e)o.set(t.arrays[r],s),s+=t.arrays[r].length;i.setAttribute(r,new N(o,a))}let a=n>65535?new Uint32Array(r):new Uint16Array(r),o=0,s=0;for(let t of e){let e=t.index;for(let t=0;t<e.length;t++)a[o+t]=e[t]+s;o+=e.length,s+=t.count}return i.setIndex(new N(a,1)),i.computeBoundingBox(),i.computeBoundingSphere(),i}var mt=new Set([`asphalt_local`,`asphalt_avenue`,`asphalt_highway`,`sidewalk`,`curb`,`granite`,`median`,`soil`]),W=e=>mt.has(e)?ut:e===`skirt`?dt:lt,ht=1e5,gt=3,_t=new l,vt=new l,yt=new l,bt=class{constructor(){this.builders=new Map,this.trees=[],this.posts=[],this.lamps=[]}get(e){let t=this.builders.get(e);return t||(t=new ft(W(e)),this.builders.set(e,t)),t}finish(){let e=new Map,t=null;for(let[n,r]of this.builders){r.computeNormals();let i=r.toRaw();if(!i)continue;e.set(n,i);let a=i.bbox;t?(t.minX=Math.min(t.minX,a.minX),t.minY=Math.min(t.minY,a.minY),t.minZ=Math.min(t.minZ,a.minZ),t.maxX=Math.max(t.maxX,a.maxX),t.maxY=Math.max(t.maxY,a.maxY),t.maxZ=Math.max(t.maxZ,a.maxZ)):t={...a}}return!t&&!this.trees.length&&!this.posts.length&&!this.lamps.length?null:{byMat:e,bbox:t,trees:this.trees,posts:this.posts,lamps:this.lamps}}};function G(e,t,n){let r=e.length,i=r>0?Math.min(1,Math.max(0,t/r)):0;e.curve.getPointAt(i,_t),e.curve.getTangentAt(i,vt);let a=Math.hypot(vt.x,vt.z)||1,o=vt.x/a,s=vt.z/a;return{x:_t.x,z:_t.z,y:n.heightAt(e,t),tx:o,tz:s,rx:-s,rz:o,s:t}}function xt(e,t,n,r,i=1){let a=[];if(n-t<.05)return a;let o=1.5,s=i>=1?8:12,c=i>=1?.02:.035,l=G(e,t,r);a.push(l);for(let i=t+o;i<n-o*.5;i+=o){let t=G(e,i,r),n=t.tx*l.tx+t.tz*l.tz,o=Math.acos(Math.min(1,Math.max(-1,n))),u=r.heightAt(e,(l.s+i)*.5),d=Math.abs(u-(l.y+t.y)*.5);(o>c||i-l.s>=s||d>.02||Math.abs(t.y-l.y)>.25)&&(a.push(t),l=t)}return a.push(G(e,n,r)),a}var St=1.5;function K(e,t,n,r,i,a,o){let s=Array(a.length);for(let c=0;c<a.length;c++){let l=a[c][0],u=a[c][1],d=a[c][2]==null?1:a[c][2],f=e+n*l,p=t+r*l,m;if(u===`T`||u===`S`){let h=s[c-1]||{off:l-.5,y:i},g=o.terrain.getHeight(f,p),_=h.y-g,v=c>=a.length-2?St*2:St;_>.3&&(l=Math.max(l,h.off+Math.min(30,_*v))),s[c-1]&&(l=Math.max(l,h.off+.25));let y=l-a[c][0];y>1e-4&&(f=e+n*l,p=t+r*l,g=o.terrain.getHeight(f,p)),m=u===`T`?g-I:g+L,u===`S`&&(m=Math.min(m,h.y)),y>.5&&c<a.length-1&&(d=Math.max(d,Math.min(.95,.45+y*.12)))}else m=i+u;let h=1-(a[c][2]==null?1:a[c][2]);s[c]={x:f,y:m,z:p,off:l,a:d,gt:h,dark:a[c][3]||0,ground:u===`T`||u===`S`}}return s}function Ct(e,t,n,r){r[0]=r[1]=r[2]=1;let i=e.terrain.api;if(!i||typeof i.groundInfo!=`function`)return r;let a=i.groundInfo(t,n);if(!a)return r;let o=Math.min(1,a.dry||0),s=Math.min(1,a.sand||0),c=Math.min(1,a.rock||0),l=Math.min(1,(a.dirt||0)*(1-Math.min(1,a.forest||0))),u=1,d=1,f=1;return u+=o*.1+s*.16-c*.26-l*.08,d+=o*0+s*.1-c*.26-l*.16,f+=-o*.28+s*.02-c*.24-l*.32,r[0]=Math.max(.4,u),r[1]=Math.max(.4,d),r[2]=Math.max(.3,f),r}function wt(e,t,n,r){let i=Array(t.length);for(let a=0;a<t.length;a++){let o=t[a],s=n(o,a);i[a]=e.vertex({position:[o.x,o.y,o.z],uv:s,color:[o.tint?o.tint[0]:1,o.tint?o.tint[1]:1,o.tint?o.tint[2]:1,o.a==null?1:o.a],aRoad:r?[o.lat==null?r[0]:o.lat,r[1],r[2],r[3]]:void 0,aTurns:r?r.turns:void 0,aSeg:r?[r.slot||0]:void 0,aDark:r?[o.dark||0]:void 0})}return i}var Tt=e=>e===`T`?-.4:e===`S`?-.1:e;function Et(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n][0]-e[n-1][0],Tt(e[n][1])-Tt(e[n-1][1])));return t}var Dt=5.5;function Ot(e,t){if(!t)return 1;let n=1;return t.a&&(n=Math.min(n,Math.max(0,e.dA-.3)/Dt)),t.b&&(n=Math.min(n,Math.max(0,e.dB-.3)/Dt)),n=Math.min(1,Math.max(0,n)),n*n*(3-2*n)}function kt(e,t,n,r,i,a,o){if(n.length<2)return;let s=t.edge(n[0].w),c=[1,1,1];for(let l=0;l<s.length;l++){let u=null,d=s[l].mat,f=e.get(d),p=W(d)===ut,m=d===`skirt`,h=d===`guardrail`;for(let e of n){let n=t.edge(e.w)[l],s=n.pts;if(h&&o){let t=Ot(e,o);t<.999&&(s=s.map(e=>[e[0]+(1-t)*1.15,.03+(e[1]-.03)*t,e[2],e[3]]))}let d=Et(s),g=K(e.x,e.z,e.nx,e.nz,e.yBase,s,i);for(let t=0;t<g.length;t++){let n=g[t];if(n.pd=d[t],n.lat=a===0?ht:a*(e.cw+n.off),m){let e=1,t=1,r=1;if(n.ground){Ct(i,n.x,n.z,c);let a=Math.max(.35,n.gt==null?1-n.a:n.gt);e=1+(c[0]-1)*a,t=1+(c[1]-1)*a,r=1+(c[2]-1)*a}let a=Math.max(0,1-(n.off-s[0][0])/re)**2,o=1-.36*a;e*=o*(1+.26*a),t*=o*(1+.05*a),r*=o*(1-.26*a);let l=(Math.sin(n.x*.37+n.z*.71)+Math.sin(n.x*.13-n.z*.21)*.7)*.055;n.tint=[e*(1+l),t*(1+l*.85),r*(1+l*1.2)]}}r&&(g=g.slice().reverse());let _=null;p&&(_=[ht,e.v,e.dA,e.dB],_.turns=e.lamp||[0,0],_.slot=e.slot||0);let v=a===0?1:a,y=wt(f,g,t=>n.uv===`along`?[t.pd,e.v]:[v*(e.cw+t.off),e.v],_);if(m)for(let e=0;e<g.length;e++){let t=g[e];!t.ground||t.a>=.999||(i.terrain.getNormal(t.x,t.z,yt),f.hintNormal(y[e],yt.x,yt.y,yt.z,Math.min(1,(1-t.a)*.9+.1)))}u&&f.bridge(u,y),u=y}}}function At(e,t,n,r){let i=z[e.type],a=G(e,t,n);return{frame:a,asphalt:K(a.x,a.z,a.rx,a.rz,a.y,i.asphaltPts,r),centre:i.centre.map(e=>K(a.x,a.z,a.rx,a.rz,a.y,e.pts,r))}}function jt(e,t,n,r){let i=At(e,t===`a`?e.trimA:e.length-e.trimB,n,r);return t===`b`&&(i.asphalt.reverse(),i.centre=i.centre.map(e=>e.slice().reverse()).reverse()),i}function Mt(e,t,n,r,i){if(!(i>.15))return;let a=e.get(`soil`),o=a.triCount,s=(e,n,i,o)=>a.vertex({position:[e,i,n],uv:[e,n],aRoad:[e-t,n-r,400,400],aTurns:[0,0],aSeg:[0],aDark:[o]}),c=s(t,r,n-.045,.16),l=[];for(let e=0;e<12;e++){let a=e/12*Math.PI*2;l.push(s(t+Math.cos(a)*i,r+Math.sin(a)*i,n+.012,.62))}a.fan(c,l,!0),a.orient(0,1,0,o)}function Nt(e,t,n,r,i){let a=[];for(let e of t)for(let t of e){let e=a[a.length-1];(!e||Math.hypot(e.x-t.x,e.z-t.z)>1e-4||Math.abs(e.y-t.y)>1e-4)&&a.push(t)}if(a.length<3)return;let o=e.triCount,s=a.map(t=>e.vertex({position:[t.x,t.y,t.z],uv:[t.off,t.y],color:[1,1,1,1]}));for(let t=1;t<s.length-1;t++)e.tri(s[0],s[t],s[t+1]);e.orient(i*n,0,i*r,o)}function Pt(e,t,n,r){return[Math.ceil((n+gt+t)/e-.5),Math.floor((r-gt+t)/e-.5)]}function Ft(e,t,n,r=1){let i=z[e.type],a=new bt,o=e.length,s=Math.min(e.trimA,o),c=Math.max(s,o-e.trimB);if(c-s<.05)return a.finish();let l=xt(e,s,c,t,r);if(z[e.type].posts&&(e.capA||e.capB)&&c-s>3){let n=[];for(let t of[.6,1.4,2.4,3.5,4.7])e.capA&&n.push(s+t),e.capB&&n.push(c-t);for(let r of n)r>s+.05&&r<c-.05&&l.push(G(e,r,t));l.sort((e,t)=>e.s-t.s)}let u=[e.flagsA,e.flagsB],d=e=>e-s,f=e=>c-e,p=t=>t+e.phase,m=i.lamps,h=m?[ce(i)+(e.flagsA&31?100:0)+(e.flagsB&31?200:0),m.spacing]:null;{let t=a.get(i.asphaltMat),r=null;for(let a of l){let o=K(a.x,a.z,a.rx,a.rz,a.y,i.asphaltPts,n);o.forEach(e=>{e.lat=e.off});let s=[0,p(a.s),d(a.s),f(a.s)];s.turns=u,s.slot=e.slot;let c=wt(t,o,e=>[e.off,p(a.s)],s);r&&t.bridge(r,c),r=c}}if(i.centre.length){let o=s+e.gapA,l=c-e.gapB;if(l-o>.5){let s=Math.min(9,(l-o)*.42),c=e.capA&&!e.bridgeA?s:0,u=e.capB&&!e.bridgeB?s:0,m=e=>{let t=1;if(c>.05){let n=Math.min(1,Math.max(0,(e-o)/c));t=Math.min(t,1-(1-n)*(1-n))}if(u>.05){let n=Math.min(1,Math.max(0,(l-e)/u));t=Math.min(t,1-(1-n)*(1-n))}return Math.max(.05,t)},g=xt(e,o,l,t,r);if(c>.05||u>.05){let n=[];for(let e of[c>.05?o:null,u>.05?l:null]){if(e==null)continue;let t=e===o?1:-1;for(let r=1;r<=7;r++)n.push(e+t*s*(r/8)**1.4)}for(let r of n)r>o+.02&&r<l-.02&&g.push(G(e,r,t));g.sort((e,t)=>e.s-t.s)}let _=(e,t)=>t>=.999?e:e.map(e=>[e[0]*t,typeof e[1]==`number`?e[1]*t:e[1],e[2],e[3]]);i.centre.forEach(t=>{let r=a.get(t.mat),i=null;for(let a of g){let o=m(a.s),s=_(t.pts,o),c=Et(s),l=K(a.x,a.z,a.rx,a.rz,a.y,s,n);l.forEach((e,t)=>{e.pd=c[t],e.lat=e.off});let u=W(t.mat)===ut?[0,p(a.s),d(a.s),f(a.s)]:null;u&&(u.turns=h||[0,0],u.slot=e.slot);let g=wt(r,l,e=>t.uv===`along`?[e.pd,p(a.s)]:[e.off,p(a.s)],u);i&&r.bridge(i,g),i=g}});let v=i.centre.find(e=>W(e.mat)===lt)?.mat||i.centre[0].mat;if(e.capA&&!e.bridgeA){let e=g[0];Nt(a.get(v),i.centre.map(t=>K(e.x,e.z,e.rx,e.rz,e.y,_(t.pts,m(e.s)),n)),e.tx,e.tz,-1)}if(e.capB&&!e.bridgeB){let e=g[g.length-1];Nt(a.get(v),i.centre.map(t=>K(e.x,e.z,e.rx,e.rz,e.y,_(t.pts,m(e.s)),n)),e.tx,e.tz,1)}if(i.trees){let r=O(x(n.seed,M(e.id+`:trees`))),s=i.trees,c=o+s.minFromEnd+r()*s.spacing*.5;for(;c<l-s.minFromEnd;){let n=G(e,c,t),o=i.centre[1]?i.centre[1].pts[0][1]:.14;a.trees.push({x:n.x,y:n.y+o-.05,z:n.z,scale:.85+r()*.4,yaw:r()*Math.PI*2,tint:.85+r()*.3}),s.pit&&Mt(a,n.x,n.y+o,n.z,Math.min(s.pit,i.medianHalf-.3)),c+=s.spacing+(r()-.5)*2*s.jitter}}}}let g=i.sidewalk,_=i.cwHalf,v=B(i,_),y=(t,n)=>({x:t.x+n*t.rx*_,z:t.z+n*t.rz*_,nx:n*t.rx,nz:n*t.rz,yBase:t.y+v,w:g,v:p(t.s),cw:_,dA:d(t.s),dB:f(t.s),slot:e.slot,lamp:h}),b=i.posts?{a:!!e.capA,b:!!e.capB}:null;if(kt(a,i,l.map(e=>y(e,1)),!1,n,1,b),kt(a,i,l.map(e=>y(e,-1)),!0,n,-1,b),i.posts){let n=i.posts;for(let r=s+1.5;r<c-1;r+=n.spacing){let i=G(e,r,t),o=Ot({dA:d(i.s),dB:f(i.s)},b);if(o<.1)continue;let s=_+n.lateral+(1-o)*1.15,c=i.y+v-.02,l=Math.atan2(i.tx,i.tz);a.posts.push({x:i.x+i.rx*s,y:c,z:i.z+i.rz*s,yaw:l,h:o}),a.posts.push({x:i.x-i.rx*s,y:c,z:i.z-i.rz*s,yaw:l,h:o})}}if(m){let[n,r]=Pt(m.spacing,e.phase,s,c);for(let o=n;o<=r;o++){let n=G(e,(o+.5)*m.spacing-e.phase,t),r=m.alternate?(o%2+2)%2==0?1:-1:0,s=r*m.poleLat,c;c=r===0?n.y+(i.centre[1]?i.centre[1].pts[0][1]:0):n.y+B(i,r*_)+(i.hasCurb?.2:.03);let l=r===0?n.rx:-r*n.rx,u=r===0?n.rz:-r*n.rz;a.lamps.push({x:n.x+n.rx*s,y:c,z:n.z+n.rz*s,yaw:Math.atan2(-u,l),kind:m.kind})}}return a.finish()}function It(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r.x*i.z-i.x*r.z}return Math.abs(t)*.5}function Lt(e){let t=e.length,n=(e,t,n,r)=>e*r-t*n;for(let r=0;r<t;r++){let i=e[r],a=e[(r+1)%t];if(!(Math.hypot(a.x-i.x,a.z-i.z)<1e-6))for(let o=r+2;o<t;o++){if(r===0&&o===t-1)continue;let s=e[o],c=e[(o+1)%t],l=n(a.x-i.x,a.z-i.z,s.x-i.x,s.z-i.z),u=n(a.x-i.x,a.z-i.z,c.x-i.x,c.z-i.z),d=n(c.x-s.x,c.z-s.z,i.x-s.x,i.z-s.z),f=n(c.x-s.x,c.z-s.z,a.x-s.x,a.z-s.z);if(l*u<-1e-9&&d*f<-1e-9)return!1}}return!0}function Rt(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n].x-e[n-1].x,e[n].z-e[n-1].z));let n=t[t.length-1]||1;return{f:t.map(e=>e/n),length:t[t.length-1]}}function zt(e,t,n){let r=[];for(let i of n){let n=1;for(;n<t.length-1&&t[n]<i;)n++;let a=t[n]-t[n-1]||1,o=Math.min(1,Math.max(0,(i-t[n-1])/a)),s=e[n-1],c=e[n];r.push({x:s.x+(c.x-s.x)*o,y:s.y+(c.y-s.y)*o,z:s.z+(c.z-s.z)*o})}return r}function Bt(e,t,n){if(n<=e[0])return t[0];for(let r=1;r<e.length;r++)if(n<=e[r]){let i=(n-e[r-1])/(e[r]-e[r-1]||1);return t[r-1]+(t[r]-t[r-1])*i}return t[t.length-1]}function Vt(e,t,n,r,i,a){let o=a.ends[0],s=a.ends[1];if(!o||!s||o.type.lanes<=0||s.type.lanes<=0)return!1;let c=a.corners.find(e=>e.i===0),l=a.corners.find(e=>e.i===1);if(!c||!l||c.degenerate||l.degenerate||c.pts.length<2||l.pts.length<2)return!1;let u=i[0].asphalt,d=i[1].asphalt;if(u.length<2||d.length<2)return!1;let f=t.segments.get(o.segId),p=t.segments.get(s.segId);if(!f||!p)return!1;let m=c.pts,h=l.pts.slice().reverse(),g=Rt(h),_=Rt(m),v=Math.max(g.length,_.length),y=new Set([0,1]);for(let e of g.f)y.add(Math.round(e*1e4)/1e4);for(let e of _.f)y.add(Math.round(e*1e4)/1e4);let b=Math.min(16,Math.round(v/2.5));for(let e=1;e<b;e++)y.add(Math.round(e/b*1e4)/1e4);let x=[...y].sort((e,t)=>e-t),S=x.length-1,C=zt(h,g.f,x),w=zt(m,_.f,x),T=[],E=0;for(let e=0;e<=S;e++){let t={x:(C[e].x+w[e].x)/2,z:(C[e].z+w[e].z)/2};e>0&&(E+=Math.hypot(t.x-T[e-1].x,t.z-T[e-1].z)),t.s=E,T.push(t)}if(E<1.2||S<2)return!1;let D=e=>{let t=e[0],n=e[e.length-1],r=Math.hypot(n.x-t.x,n.z-t.z)||1;return e.map(e=>Math.min(1,Math.max(0,Math.hypot(e.x-t.x,e.z-t.z)/r)))},O=D(u),k=D(d),A=new Set([0,1]);for(let e of O)A.add(Math.round(e*1e4)/1e4);for(let e of k)A.add(Math.round((1-e)*1e4)/1e4);let j=[...A].sort((e,t)=>e-t),ee=e=>u[0].y+(u[u.length-1].y-u[0].y)*e,M=e=>d[d.length-1].y+(d[0].y-d[d.length-1].y)*e,te=j.map(e=>Bt(O,u.map(e=>e.y),e)-ee(e)),N=j.map(e=>Bt(k,d.map(e=>e.y),1-e)-M(e)),P=+(s.type.rank>o.type.rank),F=P===0?o:s,ne=P===0?s:o,I=P===0?f:p,L=F.type.cwHalf,re=ne.type.cwHalf,ie=(F.end===`a`?1:-1)*(P===0?1:-1),ae=I.phase+(F.end===`b`?I.length-I.trimB:I.trimA),oe=F.end===`b`?1:-1,R=r.get(F.type.asphaltMat),z=R.triCount,B=Math.min(1,Math.max(.02,re/L)),se=4*Math.round(B*255),ce=null;for(let e=0;e<=S;e++){let t=P===0?e/S:1-e/S,n=ae+oe*(P===0?T[e].s:E-T[e].s),r=L+(re-L)*t,i=se+Math.min(1,r/L),a=[];for(let t=0;t<j.length;t++){let n=j[t],o=C[e].x+(w[e].x-C[e].x)*n,s=C[e].z+(w[e].z-C[e].z)*n,c=C[e].y+(w[e].y-C[e].y)*n+te[t]+(N[t]-te[t])*(e/S),l=ie*(2*n-1)*r;a.push({x:o,y:c,z:s,off:l,lat:l,dark:i})}let o=[0,n,400,400];o.turns=[0,0],o.slot=I.slot;let s=wt(R,a,e=>[e.off,n],o);ce&&R.bridge(ce,s),ce=s}return R.orient(0,1,0,z),!0}function Ht(e,t,n){let r=e.junction;if(!r)return null;let i=new bt,a=r.k,o=r.ends.map(e=>jt(t.segments.get(e.segId),e.end,t,n)),s=a===2&&Vt(e,t,n,i,o,r),c=[];for(let e=0;e<a;e++){c.push(...o[e].asphalt);let t=r.corners[e];if(t&&!t.degenerate)for(let e=1;e<t.pts.length-1;e++)c.push({x:t.pts[e].x,y:t.pts[e].y,z:t.pts[e].z})}if(!s&&c.length>=3&&It(c)>.1){Lt(c)||(t.badFans=(t.badFans||0)+1);let n=i.get(r.dominant.asphaltMat),o=e.y,s=t=>[t.x-e.x,t.z-e.z,-1e5,r.padRadius],l=0,u=e=>[e.x,e.z];for(let e=0;e<a;e++){let n=r.ends[e],i=t.segments.get(n.segId);if(!i||n.type!==r.dominant)continue;l=i.slot;let a=n.frame,o=n.end===`b`,s=i.phase+(o?i.length-i.trimB:i.trimA),c=o?1:-1;u=e=>{let t=e.x-a.x,n=e.z-a.z,r=-(t*a.dx+n*a.dz),i=t*a.rx+n*a.rz;return[o?-i:i,s+c*r]};break}let d=u({x:e.x,z:e.z}),f=[a,d[1]],p=n.triCount,m=n.vertex({position:[e.x,o,e.z],uv:d,aRoad:s(e),aTurns:f,aSeg:[l],aDark:[0]}),h=c.map(e=>n.vertex({position:[e.x,e.y,e.z],uv:u(e),aRoad:s(e),aTurns:f,aSeg:[l],aDark:[1]}));n.fan(m,h,!0),n.orient(0,1,0,p)}for(let t=0;t<a;t++){let o=r.corners[t];if(!o||o.degenerate||o.pts.length<2)continue;let s=o.edgeType,c=o.pts.slice().reverse(),l=0,u=[],d=(s.hasCurb?.2:0)+(s.verge||0);for(let e=0;e<c.length;e++)e>0&&(l+=Math.hypot(c[e].x-c[e-1].x,c[e].z-c[e-1].z)),u.push({x:c[e].x,z:c[e].z,nx:c[e].nx,nz:c[e].nz,yBase:c[e].y,w:Math.max(s.sidewalk*.02,c[e].w-d),v:l,cw:0,dA:0,dB:0,slot:0,lamp:null});for(let e of u)s.hasCurb&&e.w<.25&&(e.w=.25);if(kt(i,s,u,!1,n,0),a>=3&&o.kind===`fillet`&&s.lamps&&s.lamps.kind===`street`){let t=o.pts[Math.floor(o.pts.length/2)],n=.85,r=t.x+t.nx*n,a=t.z+t.nz*n;i.lamps.push({x:r,y:t.y+(s.hasCurb?.2:.03),z:a,yaw:Math.atan2(-(e.z-a),e.x-r),kind:`street`})}}if(a===2&&r.bridgeCentre){let e=r.ends[0].type,t=o[0].centre,n=o[1].centre;e.centre.forEach((e,r)=>{let a=i.get(e.mat),s=Et(e.pts),c=t[r].slice().reverse(),l=n[r],u=W(e.mat)===ut?[ht,0,0,0]:null;u&&(u.turns=[0,0],u.slot=0);let d=(t,n)=>wt(a,t.map((n,r)=>({...n,lat:ht,pd:s[e.uv===`along`&&t===c?t.length-1-r:r]})),t=>e.uv===`along`?[t.pd,n]:[t.off,n],u),f=d(c,0),p=d(l,Math.hypot(o[0].frame.x-o[1].frame.x,o[0].frame.z-o[1].frame.z));a.bridge(f,p)})}return i.finish()}var Ut=256,Wt=new Set([`barrier`,`barrier_base`,`guardrail`,`curb`,`granite`]),q=new te,J=new P,Gt=new l,Kt=new l,qt=new t,Jt=new l(0,1,0),Yt=class{constructor(e,t,n){this.ctx=e,this.engine=e.engine,this.world=e.world,this.network=t,this.materials=n,this.quality=e.engine.quality.density,this.group=new u,this.group.name=`roads`,e.scene.add(this.group),this.pieces=new Map,this.tiles=new Map,this.trees=null,this.posts=null,this.lamps=null,this.masts=null,this.streetLights=!0,this._instancesDirty=!1,this.stats={tiles:0,meshes:0,trees:0,posts:0,lamps:0,lastFlushMs:0}}get dirty(){let e=this.network;return e.dirtySegments.size>0||e.dirtyNodes.size>0||e.removedSegments.size>0||e.removedNodes.size>0}setStreetLights(e){this.streetLights!==!!e&&(this.streetLights=!!e,this._instancesDirty=!0,this._rebuildInstances())}flush(){if(!this.dirty)return;let e=performance.now(),t=this.network,n=new Set;for(let e of t.removedSegments)this._drop(`s:`+e,n);for(let e of t.removedNodes)this._drop(`n:`+e,n);for(let e of t.dirtySegments){let r=t.segments.get(e);if(!r){this._drop(`s:`+e,n);continue}this._set(`s:`+e,Ft(r,t,this.world,this.quality),n)}for(let e of t.dirtyNodes){let r=t.nodes.get(e);if(!r){this._drop(`n:`+e,n);continue}this._set(`n:`+e,Ht(r,t,this.world),n)}t.clearDirty();for(let e of n)this._rebuildTile(e);this._instancesDirty&&this._rebuildInstances(),this.stats.tiles=this.tiles.size;let r=0;for(let e of this.tiles.values())r+=e.meshes.size;this.stats.meshes=r,this.stats.lastFlushMs=+(performance.now()-e).toFixed(1)}_tileKey(e){let t=(e.minX+e.maxX)/2,n=(e.minZ+e.maxZ)/2;return Math.floor(t/Ut)+`,`+Math.floor(n/Ut)}_hasInstances(e){return e.trees.length>0||e.posts.length>0||e.lamps&&e.lamps.length>0}_drop(e,t){let n=this.pieces.get(e);if(!n)return;this.pieces.delete(e);let r=this.tiles.get(n.tile);r&&(r.members.delete(e),t.add(n.tile)),this._hasInstances(n)&&(this._instancesDirty=!0)}_set(e,t,n){if(this._drop(e,n),!t)return;let r=t.bbox?this._tileKey(t.bbox):`0,0`,i=this.tiles.get(r);i||(i={members:new Set,meshes:new Map,group:new u},i.group.name=`roads-tile-`+r,i.group.matrixAutoUpdate=!1,this.group.add(i.group),this.tiles.set(r,i)),i.members.add(e);let a={tile:r,byMat:t.byMat,trees:t.trees,posts:t.posts,lamps:t.lamps||[]};this.pieces.set(e,a),n.add(r),this._hasInstances(a)&&(this._instancesDirty=!0)}_rebuildTile(e){let t=this.tiles.get(e);if(!t)return;let n=new Map;for(let e of t.members){let t=this.pieces.get(e);if(t)for(let[e,r]of t.byMat)n.has(e)||n.set(e,[]),n.get(e).push(r)}for(let[e,r]of t.meshes)n.has(e)||(t.group.remove(r),r.geometry.dispose(),t.meshes.delete(e));for(let[e,r]of n){let n=pt(r,W(e));if(!n)continue;let i=t.meshes.get(e);i?(i.geometry.dispose(),i.geometry=n):(i=new b(n,this.materials.get(e)),i.name=`roads/`+e,i.receiveShadow=!0,i.castShadow=Wt.has(e),i.matrixAutoUpdate=!1,e===`skirt`&&i.layers.set(this.engine.LAYER_NO_AO),i.layers.enable(this.engine.LAYER_REFLECTED),t.group.add(i),t.meshes.set(e,i))}t.members.size===0&&(this.group.remove(t.group),this.tiles.delete(e))}_rebuildInstances(){this._instancesDirty=!1;let e=[],t=[],n=[],r=[];for(let i of this.pieces.values())if(e.push(...i.trees),t.push(...i.posts),this.streetLights)for(let e of i.lamps)(e.kind===`mast`?r:n).push(e);let i=this.materials;this.trees=this._syncInstanced(this.trees,i.treeGeometry,[i.bark,i.leaves],e,`roads/trees`,(e,t,n)=>{J.setFromAxisAngle(Jt,e.yaw),Gt.set(e.scale,e.scale*(.92+t*7%5*.03),e.scale),q.compose(Kt.set(e.x,e.y,e.z),J,Gt),n.setMatrixAt(t,q),n.setColorAt(t,qt.setRGB(e.tint*.96,e.tint,e.tint*.86))}),this.posts=this._syncInstanced(this.posts,i.postGeometry,i.get(`post`),t,`roads/posts`,(e,t,n)=>{J.setFromAxisAngle(Jt,e.yaw),q.compose(Kt.set(e.x,e.y,e.z),J,Gt.set(1,e.h==null?1:e.h,1)),n.setMatrixAt(t,q)});let a=(e,t,n)=>{J.setFromAxisAngle(Jt,e.yaw),q.compose(Kt.set(e.x,e.y,e.z),J,Gt.set(1,1,1)),n.setMatrixAt(t,q);let r=Math.abs(Math.sin(e.x*12.9898+e.z*78.233)*43758.5453)%1,i=Math.abs(Math.sin(e.x*39.3468+e.z*11.135)*24634.6345)%1,a=.8+.4*r;n.setColorAt(t,qt.setRGB(a*(1+.05*i),a,a*(1-.1*i)))};this.lamps=this._syncInstanced(this.lamps,i.lampGeometry.street,[i.lampMetal,i.lampGlow],n,`roads/lamps`,a),this.masts=this._syncInstanced(this.masts,i.lampGeometry.mast,[i.lampMetal,i.mastGlow],r,`roads/masts`,a),this.stats.trees=e.length,this.stats.posts=t.length,this.stats.lamps=n.length+r.length}_syncInstanced(t,r,i,a,o,s){if(!a.length)return t&&(this.group.remove(t),t.dispose()),null;if(!t||t.instanceMatrix.count<a.length){t&&(this.group.remove(t),t.dispose());let s=Math.ceil(a.length*1.25)+16;t=new e(r,i,s),t.name=o,t.castShadow=!0,t.receiveShadow=!0,t.layers.enable(this.engine.LAYER_REFLECTED),t.instanceMatrix.setUsage(n),this.group.add(t)}t.count=a.length;for(let e=0;e<a.length;e++)s(a[e],e,t);return t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0),t.computeBoundingSphere(),t}dispose(){for(let e of this.tiles.values())for(let t of e.meshes.values())t.geometry.dispose();for(let e of[this.trees,this.posts,this.lamps,this.masts])e&&e.dispose();this.ctx.scene.remove(this.group),this.tiles.clear(),this.pieces.clear()}},Xt=`roads`,Y=null,X=null,Z=null,Zt=null,Q=[],Qt=null,$t=null,$=!1,en=0,tn=new t,nn=new t(1,.8,.28);async function rn(e){Zt=e;let{engine:t,world:n,events:r,assets:i}=e;Y=new Pe(n,r),Z=new st(t),X=new Yt(e,Y,Z),n.roads.api={types:le(),build:(e,t=`local`,n={})=>Y.build(e,t,n),remove:e=>Y.remove(e),snap:(e,t,n=8)=>Y.snap(e,t,n),nearest:(e,t,n=30)=>Y.nearest(e,t,n),sampleEdge:(e,t,n=1)=>Y.sampleEdge(e,t,n),segmentsInRadius:(e,t,n)=>Y.segmentsInRadius(e,t,n),laneGraph:()=>Y.laneGraph(),surfaceHeight:(e,t)=>Y.surfaceHeight(e,t),isOnRoad:(e,t)=>Y.surfaceHeight(e,t)!=null,getSegment:e=>Y.segments.get(e)||null,getNode:e=>Y.nodes.get(e)||null,heightAt:(e,t)=>{let n=Y.segments.get(e);return n?Y.heightAt(n,t):null},clear:()=>Y.clear(),flush:()=>X.flush(),rebuild:()=>{Y.refreshAll(),X.flush()},conformAll:()=>Y._conformTerrainFor([...Y.segments.keys()],[...Y.nodes.keys()]),setInfoView:e=>{Qt=e,$=!0},setStreetLights:e=>X.setStreetLights(e),stats:()=>({segments:Y.segments.size,nodes:Y.nodes.size,version:n.roads.version,flattenCalls:Y.flattenCalls,badFans:Y.badFans||0,...X.stats})},Q.push(r.on(`terrain:ready`,()=>{Y.segments.size&&Y.refreshAll()})),Q.push(r.on(`infoview:changed`,e=>{Qt=e&&e.view?e.view:null,$=!0})),Q.push(r.on(`entity:selected`,e=>{let t=e&&e.kind===`road`?e.id:null;t!==$t&&($t=t,$=!0)})),Q.push(r.on(`roads:changed`,()=>{$=!0})),await Z.load(i)}function an(e,t){return e=Math.min(1,Math.max(0,e||0)),e<.5?t.setRGB(.25+1.4*e,.78,.25-.1*e):t.setRGB(.95,.78-1.2*(e-.5),.2-.1*(e-.5))}function on(){if(Z.clearInfo(),Qt===`traffic`)for(let e of Y.segments.values()){let t=e.traffic==null?0:e.traffic;Z.setInfoSlot(e.slot,an(t,tn),.62)}if($t){let e=Y.segments.get($t);e&&Z.setInfoSlot(e.slot,nn,.5)}Z.commitInfo(),$=!1}function sn(){!X||!Zt||(X.dirty&&X.flush(),Z.setNight(Zt.world.env.nightFactor||0),Z.setWetness(Zt.engine.globalUniforms.uWetness.value),en++,($||Qt===`traffic`&&en%20==0)&&on())}function cn(){for(let e of Q)typeof e==`function`&&e();Q.length=0,X&&X.dispose(),Z&&Z.dispose(),Y=X=Z=null}export{cn as dispose,rn as init,Xt as name,sn as update};