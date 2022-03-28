self.addEventListener('install',function(event){event.waitUntil(caches.open('v1').then(function(cache){return cache.addAll(['./','./favicon.ico']);}));});self.addEventListener('activate',function(event){var cacheKeeplist=['v1'];event.waitUntil(caches.keys().then(function(keyList){return Promise.all(keyList.map(function(key){if(cacheKeeplist.indexOf(key)===-1){return caches.delete(key);}}));}));});self.addEventListener('fetch',function(event){event.respondWith(caches.match(event.request).then(function(resp){return resp||fetch(event.request).then(function(response){let responseClone=response.clone();caches.open('v1').then(function(cache){cache.put(event.request,responseClone);});return response;});}).catch(function(){return caches.match('./favicon.ico');}));});self.addEventListener('message',function(event){});