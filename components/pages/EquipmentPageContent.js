import Link from 'next/link';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import BentoImage from '@/components/media/BentoImage';
import { HERO_SLIDES } from '@/lib/hero/slides';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function EquipmentPageContent() {
  return (
    <main className="home-editorial">
      <section className="home-hero" aria-label="Dụng cụ camping Camp Nhà Thỏ">
        <HeroSlideshow slides={HERO_SLIDES.equipment} />
        <div className="home-hero__overlay">
          <p className="home-hero__label">Dụng cụ</p>
          <h1 className="home-hero__title">Dụng cụ camping đã sẵn sàng</h1>
          <p className="home-hero__subtitle">
            Bạn chỉ cần mang theo đồ ăn theo nhu cầu, phần còn lại để Camp Nhà Thỏ chuẩn bị.
          </p>
          <div className="about-hero__actions">
            <Link href="/schedule" className="btn-outline">
              Xem lịch trình
            </Link>
          </div>
        </div>
      </section>

      <section className="equipment-bento home-section" data-reveal aria-label="Danh mục dụng cụ camping">
        <div className="equipment-bento__grid">
          <article className="equipment-bento__card equipment-bento__card--intro" aria-labelledby="equip-intro-title">
            <div className="equipment-bento__media">
              <BentoImage src="/images/equipment-tent.jpg" />
            </div>
            <div className="equipment-bento__copy">
              <p className="home-section__label">Lần đầu cũng được</p>
              <h2 className="equipment-bento__title" id="equip-intro-title">
                Chưa có đồ? Không sao.
              </h2>
              <p className="equipment-bento__text">
                Lều, bếp, đèn, túi ngủ đã sẵn sàng. Tụi mình setup và hướng dẫn — bạn chỉ việc trải nghiệm.
              </p>
            </div>
          </article>

          {[
            {
              id: 'equip-sleep-title',
              img: '/images/equipment-sleep.jpg',
              title: 'Lều & chỗ ngủ',
              items: ['Lều 2 room', 'Túi ngủ · thảm bạc · chăn theo mùa'],
            },
            {
              id: 'equip-table-title',
              img: '/images/equipment-table.jpg',
              title: 'Bàn ghế & không gian',
              items: ['Bàn camping · ghế xếp', 'Tarp che nắng & mưa'],
            },
            {
              id: 'equip-cook-title',
              img: '/images/equipment-cooking.jpg',
              title: 'Nấu ăn & BBQ',
              items: [
                <>Bếp gas · bếp củi <span className="equipment-bento__note">※ gồm củi</span></>,
                'Nồi · chảo · dao',
              ],
            },
            {
              id: 'equip-food-title',
              img: '/images/food-drink.jpg',
              title: 'Ăn uống & dụng cụ',
              items: ['Bát · đĩa · cốc · đũa · muỗng'],
            },
            {
              id: 'equip-light-title',
              img: '/images/equipment-light.jpg',
              title: 'Đèn & điện',
              items: [
                'Đèn trang trí',
                <>Lò sưởi dầu <span className="equipment-bento__note">※ mùa lạnh</span></>,
              ],
            },
            {
              id: 'equip-fun-title',
              img: '/images/equipment-entertainment.jpg',
              title: 'Giải trí & ghi hình',
              items: [
                'Fujifilm X-T5 · Nintendo Switch',
                <>Máy chiếu Full HD <span className="equipment-bento__note">※ báo trước</span></>,
              ],
            },
          ].map((card) => (
            <article key={card.id} className="equipment-bento__card" aria-labelledby={card.id}>
              <div className="equipment-bento__media">
                <BentoImage src={card.img} />
              </div>
              <div className="equipment-bento__copy">
                <p className="home-section__label">Danh mục</p>
                <h3 className="equipment-bento__title" id={card.id}>
                  {card.title}
                </h3>
                <ul className="equipment-bento__list">
                  {card.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <article className="equipment-bento__card equipment-bento__card--bring" aria-labelledby="equip-bring-title">
            <div className="equipment-bento__media">
              <BentoImage src="/images/equipment-bring.jpg" />
            </div>
            <div className="equipment-bento__copy">
              <p className="home-section__label">Mang theo gì?</p>
              <h3 className="equipment-bento__title" id="equip-bring-title">
                Đồ cá nhân gợi ý
              </h3>
              <p className="equipment-bento__text">
                Quần áo ấm · giày đi bộ · đồ tắm · gối cá nhân · snack &amp; nước uống.
              </p>
              <p className="equipment-bento__link">
                <Link href="/blog/checklistcampingnhatban">Checklist chi tiết →</Link>
              </p>
            </div>
          </article>
        </div>
        <p className="equipment-bento__footnotes">
          ※ Máy ảnh, Switch, máy chiếu — báo trước để chuẩn bị. Dụng cụ vệ sinh sạch, kiểm tra kỹ trước mỗi chuyến.
        </p>
      </section>

      <section className="home-bottom about-explore" data-reveal aria-label="Tìm hiểu thêm">
        <Link href="/schedule" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage src="/images/subBanner-lich-trinh.webp" alt="Lịch trình camping — kiểm tra lịch trống sắp tới" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Lịch trình</p>
            <h2 className="home-section__title">Kiểm tra lịch trống sắp tới</h2>
          </div>
        </Link>
        <Link href="/pricing" className="home-faq">
          <div className="home-faq__media">
            <ResponsiveImage src="/images/chi-phi-1.webp" alt="Chi phí và plan camping" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Chi phí</p>
            <h2 className="home-section__title">Bảng giá &amp; plan</h2>
          </div>
        </Link>
        <Link href="/faq" className="home-faq about-explore__full">
          <div className="home-faq__media">
            <ResponsiveImage src="/images/subBanner-faq.webp" alt="Câu hỏi thường gặp" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">FAQ</p>
            <h2 className="home-section__title">Câu hỏi thường gặp</h2>
          </div>
        </Link>
      </section>

      <section className="about-cta home-section" data-reveal>
        <h2 className="home-section__title">Sẵn sàng cho chuyến đi của bạn?</h2>
        <p className="about-cta__tagline">Share đồ – Đi riêng – Trải nghiệm</p>
        <div className="about-cta__actions">
          <Link href="/dat-lich" className="btn-hero hue-cta hue-cta--dusk">
            Đặt lịch
          </Link>
        </div>
      </section>
    </main>
  );
}
