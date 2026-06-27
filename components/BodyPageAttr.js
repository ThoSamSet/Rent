'use client';

import { useEffect } from 'react';

/** Sets body[data-page] for GSAP CSS selectors. */
export default function BodyPageAttr({ page }) {
  useEffect(() => {
    if (page) {
      document.body.setAttribute('data-page', page);
    }
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, [page]);

  return null;
}
