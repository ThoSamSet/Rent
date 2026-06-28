import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

const DEFAULT_SIZES = '(min-width: 1286px) 300px, (min-width: 786px) 68vw, 75vw';

export default function EquipmentGalleryStrip({ images, ariaLabel }) {
  return (
    <div className="home-gallery__strip" tabIndex={0} aria-label={ariaLabel}>
      {images.map((image) => {
        const key = image.baseName || image.src;
        return (
          <figure key={key} className="home-gallery__item equipment-gallery__item">
            <div className="equipment-gallery__media">
              <ResponsiveImage
                src={image.src}
                srcSet={image.srcSet}
                sizes={image.sizes || DEFAULT_SIZES}
                alt={image.alt}
                width={image.width || IMAGE_DIMS.gallery.width}
                height={image.height || IMAGE_DIMS.gallery.height}
              />
            </div>
            <figcaption className="equipment-gallery__caption" aria-hidden={!image.caption && !image.note}>
              <p className="equipment-gallery__caption-text">
                {image.caption || null}
                {image.note ? (
                  <span className="equipment-gallery__note"> {image.note}</span>
                ) : null}
              </p>
            </figcaption>
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
        );
      })}
    </div>
  );
}
