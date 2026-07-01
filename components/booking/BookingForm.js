import Link from 'next/link';

const CAMP_PREFS = [
  { value: 'shower', label: 'Có nhà tắm' },
  { value: 'power', label: 'Có ổ điện / điện lưới' },
  { value: 'lake-river', label: 'Gần hồ / sông' },
  { value: 'shop', label: 'Có cửa hàng / bán hàng' },
  { value: 'bbq-fire', label: 'Cho phép lửa trại / BBQ' },
  { value: 'beginner', label: 'Phù hợp người mới' },
  { value: 'fuji-view', label: 'View núi Phú Sĩ' },
  { value: 'onsen', label: 'Có onsen / suối nước nóng' },
  { value: 'beach', label: 'Gần biển' },
  { value: 'stargazing', label: 'View sao / độ tối' },
];

export default function BookingForm() {
  return (
    <form id="bookingForm" className="booking-form" noValidate>
      <div className="booking-wizard-step is-active" data-wizard-step="1">
        <fieldset className="booking-fieldset">
          <legend className="booking-legend">Thông tin chuyến</legend>

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
              Chọn ngày khởi hành — hoặc bấm ô <strong>Còn chỗ</strong> trên{' '}
              <Link href="/schedule">lịch trình</Link>.
            </p>
          </div>

          <div className="booking-field-row">
            <div className="booking-field">
              <label htmlFor="duration">Số đêm / số ngày</label>
              <select id="duration" name="duration" defaultValue="2d1n">
                <option value="day">Đi trong ngày</option>
                <option value="2d1n">2N1Đ (2 ngày 1 đêm)</option>
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
          <legend className="booking-legend">Plan</legend>
          <div className="booking-plan-options" role="radiogroup" aria-label="Chọn plan">
            <label className="booking-plan-card">
              <input type="radio" name="plan" value="de" />
              <span className="booking-plan-inner">
                <span className="booking-plan-title">🌰 Hạt Dẻ</span>
                <span className="booking-plan-desc">Không đưa đón · full đồ camping</span>
              </span>
            </label>
            <label className="booking-plan-card">
              <input type="radio" name="plan" value="bi" defaultChecked />
              <span className="booking-plan-inner">
                <span className="booking-plan-title">
                  🎃 Hạt Bí <em>(phổ biến)</em>
                </span>
                <span className="booking-plan-desc">Đưa đón · setup trọn gói · tối đa 4 người</span>
              </span>
            </label>
            <label className="booking-plan-card">
              <input type="radio" name="plan" value="nho" />
              <span className="booking-plan-inner">
                <span className="booking-plan-title">🍇 Hạt Nho</span>
                <span className="booking-plan-desc">Bungalow · đưa đón · không lo mưa</span>
              </span>
            </label>
          </div>
          <p id="planWarning" className="booking-warning" hidden />
        </fieldset>
      </div>

      <div className="booking-wizard-step" data-wizard-step="3" hidden>
        <fieldset className="booking-fieldset">
          <legend className="booking-legend">Đón &amp; địa điểm</legend>

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
              <p className="booking-hint">
                Bảng giá tham khảo cho Tokyo, Saitama, Kanagawa, Chiba, Gunma.
              </p>
            </div>

            <div className="booking-field" id="pickupCustomField" hidden>
              <label htmlFor="pickupCustom">Ghi rõ khu vực đón</label>
              <input
                type="text"
                id="pickupCustom"
                name="pickupCustom"
                placeholder="vd. Yokohama, Maebashi…"
                autoComplete="off"
              />
            </div>

            <p id="pickupWarning" className="booking-warning" hidden />
          </div>

          <div className="booking-field">
            <label htmlFor="campLocation">Địa điểm camp mong muốn</label>
            <select id="campLocation" name="campLocation" defaultValue="suggest">
              <option value="suggest">Gợi ý giúp mình</option>
              <option value="other">Khác / chưa biết</option>
            </select>
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
          <legend className="booking-legend">Option thêm</legend>
          <p className="booking-hint booking-hint--fieldset">
            Đồ ăn &amp; xem phim —{' '}
            <Link href="/options">liên hệ để báo giá</Link>. Xem chi tiết tại trang Option.
          </p>

          <div className="booking-checkbox-subgroup">
            <p className="booking-checkbox-subtitle">Di chuyển</p>
            <div className="booking-checkbox-group" role="group" aria-label="Option di chuyển">
              <label className="booking-checkbox-label">
                <input
                  type="checkbox"
                  name="addon"
                  value="travel-local"
                  data-label="Đường thường (tiết kiệm chi phí)"
                />
                <span className="booking-checkbox-text">
                  Đường thường <span className="booking-checkbox-meta">giảm ~5000y/chuyến</span>
                </span>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="booking-fieldset">
          <legend className="booking-legend">Điều kiện bãi mong muốn</legend>
          <p className="booking-hint booking-hint--fieldset">
            Ghi chú mong muốn — không phải bộ lọc cứng; tụi mình sẽ gợi ý bãi phù hợp nhất.
          </p>

          <div
            className="booking-checkbox-group booking-checkbox-group--wide"
            role="group"
            aria-label="Điều kiện bãi mong muốn"
          >
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
