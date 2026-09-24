import { SCHEDULE_LEGEND_ITEMS } from '@/lib/schedule/content';
import { SCHEDULE_MONTHS } from '@/lib/schedule/months';

const PRESENT = new Set(SCHEDULE_MONTHS.flatMap((month) => month.rows.flat().flatMap((cell) => cell.className.split(' '))));

export default function ScheduleLegend() {
  return (
    <ul className="cal-legend" aria-label="Chú thích lịch">
      {SCHEDULE_LEGEND_ITEMS.filter((item) => PRESENT.has(item.match)).map((item) => (
        <li key={item.match}>
          <span className={`cal-legend__swatch cal-legend__swatch--${item.swatch}`} aria-hidden="true">
            {item.label}
          </span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
}
