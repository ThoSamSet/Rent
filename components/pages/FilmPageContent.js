import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import Mosaic from '@/components/mag/Mosaic';
import SectionHead from '@/components/mag/SectionHead';
import StoryList from '@/components/mag/StoryList';
import { FILM_ALBUMS, FILM_COVER, FILM_LOGS, YOUTUBE_CHANNEL_URL } from '@/lib/film/content';
import { pickContinue } from '@/lib/site/continue';
import { ALBUM_COUNT, FILM_LOG_COUNT, folioFor } from '@/lib/site/issue';

export default function FilmPageContent() {
  return (
    <main>
      <Cover
        label="Camp Nhà Thỏ film"
        folio={folioFor('Film')}
        kicker={FILM_COVER.kicker}
        title={FILM_COVER.title}
        deck={FILM_COVER.deck}
        image={FILM_COVER.image}
        caption={`${ALBUM_COUNT} album · ${FILM_LOG_COUNT} nhật ký`}
        lines={[
          { href: '#album', label: 'Album ảnh' },
          { href: '#hau-truong', label: 'Hậu trường' },
        ]}
      >
        <a className="btn btn--solid" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          Xem kênh YouTube
        </a>
      </Cover>

      <div id="album">
        {FILM_ALBUMS.map((album, index) => (
          <section
            key={album.slug}
            className={`mag-section ${index % 2 ? 'tone-paper' : 'tone-dusk'}`}
            aria-labelledby={`album-${album.slug}`}
          >
            <div className="wrap">
              <SectionHead id={`album-${album.slug}`} kicker={album.kicker} title={album.title} lead={album.lead} />
              <Mosaic items={album.items} label={album.title.replace(/\*/g, '')} />
            </div>
          </section>
        ))}
      </div>

      <section id="hau-truong" className="mag-section tone-paper" aria-labelledby="hau-truong-title">
        <div className="wrap">
          <SectionHead
            id="hau-truong-title"
            kicker="Nhật ký quay"
            title="Phía sau *mỗi video.*"
            lead="Ghi chép ngắn về cách tụi mình quay từng tập trên kênh YouTube Camp Nhà Thỏ."
          />
          <StoryList posts={FILM_LOGS} headingLevel="h3" />
        </div>
      </section>

      <Continue items={pickContinue(['blog', 'locations', 'schedule'])} />
      <CtaBand title="Muốn xuất hiện *trong tập sau?*" text="Đặt một đêm ở bãi — máy quay là tuỳ chọn." />
    </main>
  );
}
