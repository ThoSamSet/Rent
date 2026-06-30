import BlogPageContent from '@/components/pages/BlogPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Blog',
  description:
    'Blog Camp Nhà Thỏ - chia sẻ trải nghiệm camping, mùa đẹp nhất trong năm và các chuyến đi đáng nhớ.',
  path: '/blog',
  image: '/blog/checklistcampingnhatban/checklist-camping-hero.jpg',
});

export default function BlogPage() {
  return <BlogPageContent />;
}
