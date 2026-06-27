#!/usr/bin/env node
/**
 * Remove font-size declarations from legacy HTML inline <style> blocks
 * Typography lives in styles/site/index.css (bundled by Next.js).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

/** Legacy root HTML removed — typography is in styles/site/index.css via Next.js. */
const htmlFiles = [];

function stripFontSizeFromCss(css) {
  return css
    .split('\n')
    .filter((line) => !/^\s*font-size\s*:/.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}

function stripFontSizeFromStyleBlocks(html) {
  return html.replace(/<style>([\s\S]*?)<\/style>/gi, (match, css) => {
    const cleaned = stripFontSizeFromCss(css);
    if (!cleaned.trim()) {
      return '';
    }
    return `<style>${cleaned}</style>`;
  });
}

function stripInlineFontSizeAttrs(html) {
  return html.replace(/\sstyle="([^"]*)"/gi, (match, style) => {
    const cleaned = style
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s && !/^font-size\s*:/i.test(s))
      .join('; ');
    if (!cleaned) {
      return '';
    }
    return ` style="${cleaned}"`;
  });
}

for (const rel of htmlFiles) {
  const filePath = path.join(root, rel);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Skip missing: ${rel}`);
    continue;
  }
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = stripInlineFontSizeAttrs(stripFontSizeFromStyleBlocks(original));
  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log(`✅ ${rel}`);
  }
}

const legacyDir = path.join(root, 'content', 'legacy');
for (const name of fs.readdirSync(legacyDir)) {
  if (!name.endsWith('.json')) continue;
  const filePath = path.join(legacyDir, name);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (data.inlineStyles) {
    const cleaned = data.inlineStyles.replace(
      /<style>([\s\S]*?)<\/style>/i,
      (match, css) => {
        const stripped = stripFontSizeFromCss(css);
        if (!stripped.trim()) {
          return '';
        }
        return `<style>${stripped}</style>`;
      }
    );
    if (cleaned !== data.inlineStyles) {
      data.inlineStyles = cleaned;
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log(`✅ content/legacy/${name}`);
    }
  }
}

console.log('Done stripping inline font-size declarations.');
