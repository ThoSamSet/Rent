import BookingPageContent from '@/components/pages/BookingPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Đặt lịch Camping',
  description:
    'Đặt lịch camping với Camp Nhà Thỏ — chọn ngày, plan, nhận mẫu tin nhắn cá nhân hoá kèm ước tính chi phí, rồi liên hệ qua TikTok hoặc Facebook.',
  path: '/dat-lich',
  image: '/images/hero-contact-campnhatho.jpg',
});

export default function DatLichPage() {
  return <BookingPageContent />;
}
