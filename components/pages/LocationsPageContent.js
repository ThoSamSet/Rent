import HeroSlideshow from '@/components/home/HeroSlideshow';
import { HERO_SLIDES } from '@/lib/hero/slides';
import { LEGACY_PAGES } from '@/lib/legacy-content';

export default function LocationsPageContent() {
  const { content } = LEGACY_PAGES.locations;

  return (
    <main className="home-editorial">
      <section className="home-hero" aria-label="Vị trí camping Camp Nhà Thỏ">
        <HeroSlideshow slides={HERO_SLIDES.locations} />
        <div className="home-hero__overlay">
          <p className="home-hero__label">Vị trí</p>
          <h1 className="home-hero__title">Vị trí Camping</h1>
          <p className="home-hero__subtitle">
            <span className="no-break">Camp Nhà Thỏ</span> hỗ trợ đưa đón đến các bãi camping đẹp quanh khu
            vực Kanto, Nhật Bản
          </p>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
