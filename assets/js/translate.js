// translate.js - initialize Google Translate and adjust page direction
(function() {
  function loadScript() {
    const s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);
  }

  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'he',
      includedLanguages: 'en,he',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  };

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function updateDir() {
    const trans = getCookie('googtrans');
    const lang = trans && trans.endsWith('/en') ? 'en' : 'he';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadScript();
    updateDir();
    setInterval(updateDir, 1000);
  });
})();
