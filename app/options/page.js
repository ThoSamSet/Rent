import { createLegacyPage } from '@/lib/create-legacy-page';

const { metadata, Page } = createLegacyPage({
  slug: 'options',
  path: '/options',
  title: 'Option thêm — Đồ ăn, xem phim, di chuyển',
  description:
    'Các option kèm chuyến camping tại Camp Nhà Thỏ: đồ ăn, xem phim, option đi đường thường để tiết kiệm chi phí. Giá tham khảo và trạng thái dịch vụ.',
  image: '/images/options-hero.jpg',
});

export { metadata };
export default Page;
