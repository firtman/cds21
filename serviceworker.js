const CACHE_NAME = "pwa-assets";
const urlsToCache = ["/", "about.html", "styles.css", "js/app.js", "js/handlers.js", 
    "data/activities.json", "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"];

self.addEventListener("install", event => {
    // Pre-cache the assets
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    
})

// Cache First Policy
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)  // searching in the cache
            .then(function(response) {
                if (response) {  // CACHE HIT
                    // The request is in the cache 
                    return response;
                } else {    // CACHE MISS
                    // We need to go to the network  
                    return fetch(event.request);
                }
            })
    );
});



// PWA is requesting a file from the network
// self.addEventListener("fetch", event => {
//     const request = event.request;
//     console.log(request.url);

//     const response = new Response(`URL requested: ${request.url}`);
//     event.respondWith(response);
// })