import ResponsiveImage from '@/components/media/ResponsiveImage';
import { GALLERY, GALLERY_WIDTHS } from '@/lib/home/content';
import { buildSrcSet, responsiveSrc } from '@/lib/media/responsive';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function HomeGallerySection() {
  return (
    <section className="home-section home-gallery" id="gallery" data-reveal aria-label="Gallery">
      <div className="home-gallery__header">
        <p className="home-section__label">Gallery</p>
      </div>
      <div className="home-gallery__strip" tabIndex={0} aria-label="Ảnh camping Phú Sĩ — vuốt ngang để xem thêm">
        {GALLERY.map(({ baseName, alt }) => (
          <figure key={baseName} className="home-gallery__item">
            <ResponsiveImage
              src={responsiveSrc(baseName, 800)}
              srcSet={buildSrcSet(baseName, GALLERY_WIDTHS)}
              sizes="(min-width: 1286px) 300px, (min-width: 786px) 68vw, 75vw"
              alt={alt}
              width={IMAGE_DIMS.gallery.width}
              height={IMAGE_DIMS.gallery.height}
            />
            <ResponsiveImage
              src="/images/logoTrongSuot1-512x256.png"
              srcSet="/images/logoTrongSuot1-512x256.png 1996w"
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
  );
}
