import Link from 'next/link';
import { BOOKING_WIZARD_STEPS } from '@/lib/booking/content';

export default function BookingWizardProgress() {
  return (
    <nav className="booking-wizard-progress" aria-label="Tiến trình đặt lịch">
      <ol className="booking-wizard-progress__list">
        {BOOKING_WIZARD_STEPS.map((step) => (
          <li
            key={step.id}
            className="booking-wizard-progress__item"
            data-wizard-progress-step={step.id}
          >
            <span className="booking-wizard-progress__dot" aria-hidden="true" />
            <span className="booking-wizard-progress__label">{step.label}</span>
            <span className="booking-wizard-progress__short">{step.shortLabel}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
