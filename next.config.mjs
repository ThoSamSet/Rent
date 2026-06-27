/** @type {import('next').NextConfig} */

const basePath = process.env.GITHUB_PAGES_BASE_PATH || '';
const assetPrefix = basePath || undefined;

const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
