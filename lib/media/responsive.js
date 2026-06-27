/** Build srcSet string for /images/responsive/{baseName}-{width}w.{ext} */
export function buildSrcSet(baseName, widths, ext = 'webp') {
  return widths.map((w) => `/images/responsive/${baseName}-${w}w.${ext} ${w}w`).join(', ');
}

/** Default src for a responsive variant (typically largest or middle width). */
export function responsiveSrc(baseName, width, ext = 'webp') {
  return `/images/responsive/${baseName}-${width}w.${ext}`;
}
