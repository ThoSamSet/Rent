'use client';

import { useEffect } from 'react';
import { loadScript } from '@/lib/load-script';
import { cleanupGsapAnimations } from '@/lib/gsap-cleanup';

/**
 * Load GSAP from npm (smaller than vendor bundle) then legacy animation modules.
 * Cleans up ScrollTrigger instances on unmount / route change.
 */
export default function GsapScripts({ homeVersion = '20260625m' }) {
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const gsapModule = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');

        if (cancelled) {
          return;
        }

        const gsap = gsapModule.default;
        gsap.registerPlugin(ScrollTrigger);
        window.gsap = gsap;
        window.ScrollTrigger = ScrollTrigger;

        await loadScript('/gsap-utils.js');
        await loadScript('/animations/core.js?v=20260626a');

        if (!cancelled) {
          await loadScript(`/animations/home.js?v=${homeVersion}`);
        }
      } catch {
        /* Animations are progressive enhancement */
      }
    }

    init();

    return () => {
      cancelled = true;
      cleanupGsapAnimations();
    };
  }, [homeVersion]);

  return null;
}
