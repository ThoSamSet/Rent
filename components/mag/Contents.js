import Emph from '@/components/mag/Emph';
import Ledger from '@/components/mag/Ledger';
import Photo from '@/components/mag/Photo';

/**
 * Numbered table of contents with a photo panel.
 * @param {{
 *   id?: string;
 *   label: string;
 *   kicker: string;
 *   title: string;
 *   image: { src: string; alt: string };
 *   caption?: string;
 *   entries: { href: string; label: string; meta?: string; value?: string }[];
 *   tone?: 'paper' | 'ink' | 'dusk';
 * }} props
 */
export default function Contents({ id, label, kicker, title, image, caption, entries, tone = 'ink' }) {
  return (
    <section id={id} className={`contents tone-${tone}`} aria-label={label}>
      <Photo className="contents__media" src={image.src} alt={image.alt} caption={caption} />
      <div className="contents__sheet">
        <p className="kicker">{kicker}</p>
        <h2 className="contents__title">
          <Emph text={title} />
        </h2>
        <Ledger rows={entries.map((entry) => ({ ...entry, key: entry.href }))} label={label} />
      </div>
    </section>
  );
}
