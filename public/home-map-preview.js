/**
 * Lazy-load Leaflet + init homepage map preview when #mapPreview enters viewport.
 */
(function () {
    'use strict';

    var mapPreviewElement = document.getElementById('mapPreview');
    if (!mapPreviewElement) {
        return;
    }

    var initialized = false;
    var leafletPromise = null;

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var existing = document.querySelector('script[src="' + src + '"]');
            if (existing) {
                if (existing.dataset.loaded === 'true') {
                    resolve();
                    return;
                }
                existing.addEventListener('load', function () { resolve(); }, { once: true });
                existing.addEventListener('error', reject, { once: true });
                return;
            }

            var script = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.addEventListener('load', function () {
                script.dataset.loaded = 'true';
                resolve();
            }, { once: true });
            script.addEventListener('error', reject, { once: true });
            document.body.appendChild(script);
        });
    }

    function loadStylesheet(href) {
        if (document.querySelector('link[href="' + href + '"]')) {
            return;
        }
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    function ensureLeaflet() {
        if (window.L) {
            return Promise.resolve();
        }
        if (leafletPromise) {
            return leafletPromise;
        }

        leafletPromise = new Promise(function (resolve, reject) {
            loadStylesheet('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
            loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js')
                .then(resolve)
                .catch(reject);
        });

        return leafletPromise;
    }

    function initMapPreview() {
        if (initialized) {
            return;
        }
        initialized = true;

        ensureLeaflet().then(function () {
            if (typeof L === 'undefined') {
                return;
            }

            var locations = window.CAMP_MAP_SITES;
            if (!locations || !locations.length) {
                return;
            }

            var mapPreview = L.map('mapPreview', {
                dragging: false,
                touchZoom: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                zoomControl: false,
                attributionControl: false
            }).setView([35.436, 138.57], 11);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(mapPreview);

            mapPreviewElement.style.filter = 'grayscale(100%) contrast(1.1)';

            locations.forEach(function (location) {
                var customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: '<div style="font-size: 32px; text-align: center;">' + location.icon + '</div>',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                });

                L.marker([location.lat, location.lng], { icon: customIcon, interactive: false })
                    .addTo(mapPreview);
            });

            var bounds = L.latLngBounds(locations.map(function (l) { return [l.lat, l.lng]; }));
            mapPreview.fitBounds(bounds.pad(0.1));

            window.homeMapPreview = mapPreview;

            function refreshMapPreview() {
                mapPreview.invalidateSize({ pan: false });
            }

            refreshMapPreview();
            setTimeout(refreshMapPreview, 200);
            window.addEventListener('resize', refreshMapPreview);
        }).catch(function () {
            initialized = false;
        });
    }

    function scheduleInit() {
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                        initMapPreview();
                    }
                });
            }, { rootMargin: '240px 0px' });
            observer.observe(mapPreviewElement);
            return;
        }

        initMapPreview();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleInit);
    } else {
        scheduleInit();
    }
})();
