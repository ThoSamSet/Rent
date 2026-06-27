import { SITE_URL } from '@/lib/constants';
import { SITE_PAGES } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap() {
  const lastModified = new Date();

  return SITE_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === '/' ? '' : page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
