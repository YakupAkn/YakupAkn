// js/game-common.js - Oyun sayfaları için ortak yardımcılar (geri linki, dokunmatik köprü, ölçekleme)
// Kullanım: <script src="js/game-common.js" defer></script>
// Opsiyonlar (script etiketine ekle): data-swipe  -> kaydırma hareketini ok tuşlarına çevirir (yılan, 2048)
//                                      data-touch-mouse -> parmak sürükleme = mousemove (pong, dodge, breakout)
(function () {
  var s = document.currentScript || {};
  var opts = { swipe: s.hasAttribute && s.hasAttribute('data-swipe'), touchMouse: s.hasAttribute && s.hasAttribute('data-touch-mouse') };

  var st = document.createElement('style');
  st.textContent =
    'html,body{overscroll-behavior:none;-webkit-tap-highlight-color:transparent}' +
    'body{touch-action:manipulation;-webkit-user-select:none;user-select:none}' +
    'input,textarea{-webkit-user-select:text;user-select:text}' +
    'canvas{max-width:100vw;max-height:calc(100dvh - 140px);width:auto;height:auto;touch-action:none}' +
    '#yda-back{position:fixed;top:max(12px,env(safe-area-inset-top));left:12px;z-index:100;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;font:700 12px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:rgba(10,10,10,.65);border:1px solid rgba(255,255,255,.2);border-radius:999px;text-decoration:none;backdrop-filter:blur(6px)}' +
    '#yda-back:hover,#yda-back:focus-visible{color:#FF3D00;border-color:#FF3D00;outline:none}';
  document.head.appendChild(st);

  function ready(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }

  ready(function () {
    var a = document.createElement('a');
    a.id = 'yda-back'; a.href = 'index.html'; a.setAttribute('aria-label', 'Ana sayfaya dön');
    a.textContent = '← Ana Sayfa';
    document.body.appendChild(a);
  });

  function fireKey(key, code) {
    var e = new KeyboardEvent('keydown', { key: key, code: key, bubbles: true });
    Object.defineProperty(e, 'keyCode', { get: function () { return code; } });
    document.dispatchEvent(e);
  }

  if (opts.swipe) {
    var sx, sy;
    document.addEventListener('touchstart', function (e) { var t = e.touches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
    document.addEventListener('touchend', function (e) {
      if (sx == null) return;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
      if (Math.abs(dx) > Math.abs(dy)) dx > 0 ? fireKey('ArrowRight', 39) : fireKey('ArrowLeft', 37);
      else dy > 0 ? fireKey('ArrowDown', 40) : fireKey('ArrowUp', 38);
    }, { passive: true });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
  }

  if (opts.touchMouse) {
    var fwd = function (e) {
      var t = e.touches[0]; if (!t) return;
      (e.target || document).dispatchEvent(new MouseEvent('mousemove', { clientX: t.clientX, clientY: t.clientY, bubbles: true }));
    };
    document.addEventListener('touchstart', fwd, { passive: true });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); fwd(e); }, { passive: false });
  }
})();
