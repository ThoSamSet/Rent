/**
 * Generate locations legacy HTML: region bento + map + camp gallery strip.
 * Run: node scripts/condense-location-cards.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const JSON_PATH = path.join(__dirname, '../content/legacy/locations.json');
const SITES_PATH = path.join(__dirname, '../public/locations-map-sites.js');

function loadMapSites() {
  const src = fs.readFileSync(SITES_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox);
  const sites = sandbox.window.CAMP_MAP_SITES;
  if (!Array.isArray(sites) || !sites.length) {
    throw new Error('CAMP_MAP_SITES empty');
  }
  sites.forEach((site) => {
    if (!site.id || !site.name || !site.region || !site.image) {
      throw new Error(`Site missing id/name/region/image: ${site && site.id}`);
    }
  });
  return sites;
}

const REGION_BENTO = [
  {
    tag: 'phu-si',
    label: 'Phú Sĩ',
    image: '/images/location-fumotoppara.webp',
    alt: 'Camping vùng Phú Sĩ',
    featured: true,
  },
  {
    tag: 'bien',
    label: 'Biển',
    image: '/images/location-koganezaki.webp',
    alt: 'Camping gần biển',
  },
  {
    tag: 'kanagawa',
    label: 'Kanagawa',
    image: '/images/location-aone.webp',
    alt: 'Camping Kanagawa',
  },
  {
    tag: 'saitama',
    label: 'Saitama',
    image: '/images/location-nagatoro-auto-campground.webp',
    alt: 'Camping Saitama',
  },
  {
    tag: 'bac-kanto',
    label: 'Bắc Kanto',
    image: '/images/location-recamp-ashikaga.webp',
    alt: 'Camping Recamp Ashikaga, Bắc Kanto',
  },
];

const REGION_FILTER_TAGS = REGION_BENTO.map(({ tag, label }) => ({ tag, label }));

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

function buildRegionFilterButtons() {
  const clearBtn = `<button type="button" class="filter-tag-btn filter-clear is-active" data-filter-action="clear" aria-pressed="true">Tất cả</button>`;
  const tagBtns = REGION_FILTER_TAGS.map(
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

function buildGalleryStrip(sites) {
  const figures = sites
    .map(
      (site) => `<figure class="home-gallery__item" data-region="${escapeHtmlAttr(site.region)}" data-site-id="${escapeHtmlAttr(site.id)}">
                        <img src="${escapeHtmlAttr(site.image)}" alt="${escapeHtmlAttr(site.name)}" width="800" height="600" loading="lazy" decoding="async">
                        <img class="home-gallery__brand" src="/images/logoTrongSuot1-512x256.png" srcset="/images/logoTrongSuot1-512x256.png 1996w" sizes="(min-width: 1286px) 120px, (min-width: 786px) 9.33vw, 73px" alt="" aria-hidden="true" width="1996" height="582" loading="lazy" decoding="async">
                    </figure>`,
    )
    .join('\n                    ');

  return `<section class="home-section home-gallery locations-gallery" data-reveal aria-label="Ảnh các bãi camping">
                <div class="home-gallery__header locations-gallery__header">
                    <p class="home-section__label">Gallery</p>
                </div>
                <div class="home-gallery__strip" id="locations-gallery-strip" tabindex="0" aria-label="Ảnh camping theo khu vực — vuốt ngang để xem thêm">
                    ${figures}
                </div>
            </section>`;
}

function buildRegionBento() {
  const cards = REGION_BENTO.map((region) => {
    const featuredClass = region.featured
      ? ' locations-region__card--featured'
      : '';
    return `<button type="button" class="filter-tag-btn locations-region__card${featuredClass}" data-filter-tag="${region.tag}" aria-pressed="false">
                            <img src="${escapeHtmlAttr(region.image)}" alt="${escapeHtmlAttr(region.alt)}" width="800" height="600" loading="eager" decoding="async">
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

function buildLocationsHtml(sites) {
  return `<!-- Locations Content -->
    <section class="locations-map-section home-section" data-reveal>
        <div class="locations-content">
            <div class="locations-intro">
                <p class="home-section__label">Kanto</p>
                <h2 class="home-section__title">Bãi camping chúng mình hay đưa khách</h2>
                <p class="locations-intro__text">
                    <span class="no-break">Camp Nhà Thỏ</span> chọn lọc những bãi camping đẹp quanh Kanto — từ Phú Sĩ, biển đến Kanagawa, Saitama và Bắc Kanto. Chọn vùng bên dưới rồi xem vị trí các bãi trên bản đồ.
                </p>
            </div>

            ${buildRegionBento()}

            <section class="locations-map-band" id="locations-map-band" aria-label="Bản đồ các bãi camping">
                <header class="locations-map-band__header">
                    <p class="home-section__label">Bản đồ</p>
                    <h2 class="home-section__title">Các bãi trên Kanto</h2>
                    <p class="locations-map-band__teaser">Chấm đen đánh dấu vị trí các bãi camping trên bản đồ.</p>
                    <div class="locations-filters locations-filters--secondary">
                        <div class="location-filter-scroll" role="group" aria-label="Lọc theo vùng">
                            ${buildRegionFilterButtons()}
                        </div>
                    </div>
                </header>
                <div id="locations-map-panel" class="locations-map-panel">
                    <div class="map-container locations-map-band__map">
                        <div id="map"></div>
                    </div>
                </div>
            </section>

            ${buildGalleryStrip(sites)}
        </div>
    </section>

    ${CTA_BLOCK}`;
}

const mapSites = loadMapSites();
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const updated = buildLocationsHtml(mapSites);

[
  'locations-intro',
  'locations-regions',
  'locations-region__card',
  'locations-map-band',
  'id="map"',
  'home-bottom',
  'about-explore',
  'data-filter-tag="phu-si"',
  'data-filter-tag="bien"',
  'data-filter-tag="kanagawa"',
  'data-filter-tag="saitama"',
  'data-filter-tag="bac-kanto"',
  'data-filter-action="clear"',
  'locations-gallery',
  'id="locations-gallery-strip"',
  'home-gallery__brand',
].forEach((token) => {
  if (!updated.includes(token)) {
    throw new Error(`Sanity check failed: ${token} missing`);
  }
});

[
  'location-detail',
  'map-site-overlay',
  'location-info-grid',
  'location-empty-state',
  'view-phu-si',
  'ibaraki',
  'bien-izu',
].forEach((token) => {
  if (updated.includes(token)) {
    throw new Error(`Sanity check failed: obsolete token still present: ${token}`);
  }
});

const regionCardCount = (updated.match(/class="filter-tag-btn locations-region__card/g) || []).length;
if (regionCardCount !== 5) {
  throw new Error(`Expected 5 region cards, got ${regionCardCount}`);
}

const galleryItemCount = (updated.match(/class="home-gallery__item"/g) || []).length;
if (galleryItemCount !== mapSites.length) {
  throw new Error(`Expected ${mapSites.length} gallery items, got ${galleryItemCount}`);
}

data.content = updated;
if (data.inlineStyles) {
  data.inlineStyles = '<style></style>';
}
fs.writeFileSync(JSON_PATH, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${JSON_PATH} (5 region cards, ${mapSites.length} gallery images)`);
