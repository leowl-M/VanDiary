// VanDiary Service Worker — offline-first app shell
// La versione qui sotto è aggiornata in automatico dalla GitHub Action
// .github/workflows/bump-sw-cache.yml a ogni push (hash dei file dell'app).
// Non serve modificarla a mano.
const CACHE = 'vandiary-v1';

// Asset da precaricare: app shell + librerie CDN
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './roadiario.svg',
  './roadiario-mark.svg',
  './questions.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // allSettled: un singolo CDN giù non fa fallire l'install
    await Promise.allSettled(PRECACHE.map((url) => cache.add(url)));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // API Supabase (rest/auth/realtime): sempre rete, mai cache (dati dinamici).
  // I media nello storage invece li cacheamo per vederli offline.
  if (url.hostname.endsWith('supabase.co') && !url.pathname.includes('/storage/')) {
    return; // gestione di default del browser (rete)
  }

  // Navigazione: prima la rete, fallback all'app shell in cache (offline).
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch (e) {
        const cache = await caches.open(CACHE);
        return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Asset statici + media storage: cache-first con aggiornamento runtime.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
