'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ContactRedirect() {
  useEffect(() => {
    window.location.replace('/dat-lich#lien-he');
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <p>
        Đang chuyển đến trang đặt lịch &amp; liên hệ…{' '}
        <Link href="/dat-lich#lien-he">Nhấn vào đây</Link> nếu không tự chuyển.
      </p>
    </main>
  );
}
