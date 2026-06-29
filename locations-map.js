/**
 * Locations page — Leaflet map, filter sync, card/marker interaction.
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
    var markerElementsBySiteId = {};
    var activeSiteId = null;
    var hoverSiteId = null;
    var canHover = window.matchMedia('(hover: hover)').matches;
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

    function getVisibleSiteIds(cards) {
        var ids = [];
        cards.forEach(function (card) {
            if (!card.classList.contains('location-hidden')) {
                var sid = card.getAttribute('data-site-id');
                if (sid) ids.push(sid);
            }
        });
        return ids;
    }

    function findLocation(id) {
        var locations = getLocations();
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].id === id) return locations[i];
        }
        return null;
    }

    function getSiteOverlayContent(siteId, loc) {
        var title = loc.name;
        var desc = loc.description || '';
        var card = document.querySelector('.location-detail[data-site-id="' + siteId + '"]');
        if (card) {
            var h3 = card.querySelector('h3');
            var teaser = card.querySelector('.location-teaser');
            if (h3 && h3.textContent.trim()) title = h3.textContent.trim();
            if (teaser && teaser.textContent.trim()) desc = teaser.textContent.trim();
        }
        return { title: title, desc: desc };
    }

    function ensureMapOverlay() {
        var existing = $('map-site-overlay');
        if (existing) return existing;

        var container = document.querySelector('.map-container');
        if (!container) return null;

        var overlay = document.createElement('div');
        overlay.id = 'map-site-overlay';
        overlay.className = 'map-site-overlay';
        overlay.hidden = true;
        overlay.setAttribute('aria-live', 'polite');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML =
            '<h3 class="map-site-overlay__title"></h3>' +
            '<p class="map-site-overlay__desc"></p>';
        container.appendChild(overlay);
        return overlay;
    }

    function showMapSiteOverlay(loc) {
        if (!loc) return;
        var overlay = ensureMapOverlay();
        if (!overlay) return;

        var copy = getSiteOverlayContent(loc.id, loc);
        var titleEl = overlay.querySelector('.map-site-overlay__title');
        var descEl = overlay.querySelector('.map-site-overlay__desc');
        if (titleEl) titleEl.textContent = copy.title;
        if (descEl) descEl.textContent = copy.desc;

        overlay.hidden = false;
        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('is-visible');
    }

    function hideMapSiteOverlay() {
        var overlay = $('map-site-overlay');
        if (!overlay) return;
        overlay.hidden = true;
        overlay.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('is-visible');
    }

    function setMarkerVisualState(siteId, state) {
        var el = markerElementsBySiteId[siteId];
        if (!el) return;
        el.classList.remove('custom-marker--hover', 'custom-marker--active');
        if (state === 'hover') el.classList.add('custom-marker--hover');
        if (state === 'active') el.classList.add('custom-marker--active');
    }

    function clearCardHighlights() {
        document.querySelectorAll('.location-detail--active').forEach(function (el) {
            el.classList.remove('location-detail--active');
        });
    }

    function highlightSite(siteId, options) {
        options = options || {};
        if (!siteId || !markersBySiteId[siteId]) return;

        activeSiteId = siteId;
        clearCardHighlights();

        var card = document.querySelector('.location-detail[data-site-id="' + siteId + '"]');
        if (card && !card.classList.contains('location-hidden')) {
            card.classList.add('location-detail--active');
            if (options.scrollCard) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }

        Object.keys(markerElementsBySiteId).forEach(function (id) {
            setMarkerVisualState(id, id === siteId ? 'active' : null);
        });

        var marker = markersBySiteId[siteId];
        var loc = findLocation(siteId);
        if (marker && loc && map) {
            if (options.showOverlay !== false) {
                showMapSiteOverlay(loc);
            }
            if (options.pan !== false) {
                map.setView([loc.lat, loc.lng], Math.max(map.getZoom(), 11), { animate: true });
            }
        }
    }

    function clearActiveSite() {
        activeSiteId = null;
        clearCardHighlights();
        hideMapSiteOverlay();
        Object.keys(markerElementsBySiteId).forEach(function (id) {
            setMarkerVisualState(id, null);
        });
    }

    function fitMapToLocationIds(visibleIds) {
        if (!map) return;
        var locations = getLocations();
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

    function syncMapToCards(cards, showAll) {
        if (!map) return;
        var visibleIds = getVisibleSiteIds(cards);
        var locations = getLocations();

        locations.forEach(function (loc) {
            var marker = markersBySiteId[loc.id];
            if (!marker) return;
            if (visibleIds.indexOf(loc.id) !== -1) {
                if (!map.hasLayer(marker)) marker.addTo(map);
            } else {
                map.removeLayer(marker);
                if (activeSiteId === loc.id) activeSiteId = null;
            }
        });

        clearActiveSite();

        if (showAll) {
            map.fitBounds(L.latLngBounds(locations.map(function (l) {
                return [l.lat, l.lng];
            })).pad(0.1));
            return;
        }

        fitMapToLocationIds(visibleIds);
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

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
        }).addTo(map);

        mapEl.style.filter = 'grayscale(100%) contrast(1.1)';

        ensureMapOverlay();

        locations.forEach(function (location) {
            var customIcon = L.divIcon({
                className: 'custom-marker',
                html: '<span class="custom-marker__dot" aria-hidden="true"></span>',
                iconSize: [16, 16],
                iconAnchor: [8, 8],
            });

            var marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map);

            marker.on('click', function () {
                highlightSite(location.id, { scrollCard: true, showOverlay: true, pan: true });
            });

            markersBySiteId[location.id] = marker;

            marker.on('add', function () {
                var iconEl = marker.getElement();
                if (iconEl) {
                    markerElementsBySiteId[location.id] = iconEl;
                }
            });
        });

        map.fitBounds(L.latLngBounds(locations.map(function (l) {
            return [l.lat, l.lng];
        })).pad(0.1));

        mapInitialized = true;
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
        var grid = $('location-info-grid');
        var statusEl = $('location-filter-status');
        var emptyEl = $('location-empty-state');
        var root = document.querySelector('.page-locations');
        if (!grid || !statusEl || !root || root.dataset.locationsFilterBound) return;
        root.dataset.locationsFilterBound = 'true';

        var cards = grid.querySelectorAll('.location-detail');
        var total = cards.length;
        var selectedTags = {};
        var hintEl = $('location-empty-state-hint');
        var defaultHint = hintEl ? hintEl.textContent.trim() : '';

        function getCardTagSet(card) {
            var raw = (card.getAttribute('data-tags') || '').trim();
            if (!raw) return [];
            return raw.split(/\s+/).filter(Boolean);
        }

        function getTagLabel(tag) {
            var btn = root.querySelector(
                '.locations-filters--secondary .filter-tag-btn[data-filter-tag="' + tag + '"]'
            );
            if (!btn) {
                btn = root.querySelector(
                    '.locations-filters .filter-tag-btn[data-filter-tag="' + tag + '"]:not(.locations-region__card)'
                );
            }
            if (!btn) {
                btn = root.querySelector('.locations-filters .filter-tag-btn[data-filter-tag="' + tag + '"]');
            }
            return btn ? btn.textContent.trim() : tag;
        }

        function syncFilterButtonStates(showAll) {
            root.querySelectorAll('.locations-filters .filter-tag-btn[data-filter-tag]').forEach(function (btn) {
                var tag = btn.getAttribute('data-filter-tag');
                var on = !!selectedTags[tag];
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            });

            root.querySelectorAll('.locations-filters .filter-tag-btn[data-filter-action="clear"]').forEach(function (clearBtn) {
                clearBtn.classList.toggle('is-active', showAll);
                clearBtn.setAttribute('aria-pressed', showAll ? 'true' : 'false');
            });
        }

        function applyFilter() {
            var activeList = Object.keys(selectedTags).filter(function (k) {
                return selectedTags[k];
            });
            var showAll = activeList.length === 0;
            var visible = 0;

            cards.forEach(function (card) {
                var tags = getCardTagSet(card);
                var match = showAll || activeList.every(function (t) {
                    return tags.indexOf(t) !== -1;
                });
                if (match) {
                    card.classList.remove('location-hidden');
                    visible++;
                } else {
                    card.classList.add('location-hidden');
                }
            });

            statusEl.textContent =
                visible === total && showAll
                    ? 'Hiển thị ' + total + ' / ' + total + ' bãi'
                    : 'Hiển thị ' + visible + ' / ' + total + ' bãi';

            var noResults = !showAll && visible === 0;
            statusEl.classList.toggle('is-empty', noResults);

            if (emptyEl) {
                emptyEl.classList.toggle('is-visible', noResults);
                emptyEl.setAttribute('aria-hidden', noResults ? 'false' : 'true');
                if (hintEl) {
                    if (noResults) {
                        var labels = activeList.map(getTagLabel);
                        hintEl.textContent =
                            'Không có bãi nào khớp với: ' +
                            labels.join(', ') +
                            '. Thử bỏ bớt thẻ hoặc chọn «Tất cả».';
                    } else {
                        hintEl.textContent = defaultHint;
                    }
                }
                if (noResults) {
                    emptyEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }

            syncFilterButtonStates(showAll);
            syncMapToCards(cards, showAll);
        }

        root.addEventListener('click', function (e) {
            var btn = e.target.closest('.filter-tag-btn');
            if (!btn || !btn.closest('.locations-filters')) return;

            if (btn.getAttribute('data-filter-action') === 'clear') {
                selectedTags = {};
                applyFilter();
                return;
            }

            var tag = btn.getAttribute('data-filter-tag');
            if (!tag) return;

            var isRegion = btn.classList.contains('locations-region__card');

            if (selectedTags[tag]) {
                delete selectedTags[tag];
            } else {
                selectedTags[tag] = true;
            }
            applyFilter();

            if (isRegion) {
                var mapBand = $('locations-map-band');
                if (mapBand) {
                    mapBand.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                scheduleInitRetry(refreshMapSize, 400);
            } else {
                var galleryGrid = $('location-info-grid');
                if (galleryGrid) {
                    galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });

        cards.forEach(function (card) {
            var siteId = card.getAttribute('data-site-id');

            card.addEventListener('click', function (e) {
                if (e.target.closest('.location-map-link')) return;
                if (!siteId || !mapInitialized) return;
                highlightSite(siteId, { scrollCard: false, showOverlay: true, pan: true });
            });

            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (e.target.closest('.location-map-link')) return;
                    e.preventDefault();
                    if (siteId && mapInitialized) {
                        highlightSite(siteId, { scrollCard: false, showOverlay: true, pan: true });
                    }
                }
            });

            if (canHover) {
                card.addEventListener('mouseenter', function () {
                    if (!siteId || activeSiteId === siteId || !mapInitialized) return;
                    hoverSiteId = siteId;
                    setMarkerVisualState(siteId, 'hover');
                });
                card.addEventListener('mouseleave', function () {
                    if (hoverSiteId === siteId) {
                        hoverSiteId = null;
                        if (activeSiteId !== siteId) {
                            setMarkerVisualState(siteId, null);
                        }
                    }
                });
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
        markerElementsBySiteId = {};
        activeSiteId = null;
        hoverSiteId = null;
        initRetries = 0;
        hideMapSiteOverlay();
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
