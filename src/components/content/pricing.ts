import { formatRate, getMaterial } from './materials';

// Home page Pricing section: three simple plans, all rates taken from the materials data.
export interface PricingPlan {
  title: string;
  tag?: string;
  rate: string;
  rateLabel: string;
  description: string;
  points: string[];
}

const pla = getMaterial('pla');
const plaPlus = getMaterial('pla-plus');
const petg = getMaterial('petg');

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Student Projects',
    tag: 'Student rate',
    rate: formatRate(pla.pricePerGram.student ?? pla.pricePerGram.standard),
    rateLabel: 'per gram · PLA',
    description: 'Coursework, final-year projects and robotics teams.',
    points: [
      'Valid college ID or referral at checkout',
      `Saves on the standard PLA rate of ${formatRate(pla.pricePerGram.standard)}/g`,
      `Student rates for ${plaPlus.name} and ${petg.name} coming soon`,
    ],
  },
  {
    title: 'Rapid Prototypes',
    rate: formatRate(pla.pricePerGram.standard),
    rateLabel: 'from, per gram',
    description: 'One-off parts and revisions for testing form and fit.',
    points: [
      `${pla.name} ${formatRate(pla.pricePerGram.standard)}/g · ${plaPlus.name} ${formatRate(plaPlus.pricePerGram.standard)}/g`,
      'Quote by email, usually within the hour',
      '0.2 mm layers as standard, 0.12 mm on request',
    ],
  },
  {
    title: 'Custom Orders',
    rate: formatRate(pla.pricePerGram.standard),
    rateLabel: 'from, per gram',
    description: 'Replacement parts, mounts and one-off designs in any material.',
    points: [
      `${petg.name} ${formatRate(petg.pricePerGram.standard)}/g for durable, water-resistant parts`,
      'Finishing: sanding, priming or painting',
      'Kolkata B2B drop-off and pickup',
    ],
  },
];

export const PRICING_NOTES: string[] = [
  'Priced per gram of material after slicing',
  'No setup fees or minimum order',
  'Free delivery above ₹599',
  'Pan-India courier in 3–4 business days',
];
