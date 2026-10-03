import type { PartVariant } from '../PartIllustration';
import { formatRate, getMaterial } from './materials';

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

// The student rate, read from the materials data rather than retyped, so a price change lands here too.
const pla = getMaterial('pla');
const PLA_STUDENT_RATE = formatRate(pla.pricePerGram.student ?? pla.pricePerGram.standard);

export const SERVICES: Service[] = [
  {
    slug: 'student-projects',
    index: '01',
    title: 'Student Projects',
    description: 'Built for final-year projects, robotics teams, competitions, and academic prototypes.',
    meta: ['PLA (Student Rate)', 'PLA+ or PETG', '3–4 business days'],
    audience: `Students with a valid college ID — PLA at the ${PLA_STUDENT_RATE}/g student rate.`,
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
    /*
     * The print-in-place bearing, which is the clearest thing we have a photo of that reads as a custom
     * part: it is obviously a made object rather than a render, and its function is legible at a glance.
     *
     * It survives every frame this appears in without a custom object-position. The part is a circle of
     * 781x784px centred at (0.498, 0.517) of a 1600x1199 photo, and the frames run from 0.85 (the
     * floating tile on tablets) to 1.78 (the panel on phones), so cover crops it differently in each.
     * The tightest is the phone panel, which shows the middle 75% of the photo's height against a part
     * 65% tall — 4.8% of clearance top and bottom. Re-measure that if the frames ever change shape.
     *
     * Shared with the gallery rather than copied: it is the same file the "Print-in-place bearing" item
     * uses, so a visitor who sees both pages downloads it once.
     */
    image: '/all-images/3d-print-our-gallery/functionalparts1_result.webp',
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

/*
 * The options for the quote form's "Project type" field: the four services, in the order they appear on
 * the home page, plus an escape hatch that exists only in the form. Derived from SERVICES rather than
 * retyped, so a slug can only be changed in one place — the "Get a quote for this" links build their
 * ?service= value from the same array, which is what lets the form pre-select from it.
 */
export const PROJECT_TYPES: { slug: string; label: string }[] = [
  ...SERVICES.map((service) => ({ slug: service.slug, label: service.title })),
  { slug: 'other', label: 'Other / Not sure' },
];
