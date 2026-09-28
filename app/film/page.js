import FilmPageContent from '@/components/pages/FilmPageContent';
import { FILM_COVER } from '@/lib/film/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Film — album ảnh và hậu trường',
  description:
    'Album ảnh theo mùa và nhật ký hậu trường của kênh YouTube Camp Nhà Thỏ.',
  path: '/film',
  image: FILM_COVER.image.src,
});

export default function FilmPage() {
  return <FilmPageContent />;
}
