import Link from 'next/link';
import Contents from '@/components/mag/Contents';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import Emph from '@/components/mag/Emph';
import Hours from '@/components/mag/Hours';
import Ledger from '@/components/mag/Ledger';
import Letter from '@/components/mag/Letter';
import Mosaic from '@/components/mag/Mosaic';
import SectionHead from '@/components/mag/SectionHead';
import Spread from '@/components/mag/Spread';
import StoryList from '@/components/mag/StoryList';
import { BLOG_POSTS } from '@/lib/blog/content';
import { NAV_LINKS } from '@/lib/constants';
import { EQUIPMENT_CATEGORIES } from '@/lib/equipment/content';
import { GALLERY, HOME_COVER, HOME_HOURS, HOME_LETTER, HOME_NOTICES, HOME_SPREAD } from '@/lib/home/content';
import { OPTION_CATEGORIES } from '@/lib/options/content';
import { PRICING_PLANS } from '@/lib/pricing/content';
import { FAQ_COUNT, OPEN_DAYS, POST_COUNT, SCHEDULE_RANGE, SITE_COUNT, UPDATED_LABEL } from '@/lib/site/issue';

const OPEN_OPTIONS = OPTION_CATEGORIES.filter((category) => category.status === 'open')
  .map((category) => category.title.toLowerCase())
  .join(', ');

const INDEX_VALUES = {
  '/about': 'tụi mình là ai',
  '/pricing': `từ ${PRICING_PLANS[0].priceFrom} man`,
  '/options': OPEN_OPTIONS,
  '/equipment': `${EQUIPMENT_CATEGORIES.length} nhóm đồ, đủ cả`,
  '/locations': `${SITE_COUNT} bãi, từ núi ra biển`,
  '/schedule': `còn ${OPEN_DAYS} ngày`,
  '/faq': `${FAQ_COUNT} câu hỏi`,
  '/blog': `${POST_COUNT} bài ghi chép`,
};

export default function HomePageContent() {
  return (
    <main>
      <Cover
        label="Camp Nhà Thỏ — trang bìa"
        folio={['Camp Nhà Thỏ', `Lịch mở · ${SCHEDULE_RANGE}`, UPDATED_LABEL]}
        kicker={HOME_COVER.kicker}
        title={HOME_COVER.title}
        deck={HOME_COVER.deck}
        image={HOME_COVER.image}
        caption="Một buổi tối ở trại"
        short={false}
        lines={[
          { href: '#muc-luc', label: 'Mục lục' },
          { href: '#pricing', label: 'Ba plan' },
          { href: '#mot-dem', label: 'Một đêm ở trại' },
          { href: '#gallery', label: 'Ảnh' },
        ]}
      >
        <div className="actions">
          <Link href="/dat-lich" className="btn btn--solid">
            Đặt lịch
          </Link>
          <Link href="/schedule" className="btn btn--line">
            Xem ngày còn trống
          </Link>
        </div>
      </Cover>

      <Letter label="Lời chào" {...HOME_LETTER} />

      <Contents
        id="muc-luc"
        label="Mục lục"
        kicker="Mục lục"
        title="Trước khi *lên đường*"
        image={{ src: '/images/about-hero.webp', alt: 'Núi Phú Sĩ nhìn qua mặt hồ' }}
        caption="Phú Sĩ soi bóng xuống hồ"
        entries={NAV_LINKS.map((link) => ({ href: link.href, label: link.label, value: INDEX_VALUES[link.href] }))}
      />

      <Spread
        id="pricing"
        label="Ba plan"
        image={{ src: '/images/plan-bi.webp', alt: 'Bữa tối trong lều plan Hạt Bí' }}
        caption="Hạt Bí, plan được chọn nhiều nhất"
      >
        <p className="kicker">{HOME_SPREAD.kicker}</p>
        <h2 className="spread__title">
          <Emph text={HOME_SPREAD.title} />
        </h2>
        <p className="essay essay--drop">{HOME_SPREAD.essay}</p>
        <div className="spread__ledger">
          <Ledger
            variant="wide"
            label="Ba plan"
            rows={PRICING_PLANS.map((plan) => ({
              href: `/pricing#${plan.id}`,
              label: plan.name,
              detail: plan.shortNote,
              value: `từ ${plan.priceFrom} man`,
            }))}
          />
        </div>
        <Link href="/pricing" className="text-link spread__more">
          Xem giá theo số người
        </Link>
      </Spread>

      <Hours id="mot-dem" label="Một đêm ở trại" {...HOME_HOURS} />

      <section className="mag-section mag-section--tight tone-ink" id="notices" aria-label="Tin từ trại">
        <div className="wrap">
          <SectionHead kicker="Tin từ trại" title="Có gì *mới*" />
          <Ledger
            variant="plain"
            label="Tin từ trại"
            rows={HOME_NOTICES.map((notice) => ({
              key: notice.dateTime,
              href: notice.href,
              label: notice.text,
              meta: notice.linkLabel,
              value: <time dateTime={notice.dateTime}>{notice.date}</time>,
            }))}
          />
        </div>
      </section>

      <section className="mag-section tone-ink" id="gallery" aria-label="Ảnh chụp ở trại">
        <div className="wrap">
          <SectionHead kicker="Ảnh chụp ở trại" title="Một đêm, *sáu khung hình*" />
        </div>
        <Mosaic items={GALLERY} label="Ảnh camping của Camp Nhà Thỏ" />
      </section>

      <section className="mag-section tone-paper" id="blog" aria-label="Blog">
        <div className="wrap">
          <SectionHead
            kicker="Blog"
            title="Ghi chép *ngoài trời*"
            lead={
              <Link href="/blog" className="text-link">
                Đọc tất cả bài viết
              </Link>
            }
          />
          <StoryList posts={BLOG_POSTS} />
        </div>
      </section>

      <CtaBand
        title="Bạn chọn ngày, *phần còn lại* để tụi mình lo."
        text="Không cần đặt cọc. Nhắn qua TikTok hoặc Facebook, tụi mình trả lời trong inbox."
      />
    </main>
  );
}
