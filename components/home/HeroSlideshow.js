import ResponsiveImage from '@/components/media/ResponsiveImage';
import { buildSrcSet, responsiveSrc } from '@/lib/media/responsive';
import { IMAGE_DIMS } from '@/lib/image-sizes';

/** @param {{ slides: import('@/lib/hero/slides').HeroSlide[] }} props */
export default function HeroSlideshow({ slides }) {
  if (!slides?.length) {
    return null;
  }

  return (
    <>
      <div className="home-hero__media parallax-wrap home-hero__slideshow" data-hero-slideshow>
        {slides.map(({ baseName, widths, alt }, index) => {
          const defaultWidth = widths[Math.min(1, widths.length - 1)];
          return (
            <div key={baseName} className="home-hero__slide" aria-hidden={index === 0 ? undefined : true}>
              <ResponsiveImage
                src={responsiveSrc(baseName, defaultWidth)}
                srcSet={buildSrcSet(baseName, widths)}
                sizes="100vw"
                alt={alt}
                className="home-hero__slide-img parallax-layer"
                width={IMAGE_DIMS.heroFull.width}
                height={IMAGE_DIMS.heroFull.height}
                priority={index === 0}
                eager={index === 1}
              />
            </div>
          );
        })}
      </div>
      {slides.length > 1 && (
        <div className="home-hero__dots" aria-hidden="true">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`home-hero__dot${index === 0 ? ' is-active' : ''}`}
              data-slide-index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
