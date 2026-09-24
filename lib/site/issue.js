import { SCHEDULE_LAST_UPDATED } from '@/lib/schedule/content';
import { SCHEDULE_MONTHS } from '@/lib/schedule/months';
import { CAMP_SITES } from '@/lib/locations/sites';
import { FAQ_CATEGORIES } from '@/lib/faq/content';
import { BLOG_POSTS } from '@/lib/blog/content';

/** Real counts and dates used in folios and the site index — never hand-typed. */

const firstMonth = SCHEDULE_MONTHS[0];
const lastMonth = SCHEDULE_MONTHS[SCHEDULE_MONTHS.length - 1];

export const SCHEDULE_RANGE =
  firstMonth.year === lastMonth.year
    ? `Tháng ${firstMonth.month}–${lastMonth.month}/${lastMonth.year}`
    : `${firstMonth.month}/${firstMonth.year}–${lastMonth.month}/${lastMonth.year}`;

export const OPEN_DAYS = SCHEDULE_MONTHS.reduce(
  (sum, month) =>
    sum + month.rows.flat().filter((cell) => cell.className.split(' ').includes('is-available')).length,
  0,
);

export const UPDATED_LABEL = `Cập nhật ${SCHEDULE_LAST_UPDATED}`;

export const SITE_COUNT = CAMP_SITES.length;

export const FAQ_COUNT = FAQ_CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);

export const POST_COUNT = BLOG_POSTS.length;

/** Folio line for inner-page covers. */
export function folioFor(section) {
  return ['Camp Nhà Thỏ', section, `Lịch mở · ${SCHEDULE_RANGE}`];
}
