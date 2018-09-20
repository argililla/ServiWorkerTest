var CACHE_NAME = 'offline-page';
var resourcesToCache = [
  './',
  './index.html',
  './subpage1.html',
  './subpage2.html',
  './subpage3.html',
  './subpage4.html',
  './img/folder-horizontal.png',
  './img/mario.jpeg',
  './files/DocumentoPrueba1.pdf',
  './files/DocumentoPrueba2.pdf',
  './files/DocumentoPrueba3.pdf',
  './files/DocumentoPrueba4.pdf',
  './files/DocumentoPrueba5.pdf',
  './files/DocumentoPrueba6.pdf',
  './files/DocumentoPrueba7.pdf',
  './files/DocumentoPrueba8.pdf',
  './files/DocumentoPrueba9.pdf',
  './files/DocumentoPrueba10.pdf'
];

self.addEventListener('install', function(event) {
  // install files needed offline
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(resourcesToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    // every request from our site, passes through the fetch handler
    // I have proof
    console.log('I am a request with url:', event.request.clone().url)
    event.respondWith(
      // check all the caches in the browser and find
      // out whether our request is in any of them
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            // if we are here, that means there's a match
            //return the response stored in browser
            return response;
          }
          // no match in cache, use the network instead
          return fetch(event.request);
        }
      )
    );
  });

  // 'use strict'

// var cacheVersion = 1;
// var currentCache = {
//     offline: 'offline-cache' + cacheVersion
// };

// const offlineUrl = 'offline-page.html';

// this.addEventListener('install', event => {
//     event.waitUntil(
//       caches.open(currentCache.offline).then(function(cache) {
//         return cache.addAll([
//             './img/wario.png',
//             offlineUrl
//         ]);
//       })
//     );
// });

// this.addEventListener('fetch', event => {
//     // request.mode = navigate isn't supported in all browsers
//     // so include a check for Accept: text/html header.
//     if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
//           event.respondWith(
//             fetch(event.request.url).catch(error => {
//                 // Return the offline page
//                 return caches.match(offlineUrl);
//             })
//       );
//     }
//     else{
//           // Respond with everything else if we can
//           event.respondWith(caches.match(event.request)
//                           .then(function (response) {
//                           return response || fetch(event.request);
//                       })
//               );
//         }
//   });