import Link from 'next/link';
import { SCHEDULE_BOOKING_STEPS } from '@/lib/schedule/content';

function StepDescription({ step }) {
  if (step.link) {
    const parts = step.description.split(step.link.label);
    return (
      <>
        {parts[0]}
        <Link href={step.link.href}>{step.link.label}</Link>
        {parts[1]}
      </>
    );
  }

  if (step.emphasis) {
    const parts = step.description.split(step.emphasis);
    return (
      <>
        {parts[0]}
        <strong>{step.emphasis}</strong>
        {parts[1]}
      </>
    );
  }

  if (step.description.includes('Còn chỗ')) {
    const parts = step.description.split('Còn chỗ');
    return (
      <>
        {parts[0]}
        <strong>Còn chỗ</strong>
        {parts[1]}
      </>
    );
  }

  return step.description;
}

export default function ScheduleBookingSteps() {
  return (
    <section className="about-block schedule-steps-block home-section" data-reveal aria-label="Cách đặt lịch">
      <div className="about-block__header">
        <p className="home-section__label">Đặt lịch</p>
        <h2 className="home-section__title">3 bước đặt lịch</h2>
      </div>

      <ol className="schedule-steps">
        {SCHEDULE_BOOKING_STEPS.map((step) => (
          <li key={step.title}>
            <div className="schedule-step-content">
              <h3>{step.title}</h3>
              <p>
                <StepDescription step={step} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
