'use client';

import { useEffect } from 'react';
import ScrollManager from '@/components/ux/ScrollManager';

/** Global client UX: scroll restoration + first-paint readiness. */
export default function ClientProviders({ children }) {
  useEffect(() => {
    document.body.classList.add('is-ui-ready');

    const onHashClick = (event) => {
      const anchor = event.target.closest('a[href*="#"]');
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname) {
        return;
      }

      const id = url.hash.slice(1);
      if (!id) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(id));
      if (!target) {
        return;
      }

      event.preventDefault();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      history.pushState(null, '', `#${id}`);
    };

    document.addEventListener('click', onHashClick);
    return () => document.removeEventListener('click', onHashClick);
  }, []);

  return (
    <>
      <ScrollManager />
      {children}
    </>
  );
}
