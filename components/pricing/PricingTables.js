import Link from 'next/link';
import {
  PRICING_COMPARISON,
  PRICING_FOOTNOTES,
  PRICING_MATRIX,
  PRICING_OPTIONS_DISCLAIMER,
} from '@/lib/pricing/content';
import { formatPerPersonPrice, parsePeopleCount } from '@/lib/pricing/format';

function ColumnHeader({ column }) {
  return (
    <>
      {column.label}
      {column.badge === 'new' ? (
        <>
          <br />
          <span className="plan-new-badge">Mới</span>
        </>
      ) : null}
    </>
  );
}

function MatrixCell({ value, peopleLabel }) {
  if (value === null) {
    return <span aria-label="Không hỗ trợ">-</span>;
  }

  const peopleCount = parsePeopleCount(peopleLabel);
  const perPerson = formatPerPersonPrice(value, peopleCount);

  return (
    <div className="pricing-prices">
      <span className="pricing-price-value">{value}</span>
      <span className="pricing-price-per-person">{perPerson}/người</span>
    </div>
  );
}

export default function PricingTables() {
  return (
    <section className="about-block pricing-tables home-section" data-reveal aria-label="Bảng giá và so sánh plan">
      <div
        className="pricing-option-disclaimer"
        role="region"
        aria-labelledby="pricing-option-disclaimer-title"
      >
        <h2 className="home-section__title" id="pricing-option-disclaimer-title">
          {PRICING_OPTIONS_DISCLAIMER.title}
        </h2>
        <p className="pricing-option-disclaimer__text">
          {PRICING_OPTIONS_DISCLAIMER.textBefore}{' '}
          <Link href={PRICING_OPTIONS_DISCLAIMER.link.href}>{PRICING_OPTIONS_DISCLAIMER.link.label}</Link>
          {PRICING_OPTIONS_DISCLAIMER.textAfter}
        </p>
      </div>

      <p className="table-swipe-hint" aria-hidden="true">
        <span className="table-swipe-hint-icon">↔</span> Vuốt ngang để xem thêm
      </p>
      <div className="pricing-table-wrapper pricing-table-wrapper--comparison">
        <h3 className="pricing-subtitle">{PRICING_COMPARISON.title}</h3>
        <table className="pricing-table" aria-label={PRICING_COMPARISON.title}>
          <thead>
            <tr>
              <th scope="col">Nội dung</th>
              {PRICING_COMPARISON.columns.map((column) => (
                <th key={column.id} scope="col">
                  <ColumnHeader column={column} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICING_COMPARISON.rows.map((row) => (
              <tr key={row.feature}>
                <th scope="row" className="pricing-people">
                  {row.feature}
                </th>
                <td>{row.de}</td>
                <td>{row.bi}</td>
                <td>{row.nho}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="table-swipe-hint" aria-hidden="true">
        <span className="table-swipe-hint-icon">↔</span> Vuốt ngang để xem thêm
      </p>
      <div className="pricing-table-wrapper">
        <h3 className="pricing-subtitle">
          {PRICING_MATRIX.title}{' '}
          <span className="pricing-subtitle-note">{PRICING_MATRIX.note}</span>
        </h3>
        <table className="pricing-table" aria-label={PRICING_MATRIX.title}>
          <thead>
            <tr>
              <th scope="col">Số người</th>
              {PRICING_MATRIX.columns.map((column) => (
                <th key={column.id} scope="col">
                  <ColumnHeader column={column} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICING_MATRIX.rows.map((row) => (
              <tr key={row.people}>
                <th scope="row" className="pricing-people">
                  {row.people}
                </th>
                <td>
                  <MatrixCell value={row.de} peopleLabel={row.people} />
                </td>
                <td>
                  <MatrixCell value={row.bi} peopleLabel={row.people} />
                </td>
                <td>
                  <MatrixCell value={row.nho} peopleLabel={row.people} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pricing-note-box">
        <p>
          {PRICING_FOOTNOTES.optionsTextBefore}{' '}
          <Link href={PRICING_FOOTNOTES.optionsLink.href}>{PRICING_FOOTNOTES.optionsLink.label}</Link>
          {PRICING_FOOTNOTES.optionsTextAfter}
        </p>
        <p>{PRICING_FOOTNOTES.regionNote}</p>
        <p>
          <Link href={PRICING_FOOTNOTES.bookingLink.href}>{PRICING_FOOTNOTES.bookingLink.label}</Link>
          {PRICING_FOOTNOTES.bookingTextAfter}
        </p>
      </div>
    </section>
  );
}
