(function(){
  var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  var IT=window.QITEMS||[],form=$('#qform'),data={},sel=[];
  var money=function(n){return n?'₹ '+n.toLocaleString('en-IN'):'On request'};
  var pm=/[?&]i=([a-z0-9]+)/.exec(location.search);
  if(pm){var c=$('.qi input[value="'+pm[1]+'"]');if(c)c.checked=true}
  function show(n){$('#step1').hidden=n!==1;$('#step2').hidden=n!==2;$('#s1').classList.toggle('on',n===1);$('#s2').classList.toggle('on',n===2);window.scrollTo({top:0,behavior:'smooth'})}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function qno(){var d=new Date();return 'BQ-'+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2)+'-'+Math.floor(1000+Math.random()*9000)}
  var no=qno(),date=new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  function total(){return sel.reduce(function(a,x){return a+x.p},0)}
  form.addEventListener('submit',function(e){
    e.preventDefault();var d=new FormData(form),err=$('#qerr');
    data={name:(d.get('name')||'').trim(),address:(d.get('address')||'').trim(),email:(d.get('email')||'').trim(),phone:(d.get('phone')||'').trim()};
    var ids=$$('.qi input:checked').map(function(i){return i.value});sel=IT.filter(function(x){return ids.indexOf(x.id)>-1});
    if(!data.name||!data.address||!data.phone||!/^\S+@\S+\.\S+$/.test(data.email)){err.textContent='Please fill in all details with a valid email.';return}
    if(!sel.length){err.textContent='Please select at least one package or service.';return}
    err.textContent='';render();show(2)});
  function render(){
    var rows=sel.map(function(x){return '<div class="qr"><span>'+esc(x.n)+'</span><b>'+money(x.p)+'</b></div>'}).join('');
    $('#qdoc').innerHTML='<div class="qtop"><div><b class="qb">Roshith Biju</b><small>Brandora · Graphic Designer, Thrissur, Kerala</small></div><div class="qm"><b>'+no+'</b><small>'+date+'</small></div></div>'+
      '<div class="qto"><small>Prepared for</small><b>'+esc(data.name)+'</b><span>'+esc(data.address).replace(/\n/g,', ')+'</span><span>'+esc(data.email)+' · '+esc(data.phone)+'</span></div>'+
      '<div class="qrs">'+rows+'</div><div class="qt"><span>Estimated total</span><b>'+money(total())+'</b></div>'+
      '<p class="qn">Prices are starting prices in INR. The final amount is confirmed after discussing your requirements. Quote valid for 15 days.</p>'}
  $('#qback').addEventListener('click',function(){show(1)});
  function pdf(){
    var J=window.jspdf;if(!J)return false;var doc=new J.jsPDF({unit:'mm',format:'a4'}),W=210,m=18,y=22;
    var rs=function(n){return n?'Rs. '+n.toLocaleString('en-IN'):'On request'};
    doc.setFillColor(229,37,27);doc.rect(0,0,W,6,'F');
    doc.setFont('helvetica','bold');doc.setFontSize(22);doc.setTextColor(15,15,16);doc.text('Roshith Biju',m,y);
    doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(110);doc.text('Brandora  |  Graphic Designer, Thrissur, Kerala',m,y+6);doc.text('+91 9539037946  |  brandora006@gmail.com',m,y+11);
    doc.setFont('helvetica','bold');doc.setFontSize(18);doc.setTextColor(229,37,27);doc.text('QUOTATION',W-m,y,{align:'right'});
    doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(110);doc.text('No: '+no,W-m,y+6,{align:'right'});doc.text('Date: '+date,W-m,y+11,{align:'right'});
    y+=26;doc.setDrawColor(225);doc.line(m,y,W-m,y);y+=9;
    doc.setFontSize(9);doc.setTextColor(130);doc.text('PREPARED FOR',m,y);y+=6;
    doc.setFont('helvetica','bold');doc.setFontSize(13);doc.setTextColor(15,15,16);doc.text(data.name,m,y);y+=6;
    doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(70);
    doc.splitTextToSize(data.address.replace(/\n/g,', '),W-2*m).forEach(function(l){doc.text(l,m,y);y+=5});
    doc.text(data.email+'  |  '+data.phone,m,y);y+=12;
    doc.setFillColor(245,245,244);doc.rect(m,y,W-2*m,9,'F');doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(90);doc.text('DESCRIPTION',m+4,y+6);doc.text('PRICE',W-m-4,y+6,{align:'right'});y+=9;
    doc.setFont('helvetica','normal');doc.setFontSize(11);doc.setTextColor(15,15,16);
    sel.forEach(function(x){var ls=doc.splitTextToSize(x.n.replace(/—/g,'-'),W-2*m-50);y+=8;doc.text(ls,m+4,y);doc.text(rs(x.p),W-m-4,y,{align:'right'});y+=(ls.length-1)*5+3;doc.setDrawColor(235);doc.line(m,y,W-m,y)});
    y+=12;doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text('Estimated total',m+4,y);doc.setTextColor(229,37,27);doc.text(rs(total()),W-m-4,y,{align:'right'});
    y+=16;doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(120);
    doc.splitTextToSize('Prices are starting prices in INR. The final amount is confirmed after discussing your requirements. This quote is valid for 15 days.',W-2*m).forEach(function(l){doc.text(l,m,y);y+=5});
    doc.save('Quote-'+no+'.pdf');return true}
  function notify(){
    var B=window.BR||{},t='New QUOTE downloaded on your website\n'+no+'\n\nName: '+data.name+'\nPhone: '+data.phone+'\nEmail: '+data.email+'\nAddress: '+data.address.replace(/\n/g,', ')+'\n\n'+sel.map(function(x){return '- '+x.n+' ('+money(x.p)+')'}).join('\n')+'\n\nTotal: '+money(total());
    if(!B.key)return;
    try{fetch('https://api.callmebot.com/whatsapp.php?phone='+B.phone+'&text='+encodeURIComponent(t)+'&apikey='+B.key,{mode:'no-cors'})}catch(e){}}
  $('#qdl').addEventListener('click',function(){
    var ok=false;try{ok=pdf()}catch(e){}notify();if(!ok){setTimeout(function(){window.print()},300)}
    var o=$('#ok');if(o){$('#okt').textContent=ok?'Quote downloaded':'Quote ready';$('#okp').textContent='Thank you, '+data.name+'. Our team will connect you shortly.';o.classList.add('open')}});
})();
