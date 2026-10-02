(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track = document.querySelector('.horizontal-track');
  const stats = document.querySelector('.stats-stage');
  if (!track || reduce) return;
  // Vanilla fallback: horizontal tracks follow page scroll even when GSAP CDN is unavailable.
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function update(){
    if(window.gsap && window.ScrollTrigger) return;
    const wrap=track.closest('.horizontal-wrap');
    const r=wrap.getBoundingClientRect();
    const max=Math.max(0,track.scrollWidth-wrap.clientWidth);
    const progress=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);
    track.style.transform='translate3d('+(-max*progress)+'px,0,0)';
    if(stats){
      const sr=stats.closest('.stats');
      const srct=sr.getBoundingClientRect();
      const sm=Math.max(0,stats.scrollWidth-innerWidth+40);
      const sp=clamp((innerHeight-srct.top)/(innerHeight+srct.height),0,1);
      stats.style.transform='translate3d('+(-sm*sp)+'px,0,0)';
    }
  }
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);
  update();
})();
