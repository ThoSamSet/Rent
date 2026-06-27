(function () {
    var HINT_SELECTOR = '.table-swipe-hint, .schedule-swipe-hint';
    var WRAPPER_SELECTOR = '.schedule-table-wrapper, .pricing-table-wrapper, .comparison-table-wrap, .about-comparison__wrap';

    function initTableSwipeHints() {
        document.querySelectorAll(HINT_SELECTOR).forEach(function (hint) {
            if (hint.dataset.swipeBound) {
                return;
            }

            var wrapper = hint.nextElementSibling;
            if (!wrapper || !wrapper.matches(WRAPPER_SELECTOR)) {
                return;
            }

            hint.dataset.swipeBound = '1';

            var dismissed = false;
            wrapper.addEventListener('scroll', function () {
                if (dismissed || wrapper.scrollLeft < 8) {
                    return;
                }
                dismissed = true;
                hint.classList.add('is-dismissed');
            }, { passive: true });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTableSwipeHints);
    } else {
        initTableSwipeHints();
    }
})();
