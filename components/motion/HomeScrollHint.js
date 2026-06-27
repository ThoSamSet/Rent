'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

/**
 * Hides the fixed scroll hint when footer enters viewport.
 */
export default function HomeScrollHint() {
  useEffect(() => {
    const hint = document.querySelector('.home-hero__scroll-hint');
    const footer = document.querySelector('.footer');
    if (!hint) {
      return undefined;
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

    if (prefersReducedMotion()) {
      setVisible(!isFooterInView());
    }

    const onScroll = () => setVisible(!isFooterInView());
    window.addEventListener('scroll', onScroll, { passive: true });
    setVisible(!isFooterInView());

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
