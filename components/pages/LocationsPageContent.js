import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import SiteDirectory from '@/components/locations/SiteDirectory';
import { LOCATIONS_COVER } from '@/lib/locations/regions';
import { pickContinue } from '@/lib/site/continue';
import { folioFor } from '@/lib/site/issue';

export default function LocationsPageContent() {
  return (
    <main>
      <Cover
        label="Các bãi cắm trại Camp Nhà Thỏ hay đưa khách tới"
        folio={folioFor('Bãi cắm trại')}
        kicker={LOCATIONS_COVER.kicker}
        title={LOCATIONS_COVER.title}
        deck={LOCATIONS_COVER.deck}
        image={{ src: '/images/location-hero.webp', alt: 'Biển chỉ đường bãi cắm trại bên hồ' }}
        caption="Biển chỉ đường bên hồ"
      />
      <section className="tone-ink" aria-label="Danh sách bãi cắm trại">
        <SiteDirectory />
      </section>
      <Continue items={pickContinue(['schedule', 'pricing', 'faq'])} />
      <CtaBand
        title="Ưng *bãi nào* rồi?"
        text="Chọn bãi ngay trong form đặt lịch, hoặc để tụi mình gợi ý theo mùa và theo nhóm của bạn."
      />
    </main>
  );
}
