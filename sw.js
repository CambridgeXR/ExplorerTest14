const CACHE_NAME = 'vr-explorer-cache-v1';
const urlsToCache = [
  '/ExplorerTest14/index.html',
  '/ExplorerTest14/manifest.json',
  '/ExplorerTest14/sw.js',
  '/ExplorerTest14/icons/icon-192.png',
  '/ExplorerTest14/icons/icon-512.png',
  'https://aframe.io/releases/1.4.2/aframe.min.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached asset if available, else fetch from network
      return response || fetch(event.request);
    })
  );
});
