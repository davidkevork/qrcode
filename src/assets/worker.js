'user strict';

var qrcodeCacheName = 'qrcode-v1.0.3';
var qrcodeCachePagesName = 'qrcode-pages-v1.0.3';
var qrcodeCacheObjectsName = 'qrcode-objects-v1.0.3';

var urlsToCache = [
];
var urlsApisToCache = [
];
var qrcodeCacheFiles = [
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  caches.open(qrcodeCacheName)
    .then(cache => cache.addAll(qrcodeCacheFiles))
    .catch(error => {});
});


self.addEventListener('activate', (event) => {
  self.clients.claim();
  event.waitUntil(caches.keys()
    .then((cacheKeys) => {
      var deletePromisses = [];
      for (let i = 0; i < cacheKeys.length; i++) {
        if (cacheKeys[i] !== qrcodeCacheName &&
            cacheKeys[i] !== qrcodeCachePagesName &&
            cacheKeys[i] !== qrcodeCacheObjectsName
        ) {
          deletePromisses.push(caches.delete(cacheKeys[i]));
        }
      }
      return Promise.all(deletePromisses);
    })
    .catch(error => {}));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then(response => response || fetch(event.request))
    .catch(error => {}));
});

function cacheFirstStrategy(request) {
  return caches.match(request).then(cacheResponse => cacheResponse || fetchResquestAndCache(request));
}

function networkFirstStrategy(request) {
  return fetchResquestAndCache(request).catch(response => caches.match(request));
}

function fetchResquestAndCache(request) {
  return fetch(request).then((networkResponse) => {
    caches.open(getCacheName(request)).then((cache) => {
      cache.put(request, networkResponse);
    }).catch(error => {});
    return networkResponse.clone();
  });
}

function getCacheName(request) {
  let requestUrl = new URL(request.url);
  let requestPath = requestUrl.pathname;

  for (let i = 0; i < urlsToCache.length; i++) {
    let url = urlsToCache[i];
    if (requestPath === url) { return qrcodeCacheObjectsName; }
  }
  for (let i = 0; i < urlsApisToCache.length; i++) {
    let api = urlsApisToCache[i];
    if (requestPath === api || requestPath.indexOf(api) > -1) { return qrcodeCachePagesName; }
  }

  return qrcodeCacheName;
}
