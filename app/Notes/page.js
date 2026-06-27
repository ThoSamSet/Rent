import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'Notes',
  path: '/Notes',
  title: 'Lưu ý',
  description: 'Những điều cần lưu ý khi sử dụng dịch vụ Camp Nhà Thỏ.',
  noIndex: true,
  scripts: ['/script.js'],
});

export { metadata };
export default Page;
