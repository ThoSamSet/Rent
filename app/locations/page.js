import LocationsPageContent from '@/components/pages/LocationsPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Bãi cắm trại — 15 bãi quanh Kanto',
  description:
    'Những bãi Camp Nhà Thỏ hay đưa khách tới: Phú Sĩ, ven biển, Kanagawa, Saitama và Bắc Kanto.',
  path: '/locations',
  image: '/images/location-hero.webp',
});

export default function LocationsPage() {
  return <LocationsPageContent />;
}
