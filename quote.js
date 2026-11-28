(function(){
  var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  var IT=window.QITEMS||[],form=$('#qform'),data={},sel=[],WA='919539037946';
  var money=function(n){return 'Rs. '+n.toLocaleString('en-IN')};
  var rup=function(n){return '₹ '+n.toLocaleString('en-IN')};
  var pm=/[?&]i=([a-z0-9]+)/.exec(location.search);
  if(pm){var c=$('.qi input[value="'+pm[1]+'"]');if(c)c.checked=true}
  $$('.qi').forEach(function(l){var q=l.querySelector('.qq'),c=l.querySelector('input[type=checkbox]');if(q){q.addEventListener('click',function(e){e.stopPropagation()});q.addEventListener('input',function(){c.checked=true})}});
  function show(n){$('#step1').hidden=n!==1;$('#step2').hidden=n!==2;$('#s1').classList.toggle('on',n===1);$('#s2').classList.toggle('on',n===2);window.scrollTo({top:0,behavior:'smooth'})}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var d0=new Date(),no='BQ-'+d0.getFullYear()+('0'+(d0.getMonth()+1)).slice(-2)+('0'+d0.getDate()).slice(-2)+'-'+Math.floor(1000+Math.random()*9000);
  var date=d0.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  function amt(x){return x.p*x.q}
  function total(){return sel.reduce(function(a,x){return a+amt(x)},0)}
  function unit(x){return x.u?' / '+x.u:''}
  function name(x){return x.n+(x.s?' (starting price)':'')}
  form.addEventListener('submit',function(e){
    e.preventDefault();var d=new FormData(form),err=$('#qerr');
    data={name:(d.get('name')||'').trim(),address:(d.get('address')||'').trim(),email:(d.get('email')||'').trim(),phone:(d.get('phone')||'').trim()};
    sel=[];$$('.qi').forEach(function(l){var c=l.querySelector('input[type=checkbox]');if(!c.checked)return;var it=IT.filter(function(x){return x.id===c.value})[0],q=l.querySelector('.qq'),n=q?Math.max(1,Math.min(99,parseInt(q.value,10)||1)):1;sel.push(Object.assign({},it,{q:n}))});
    if(!data.name||!data.address||!data.phone||!/^\S+@\S+\.\S+$/.test(data.email)){err.textContent='Please fill in all details with a valid email.';return}
    if(!sel.length){err.textContent='Please select at least one package or service.';return}
    err.textContent='';render();show(2)});
  function waText(){return 'Hi Roshith, I would like more details about my quote '+no+'.\n\nName: '+data.name+'\n'+sel.map(function(x){return '- '+x.n+(x.q>1?' x'+x.q:'')}).join('\n')+'\nEstimated total: '+money(total())}
  function render(){
    var rows=sel.map(function(x,i){return '<div class="qr"><span class="qd">'+esc(name(x))+'</span><span class="qc">'+x.q+'</span><span class="qa">'+rup(x.p)+'</span><b>'+rup(amt(x))+'</b></div>'}).join('');
    $('#qdoc').innerHTML='<div class="qtop"><img class="qlogo" src="img/brandora-logo.png" alt="Brandora"><div class="qm"><em>QUOTATION</em><b>'+no+'</b><small>'+date+'</small></div></div>'+
      '<div class="qpair"><div class="qto"><small>Prepared for</small><b>'+esc(data.name)+'</b><span>'+esc(data.address).replace(/\n/g,', ')+'</span><span>'+esc(data.email)+'</span><span>'+esc(data.phone)+'</span></div>'+
      '<div class="qto"><small>From</small><b>Roshith Biju</b><span>Brandora, Thrissur, Kerala</span><span>brandora006@gmail.com</span><span>+91 9539037946</span></div></div>'+
      '<div class="qh2"><span class="qd">Description</span><span class="qc">Qty</span><span class="qa">Rate</span><b>Amount</b></div><div class="qrs">'+rows+'</div>'+
      '<div class="qt"><span>Estimated total</span><b>'+rup(total())+'</b></div>'+
      '<p class="qn">Prices are starting prices in INR. The final amount is confirmed after discussing your requirements. Quote valid for 15 days.</p>';
    $('#qwa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(waText())}
  $('#qback').addEventListener('click',function(){show(1)});
  function img(src){return new Promise(function(res){var i=new Image();i.onload=function(){try{var c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);res({u:c.toDataURL('image/png'),w:i.naturalWidth,h:i.naturalHeight})}catch(e){res(null)}};i.onerror=function(){res(null)};i.src=src})}
  function pdf(logo,icon){
    var J=window.jspdf;if(!J)return false;var doc=new J.jsPDF({unit:'mm',format:'a4'}),W=210,H=297,m=16,y;
    var INK=[15,15,16],RED=[229,37,27],GR=[120,120,120];
    /* watermark: brand icon only */
    if(icon){try{doc.saveGraphicsState();doc.setGState(new doc.GState({opacity:0.05}));var ww=120,hh=ww*icon.h/icon.w;doc.addImage(icon.u,'PNG',(W-ww)/2,(H-hh)/2+8,ww,hh);doc.restoreGraphicsState()}catch(e){}}
    doc.setFillColor.apply(doc,RED);doc.rect(0,0,W,5,'F');
    if(logo){var lw=52;doc.addImage(logo.u,'PNG',m,16,lw,lw*logo.h/logo.w)}else{doc.setFont('helvetica','bold');doc.setFontSize(22);doc.setTextColor.apply(doc,INK);doc.text('Brandora',m,24)}
    doc.setFont('helvetica','bold');doc.setFontSize(20);doc.setTextColor.apply(doc,INK);doc.text('QUOTATION',W-m,22,{align:'right'});
    doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.setTextColor.apply(doc,GR);doc.text('No.  '+no,W-m,28,{align:'right'});doc.text('Date  '+date,W-m,33,{align:'right'});
    y=42;doc.setDrawColor(225);doc.line(m,y,W-m,y);y+=9;
    var colx=W/2+4;
    doc.setFontSize(8);doc.setTextColor.apply(doc,RED);doc.setFont('helvetica','bold');doc.text('PREPARED FOR',m,y);doc.text('FROM',colx,y);
    var y1=y+6,y2=y+6;
    doc.setFontSize(12);doc.setTextColor.apply(doc,INK);doc.text(data.name,m,y1);doc.text('Roshith Biju',colx,y2);y1+=5.5;y2+=5.5;
    doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.setTextColor(80);
    doc.splitTextToSize(data.address.replace(/\n/g,', '),W/2-m-6).forEach(function(l){doc.text(l,m,y1);y1+=4.6});
    doc.text(data.email,m,y1);y1+=4.6;doc.text(data.phone,m,y1);y1+=4.6;
    ['Brandora, Thrissur, Kerala','brandora006@gmail.com','+91 9539037946'].forEach(function(l){doc.text(l,colx,y2);y2+=4.6});
    y=Math.max(y1,y2)+8;
    /* table */
    var cx={n:m+4,q:W-m-62,r:W-m-34,a:W-m-4};
    doc.setFillColor.apply(doc,INK);doc.roundedRect(m,y,W-2*m,9,1.5,1.5,'F');doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(255);
    doc.text('DESCRIPTION',cx.n,y+6);doc.text('QTY',cx.q,y+6,{align:'center'});doc.text('RATE',cx.r,y+6,{align:'right'});doc.text('AMOUNT',cx.a,y+6,{align:'right'});y+=9;
    doc.setFont('helvetica','normal');doc.setFontSize(10);
    sel.forEach(function(x,i){var ls=doc.splitTextToSize(name(x).replace(/—/g,'-'),cx.q-cx.n-12),h=Math.max(11,ls.length*5+6);
      if(i%2===0){doc.setFillColor(248,248,247);doc.rect(m,y,W-2*m,h,'F')}
      doc.setTextColor.apply(doc,INK);doc.text(ls,cx.n,y+6.8);doc.text(String(x.q),cx.q,y+6.8,{align:'center'});doc.setTextColor(90);doc.text(money(x.p),cx.r,y+6.8,{align:'right'});doc.setTextColor.apply(doc,INK);doc.setFont('helvetica','bold');doc.text(money(amt(x)),cx.a,y+6.8,{align:'right'});doc.setFont('helvetica','normal');y+=h});
    y+=8;
    doc.setFillColor.apply(doc,RED);doc.roundedRect(W-m-84,y,84,15,2,2,'F');doc.setTextColor(255);doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.text('ESTIMATED TOTAL',W-m-80,y+9.2);doc.setFontSize(13);doc.text(money(total()),W-m-4,y+9.6,{align:'right'});
    y+=26;
    doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor.apply(doc,INK);doc.text('TERMS',m,y);y+=5;
    doc.setFont('helvetica','normal');doc.setFontSize(8.8);doc.setTextColor(100);
    ['Prices are starting prices in INR. The final amount is confirmed after discussing your requirements.','This quote is valid for 15 days from the date above.','Work begins after an agreed advance payment.'].forEach(function(t){doc.splitTextToSize(t,W-2*m).forEach(function(l){doc.text(l,m,y);y+=4.5})});
    y+=5;doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.setTextColor.apply(doc,INK);doc.text('Need more details?',m,y);
    doc.setTextColor.apply(doc,RED);doc.textWithLink('Chat with us on WhatsApp: +91 9539037946',m+34,y,{url:'https://wa.me/'+WA});
    /* footer */
    doc.setFillColor.apply(doc,INK);doc.rect(0,H-16,W,16,'F');doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(255);doc.text('Thank you for choosing Brandora',m,H-7);doc.setTextColor(180);doc.text('brandora006@gmail.com   |   +91 9539037946',W-m,H-7,{align:'right'});
    doc.save('Brandora-Quote-'+no+'.pdf');return true}
  function notify(){
    var B=window.BR||{},t='New QUOTE downloaded on your website\n'+no+'\n\nName: '+data.name+'\nPhone: '+data.phone+'\nEmail: '+data.email+'\nAddress: '+data.address.replace(/\n/g,', ')+'\n\n'+sel.map(function(x){return '- '+x.n+(x.q>1?' x'+x.q:'')+' ('+money(amt(x))+')'}).join('\n')+'\n\nTotal: '+money(total());
    if(!B.key)return;
    try{fetch('https://api.callmebot.com/whatsapp.php?phone='+B.phone+'&text='+encodeURIComponent(t)+'&apikey='+B.key,{mode:'no-cors'})}catch(e){}}
  $('#qdl').addEventListener('click',function(){
    Promise.all([img('img/brandora-logo.png'),img('img/brandora-icon.png')]).then(function(r){
      var ok=false;try{ok=pdf(r[0],r[1])}catch(e){}notify();
      var o=$('#ok');if(o){$('#okt').textContent=ok?'Quote downloaded':'Quote ready';$('#okp').textContent='Thank you, '+data.name+'. Our team will connect you shortly.';o.classList.add('open')}
      if(!ok)setTimeout(function(){window.print()},400)})});
})();
