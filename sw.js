const CACHE='tanasagashi-v4';
const ASSETS=['./','./index.html','./style.css','./app.mjs','./search.mjs','./data.json','./data-quality.csv','./manifest.webmanifest','./icon-192.png','./icon-512.png',...Array.from({length:6},(_,i)=>`./layout-${i+1}.png`)];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('tanasagashi-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();for(const c of await self.clients.matchAll())c.postMessage('cached');})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));});

