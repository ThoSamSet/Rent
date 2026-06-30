import BlogArticlePageContent from '@/components/pages/BlogArticlePageContent';
import { getBlogPost } from '@/lib/blog/content';
import { buildPageMetadata } from '@/lib/seo';

const post = getBlogPost('campingsakura2026');

export const metadata = buildPageMetadata({
  title: post.title,
  description: post.excerpt,
  path: post.href,
  image: post.cardImage,
});

export default function CampingSakuraPage() {
  return <BlogArticlePageContent slug="campingsakura2026" />;
}
