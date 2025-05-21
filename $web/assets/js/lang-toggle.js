AOS.init();
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('translateToggle');
  if (!toggleButton) return;
  let lang = localStorage.getItem('siteLang') || 'he';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  toggleButton.textContent = lang === 'he' ? 'English' : 'עברית';
  toggleButton.addEventListener('click', () => {
    lang = lang === 'he' ? 'en' : 'he';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    toggleButton.textContent = lang === 'he' ? 'English' : 'עברית';
    localStorage.setItem('siteLang', lang);
  });
});