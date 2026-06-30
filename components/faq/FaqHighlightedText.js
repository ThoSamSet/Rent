import { getHighlightSegments } from '@/lib/faq/search';

/** @param {{ text: string; searchTokens?: string[] }} props */
export default function FaqHighlightedText({ text, searchTokens = [] }) {
  const segments = getHighlightSegments(text, searchTokens);

  return (
    <>
      {segments.map((segment, index) =>
        segment.match ? (
          <mark key={index} className="faq-match">
            {segment.text}
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  );
}
