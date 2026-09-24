import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import SectionHead from '@/components/mag/SectionHead';
import { OPTION_CATEGORIES, OPTIONS_COVER } from '@/lib/options/content';
import { pickContinue } from '@/lib/site/continue';
import { folioFor } from '@/lib/site/issue';

export default function OptionsPageContent() {
  return (
    <main>
      <Cover
        label="Option thêm của Camp Nhà Thỏ"
        folio={folioFor('Option')}
        kicker={OPTIONS_COVER.kicker}
        title={OPTIONS_COVER.title}
        deck={OPTIONS_COVER.deck}
        image={{ src: '/images/option-hero.webp', alt: 'Nồi và cốc camping đặt trên bãi cỏ' }}
        caption="Nồi, cốc và bãi cỏ"
        lines={OPTION_CATEGORIES.map((category) => ({ href: `#${category.id}`, label: `${category.title} · ${category.statusLabel}` }))}
      />

      {OPTION_CATEGORIES.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className={`mag-section tone-${index % 2 === 0 ? 'ink' : 'paper'}${category.status === 'paused' ? ' is-paused' : ''}`}
          aria-label={category.title}
        >
          <div className="wrap">
            <SectionHead
              kicker={category.statusLabel}
              title={category.title}
              lead={category.description}
            />
            <ul className="menu">
              {category.items.map((item) => (
                <li key={item.id} className="menu__item">
                  <img className="menu__photo" src={item.src} alt={item.alt} loading="lazy" decoding="async" width="800" height="600" />
                  <div className="menu__body">
                    <div className="menu__head">
                      <h3 className="menu__title">{item.title}</h3>
                      <span className="menu__price">{item.price}</span>
                    </div>
                    <p className="menu__features">{item.features.join(' · ')}</p>
                    {item.note ? <p className="menu__note">{item.note}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
            {category.footnote ? <p className="menu__footnote">{category.footnote}</p> : null}
          </div>
        </section>
      ))}

      <Continue items={pickContinue(['pricing', 'equipment', 'booking'])} />
      <CtaBand title="Muốn thêm gì, *cứ chọn* lúc đặt lịch." text="Chọn ở bước Tuỳ chọn trong form. Tụi mình sẽ xác nhận lại trong inbox." />
    </main>
  );
}
