import { BOOKING_SOCIAL } from '@/lib/booking/content';

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/** @param {{ variant?: 'send' | 'contact'; className?: string }} props */
export default function BookingSocialButtons({ variant = 'send', className = '' }) {
  const { tiktok, facebook } = BOOKING_SOCIAL;
  const tiktokLabel = variant === 'contact' ? tiktok.contactLabel : tiktok.label;
  const facebookLabel = variant === 'contact' ? facebook.contactLabel : facebook.label;

  return (
    <div className={`social-buttons ${className}`.trim()}>
      <a
        href={tiktok.href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn social-btn-tiktok"
      >
        <span className="social-btn-icon" aria-hidden="true">
          <TikTokIcon />
        </span>
        <span>{tiktokLabel}</span>
      </a>
      <a
        href={facebook.href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn social-btn-facebook"
      >
        <span className="social-btn-icon" aria-hidden="true">
          <FacebookIcon />
        </span>
        <span>{facebookLabel}</span>
      </a>
    </div>
  );
}
