import Link from 'next/link';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { PRICING_PLANS } from '@/lib/home/pricing-plans';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function PricingLineup() {
  return (
    <section className="home-section home-pricing" id="pricing" data-reveal aria-label="Bảng giá">
      <div className="home-pricing__header">
        <p className="home-section__label">Bảng giá</p>
        <h2 className="home-section__title">LINEUP</h2>
      </div>
      <div className="home-pricing__pin">
        <div className="home-pricing__track" tabIndex={0} aria-label="Gói camping — vuốt ngang để xem thêm">
          {PRICING_PLANS.map((plan) => (
            <Link key={plan.href} href={plan.href} className="home-pricing__card">
              <figure className="home-pricing__card-media">
                <ResponsiveImage
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
