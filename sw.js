const CACHE_NAME="kafv-fish-company-info-ai-v2-2-20260818";
const SHELL=["./","./index.html","./manifest.json","./kafv-fish-company-ai-icon-192.png","./kafv-fish-company-ai-icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{
  const req=event.request;if(req.method!=="GET")return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  if(url.pathname.endsWith(".json")){
    event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req)));
    return;
  }
  event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res})));
});
