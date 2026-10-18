/* Extra features added on top of the base template:
   dark mode, back-to-top button, offline indicator, credit footer. */
(function () {
  'use strict';
  var root = document.documentElement;

  // 1) Dark mode (remembered in this browser)
  function applyTheme(t) {
    if (t === 'dark') root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    var m = document.querySelector('meta[name=theme-color]');
    if (m) m.setAttribute('content', t === 'dark' ? '#1a1510' : '#e8761e');
  }
  var saved = null;
  try { saved = localStorage.getItem('gul-theme'); } catch (e) {}
  if (!saved && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) saved = 'dark';
  applyTheme(saved);

  var bar = document.querySelector('.topbar');
  var lang = document.getElementById('langBtn');
  if (bar && lang) {
    var b = document.createElement('button');
    b.className = 'iconbtn noprint';
    b.id = 'themeBtn';
    b.title = 'Dark / light mode';
    b.setAttribute('aria-label', 'Toggle dark mode');
    b.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
    b.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('gul-theme', next); } catch (e) {}
    });
    bar.insertBefore(b, lang);

    // 2) Offline indicator (the app keeps working, data stays on the device)
    var pill = document.createElement('span');
    pill.id = 'offlinePill';
    pill.className = 'hidden noprint';
    pill.textContent = 'Offline';
    bar.insertBefore(pill, b);
    var sync = function () { pill.classList.toggle('hidden', navigator.onLine); };
    addEventListener('online', sync); addEventListener('offline', sync); sync();
  }

  // 3) Back-to-top button
  var up = document.createElement('button');
  up.id = 'toTop';
  up.setAttribute('aria-label', 'Back to top');
  up.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
  up.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(up);
  addEventListener('scroll', function () { up.classList.toggle('show', scrollY > 400); }, { passive: true });

  // 4) Honest credit footer
  var f = document.createElement('footer');
  f.className = 'sitefoot noprint';
  f.textContent = 'Restyled and extended by Rehman Gul, based on an open-source FYP template. Your data stays in this browser.';
  document.body.appendChild(f);
})();
