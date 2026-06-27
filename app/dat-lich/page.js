import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'dat-lich',
  path: '/dat-lich',
  title: 'Đặt lịch Camping',
  description:
    'Đặt lịch camping với Camp Nhà Thỏ — chọn ngày, plan, nhận mẫu tin nhắn cá nhân hoá kèm ước tính chi phí, rồi liên hệ qua TikTok hoặc Facebook.',
  image: '/images/hero-contact-campnhatho.jpg',
  scripts: ['/locations-map-sites.js', '/booking-form.js'],
});

export { metadata };
export default Page;
