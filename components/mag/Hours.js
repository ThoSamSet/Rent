import Emph from '@/components/mag/Emph';
import Ornament from '@/components/mag/Ornament';

/**
 * A night at camp told hour by hour, over a sky that turns from afternoon to dawn.
 * @param {{
 *   id?: string;
 *   label: string;
 *   kicker: string;
 *   title: string;
 *   lead?: string;
 *   hours: { time: string; title: string; text: string }[];
 * }} props
 */
export default function Hours({ id, label, kicker, title, lead, hours }) {
  return (
    <section id={id} className="hours mag-section" aria-label={label}>
      <div className="hours__sky" aria-hidden="true" />
      <div className="wrap hours__head">
        <p className="kicker">{kicker}</p>
        <h2 className="hours__title">
          <Emph text={title} />
        </h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      <ol className="wrap hours__list">
        {hours.map((hour) => (
          <li key={hour.time} className="hour">
            <span className="hour__time">{hour.time}</span>
            <h3 className="hour__title">{hour.title}</h3>
            <p className="hour__text">{hour.text}</p>
          </li>
        ))}
      </ol>
      <div className="wrap hours__foot">
        <Ornament variant="stars" />
      </div>
    </section>
  );
}
