/**
 * Camp Nhà Thỏ — unified burger navigation (desktop + mobile).
 */
(function () {
    'use strict';

    var burger = document.getElementById('burgerMenu');
    var navMenu = document.getElementById('navMenu');
    var backdrop = document.getElementById('navMenuBackdrop');
    var navLinks = document.getElementById('navLinks');

    if (!burger || !navMenu) {
        return;
    }

    // Escape navbar GSAP transform so position:fixed covers the viewport.
    if (navMenu.parentElement !== document.body) {
        document.body.appendChild(navMenu);
    }

    var openLabel = 'Mở menu điều hướng';
    var closeLabel = 'Đóng menu điều hướng';
    var lastFocused = null;

    function isOpen() {
        return navMenu.classList.contains('is-open');
    }

    function setOpen(open) {
        burger.classList.toggle('is-open', open);
        burger.classList.toggle('active', open);
        navMenu.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? closeLabel : openLabel);

        if (open) {
            navMenu.removeAttribute('inert');
        } else {
            navMenu.setAttribute('inert', '');
        }

        document.documentElement.classList.toggle('nav-menu-open', open);

        if (open) {
            lastFocused = document.activeElement;
            var firstLink = navLinks && navLinks.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        } else if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
            lastFocused = null;
        }
    }

    function toggleMenu() {
        setOpen(!isOpen());
    }

    function closeMenu() {
        if (isOpen()) {
            setOpen(false);
        }
    }

    burger.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleMenu();
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isOpen()) {
            event.preventDefault();
            closeMenu();
        }
    });

    navMenu.addEventListener('keydown', function (event) {
        if (event.key !== 'Tab' || !isOpen()) {
            return;
        }

        var focusable = navMenu.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) {
            return;
        }

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
})();
