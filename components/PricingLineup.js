import Link from 'next/link';
import SiteImage from '@/components/media/SiteImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

const PLANS = [
  {
    href: '/pricing#plan-de',
    img: '/images/responsive/plan-de-400w.webp',
    srcSet: '/images/responsive/plan-de-400w.webp 400w, /images/responsive/plan-de-800w.webp 800w',
    alt: 'Hạt Dẻ — tự chọn ngày và bãi, full đồ camping, không đưa đón',
    price: '3.7',
    name: 'plan Hạt dẻ 🌰',
  },
  {
    href: '/pricing#plan-bi',
    img: '/images/responsive/plan-bi-400w.webp',
    srcSet: '/images/responsive/plan-bi-400w.webp 400w, /images/responsive/plan-bi-800w.webp 800w',
    alt: 'Hạt Bí — đưa đón, lều / shelter, setup trọn gói',
    price: '4.7',
    name: 'plan Hạt bí 🎃',
  },
  {
    href: '/pricing#plan-nho',
    img: '/images/responsive/plan-nho-400w.webp',
    srcSet: '/images/responsive/plan-nho-400w.webp 400w, /images/responsive/plan-nho-800w.webp 800w',
    alt: 'Hạt Nho — bungalow, không lo mưa, đưa đón',
    price: '5.7',
    name: 'plan Hạt nho 🍇',
  },
];

export default function PricingLineup() {
  return (
    <section className="home-section home-pricing" id="pricing" data-reveal aria-label="Bảng giá">
      <div className="home-pricing__header">
        <p className="home-section__label">Bảng giá</p>
        <h2 className="home-section__title">LINEUP</h2>
      </div>
      <div className="home-pricing__pin">
        <div className="home-pricing__track" tabIndex={0} aria-label="Gói camping — vuốt ngang để xem thêm">
          {PLANS.map((plan) => (
            <Link key={plan.href} href={plan.href} className="home-pricing__card">
              <figure className="home-pricing__card-media">
                <SiteImage
                  src={plan.img}
                  srcSet={plan.srcSet}
                  sizes="(min-width: 640px) 380px, 75vw"
                  alt={plan.alt}
                  width={IMAGE_DIMS.pricingCard.width}
                  height={IMAGE_DIMS.pricingCard.height}
                />
              </figure>
              <div className="home-pricing__card-overlay">
                <span className="home-pricing__card-price">
                  từ {plan.price}
                  <small>man</small>
                </span>
                <span className="home-pricing__card-name">{plan.name}</span>
                <span className="home-pricing__card-cta">chi tiết</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
