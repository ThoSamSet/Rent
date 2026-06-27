import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'schedule',
  path: '/schedule',
  title: 'Lịch trình Camping',
  description:
    'Lịch trình camping mới nhất tại Camp Nhà Thỏ. Theo dõi lịch trống, lịch plan và ngày hoạt động trong các tháng sắp tới.',
  image: '/images/camping-2.webp',
  scripts: ['/table-swipe-hint.js', '/booking-calendar.js'],
});

export { metadata };
export default Page;
