/**
 * Camp Nhà Thỏ — index.html GSAP animations (editorial layout).
 * Requires: CampAnimCore, vendor/gsap.min.js, vendor/ScrollTrigger.min.js
 */
(function () {
    'use strict';

    var page = document.body.getAttribute('data-page');
    if (page !== 'home' && page !== 'about' && page !== 'equipment') {
        return;
    }

    if (typeof gsap === 'undefined' || typeof CampAnimCore === 'undefined') {
        return;
    }

    var reducedMotion = CampAnimCore.reducedMotion;
    var hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

    if (!reducedMotion && hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    function refreshAfterAssets() {
        if (reducedMotion || !hasScrollTrigger) {
            return;
        }

        var heroImg = document.getElementById('heroImg');

        function afterLayoutStable() {
            CampAnimCore.refreshNow();
            refreshMapPreview();
        }

        // Only the hero image affects above-the-fold trigger geometry.
        // Below-fold lazy images were firing refresh mid-scroll and causing first-scroll jank.
        if (heroImg && !heroImg.complete) {
            heroImg.addEventListener('load', afterLayoutStable, { once: true });
            heroImg.addEventListener('error', afterLayoutStable, { once: true });
        } else {
            afterLayoutStable();
        }

        window.addEventListener('load', function () {
            CampAnimCore.refresh();
            refreshMapPreview();
        }, { once: true });
    }

    function refreshMapPreview() {
        if (window.homeMapPreview && typeof window.homeMapPreview.invalidateSize === 'function') {
            window.homeMapPreview.invalidateSize({ pan: false });
        }
    }

    function initHeroTimeline() {
        var hero = document.querySelector('.home-hero');
        if (!hero || reducedMotion) {
            return;
        }

        var title = hero.querySelector('.home-hero__title');
        var subtitle = hero.querySelector('.home-hero__subtitle');
        var label = hero.querySelector('.home-hero__label');
        var media = hero.querySelector('.home-hero__media');

        var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (media) {
            tl.from(media, { scale: 1.04, duration: 1.1 }, 0.1);
        }
        if (label) {
            tl.from(label, { opacity: 0, y: 16, duration: 0.65 }, 0.4);
        }
        if (title) {
            tl.from(title, { opacity: 0, y: 32, duration: 0.9 }, 0.5);
        }
        if (subtitle) {
            tl.from(subtitle, { opacity: 0, y: 22, duration: 0.75 }, 0.6);
        }
    }

    function initScrollHint() {
        var hint = document.querySelector('.home-hero__scroll-hint');
        var footer = document.querySelector('.footer');
        if (!hint) {
            return;
        }

        function setVisible(visible) {
            hint.classList.toggle('is-hidden', !visible);
        }

        function isFooterInView() {
            if (!footer) {
                return false;
            }
            return footer.getBoundingClientRect().top < window.innerHeight;
        }

        if (reducedMotion) {
            hint.style.opacity = '1';
            hint.style.transform = 'none';
            setVisible(!isFooterInView());
            window.addEventListener('scroll', function () {
                setVisible(!isFooterInView());
            }, { passive: true });
            return;
        }

        if (hasScrollTrigger && footer) {
            ScrollTrigger.create({
                trigger: footer,
                start: 'top bottom',
                onEnter: function () {
                    setVisible(false);
                },
                onLeaveBack: function () {
                    setVisible(true);
                },
                onRefresh: function () {
                    setVisible(!isFooterInView());
                }
            });
            setVisible(!isFooterInView());
            return;
        }

        setVisible(!isFooterInView());
        window.addEventListener('scroll', function () {
            setVisible(!isFooterInView());
        }, { passive: true });
    }

    function initHeroScrub() {
        var hero = document.querySelector('.home-hero');
        var img = document.getElementById('heroImg');
        if (!hero || !img || reducedMotion || !hasScrollTrigger) {
            return;
        }

        gsap.to(img, {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    function showPricingGalleryNow() {
        document.querySelectorAll(
            '.home-pricing__card, .home-gallery__item, .home-pricing__header, .home-gallery__header'
        ).forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    function revealPricingGalleryNow() {
        if (reducedMotion) {
            showPricingGalleryNow();
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

    function initSectionReveals() {
        if (reducedMotion || !hasScrollTrigger) {
            document.querySelectorAll('.home-section[data-reveal]').forEach(function (section) {
                section.style.opacity = '1';
            });
            showPricingGalleryNow();
            refreshMapPreview();
            return;
        }

        gsap.utils.toArray('.home-section[data-reveal]').forEach(function (section) {
            // Pricing/gallery use horizontal scroll tracks — never transform their section wrapper.
            if (section.classList.contains('home-pricing')
                || section.classList.contains('home-gallery')) {
                return;
            }

            gsap.set(section, { opacity: 0, y: 48 });
            gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 88%',
                    once: true
                }
            });
        });
    }

    function initPricingReveal() {
        var section = document.querySelector('.home-pricing');
        if (!section) {
            return;
        }

        var header = section.querySelector('.home-pricing__header');
        var cards = section.querySelectorAll('.home-pricing__card');
        if (!cards.length) {
            return;
        }

        if (reducedMotion || !hasScrollTrigger) {
            showPricingGalleryNow();
            return;
        }

        var triggerConfig = {
            trigger: section,
            start: 'top 85%',
            once: true
        };

        var tl = gsap.timeline({
            scrollTrigger: triggerConfig,
            onComplete: function () {
                gsap.set(cards, { opacity: 1 });
            }
        });

        if (header) {
            tl.from(header, {
                opacity: 0,
                y: 24,
                ease: 'power2.out',
                duration: 0.7
            }, 0);
        }

        // CSS already sets opacity:0 — .from() would animate 0→0; use explicit to-value.
        tl.fromTo(cards,
            { opacity: 0 },
            {
                opacity: 1,
                ease: 'power2.out',
                duration: 0.75,
                stagger: 0.1
            },
            header ? 0.08 : 0
        );
    }

    function initGalleryStrip() {
        var section = document.querySelector('.home-gallery');
        if (!section) {
            return;
        }

        var header = section.querySelector('.home-gallery__header');
        var items = section.querySelectorAll('.home-gallery__item');
        if (!items.length) {
            return;
        }

        if (reducedMotion || !hasScrollTrigger) {
            showPricingGalleryNow();
            return;
        }

        var triggerConfig = {
            trigger: section,
            start: 'top 85%',
            once: true
        };

        var tl = gsap.timeline({
            scrollTrigger: triggerConfig,
            onComplete: function () {
                gsap.set(items, { opacity: 1 });
            }
        });

        if (header) {
            tl.from(header, {
                opacity: 0,
                y: 24,
                ease: 'power2.out',
                duration: 0.7
            }, 0);
        }

        tl.fromTo(items,
            { opacity: 0 },
            {
                opacity: 1,
                ease: 'power2.out',
                duration: 0.7,
                stagger: 0.08
            },
            header ? 0.08 : 0
        );
    }

    function init() {
        initHeroTimeline();
        initHeroScrub();
        initScrollHint();
        initSectionReveals();
        initPricingReveal();
        initGalleryStrip();
        revealPricingGalleryNow();
        refreshAfterAssets();

        window.addEventListener('load', function () {
            revealPricingGalleryNow();
        }, { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
