import Link from 'next/link';

/**
 * Hairline list for prices, options, sites, notes.
 * numbered: no · label · value | plain: label · value | wide: label · detail · value
 * @param {{
 *   rows: { key?: string; no?: string; label: import('react').ReactNode; meta?: string; detail?: import('react').ReactNode; value?: import('react').ReactNode; href?: string }[];
 *   variant?: 'numbered' | 'plain' | 'wide';
 *   label?: string;
 * }} props
 */
export default function Ledger({ rows, variant = 'numbered', label }) {
  const variantClass = variant === 'numbered' ? '' : ` ledger--${variant}`;

  return (
    <ul className={`ledger${variantClass}`} aria-label={label}>
      {rows.map((row, index) => {
        const trailing = variant === 'wide' ? row.value : (row.value ?? row.detail);
        const inner = (
          <>
            {variant === 'numbered' ? (
              <span className="ledger__no">{row.no ?? String(index + 1).padStart(2, '0')}</span>
            ) : null}
            <span className="ledger__label">
              {row.label}
              {row.meta ? <small>{row.meta}</small> : null}
            </span>
            {variant === 'wide' ? <span className="ledger__detail">{row.detail}</span> : null}
            {trailing !== undefined && trailing !== null ? (
              <span className={row.value !== undefined ? 'ledger__value' : 'ledger__detail'}>{trailing}</span>
            ) : null}
          </>
        );
        const key = row.key ?? row.href ?? String(index);

        if (!row.href) {
          return (
            <li key={key}>
              <div className="ledger__row">{inner}</div>
            </li>
          );
        }

        if (row.href.startsWith('http')) {
          return (
            <li key={key}>
              <a className="ledger__row" href={row.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            </li>
          );
        }

        return (
          <li key={key}>
            <Link className="ledger__row" href={row.href}>
              {inner}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
