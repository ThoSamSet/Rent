import Link from 'next/link';
import SiteImage from '@/components/media/SiteImage';
import PricingLineup from '@/components/PricingLineup';
import { IMAGE_DIMS } from '@/lib/image-sizes';

const GALLERY = [
  ['camping-1.webp', 'Camping Phú Sĩ - View núi Phú Sĩ tuyệt đẹp'],
  ['camping-2.webp', 'Chụp hình camping Phú Sĩ'],
  ['camping-3.webp', 'Bãi camping Phú Sĩ'],
  ['camping-4.webp', 'Camping view núi Phú Sĩ'],
  ['camping-5.webp', 'Chụp hình kỷ niệm camping Phú Sĩ'],
  ['camping-6.webp', 'Camping chill cảnh đẹp tại Phú Sĩ'],
];

export default function HomePageContent() {
  return (
    <>
      <div className="home-hero__scroll-hint" aria-label="Cuộn xuống để khám phá">
        <span className="home-hero__scroll-text" aria-hidden="true">
          Cuộn xuống
        </span>
        <span className="home-hero__scroll-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <main className="home-editorial">
        <section className="home-hero" aria-label="Camp Nhà Thỏ — trang chủ">
          <div className="home-hero__media parallax-wrap">
            <SiteImage
              src="/images/responsive/hero-camping-1280w.webp"
              srcSet="/images/responsive/hero-camping-640w.webp 640w, /images/responsive/hero-camping-1280w.webp 1280w, /images/responsive/hero-camping-1920w.webp 1920w"
              sizes="100vw"
              alt="Camping Phú Sĩ - Share đồ cắm trại, chụp hình chill cảnh đẹp Nhật Bản"
              id="heroImg"
              className="home-hero__img parallax-layer"
              width={IMAGE_DIMS.heroFull.width}
              height={IMAGE_DIMS.heroFull.height}
              priority
            />
          </div>
          <div className="home-hero__overlay">
            <p className="home-hero__label">Camp Nhà Thỏ</p>
            <h1 className="home-hero__title">Share đồ Camping</h1>
            <p className="home-hero__subtitle">Cùng đi — Cùng chill</p>
          </div>
        </section>

        <div className="home-intro-row">
          <Link href="/about" className="home-section home-about" id="about" data-reveal>
            <div className="home-about__media" aria-hidden="true">
              <SiteImage
                src="/images/responsive/about-hero-960w.webp"
                srcSet="/images/responsive/about-hero-480w.webp 480w, /images/responsive/about-hero-960w.webp 960w, /images/responsive/about-hero-1440w.webp 1440w"
                sizes="(min-width: 900px) 50vw, 100vw"
                alt=""
                decorative
                width={IMAGE_DIMS.heroHalf.width}
                height={IMAGE_DIMS.heroHalf.height}
              />
            </div>
            <div className="home-about__copy">
              <p className="home-section__label">Giới thiệu</p>
              <h2 className="home-section__title">Chuyến đi của bạn, nhịp chill của bạn</h2>
              <p className="home-section__teaser">Camping share — Cùng đi, cùng chill</p>
            </div>
          </Link>

          <Link href="/equipment" className="home-section home-equipment" id="equipment" data-reveal>
            <div className="home-equipment__media" aria-hidden="true">
              <SiteImage
                src="/images/responsive/equipment-hero-960w.webp"
                srcSet="/images/responsive/equipment-hero-480w.webp 480w, /images/responsive/equipment-hero-960w.webp 960w, /images/responsive/equipment-hero-1440w.webp 1440w"
                sizes="(min-width: 900px) 50vw, 100vw"
                alt=""
                decorative
                width={IMAGE_DIMS.heroHalf.width}
                height={IMAGE_DIMS.heroHalf.height}
              />
            </div>
            <div className="home-equipment__copy">
              <p className="home-section__label">Dụng cụ</p>
              <h2 className="home-section__title">Đầy đủ đồ camping chuyên nghiệp</h2>
              <span className="home-section__link">Xem dụng cụ</span>
            </div>
          </Link>
        </div>

        <PricingLineup />

        <section className="home-section home-blog" id="blog" data-reveal aria-label="Blog">
          <div className="home-blog__header">
            <p className="home-section__label">Blog</p>
            <Link href="/blog" className="home-section__link">
              Tất cả bài viết
            </Link>
          </div>
          <Link href="/blog/checklistcampingnhatban" className="home-blog__featured">
            <figure className="home-blog__featured-media">
              <SiteImage
                src="/blog/checklistcampingnhatban/checklist-camping-hero.jpg"
                alt="Checklist cơ bản cho người mới đi camping ở Nhật"
                width={IMAGE_DIMS.blogFeatured.width}
                height={IMAGE_DIMS.blogFeatured.height}
              />
            </figure>
            <h2 className="home-blog__featured-title">Lần đầu đi camping ở Nhật cần chuẩn bị gì?</h2>
          </Link>
          <div className="home-blog__strip" tabIndex={0} aria-label="Bài viết khác — vuốt ngang">
            <Link href="/blog/campingsakura2026" className="home-blog__strip-item">
              <SiteImage
                src="/blog/campingsakura2026/sakura-hero.jpg"
                alt="Camping mùa Sakura ở Nhật"
                width={IMAGE_DIMS.blogThumb.width}
                height={IMAGE_DIMS.blogThumb.height}
              />
              <span>Camping mùa Sakura ở Nhật</span>
            </Link>
            <Link href="/blog/campingnhatban" className="home-blog__strip-item">
              <SiteImage
                src="/blog/campingnhatban/campingnhatban-hero.jpg"
                alt="Camping ở Nhật cho người mới"
                width={IMAGE_DIMS.blogThumb.width}
                height={IMAGE_DIMS.blogThumb.height}
              />
              <span>Camping ở Nhật cho người mới</span>
            </Link>
          </div>
        </section>

        <section className="home-section home-gallery" id="gallery" data-reveal aria-label="Gallery">
          <div className="home-gallery__header">
            <p className="home-section__label">Gallery</p>
          </div>
          <div className="home-gallery__strip" tabIndex={0} aria-label="Ảnh camping Phú Sĩ — vuốt ngang để xem thêm">
            {GALLERY.map(([file, alt]) => (
              <figure key={file} className="home-gallery__item">
                <SiteImage
                  src={`/images/${file}`}
                  alt={alt}
                  width={IMAGE_DIMS.gallery.width}
                  height={IMAGE_DIMS.gallery.height}
                />
                <SiteImage
                  src="/images/logoTrongSuot1-512x256.png"
                  srcSet="/images/logoTrongSuot1-512x256.png 512w, /images/logoTrongSuot1-1024x512.png 1024w"
                  sizes="(min-width: 1286px) 120px, (min-width: 786px) 9.33vw, 73px"
                  alt=""
                  decorative
                  className="home-gallery__brand"
                  width={IMAGE_DIMS.logoBrand.width}
                  height={IMAGE_DIMS.logoBrand.height}
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="home-section home-bottom" data-reveal>
          <Link href="/locations" className="home-map" id="locations">
            <div className="home-map__media">
              <div id="mapPreview" role="img" aria-label="Bản đồ bãi camping quanh Phú Sĩ và Kanto" />
            </div>
            <div className="home-map__copy">
              <p className="home-section__label">Vị trí</p>
              <h2 className="home-section__title">Bản đồ các bãi camping</h2>
            </div>
          </Link>
          <Link href="/faq" className="home-faq">
            <div className="home-faq__media">
              <SiteImage
                src="/images/camping-5.webp"
                alt="FAQ — câu hỏi thường gặp"
                width={IMAGE_DIMS.faqTile.width}
                height={IMAGE_DIMS.faqTile.height}
              />
            </div>
            <div className="home-faq__copy">
              <p className="home-section__label">FAQ</p>
              <h2 className="home-section__title">Các câu hỏi thường gặp</h2>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
