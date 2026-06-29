/**
 * Hero slideshow images — append slides per page; run generate-responsive-images after adding sources.
 * @typedef {{ baseName: string; widths: number[]; alt: string }} HeroSlide
 */

/** @type {{ home: HeroSlide[]; about: HeroSlide[]; equipment: HeroSlide[]; locations: HeroSlide[] }} */
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
};
