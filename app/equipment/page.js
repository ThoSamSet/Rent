import EditorialLayout from '@/layouts/EditorialLayout';
import EquipmentPageContent from '@/components/pages/EquipmentPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Dụng cụ Camping - Lều, Bếp, Đèn, Máy ảnh',
  description:
    'Danh sách dụng cụ camping tại Camp Nhà Thỏ: lều, bếp, đèn, túi ngủ, máy ảnh Fujifilm X-T5, Nintendo Switch. Bạn chỉ mang đồ cá nhân.',
  path: '/equipment',
  image: '/images/equipment-hero.webp',
});

export default function EquipmentPage() {
  return (
    <EditorialLayout page="equipment" currentPath="/equipment" gsapHomeVersion="20260626c">
      <EquipmentPageContent />
    </EditorialLayout>
  );
}
