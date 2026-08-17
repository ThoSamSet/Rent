import Link from 'next/link';
import { HOME_NOTICES } from '@/lib/home/content';

export default function HomeNoticesSection() {
  return (
    <section className="home-section home-notices" id="notices" data-reveal aria-label="Thông báo">
      <div className="home-notices__header">
        <h2 className="home-section__title">Thông báo</h2>
      </div>
      <ul className="home-notices__list">
        {HOME_NOTICES.map((notice) => (
          <li key={`${notice.dateTime}-${notice.text}`} className="home-notices__item">
            <time className="home-notices__date" dateTime={notice.dateTime}>
              {notice.date}
            </time>
            <p className="home-notices__text">
              {notice.text}
              {notice.href ? (
                <Link href={notice.href} className="home-notices__link">
                  {notice.linkLabel}
                  <span aria-hidden="true"> →</span>
                </Link>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
