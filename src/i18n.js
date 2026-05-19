const SUPPORTED_LANGUAGES = ['es', 'en', 'pt'];
const DEFAULT_LANGUAGE = 'es';
const STORAGE_KEY = 'preferredLanguage';

let translations = {};
let currentLanguage = DEFAULT_LANGUAGE;

async function loadTranslations(lang) {
    try {
        const response = await fetch(`src/translations/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
        translations = await response.json();
        currentLanguage = lang;
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedValue(translations, key);
        if (translation) {
            element.innerHTML = translation;
        }
    });
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

async function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    await loadTranslations(lang);
    applyTranslations();
    updateDropdownUI(lang);
}

function updateDropdownUI(lang) {
    const option = document.querySelector(`.lang-option[data-value="${lang}"]`);
    if (!option) return;
    const flag = option.querySelector('.flag-icon').src;
    const label = option.querySelector('span').textContent;
    document.querySelector('#lang-btn .flag-icon').src = flag;
    document.querySelector('#lang-btn .lang-label').textContent = label;
}

function getSavedLanguage() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
}

async function initI18n() {
    const savedLang = getSavedLanguage();
    await setLanguage(savedLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    langBtn.addEventListener('click', () => {
        langDropdown.classList.toggle('open');
    });

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            langDropdown.classList.remove('open');
            setLanguage(option.dataset.value);
        });
    });

    document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target)) {
            langDropdown.classList.remove('open');
        }
    });

    initI18n();
});