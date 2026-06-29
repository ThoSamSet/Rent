/**
 * Load a classic script tag once, in order.
 * @param {string} src
 * @returns {Promise<void>}
 */
export function loadScript(src) {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    return existing.dataset.loaded === 'true'
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', reject, { once: true });
        });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';

/**
 * Inject a stylesheet link once.
 * @param {string} href
 */
export function loadStylesheet(href) {
  if (typeof document === 'undefined') {
    return;
  }
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

/** Ensure Leaflet CSS is present (SPA-safe). */
export function ensureLeafletCss() {
  loadStylesheet(LEAFLET_CSS);
}

const MAP_MIN_SIZE = 80;
const MAP_WAIT_TIMEOUT_MS = 10_000;

function isMobileMapLayout() {
  return window.matchMedia('(max-width: 1023px)').matches;
}

function isMapPanelVisibleForWait() {
  const panel = document.getElementById('locations-map-panel');
  if (!panel) {
    return false;
  }
  return panel.offsetParent !== null;
}

function mapContainerSized() {
  const mapEl = document.getElementById('map');
  if (!mapEl) {
    return false;
  }
  if (!isMapPanelVisibleForWait()) {
    return false;
  }
  const rect = mapEl.getBoundingClientRect();
  return rect.width > MAP_MIN_SIZE && rect.height > MAP_MIN_SIZE;
}

/**
 * Wait until #map exists and has layout dimensions.
 * @returns {Promise<void>}
 */
export function waitForMapContainer() {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  if (mapContainerSized()) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const deadline = Date.now() + MAP_WAIT_TIMEOUT_MS;
    let observer = null;
    let pollId = null;

    function finish() {
      if (pollId !== null) {
        clearInterval(pollId);
        pollId = null;
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }

    function tryReady() {
      if (mapContainerSized()) {
        finish();
        resolve();
        return true;
      }
      if (Date.now() > deadline) {
        finish();
        reject(new Error('locations map container timeout'));
        return true;
      }
      return false;
    }

    function attachObserver() {
      const mapEl = document.getElementById('map');
      if (!mapEl || observer) {
        return;
      }
      observer = new ResizeObserver(() => {
        tryReady();
      });
      observer.observe(mapEl);
      const panel = document.getElementById('locations-map-panel');
      if (panel) {
        observer.observe(panel);
      }
    }

    if (tryReady()) {
      return;
    }

    attachObserver();
    pollId = setInterval(() => {
      attachObserver();
      tryReady();
    }, 50);
  });
}

/** Double rAF to flush layout before map init. */
export function flushLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
