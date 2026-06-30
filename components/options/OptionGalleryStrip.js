import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

const DEFAULT_SIZES = '(min-width: 1286px) 300px, (min-width: 786px) 68vw, 75vw';

export default function OptionGalleryStrip({ items, ariaLabel }) {
  return (
    <div className="home-gallery__strip" tabIndex={0} aria-label={ariaLabel}>
      {items.map((item) => (
        <figure key={item.id} className="home-gallery__item option-gallery__item">
          <div className="option-gallery__media">
            <ResponsiveImage
              src={item.src}
              srcSet={item.srcSet}
              sizes={item.sizes || DEFAULT_SIZES}
              alt={item.alt}
              width={item.width || IMAGE_DIMS.gallery.width}
              height={item.height || IMAGE_DIMS.gallery.height}
            />
          </div>
          <figcaption className="option-gallery__caption">
            <p className="option-gallery__title">{item.title}</p>
            <p className="option-gallery__price">{item.price}</p>
            {item.note ? <p className="option-gallery__note">{item.note}</p> : null}
            {item.features?.length ? (
              <ul className="option-gallery__features">
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : null}
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
      ))}
    </div>
  );
}
