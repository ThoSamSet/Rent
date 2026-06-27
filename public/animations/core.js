/**
 * Camp Nhà Thỏ — GSAP core animations (navbar, scroll state, batch reveals).
 * Requires: vendor/gsap.min.js, vendor/ScrollTrigger.min.js
 */
(function () {
    'use strict';

    if (typeof gsap === 'undefined') {
        return;
    }

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

    if (!reducedMotion && hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    function initNavbarLoad() {
        var navbar = document.querySelector('.navbar');
        if (!navbar || reducedMotion) {
            if (navbar) {
                navbar.classList.add('navbar--ready');
            }
            return;
        }

        gsap.fromTo(navbar,
            { y: -20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power3.out',
                delay: 0.15,
                onComplete: function () {
                    navbar.classList.add('navbar--ready');
                }
            }
        );
    }

    function initNavbarScrollState() {
        var navbar = document.querySelector('.navbar');
        if (!navbar || !hasScrollTrigger || reducedMotion) {
            return;
        }

        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: function (self) {
                navbar.classList.toggle('navbar--scrolled', self.scroll() > 40);
            }
        });
    }

    function revealVisibleNow(selectors) {
        if (!hasScrollTrigger || reducedMotion) {
            return;
        }

        gsap.utils.toArray(selectors).forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
                gsap.set(el, { opacity: 1, y: 0 });
            }
        });
    }

    function revealHomeCardsNow() {
        if (document.body.getAttribute('data-page') !== 'home') {
            return;
        }

        if (reducedMotion || !hasScrollTrigger) {
            document.querySelectorAll(
                '.home-pricing__card, .home-gallery__item, .home-pricing__header, .home-gallery__header'
            ).forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        gsap.utils.toArray('.home-pricing, .home-gallery').forEach(function (section) {
            var rect = section.getBoundingClientRect();
            if (rect.top >= window.innerHeight * 0.95 || rect.bottom <= 0) {
                return;
            }

            var header = section.querySelector('.home-pricing__header, .home-gallery__header');
            var targets = section.querySelectorAll('.home-pricing__card, .home-gallery__item');

            if (header) {
                gsap.set(header, { opacity: 1, y: 0 });
            }
            if (targets.length) {
                gsap.set(targets, { opacity: 1 });
            }
        });
    }

    function initBatchReveals() {
        if (!hasScrollTrigger || reducedMotion) {
            document.querySelectorAll('.js-reveal').forEach(function (el) {
                el.classList.add('is-revealed');
            });
            return;
        }

        var revealSelectors = [
            'main > section:not(.hero):not(.home-editorial):not(.home-section)',
            'footer.footer'
        ].join(', ');

        ScrollTrigger.batch(revealSelectors, {
            start: 'top 92%',
            once: true,
            onEnter: function (batch) {
                gsap.fromTo(batch,
                    { opacity: 0, y: 36 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power2.out',
                        stagger: 0.1,
                        overwrite: true
                    }
                );
            }
        });

        revealVisibleNow(revealSelectors);
        revealHomeCardsNow();
        window.addEventListener('load', function () {
            revealVisibleNow(revealSelectors);
            revealHomeCardsNow();
            refreshScrollTriggers();
        }, { once: true });
    }

    var refreshTimer = null;

    function refreshScrollTriggers() {
        if (!hasScrollTrigger || reducedMotion) {
            return;
        }

        if (refreshTimer) {
            clearTimeout(refreshTimer);
        }

        refreshTimer = setTimeout(function () {
            refreshTimer = null;
            ScrollTrigger.refresh();
        }, 150);
    }

    function refreshScrollTriggersNow() {
        if (!hasScrollTrigger || reducedMotion) {
            return;
        }

        if (refreshTimer) {
            clearTimeout(refreshTimer);
            refreshTimer = null;
        }

        ScrollTrigger.refresh();
    }

    function init() {
        if (!reducedMotion) {
            document.documentElement.classList.add('camp-gsap');
        }
        initNavbarLoad();
        initNavbarScrollState();
        initBatchReveals();
    }

    window.CampAnimCore = {
        gsap: gsap,
        ScrollTrigger: hasScrollTrigger ? ScrollTrigger : null,
        reducedMotion: reducedMotion,
        refresh: refreshScrollTriggers,
        refreshNow: refreshScrollTriggersNow,
        init: init
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
