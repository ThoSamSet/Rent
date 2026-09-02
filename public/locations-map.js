/**
 * Locations page — Leaflet map + exclusive region filter.
 * Requires: leaflet.js, locations-map-sites.js (window.CAMP_MAP_SITES)
 */
(function () {
    'use strict';

    var MAX_INIT_RETRIES = 50;
    var initRetries = 0;
    var pendingInitTimer = null;
    var resizeListenerBound = false;

    var map = null;
    var mapInitialized = false;
    var markersBySiteId = {};
    var selectedRegion = null;
    var mobileMq = window.matchMedia('(max-width: 1023px)');

    function $(id) {
        return document.getElementById(id);
    }

    function isMobileLayout() {
        return mobileMq.matches;
    }

    function isMapPanelVisible() {
        var panel = $('locations-map-panel');
        if (!panel) return false;
        return panel.offsetParent !== null;
    }

    function mapContainerReady() {
        var mapEl = $('map');
        if (!mapEl) return false;
        if (!isMapPanelVisible()) return false;
        return mapEl.offsetHeight > 0 && mapEl.offsetWidth > 0;
    }

    function refreshMapSize() {
        if (map) {
            map.invalidateSize({ pan: false });
        }
    }

    function onWindowResize() {
        refreshMapSize();
    }

    function clearPendingInitTimer() {
        if (pendingInitTimer !== null) {
            clearTimeout(pendingInitTimer);
            pendingInitTimer = null;
        }
    }

    function scheduleInitRetry(fn, delay) {
        clearPendingInitTimer();
        pendingInitTimer = setTimeout(fn, delay);
    }

    function getLocations() {
        return window.CAMP_MAP_SITES || [];
    }

    function findLocation(id) {
        var locations = getLocations();
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].id === id) return locations[i];
        }
        return null;
    }

    function getVisibleSiteIds(region) {
        var locations = getLocations();
        if (!region) {
            return locations.map(function (loc) {
                return loc.id;
            });
        }
        return locations.filter(function (loc) {
            return loc.region === region;
        }).map(function (loc) {
            return loc.id;
        });
    }

    function fitMapToLocationIds(visibleIds) {
        if (!map) return;
        if (!visibleIds.length) {
            map.setView([35.436, 138.57], 8);
            return;
        }
        if (visibleIds.length === 1) {
            var loc = findLocation(visibleIds[0]);
            if (loc) map.setView([loc.lat, loc.lng], 11);
            return;
        }
        var pts = visibleIds.map(function (id) {
            var l = findLocation(id);
            return l ? [l.lat, l.lng] : null;
        }).filter(Boolean);
        if (pts.length) {
            map.fitBounds(L.latLngBounds(pts).pad(0.15));
        }
    }

    function syncMapToRegion(region) {
        if (!map) return;
        var locations = getLocations();
        var visibleIds = getVisibleSiteIds(region);
        var showAll = !region;

        locations.forEach(function (loc) {
            var marker = markersBySiteId[loc.id];
            if (!marker) return;
            if (visibleIds.indexOf(loc.id) !== -1) {
                if (!map.hasLayer(marker)) marker.addTo(map);
            } else {
                map.removeLayer(marker);
            }
        });

        if (showAll) {
            map.fitBounds(L.latLngBounds(locations.map(function (l) {
                return [l.lat, l.lng];
            })).pad(0.1));
        } else {
            fitMapToLocationIds(visibleIds);
        }
        refreshMapSize();
    }

    function initMap() {
        if (mapInitialized) {
            refreshMapSize();
            return true;
        }

        var mapEl = $('map');
        if (!mapEl || typeof L === 'undefined') return false;
        if (!mapContainerReady()) return false;

        var locations = getLocations();
        if (!locations.length) return false;

        map = L.map('map').setView([35.436, 138.57], 11);

        if (typeof window.CAMP_MAP_ADD_TILE_LAYER === 'function') {
            window.CAMP_MAP_ADD_TILE_LAYER(map);
        } else {
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }).addTo(map);
        }

        locations.forEach(function (location) {
            var customIcon = L.divIcon({
                className: 'custom-marker',
                html: '<span class="custom-marker__dot" aria-hidden="true"></span>',
                iconSize: [16, 16],
                iconAnchor: [8, 8],
            });

            var marker = L.marker([location.lat, location.lng], {
                icon: customIcon,
                interactive: false,
            }).addTo(map);

            markersBySiteId[location.id] = marker;
        });

        mapInitialized = true;
        syncMapToRegion(selectedRegion);
        refreshMapSize();
        setTimeout(refreshMapSize, 200);
        setTimeout(refreshMapSize, 600);
        requestAnimationFrame(function () {
            requestAnimationFrame(refreshMapSize);
        });
        if (!resizeListenerBound) {
            window.addEventListener('resize', onWindowResize);
            resizeListenerBound = true;
        }

        return true;
    }

    function initLocationFilters() {
        var root = document.querySelector('.page-locations');
        if (!root || root.dataset.locationsFilterBound) return;
        root.dataset.locationsFilterBound = 'true';

        function syncFilterButtonStates() {
            var showAll = !selectedRegion;

            root.querySelectorAll('.locations-filters .filter-tag-btn[data-filter-tag]').forEach(function (btn) {
                var tag = btn.getAttribute('data-filter-tag');
                var on = selectedRegion === tag;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            });

            root.querySelectorAll('.locations-filters .filter-tag-btn[data-filter-action="clear"]').forEach(function (clearBtn) {
                clearBtn.classList.toggle('is-active', showAll);
                clearBtn.setAttribute('aria-pressed', showAll ? 'true' : 'false');
            });
        }

        function syncGalleryToRegion(region) {
            var strip = $('locations-gallery-strip');
            if (!strip) return;
            strip.querySelectorAll('.home-gallery__item[data-region]').forEach(function (item) {
                var match = !region || item.getAttribute('data-region') === region;
                item.classList.toggle('location-hidden', !match);
            });
            strip.scrollLeft = 0;
        }

        function applyFilter() {
            syncFilterButtonStates();
            syncMapToRegion(selectedRegion);
            syncGalleryToRegion(selectedRegion);
        }

        root.addEventListener('click', function (e) {
            var btn = e.target.closest('.filter-tag-btn');
            if (!btn || !btn.closest('.locations-filters')) return;

            if (btn.getAttribute('data-filter-action') === 'clear') {
                selectedRegion = null;
                applyFilter();
                return;
            }

            var tag = btn.getAttribute('data-filter-tag');
            if (!tag) return;

            selectedRegion = selectedRegion === tag ? null : tag;
            applyFilter();

            if (btn.classList.contains('locations-region__card')) {
                var mapBand = $('locations-map-band');
                if (mapBand) {
                    mapBand.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                scheduleInitRetry(refreshMapSize, 400);
            }
        });

        applyFilter();
    }

    function initMobileAccordion() {
        if (isMobileLayout()) return;

        var toggle = document.querySelector('.locations-map-toggle');
        var panel = $('locations-map-panel');
        if (!toggle || !panel || toggle.dataset.locationsAccordionBound) return;
        toggle.dataset.locationsAccordionBound = 'true';

        toggle.addEventListener('click', function () {
            var open = panel.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (open) {
                var attempt = 0;
                function tryAfterOpen() {
                    attempt++;
                    if (initMap() || attempt > 20) {
                        refreshMapSize();
                        return;
                    }
                    scheduleInitRetry(tryAfterOpen, 50);
                }
                scheduleInitRetry(tryAfterOpen, 30);
            }
        });
    }

    function depsReady() {
        return typeof L !== 'undefined' && getLocations().length > 0;
    }

    function tryInit() {
        initRetries++;

        if (!depsReady()) {
            if (initRetries < MAX_INIT_RETRIES) {
                scheduleInitRetry(tryInit, 100);
            } else if (!window.__locationsFiltersReady) {
                window.__locationsFiltersReady = true;
                initLocationFilters();
            }
            return;
        }

        var mapReady = initMap();

        if (!mapReady && initRetries < MAX_INIT_RETRIES) {
            if (!isMobileLayout() || isMapPanelVisible()) {
                scheduleInitRetry(tryInit, 100);
                return;
            }
        }

        if (!window.__locationsFiltersReady) {
            window.__locationsFiltersReady = true;
            initLocationFilters();
        }
    }

    function resetMapState() {
        clearPendingInitTimer();
        if (map) {
            map.remove();
        }
        map = null;
        mapInitialized = false;
        markersBySiteId = {};
        selectedRegion = null;
        initRetries = 0;
        window.__locationsFiltersReady = false;
        var filterRoot = document.querySelector('.page-locations');
        if (filterRoot) {
            delete filterRoot.dataset.locationsFilterBound;
        }
        if (resizeListenerBound) {
            window.removeEventListener('resize', onWindowResize);
            resizeListenerBound = false;
        }
    }

    function initLocationsPage() {
        resetMapState();
        initMobileAccordion();
        tryInit();
    }

    function destroyLocationsPage() {
        resetMapState();
    }

    window.initLocationsPage = initLocationsPage;
    window.destroyLocationsPage = destroyLocationsPage;
})();
