// Cihaz Kontrolü: Mobil veya Tablet ise ağır animasyonları çalıştırma
const isMobile = () => window.innerWidth <= 1024 || ('ontouchstart' in window);

// --- DİL VE ÇEVİRİ SİSTEMİ ---
const supportedLanguages = ['tr', 'en', 'es', 'de'];
let currentLang = localStorage.getItem('preferredLanguage') || 
    (supportedLanguages.includes(navigator.language.slice(0, 2)) ? navigator.language.slice(0, 2) : 'tr');
let translations = {};

async function loadLanguage(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        translations = await response.json();
        document.documentElement.lang = lang;
        applyTranslations();
        updateLangUI(lang);
        localStorage.setItem('preferredLanguage', lang);
    } catch (err) {
        console.error('Dil yükleme hatası:', err);
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = key.split('.').reduce((o, k) => o && o[k], translations);
        if (value) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = value;
            else el.textContent = value;
        }
    });
}

function updateLangUI(lang) {
    const display = document.getElementById('current-lang-display');
    if (display) display.textContent = lang.toUpperCase();
    supportedLanguages.forEach(l => {
        const check = document.getElementById(`${l}-check`);
        if (check) check.style.opacity = lang === l ? '1' : '0';
    });
}

window.changeLanguage = (lang) => {
    if (supportedLanguages.includes(lang) && lang !== currentLang) {
        currentLang = lang;
        loadLanguage(lang);
        document.getElementById('lang-dropdown-menu').classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    }
};

window.toggleLangDropdown = () => {
    const dropdown = document.getElementById('lang-dropdown-menu');
    dropdown.classList.toggle('opacity-100');
    dropdown.classList.toggle('scale-100');
    dropdown.classList.toggle('pointer-events-auto');
};

// --- ANİMASYONLAR VE ETKİLEŞİM ---
if (!isMobile()) {
    const cursor = document.getElementById('cursor');
    const outline = document.getElementById('cursor-outline');
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    document.querySelectorAll('a, button, .project-card-v2').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.querySelectorAll('.hover-magnetic').forEach(m => {
        m.addEventListener('mousemove', (e) => {
            const rect = m.getBoundingClientRect();
            const strength = m.getAttribute('data-strength') || 40;
            const x = (e.clientX - rect.left - rect.width/2) / strength;
            const y = (e.clientY - rect.top - rect.height/2) / strength;
            m.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
        m.addEventListener('mouseleave', () => m.style.transform = 'translate(0, 0)');
    });
} else {
    document.getElementById('cursor')?.remove();
    document.getElementById('cursor-outline')?.remove();
}

// --- SİSTEM FONKSİYONLARI ---
window.initiateAirlock = () => {
    const overlay = document.getElementById('airlock-overlay');
    const bar = document.getElementById('airlock-bar');
    const logs = document.getElementById('airlock-logs');
    overlay.classList.replace('hidden', 'flex');
    document.body.style.overflow = 'hidden';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => window.location.href = 'lab.html', 800);
        }
        bar.style.width = progress + '%';
    }, 150);
};

window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    const scrollBar = document.getElementById('scroll-progress');
    const percent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollBar) scrollBar.style.width = percent + "%";
    header.classList.toggle('nav-blur', window.scrollY > 50);
    header.classList.toggle('py-3', window.scrollY > 50);
    header.classList.toggle('py-5', window.scrollY <= 50);
});

window.addEventListener('load', () => {
    loadLanguage(currentLang);
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('loader-progress');
    let p = 0;
    const int = setInterval(() => {
        p += Math.random() * 25;
        if (p >= 100) {
            p = 100;
            clearInterval(int);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.remove(), 800);
            }, 500);
        }
        bar.style.width = p + '%';
    }, 100);
});