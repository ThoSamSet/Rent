import Link from 'next/link';
import ScheduleBookingSteps from '@/components/schedule/ScheduleBookingSteps';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar';
import ScheduleLegend from '@/components/schedule/ScheduleLegend';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { HERO_SLIDES } from '@/lib/hero/slides';
import { IMAGE_DIMS } from '@/lib/image-sizes';
import { SCHEDULE_INTRO } from '@/lib/schedule/content';

export default function SchedulePageContent() {
  return (
    <main className="home-editorial">
      <section className="home-hero" aria-label="Lịch trình camping Camp Nhà Thỏ">
        <HeroSlideshow slides={HERO_SLIDES.schedule} />
        <div className="home-hero__overlay">
          <p className="home-hero__label">{SCHEDULE_INTRO.label}</p>
          <h1 className="home-hero__title">{SCHEDULE_INTRO.title}</h1>
          <p className="home-hero__subtitle">
            Xem ngày <strong>Còn chỗ</strong> và các chuyến đã lên lịch — nhắn TikTok hoặc Facebook để đặt với{' '}
            <span className="no-break">Camp Nhà Thỏ</span>.
          </p>
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

      <ScheduleLegend />
      <ScheduleCalendar />
      <ScheduleBookingSteps />

      <section className="home-bottom about-explore" data-reveal aria-label="Tìm hiểu thêm">
        <Link href="/pricing" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage
              src="/images/chi-phi-1.webp"
              alt="Bảng giá camping — chi phí theo plan"
              width={IMAGE_DIMS.faqTile.width}
              height={IMAGE_DIMS.faqTile.height}
            />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Chi phí</p>
            <h2 className="home-section__title">Bảng giá &amp; plan</h2>
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
        <h2 className="home-section__title">Thấy ngày &quot;Còn chỗ&quot; hoặc plan phù hợp?</h2>
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
