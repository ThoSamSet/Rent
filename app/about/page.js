import AboutPageContent from '@/components/pages/AboutPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Giới thiệu — Camp Nhà Thỏ',
  description:
    'Camp Nhà Thỏ chia sẻ đồ camping, đưa đón và dựng trại cho nhóm của bạn quanh Kanto. Đi riêng, không ghép khách, không cần cọc.',
  path: '/about',
  image: '/images/about-hero.webp',
});

export default function AboutPage() {
  return <AboutPageContent />;
}
