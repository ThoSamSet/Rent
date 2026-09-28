import { Be_Vietnam_Pro, Urbanist } from 'next/font/google';

/** UI and body text — Vietnamese diacritics. */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-be-vietnam-pro',
});

/** Brand wordmark "//. Camp Nhà Thỏ" (logo file: Urbanist Bold). It has no "ỏ"; that letter falls back to Be Vietnam Pro. */
export const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  preload: false,
  // No Arial stand-in: the missing "ỏ" should come from Be Vietnam Pro, next in the font stack.
  adjustFontFallback: false,
  variable: '--font-urbanist',
});
