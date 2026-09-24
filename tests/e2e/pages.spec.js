// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/** @type {{ path: string; name: string; heading?: RegExp }[]} */
const PAGES = [
  { path: '/', name: 'index', heading: /cùng chill/i },
  { path: '/schedule', name: 'schedule', heading: /còn chỗ/i },
  { path: '/equipment', name: 'equipment', heading: /đồ/i },
  { path: '/options', name: 'options', heading: /đêm nay/i },
  { path: '/about', name: 'about', heading: /chia sẻ/i },
  { path: '/pricing', name: 'pricing', heading: /một đêm/i },
  { path: '/locations', name: 'locations', heading: /kanto/i },
  { path: '/faq', name: 'faq', heading: /hay được hỏi/i },
  { path: '/blog', name: 'blog', heading: /ghi chép/i },
  { path: '/dat-lich', name: 'dat-lich', heading: /tin nhắn/i },
  { path: '/blog/campingnhatban', name: 'blog-article', heading: /camping ở nhật/i },
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
        if (/favicon|google|gtag|analytics|leaflet|unpkg|fonts\.google|ERR_INVALID_CHUNKED_ENCODING/i.test(text)) return;
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

    if (page.name === 'index') {
      await expect(pw.locator('#muc-luc')).toBeVisible();
      await expect(pw.locator('#pricing')).toBeVisible();
      await expect(pw.locator('#notices')).toBeVisible();
      await expect(pw.locator('#blog')).toBeVisible();
      await expect(pw.locator('#gallery')).toBeVisible();
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

test('masthead hiển thị trên trang chủ', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header.masthead')).toBeVisible();
  await expect(page.locator('.masthead__logo')).toHaveText('Camp Nhà Thỏ');
});

test.describe('schedule mobile', () => {
  test('lịch vừa khít màn hình mobile, không cần vuốt ngang', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'Chỉ chạy trên viewport mobile');

    await page.goto('/schedule', { waitUntil: 'domcontentloaded' });

    const scroller = page.locator('.cal-scroll').first();
    await expect(scroller).toBeVisible();

    const dimensions = await scroller.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
});

test.describe('mục lục toàn trang', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('nút Mục lục mở và đóng danh mục', async ({ page }) => {
    const button = page.locator('#mastheadMenuButton');
    const index = page.locator('#siteIndex');

    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await button.click();
    await expect(index).toHaveClass(/is-open/);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('html')).toHaveClass(/site-index-open/);
    await expect(index.locator('a[href="/pricing"]')).toBeVisible();

    const box = await index.boundingBox();
    const viewport = page.viewportSize();
    expect(box).toBeTruthy();
    expect(viewport).toBeTruthy();
    expect(box.width).toBeGreaterThanOrEqual(viewport.width * 0.95);

    await page.keyboard.press('Escape');
    await expect(index).not.toHaveClass(/is-open/);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('nút Đặt lịch nằm bên trái nút Mục lục', async ({ page }) => {
    const cta = page.locator('.masthead__actions .masthead__cta');
    const button = page.locator('.masthead__actions #mastheadMenuButton');

    await expect(cta).toBeVisible();
    await expect(button).toBeVisible();

    const ctaBox = await cta.boundingBox();
    const buttonBox = await button.boundingBox();
    expect(ctaBox).toBeTruthy();
    expect(buttonBox).toBeTruthy();
    expect(ctaBox.x).toBeLessThan(buttonBox.x);
  });
});
