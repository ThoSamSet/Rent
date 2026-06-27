#!/usr/bin/env node
/**
 * Static file server for Playwright E2E — serves Next.js export from out/.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ROOT = process.env.STATIC_ROOT || path.join(root, 'out');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(ROOT, normalized);
  if (!filePath.startsWith(ROOT)) {
    return null;
  }
  return filePath;
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500);
      res.end(err.code === 'ENOENT' ? 'Not Found' : 'Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}

function resolveFilePath(urlPath) {
  if (urlPath === '/') {
    return safePath('/index.html');
  }

  const direct = safePath(urlPath);
  if (!direct) {
    return null;
  }

  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
    return direct;
  }

  if (urlPath.endsWith('/')) {
    return safePath(`${urlPath}index.html`);
  }

  const htmlFallback = safePath(`${urlPath}.html`);
  if (htmlFallback && fs.existsSync(htmlFallback) && fs.statSync(htmlFallback).isFile()) {
    return htmlFallback;
  }

  const dirIndex = safePath(`${urlPath}/index.html`);
  if (dirIndex && fs.existsSync(dirIndex) && fs.statSync(dirIndex).isFile()) {
    return dirIndex;
  }

  return direct;
}

if (!fs.existsSync(ROOT)) {
  console.error(`❌ Thư mục static không tồn tại: ${ROOT}`);
  console.error('   Chạy npm run build:pages trước khi serve.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const urlPath = req.url || '/';
  const filePath = resolveFilePath(urlPath);

  if (!filePath) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      sendFile(res, path.join(filePath, 'index.html'));
      return;
    }
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    sendFile(res, filePath);
  });
});

server.listen(PORT, HOST, () => {
  process.stdout.write(`Static server http://${HOST}:${PORT} → ${ROOT}\n`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
