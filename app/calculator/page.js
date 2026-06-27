import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'calculator',
  path: '/calculator',
  title: 'Công cụ tính giá',
  description:
    'Công cụ tham khảo giá cước dịch vụ camping tại Camp Nhà Thỏ theo khu vực, thời gian và số người.',
  noIndex: true,
  scripts: ['/script.js'],
});

export { metadata };
export default Page;
