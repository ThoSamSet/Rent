'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

const HOLD_MS = 350;
const CARD_SELECTOR = '.about-bento__card';

function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * About bento: tap toggles detail on touch; long-press peeks while held.
 * Hover/focus reveal is handled in CSS on pointer-fine devices.
 */
export default function AboutBentoEffects() {
  useEffect(() => {
    const grid = document.querySelector('.about-bento__grid');
    if (!grid || prefersReducedMotion()) {
      return undefined;
    }

    const cards = Array.from(grid.querySelectorAll(CARD_SELECTOR));
    const holdTimers = new Map();

    function setExpanded(card, expanded) {
      card.classList.toggle('is-expanded', expanded);
      card.setAttribute('aria-expanded', String(expanded));
    }

    function collapseOthers(except) {
      cards.forEach((card) => {
        if (card !== except && card.classList.contains('is-expanded')) {
          setExpanded(card, false);
        }
      });
    }

    function toggle(card) {
      const next = !card.classList.contains('is-expanded');
      setExpanded(card, next);
      if (next) {
        collapseOthers(card);
      }
    }

    function clearHold(card) {
      const timer = holdTimers.get(card);
      if (timer) {
        clearTimeout(timer);
        holdTimers.delete(card);
      }
      card.classList.remove('is-pressed');
      card.dataset.holdTriggered = '';
    }

    function onPointerDown(event) {
      if (canHover()) {
        return;
      }

      const card = event.currentTarget;
      clearHold(card);
      card.dataset.holdTriggered = '';

      const timer = window.setTimeout(() => {
        holdTimers.delete(card);
        card.dataset.holdTriggered = 'true';
        card.classList.add('is-pressed');
      }, HOLD_MS);

      holdTimers.set(card, timer);
    }

    function onPointerUp(event) {
      if (canHover()) {
        return;
      }

      const card = event.currentTarget;
      const wasHold = card.dataset.holdTriggered === 'true';
      clearHold(card);

      if (!wasHold && event.pointerType !== 'mouse') {
        toggle(card);
      }
    }

    function onPointerCancel(event) {
      clearHold(event.currentTarget);
    }

    function onKeyDown(event) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      event.preventDefault();
      toggle(event.currentTarget);
    }

    cards.forEach((card) => {
      card.addEventListener('pointerdown', onPointerDown);
      card.addEventListener('pointerup', onPointerUp);
      card.addEventListener('pointercancel', onPointerCancel);
      card.addEventListener('pointerleave', onPointerCancel);
      card.addEventListener('keydown', onKeyDown);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('pointerdown', onPointerDown);
        card.removeEventListener('pointerup', onPointerUp);
        card.removeEventListener('pointercancel', onPointerCancel);
        card.removeEventListener('pointerleave', onPointerCancel);
        card.removeEventListener('keydown', onKeyDown);
        clearHold(card);
      });
    };
  }, []);

  return null;
}
