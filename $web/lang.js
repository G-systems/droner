// Object to store translations
const translations = {
    en: {
        greeting: "Hello",
        farewell: "Goodbye",
        // Add more keys and their English translations here
    },
    es: {
        greeting: "Hola",
        farewell: "Adiós",
        // Add more keys and their Spanish translations here
    },
    he: {
        greeting: "שלום",
        farewell: "להתראות",
        // Add more keys and their Hebrew translations here
    },
    // Add more languages and keys as needed
};

/**
 * Function to translate a key based on the language code.
 * @param {string} key - The translation key.
 * @param {string} lang - The language code (e.g., 'en', 'es', 'he').
 * @returns {string} - The translated string or a fallback message.
 */
function translate(key, lang = 'en') {
    if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    // Fallback to English or return the key if translation is missing
    return translations['en'][key] || key;
}

/**
 * Function to update all elements with a data-i18n attribute
 * to the current language's translation.
 * 
 * Usage:
 * 1. Add a data-i18n attribute to any HTML element you want to translate.
 *    The value of data-i18n should be the translation key.
 *    Example: <p data-i18n="greeting"></p>
 * 
 * 2. When the language is switched, this function will update the text content
 *    of all such elements automatically.
 * 
 * 3. To add new translation keys:
 *    - Add the key and translated strings to the translations object above.
 *    - Add data-i18n attributes with the new keys to your HTML elements.
 * 
 * 4. To add new languages:
 *    - Add a new language code and translation object to the translations object.
 *    - Add buttons or UI elements to switch to the new language.
 */
function updateTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translate(key, lang);
    });
}

/**
 * Setup language toggle buttons.
 * 
 * This example assumes you have buttons with data-lang attributes for each language code.
 * Example:
 * <button data-lang="en">English</button>
 * <button data-lang="he">עברית</button>
 * 
 * Clicking a button will switch the language of the entire webpage.
 */
function setupLanguageSwitcher(defaultLang = 'en') {
    let currentLang = defaultLang;

    // Initial translation on page load
    updateTranslations(currentLang);

    // Add event listeners to all buttons with data-lang attribute
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            if (translations[selectedLang]) {
                currentLang = selectedLang;
                updateTranslations(currentLang);
            } else {
                console.warn(`Language '${selectedLang}' not found in translations.`);
            }
        });
    });
}

// Export functions for external use
export { translate, updateTranslations, setupLanguageSwitcher };
