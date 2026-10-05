'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SCHEDULE_MONTHS } from '@/lib/schedule/months';

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function resolveDate(day, month, year, outside) {
  let targetMonth = month;
  let targetYear = year;
  if (outside) {
    if (day > 15) {
      targetMonth -= 1;
      if (targetMonth < 1) {
        targetMonth = 12;
        targetYear -= 1;
      }
    } else {
      targetMonth += 1;
      if (targetMonth > 12) {
        targetMonth = 1;
        targetYear += 1;
      }
    }
  }
  const isoMonth = String(targetMonth).padStart(2, '0');
  const isoDay = String(day).padStart(2, '0');
  return `${targetYear}-${isoMonth}-${isoDay}`;
}

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function isOpen(cell, month, today) {
  if (!cell.className.split(' ').includes('is-available')) return false;
  const outside = cell.className.split(' ').includes('is-outside-month');
  return !today || resolveDate(cell.day, month.month, month.year, outside) >= today;
}

function countOpen(month, today) {
  return month.rows.flat().filter((cell) => isOpen(cell, month, today)).length;
}

export default function ScheduleCalendar() {
  const router = useRouter();
  const [today, setToday] = useState(null);

  useEffect(() => {
    setToday(todayIso());
  }, []);

  function openBooking(iso) {
    router.push(`/dat-lich?ngay=${encodeURIComponent(iso)}`);
  }

  return (
    <div className="cal-months" id="schedule">
      {SCHEDULE_MONTHS.map((month) => (
        <section className="cal-month" key={month.title} aria-labelledby={`cal-${month.year}-${month.month}`}>
          <header className="cal-month__head">
            <h2 id={`cal-${month.year}-${month.month}`} className="cal-month__title">
              {month.title}
            </h2>
            <p className="cal-month__count">
              <span>{countOpen(month, today)}</span> ngày còn chỗ
            </p>
          </header>
          <div className="cal-scroll">
            <table className="cal">
              <thead>
                <tr>
                  {WEEKDAYS.map((label) => (
                    <th key={label} scope="col">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {month.rows.map((row, rowIndex) => (
                  <tr key={`${month.title}-${rowIndex}`}>
                    {row.map((cell) => {
                      const classes = cell.className.split(' ');
                      const outside = classes.includes('is-outside-month');
                      const available = classes.includes('is-available');
                      const cellIso = resolveDate(cell.day, month.month, month.year, outside);
                      const past = Boolean(today) && !outside && cellIso < today;
                      const bookable = available && !past;
                      const closed = classes.includes('is-empty') || (available && past);
                      const iso = bookable ? cellIso : null;
                      const className = past
                        ? `${cell.className.replace('is-available', 'is-empty')} is-past`
                        : `${cell.className}${bookable ? ' is-bookable' : ''}`;
                      return (
                        <td
                          key={`${month.title}-${rowIndex}-${cell.day}-${cell.className}`}
                          className={className}
                          role={bookable ? 'button' : undefined}
                          tabIndex={bookable ? 0 : undefined}
                          aria-label={bookable ? `Đặt lịch ngày ${iso}` : undefined}
                          data-booking-date={iso || undefined}
                          onClick={bookable ? () => openBooking(iso) : undefined}
                          onKeyDown={
                            bookable
                              ? (event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    openBooking(iso);
                                  }
                                }
                              : undefined
                          }
                        >
                          <span className="cal__day">{cell.day}</span>
                          {cell.holiday ? <span className="cal__holiday">{cell.holiday}</span> : null}
                          {closed ? (
                            <span className="cal__status cal__status--closed">
                              <span aria-hidden="true">—</span>
                              <span className="visually-hidden">Không nhận đặt</span>
                            </span>
                          ) : (
                            <span className="cal__status">{bookable ? cell.status : ''}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
