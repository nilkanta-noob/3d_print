// Single source for material facts and per-gram prices — the Materials page and the home page read from here.

export interface Rating {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
}

export type RatingKey = 'strength' | 'printQuality' | 'heatResistance' | 'flexibility';

export const RATING_ATTRIBUTES: { key: RatingKey; label: string }[] = [
  { key: 'strength', label: 'Strength' },
  { key: 'printQuality', label: 'Print quality' },
  { key: 'heatResistance', label: 'Heat resistance' },
  { key: 'flexibility', label: 'Flexibility' },
];

export interface Material {
  slug: string;
  name: string;
  tag: string; // tier, shown as a capsule on the home page card
  highlighted?: boolean; // picks the tier capsule out in the accent
  summary: string; // one line on the home page card
  useCases: string[]; // "Best for" on the home page card — short, outcome-focused
  description: string;
  advantages: string[];
  limitations: string[];
  applications: string[];
  ratings: Record<RatingKey, Rating>;
  recommendedUse: string;
  pricePerGram: { standard: number; student: number | null };
}

// Ratings compare these three filaments relative to each other, not absolute lab values.
// Display name "PLA+" — the quote form still submits the value "PLA Pro+" so existing orders stay consistent.
export const MATERIALS: Material[] = [
  {
    slug: 'pla',
    name: 'PLA',
    tag: 'Standard',
    summary: 'Visual prototypes and display models.',
    useCases: ['Concept models', 'Props and décor', 'Student projects'],
    description: 'The industry standard for high-detail visual models and rapid non-functional prototyping. Excellent dimensional accuracy.',
    advantages: ['Crisp detail and clean surfaces', 'Good dimensional accuracy', 'Lowest cost — student rate available'],
    limitations: ['Brittle under impact or bending', 'Softens at relatively low temperatures, e.g. in a hot car', 'Not suited to load-bearing parts'],
    applications: ['Visual prototypes and display models', 'Low-stress, easy-to-print parts', 'Best entry point — fast, cheap'],
    ratings: {
      strength: { level: 2, label: 'Moderate' },
      printQuality: { level: 5, label: 'Excellent' },
      heatResistance: { level: 1, label: 'Low' },
      flexibility: { level: 1, label: 'Stiff' },
    },
    recommendedUse: 'Visual prototypes, display models',
    pricePerGram: { standard: 3.5, student: 2.5 },
  },
  {
    slug: 'pla-plus',
    name: 'PLA+',
    tag: 'Engineering',
    highlighted: true,
    summary: 'Functional prototypes and engineering parts.',
    useCases: ['Brackets and mounts', 'Jigs', 'Light-load parts'],
    description: 'A step up in toughness and layer adhesion from standard PLA, while staying easy to print — the middle ground before PETG.',
    advantages: ['Tougher and less brittle than standard PLA', 'Stronger layer adhesion', 'Keeps PLA’s fine detail'],
    limitations: ['Heat resistance similar to standard PLA', 'Costs more per gram than PLA', 'Student rate not available yet'],
    applications: ['Functional prototypes (durability)', 'Brackets, enclosures, jigs', 'Light-mechanical-stress parts'],
    ratings: {
      strength: { level: 3, label: 'Good' },
      printQuality: { level: 4, label: 'Very good' },
      heatResistance: { level: 1, label: 'Low' },
      flexibility: { level: 2, label: 'Slight' },
    },
    recommendedUse: 'Functional prototypes, brackets, jigs',
    pricePerGram: { standard: 4, student: null },
  },
  {
    slug: 'petg',
    name: 'PETG',
    tag: 'Durable',
    summary: 'Durable mechanical parts and enclosures.',
    useCases: ['Snap-fits', 'Water-resistant parts', 'Outdoor use'],
    description: 'More impact-resistant and flexible than PLA, better dimensional stability than ABS. Ideal for parts needing real durability.',
    advantages: ['Impact-resistant, with some flex', 'Water- and moisture-resistant', 'Handles more heat than PLA'],
    limitations: ['Slightly less crisp detail than PLA', 'Can show fine stringing on detailed parts', 'Highest cost per gram of the three'],
    applications: ['Water-resistant containers', 'Snap-fit joints', 'Mechanical parts (moderate stress)'],
    ratings: {
      strength: { level: 4, label: 'High' },
      printQuality: { level: 3, label: 'Good' },
      heatResistance: { level: 3, label: 'Moderate' },
      flexibility: { level: 3, label: 'Moderate' },
    },
    recommendedUse: 'Mechanical parts, containers, snap-fits',
    pricePerGram: { standard: 5.5, student: null },
  },
];

export const PRINT_SPECS: { label: string; value: string }[] = [
  { label: 'Process', value: 'FDM' },
  { label: 'Default layer height', value: '0.2 mm' },
  { label: 'Fine detail', value: '0.12 mm on request' },
  { label: 'Finishing', value: 'Sanding, priming, painting' },
];

// "Which should I choose?" on the Materials page
export const RECOMMENDATIONS: { need: string; pick: string; why: string }[] = [
  { need: 'Display models, visual prototypes, props', pick: 'PLA', why: 'Best detail at the lowest price.' },
  { need: 'Brackets, jigs and parts that take some load', pick: 'PLA+', why: 'Tougher than PLA without losing detail.' },
  { need: 'Snap-fits and parts that get knocked about', pick: 'PETG', why: 'Flexes instead of cracking.' },
  { need: 'Anything wet, outdoors or near warmth', pick: 'PETG', why: 'Water-resistant and handles more heat than PLA.' },
  { need: 'A student project on a budget', pick: 'PLA', why: 'Student rate with a valid college ID.' },
];

export function getMaterial(slug: string): Material {
  const material = MATERIALS.find((m) => m.slug === slug);
  if (!material) throw new Error(`Unknown material: ${slug}`);
  return material;
}

export function formatRate(rupeesPerGram: number): string {
  return `₹${rupeesPerGram}`;
}
