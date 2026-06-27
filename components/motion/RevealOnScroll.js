'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

/**
 * Lightweight scroll reveal — IntersectionObserver + motion.css.
 * @param {{ rootSelector?: string }} props
 */
export default function RevealOnScroll({ rootSelector = '.page-home' }) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    const selector = `${rootSelector} main.home-editorial [data-reveal]`;
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add('motion-reveal');
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.06,
      },
    );

    nodes.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootSelector]);

  return null;
}
