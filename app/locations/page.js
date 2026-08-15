import LocationsPageContent from '@/components/pages/LocationsPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Vị trí camping Kanto - Phú Sĩ, Biển, Kanagawa',
  description:
    'Các vùng camping Camp Nhà Thỏ hay đưa khách quanh Kanto: Phú Sĩ, Biển, Kanagawa, Saitama và Bắc Kanto.',
  path: '/locations',
  image: '/images/location-hero.webp',
});

export default function LocationsPage() {
  return <LocationsPageContent />;
}
