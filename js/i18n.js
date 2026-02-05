const supportedLanguages = ['tr', 'en', 'es', 'de', 'fr', 'it', 'pt', 'ru', 'jp'];
const defaultLang = 'tr';

// Initialize translations
let translations = {};
let currentLang = localStorage.getItem('preferredLanguage') ||
                  (navigator.language || navigator.userLanguage || 'tr').slice(0, 2).toLowerCase();

if (!supportedLanguages.includes(currentLang)) {
    currentLang = 'en'; // fallback
    // Double check specific codes
    if (navigator.language === 'tr-TR' || navigator.language === 'tr-tr') currentLang = 'tr';
}

// Event for language change
const langChangeEvent = new Event('languageChanged');

async function loadLanguage(lang) {
    if (!supportedLanguages.includes(lang)) return;

    try {
        console.log('Loading language:', lang);
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`Language file not found: locales/${lang}.json`);

        translations = await response.json();

        // Update document
        document.documentElement.lang = lang;
        if (translations.siteTitle) document.title = translations.siteTitle;

        // Save preference
        localStorage.setItem('preferredLanguage', lang);
        currentLang = lang;

        // Apply to DOM
        applyTranslations();
        updateLangUI(lang);

        // Notify others
        window.dispatchEvent(langChangeEvent);

    } catch (err) {
        console.error('Error loading language:', err);
        if (lang !== defaultLang) {
            console.log('Falling back to default language...');
            loadLanguage(defaultLang);
        }
    }
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Translating ${elements.length} elements`);

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);

        if (value !== undefined && value !== null) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else if (el.tagName === 'IMG' && el.hasAttribute('alt')) {
                el.alt = value;
            } else if (el.hasAttribute('title')) {
                el.title = value;
            } else if (el.tagName === 'textPath') {
                 el.textContent = value;
            } else {
                // Check if value contains HTML
                if (/<[a-z][\s\S]*>/i.test(value)) {
                     el.innerHTML = value;
                } else {
                     el.textContent = value;
                }
            }
        } else {
            console.warn('Translation missing for key:', key);
        }
    });
}

function getNestedValue(obj, key) {
    return key.split('.').reduce((o, k) => o && o[k], obj);
}

function changeLanguage(lang) {
    if (supportedLanguages.includes(lang) && lang !== currentLang) {
        loadLanguage(lang);
    }
}

function updateLangUI(lang) {
    // 1. Update text display (e.g. "TR", "EN")
    const display = document.getElementById('current-lang-display');
    if (display) display.textContent = lang.toUpperCase();

    // 2. Update checkmarks in dropdown
    supportedLanguages.forEach(l => {
        const check = document.getElementById(`${l}-check`);
        if (check) check.style.opacity = l === lang ? '1' : '0';
    });

    // 3. Update toggle button active state
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) {
        btn.classList.toggle('bg-primary/5', true); // generic active style
    }

    // Close dropdown if it's open (optional, but good UX)
    const dropdown = document.getElementById('lang-dropdown-menu');
    if (dropdown) {
        dropdown.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    }
}

// Global Exports
window.changeLanguage = changeLanguage;
window.toggleLangDropdown = function() {
    const dropdown = document.getElementById('lang-dropdown-menu');
    if (dropdown) {
        dropdown.classList.toggle('opacity-100');
        dropdown.classList.toggle('scale-100');
        dropdown.classList.toggle('pointer-events-auto');
    }
};

// Accessor for translations (useful for other scripts)
Object.defineProperty(window, 'translations', {
    get: () => translations
});

// Initialize on Load
// We use DOMContentLoaded but also listen for footer injection if needed.
// Since this script is likely deferred or at end of body, it runs after parsing.
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLang);
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#lang-toggle-btn') && !e.target.closest('#lang-dropdown-menu')) {
        const dropdown = document.getElementById('lang-dropdown-menu');
        if (dropdown) dropdown.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    }
});
