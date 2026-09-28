'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const MOTION_OK = '(prefers-reduced-motion: no-preference)';
/** Wide enough for the hours to sit in one row, so the section can hold still while they play. */
const PIN_HOURS = '(min-width: 1024px)';
/** Buttons only follow a real mouse. */
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

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

function reveals(pinHours) {
  const selector = pinHours ? REVEAL : `${REVEAL}, .hour`;
  const targets = gsap.utils.toArray(selector).filter((el) => !el.closest('.cover'));
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

function hours(pin) {
  gsap.utils.toArray('.hours').forEach((section) => {
    const sky = section.querySelector('.hours__sky');
    const items = section.querySelectorAll('.hour');

    if (!pin) {
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
      return;
    }

    // Hold the night on screen and let the hours play out one by one, like a short film.
    // A section taller than the window pins by its bottom edge so the hours stay in view.
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
        end: () => `+=${items.length * window.innerHeight * 0.35}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    if (sky) {
      timeline.fromTo(sky, { xPercent: -4, scale: 1.12 }, { xPercent: 4, scale: 1.12, duration: items.length }, 0);
    }
    items.forEach((item, index) => {
      timeline.fromTo(
        item,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
        index,
      );
    });
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

/** Buttons lean toward the cursor while it is over them and spring back when it leaves. */
function magneticButtons() {
  let active = null;

  const release = (button) => {
    gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
  };

  const onMove = (event) => {
    const button = event.target instanceof Element ? event.target.closest('.btn') : null;
    if (active && active !== button) {
      release(active);
    }
    active = button;
    if (!button) {
      return;
    }
    const box = button.getBoundingClientRect();
    gsap.to(button, {
      x: (event.clientX - (box.left + box.width / 2)) * 0.3,
      y: (event.clientY - (box.top + box.height / 2)) * 0.4,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const onLeave = () => {
    if (active) {
      release(active);
      active = null;
    }
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  return () => {
    document.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    if (active) {
      gsap.set(active, { clearProps: 'transform' });
    }
  };
}

/** The internal link a click should fade out for, if any. */
function pageLink(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) {
    return null;
  }
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) {
    return null;
  }
  return url;
}

/**
 * Apple-style motion over the existing magazine markup: a cover intro, scroll reveals,
 * parallax photos, a letter that lights up word by word, a pinned night at camp, magnetic
 * buttons and a fade between pages. Readers who ask for reduced motion get the static page.
 */
export default function Motion() {
  const pathname = usePathname();
  const router = useRouter();
  const firstPage = useRef(true);

  // Page change: fade the old page out before the router moves on.
  useEffect(() => {
    const onClick = (event) => {
      if (!window.matchMedia(MOTION_OK).matches) {
        return;
      }
      const url = pageLink(event);
      const main = document.querySelector('.site-main');
      if (!url || !main) {
        return;
      }
      event.preventDefault();
      gsap.to(main, {
        opacity: 0,
        duration: 0.25,
        ease: 'power1.in',
        overwrite: true,
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
    };
    // Capture runs before next/link, which then leaves the prevented click alone.
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [router]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, magneticButtons);
    return () => mm.revert();
  }, []);

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector('.site-main');
    const mm = gsap.matchMedia();

    // ...and fade the new one in. The first page has the cover intro instead.
    if (firstPage.current) {
      firstPage.current = false;
    } else if (main) {
      if (window.matchMedia(MOTION_OK).matches) {
        gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out', overwrite: true, clearProps: 'opacity' });
      } else {
        gsap.set(main, { clearProps: 'opacity' });
      }
    }

    mm.add({ motion: MOTION_OK, pinHours: PIN_HOURS }, (context) => {
      const { motion, pinHours } = context.conditions;
      if (!motion) {
        return;
      }
      const cover = document.querySelector('.site-main .cover');
      if (cover) {
        gsap.set(cover.querySelectorAll(COVER_INTRO), { opacity: 0 });
      }
      root.classList.add('gsap-on');

      if (cover) {
        coverIntro(cover);
      }
      reveals(pinHours);
      photos();
      letter();
      hours(pinHours);
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
