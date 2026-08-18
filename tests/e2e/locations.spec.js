// @ts-check
const { test, expect } = require('@playwright/test');

async function waitForLocationsScript(page) {
  await page.waitForFunction(() => window.__locationsFiltersReady === true, null, {
    timeout: 25_000,
  });
}

async function waitForMapReady(page, options = {}) {
  const { openMobileAccordion = false } = options;

  await waitForLocationsScript(page);

  await page.locator('#locations-map-band').scrollIntoViewIfNeeded();

  if (openMobileAccordion) {
    const toggle = page.getByRole('button', { name: 'Bản đồ các bãi' });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  }

  await expect(page.locator('#map')).toHaveCount(1);
  await expect(page.locator('#map .leaflet-tile-pane')).toBeAttached({ timeout: 20_000 });

  await page.waitForFunction(() => {
    const mapEl = document.getElementById('map');
    if (!mapEl) return false;
    const pane = mapEl.querySelector('.leaflet-tile-pane');
    if (!pane) return false;
    const rect = mapEl.getBoundingClientRect();
    return rect.width > 80 && rect.height > 80;
  }, null, { timeout: 20_000 });
}

async function visibleMarkerCount(page) {
  return page.locator('#map .leaflet-marker-icon').count();
}

async function visibleGalleryCount(page) {
  return page.locator('#locations-gallery-strip .home-gallery__item:not(.location-hidden)').count();
}

/** Secondary filter chips sit under the sticky header on mobile unless scrolled with margin. */
async function selectSecondaryRegion(page, tag) {
  const btn = page.locator(
    tag === null
      ? '.locations-filters--secondary .filter-tag-btn[data-filter-action="clear"]'
      : `.locations-filters--secondary .filter-tag-btn[data-filter-tag="${tag}"]`,
  );
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(btn).toHaveClass(/is-active/);
}

test.describe('trang locations — map split', () => {
  test('map tiles render sau khi tải trang (desktop)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'Chỉ chạy trên desktop');

    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForMapReady(page);
    await expect(page.locator('#map .leaflet-marker-pane')).toBeAttached();
  });

  test('map render sau client navigation từ trang chủ (desktop)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'Chỉ chạy trên desktop');

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await page.getByRole('link', { name: /Bản đồ các bãi camping/i }).click();
    await page.waitForURL('**/locations');
    await waitForMapReady(page);
    await expect(page.locator('#map .leaflet-marker-pane')).toBeAttached();
  });

  test('lọc vùng ẩn bớt marker và fitBounds', async ({ page }) => {
    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForMapReady(page);

    const allCount = await visibleMarkerCount(page);
    expect(allCount).toBeGreaterThan(1);

    await selectSecondaryRegion(page, 'saitama');
    await expect.poll(() => visibleMarkerCount(page)).toBeLessThan(allCount);
    await expect.poll(() => visibleMarkerCount(page)).toBe(1);

    await expect.poll(async () => {
      const mapBox = await page.locator('#map').boundingBox();
      const marker = await page.locator('#map .leaflet-marker-icon').first().boundingBox();
      if (!mapBox || !marker) return false;
      const mapCx = mapBox.x + mapBox.width / 2;
      const mapCy = mapBox.y + mapBox.height / 2;
      const markerCx = marker.x + marker.width / 2;
      const markerCy = marker.y + marker.height / 2;
      return (
        Math.abs(markerCx - mapCx) < mapBox.width * 0.3 &&
        Math.abs(markerCy - mapCy) < mapBox.height * 0.3
      );
    }).toBeTruthy();

    const regionCard = page.locator('.locations-region__card[data-filter-tag="saitama"]');
    await expect(regionCard).toHaveClass(/is-active/);
    await expect(page.locator('.locations-filters--secondary .filter-tag-btn[data-filter-tag="saitama"]')).toHaveClass(/is-active/);

    await selectSecondaryRegion(page, 'bien');
    await expect.poll(() => visibleMarkerCount(page)).toBe(3);
    await expect(page.locator('.locations-region__card[data-filter-tag="bien"]')).toHaveClass(/is-active/);
    await expect(page.locator('.locations-filters--secondary .filter-tag-btn[data-filter-tag="ibaraki"]')).toHaveCount(0);
  });

  test('Tất cả hiện lại toàn bộ marker', async ({ page }) => {
    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForMapReady(page);

    const allCount = await visibleMarkerCount(page);
    expect(allCount).toBeGreaterThan(1);

    await selectSecondaryRegion(page, 'phu-si');
    await expect.poll(() => visibleMarkerCount(page)).toBeLessThan(allCount);

    await selectSecondaryRegion(page, null);
    await expect.poll(() => visibleMarkerCount(page)).toBe(allCount);
    await expect(page.locator('.locations-filters--secondary .filter-tag-btn[data-filter-action="clear"]')).toHaveClass(/is-active/);
  });

  test('overlay camp không hiện; marker không interactive', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'Chỉ chạy trên desktop');

    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForMapReady(page);

    await expect(page.locator('#map-site-overlay')).toHaveCount(0);
    await expect(page.locator('.map-site-overlay')).toHaveCount(0);
    await expect(page.locator('.location-detail')).toHaveCount(0);
    await expect(page.locator('.location-gallery-card__overlay')).toHaveCount(0);
    await expect(page.locator('.location-map-link')).toHaveCount(0);

    const marker = page.locator('#map .leaflet-marker-icon').first();
    await expect(marker).toBeAttached();
    await marker.click({ force: true });

    await expect(page.locator('#map-site-overlay')).toHaveCount(0);
    await expect(page.locator('.map-site-overlay.is-visible')).toHaveCount(0);

    const interactive = await page.evaluate(() => {
      const el = document.querySelector('#map .leaflet-marker-icon');
      if (!el) return true;
      const style = window.getComputedStyle(el);
      return style.pointerEvents !== 'none';
    });
    expect(interactive).toBe(false);
  });

  test('gallery dưới bản đồ lọc theo khu vực; không có card chi tiết', async ({ page }) => {
    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForLocationsScript(page);

    const strip = page.locator('#locations-gallery-strip');
    await expect(strip).toBeVisible();
    await expect(page.locator('#locations-gallery-strip .home-gallery__item')).toHaveCount(15);
    await expect(page.locator('#locations-gallery-strip .home-gallery__brand')).toHaveCount(15);
    await expect(page.locator('#locations-gallery-strip a, #locations-gallery-strip button')).toHaveCount(0);
    await expect(page.locator('.location-detail')).toHaveCount(0);
    await expect(page.locator('.location-gallery-card__overlay')).toHaveCount(0);
    await expect(page.locator('.location-map-link')).toHaveCount(0);

    const mapBox = await page.locator('#locations-map-band').boundingBox();
    const galleryBox = await strip.boundingBox();
    expect(mapBox && galleryBox && galleryBox.y >= mapBox.y).toBeTruthy();

    await expect.poll(() => visibleGalleryCount(page)).toBe(15);

    await selectSecondaryRegion(page, 'saitama');
    await expect.poll(() => visibleGalleryCount(page)).toBe(1);

    await selectSecondaryRegion(page, 'bien');
    await expect.poll(() => visibleGalleryCount(page)).toBe(3);

    await selectSecondaryRegion(page, null);
    await expect.poll(() => visibleGalleryCount(page)).toBe(15);
  });

  test('map hiển thị ngay trên mobile (không cần accordion)', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'Chỉ chạy trên mobile');

    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForMapReady(page);
    await expect(page.locator('#map .leaflet-tile-pane')).toBeAttached();
  });
});
