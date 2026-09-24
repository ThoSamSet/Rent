'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';

function normalizePath(path) {
  if (!path) return '/';
  return path.replace(/\/$/, '') || '/';
}

export default function Masthead() {
  const pathname = normalizePath(usePathname());
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('site-index-open', open);
    if (!open) {
      return undefined;
    }

    panelRef.current?.querySelector('a')?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }
      const focusable = panelRef.current.querySelectorAll('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('site-index-open');
    };
  }, [open]);

  return (
    <header className="masthead">
      <a className="skip-link" href="#noi-dung">
        Bỏ qua đến nội dung
      </a>
      <div className="masthead__bar">
        <Link href="/" className="masthead__logo" aria-label="Camp Nhà Thỏ — trang chủ">
          <img
            className="masthead__logo-img"
            src="/images/LogoCampNhaThoBRAND.png"
            alt=""
            width="1386"
            height="921"
            fetchPriority="high"
          />
          <span className="visually-hidden">Camp Nhà Thỏ</span>
        </Link>
        <nav className="masthead__nav" aria-label="Điều hướng chính">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="masthead__actions">
          <Link href="/dat-lich" className="btn btn--solid masthead__cta">
            Đặt lịch
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="masthead__menu"
            id="mastheadMenuButton"
            aria-expanded={open}
            aria-controls="siteIndex"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Đóng' : 'Mục lục'}
          </button>
        </div>
      </div>

      <div className={`site-index tone-ink${open ? ' is-open' : ''}`} id="siteIndex" inert={!open} ref={panelRef}>
        <p className="kicker">Mục lục</p>
        <ol className="site-index__list">
          <li>
            <Link href="/">
              <span className="site-index__no">00</span>
              <span className="site-index__label">Trang bìa</span>
            </Link>
          </li>
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                <span className="site-index__no">{String(index + 1).padStart(2, '0')}</span>
                <span className="site-index__label">{link.label}</span>
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/dat-lich" className="btn btn--solid site-index__cta">
          Đặt lịch
        </Link>
      </div>
    </header>
  );
}
