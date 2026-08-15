import { SOCIAL_BY_ID } from '@/lib/social';

/** Booking page copy and structured content. */

export const BOOKING_INTRO = {
  label: 'Đặt lịch',
  title: 'Đặt lịch camping với Camp Nhà Thỏ',
  subtitle:
    'Chọn ngày, plan và số người — nhận mẫu tin nhắn cá nhân hoá kèm ước tính chi phí, rồi gửi qua TikTok hoặc Facebook.',
};

/** @type {{ id: number; label: string; shortLabel: string }[]} */
export const BOOKING_WIZARD_STEPS = [
  { id: 1, label: 'Chuyến đi', shortLabel: 'Ngày & số người' },
  { id: 2, label: 'Plan', shortLabel: 'Hạt Dẻ / Bí / Nho' },
  { id: 3, label: 'Đón & địa điểm', shortLabel: 'Khu vực & bãi' },
  { id: 4, label: 'Tùy chọn', shortLabel: 'Option & bãi' },
];

export const BOOKING_SOCIAL = {
  tiktok: {
    href: SOCIAL_BY_ID.tiktok.href,
    label: 'Gửi qua TikTok',
    contactLabel: 'Liên hệ qua TikTok',
  },
  facebook: {
    href: SOCIAL_BY_ID.facebook.href,
    label: 'Gửi qua Facebook',
    contactLabel: 'Liên hệ qua Facebook',
  },
};

/** @type {{ href: string; label: string; title: string; image: string; imageAlt: string; fullWidth?: boolean }[]} */
export const BOOKING_EXPLORE_TILES = [
  {
    href: '/schedule',
    label: 'Lịch trình',
    title: 'Kiểm tra lịch trống',
    image: '/images/subBanner-lich-trinh.webp',
    imageAlt: 'Lịch trình camping — kiểm tra lịch trống',
  },
  {
    href: '/pricing',
    label: 'Chi phí',
    title: 'Bảng giá & plan',
    image: '/images/chi-phi-1.webp',
    imageAlt: 'Bảng giá camping — chi phí theo plan',
  },
  {
    href: '/faq',
    label: 'FAQ',
    title: 'Câu hỏi thường gặp',
    image: '/images/subBanner-faq.webp',
    imageAlt: 'Câu hỏi thường gặp',
    fullWidth: true,
  },
];
