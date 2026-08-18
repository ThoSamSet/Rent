/**
 * Hero slideshow images — append slides per page; sources live in images/{baseName}.webp.
 * @typedef {{ baseName: string; widths?: number[]; alt: string }} HeroSlide
 */

/** @type {{ home: HeroSlide[]; about: HeroSlide[]; equipment: HeroSlide[]; locations: HeroSlide[]; options: HeroSlide[]; pricing: HeroSlide[]; schedule: HeroSlide[]; faq: HeroSlide[]; booking: HeroSlide[] }} */
export const HERO_SLIDES = {
  home: [
    {
      baseName: 'hero-camping',
      widths: [640, 1280, 1920],
      alt: 'Camping Phú Sĩ - Share đồ cắm trại, chụp hình chill cảnh đẹp Nhật Bản',
    },
    {
      baseName: 'index-slide-2',
      widths: [640, 1280, 1920],
      alt: 'Camping Phú Sĩ — cảnh đẹp',
    },
    {
      baseName: 'index-slide-3',
      widths: [640, 1280, 1920],
      alt: 'Camping Phú Sĩ — chill cùng bạn bè',
    },
  ],
  about: [
    {
      baseName: 'about-hero',
      widths: [640, 1280, 1920],
      alt: 'Camp Nhà Thỏ — share đồ camping Phú Sĩ',
    },
    {
      baseName: 'about-index-2',
      widths: [640, 1280, 1920],
      alt: 'Camp Nhà Thỏ — cảnh đẹp Phú Sĩ',
    },
    {
      baseName: 'about-index-3',
      widths: [640, 1280, 1920],
      alt: 'Camp Nhà Thỏ — chill cùng bạn bè',
    },
  ],
  equipment: [
    {
      baseName: 'equipment-hero',
      widths: [640, 1280, 1920],
      alt: 'Dụng cụ camping tại Camp Nhà Thỏ',
    },
    {
      baseName: 'equip-index-2',
      widths: [640, 1280, 1920],
      alt: 'Đồ camping sẵn sàng tại Camp Nhà Thỏ',
    },
    {
      baseName: 'equip-index-3',
      widths: [640, 1280, 1920],
      alt: 'Không gian camp buổi tối',
    },
  ],
  locations: [
    {
      baseName: 'location-hero',
      widths: [640, 1280, 1920],
      alt: 'Vị trí camping Camp Nhà Thỏ',
    },
    {
      baseName: 'location-slide-2',
      widths: [640, 1280, 1920],
      alt: 'Bãi camping Kanto — view Phú Sĩ',
    },
    {
      baseName: 'location-slide-3',
      widths: [640, 1280, 1920],
      alt: 'Camping đẹp quanh Kanto, Nhật Bản',
    },
  ],
  options: [
    {
      baseName: 'option-hero',
      widths: [640, 1280, 1920],
      alt: 'Option thêm tại Camp Nhà Thỏ',
    },
    {
      baseName: 'option-slide-2',
      widths: [640, 1280, 1920],
      alt: 'Option đồ ăn — BBQ và lẩu camping',
    },
    {
      baseName: 'option-slide-3',
      widths: [640, 1280, 1920],
      alt: 'Option xem phim — màn chiếu trước lều buổi tối',
    },
  ],
  pricing: [
    {
      baseName: 'chi-phi-1',
      widths: [640, 1280, 1920],
      alt: 'Chi phí camping tại Camp Nhà Thỏ',
    },
    {
      baseName: 'camping-1',
      widths: [640, 1280, 1920],
      alt: 'Camping Phú Sĩ — trải nghiệm chill',
    },
    {
      baseName: 'plan-bi',
      widths: [640, 1280, 1920],
      alt: 'Plan Hạt Bí — đưa đón và setup trọn gói',
    },
  ],
  schedule: [
    {
      baseName: 'camping-1',
      widths: [640, 1280, 1920],
      alt: 'Lịch trình camping tại Camp Nhà Thỏ',
    },
    {
      baseName: 'camping-2',
      widths: [640, 1280, 1920],
      alt: 'Lều camping trong rừng — kiểm tra lịch trống',
    },
    {
      baseName: 'camping-3',
      widths: [400, 800, 1200],
      alt: 'Camping Phú Sĩ — lịch trình sắp tới',
    },
  ],
  faq: [
    {
      baseName: 'faq-hero',
      widths: [640, 1280, 1920],
      alt: 'Không gian camping ban đêm của Camp Nhà Thỏ với lều, ánh đèn ấm và núi Phú Sĩ phía xa',
    },
    {
      baseName: 'camping-2',
      widths: [640, 1280, 1920],
      alt: 'Lều camping trong rừng với lửa trại — buổi tối ấm áp',
    },
    {
      baseName: 'camping-3',
      widths: [400, 800, 1200],
      alt: 'Camping Phú Sĩ — trải nghiệm chill',
    },
  ],
  booking: [
    {
      baseName: 'camping-1',
      widths: [640, 1280, 1920],
      alt: 'Đặt lịch camping Phú Sĩ với Camp Nhà Thỏ',
    },
    {
      baseName: 'camping-2',
      widths: [640, 1280, 1920],
      alt: 'Lều camping trong rừng — đặt lịch chill cùng bạn bè',
    },
    {
      baseName: 'camping-3',
      widths: [400, 800, 1200],
      alt: 'Camping Phú Sĩ — trải nghiệm đặt lịch',
    },
  ],
};
