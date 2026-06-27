'use client';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteScripts from '@/components/SiteScripts';
import RevealOnScroll from '@/components/motion/RevealOnScroll';
import HeroSlideshowEffects from '@/components/motion/HeroSlideshowEffects';
import HomeScrollHint from '@/components/motion/HomeScrollHint';
import HomeMapLoader from '@/components/motion/HomeMapLoader';

export default function HomeClientEffects() {
  return (
    <>
      <RevealOnScroll rootSelector=".page-home" />
      <HeroSlideshowEffects rootSelector=".page-home .home-hero__slideshow" />
      <HomeScrollHint />
      <HomeMapLoader />
      <GoogleAnalytics />
      <SiteScripts />
    </>
  );
}
