export default function BookingWizardNav() {
  return (
    <div className="booking-wizard-nav is-first-step" data-booking-wizard-nav>
      <button type="button" className="btn btn--line booking-wizard-nav__back" data-wizard-back hidden>
        Quay lại
      </button>
      <button type="button" className="btn btn--solid booking-wizard-nav__next" data-wizard-next>
        Tiếp theo
      </button>
    </div>
  );
}
