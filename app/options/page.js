import OptionsPageContent from '@/components/pages/OptionsPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Option — xem phim, đi đường thường, đồ ăn',
  description:
    'Thêm vào chuyến camping: gói xem phim 7.000¥, đi đường thường giảm 5.000¥/chuyến. Option đồ ăn đang tạm dừng.',
  path: '/options',
  image: '/images/option-hero.webp',
});

export default function OptionsPage() {
  return <OptionsPageContent />;
}
