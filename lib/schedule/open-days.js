import { SCHEDULE_MONTHS } from '@/lib/schedule/months';

/** Count available days on or after `today` (ISO yyyy-mm-dd); counts all when `today` is null. */
export function countOpenDays(today) {
  let total = 0;
  for (const month of SCHEDULE_MONTHS) {
    for (const cell of month.rows.flat()) {
      const classes = cell.className.split(' ');
      if (!classes.includes('is-available')) continue;
      let m = month.month;
      let y = month.year;
      if (classes.includes('is-outside-month')) {
        m += cell.day > 15 ? -1 : 1;
        if (m < 1) { m = 12; y -= 1; }
        if (m > 12) { m = 1; y += 1; }
      }
      const iso = `${y}-${String(m).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
      if (!today || iso >= today) total += 1;
    }
  }
  return total;
}
