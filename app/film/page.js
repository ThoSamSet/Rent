import FilmPageContent from '@/components/pages/FilmPageContent';
import { FILM_PHOTOS, FILM_TITLE } from '@/lib/film/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: FILM_TITLE,
  description: 'Những khoảnh khắc Camp Nhà Thỏ giữ lại sau mỗi chuyến đi — ảnh và chú thích.',
  path: '/film',
  image: FILM_PHOTOS[0].src,
});

export default function FilmPage() {
  return <FilmPageContent />;
}
