import { SITE_URL } from '@/lib/constants';

export const DEFAULT_OG_IMAGE = '/images/hero-camping.webp';

/** Routes included in sitemap.xml */
export const SITE_PAGES = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/equipment', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/options', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/schedule', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/dat-lich', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/locations', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/blog/checklistcampingnhatban', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/campingnhatban', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/campingsakura2026', changeFrequency: 'monthly', priority: 0.7 },
];

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} opts.path - pathname e.g. `/about`
 * @param {string} [opts.image]
 * @param {boolean} [opts.noIndex]
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url,
      title,
      description,
      siteName: 'Camp Nhà Thỏ',
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : { robots: { index: true, follow: true } }),
  };
}
