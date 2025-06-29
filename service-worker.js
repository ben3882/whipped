const CACHE_NAME = "whipped-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/scripts.js",
  "/catwoman-facing.gif",
  "/catwoman.gif",
  "/catwoman-whip-villain.gif",
  "/whipcrack.mp3",
  "/images/android-chrome-192x192.png",
  "/images/android-chrome-512x512.png",
  "/images/apple-touch-icon.png",
  "/images/favicon-16x16.png",
  "/images/favicon-32x32.png",
  "/images/favicon.ico",
];

// Install event – cache all necessary assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate worker immediately
});

// Activate event – clean up old caches if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim(); // Take control immediately
});

// Fetch event – respond from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
