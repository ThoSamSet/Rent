/** Static home page content — gallery, blog links, copy. */

export { BLOG_FEATURED, BLOG_STRIP } from '@/lib/blog/content';

/** Newest first. date = dd/mm/yyyy display; dateTime = ISO for <time>. */
export const HOME_NOTICES = [
  {
    date: '17/08/2026',
    dateTime: '2026-08-17',
    text: 'Đã mở option xem phim.',
    href: '/options#opt-movie',
    linkLabel: 'Xem option',
  },
];

export const GALLERY = [
  { baseName: 'camping-1', alt: 'Camping Phú Sĩ - View núi Phú Sĩ tuyệt đẹp' },
  { baseName: 'camping-2', alt: 'Lều camping trong rừng — lửa trại và hammock' },
  { baseName: 'camping-3', alt: 'Bãi camping Phú Sĩ' },
  { baseName: 'camping-4', alt: 'Xem phim camping — màn chiếu trước lều' },
  { baseName: 'camping-5', alt: 'Chụp hình kỷ niệm camping Phú Sĩ' },
  { baseName: 'camping-6', alt: 'Camping chill cảnh đẹp tại Phú Sĩ' },
];
