/** "Đọc tiếp" tiles shared across pages. */
export const CONTINUE = {
  about: {
    href: '/about',
    meta: 'Giới thiệu',
    title: 'Không phải cho thuê. Là chia sẻ.',
    image: '/images/about-1.webp',
    alt: 'Lều dựng sẵn giữa rừng',
  },
  pricing: {
    href: '/pricing',
    meta: 'Chi phí',
    title: 'Ba plan, giá rõ từ đầu',
    image: '/images/chi-phi-1.webp',
    alt: 'Hoa thuỷ tiên cạnh bãi camp',
  },
  options: {
    href: '/options',
    meta: 'Option',
    title: 'Một bộ phim dưới trời sao',
    image: '/images/option-xem-phim.webp',
    alt: 'Màn chiếu phim trước lều buổi tối',
  },
  equipment: {
    href: '/equipment',
    meta: 'Dụng cụ',
    title: 'Đồ đạc, tụi mình lo hết',
    image: '/images/equipment-hero.webp',
    alt: 'Bên trong lều với đồ camping',
  },
  locations: {
    href: '/locations',
    meta: 'Bãi cắm trại',
    title: 'Mười lăm bãi, từ núi ra biển',
    image: '/images/location-fumotoppara.webp',
    alt: 'Bãi Fumotoppara dưới chân núi Phú Sĩ',
  },
  schedule: {
    href: '/schedule',
    meta: 'Lịch trống',
    title: 'Ngày nào còn chỗ?',
    image: '/images/subBanner-lich-trinh.webp',
    alt: 'Tượng thỏ nhỏ trên bàn gỗ',
  },
  faq: {
    href: '/faq',
    meta: 'Hỏi đáp',
    title: 'Những điều bạn có thể đang thắc mắc',
    image: '/images/subBanner-faq.webp',
    alt: 'Đèn bàn và ánh đèn nhoè về đêm',
  },
  blog: {
    href: '/blog',
    meta: 'Blog',
    title: 'Ghi chép từ những chuyến đi',
    image: '/blog/campingsakura2026/sakura-hero.jpg',
    alt: 'Camping mùa hoa anh đào',
  },
  booking: {
    href: '/dat-lich',
    meta: 'Đặt lịch',
    title: 'Bốn bước, một tin nhắn',
    image: '/images/hero-camping.webp',
    alt: 'Trại camping dựng sẵn',
  },
};

/** @param {(keyof typeof CONTINUE)[]} keys */
export function pickContinue(keys) {
  return keys.map((key) => CONTINUE[key]);
}
