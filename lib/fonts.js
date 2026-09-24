import { Be_Vietnam_Pro, Fraunces } from 'next/font/google';

/** Variable serif for headings. opsz = optical size; SOFT and WONK give the italic its hand-drawn lean. */
export const fraunces = Fraunces({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-fraunces',
});

/** UI and body text — Vietnamese diacritics. */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: true,
  variable: '--font-be-vietnam-pro',
});
