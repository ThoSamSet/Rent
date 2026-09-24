import Link from 'next/link';
import BookingForm from '@/components/booking/BookingForm';
import BookingMobileBar from '@/components/booking/BookingMobileBar';
import BookingRuntime from '@/components/booking/BookingRuntime';
import BookingSocialButtons from '@/components/booking/BookingSocialButtons';
import BookingSummary from '@/components/booking/BookingSummary';
import BookingWizardNav from '@/components/booking/BookingWizardNav';
import BookingWizardProgress from '@/components/booking/BookingWizardProgress';
import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import Emph, { plain } from '@/components/mag/Emph';
import { BOOKING_CLOSING, BOOKING_COVER } from '@/lib/booking/content';
import { pickContinue } from '@/lib/site/continue';
import { OPEN_DAYS, folioFor } from '@/lib/site/issue';

export default function BookingPageContent() {
  return (
    <main className="booking-page">
      <Cover
        label="Đặt lịch camping với Camp Nhà Thỏ"
        folio={folioFor('Đặt lịch')}
        kicker={BOOKING_COVER.kicker}
        title={BOOKING_COVER.title}
        deck={BOOKING_COVER.deck}
        image={{ src: '/images/hero-camping.webp', alt: 'Trại camping dựng sẵn chờ khách' }}
        caption={`Còn ${OPEN_DAYS} ngày trống`}
        lines={[
          { href: '#form', label: 'Form đặt lịch' },
          { href: '#lien-he', label: 'Gửi tin nhắn' },
        ]}
      />

      <section className="booking-section mag-section tone-paper" id="form" aria-label="Form đặt lịch">
        <div className="wrap">
          <BookingWizardProgress />
          <div className="booking-layout">
            <div className="booking-form-col">
              <BookingForm />
              <BookingRuntime />
              <BookingWizardNav />
            </div>
            <BookingSummary />
          </div>
        </div>
      </section>

      <BookingMobileBar />

      <section id="lien-he" className="cta-band mag-section tone-dusk" aria-label={plain(BOOKING_CLOSING.title)}>
        <div className="cta-band__glow" aria-hidden="true" />
        <div className="wrap">
          <h2 className="cta-band__title">
            <Emph text={BOOKING_CLOSING.title} />
          </h2>
          <p className="cta-band__text">{BOOKING_CLOSING.text}</p>
          <div className="actions">
            <BookingSocialButtons variant="contact" />
          </div>
          <p className="cta-band__text">
            Còn điều gì băn khoăn?{' '}
            <Link href="/faq" className="text-link">
              Có thể đã có câu trả lời ở đây
            </Link>
            .
          </p>
        </div>
      </section>

      <Continue items={pickContinue(['schedule', 'pricing', 'faq'])} />
    </main>
  );
}
