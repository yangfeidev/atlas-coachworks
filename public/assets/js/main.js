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
    form.querySelector('button[type=submit]').textContent = 'Inquiry sent';
  });
})();
