import Link from 'next/link';
import PricingPlanDetails from '@/components/pricing/PricingPlanDetails';
import PricingTables from '@/components/pricing/PricingTables';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { HERO_SLIDES } from '@/lib/hero/slides';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function PricingPageContent() {
  return (
    <main className="home-editorial">
      <section className="home-hero" aria-label="Chi phí camping Camp Nhà Thỏ">
        <HeroSlideshow slides={HERO_SLIDES.pricing} />
        <div className="home-hero__overlay">
          <p className="home-hero__label">Chi phí</p>
          <h1 className="home-hero__title">Bảng giá &amp; plan</h1>
          <p className="home-hero__subtitle">
            Hiện có 3 plan: Plan hạt dẻ 🌰, Plan hạt bí 🎃 và Plan hạt nho 🍇.
          </p>
          <div className="about-hero__actions">
            <Link href="/dat-lich" className="btn-outline">
              Đặt lịch
            </Link>
          </div>
        </div>
      </section>

      <PricingPlanDetails />

      <PricingTables />

      <section className="home-bottom about-explore" data-reveal aria-label="Tìm hiểu thêm">
        <Link href="/schedule" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage
              src="/images/subBanner-lich-trinh.webp"
              alt="Lịch trình camping — kiểm tra lịch trống sắp tới"
              width={IMAGE_DIMS.faqTile.width}
              height={IMAGE_DIMS.faqTile.height}
            />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Lịch trình</p>
            <h2 className="home-section__title">Kiểm tra lịch trống sắp tới</h2>
          </div>
        </Link>
        <Link href="/options" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage
              src="/images/option-hero.webp"
              alt="Option thêm — đồ ăn, xem phim, di chuyển"
              width={IMAGE_DIMS.faqTile.width}
              height={IMAGE_DIMS.faqTile.height}
            />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Option</p>
            <h2 className="home-section__title">Option thêm</h2>
          </div>
        </Link>
        <Link href="/faq" className="home-faq about-explore__full">
          <div className="home-faq__media">
            <ResponsiveImage
              src="/images/subBanner-faq.webp"
              alt="Câu hỏi thường gặp"
              width={IMAGE_DIMS.faqTile.width}
              height={IMAGE_DIMS.faqTile.height}
            />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">FAQ</p>
            <h2 className="home-section__title">Câu hỏi thường gặp</h2>
          </div>
        </Link>
      </section>

      <section className="about-cta home-section" data-reveal>
        <h2 className="home-section__title">Sẵn sàng cho chuyến đi của bạn?</h2>
        <p className="about-cta__tagline">Share đồ – Đi riêng – Trải nghiệm</p>
        <div className="about-cta__actions">
          <Link href="/dat-lich" className="btn-hero hue-cta hue-cta--dusk">
            Đặt lịch
          </Link>
        </div>
      </section>
    </main>
  );
}
