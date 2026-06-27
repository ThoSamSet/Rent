import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'faq',
  path: '/faq',
  title: 'FAQ - Câu hỏi thường gặp về Camping Phú Sĩ',
  description:
    'Câu hỏi thường gặp về dịch vụ share đồ camping tại Phú Sĩ. Giải đáp về giá, thanh toán, đặt lịch, dụng cụ, và các thắc mắc khác.',
  image: '/images/faq-hero.jpg',
});

export { metadata };
export default Page;
