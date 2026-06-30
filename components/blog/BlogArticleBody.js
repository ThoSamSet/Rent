/** @param {{ html: string }} props */
export default function BlogArticleBody({ html }) {
  return <div className="blog-article__body" dangerouslySetInnerHTML={{ __html: html }} />;
}
