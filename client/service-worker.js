// client/service-worker.js
const CACHE = 'chatassist-v1';
const ASSETS = ['/client/widget.bundle.js','/client/widget.css'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/client/')) {
    event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
  }
});