import OptionsPageContent from '@/components/pages/OptionsPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Option thêm — Đồ ăn, xem phim, di chuyển',
  description:
    'Các option kèm chuyến camping tại Camp Nhà Thỏ: đồ ăn, xem phim, option đi đường thường để tiết kiệm chi phí. Giá tham khảo và trạng thái dịch vụ.',
  path: '/options',
  image: '/images/option-hero.webp',
});

export default function OptionsPage() {
  return <OptionsPageContent />;
}
