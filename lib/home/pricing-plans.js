/** Shared pricing plan cards for home grid and PricingLineup. */
import { PRICING_PLANS as PRICING_PLAN_DETAILS } from '@/lib/pricing/content';

export const PRICING_PLANS = PRICING_PLAN_DETAILS.map((plan) => ({
  href: `/pricing#${plan.id}`,
  img: plan.cardImg,
  alt: plan.alt,
  price: plan.priceFrom,
  name: plan.cardName,
}));
