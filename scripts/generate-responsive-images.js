#!/usr/bin/env node
/**
 * Generate width-based WebP variants for responsive srcset (hero, intro cards, pricing).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'images', 'responsive');

/** @type {{ src: string; widths: number[] }[]} */
const IMAGE_SETS = [
  { src: 'images/hero-camping.webp', widths: [640, 1280, 1920] },
  { src: 'images/about-hero.webp', widths: [480, 960, 1440] },
  { src: 'images/equipment-hero.webp', widths: [480, 960, 1440] },
  { src: 'images/plan-de.webp', widths: [400, 800] },
  { src: 'images/plan-bi.webp', widths: [400, 800] },
  { src: 'images/plan-nho.webp', widths: [400, 800] },
];

function basenameNoExt(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

async function ensureVariant(sourcePath, width, destPath) {
  if (fs.existsSync(destPath)) {
    const sourceMtime = fs.statSync(sourcePath).mtimeMs;
    const destMtime = fs.statSync(destPath).mtimeMs;
    if (destMtime >= sourceMtime) {
      return false;
    }
  }

  await sharp(sourcePath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(destPath);

  return true;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (const { src, widths } of IMAGE_SETS) {
    const sourcePath = path.join(root, src);
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Không tìm thấy ảnh nguồn: ${src}`);
      process.exit(1);
    }

    const base = basenameNoExt(src);
    for (const width of widths) {
      const destPath = path.join(outDir, `${base}-${width}w.webp`);
      const didCreate = await ensureVariant(sourcePath, width, destPath);
      if (didCreate) {
        created += 1;
      } else {
        skipped += 1;
      }
    }
  }

  console.log(`✅ Responsive images — tạo mới: ${created}, giữ nguyên: ${skipped}`);
}

main().catch((err) => {
  console.error('❌ generate-responsive-images:', err);
  process.exit(1);
});
