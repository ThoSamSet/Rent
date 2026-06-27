#!/usr/bin/env node
/**
 * Map hardcoded font-size: Npx to typography CSS variables in styles/site/index.css
 * Skips clamp(), em, rem, inherit, and var() values.
 */
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'styles', 'site', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

const pxToVar = {
  64: 'var(--text-4xl)',
  56: 'var(--text-4xl)',
  48: 'var(--text-3xl)',
  40: 'var(--text-3xl)',
  36: 'var(--text-3xl)',
  32: 'var(--text-3xl)',
  28: 'var(--text-2xl)',
  26: 'var(--text-2xl)',
  24: 'var(--text-2xl)',
  22: 'var(--text-2xl)',
  21: 'var(--text-xl)',
  20: 'var(--text-xl)',
  19: 'var(--text-xl)',
  18: 'var(--text-lg)',
  17: 'var(--text-md)',
  16: 'var(--text-base)',
  15: 'var(--text-base)',
  14: 'var(--text-sm)',
  13: 'var(--text-sm)',
  12: 'var(--text-xs)',
  11: 'var(--text-xs)',
  10: 'var(--text-xs)',
  9: 'var(--text-xs)',
};

const sizes = Object.keys(pxToVar)
  .map(Number)
  .sort((a, b) => b - a);

for (const px of sizes) {
  const re = new RegExp(`(font-size:\\s*)${px}px(\\s*;)`, 'g');
  css = css.replace(re, `$1${pxToVar[px]}$2`);
}

fs.writeFileSync(cssPath, css);
console.log('✅ Applied typography tokens to styles/site/index.css');
