'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll to top on forward navigation; preserve position on back/forward.
 * Smooth-scroll to hash targets when present.
 */
export default function ScrollManager() {
  const pathname = usePathname();
  const popNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      popNavigation.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (popNavigation.current) {
      popNavigation.current = false;
      return;
    }

    const hash = window.location.hash;
    if (hash.length > 1) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        requestAnimationFrame(() => {
          const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'start',
          });
        });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
