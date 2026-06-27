'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

const REVEAL_SELECTORS = [
  'main > section',
  'main > article',
  'footer.footer',
  '.container > header.header',
].join(', ');

/**
 * IntersectionObserver scroll reveal for standard (legacy) pages.
 * Replaces motion.js with proper React lifecycle cleanup.
 */
export default function PageScrollReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    const nodes = document.querySelectorAll(REVEAL_SELECTORS);
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
  }, []);

  return null;
}
