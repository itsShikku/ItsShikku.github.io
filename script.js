  const T={
 de:{nav_about:'Über mich',nav_projects:'Projekte',nav_links:'Links',role:'Systemintegrator · angehender DevOps Junior',
  about1:'Ich bin Shikku. Tagsüber integriere ich Systeme, abends baue ich welche um: Hardware aufschrauben, NixOS konfigurieren, Linux so lange ricen, bis es genau zu mir passt.',
  about2:'Dazwischen zocke ich gern MMORPGs, Strategie und Retro-Klassiker. Und ja, ich überlege, daraus irgendwann Content zu machen. Sicher ist das noch nicht.',
  c1t:'Gaming',c1d:'MMORPGs, Strategie, Retro. Je mehr Systeme zum Optimieren, desto besser.',
  c2t:'Systeme & Hardware',c2d:'NixOS, Linux-Ricing, Basteln an Hardware. Die meisten Experimente liegen noch in privaten Repos.',
  proj:'[..] Noch nichts veröffentlicht. Es werden aber bald einige Projekte kommen!',foot:'In Pizza we trust.',copied:'kopiert!'},
 en:{nav_about:'About',nav_projects:'Projects',nav_links:'Links',role:'Systems integrator · aspiring DevOps junior',
  about1:"I'm Shikku. By day I integrate systems, by night I rebuild them: opening up hardware, configuring NixOS, ricing Linux until it fits me exactly.",
  about2:'In between I play MMORPGs, strategy and retro classics. And yes, I\'m thinking about turning that into content someday. Nothing is certain yet.',
  c1t:'Gaming',c1d:'MMORPGs, strategy, retro. The more systems to optimise, the better.',
  c2t:'Systems & hardware',c2d:'NixOS, Linux ricing, tinkering with hardware. Most experiments still live in private repos.',
  proj:'[..] Nothing published yet. But some projects are coming soon!',foot:'In pizza we trust.',copied:'copied!'}
};
let lang=localStorage.getItem('lang')||(navigator.language.startsWith('de')?'de':'en');
const $=s=>document.querySelector(s);

function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=T[lang][e.dataset.i18n]);
  $('#lang').textContent=lang==='de'?'EN':'DE';
  localStorage.setItem('lang',lang);
}
$('#lang').onclick=()=>{lang=lang==='de'?'en':'de';applyLang()};
$('#year').textContent=new Date().getFullYear();
$('#dc').onclick=async()=>{
  try{await navigator.clipboard.writeText('itsshikku')}catch(e){}
  const b=$('#dc'),o=b.textContent;b.textContent=T[lang].copied;b.classList.add('done');
  setTimeout(()=>{b.textContent=o;b.classList.remove('done')},1400);
};
applyLang();

/* Boot-Log: tippt die Bio zeilenweise, letzte Zeile bleibt bei 66.6% */
const lines=[
 ['[0.001] ','[OK]','ok',' IN PIZZA WE TRUST'],
 ['[0.002] ','[OK]','ok',' HEAVY RIFFS & FLOW'],
 ['[0.003] ','[..]','wait',' ▰▰▰▰▰▰▱▱▱ 66.6%']
];
const boot=$('#boot'),still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc=s=>s.replace(/&/g,'&amp;');
function row(l){return `${l[0]}<span class="${l[2]}">${l[1]}</span>${esc(l[3])}`}
if(still){boot.innerHTML=lines.map(row).join('\n')}
else{
  let i=0,html='';
  (function next(){
    if(i>=lines.length){boot.innerHTML=html+'<span class="cur"></span>';return}
    boot.innerHTML=html+'<span class="cur"></span>';
    setTimeout(()=>{html+=row(lines[i])+'\n';i++;boot.innerHTML=html+'<span class="cur"></span>';setTimeout(next,450)},500);
  })();
}

/* Ruhiger Pixel-Schnee */
(function(){
  const c=$('#snow'),x=c.getContext('2d');let w,h,f=[];
  function size(){w=c.width=innerWidth;h=c.height=innerHeight}
  size();addEventListener('resize',size);
  const n=Math.min(70,Math.floor(innerWidth/18));
  for(let k=0;k<n;k++)f.push({x:Math.random()*w,y:Math.random()*h,s:Math.random()<.3?4:2,v:.15+Math.random()*.35,d:Math.random()*6});
  function draw(){
    x.clearRect(0,0,w,h);x.fillStyle='rgba(217,220,240,.45)';
    f.forEach(p=>{p.y+=p.v;p.d+=.01;p.x+=Math.sin(p.d)*.25;
      if(p.y>h){p.y=-5;p.x=Math.random()*w}
      x.fillRect(Math.round(p.x),Math.round(p.y),p.s,p.s)});
    if(!still)requestAnimationFrame(draw);
  }
  draw();
})();
