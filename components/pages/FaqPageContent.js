import Continue from '@/components/mag/Continue';
import Cover from '@/components/mag/Cover';
import CtaBand from '@/components/mag/CtaBand';
import FaqSection from '@/components/faq/FaqSection';
import { FAQ_COVER } from '@/lib/faq/content';
import { pickContinue } from '@/lib/site/continue';
import { FAQ_COUNT, folioFor } from '@/lib/site/issue';

export default function FaqPageContent() {
  return (
    <main>
      <Cover
        label="Câu hỏi thường gặp về Camp Nhà Thỏ"
        folio={folioFor('Hỏi đáp')}
        kicker={FAQ_COVER.kicker}
        title={FAQ_COVER.title}
        deck={FAQ_COVER.deck}
        image={{ src: '/images/faq-hero.webp', alt: 'Trại camping ban đêm với đèn ấm và núi Phú Sĩ phía xa' }}
        caption={`${FAQ_COUNT} câu hỏi, trả lời thật lòng`}
      />
      <section className="mag-section tone-paper" aria-label="Danh sách câu hỏi">
        <FaqSection />
      </section>
      <Continue items={pickContinue(['schedule', 'pricing', 'options'])} />
      <CtaBand
        title="Chưa thấy *câu trả lời*?"
        text="Nhắn cho tụi mình qua TikTok hoặc Facebook. Tụi mình trả lời trực tiếp, từng tin một."
        actions={[
          { href: '/dat-lich', label: 'Đặt lịch', primary: true },
          { href: '/about', label: 'Về Camp Nhà Thỏ' },
        ]}
      />
    </main>
  );
}
