import Link from 'next/link';
import { PRICING_PLANS } from '@/lib/pricing/content';

const CAMP_PREFS = [
  { value: 'shower', label: 'Có nhà tắm' },
  { value: 'power', label: 'Có ổ điện / điện lưới' },
  { value: 'lake-river', label: 'Gần hồ / sông' },
  { value: 'shop', label: 'Có cửa hàng' },
  { value: 'bbq-fire', label: 'Cho phép lửa trại / BBQ' },
  { value: 'beginner', label: 'Phù hợp người mới' },
  { value: 'fuji-view', label: 'View núi Phú Sĩ' },
  { value: 'onsen', label: 'Có onsen' },
  { value: 'beach', label: 'Gần biển' },
  { value: 'stargazing', label: 'Ngắm sao' },
];

const PLAN_NOTES = {
  de: 'Tự đến bãi · full đồ camping',
  bi: 'Đưa đón · setup trọn gói · tối đa 4 người',
  nho: 'Bungalow · đưa đón · không lo mưa',
};

/** Markup contract with lib/booking/mount-booking.js: keep every id, name and data-* attribute. */
export default function BookingForm() {
  return (
    <form id="bookingForm" className="booking-form" noValidate>
      <div className="booking-wizard-step is-active" data-wizard-step="1">
        <fieldset className="booking-fieldset">
          <legend className="booking-legend">
            <span className="booking-legend__no">01</span> Chuyến đi
          </legend>

          <div className="booking-field">
            <label htmlFor="startDate">Ngày đi</label>
            <input
              type="text"
              id="startDate"
              name="startDate"
              className="booking-date-input"
              required
              placeholder="dd/mm/yyyy"
              inputMode="numeric"
              autoComplete="off"
              title="Nhập ngày theo định dạng dd/mm/yyyy"
            />
            <p className="booking-hint">
              Hoặc chạm một ngày còn chỗ trên <Link href="/schedule">lịch trống</Link>.
            </p>
          </div>

          <div className="booking-field-row">
            <div className="booking-field">
              <label htmlFor="duration">Thời gian</label>
              <select id="duration" name="duration" defaultValue="2d1n">
                <option value="day">Đi trong ngày</option>
                <option value="2d1n">2 ngày 1 đêm</option>
              </select>
            </div>
            <div className="booking-field">
              <label htmlFor="people">Số người</label>
              <select id="people" name="people" defaultValue="2">
                <option value="1">1 người</option>
                <option value="2">2 người</option>
                <option value="3">3 người</option>
                <option value="4">4 người</option>
                <option value="5">5+ người</option>
              </select>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="booking-wizard-step" data-wizard-step="2" hidden>
        <fieldset className="booking-fieldset">
          <legend className="booking-legend">
            <span className="booking-legend__no">02</span> Plan
          </legend>
          <div className="booking-plan-options" role="radiogroup" aria-label="Chọn plan">
            {PRICING_PLANS.map((plan) => (
              <label key={plan.slug} className="booking-plan-card">
                <input type="radio" name="plan" value={plan.slug} defaultChecked={plan.slug === 'bi'} />
                <span className="booking-plan-inner">
                  <span className="booking-plan-title">{plan.name}</span>
                  <span className="booking-plan-price">từ {plan.priceFrom} man</span>
                  <span className="booking-plan-desc">{PLAN_NOTES[plan.slug]}</span>
                </span>
              </label>
            ))}
          </div>
          <p id="planWarning" className="booking-warning" hidden />
        </fieldset>
      </div>

      <div className="booking-wizard-step" data-wizard-step="3" hidden>
        <fieldset className="booking-fieldset">
          <legend className="booking-legend">
            <span className="booking-legend__no">03</span> Đón và bãi
          </legend>

          <div id="pickupAreaGroup">
            <div className="booking-field">
              <label htmlFor="pickup">Khu vực đón</label>
              <select id="pickup" name="pickup" defaultValue="tokyo">
                <option value="tokyo">Tokyo</option>
                <option value="saitama">Saitama</option>
                <option value="kanagawa">Kanagawa</option>
                <option value="chiba">Chiba</option>
                <option value="gunma">Gunma</option>
                <option value="khac">Khác</option>
              </select>
              <p className="booking-hint">Giá tham khảo cho Tokyo, Saitama, Kanagawa, Chiba, Gunma.</p>
            </div>

            <div className="booking-field" id="pickupCustomField" hidden>
              <label htmlFor="pickupCustom">Ghi rõ khu vực đón</label>
              <input type="text" id="pickupCustom" name="pickupCustom" placeholder="vd. Yokohama, Maebashi…" autoComplete="off" />
            </div>

            <p id="pickupWarning" className="booking-warning" hidden />
          </div>

          <div className="booking-field">
            <label htmlFor="campLocation">Bãi mong muốn</label>
            <select id="campLocation" name="campLocation" defaultValue="suggest">
              <option value="suggest">Gợi ý giúp mình</option>
              <option value="other">Khác / chưa biết</option>
            </select>
            <p className="booking-hint">
              Xem <Link href="/locations">15 bãi quanh Kanto</Link>.
            </p>
          </div>

          <div className="booking-field" id="campLocationCustomField" hidden>
            <label htmlFor="campLocationCustom">Ghi rõ tên bãi</label>
            <input
              type="text"
              id="campLocationCustom"
              name="campLocationCustom"
              placeholder="vd. Fumotoppara, Koan…"
              autoComplete="off"
            />
          </div>

          <div className="booking-field">
            <label htmlFor="facebookLink">Link Facebook (tuỳ chọn)</label>
            <input
              type="url"
              id="facebookLink"
              name="facebookLink"
              placeholder="https://facebook.com/…"
              inputMode="url"
              autoComplete="url"
            />
          </div>
        </fieldset>
      </div>

      <div className="booking-wizard-step" data-wizard-step="4" hidden>
        <fieldset className="booking-fieldset">
          <legend className="booking-legend">
            <span className="booking-legend__no">04</span> Option
          </legend>
          <p className="booking-hint">
            Đồ ăn và xem phim: <Link href="/options">liên hệ để báo giá</Link>.
          </p>
          <div className="booking-checkbox-group" role="group" aria-label="Option di chuyển">
            <label className="booking-checkbox-label">
              <input type="checkbox" name="addon" value="travel-local" data-label="Đường thường (tiết kiệm chi phí)" />
              <span className="booking-checkbox-text">
                Đi đường thường <span className="booking-checkbox-meta">giảm ~5.000¥ / chuyến</span>
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset className="booking-fieldset">
          <legend className="booking-legend">Bãi như thế nào?</legend>
          <p className="booking-hint">Không phải bộ lọc cứng — tụi mình dùng để gợi ý bãi hợp nhất.</p>
          <div className="booking-checkbox-group booking-checkbox-group--wide" role="group" aria-label="Điều kiện bãi mong muốn">
            {CAMP_PREFS.map((pref) => (
              <label key={pref.value} className="booking-checkbox-label">
                <input type="checkbox" name="campPref" value={pref.value} data-label={pref.label} />
                <span className="booking-checkbox-text">{pref.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </form>
  );
}
