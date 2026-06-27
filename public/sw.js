/* Camp Nhà Thỏ — service worker (generated 20260627) */
const CACHE_VERSION = '20260627';
const STATIC_CACHE = 'campnhatho-static-' + CACHE_VERSION;

const PRECACHE_URLS = [
  '/',
  '/favicon.ico',
  '/fonts/be-vietnam-pro-vietnamese-400-normal.woff2',
  '/images/responsive/hero-camping-1280w.webp',
  '/nav-menu.js',
  '/home-map-preview.js',
  '/locations-map-sites.js',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(PRECACHE_URLS).catch(function () {
        /* Precache best-effort — missing file must not block install */
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key.startsWith('campnhatho-static-') && key !== STATIC_CACHE; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

function isCacheableAsset(url) {
  if (url.origin !== self.location.origin) return false;
  return /\.(css|js|webp|png|jpg|jpeg|gif|svg|woff2?|ico)$/i.test(url.pathname)
    || url.pathname.startsWith('/_next/static/');
}

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);

  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          var copy = response.clone();
          caches.open(STATIC_CACHE).then(function (cache) {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(function () {
          return caches.match(event.request);
        })
    );
    return;
  }

  if (!isCacheableAsset(url)) return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        var copy = response.clone();
        caches.open(STATIC_CACHE).then(function (cache) {
          cache.put(event.request, copy);
        });
        return response;
      });
    })
  );
});
