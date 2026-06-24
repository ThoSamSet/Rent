#!/usr/bin/env node
/**
 * Summarize pipeline results into test-results/report.md
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'test-results');
const reportPath = path.join(outDir, 'report.md');
const resultsJson = path.join(outDir, 'results.json');

const failures = process.argv.slice(2);
const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

let playwrightSummary = '_Chưa chạy Playwright._';
let passed = 0;
let failed = 0;
let skipped = 0;

if (fs.existsSync(resultsJson)) {
  try {
    const data = JSON.parse(fs.readFileSync(resultsJson, 'utf8'));
    const suites = data.suites || [];
    const collect = (suite, acc = []) => {
      if (suite.specs) acc.push(...suite.specs);
      (suite.suites || []).forEach((s) => collect(s, acc));
      return acc;
    };
    const specs = suites.flatMap((s) => collect(s));
    specs.forEach((spec) => {
      (spec.tests || []).forEach((test) => {
        const status = test.results?.[0]?.status || test.status;
        if (status === 'passed') passed += 1;
        else if (status === 'skipped') skipped += 1;
        else failed += 1;
      });
    });
    playwrightSummary = `Đã qua: **${passed}** | Thất bại: **${failed}** | Bỏ qua: **${skipped}**`;
  } catch {
    playwrightSummary = '_Không đọc được test-results/results.json_';
  }
}

const screenshots = fs.existsSync(path.join(outDir, 'screenshots'))
  ? fs.readdirSync(path.join(outDir, 'screenshots')).filter((f) => f.endsWith('.png'))
  : [];

const status = failures.length === 0 && failed === 0 ? '✅ THÀNH CÔNG' : '❌ THẤT BẠI';

const lines = [
  '# Báo cáo kiểm thử — Camp Nhà Thỏ',
  '',
  `**Thời gian:** ${now}`,
  `**Trạng thái:** ${status}`,
  '',
  '## Tóm tắt pipeline',
  '',
  '| Bước | Kết quả |',
  '|------|---------|',
  `| Lint | ${failures.some((f) => f.includes('Lint')) ? '❌' : '✅'} |`,
  `| Build | ${failures.some((f) => f.includes('Build')) ? '❌' : '✅'} |`,
  `| Playwright | ${failures.some((f) => f.includes('Playwright')) || failed > 0 ? '❌' : '✅'} |`,
  '',
  '## Playwright',
  '',
  playwrightSummary,
  '',
  '## Ảnh chụp màn hình',
  '',
];

if (screenshots.length) {
  screenshots.forEach((file) => {
    lines.push(`- [${file}](screenshots/${file})`);
  });
} else {
  lines.push('_Chưa có ảnh trong test-results/screenshots/_');
}

lines.push(
  '',
  '## Xem thêm',
  '',
  '- HTML report: `playwright-report/index.html`',
  '- Artifact Playwright: `test-results/artifacts/`',
  '- Chạy lại: `npm run test:full`',
  ''
);

if (failures.length) {
  lines.push('## Lỗi pipeline', '');
  failures.forEach((f) => lines.push(`- ${f}`));
  lines.push('');
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(reportPath, lines.join('\n'));
console.log(`📄 Báo cáo: ${reportPath}`);
