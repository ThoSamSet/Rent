/** Equipment page — intro, categories, bring-your-own copy. */

export const EQUIPMENT_INTRO = {
  label: 'Lần đầu cũng được',
  title: 'Chưa có đồ? Không sao.',
  text: 'Lều, bếp, đèn, túi ngủ đã sẵn sàng. Tụi mình setup và hướng dẫn — bạn chỉ việc trải nghiệm.',
};

export const EQUIPMENT_BRING = {
  label: 'Mang theo gì?',
  title: 'Đồ cá nhân gợi ý',
  text: 'Quần áo ấm · giày đi bộ · đồ tắm · gối cá nhân · snack & nước uống.',
  link: { href: '/blog/checklistcampingnhatban', label: 'Checklist chi tiết →' },
};

export const EQUIPMENT_FOOTNOTES =
  '※ Máy ảnh, Switch, máy chiếu — báo trước để chuẩn bị. Dụng cụ vệ sinh sạch, kiểm tra kỹ trước mỗi chuyến.';

export const EQUIPMENT_CATEGORIES = [
  {
    id: 'equip-sleep',
    title: 'Lều & chỗ ngủ',
    images: [
      { src: '/images/equipment-sleep.jpg', alt: 'Lều camping và túi ngủ', caption: 'Lều 2 room' },
      { src: '/images/equipment-tent.jpg', alt: 'Lều 2 room camping', caption: 'Túi ngủ · thảm bạc · chăn theo mùa' },
      { src: '/images/dung-cu-1.webp', alt: 'Dụng cụ camping Camp Nhà Thỏ', caption: 'Dụng cụ camping' },
      { src: '/images/subBanner-dung-cu.webp', alt: 'Đồ camping sẵn sàng', caption: 'Đồ camping sẵn sàng' },
    ],
  },
  {
    id: 'equip-table',
    title: 'Bàn ghế & không gian',
    images: [
      { src: '/images/equipment-table.jpg', alt: 'Bàn ghế camping', caption: 'Bàn camping · ghế xếp' },
      { src: '/images/equipment-tent.jpg', alt: 'Không gian sinh hoạt dưới tarp', caption: 'Tarp che nắng & mưa' },
      { src: '/images/dung-cu-1.webp', alt: 'Setup không gian camping', caption: 'Không gian sinh hoạt' },
    ],
  },
  {
    id: 'equip-cook',
    title: 'Nấu ăn & BBQ',
    images: [
      { src: '/images/equipment-cooking.jpg', alt: 'Bếp nấu ăn camping', caption: 'Bếp gas · bếp củi', note: '※ gồm củi' },
      { src: '/images/food-bbq.jpg', alt: 'BBQ camping', caption: 'Nồi · chảo · dao' },
      { src: '/images/food-hotpot.jpg', alt: 'Lẩu nóng camping', caption: 'Lẩu nóng camping' },
      { src: '/images/food-breakfast.jpg', alt: 'Bữa sáng camping', caption: 'Bữa sáng camping' },
    ],
  },
  {
    id: 'equip-food',
    title: 'Ăn uống & dụng cụ',
    images: [
      { src: '/images/food-drink.jpg', alt: 'Dụng cụ ăn uống camping', caption: 'Bát · đĩa · cốc · đũa · muỗng' },
      { src: '/images/food-breakfast.jpg', alt: 'Bữa sáng tại bãi camp', caption: 'Bữa sáng tại bãi camp' },
      { src: '/images/food-bbq.jpg', alt: 'Ăn uống ngoài trời', caption: 'Ăn uống ngoài trời' },
    ],
  },
  {
    id: 'equip-light',
    title: 'Đèn & điện',
    images: [
      { src: '/images/equipment-light.jpg', alt: 'Đèn trang trí camping', caption: 'Đèn trang trí' },
      { src: '/images/equipment-tent.jpg', alt: 'Không gian camp buổi tối', caption: 'Lò sưởi dầu', note: '※ mùa lạnh' },
      { src: '/images/dung-cu-1.webp', alt: 'Ánh sáng và setup camp', caption: 'Ánh sáng & setup camp' },
    ],
  },
  {
    id: 'equip-fun',
    title: 'Giải trí & ghi hình',
    images: [
      { src: '/images/equipment-entertainment.jpg', alt: 'Giải trí camping', caption: 'Fujifilm X-T5 · Nintendo Switch' },
      { src: '/images/chill-chup-anh-1.webp', alt: 'Chụp hình kỷ niệm camping', caption: 'Chụp hình kỷ niệm' },
      { src: '/images/option-xem-phim.jpg', alt: 'Xem phim ngoài trời', caption: 'Máy chiếu Full HD', note: '※ báo trước' },
    ],
  },
];
