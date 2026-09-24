import Link from 'next/link';
import BlogArticleBody from '@/components/blog/BlogArticleBody';
import Continue from '@/components/mag/Continue';
import CtaBand from '@/components/mag/CtaBand';
import Photo from '@/components/mag/Photo';
import { BLOG_POSTS, getBlogPost, getOtherPosts } from '@/lib/blog/content';

/** @param {{ slug: string }} props */
export default function BlogArticlePageContent({ slug }) {
  const post = getBlogPost(slug);
  if (!post) return null;

  const number = String(BLOG_POSTS.findIndex((item) => item.slug === slug) + 1).padStart(2, '0');
  const hero = post.heroSlides[0];

  return (
    <main>
      <article className="article tone-paper">
        <header className="article__head wrap">
          <p className="article__folio">
            <Link href="/blog">Blog</Link>
            <span>Bài {number}</span>
          </p>
          <h1 className="article__title">{post.title}</h1>
          <p className="article__dek">{post.excerpt}</p>
        </header>
        <Photo className="article__hero" src={hero.src} alt={hero.alt} caption={hero.alt} priority />
        <div className="wrap">
          <BlogArticleBody html={post.bodyHtml} />
        </div>
      </article>

      <Continue
        title="Đọc thêm"
        items={getOtherPosts(slug).map((other) => ({
          href: other.href,
          meta: 'Blog',
          title: other.title,
          image: other.cardImage,
          alt: other.cardAlt,
        }))}
      />
      <CtaBand title="Sẵn sàng cho chuyến đầu tiên?" text="Không cần có đồ, không cần cọc. Chỉ cần chọn ngày." />
    </main>
  );
}
