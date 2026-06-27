import AboutPageContent from '@/components/pages/AboutPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Về Camp Nhà Thỏ - Share đồ Camping Phú Sĩ | Chụp hình chill cảnh đẹp',
  description:
    'Tìm hiểu về Camp Nhà Thỏ - share đồ camping tại Phú Sĩ. Đặt lịch online, chia sẻ đồ + hỗ trợ đưa đón, setup, chụp hình kỷ niệm.',
  path: '/about',
  image: '/images/about-hero.webp',
});

export default function AboutPage() {
  return <AboutPageContent />;
}
