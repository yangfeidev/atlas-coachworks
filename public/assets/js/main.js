(function(){
  /* sticky nav */
  var nav = document.getElementById('nav');
  var onScroll = function(){
    nav.classList.toggle('is-stuck', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  /* mobile menu */
  var burger = document.getElementById('burger');
  var mm = document.getElementById('mobileMenu');
  var mmClose = document.getElementById('mmClose');
  var openMenu = function(v){
    mm.classList.toggle('open', v);
    burger.setAttribute('aria-expanded', v ? 'true' : 'false');
    document.body.style.overflow = v ? 'hidden' : '';
  };
  burger.addEventListener('click', function(){ openMenu(true); });
  mmClose.addEventListener('click', function(){ openMenu(false); });
  mm.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ openMenu(false); }); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') openMenu(false); });

  /* scroll reveal */
  var items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.12});
    items.forEach(function(el, i){
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function(el){ el.classList.add('in'); });
  }

  /* FAQ — 同时只开一项 */
  var faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(function(d){
    d.addEventListener('toggle', function(){
      if(d.open){ faqs.forEach(function(o){ if(o !== d) o.open = false; }); }
    });
  });

  /* Custom selects: the original control remains the source of form values. */
  document.querySelectorAll('.field select').forEach(function(select){
    var field = select.closest('.field');
    var label = field.querySelector('label');
    var wrapper = document.createElement('div');
    var trigger = document.createElement('button');
    var list = document.createElement('div');
    var options = Array.from(select.options);
    wrapper.className = 'custom-select';
    trigger.type = 'button';
    trigger.className = 'custom-select__trigger';
    trigger.id = select.id + '-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', select.id + '-list');
    label.id = select.id + '-label';
    label.htmlFor = trigger.id;
    trigger.setAttribute('aria-labelledby', label.id + ' ' + trigger.id);
    list.id = select.id + '-list';
    list.className = 'custom-select__list';
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-labelledby', label.id);
    list.hidden = true;
    select.insertAdjacentElement('afterend', wrapper);
    wrapper.appendChild(trigger);
    wrapper.appendChild(list);
    var buttons = options.map(function(option, index){
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'custom-select__option';
      button.setAttribute('role', 'option');
      button.textContent = option.textContent;
      button.addEventListener('click', function(){
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change', {bubbles:true}));
        update();
        close();
        trigger.focus();
      });
      list.appendChild(button);
      return button;
    });
    function update(){
      trigger.textContent = options[select.selectedIndex].textContent;
      trigger.classList.toggle('is-placeholder', !select.value);
      buttons.forEach(function(button, index){
        button.setAttribute('aria-selected', index === select.selectedIndex ? 'true' : 'false');
      });
    }
    function close(){
      list.hidden = true;
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open(){
      document.querySelectorAll('.custom-select.is-open .custom-select__trigger').forEach(function(other){
        if(other !== trigger) other.click();
      });
      list.hidden = false;
      wrapper.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    trigger.addEventListener('click', function(){ if(list.hidden) open(); else close(); });
    trigger.addEventListener('keydown', function(e){
      if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
        e.preventDefault(); open(); buttons[select.selectedIndex].focus();
      }
    });
    list.addEventListener('keydown', function(e){
      var index = buttons.indexOf(document.activeElement);
      if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
        e.preventDefault();
        buttons[(index + (e.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length].focus();
      } else if(e.key === 'Home' || e.key === 'End'){
        e.preventDefault(); buttons[e.key === 'Home' ? 0 : buttons.length - 1].focus();
      } else if(e.key === 'Escape'){
        e.preventDefault(); e.stopPropagation(); close(); trigger.focus();
      }
    });
    wrapper.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && !list.hidden){ e.preventDefault(); e.stopPropagation(); close(); trigger.focus(); }
    });
    document.addEventListener('click', function(e){ if(!wrapper.contains(e.target)) close(); });
    wrapper.addEventListener('focusout', function(){
      setTimeout(function(){ if(!wrapper.contains(document.activeElement)) close(); }, 0);
    });
    select.addEventListener('change', update);
    select.hidden = true;
    update();
  });

  /* form */
  var form = document.getElementById('inquiry');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var email = document.getElementById('email');
    if(!email.value || email.value.indexOf('@') < 1){
      email.focus();
      email.style.borderBottomColor = '#B4602F';
      return;
    }
    document.getElementById('formOk').classList.add('show');
    form.querySelector('button[type=submit]').textContent = document.documentElement.lang === 'zh-CN' ? '演示完成' : 'Demo complete';
  });
})();
