'use client';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteScripts from '@/components/SiteScripts';

/** Client-only scripts for standard (motion.js) pages. */
export default function StandardClientBundle({ motion = true, scripts = [] }) {
  return (
    <>
      <GoogleAnalytics />
      <SiteScripts motion={motion} scripts={scripts} />
    </>
  );
}
