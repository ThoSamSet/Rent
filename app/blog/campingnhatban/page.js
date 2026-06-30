import BlogArticlePageContent from '@/components/pages/BlogArticlePageContent';
import { getBlogPost } from '@/lib/blog/content';
import { buildPageMetadata } from '@/lib/seo';

const post = getBlogPost('campingnhatban');

export const metadata = buildPageMetadata({
  title: post.title,
  description: post.excerpt,
  path: post.href,
  image: post.cardImage,
});

export default function CampingNhatBanPage() {
  return <BlogArticlePageContent slug="campingnhatban" />;
}
