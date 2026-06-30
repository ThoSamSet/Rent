/** Pricing page — intro, plans, comparison tables, footnotes. */

export const PRICING_INTRO = {
  label: 'Bảng giá',
  title: '3 plan camping',
};

export const PRICING_PLANS = [
  {
    id: 'plan-de',
    slug: 'de',
    emoji: '🌰',
    name: 'Hạt Dẻ',
    cardName: 'plan Hạt dẻ 🌰',
    priceFrom: '3.7',
    priceLabel: 'Từ 3.7man',
    badge: null,
    tagline: null,
    image: '/images/plan-de.webp',
    cardImg: '/images/responsive/plan-de-400w.webp',
    cardSrcSet: '/images/responsive/plan-de-400w.webp 400w, /images/responsive/plan-de-800w.webp 800w',
    alt: 'Hạt Dẻ — tự chọn ngày và bãi, full đồ camping, không đưa đón',
    paragraphs: [
      'Tự do chọn ngày, chọn bãi và trải nghiệm full đồ camping như Hạt Bí.',
      'Phù hợp cho nhóm có xe riêng, muốn chủ động hành trình.',
    ],
    features: [
      'Full đồ camping (lều / shelter)',
      'Setup sẵn tại bãi',
      'Không bao gồm đưa đón',
    ],
    imagePosition: 'left',
  },
  {
    id: 'plan-bi',
    slug: 'bi',
    emoji: '🎃',
    name: 'Hạt Bí',
    cardName: 'plan Hạt bí 🎃',
    priceFrom: '4.7',
    priceLabel: 'Từ 4.7man',
    badge: 'popular',
    tagline: '(phổ biến nhất)',
    image: '/images/plan-bi.webp',
    cardImg: '/images/responsive/plan-bi-400w.webp',
    cardSrcSet: '/images/responsive/plan-bi-400w.webp 400w, /images/responsive/plan-bi-800w.webp 800w',
    alt: 'Hạt Bí — đưa đón, lều / shelter, setup trọn gói',
    paragraphs: [
      'Trải nghiệm camping trọn vẹn — chỉ cần chọn ngày, mọi thứ đã có Camp Nhà Thỏ lo.',
    ],
    features: [
      { text: 'Đưa đón tận nơi', note: '(tối đa 4 người)' },
      'Full đồ camping (lều / shelter)',
      'Setup & hỗ trợ xuyên suốt',
    ],
    imagePosition: 'right',
  },
  {
    id: 'plan-nho',
    slug: 'nho',
    emoji: '🍇',
    name: 'Hạt Nho',
    cardName: 'plan Hạt nho 🍇',
    priceFrom: '5.7',
    priceLabel: 'Từ 5.7man',
    badge: 'new',
    tagline: null,
    image: '/images/plan-nho.webp',
    cardImg: '/images/responsive/plan-nho-400w.webp',
    cardSrcSet: '/images/responsive/plan-nho-400w.webp 400w, /images/responsive/plan-nho-800w.webp 800w',
    alt: 'Hạt Nho — bungalow, không lo mưa, đưa đón',
    paragraphs: ['Camping thoải mái hơn với bungalow — vẫn chill, nhưng không lo thời tiết.'],
    features: [
      'Đưa đón tận nơi',
      'Nghỉ bungalow (không dùng shelter), có điều hoà, futon riêng.',
      'Không gian camping setup bên ngoài',
    ],
    imagePosition: 'left',
  },
];

export const PRICING_OPTIONS_DISCLAIMER = {
  title: 'So sánh nhanh',
  textBefore: 'Chưa bao gồm đồ ăn & các option mở rộng (xem phim, đường thường…). Xem thêm tại',
  link: { href: '/options', label: 'trang Option' },
  textAfter: '.',
};

export const PRICING_COMPARISON = {
  title: 'Bảng so sánh plan',
  columns: [
    { id: 'de', label: 'Plan hạt dẻ 🌰' },
    { id: 'bi', label: 'Plan hạt bí 🎃' },
    { id: 'nho', label: 'Plan hạt nho 🍇', badge: 'new' },
  ],
  rows: [
    { feature: 'Đưa đón', de: '', bi: '✓', nho: '✓' },
    { feature: 'Loại lều', de: 'shelter/tarp', bi: 'shelter/tarp', nho: 'bungalow/tarp' },
    { feature: 'Tự do chọn ngày/bãi', de: '✓', bi: '✓', nho: '✓' },
    { feature: 'Hỗ trợ đặt bãi', de: '✓', bi: '✓', nho: '✓' },
    { feature: 'Đồ đạc chuẩn pro camper', de: '✓', bi: '✓', nho: '✓' },
    { feature: 'Hỗ trợ Setup/Thu dọn đồ đạc', de: '✓', bi: '✓', nho: '✓' },
    {
      feature: 'Đồ tiêu hao (củi, than BBQ, dầu sưởi, camera, v.v.)',
      de: '✓',
      bi: '✓',
      nho: '✓',
    },
  ],
};

export const PRICING_MATRIX = {
  title: 'Bảng giá dịch vụ — tổng chi phí',
  note: '(2 ngày 1 đêm)',
  columns: [
    { id: 'de', label: 'Plan hạt dẻ 🌰' },
    { id: 'bi', label: 'Plan hạt bí 🎃' },
    { id: 'nho', label: 'Plan hạt nho 🍇', badge: 'new' },
  ],
  rows: [
    { people: '5 người', de: '6.5man', bi: null, nho: '8.5man' },
    { people: '4 người', de: '5.8man', bi: '6.8man', nho: '7.8man' },
    { people: '3 người', de: '5man', bi: '6man', nho: '7man' },
    { people: '2 người', de: '4.4man', bi: '5.4man', nho: '6.4man' },
    { people: '1 người', de: '3.7man', bi: '4.7man', nho: '5.7man' },
  ],
};

export const PRICING_FOOTNOTES = {
  optionsTextBefore: 'Option thêm (đồ ăn, máy chiếu ngoài trời, di chuyển đường thường): tham khảo thêm tại',
  optionsLink: { href: '/options', label: 'trang Option' },
  optionsTextAfter: '.',
  regionNote: '*Chi phí áp dụng cho khu vực Tokyo, Saitama, Kanagawa.',
  bookingLink: { href: '/dat-lich', label: 'Đặt lịch' },
  bookingTextAfter: ' để được tư vấn chi tiết.',
};
