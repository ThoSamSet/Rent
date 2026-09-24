// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('đặt lịch — từ lịch trống đến tin nhắn', () => {
  test('chọn ngày trên lịch mở form với ngày điền sẵn và tính giá', async ({ page }) => {
    await page.goto('/schedule', { waitUntil: 'domcontentloaded' });

    const cell = page.locator('.cal td.is-bookable').first();
    await expect(cell).toBeVisible();
    const iso = await cell.getAttribute('data-booking-date');
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    await cell.click();

    await expect(page).toHaveURL(/\/dat-lich\?ngay=/);
    const [year, month, day] = iso.split('-');
    await expect(page.locator('#startDate')).toHaveValue(`${day}/${month}/${year}`);

    await page.locator('#people').selectOption('3');
    await page.locator('[data-wizard-next]').click();
    await expect(page.locator('[data-wizard-step="2"]')).toBeVisible();

    await page.locator('.booking-plan-card', { hasText: 'Hạt Nho' }).click();
    await page.locator('[data-wizard-next]').click();
    await expect(page.locator('[data-wizard-step="3"]')).toBeVisible();

    await page.locator('[data-wizard-next]').click();
    await expect(page.locator('[data-wizard-step="4"]')).toBeVisible();

    await expect(page.locator('#priceTotal')).toHaveText('~7man');
    await expect(page.locator('#messagePreview')).toContainText('Plan: Hạt Nho');
    await expect(page.locator('#messagePreview')).toContainText('3');
  });

  test('Hạt Dẻ ẩn khu vực đón', async ({ page }) => {
    await page.goto('/dat-lich', { waitUntil: 'domcontentloaded' });
    await page.locator('#startDate').fill('14/11/2026');
    await page.locator('[data-wizard-next]').click();
    await page.locator('.booking-plan-card', { hasText: 'Hạt Dẻ' }).click();
    await page.locator('[data-wizard-next]').click();
    await expect(page.locator('[data-wizard-step="3"]')).toBeVisible();
    await expect(page.locator('#pickupAreaGroup')).toBeHidden();
  });
});
