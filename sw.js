const CACHE_NAME = 'praytime-offline-v3';
const ASSETS = [
  './',
  './index.html',
  './weather.html',
  './quran.html',
  './q-audio.html',
  './masjid-finder.html',
  './settings.html',
  './src/modern.css',
  './src/script.js',
  './src/app.js',
  './src/weather.js',
  './src/masjid.js',
  './src/settings.js',
  './src/adhan.js',
  './src/sw-register.js',
  './src/pray.png',
  './src/masjid.png',
  './src/weather2.png',
  './src/quran.png',
  './src/audio.png',
  'https://unpkg.com/@phosphor-icons/web',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install: Cache core UI assets
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

// Fetch: Serve from cache, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached asset, otherwise fetch from network
      return response || fetch(event.request).then(networkRes => {
        // Cache dynamic responses (API calls/Audio)
        if (event.request.url.includes('api.alquran.cloud') || event.request.url.includes('cdn.islamic.network')) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkRes.clone()));
        }
        return networkRes;
      });
    })
  );
});