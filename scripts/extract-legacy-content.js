#!/usr/bin/env node
/**
 * Extract <main> inner HTML from legacy pages for Next.js migration.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'content', 'legacy');

const pages = [
  { src: 'faq.html', slug: 'faq' },
  { src: 'options.html', slug: 'options' },
  { src: 'pricing.html', slug: 'pricing' },
  { src: 'calculator.html', slug: 'calculator' },
  { src: 'dat-lich.html', slug: 'dat-lich' },
  { src: 'schedule.html', slug: 'schedule' },
  { src: 'locations.html', slug: 'locations' },
  { src: 'Notes.html', slug: 'Notes' },
  { src: 'blog/index.html', slug: 'blog-index' },
  { src: 'blog/checklistcampingnhatban/index.html', slug: 'blog-checklistcampingnhatban' },
  { src: 'blog/campingnhatban/index.html', slug: 'blog-campingnhatban' },
  { src: 'blog/campingsakura2026/index.html', slug: 'blog-campingsakura2026' },
];

function depthPrefix(src) {
  const dir = path.dirname(src);
  if (dir === '.') return '';
  const levels = dir.split('/').length;
  return '../'.repeat(levels);
}

function rewritePaths(html, prefix) {
  if (!prefix) return html;
  return html
    .replace(/href="(?!https?:|#|\/|mailto:|tel:)([^"]+)"/g, (_, p) => {
      const hash = p.includes('#') ? p.slice(p.indexOf('#')) : '';
      const base = p.split('#')[0];
      if (base.startsWith('../') || base.startsWith('./')) {
        return `href="${base}"`;
      }
      return `href="${prefix}${base}"`;
    })
    .replace(/src="(?!https?:|\/|data:)([^"]+)"/g, (_, p) => `src="${prefix}${p}"`)
    .replace(/srcset="([^"]+)"/g, (_, srcset) => {
      const rewritten = srcset.replace(/(?<!https?:\/\/)\b([a-zA-Z0-9_./-]+\.(webp|jpg|png|jpeg))\b/g, (m) => {
        if (m.startsWith('http') || m.startsWith('/')) return m;
        return `${prefix}${m}`;
      });
      return `srcset="${rewritten}"`;
    });
}

fs.mkdirSync(outDir, { recursive: true });

for (const { src, slug } of pages) {
  const filePath = path.join(root, src);
  const html = fs.readFileSync(filePath, 'utf8');
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.error(`No <main> in ${src}`);
    process.exit(1);
  }
  const prefix = depthPrefix(src);
  let content = mainMatch[1].trim();
  content = rewritePaths(content, prefix === '../../' ? '/' : prefix === '../' ? '/' : '/');
  content = content
    .replace(/href="\.\.\/\.\.\/([^"]+)"/g, 'href="/$1"')
    .replace(/href="\.\.\/([^"]+)"/g, 'href="/$1"')
    .replace(/src="\.\.\/\.\.\/([^"]+)"/g, 'src="/$1"')
    .replace(/src="\.\.\/([^"]+)"/g, 'src="/$1"')
    .replace(/href="([a-z][^"]*\.html)(#[^"]*)?"/g, (_, page, hash) => {
      const clean = page.replace(/\.html$/, '');
      const dest = clean === 'index' ? '/' : `/${clean}`;
      return hash ? `href="${dest}${hash}"` : `href="${dest}"`;
    })
    .replace(/href="blog\//g, 'href="/blog/')
    .replace(/href="blog\/([^"]+)"/g, 'href="/blog/$1"');

  const headStyles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  const inlineStyles = headStyles.map((s) => s).join('\n');

  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify({ content, inlineStyles }, null, 0)
  );
  console.log(`✓ ${slug}`);
}

console.log('Done.');
