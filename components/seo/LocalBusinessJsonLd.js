import { SITE_URL } from '@/lib/constants';

const LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Camp Nhà Thỏ',
  description:
    'Dịch vụ share và cho thuê đồ cắm trại tại Phú Sĩ, Nhật Bản. Hỗ trợ đưa đón, setup lều, chụp hình kỷ niệm.',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/hero-camping.webp`,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Shizuoka',
    addressCountry: 'JP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '35.3994331',
    longitude: '138.5648368',
  },
  areaServed: {
    '@type': 'City',
    name: 'Phú Sĩ',
  },
  serviceType: ['Cho thuê đồ camping', 'Share đồ cắm trại', 'Chụp hình kỷ niệm', 'Tour camping'],
  priceRange: '$$',
};

export default function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS) }}
    />
  );
}
