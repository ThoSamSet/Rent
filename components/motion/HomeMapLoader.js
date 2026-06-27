'use client';

import { useEffect } from 'react';
import { loadScript } from '@/lib/load-script';

/** Load map scripts only when #mapPreview enters viewport. */
export default function HomeMapLoader() {
  useEffect(() => {
    const target = document.getElementById('mapPreview');
    if (!target) {
      return undefined;
    }

    let cancelled = false;
    let loaded = false;

    const loadMap = () => {
      if (loaded || cancelled) {
        return;
      }
      loaded = true;
      loadScript('/locations-map-sites.js')
        .then(() => {
          if (!cancelled) {
            return loadScript('/home-map-preview.js');
          }
        })
        .catch(() => {});
    };

    if (!('IntersectionObserver' in window)) {
      loadMap();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadMap();
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(target);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return null;
}
