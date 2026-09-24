# Kiểm thử

## Lần đầu

```bash
npm install
npm run playwright:install
```

## Chạy full pipeline

```bash
npm run test:full
```

Pipeline: **lint → build → Playwright (screenshot) → báo cáo**

## Kết quả

| Đường dẫn | Nội dung |
|-----------|----------|
| `test-results/report.md` | Báo cáo tóm tắt (tiếng Việt) |
| `test-results/screenshots/` | Ảnh full-page desktop & mobile |
| `playwright-report/index.html` | Báo cáo Playwright chi tiết |

## Lệnh riêng

- `npm run lint` — ESLint + HTML Validate
- `npm run build` — copy vendor GSAP, kiểm tra file
- `npm run test:e2e` — chỉ Playwright

Pipeline chỉ chạy khi gọi `npm run test:full` thủ công.

## Hạn chế

- Site tĩnh, không có bundler — `build` chỉ verify + copy vendor
- Lỗi CDN/mạng (Google Fonts, Leaflet) có thể bị bỏ qua trong test console
