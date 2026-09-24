import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import SectionHead from '@/components/mag/SectionHead';
import Steps from '@/components/mag/Steps';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar';
import ScheduleLegend from '@/components/schedule/ScheduleLegend';
import { SCHEDULE_BOOKING_STEPS, SCHEDULE_COVER, SCHEDULE_NOTE } from '@/lib/schedule/content';
import { pickContinue } from '@/lib/site/continue';
import { OPEN_DAYS, SCHEDULE_RANGE, UPDATED_LABEL, folioFor } from '@/lib/site/issue';

export default function SchedulePageContent() {
  return (
    <main>
      <Cover
        label="Lịch trống của Camp Nhà Thỏ"
        folio={folioFor('Lịch trống')}
        kicker={SCHEDULE_COVER.kicker}
        title={SCHEDULE_COVER.title}
        deck={SCHEDULE_COVER.deck}
        image={{ src: '/images/subBanner-lich-trinh.webp', alt: 'Ba tượng thỏ nhỏ trên bàn gỗ ở trại' }}
        caption={`Ba chú thỏ canh lịch · còn ${OPEN_DAYS} ngày`}
        lines={[
          { href: '#lich', label: `Lịch ${SCHEDULE_RANGE.toLowerCase()}` },
          { href: '#cach-dat', label: 'Cách đặt' },
        ]}
      />

      <section className="mag-section tone-paper" id="lich" aria-label="Lịch theo tháng">
        <div className="wrap">
          <div className="cal-intro">
            <SectionHead kicker={UPDATED_LABEL} title="Lịch *từng tháng*" lead={SCHEDULE_NOTE} />
            <ScheduleLegend />
          </div>
          <ScheduleCalendar />
        </div>
      </section>

      <section className="mag-section tone-ink" id="cach-dat" aria-label="Cách đặt lịch">
        <div className="wrap">
          <SectionHead kicker="Cách đặt" title="Ba bước, *không cần cọc*" />
          <Steps steps={SCHEDULE_BOOKING_STEPS} />
        </div>
      </section>

      <Continue items={pickContinue(['pricing', 'options', 'faq'])} />
      <CtaBand
        title="Thấy một ngày *hợp ý* chưa?"
        text="Chạm vào ô đó để mở form với ngày điền sẵn, hoặc nhắn thẳng cho tụi mình."
        actions={[{ href: '/dat-lich', label: 'Mở form đặt lịch', primary: true }]}
      />
    </main>
  );
}
