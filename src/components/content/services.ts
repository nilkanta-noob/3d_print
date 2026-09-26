import type { PartVariant } from '../PartIllustration';

// Home page Services, in the order a customer usually grows through them:
// Student Projects → Rapid Prototyping → Custom Parts → Product Development.
// Shown as the editorial row list in ServicesList. The row's quote link uses `slug` as the ?service= value.
export interface Service {
  slug: string;
  index: string; // '01'…'04', the mono index beside the title
  title: string;
  description: string; // the one or two lines shown in the row
  // The short facts shown on the active row: materials · turnaround, shortened from the long fields below.
  meta: string[];
  audience: string; // kept for a future service page — not shown in the row list
  examples: string[]; // kept for a future service page — not shown in the row list
  turnaround: string;
  materials: string;
  illustration: PartVariant;
  // A photo from /public. When set it replaces the line drawing and the "Render" badge, in both the
  // floating desktop tile and the panel on phones — ImageSlot swaps them on this field alone.
  image?: string;
  href?: string; // the service's own page, when it has one
}


const STANDARD_TURNAROUND = 'Quote within the hour; delivered in 3–4 business days after confirmation (faster in Kolkata via Porter).';

export const SERVICES: Service[] = [
  {
    slug: 'student-projects',
    index: '01',
    title: 'Student Projects',
    description: 'Built for final-year projects, robotics teams, competitions, and academic prototypes.',
    meta: ['PLA (Student Rate)', 'PLA+ or PETG', '3-4 business days'],
    audience: 'Students with a valid college ID — PLA at the ₹2.5/g student rate.',
    examples: ['Robot chassis parts', 'Sensor and PCB mounts', 'Competition and project models'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA (student rate); PLA+ or PETG for moving parts',
    illustration: 'standoffs',
    image: '/all-images/product-imgs/student-project-2.webp',
  },
  {
    slug: 'rapid-prototyping',
    index: '02',
    title: 'Rapid Prototyping',
    description: 'Fast iteration cycles for testing ideas, validating designs, and refining concepts.',
    meta: ['PLA or PLA+', '3–4 business days'],
    audience: 'Engineers and product designers validating form, fit and function.',
    examples: ['Fit-check parts', 'Enclosures and housings', 'Design revisions'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA for form checks; PLA+ for functional tests',
    illustration: 'enclosure',
    image: '/all-images/product-imgs/rapid-prototyping-1.webp',
  },
  {
    slug: 'custom-parts',
    index: '03',
    title: 'Custom Parts',
    description: 'One-off components, replacement parts, fixtures, brackets, and functional prints.',
    meta: ['PLA+ or PETG', '3–4 business days'],
    audience: 'Makers, hobbyists and local businesses who need a specific part.',
    examples: ['Replacement parts', 'Brackets and mounts', 'Jigs and fixtures'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA+ for everyday parts; PETG for outdoor, wet or load-bearing use',
    illustration: 'bracket',
    image: '/all-images/product-imgs/custom-pt-1.jpg',
  },
  {
    slug: 'product-development',
    index: '04',
    title: 'Product Development',
    description: 'From early concepts to multiple design revisions as your product evolves.',
    meta: ['PLA+ and PETG', '3–4 business days'],
    audience: 'Startups and small teams iterating toward a final design. Kolkata B2B drop-off and pickup, no minimum order.',
    examples: ['Iteration prototypes', 'Pre-production samples', 'Small-batch parts'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA+ and PETG',
    illustration: 'stepped',
    image: '/all-images/product-imgs/productdevelopment.webp',
  },
];
