import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/calculator', '/Notes'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
