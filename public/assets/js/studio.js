(function(){
  var tabs=Array.from(document.querySelectorAll('[role="tab"]'));
  function activate(tab, focus){
    tabs.forEach(function(t){var selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});
    if(focus)tab.focus();
  }
  tabs.forEach(function(tab,index){tab.addEventListener('click',function(){activate(tab,false);});tab.addEventListener('keydown',function(e){var next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;else if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();activate(tabs[next],true);});});
  var toggle=document.querySelector('.menu-toggle'), menu=document.querySelector('.mobile-nav');
  toggle.addEventListener('click',function(){var open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.hidden=!open;});
  menu.addEventListener('click',function(e){if(e.target.closest('a')){menu.hidden=true;toggle.setAttribute('aria-expanded','false');}});
})();
(function(){
  var dialog=document.getElementById('galleryDialog');
  if(dialog){document.querySelectorAll('.gallery-item').forEach(function(item){item.addEventListener('click',function(){var img=dialog.querySelector('img');img.src=item.dataset.image;img.alt=item.dataset.caption;dialog.querySelector('p').textContent=item.dataset.caption;dialog.showModal();});});dialog.querySelector('.dialog-close').addEventListener('click',function(){dialog.close();});dialog.addEventListener('click',function(e){if(e.target===dialog)dialog.close();});}
  var form=document.getElementById('inquiryForm');if(!form)return;
  var status=document.getElementById('inquiryStatus'),zh=document.documentElement.lang==='zh-CN',button=form.querySelector('button[type="submit"]');
  form.addEventListener('submit',async function(e){
    e.preventDefault();if(!form.reportValidity())return;
    var data=new FormData(form),features=data.getAll('feature');
    var payload={name:data.get('name').trim(),email:data.get('email').trim(),vehicle:data.get('vehicle').trim(),people:data.get('people'),service:data.get('service'),features:features.join(', '),message:data.get('message').trim(),_honey:data.get('_honey'),_subject:'Atlas Coachworks — New inquiry'};
    button.disabled=true;status.textContent=zh?'正在提交，请稍候…':'Sending your inquiry…';
    try{
      var response=await fetch('https://formsubmit.co/ajax/yangfei.dev@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
      var result=await response.json();
      if(!response.ok || !(result.success===true || result.success==='true'))throw new Error('Submission rejected');
      status.textContent=zh?'咨询已提交，感谢您的留言。':'Your inquiry has been submitted. Thank you.';form.reset();
    }catch(error){status.textContent=zh?'提交未完成，请稍后重试，或直接发送邮件至 yangfei.dev@gmail.com。':'Your inquiry could not be submitted. Please try again or email yangfei.dev@gmail.com.';}
    finally{button.disabled=false;}
  });
})();
