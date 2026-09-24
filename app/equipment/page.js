import EquipmentPageContent from '@/components/pages/EquipmentPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Dụng cụ — lều, bếp, đèn, túi ngủ có sẵn',
  description:
    'Lều 2 room, túi ngủ, bếp, đèn, lò sưởi, máy ảnh Fujifilm X-T5, Nintendo Switch — có sẵn trong mọi plan. Bạn chỉ mang đồ cá nhân.',
  path: '/equipment',
  image: '/images/equipment-hero.webp',
});

export default function EquipmentPage() {
  return <EquipmentPageContent />;
}
