/** Client-side reduced-motion check (SSR-safe). */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
