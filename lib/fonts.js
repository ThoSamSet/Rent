import localFont from 'next/font/local';

/** Self-hosted Be Vietnam Pro — replaces CSS @import for zero layout shift. */
export const beVietnamPro = localFont({
  src: [
    {
      path: '../public/fonts/be-vietnam-pro-vietnamese-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-vietnamese-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-vietnamese-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-vietnamese-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/be-vietnam-pro-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  variable: '--font-be-vietnam-pro',
});
