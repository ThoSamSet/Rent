import { SOCIAL_BY_ID } from '@/lib/social';

/** Booking page copy. Form logic lives in mount-booking.js. */

export const BOOKING_COVER = {
  kicker: 'Đặt lịch',
  title: ['Bốn bước,', '*một tin nhắn.*'],
  deck: 'Bạn chọn ngày, plan và số người. Form sẽ soạn sẵn một tin nhắn kèm chi phí dự kiến. Bạn chỉ cần copy rồi gửi cho tụi mình qua TikTok hoặc Facebook.',
};

/** @type {{ id: number; label: string; shortLabel: string }[]} */
export const BOOKING_WIZARD_STEPS = [
  { id: 1, label: 'Chuyến đi', shortLabel: 'Ngày và số người' },
  { id: 2, label: 'Plan', shortLabel: 'Dẻ · Bí · Nho' },
  { id: 3, label: 'Đón và bãi', shortLabel: 'Khu vực, địa điểm' },
  { id: 4, label: 'Tuỳ chọn', shortLabel: 'Option, mong muốn' },
];

export const BOOKING_SOCIAL = {
  tiktok: {
    href: SOCIAL_BY_ID.tiktok.href,
    label: 'Gửi qua TikTok',
    contactLabel: 'Nhắn TikTok',
  },
  facebook: {
    href: SOCIAL_BY_ID.facebook.href,
    label: 'Gửi qua Facebook',
    contactLabel: 'Nhắn Facebook',
  },
};

export const BOOKING_CLOSING = {
  title: 'Bước cuối: *gửi đi*',
  text: 'Dán tin nhắn vừa copy vào inbox. Tụi mình đọc hết và trả lời sớm nhất có thể.',
};
