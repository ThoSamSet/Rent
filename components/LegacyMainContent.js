'use client';

import { useEffect, useState } from 'react';

/**
 * Renders extracted legacy <main> HTML with a soft content reveal.
 */
export default function LegacyMainContent({ html, inlineStyles = '' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [html]);

  return (
    <>
      {inlineStyles ? <div dangerouslySetInnerHTML={{ __html: inlineStyles }} /> : null}
      <main
        className={visible ? 'legacy-main--enter' : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
