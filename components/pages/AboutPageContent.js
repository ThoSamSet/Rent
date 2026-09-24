import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import Emph from '@/components/mag/Emph';
import Hours from '@/components/mag/Hours';
import Ledger from '@/components/mag/Ledger';
import Photo from '@/components/mag/Photo';
import SectionHead from '@/components/mag/SectionHead';
import Spread from '@/components/mag/Spread';
import Steps from '@/components/mag/Steps';
import {
  ABOUT_AUDIENCE,
  ABOUT_COVER,
  ABOUT_HOURS,
  ABOUT_PILLARS,
  ABOUT_QUOTE,
  ABOUT_STORY,
  ABOUT_TWO_WAYS,
  ABOUT_VALUES,
  BOOKING_STEPS,
} from '@/lib/about/content';
import { pickContinue } from '@/lib/site/continue';
import { folioFor } from '@/lib/site/issue';

export default function AboutPageContent() {
  return (
    <main>
      <Cover
        label="Giới thiệu Camp Nhà Thỏ"
        folio={folioFor('Giới thiệu')}
        kicker={ABOUT_COVER.kicker}
        title={ABOUT_COVER.title}
        deck={ABOUT_COVER.deck}
        image={{ src: '/images/about-hero.webp', alt: 'Núi Phú Sĩ nhìn qua mặt hồ' }}
        caption="Phú Sĩ, buổi sáng bên hồ"
      />

      <Spread
        label="Chuyện bắt đầu"
        image={{ src: '/images/about-1.webp', alt: 'Lều dựng sẵn giữa rừng, cạnh xe đưa đón' }}
        caption="Lều dựng xong, xe đậu bên cạnh"
        tone="ink"
      >
        <p className="kicker">Chuyện bắt đầu</p>
        <h2 className="spread__title">
          <Emph text="Chia sẻ, *không ghép khách*" />
        </h2>
        {ABOUT_STORY.map((paragraph, index) => (
          <p key={paragraph} className={`essay${index === 0 ? ' essay--drop' : ''}`}>
            {paragraph}
          </p>
        ))}
      </Spread>

      <section className="mag-section tone-ink" aria-label="Tụi mình lo gì">
        <div className="wrap">
          <SectionHead kicker="Tụi mình lo gì" title="Ba việc, *để bạn khỏi phải nghĩ*" />
          <ul className="pillars">
            {ABOUT_PILLARS.map((pillar) => (
              <li key={pillar.title} className="pillar">
                <Photo className="pillar__photo" src={pillar.image} alt={pillar.alt} />
                <h3 className="pillar__title">{pillar.title}</h3>
                <p className="pillar__text">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mag-section tone-dusk quote-values" aria-label="Điều tụi mình giữ">
        <blockquote className="pullquote wrap">
          <p>
            <Emph text={ABOUT_QUOTE} />
          </p>
          <cite>Camp Nhà Thỏ</cite>
        </blockquote>
        <ul className="values wrap" aria-label="Điều tụi mình giữ">
          {ABOUT_VALUES.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </section>

      <Spread
        label="Hợp với ai"
        image={{ src: ABOUT_AUDIENCE.image, alt: ABOUT_AUDIENCE.alt }}
        caption="Nhóm nhỏ, lửa nhỏ"
        reverse
      >
        <p className="kicker">Dành cho</p>
        <h2 className="spread__title">
          <Emph text={ABOUT_AUDIENCE.title} />
        </h2>
        <div className="spread__ledger">
          <Ledger rows={ABOUT_AUDIENCE.items.map((item) => ({ key: item, label: item }))} label="Hợp với ai" />
        </div>
        <p className="essay">{ABOUT_AUDIENCE.note}</p>
      </Spread>

      <Hours label="Một chuyến mẫu" {...ABOUT_HOURS} />

      <section className="mag-section tone-ink" aria-label="Hai cách đi">
        <div className="wrap">
          <SectionHead kicker="Hai cách đi" title="Tự đi, hay *đi cùng tụi mình*" />
          <div className="two-ways">
            {[ABOUT_TWO_WAYS.alone, ABOUT_TWO_WAYS.withUs].map((way, index) => (
              <div key={way.title} className={`two-ways__col${index === 1 ? ' two-ways__col--us' : ''}`}>
                <h3 className="two-ways__title">
                  <Emph text={way.title} />
                </h3>
                <ul>
                  {way.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mag-section tone-paper" aria-label="Cách đặt lịch">
        <div className="wrap">
          <SectionHead kicker="Đặt lịch" title="Ba bước, *không cần cọc*" />
          <Steps steps={BOOKING_STEPS} />
        </div>
      </section>

      <Continue items={pickContinue(['pricing', 'locations', 'schedule'])} />
      <CtaBand title="Sẵn sàng cho *một đêm ngoài trời*?" text="Đồ đạc tụi mình lo. Bạn chỉ cần chọn ngày." />
    </main>
  );
}
