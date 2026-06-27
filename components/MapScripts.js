'use client';

import { useEffect } from 'react';
import { loadScript } from '@/lib/load-script';

export default function MapScripts() {
  useEffect(() => {
    let cancelled = false;

    loadScript('/locations-map-sites.js')
      .then(() => {
        if (!cancelled) {
          return loadScript('/home-map-preview.js');
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
