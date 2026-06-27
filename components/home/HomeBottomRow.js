import Link from 'next/link';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function HomeBottomRow() {
  return (
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
          <ResponsiveImage
            src="/images/camping-6.webp"
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
  );
}
