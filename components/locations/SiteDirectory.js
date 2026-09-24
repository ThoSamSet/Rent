'use client';

import { useState } from 'react';
import Photo from '@/components/mag/Photo';
import { CAMP_SITES } from '@/lib/locations/sites';
import { REGIONS } from '@/lib/locations/regions';

/**
 * Photo atlas of the camp sites, one band per region.
 * Each photo carries only its region; the site name stays in the alt text.
 */
export default function SiteDirectory() {
  const [region, setRegion] = useState(null);
  const visibleRegions = region ? REGIONS.filter((item) => item.tag === region) : REGIONS;

  return (
    <div className="directory">
      <div className="wrap directory__filters">
        <div className="chips" role="group" aria-label="Lọc theo vùng">
          <button
            type="button"
            className="chip"
            data-filter-action="clear"
            aria-pressed={!region}
            onClick={() => setRegion(null)}
          >
            Tất cả
          </button>
          {REGIONS.map((item) => {
            const active = region === item.tag;
            return (
              <button
                key={item.tag}
                type="button"
                className="chip"
                data-filter-tag={item.tag}
                aria-pressed={active}
                onClick={() => setRegion(active ? null : item.tag)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleRegions.map((item, index) => {
        const sites = CAMP_SITES.filter((site) => site.region === item.tag);
        return (
          <section
            key={item.tag}
            className={`region tone-${index % 2 === 0 ? 'ink' : 'paper'}${index % 2 === 1 ? ' region--flip' : ''}`}
            id={`vung-${item.tag}`}
            aria-labelledby={`vung-${item.tag}-title`}
          >
            <div className="wrap region__inner">
              <header className="region__head">
                <p className="kicker">{sites.length} bãi</p>
                <h2 id={`vung-${item.tag}-title`} className="region__title">
                  {item.label}
                </h2>
                <p className="region__blurb">{item.blurb}</p>
              </header>
              <ul className="region__sites" data-count={sites.length}>
                {sites.map((site) => (
                  <li key={site.id} className="site-card" data-site-id={site.id} data-region={site.region}>
                    <Photo className="site-card__photo" src={site.image} alt={site.name} caption={item.label} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
