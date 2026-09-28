import Link from 'next/link';
import BlogArticleBody from '@/components/blog/BlogArticleBody';
import Continue from '@/components/mag/Continue';
import CtaBand from '@/components/mag/CtaBand';
import Photo from '@/components/mag/Photo';
import { FILM_LOGS, getFilmLog } from '@/lib/film/content';

/** @param {{ slug: string }} props */
export default function FilmLogPageContent({ slug }) {
  const log = getFilmLog(slug);
  if (!log) return null;

  const number = String(FILM_LOGS.findIndex((item) => item.slug === slug) + 1).padStart(2, '0');
  const others = FILM_LOGS.filter((item) => item.slug !== slug);

  return (
    <main>
      <article className="article tone-paper">
        <header className="article__head wrap">
          <p className="article__folio">
            <Link href="/film">Film</Link>
            <span>Nhật ký {number}</span>
          </p>
          <h1 className="article__title">{log.title}</h1>
          <p className="article__dek">{log.excerpt}</p>
          <p>
            <a className="btn btn--solid" href={log.youtubeUrl} target="_blank" rel="noopener noreferrer">
              Xem trên YouTube
            </a>
          </p>
        </header>
        <Photo className="article__hero" src={log.cardImage} alt={log.cardAlt} caption={log.cardAlt} priority />
        <div className="wrap">
          <BlogArticleBody html={log.bodyHtml} />
        </div>
      </article>

      {others.length ? (
        <Continue
          title="Xem thêm"
          items={others.map((other) => ({
            href: other.href,
            meta: 'Film',
            title: other.title,
            image: other.cardImage,
            alt: other.cardAlt,
          }))}
        />
      ) : null}
      <CtaBand title="Sẵn sàng cho chuyến đầu tiên?" text="Không cần có đồ, không cần cọc. Chỉ cần chọn ngày." />
    </main>
  );
}
