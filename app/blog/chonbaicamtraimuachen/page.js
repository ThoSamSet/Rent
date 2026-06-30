import BlogArticlePageContent from '@/components/pages/BlogArticlePageContent';
import { getBlogPost } from '@/lib/blog/content';
import { buildPageMetadata } from '@/lib/seo';

const post = getBlogPost('chonbaicamtraimuachen');

export const metadata = buildPageMetadata({
  title: post.title,
  description: post.excerpt,
  path: post.href,
  image: post.cardImage,
});

export default function ChonBaiCampMuaHePage() {
  return <BlogArticlePageContent slug="chonbaicamtraimuachen" />;
}
