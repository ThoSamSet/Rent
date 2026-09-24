import Link from 'next/link';

/** "Đọc tiếp" — three photo links to other pages. */
/** @param {{ items: { href: string; meta: string; title: string; image: string; alt: string }[]; title?: string }} props */
export default function Continue({ items, title = 'Đọc tiếp nhé' }) {
  return (
    <nav className="continue mag-section mag-section--tight tone-ink" aria-label={title}>
      <div className="wrap">
        <p className="kicker">{title}</p>
        <ul className="continue__list">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="continue__item">
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" width="800" height="600" />
                <span className="continue__meta">{item.meta}</span>
                <span className="continue__title">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
