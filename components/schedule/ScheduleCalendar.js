import {
  SCHEDULE_EARLY_BANNER,
  SCHEDULE_LAST_UPDATED,
  SCHEDULE_LEGEND_ITEMS,
} from '@/lib/schedule/content';
import { SCHEDULE_MONTHS_HTML } from '@/lib/schedule/calendar-months';

export default function ScheduleCalendar() {
  return (
    <section
      className="about-block schedule-calendar home-section"
      data-reveal
      aria-label="Lịch camping theo tháng"
      id="schedule"
    >
      <div className="about-block__header">
        <p className="home-section__label">Lịch trống</p>
        <h2 className="home-section__title">Lịch theo tháng</h2>
        <p className="schedule-last-updated">Cập nhật lần cuối: {SCHEDULE_LAST_UPDATED}</p>
      </div>

      <div className="schedule-early-banner">
        <p>
          <strong>{SCHEDULE_EARLY_BANNER.lead}</strong> {SCHEDULE_EARLY_BANNER.text}
        </p>
        <p className="schedule-early-note">{SCHEDULE_EARLY_BANNER.note}</p>
      </div>

      {SCHEDULE_MONTHS_HTML.map((monthHtml, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: monthHtml }} />
      ))}
    </section>
  );
}
