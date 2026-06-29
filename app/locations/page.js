import LocationsPageContent from '@/components/pages/LocationsPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Vị trí Camping Phú Sĩ - Fumotoppara & Koan',
  description:
    'Bãi camping đẹp tại Phú Sĩ: Fumotoppara và Koan. View núi Phú Sĩ tuyệt đẹp, không gian rộng rãi. Camp Nhà Thỏ hỗ trợ đưa đón đến các bãi camping này.',
  path: '/locations',
  image: '/images/location-hero.webp',
});

export default function LocationsPage() {
  return <LocationsPageContent />;
}
