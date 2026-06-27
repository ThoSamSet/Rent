#!/usr/bin/env node
/**
 * Prepare static assets (fonts, responsive images, vendor, service worker).
 * CSS lives in styles/ and is bundled by Next.js — no root homepage.css.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');

const requiredFiles = [
  'vendor/gsap.min.js',
  'vendor/ScrollTrigger.min.js',
  'images/logoTrongSuot1-512x256.png',
  'images/logoTrongSuot1-1024x512.png',
  'fonts/be-vietnam-pro-vietnamese-400-normal.woff2',
  'public/sw.js',
  'home-map-preview.js',
  'images/responsive/hero-camping-1280w.webp',
  'images/responsive/about-hero-960w.webp',
  'images/responsive/equipment-hero-960w.webp',
  'images/responsive/plan-de-400w.webp',
];

console.log('🔨 Đang chuẩn bị assets tĩnh...');

const buildSteps = [
  ['postinstall', () => execSync('npm run postinstall', { cwd: root, stdio: 'inherit' })],
  ['setup-fonts', () => execSync('node scripts/setup-fonts.js', { cwd: root, stdio: 'inherit' })],
  ['source-images', () => execSync('node scripts/process-source-images.js', { cwd: root, stdio: 'inherit' })],
  ['responsive-images', () => execSync('node scripts/generate-responsive-images.js', { cwd: root, stdio: 'inherit' })],
  ['service-worker', () => execSync('node scripts/generate-sw.js', { cwd: root, stdio: 'inherit' })],
];

for (const [name, run] of buildSteps) {
  try {
    run();
  } catch {
    console.error(`❌ Build step thất bại: ${name}`);
    process.exit(1);
  }
}

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('❌ Thiếu file bắt buộc:');
  missing.forEach((file) => console.error(`   - ${file}`));
  process.exit(1);
}

console.log('✅ Assets sẵn sàng — chạy npm run build:pages để export Next.js');
