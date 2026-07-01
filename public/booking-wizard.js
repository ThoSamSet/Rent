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
