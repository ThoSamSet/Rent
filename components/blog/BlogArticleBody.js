/** @param {{ html: string }} props */
export default function BlogArticleBody({ html }) {
  return <div className="article__body prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
