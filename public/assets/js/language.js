(function () {
  'use strict';
  var languages = [
    ['ar', '🇸🇦', 'العربية'], ['zh-CN', '🇨🇳', '简体中文'],
    ['nl', '🇳🇱', 'Nederlands'], ['en', '🇬🇧', 'English'],
    ['fr', '🇫🇷', 'Français'], ['de', '🇩🇪', 'Deutsch'],
    ['it', '🇮🇹', 'Italiano'], ['pt', '🇵🇹', 'Português'],
    ['ru', '🇷🇺', 'Русский'], ['es', '🇪🇸', 'Español']
  ];
  var key = 'atlas-language';
  var stored;
  try { stored = localStorage.getItem(key); } catch (e) { /* Storage may be unavailable. */ }
  var chinesePage = document.documentElement.lang.toLowerCase().indexOf('zh') === 0;
  if (chinesePage) {
    try { localStorage.setItem(key, 'zh-CN'); } catch (e) { /* Use the URL fallback below. */ }
    var destination = /gallery-zh\.html$/.test(location.pathname) ? 'gallery.html' : 'index.html';
    var params = new URLSearchParams(location.search);
    params.set('lang', 'zh-CN');
    location.replace(destination + '?' + params.toString() + location.hash);
    return;
  }
  var params = new URLSearchParams(location.search);
  var requested = params.get('lang');
  var legacy = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  var selected = requested || stored || (legacy && decodeURIComponent(legacy[1]).split('/').pop()) || 'en';
  if (!languages.some(function (item) { return item[0] === selected; })) selected = 'en';
  try { localStorage.setItem(key, selected); } catch (e) { /* URL carries the selection when storage is unavailable. */ }
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + location.hostname;
  var current = languages.filter(function (item) { return item[0] === selected; })[0];
  var dictionary = {};
  function normalize(text) { return text.replace(/\s+/g, ' ').trim(); }
  window.atlasTranslate = function (text) { return dictionary[normalize(text)] || text; };

  var root = document.createElement('div');
  root.className = 'language-picker';
  root.innerHTML = '<button type="button" class="language-trigger" aria-haspopup="dialog" aria-expanded="false"><span aria-hidden="true">🌐</span><span class="language-current"></span><span aria-hidden="true">⌃</span></button>' +
    '<dialog class="language-dialog" aria-labelledby="language-title"><div class="language-dialog-head"><div><span class="language-kicker">ATLAS COACHWORKS</span><h2 id="language-title">Choose your language</h2></div><button type="button" class="language-close" aria-label="Close">×</button></div><div class="language-list"></div></dialog>';
  document.body.appendChild(root);
  root.querySelector('.language-current').textContent = current[1] + '  ' + current[2];
  var trigger = root.querySelector('.language-trigger');
  var dialog = root.querySelector('dialog');
  var list = root.querySelector('.language-list');
  languages.forEach(function (item) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'language-option';
    button.setAttribute('lang', item[0]);
    if (item[0] === selected) button.setAttribute('aria-current', 'true');
    button.innerHTML = '<span aria-hidden="true">' + item[1] + '</span><span>' + item[2] + '</span>' + (item[0] === selected ? '<span aria-hidden="true" class="language-check">✓</span>' : '');
    button.addEventListener('click', function () {
      try { localStorage.setItem(key, item[0]); } catch (e) { /* The URL preserves the choice. */ }
      var url = new URL(location.href);
      url.searchParams.set('lang', item[0]);
      location.href = url.href;
    });
    list.appendChild(button);
  });
  trigger.addEventListener('click', function () { dialog.showModal(); trigger.setAttribute('aria-expanded', 'true'); });
  dialog.addEventListener('close', function () { trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); });
  root.querySelector('.language-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });

  // Keep the chosen language when storage is unavailable, and preserve stable form values.
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (/^(?:index|gallery)(?:\.html)?(?:[?#]|$)/.test(href)) {
      var url = new URL(href, location.href);
      url.searchParams.set('lang', selected);
      a.href = url.href;
    }
  });
  document.querySelectorAll('option:not([value])').forEach(function (option) { option.value = option.textContent.trim(); });

  function applyTranslations() {
    document.documentElement.lang = selected;
    document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr';
    var walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (/^(SCRIPT|STYLE)$/.test(node.parentElement.tagName) || node.parentElement.closest('.language-list, .language-current, .language-kicker')) continue;
      var translated = dictionary[normalize(node.nodeValue)];
      if (translated) node.nodeValue = node.nodeValue.replace(/\S[\s\S]*\S|\S/, translated);
    }
    document.querySelectorAll('[alt], [placeholder], [aria-label], [data-caption], [title], meta[name="description"]').forEach(function (el) {
      ['alt', 'placeholder', 'aria-label', 'data-caption', 'title'].forEach(function (attr) {
        if (el.hasAttribute(attr)) el.setAttribute(attr, window.atlasTranslate(el.getAttribute(attr)));
      });
      if (el.matches('meta[name="description"]')) el.content = window.atlasTranslate(el.content);
    });
  }
  if (selected !== 'en') {
    fetch('assets/i18n/' + encodeURIComponent(selected) + '.json?v=20261124-2').then(function (response) {
      if (!response.ok) throw new Error('Translation unavailable');
      return response.json();
    }).then(function (data) { dictionary = data; applyTranslations(); }).catch(function () {
      console.error('Could not load local translation for ' + selected);
    });
  }
}());
