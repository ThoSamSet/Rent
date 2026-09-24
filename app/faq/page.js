import FaqPageContent from '@/components/pages/FaqPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Hỏi đáp — câu hỏi thường gặp',
  description:
    'Về dịch vụ, đặt lịch, thanh toán, di chuyển và một đêm ở bãi cùng Camp Nhà Thỏ. Tìm nhanh bằng từ khoá.',
  path: '/faq',
  image: '/images/faq-hero.webp',
});

export default function FaqPage() {
  return <FaqPageContent />;
}
