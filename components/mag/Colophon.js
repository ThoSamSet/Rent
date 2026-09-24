import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { SOCIAL_LINKS } from '@/lib/social';
import { SOCIAL_ICONS } from '@/components/icons/SocialIcons';

export default function Colophon() {
  return (
    <footer className="colophon tone-ink">
      <div className="wrap colophon__grid">
        <div>
          <p className="colophon__name">Camp Nhà Thỏ</p>
          <p className="colophon__line">Share đồ camping, đi riêng từng nhóm, quanh Kanto.<br />Hẹn gặp bạn bên lửa.</p>
          <Link href="/dat-lich" className="btn btn--solid colophon__cta">
            Đặt lịch
          </Link>
        </div>
        <nav aria-label="Mục lục cuối trang">
          <p className="kicker">Mục lục</p>
          <ul className="colophon__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Mạng xã hội">
          <p className="kicker">Theo dõi</p>
          <ul className="colophon__social">
            {SOCIAL_LINKS.map((item) => {
              const Icon = SOCIAL_ICONS[item.id];
              return (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <Icon />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <p className="wrap colophon__legal">© 2026 Camp Nhà Thỏ. All rights reserved.</p>
    </footer>
  );
}
