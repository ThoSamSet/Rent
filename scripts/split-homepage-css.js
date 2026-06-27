#!/usr/bin/env node
/**
 * Split styles/homepage.css into site + pages (home, editorial).
 * Migrates body[data-page] → .page-home / .page-editorial on whole blocks.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'styles', 'homepage.css');
const lines = fs.readFileSync(src, 'utf8').split('\n');

const SITE_END = 3157;
const EDITORIAL_START = 4484;

function migrate(css) {
  return css
    .replace(/body\[data-page="home"\]/g, '.page-home')
    .replace(/body\[data-page="about"\]/g, '.page-editorial')
    .replace(/body\[data-page="equipment"\]/g, '.page-editorial')
    .replace(/html\.camp-gsap body\[data-page="home"\]/g, 'html.camp-gsap .page-home')
    .replace(/html\.camp-gsap body\[data-page="about"\]/g, 'html.camp-gsap .page-editorial')
    .replace(/html\.camp-gsap body\[data-page="equipment"\]/g, 'html.camp-gsap .page-editorial');
}

const siteCss = lines.slice(0, SITE_END).join('\n');
const homeCss =
  '/* Home page — scoped .page-home (SSR, no body[data-page]) */\n' +
  migrate(lines.slice(SITE_END, EDITORIAL_START).join('\n'));
const editorialCss =
  '/* About & Equipment — scoped .page-editorial */\n' +
  migrate(lines.slice(EDITORIAL_START).join('\n'));

const outDir = path.join(root, 'styles');
fs.mkdirSync(path.join(outDir, 'site'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'pages'), { recursive: true });

fs.writeFileSync(path.join(outDir, 'site', 'index.css'), siteCss);
fs.writeFileSync(path.join(outDir, 'pages', 'home.css'), homeCss);
fs.writeFileSync(path.join(outDir, 'pages', 'editorial.css'), editorialCss);

console.log('✅ Split homepage.css → site/index.css, pages/home.css, pages/editorial.css');
