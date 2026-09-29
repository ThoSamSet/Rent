import FilmGrid from '@/components/film/FilmGrid';
import FilmLogo from '@/components/brand/FilmLogo';
import { FILM_PHOTOS, FILM_TITLE } from '@/lib/film/content';

export default function FilmPageContent() {
  return (
    <main className="film tone-paper">
      <div className="wrap">
        <h1 className="film__title">
          <FilmLogo title={FILM_TITLE} />
        </h1>
        <FilmGrid photos={FILM_PHOTOS} />
      </div>
    </main>
  );
}
