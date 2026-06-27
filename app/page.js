import EditorialLayout from '@/layouts/EditorialLayout';
import HomePageContent from '@/components/pages/HomePageContent';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title:
    'Camp Nhà Thỏ - Share đồ Camping | Cho thuê đồ cắm trại Phú Sĩ | Chụp hình chill cảnh đẹp Nhật Bản',
  description:
    'Camp Nhà Thỏ - Dịch vụ share và cho thuê đồ cắm trại tại Phú Sĩ. Hỗ trợ đưa đón, setup lều, chụp hình kỷ niệm. Trải nghiệm camping chill với view núi Phú Sĩ tuyệt đẹp.',
  path: '/',
  image: '/images/hero-camping.webp',
});

export default function HomePage() {
  return (
    <EditorialLayout page="home" currentPath="/" mapScripts>
      <LocalBusinessJsonLd />
      <HomePageContent />
    </EditorialLayout>
  );
}
