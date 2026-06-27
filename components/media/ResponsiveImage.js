/**
 * Server-rendered image with srcSet/sizes — no client hydration.
 */
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  id,
  priority = false,
  eager = false,
  sizes,
  srcSet,
  decorative = false,
  ...rest
}) {
  const altText = decorative ? '' : alt;
  const a11y = decorative ? { 'aria-hidden': true } : {};
  const loadEager = priority || eager;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={altText}
      width={width}
      height={height}
      className={className}
      id={id}
      loading={loadEager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...a11y}
      {...rest}
    />
  );
}
