import Link from 'next/link';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

/** @param {{ posts: import('@/lib/blog/content').BLOG_POSTS }} props */
export default function BlogPostGrid({ posts }) {
  return (
    <section className="about-block blog-index home-section" data-reveal aria-label="Danh sách bài viết">
      <div className="about-block__header">
        <p className="home-section__label">Bài viết</p>
        <h2 className="home-section__title">Kinh nghiệm &amp; gợi ý camping</h2>
      </div>
      <div className="blog-post-grid">
        {posts.map((post) => (
          <Link key={post.slug} href={post.href} className="blog-post-card">
            <div className="blog-post-card__media">
              <ResponsiveImage
                src={post.cardImage}
                alt={post.cardAlt}
                width={IMAGE_DIMS.blogFeatured.width}
                height={IMAGE_DIMS.blogFeatured.height}
              />
            </div>
            <div className="blog-post-card__copy">
              <h3 className="blog-post-card__title">{post.title}</h3>
              <p className="blog-post-card__excerpt">{post.excerpt}</p>
              <span className="blog-post-card__link">Đọc bài viết →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
