import Link from 'next/link';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { BLOG_FEATURED, BLOG_STRIP } from '@/lib/home/content';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function HomeBlogSection() {
  return (
    <section className="home-section home-blog" id="blog" data-reveal aria-label="Blog">
      <div className="home-blog__header">
        <p className="home-section__label">Blog</p>
        <Link href="/blog" className="home-section__link">
          Tất cả bài viết
        </Link>
      </div>
      <Link href={BLOG_FEATURED.href} className="home-blog__featured">
        <figure className="home-blog__featured-media">
          <ResponsiveImage
            src={BLOG_FEATURED.src}
            alt={BLOG_FEATURED.alt}
            width={IMAGE_DIMS.blogFeatured.width}
            height={IMAGE_DIMS.blogFeatured.height}
          />
        </figure>
        <h2 className="home-blog__featured-title">{BLOG_FEATURED.title}</h2>
      </Link>
      <div className="home-blog__strip" tabIndex={0} aria-label="Bài viết khác — vuốt ngang">
        {BLOG_STRIP.map((post) => (
          <Link key={post.href} href={post.href} className="home-blog__strip-item">
            <ResponsiveImage
              src={post.src}
              alt={post.alt}
              width={IMAGE_DIMS.blogThumb.width}
              height={IMAGE_DIMS.blogThumb.height}
            />
            <span>{post.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
