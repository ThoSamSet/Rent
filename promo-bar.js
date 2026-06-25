/**
 * Camp Nhà Thỏ — KM 1/6 Thiếu nhi site-wide announcement bar.
 */
(function () {
    'use strict';

    var CHILDREN_DAY_PROMO = {
        deadline: new Date(2026, 5, 16),
        yen: 5000,
        label: 'KM 1/6 Thiếu nhi',
        message: 'KM 1/6 — Giảm thêm 5000¥ mọi gói thuê · Đặt đến 15/6'
    };

    var PRICE_SPAN_SELECTORS = [
        '.pricing-price-value',
        '.plan-detail-price-value',
        '.price-anchor-value'
    ].join(', ');

    var INLINE_PRICE_SELECTORS = [
        '.price-anchor-note',
        '.plans-grid .plan-card p'
    ].join(', ');

    function isChildrenDayPromoActive() {
        return new Date() < CHILDREN_DAY_PROMO.deadline;
    }

    window.CampChildrenDayPromo = {
        config: CHILDREN_DAY_PROMO,
        isActive: isChildrenDayPromoActive
    };

    function getDatLichHref() {
        var segments = window.location.pathname.split('/').filter(Boolean);
        var depth = segments.length;
        if (depth && /\.html$/i.test(segments[segments.length - 1])) {
            depth -= 1;
        }
        return (depth > 0 ? '../'.repeat(depth) : '') + 'dat-lich.html';
    }

    function formatMan(value) {
        var rounded = Math.round(value * 10) / 10;
        return String(rounded).replace(/\.0$/, '') + 'man';
    }

    function parseManFromText(text) {
        var match = text.match(/(\d+(?:\.\d+)?)\s*man/i);
        return match ? parseFloat(match[1], 10) : null;
    }

    function promoManValue(originalMan) {
        return originalMan - CHILDREN_DAY_PROMO.yen / 10000;
    }

    function getOriginalClassForElement(span) {
        if (span.classList.contains('plan-detail-price-value')) {
            return 'plan-detail-price-original';
        }
        if (span.classList.contains('price-anchor-value')) {
            return 'price-anchor-original';
        }
        return 'pricing-price-original';
    }

    function createPromoPriceBadge() {
        var badge = document.createElement('span');
        badge.className = 'pricing-price-badge';
        badge.textContent = '−5000¥';
        badge.setAttribute('aria-hidden', 'true');
        return badge;
    }

    function createPromoPriceBadgeHtml() {
        return (
            '<span class="pricing-price-badge" aria-hidden="true">−5000¥</span>'
        );
    }

    function shouldShowPromoBadge(span) {
        return !span.classList.contains('pricing-price-value');
    }

    function createPromoPriceHtml(originalText, originalMan, showBadge) {
        var prefixMatch = originalText.match(/^([^0-9]*)/);
        var prefix = prefixMatch ? prefixMatch[1] : '';
        var html =
            '<span class="pricing-price-original">' +
            originalText +
            '</span> ' +
            '<span class="pricing-price-promo">' +
            prefix +
            formatMan(promoManValue(originalMan)) +
            '</span>';
        if (showBadge) {
            html += ' ' + createPromoPriceBadgeHtml();
        }
        return html;
    }

    function transformPriceSpan(span) {
        if (span.dataset.promoApplied === '1') {
            return;
        }

        var text = span.textContent.trim();
        var originalMan = parseManFromText(text);
        if (originalMan === null) {
            return;
        }

        var prefixMatch = text.match(/^([^0-9]*)/);
        var prefix = prefixMatch ? prefixMatch[1] : '';
        var originalClass = getOriginalClassForElement(span);

        var original = document.createElement('span');
        original.className = originalClass;
        original.textContent = text;

        span.textContent = prefix + formatMan(promoManValue(originalMan));
        span.classList.add('pricing-price-promo');
        span.dataset.promoApplied = '1';

        var parent = span.parentNode;
        if (span.classList.contains('price-anchor-value') && parent && parent.tagName === 'A') {
            parent.classList.add('price-anchor-promo-link');
        }

        parent.insertBefore(original, span);

        if (shouldShowPromoBadge(span)) {
            parent.insertBefore(createPromoPriceBadge(), span.nextSibling);
        }
    }

    function transformInlineManPrices(element) {
        if (!element || element.dataset.promoInlineApplied === '1') {
            return;
        }

        var html = element.innerHTML;
        var updated = html.replace(
            /((?:từ\s+|Từ\s+|~)?)(\d+(?:\.\d+)?)\s*man/gi,
            function (match, prefix, num) {
                var originalMan = parseFloat(num, 10);
                if (isNaN(originalMan)) {
                    return match;
                }
                return (
                    '<span class="pricing-price-inline-group">' +
                    createPromoPriceHtml(prefix + num + 'man', originalMan, true) +
                    '</span>'
                );
            }
        );

        if (updated !== html) {
            element.innerHTML = updated;
            element.dataset.promoInlineApplied = '1';
        }
    }

    function applyPricingPromoDisplay(root) {
        var scope = root || document;

        scope.querySelectorAll(PRICE_SPAN_SELECTORS).forEach(function (span) {
            transformPriceSpan(span);
        });

        scope.querySelectorAll(INLINE_PRICE_SELECTORS).forEach(function (element) {
            transformInlineManPrices(element);
        });
    }

    function normalizePathname(pathname) {
        var normalized = pathname.replace(/\/$/, '');
        if (!normalized || normalized === '/') {
            return '/index.html';
        }
        var segments = normalized.split('/').filter(Boolean);
        var last = segments[segments.length - 1];
        if (last.indexOf('.') === -1) {
            segments.push('index.html');
        }
        return '/' + segments.join('/');
    }

    function markCurrentNavLink() {
        var currentPath = normalizePathname(window.location.pathname);

        document.querySelectorAll('.nav-links a, .nav-cta').forEach(function (link) {
            link.removeAttribute('aria-current');

            var href = (link.getAttribute('href') || '').trim();
            if (!href || /^https?:/i.test(href) || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) {
                return;
            }

            if (href.charAt(0) === '#') {
                if (isIndexPage() && href === '#locations') {
                    link.setAttribute('aria-current', 'page');
                }
                return;
            }

            var hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                var pathPart = href.substring(0, hashIndex);
                var hashPart = href.substring(hashIndex);
                if (!pathPart || pathPart === 'index.html') {
                    if (isIndexPage() && hashPart === '#locations') {
                        link.setAttribute('aria-current', 'page');
                    }
                    return;
                }
            }

            try {
                var resolved = new URL(href, window.location.href);
                if (normalizePathname(resolved.pathname) === currentPath) {
                    link.setAttribute('aria-current', 'page');
                }
            } catch (e) {
                // ignore invalid href
            }
        });
    }

    function injectNavPromoBadge() {
        document.querySelectorAll('.nav-links a').forEach(function (link) {
            var href = link.getAttribute('href') || '';
            var text = (link.textContent || '').replace(/\s+/g, ' ').trim();
            var isPricingLink =
                text === 'Chi phí' ||
                /pricing\.html(?:#|$)/i.test(href) ||
                href.indexOf('#pricing') !== -1;

            if (!isPricingLink || link.querySelector('.nav-promo-badge')) {
                return;
            }

            var badge = document.createElement('span');
            badge.className = 'nav-promo-badge';
            badge.textContent = 'KM';
            badge.setAttribute('aria-label', 'Khuyến mãi giảm thêm 5000 yen');
            link.appendChild(document.createTextNode(' '));
            link.appendChild(badge);
        });
    }

    function injectPricingPromoBanner() {
        document.querySelectorAll('.pricing-table-wrapper').forEach(function (wrapper) {
            var subtitle = wrapper.querySelector('.pricing-subtitle');
            if (!subtitle || subtitle.textContent.indexOf('Bảng giá dịch vụ') === -1) {
                return;
            }
            if (wrapper.previousElementSibling && wrapper.previousElementSibling.classList.contains('pricing-promo-banner')) {
                return;
            }

            var banner = document.createElement('div');
            banner.className = 'pricing-promo-banner';
            banner.setAttribute('role', 'note');
            banner.innerHTML =
                '<strong>' +
                CHILDREN_DAY_PROMO.label +
                '</strong> — Giảm thêm 5000¥ mọi gói thuê · Đặt đến 15/6';

            wrapper.parentNode.insertBefore(banner, wrapper);
        });
    }

    function initAnnouncementBar() {
        var bar = document.querySelector('.announcement-bar');
        if (!bar || !isChildrenDayPromoActive()) {
            return;
        }

        bar.innerHTML =
            '<a href="' +
            getDatLichHref() +
            '" class="announcement-primary">' +
            CHILDREN_DAY_PROMO.message +
            '</a>';
    }

    function isIndexPage() {
        var page = window.location.pathname.split('/').pop() || '';
        return page === '' || page === 'index.html';
    }

    function injectIndexPromoSale() {
        if (!isIndexPage()) {
            return;
        }

        var hero = document.querySelector('main .hero');
        if (!hero || document.querySelector('.index-promo-sale')) {
            return;
        }

        var datLichHref = getDatLichHref();

        var section = document.createElement('section');
        section.className = 'index-promo-sale';
        section.setAttribute('role', 'region');
        section.setAttribute('aria-label', CHILDREN_DAY_PROMO.label);
        section.innerHTML =
            '<div class="index-promo-sale-inner">' +
            '<div class="index-promo-sale-badge" aria-hidden="true">KM 1/6<span>Thiếu nhi</span></div>' +
            '<div class="index-promo-sale-content">' +
            '<h2 class="index-promo-sale-title">' +
            CHILDREN_DAY_PROMO.label +
            ' — Giảm thêm 5000¥</h2>' +
            '<p class="index-promo-sale-desc">Áp dụng <strong>mọi gói thuê</strong> đồ camping · Đặt đến <strong>15/6</strong></p>' +
            '</div>' +
            '<div class="index-promo-sale-actions">' +
            '<a href="' +
            datLichHref +
            '" class="btn-hero index-promo-sale-cta-primary">Đặt lịch ngay</a>' +
            '<a href="#pricing" class="btn-hero index-promo-sale-cta-secondary">Xem bảng giá</a>' +
            '</div>' +
            '</div>';

        hero.parentNode.insertBefore(section, hero);
    }

    function initPromoUi() {
        if (!isChildrenDayPromoActive()) {
            return;
        }
        initAnnouncementBar();
        injectIndexPromoSale();
        applyPricingPromoDisplay();
        injectNavPromoBadge();
        injectPricingPromoBanner();
    }

    window.CampChildrenDayPromo.formatMan = formatMan;
    window.CampChildrenDayPromo.promoManValue = promoManValue;
    window.CampChildrenDayPromo.createPromoPriceHtml = createPromoPriceHtml;
    window.CampChildrenDayPromo.applyPricingPromoDisplay = applyPricingPromoDisplay;

    function initSiteUi() {
        markCurrentNavLink();
        initPromoUi();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSiteUi);
    } else {
        initSiteUi();
    }
})();
