import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'locations',
  path: '/locations',
  title: 'Vị trí Camping Phú Sĩ - Fumotoppara & Koan',
  description:
    'Bãi camping đẹp tại Phú Sĩ: Fumotoppara và Koan. View núi Phú Sĩ tuyệt đẹp, không gian rộng rãi. Camp Nhà Thỏ hỗ trợ đưa đón đến các bãi camping này.',
  image: '/images/location-fumotoppara.jpg',
  scripts: ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', '/locations-map-sites.js'],
});

export { metadata };
export default Page;
