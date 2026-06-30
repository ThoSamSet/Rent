import FaqPageContent from '@/components/pages/FaqPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'FAQ - Câu hỏi thường gặp về Camping Phú Sĩ',
  description:
    'Câu hỏi thường gặp về dịch vụ share đồ camping tại Phú Sĩ. Giải đáp về giá, thanh toán, đặt lịch, dụng cụ, và các thắc mắc khác.',
  path: '/faq',
  image: '/images/faq-hero.webp',
});

export default function FaqPage() {
  return <FaqPageContent />;
}
