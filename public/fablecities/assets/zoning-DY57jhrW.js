import{A as e,Bt as t,Gt as n,J as r,Kt as i,Nt as a,T as o,Vt as s,W as c,dt as l,f as u,ht as d,m as f,p,w as m}from"./index-eKs5Uldr.js";var h=[{id:`res-low`,index:1,label:`Low-density residential`,color:`#4ad19a`,width:[2,3],depth:[2,4],demand:`residential`},{id:`res-high`,index:2,label:`High-density residential`,color:`#1f9d63`,width:[3,4],depth:[3,4],demand:`residential`},{id:`com-low`,index:3,label:`Low-density commercial`,color:`#62c6ff`,width:[2,4],depth:[2,4],demand:`commercial`},{id:`com-high`,index:4,label:`High-density commercial`,color:`#2b6fdc`,width:[3,4],depth:[3,4],demand:`commercial`},{id:`ind`,index:5,label:`Industrial`,color:`#f1b634`,width:[3,4],depth:[3,4],demand:`industrial`},{id:`office`,index:6,label:`Office`,color:`#b57cf0`,width:[3,4],depth:[3,4],demand:`office`}],g=Object.fromEntries(h.map(e=>[e.id,e])),_=[null,...h];h.map(e=>e.id);function v(e){if(e==null||e===``||e===`none`)return 0;if(typeof e==`number`)return e>=0&&e<=h.length?e|0:-1;if(typeof e==`object`&&e.index!=null)return e.index;let t=g[e];return t?t.index:-1}var y=2,b=.42,x=6.4,S=10.5,C=new Set([`path`,`highway`]);function w(e,t,n){let r=0,i=0;for(let a=0;a<4;a++){let o=e[a*2],s=e[a*2+1],c=e[(a+1)%4*2],l=e[(a+1)%4*2+1],u=(c-o)*(n-s)-(l-s)*(t-o);u>0?r++:u<0&&i++}return r===0||i===0}var T=class{constructor(e,t){this.world=e,this.events=t,this.cell=e.cellSize||8,this.cells=[],this.frames=[],this.buckets=new Map,this.paint=new Map,this.lots=[],this.lotByKey=new Map,this._nextLot=1,this.dirty=!0,this.now=0,this.geometryVersion=0,this.lotVersion=0,this.stats={cells:0,blocked:0,blockedRoad:0,blockedWater:0,blockedSlope:0,conflicts:0,lots:0,lotCells:0,zonedCells:0,coverage:1,buildMs:0,lotMs:0},this._occ=null}key(e,t){return t*65536+e}ensure(){this.dirty&&this.rebuild()}rebuild(){let e=performance.now(),t=this.world.roads,n=t&&t.api,r=this.buckets;if(this.cells=[],this.frames=[],this.buckets=new Map,this.stats.blocked=0,this.stats.blockedRoad=0,this.stats.blockedWater=0,this.stats.blockedSlope=0,this.stats.conflicts=0,n&&t.segments&&t.segments.size&&typeof n.sampleEdge==`function`){this._rasterise(t);let e=[];for(let r of t.segments.values())if(!C.has(r.type))for(let t of[-1,1]){let i=this._buildFrame(r,t,n);if(i){this.frames.push(i);for(let t of i.cells)t&&e.push(t)}}for(let t of e)this._blocked(t)&&(t.blocked=!0,this.stats.blocked++);this._resolveConflicts(e);for(let e of this.frames)for(let t=0;t<e.count;t++){let n=0;for(;n<4;){let r=e.cells[t*4+n];if(!r||r.blocked||r.dropped)break;n++}n<2&&(n=0);for(let r=0;r<4;r++){let i=t*4+r,a=e.cells[i];if(!a)continue;if(r>=n){e.cells[i]=null;continue}a.id=this.cells.length,this.cells.push(a);let o=this.buckets.get(a.key);o||this.buckets.set(a.key,o=[]),o.push(a)}}this._occ=null;let i=this.paint;for(let e of this.cells){let t=i.get(e.key)||0;if(!t&&r.size){let n=20.25;for(let i=-1;i<=1;i++)for(let a=-1;a<=1;a++){let o=r.get(this.key(e.cx+a,e.cz+i));if(o)for(let r of o){if(!r.type)continue;let i=(r.x-e.x)**2+(r.z-e.z)**2;i<n&&(n=i,t=r.type)}}}e.type=t}i.clear();for(let e of this.cells)e.type&&i.set(e.key,e.type);this._computeAdjacency()}else this.paint.clear();this.dirty=!1,this.geometryVersion++,this.stats.cells=this.cells.length,this.stats.buildMs=Math.round((performance.now()-e)*10)/10,this.rebuildLots()}_buildFrame(e,t,n){let r=this.world,i=this.cell,a=e.length;if(!(a>4))return null;let o=Math.max(2,Math.ceil(a/y)+1),s=new Float64Array(o),c=new Float64Array(o),l=new Float64Array(o),u=new Float64Array(o),d=new Float64Array(o),f=new Float64Array(o);for(let r=0;r<o;r++){let i=n.sampleEdge(e.id,r/(o-1),t);if(!i)return null;s[r]=i.x,c[r]=i.z,l[r]=i.y||0,u[r]=i.nx,d[r]=i.nz,f[r]=r?f[r-1]+Math.hypot(i.x-s[r-1],i.z-c[r-1]):0}let p=f[o-1],m=Math.floor(p/i+1e-6);if(m<1)return null;let h={seg:e.id,side:t,count:m,cells:Array(m*4).fill(null),s:new Float64Array(m+1),edgeY:new Float64Array(m+1),length:p,width:e.width,type:e.type,sign:1},g=1,_=(e,t)=>{for(;g<o-1&&f[g]<e;)g++;for(;g>1&&f[g-1]>e;)g--;let n=g-1,r=g,i=f[r]-f[n],a=i>1e-9?Math.min(1,Math.max(0,(e-f[n])/i)):0;t.x=s[n]+(s[r]-s[n])*a,t.z=c[n]+(c[r]-c[n])*a,t.y=l[n]+(l[r]-l[n])*a;let p=u[n]+(u[r]-u[n])*a,m=d[n]+(d[r]-d[n])*a,h=Math.hypot(p,m)||1;t.nx=p/h,t.nz=m/h},v={x:0,y:0,z:0,nx:0,nz:0},x={x:0,y:0,z:0,nx:0,nz:0};for(let n=0;n<m;n++){let a=n*i,o=a+i;h.s[n]=a,h.s[n+1]=o,_(a,v),_(o,x),h.edgeY[n]=v.y,h.edgeY[n+1]=x.y;for(let a=0;a<4;a++){let o=a*i,s=o+i,c=v.x+v.nx*o,l=v.z+v.nz*o,u=x.x+x.nx*o,d=x.z+x.nz*o,f=x.x+x.nx*s,p=x.z+x.nz*s,m=v.x+v.nx*s,g=v.z+v.nz*s,_=.5*(c*d-u*l+(u*p-f*d)+(f*g-m*p)+(m*l-c*g));if(a===0&&(h.sign=_<0?-1:1),_*h.sign<b*i*i)break;let y=(c+u+f+m)*.25,S=(l+d+p+g)*.25;if(!r.inBounds(y,S))break;let C=r.toCell(y,S),w=Math.atan2(-(v.nx+x.nx),-(v.nz+x.nz));h.cells[n*4+a]={id:-1,seg:e.id,side:t,i:n,k:a,x:y,z:S,cx:C.cx,cz:C.cz,key:this.key(C.cx,C.cz),yaw:w,corners:[c,l,u,d,f,p,m,g],type:0,lot:-1,edges:0,zbr:15,nbr:0,nb:null,stamp:0,blocked:!1,dropped:!1,width:e.width,frame:h}}}return h}_rasterise(e){let t=this.world.half,n=Math.ceil(t*2)+2,r=new Uint8Array(n*n),i=(e,i,a)=>{let o=a*a,s=Math.max(0,Math.floor(e-a+t)),c=Math.min(n-1,Math.ceil(e+a+t)),l=Math.max(0,Math.floor(i-a+t)),u=Math.min(n-1,Math.ceil(i+a+t));for(let a=l;a<=u;a++){let l=a-t-i,u=a*n;for(let n=s;n<=c;n++){let i=n-t-e;i*i+l*l<=o&&(r[u+n]=1)}}};for(let t of e.segments.values()){let e=t.points;if(!e||e.length<2)continue;let n=t.width*.5+.6,r=Math.max(.5,n*.5);for(let t=1;t<e.length;t++){let a=e[t-1],o=e[t],s=Math.hypot(o.x-a.x,o.z-a.z),c=Math.max(1,Math.ceil(s/r));for(let e=0;e<c;e++){let t=e/c;i(a.x+(o.x-a.x)*t,a.z+(o.z-a.z)*t,n)}}let a=e[e.length-1];i(a.x,a.z,n)}if(e.nodes)for(let t of e.nodes.values()){if(!t.segments||t.segments.length<3)continue;let n=0;for(let r of t.segments){let t=e.segments.get(r);t&&(n=Math.max(n,t.width))}i(t.x,t.z,n*.5+3)}this._occ=r,this._occN=n,this._occHalf=t}_occupied(e,t){let n=e+this._occHalf,r=t+this._occHalf,i=Math.floor(n),a=Math.floor(r),o=this._occN;if(i<0||a<0||i+1>=o||a+1>=o)return!0;let s=this._occ,c=a*o+i;return s[c]===1&&s[c+1]===1&&s[c+o]===1&&s[c+o+1]===1}_blocked(e){let t=this.world.terrain,n=this.stats;if(t&&t.isWater&&t.isWater(e.x,e.z))return n.blockedWater++,!0;let r=e.corners;if(this._occ){if(this._occupied(e.x,e.z))return n.blockedRoad++,!0;let t=.93;for(let i=0;i<4;i++){let a=r[i*2],o=r[i*2+1],s=r[(i+1)%4*2],c=r[(i+1)%4*2+1];if(this._occupied(e.x+(a-e.x)*t,e.z+(o-e.z)*t))return n.blockedRoad++,!0;let l=(a+s)*.5,u=(o+c)*.5;if(this._occupied(e.x+(l-e.x)*t,e.z+(u-e.z)*t))return n.blockedRoad++,!0}}if(t&&t.getHeight){let i=1/0,a=-1/0;for(let e=0;e<4;e++){let o=t.getHeight(r[e*2],r[e*2+1]);if(o<i&&(i=o),o>a&&(a=o),t.isWater&&t.isWater(r[e*2],r[e*2+1]))return n.blockedWater++,!0}if(e.slope=a-i,a-i>S)return n.blockedSlope++,!0}return!1}_better(e,t){return e.k===t.k?e.width===t.width?e.seg===t.seg?e.side===t.side?e.i<t.i:e.side<t.side:e.seg<t.seg:e.width>t.width:e.k<t.k}_resolveConflicts(e){let t=e.filter(e=>!e.blocked);t.sort((e,t)=>this._better(e,t)?-1:1);let n=new Map,r=x*x,i=e=>{for(let t=-1;t<=1;t++)for(let i=-1;i<=1;i++){let a=n.get(this.key(e.cx+i,e.cz+t));if(a){for(let t of a)if(!(t.frame===e.frame&&Math.abs(t.i-e.i)<=1&&t.k===e.k)&&((t.x-e.x)**2+(t.z-e.z)**2<r||w(t.corners,e.x,e.z)||w(e.corners,t.x,t.z)))return!1}}return!0},a=e=>{let t=n.get(e.key);t||n.set(e.key,t=[]),t.push(e)},o=[];for(let e of t)i(e)?a(e):(e.dropped=!0,o.push(e));for(let e=0;e<3&&o.length;e++){let e=0;for(let t of o)!t.dropped||!i(t)||(t.dropped=!1,a(t),e++);if(!e)break}let s=0;for(let e of o)e.dropped&&s++;this.stats.conflicts=s}_computeAdjacency(){let e=this.cell;for(let t of this.frames)for(let n=0;n<t.count;n++)for(let r=0;r<4;r++){let i=t.cells[n*4+r];if(!i)continue;let a=[n>0?t.cells[(n-1)*4+r]:null,n+1<t.count?t.cells[(n+1)*4+r]:null,r>0?t.cells[n*4+r-1]:null,r+1<4?t.cells[n*4+r+1]:null],o=i.corners,s=[[0,3],[1,2],[0,1],[2,3]];for(let t=0;t<4;t++){if(a[t]||t===2&&r===0)continue;let n=s[t][0],c=s[t][1],l=(o[n*2]+o[c*2])*.5,u=(o[n*2+1]+o[c*2+1])*.5,d=l-i.x,f=u-i.z,p=Math.hypot(d,f)||1,m=l+d/p*e*.34,h=u+f/p*e*.34;a[t]=this._cellContaining(m,h,i)}i.nb=a,i.nbr=+!!a[0]|(a[1]?2:0)|(a[2]?4:0)|(a[3]?8:0)}}_cellContaining(e,t,n){let r=this.world.toCell(e,t);for(let i=-1;i<=1;i++)for(let a=-1;a<=1;a++){let o=this.buckets.get(this.key(r.cx+a,r.cz+i));if(o){for(let r of o)if(r!==n&&w(r.corners,e,t))return r}}return null}_computeZoneEdges(){for(let e of this.cells){let t=e.nb,n=0;if(!t){e.zbr=15;continue}for(let r=0;r<4;r++){let i=t[r];(!i||i.type!==e.type)&&(n|=1<<r)}e.zbr=n}}cellAt(e,t){this.ensure();let n=this.world.toCell(e,t),r=null,i=32.49;for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++){let s=this.buckets.get(this.key(n.cx+o,n.cz+a));if(s)for(let n of s){if(w(n.corners,e,t))return n;let a=(n.x-e)**2+(n.z-t)**2;a<i&&(i=a,r=n)}}return r}cellsInRect(e,t,n,r){this.ensure(),e>n&&([e,n]=[n,e]),t>r&&([t,r]=[r,t]);let i=this.world.toCell(e,t),a=this.world.toCell(n,r),o=[];for(let s=i.cz;s<=a.cz;s++)for(let c=i.cx;c<=a.cx;c++){let i=this.buckets.get(this.key(c,s));if(i)for(let a of i)a.x>=e&&a.x<=n&&a.z>=t&&a.z<=r&&o.push(a)}return o}paintCells(e,t){let n=v(t);if(n<0)return console.warn(`[zoning] unknown zone type "${t}"`),[];this.ensure();let r=[],i=new Set;for(let t of e){if(!t)continue;let e=this.key(t.cx|0,t.cz|0);if(i.has(e))continue;i.add(e);let a=this.buckets.get(e);if(a){n?this.paint.set(e,n):this.paint.delete(e);for(let e of a)e.type!==n&&(e.type=n,e.stamp=this.now,r.push(e))}}return r.length&&this.rebuildLots(),r}paintRect(e,t,n,r,i){let a=this.cellsInRect(e,t,n,r);return this.paintCells(a.map(e=>({cx:e.cx,cz:e.cz})),i)}clear(){let e=[];for(let t of this.cells)t.type&&(t.type=0,t.stamp=this.now,e.push(t));return this.paint.clear(),e.length&&this.rebuildLots(),e}rebuildLots(){let e=performance.now(),t=this.lotByKey,n=[],r=new Map;for(let e of this.cells)e.lot=-1,e.edges=0;for(let e of this.frames){let i=e.count;if(!i)continue;let a=new Uint8Array(i),o=new Uint8Array(i);for(let t=0;t<i;t++){let n=e.cells[t*4];if(!n||!n.type)continue;let r=n.type,i=1;for(;i<4;){let n=e.cells[t*4+i];if(!n||n.type!==r)break;i++}a[t]=i,o[t]=r}let s=0;for(;s<i;){if(a[s]<2){s++;continue}let c=o[s],l=s+1;for(;l<i&&o[l]===c&&a[l]>=2;)l++;let d=_[c],m=l-s,h=(e,t)=>{let n=4;for(let r=e;r<e+t;r++)n=Math.min(n,a[s+r]);return n},g=t=>{let n=e.cells[(s+t)*4].corners,r=f(u(p(`${Math.round(n[0])},${Math.round(n[1])},${c}`),this.world.seed|0));return d.width[0]+Math.floor(r()*(d.width[1]-d.width[0]+1))},v=new Float64Array(m+1),y=new Int8Array(m+1);for(let e=m-1;e>=0;e--){if(m-e<2){v[e]=-1.5;continue}let t=g(e),n=-1e9,r=0;for(let i=2;i<=Math.min(4,m-e);i++){let a=h(e,i),o=i*a+v[e+i];(i<d.width[0]||i>d.width[1])&&(o-=1.2),i===t&&(o+=.6),o>n&&(n=o,r=i)}v[e]=n,y[e]=r}for(let i=0;i<m&&y[i];){let a=y[i],o=Math.max(2,Math.min(h(i,a),4)),l=this._makeLot(e,s+i,a,o,c,t,r);l.index=n.length,n.push(l),r.set(l.key,l),i+=a}s=l}}for(let e of n)for(let t of e._cells){t.lot=e.index;let n=4;t.i===e.i0&&(n|=1),t.i===e.i0+e.width-1&&(n|=2),t.k===e.depth-1&&(n|=8),t.edges=n}this.lots=n,this.lotByKey=r,this._computeZoneEdges(),this.lotVersion++,this.stats.lots=n.length;let i=0,a=0,o=[0,0,0,0];for(let e of this.cells)e.type&&(a++,e.lot<0&&o[Math.min(3,e.k)]++),e.lot>=0&&i++;this.stats.unlotByK=o,this.stats.lotCells=i,this.stats.zonedCells=a,this.stats.coverage=a?Math.round(i/a*1e3)/1e3:1,this.stats.lotMs=Math.round((performance.now()-e)*10)/10}_makeLot(e,t,n,r,i,a,o){let s=this.cell,c=[],l=[],u=new Set;for(let i=t;i<t+n;i++)for(let t=0;t<r;t++){let n=e.cells[i*4+t];l.push(n),u.has(n.key)||(u.add(n.key),c.push({cx:n.cx,cz:n.cz}))}let d=e.cells[t*4].corners,f=e.cells[(t+n-1)*4].corners,p=e.cells[t*4+r-1].corners,m=e.cells[(t+n-1)*4+r-1].corners,h=d[0],g=d[1],v=f[2],y=f[3],b=p[6],x=p[7],S=m[4],C=m[5],w=(h+v+b+S)*.25,T=(g+y+x+C)*.25,E=(h+v)*.5,D=(g+y)*.5,O=(b+S)*.5,k=(x+C)*.5,A=O-E,j=k-D,M=Math.hypot(A,j)||1;A/=M,j/=M;let ee=Math.atan2(-A,-j),N=Math.hypot(v-h,y-g),P=M,F=`${Math.round(E*2)}:${Math.round(D*2)}:${Math.round(A*4)}:${Math.round(j*4)}:${n}:${r}:${i}`;o.has(F)&&(F+=`:`+e.seg+`:`+e.side);let I=this.world.terrain,L=I&&I.getHeight?I.getHeight(w,T):0,R=e.length>0?Math.min(1,Math.max(0,(e.s[t]+e.s[t+n])*.5/e.length)):.5,z=a.get(F)||{id:`lot`+this._nextLot++,buildingId:null};return z.key=F,z.cells=c,z._cells=l,z.x=w,z.y=L,z.z=T,z.w=Math.round(N*100)/100,z.d=Math.round(P*100)/100,z.width=n,z.depth=r,z.i0=t,z.yaw=ee,z.type=_[i].id,z.roadSegmentId=e.seg,z.side=e.side,z.frontage={x:E,y:e.edgeY?(e.edgeY[t]+e.edgeY[t+n])*.5:L,z:D,nx:A,nz:j,t:R,length:N},z.corners=[h,g,v,y,S,C,b,x],z.cellSize=s,z}lotById(e){for(let t of this.lots)if(t.id===e)return t;return null}},E=3,D=16,O=54,k=.24,A=.08,j=1.9,M=`
varying vec2 vLocal;
varying vec2 vCenter;
varying vec4 vAxis;
varying vec3 vWorld;
varying float vCell;
varying float vK;
varying float vNbr;
varying float vType;
varying float vEdges;
varying float vZbr;
varying float vStamp;
varying float vLot;
`,ee=`
attribute vec2 aLocal;
attribute vec2 aCenter;
attribute vec4 aAxis;
attribute float aCell;
attribute float aK;
attribute float aNbr;
attribute float aType;
attribute float aEdges;
attribute float aZbr;
attribute float aStamp;
attribute float aLot;
${M}
void main() {
  vLocal = aLocal; vCenter = aCenter; vAxis = aAxis; vCell = aCell; vK = aK; vNbr = aNbr;
  vType = aType; vEdges = aEdges; vZbr = aZbr; vStamp = aStamp; vLot = aLot;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,N=`
precision highp float;
uniform vec3 uColors[7];
uniform vec3 uTints[7];
uniform float uCell;
uniform float uHover;
uniform float uHoverLot;
uniform float uSelLot;
uniform vec4 uBrush;
uniform float uBrushType;
uniform float uBrushErase;
uniform float uTime;
uniform float uNight;
uniform float uOpacity;
uniform float uFar;
uniform vec3 uCamPos;
${M}

bool bit(float mask, float b) { return mod(floor(mask / b + 0.001), 2.0) >= 1.0; }

/**
 * Analytic (box-filtered) coverage of a band |d| < w by one pixel that spans px metres.
 * Unlike a fixed-width smoothstep this never grows the line as the camera pulls back: the line keeps
 * its real width in metres and simply fades towards its area fraction, so a whole district does not
 * dissolve into white lace at 500 m.
 */
float band(float d, float w, float px) { return clamp((w - d) / px + 0.5, 0.0, 1.0); }
/** Coverage of the half-space d > w. */
float inner(float d, float w, float px) { return clamp((d - w) / px + 0.5, 0.0, 1.0); }
bool inBrush(vec2 p) { return p.x > uBrush.x && p.x < uBrush.z && p.y > uBrush.y && p.y < uBrush.w; }
`,P=`
${N}
void main() {
  float m = uCell;
  float dl = vLocal.x * m;            // distance to the "along-road minus" edge
  float dr = (1.0 - vLocal.x) * m;    // ... "along-road plus"
  float df = vLocal.y * m;            // ... towards the road
  float db = (1.0 - vLocal.y) * m;    // ... away from the road
  float e = min(min(dl, dr), min(df, db));
  float px = max(fwidth(e), 0.004);   // metres covered by one pixel
  int ti = int(vType + 0.5);
  bool zoned = ti > 0;
  bool road = vK < 0.5;

  // soft edge wherever the zonable grid stops
  float soft = 1.0;
  if (!bit(vNbr, 1.0)) soft = min(soft, smoothstep(0.0, 3.0, dl));
  if (!bit(vNbr, 2.0)) soft = min(soft, smoothstep(0.0, 3.0, dr));
  if (!bit(vNbr, 8.0)) soft = min(soft, smoothstep(0.0, 3.0, db));
  if (!road && !bit(vNbr, 4.0)) soft = min(soft, smoothstep(0.0, 3.0, df));

  // Cell gutters are a close-range read: past ~200 m they close up so a district becomes one solid
  // colour field instead of dissolving into graph paper (CS2 does exactly this as you zoom out).
  float dist = distance(uCamPos, vWorld);
  float lod = 1.0 - smoothstep(160.0, 420.0, dist);
  float tile = inner(e, 0.20 * lod, px);
  // The blend is dst *= (1 + src): a *chromatic lift*, never a darkening. uTints are hue-normalised
  // (max channel 1), so the tinted channels gain the most and the tile always ends at or above the
  // luma of the ground it covers — CS2's district tint, not a cloud shadow over the land.
  vec3 lift = vec3(0.0);
  if (zoned) {
    float k = 0.52 * tile * mix(0.45, 1.0, soft);
    if (vLot < -0.5) k *= 0.62;       // zoned, but too shallow/narrow to ever become a parcel
    lift = uTints[ti] * k;
  } else {
    // the bare zonable grid: a whisper of cool light — its white grid lines come from the line pass
    lift = vec3(0.62, 0.72, 0.92) * (0.10 * tile * mix(0.25, 1.0, soft));
  }

  // brush preview footprint (cells whose centre falls in the tool rectangle)
  if (uBrush.x < uBrush.z && inBrush(vCenter)) {
    vec3 bt = uBrushErase > 0.5 ? vec3(1.0, 0.42, 0.36) : uTints[int(uBrushType + 0.5)];
    lift = mix(lift, bt * (0.16 + 0.38 * tile), 0.88);
  }

  float fade = 1.0 - smoothstep(uFar, uFar * 2.0, dist);
  gl_FragColor = vec4(lift * (fade * uOpacity), 1.0);
}`,F=`
${N}
/** source-over compositing of one layer (colour c, coverage w) on top of (col, a). */
void layer(inout vec3 col, inout float a, vec3 c, float w) {
  w = clamp(w, 0.0, 1.0);
  float oa = w + a * (1.0 - w);
  if (oa > 1e-5) col = (c * w + col * a * (1.0 - w)) / oa;
  a = oa;
}

void main() {
  float m = uCell;
  float dl = vLocal.x * m;
  float dr = (1.0 - vLocal.x) * m;
  float df = vLocal.y * m;
  float db = (1.0 - vLocal.y) * m;
  float e = min(min(dl, dr), min(df, db));
  float px = max(fwidth(e), 0.004);
  int ti = int(vType + 0.5);
  bool zoned = ti > 0;
  bool road = vK < 0.5;
  bool lotted = vLot > -0.5;
  vec3 hue = uColors[ti];

  float soft = 1.0;
  if (!bit(vNbr, 1.0)) soft = min(soft, smoothstep(0.0, 3.0, dl));
  if (!bit(vNbr, 2.0)) soft = min(soft, smoothstep(0.0, 3.0, dr));
  if (!bit(vNbr, 8.0)) soft = min(soft, smoothstep(0.0, 3.0, db));
  if (!road && !bit(vNbr, 4.0)) soft = min(soft, smoothstep(0.0, 3.0, df));

  float dist = distance(uCamPos, vWorld);
  float lod = 1.0 - smoothstep(160.0, 420.0, dist);
  float tile = inner(e, 0.20 * lod, px);
  vec3 col = vec3(0.0);
  float a = 0.0;

  // ---- 1. colour presence -----------------------------------------------------------------
  // Only a whisper of hue by day — the multiply pass carries the colour. At night the ground is
  // black and has nothing left to modulate, so this takes over (and the whole block below is then
  // scaled right back down, so the district never glows).
  if (zoned) {
    layer(col, a, hue, (0.03 + 0.16 * uNight) * tile * mix(0.3, 1.0, soft));
  }

  // ---- 2. the grid itself: quiet dark seam + faint rim -------------------------------------
  float seam = band(e, 0.17, px);
  layer(col, a, (zoned ? hue * 0.09 : vec3(0.05, 0.06, 0.07)), seam * (zoned ? 0.34 : 0.22) * soft * lod);
  // only the *empty* grid gets a light inner rim — inside a painted zone the colour field must win
  if (!zoned) {
    float rim = band(e, 0.58, px) - band(e, 0.26, px);
    layer(col, a, vec3(0.82, 0.86, 0.90), rim * 0.30 * soft * mix(0.45, 1.0, lod));
  }

  // ---- 3. parcel (lot) borders — mid weight ------------------------------------------------
  float lb = 0.0;
  if (bit(vEdges, 1.0)) lb = max(lb, band(dl, 0.30, px));
  if (bit(vEdges, 2.0)) lb = max(lb, band(dr, 0.30, px));
  if (bit(vEdges, 8.0)) lb = max(lb, band(db, 0.30, px));
  layer(col, a, mix(hue, vec3(1.0), 0.55) * 0.80, lb * 0.34 * mix(0.4, 1.0, soft));

  // ---- 4. zone-type boundary ---------------------------------------------------------------
  if (zoned) {
    // only where the *type* actually changes — at the outer rim of the grid the soft fade and the
    // parcel border already carry the edge, and a hard white line there fights the frontage bar
    float zb = 0.0;
    if (bit(vZbr, 1.0) && bit(vNbr, 1.0)) zb = max(zb, band(dl, 0.46, px));
    if (bit(vZbr, 2.0) && bit(vNbr, 2.0)) zb = max(zb, band(dr, 0.46, px));
    if (bit(vZbr, 8.0) && bit(vNbr, 8.0)) zb = max(zb, band(db, 0.46, px));
    if (!road && bit(vZbr, 4.0) && bit(vNbr, 4.0)) zb = max(zb, band(df, 0.46, px));
    layer(col, a, mix(hue, vec3(1.0), 0.62) * 0.88, zb * 0.55);
  }

  // ---- 5. frontage: the brightest line in a painted block -----------------------------------
  if (road) {
    // No halo: cs2_01 has a hard edge that stops at the tile. A soft exponential glow here spilled
    // ~2.3 m over the sidewalk and turned a district into a web of glowing white grout at range.
    layer(col, a, mix(hue, vec3(1.0), 0.6) * 0.8, exp(-df * 2.2) * (zoned ? 0.07 : 0.02));
    // set a hair inside the kerb so the bar reads as a line drawn on the lot, not as the sidewalk
    float bar = band(abs(df - 0.42), max(0.17, px * 0.55), px);
    layer(col, a, vec3(0.88), bar * (lotted ? 0.90 : (zoned ? 0.50 : 0.30)));
  }

  // The district drawing above follows the world down at night: over a black ground even a faint
  // additive would glow, so tint and lines are scaled together and never outshine a street lamp.
  // Everything below this line is a *cursor* — interactive UI, and only follows half way down.
  col *= mix(1.0, 0.31, uNight);

  // ---- 6. paint-in animation ---------------------------------------------------------------
  if (vStamp > 0.0) {
    float age = clamp((uTime - vStamp) / 0.5, 0.0, 1.0);
    layer(col, a, vec3(0.9), (1.0 - age) * 0.55 * tile);
  }

  // ---- 7. selected lot ---------------------------------------------------------------------
  if (uSelLot >= 0.0 && abs(vLot - uSelLot) < 0.5) {
    float pulse = 0.5 + 0.5 * sin(uTime * 3.6);
    float lr = road ? band(df, 0.34, px) : 0.0;
    if (bit(vEdges, 1.0)) lr = max(lr, band(dl, 0.34, px));
    if (bit(vEdges, 2.0)) lr = max(lr, band(dr, 0.34, px));
    if (bit(vEdges, 8.0)) lr = max(lr, band(db, 0.34, px));
    layer(col, a, vec3(0.95, 0.82, 0.34), (0.14 + 0.08 * pulse) * tile);
    layer(col, a, vec3(0.98, 0.86, 0.46), lr * (0.78 + 0.14 * pulse));
  }

  // ---- 8. brush preview: hard white outline around the whole footprint -----------------------
  if (uBrush.x < uBrush.z && inBrush(vCenter)) {
    vec2 au = vAxis.xy * uCell, av = vAxis.zw * uCell;
    float o = 0.0;
    if (!inBrush(vCenter - au)) o = max(o, band(dl, 0.8, px));
    if (!inBrush(vCenter + au)) o = max(o, band(dr, 0.8, px));
    if (road || !inBrush(vCenter - av)) o = max(o, band(df, 0.8, px));
    if (!inBrush(vCenter + av)) o = max(o, band(db, 0.8, px));
    float pulse = 0.5 + 0.5 * sin(uTime * 3.4);
    vec3 bc = uBrushErase > 0.5 ? vec3(1.0, 0.30, 0.24) : uColors[int(uBrushType + 0.5)];
    layer(col, a, mix(bc, vec3(1.0), 0.25) * 0.9, (0.20 + 0.05 * pulse) * tile);
    layer(col, a, mix(vec3(0.95), bc * 1.2, uBrushErase * 0.8) * (0.94 + 0.05 * pulse), o * 1.0);
  }

  // ---- 9. pointer hover: the whole LOT lights up, as in CS2 ----------------------------------
  bool hovLot = uHoverLot >= 0.0 && abs(vLot - uHoverLot) < 0.5;
  bool hovCell = abs(vCell - uHover) < 0.5;
  if (hovLot || hovCell) {
    float pulse = 0.5 + 0.5 * sin(uTime * 3.0);
    float hr;
    if (hovLot) {
      hr = road ? band(df, 0.6, px) : 0.0;
      if (bit(vEdges, 1.0)) hr = max(hr, band(dl, 0.6, px));
      if (bit(vEdges, 2.0)) hr = max(hr, band(dr, 0.6, px));
      if (bit(vEdges, 8.0)) hr = max(hr, band(db, 0.6, px));
    } else {
      hr = band(e, 0.5, px);
    }
    layer(col, a, mix(hue, vec3(1.0), 0.6) * 1.0, (hovCell ? 0.34 : 0.26) * tile);
    layer(col, a, vec3(0.90 + 0.02 * pulse), hr * 0.96);
  }

  col *= mix(1.0, 0.35, uNight);   // → district ×0.11, cursors ×0.35 at midnight
  a *= 1.0 - smoothstep(uFar, uFar * 2.0, dist);
  if (!zoned) a *= 1.0 - smoothstep(uFar * 0.45, uFar * 0.9, dist);

  gl_FragColor = vec4(col, a * uOpacity);
  if (gl_FragColor.a < 0.004) discard;
}`;function I(t){let n=1/Math.max(t.r,t.g,t.b,.001)**.6;return new e(Math.min(1,t.r*n),Math.min(1,t.g*n),Math.min(1,t.b*n))}var L=class{constructor(t,s){this.ctx=t,this.grid=s;let{engine:c,scene:u}=t,d=[new e(`#dfe8ee`),...h.map(t=>new e(t.color))],f=d.map(I);this.uniforms={uColors:{value:d},uTints:{value:f},uCell:{value:s.cell},uHover:{value:-1},uHoverLot:{value:-1},uSelLot:{value:-1},uBrush:{value:new i(1,1,0,0)},uBrushType:{value:0},uBrushErase:{value:0},uTime:{value:0},uNight:{value:0},uOpacity:{value:1},uFar:{value:1300},uCamPos:{value:new n}};let p={uniforms:this.uniforms,vertexShader:ee,transparent:!0,depthWrite:!1,depthTest:!0,side:2,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4,toneMapped:!1,fog:!1,lights:!1};this.fillMaterial=new a({...p,fragmentShader:P,blending:5,blendEquation:100,blendSrc:208,blendDst:201,blendEquationAlpha:100,blendSrcAlpha:200,blendDstAlpha:201}),this.fillMaterial.name=`zoning-overlay-fill`,this.fillMaterial.customProgramCacheKey=()=>`zoning-overlay-fill-v4`,this.material=new a({...p,fragmentShader:F,blending:1}),this.material.name=`zoning-overlay-lines`,this.material.customProgramCacheKey=()=>`zoning-overlay-lines-v4`,c.registerMaterial(this.fillMaterial),c.registerMaterial(this.material),this.geometry=new o,this.group=new r,this.group.name=`zoning-overlay`,this.group.visible=!1,this.meshes=[];for(let[e,t]of[this.fillMaterial,this.material].entries()){let n=new l(this.geometry,t);n.name=e?`zoning-overlay-lines`:`zoning-overlay-fill`,n.frustumCulled=!1,n.castShadow=!1,n.receiveShadow=!1,n.renderOrder=40+e,n.layers.set(c.LAYER_NO_AO),n.matrixAutoUpdate=!1,this.meshes.push(n),this.group.add(n)}this.mesh=this.meshes[1],u.add(this.group),this._geomVersion=-1,this._lotVersion=-1,this.cellCount=0}get visible(){return this.group.visible}set visible(e){this.group.visible=!!e}rebuildGeometry(){let e=this.grid,t=e.cells,n=t.length,r=this.ctx.world.terrain,i=r&&r.getHeight?(e,t)=>r.getHeight(e,t):()=>0,a=n*D,s=new Float32Array(a*3),c=new Float32Array(a*2),l=new Float32Array(a*2),u=new Float32Array(a*4),d=new Float32Array(a),f=new Float32Array(a),p=new Float32Array(a),h=new Float32Array(a),g=new Float32Array(a),_=new Float32Array(a),v=new Float32Array(a),y=new Float32Array(a),b=a>65535?new Uint32Array(n*O):new Uint16Array(n*O);for(let r=0;r<n;r++){let n=t[r],a=n.corners,o=r*D,m=a[2]-a[0],x=a[3]-a[1],S=Math.hypot(m,x)||1;m/=S,x/=S;let C=a[6]-a[0],w=a[7]-a[1],T=Math.hypot(C,w)||1;C/=T,w/=T;for(let t=0;t<=E;t++){let b=t/E;for(let S=0;S<=E;S++){let T=S/E,D=a[0]+(a[2]-a[0])*T,O=a[1]+(a[3]-a[1])*T,M=a[6]+(a[4]-a[6])*T,ee=a[7]+(a[5]-a[7])*T,N=D+(M-D)*b,P=O+(ee-O)*b,F=i(N,P);F=Math.max(F,i(N+m*j,P+x*j),i(N-m*j,P-x*j)),F=Math.max(F,i(N+C*j,P+w*j),i(N-C*j,P-w*j));let I=k+A*(1-Math.min(1,(n.k+b)*e.cell/3)),L=o+t*4+S;s[L*3]=N,s[L*3+1]=F+I,s[L*3+2]=P,c[L*2]=T,c[L*2+1]=b,l[L*2]=n.x,l[L*2+1]=n.z,u[L*4]=m,u[L*4+1]=x,u[L*4+2]=C,u[L*4+3]=w,d[L]=r,f[L]=n.k,p[L]=n.nbr,h[L]=n.type,g[L]=n.edges,_[L]=n.zbr,v[L]=n.stamp,y[L]=n.lot}}let M=r*O;for(let e=0;e<E;e++)for(let t=0;t<E;t++){let n=o+e*4+t,r=n+1,i=n+E+1,a=i+1;b[M++]=n,b[M++]=i,b[M++]=r,b[M++]=r,b[M++]=i,b[M++]=a}}let x=new o;x.setAttribute(`position`,new m(s,3)),x.setAttribute(`aLocal`,new m(c,2)),x.setAttribute(`aCenter`,new m(l,2)),x.setAttribute(`aAxis`,new m(u,4)),x.setAttribute(`aCell`,new m(d,1)),x.setAttribute(`aK`,new m(f,1)),x.setAttribute(`aNbr`,new m(p,1)),x.setAttribute(`aType`,new m(h,1)),x.setAttribute(`aEdges`,new m(g,1)),x.setAttribute(`aZbr`,new m(_,1)),x.setAttribute(`aStamp`,new m(v,1)),x.setAttribute(`aLot`,new m(y,1)),x.setIndex(new m(b,1)),x.computeBoundingSphere();let S=this.geometry;this.geometry=x;for(let e of this.meshes)e.geometry=x;S&&S.dispose(),this.cellCount=n,this._geomVersion=e.geometryVersion,this._lotVersion=e.lotVersion}updatePaint(e){if(this._geomVersion!==this.grid.geometryVersion){this.rebuildGeometry();return}let t=this.geometry,n=t.getAttribute(`aType`);if(!n)return;let r=t.getAttribute(`aEdges`),i=t.getAttribute(`aZbr`),a=t.getAttribute(`aStamp`),o=t.getAttribute(`aLot`),s=e||this.grid.cells;for(let e of s){let t=e.id*D;for(let s=0;s<D;s++)n.array[t+s]=e.type,r.array[t+s]=e.edges,i.array[t+s]=e.zbr,a.array[t+s]=e.stamp,o.array[t+s]=e.lot}n.needsUpdate=!0,r.needsUpdate=!0,i.needsUpdate=!0,a.needsUpdate=!0,o.needsUpdate=!0,this._lotVersion=this.grid.lotVersion}update(e,t,n){let r=this.grid;this._geomVersion===r.geometryVersion?this._lotVersion!==r.lotVersion&&this.updatePaint(null):this.rebuildGeometry();let i=this.uniforms;i.uTime.value=e,i.uNight.value=n||0,i.uCell.value=r.cell,t&&i.uCamPos.value.copy(t.position)}setHover(e){let t=e??-1;this.uniforms.uHover.value=t;let n=t>=0?this.grid.cells[t]:null;this.uniforms.uHoverLot.value=n&&n.lot>=0?n.lot:-1}setSelectedLot(e){this.uniforms.uSelLot.value=e??-1}setBrush(e,t,n){let r=this.uniforms.uBrush.value;if(!e){r.set(1,1,0,0);return}r.set(Math.min(e.x0,e.x1),Math.min(e.z0,e.z1),Math.max(e.x0,e.x1),Math.max(e.z0,e.z1)),this.uniforms.uBrushType.value=t>0?t:0,this.uniforms.uBrushErase.value=+!!n}setOpacity(e){this.uniforms.uOpacity.value=Math.max(0,Math.min(1,e))}dispose(){this.ctx.scene.remove(this.group),this.geometry.dispose(),this.fillMaterial.dispose(),this.material.dispose()}},R={PAVE:0,ASPH:1,CONC:2,LAWN:3,NONE:-1},z={PLAIN:0,BAYS:1,YARD:2,LAWN_MOWN:3,DRIVE:4,BED:5,GRAVEL:6,BACKLOT:7,BACKYARD:8,PLAZA:9},B=(e,t,n)=>e<t?t:e>n?n:e,te=class{constructor(e,t,n){this.w=e,this.d=t,this.out=n,this.v=0}band(e,t){let n=this.v,r=Math.min(this.d,n+e);if(this.v=r,r-n<.35)return;let i=0;for(let e=0;e<t.length;e++){let a=t[e],o=e===t.length-1?this.w:B(a[0],i,this.w);if(o-i>.35&&this.out.push({u0:i,v0:n,u1:o,v1:r,surf:a[1],kind:a[2]}),i=o,i>=this.w-.05)break}}rest(...e){this.left>.35&&this.band(this.left,e)}get left(){return this.d-this.v}};function ne(e,t){let n=e.w,r=e.d,i=[];if(!(n>2)||!(r>2))return i;let a=new te(n,r,i),o=t(),s=t()<.5,c=R.LAWN,l=R.PAVE,u=R.ASPH,d=R.CONC,f=R.NONE;switch(e.type){case`res-low`:{let e=B(n*.19,2.8,3.6),t=B(n*.12,.9,2.6),i=s?t:Math.max(t,n-e-t),d=B(r*(.4+.12*o),5,Math.max(5,r-3.2)),p=1.25,m=s?i+e+1.6:Math.max(.8,i-1.6-p);a.band(1.4,[[i,l,z.PLAIN],[i+e,u,z.DRIVE],[n,l,z.PLAIN]]);let h=[];m+p<i-.3&&h.push([m,f,0],[m+p,l,z.PLAIN]),h.push([i,f,0],[i+e,u,z.DRIVE]),m>i+e+.3&&m+p<n-.3&&h.push([m,f,0],[m+p,l,z.PLAIN]),h.push([n,f,0]),a.band(d-1.4,h),a.band(Math.max(0,r-d-2.1),[[n,f,0]]),a.rest([n*.18,f,0],[n*.82,c,z.BED],[n,f,0]);break}case`res-high`:{let e=B(n*.27,5,7.2),t=B(n*.2,3.2,6),i=B(r*.13,2.4,3.6);a.band(2.6,[[n,l,z.PLAZA]]);let o=Math.max(.8,r-2.6-i);s?a.band(o,[[e,u,z.BAYS],[n-t,l,z.PLAIN],[n,c,z.LAWN_MOWN]]):a.band(o,[[t,c,z.LAWN_MOWN],[n-e,l,z.PLAIN],[n,u,z.BAYS]]),a.rest([n,d,z.YARD]);break}case`com-low`:{let e=B(r*.42,6,13);a.band(2.2,[[n,l,z.PLAZA]]),a.band(e,[[n,u,z.BAYS]]),a.band(Math.max(0,r-2.2-e-2.6),[[n,l,z.PLAIN]]),a.rest([n,d,z.YARD]);break}case`com-high`:{let e=B(n*.16,3.2,4.6),t=B(r*.2,3.6,6);a.band(3.4,[[n,l,z.PLAZA]]);let i=Math.max(.8,r-3.4-t);s?a.band(i,[[e,u,z.BACKLOT],[n,l,z.PLAIN]]):a.band(i,[[n-e,l,z.PLAIN],[n,u,z.BACKLOT]]),a.rest([n*.58,d,z.YARD],[n,u,z.BAYS]);break}case`office`:{let e=B(r*.4,6.5,14);o<.55&&a.band(1.7,[[n,c,z.LAWN_MOWN]]),a.band(3.4,[[n,l,z.PLAZA]]),a.band(Math.max(0,r-a.v-e),[[n,l,z.PLAIN]]),a.rest([n,u,z.BAYS]);break}default:{let e=B(r*.34,6,11),t=B(r*.2,3,6.5);a.band(1.6,[[n,l,z.PLAIN]]),a.band(e,[[n,u,z.BAYS]]),a.band(Math.max(0,r-1.6-e-t),[[n,d,z.YARD]]),s?a.rest([n*.62,d,z.YARD],[n,c,z.GRAVEL]):a.rest([n*.38,c,z.GRAVEL],[n,d,z.YARD]);break}}return i}function re(e,t){switch(e){case`res-low`:return null;case`ind`:return{surf:R.CONC,kind:z.YARD};case`com-high`:return t<.45?{surf:R.CONC,kind:z.YARD}:{surf:R.ASPH,kind:t<.75?z.BACKLOT:z.BAYS};case`office`:return t<.35?{surf:R.CONC,kind:z.YARD}:{surf:R.ASPH,kind:z.BAYS};case`res-high`:return t<.22?{surf:R.LAWN,kind:z.BACKYARD}:{surf:R.ASPH,kind:t<.6?z.BAYS:z.BACKLOT};default:return{surf:R.ASPH,kind:t<.45?z.BAYS:z.BACKLOT}}}function ie(e,t){switch(e){case`ind`:return{surf:R.CONC,kind:z.YARD};case`res-high`:return t<.5?{surf:R.ASPH,kind:z.BAYS}:{surf:R.CONC,kind:z.YARD};default:return t<.42?{surf:R.ASPH,kind:z.BAYS}:t<.74?{surf:R.ASPH,kind:z.BACKLOT}:{surf:R.CONC,kind:z.YARD}}}var ae=new Set([`res-high`,`com-low`,`com-high`,`office`,`ind`]),V=`./assets/shared/`,oe={slabs:{map:V+`paving_slabs/albedo.jpg`,normalMap:V+`paving_slabs/normal.jpg`,roughnessMap:V+`paving_slabs/roughness.jpg`,aoMap:V+`paving_slabs/ao.jpg`},asphalt:{map:V+`asphalt_light/albedo.jpg`,normalMap:V+`asphalt_light/normal.jpg`,roughnessMap:V+`asphalt_light/roughness.jpg`},concrete:{map:V+`concrete/albedo.jpg`,normalMap:V+`concrete/normal.jpg`,roughnessMap:V+`concrete/roughness.jpg`},grass:{map:V+`grass/albedo.jpg`,normalMap:V+`grass/normal.jpg`,roughnessMap:V+`grass/roughness.jpg`},dirt:{map:V+`Ground048/color.jpg`,normalMap:V+`Ground048/normal.jpg`}},se=[{key:`pave`,set:`slabs`,tile:2.45,color:11447202,roughness:.92,normalScale:1.15,detail:.95,detailTile:3.6,macro:.8,jitter:.115,aoAlb:.62,aoAmb:.4},{key:`asph`,set:`asphalt`,tile:2.7,color:9670020,roughness:.9,normalScale:1.45,detail:1.15,detailTile:3.9,macro:.9,jitter:.085,aoAlb:.62,aoAmb:.4},{key:`conc`,set:`concrete`,tile:3.1,color:10394257,roughness:.93,normalScale:1,detail:.9,detailTile:3.3,macro:.85,jitter:.105,aoAlb:.62,aoAmb:.4},{key:`lawn`,set:`grass`,tile:2.15,color:11120534,roughness:.95,normalScale:1,detail:.7,detailTile:2.6,macro:.45,jitter:.07,aoAlb:.8,aoAmb:.62,lawn:!0}],ce=`
float zg_h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float zg_n(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = zg_h(i), b = zg_h(i + vec2(1.0, 0.0)), c = zg_h(i + vec2(0.0, 1.0)), d = zg_h(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
/** anti-aliased stripe of half-width hw metres, repeating every N metres, centred on x = k*period */
float zg_stripe(float x, float period, float hw) {
  float d = abs(fract(x / period + 0.5) - 0.5) * period;
  float aa = fwidth(x) * 0.7 + 0.012;
  return 1.0 - smoothstep(hw, hw + aa, d);
}
float zg_box(vec2 p, vec2 c, vec2 r) {
  vec2 q = abs(p - c) - r;
  float aa = max(fwidth(p.x), fwidth(p.y)) + 0.02;
  return 1.0 - smoothstep(-aa, aa, max(q.x, q.y));
}
`,le=`
attribute vec2 aLocal;
attribute vec4 aInfo;
attribute vec2 aBay;
varying vec2 vLocal;
varying vec4 vInfo;
varying vec2 vBay;
varying vec3 vWPosG;
`,ue=`
vLocal = aLocal; vInfo = aInfo; vBay = aBay;
vWPosG = (modelMatrix * vec4(transformed, 1.0)).xyz;
`,de=`
varying vec2 vLocal;
varying vec4 vInfo;
varying vec2 vBay;
varying vec3 vWPosG;
uniform float uMacro, uJitter, uDetail, uDetailTile, uAOAlb, uAOAmb, uDecal, uNight;
#ifdef ZG_LAWN
uniform sampler2D uDirtMap;
uniform sampler2D uDirtNormal;
uniform float uDirtTile;
uniform vec3 uDirtTint;
#endif
`+ce,fe=`
float zgKind = vInfo.x;
float zgRnd = vInfo.y;
float zgAO = vInfo.z;
vec2 zgW = vWPosG.xz;
vec2 zgL = vLocal;
float zgNear = 1.0 - smoothstep(70.0, 210.0, length(vWPosG - cameraPosition));
float zgPaint = 0.0;   // painted markings coverage
float zgOil = 0.0;     // oil / polish: drops roughness
float zgRough = 0.0;   // extra roughness (dust, gravel)
float zgDirt = 0.0;    // 0 grass .. 1 bare soil (lawn family only)

// --- macro variation: two octaves of value noise so the 2.4 m tile never reads as a repeat
float zgM = 0.62 * zg_n(zgW * 0.055) + 0.38 * zg_n(zgW * 0.17 + 21.3);
diffuseColor.rgb *= mix(1.0, mix(0.70, 1.28, zgM), uMacro);
// close-range aggregate/grit speckle: the sub-metre albedo break-up a 1K scan mips away by 30 m.
// Without it every paved surface is a flat colour field at 40 m — the defect every judge named first.
diffuseColor.rgb *= mix(1.0, 0.80 + 0.42 * zg_n(zgW * 6.3), 0.45 * zgNear * uMacro);
// --- per-parcel albedo jitter
diffuseColor.rgb *= vec3(1.0) + (vec3(zgRnd, fract(zgRnd * 7.31), fract(zgRnd * 3.17)) - 0.5) * uJitter;

// ---------------- parking apron: painted bays, kerb-stop line, tyre-polished aisle ----------------
if (zgKind > 0.5 && zgKind < 1.5) {
  float bd = max(vBay.y, 1.0), bv = vBay.x;
  float bay = min(5.4, bd * 0.44);
  float dbl = step(11.0, bd);
  float inFront = 1.0 - smoothstep(bay - 0.05, bay + 0.05, bv);
  float inBack = smoothstep(bd - bay - 0.05, bd - bay + 0.05, bv) * dbl;
  float inBay = clamp(inFront + inBack, 0.0, 1.0);
  float sep = zg_stripe(zgL.x + 0.4, 2.55, 0.055) * inBay;
  float head = (zg_stripe(bv - bay, 1000.0, 0.06) + zg_stripe(bv - (bd - bay), 1000.0, 0.06) * dbl) * step(0.4, bv);
  float wearN = 0.45 + 0.55 * zg_n(zgW * 0.9);
  zgPaint = clamp(max(sep, head * inBay), 0.0, 1.0) * (0.42 + 0.58 * wearN) * uDecal;
  // aisle: tyres polish and darken the driving lane between the two bay rows
  float aisle = (1.0 - inBay) * (0.55 + 0.45 * dbl);
  diffuseColor.rgb *= 1.0 - 0.20 * aisle * (0.6 + 0.4 * zg_n(zgW * 0.35));
  zgOil += 0.35 * aisle;
  // random oil drips in the stalls
  vec2 cell = floor(vec2(zgL.x / 2.55, bv / 2.6));
  if (zg_h(cell + 3.1) < 0.16) {
    float sp = 1.0 - smoothstep(0.0, 0.55, length(fract(vec2(zgL.x / 2.55, bv / 2.6)) - 0.5) * 2.2);
    diffuseColor.rgb *= 1.0 - 0.34 * sp * zgNear;
    zgOil += 0.5 * sp;
  }
}
// ---------------- concrete service yard: saw-cut joints, patch repairs, oil stains ----------------
else if (zgKind > 1.5 && zgKind < 2.5) {
  float j = max(zg_stripe(zgL.x + zgRnd, 3.9, 0.035), zg_stripe(zgL.y, 3.9, 0.035));
  diffuseColor.rgb *= 1.0 - 0.34 * j;
  zgRough += 0.05 * j;
  vec2 cell = floor(zgW / 4.2 + zgRnd);
  float ch = zg_h(cell);
  if (ch < 0.22) diffuseColor.rgb *= mix(1.0, ch < 0.11 ? 0.80 : 1.13, 0.85);
  float st = zg_n(zgW * 0.55 + 9.0);
  float oil = smoothstep(0.72, 0.94, st) * zgNear;
  diffuseColor.rgb *= 1.0 - 0.40 * oil;
  zgOil += 0.55 * oil;
}
// ---------------- mown lawn: mower stripes, worn edges, clover patches ----------------
else if (zgKind > 2.5 && zgKind < 3.5) {
  float mow = zg_stripe(zgL.x + 1.1, 4.4, 2.2);
  diffuseColor.rgb *= mix(0.93, 1.08, mow);
  float dry = smoothstep(0.64, 0.92, zg_n(zgW * 0.30 + 4.0));
  zgDirt = clamp(0.30 * dry + 0.30 * (1.0 - zgAO), 0.0, 0.45);
}
// ---------------- driveway: two tyre tracks and an oil drip at the garage end ----------------
else if (zgKind > 3.5 && zgKind < 4.5) {
  // two polished tyre tracks 1.6 m apart, centred on the drive
  float lat = abs(fract(zgL.x / 3.2) - 0.5) * 3.2;
  float trk = 1.0 - smoothstep(0.26, 0.60, abs(lat - 0.80));
  diffuseColor.rgb *= 1.0 - 0.17 * trk;
  zgOil += 0.42 * trk;
  float drip = 1.0 - smoothstep(0.25, 1.15, length(vec2(lat - 0.15, vBay.x - vBay.y * 0.80)));
  diffuseColor.rgb *= 1.0 - 0.32 * drip * zgNear;
  zgOil += 0.5 * drip;
}
// ---------------- planting bed / mulch ----------------
else if (zgKind > 4.5 && zgKind < 5.5) {
  zgDirt = 0.90 - 0.25 * zg_n(zgW * 1.4);
  zgRough += 0.04;
}
// ---------------- gravel + dirt storage yard ----------------
else if (zgKind > 5.5 && zgKind < 6.5) {
  zgDirt = 0.94;
  float g = zg_n(zgW * 3.1);
  diffuseColor.rgb *= mix(0.88, 1.20, g);
  zgRough += 0.06;
}
// ---------------- worn back lot: patch repairs, cracks, drain lids ----------------
else if (zgKind > 6.5 && zgKind < 7.5) {
  vec2 cell = floor(zgW / 5.5 + zgRnd * 4.0);
  float ch = zg_h(cell);
  if (ch < 0.30) diffuseColor.rgb *= mix(1.0, ch < 0.15 ? 0.74 : 1.16, 0.9);
  float cr = smoothstep(0.46, 0.50, zg_n(zgW * 0.42 + 17.0));
  cr *= 1.0 - smoothstep(0.52, 0.56, zg_n(zgW * 0.42 + 17.0));
  diffuseColor.rgb *= 1.0 - 0.55 * cr * zgNear;
  vec2 dcell = floor(zgW / 9.0 + 2.7);
  if (zg_h(dcell + 5.5) < 0.14) {
    float dr = 1.0 - smoothstep(0.30, 0.40, length(fract(zgW / 9.0 + 2.7) - 0.5) * 9.0);
    diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.52, dr * zgNear);
    zgOil += 0.4 * dr;
  }
}
// ---------------- suburban back garden: patchy grass, beds, a worn path ----------------
else if (zgKind > 7.5 && zgKind < 8.5) {
  float zgPatchN = zg_n(zgW * 0.22 + zgRnd * 10.0);
  zgDirt = clamp(smoothstep(0.60, 0.88, zgPatchN) * 0.85 + (1.0 - zgAO) * 0.35, 0.0, 0.9);
  diffuseColor.rgb *= mix(0.90, 1.10, zg_n(zgW * 0.75));
}
// ---------------- plaza paving: large slab grid + a darker kerb course ----------------
else if (zgKind > 8.5) {
  float j = max(zg_stripe(zgL.x + zgRnd * 2.0, 3.0, 0.03), zg_stripe(zgL.y + 0.9, 3.0, 0.03));
  diffuseColor.rgb *= 1.0 - 0.26 * j;
  float course = 1.0 - smoothstep(0.45, 0.62, vBay.x);
  diffuseColor.rgb *= mix(1.0, 0.84, course);
  float grime = smoothstep(0.55, 0.95, zg_n(zgW * 0.42 + 31.0));
  diffuseColor.rgb *= 1.0 - 0.18 * grime;
}

#ifdef ZG_LAWN
{
  vec3 soil = texture2D(uDirtMap, vMapUv * uDirtTile).rgb * uDirtTint;
  diffuseColor.rgb = mix(diffuseColor.rgb, soil * mix(0.86, 1.16, zg_n(zgW * 0.9)), clamp(zgDirt, 0.0, 1.0));
}
#endif

// --- painted markings, then the baked contact/edge occlusion
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.50, 0.485, 0.44) * (0.75 + 0.35 * zgM), zgPaint * 0.92);
diffuseColor.rgb *= mix(uAOAlb, 1.0, zgAO);
`,pe=`
#include <normal_fragment_maps>
{
  vec3 dn = texture2D(normalMap, vNormalMapUv * uDetailTile).xyz * 2.0 - 1.0;
  vec3 dw = vec3(dn.x, 0.0, -dn.y) * (uDetail * zgNear * (1.0 - 0.7 * zgPaint));
  normal = normalize(normal + (viewMatrix * vec4(dw, 0.0)).xyz);
}
`,me=`
#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor + zgRough - 0.30 * zgOil - 0.22 * zgPaint + 0.06 * (zg_n(vWPosG.xz * 0.09) - 0.5), 0.05, 1.0);
`,he=`
#include <aomap_fragment>
{
  float zgOcc = mix(uAOAmb, 1.0, vInfo.z);
  reflectedLight.indirectDiffuse *= zgOcc;
  reflectedLight.indirectSpecular *= zgOcc;
}
`;async function ge(e,t,n,r){let i=oe[t],a={repeat:[1/n,1/n],anisotropy:r};return e.loadPBR(i,a)}async function _e(t){let{engine:n,assets:r}=t,i=n.maxAnisotropy,a={uNight:{value:0},uDecal:{value:1}},o=[],s=ge(r,`dirt`,1.9,i);for(let t of se){let c=await ge(r,t.set,t.tile,i),l=new d({color:new e(t.color),roughness:t.roughness,metalness:0,map:c.map||null,normalMap:c.normalMap||null,roughnessMap:c.roughnessMap||null,aoMap:c.aoMap||null,dithering:!0});l.normalMap&&l.normalScale.set(t.normalScale,t.normalScale),l.aoMap&&(l.aoMapIntensity=.85),l.name=`zoning-ground-`+t.key;let u={...a,uMacro:{value:t.macro},uJitter:{value:t.jitter},uDetail:{value:t.detail},uDetailTile:{value:t.detailTile},uAOAlb:{value:t.aoAlb},uAOAmb:{value:t.aoAmb}};if(t.lawn){let n=await s;u.uDirtMap={value:n.map||null},u.uDirtNormal={value:n.normalMap||null},u.uDirtTile={value:t.tile/1.9},u.uDirtTint={value:new e(11577496)},l.defines={ZG_LAWN:``}}l.userData.uniforms=u,l.customProgramCacheKey=()=>`zoning-ground-`+t.key+`-v2`,l.onBeforeCompile=e=>{Object.assign(e.uniforms,u),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+le).replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+ue),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+de).replace(`#include <map_fragment>`,`#include <map_fragment>
`+fe).replace(`#include <roughnessmap_fragment>`,me).replace(`#include <normal_fragment_maps>`,pe).replace(`#include <aomap_fragment>`,he)},n.registerMaterial(l),o.push(l)}return{materials:o,uniforms:a}}var ve=4,ye=.035,H=.9,be=27,xe=16.5,U=3,Se=22,Ce=100003,we=class{constructor(e,t){this.ctx=e,this.grid=t,this.group=new r,this.group.name=`zoning-ground`,this.meshes=[],this.materials=null,this.uniforms=null,this.dirty=!0,this._timer=0,this._built=0,this.stats={lots:0,tris:0,backfill:0},e.scene.add(this.group)}async init(){let{engine:e}=this.ctx,{materials:t,uniforms:n}=await _e(this.ctx);this.materials=t,this.uniforms=n;for(let n=0;n<4;n++){let r=new l(new o,t[n]);r.name=`zoning-ground-`+n,r.castShadow=!1,r.receiveShadow=!0,r.matrixAutoUpdate=!1,r.frustumCulled=!0,r.layers.enable(e.LAYER_REFLECTED),r.visible=!1,this.meshes.push(r),this.group.add(r)}}update(e,t,n){if(this.uniforms&&(this.uniforms.uNight.value=n||0),!(!this.dirty||!this.materials)&&(this._timer+=e,!(this._timer<.35&&this._built>0))){this._timer=0,this.dirty=!1;try{this.build()}catch(e){console.warn(`[zoning] ground build failed`,e)}}}markDirty(){this.dirty=!0}build(){let e=performance.now(),{world:r}=this.ctx,i=this.grid.lots,a=r.terrain,l=a&&a.getHeight?(e,t)=>a.getHeight(e,t):()=>0,d=a&&a.getNormal?a.getNormal.bind(a):null,m=r.roads&&r.roads.api?r.roads.api:null,h=a&&a.isWater?(e,t)=>a.isWater(e,t):()=>!1,g=new n,_=new n,v=a&&a.getNormal?(e,t)=>(a.getNormal(e,t,_),_.y<.86):()=>!1,y=r.services&&r.services.list||[],b=(e,t)=>{for(let n of y){let r=Math.max(n.w||0,n.d||0)*.5+5;if((e-n.x)**2+(t-n.z)**2<r*r)return!0}return!1},x=new Map,S=r.buildings&&r.buildings.list?r.buildings.list:[];for(let e of S)e&&e.lotId&&x.set(e.lotId,e);let C=[];for(let e=0;e<4;e++)C.push({pos:[],nor:[],uv:[],loc:[],info:[],bay:[],idx:[],n:0});let w=new Set,T=(e,t)=>Math.round(e/U)*Ce+Math.round(t/U);for(let e of i){let t=e.corners;if(!t)continue;let n=1/0,r=-1/0,i=1/0,a=-1/0;for(let e=0;e<8;e+=2)t[e]<n&&(n=t[e]),t[e]>r&&(r=t[e]),t[e+1]<i&&(i=t[e+1]),t[e+1]>a&&(a=t[e+1]);let o=Math.round(n/U),s=Math.round(r/U),c=Math.round(i/U),l=Math.round(a/U);for(let e=o;e<=s;e++)for(let n=c;n<=l;n++)Te(t,e*U,n*U)&&w.add(e*Ce+n)}let E=0,D=[];for(let e of i){if(!e.corners||!(e.w>2)||!(e.d>2))continue;let t=f(u(r.seed|0,p(e.key||e.id))),n=t(),i=ne(e,t),a={H:l,N:d,_n:g,built:x.has(e.id)};for(let t of i)Oe(C,e,t,n,a);ae.has(e.type)&&D.push([Math.min(e.corners[0],e.corners[2],e.corners[4],e.corners[6]),Math.min(e.corners[1],e.corners[3],e.corners[5],e.corners[7]),Math.max(e.corners[0],e.corners[2],e.corners[4],e.corners[6]),Math.max(e.corners[1],e.corners[3],e.corners[5],e.corners[7])]);let o=re(e.type,n);if(!o)continue;let s=ie(e.type,n),c=Math.max(1,Math.round(e.w/U)),_=Math.max(1,Math.round(be/U)),y=e.w/c;for(let t=0;t<c;t++){let r=t*y,i=r+y;for(let t=0;t<_;t++){let c=e.d+t*U,l=c+U,u=Ee(e,(r+i)*.5,(c+l)*.5),d=T(u.x,u.z);if(w.has(d)||h(u.x,u.z)||v(u.x,u.z)||b(u.x,u.z))break;if(m){let e=m.nearest(u.x,u.z,Se);if(e&&e.distance<e.segment.width*.5+3)break}w.add(d);let f=c-e.d>=xe?s:o;Oe(C,e,{u0:r,v0:c,u1:i,v1:l,surf:f.surf,kind:f.kind,bv0:e.d,bd:xe},n,a),E++}}}let O=0;for(let e=0;e<4;e++){let n=C[e],r=this.meshes[e],i=r.geometry;if(!n.n){r.geometry=new o,r.visible=!1,i&&i.dispose();continue}let a=new o;a.setAttribute(`position`,new c(n.pos,3)),a.setAttribute(`normal`,new c(n.nor,3)),a.setAttribute(`uv`,new c(n.uv,2)),a.setAttribute(`aLocal`,new c(n.loc,2)),a.setAttribute(`aInfo`,new c(n.info,4)),a.setAttribute(`aBay`,new c(n.bay,2)),a.setIndex(n.n>65535?new s(n.idx,1):new t(n.idx,1)),a.computeBoundingSphere(),r.geometry=a,r.visible=!0,i&&i.dispose(),O+=n.idx.length/3}let k=this.ctx.world.terrain&&this.ctx.world.terrain.api?this.ctx.world.terrain.api.clearVegetationRect:null;if(k&&D.length&&this._vegDone!==i.length){this._vegDone=i.length;for(let e of D)try{k(e[0],e[1],e[2],e[3])}catch{}}this._built++,this.stats={lots:i.length,tris:O,backfill:E,ms:Math.round(performance.now()-e)}}setVisible(e){this.group.visible=!!e}dispose(){this.ctx.scene.remove(this.group);for(let e of this.meshes)e.geometry&&e.geometry.dispose();if(this.materials)for(let e of this.materials)e.dispose();this.meshes.length=0}};function Te(e,t,n){let r=0;for(let i=0;i<8;i+=2){let a=e[i],o=e[i+1],s=e[(i+2)%8],c=e[(i+3)%8],l=(s-a)*(n-o)-(c-o)*(t-a);if(l!==0){let e=l>0?1:-1;if(r===0)r=e;else if(e!==r)return!1}}return!0}function Ee(e,t,n,r){let i=e.corners,a=e.w>0?t/e.w:0,o=e.d>0?n/e.d:0,s=i[0]+(i[2]-i[0])*a,c=i[1]+(i[3]-i[1])*a,l=i[6]+(i[4]-i[6])*a,u=i[7]+(i[5]-i[7])*a,d=r||{x:0,z:0};return d.x=s+(l-s)*o,d.z=c+(u-c)*o,d}function De(e,t,n,r){let i=e.w,a=e.d,o=.82+.18*W(Math.min(t,i-t)/1.3);if(n>a){let e=r?.24+.76*W((n-a)/2.6):.86+.14*W((n-a)/1.4);return Math.min(e,o)}let s=.7+.3*W(n/1.1),c=(r?.52:.88)+(r?.48:.12)*W((a-n)/1.6);return Math.min(s,o,c)}var W=e=>{let t=e<0?0:e>1?1:e;return t*t*(3-2*t)};function Oe(e,t,n,r,i){if(n.surf<0)return;let a=e[n.surf],o=n.u1-n.u0,s=n.v1-n.v0;if(!(o>.2)||!(s>.2))return;let c=Math.max(1,Math.round(o/ve)),l=Math.max(1,Math.round(s/ve)),u=a.n,d=i.H,f=i.N,p=i._n,m={x:0,z:0};for(let e=0;e<=l;e++){let u=n.v0+s*e/l;for(let e=0;e<=c;e++){let l=n.u0+o*e/c;Ee(t,l,u,m);let h=d(m.x,m.z);h=Math.max(h,d(m.x+H,m.z),d(m.x-H,m.z),d(m.x,m.z+H),d(m.x,m.z-H)),a.pos.push(m.x,h+ye,m.z),f?(f(m.x,m.z,p),a.nor.push(p.x,p.y,p.z)):a.nor.push(0,1,0),a.uv.push(m.x,m.z),a.loc.push(l,u),a.info.push(n.kind,r,De(t,l,u,i.built),0),a.bay.push(u-(n.bv0==null?n.v0:n.bv0),n.bd==null?s:n.bd),a.n++}}let h=c+1;for(let e=0;e<l;e++)for(let t=0;t<c;t++){let n=u+e*h+t,r=n+1,i=n+h,o=i+1;a.idx.push(n,i,r,r,i,o)}}var ke=`zoning`,G=null,K=null,q=null,J=null,Y=[],X={explicit:!1,tool:!1,info:!1},Z=null,Q=null,$={x:0,y:0},Ae=``,je=null;function Me(){if(!q)return;let e=X.explicit||X.tool||X.info;if(q.visible=e,!e)q.setHover(-1),q.setBrush(null);else if(Q&&q.setBrush(Q.rect,Q.type,Q.erase),Z){let e=K.cellAt(Z.x,Z.z);q.setHover(e?e.id:-1)}}function Ne(e){if(!e)return null;let t=e.lot>=0?K.lots[e.lot]:null;return{cx:e.cx,cz:e.cz,x:e.x,z:e.z,yaw:e.yaw,depth:e.k,side:e.side,type:e.type?_[e.type].id:null,segmentId:e.seg,lotId:t?t.id:null,corners:e.corners.slice()}}function Pe(){let e=``;for(let t of K.lots)e+=t.key+`;`;return e}function Fe(e,t){let{world:n,events:r}=G;n.zones.version++,n.zones.lots=K.lots,Ae=Pe(),r.emit(`zones:changed`,{version:n.zones.version,reason:t,lots:K.lots.length,changed:e.map(e=>({cx:e.cx,cz:e.cz,type:e.type?_[e.type].id:null}))})}function Ie(e,t){return G.world.zones.lots=K.lots,!e.length&&Pe()===Ae?0:(q.updatePaint(null),J&&J.markDirty(),Re(),Fe(e,t),e.length)}function Le(e){K.rebuild(),q.rebuildGeometry(),J&&J.markDirty(),G.world.zones.lots=K.lots,Re(),Pe()!==Ae&&Fe([],e)}function Re(){if(!q)return;if(je==null){q.setSelectedLot(-1);return}let e=K.lotById(je);q.setSelectedLot(e?e.index:-1)}async function ze(e){G=e;let{world:t,events:n,input:r}=e;K=new T(t,n),q=new L(e,K),J=new we(e,K),r&&($.x=r.pointer.x,$.y=r.pointer.y),t.zones.version=t.zones.version||0,t.zones.lots=K.lots,t.zones.api={types:h.map(e=>({id:e.id,index:e.index,label:e.label,color:e.color,demand:e.demand,width:e.width.slice(),depth:e.depth.slice()})),cellSize:t.cellSize,maxDepth:4,paint(e,t){return Array.isArray(e)?Ie(K.paintCells(e,t),`paint`):0},paintRect(e,t,n,r,i){return Ie(K.paintRect(e,t,n,r,i),`paint`)},lotsFor(t){return K.ensure(),K.dirty===!1&&e.world.zones.lots!==K.lots&&(e.world.zones.lots=K.lots),t?K.lots.filter(e=>e.type===t):K.lots.slice()},setOverlayVisible(e){X.explicit=!!e,Me()},isOverlayVisible(){return q.visible},cellAt(e,t){return Ne(K.cellAt(e,t))},cellsInRect(e,t,n,r){return K.cellsInRect(e,t,n,r).map(e=>({cx:e.cx,cz:e.cz}))},zoneAt(e,t){let n=K.cellAt(e,t);return n&&n.type?_[n.type].id:null},lotById(e){return K.ensure(),K.lotById(e)},lotAt(e,t){let n=K.cellAt(e,t);return n&&n.lot>=0?K.lots[n.lot]:null},setHover(e,t){if(e==null){Z=null,q.setHover(-1);return}let n=K.cellAt(e,t);Z=n?{x:n.x,z:n.z}:{x:e,z:t},q.setHover(n?n.id:-1)},setBrush(e,t){if(!e){Q=null,q.setBrush(null);return}let n=v(t);Q={rect:e,type:Math.max(0,n),erase:n===0},q.visible&&q.setBrush(e,Q.type,Q.erase)},setOpacity(e){q.setOpacity(e)},clear(){return Ie(K.clear(),`clear`)},refresh(){K.dirty=!0,Le(`refresh`)},stats(){return{...K.stats,drawn:+!!q.visible,version:t.zones.version,frames:K.frames.length,ground:J?J.stats:null}},setGroundVisible(e){J&&J.setVisible(!!e)},groundStats(){return J?J.stats:null}},Y.push(n.on(`roads:changed`,()=>{K.dirty=!0})),Y.push(n.on(`terrain:ready`,()=>{K.geometryVersion++,J&&J.markDirty()})),Y.push(n.on(`building:added`,()=>{J&&J.markDirty()})),Y.push(n.on(`building:removed`,()=>{J&&J.markDirty()})),Y.push(n.on(`tool:changed`,(e,t)=>{X.tool=e===`zone`&&!(t&&t.overlay===!1),X.tool||(Q=null),Me()})),Y.push(n.on(`infoview:changed`,e=>{X.info=!!(e&&e.view===`zoning`),Me()})),Y.push(n.on(`entity:selected`,e=>{je=e&&e.kind===`lot`?e.id:null,Re()})),await J.init(),t.roads&&t.roads.segments&&t.roads.segments.size?Le(`init`):K.dirty=!0,t.tool&&t.tool.active===`zone`&&(X.tool=!0,Me())}function Be(e,t){if(!K||!q)return;let{world:n,camera:r,input:i}=G;K.now=t,K.dirty&&Le(`roads`);let a=n.env?n.env.nightFactor:0;if(q.update(t,r,a),J&&J.update(e,t,a),!q.visible){q.uniforms.uHover.value!==-1&&q.setHover(-1);return}let o=-1;if(i&&(i.pointer.x!==$.x||i.pointer.y!==$.y)&&($.x=i.pointer.x,$.y=i.pointer.y,Z=null),Z){let e=K.cellAt(Z.x,Z.z);o=e?e.id:-1}else if(i&&i.groundValid&&!i.pointerOverUI&&i.pointerInside&&n.tool&&n.tool.active===`zone`){let e=K.cellAt(i.ground.x,i.ground.z);o=e?e.id:-1}q.setHover(o)}function Ve(){for(let e of Y)try{typeof e==`function`&&e()}catch{}Y.length=0,q&&q.dispose(),J&&J.dispose(),q=null,J=null,K=null,Z=null,G&&(G.world.zones.api=null,G.world.zones.lots=[]),G=null}export{Ve as dispose,ze as init,ke as name,Be as update};