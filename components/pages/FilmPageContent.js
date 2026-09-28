import { FILM_PHOTOS, FILM_TITLE } from '@/lib/film/content';

export default function FilmPageContent() {
  return (
    <main className="film tone-paper">
      <div className="wrap">
        <h1 className="film__title">{FILM_TITLE}</h1>
        <ul className="film-grid">
          {FILM_PHOTOS.map((photo, index) => (
            <li key={photo.src} className="film-grid__item">
              <figure>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  width="1600"
                  height="900"
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
