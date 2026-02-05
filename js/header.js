// header.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Header HTML Şablonu
    const headerHTML = `
    <div id="scroll-progress" class="absolute top-0 left-0 h-[2px] bg-primary w-0 transition-all duration-100"></div>

    <div class="max-w-7xl mx-auto flex justify-between items-center">
        <a href="index.html" class="text-2xl md:text-3xl font-black font-display tracking-tightest hover:skew-x-[-10deg] transition-transform duration-300">
            YDA<span class="text-primary animate-pulse">_</span>
        </a>

        <nav class="hidden md:flex items-center gap-8 lg:gap-10 font-bold uppercase text-[10px] tracking-[0.2em]">
            <a href="projeler.html" class="nav-item relative group py-2" data-i18n="nav-projects">
                Projeler
                <span class="underline-bar absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <a href="urunler.html" class="nav-item relative group py-2" data-i18n="nav-about">
                Ürünler
                <span class="underline-bar absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a href="iletisim.html" class="nav-item relative group py-2" data-i18n="nav-contact">
                İletişim
                <span class="underline-bar absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
        </nav>

        <div class="flex items-center gap-3 sm:gap-4 md:gap-6">
            <div class="relative group">
                <button id="lang-toggle-btn" onclick="toggleLangDropdown()" class="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium uppercase tracking-wider bg-bgDark/80 backdrop-blur-sm border border-white/15 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-95">
                    <span id="current-lang-display" class="font-bold">TR</span>
                    <i class="fas fa-chevron-down text-[10px] opacity-70 transition-transform group-hover:rotate-180 duration-300"></i>
                </button>
                
                <div id="lang-dropdown-menu" class="absolute top-full right-0 mt-2 w-44 bg-bgDark/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl shadow-black/60 py-1.5 opacity-0 scale-95 pointer-events-none transition-all duration-200 origin-top-right z-50 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
                    ${generateLangButton('tr', '🇹🇷', 'Türkçe')}
                    ${generateLangButton('en', '🇬🇧', 'English')}
                    ${generateLangButton('es', '🇪🇸', 'Español')}
                    ${generateLangButton('de', '🇩🇪', 'Deutsch')}
                    ${generateLangButton('fr', '🇫🇷', 'Français')}
                    ${generateLangButton('it', '🇮🇹', 'Italiano')}
                    ${generateLangButton('pt', '🇧🇷', 'Português')}
                    ${generateLangButton('ru', '🇷🇺', 'Русский')}
                    ${generateLangButton('jp', '🇯🇵', '日本語')}
                </div>
            </div>

            <a href="mailto:yakupdelilakin@gmail.com" class="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-[10px] font-black uppercase tracking-tighter bg-white text-black rounded-full hover:bg-primary hover:text-black transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-primary/40" data-i18n="coffee">   
                Let's Talk
            </a>
        </div>
    </div>
    `;

    // 2. HTML'i Sayfaya Yerleştir
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
        setActiveLink(); // Linki aktif etme fonksiyonunu çağır
    }
});

// Yardımcı Fonksiyon: Dil Butonu Oluşturucu (Kod tekrarını önlemek için)
function generateLangButton(code, flag, name) {
    return `
    <button onclick="changeLanguage('${code}')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-3">
        <span class="text-lg">${flag}</span>
        <span>${name}</span>
        <span id="${code}-check" class="ml-auto text-primary opacity-0">✓</span>
    </button>`;
}

// 3. AKTİF LİNK AYARLAMA MANTIĞI
function setActiveLink() {
    // Şu anki sayfanın dosya adını al (örn: "projeler.html" veya sadece "/" ise "index.html")
    let currentPath = window.location.pathname.split("/").pop();
    
    // Eğer anasayfadaysak (boş string dönerse) index.html kabul et
    if (currentPath === "") currentPath = "index.html";

    // Navigasyon linklerini seç
    const navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(link => {
        // Linkin href değerini al
        const linkHref = link.getAttribute('href');

        // Eğer şu anki sayfa ile link eşleşiyorsa
        if (linkHref === currentPath) {
            // 1. Yazı rengini primary yap
            link.classList.add('text-primary');
            
            // 2. Altındaki çizginin genişliğini %100 yap (sabit kalsın)
            const underline = link.querySelector('.underline-bar');
            if (underline) {
                underline.classList.remove('w-0');
                underline.classList.add('w-full');
            }
        }
    });
}

// Global Fonksiyonlar (Dil değiştirme vb. için gerekli)
window.toggleLangDropdown = function() {
    // Dropdown mantığın buraya (zaten CSS ile hover yapılmış ama mobil için gerekebilir)
    console.log("Dropdown tıklandı");
}
