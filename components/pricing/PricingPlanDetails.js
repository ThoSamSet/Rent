import ResponsiveImage from '@/components/media/ResponsiveImage';
import { PRICING_INTRO, PRICING_PLANS } from '@/lib/pricing/content';
import { IMAGE_DIMS } from '@/lib/image-sizes';

function PlanBadge({ badge, tagline }) {
  if (badge === 'popular' && tagline) {
    return <span className="pricing-plan__tagline">{tagline}</span>;
  }

  if (badge === 'new') {
    return <span className="plan-new-badge">Mới</span>;
  }

  return null;
}

function PlanFeature({ feature }) {
  if (typeof feature === 'string') {
    return <li>{feature}</li>;
  }

  return (
    <li>
      {feature.text}
      {feature.note ? <span className="pricing-plan__feature-note"> {feature.note}</span> : null}
    </li>
  );
}

export default function PricingPlanDetails() {
  return (
    <section className="about-block pricing-plans home-section" data-reveal aria-label="Giới thiệu 3 plan camping">
      <div className="about-block__header">
        <p className="home-section__label">{PRICING_INTRO.label}</p>
        <h2 className="home-section__title">{PRICING_INTRO.title}</h2>
      </div>

      <div className="pricing-plans__list">
        {PRICING_PLANS.map((plan) => (
          <article
            key={plan.id}
            id={plan.id}
            className={`pricing-plan${plan.imagePosition === 'right' ? ' pricing-plan--reverse' : ''}`}
            aria-labelledby={`${plan.id}-title`}
          >
            <div className={`pricing-plan__grid${plan.imagePosition === 'right' ? ' pricing-plan__grid--reverse' : ''}`}>
              <div className="pricing-plan__media">
                <ResponsiveImage
                  src={plan.image}
                  alt={plan.alt}
                  width={IMAGE_DIMS.gallery.width}
                  height={IMAGE_DIMS.gallery.height}
                />
              </div>
              <div className="pricing-plan__copy">
                <h3 className="pricing-plan__title" id={`${plan.id}-title`}>
                  {plan.emoji} {plan.name}{' '}
                  <PlanBadge badge={plan.badge} tagline={plan.tagline} />
                </h3>
                <div className="plan-detail-price-block">
                  <span className="plan-detail-price-value">{plan.priceLabel}</span>
                </div>
                {plan.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="pricing-plan__text">
                    {paragraph}
                  </p>
                ))}
                <ul className="pricing-plan__list">
                  {plan.features.map((feature) => (
                    <PlanFeature key={typeof feature === 'string' ? feature : feature.text} feature={feature} />
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
