/** Options page — intro, categories, items. */

export const OPTIONS_INTRO = {
  label: 'Option thêm',
  title: 'Đồ ăn, xem phim & di chuyển',
  text: 'Đồ ăn, xem phim và option đi đường thường — thêm vào chuyến camping để trải nghiệm trọn vẹn hơn.',
};

export const OPTION_CATEGORIES = [
  {
    id: 'opt-food',
    title: 'Option đồ ăn',
    status: 'paused',
    statusLabel: 'Tạm dừng dịch vụ',
    description:
      'Camp Nhà Thỏ cung cấp các option đồ ăn cho bữa tối và điểm tâm sáng.',
    items: [
      {
        id: 'food-hotpot',
        src: '/images/food-hotpot.webp',
        alt: 'Lẩu camping - bữa chính buổi tối',
        title: 'Lẩu (bữa chính buổi tối)',
        price: '1m5990y',
        note: null,
        features: [
          'Thịt (bò, heo)',
          'Rau, nấm',
          'Mì và nước lẩu vị tự chọn',
          '(lẩu Thái, lẩu Trung, lẩu Nhật)',
        ],
      },
      {
        id: 'food-bbq',
        src: '/images/food-bbq.webp',
        alt: 'BBQ camping - bữa chính buổi tối',
        title: 'BBQ (bữa chính buổi tối)',
        price: '1m5990y',
        note: null,
        features: ['Thịt (bò, heo, xúc xích)', 'Rau củ nướng', 'Sốt ướp và chấm'],
      },
      {
        id: 'food-drink',
        src: '/images/food-drink.webp',
        alt: 'Option đồ uống có cồn tự pha chế',
        title: 'Option đồ uống cồn (Dành cho bữa tối)',
        price: '9990y',
        note: null,
        features: [
          'Cocktail, Rượu tự pha chế',
          'Các loại đồ uống có cồn thông dụng',
          'Dùng kèm bữa tối',
        ],
      },
      {
        id: 'food-breakfast',
        src: '/images/food-breakfast.webp',
        alt: 'Điểm tâm buổi sáng - bánh mì nướng',
        title: 'Điểm tâm buổi sáng',
        price: 'Free',
        note: '*Free khi bạn chọn đặt option đồ ăn tối',
        features: ['Bánh mì nướng', 'Bơ hoặc mứt', 'Cafe hoặc trà'],
      },
    ],
  },
  {
    id: 'opt-movie',
    title: 'Option xem phim',
    status: 'open',
    statusLabel: 'Đang nhận đặt',
    description:
      'Thư giãn buổi tối với máy chiếu Full HD, YouTube Premium, Disney+ và chiếu tự do nội dung yêu thích qua cáp USB-C — HDMI.',
    items: [
      {
        id: 'movie',
        src: '/images/option-xem-phim.webp',
        alt: 'Option xem phim — màn chiếu trước lều buổi tối',
        title: 'Gói xem phim',
        price: '7000y',
        note: null,
        features: [
          'Máy chiếu Full HD',
          'YouTube Premium',
          'Disney Plus',
          'Cáp USB-C sang HDMI; tự do trình chiếu nội dung yêu thích',
        ],
      },
    ],
  },
  {
    id: 'opt-travel',
    title: 'Option di chuyển (đường thường)',
    status: 'open',
    statusLabel: 'Đang nhận đặt',
    description:
      'Mặc định Camp Nhà Thỏ đi cao tốc để tiết kiệm thời gian. Nếu bạn muốn tiết kiệm chi phí, có thể chọn lộ trình đi đường thường.',
    footnote:
      '*Mức giảm có thể được xác nhận lại khi tư vấn tùy điểm đón và hành trình.',
    items: [
      {
        id: 'travel-local',
        src: '/images/option-duong-thuong.webp',
        alt: 'Option di chuyển đường thường — lộ trình tiết kiệm',
        title: 'Option di chuyển (đường thường)',
        price: 'Giảm 5000y / chuyến',
        note: null,
        features: [
          'Bỏ cao tốc, đi đường thường để tiết kiệm chi phí',
          'Áp dụng theo từng chuyến',
          'Vui lòng báo trước để sắp xếp lộ trình phù hợp',
        ],
      },
    ],
  },
];
