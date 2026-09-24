/** Pricing — plans, comparison, 2D1N price matrix. Prices mirror lib/booking/mount-booking.js. */

export const PRICING_COVER = {
  kicker: 'Chi phí',
  title: ['Ba cách', 'đi *một đêm.*'],
  deck: 'Plan nào cũng có đồ camping loại tốt, tụi mình đặt bãi giúp, dựng trại và dọn trại. Chỉ khác ở chỗ ai cầm lái, và tối đó bạn ngủ trong lều hay bungalow.',
};

export const PRICING_PLANS = [
  {
    id: 'plan-de',
    slug: 'de',
    name: 'Hạt Dẻ',
    shortNote: 'Bạn tự lái xe tới bãi',
    priceFrom: '3.7',
    badge: null,
    image: '/images/plan-de.webp',
    alt: 'Plan Hạt Dẻ — trại dựng sẵn, khách tự đến bãi',
    paragraphs: [
      'Dành cho nhóm có xe và thích tự cầm lái, dừng đâu tuỳ ý dọc đường. Bạn chọn ngày, chọn bãi. Lúc bạn tới nơi thì trại đã dựng xong.',
      'Đồ đạc đầy đủ y như Hạt Bí, chỉ không có phần đưa đón.',
    ],
    features: ['Đủ bộ đồ camping (lều / shelter)', 'Trại dựng sẵn khi bạn tới', 'Không có đưa đón'],
  },
  {
    id: 'plan-bi',
    slug: 'bi',
    name: 'Hạt Bí',
    shortNote: 'Đón tận nơi, lo trọn gói',
    priceFrom: '4.7',
    badge: 'Được chọn nhiều nhất',
    image: '/images/plan-bi.webp',
    alt: 'Plan Hạt Bí — đưa đón, lều và setup trọn gói',
    paragraphs: [
      'Plan trọn gói nhất. Tụi mình đón bạn ở cửa nhà, chở đồ, dựng lều sẵn, rồi hôm sau đưa bạn về. Bạn chỉ cần lên xe, rồi ngắm đường.',
    ],
    features: [
      'Đưa đón tận nơi (tối đa 4 người)',
      'Đủ bộ đồ camping (lều / shelter)',
      'Dựng trại và thu dọn trại',
    ],
  },
  {
    id: 'plan-nho',
    slug: 'nho',
    name: 'Hạt Nho',
    shortNote: 'Ngủ bungalow, khỏi lo mưa',
    priceFrom: '5.7',
    badge: 'Mới',
    image: '/images/plan-nho.webp',
    alt: 'Plan Hạt Nho — bungalow có điều hoà, đưa đón',
    paragraphs: [
      'Buổi tối vẫn ngồi bên lửa ngoài trời, nhưng tới giờ ngủ thì bạn vào bungalow có điều hoà và futon riêng. Hợp với người ngại lạnh, ngại mưa, hoặc lần đầu chưa quen ngủ lều.',
    ],
    features: [
      'Đưa đón tận nơi',
      'Ngủ bungalow có điều hoà, futon riêng (không dùng shelter)',
      'Góc camping dựng sẵn bên ngoài',
    ],
  },
];

export const PRICING_COMPARISON = {
  title: 'Ba plan, *đặt cạnh nhau*',
  columns: [
    { id: 'de', label: 'Hạt Dẻ' },
    { id: 'bi', label: 'Hạt Bí' },
    { id: 'nho', label: 'Hạt Nho' },
  ],
  rows: [
    { feature: 'Đưa đón', de: false, bi: true, nho: true },
    { feature: 'Chỗ ngủ', de: 'Shelter / tarp', bi: 'Shelter / tarp', nho: 'Bungalow / tarp' },
    { feature: 'Tự chọn ngày và bãi', de: true, bi: true, nho: true },
    { feature: 'Hỗ trợ đặt bãi', de: true, bi: true, nho: true },
    { feature: 'Đồ chuẩn pro camper', de: true, bi: true, nho: true },
    { feature: 'Dựng và thu dọn trại', de: true, bi: true, nho: true },
    { feature: 'Củi, than BBQ, dầu sưởi, máy ảnh…', de: true, bi: true, nho: true },
  ],
};

export const PRICING_MATRIX = {
  title: 'Cả nhóm *hết bao nhiêu*',
  note: '2 ngày 1 đêm · đơn vị man (1 man = 10.000¥)',
  columns: [
    { id: 'de', label: 'Hạt Dẻ' },
    { id: 'bi', label: 'Hạt Bí' },
    { id: 'nho', label: 'Hạt Nho' },
  ],
  rows: [
    { people: '1 người', de: '3.7', bi: '4.7', nho: '5.7' },
    { people: '2 người', de: '4.4', bi: '5.4', nho: '6.4' },
    { people: '3 người', de: '5', bi: '6', nho: '7' },
    { people: '4 người', de: '5.8', bi: '6.8', nho: '7.8' },
    { people: '5 người', de: '6.5', bi: null, nho: '8.5' },
  ],
};

export const PRICING_NOTES = [
  'Giá áp dụng khi điểm đón ở Tokyo, Saitama hoặc Kanagawa.',
  'Chưa gồm đồ ăn và các option như xem phim hay đi đường thường.',
  'Hạt Bí nhận tối đa 4 người.',
  'Không cần đặt cọc. Bạn trả tiền mặt trước lúc xuất phát.',
];
