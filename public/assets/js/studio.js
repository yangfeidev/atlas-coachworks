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
