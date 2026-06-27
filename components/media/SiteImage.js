'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

/**
 * Image with graceful fade-in and CLS-safe dimensions.
 */
export default function SiteImage({
  src,
  alt,
  width,
  height,
  className = '',
  id,
  priority = false,
  sizes,
  srcSet,
  decorative = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(priority);
  const altText = decorative ? '' : alt;
  const a11y = decorative ? { 'aria-hidden': true } : {};
  const fadeClass = `site-image--fade${loaded ? ' is-loaded' : ''}`;
  const mergedClass = [className, fadeClass].filter(Boolean).join(' ');

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const imgRef = useCallback(
    (node) => {
      if (node?.complete) {
        setLoaded(true);
      }
    },
    []
  );

  if (srcSet) {
    return (
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={altText}
        width={width}
        height={height}
        className={mergedClass}
        id={id}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        data-priority={priority ? 'true' : 'false'}
        onLoad={onLoad}
        {...a11y}
        {...rest}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={altText}
      width={width}
      height={height}
      className={mergedClass}
      id={id}
      priority={priority}
      sizes={sizes}
      unoptimized
      data-priority={priority ? 'true' : 'false'}
      onLoad={onLoad}
      {...a11y}
      {...rest}
    />
  );
}
