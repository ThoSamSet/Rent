#!/usr/bin/env node
/**
 * Static site "build" — copy vendor assets and verify key files exist.
 * No bundler; site is served as-is from the repo root.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');

const requiredFiles = [
  'index.html',
  'homepage.css',
  'script.js',
  'vendor/gsap.min.js',
  'vendor/ScrollTrigger.min.js',
];

console.log('🔨 Đang chuẩn bị site tĩnh...');

try {
  execSync('npm run postinstall', { cwd: root, stdio: 'inherit' });
} catch {
  console.error('❌ Không thể copy GSAP vào vendor/');
  process.exit(1);
}

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('❌ Thiếu file bắt buộc:');
  missing.forEach((file) => console.error(`   - ${file}`));
  process.exit(1);
}

console.log('✅ Build xong — site sẵn sàng phục vụ tĩnh (npm run test:e2e hoặc npx serve .)');
