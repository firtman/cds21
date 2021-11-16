// PWA is requesting a file from the network
self.addEventListener("fetch", event => {
    const request = event.request;
    console.log(request.url);

    const response = new Response(`URL requested: ${request.url}`);
    event.respondWith(response);
})