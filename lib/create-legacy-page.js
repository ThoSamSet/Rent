import StandardLayout from '@/layouts/StandardLayout';
import LegacyMainContent from '@/components/LegacyMainContent';
import { LEGACY_PAGES } from '@/lib/legacy-content';
import { buildPageMetadata } from '@/lib/seo';

/**
 * Factory for Priority 2 pages backed by extracted legacy HTML.
 */
export function createLegacyPage({
  slug,
  path,
  title,
  description,
  image,
  scripts = [],
  noIndex = false,
  mainClassName = '',
}) {
  return {
    metadata: buildPageMetadata({ title, description, path, image, noIndex }),
    Page() {
      const { content, inlineStyles } = LEGACY_PAGES[slug];
      return (
        <StandardLayout scripts={scripts}>
          <LegacyMainContent html={content} inlineStyles={inlineStyles} mainClassName={mainClassName} />
        </StandardLayout>
      );
    },
  };
}
