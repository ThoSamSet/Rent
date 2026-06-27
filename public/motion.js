(function () {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    var SELECTORS = [
        'main > section',
        'main > article',
        'footer.footer',
        '.container > header.header'
    ].join(', ');

    function onIntersect(entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }
            var el = entry.target;
            el.classList.add('motion-reveal');
            observer.unobserve(el);
        });
    }

    function init() {
        var nodes = document.querySelectorAll(SELECTORS);
        if (!nodes.length) {
            return;
        }

        var observer = new IntersectionObserver(onIntersect, {
            root: null,
            rootMargin: '0px 0px -5% 0px',
            threshold: 0.06
        });

        nodes.forEach(function (el) {
            observer.observe(el);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
