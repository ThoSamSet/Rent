import BookingSocialButtons from '@/components/booking/BookingSocialButtons';

export default function BookingSummary() {
  return (
    <aside className="booking-summary" id="bookingSummary" aria-live="polite">
      <div className="booking-promo-banner" id="childrenDayPromoBanner" hidden>
        <p>
          <strong>KM 1/6 Thiếu nhi</strong> — Giảm thêm 5000¥ mọi gói thuê · Đặt đến 15/6
        </p>
      </div>

      <div className="booking-price-card">
        <p className="booking-price-label">Dự kiến chi phí</p>
        <p className="booking-price-total" id="priceTotal">
          ~5.4man
        </p>
        <p className="booking-price-breakdown" id="priceBreakdown" />
        <p className="booking-price-note" id="priceNote">
          *Ước tính theo bảng giá 2N1Đ · chưa gồm đồ ăn &amp; xem phim · xác nhận qua inbox.
        </p>
      </div>

      <div className="booking-message-card">
        <div className="booking-message-header">
          <p className="booking-message-label">Mẫu tin nhắn</p>
          <button type="button" className="btn-primary booking-copy-btn" id="copyMessageBtn">
            Copy
          </button>
        </div>
        <pre className="booking-message-preview" id="messagePreview" />
        <p className="booking-copy-feedback" id="copyFeedback" hidden aria-live="assertive">
          Đã copy!
        </p>
      </div>

      <div className="booking-cta-block">
        <ol className="booking-steps" aria-label="Các bước đặt lịch">
          <li className="booking-step">
            <span className="booking-step-num">1</span> Copy mẫu tin nhắn
          </li>
          <li className="booking-step">
            <span className="booking-step-num">2</span> Gửi qua TikTok / Facebook
          </li>
          <li className="booking-step">
            <span className="booking-step-num">3</span> Chờ xác nhận từ tụi mình
          </li>
        </ol>
        <p className="booking-cta-text">
          Dán tin nhắn vừa copy vào inbox — tụi mình phản hồi sớm nhất có thể.
        </p>
        <BookingSocialButtons />
        <a href="#lien-he" className="booking-contact-link">
          Bước cuối: gửi tin nhắn ↓
        </a>
      </div>
    </aside>
  );
}
