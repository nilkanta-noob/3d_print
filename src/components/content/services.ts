import type { PartVariant } from '../PartIllustration';

// Home page Services, in the order a customer usually grows through them:
// Student Projects → Rapid Prototyping → Custom Parts → Product Development.
// There are no dedicated service pages yet. Set `href` on a service (e.g. '/services/student-projects')
// once its page exists and the card links there; until then "View Service" opens the details in the card.
export interface Service {
  slug: string;
  title: string;
  description: string; // the one line shown on the card
  audience: string;
  examples: string[];
  turnaround: string;
  materials: string;
  illustration: PartVariant;
  image?: string; // add a photo from /public (e.g. '/services/rapid-prototyping.jpg') to replace the drawing
  href?: string; // the service's own page, when it has one
}

const STANDARD_TURNAROUND = 'Quote within the hour; delivered in 3–4 business days after confirmation (faster in Kolkata via Porter).';

export const SERVICES: Service[] = [
  {
    slug: 'student-projects',
    title: 'Student Projects',
    description: 'Built for final-year projects, robotics teams, competitions, and academic prototypes.',
    audience: 'Students with a valid college ID — PLA at the ₹2.5/g student rate.',
    examples: ['Robot chassis parts', 'Sensor and PCB mounts', 'Competition and project models'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA (student rate); PLA+ or PETG for moving parts',
    illustration: 'standoffs',
  },
  {
    slug: 'rapid-prototyping',
    title: 'Rapid Prototyping',
    description: 'Fast iteration cycles for testing ideas, validating designs, and refining concepts.',
    audience: 'Engineers and product designers validating form, fit and function.',
    examples: ['Fit-check parts', 'Enclosures and housings', 'Design revisions'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA for form checks; PLA+ for functional tests',
    illustration: 'enclosure',
  },
  {
    slug: 'custom-parts',
    title: 'Custom Parts',
    description: 'One-off components, replacement parts, fixtures, brackets, and functional prints.',
    audience: 'Makers, hobbyists and local businesses who need a specific part.',
    examples: ['Replacement parts', 'Brackets and mounts', 'Jigs and fixtures'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA+ for everyday parts; PETG for outdoor, wet or load-bearing use',
    illustration: 'bracket',
  },
  {
    slug: 'product-development',
    title: 'Product Development',
    description: 'From early concepts to multiple design revisions as your product evolves.',
    audience: 'Startups and small teams iterating toward a final design. Kolkata B2B drop-off and pickup, no minimum order.',
    examples: ['Iteration prototypes', 'Pre-production samples', 'Small-batch parts'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA+ and PETG',
    illustration: 'stepped',
  },
];
