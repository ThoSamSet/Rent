'use client';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteScripts from '@/components/SiteScripts';
import PageScrollReveal from '@/components/motion/PageScrollReveal';

/** Client-only scripts for standard (legacy content) pages. */
export default function StandardClientBundle({ scripts = [] }) {
  return (
    <>
      <PageScrollReveal />
      <GoogleAnalytics />
      <SiteScripts scripts={scripts} />
    </>
  );
}
