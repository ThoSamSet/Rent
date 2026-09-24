import Link from 'next/link';
import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import Emph, { plain } from '@/components/mag/Emph';
import Ledger from '@/components/mag/Ledger';
import Photo from '@/components/mag/Photo';
import SectionHead from '@/components/mag/SectionHead';
import Spread from '@/components/mag/Spread';
import { EQUIPMENT_BRING, EQUIPMENT_CATEGORIES, EQUIPMENT_COVER, EQUIPMENT_FOOTNOTES } from '@/lib/equipment/content';
import { pickContinue } from '@/lib/site/continue';
import { folioFor } from '@/lib/site/issue';

export default function EquipmentPageContent() {
  return (
    <main>
      <Cover
        label="Dụng cụ camping của Camp Nhà Thỏ"
        folio={folioFor('Dụng cụ')}
        kicker={EQUIPMENT_COVER.kicker}
        title={EQUIPMENT_COVER.title}
        deck={EQUIPMENT_COVER.deck}
        image={{ src: '/images/equipment-hero.webp', alt: 'Bên trong lều với bàn, ghế và đồ nấu ăn' }}
        caption="Mọi thứ đã nằm sẵn trong lều"
        lines={EQUIPMENT_CATEGORIES.map((category) => ({ href: `#${category.id}`, label: plain(category.title) }))}
      />

      <section className="mag-section tone-ink" aria-label="Các nhóm dụng cụ">
        {EQUIPMENT_CATEGORIES.map((category) => (
          <div key={category.id} id={category.id} className="gear">
            <div className="wrap">
              <SectionHead kicker="Tụi mình mang theo" title={category.title} as="h2" />
            </div>
            <div className="gear__row" data-count={category.images.length}>
              {category.images.map((image) => (
                <Photo key={`${category.id}-${image.src}`} className="gear__photo" src={image.src} alt={image.alt} caption={image.caption} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <Spread
        label={plain(EQUIPMENT_BRING.title)}
        image={{ src: '/images/equipment-bring.webp', alt: 'Khách mang túi ngủ và giỏ đồ xuống xe' }}
        caption="Xuống xe, lên đường"
      >
        <p className="kicker">Hành lý nhẹ tênh</p>
        <h2 className="spread__title">
          <Emph text={EQUIPMENT_BRING.title} />
        </h2>
        <div className="spread__ledger">
          <Ledger rows={EQUIPMENT_BRING.items.map((item) => ({ key: item, label: item }))} label={plain(EQUIPMENT_BRING.title)} />
        </div>
        <Link href={EQUIPMENT_BRING.link.href} className="text-link spread__more">
          {EQUIPMENT_BRING.link.label}
        </Link>
        <div className="spread__notes">
          {EQUIPMENT_FOOTNOTES.map((note) => (
            <p key={note} className="muted">
              {note}
            </p>
          ))}
        </div>
      </Spread>

      <Continue items={pickContinue(['options', 'locations', 'faq'])} />
      <CtaBand title="Đồ đã sẵn sàng. *Còn bạn?*" />
    </main>
  );
}
