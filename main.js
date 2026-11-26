(function(){
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var RAW='919539037946',EMAIL='brandora006@gmail.com',reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* marquee duplicate */
  $$('.mq-t').forEach(function(t){t.innerHTML+=t.innerHTML});

  /* reveal */
  var rv=$$('.rv');
  if(!('IntersectionObserver' in window)||reduce){rv.forEach(function(e){e.classList.add('in')})}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);if(en.target.querySelector('[data-n]'))count(en.target)}})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});rv.forEach(function(e){io.observe(e)})}
  function count(root){$$('[data-n]',root).forEach(function(el){var end=+el.dataset.n,t0=performance.now();(function tick(t){var p=Math.min((t-t0)/1600,1);var sf=el.dataset.s||'';el.textContent=Math.floor(end*(1-Math.pow(1-p,4)))+sf;if(p<1)requestAnimationFrame(tick);else el.textContent=end+sf})(t0)})}

  /* header */
  var hd=$('#hd'),nav=$('#nav'),bg=$('#burger'),last=0;
  function menu(o){nav.classList.toggle('open',o);bg.classList.toggle('open',o);bg.setAttribute('aria-expanded',o)}
  bg.addEventListener('click',function(){menu(!nav.classList.contains('open'))});
  $$('#nav a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
  window.addEventListener('scroll',function(){var y=scrollY;if(Math.abs(y-last)>6)last=y},{passive:true});
  /* active link */
  if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){$$('#nav a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+en.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});$$('section[id]').forEach(function(s){so.observe(s)})}

  /* hero mouse parallax */
  var fan=$('.fan');
  if(fan&&!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){var hero=$('.hero-in');hero.addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;fan.style.transform='translate('+(x*-26)+'px,calc(-46% + '+(y*-18)+'px))'});}

  /* works filter */
  $$('.chips button').forEach(function(b){b.addEventListener('click',function(){$$('.chips button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');var f=b.dataset.f;$$('.wk').forEach(function(w){w.classList.toggle('off',!(f==='all'||w.dataset.c===f));w.classList.add('in')})})});

  /* lightbox */
  var lb=$('#lb'),li=$('img',lb);
  $$('.wk').forEach(function(w){w.addEventListener('click',function(){var i=$('img',w);li.src=i.currentSrc||i.src;li.alt=i.alt;lb.classList.add('open')})});
  lb.addEventListener('click',function(){lb.classList.remove('open')});
  addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open')});

  var tm=$('.tqm');if(tm&&!reduce){tm.innerHTML+=tm.innerHTML}

  /* optional remote image */
  $$('img[data-opt]').forEach(function(i){i.addEventListener('error',function(){i.remove()});if(i.complete&&!i.naturalWidth&&i.src)i.remove()});

  /* form */
  var CFG={phone:RAW,key:''}; /* CallMeBot API key goes here (see README) */
  var f=$('#cform'),ok=$('#ok');
  function popup(title,msg){$('#okt').textContent=title;$('#okp').textContent=msg;ok.classList.add('open');$('#okx').focus()}
  if(ok){$('#okx').addEventListener('click',function(){ok.classList.remove('open')});ok.addEventListener('click',function(e){if(e.target===ok)ok.classList.remove('open')});addEventListener('keydown',function(e){if(e.key==='Escape')ok.classList.remove('open')})}
  if(f){
    f.addEventListener('submit',function(e){e.preventDefault();
      var d=new FormData(f),btn=f.querySelector('[type=submit]'),lab=$('span',btn),old=lab.textContent,name=d.get('name');
      var t='New enquiry from your website\n\nName: '+name+'\nWhatsApp: '+d.get('phone')+'\nEmail: '+(d.get('email')||'-')+'\nProject: '+(d.get('project')||'-')+'\n\n'+d.get('message');
      var good='Thank you, '+name+'. Roshith has received your message and will reply to you on WhatsApp ('+d.get('phone')+') shortly.';
      function fallback(){window.open('https://wa.me/'+RAW+'?text='+encodeURIComponent(t),'_blank');popup('Almost there','WhatsApp opened with your message \u2014 press Send there to deliver it to Roshith.')}
      function sent(){f.reset();popup('Message sent!',good)}
      if(!CFG.key){fallback();return}
      btn.disabled=true;lab.textContent='Sending\u2026';
      fetch('https://api.callmebot.com/whatsapp.php?phone='+CFG.phone+'&text='+encodeURIComponent(t)+'&apikey='+CFG.key,{mode:'no-cors'})
        .then(sent,fallback).then(function(){btn.disabled=false;lab.textContent=old});
    });
    var mb=$('#mailBtn');if(mb)mb.addEventListener('click',function(){var d=new FormData(f);location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Project enquiry from '+(d.get('name')||''))+'&body='+encodeURIComponent((d.get('message')||'')+'\n\nWhatsApp: '+(d.get('phone')||'')+'\n'+(d.get('email')||''))});
  }
})();
