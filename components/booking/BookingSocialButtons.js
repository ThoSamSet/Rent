import { BOOKING_SOCIAL } from '@/lib/booking/content';
import { FacebookIcon, TikTokIcon } from '@/components/icons/SocialIcons';

/** @param {{ variant?: 'send' | 'contact'; className?: string }} props */
export default function BookingSocialButtons({ variant = 'send', className = '' }) {
  const { tiktok, facebook } = BOOKING_SOCIAL;
  const tiktokLabel = variant === 'contact' ? tiktok.contactLabel : tiktok.label;
  const facebookLabel = variant === 'contact' ? facebook.contactLabel : facebook.label;

  return (
    <div className={`social-buttons ${className}`.trim()}>
      <a href={tiktok.href} target="_blank" rel="noopener noreferrer" className="btn btn--line social-btn">
        <TikTokIcon />
        <span>{tiktokLabel}</span>
      </a>
      <a href={facebook.href} target="_blank" rel="noopener noreferrer" className="btn btn--line social-btn">
        <FacebookIcon />
        <span>{facebookLabel}</span>
      </a>
    </div>
  );
}
