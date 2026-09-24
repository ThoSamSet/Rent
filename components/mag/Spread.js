import Photo from '@/components/mag/Photo';

/**
 * Two-page spread: photo on one side, editorial page on the other.
 * @param {{
 *   id?: string;
 *   label: string;
 *   image: { src: string; alt: string };
 *   caption?: string;
 *   reverse?: boolean;
 *   tone?: 'paper' | 'ink' | 'dusk';
 *   children: import('react').ReactNode;
 * }} props
 */
export default function Spread({ id, label, image, caption, reverse = false, tone = 'paper', children }) {
  return (
    <section id={id} className={`spread tone-${tone}${reverse ? ' spread--reverse' : ''}`} aria-label={label}>
      <Photo className="spread__media" src={image.src} alt={image.alt} caption={caption} captionVertical />
      <div className="spread__page">{children}</div>
    </section>
  );
}
