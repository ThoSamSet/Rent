import { Be_Vietnam_Pro } from 'next/font/google';

/** UI and body text — Vietnamese diacritics. */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-be-vietnam-pro',
});
