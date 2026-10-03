const CACHE='tanasagashi-v43';
const ASSETS=['./','./index.html','./style.css','./app.mjs','./style.css?v=43','./app.mjs?v=43','./search.mjs','./manufacturers.mjs?v=43','./prices.mjs?v=23','./data.json','./warehouse-layout.pdf','./data-quality.csv','./manifest.webmanifest','./icon-192.png','./icon-512.png',...Array.from({length:6},(_,i)=>`./layout-${i+1}.svg`)];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('tanasagashi-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();for(const c of await self.clients.matchAll())c.postMessage('cached');})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request)));});

