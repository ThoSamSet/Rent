import { highlightHtml } from '@/lib/faq/search';

/** @param {{ html: string; searchTokens?: string[] }} props */
export default function FaqAnswer({ html, searchTokens = [] }) {
  const content = searchTokens.length ? highlightHtml(html, searchTokens) : html;

  return <div className="faq-answer" dangerouslySetInnerHTML={{ __html: content }} />;
}
