import Link from 'next/link';
import PricingLineup from '@/components/PricingLineup';
import SiteImage from '@/components/media/SiteImage';
import BentoImage from '@/components/media/BentoImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function AboutPageContent() {
  return (
    <main className="home-editorial">
      <section className="home-hero" aria-label="Giới thiệu Camp Nhà Thỏ">
        <div className="home-hero__media parallax-wrap">
          <SiteImage
            src="/images/responsive/about-hero-960w.webp"
            srcSet="/images/responsive/about-hero-480w.webp 480w, /images/responsive/about-hero-960w.webp 960w, /images/responsive/about-hero-1440w.webp 1440w"
            sizes="100vw"
            alt="Camp Nhà Thỏ — share đồ camping Phú Sĩ"
            id="heroImg"
            className="home-hero__img parallax-layer"
            width={IMAGE_DIMS.heroFull.width}
            height={IMAGE_DIMS.heroFull.height}
            priority
          />
        </div>
        <div className="home-hero__overlay">
          <p className="home-hero__label">Giới thiệu</p>
          <h1 className="home-hero__title">Camp Nhà Thỏ</h1>
          <p className="home-hero__subtitle">Chuyến đi của bạn, nhịp chill của bạn</p>
          <div className="about-hero__actions">
            <Link href="/schedule" className="btn-outline">
              Xem lịch trình
            </Link>
          </div>
        </div>
      </section>

      <section className="about-bento home-section" data-reveal aria-label="Về Camp Nhà Thỏ">
        <div className="about-bento__grid">
          <article className="about-bento__card about-bento__card--model" aria-labelledby="about-share-title">
            <div className="about-bento__media">
              <BentoImage src="/images/about-1.webp" />
            </div>
            <div className="about-bento__copy">
              <p className="home-section__label">Mô hình</p>
              <h2 className="about-bento__title" id="about-share-title">
                Không phải cho thuê, <br />
                mà là chia sẻ
              </h2>
              <p className="about-bento__text">
                Chia sẻ đồ camping và hỗ trợ trọn gói <br />
                Chúng mình lo đưa đón, setup; bạn chỉ cần chill.
              </p>
            </div>
          </article>
          <article className="about-bento__card about-bento__card--setup" aria-labelledby="about-setup-title">
            <div className="about-bento__media">
              <BentoImage src="/images/dung-cu-1.webp" />
            </div>
            <div className="about-bento__copy">
              <p className="home-section__label">Khác biệt</p>
              <h3 className="about-bento__title" id="about-setup-title">
                Đồ &amp; setup
              </h3>
              <p className="about-bento__text">
                Đầy đủ gear camping <br /> setup và thu dọn <br />
                không cần tự chuẩn bị gì thêm.
              </p>
            </div>
          </article>
          <article className="about-bento__card about-bento__card--pickup" aria-labelledby="about-pickup-title">
            <div className="about-bento__media">
              <BentoImage src="/images/dua-don-1.webp" />
            </div>
            <div className="about-bento__copy">
              <p className="home-section__label">Khác biệt</p>
              <h3 className="about-bento__title" id="about-pickup-title">
                Đưa đón
              </h3>
              <p className="about-bento__text">
                Đón tận nơi, đi riêng <br />
                không ghép khách.
              </p>
            </div>
          </article>
          <article className="about-bento__card about-bento__card--chill" aria-labelledby="about-chill-title">
            <div className="about-bento__media">
              <BentoImage src="/images/chill-chup-anh-1.webp" />
            </div>
            <div className="about-bento__copy">
              <p className="home-section__label">Khác biệt</p>
              <h3 className="about-bento__title" id="about-chill-title">
                Chill &amp; chụp ảnh
              </h3>
              <p className="about-bento__text">Tự do ăn chơi, hỗ trợ chụp hình kỷ niệm.</p>
            </div>
          </article>
          <article className="about-bento__card about-bento__card--audience" aria-labelledby="about-audience-title">
            <div className="about-bento__media">
              <BentoImage src="/images/doi-tuong-1.webp" />
            </div>
            <div className="about-bento__copy">
              <p className="home-section__label">Đối tượng</p>
              <h3 className="about-bento__title" id="about-audience-title">
                Dành cho ai?
              </h3>
              <ul className="about-bento__list">
                <li>
                  <span aria-hidden="true">🌿</span> Lần đầu camping / chưa có đồ
                </li>
                <li>
                  <span aria-hidden="true">👥</span> Nhóm nhỏ, couple, gia đình
                </li>
                <li>
                  <span aria-hidden="true">⏰</span> Bận rộn, không muốn tự chuẩn bị
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="about-quotes home-section" data-reveal aria-label="Lời nhắn từ Camp Nhà Thỏ">
        <blockquote className="about-quotes__inner" cite="https://campnhatho.com">
          <p className="about-quotes__line">Chưa có đồ camping? Không sao.</p>
          <p className="about-quotes__line">Chúng mình chia sẻ — bạn chỉ cần chill.</p>
          <p className="about-quotes__line about-quotes__line--accent">Where every journey feels like coming home.</p>
        </blockquote>
      </section>

      <PricingLineup />

      <section className="home-bottom about-explore" data-reveal aria-label="Tìm hiểu thêm">
        <Link href="/pricing" className="home-faq">
          <div className="home-faq__media">
            <SiteImage src="/images/chi-phi-1.webp" alt="Chi phí và plan camping" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Chi phí</p>
            <h2 className="home-section__title">Bảng giá &amp; plan</h2>
          </div>
        </Link>
        <Link href="/equipment" className="home-faq">
          <div className="home-faq__media">
            <SiteImage src="/images/equipment-tent.jpg" alt="Dụng cụ camping" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
          </div>
          <div className="home-faq__copy">
            <p className="home-section__label">Dụng cụ</p>
            <h2 className="home-section__title">Danh sách đồ camping</h2>
          </div>
        </Link>
        <Link href="/faq" className="home-faq about-explore__full">
          <div className="home-faq__media">
            <SiteImage src="/images/camping-5.webp" alt="Câu hỏi thường gặp" width={IMAGE_DIMS.faqTile.width} height={IMAGE_DIMS.faqTile.height} />
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
          <Link href="/dat-lich" className="btn-hero">
            Đặt lịch
          </Link>
        </div>
      </section>
    </main>
  );
}
