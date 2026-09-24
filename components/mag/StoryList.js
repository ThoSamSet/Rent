import Link from 'next/link';
import Photo from '@/components/mag/Photo';

/**
 * Lead story plus a numbered list of the rest.
 * @param {{ posts: { href: string; title: string; excerpt: string; cardImage: string; cardAlt: string }[]; headingLevel?: 'h2' | 'h3' }} props
 */
export default function StoryList({ posts, headingLevel: Heading = 'h3' }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <div className="stories">
      <Link href={lead.href} className="story story--lead">
        <Photo className="story__photo" src={lead.cardImage} alt={lead.cardAlt} />
        <span className="story__text">
          <span className="kicker">Bài mới nhất</span>
          <Heading className="story__title">{lead.title}</Heading>
          <span className="story__excerpt">{lead.excerpt}</span>
        </span>
      </Link>
      {rest.length ? (
        <ol className="stories__rest">
          {rest.map((post, index) => (
            <li key={post.href}>
              <Link href={post.href} className="story story--row">
                <img src={post.cardImage} alt={post.cardAlt} loading="lazy" decoding="async" width="600" height="400" />
                <span className="story__no">{String(index + 2).padStart(2, '0')}</span>
                <span className="story__text">
                  <Heading className="story__title">{post.title}</Heading>
                  <span className="story__excerpt">{post.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
