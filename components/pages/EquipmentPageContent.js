import Link from 'next/link';
import EquipmentCategories from '@/components/equipment/EquipmentCategories';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { HERO_SLIDES } from '@/lib/hero/slides';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function EquipmentPageContent() {
  return (
    <main className="home-editorial">
      <section className="home-hero" aria-label="Dụng cụ camping Camp Nhà Thỏ">
        <HeroSlideshow slides={HERO_SLIDES.equipment} />
        <div className="home-hero__overlay">
          <p className="home-hero__label">Dụng cụ</p>
          <h1 className="home-hero__title">Dụng cụ camping đã sẵn sàng</h1>
          <p className="home-hero__subtitle">
            Bạn chỉ cần mang theo đồ ăn theo nhu cầu, phần còn lại để Camp Nhà Thỏ chuẩn bị.
          </p>
          <div className="about-hero__actions">
            <Link href="/schedule" className="btn-outline">
              Xem lịch trình
            </Link>
          </div>
        </div>
      </section>

      <EquipmentCategories />

      <section className="home-bottom about-explore" data-reveal aria-label="Tìm hiểu thêm">
        <Link href="/schedule" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage src="/images/subBanner-lich-trinh.webp" alt="Lịch trình camping — kiểm tra lịch trống sắp tới" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Lịch trình</p>
            <h2 className="home-section__title">Kiểm tra lịch trống sắp tới</h2>
          </div>
        </Link>
        <Link href="/pricing" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage src="/images/chi-phi-1.webp" alt="Chi phí và plan camping" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Chi phí</p>
            <h2 className="home-section__title">Bảng giá &amp; plan</h2>
          </div>
        </Link>
        <Link href="/faq" className="home-faq about-explore__full">
          <div className="home-faq__media">
            <ResponsiveImage src="/images/subBanner-faq.webp" alt="Câu hỏi thường gặp" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
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
