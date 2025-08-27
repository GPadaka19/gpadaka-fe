const CACHE_NAME = 'gpadaka-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/Index.tsx',
  '/src/components/Navigation.tsx',
  '/src/components/sections/Hero.tsx',
  '/src/components/sections/About.tsx',
  '/src/components/sections/Skills.tsx',
  '/src/components/sections/Projects.tsx',
  '/src/components/sections/Experience.tsx',
  '/src/components/sections/Contact.tsx',
  '/src/components/Footer.tsx',
  '/src/index.css',
  '/src/App.css',
  '/favicon.ico',
  '/GP-no-bg.webp',
  '/src/assets/profile-photo.webp',
  '/src/assets/calendo.webp',
  '/src/assets/certify-nft.webp',
  '/src/assets/lots.webp',
  '/src/assets/pothole.webp'
];

const options = {
  icon: '/GP-no-bg.webp',
  badge: '/favicon.ico',
};

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle offline actions here
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/GP-no-bg.webp',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Gusti Padaka Portfolio', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
