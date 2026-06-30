import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

/** @param {{ slides: { baseName: string; src: string; alt: string }[] }} props */
export default function BlogHeroSlideshow({ slides }) {
  if (!slides?.length) {
    return null;
  }

  return (
    <>
      <div className="home-hero__media home-hero__slideshow" data-hero-slideshow>
        {slides.map((slide, index) => (
          <div
            key={slide.baseName}
            className={`home-hero__slide${index === 0 ? ' is-active' : ''}`}
            aria-hidden={index === 0 ? undefined : true}
          >
            <ResponsiveImage
              src={slide.src}
              alt={slide.alt}
              className="home-hero__slide-img"
              width={IMAGE_DIMS.heroFull.width}
              height={IMAGE_DIMS.heroFull.height}
              priority={index === 0}
              eager={index > 0}
              decoding="sync"
            />
          </div>
        ))}
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
