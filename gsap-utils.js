/**
 * Camp Nhà Thỏ — GSAP helpers (load vendor/gsap.min.js first).
 * Optional: vendor/ScrollTrigger.min.js for scroll-driven animations.
 */
(function () {
    'use strict';

    if (typeof gsap === 'undefined') {
        return;
    }

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    function fadeUp(el, vars) {
        if (reducedMotion) {
            return;
        }

        return gsap.from(el, Object.assign({
            opacity: 0.88,
            y: 12,
            duration: 0.75,
            ease: 'power2.out'
        }, vars || {}));
    }

    function initScrollReveal(selectors) {
        if (reducedMotion || typeof ScrollTrigger === 'undefined') {
            return;
        }

        var targets = selectors || [
            'main > section',
            'main > article',
            'footer.footer',
            '.container > header.header'
        ].join(', ');

        gsap.utils.toArray(targets).forEach(function (el) {
            gsap.set(el, { opacity: 0.88, y: 12 });

            ScrollTrigger.create({
                trigger: el,
                start: 'top 95%',
                once: true,
                onEnter: function () {
                    fadeUp(el);
                }
            });
        });
    }

    window.CampGsap = {
        gsap: gsap,
        fadeUp: fadeUp,
        initScrollReveal: initScrollReveal
    };
})();
