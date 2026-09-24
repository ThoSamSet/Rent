/** Schedule — copy, legend, booking steps. Availability grids live in months.js. */

export const SCHEDULE_COVER = {
  kicker: 'Lịch trống',
  title: ['Ngày nào', '*còn chỗ?*'],
  deck: 'Chạm vào một ngày còn trống, form đặt lịch sẽ mở ra với ngày đó điền sẵn. Cuối tuần và mùa cao điểm như mùa lá đỏ thường hết chỗ rất nhanh.',
};

export const SCHEDULE_LAST_UPDATED = '2026/09/23';

/** match: class on a schedule cell. Legend rows are shown only if some cell has that class. */
export const SCHEDULE_LEGEND_ITEMS = [
  { match: 'is-available', swatch: 'available', label: 'Còn chỗ', description: 'Chạm để đặt, hoặc nhắn cho tụi mình' },
  { match: 'is-sale', swatch: 'sale', label: 'Sale', description: 'Còn chỗ, và đang giảm giá' },
  { match: 'is-empty', swatch: 'empty', label: '—', description: 'Ngày này không nhận đặt' },
  { match: 'is-holiday', swatch: 'holiday', label: 'Lễ', description: 'Ngày nghỉ lễ quốc gia Nhật Bản (国民の祝日)' },
];

export const SCHEDULE_NOTE = 'Lịch có thể thay đổi, nên tụi mình sẽ xác nhận lại trong inbox. Không cần đặt cọc.';

export const SCHEDULE_BOOKING_STEPS = [
  {
    title: 'Chọn một ngày',
    description: 'Chạm vào một ô còn chỗ trên lịch, hoặc mở form rồi tự điền ngày.',
    link: { href: '/dat-lich', label: 'Mở form đặt lịch' },
  },
  {
    title: 'Nhắn cho tụi mình',
    description:
      'Qua TikTok hoặc Facebook, bạn gửi số người, nơi đón (Tokyo, Saitama, Kanagawa…), plan muốn đi và link Facebook của từng người trong nhóm.',
  },
  {
    title: 'Chờ xác nhận',
    description: 'Tụi mình xác nhận trong inbox. Không cần đặt cọc, bạn trả tiền mặt trước lúc xuất phát.',
  },
];
