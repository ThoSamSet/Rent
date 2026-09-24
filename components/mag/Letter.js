import Ornament from '@/components/mag/Ornament';

/**
 * A short handwritten-feeling note from the team, set in soft italic.
 * @param {{ label: string; greeting?: string; paragraphs: string[]; signature: string; tone?: 'paper' | 'ink' | 'dusk' }} props
 */
export default function Letter({ label, greeting, paragraphs, signature, tone = 'paper' }) {
  return (
    <section className={`letter mag-section tone-${tone}`} aria-label={label}>
      <div className="wrap letter__sheet">
        <Ornament variant="ridge" className="letter__ornament" />
        {greeting ? <p className="letter__greeting">{greeting}</p> : null}
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="letter__body">
            {paragraph}
          </p>
        ))}
        <p className="letter__signature">{signature}</p>
      </div>
    </section>
  );
}
