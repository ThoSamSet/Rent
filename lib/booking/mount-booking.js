import { CAMP_SITES } from '@/lib/locations/sites';

/**
 * Booking price estimate and wizard. Runs after the form is in the document.
 * Listeners are aborted when the page unmounts.
 */
export function mountBooking() {
  const form = document.getElementById('bookingForm');
  if (!form) {
    return () => {};
  }

  const ac = new AbortController();
  const nativeAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function addEventListener(type, listener, options) {
    const extra = options && typeof options === 'object' ? options : { capture: Boolean(options) };
    return nativeAdd.call(this, type, listener, { ...extra, signal: ac.signal });
  };

  window.CAMP_MAP_SITES = CAMP_SITES;

  try {
/**
 * Camp Nhà Thỏ — booking form logic & price estimate.
 * Price matrix mirrors pricing.html (2 ngày 1 đêm).
 */
(function () {
    'use strict';

    /** @type {Record<string, Record<number, number|null>>} man — source: pricing.html */
    var PRICING_2D1N = {
        de: { 1: 3.7, 2: 4.4, 3: 5, 4: 5.8, 5: 6.5 },
        bi: { 1: 4.7, 2: 5.4, 3: 6, 4: 6.8, 5: null },
        nho: { 1: 5.7, 2: 6.4, 3: 7, 4: 7.8, 5: 8.5 }
    };

    var PLAN_META = {
        de: {
            label: 'Hạt Dẻ',
            emoji: '🌰',
            desc: 'Không đưa đón · full đồ camping'
        },
        bi: {
            label: 'Hạt Bí',
            emoji: '🎃',
            desc: 'Đưa đón · setup trọn gói · phổ biến nhất (tối đa 4 người)'
        },
        nho: {
            label: 'Hạt Nho',
            emoji: '🍇',
            desc: 'Bungalow · đưa đón · không lo mưa'
        }
    };

    var DURATIONS = {
        day: { label: 'Đi trong ngày', shortLabel: 'Đi trong ngày', nights: 0 },
        '2d1n': { label: '2N1Đ (2 ngày 1 đêm)', shortLabel: '2N1Đ', nights: 1 }
    };

    var PICKUP_LABELS = {
        tokyo: 'Tokyo',
        saitama: 'Saitama',
        kanagawa: 'Kanagawa',
        chiba: 'Chiba',
        gunma: 'Gunma',
        khac: 'Khác'
    };

    var CHILDREN_DAY_PROMO = window.CampChildrenDayPromo
        ? window.CampChildrenDayPromo.config
        : {
              deadline: new Date(2026, 5, 16),
              yen: 5000,
              label: 'KM 1/6 Thiếu nhi'
          };

    function isChildrenDayPromoActive() {
        if (window.CampChildrenDayPromo) {
            return window.CampChildrenDayPromo.isActive();
        }
        return new Date() < CHILDREN_DAY_PROMO.deadline;
    }

    /** @type {Record<string, {label: string, yen: number, perPerson: boolean, enabled: boolean}>} source: options.html */
    var ADDON_META = {
        'food-hotpot': { label: 'Lẩu (bữa tối)', yen: 15990, perPerson: true, enabled: false },
        'food-bbq': { label: 'BBQ (bữa tối)', yen: 15990, perPerson: true, enabled: false },
        'food-drink': { label: 'Đồ uống có cồn (bữa tối)', yen: 9990, perPerson: true, enabled: false },
        'food-breakfast': { label: 'Điểm tâm buổi sáng', yen: 0, perPerson: true, enabled: false },
        movie: { label: 'Gói xem phim', yen: 7000, perPerson: false, enabled: false },
        'travel-local': { label: 'Đường thường (tiết kiệm chi phí)', yen: -5000, perPerson: false, enabled: true }
    };

    var form = document.getElementById('bookingForm');
    if (!form) {
        return;
    }

    var startDateInput = document.getElementById('startDate');
    var durationSelect = document.getElementById('duration');
    var peopleSelect = document.getElementById('people');
    var planRadios = form.querySelectorAll('input[name="plan"]');
    var pickupSelect = document.getElementById('pickup');
    var pickupAreaGroup = document.getElementById('pickupAreaGroup');
    var pickupCustomField = document.getElementById('pickupCustomField');
    var pickupCustomInput = document.getElementById('pickupCustom');
    var pickupWarning = document.getElementById('pickupWarning');
    var locationSelect = document.getElementById('campLocation');
    var locationCustomField = document.getElementById('campLocationCustomField');
    var locationCustom = document.getElementById('campLocationCustom');
    var fbInput = document.getElementById('facebookLink');
    var priceBreakdown = document.getElementById('priceBreakdown');
    var priceTotal = document.getElementById('priceTotal');
    var messagePreview = document.getElementById('messagePreview');
    var copyBtn = document.getElementById('copyMessageBtn');
    var copyFeedback = document.getElementById('copyFeedback');
    var planWarning = document.getElementById('planWarning');
    var priceNote = document.getElementById('priceNote');
    var promoBanner = document.getElementById('childrenDayPromoBanner');

    function parseNgayParam(raw) {
        if (!raw) {
            return null;
        }
        var value = decodeURIComponent(raw.trim());
        var iso = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (iso) {
            return buildDate(parseInt(iso[1], 10), parseInt(iso[2], 10), parseInt(iso[3], 10));
        }
        var vn = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (vn) {
            return buildDate(parseInt(vn[3], 10), parseInt(vn[2], 10), parseInt(vn[1], 10));
        }
        return null;
    }

    function buildDate(year, month, day) {
        var date = new Date(year, month - 1, day);
        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }
        return date;
    }

    function formatIsoDate(date) {
        var y = date.getFullYear();
        var m = String(date.getMonth() + 1).padStart(2, '0');
        var d = String(date.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function formatVnDate(date) {
        var d = String(date.getDate()).padStart(2, '0');
        var m = String(date.getMonth() + 1).padStart(2, '0');
        var y = date.getFullYear();
        return d + '/' + m + '/' + y;
    }

    function parseDateInput(value) {
        if (!value) {
            return null;
        }
        var trimmed = value.trim();
        var vn = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (vn) {
            return buildDate(parseInt(vn[3], 10), parseInt(vn[2], 10), parseInt(vn[1], 10));
        }
        var iso = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (iso) {
            return buildDate(parseInt(iso[1], 10), parseInt(iso[2], 10), parseInt(iso[3], 10));
        }
        return null;
    }

    function validateStartDate() {
        if (!startDateInput) {
            return true;
        }
        var value = startDateInput.value.trim();
        if (!value) {
            startDateInput.setCustomValidity('');
            return true;
        }
        if (!parseDateInput(value)) {
            startDateInput.setCustomValidity('Nhập ngày theo định dạng dd/mm/yyyy');
            return false;
        }
        startDateInput.setCustomValidity('');
        return true;
    }

    function formatMan(value) {
        if (value === null || value === undefined) {
            return null;
        }
        var rounded = Math.round(value * 10) / 10;
        return String(rounded).replace(/\.0$/, '') + 'man';
    }

    function formatManSigned(value) {
        if (value === null || value === undefined || value === 0) {
            return formatMan(0);
        }
        if (value < 0) {
            return '-' + formatMan(Math.abs(value));
        }
        return formatMan(value);
    }

    function yenToMan(yen) {
        return yen / 10000;
    }

    function getSelectedPlan() {
        var selected = form.querySelector('input[name="plan"]:checked');
        return selected ? selected.value : 'bi';
    }

    function isHatDePlan() {
        return getSelectedPlan() === 'de';
    }

    function getPickupLabel() {
        if (isHatDePlan()) {
            return null;
        }
        if (pickupSelect.value === 'khac') {
            var custom = pickupCustomInput ? pickupCustomInput.value.trim() : '';
            return custom || 'Khác';
        }
        return PICKUP_LABELS[pickupSelect.value] || pickupSelect.value;
    }

    function updatePickupUi() {
        var hatDe = isHatDePlan();
        var isOtherPickup = !hatDe && pickupSelect.value === 'khac';

        if (pickupAreaGroup) {
            pickupAreaGroup.hidden = hatDe;
        }
        if (pickupCustomField) {
            pickupCustomField.hidden = !isOtherPickup;
        }
        if (pickupCustomInput) {
            pickupCustomInput.required = isOtherPickup;
            if (!isOtherPickup) {
                pickupCustomInput.value = '';
                pickupCustomInput.setCustomValidity('');
            }
        }
        if (pickupSelect) {
            pickupSelect.required = !hatDe;
        }

        var missingCustom = isOtherPickup && pickupCustomInput && !pickupCustomInput.value.trim();
        if (pickupWarning) {
            pickupWarning.hidden = !missingCustom;
            pickupWarning.textContent = missingCustom
                ? 'Vui lòng ghi rõ khu vực đón khi chọn Khác.'
                : '';
        }
        if (pickupCustomInput && isOtherPickup) {
            pickupCustomInput.setCustomValidity(
                missingCustom ? 'Vui lòng ghi rõ khu vực đón.' : ''
            );
        }

        return !missingCustom;
    }

    function updateLocationUi() {
        var isOtherLocation = locationSelect && locationSelect.value === 'other';

        if (locationCustomField) {
            locationCustomField.hidden = !isOtherLocation;
        }
        if (locationCustom) {
            locationCustom.required = false;
            if (!isOtherLocation) {
                locationCustom.value = '';
                locationCustom.setCustomValidity('');
            }
        }
    }

    function getPeopleCount() {
        var value = parseInt(peopleSelect.value, 10);
        return Number.isFinite(value) ? value : 2;
    }

    function getPricingPeopleKey(count) {
        return count >= 5 ? 5 : count;
    }

    function getBasePrice(plan, peopleCount) {
        var key = getPricingPeopleKey(peopleCount);
        var table = PRICING_2D1N[plan];
        return table ? table[key] : null;
    }

    function addDays(date, days) {
        var next = new Date(date.getTime());
        next.setDate(next.getDate() + days);
        return next;
    }

    function formatDateShort(date) {
        return date.getDate() + '/' + (date.getMonth() + 1);
    }

    function formatDateRange(start, nights) {
        if (!start) {
            return '[chọn ngày]';
        }
        var end = addDays(start, nights);
        return formatDateShort(start) + '–' + formatDateShort(end) + '/' + end.getFullYear();
    }

    function formatDateForMessage(start, duration) {
        if (!start) {
            return '[chọn ngày]';
        }
        if (duration.nights === 0) {
            return formatDateShort(start) + '/' + start.getFullYear();
        }
        return formatDateRange(start, duration.nights);
    }

    function getCheckedLabels(name) {
        var boxes = form.querySelectorAll('input[name="' + name + '"]:checked');
        return Array.prototype.map.call(boxes, function (box) {
            return box.getAttribute('data-label') || box.value;
        });
    }

    function getSelectedAddons() {
        var boxes = form.querySelectorAll('input[name="addon"]:checked:not(:disabled)');
        return Array.prototype.map.call(boxes, function (box) {
            var meta = ADDON_META[box.value];
            return {
                value: box.value,
                label: meta ? meta.label : box.getAttribute('data-label') || box.value,
                meta: meta
            };
        }).filter(function (item) {
            return item.meta && item.meta.enabled;
        });
    }

    function getAddonManTotal(addons, peopleCount) {
        var totalMan = 0;
        addons.forEach(function (addon) {
            if (!addon.meta) {
                return;
            }
            var yen = addon.meta.yen;
            if (addon.meta.perPerson) {
                yen *= peopleCount;
            }
            totalMan += yenToMan(yen);
        });
        return totalMan;
    }

    function getCampLocationLabel() {
        if (locationSelect.value === 'other') {
            var custom = locationCustom ? locationCustom.value.trim() : '';
            return custom || 'Khác / chưa biết';
        }
        if (locationSelect.value === 'suggest') {
            return 'Gợi ý giúp mình';
        }
        var option = locationSelect.options[locationSelect.selectedIndex];
        return option ? option.textContent.replace(/\s*[—–-]\s*.+$/, '').trim() : '';
    }

    function populateLocations() {
        var sites = window.CAMP_MAP_SITES || [];
        var popular = ['fumotoppara', 'koan', 'asagiri-sorairo', 'fujisan-wild', 'aone'];
        var fragment = document.createDocumentFragment();

        popular.forEach(function (id) {
            var site = sites.find(function (item) {
                return item.id === id;
            });
            if (site) {
                var option = document.createElement('option');
                option.value = site.id;
                option.textContent = site.name.split('(')[0].trim();
                fragment.appendChild(option);
            }
        });

        var divider = document.createElement('optgroup');
        divider.label = 'Khác';
        sites.forEach(function (site) {
            if (popular.indexOf(site.id) !== -1) {
                return;
            }
            var option = document.createElement('option');
            option.value = site.id;
            option.textContent = site.name.split('(')[0].trim();
            divider.appendChild(option);
        });
        fragment.appendChild(divider);
        locationSelect.appendChild(fragment);
    }

    function prefillDateFromUrl() {
        var params = new URLSearchParams(window.location.search);
        var parsed = parseNgayParam(params.get('ngay'));
        if (parsed) {
            startDateInput.value = formatVnDate(parsed);
        }
    }

    function updatePlanAvailability() {
        var people = getPeopleCount();
        var plan = getSelectedPlan();
        var blocked = plan === 'bi' && people >= 5;
        if (planWarning) {
            planWarning.hidden = !blocked;
            planWarning.textContent = blocked
                ? 'Plan Hạt Bí hỗ trợ tối đa 4 người. Vui lòng chọn Hạt Dẻ hoặc Hạt Nho, hoặc giảm số người.'
                : '';
        }
        return !blocked;
    }

    function calculatePrice() {
        var plan = getSelectedPlan();
        var people = getPeopleCount();
        var duration = DURATIONS[durationSelect.value] || DURATIONS['2d1n'];
        var valid = updatePlanAvailability();

        if (duration.nights === 0) {
            return {
                totalLabel: null,
                breakdown: 'Đi trong ngày — liên hệ để báo giá.',
                isDayTrip: true
            };
        }

        var base = getBasePrice(plan, people);

        if (!valid || base === null) {
            return {
                totalLabel: null,
                breakdown: 'Plan / số người này chưa có bảng giá — inbox để được tư vấn.'
            };
        }

        var addons = getSelectedAddons();
        var addonMan = getAddonManTotal(addons, people);
        var totalMan = base + addonMan;
        var breakdownLines = [
            'Plan ' +
                PLAN_META[plan].label +
                ' ' +
                duration.shortLabel +
                ': ' +
                formatMan(base)
        ];

        addons.forEach(function (addon) {
            var yen = addon.meta.yen;
            if (addon.meta.perPerson) {
                yen *= people;
            }
            var shortLabel = addon.label.replace(/\s*\(.*\)$/, '').trim();
            breakdownLines.push(shortLabel + ': ' + formatManSigned(yenToMan(yen)));
        });

        var promoApplied = false;
        var originalTotalLabel = null;
        if (isChildrenDayPromoActive()) {
            var promoMan = yenToMan(CHILDREN_DAY_PROMO.yen);
            originalTotalLabel = formatMan(totalMan);
            totalMan -= promoMan;
            breakdownLines.push(CHILDREN_DAY_PROMO.label + ': ' + formatManSigned(-promoMan));
            promoApplied = true;
        }

        return {
            totalLabel: formatMan(totalMan),
            originalTotalLabel: originalTotalLabel,
            breakdown: breakdownLines.join('\n'),
            hasAddons: addons.length > 0,
            promoApplied: promoApplied
        };
    }

    function getStartDate() {
        return parseDateInput(startDateInput.value);
    }

    function buildMessage() {
        var start = getStartDate();
        var duration = DURATIONS[durationSelect.value] || DURATIONS['2d1n'];
        var plan = getSelectedPlan();
        var meta = PLAN_META[plan];
        var people = getPeopleCount();
        var pickup = getPickupLabel();
        var locationLabel = getCampLocationLabel();
        var price = calculatePrice();
        var lines = [
            'Chào Camp Nhà Thỏ! Mình muốn đặt:',
            '📅 Ngày: ' + formatDateForMessage(start, duration) + ' (' + duration.shortLabel + ')',
            '👥 Số người: ' + people + (people >= 5 ? '+' : ''),
            meta.emoji + ' Plan: ' + meta.label
        ];

        if (pickup) {
            lines.push('📍 Đón tại: ' + pickup);
        }

        if (locationLabel) {
            lines.push('🏕 Địa điểm: ' + locationLabel);
        }

        var addons = getSelectedAddons();
        if (addons.length) {
            lines.push('✨ Option thêm: ' + addons.map(function (item) { return item.label; }).join(', '));
        }

        var campPrefs = getCheckedLabels('campPref');
        if (campPrefs.length) {
            lines.push('🏕 Bãi mong muốn: ' + campPrefs.join(', '));
        }

        if (price.totalLabel) {
            lines.push('💰 Dự kiến: ~' + price.totalLabel);
            if (price.promoApplied) {
                lines.push('🎉 ' + CHILDREN_DAY_PROMO.label + ' (đặt đến 15/6)');
            }
        } else if (price.isDayTrip) {
            lines.push('💰 Dự kiến: Liên hệ để báo giá');
        }

        var fb = fbInput.value.trim();
        if (fb) {
            lines.push('🔗 FB: ' + fb);
        }

        return lines.join('\n');
    }

    function refreshUi() {
        updatePickupUi();
        updateLocationUi();
        var duration = DURATIONS[durationSelect.value] || DURATIONS['2d1n'];
        var price = calculatePrice();
        if (priceBreakdown) {
            priceBreakdown.textContent = price.breakdown;
        }
        if (priceTotal) {
            if (price.totalLabel && price.promoApplied && price.originalTotalLabel && window.CampChildrenDayPromo) {
                priceTotal.innerHTML =
                    '<span class="pricing-price-original">~' +
                    price.originalTotalLabel +
                    '</span> ' +
                    '<span class="pricing-price-promo booking-price-promo">~' +
                    price.totalLabel +
                    '</span>';
            } else if (price.totalLabel) {
                priceTotal.textContent = '~' + price.totalLabel;
            } else {
                priceTotal.textContent = 'Liên hệ';
            }
        }
        if (promoBanner) {
            promoBanner.hidden = !price.promoApplied;
        }
        if (priceNote) {
            if (duration.nights === 0) {
                priceNote.textContent =
                    '*Đi trong ngày chưa có bảng giá cố định — inbox để được báo giá · chưa gồm đồ ăn & xem phim.';
            } else if (price.promoApplied) {
                priceNote.textContent =
                    '*Đã gồm KM 1/6 (giảm thêm 5000¥) · đặt đến 15/6 · chưa gồm đồ ăn & xem phim · xác nhận qua inbox.';
            } else if (price.hasAddons) {
                priceNote.textContent =
                    '*Ước tính theo bảng giá 2N1Đ + option đã chọn · chưa gồm đồ ăn & xem phim · xác nhận qua inbox.';
            } else {
                priceNote.textContent =
                    '*Ước tính theo bảng giá 2N1Đ · chưa gồm đồ ăn & xem phim · xác nhận qua inbox.';
            }
        }
        if (messagePreview) {
            messagePreview.textContent = buildMessage();
        }
    }

    function copyMessage() {
        if (!updatePickupUi() || !validateStartDate() || !form.reportValidity()) {
            if (pickupCustomInput && pickupSelect.value === 'khac' && !isHatDePlan()) {
                pickupCustomInput.focus();
            }
            return;
        }
        var text = buildMessage();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(showCopyFeedback).catch(fallbackCopy);
            return;
        }
        fallbackCopy();
    }

    function fallbackCopy() {
        var textarea = document.createElement('textarea');
        textarea.value = buildMessage();
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback();
        } catch (err) {
            if (copyFeedback) {
                copyFeedback.textContent = 'Không copy được — hãy chọn và copy thủ công.';
            }
        }
        document.body.removeChild(textarea);
    }

    function showCopyFeedback() {
        if (!copyFeedback) {
            return;
        }
        copyFeedback.textContent = 'Đã copy!';
        copyFeedback.hidden = false;
        window.setTimeout(function () {
            copyFeedback.hidden = true;
        }, 2200);
    }

    populateLocations();
    prefillDateFromUrl();
    refreshUi();

    function onFormInput() {
        validateStartDate();
        refreshUi();
    }

    form.addEventListener('input', onFormInput);
    form.addEventListener('change', onFormInput);
    planRadios.forEach(function (radio) {
        radio.addEventListener('change', refreshUi);
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', copyMessage);
    }
})();

/**
 * Camp Nhà Thỏ — booking wizard: step navigation, validation, mobile summary sheet.
 */
(function () {
    'use strict';

    var TOTAL_STEPS = 4;
    var MOBILE_BREAKPOINT = 900;

    var form = document.getElementById('bookingForm');
    if (!form) {
        return;
    }

    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-wizard-step]'));
    var progressItems = Array.prototype.slice.call(
        document.querySelectorAll('[data-wizard-progress-step]')
    );
    var backBtn = document.querySelector('[data-wizard-back]');
    var nextBtn = document.querySelector('[data-wizard-next]');
    var navEl = document.querySelector('[data-booking-wizard-nav]');
    var mobileBar = document.querySelector('[data-booking-mobile-bar]');
    var mobileSheet = document.querySelector('[data-booking-mobile-sheet]');
    var mobileSheetBody = document.querySelector('[data-booking-sheet-body]');
    var summary = document.getElementById('bookingSummary');
    var priceTotal = document.getElementById('priceTotal');
    var priceTotalMobile = document.getElementById('priceTotalMobile');
    var startDateInput = document.getElementById('startDate');
    var peopleSelect = document.getElementById('people');
    var pickupSelect = document.getElementById('pickup');
    var pickupCustomInput = document.getElementById('pickupCustom');
    var planWarning = document.getElementById('planWarning');

    var currentStep = 1;

    function isMobile() {
        return window.matchMedia('(max-width: ' + MOBILE_BREAKPOINT + 'px)').matches;
    }

    function parseDateInput(value) {
        if (!value) {
            return null;
        }
        var trimmed = value.trim();
        var vn = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (vn) {
            var d = parseInt(vn[1], 10);
            var m = parseInt(vn[2], 10);
            var y = parseInt(vn[3], 10);
            var date = new Date(y, m - 1, d);
            if (date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d) {
                return date;
            }
            return null;
        }
        var iso = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (iso) {
            var y2 = parseInt(iso[1], 10);
            var m2 = parseInt(iso[2], 10);
            var d2 = parseInt(iso[3], 10);
            var date2 = new Date(y2, m2 - 1, d2);
            if (date2.getFullYear() === y2 && date2.getMonth() === m2 - 1 && date2.getDate() === d2) {
                return date2;
            }
        }
        return null;
    }

    function getSelectedPlan() {
        var selected = form.querySelector('input[name="plan"]:checked');
        return selected ? selected.value : 'bi';
    }

    function isHatDePlan() {
        return getSelectedPlan() === 'de';
    }

    function getPeopleCount() {
        var value = parseInt(peopleSelect.value, 10);
        return Number.isFinite(value) ? value : 2;
    }

    function validateStep(step) {
        if (step === 1) {
            if (!startDateInput) {
                return true;
            }
            var value = startDateInput.value.trim();
            if (!value) {
                startDateInput.setCustomValidity('Vui lòng nhập ngày đi.');
                startDateInput.reportValidity();
                return false;
            }
            if (!parseDateInput(value)) {
                startDateInput.setCustomValidity('Nhập ngày theo định dạng dd/mm/yyyy');
                startDateInput.reportValidity();
                return false;
            }
            startDateInput.setCustomValidity('');
            return true;
        }

        if (step === 2) {
            var blocked = getSelectedPlan() === 'bi' && getPeopleCount() >= 5;
            if (blocked && planWarning) {
                planWarning.hidden = false;
                planWarning.textContent =
                    'Plan Hạt Bí hỗ trợ tối đa 4 người. Vui lòng chọn Hạt Dẻ hoặc Hạt Nho, hoặc giảm số người.';
                planWarning.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            return !blocked;
        }

        if (step === 3) {
            if (isHatDePlan()) {
                return true;
            }
            if (pickupSelect && pickupSelect.value === 'khac') {
                var custom = pickupCustomInput ? pickupCustomInput.value.trim() : '';
                if (!custom) {
                    if (pickupCustomInput) {
                        pickupCustomInput.setCustomValidity('Vui lòng ghi rõ khu vực đón.');
                        pickupCustomInput.reportValidity();
                    }
                    return false;
                }
                if (pickupCustomInput) {
                    pickupCustomInput.setCustomValidity('');
                }
            }
            return true;
        }

        return true;
    }

    function setStep(step) {
        currentStep = Math.max(1, Math.min(TOTAL_STEPS, step));

        steps.forEach(function (el) {
            var stepNum = parseInt(el.getAttribute('data-wizard-step'), 10);
            var active = stepNum === currentStep;
            el.hidden = !active;
            el.classList.toggle('is-active', active);
        });

        progressItems.forEach(function (el) {
            var stepNum = parseInt(el.getAttribute('data-wizard-progress-step'), 10);
            var isComplete = stepNum < currentStep;
            el.classList.toggle('is-complete', isComplete);
            el.classList.toggle('is-active', stepNum === currentStep);
            if (isComplete) {
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
                el.setAttribute('aria-label', 'Quay lại bước ' + stepNum);
            } else {
                el.removeAttribute('tabindex');
                el.setAttribute('role', 'listitem');
                el.removeAttribute('aria-label');
            }
        });

        if (backBtn) {
            backBtn.hidden = currentStep <= 1;
        }
        if (navEl) {
            navEl.classList.toggle('is-first-step', currentStep <= 1);
        }
        if (nextBtn) {
            nextBtn.textContent = currentStep >= TOTAL_STEPS ? 'Hoàn tất' : 'Tiếp theo';
        }

        var activeStep = steps.find(function (el) {
            return parseInt(el.getAttribute('data-wizard-step'), 10) === currentStep;
        });
        if (activeStep) {
            var focusTarget = activeStep.querySelector('input, select, textarea, button');
            if (focusTarget && document.activeElement !== focusTarget) {
                focusTarget.focus({ preventScroll: true });
            }
        }
    }

    function syncMobilePrice() {
        if (!priceTotal || !priceTotalMobile) {
            return;
        }
        priceTotalMobile.innerHTML = priceTotal.innerHTML || priceTotal.textContent;
    }

    function updateMobileChrome() {
        var mobile = isMobile();
        if (mobileBar) {
            mobileBar.hidden = !mobile;
        }
        if (summary) {
            summary.classList.toggle('booking-summary--desktop-only', mobile);
        }
        syncMobilePrice();
    }

    function openMobileSheet() {
        if (!mobileSheet || !summary || !mobileSheetBody) {
            return;
        }
        mobileSheetBody.appendChild(summary);
        mobileSheet.hidden = false;
        mobileSheet.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('booking-sheet-open');
    }

    function closeMobileSheet() {
        if (!mobileSheet || !summary) {
            return;
        }
        var layout = document.querySelector('.booking-layout');
        if (layout && !layout.contains(summary)) {
            layout.appendChild(summary);
        }
        mobileSheet.hidden = true;
        mobileSheet.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('booking-sheet-open');
    }

    function finishWizard() {
        if (isMobile()) {
            openMobileSheet();
            var copyBtn = document.getElementById('copyMessageBtn');
            if (copyBtn) {
                copyBtn.focus({ preventScroll: true });
            }
            return;
        }
        if (summary) {
            summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (backBtn) {
        backBtn.addEventListener('click', function () {
            setStep(currentStep - 1);
        });
    }

    progressItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var stepNum = parseInt(item.getAttribute('data-wizard-progress-step'), 10);
            if (stepNum < currentStep) {
                setStep(stepNum);
            }
        });
        item.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }
            var stepNum = parseInt(item.getAttribute('data-wizard-progress-step'), 10);
            if (stepNum < currentStep) {
                event.preventDefault();
                setStep(stepNum);
            }
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            if (!validateStep(currentStep)) {
                return;
            }
            if (currentStep >= TOTAL_STEPS) {
                finishWizard();
                return;
            }
            setStep(currentStep + 1);
        });
    }

    document.querySelectorAll('[data-booking-sheet-open]').forEach(function (btn) {
        btn.addEventListener('click', openMobileSheet);
    });

    document.querySelectorAll('[data-booking-sheet-close]').forEach(function (btn) {
        btn.addEventListener('click', closeMobileSheet);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileSheet && !mobileSheet.hidden) {
            closeMobileSheet();
        }
    });

    if (priceTotal && typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(syncMobilePrice);
        observer.observe(priceTotal, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }

    window.addEventListener('resize', updateMobileChrome);
    updateMobileChrome();
    setStep(1);
})();

  } finally {
    EventTarget.prototype.addEventListener = nativeAdd;
  }

  return () => ac.abort();
}
