import FilmLogPageContent from '@/components/pages/FilmLogPageContent';
import { FILM_LOGS, getFilmLog } from '@/lib/film/content';
import { buildPageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return FILM_LOGS.map((log) => ({ slug: log.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const log = getFilmLog(slug);
  return buildPageMetadata({
    title: log.title,
    description: log.excerpt,
    path: log.href,
    image: log.cardImage,
  });
}

export default async function FilmLogPage({ params }) {
  const { slug } = await params;
  return <FilmLogPageContent slug={slug} />;
}
