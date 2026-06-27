#!/usr/bin/env node
/**
 * Generate width-based WebP variants for responsive srcset (hero, intro cards, pricing).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const outDirs = [
  path.join(root, 'images', 'responsive'),
  path.join(root, 'public', 'images', 'responsive'),
];

/** @type {{ src: string; widths: number[] }[]} */
const IMAGE_SETS = [
  { src: 'images/hero-camping.webp', widths: [640, 1280, 1920] },
  { src: 'images/index-slide-2.webp', widths: [640, 1280, 1920] },
  { src: 'images/index-slide-3.webp', widths: [640, 1280, 1920] },
  { src: 'images/about-hero.webp', widths: [480, 960, 1440] },
  { src: 'images/equipment-hero.webp', widths: [480, 960, 1440] },
  { src: 'images/plan-de.webp', widths: [400, 800] },
  { src: 'images/plan-bi.webp', widths: [400, 800] },
  { src: 'images/plan-nho.webp', widths: [400, 800] },
  { src: 'images/camping-1.webp', widths: [400, 800, 1200] },
  { src: 'images/camping-2.webp', widths: [400, 800, 1200] },
  { src: 'images/camping-3.webp', widths: [400, 800, 1200] },
  { src: 'images/camping-4.webp', widths: [400, 800, 1200] },
  { src: 'images/camping-5.webp', widths: [400, 800, 1200] },
  { src: 'images/camping-6.webp', widths: [400, 800, 1200] },
];

function basenameNoExt(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

const SOURCE_EXTS = ['.webp', '.jpg', '.jpeg', '.png'];

/** Resolve images/{base}.webp|jpg|jpeg|png — prefer WebP after process-source-images. */
function resolveSourcePath(relativeSrc) {
  const dir = path.dirname(relativeSrc);
  const base = basenameNoExt(relativeSrc);

  for (const ext of SOURCE_EXTS) {
    const candidate = path.join(root, dir, `${base}${ext}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return path.join(root, relativeSrc);
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
  for (const dir of outDirs) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let created = 0;
  let skipped = 0;

  for (const { src, widths } of IMAGE_SETS) {
    const sourcePath = resolveSourcePath(src);
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Không tìm thấy ảnh nguồn: ${src} (đã thử ${SOURCE_EXTS.join(', ')})`);
      process.exit(1);
    }

    const base = basenameNoExt(src);
    for (const width of widths) {
      const fileName = `${base}-${width}w.webp`;
      const primaryDest = path.join(outDirs[0], fileName);
      const didCreate = await ensureVariant(sourcePath, width, primaryDest);
      for (let i = 1; i < outDirs.length; i += 1) {
        const destPath = path.join(outDirs[i], fileName);
        if (didCreate || !fs.existsSync(destPath)) {
          fs.copyFileSync(primaryDest, destPath);
        }
      }
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
