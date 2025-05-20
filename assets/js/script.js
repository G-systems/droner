// script.js - Main JavaScript file for droner-web

// Initialize AOS (Animate On Scroll) library
document.addEventListener("DOMContentLoaded", function () {
    AOS.init();
    // Add further initialization or event listeners below
    // Example:
    // document.querySelector('#someButton').addEventListener('click', function() {
    //     // Your code here
    // });

    // Temporarily disable smooth scroll
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href').substring(1);
    //         const targetElement = document.getElementById(targetId);
    //         if (targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'start'
    //             });
    //         }
    //     });
    // });

    // Temporarily disable Google Translate
    // if (window.google && window.google.translate) {
    //     googleTranslateElementInit();
    // }

    // Remove duplicate language buttons
    const langButtons = document.querySelectorAll('.language-toggle, .lang-btn');
    if (langButtons.length > 1) {
        langButtons.forEach((btn, index) => {
            if (index > 0) btn.remove();
        });
    }

    // Ensure clear language toggle visibility
    const langToggle = document.querySelector('.language-toggle, .lang-btn');
    if (langToggle) {
        langToggle.style.position = 'fixed';
        langToggle.style.top = '20px';
        langToggle.style.right = '20px';
        langToggle.style.zIndex = '1000';
        langToggle.style.backgroundColor = '#0f6dd7';
        langToggle.style.color = '#fff';
        langToggle.style.padding = '8px 15px';
        langToggle.style.borderRadius = '8px';
        langToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
});

// Google Translate initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'he',
        includedLanguages: 'en,he',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

// Additional scripts can be added below