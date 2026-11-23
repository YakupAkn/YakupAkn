// js/layout.js - Ortak header + footer (tek kaynak)
// Kullanım: sayfada <div id="site-header"></div> ve <div id="site-footer"></div> bırak,
// <head> içine <script src="js/layout.js"></script> ekle. i18n.js'den ÖNCE yüklenmeli.
(function () {
  var LINKEDIN = 'https://www.linkedin.com/in/yakupdelil'; // TODO: doğru hesabı doğrula (README: yakupdelilakin)
  var NAV = [
    { href: 'projeler.html', i18n: 'nav-projects', label: 'Projeler' },
    { href: 'urunler.html', i18n: 'nav-about', label: 'Ürünler' },
    { href: 'index.html#contact', i18n: 'nav-contact', label: 'İletişim' }
  ];
  var LANGS = [['tr', '🇹🇷', 'Türkçe'], ['en', '🇬🇧', 'English'], ['es', '🇪🇸', 'Español'], ['de', '🇩🇪', 'Deutsch'], ['fr', '🇫🇷', 'Français'], ['it', '🇮🇹', 'Italiano'], ['pt', '🇵🇹', 'Português'], ['ru', '🇷🇺', 'Русский'], ['jp', '🇯🇵', '日本語']];
  var UL = '<span class="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>';

  var page = (location.pathname.split('/').pop() || 'index.html');
  function isActive(href) { return href.split('#')[0] === page && href.indexOf('#') === -1; }

  function header() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="nav-link relative group py-2' + (isActive(n.href) ? ' text-primary active' : '') + '" data-i18n="' + n.i18n + '"' + (isActive(n.href) ? ' aria-current="page"' : '') + '>' + n.label + UL + '</a>';
    }).join('');
    var mobile = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="py-3 border-b border-white/10 hover:text-primary transition-colors" data-i18n="' + n.i18n + '">' + n.label + '</a>';
    }).join('');
    var langs = LANGS.map(function (l) {
      return '<button onclick="changeLanguage(\'' + l[0] + '\')" class="w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-3"><span class="text-lg">' + l[1] + '</span><span>' + l[2] + '</span><span id="' + l[0] + '-check" class="ml-auto text-primary opacity-0">✓</span></button>';
    }).join('');
    return '' +
'<header class="fixed top-0 w-full z-[80] px-5 sm:px-6 md:px-12 py-5 transition-all duration-500 backdrop-blur-md bg-bgDark/40 border-b border-white/5 group" id="main-header">' +
'<div id="scroll-progress" class="absolute top-0 left-0 h-[2px] bg-primary w-0 transition-all duration-100"></div>' +
'<div class="max-w-7xl mx-auto flex justify-between items-center">' +
'<a href="index.html" class="text-2xl md:text-3xl font-black font-display tracking-tightest hover:skew-x-[-10deg] transition-transform duration-300">YDA<span class="text-primary animate-pulse">_</span></a>' +
'<nav class="hidden md:flex items-center gap-8 lg:gap-10 font-bold uppercase text-[10px] tracking-[0.2em]" aria-label="Ana menü">' + links + '</nav>' +
'<div class="flex items-center gap-3 sm:gap-4 md:gap-6">' +
'<div class="relative group"><button id="lang-toggle-btn" onclick="toggleLangDropdown()" class="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium uppercase tracking-wider bg-bgDark/80 backdrop-blur-sm border border-white/15 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-95" aria-label="Dil seç"><span id="current-lang-display" class="font-bold">TR</span><i class="fas fa-chevron-down text-[10px] opacity-70"></i></button>' +
'<div id="lang-dropdown-menu" class="absolute top-full right-0 mt-2 w-44 bg-bgDark/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl shadow-black/60 py-1.5 opacity-0 scale-95 pointer-events-none transition-all duration-200 origin-top-right z-50 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">' + langs + '</div></div>' +
'<a href="mailto:yakupdelilakin@gmail.com" class="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-[10px] font-black uppercase tracking-tighter bg-white text-black rounded-full hover:bg-primary hover:text-black transition-all duration-300 active:scale-95" data-i18n="coffee">Let\'s Talk</a>' +
'<button id="menu-toggle" class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-3 text-white md:hidden hover:bg-white/15 transition-all duration-300" aria-label="Menüyü aç" aria-controls="mobile-nav" aria-expanded="false"><i class="fas fa-bars" aria-hidden="true"></i></button>' +
'</div></div></header>' +
'<div id="mobile-nav" class="fixed inset-x-0 top-0 z-[90] hidden min-h-screen bg-bgDark/95 p-6 backdrop-blur-xl md:hidden">' +
'<div class="flex items-center justify-between mb-8"><a href="index.html" class="text-2xl font-black font-display tracking-tightest">YDA<span class="text-primary">_</span></a><button id="mobile-nav-close" aria-label="Menüyü kapat" class="text-white text-2xl hover:text-primary transition-colors"><i class="fas fa-times" aria-hidden="true"></i></button></div>' +
'<nav class="flex flex-col gap-4 uppercase tracking-[0.22em] text-sm font-bold text-white" aria-label="Mobil menü">' + mobile + '</nav></div>';
  }

  function footer() {
    return '' +
'<footer class="px-6 md:px-12 py-12 border-t border-white/5 bg-bgDark relative z-20"><div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">' +
'<p data-i18n="footer-copyright">© 2026 Yakup Delil Akın. Tüm Hakları Saklıdır.</p>' +
'<div class="flex gap-6 md:gap-8">' +
'<a href="https://www.instagram.com/ykp._.56" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors" data-i18n="social-instagram">Instagram</a>' +
'<a href="' + LINKEDIN + '" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors" data-i18n="social-linkedin">LinkedIn</a>' +
'<a href="https://github.com/YakupAkn" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors" data-i18n="social-github">GitHub</a>' +
'</div></div></footer>';
  }

  function mount() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
    var t = document.getElementById('menu-toggle'), m = document.getElementById('mobile-nav'), c = document.getElementById('mobile-nav-close');
    function set(open) {
      if (!m) return;
      m.classList.toggle('hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (t) t.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (t) t.addEventListener('click', function () { set(true); });
    if (c) c.addEventListener('click', function () { set(false); });
    if (m) m.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
