'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
      return undefined;
    }

    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (location.protocol !== 'https:' && !isLocalhost) {
      return undefined;
    }

    navigator.serviceWorker.register('/sw.js').catch(() => {});
    return undefined;
  }, []);

  return null;
}
