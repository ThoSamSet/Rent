#!/usr/bin/env node
/**
 * Production build for GitHub Pages — Next.js static export to out/.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

function run(command) {
  execSync(command, { cwd: root, stdio: 'inherit' });
}

function ensurePagesPublicFiles() {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, '.nojekyll'), '');

  const cnamePath = path.join(root, 'CNAME');
  if (fs.existsSync(cnamePath)) {
    const cname = fs.readFileSync(cnamePath, 'utf8').trim();
    fs.writeFileSync(path.join(publicDir, 'CNAME'), `${cname}\n`);
  }
}

console.log('🔨 Build GitHub Pages (Next.js static export)...');

run('node scripts/build.js');
ensurePagesPublicFiles();
run('node scripts/generate-html-redirects.js');
run('next build');

const outIndex = path.join(root, 'out', 'index.html');
if (!fs.existsSync(outIndex)) {
  console.error('❌ Thiếu out/index.html — next build thất bại.');
  process.exit(1);
}

console.log('✅ out/ sẵn sàng deploy lên GitHub Pages');
