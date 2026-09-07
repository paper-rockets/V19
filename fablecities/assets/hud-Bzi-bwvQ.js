import{n as e,t}from"./services-_Y63HTyQ.js";import{t as n}from"./simulation-h3_GtaAP.js";var r=`
#sim-hud { position: absolute; left: 18px; top: 92px; width: 332px; max-height: calc(100vh - 220px); overflow-y: auto; scrollbar-width: none; color: #e8edf2; font: 12px/1.35 'Inter', 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(160deg, rgba(14,20,28,.86), rgba(10,14,20,.78)); border: 1px solid rgba(255,255,255,.09); border-radius: 12px;
  box-shadow: 0 18px 50px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); overflow: hidden; }
#sim-hud * { box-sizing: border-box; }
#sim-hud .hd { display: flex; justify-content: space-between; align-items: baseline; padding: 12px 14px 8px; border-bottom: 1px solid rgba(255,255,255,.07); cursor: pointer; user-select: none; }
#sim-hud.collapsed .hd { border-bottom: 0; padding-bottom: 10px; }
#sim-hud.collapsed .body { display: none; }
#sim-hud .hd .name { font-size: 15px; font-weight: 600; letter-spacing: .02em; }
#sim-hud .hd .date { color: #9fb1c4; font-variant-numeric: tabular-nums; font-size: 11px; text-align: right; }
#sim-hud .hd .speed { display: inline-flex; gap: 2px; margin-left: 6px; vertical-align: middle; }
#sim-hud .hd .speed i { width: 5px; height: 9px; background: rgba(255,255,255,.14); border-radius: 1px; display: inline-block; }
#sim-hud .hd .speed i.on { background: #4fc3f7; }
#sim-hud .hd .caret { color: #8da0b3; font-size: 10px; margin-left: 8px; }
#sim-hud .sec { padding: 9px 14px; border-bottom: 1px solid rgba(255,255,255,.06); }
#sim-hud .sec:last-child { border-bottom: 0; }
#sim-hud .row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
#sim-hud .money { font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -.01em; }
#sim-hud .net { font-variant-numeric: tabular-nums; font-weight: 600; }
#sim-hud .pos { color: #6fe3a1; } #sim-hud .neg { color: #ff7b6b; }
#sim-hud .lbl { color: #8da0b3; font-size: 10.5px; text-transform: uppercase; letter-spacing: .1em; }
#sim-hud .big { font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; }
#sim-hud .bar { height: 5px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden; margin-top: 5px; }
#sim-hud .bar > i { display: block; height: 100%; border-radius: 3px; background: linear-gradient(90deg, #4fc3f7, #81d4fa); transition: width .4s ease; }
#sim-hud .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 8px; }
#sim-hud .stat { background: rgba(255,255,255,.04); border-radius: 8px; padding: 7px 8px; }
#sim-hud .stat .v { font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
#sim-hud .stat .k { color: #8da0b3; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; margin-top: 1px; }
#sim-hud .rci { display: flex; gap: 10px; align-items: flex-end; height: 58px; margin-top: 8px; }
#sim-hud .rci .col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
#sim-hud .rci .col b { width: 100%; border-radius: 4px 4px 2px 2px; background: #4fc3f7; transition: height .4s ease; min-height: 2px; }
#sim-hud .rci .col span { font-size: 10px; color: #8da0b3; margin-top: 4px; letter-spacing: .08em; }
#sim-hud .svc { display: grid; grid-template-columns: 18px 1fr 92px 34px; gap: 6px 8px; align-items: center; margin-top: 6px; }
#sim-hud .svc .ic { font-size: 12px; text-align: center; }
#sim-hud .svc .n { color: #cfd9e3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#sim-hud .svc .b { height: 6px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden; }
#sim-hud .svc .b i { display: block; height: 100%; border-radius: 3px; }
#sim-hud .svc .c { text-align: right; color: #8da0b3; font-variant-numeric: tabular-nums; font-size: 11px; }
#sim-hud .bud { display: grid; grid-template-columns: 1fr auto; gap: 2px 10px; font-variant-numeric: tabular-nums; margin-top: 6px; }
#sim-hud .bud .k { color: #9fb1c4; } #sim-hud .bud .v { text-align: right; }
#sim-hud .bud .tot { border-top: 1px solid rgba(255,255,255,.1); padding-top: 3px; margin-top: 2px; font-weight: 600; }
#sim-hud .feed { margin-top: 6px; display: flex; flex-direction: column; gap: 5px; }
#sim-hud .note { display: flex; gap: 8px; align-items: flex-start; padding: 6px 8px; border-radius: 8px; background: rgba(255,255,255,.04); border-left: 3px solid #4fc3f7; }
#sim-hud .note.milestone { border-left-color: #ffd54f; background: rgba(255,213,79,.08); }
#sim-hud .note.warning { border-left-color: #ffab5e; } #sim-hud .note.alert { border-left-color: #ff6b5e; } #sim-hud .note.budget { border-left-color: #6fe3a1; }
#sim-hud .note b { display: block; font-size: 11.5px; } #sim-hud .note span { color: #9fb1c4; font-size: 11px; }
`,i=[[`residential`,`R`,`#6fe3a1`],[`commercial`,`C`,`#5b9cff`],[`industrial`,`I`,`#ffb84d`],[`office`,`O`,`#5ee0d8`]];function a(a,s,c={}){let{uiRoot:l,world:u}=a;if(!l)return null;if(!document.getElementById(`sim-hud-css`)){let e=document.createElement(`style`);e.id=`sim-hud-css`,e.textContent=r,document.head.appendChild(e)}let d=document.createElement(`div`);d.id=`sim-hud`,c.collapsed&&d.classList.add(`collapsed`),d.innerHTML=`
    <div class="hd" title="Click to fold / unfold"><div><span class="name"></span><span class="speed"><i></i><i></i><i></i></span></div><div class="date"></div><span class="caret">▾</span></div>
    <div class="body">
    <div class="sec">
      <div class="row"><span class="money"></span><span class="net"></span></div>
      <div class="row" style="margin-top:2px"><span class="lbl">Treasury</span><span class="lbl">per week</span></div>
    </div>
    <div class="sec">
      <div class="row"><span class="big pop"></span><span class="lbl ms"></span></div>
      <div class="bar"><i class="msbar"></i></div>
      <div class="grid4">
        <div class="stat"><div class="v hh"></div><div class="k">Households</div></div>
        <div class="stat"><div class="v jobs"></div><div class="k">Jobs</div></div>
        <div class="stat"><div class="v unemp"></div><div class="k">Jobless</div></div>
        <div class="stat"><div class="v happy"></div><div class="k">Happiness</div></div>
      </div>
    </div>
    <div class="sec"><div class="row"><span class="lbl">Zone demand</span><span class="lbl edu"></span></div><div class="rci"></div></div>
    <div class="sec"><div class="row"><span class="lbl">Services coverage</span><span class="lbl upkeep"></span></div><div class="svc"></div></div>
    <div class="sec"><div class="row"><span class="lbl">Weekly budget</span><span class="lbl month"></span></div><div class="bud"></div></div>
    <div class="sec"><span class="lbl">Notifications</span><div class="feed"></div></div>
    </div>`,l.appendChild(d);let f=e=>d.querySelector(e);f(`.hd`).addEventListener(`click`,()=>{d.classList.toggle(`collapsed`),f(`.caret`).textContent=d.classList.contains(`collapsed`)?`▸`:`▾`});let p=f(`.rci`);for(let[e,t,n]of i){let r=document.createElement(`div`);r.className=`col`,r.innerHTML=`<b style="background:${n}" data-k="${e}"></b><span>${t}</span>`,p.appendChild(r)}let m=f(`.svc`);for(let n of t){let t=e[n];m.insertAdjacentHTML(`beforeend`,`<div class="ic">${t.icon}</div><div class="n">${t.name}</div><div class="b"><i data-k="${n}"></i></div><div class="c" data-c="${n}"></div>`)}let h=f(`.feed`),g=[],_=a.events.on(`notification`,e=>{e&&(g.unshift(e),g.length>4&&g.pop(),h.innerHTML=g.map(e=>`<div class="note ${e.kind||`info`}"><div><b>${o(e.title||``)}</b><span>${o(e.text||``)}</span></div></div>`).join(``))}),v=0,y=()=>{let e=u.economy,r=u.time;if(f(`.name`).textContent=e.cityName||`New Fable`,f(`.date`).textContent=s.formatTime(),d.querySelectorAll(`.speed i`).forEach((e,t)=>e.classList.toggle(`on`,t<r.speed)),d.classList.contains(`collapsed`))return;f(`.money`).textContent=`¤`+n(e.money);let a=f(`.net`);a.textContent=(e.net>=0?`+`:`−`)+`¤`+n(Math.abs(e.net)),a.className=`net `+(e.net>=0?`pos`:`neg`),f(`.pop`).textContent=n(e.population)+` residents`;let o=e.milestone;f(`.ms`).textContent=o?o.next?`${o.name} → ${o.next} (${n(o.nextPopulation)})`:o.name:``,f(`.msbar`).style.width=((o?o.progress:0)*100).toFixed(1)+`%`,f(`.hh`).textContent=n(e.households),f(`.jobs`).textContent=n(e.jobs),f(`.unemp`).textContent=(e.unemployment*100).toFixed(1)+`%`,f(`.happy`).textContent=Math.round(e.happiness*100)+`%`,f(`.edu`).textContent=`education ${Math.round(e.education*100)}%`;for(let[t]of i)p.querySelector(`[data-k="${t}"]`).style.height=Math.max(3,e.demand[t]*100).toFixed(0)+`%`;let c=s.services.stats(),l=0;for(let n of t){let t=e.coverage[n]||0,r=m.querySelector(`[data-k="${n}"]`);r.style.width=(t*100).toFixed(0)+`%`,r.style.background=t>.75?`#6fe3a1`:t>.4?`#ffb84d`:`#ff7b6b`;let i=c[n];l+=i.upkeep,m.querySelector(`[data-c="${n}"]`).textContent=i.count?`${i.count}×${i.strain<.999?` `+Math.round(i.strain*100)+`%`:``}`:`—`}f(`.upkeep`).textContent=`¤${n(l)}/mo`;let h=e.budget;f(`.month`).textContent=h?h.label:`projected`;let g=h?h.taxes:e.taxes||{},_=(e,t,n=``)=>`<div class="k ${n}">${e}</div><div class="v ${n}">${t}</div>`,v=h?h.income:e.income,y=h?h.expenses:e.expenses;f(`.bud`).innerHTML=_(`Residential tax`,`¤`+n(g.residential||0))+_(`Commercial tax`,`¤`+n(g.commercial||0))+_(`Industrial tax`,`¤`+n(g.industrial||0))+_(`Office tax`,`¤`+n(g.office||0))+_(`Services`,`−¤`+n(h?h.services:l))+_(`Roads & admin`,`−¤`+n(h?h.roads+h.admin:y-l))+_(`Net`,(v-y>=0?`+`:`−`)+`¤`+n(Math.abs(v-y)),`tot `+(v-y>=0?`pos`:`neg`))};return y(),{el:d,update(e){v+=e,v>.25&&(v=0,y())},render:y,dispose(){_(),d.remove()}}}function o(e){return String(e).replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e])}export{a as createSimHud};