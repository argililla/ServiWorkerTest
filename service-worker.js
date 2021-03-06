var CACHE_NAME = 'offline-page';
var resourcesToCache = [
  './',
  './index.html',
  './subpage1.html',
  './subpage2.html',
  './subpage3.html',
  './subpage4.html',
  './css/snackbar.css',
  './img/folder-horizontal.png',
  './img/mario.jpeg',
  './files/DocumentoPrueba1.pdf',
  './files/sp-airbus-leaflet-web.pdf',
  './files/DocumentoPrueba2.pdf',
  './files/Airbus-commercial-aircraft-corporate-presentation-EN.pdf',
  './files/DocumentoPrueba3.pdf',
  './files/DocumentoPrueba4.pdf',
  './files/text_2008_01_30_A380.pdf',
  './files/Airbus-Commercial-Aircraft-AC-A319-Feb18.pdf',
  './files/Airbus-Commercial-Aircraft-AC-A320-Feb18.pdf',
  './files/Airbus-Commercial-Aircraft-AC-A321-Feb18.pdf',
  './files/Airbus-Commercial-Aircraft-AC-A350-900-1000.pdf',
  './files/Airbus-Commercial-Aircraft-AC-A380-Dec-2016.pdf',
  './files/DocumentoPrueba5.pdf',
  './files/DocumentoPrueba6.pdf',
  './files/DocumentoPrueba7.pdf',
  './files/DocumentoPrueba8.pdf',
  './files/DocumentoPrueba9.pdf',
  './files/DocumentoPrueba10.pdf'
];

var document = typeof document === 'undefined' ? '' : document;


self.addEventListener('install', function (event) {
  // install files needed offline
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("INICIANDO el cacheado de archivos.");
        console.log('Opened cache');
        return cache.addAll(resourcesToCache);
      })
  )
})
self.addEventListener('fetch', function (event) {
  // every request from our site, passes through the fetch handler
  // I have proof
  console.log('I am a request with url:', event.request.clone().url)
  event.respondWith(
    // check all the caches in the browser and find
    // out whether our request is in any of them
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          // if we are here, that means there's a match
          //return the response stored in browser
          return response;
        }
        // no match in cache, use the network instead
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(function (response) {
          if (response.status === 404) {
            console.log("page not founf: Error 404");
          }
          return caches.open(resourcesToCache).then(function (cache) {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      }).catch(function (error) {
        console.log('Error', error);
      })
  );
});

// function showSnackbarCacheDownload(startEnd) {
//   if (startEnd == "start") {
//     // Get the snackbar DIV
//     var x = document.getElementById("snackbarCachingFiles");
//   } else {
//     var x = document.getElementById("snackbarCachedFiles");
//   }
//   console.log('Mostrando Snackbar Files cacheados');
//   // Add the "show" class to DIV
//   x.className = "show";
//   // After 3 seconds, remove the show class from DIV
//   setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
// }