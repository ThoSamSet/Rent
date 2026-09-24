import PricingPageContent from '@/components/pages/PricingPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Chi phí — ba plan camping 2 ngày 1 đêm',
  description:
    'Hạt Dẻ từ 3.7 man, Hạt Bí từ 4.7 man, Hạt Nho từ 5.7 man. Bảng giá theo số người cho điểm đón Tokyo, Saitama, Kanagawa.',
  path: '/pricing',
  image: '/images/chi-phi-1.webp',
});

export default function PricingPage() {
  return <PricingPageContent />;
}
