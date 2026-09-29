'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

/**
 * Film photo grid. Click a photo to enlarge it (uncropped) while the others shrink
 * into a thumbnail strip; click it again or press Esc to go back.
 * @param {{ photos: { src: string; alt: string; caption: string }[] }} props
 */
export default function FilmGrid({ photos }) {
  const [active, setActive] = useState(null);
  const gridRef = useRef(null);

  const change = useCallback((next) => {
    const apply = () => setActive(next);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof document.startViewTransition === 'function' && !reduce) {
      document.startViewTransition(() => flushSync(apply));
    } else {
      apply();
    }
  }, []);

  useEffect(() => {
    if (active === null) {
      return undefined;
    }
    const onKey = (event) => {
      if (event.key === 'Escape') {
        change(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, change]);

  // Bring the enlarged photo just below the masthead once the layout has settled.
  useEffect(() => {
    if (active === null) {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      const item = gridRef.current?.children[active];
      if (item) {
        const top = item.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 450);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <ul ref={gridRef} className={`film-grid${active === null ? '' : ' is-focus'}`}>
      {photos.map((photo, index) => {
        const isActive = active === index;
        return (
          <li
            key={photo.src}
            className={`film-grid__item${isActive ? ' is-active' : ''}`}
            style={{ viewTransitionName: `film-${index}` }}
          >
            <figure
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={isActive ? `${photo.caption} — bấm để thu nhỏ` : `${photo.caption} — bấm để phóng to`}
              onClick={() => change(isActive ? null : index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  change(isActive ? null : index);
                }
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                width="1600"
                height="900"
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
