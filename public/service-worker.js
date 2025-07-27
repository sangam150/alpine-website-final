// Alpine Education Service Worker
const CACHE_NAME = "alpine-education-v1.0.0";
const urlsToCache = [
  "/",
  "/about",
  "/contact",
  "/apply",
  "/countries",
  "/test-preparation",
  "/student-services",
  "/study-destinations",
  "/resources/blog",
  "/resources/downloads",
  "/resources/handbooks",
  "/resources/mock-tests",
  "/resources/visa-faqs",
  "/services/profile-evaluation",
  "/services/scholarships",
  "/services/sop",
  "/services/visa",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/logo.svg",
  "/globe.svg",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Fetch event - serve from cache if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Return offline page if both cache and network fail
        if (event.request.destination === "document") {
          return caches.match("/");
        }
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle offline form submissions
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      for (const data of offlineData) {
        await submitOfflineData(data);
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

async function getOfflineData() {
  // Implementation for retrieving offline form data
  return [];
}

async function submitOfflineData(data) {
  // Implementation for submitting offline data
}

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New update from Alpine Education",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-144x144.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Learn More",
        icon: "/icons/icon-144x144.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icons/icon-144x144.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Alpine Education", options),
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  } else if (event.action === "close") {
    // Handle close action
  } else {
    event.waitUntil(clients.openWindow("/"));
  }
});
