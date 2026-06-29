'use client';

import { useEffect, useState } from 'react';

/**
 * Renders extracted legacy <main> HTML with a soft content reveal.
 */
export default function LegacyMainContent({ html, inlineStyles = '', mainClassName = '' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [html]);

  const mainClass = [mainClassName, visible ? 'legacy-main--enter' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {inlineStyles ? <div dangerouslySetInnerHTML={{ __html: inlineStyles }} /> : null}
      <main
        className={mainClass || undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
