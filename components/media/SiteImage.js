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
  eager = false,
  sizes,
  srcSet,
  decorative = false,
  noFade = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(priority || noFade);
  const altText = decorative ? '' : alt;
  const a11y = decorative ? { 'aria-hidden': true } : {};
  const fadeClass = noFade ? '' : `site-image--fade${loaded ? ' is-loaded' : ''}`;
  const mergedClass = [className, fadeClass].filter(Boolean).join(' ');
  const loadEager = priority || eager;

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
        loading={loadEager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : eager ? 'low' : 'auto'}
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
      loading={loadEager ? 'eager' : undefined}
      sizes={sizes}
      unoptimized
      data-priority={priority ? 'true' : 'false'}
      onLoad={onLoad}
      {...a11y}
      {...rest}
    />
  );
}
