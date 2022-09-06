const CACHE_NAME = "cache_v1";
const urls_to_cache = [ 'index.html','offline.html' ];


//cache the static files on install
self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache)=>{
                console.log('Opened Cache');
                return cache.addAll(urls_to_cache);
            })
    )
});

//Listen to requests
self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
            .then(()=>{
                return fetch(event.request)
                    .catch(()=>caches.match('offline.html'))
            })
    )
});

//Activate the service worker

self.addEventListener('activate',(event)=>{
    const cache_white_list = [];
    cache_white_list.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cache_names)=> Promise.all(
            cache_names.map((cache_name)=>{
                if(!cache_white_list.includes(cache_name)){
                    return caches.delete(cache_name);
                }
            })
        ))
    )
});