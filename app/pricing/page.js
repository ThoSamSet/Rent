import PricingPageContent from '@/components/pages/PricingPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Chi phí Camping Phú Sĩ',
  description:
    'Bảng chi phí camping tại Camp Nhà Thỏ theo số người và plan (Hạt dẻ, Hạt bí, Hạt nho). Khu vực Tokyo, Saitama, Kanagawa.',
  path: '/pricing',
  image: '/images/chi-phi-1.webp',
});

export default function PricingPage() {
  return <PricingPageContent />;
}
