// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/** @type {{ path: string; name: string; heading?: RegExp }[]} */
const PAGES = [
  { path: '/', name: 'index', heading: /Camp|Nhà Thỏ|camping/i },
  { path: '/index.html', name: 'index-html', heading: /Camp|Nhà Thỏ|camping/i },
  { path: '/schedule.html', name: 'schedule', heading: /lịch|schedule|đặt/i },
  { path: '/equipment.html', name: 'equipment', heading: /đồ|thiết bị|dụng cụ|equipment|camping/i },
  { path: '/about.html', name: 'about' },
  { path: '/pricing.html', name: 'pricing' },
  { path: '/locations.html', name: 'locations' },
  { path: '/faq.html', name: 'faq' },
  { path: '/dat-lich.html', name: 'dat-lich' },
];

const screenshotDir = path.join(__dirname, '../../test-results/screenshots');

test.beforeAll(() => {
  fs.mkdirSync(screenshotDir, { recursive: true });
});

for (const page of PAGES) {
  test(`trang ${page.name} tải được và không lỗi console nghiêm trọng`, async ({ page: pw }, testInfo) => {
    const consoleErrors = [];
    pw.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Bỏ qua lỗi mạng/CDN phổ biến khi chạy local
        if (/favicon|google|gtag|analytics|leaflet|unpkg|fonts\.google/i.test(text)) return;
        consoleErrors.push(text);
      }
    });

    const response = await pw.goto(page.path, { waitUntil: 'domcontentloaded' });
    expect(response?.ok(), `HTTP ${response?.status()} cho ${page.path}`).toBeTruthy();

    await pw.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});

    const title = await pw.title();
    expect(title.length, 'title không được rỗng').toBeGreaterThan(0);

    if (page.heading) {
      const heading = pw.getByRole('heading', { level: 1 }).first();
      if (await heading.count()) {
        await expect(heading).toContainText(page.heading);
      }
    }

    const viewport = testInfo.project.name.includes('mobile') ? 'mobile' : 'desktop';
    const shotName = `${page.name}-${viewport}.png`;
    await pw.screenshot({
      path: path.join(screenshotDir, shotName),
      fullPage: true,
    });

    await testInfo.attach(shotName, {
      path: path.join(screenshotDir, shotName),
      contentType: 'image/png',
    });

    expect(consoleErrors, `Lỗi console trên ${page.path}:\n${consoleErrors.join('\n')}`).toEqual([]);
  });
}

test('navigation chính hiển thị trên trang chủ', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav, header').first();
  await expect(nav).toBeVisible();
});
