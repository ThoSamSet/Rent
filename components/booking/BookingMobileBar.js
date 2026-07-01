export default function BookingMobileBar() {
  return (
    <>
      <div className="booking-mobile-bar" data-booking-mobile-bar hidden>
        <div className="booking-mobile-bar__price">
          <span className="booking-mobile-bar__label">Dự kiến</span>
          <span className="booking-mobile-bar__total" id="priceTotalMobile" aria-live="polite">
            ~5.4man
          </span>
        </div>
        <button type="button" className="btn-primary booking-mobile-bar__cta" data-booking-sheet-open>
          Xem tóm tắt
        </button>
      </div>

      <div className="booking-mobile-sheet" data-booking-mobile-sheet hidden aria-hidden="true">
        <div className="booking-mobile-sheet__backdrop" data-booking-sheet-close tabIndex={-1} />
        <div
          className="booking-mobile-sheet__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Tóm tắt đặt lịch"
        >
          <div className="booking-mobile-sheet__header">
            <h2 className="booking-mobile-sheet__title">Tóm tắt đặt lịch</h2>
            <button
              type="button"
              className="booking-mobile-sheet__close"
              data-booking-sheet-close
              aria-label="Đóng"
            >
              ×
            </button>
          </div>
          <div className="booking-mobile-sheet__body" data-booking-sheet-body />
        </div>
      </div>
    </>
  );
}
