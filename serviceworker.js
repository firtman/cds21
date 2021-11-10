const assetsName = "PWA_ASSETS";
const urls = ["/", "/js/app.js", "/js/handlers.js", "/data/activities.json", "/styles.css",
"https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"];

// Install the assets
self.addEventListener("install", event => {
    caches.open(assetsName).then( cache => {
        cache.addAll(urls);
    });
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request) // searching in the cache
            .then( response => {
                // Even if the response is in the cache, we fetch it
                // and update the cache for future usage
                var fetchPromise = fetch(event.request).then(
                     networkResponse => {
                        caches.open(assetsName).then(function(cache) {
                            // updating the cache
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    });
                // We use the currently cached version if it's there
                return response || fetchPromise;
            })
        );
    }); 


// Cache First 
// self.addEventListener("fetch", event => {
//     event.respondWith(
//         caches.match(event.request)    // searching in the cache
//             .then( response => {
//                 if (response) {
//                     // The request is in the cache, CACHE HIT
//                     return response;
//                 } else {
//                     // We need to go to the network, CACHE MISS 
//                     return fetch(event.request);
//                 }
//             })
//     );
// });


// Synthesizing responses
// self.addEventListener("fetch", event => {
//     const response = new Response(`service worker responding for ${event.request.url}`);
//     event.respondWith(response); // HTTP response, or a promise of an HTTP response
// });