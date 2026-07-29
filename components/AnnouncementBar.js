import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <Link href="/schedule" className="announcement-secondary">
        Kiểm tra lịch trình
        <span className="nav-promo-badge" aria-label="Có ngày giảm giá">
          Sale
        </span>
      </Link>
    </div>
  );
}
