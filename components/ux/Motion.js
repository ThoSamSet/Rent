'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Hero pieces hidden by styles/mag/motion.css until the intro plays. */
const COVER_INTRO = '.cover__title > span, .cover__type > .kicker, .cover__deck, .cover__type > .actions, .cover__folio, .cover__lines';

/** Blocks that fade up as they scroll into view. */
const REVEAL = [
  '.section-head',
  '.spread__page > *',
  '.contents__sheet > *',
  '.letter__greeting',
  '.letter__signature',
  '.ledger > li',
  '.story',
  '.hour',
  '.cta-band .wrap > *',
].join(', ');

/** Photos that open up and drift as the page moves past them. */
const PHOTOS = '.spread__media, .contents__media, .mosaic__photo, .story__photo';

function coverIntro(cover) {
  const lines = cover.querySelectorAll('.cover__title > span');
  const rest = cover.querySelectorAll('.cover__type > .kicker, .cover__deck, .cover__type > .actions');
  const chrome = cover.querySelectorAll('.cover__folio, .cover__lines');
  const media = cover.querySelector('.cover__media > img');

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (media) {
    intro.fromTo(media, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, 0);
  }
  intro
    .fromTo(lines, { yPercent: 60, opacity: 0, filter: 'blur(8px)' }, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.14 }, 0.15)
    .fromTo(rest, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.5)
    .fromTo(chrome, { opacity: 0 }, { opacity: 1, duration: 1 }, 0.7);

  // As the cover scrolls away, the photo pushes in and the type lifts off.
  const scroll = { trigger: cover, start: 'top top', end: 'bottom top', scrub: true };
  if (media) {
    gsap.to(media, { yPercent: 14, ease: 'none', scrollTrigger: scroll });
  }
  gsap.to(cover.querySelector('.cover__type'), { y: -80, opacity: 0.15, ease: 'none', scrollTrigger: scroll });
}

function reveals() {
  const targets = gsap.utils.toArray(REVEAL).filter((el) => !el.closest('.cover'));
  if (!targets.length) {
    return;
  }
  gsap.set(targets, { opacity: 0, y: 32 });
  ScrollTrigger.batch(targets, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });
}

function photos() {
  gsap.utils.toArray(PHOTOS).forEach((figure) => {
    gsap.fromTo(
      figure,
      { clipPath: 'inset(10% 6% 10% 6%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: figure, start: 'top 95%', end: 'top 45%', scrub: true },
      },
    );

    const img = figure.querySelector(':scope > img');
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.14 },
        {
          yPercent: 6,
          scale: 1.14,
          ease: 'none',
          scrollTrigger: { trigger: figure, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }
  });
}

function letter() {
  const bodies = gsap.utils.toArray('.letter__body');
  if (!bodies.length) {
    return;
  }
  const split = SplitText.create(bodies, { type: 'words' });
  gsap.fromTo(
    split.words,
    { opacity: 0.18 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: { trigger: bodies[0].parentElement, start: 'top 75%', end: 'bottom 60%', scrub: true },
    },
  );
}

function hours() {
  gsap.utils.toArray('.hours').forEach((section) => {
    const sky = section.querySelector('.hours__sky');
    if (sky) {
      gsap.fromTo(
        sky,
        { yPercent: -6, scale: 1.14 },
        {
          yPercent: 6,
          scale: 1.14,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }
  });
}

function ornaments() {
  gsap.utils.toArray('.ornament path').forEach((path) => {
    const length = path.getTotalLength?.() || 420;
    gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: path.closest('svg'), start: 'top 95%', end: 'top 50%', scrub: true },
      },
    );
  });
}

function ctaGlow() {
  gsap.utils.toArray('.cta-band__glow').forEach((glow) => {
    gsap.set(glow, { xPercent: -50, x: 0 });
    gsap.fromTo(
      glow,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: glow.parentElement, start: 'top 90%', end: 'top 30%', scrub: true },
      },
    );
  });
}

/**
 * Apple-style motion over the existing magazine markup: a cover intro, scroll reveals,
 * parallax photos and a letter that lights up word by word. Readers who ask for reduced
 * motion get the static page.
 */
export default function Motion() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cover = document.querySelector('.site-main .cover');
      if (cover) {
        gsap.set(cover.querySelectorAll(COVER_INTRO), { opacity: 0 });
      }
      root.classList.add('gsap-on');

      if (cover) {
        coverIntro(cover);
      }
      reveals();
      photos();
      letter();
      hours();
      ornaments();
      ctaGlow();
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
