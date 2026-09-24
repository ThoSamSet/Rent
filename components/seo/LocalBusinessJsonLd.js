import { SITE_URL } from '@/lib/constants';

const LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Camp Nhà Thỏ',
  description:
    'Share đồ camping, đưa đón từ Tokyo, Saitama, Kanagawa và dựng trại sẵn tại các bãi quanh Phú Sĩ và Kanto.',
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
  serviceType: ['Share đồ camping', 'Đưa đón camping', 'Dựng trại', 'Chụp hình kỷ niệm'],
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
