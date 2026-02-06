// Service Worker - Çevrimdışı Çalışma Desteği
const CACHE_NAME = 'yda-portfolio-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/projeler.html',
    '/urunler.html',
    '/404.html',
    '/athletico.html',
    '/athleticocore.html',
    '/phantomlabs.html',
    '/css/index.css',
    '/js/footer.js',
    '/js/i18n.js',
    '/js/main.js',
    '/js/index.js',
    '/projeler.json',
    '/locales/tr.json',
    '/locales/en.json',
    '/locales/de.json',
    '/locales/es.json',
    '/locales/fr.json',
    '/locales/it.json',
    '/locales/pt.json',
    '/locales/ru.json',
    '/locales/jp.json',
    '/images/athleticocore-analiz.png',
    '/images/athleticocore-camera.png',
    '/images/athleticocore-coach.png',
    '/images/athleticocore-main.png',
    '/images/scoby-day0.jpg',
    '/images/icon-192.svg',
    '/images/icon-512.svg',
    '/manifest.json'
];

const GAME_PAGES = [
    '/oyun.html',
    '/oyun1.html',
    '/oyun2.html',
    '/oyun3.html',
    '/oyun4.html',
    '/oyun5.html',
    '/oyun6.html',
    '/oyun7.html',
    '/oyun8.html',
    '/oyun9.html',
    '/oyun10.html',
    '/oyun11.html',
    '/oyun12.html',
    '/oyun13.html',
    '/oyun14.html',
    '/oyun15.html'
];
const ALL_ASSETS = [...STATIC_ASSETS, ...GAME_PAGES];
self.addEventListener('install', (event) => {
    console.log('[SW] Yükleniyor...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Dosyalar önbelleğe alınıyor');
                return cache.addAll(ALL_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch((error) => {
                console.error('[SW] Önbelleğe alma hatası:', error);
            })
    );
});
self.addEventListener('activate', (event) => {
    console.log('[SW] Aktif');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Eski önbellek siliniyor:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    if (url.origin !== location.origin) {
        return;
    }
    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    if (request.headers.get('accept').includes('text/html')) {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
