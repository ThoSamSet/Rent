'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';
import { NAV_LINKS } from '@/lib/constants';

function normalizePath(path) {
  if (!path) return '/';
  const normalized = path.replace(/\/$/, '') || '/';
  return normalized === '' ? '/' : normalized;
}

export default function SiteHeader() {
  const pathname = normalizePath(usePathname());

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
      return undefined;
    }

    navbar.classList.add('navbar--ready');

    const onScroll = () => {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 40);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      navbar.classList.remove('navbar--ready', 'navbar--scrolled');
    };
  }, []);

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <Link href="/schedule" className="announcement-secondary">
          Kiểm tra lịch trình
        </Link>
      </div>
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
            <Link href="/dat-lich" className="nav-cta hue-cta hue-cta--warm">
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
                const normalized = normalizePath(href);
                const active = pathname === normalized || pathname === href;
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
    </header>
  );
}
