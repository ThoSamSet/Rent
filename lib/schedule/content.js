/** Schedule page copy and structured content. */

export const SCHEDULE_INTRO = {
  label: 'Lịch trình',
  title: 'Lịch trình Camping',
  subtitle:
    'Xem ngày Còn chỗ và các chuyến đã lên lịch — nhắn TikTok hoặc Facebook để đặt với Camp Nhà Thỏ.',
};

export const SCHEDULE_LAST_UPDATED = '2026/06/24';

/** @type {{ swatchClass: string; swatchLabel: string; label: string; description: string }[]} */
export const SCHEDULE_LEGEND_ITEMS = [
  {
    swatchClass: 'legend-plan-nho',
    swatchLabel: '🍇',
    label: 'Hạt Nho',
    description: 'có chuyến bungalow, đưa đón',
  },
  {
    swatchClass: 'legend-plan-bi',
    swatchLabel: '🎃',
    label: 'Hạt Bí',
    description: 'có chuyến lều / shelter, setup trọn gói',
  },
  {
    swatchClass: 'legend-plan-de',
    swatchLabel: '🌰',
    label: 'Hạt Dẻ',
    description: 'có chuyến tự chọn ngày, không đưa đón',
  },
  {
    swatchClass: 'legend-available',
    swatchLabel: 'Còn chỗ',
    label: 'Còn chỗ',
    description: '= còn slot — Chạm để đặt hoặc nhắn inbox',
  },
  {
    swatchClass: 'legend-empty',
    swatchLabel: '-',
    label: '-',
    description: '= không hoạt động / chưa mở',
  },
  {
    swatchClass: 'legend-holiday',
    swatchLabel: 'Lễ',
    label: 'Lễ Nhật',
    description: '= ngày nghỉ lễ quốc gia Nhật Bản (国民の祝日)',
  },
];

export const SCHEDULE_EARLY_BANNER = {
  lead: 'Đặt sớm',
  text: '— Slot cuối tuần & mùa cao điểm hay hết nhanh. Nhắn ngay, không cần cọc.',
  note: 'Lịch có thể thay đổi — inbox xác nhận',
};

/** @type {{ title: string; description: string; link?: { href: string; label: string }; emphasis?: string }[]} */
export const SCHEDULE_BOOKING_STEPS = [
  {
    title: 'Chọn ngày trên lịch',
    description: 'Click ô Còn chỗ trên lịch — hoặc mở form đặt lịch để điền thông tin.',
    link: { href: '/dat-lich', label: 'form đặt lịch' },
  },
  {
    title: 'Nhắn TikTok / Facebook',
    description:
      'Gửi số người, khu vực đón (Tokyo / Saitama / Kanagawa…), plan mong muốn và link Facebook cá nhân của các thành viên.',
  },
  {
    title: 'Xác nhận & thanh toán',
    description: 'Chờ xác nhận qua inbox — không cần đặt cọc. Thanh toán bằng tiền mặt trước khi khởi hành.',
    emphasis: 'không cần đặt cọc',
  },
];
