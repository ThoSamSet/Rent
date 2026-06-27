'use client';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteScripts from '@/components/SiteScripts';
import BodyPageAttr from '@/components/BodyPageAttr';
import GsapScripts from '@/components/GsapScripts';
import MapScripts from '@/components/MapScripts';

/** Client-only scripts for editorial (GSAP) pages — code-split from server layout. */
export default function EditorialClientBundle({
  page,
  gsapHomeVersion = '20260625m',
  mapScripts = false,
}) {
  return (
    <>
      <BodyPageAttr page={page} />
      <GoogleAnalytics />
      <SiteScripts />
      <GsapScripts homeVersion={gsapHomeVersion} />
      {mapScripts && <MapScripts />}
    </>
  );
}
