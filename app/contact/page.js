import { buildPageMetadata } from '@/lib/seo';
import ContactRedirect from './ContactRedirect';

export const metadata = buildPageMetadata({
  title: 'Liên hệ - Đặt lịch & TikTok / Facebook',
  description:
    'Liên hệ Camp Nhà Thỏ qua trang đặt lịch — gửi tin nhắn qua TikTok hoặc Facebook để xác nhận camping tại Phú Sĩ.',
  path: '/contact',
  noIndex: true,
});

export default function ContactPage() {
  return <ContactRedirect />;
}
