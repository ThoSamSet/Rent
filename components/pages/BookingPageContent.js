import Link from 'next/link';
import BookingForm from '@/components/booking/BookingForm';
import BookingMobileBar from '@/components/booking/BookingMobileBar';
import BookingSocialButtons from '@/components/booking/BookingSocialButtons';
import BookingSummary from '@/components/booking/BookingSummary';
import BookingWizardNav from '@/components/booking/BookingWizardNav';
import BookingWizardProgress from '@/components/booking/BookingWizardProgress';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { BOOKING_EXPLORE_TILES, BOOKING_INTRO } from '@/lib/booking/content';
import { HERO_SLIDES } from '@/lib/hero/slides';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function BookingPageContent() {
  return (
    <main className="home-editorial booking-page">
      <section className="home-hero" aria-label="Đặt lịch camping Camp Nhà Thỏ">
        <HeroSlideshow slides={HERO_SLIDES.booking} />
        <div className="home-hero__overlay">
          <p className="home-hero__label">{BOOKING_INTRO.label}</p>
          <h1 className="home-hero__title">{BOOKING_INTRO.title}</h1>
          <p className="home-hero__subtitle">{BOOKING_INTRO.subtitle}</p>
          <div className="about-hero__actions">
            <Link href="/schedule" className="btn-outline">
              Xem lịch trống
            </Link>
            <Link href="/pricing" className="btn-outline">
              Xem bảng giá
            </Link>
          </div>
        </div>
      </section>

      <section className="booking-section home-section" aria-label="Form đặt lịch">
        <div className="container">
          <BookingWizardProgress />
          <div className="booking-layout">
            <div className="booking-form-col">
              <BookingForm />
              <BookingWizardNav />
            </div>
            <BookingSummary />
          </div>
        </div>
      </section>

      <BookingMobileBar />

      <section className="home-bottom about-explore" data-reveal aria-label="Tìm hiểu thêm">
        {BOOKING_EXPLORE_TILES.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className={`home-faq${tile.fullWidth ? ' about-explore__full' : ''}`}
          >
            <div className="home-faq__media">
              <ResponsiveImage
                src={tile.image}
                alt={tile.imageAlt}
                width={IMAGE_DIMS.faqTile.width}
                height={IMAGE_DIMS.faqTile.height}
              />
            </div>
            <div className="home-faq__copy">
              <p className="home-section__label">{tile.label}</p>
              <h2 className="home-section__title">{tile.title}</h2>
            </div>
          </Link>
        ))}
      </section>

      <section id="lien-he" className="about-cta home-section" data-reveal>
        <h2 className="home-section__title">Bước cuối: Gửi tin nhắn</h2>
        <p className="about-cta__tagline">
          Dán mẫu tin nhắn vừa copy vào inbox — tụi mình phản hồi sớm nhất có thể.
        </p>
        <div className="about-cta__actions">
          <BookingSocialButtons variant="contact" />
        </div>
        <p className="about-cta__secondary">
          Có thắc mắc? Xem <Link href="/faq">FAQ</Link>.
        </p>
      </section>
    </main>
  );
}
