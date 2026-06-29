'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  ensureLeafletCss,
  flushLayout,
  loadScript,
  waitForMapContainer,
} from '@/lib/load-script';

/** Init locations map + filters after legacy HTML hydrates. */
export default function LocationsMapInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/locations') {
      return undefined;
    }

    let cancelled = false;

    async function boot() {
      ensureLeafletCss();

      if (typeof window.L === 'undefined') {
        await loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
      }
      if (cancelled) return;

      await loadScript('/locations-map-sites.js');
      if (cancelled) return;

      await loadScript('/locations-map.js');
      if (cancelled) return;

      await waitForMapContainer().catch(() => {});
      if (cancelled) return;

      await flushLayout();
      if (cancelled) return;

      if (typeof window.initLocationsPage === 'function') {
        window.initLocationsPage();
      }
    }

    boot().catch(() => {});

    return () => {
      cancelled = true;
      if (typeof window.destroyLocationsPage === 'function') {
        window.destroyLocationsPage();
      }
    };
  }, [pathname]);

  return null;
}
