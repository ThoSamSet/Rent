// @ts-check
const { test, expect } = require('@playwright/test');

const TOTAL_SITES = 15;

test.describe('locations — danh sách bãi, không bản đồ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations', { waitUntil: 'domcontentloaded' });
  });

  test('hiển thị đủ 15 bãi, chia 5 vùng, không có bản đồ', async ({ page }) => {
    await expect(page.locator('.site-card')).toHaveCount(TOTAL_SITES);
    await expect(page.locator('.region')).toHaveCount(5);
    await expect(page.locator('#map, .leaflet-container')).toHaveCount(0);
  });

  test('lọc theo vùng rồi bỏ lọc', async ({ page }) => {
    const all = page.locator('[data-filter-action="clear"]');
    await expect(all).toHaveAttribute('aria-pressed', 'true');

    await page.locator('[data-filter-tag="saitama"]').click();
    await expect(page.locator('.site-card')).toHaveCount(1);
    await expect(page.locator('.site-card[data-site-id="nagatoro"]')).toBeVisible();

    await page.locator('[data-filter-tag="bien"]').click();
    await expect(page.locator('.site-card')).toHaveCount(3);
    await expect(page.locator('[data-filter-tag="bien"]')).toHaveAttribute('aria-pressed', 'true');

    await page.locator('[data-filter-tag="bien"]').click();
    await expect(page.locator('.site-card')).toHaveCount(TOTAL_SITES);

    await page.locator('[data-filter-tag="phu-si"]').click();
    await expect(page.locator('.site-card')).toHaveCount(6);
    await all.click();
    await expect(page.locator('.site-card')).toHaveCount(TOTAL_SITES);
  });
});
