'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

const SLIDE_HOLD_DURATION = 5;
const FADE_DURATION = 1.2;
const FADE_OVERLAP = 0.2;

/**
 * Crossfade for `.home-hero__slideshow` containers.
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

    async function init() {
      const gsapModule = await import('gsap');
      if (cancelled) {
        return;
      }

      const gsap = gsapModule.default;

      containers.forEach((container) => {
        const slides = container.querySelectorAll('.home-hero__slide');
        if (slides.length <= 1) {
          return;
        }

        const imgs = Array.from(slides).map((slide) => slide.querySelector('.home-hero__slide-img'));
        imgs.forEach((img, index) => {
          if (index > 0 && img instanceof HTMLImageElement && !img.complete) {
            const preload = new Image();
            preload.src = img.currentSrc || img.src;
          }
        });

        const ctx = gsap.context(() => {
          const timeline = gsap.timeline({ repeat: -1 });

          for (let i = 0; i < slides.length; i += 1) {
            const currentSlide = slides[i];
            const nextIndex = (i + 1) % slides.length;
            const nextSlide = slides[nextIndex];

            timeline.add(() => {
              gsap.set(slides, { zIndex: 0, opacity: 0 });
              gsap.set(currentSlide, { zIndex: 2, opacity: 1 });
              gsap.set(nextSlide, { zIndex: 1, opacity: 0 });
              setActiveDot(container, i);
            });

            timeline.to({}, { duration: SLIDE_HOLD_DURATION });

            timeline.to(
              currentSlide,
              { opacity: 0, duration: FADE_DURATION, ease: 'power2.inOut' },
              `-=${FADE_OVERLAP}`,
            );
            timeline.to(nextSlide, { opacity: 1, duration: FADE_DURATION, ease: 'power2.inOut' }, '<');

            timeline.add(() => {
              gsap.set(currentSlide, { opacity: 0, zIndex: 0 });
            });
          }

          timelines.push(timeline);
        }, container);

        contexts.push(ctx);
      });

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
