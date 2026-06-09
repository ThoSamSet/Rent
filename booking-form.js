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
            desc: 'Tự lái xe · full đồ camping · không đưa đón'
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
        var custom = locationCustom.value.trim();
        if (custom) {
            return custom;
        }
        if (locationSelect.value === 'suggest') {
            return 'Gợi ý giúp mình';
        }
        if (locationSelect.value === 'other') {
            return 'Chưa chọn — gợi ý giúp mình';
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
            startDateInput.value = formatIsoDate(parsed);
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
        if (!startDateInput.value) {
            return null;
        }
        var parts = startDateInput.value.split('-');
        return buildDate(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
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
        if (!updatePickupUi() || !form.reportValidity()) {
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

    form.addEventListener('input', refreshUi);
    form.addEventListener('change', refreshUi);
    planRadios.forEach(function (radio) {
        radio.addEventListener('change', refreshUi);
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', copyMessage);
    }
})();
