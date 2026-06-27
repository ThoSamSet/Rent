/** About page content below the quote block. */

export const ABOUT_VALUES = [
  { text: 'Thoải mái' },
  { text: 'Gần gũi' },
  { text: 'Không áp lực' },
  { text: 'Nghỉ ngơi đúng nghĩa' },
];

export const ABOUT_COMPARISON_ROWS = [
  { feature: 'Đồ camping', withService: 'Có sẵn đầy đủ', withoutService: 'Tự chuẩn bị' },
  { feature: 'Đặt bãi', withService: 'Hỗ trợ đặt chỗ', withoutService: 'Tự tìm kiếm' },
  { feature: 'Đưa đón', withService: 'Có', withoutService: 'Tự di chuyển' },
  { feature: 'Setup', withService: 'Hỗ trợ', withoutService: 'Tự thực hiện' },
  { feature: 'Lịch trình', withService: 'Tư vấn', withoutService: 'Tự lên kế hoạch' },
  { feature: 'Chi phí', withService: 'Minh bạch', withoutService: 'Khó dự tính' },
];

export const ABOUT_BOOKING_STEPS = [
  {
    title: 'Xem lịch trống',
    description: 'Chọn ngày Còn chỗ trên lịch trình.',
    link: { href: '/schedule', label: 'lịch trình' },
  },
  {
    title: 'Điền form',
    description: 'Mở form đặt lịch — hệ thống tạo sẵn mẫu tin nhắn.',
    link: { href: '/dat-lich', label: 'form đặt lịch' },
  },
  {
    title: 'Gửi & xác nhận',
    description: 'Copy gửi qua TikTok hoặc Facebook — không cần cọc, chờ xác nhận qua inbox.',
    emphasis: 'không cần cọc',
  },
];

export const ABOUT_TIMELINE = [
  { label: 'Ngày 1 sáng', text: 'Đón tại Tokyo, Saitama hoặc Kanagawa' },
  { label: 'Ngày 1 chiều', text: 'Đến bãi camp, dựng lều & setup' },
  { label: 'Ngày 1 tối', text: 'Nấu ăn, đốt lửa trại, chill buổi tối' },
  { label: 'Ngày 2', text: 'Ăn sáng, thu dọn, đưa về' },
];
