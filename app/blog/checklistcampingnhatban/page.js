import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'blog-checklistcampingnhatban',
  path: '/blog/checklistcampingnhatban',
  title: 'Lần đầu đi camping ở Nhật cần chuẩn bị gì? Checklist cơ bản cho người mới',
  description:
    'Checklist cơ bản cho người mới đi camping ở Nhật: trang phục, giày dép, đồ cá nhân, đồ ăn và lời khuyên thực tế để chuẩn bị nhẹ nhàng hơn.',
  image: '/blog/checklistcampingnhatban/checklist-camping-hero.jpg',
});

export { metadata };
export default Page;
