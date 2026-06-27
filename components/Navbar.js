import Link from 'next/link';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar({ currentPath }) {
  return (
    <nav className="navbar" aria-label="Thanh điều hướng chính">
      <div className="nav-container">
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ResponsiveImage
            src="/images/LogoCampNhaThoBRAND.png"
            alt="Camp Nhà Thỏ"
            className="nav-logo-img"
            width={IMAGE_DIMS.logoNav.width}
            height={IMAGE_DIMS.logoNav.height}
            priority
          />
        </Link>
        <div className="nav-actions">
          <Link href="/dat-lich" className="nav-cta">
            Đặt lịch
          </Link>
          <button
            type="button"
            className="burger-menu"
            id="burgerMenu"
            aria-expanded="false"
            aria-controls="navMenuPanel"
            aria-label="Mở menu điều hướng"
          >
            <span className="burger-menu__line" aria-hidden="true" />
            <span className="burger-menu__line" aria-hidden="true" />
            <span className="burger-menu__line" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="nav-menu" id="navMenu" inert>
        <button type="button" className="nav-menu__backdrop" id="navMenuBackdrop" aria-label="Đóng menu" />
        <div className="nav-menu__panel" id="navMenuPanel">
          <div className="nav-links" id="navLinks">
            {NAV_LINKS.map(({ href, label }) => {
              const normalized = href.replace(/\/$/, '') || '/';
              const active = currentPath === normalized || currentPath === href;
              return (
                <Link key={href} href={href} aria-current={active ? 'page' : undefined}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
