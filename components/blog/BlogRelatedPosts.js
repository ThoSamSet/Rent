import Link from 'next/link';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

/** @param {{ posts: { slug: string; href: string; title: string; cardImage: string; cardAlt: string }[] }} props */
export default function BlogRelatedPosts({ posts }) {
  if (!posts.length) return null;

  return (
    <section className="blog-related home-section" data-reveal aria-label="Đọc thêm">
      <div className="about-block__header">
        <p className="home-section__label">Đọc thêm</p>
        <h2 className="home-section__title">Bài viết khác</h2>
      </div>
      <div className="blog-related__grid">
        {posts.map((post) => (
          <Link key={post.slug} href={post.href} className="blog-related__card">
            <div className="blog-related__media">
              <ResponsiveImage
                src={post.cardImage}
                alt={post.cardAlt}
                width={IMAGE_DIMS.blogThumb.width}
                height={IMAGE_DIMS.blogThumb.height}
              />
            </div>
            <span className="blog-related__title">{post.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
