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

  test('filter tag ẩn bớt card', async ({ page }) => {
    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForLocationsScript(page);

    const statusBefore = await page.locator('#location-filter-status').textContent();
    expect(statusBefore).toMatch(/15 \/ 15/);

    await page.locator('.locations-filters--secondary .filter-tag-btn[data-filter-tag="view-phu-si"]').click();
    await expect(page.locator('#location-filter-status')).not.toHaveText(/15 \/ 15/);
    await expect(page.locator('.location-detail.location-hidden')).not.toHaveCount(0);
  });

  test('filter không có kết quả hiện thông báo', async ({ page }) => {
    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForLocationsScript(page);

    const tags = [
      'view-phu-si',
      'gan-bien',
      'gan-ho',
      'gan-tokyo',
      'gan-suoi-song',
      'mua-xuan',
      'mua-he',
      'mua-thu',
    ];

    for (const tag of tags) {
      await page.locator('.locations-filters--secondary .filter-tag-btn[data-filter-tag="' + tag + '"]').click();
    }

    await expect(page.locator('#location-filter-status')).toHaveText(/0 \/ 15/);
    await expect(page.locator('#location-empty-state.is-visible')).toBeVisible();
    await expect(page.locator('#location-empty-state')).toContainText('Không có bãi phù hợp');
  });

  test('click card highlight và hiện overlay map (desktop)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'Chỉ chạy trên desktop');

    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForMapReady(page);

    const firstCard = page.locator('.location-detail:not(.location-hidden)').first();
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.click();

    await expect(firstCard).toHaveClass(/location-detail--active/);
    const overlay = page.locator('#map-site-overlay.is-visible');
    await expect(overlay).toBeVisible();
    await expect(overlay.locator('.map-site-overlay__title')).not.toBeEmpty();
  });

  test('map hiển thị ngay trên mobile (không cần accordion)', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'Chỉ chạy trên mobile');

    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
    await waitForMapReady(page);
    await expect(page.locator('#map .leaflet-tile-pane')).toBeAttached();
  });
});
