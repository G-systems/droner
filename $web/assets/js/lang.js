// lang.js
// Language translations for multilingual site support

const translations = {
  en: {
    welcome_message: "Welcome to our website!",
    home: "Home",
    about: "About",
    solutions: "Solutions",
    contact: "Contact",
    technology: "Technology",
    services: "Services",
    store: "Store",
    blog: "Blog",
    read_more: "Read more",
    submit: "Submit",
    learn_more: "Learn more"
  },
  he: {
    welcome_message: "ברוכים הבאים לאתר שלנו!",
    home: "דף הבית",
    about: "אודות",
    solutions: "פתרונות",
    contact: "צור קשר",
    technology: "טכנולוגיה",
    services: "שירותים",
    store: "חנות",
    blog: "בלוג",
    read_more: "קרא עוד",
    submit: "שלח",
    learn_more: "למידע נוסף"
  }
};

// Export the translations object for use in other modules
export default translations;

export function initializeLanguageToggle(buttonId) {
    const toggleButton = document.getElementById(buttonId);
    if (!toggleButton) return;

    // Initialize language state
    const currentLang = document.documentElement.lang || 'he';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    updateLanguageClasses(currentLang);

    toggleButton.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'he' ? 'en' : 'he';
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
        updateLanguageClasses(newLang);
        translatePage(newLang);
    });
}

function updateLanguageClasses(lang) {
    document.body.classList.remove('lang-he', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}

function translatePage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}
