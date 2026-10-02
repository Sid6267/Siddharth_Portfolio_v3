(function(){
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.body.classList.add('loading');
 const loader=document.getElementById('loader');
 const finish=()=>{if(loader){loader.style.opacity='0';loader.style.visibility='hidden'}document.body.classList.remove('loading')};
 window.addEventListener('load',()=>setTimeout(finish,500));
 setTimeout(finish,2500);
 document.getElementById('year').textContent=new Date().getFullYear();
 const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot'); let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
 if(!reduce && matchMedia('(pointer:fine)').matches){window.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;if(dot){dot.style.left=x+'px';dot.style.top=y+'px'}});(function loop(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;if(cursor){cursor.style.left=rx+'px';cursor.style.top=ry+'px'}requestAnimationFrame(loop)})();document.querySelectorAll('a,.magnetic').forEach(a=>{a.addEventListener('mouseenter',()=>{if(cursor){cursor.style.width='70px';cursor.style.height='70px'}});a.addEventListener('mouseleave',()=>{if(cursor){cursor.style.width='45px';cursor.style.height='45px'}})})}
 document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{if(reduce)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.1}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
 const progress=document.querySelector('.progress');window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;if(progress) progress.style.width=(h?scrollY/h*100:0)+'%'});
 if(window.gsap && window.ScrollTrigger && !reduce){gsap.registerPlugin(ScrollTrigger);
   gsap.from('.hero-title .line',{y:130,opacity:0,duration:1.15,stagger:.12,ease:'power4.out',delay:.35});
   gsap.from('.hero-sub,.hero-actions',{y:35,opacity:0,duration:.8,stagger:.12,ease:'power3.out',delay:.85});
   gsap.from('.hero-orbit',{scale:.75,opacity:0,duration:1.5,ease:'power3.out',delay:.25});
   gsap.to('.hero-grid',{yPercent:25,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
   gsap.to('.hero-orbit',{yPercent:20,rotate:8,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
   gsap.to('.hero-title',{yPercent:-20,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
   document.querySelectorAll('.reveal-text').forEach(el=>gsap.to(el,{clipPath:'inset(0 0 0% 0)',duration:1.1,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 82%'}}));
   document.querySelectorAll('.exp-card').forEach((card,i)=>gsap.from(card,{y:80,opacity:0,scale:.97,duration:.9,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 85%'}}));
   gsap.to('.marquee div',{xPercent:-20,ease:'none',scrollTrigger:{trigger:'.marquee',start:'top bottom',end:'bottom top',scrub:1}});
   const stats=document.querySelector('.stats-stage');gsap.to(stats,{x:()=>-(stats.scrollWidth-innerWidth+40),ease:'none',scrollTrigger:{trigger:'.stats',start:'top top',end:'+=1800',pin:true,scrub:1,invalidateOnRefresh:true}});
   const track=document.querySelector('.horizontal-track');gsap.to(track,{x:()=>-(track.scrollWidth-innerWidth+40),ease:'none',scrollTrigger:{trigger:'.horizontal-wrap',start:'top top',end:()=>'+='+track.scrollWidth,pin:true,scrub:1,invalidateOnRefresh:true}});
   gsap.utils.toArray('.work-card').forEach(card=>{gsap.from(card.querySelector('.work-info'),{y:50,opacity:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 85%'}})});
   gsap.to('.contact-bg',{scale:1.35,scrollTrigger:{trigger:'.contact',start:'top bottom',end:'bottom bottom',scrub:1}});
 }else{
   document.querySelectorAll('.reveal-text').forEach(el=>el.style.clipPath='inset(0)');
 }
 const counts=document.querySelectorAll('.count');function animateCount(el){if(el.dataset.done==='1')return;el.dataset.done='1';const n=+el.dataset.n;if(reduce){el.textContent=n;return}const t=performance.now();(function tick(now){const p=Math.min((now-t)/1100,1),v=Math.floor((1-Math.pow(1-p,3))*n);el.textContent=v;if(p<1)requestAnimationFrame(tick)})(t)};const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){animateCount(e.target);obs.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -10% 0px'});counts.forEach(c=>obs.observe(c));setTimeout(()=>counts.forEach(animateCount),1500);
})();

/* Cinematic interaction layer */
(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.nav nav a')];
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        navLinks.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')==='#'+entry.target.id));
      });
    },{rootMargin:'-35% 0px -55% 0px',threshold:0});
    sections.forEach(s=>io.observe(s));
  }
  if(!reduce){
    document.querySelectorAll('.work-card,.exp-card,.research-list article').forEach(el=>{
      el.addEventListener('mousemove',e=>{
        const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        el.style.transform='perspective(1000px) rotateX('+(-y*2.2)+'deg) rotateY('+(x*2.2)+'deg) translateY(-4px)';
      });
      el.addEventListener('mouseleave',()=>el.style.transform='');
    });
    const hero=document.querySelector('.hero');
    window.addEventListener('scroll',()=>{
      const p=Math.min(scrollY/Math.max(hero.offsetHeight,1),1);
      hero.style.setProperty('--scroll-fade',p);
    },{passive:true});
  }
})();
