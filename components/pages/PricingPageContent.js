import Link from 'next/link';
import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import { plain } from '@/components/mag/Emph';
import Ledger from '@/components/mag/Ledger';
import SectionHead from '@/components/mag/SectionHead';
import Spread from '@/components/mag/Spread';
import {
  PRICING_COMPARISON,
  PRICING_COVER,
  PRICING_MATRIX,
  PRICING_NOTES,
  PRICING_PLANS,
} from '@/lib/pricing/content';
import { pickContinue } from '@/lib/site/continue';
import { folioFor } from '@/lib/site/issue';

const ORDINALS = ['Plan thứ nhất', 'Plan thứ hai', 'Plan thứ ba'];

/** Per-person share of a group total, in man, rounded to one decimal like the booking form. */
function perPerson(total, people) {
  const share = Math.round((Number(total) * 10) / Number.parseInt(people, 10)) / 10;
  return String(share);
}

const STAY_KINDS = ['shelter', 'bungalow'];

function ComparisonCell({ value }) {
  if (value === true) return <span className="matrix__accent">Có</span>;
  if (value === false) return <span className="muted">Không</span>;

  // Colour-code where you sleep so Shelter and Bungalow read apart at a glance.
  const [first, ...rest] = value.split(' / ');
  const kind = STAY_KINDS.find((item) => first.toLowerCase() === item);
  if (!kind) return value;

  return (
    <span className="no-break">
      <span className={`stay stay--${kind}`}>{first}</span>
      {rest.length ? ` / ${rest.join(' / ')}` : null}
    </span>
  );
}

export default function PricingPageContent() {
  return (
    <main>
      <Cover
        label="Chi phí camping Camp Nhà Thỏ"
        folio={folioFor('Chi phí')}
        kicker={PRICING_COVER.kicker}
        title={PRICING_COVER.title}
        deck={PRICING_COVER.deck}
        image={{ src: '/images/chi-phi-1.webp', alt: 'Hoa thuỷ tiên nở cạnh bãi camp' }}
        caption="Hoa thuỷ tiên nở cạnh bãi"
        lines={PRICING_PLANS.map((plan) => ({ href: `#${plan.id}`, label: `${plan.name} · từ ${plan.priceFrom} man` }))}
      />

      {PRICING_PLANS.map((plan, index) => (
        <Spread
          key={plan.id}
          id={plan.id}
          label={`Plan ${plan.name}`}
          image={{ src: plan.image, alt: plan.alt }}
          caption={plan.shortNote}
          reverse={index % 2 === 1}
          tone={index % 2 === 1 ? 'ink' : 'paper'}
        >
          <p className="kicker">
            {ORDINALS[index]}
            {plan.badge ? <span className="tag">{plan.badge}</span> : null}
          </p>
          <h2 className="spread__title">{plan.name}</h2>
          <p className="price-mark">
            <span>từ</span> {plan.priceFrom} <span>man</span>
          </p>
          {plan.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraph} className={`essay${paragraphIndex === 0 ? ' essay--drop' : ''}`}>
              {paragraph}
            </p>
          ))}
          <div className="spread__ledger">
            <Ledger variant="plain" label={`Plan ${plan.name} gồm`} rows={plan.features.map((feature) => ({ key: feature, label: feature }))} />
          </div>
          <Link href={`/dat-lich`} className="btn btn--solid spread__cta">
            Đặt {plan.name}
          </Link>
        </Spread>
      ))}

      <section className="mag-section tone-ink" id="bang-gia" aria-label={plain(PRICING_MATRIX.title)}>
        <div className="wrap">
          <SectionHead kicker="Bảng giá" title={PRICING_MATRIX.title} lead={PRICING_MATRIX.note} />
          <p className="swipe-hint" aria-hidden="true">
            <span>↔</span> Vuốt ngang để xem thêm
          </p>
          <div className="table-scroll">
            <table className="matrix matrix--numbers">
              <thead>
                <tr>
                  <th scope="col">Số người</th>
                  {PRICING_MATRIX.columns.map((column) => (
                    <th key={column.id} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING_MATRIX.rows.map((row) => (
                  <tr key={row.people}>
                    <th scope="row">{row.people}</th>
                    {PRICING_MATRIX.columns.map((column) => (
                      <td key={column.id}>
                        {row[column.id] ? (
                          <>
                            {row[column.id]} man
                            <small className="matrix__per">{perPerson(row[column.id], row.people)} man / người</small>
                          </>
                        ) : (
                          <span className="muted">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mag-section tone-paper" aria-label={plain(PRICING_COMPARISON.title)}>
        <div className="wrap">
          <SectionHead kicker="So sánh" title={PRICING_COMPARISON.title} />
          <p className="swipe-hint" aria-hidden="true">
            <span>↔</span> Vuốt ngang để xem thêm
          </p>
          <div className="table-scroll">
            <table className="matrix">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Hạng mục</span>
                  </th>
                  {PRICING_COMPARISON.columns.map((column) => (
                    <th key={column.id} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING_COMPARISON.rows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    {PRICING_COMPARISON.columns.map((column) => (
                      <td key={column.id}>
                        <ComparisonCell value={row[column.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="notes">
            <p className="kicker">Vài điều nên biết</p>
            <Ledger variant="plain" label="Ghi chú giá" rows={PRICING_NOTES.map((note) => ({ key: note, label: note }))} />
            <p className="notes__more">
              Muốn thêm chiếu phim hay đi đường thường cho rẻ hơn?{' '}
              <Link href="/options" className="text-link">
                Xem các option
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Continue items={pickContinue(['options', 'schedule', 'faq'])} />
      <CtaBand title="Đã ưng *một plan* chưa?" text="Form đặt lịch tính chi phí theo đúng bảng giá này, trước khi bạn gửi tin nhắn." />
    </main>
  );
}
