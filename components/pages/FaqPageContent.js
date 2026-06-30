import Link from 'next/link';
import FaqSection from '@/components/faq/FaqSection';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { FAQ_INTRO } from '@/lib/faq/content';
import { HERO_SLIDES } from '@/lib/hero/slides';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function FaqPageContent() {
  return (
    <main className="home-editorial">
      <section className="home-hero" aria-label="Câu hỏi thường gặp Camp Nhà Thỏ">
        <HeroSlideshow slides={HERO_SLIDES.faq} />
        <div className="home-hero__overlay">
          <p className="home-hero__label">{FAQ_INTRO.label}</p>
          <h1 className="home-hero__title">{FAQ_INTRO.title}</h1>
          <p className="home-hero__subtitle">{FAQ_INTRO.subtitle}</p>
          <div className="about-hero__actions">
            <Link href="/dat-lich" className="btn-outline">
              Đặt lịch
            </Link>
            <Link href="/pricing" className="btn-outline">
              Xem chi phí
            </Link>
          </div>
        </div>
      </section>

      <FaqSection />

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
        <Link href="/pricing" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage
              src="/images/chi-phi-1.webp"
              alt="Chi phí và plan camping"
              width={IMAGE_DIMS.faqTile.width}
              height={IMAGE_DIMS.faqTile.height}
            />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Chi phí</p>
            <h2 className="home-section__title">Bảng giá &amp; plan</h2>
          </div>
        </Link>
        <Link href="/options" className="home-faq about-explore__full">
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
      </section>

      <section className="about-cta home-section" data-reveal>
        <h2 className="home-section__title">Còn thắc mắc chưa có trong FAQ?</h2>
        <p className="about-cta__tagline">Nhắn TikTok hoặc Facebook — không cần cọc, xác nhận qua inbox.</p>
        <div className="about-cta__actions">
          <Link href="/dat-lich" className="btn-hero hue-cta hue-cta--dusk">
            Đặt lịch
          </Link>
        </div>
      </section>
    </main>
  );
}
