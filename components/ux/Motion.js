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

/** Where a block starts to play as it scrolls in. */
const IN_VIEW = 'top 85%';

/** Parallax travel (yPercent) for the gallery, column by column, so the photos drift at different depths. */
const MOSAIC_DEPTH = [-10, 6, -4, 8, -6, 4];

/** Elements under `scope` that match `selector`, leaving the cover to its own intro. */
function pick(selector, scope = document) {
  return gsap.utils.toArray(scope.querySelectorAll(selector)).filter((el) => !el.closest('.cover'));
}

/**
 * Plays once as its trigger scrolls in, without `once: true`: that option kills the trigger the
 * moment it fires, and a trigger that fires while ScrollTrigger is still measuring the others
 * (a page opened part way down) shrinks the list under it and crashes the refresh.
 */
const PLAY_ONCE = { start: IN_VIEW, toggleActions: 'play none none none' };

/** A paused timeline that plays once when `trigger` scrolls into view. */
function onEnter(trigger, vars = {}) {
  return gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger, ...PLAY_ONCE }, ...vars });
}

/**
 * Count the first number in a text-only element up from zero, keeping the words around it
 * ("từ 3.7 man", "02"). Returns a function that puts the original text back.
 */
function countUp(el, timeline, position) {
  if (el.childElementCount) {
    return null;
  }
  const original = (el.dataset.countText ??= el.textContent);
  const match = original.match(/\d+(?:\.\d+)?/);
  if (!match) {
    return null;
  }
  const target = parseFloat(match[0]);
  const decimals = match[0].split('.')[1]?.length ?? 0;
  const width = match[0].length;
  const render = (value) => {
    const number = decimals ? value.toFixed(decimals) : String(Math.round(value)).padStart(width, '0');
    el.textContent = original.slice(0, match.index) + number + original.slice(match.index + match[0].length);
  };
  const counter = { value: 0 };
  timeline.to(counter, { value: target, duration: 1.2, ease: 'power2.out', onStart: () => render(0), onUpdate: () => render(counter.value), onComplete: () => { el.textContent = original; } }, position);
  render(0);
  return () => {
    el.textContent = original;
  };
}

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

/** Headings flip up line by line, like a title card. */
function headings() {
  pick('.section-head > :is(h2, h3), .contents__title, .spread__title, .hours__title, .region__title').forEach((heading) => {
    SplitText.create(heading, {
      type: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.lines,
          { opacity: 0, yPercent: 80, rotationX: -50, transformOrigin: '50% 0%', transformPerspective: 800 },
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.12,
            scrollTrigger: { trigger: heading, ...PLAY_ONCE },
          },
        ),
    });
  });
}

/** Kickers arrive with their letters drawn in from wide tracking. */
function kickers() {
  pick('.kicker').forEach((kicker) => {
    onEnter(kicker).fromTo(
      kicker,
      { opacity: 0, letterSpacing: '0.45em' },
      { opacity: 1, letterSpacing: getComputedStyle(kicker).letterSpacing, duration: 1.2, ease: 'power2.out', clearProps: 'letterSpacing' },
    );
  });
}

/** Running text comes into focus. */
function prose() {
  pick('.section-head > .lead, .hours__head > .lead, .essay, .region__blurb, .spread__more, .letter__greeting, .cta-band__text').forEach((text) => {
    onEnter(text).fromTo(text, { opacity: 0, y: 20, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, clearProps: 'filter' });
  });
  pick('.letter__signature').forEach((signature) => {
    onEnter(signature).fromTo(signature, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power2.inOut' });
  });
}

/** Photos drift slower than the page. */
function parallax(img, travel = 6) {
  gsap.fromTo(
    img,
    { yPercent: -travel },
    { yPercent: travel, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
}

/** A photo opens like a curtain from one side while the picture settles inside it. */
function curtain(figure, from, timeline = onEnter(figure), position = 0) {
  const img = figure.querySelector(':scope > img');
  const closed = { left: 'inset(0% 0% 0% 100%)', right: 'inset(0% 100% 0% 0%)', bottom: 'inset(100% 0% 0% 0%)' }[from];
  timeline.fromTo(figure, { clipPath: closed }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' }, position);
  if (img) {
    gsap.set(img, { scale: 1.14 });
    timeline.from(img, { scale: 1.4, duration: 1.8, ease: 'power3.out' }, position);
    parallax(img);
  }
  return timeline;
}

/** Ledgers: prices wipe in and count up, notices slide from the left, indexes from the right. */
function ledgers(restore) {
  pick('.ledger').forEach((ledger) => {
    const rows = ledger.querySelectorAll(':scope > li');
    const timeline = onEnter(ledger);
    if (ledger.classList.contains('ledger--wide')) {
      timeline.fromTo(rows, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut', stagger: 0.15 });
      ledger.querySelectorAll('.ledger__value').forEach((value, index) => restore.push(countUp(value, timeline, 0.35 + index * 0.15)));
    } else if (ledger.classList.contains('ledger--plain')) {
      timeline
        .fromTo(rows, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9, stagger: 0.1 })
        .fromTo(ledger.querySelectorAll('.ledger__value, .ledger__detail'), { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.1 }, 0.4);
    } else {
      timeline.fromTo(rows, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.06 });
    }
  });
}

function contentsAndSpreads() {
  pick('.contents__media').forEach((figure) => curtain(figure, 'right'));
  pick('.spread__media').forEach((figure) => curtain(figure, 'bottom'));
}

/** The gallery pops in across the grid, then each photo floats at its own depth. */
function gallery() {
  pick('.mosaic').forEach((mosaic) => {
    const items = mosaic.querySelectorAll('.mosaic__item');
    onEnter(mosaic, { scrollTrigger: { trigger: mosaic, ...PLAY_ONCE, start: 'top 80%' } }).fromTo(
      items,
      { opacity: 0, scale: 0.82, clipPath: 'inset(8% 8% 8% 8% round 24px)' },
      { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.2, ease: 'expo.out', stagger: { each: 0.1, grid: 'auto', from: 'start' }, clearProps: 'clipPath' },
    );
    items.forEach((item, index) => {
      const img = item.querySelector('.mosaic__photo > img');
      if (img) {
        gsap.set(img, { scale: 1.2 });
        parallax(img, MOSAIC_DEPTH[index % MOSAIC_DEPTH.length]);
      }
    });
  });
}

/** Film page: the wordmark draws in, then the stills pop in like the gallery and float, captions rising after. */
function film() {
  pick('.film__title').forEach((title) => {
    onEnter(title).fromTo(title, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power2.inOut', clearProps: 'clipPath' });
  });
  pick('.film-grid').forEach((grid) => {
    const items = grid.querySelectorAll('.film-grid__item');
    items.forEach((item, index) => {
      const timeline = onEnter(item, { scrollTrigger: { trigger: item, ...PLAY_ONCE, start: 'top 90%' } });
      // Rows of three start together; stagger them left to right like the gallery grid.
      const delay = (index < 2 ? index : (index - 2) % 3) * 0.1;
      timeline.fromTo(
        item,
        { opacity: 0, scale: 0.82, clipPath: 'inset(8% 8% 8% 8% round 24px)' },
        { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.2, ease: 'expo.out', clearProps: 'clipPath' },
        delay,
      );
      const caption = item.querySelector('figcaption');
      if (caption) {
        timeline.fromTo(caption, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, clearProps: 'transform' }, delay + 0.5);
      }
      const img = item.querySelector('img');
      if (img) {
        gsap.set(img, { scale: 1.2 });
        parallax(img, MOSAIC_DEPTH[index % MOSAIC_DEPTH.length]);
      }
    });
  });
}

/** Blog: the lead story zooms out of its photo, the others slide in with their numbers counting. */
function stories(restore) {
  pick('.stories').forEach((list) => {
    const lead = list.querySelector('.story--lead');
    if (lead) {
      const img = lead.querySelector('.story__photo > img');
      if (img) {
        onEnter(lead).fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.6, ease: 'power3.out' });
      }
      // The words sit low on the card, so they wait for their own entrance.
      const text = lead.querySelector('.story__text');
      if (text) {
        onEnter(text).fromTo(text.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 });
      }
    }
    const rows = list.querySelectorAll('.stories__rest > li');
    if (rows.length) {
      const timeline = onEnter(rows[0]);
      timeline.fromTo(rows, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.9, stagger: 0.12 });
      list.querySelectorAll('.story__no').forEach((no, index) => restore.push(countUp(no, timeline, index * 0.12)));
    }
  });
}

/** Steps: each number pops, then its words follow. */
function steps() {
  pick('.step').forEach((step) => {
    onEnter(step)
      .fromTo(step.querySelector('.step__no'), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2.2)' })
      .fromTo(step.querySelectorAll('.step__title, .step__text, .step__link'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.2);
  });
}

/** "Read next" cards tip forward into place. */
function continueCards() {
  pick('.continue__list').forEach((list) => {
    onEnter(list).fromTo(
      list.querySelectorAll('.continue__item'),
      { opacity: 0, y: 60, rotationX: 18, transformOrigin: '50% 100%', transformPerspective: 900 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 },
    );
  });
}

/** Campsites open like curtains, alternating sides region by region. */
function siteCards() {
  pick('.region').forEach((region, regionIndex) => {
    region.querySelectorAll('.site-card__photo').forEach((figure, index) => {
      curtain(figure, (regionIndex + index) % 2 ? 'left' : 'right');
    });
  });
}

/** The closing line assembles letter by letter out of a blur; the buttons pop in after it. */
function ctaBand() {
  pick('.cta-band').forEach((band) => {
    const title = band.querySelector('.cta-band__title');
    if (title) {
      SplitText.create(title, {
        type: 'words, chars',
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.chars,
            { opacity: 0, scale: 1.6, filter: 'blur(12px)' },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'power3.out',
              stagger: { each: 0.018, from: 'center' },
              scrollTrigger: { trigger: title, ...PLAY_ONCE },
            },
          ),
      });
    }
    const buttons = band.querySelectorAll('.actions .btn');
    if (buttons.length) {
      onEnter(buttons[0]).fromTo(buttons, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(2)', stagger: 0.1, delay: 0.5 });
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
      onEnter(section.querySelector('.hours__list')).fromTo(
        items,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.12 },
      );
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
        refreshPriority: 1,
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
    // Not the buttons in the open index panel; the masthead's booking button leans less, so it stays clear of the menu button beside it.
    const button = event.target instanceof Element ? event.target.closest('.btn:not(.site-index .btn)') : null;
    if (active && active !== button) {
      release(active);
    }
    active = button;
    if (!button) {
      return;
    }
    const box = button.getBoundingClientRect();
    const pull = button.closest('.masthead') ? 0.5 : 1;
    gsap.to(button, {
      x: (event.clientX - (box.left + box.width / 2)) * 0.3 * pull,
      y: (event.clientY - (box.top + box.height / 2)) * 0.4 * pull,
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

/** Set up every effect on the current page, pinned sections first. */
function build(pinHours, restore) {
  const cover = document.querySelector('.site-main .cover');
  if (cover) {
    gsap.set(cover.querySelectorAll(COVER_INTRO), { opacity: 0 });
  }
  document.documentElement.classList.add('gsap-on');

  if (cover) {
    coverIntro(cover);
  }
  // The pinned night adds scroll length, so it goes first: everything below it must
  // measure its start with that length included, or it plays while still off screen.
  hours(pinHours);

  headings();
  kickers();
  prose();
  letter();
  contentsAndSpreads();
  ledgers(restore);
  gallery();
  film();
  stories(restore);
  steps();
  continueCards();
  siteCards();
  ctaBand();
  ornaments();
  ctaGlow();
  ScrollTrigger.sort();
}

/**
 * Apple-style motion over the existing magazine markup. Each kind of block has its own move:
 * headings flip up by line, photos open like curtains, prices count up, the gallery floats at
 * different depths, the closing line assembles letter by letter. Plus a cover intro, a letter
 * that lights up word by word, a pinned night at camp, magnetic buttons and a page fade. Readers who ask for reduced motion get the static page.
 */
export default function Motion() {
  const pathname = usePathname();
  const router = useRouter();
  const firstPage = useRef(true);
  const backForward = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      backForward.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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

    if (firstPage.current) {
      // The first page has the cover intro instead of a fade.
      firstPage.current = false;
    } else {
      // A new page opens at the top (ScrollManager does the same, but only after this runs):
      // measure the triggers there rather than at the old page's scroll position.
      if (!backForward.current && !window.location.hash) {
        window.scrollTo(0, 0);
      }
      backForward.current = false;

      // ...and fade the new page in.
      if (main) {
        if (window.matchMedia(MOTION_OK).matches) {
          gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out', overwrite: true, clearProps: 'opacity' });
        } else {
          gsap.set(main, { clearProps: 'opacity' });
        }
      }
    }

    mm.add({ motion: MOTION_OK, pinHours: PIN_HOURS }, (context) => {
      const { motion, pinHours } = context.conditions;
      if (!motion) {
        return;
      }
      const restore = [];
      try {
        build(pinHours, restore);
      } catch (error) {
        // Motion is decoration: if it fails, show the page as it is rather than an error screen.
        console.error('Motion:', error);
        queueMicrotask(() => {
          mm.revert();
          root.classList.remove('motion', 'gsap-on');
        });
      }
      return () => restore.forEach((undo) => undo?.());
    });

    // Fonts, late images and filters move things around after the first measure; re-measure.
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    let lastHeight = main?.offsetHeight ?? 0;
    const observer = new ResizeObserver(() => {
      const height = main?.offsetHeight ?? 0;
      if (height !== lastHeight) {
        lastHeight = height;
        refresh();
      }
    });
    if (main) {
      observer.observe(main);
    }
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('load', refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
