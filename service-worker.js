/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["MaterialIcons-Regular.012cf6a10129e2275d79.woff","012cf6a10129e2275d79d6adac7f3b02"],["MaterialIcons-Regular.570eb83859dc23dd0eec.woff2","570eb83859dc23dd0eec423a49e147fe"],["MaterialIcons-Regular.a37b0c01c0baf1888ca8.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["MaterialIcons-Regular.e79bfd88537def476913.eot","e79bfd88537def476913f3ed52f4f4b3"],["antonio-bold.07cba0f622053834d1c6.ttf","07cba0f622053834d1c6f60165b152db"],["antonio-bold.cee7b01b002418db2517.woff2","cee7b01b002418db25170c2c20cb4373"],["antonio-bold.eb8e8cd4a5b9f426571b.woff","eb8e8cd4a5b9f426571bd560c0f9444a"],["antonio-light.4b30712eb069c91087ca.woff2","4b30712eb069c91087ca206347327e74"],["antonio-light.6dea71fbc99d5b5e8229.woff","6dea71fbc99d5b5e8229f05abba949cb"],["antonio-light.ce00465818e439d2266b.ttf","ce00465818e439d2266ba669449e1f74"],["assets/data/data.json","d3e34f18799e3194184bc0808331f397"],["assets/fonts/Antonio-Bold.ttf","2a8a6af373531a3500e240604935b8dc"],["assets/fonts/Antonio-Light.ttf","975aacd71c6910b732c678b04b39ed86"],["assets/fonts/Antonio-Regular.ttf","25cd38a8b03ff96775c2e00d31052010"],["assets/fonts/antonio-regular-webfont.woff","61b324b4c6270d490cf887f8cc0f64b3"],["assets/images/Pampered_Pal_Logo-2.png","c4ba6bb568bfb304bfd92d324616f552"],["assets/images/Pampered_Pal_Logo-3.png","631cb2a9192466cf8761a6030acd0dc1"],["assets/images/Pampered_Pal_Logo.png","d136a54d85412e848d8ff566f7eedcfc"],["assets/images/img1-free-product.jpg","6ece0c77ca4f662ec132bcda97c81d4f"],["assets/images/img1-learn-something-new.jpg","03b645095715818878a9716f3e02ee8a"],["assets/images/img1-sip-socialize.jpg","fc6b21d9a77ec211451fa98332b18dfd"],["assets/images/img10-edible-gifts.jpg","765b05b4a95b238e16bddcf7d6faabea"],["assets/images/img10-piece-of-cake.jpg","460d3f853c5216f1a4374d8c6ca25169"],["assets/images/img12-family.jpg","38ac7d1acc19d716f0bd19c26017a2fe"],["assets/images/img12-healthy.jpg","ca8fc63b9ac9288ee213fd16a630fd8e"],["assets/images/img12-sweets.jpg","44c87b606607a351fc89dfed388242f1"],["assets/images/img13-kids.jpg","d576bfe5c6ce6fe18b3cb80653571ed4"],["assets/images/img13-one-pot-meals.jpg","aca83b546c4c635b2c3e5f2c97a90898"],["assets/images/img14-farmers-market.jpg","cf94750618a5e29faaf5abde2ee5bb8c"],["assets/images/img14-make-take.jpg","4b44c3bc6ccb888b70d530c7a204f51e"],["assets/images/imgcatalog-party.jpg","f3e774e65ad7cda26e7544b1626ab011"],["assets/images/imgcooking-demonstration.jpg","7072275d814125e0c5be86cc7edc1b05"],["assets/images/imgmain-course.jpg","0d3652bf46c905c200fde2afd8babc7f"],["assets/images/imgno.jpg","bab3ce82208bf833a98e63c280961ece"],["assets/images/imgstation-style.jpg","94bf9479b1228ed40088cd8756f1d0cd"],["assets/images/imgvirtual-party.jpg","55f668788fecf93f87ca66f39a180f52"],["assets/images/imgyes.jpg","e8646519547e2b126eded9a92fe49ca7"],["assets/images/pampered-pal-144x144.png","51f9713ff11bbdca30afdaeb23a54086"],["assets/images/pampered-pal-192x192.png","6e0fd143fafaaf66556a89041de2c075"],["assets/images/pampered-pal-32x32.png","69bd3fb7d28b700424c9e6a92f8c2477"],["assets/images/pampered-pal-42x42.png","c236a0351d865d8a14301bdcee6c6e46"],["assets/images/pampered-pal-48x48.png","cd8fd6dc52af6babbc3c9de0277f473c"],["assets/images/pampered-pal-512x512.png","0cc4deabc34b65b28678020435e4cf9c"],["assets/images/pampered-pal-72x72.png","4ba1e6b1253498cf5022302e6a9fa73b"],["assets/images/pampered-pal-96x96.png","a10d973d7b00f2738808d17292f2945c"],["assets/images/pampered-pal-favicon.png","2811cace17ee6845c0190a60509294ad"],["assets/images/pampered-pal.svg","6ec13fbb570839beca5fa71289cf2390"],["assets/manifest.json","fef6a90b0f1ee2e83933a2017e07cf89"],["index.html","90e94cedf4f0fd462f1bdd3a0fa41deb"],["inline.967d7329c32b8930a683.bundle.js","a91f520e9d0d948d8bb461e4dd1e7a07"],["main.1acb4041d0f9243e49ed.bundle.js","1f3bb9fdf42c27a207d5debf5f8cd77a"],["polyfills.d0e1f424b0013ef51868.bundle.js","4b0d73bc98f8517adfdf9763ae30623a"],["styles.126f97228aca8cd0221f.bundle.css","126f97228aca8cd0221f12c16d3c0cf6"],["vendor.2327718760af0b2d0082.bundle.js","74df2a9a50f485f1b7315545498e0ef7"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







