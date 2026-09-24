import HomePageContent from '@/components/pages/HomePageContent';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Camp Nhà Thỏ — Share đồ camping, đưa đón và dựng trại quanh Kanto',
  description:
    'Camp Nhà Thỏ chia sẻ đồ camping, đưa đón từ Tokyo, Saitama, Kanagawa và dựng trại sẵn tại các bãi quanh Phú Sĩ và Kanto. Ba plan từ 3.7 man, không cần cọc.',
  path: '/',
  image: '/images/hero-camping.webp',
});

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomePageContent />
    </>
  );
}
