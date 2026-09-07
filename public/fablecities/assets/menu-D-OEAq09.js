const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Heightmap-BIXR67n6.js","assets/index-eKs5Uldr.js","assets/noise-D8FvdR-x.js","assets/Backdrop-TXioEIp7.js"])))=>i.map(i=>d[i]);
import{l as e,m as t,o as n,t as r,u as i}from"./index-eKs5Uldr.js";import{t as a}from"./noise-D8FvdR-x.js";var o=`
.fm-root{
  --fm-ink:#05080b;
  --fm-panel:rgba(11,17,24,.80);
  --fm-panel-2:rgba(8,12,17,.86);
  --fm-line:rgba(255,255,255,.10);
  --fm-line-2:rgba(255,255,255,.19);
  --fm-text:#f1f6fa;
  --fm-muted:#9db0c2;
  --fm-dim:#6d8093;
  --fm-accent:#57c8f7;
  --fm-accent-dim:rgba(87,200,247,.16);
  --fm-ui:'Inter','Segoe UI',system-ui,-apple-system,Roboto,sans-serif;
  --fm-mono:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace;
  position:fixed;inset:0;z-index:400;
  font-family:var(--fm-ui);color:var(--fm-text);
  -webkit-font-smoothing:antialiased;
  opacity:1;transition:opacity .55s ease;
  background:var(--fm-ink);
}
.fm-root[data-hidden="1"]{opacity:0;pointer-events:none}

/* ---------------------------------------------------------------- backdrop */
.fm-bg{position:absolute;inset:0;width:100%;height:100%;display:block;
  opacity:0;transition:opacity 1.1s ease}
.fm-root[data-bg="1"] .fm-bg{opacity:1}
.fm-bg-fallback{position:absolute;inset:0;
  background:linear-gradient(180deg,#1d3350 0%,#3a5670 42%,#7d8f92 74%,#43503f 100%)}
.fm-grade{position:absolute;inset:0;pointer-events:none;
  background:
    linear-gradient(100deg,rgba(4,7,10,.90) 0%,rgba(4,7,10,.66) 26%,rgba(4,7,10,.14) 52%,rgba(4,7,10,0) 68%),
    linear-gradient(to top,rgba(4,7,10,.82) 0%,rgba(4,7,10,.10) 30%,rgba(4,7,10,0) 55%),
    radial-gradient(130% 100% at 62% 22%,rgba(4,7,10,0) 34%,rgba(4,7,10,.62) 100%)}

/* ------------------------------------------------------------------- stage */
.fm-stage{position:relative;height:100%;box-sizing:border-box;display:grid;
  grid-template-columns:minmax(0,1fr) 452px;gap:clamp(28px,4vw,64px);align-items:center;
  padding:clamp(26px,4.2vh,54px) clamp(26px,4.6vw,78px)}
.fm-left{min-width:0;max-width:600px;display:flex;flex-direction:column;gap:26px}

/* ------------------------------------------------------------------- brand */
.fm-kicker{display:flex;align-items:center;gap:10px;font:600 11px/1 var(--fm-mono);
  letter-spacing:.22em;text-transform:uppercase;color:var(--fm-accent);margin-bottom:18px}
.fm-kicker i{display:block;width:26px;height:2px;background:var(--fm-accent);border-radius:2px}
.fm-title{margin:0;font-weight:700;line-height:.88;letter-spacing:-.035em;
  font-size:clamp(48px,6.4vw,86px);text-shadow:0 14px 44px rgba(0,0,0,.6)}
.fm-title span{display:block}
.fm-title span:last-child{font-weight:200;color:#cfe0ee}
.fm-tag{margin:20px 0 0;max-width:30ch;font-size:16px;line-height:1.55;color:#c6d5e2;
  text-shadow:0 2px 14px rgba(0,0,0,.55)}

/* -------------------------------------------------------------- help card */
.fm-help{border:1px solid var(--fm-line);border-radius:13px;padding:16px 18px 15px;
  background:rgba(7,11,16,.62);backdrop-filter:blur(14px) saturate(1.1);
  -webkit-backdrop-filter:blur(14px) saturate(1.1);max-width:430px;
  transition:border-color .3s ease,background .3s ease}
.fm-help__hd{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:12px}
.fm-help__hd b{font:600 11px/1 var(--fm-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--fm-muted)}
.fm-help__hd em{font-style:normal;font-size:11px;color:var(--fm-dim)}
.fm-keys{display:grid;grid-template-columns:auto 1fr;gap:8px 14px;margin:0;font-size:13px}
.fm-keys dt{display:flex;gap:4px;align-items:center}
.fm-keys dd{margin:0;color:var(--fm-muted);align-self:center}
.fm-k{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;
  padding:0 6px;border-radius:5px;border:1px solid var(--fm-line-2);border-bottom-width:2px;
  background:rgba(255,255,255,.07);font:600 11px/1 var(--fm-mono);color:#dbe6f0;white-space:nowrap}
.fm-help__tip{display:flex;gap:9px;align-items:flex-start;margin:14px 0 0;padding-top:13px;
  border-top:1px solid var(--fm-line);font-size:13px;line-height:1.5;color:#d6e3ee}
.fm-help__tip b{color:var(--fm-accent);font-weight:600}
.fm-help[data-emph="1"]{border-color:rgba(87,200,247,.45);background:rgba(9,20,28,.74)}

/* ------------------------------------------------------------------- panel */
.fm-panel{position:relative;box-sizing:border-box;border-radius:16px;padding:22px 22px 18px;
  background:linear-gradient(180deg,var(--fm-panel),var(--fm-panel-2));
  border:1px solid var(--fm-line);
  box-shadow:0 44px 110px -34px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.07);
  backdrop-filter:blur(22px) saturate(1.2);-webkit-backdrop-filter:blur(22px) saturate(1.2);
  max-height:100%;overflow:auto;overscroll-behavior:contain}
.fm-panel__hd{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:16px}
.fm-panel__hd h2{margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em}
.fm-panel__hd span{font:500 11px/1 var(--fm-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--fm-dim)}

/* ------------------------------------------------------------------ fields */
.fm-fields{display:grid;grid-template-columns:1fr 152px;gap:12px;margin-bottom:16px}
.fm-field{display:flex;flex-direction:column;gap:7px;min-width:0}
.fm-field>label,.fm-legend{font:600 10px/1 var(--fm-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--fm-dim)}
.fm-input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:9px;
  background:rgba(3,6,9,.62);color:var(--fm-text);border:1px solid var(--fm-line);
  font:400 15px/1.2 var(--fm-ui);transition:border-color .16s,box-shadow .16s,background .16s}
.fm-input::placeholder{color:#7d92a6}
.fm-input:hover{border-color:var(--fm-line-2)}
.fm-input:focus-visible,.fm-input:focus{outline:2px solid var(--fm-accent);outline-offset:1px;
  border-color:var(--fm-accent);background:rgba(3,6,9,.8)}
.fm-seedrow{display:flex;gap:7px}
.fm-seedrow .fm-input{font-family:var(--fm-mono);font-size:14px;letter-spacing:.06em;
  -moz-appearance:textfield;min-width:0}
.fm-seedrow .fm-input::-webkit-outer-spin-button,
.fm-seedrow .fm-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.fm-icon-btn{flex:0 0 40px;height:40px;display:grid;place-items:center;border-radius:9px;cursor:pointer;
  background:rgba(255,255,255,.05);border:1px solid var(--fm-line);color:#cfdce7;
  transition:border-color .16s,color .16s,background .16s,transform .3s ease}
.fm-icon-btn:hover{border-color:var(--fm-accent);color:#fff;background:rgba(87,200,247,.12)}
.fm-icon-btn:focus-visible{outline:2px solid var(--fm-accent);outline-offset:2px;border-color:var(--fm-accent);color:#fff}
.fm-icon-btn svg{width:17px;height:17px;display:block}
.fm-icon-btn[data-spin="1"] svg{animation:fm-spin .5s cubic-bezier(.4,0,.2,1)}
@keyframes fm-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

/* ----------------------------------------------------------------- quality */
.fm-quality{border:0;padding:0;margin:0 0 18px;min-width:0}
.fm-legend{padding:0;margin-bottom:7px;display:block}
.fm-seg{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:3px;padding:3px;border-radius:10px;
  background:rgba(3,6,9,.62);border:1px solid var(--fm-line)}
.fm-seg input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.fm-seg label{display:block;text-align:center;padding:8px 4px;border-radius:7px;cursor:pointer;
  font-size:12.5px;font-weight:500;color:var(--fm-muted);border:1px solid transparent;
  transition:background .16s,color .16s}
.fm-seg label:hover{color:var(--fm-text);background:rgba(255,255,255,.05)}
.fm-seg input:checked+label{background:rgba(87,200,247,.17);border-color:rgba(87,200,247,.42);
  color:#dff3ff;font-weight:600}
.fm-seg input:focus-visible+label{outline:2px solid var(--fm-accent);outline-offset:1px;color:#dff3ff}
.fm-qnote{margin:8px 2px 0;font-size:12px;line-height:1.5;color:var(--fm-dim);min-height:18px}
.fm-qnote[data-ok="1"]{color:var(--fm-accent)}

/* ----------------------------------------------------------------- choices */
.fm-choices{display:grid;gap:10px}
.fm-choice{display:flex;align-items:center;gap:14px;width:100%;box-sizing:border-box;
  padding:11px 13px 11px 11px;border-radius:13px;cursor:pointer;text-align:left;font:inherit;
  background:rgba(255,255,255,.035);border:1px solid var(--fm-line);color:var(--fm-text);
  transition:border-color .18s,background .18s,transform .18s}
.fm-choice:hover{border-color:var(--fm-line-2);background:rgba(255,255,255,.07);transform:translateY(-1px)}
.fm-choice:focus-visible{outline:2px solid var(--fm-accent);outline-offset:2px;border-color:var(--fm-accent)}
.fm-choice--primary{background:linear-gradient(105deg,rgba(87,200,247,.15),rgba(87,200,247,.05));
  border-color:rgba(87,200,247,.34)}
.fm-choice--primary:hover{background:linear-gradient(105deg,rgba(87,200,247,.24),rgba(87,200,247,.08));
  border-color:rgba(87,200,247,.6)}
.fm-choice__thumb{position:relative;flex:0 0 108px;height:78px;border-radius:9px;overflow:hidden;
  background:#0d151d;border:1px solid rgba(255,255,255,.12);display:block}
.fm-choice__thumb canvas,.fm-choice__thumb img{display:block;width:100%;height:100%;object-fit:cover}
.fm-choice__tag{position:absolute;left:0;bottom:0;right:0;padding:3px 6px;
  font:600 9.5px/1.3 var(--fm-mono);letter-spacing:.1em;text-transform:uppercase;color:#e6f1f9;
  background:linear-gradient(to top,rgba(0,0,0,.78),rgba(0,0,0,0))}
.fm-choice__body{flex:1 1 auto;min-width:0;display:block}
.fm-choice__title{display:block;font-size:16px;font-weight:600;letter-spacing:-.01em;margin-bottom:3px}
.fm-choice__desc{display:block;font-size:12.5px;line-height:1.45;color:var(--fm-muted)}
.fm-choice__go{flex:0 0 auto;width:18px;height:18px;color:var(--fm-dim);transition:transform .18s,color .18s}
.fm-choice:hover .fm-choice__go{transform:translateX(3px);color:var(--fm-accent)}

.fm-foot{margin-top:14px;padding-top:12px;border-top:1px solid var(--fm-line);
  display:flex;justify-content:space-between;gap:10px;font:500 11px/1.4 var(--fm-mono);
  letter-spacing:.08em;color:var(--fm-dim);text-transform:uppercase}

/* ----------------------------------------------------------------- loading */
.fm-load{display:flex;flex-direction:column;gap:0}
.fm-load__eyebrow{font:600 10px/1 var(--fm-mono);letter-spacing:.2em;text-transform:uppercase;
  color:var(--fm-accent);margin-bottom:10px}
.fm-load__name{font-size:26px;font-weight:600;letter-spacing:-.02em;line-height:1.15;
  overflow-wrap:anywhere}
.fm-load__meta{margin-top:6px;font:500 12px/1.4 var(--fm-mono);letter-spacing:.06em;color:var(--fm-dim)}
.fm-bar{position:relative;height:4px;border-radius:3px;background:rgba(255,255,255,.09);
  overflow:hidden;margin:20px 0 10px}
.fm-bar>i{position:absolute;inset:0 auto 0 0;width:0;border-radius:3px;
  background:linear-gradient(90deg,#3aa7dd,var(--fm-accent));transition:width .35s cubic-bezier(.4,0,.2,1)}
.fm-status{display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--fm-muted);min-height:19px}
.fm-status i{flex:0 0 6px;height:6px;border-radius:50%;background:var(--fm-accent);
  animation:fm-pulse 1.5s ease-in-out infinite}
@keyframes fm-pulse{0%,100%{opacity:.35;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}
.fm-load__pct{margin-left:auto;font:600 12px/1 var(--fm-mono);color:var(--fm-dim);letter-spacing:.06em}

/* -------------------------------------------------------------- applying q */
.fm-apply{position:absolute;inset:0;z-index:5;display:none;flex-direction:column;
  align-items:center;justify-content:center;gap:14px;border-radius:16px;
  background:rgba(6,10,14,.9);backdrop-filter:blur(4px)}
.fm-root[data-phase="applying"] .fm-apply{display:flex}
.fm-apply__ring{width:26px;height:26px;border-radius:50%;border:2px solid rgba(255,255,255,.16);
  border-top-color:var(--fm-accent);animation:fm-rot .8s linear infinite}
@keyframes fm-rot{to{transform:rotate(360deg)}}
.fm-apply__txt{font-size:13px;color:var(--fm-muted)}

.fm-root[data-phase="loading"] .fm-choose{display:none}
.fm-root[data-phase="loading"] .fm-bg{transform:scale(1.055);transition:transform 26s linear,opacity 1.1s ease}
@media (prefers-reduced-motion:reduce){.fm-root[data-phase="loading"] .fm-bg{transform:none}}
.fm-root:not([data-phase="loading"]) .fm-load{display:none}

/* --------------------------------------------------------------- responsive */
@media (max-width:1080px){
  .fm-stage{grid-template-columns:minmax(0,1fr) 400px;gap:32px}
  .fm-title{font-size:clamp(42px,5.4vw,60px)}
}
@media (max-width:880px){
  .fm-stage{grid-template-columns:minmax(0,1fr);align-items:start;align-content:start;
    gap:16px;padding:22px 16px 30px;overflow-y:auto;-webkit-overflow-scrolling:touch}
  .fm-left{display:contents}
  .fm-brand{order:1;max-width:none}
  .fm-panel{order:2;max-height:none;overflow:visible}
  .fm-help{order:3;max-width:none}
  .fm-kicker{margin-bottom:12px}
  .fm-title{font-size:clamp(40px,13vw,58px)}
  .fm-tag{margin-top:12px;font-size:14.5px;max-width:34ch}
  .fm-grade{background:
    linear-gradient(to bottom,rgba(4,7,10,.18) 0%,rgba(4,7,10,.52) 30%,rgba(4,7,10,.86) 74%,rgba(4,7,10,.94) 100%)}
}
@media (max-height:560px) and (min-width:881px){
  .fm-title{font-size:clamp(38px,4.6vw,54px)}
  .fm-tag{margin-top:12px;font-size:14px}
}

@media (prefers-reduced-motion:reduce){
  .fm-root,.fm-bg,.fm-choice,.fm-input,.fm-icon-btn,.fm-seg label,.fm-bar>i,.fm-choice__go,.fm-help{
    transition-duration:.01ms!important}
  .fm-status i,.fm-apply__ring,.fm-icon-btn[data-spin="1"] svg{animation:none!important}
  .fm-choice:hover{transform:none}
}
@media (forced-colors:active){
  .fm-choice,.fm-input,.fm-icon-btn,.fm-seg{border-color:ButtonBorder}
  .fm-seg input:checked+label{background:Highlight;color:HighlightText}
}
`;function s(){if(document.getElementById(`fm-menu-styles`))return;let e=document.createElement(`style`);e.id=`fm-menu-styles`,e.textContent=o,document.head.appendChild(e)}var c=[`New`,`Port`,`Fort`,`Lake`,`Mount`,`Cape`,`North`,`East`,`West`,`South`,`Old`,`Saint`,`Great`,`Little`,`Upper`],l=`Fable.Haven.Ridge.Harbour.Vale.Crest.Reach.Marrow.Hollow.Aster.Kessel.Bramble.Quill.Alder.Thorne.Sable.Wren.Larkin.Hallow.Vesper.Corbin.Marlow.Ember.Ashby.Dunmore.Selby.Ravel.Halcyon.Belden.Ferrow`.split(`.`),u=[`ton`,`ford`,`burgh`,`stead`,`mouth`,`bury`,`field`,`wick`,`holm`,`gate`,`shore`,`dale`,`moor`,`bridge`],d=[`Bay`,`Falls`,`Point`,`Junction`,`Crossing`,`Landing`,`Heights`,`Springs`,`Basin`,`Quarry`,`Sound`,`Mills`];function f(e){let n=t(e>>>0^6240913),r=n.pick(l),i=n();return i<.3?`${n.pick(c)} ${r}`:i<.62?`${r}${n.pick(u)}`:i<.84?`${r} ${n.pick(d)}`:`${n.pick(c)} ${r}${n.pick(u)}`}function p(){let e=new Uint32Array(1);return typeof crypto<`u`&&crypto.getRandomValues?crypto.getRandomValues(e):e[0]=Math.random()*4294967295>>>0,e[0]%1e6}async function m(e){try{let t=new(await(r(()=>import(`./Heightmap-BIXR67n6.js`),__vite__mapDeps([0,1,2])))).Heightmap({size:2048,spacing:2,seed:e>>>0}),n=t.sampleGen(0,0,1);if(Number.isFinite(n))return{sample:(e,n,r)=>t.sampleGen(e,n,r),waterLevel:Number.isFinite(t.waterLevel)?t.waterLevel:0,real:!0}}catch(e){typeof console<`u`&&console.info&&console.info(`[menu] terrain generator unavailable, using preview stand-in`,e&&e.message)}return h(e)}function h(t){let r=t>>>0,o=new a(r*7+1),s=new a(r*7+2),c=new a(r*7+4),l=new a(r*7+5),u=new a(r*7+7),d=(e,t,n)=>t+(n-t)*(.5+.5*c.noise2D(e*13.7,-e*3.1)),f={x0:d(1,-420,-180),amp:d(2,140,220),wave:d(3,380,520),phase:d(4,0,6.283),width:d(5,26,38)},p={z0:d(6,560,700),amp:d(7,90,160),wave:d(8,420,620),phase:d(9,0,6.283)},m=e=>f.x0+f.amp*Math.sin(e/f.wave+f.phase)+70*l.noise2D(e/260,3.3),h=e=>p.z0+p.amp*Math.sin(e/p.wave+p.phase)+60*u.noise2D(e/300,1.5);return{sample:(t,r,a=0)=>{let l=a===0?4:a===1?3:2,u=o.fbm2D(t/1150,r/1150,3),d=s.fbm2D(t/300,r/300,l),p=i(-.05,.55,u+.15*d),g=7.5+1.6*d+(1-p)*(5*s.fbm2D(t/230,r/230,3))+p*(34+26*d),_=c.fbm2D(t/1500+4.2,r/1500-1.7,3)+.7*(-n(r,-1024,1024)/1024)-.05,v=i(.22,.7,_)*i(120,520,Math.hypot(t,r)),y=60+150*c.ridged2D(t/360+9,r/360-5,l+1,2.1,.5),b=r-h(t),x=Math.abs(t-m(r)),S=f.width*(1+.9*i(-420,60,b));return v*=i(120,460,x)*i(-80,-520,b),g=e(g,4.6+1.4*d,i(260,90,x)),g+=v*y,g=e(g,3.8+1.2*d,i(-460,-140,b)*(1-v)*.92),g=e(g,1.4-2.6*(b+80)/80,i(-80,0,b)*.95),x<S&&(g=Math.min(g,.7-9*(1-x/S*(x/S))**1.15)),b>0&&(g=Math.min(g,e(g,-2.5-20*i(0,900,b),i(0,40,b)))),g},waterLevel:0,real:!1}}var g=1024,_=1180,v=[[-24,18,40,58],[-6,30,74,96],[-.5,62,122,134],[.6,190,176,138],[4,108,128,74],[26,92,114,64],[70,122,118,78],[130,122,112,98],[180,196,200,202],[260,236,242,246]];function y(e,t){let n=0;for(;n<v.length-1&&e>v[n+1][0];)n++;let r=v[Math.max(0,n)],i=v[Math.min(v.length-1,n+1)],a=i[0]===r[0]?0:Math.min(1,Math.max(0,(e-r[0])/(i[0]-r[0])));t[0]=r[1]+(i[1]-r[1])*a,t[1]=r[2]+(i[2]-r[2])*a,t[2]=r[3]+(i[3]-r[3])*a}function b(e,t,n={}){let r=Math.min(window.devicePixelRatio||1,2),i=e.clientWidth||120,a=e.clientHeight||120;e.width=Math.round(i*r),e.height=Math.round(a*r);let o=e.getContext(`2d`);if(!o)return;let s=Math.max(.25,Math.min(4,e.width/e.height)),c=Math.max(48,Math.min(n.grid||176,220)),l=Math.round(s>=1?c:c*s),u=Math.round(s>=1?c*s:c),d=n.viewHalf||_,f=d*s,p=n.lod==null?2:n.lod,m=f*2/(u-1),h=d*2/(l-1),v=new Float32Array(u*l);for(let e=0;e<l;e++){let n=-d+e*h;for(let r=0;r<u;r++)v[e*u+r]=t.sample(-f+r*m,n,p)}let b=o.createImageData(u,l),x=b.data,S=[0,0,0];for(let e=0;e<l;e++)for(let t=0;t<u;t++){let n=e*u+t,r=v[n];y(r,S);let i=v[e*u+(t>0?t-1:t)],a=v[e*u+(t<u-1?t+1:t)],o=v[(e>0?e-1:e)*u+t],s=v[(e<l-1?e+1:e)*u+t],c=(a-i)/(2*m),d=(s-o)/(2*h),f=1/Math.sqrt(c*c+d*d+1),p=-c*f,g=f,_=-d*f,b=p*-.62+g*.66+_*-.42;b=.52+.72*Math.max(0,b),r<=0&&(b=.82+.18*b);let C=n*4;x[C]=Math.min(255,S[0]*b),x[C+1]=Math.min(255,S[1]*b),x[C+2]=Math.min(255,S[2]*b),x[C+3]=255}let C=document.createElement(`canvas`);if(C.width=u,C.height=l,C.getContext(`2d`).putImageData(b,0,0),o.save(),o.imageSmoothingEnabled=!0,o.imageSmoothingQuality=`high`,o.clearRect(0,0,e.width,e.height),o.drawImage(C,0,0,e.width,e.height),n.showFrame!==!1){let t=e.width/(f*2),n=e.height/(d*2),i=(f-g)*t,a=(d-g)*n;o.strokeStyle=`rgba(255,255,255,.34)`,o.lineWidth=Math.max(1,r),o.setLineDash([4*r,4*r]),o.strokeRect(i,a,e.width-2*i,e.height-2*a),o.setLineDash([])}o.restore()}var x=`menu`,S=`fable.menu.v2`,C=[[`low`,`Low`,`Fastest. No ambient occlusion, no reflections.`],[`medium`,`Medium`,`For laptops and integrated graphics.`],[`high`,`High`,`Recommended. Soft shadows, AO, water reflections.`],[`ultra`,`Ultra`,`4K shadows and the longest draw distance.`]],w=null,T=null,E=null,D=null,O=null,k={target:.02,shown:0,text:`Preparing`,stamp:0,timer:0},A=[],j=[],M=!1;async function N(){}function P(){}function F(e,t={}){let{world:n,config:r,events:i}=e,a=!!t.preview;M=!1,s();let o=window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,c=Z(),l=r.quality||`high`,u=Y(c&&Number.isFinite(c.seed)?c.seed:r.seed),d=c&&c.cityName||``;w=document.createElement(`div`),w.className=`fm-root`,w.dataset.phase=`choose`,w.innerHTML=ee(u,f(u),d,l),document.body.appendChild(w);let m=e=>w.querySelector(e);T={bg:m(`#fm-bg`),fallback:m(`#fm-bg-fallback`),form:m(`#fm-form`),nameInput:m(`#fm-name`),seedInput:m(`#fm-seed`),reroll:m(`#fm-reroll`),seedmap:m(`#fm-seedmap`),seedTag:m(`#fm-seed-tag`),qnote:m(`#fm-qnote`),newBtn:m(`#fm-new`),demoBtn:m(`#fm-demo`),help:m(`#fm-help`),helpNote:m(`#fm-help-note`),loadName:m(`#fm-load-name`),loadMeta:m(`#fm-load-meta`),bar:m(`#fm-bar`),status:m(`#fm-status-text`),pct:m(`#fm-pct`),applyTxt:m(`#fm-apply-txt`),foot:m(`#fm-foot-seed`)},R(u,o);let h=0,g=0,_=(e,t)=>{T.seedTag.textContent=`Seed ${e}`,T.foot.textContent=`Seed ${e} · 2048 m`,T.nameInput.value||(T.nameInput.placeholder=f(e)),clearTimeout(h),clearTimeout(g),h=setTimeout(()=>z(e,`map`),t?0:140),g=setTimeout(()=>z(e,`backdrop`),t?60:460)};J(T.seedInput,`input`,()=>{let e=T.seedInput.value.trim();if(e===``)return;let t=parseInt(e,10),n=Y(t);(!Number.isFinite(t)||t!==n)&&(T.seedInput.value=String(n)),_(n,!1)}),J(T.seedInput,`blur`,()=>{let e=Y(parseInt(T.seedInput.value,10));T.seedInput.value=String(e),_(e,!1)}),J(T.reroll,`click`,()=>{let e=p();T.seedInput.value=String(e),T.reroll.dataset.spin=`1`,setTimeout(()=>{T&&T.reroll&&delete T.reroll.dataset.spin},520),_(e,!0)});let v=(e,t)=>{let n=C.find(t=>t[0]===e);T.qnote.textContent=(t||``)+(n?n[2]:``)};v(l),c&&c.appliedQuality&&c.appliedQuality===l&&(v(l,`${X(l)} quality applied — `),T.qnote.dataset.ok=`1`,setTimeout(()=>{T&&(v(l),delete T.qnote.dataset.ok)},7e3));for(let t of w.querySelectorAll(`input[name="fm-quality"]`))J(t,`change`,()=>{let n=t.value;v(n),n!==l&&V(n,e)});let y=n.time.paused,b=e=>{if(!w||w.dataset.phase!==`choose`)return;let t=Y(parseInt(T.seedInput.value,10)),r=(T.nameInput.value||T.nameInput.placeholder||`New Fable`).trim().slice(0,28);n.time.paused=y,a?setTimeout(L,60):(H(e,t,r),G(i));let o={mode:e,seed:t,cityName:r,quality:l};if(O){let e=O;O=null,e(o)}};return J(T.newBtn,`click`,()=>b(`new`)),J(T.demoBtn,`click`,()=>b(`demo`)),J(T.form,`submit`,e=>{e.preventDefault(),b(`new`)}),J(w,`keydown`,e=>{if(e.key!==`Tab`||w.dataset.phase!==`choose`)return;let t=q();if(!t.length)return;let n=t[0],r=t[t.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),r.focus()):!e.shiftKey&&document.activeElement===r&&(e.preventDefault(),n.focus())}),J(window,`resize`,()=>{E&&E.resize()}),a||(n.time.paused=!0),setTimeout(()=>{T&&T.newBtn&&T.newBtn.focus({preventScroll:!0})},80),new Promise(e=>{O=e})}function I(e,t){Number.isFinite(e)&&(k.target=Math.max(k.target,Math.min(1,Math.max(0,e))),k.stamp=performance.now()),t&&(k.text=String(t)),W()}function L(){if(!w||M)return;M=!0;let e=w;e.dataset.hidden=`1`,e.setAttribute(`aria-hidden`,`true`);for(let e of j)try{e()}catch{}j=[];for(let e of A)try{e.disconnect()}catch{}A=[],clearInterval(k.timer),k.timer=0;let t=E;E=null,w=null,T=null,setTimeout(()=>{t&&t.dispose(),e.remove();let n=document.getElementById(`game`);n&&document.activeElement===document.body&&n.focus({preventScroll:!0})},620)}function R(e,t){m(e).then(async e=>{if(!w)return;D=e,B();let n=window.innerWidth*window.innerHeight<62e4||(navigator.hardwareConcurrency||8)<=4?`low`:`high`;try{let{Backdrop:i}=await r(async()=>{let{Backdrop:e}=await import(`./Backdrop-TXioEIp7.js`);return{Backdrop:e}},__vite__mapDeps([3,1]));if(!w)return;if(E=new i(T.bg,{reducedMotion:t,tier:n}),!E.ok){E=null;return}if(E.resize(),await E.setSource(e),!w||!E)return;w.dataset.bg=`1`,t?E.renderOnce():E.start()}catch(e){E=null,console.info(`[menu] 3D backdrop unavailable`,e&&e.message)}})}function z(e,t){m(e).then(e=>{w&&(D=e,t===`map`?B():E&&E.setSource(e))})}function B(){if(!(!T||!T.seedmap||!D))try{b(T.seedmap,D,{grid:168})}catch{}}function V(e,t){Q({seed:Y(parseInt(T.seedInput.value,10)),cityName:T.nameInput.value.trim(),appliedQuality:e}),w.dataset.phase=`applying`,T.applyTxt.textContent=`Applying ${X(e)} quality…`;let n=new URL(window.location.href);n.searchParams.set(`quality`,e),setTimeout(()=>window.location.replace(n.toString()),380)}function H(e,t,n){w.dataset.phase=`loading`,T.loadName.textContent=n,T.loadMeta.textContent=e===`demo`?`Demo city · seed ${t}`:`Empty map · seed ${t}`,T.help.dataset.emph=`1`,T.helpNote.textContent=`Read this while it builds`,k={target:.03,shown:0,text:e===`demo`?`Waking the city`:`Shaping the land`,stamp:performance.now(),timer:0},W(),E&&E.stop(),k.timer=setInterval(U,180),document.activeElement&&w.contains(document.activeElement)&&document.activeElement.blur()}function U(){if(!w)return;let e=(performance.now()-k.stamp)/1e3,t=Math.min(.09,e*.018),n=Math.min(.99,k.target+t);k.shown+=(n-k.shown)*.22,W()}function W(){if(!T||!T.bar)return;let e=Math.max(k.shown,Math.min(k.target,.995));k.shown=e,T.bar.style.width=`${(e*100).toFixed(1)}%`,T.status.textContent=k.text,T.pct.textContent=`${Math.round(e*100)}%`}function G(e){let t=document.getElementById(`loading-bar`),n=document.getElementById(`loading-status`),r=()=>{let e=t?parseFloat(t.style.width):NaN;I(Number.isFinite(e)?e/100:void 0,n?K(n.textContent):void 0)};if(t&&window.MutationObserver){let e=new MutationObserver(r);e.observe(t,{attributes:!0,attributeFilter:[`style`]}),A.push(e)}if(n&&window.MutationObserver){let e=new MutationObserver(r);e.observe(n,{childList:!0,characterData:!0,subtree:!0}),A.push(e)}r();let i=()=>{I(1,`Ready`),setTimeout(L,420)};e&&e.on&&(e.on(`game:ready`,i),e.off&&j.push(()=>e.off(`game:ready`,i)));let a=setTimeout(()=>{w&&L()},12e4);j.push(()=>clearTimeout(a))}function K(e){if(!e)return;let t=String(e).trim();return!t||t===`Ready`?t||void 0:/[.…!?]$/.test(t)?t:`${t}…`}function q(){return w?Array.from(w.querySelectorAll(`button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])`)).filter(e=>!e.disabled&&e.offsetParent!==null):[]}function J(e,t,n,r){e.addEventListener(t,n,r),j.push(()=>e.removeEventListener(t,n,r))}function Y(e){return(Number.isFinite(e)?Math.abs(Math.round(e)):1337)%1e6}function X(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Z(){try{let e=sessionStorage.getItem(S);return e?(sessionStorage.removeItem(S),JSON.parse(e)):null}catch{return null}}function Q(e){try{sessionStorage.setItem(S,JSON.stringify(e))}catch{}}function ee(e,t,n,r){let i=`<svg class="fm-choice__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>`,a=C.map(([e,t])=>`
        <input type="radio" name="fm-quality" id="fm-q-${e}" value="${e}"${e===r?` checked`:``}>
        <label for="fm-q-${e}">${t}</label>`).join(``);return`
  <div id="fm-bg-fallback" class="fm-bg-fallback" aria-hidden="true"></div>
  <canvas id="fm-bg" class="fm-bg" aria-hidden="true"></canvas>
  <div class="fm-grade" aria-hidden="true"></div>

  <div class="fm-stage" role="dialog" aria-modal="true" aria-labelledby="fm-title" aria-describedby="fm-tag">
    <div class="fm-left">
      <div class="fm-brand">
        <div class="fm-kicker"><i></i>A city builder in your browser</div>
        <h1 class="fm-title" id="fm-title"><span>Fable</span><span>Cities</span></h1>
        <p class="fm-tag" id="fm-tag">Draw one road across empty land, and a city grows along it — traffic, districts, skyline and all.</p>
      </div>

      <div class="fm-help" id="fm-help">
        <div class="fm-help__hd"><b>Controls</b><em id="fm-help-note">Everything you need</em></div>
        <dl class="fm-keys">
          <dt><span class="fm-k">W</span><span class="fm-k">A</span><span class="fm-k">S</span><span class="fm-k">D</span></dt>
          <dd>Pan across the map</dd>
          <dt><span class="fm-k">Right-drag</span></dt>
          <dd>Rotate and tilt the camera</dd>
          <dt><span class="fm-k">Wheel</span></dt>
          <dd>Zoom in and out</dd>
          <dt><span class="fm-k">1</span><span class="fm-k">2</span><span class="fm-k">3</span><span class="fm-k">4</span></dt>
          <dd>Roads · Zoning · Services · Bulldoze</dd>
          <dt><span class="fm-k">Esc</span></dt>
          <dd>Cancel the current tool</dd>
        </dl>
        <p class="fm-help__tip"><b>Start here</b> Pick the road tool, click a start and an end point on the ground — then zone beside it. Nothing else can be built until a road exists.</p>
      </div>
    </div>

    <div class="fm-panel">
      <form id="fm-form" class="fm-choose" novalidate>
        <div class="fm-panel__hd"><h2>Start a world</h2><span>Step 1 of 1</span></div>

        <div class="fm-fields">
          <div class="fm-field">
            <label for="fm-name">City name</label>
            <input class="fm-input" id="fm-name" type="text" maxlength="28" autocomplete="off"
                   spellcheck="false" placeholder="${$(t)}" value="${$(n)}">
          </div>
          <div class="fm-field">
            <label for="fm-seed">Map seed</label>
            <div class="fm-seedrow">
              <input class="fm-input" id="fm-seed" type="number" inputmode="numeric" min="0" max="999999"
                     step="1" autocomplete="off" value="${e}">
              <button class="fm-icon-btn" id="fm-reroll" type="button" title="Roll a new seed" aria-label="Roll a new map seed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/></svg>
              </button>
            </div>
          </div>
        </div>

        <fieldset class="fm-quality">
          <legend class="fm-legend">Graphics quality</legend>
          <div class="fm-seg">${a}</div>
          <p class="fm-qnote" id="fm-qnote"></p>
        </fieldset>

        <div class="fm-choices">
          <button class="fm-choice fm-choice--primary" id="fm-new" type="button">
            <span class="fm-choice__thumb">
              <canvas id="fm-seedmap" width="216" height="156" aria-hidden="true"></canvas>
              <span class="fm-choice__tag" id="fm-seed-tag">Seed ${e}</span>
            </span>
            <span class="fm-choice__body">
              <span class="fm-choice__title">New city</span>
              <span class="fm-choice__desc">Empty land generated from your seed. You lay the first road.</span>
            </span>${i}
          </button>
          <button class="fm-choice" id="fm-demo" type="button">
            <span class="fm-choice__thumb">
              <img src="./assets/menu/demo-city.jpg" alt="" width="640" height="480" loading="eager" decoding="async">
              <span class="fm-choice__tag">Grown city</span>
            </span>
            <span class="fm-choice__body">
              <span class="fm-choice__title">Load demo city</span>
              <span class="fm-choice__desc">Thousands of residents, live traffic and services. Good for a look around.</span>
            </span>${i}
          </button>
        </div>

        <div class="fm-foot"><span id="fm-foot-seed">Seed ${e} · 2048 m</span><span>Three.js r185</span></div>
      </form>

      <div class="fm-load" id="fm-load">
        <div class="fm-load__eyebrow">Building your world</div>
        <div class="fm-load__name" id="fm-load-name">New Fable</div>
        <div class="fm-load__meta" id="fm-load-meta"></div>
        <div class="fm-bar"><i id="fm-bar"></i></div>
        <div class="fm-status" role="status" aria-live="polite">
          <i aria-hidden="true"></i><span id="fm-status-text">Preparing</span><span class="fm-load__pct" id="fm-pct">0%</span>
        </div>
      </div>

      <div class="fm-apply" role="status" aria-live="polite">
        <div class="fm-apply__ring"></div>
        <div class="fm-apply__txt" id="fm-apply-txt">Applying quality…</div>
      </div>
    </div>
  </div>`}function $(e){return String(e??``).replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}export{L as hide,N as init,x as name,I as setProgress,F as showStartScreen,P as update};