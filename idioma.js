// Shows Spanish or English: the visitor's choice, else their browser language.
(function () {
  function pick() {
    try {
      var saved = localStorage.getItem('lang');
      if (saved) return saved;
    } catch (e) {}
    return (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    document.querySelectorAll('[data-set]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === lang));
    });
  }

  document.querySelectorAll('[data-set]').forEach(function (b) {
    b.addEventListener('click', function () {
      var lang = b.getAttribute('data-set');
      try { localStorage.setItem('lang', lang); } catch (e) {}
      apply(lang);
    });
  });

  apply(pick());
})();
