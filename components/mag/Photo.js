import Grain from '@/components/Grain';

/**
 * Full-bleed photo frame: cover-fit image, film grain, optional caption.
 * @param {{ src?: string; alt?: string; caption?: string; captionVertical?: boolean; className?: string; priority?: boolean; grain?: number; children?: import('react').ReactNode }} props
 */
export default function Photo({
  src,
  alt = '',
  caption,
  captionVertical = false,
  className = '',
  priority = false,
  grain = 0.34,
  children,
}) {
  return (
    <figure className={`photo ${className}`.trim()}>
      {children}
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          width="1200"
          height="900"
        />
      ) : null}
      <Grain opacity={grain} />
      {caption ? (
        <figcaption className={`caption${captionVertical ? ' caption--vertical' : ''}`}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
