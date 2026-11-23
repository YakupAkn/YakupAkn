// Service Worker - Çevrimdışı Çalışma Desteği
// Yollar service worker'ın kapsamına (scope) göre çözülür; site /YakupAkn/ altında da kökte de çalışır.
const CACHE_NAME = 'yda-portfolio-v2';

const PAGES = [
    '',
    'index.html',
    'projeler.html',
    'urunler.html',
    'athletico.html',
    'athleticocore.html',
    'neuralcanvas.html',
    'phantomlabs.html',
    'zincirikir.html',
    'box.html',
    '404.html'
];
const GAME_PAGES = [
    'oyun.html',
    'oyun1.html',
    'oyun2.html',
    'oyun3.html',
    'oyun4.html',
    'oyun5.html',
    'oyun6.html',
    'oyun7.html',
    'oyun8.html',
    'oyun9.html',
    'oyun10.html',
    'oyun11.html',
    'oyun12.html',
    'oyun13.html',
    'oyun15.html',
    'drone-simulator.html'
];
const CODE_ASSETS = [
    'css/index.css',
    'css/neuralcanvas.css',
    'js/layout.js',
    'js/game-common.js',
    'js/i18n.js',
    'js/main.js',
    'js/index.js',
    'js/neuralcanvas.js',
    'projeler.json',
    'box.json',
    'manifest.json'
];
const LOCALES = [
    'locales/tr.json',
    'locales/en.json',
    'locales/de.json',
    'locales/es.json',
    'locales/fr.json',
    'locales/it.json',
    'locales/pt.json',
    'locales/ru.json',
    'locales/jp.json'
];
const IMAGES = [
    'images/athleticocore-analiz.png',
    'images/athleticocore-camera.png',
    'images/athleticocore-coach.png',
    'images/athleticocore-main.png',
    'images/favicon.ico',
    'images/favicon.png',
    'images/icon-192.svg',
    'images/icon-512.svg',
    'images/scoby-day0.jpg',
    'images/yda-icon-16.png',
    'images/yda-logo.png'
];

const ALL_ASSETS = [...PAGES, ...CODE_ASSETS, ...LOCALES, ...IMAGES, ...GAME_PAGES]
    .map((p) => new URL(p, self.registration.scope).href);

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => Promise.all(
                // Tek dosya hata verirse tüm önbellekleme iptal olmasın
                ALL_ASSETS.map((url) => cache.add(url).catch((err) => console.warn('[SW] Önbelleğe alınamadı:', url, err)))
            ))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    if (url.origin !== location.origin) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return response;
            })
            .catch(() =>
                caches.match(request).then((cached) => {
                    if (cached) return cached;
                    const accept = request.headers.get('accept') || '';
                    if (request.mode === 'navigate' || accept.includes('text/html')) {
                        return caches.match(new URL('index.html', self.registration.scope).href);
                    }
                    return Response.error();
                })
            )
    );
});

self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') self.skipWaiting();
});
