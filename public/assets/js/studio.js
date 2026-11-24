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
  var form=document.getElementById('briefForm');if(!form)return;
  var output=document.getElementById('briefOutput'), result=form.querySelector('.brief-result'),status=document.getElementById('briefStatus'),zh=document.documentElement.lang==='zh-CN';
  form.addEventListener('submit',function(e){e.preventDefault();var data=new FormData(form),features=data.getAll('feature');output.value=(zh?'房车设计需求摘要':'RV design brief')+'\n\n'+(zh?'车型 / 底盘：':'Vehicle / chassis: ')+(data.get('vehicle')||'—')+'\n'+(zh?'旅行人数：':'Travellers: ')+data.get('people')+'\n'+(zh?'设计需求：':'Service: ')+data.get('service')+'\n'+(zh?'功能需求：':'Features: ')+(features.join('、')||'—')+'\n'+(zh?'其他想法：':'Other ideas: ')+(data.get('notes')||'—');result.hidden=false;status.textContent='';});
  document.getElementById('copyBrief').addEventListener('click',async function(){try{await navigator.clipboard.writeText(output.value);status.textContent=zh?'已复制到剪贴板。':'Copied to clipboard.';}catch(e){output.select();status.textContent=zh?'请选择并复制上面的内容。':'Select and copy the text above.';}});
  document.getElementById('downloadBrief').addEventListener('click',function(){var a=document.createElement('a'),url=URL.createObjectURL(new Blob([output.value],{type:'text/plain;charset=utf-8'}));a.href=url;a.download='rv-design-brief.txt';a.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);});
})();
