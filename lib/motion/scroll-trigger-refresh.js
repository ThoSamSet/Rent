let refreshTimer = null;

const SCROLL_IDLE_THRESHOLD = 50;

function canRefreshScrollTriggers() {
  return window.scrollY < SCROLL_IDLE_THRESHOLD;
}

export function refreshScrollTriggers(ScrollTrigger) {
  if (!ScrollTrigger || !canRefreshScrollTriggers()) {
    return;
  }

  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }

  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    if (canRefreshScrollTriggers()) {
      ScrollTrigger.refresh();
    }
  }, 150);
}

export function refreshScrollTriggersNow(ScrollTrigger) {
  if (!ScrollTrigger || !canRefreshScrollTriggers()) {
    return;
  }

  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }

  ScrollTrigger.refresh();
}
