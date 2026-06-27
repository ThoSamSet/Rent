'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

const HOLD = 5;
const TRANSITION = 1.2;
const OVERLAP = 0.2;
const PRELOAD_TIMEOUT_MS = 3000;

/** @typedef {'active' | 'behind' | 'hidden'} SlideRole */

/** @param {HTMLImageElement} img */
function waitForImage(img) {
  if (img.complete) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const done = () => resolve();
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}

/** @param {HTMLImageElement[]} imgs */
async function preloadSlideImages(imgs) {
  const pending = imgs.filter((img) => img instanceof HTMLImageElement);

  await Promise.race([
    Promise.all(
      pending.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }

        const preload = new Image();
        preload.srcset = img.srcset || '';
        preload.sizes = img.sizes || '';
        preload.src = img.currentSrc || img.src;
        return waitForImage(preload);
      }),
    ),
    new Promise((resolve) => {
      setTimeout(resolve, PRELOAD_TIMEOUT_MS);
    }),
  ]);
}

/** @type {Record<SlideRole, gsap.TweenVars>} */
const SLIDE_STATES = {
  active: {
    zIndex: 2,
    opacity: 1,
    visibility: 'visible',
  },
  behind: {
    zIndex: 1,
    opacity: 1,
    visibility: 'visible',
  },
  hidden: {
    zIndex: 0,
    opacity: 1,
    visibility: 'hidden',
  },
};

/**
 * Hero slideshow: next slide ready behind; outgoing fades out to reveal it.
 * @param {{ rootSelector?: string }} props
 */
export default function HeroSlideshowEffects({ rootSelector = '.home-hero__slideshow' }) {
  useEffect(() => {
    const containers = document.querySelectorAll(rootSelector);
    if (!containers.length || prefersReducedMotion()) {
      return undefined;
    }

    let cancelled = false;
    /** @type {import('gsap').Context[]} */
    const contexts = [];
    /** @type {import('gsap').Timeline[]} */
    const timelines = [];

    const onVisibility = () => {
      const hidden = document.visibilityState === 'hidden';
      timelines.forEach((tl) => (hidden ? tl.pause() : tl.resume()));
    };

    /** @param {Element} container @param {number} index */
    function setActiveDot(container, index) {
      const hero = container.closest('.home-hero');
      if (!hero) {
        return;
      }
      hero.querySelectorAll('.home-hero__dot').forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });
    }

    /** @param {NodeListOf<Element>} slides @param {number} activeIndex */
    function setAriaHidden(slides, activeIndex) {
      slides.forEach((slide, index) => {
        if (index === activeIndex) {
          slide.removeAttribute('aria-hidden');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }
      });
    }

    /** @param {import('gsap').GSAP} gsap @param {Element} slide @param {SlideRole} role */
    function showSlide(gsap, slide, role) {
      gsap.set(slide, SLIDE_STATES[role]);
    }

    /** @param {import('gsap').GSAP} gsap @param {NodeListOf<Element>} slides @param {Element} currentSlide @param {Element} nextSlide */
    function setSlideStack(gsap, slides, currentSlide, nextSlide) {
      slides.forEach((slide) => {
        if (slide === currentSlide) {
          showSlide(gsap, slide, 'active');
        } else if (slide === nextSlide) {
          showSlide(gsap, slide, 'behind');
        } else {
          showSlide(gsap, slide, 'hidden');
        }
      });
    }

    async function init() {
      const gsapModule = await import('gsap');
      if (cancelled) {
        return;
      }

      const gsap = gsapModule.default;

      for (const container of containers) {
        const slides = container.querySelectorAll('.home-hero__slide');
        if (slides.length <= 1) {
          continue;
        }

        const imgs = Array.from(slides)
          .map((slide) => slide.querySelector('.home-hero__slide-img'))
          .filter((img) => img instanceof HTMLImageElement);

        await preloadSlideImages(imgs);
        if (cancelled) {
          return;
        }

        const ctx = gsap.context(() => {
          slides.forEach((slide, index) => {
            showSlide(gsap, slide, index === 0 ? 'active' : 'hidden');
          });
          setAriaHidden(slides, 0);
          container.setAttribute('data-slideshow-ready', 'true');

          const timeline = gsap.timeline({ repeat: -1 });

          for (let i = 0; i < slides.length; i += 1) {
            const currentSlide = slides[i];
            const nextIndex = (i + 1) % slides.length;
            const nextSlide = slides[nextIndex];

            timeline.add(() => {
              setSlideStack(gsap, slides, currentSlide, nextSlide);
              setActiveDot(container, i);
              setAriaHidden(slides, i);
            });

            timeline.to({}, { duration: HOLD });

            timeline.to(
              currentSlide,
              {
                opacity: 0,
                duration: TRANSITION,
                ease: 'power2.inOut',
              },
              `-=${OVERLAP}`,
            );

            timeline.add(() => {
              gsap.set(currentSlide, {
                visibility: 'hidden',
                zIndex: 0,
                opacity: 1,
              });
              gsap.set(nextSlide, {
                zIndex: 2,
                visibility: 'visible',
                opacity: 1,
              });
              setActiveDot(container, nextIndex);
              setAriaHidden(slides, nextIndex);
            });
          }

          timelines.push(timeline);
        }, container);

        contexts.push(ctx);
      }

      document.addEventListener('visibilitychange', onVisibility);
    }

    init();

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      contexts.forEach((ctx) => ctx.revert());
    };
  }, [rootSelector]);

  return null;
}
