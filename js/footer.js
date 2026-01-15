// js/footer.js - Ortak Footer Yükleyici

document.addEventListener('DOMContentLoaded', () => {
  // Footer HTML şablonu (senin mevcut tasarımına %100 uyumlu)
  const footerHTML = `
  <footer class="px-6 md:px-12 py-12 border-t border-white/5 bg-bgDark relative z-20">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
  <p data-i18n="footer-copyright">© 2026 Yakup Delil Akın. Tüm Hakları Saklıdır.</p>
        
        <!-- Sosyal Medya Linkleri -->
        <div class="flex gap-6 md:gap-8">
        <a href="https://www.instagram.com/ykp._.56" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors" data-i18n="social-instagram">Instagram</a>
        <a href="https://www.linkedin.com/in/yakupdelil" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors" data-i18n="social-linkedin">LinkedIn</a>
        <a href="https://github.com/YakupAkn" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors" data-i18n="social-github">GitHub</a>
        </div>
        
    </div>
  </footer>
  `;

  // Footer'ı body'nin sonuna ekle
  document.body.insertAdjacentHTML('beforeend', footerHTML);
});