import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'blog-campingsakura2026',
  path: '/blog/campingsakura2026',
  title: 'Camping mùa Sakura ở Nhật – Khi hoa anh đào gặp những đêm lều yên tĩnh',
  description:
    'Camping mùa Sakura ở Nhật mang đến trải nghiệm chậm rãi, yên tĩnh và gần gũi thiên nhiên. Gợi ý thời điểm lý tưởng và mở đăng ký lịch camping Sakura 2026.',
  image: '/blog/campingsakura2026/sakura-hero.jpg',
});

export { metadata };
export default Page;
