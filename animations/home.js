/**
 * Camp Nhà Thỏ — index.html GSAP animations (editorial layout).
 * Requires: CampAnimCore, vendor/gsap.min.js, vendor/ScrollTrigger.min.js
 */
(function () {
    'use strict';

    if (document.body.getAttribute('data-page') !== 'home') {
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
        var pending = 0;
        var done = function () {
            pending -= 1;
            if (pending <= 0) {
                CampAnimCore.refresh();
            }
        };

        if (heroImg && !heroImg.complete) {
            pending += 1;
            heroImg.addEventListener('load', done, { once: true });
            heroImg.addEventListener('error', done, { once: true });
        }

        document.querySelectorAll('.home-gallery__item img, .home-equipment__media img, .home-blog__featured-media img, .home-pricing__card-media img').forEach(function (img) {
            if (!img.complete) {
                pending += 1;
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', done, { once: true });
            }
        });

        if (pending === 0) {
            CampAnimCore.refresh();
        }

        window.addEventListener('load', function () {
            setTimeout(function () {
                CampAnimCore.refresh();
                refreshMapPreview();
            }, 120);
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
            tl.from(media, { opacity: 0, scale: 1.04, duration: 1.1 }, 0.1);
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

    function initSectionReveals() {
        if (reducedMotion || !hasScrollTrigger) {
            document.querySelectorAll('.home-section[data-reveal]').forEach(function (section) {
                section.style.opacity = '1';
            });
            refreshMapPreview();
            return;
        }

        gsap.utils.toArray('.home-section[data-reveal]').forEach(function (section) {
            var isBottom = section.classList.contains('home-bottom');
            var fromVars = { opacity: 0, y: 48 };
            var toVars = {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 88%',
                    end: isBottom ? 'bottom bottom' : 'top 62%',
                    scrub: 1,
                    onRefresh: refreshMapPreview
                }
            };

            // Bottom-of-page section: skip bottom clip-path (unreachable scroll end clips FAQ tile on mobile)
            if (!isBottom) {
                fromVars.clipPath = 'inset(0 0 6% 0)';
                toVars.clipPath = 'inset(0 0 0% 0)';
            }

            gsap.fromTo(section, fromVars, toVars);
        });
    }

    function initPricingReveal() {
        if (reducedMotion || !hasScrollTrigger) {
            return;
        }

        var cards = document.querySelectorAll('.home-pricing__card');
        if (!cards.length) {
            return;
        }

        gsap.from(cards, {
            opacity: 0,
            x: 32,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.home-pricing',
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1
            }
        });
    }

    function initGalleryStrip() {
        if (reducedMotion || !hasScrollTrigger) {
            return;
        }

        var items = document.querySelectorAll('.home-gallery__item');
        if (!items.length) {
            return;
        }

        gsap.from(items, {
            opacity: 0,
            x: 32,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: {
                trigger: '.home-gallery',
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1
            }
        });
    }

    function init() {
        initHeroTimeline();
        initHeroScrub();
        initScrollHint();
        initSectionReveals();
        initPricingReveal();
        initGalleryStrip();
        refreshAfterAssets();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
