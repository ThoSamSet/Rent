import BlogPageContent from '@/components/pages/BlogPageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Blog — ghi chép ngoài trời',
  description:
    'Kinh nghiệm camping cho người mới, mùa đẹp trong năm và những đêm ở bãi — từ Camp Nhà Thỏ.',
  path: '/blog',
  image: '/blog/checklistcampingnhatban/checklist-camping-hero.jpg',
});

export default function BlogPage() {
  return <BlogPageContent />;
}
