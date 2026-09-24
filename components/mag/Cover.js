import Emph from '@/components/mag/Emph';
import Photo from '@/components/mag/Photo';

/**
 * Magazine cover for the top of each page.
 * @param {{
 *   label: string;
 *   folio: string[];
 *   kicker?: string;
 *   title: string[];
 *   deck?: string;
 *   image?: { src: string; alt: string };
 *   caption?: string;
 *   lines?: { href: string; label: string }[];
 *   tone?: 'paper' | 'ink' | 'dusk';
 *   short?: boolean;
 *   bleed?: boolean;
 *   children?: import('react').ReactNode;
 * }} props
 */
export default function Cover({
  label,
  folio,
  kicker,
  title,
  deck,
  image,
  caption,
  lines,
  tone = 'paper',
  short = true,
  bleed = false,
  children,
}) {
  const media = (
    <Photo className="cover__media" src={image?.src} alt={image?.alt} caption={caption} priority />
  );

  return (
    <section
      className={`cover tone-${tone}${short ? ' cover--short' : ''}${bleed ? ' cover--bleed' : ''}`}
      aria-label={label}
    >
      {bleed ? media : null}
      <header className="cover__folio">
        {folio.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </header>
      <div className="cover__stage">
        <div className="cover__type">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h1 className="cover__title">
            {title.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                <Emph text={line} />
              </span>
            ))}
          </h1>
          {deck ? (
            <p className="cover__deck">
              <Emph text={deck} />
            </p>
          ) : null}
          {children}
        </div>
        {bleed ? null : media}
      </div>
      {lines?.length ? (
        <nav className="cover__lines" aria-label="Trong trang này">
          {lines.map((line) => (
            <a key={line.href} href={line.href}>
              {line.label}
            </a>
          ))}
        </nav>
      ) : null}
    </section>
  );
}
