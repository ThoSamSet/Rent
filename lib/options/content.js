/** Options — food, movie, local-road travel. Prices mirror lib/booking/mount-booking.js. */

export const OPTIONS_COVER = {
  kicker: 'Option',
  title: ['Thêm một', 'chút cho', '*đêm nay.*'],
  deck: 'Một bộ phim chiếu giữa trời, hoặc một chặng đường chậm hơn để đỡ tốn tiền. Bạn chọn thêm ngay lúc đặt lịch.',
};

export const OPTION_CATEGORIES = [
  {
    id: 'opt-movie',
    title: 'Xem phim',
    status: 'open',
    statusLabel: 'Đang nhận đặt',
    description:
      'Tụi mình dựng máy chiếu Full HD ngay trước lều. Có sẵn YouTube Premium và Disney+, hoặc bạn cắm cáp USB-C sang HDMI để chiếu phim của mình. Chăn quấn quanh người, gió đêm thổi nhẹ, hợp với một bộ phim cũ.',
    items: [
      {
        id: 'movie',
        src: '/images/option-xem-phim.webp',
        alt: 'Màn chiếu phim trước lều buổi tối',
        title: 'Gói xem phim',
        price: '7.000¥',
        note: null,
        features: ['Máy chiếu Full HD', 'YouTube Premium', 'Disney Plus', 'Cáp USB-C sang HDMI'],
      },
    ],
  },
  {
    id: 'opt-travel',
    title: 'Đi đường thường',
    status: 'open',
    statusLabel: 'Đang nhận đặt',
    description:
      'Bình thường tụi mình đi cao tốc cho nhanh. Nếu bạn không vội, mình đi đường thường. Chậm hơn một chút, rẻ hơn một chút, bù lại được ngắm làng quê và núi hai bên đường.',
    footnote: 'Mức giảm có thể thay đổi tuỳ điểm đón và lộ trình. Tụi mình sẽ báo lại khi xác nhận.',
    items: [
      {
        id: 'travel-local',
        src: '/images/option-duong-thuong.webp',
        alt: 'Đường đèo uốn lượn qua núi mùa thu',
        title: 'Đi đường thường',
        price: 'Giảm 5.000¥ / chuyến',
        note: null,
        features: ['Không đi cao tốc', 'Tính theo từng chuyến', 'Báo trước để tụi mình xếp lộ trình'],
      },
    ],
  },
  {
    id: 'opt-food',
    title: 'Đồ ăn',
    status: 'paused',
    statusLabel: 'Tạm dừng',
    description: 'Bữa tối và bữa sáng do tụi mình chuẩn bị. Hiện đang tạm nghỉ, khi nào mở lại tụi mình sẽ báo trên trang chủ.',
    items: [
      {
        id: 'food-hotpot',
        src: '/images/food-hotpot.webp',
        alt: 'Nồi lẩu nóng buổi tối ở bãi camp',
        title: 'Lẩu — bữa tối',
        price: '15.990¥ / người',
        note: null,
        features: ['Thịt bò, heo', 'Rau, nấm', 'Mì và nước lẩu Thái, Trung hoặc Nhật'],
      },
      {
        id: 'food-bbq',
        src: '/images/food-bbq.webp',
        alt: 'Bếp nướng BBQ ở bãi camp',
        title: 'BBQ — bữa tối',
        price: '15.990¥ / người',
        note: null,
        features: ['Thịt bò, heo, xúc xích', 'Rau củ nướng', 'Sốt ướp và chấm'],
      },
      {
        id: 'food-drink',
        src: '/images/food-drink.webp',
        alt: 'Đồ uống có cồn tự pha chế',
        title: 'Đồ uống có cồn',
        price: '9.990¥ / người',
        note: null,
        features: ['Cocktail, rượu tự pha chế', 'Các loại đồ uống có cồn thông dụng', 'Dùng kèm bữa tối'],
      },
      {
        id: 'food-breakfast',
        src: '/images/food-breakfast.webp',
        alt: 'Bánh mì nướng và cà phê buổi sáng',
        title: 'Điểm tâm sáng',
        price: 'Miễn phí',
        note: 'Miễn phí khi đặt option bữa tối.',
        features: ['Bánh mì nướng', 'Bơ hoặc mứt', 'Cà phê hoặc trà'],
      },
    ],
  },
];
