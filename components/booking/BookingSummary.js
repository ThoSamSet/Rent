import BookingSocialButtons from '@/components/booking/BookingSocialButtons';

export default function BookingSummary() {
  return (
    <aside className="booking-summary" id="bookingSummary" aria-live="polite">
      <div className="booking-promo-banner" id="childrenDayPromoBanner" hidden>
        <p>
          <strong>KM 1/6 Thiếu nhi</strong> — giảm thêm 5.000¥ mọi gói · đặt đến 15/6
        </p>
      </div>

      <div className="booking-price">
        <p className="kicker">Dự kiến chi phí</p>
        <p className="booking-price__total" id="priceTotal">
          ~5.4man
        </p>
        <p className="booking-price__breakdown" id="priceBreakdown" />
        <p className="booking-price__note" id="priceNote">
          Ước tính theo bảng giá 2 ngày 1 đêm · chưa gồm đồ ăn và xem phim · xác nhận qua inbox.
        </p>
      </div>

      <div className="booking-message">
        <div className="booking-message__head">
          <p className="kicker">Tin nhắn mẫu</p>
          <button type="button" className="btn btn--solid booking-copy-btn" id="copyMessageBtn">
            Copy
          </button>
        </div>
        <pre className="booking-message__preview" id="messagePreview" />
        <p className="booking-message__feedback" id="copyFeedback" hidden aria-live="assertive">
          Đã copy.
        </p>
      </div>

      <div className="booking-send">
        <ol className="booking-send__steps" aria-label="Gửi tin nhắn">
          <li>Copy tin nhắn mẫu</li>
          <li>Gửi qua TikTok hoặc Facebook</li>
          <li>Chờ tụi mình xác nhận</li>
        </ol>
        <BookingSocialButtons />
        <a href="#lien-he" className="text-link booking-contact-link">
          Bước cuối: gửi tin nhắn
        </a>
      </div>
    </aside>
  );
}
