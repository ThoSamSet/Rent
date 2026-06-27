'use client';

import Script from 'next/script';

/** Shared legacy scripts: promo bar + burger nav. */
export default function SiteScripts({ scripts = [] }) {
  return (
    <>
      <Script src="/promo-bar.js" strategy="afterInteractive" />
      <Script src="/nav-menu.js" strategy="afterInteractive" />
      {scripts.map((src, index) => (
        <Script
          key={src}
          src={src}
          strategy={index === 0 && scripts.length > 1 ? 'beforeInteractive' : 'afterInteractive'}
        />
      ))}
    </>
  );
}
