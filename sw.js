const CACHE_NAME = 'vr-explorer-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/vr.html',
  '/vr-ipd.html',
  '/manifest.json',
  '/sw.js',
  'https://aframe.io/releases/1.5.0/aframe.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
