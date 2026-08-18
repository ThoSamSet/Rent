import Link from 'next/link';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function HomeIntroRow() {
  return (
    <div className="home-intro-row">
      <Link href="/about" className="home-section home-about" id="about" data-reveal>
        <div className="home-about__media" aria-hidden="true">
          <ResponsiveImage
            src="/images/about-hero.webp"
            alt=""
            decorative
            eager
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
          <ResponsiveImage
            src="/images/equipment-hero.webp"
            alt=""
            decorative
            eager
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
  );
}
