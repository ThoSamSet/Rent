import BookingPageContent from '@/components/pages/BookingPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Đặt lịch camping',
  description:
    'Chọn ngày, plan và số người. Form tạo sẵn tin nhắn kèm ước tính chi phí để gửi qua TikTok hoặc Facebook. Không cần cọc.',
  path: '/dat-lich',
  image: '/images/hero-contact-campnhatho.jpg',
});

export default function DatLichPage() {
  return <BookingPageContent />;
}
