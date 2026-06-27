import HeroLogo from '@/components/home/HeroLogo';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import { HERO_SLIDES } from '@/lib/hero/slides';

export default function HomeHero() {
  return (
    <section className="home-hero" aria-label="Camp Nhà Thỏ — trang chủ">
      <HeroSlideshow slides={HERO_SLIDES.home} />
      <div className="home-hero__overlay">
        <div className="home-hero__logo-wrap">
          <HeroLogo priority />
        </div>
        <h1 className="home-hero__title">Share đồ Camping</h1>
        <p className="home-hero__subtitle">Cùng đi — Cùng chill</p>
      </div>
    </section>
  );
}
