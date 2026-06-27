import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'pricing',
  path: '/pricing',
  title: 'Chi phí Camping Phú Sĩ',
  description:
    'Bảng chi phí camping tại Camp Nhà Thỏ theo số người và plan (Hạt dẻ, Hạt bí, Hạt nho). Khu vực Tokyo, Saitama, Kanagawa.',
  image: '/images/camping-1.webp',
  scripts: ['/table-swipe-hint.js'],
});

export { metadata };
export default Page;
