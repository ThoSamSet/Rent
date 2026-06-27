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
    <>
      <link
        rel="preload"
        as="image"
        href="/images/responsive/about-hero-960w.webp"
        imageSrcSet="/images/responsive/about-hero-480w.webp 480w, /images/responsive/about-hero-960w.webp 960w, /images/responsive/about-hero-1440w.webp 1440w"
        imageSizes="(min-width: 900px) 50vw, 100vw"
      />
      <link
        rel="preload"
        as="image"
        href="/images/responsive/equipment-hero-960w.webp"
        imageSrcSet="/images/responsive/equipment-hero-480w.webp 480w, /images/responsive/equipment-hero-960w.webp 960w, /images/responsive/equipment-hero-1440w.webp 1440w"
        imageSizes="(min-width: 900px) 50vw, 100vw"
      />
      <LocalBusinessJsonLd />
      <HomePageContent />
    </>
  );
}
