import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import StoryList from '@/components/mag/StoryList';
import { BLOG_COVER, BLOG_POSTS } from '@/lib/blog/content';
import { pickContinue } from '@/lib/site/continue';
import { POST_COUNT, folioFor } from '@/lib/site/issue';

export default function BlogPageContent() {
  const coverPost = BLOG_POSTS[BLOG_POSTS.length - 1];

  return (
    <main>
      <Cover
        label="Blog Camp Nhà Thỏ"
        folio={folioFor('Blog')}
        kicker={BLOG_COVER.kicker}
        title={BLOG_COVER.title}
        deck={BLOG_COVER.deck}
        image={{ src: coverPost.cardImage, alt: coverPost.cardAlt }}
        caption={`${POST_COUNT} bài viết`}
      />
      <section className="mag-section tone-paper" aria-label="Danh sách bài viết">
        <div className="wrap">
          <StoryList posts={BLOG_POSTS} headingLevel="h2" />
        </div>
      </section>
      <Continue items={pickContinue(['about', 'locations', 'faq'])} />
      <CtaBand title="Đọc đủ rồi. *Đi thôi.*" />
    </main>
  );
}
