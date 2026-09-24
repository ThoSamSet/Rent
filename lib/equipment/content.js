/** Equipment — what comes in the car, and what to pack yourself. */

export const EQUIPMENT_COVER = {
  kicker: 'Dụng cụ',
  title: ['Chưa có đồ?', '*Không sao.*'],
  deck: 'Lều, bếp, đèn, túi ngủ, tụi mình có đủ. Tụi mình dựng trại và chỉ bạn cách dùng từng món. Lần đầu đi cũng không sao.',
};

export const EQUIPMENT_BRING = {
  title: 'Phần *bạn mang theo*',
  items: [
    'Một chiếc áo ấm, kể cả mùa hè, vì đêm trên núi lạnh hơn bạn nghĩ',
    'Giày đi bộ êm chân',
    'Đồ tắm và khăn',
    'Gối quen của bạn, nếu khó ngủ chỗ lạ',
    'Snack, nước uống và món bạn muốn nấu',
  ],
  link: { href: '/blog/checklistcampingnhatban', label: 'Đọc checklist đầy đủ cho người mới' },
};

export const EQUIPMENT_FOOTNOTES = [
  'Nếu muốn dùng máy ảnh, Nintendo Switch hay máy chiếu, bạn báo trước để tụi mình mang theo.',
  'Tụi mình vệ sinh và kiểm tra từng món trước mỗi chuyến.',
];

export const EQUIPMENT_CATEGORIES = [
  {
    id: 'equip-sleep',
    title: 'Chỗ *ngả lưng*',
    images: [
      { src: '/images/equipment-leu-2-room.webp', alt: 'Lều 2 room camping', caption: 'Lều 2 room' },
      { src: '/images/equipment-sleep.webp', alt: 'Túi ngủ, thảm bạc và chăn theo mùa', caption: 'Túi ngủ · thảm bạc · chăn' },
      { src: '/images/dung-cu-1.webp', alt: 'Dụng cụ camping Camp Nhà Thỏ', caption: 'Dụng cụ camping' },
    ],
  },
  {
    id: 'equip-table',
    title: 'Bàn ghế, *mái che*',
    images: [
      { src: '/images/plan-bi.webp', alt: 'Bàn ghế camping dưới mái lều', caption: 'Bàn · ghế xếp' },
      { src: '/images/equipment-tent.jpg', alt: 'Không gian sinh hoạt dưới tarp', caption: 'Tarp che nắng, mưa' },
    ],
  },
  {
    id: 'equip-cook',
    title: 'Góc *bếp*',
    images: [
      { src: '/images/equipment-cooking.jpg', alt: 'Bếp nấu ăn camping', caption: 'Bếp gas · bếp củi · có củi' },
      { src: '/images/food-drink.jpg', alt: 'Dụng cụ ăn uống camping', caption: 'Bát · đĩa · cốc · đũa' },
      { src: '/images/food-bbq.jpg', alt: 'Bếp nướng BBQ', caption: 'Nồi · chảo · dao' },
    ],
  },
  {
    id: 'equip-light',
    title: 'Ánh đèn, *hơi ấm*',
    images: [
      { src: '/images/equipment-light.jpg', alt: 'Đèn trang trí camping', caption: 'Đèn trang trí' },
      { src: '/images/equipment-tent.jpg', alt: 'Không gian camp buổi tối', caption: 'Lò sưởi dầu · mùa lạnh' },
    ],
  },
  {
    id: 'equip-fun',
    title: 'Chơi và *lưu lại*',
    images: [
      { src: '/images/equipment-entertainment.jpg', alt: 'Máy ảnh và máy chơi game', caption: 'Fujifilm X-T5 · Nintendo Switch' },
      { src: '/images/chill-chup-anh-1.webp', alt: 'Trại dưới gốc anh đào', caption: 'Chụp hình kỷ niệm' },
      { src: '/images/option-xem-phim.webp', alt: 'Màn chiếu trước lều', caption: 'Máy chiếu Full HD · báo trước' },
    ],
  },
];
