import { SCHEDULE_MONTHS } from '@/lib/schedule/months';

function toIso(y, m, d) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function shiftIso(iso, days) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d + days);
  return toIso(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

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
      const iso = toIso(y, m, cell.day);
      if (!today || iso >= today) total += 1;
    }
  }
  return total;
}

let scheduleIndex = null;

/** Available ISO dates and the first/last ISO date the schedule covers (in-month cells only). */
function getScheduleIndex() {
  if (scheduleIndex) return scheduleIndex;
  const available = new Set();
  let first = null;
  let last = null;
  for (const month of SCHEDULE_MONTHS) {
    for (const cell of month.rows.flat()) {
      const classes = cell.className.split(' ');
      if (classes.includes('is-outside-month')) continue;
      const iso = toIso(month.year, month.month, cell.day);
      if (!first || iso < first) first = iso;
      if (!last || iso > last) last = iso;
      if (classes.includes('is-available')) available.add(iso);
    }
  }
  scheduleIndex = { available, first, last };
  return scheduleIndex;
}

/**
 * A trip of `nights` nights needs every day from the start through check-out open.
 * When a later day of the trip is a known closed day (e.g. a Sunday followed by a working Monday),
 * move the start back one day if that whole range is open and not before `today`.
 * Returns { iso, adjusted, original }.
 */
export function resolveTripStart(iso, nights = 1, today = null) {
  const { available, first, last } = getScheduleIndex();
  const result = { iso, adjusted: false, original: iso };
  const checkout = shiftIso(iso, nights);
  if (!first || checkout < first || checkout > last) return result;

  const rangeOpen = (start) => {
    for (let i = 0; i <= nights; i += 1) {
      if (!available.has(shiftIso(start, i))) return false;
    }
    return true;
  };
  if (!available.has(iso) || rangeOpen(iso)) return result;

  const earlier = shiftIso(iso, -1);
  if (rangeOpen(earlier) && (!today || earlier >= today)) {
    return { iso: earlier, adjusted: true, original: iso };
  }
  return result;
}
