import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'blog-campingnhatban',
  path: '/blog/campingnhatban',
  title: 'Camping ở Nhật có khó không? Hướng dẫn cơ bản cho người mới bắt đầu',
  description:
    'Camping ở Nhật có khó không? Bài viết hướng dẫn cơ bản cho người mới: sự khác biệt, chuẩn bị, lựa chọn bãi camping và kinh nghiệm đi lần đầu.',
  image: '/blog/campingnhatban/campingnhatban-hero.jpg',
});

export { metadata };
export default Page;
