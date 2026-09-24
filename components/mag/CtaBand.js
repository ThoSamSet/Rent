import Link from 'next/link';
import Emph, { plain } from '@/components/mag/Emph';
import Grain from '@/components/Grain';
import Ornament from '@/components/mag/Ornament';

/**
 * Closing call to action.
 * @param {{ title: string; text?: string; actions?: { href: string; label: string; primary?: boolean }[] }} props
 */
export default function CtaBand({
  title,
  text,
  actions = [
    { href: '/dat-lich', label: 'Đặt lịch', primary: true },
    { href: '/schedule', label: 'Xem lịch trống' },
  ],
}) {
  return (
    <section className="cta-band mag-section tone-dusk" aria-label={plain(title)}>
      <div className="cta-band__glow" aria-hidden="true" />
      <Grain opacity={0.3} />
      <div className="wrap">
        <Ornament variant="fire" className="cta-band__ornament" />
        <h2 className="cta-band__title">
          <Emph text={title} />
        </h2>
        {text ? <p className="cta-band__text">{text}</p> : null}
        <div className="actions">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className={`btn ${action.primary ? 'btn--solid' : 'btn--line'}`}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
