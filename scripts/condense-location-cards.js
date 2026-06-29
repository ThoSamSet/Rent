/**
 * Restructure locations legacy HTML: Region Editorial + gallery overlay cards.
 * Run: node scripts/condense-location-cards.js
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../content/legacy/locations.json');

const HERO_BLOCK = `    <section class="home-hero" aria-label="Vị trí camping Camp Nhà Thỏ">
        <div class="home-hero__media">
            <img class="home-hero__img" src="/images/location-fumotoppara.webp" alt="Fumotoppara Camping Ground - view núi Phú Sĩ" width="1200" height="675" loading="eager" decoding="async">
        </div>
        <div class="home-hero__overlay">
            <p class="home-hero__label">Vị trí</p>
            <h1 class="home-hero__title">Vị trí Camping</h1>
            <p class="home-hero__subtitle"><span class="no-break">Camp Nhà Thỏ</span> hỗ trợ đưa đón đến các bãi camping đẹp quanh khu vực Kanto, Nhật Bản</p>
        </div>
    </section>`;

const REGION_BENTO = [
  {
    tag: 'view-phu-si',
    label: 'View Phú Sĩ',
    image: '/images/location-fumotoppara.webp',
    alt: 'Camping view núi Phú Sĩ',
    featured: true,
  },
  {
    tag: 'gan-bien',
    label: 'Gần biển',
    image: '/images/location-koganezaki.webp',
    alt: 'Camping gần biển',
  },
  {
    tag: 'gan-ho',
    label: 'Gần hồ',
    image: '/images/location-tanukiko.webp',
    alt: 'Camping gần hồ',
  },
  {
    tag: 'gan-tokyo',
    label: 'Gần Tokyo',
    image: '/images/location-recamp-ashikaga.webp',
    alt: 'Camping gần Tokyo',
  },
  {
    tag: 'gan-suoi-song',
    label: 'Gần suối / sông',
    image: '/images/location-nagatoro-auto-campground.webp',
    alt: 'Camping gần suối sông',
  },
  {
    tag: 'mua-thu',
    label: 'Mùa thu',
    image: '/images/location-asagiri-sorairo.webp',
    alt: 'Camping mùa thu',
    wide: true,
  },
];

const GALLERY_FILTER_TAGS = [
  { tag: 'view-phu-si', label: 'View Phú Sĩ' },
  { tag: 'gan-bien', label: 'Gần biển' },
  { tag: 'gan-ho', label: 'Gần hồ' },
  { tag: 'gan-tokyo', label: 'Gần Tokyo' },
  { tag: 'gan-suoi-song', label: 'Gần suối / sông' },
  { tag: 'mua-xuan', label: 'Mùa xuân' },
  { tag: 'mua-he', label: 'Mùa hè' },
  { tag: 'mua-thu', label: 'Mùa thu' },
];

function buildGalleryFilterButtons() {
  const clearBtn = `<button type="button" class="filter-tag-btn filter-clear is-active" data-filter-action="clear" aria-pressed="true">Tất cả</button>`;
  const tagBtns = GALLERY_FILTER_TAGS.map(
    ({ tag, label }) =>
      `<button type="button" class="filter-tag-btn" data-filter-tag="${tag}" aria-pressed="false">${label}</button>`,
  ).join('\n                    ');
  return `${clearBtn}\n                    ${tagBtns}`;
}

const CTA_BLOCK = `<section class="home-bottom about-explore" data-reveal aria-label="Tìm hiểu thêm">
                <a href="/schedule" class="home-faq">
                    <div class="home-faq__media">
                        <img src="/images/subBanner-lich-trinh.webp" alt="Lịch trình camping — kiểm tra lịch trống sắp tới" width="640" height="360" loading="lazy" decoding="async">
                    </div>
                    <div class="home-faq__copy">
                        <p class="home-section__label">Lịch trình</p>
                        <h2 class="home-section__title">Kiểm tra lịch trống sắp tới</h2>
                    </div>
                </a>
                <a href="/pricing" class="home-faq">
                    <div class="home-faq__media">
                        <img src="/images/chi-phi-1.webp" alt="Chi phí và plan camping" width="640" height="360" loading="lazy" decoding="async">
                    </div>
                    <div class="home-faq__copy">
                        <p class="home-section__label">Chi phí</p>
                        <h2 class="home-section__title">Bảng giá &amp; plan</h2>
                    </div>
                </a>
                <a href="/faq" class="home-faq about-explore__full">
                    <div class="home-faq__media">
                        <img src="/images/subBanner-faq.webp" alt="Câu hỏi thường gặp" width="640" height="360" loading="lazy" decoding="async">
                    </div>
                    <div class="home-faq__copy">
                        <p class="home-section__label">FAQ</p>
                        <h2 class="home-section__title">Câu hỏi thường gặp</h2>
                    </div>
                </a>
            </section>`;

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstSentence(text) {
  const clean = stripHtml(text);
  if (!clean) return '';
  const match = clean.match(/^(.+?[.!?])(?:\s|$)/);
  if (match) return match[1].trim();
  if (clean.length <= 120) return clean;
  return `${clean.slice(0, 117).trim()}…`;
}

function extract(inner, pattern) {
  const m = inner.match(pattern);
  return m ? m[1].trim() : '';
}

function splitCards(gridInner) {
  const cardOpen =
    /<(?:div|article)\s+class="location-detail(?:\s+(?:location-card|location-gallery-card))?"[^>]*>/g;
  const indices = [];
  let match;
  while ((match = cardOpen.exec(gridInner)) !== null) {
    indices.push(match.index);
  }

  return indices.map((start, idx) => {
    const end = idx + 1 < indices.length ? indices[idx + 1] : gridInner.length;
    return gridInner.slice(start, end).trim();
  });
}

function transformCard(cardHtml) {
  const openMatch = cardHtml.match(
    /^(<(?:div|article) class="location-detail(?:\s+(?:location-card|location-gallery-card))?"[^>]*>)/,
  );
  if (!openMatch) return cardHtml;

  const dataAttrs = openMatch[1].match(/data-site-id="[^"]*"/);
  const tagsAttrs = openMatch[1].match(/data-tags="[^"]*"/);
  const siteId = dataAttrs ? dataAttrs[0] : '';
  const tags = tagsAttrs ? tagsAttrs[0] : '';

  const inner = cardHtml.slice(openMatch[0].length).replace(/<\/(?:div|article)>\s*$/, '');

  const imgMatch = inner.match(/<img[^>]*>/);
  const imgTag = imgMatch ? imgMatch[0] : '';

  const h3Inner = extract(inner, /<h3>([\s\S]*?)<\/h3>/);
  const title = stripHtml(
    h3Inner.replace(/<span class="location-detail-icon">[\s\S]*?<\/span>/g, ''),
  );

  const subtitleBlock = extract(inner, /(<p class="location-subtitle">[\s\S]*?<\/p>)/);
  const tagsBlock = extract(inner, /(<div class="location-tags"[\s\S]*?<\/div>)/);

  const mapLinkMatch = inner.match(
    /<a([^>]*class="location-map-link"[^>]*)>[\s\S]*?<\/a>/,
  );
  const mapLink = mapLinkMatch ? `<a${mapLinkMatch[1]}>Google Maps</a>` : '';

  return `<article class="location-detail location-gallery-card" tabindex="0" ${siteId} ${tags}>
                            <div class="location-gallery-card__media">
                                ${imgTag}
                            </div>
                            <div class="location-gallery-card__overlay">
                                <h3>${title}</h3>
                                ${subtitleBlock}
                                <div class="location-gallery-card__footer">
                                    ${tagsBlock}
                                    ${mapLink}
                                </div>
                            </div>
                        </article>`;
}

function buildRegionBento() {
  const cards = REGION_BENTO.map((region) => {
    const featuredClass = region.featured
      ? ' locations-region__card--featured'
      : '';
    const wideClass = region.wide ? ' locations-region__card--wide' : '';
    return `<button type="button" class="filter-tag-btn locations-region__card${featuredClass}${wideClass}" data-filter-tag="${region.tag}" aria-pressed="false">
                            <img src="${region.image}" alt="${region.alt}" width="800" height="600" loading="lazy" decoding="async">
                            <span class="locations-region__label">${region.label}</span>
                        </button>`;
  }).join('\n                        ');

  return `<section class="locations-regions home-section" data-reveal aria-labelledby="location-filter-heading">
                    <p class="home-section__label">Khu vực</p>
                    <h2 id="location-filter-heading" class="home-section__title">Chọn vùng khám phá</h2>
                    <div class="locations-filters">
                        <div class="locations-regions__grid" role="group" aria-labelledby="location-filter-heading">
                        ${cards}
                        </div>
                    </div>
                </section>`;
}

const EMPTY_STATE_BLOCK = `<div id="location-empty-state" class="location-empty-state" role="status" aria-live="polite" aria-hidden="true">
                    <p class="location-empty-state-title">Không có bãi phù hợp</p>
                    <p class="location-empty-state-hint" id="location-empty-state-hint">Thử bỏ bớt thẻ lọc hoặc chọn «Tất cả» để xem lại toàn bộ danh sách.</p>
                </div>`;

function findGridClose(html, gridOpenEnd, emptyIdx) {
  if (emptyIdx !== -1) {
    return html.lastIndexOf('</div>', emptyIdx - 1);
  }
  const gallerySectionStart = html.lastIndexOf('<section class="locations-gallery', gridOpenEnd);
  if (gallerySectionStart === -1) return -1;
  const gallerySectionEnd = html.indexOf('</section>', gallerySectionStart);
  if (gallerySectionEnd === -1) return -1;
  const lastArticle = html.lastIndexOf('</article>', gallerySectionEnd);
  if (lastArticle === -1 || lastArticle < gridOpenEnd) return -1;
  return html.indexOf('</div>', lastArticle);
}

function restructureToRegionLayout(html) {
  const gridStart = html.indexOf('id="location-info-grid"');
  const gridOpenEnd = html.indexOf('>', gridStart) + 1;
  const emptyIdx = html.indexOf('id="location-empty-state"');
  const gridClose = findGridClose(html, gridOpenEnd, emptyIdx);
  if (gridClose === -1 || gridClose <= gridOpenEnd) {
    throw new Error('Could not locate end of #location-info-grid');
  }
  const gridInner = html.slice(gridOpenEnd, gridClose);

  const cards = splitCards(gridInner).map(transformCard).join('\n\n                        ');

  return `<!-- Hero Section -->
${HERO_BLOCK}

    <!-- Locations Content -->
    <section class="locations-map-section home-section" data-reveal>
        <div class="locations-content">
            <div class="locations-intro">
                <p class="home-section__label">Kanto</p>
                <h2 class="home-section__title">Bãi camping chúng mình hay đưa khách</h2>
                <p class="locations-intro__text">
                    <span class="no-break">Camp Nhà Thỏ</span> chọn lọc những bãi camping đẹp quanh Kanto — từ view Phú Sĩ, hồ núi lửa đến bờ biển và suối trong lành. Chọn vùng bên dưới, xem trên bản đồ, rồi khám phá từng điểm đến.
                </p>
            </div>

            ${buildRegionBento()}

            <section class="locations-map-band" id="locations-map-band" aria-label="Bản đồ các bãi camping">
                <header class="locations-map-band__header">
                    <p class="home-section__label">Bản đồ</p>
                    <h2 class="home-section__title">Các bãi trên Kanto</h2>
                    <p class="locations-map-band__teaser">Chấm đen là vị trí các bãi — bấm vào chấm hoặc thẻ bên dưới để xem chi tiết.</p>
                </header>
                <div id="locations-map-panel" class="locations-map-panel">
                    <div class="map-container locations-map-band__map">
                        <div id="map"></div>
                        <div id="map-site-overlay" class="map-site-overlay" hidden aria-live="polite" aria-hidden="true">
                            <h3 class="map-site-overlay__title"></h3>
                            <p class="map-site-overlay__desc"></p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="locations-gallery home-section" data-reveal aria-label="Danh sách bãi camping">
                <header class="locations-gallery__header">
                    <p id="location-filter-status" aria-live="polite">Hiển thị 15 / 15 bãi</p>
                    <div class="locations-filters locations-filters--secondary">
                        <div class="location-filter-scroll" role="group" aria-label="Lọc theo thẻ">
                            ${buildGalleryFilterButtons()}
                        </div>
                    </div>
                </header>
                <div class="location-info locations-gallery__grid home-gallery__strip" id="location-info-grid" tabindex="0" aria-label="Danh sách bãi camping — vuốt ngang để xem thêm">
                    ${cards}
                </div>

                ${EMPTY_STATE_BLOCK}
            </section>
        </div>
    </section>

    ${CTA_BLOCK}`;
}

const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const updated = restructureToRegionLayout(data.content);

[
  'home-hero',
  'locations-intro',
  'locations-regions',
  'locations-region__card',
  'locations-map-band',
  'location-gallery-card__media',
  'id="map"',
  'home-bottom',
  'about-explore',
  'location-empty-state',
].forEach((token) => {
  if (!updated.includes(token)) {
    throw new Error(`Sanity check failed: ${token} missing`);
  }
});

data.content = updated;
if (data.inlineStyles) {
  data.inlineStyles = '<style></style>';
}
fs.writeFileSync(JSON_PATH, `${JSON.stringify(data, null, 2)}\n`);
const count = (data.content.match(/class="location-detail location-gallery-card"/g) || []).length;
console.log(`Updated ${JSON_PATH} (${count} cards, Region Editorial + gallery overlay)`);
