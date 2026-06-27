import PricingLineup from '@/components/PricingLineup';
import HomeHero from '@/components/home/HomeHero';
import HomeIntroRow from '@/components/home/HomeIntroRow';
import HomeBlogSection from '@/components/home/HomeBlogSection';
import HomeGallerySection from '@/components/home/HomeGallerySection';
import HomeBottomRow from '@/components/home/HomeBottomRow';

export default function HomePageContent() {
  return (
    <>
      <div className="home-hero__scroll-hint" aria-label="Cuộn xuống để khám phá">
        <span className="home-hero__scroll-text" aria-hidden="true">
          Cuộn xuống
        </span>
        <span className="home-hero__scroll-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <main className="home-editorial">
        <HomeHero />
        <HomeIntroRow />
        <PricingLineup />
        <HomeBlogSection />
        <HomeGallerySection />
        <HomeBottomRow />
      </main>
    </>
  );
}
