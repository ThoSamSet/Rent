'use client';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteScripts from '@/components/SiteScripts';
import HeroSlideshowEffects from '@/components/motion/HeroSlideshowEffects';
import RevealOnScroll from '@/components/motion/RevealOnScroll';

export default function EditorialClientEffects() {
  return (
    <>
      <RevealOnScroll rootSelector=".page-editorial" />
      <HeroSlideshowEffects rootSelector=".page-editorial .home-hero__slideshow" />
      <GoogleAnalytics />
      <SiteScripts />
    </>
  );
}
