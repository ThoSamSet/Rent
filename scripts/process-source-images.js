#!/usr/bin/env node
/**
 * Convert raster originals in images/ to WebP and sync assets to public/images/.
 * Runs before generate-responsive-images on each build.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const imagesDir = path.join(root, 'images');
const publicImagesDir = path.join(root, 'public', 'images');

const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png']);
/** PNG logos — keep format, do not convert to WebP */
const KEEP_PNG = new Set([
  'logoTrongSuot1-512x256.png',
  'logoTrongSuot1-1024x512.png',
  'LogoCampNhaThoBRAND.png',
]);

function listSourceImages() {
  if (!fs.existsSync(imagesDir)) {
    return [];
  }

  return fs
    .readdirSync(imagesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => RASTER_EXT.has(path.extname(name).toLowerCase()));
}

function shouldRefresh(destPath, sourceMtime) {
  return !fs.existsSync(destPath) || fs.statSync(destPath).mtimeMs < sourceMtime;
}

async function convertToWebp(sourcePath, destPath) {
  const sourceMtime = fs.statSync(sourcePath).mtimeMs;
  if (!shouldRefresh(destPath, sourceMtime)) {
    return false;
  }

  try {
    await sharp(sourcePath).webp({ quality: 85 }).toFile(destPath);
    return true;
  } catch (err) {
    console.warn(`⚠️  Bỏ qua WebP ${path.basename(sourcePath)}: ${err.message}`);
    return false;
  }
}

function syncFile(fileName) {
  const sourcePath = path.join(imagesDir, fileName);
  const destPath = path.join(publicImagesDir, fileName);
  if (!fs.existsSync(sourcePath)) {
    return false;
  }

  const sourceMtime = fs.statSync(sourcePath).mtimeMs;
  if (!shouldRefresh(destPath, sourceMtime)) {
    return false;
  }

  fs.mkdirSync(publicImagesDir, { recursive: true });
  fs.copyFileSync(sourcePath, destPath);
  return true;
}

async function main() {
  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(publicImagesDir, { recursive: true });

  let converted = 0;
  let convertedSkipped = 0;
  let synced = 0;
  let syncedSkipped = 0;

  for (const fileName of listSourceImages()) {
    const sourcePath = path.join(imagesDir, fileName);
    const base = path.basename(fileName, path.extname(fileName));
    const ext = path.extname(fileName).toLowerCase();

    if (ext === '.png' && KEEP_PNG.has(fileName)) {
      if (syncFile(fileName)) {
        synced += 1;
      } else {
        syncedSkipped += 1;
      }
      continue;
    }

    const webpName = `${base}.webp`;
    const webpPath = path.join(imagesDir, webpName);
    const didConvert = await convertToWebp(sourcePath, webpPath);
    if (didConvert) {
      converted += 1;
    } else {
      convertedSkipped += 1;
    }

    if (syncFile(fileName)) {
      synced += 1;
    } else {
      syncedSkipped += 1;
    }

    if (syncFile(webpName)) {
      synced += 1;
    } else if (fs.existsSync(webpPath)) {
      syncedSkipped += 1;
    }
  }

  // Sync WebP-only sources (no matching JPG/PNG in this pass)
  for (const fileName of fs.readdirSync(imagesDir)) {
    if (!fileName.endsWith('.webp') || fileName.includes('/')) {
      continue;
    }
    if (syncFile(fileName)) {
      synced += 1;
    }
  }

  console.log(
    `✅ Source images — WebP: ${converted} mới, ${convertedSkipped} giữ | public: ${synced} copy, ${syncedSkipped} giữ`,
  );
}

main().catch((err) => {
  console.error('❌ process-source-images:', err);
  process.exit(1);
});
