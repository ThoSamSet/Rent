import { SCHEDULE_LEGEND_ITEMS } from '@/lib/schedule/content';

function LegendDescription({ item }) {
  if (item.swatchClass === 'legend-available') {
    return (
      <>
        <strong>{item.label}</strong> = còn slot — <strong>Chạm để đặt</strong> hoặc nhắn inbox
      </>
    );
  }

  return (
    <>
      <strong>{item.label}</strong> — {item.description}
    </>
  );
}

export default function ScheduleLegend() {
  return (
    <section className="about-block schedule-legend-block home-section" data-reveal aria-label="Chú thích lịch trình">
      <div className="about-block__header">
        <p className="home-section__label">Hướng dẫn</p>
        <h2 className="home-section__title">Chú thích lịch</h2>
      </div>

      <div className="schedule-legend" aria-label="Chú thích lịch trình">
        <ul className="schedule-legend-list">
          {SCHEDULE_LEGEND_ITEMS.map((item) => (
            <li key={item.swatchClass}>
              <span className={`legend-swatch ${item.swatchClass}`} aria-hidden="true">
                {item.swatchLabel}
              </span>
              <span>
                <LegendDescription item={item} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
