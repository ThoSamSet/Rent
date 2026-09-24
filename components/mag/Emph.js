/**
 * Renders copy with `*word*` marked as <em> — the soft italic accent in titles.
 * @param {{ text: string }} props
 */
export default function Emph({ text }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, index) =>
    part.startsWith('*') && part.endsWith('*') ? <em key={index}>{part.slice(1, -1)}</em> : part,
  );
}

/** Plain text of a `*marked*` string, for aria-labels and alt text. */
export function plain(text) {
  return text.replace(/\*/g, '');
}
