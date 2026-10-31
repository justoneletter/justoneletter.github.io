(() => {
  'use strict';
  const TOTAL=68;
  const slide=document.getElementById('active-slide');
  const title=document.getElementById('slide-title');
  const chapter=document.getElementById('viewer-chapter');
  const count=document.getElementById('viewer-count');
  const progress=document.getElementById('progress-fill');
  const bar=document.getElementById('slide-progress');
  const filmstrip=document.getElementById('filmstrip');
  const viewer=document.getElementById('viewer');
  const announcer=document.getElementById('viewer-announcer');
  const prev=document.getElementById('prev-slide');
  const next=document.getElementById('next-slide');
  const toast=document.getElementById('toast');
  let current=1, meta=[],toastTimer=0, swipeStart=null;
  const chapterFor=n=>n<=6?'Start here':n<=17?'Ashley Jameson':n<=30?'Dr. Curt Thompson':n<=43?'Heather Kolb':n<=53?'Michelle Mays':'Practice & integration';
  const pathFor=n=>'assets/slides/'+String(n).padStart(2,'0')+'.webp';
  function notify(msg){ toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2900); }
  function goto(n,{scroll=false,fromHash=false}={}){
    n=Math.max(1,Math.min(TOTAL,Math.round(Number(n)||1)));
    current=n;
    slide.src=pathFor(n);
    slide.alt='Slide '+n+' of 68: '+(meta[n-1]?.title||chapterFor(n));
    count.textContent=String(n).padStart(2,'0')+' of 68';
    title.textContent=meta[n-1]?.title||chapterFor(n);
    chapter.textContent=chapterFor(n);
    progress.style.width=(n/TOTAL*100)+'%';
    bar.setAttribute('aria-valuenow',String(n));
    prev.disabled=n===1;
    next.disabled=n===TOTAL;
    const old=filmstrip.querySelector('.thumb-btn.active');if(old){old.classList.remove('active');old.removeAttribute('aria-current')}
    const btn=filmstrip.querySelector('[data-slide="'+n+'"]');if(btn){btn.classList.add('active');btn.setAttribute('aria-current','true');btn.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'})}
    if(!fromHash)history.replaceState(null,'','#slide-'+n);
    announcer.textContent='Slide '+n+' of '+TOTAL+', '+title.textContent;
    for(const x of [n-1,n+1]) if(x>=1&&x<=TOTAL) {const img=new Image();img.src=pathFor(x)}
    if(scroll){document.getElementById('presentation').scrollIntoView({behavior:'smooth',block:'start'});viewer.focus({preventScroll:true})}
  }
  for(let n=1;n<=TOTAL;n++){
    const btn=document.createElement('button');btn.type='button';btn.className='thumb-btn';btn.dataset.slide=String(n);btn.setAttribute('aria-label','View slide '+n);
    const img=document.createElement('img');img.src='assets/thumbs/'+String(n).padStart(2,'0')+'.webp';img.alt='';img.width=360;img.height=203;img.loading=n<=8?'eager':'lazy';
    const tag=document.createElement('span');tag.className='thumb-num';tag.textContent=String(n).padStart(2,'0');btn.append(img,tag);btn.addEventListener('click',()=>goto(n));filmstrip.append(btn)
  }
  prev.addEventListener('click',()=>goto(current-1));next.addEventListener('click',()=>goto(current+1));
  document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>goto(Number(el.dataset.go),{scroll:true})));
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select'))return; if(e.target.closest('#viewer')||document.fullscreenElement===viewer){if(e.key==='ArrowRight'){e.preventDefault();goto(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();goto(current-1)}if(e.key==='Home'){e.preventDefault();goto(1)}if(e.key==='End'){e.preventDefault();goto(TOTAL)}}});
  const stage=document.querySelector('.slide-stage');
  stage.addEventListener('touchstart',e=>{if(e.touches.length===1)swipeStart={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
  stage.addEventListener('touchend',e=>{if(!swipeStart||!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-swipeStart.x,dy=e.changedTouches[0].clientY-swipeStart.y; if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)goto(current+(dx<0?1:-1));swipeStart=null},{passive:true});
  document.getElementById('fullscreen').addEventListener('click',()=>{if(document.fullscreenElement===viewer){document.exitFullscreen?.()}else if(viewer.requestFullscreen){viewer.requestFullscreen().catch(()=>notify('Fullscreen is not available on this device.'))}else{notify('Use the full PDF link for a larger view.')}});
  document.getElementById('share-slide').addEventListener('click',async()=>{const url=new URL(location.href);url.hash='#slide-'+current;try{await navigator.clipboard.writeText(url.href);notify('Direct link copied to clipboard.')}catch(err){notify('Your slide link: '+url.href)}});
  slide.addEventListener('error',()=>notify('Slide preview could not load. Please open the PDF download instead.'));
  fetch('slides.json').then(x=>x.ok?x.json():Promise.reject(new Error('No slide metadata'))).then(x=>{meta=x; goto(current,{fromHash:true})}).catch(()=>{});
  const match=location.hash.match(/^#slide-(\d{1,2})$/);goto(match?Number(match[1]):1,{fromHash:true});
  window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#slide-(\d{1,2})$/);if(m)goto(Number(m[1]),{fromHash:true,scroll:true})});
})();
