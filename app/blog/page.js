import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'blog-index',
  path: '/blog',
  title: 'Blog',
  description:
    'Blog Camp Nhà Thỏ - chia sẻ trải nghiệm camping, mùa đẹp nhất trong năm và các chuyến đi đáng nhớ.',
  image: '/blog/checklistcampingnhatban/checklist-camping-hero.jpg',
});

export { metadata };
export default Page;
