/**
 * Hero slideshow images — append slides per page; run generate-responsive-images after adding sources.
 * @typedef {{ baseName: string; widths: number[]; alt: string }} HeroSlide
 */

/** @type {{ home: HeroSlide[]; about: HeroSlide[]; equipment: HeroSlide[] }} */
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
      widths: [480, 960, 1440],
      alt: 'Camp Nhà Thỏ — share đồ camping Phú Sĩ',
    },
  ],
  equipment: [
    {
      baseName: 'equipment-hero',
      widths: [480, 960, 1440],
      alt: 'Dụng cụ camping tại Camp Nhà Thỏ',
    },
  ],
};
