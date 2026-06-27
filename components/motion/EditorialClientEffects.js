'use client';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteScripts from '@/components/SiteScripts';
import AboutBentoEffects from '@/components/motion/AboutBentoEffects';
import HeroSlideshowEffects from '@/components/motion/HeroSlideshowEffects';
import RevealOnScroll from '@/components/motion/RevealOnScroll';

export default function EditorialClientEffects() {
  return (
    <>
      <RevealOnScroll rootSelector=".page-editorial" />
      <AboutBentoEffects />
      <HeroSlideshowEffects rootSelector=".page-editorial .home-hero__slideshow" />
      <GoogleAnalytics />
      <SiteScripts />
    </>
  );
}
