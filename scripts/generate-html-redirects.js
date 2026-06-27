#!/usr/bin/env node
/**
 * Generate .html redirect stubs for GitHub Pages (static export has no server redirects).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const redirects = [
  { file: 'index.html', target: '/' },
  { file: 'about.html', target: '/about' },
  { file: 'equipment.html', target: '/equipment' },
  { file: 'options.html', target: '/options' },
  { file: 'pricing.html', target: '/pricing' },
  { file: 'schedule.html', target: '/schedule' },
  { file: 'dat-lich.html', target: '/dat-lich' },
  { file: 'calculator.html', target: '/calculator' },
  { file: 'faq.html', target: '/faq' },
  { file: 'locations.html', target: '/locations' },
  { file: 'Notes.html', target: '/Notes' },
  { file: 'contact.html', target: '/dat-lich#lien-he' },
  { file: 'blog/index.html', target: '/blog' },
  { file: 'blog/checklistcampingnhatban/index.html', target: '/blog/checklistcampingnhatban' },
  { file: 'blog/campingnhatban/index.html', target: '/blog/campingnhatban' },
  { file: 'blog/campingsakura2026/index.html', target: '/blog/campingsakura2026' },
];

function html(target) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${target}">
<script>window.location.replace('${target}');</script>
</head>
<body>
<p>Đang chuyển hướng… <a href="${target}">Nhấn vào đây</a> nếu không tự chuyển.</p>
</body>
</html>
`;
}

for (const { file, target } of redirects) {
  const outPath = path.join(publicDir, file);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html(target));
}

console.log(`✅ HTML redirects — ${redirects.length} files in public/`);
