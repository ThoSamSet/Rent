/**
 * Wire schedule calendar: click "Còn chỗ" cells → dat-lich.html?ngay=YYYY-MM-DD
 */
(function () {
    'use strict';

    function parseMonthTitle(titleText) {
        var match = titleText.match(/Tháng\s+(\d{1,2})\/(\d{4})/);
        if (!match) {
            return null;
        }
        return {
            month: parseInt(match[1], 10),
            year: parseInt(match[2], 10)
        };
    }

    function resolveDate(day, month, year, isOutsideMonth) {
        var targetMonth = month;
        var targetYear = year;

        if (isOutsideMonth) {
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

        return {
            year: targetYear,
            month: targetMonth,
            day: day
        };
    }

    function toIsoString(parts) {
        var month = String(parts.month).padStart(2, '0');
        var day = String(parts.day).padStart(2, '0');
        return parts.year + '-' + month + '-' + day;
    }

    function initScheduleBookingLinks() {
        var months = document.querySelectorAll('.schedule-month');

        months.forEach(function (monthBlock) {
            var titleEl = monthBlock.querySelector('.schedule-month-title');
            if (!titleEl) {
                return;
            }

            var parsed = parseMonthTitle(titleEl.textContent);
            if (!parsed) {
                return;
            }

            var cells = monthBlock.querySelectorAll('td.is-available');
            cells.forEach(function (cell) {
                var dayEl = cell.querySelector('.schedule-date');
                if (!dayEl) {
                    return;
                }

                var day = parseInt(dayEl.textContent, 10);
                if (!Number.isFinite(day)) {
                    return;
                }

                var resolved = resolveDate(
                    day,
                    parsed.month,
                    parsed.year,
                    cell.classList.contains('is-outside-month')
                );
                var iso = toIsoString(resolved);

                cell.classList.add('is-bookable');
                cell.setAttribute('role', 'button');
                cell.setAttribute('tabindex', '0');
                cell.setAttribute('aria-label', 'Đặt lịch ngày ' + iso);
                cell.dataset.bookingDate = iso;

                function goToBooking() {
                    window.location.href = 'dat-lich.html?ngay=' + encodeURIComponent(iso);
                }

                cell.addEventListener('click', goToBooking);
                cell.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        goToBooking();
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScheduleBookingLinks);
    } else {
        initScheduleBookingLinks();
    }
})();
