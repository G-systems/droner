// translate.js - handle bilingual support using Google Translate

(function () {
  // Setup hidden element required by Google Translate
  const gte = document.createElement('div');
  gte.id = 'google_translate_element';
  gte.style.display = 'none';
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(gte);
  });

  // Load Google Translate script
  const gScript = document.createElement('script');
  gScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  gScript.defer = true;
  document.head.appendChild(gScript);

  // Initialize translate element
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'he',
      includedLanguages: 'en,he',
      autoDisplay: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');

    // Apply stored language preference
    const saved = localStorage.getItem('siteLang') || 'he';
    if (saved !== 'he') {
      doGTranslate('he|' + saved);
    }
  };

  // Apply language and trigger translation
  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    localStorage.setItem('siteLang', lang);
    const btn = document.getElementById('translateToggle');
    if (btn) btn.textContent = lang === 'he' ? 'English' : 'עברית';
  }

  // Event listener for language toggle button
  document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('translateToggle');
    const current = localStorage.getItem('siteLang') || 'he';
    applyLang(current);

    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'he' ? 'en' : 'he';
        applyLang(newLang);
        if (window.doGTranslate) {
          doGTranslate('he|' + newLang);
        }
      });
    }
  });

  // Programmatic language change for Google Translate
  window.doGTranslate = function (langPair) {
    if (!langPair) return;
    const lang = langPair.split('|')[1];
    const select = document.querySelector('select.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }
  };
})();
