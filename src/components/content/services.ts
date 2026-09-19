import type { PartVariant } from '../PartIllustration';

// Home page Services section. There is no separate Services page: "Learn more" expands the details in each card.
export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  audience: string;
  examples: string[];
  turnaround: string;
  materials: string;
  illustration: PartVariant;
  image?: string; // add a photo from /public (e.g. '/services/rapid-prototyping.jpg') to replace the drawing
}

const STANDARD_TURNAROUND = 'Quote within the hour; delivered in 3–4 business days after confirmation (faster in Kolkata via Porter).';

export const SERVICES: Service[] = [
  {
    slug: 'rapid-prototyping',
    title: 'Rapid Prototyping',
    summary: 'Hold, fit-check and test your design before committing to it.',
    description: 'Turn a CAD model into a physical part you can hold, fit-check and test — a one-off, or a few revisions side by side.',
    audience: 'Engineers and product designers validating form, fit and function.',
    examples: ['Fit-check parts', 'Enclosures and housings', 'Design revisions'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA for form checks; PLA+ for functional tests',
    illustration: 'enclosure',
  },
  {
    slug: 'custom-parts',
    title: 'Custom Parts',
    summary: 'Replacement parts, brackets and one-off designs from your file.',
    description: 'Replacement parts, brackets, mounts, enclosures and one-off designs, printed from your own CAD file.',
    audience: 'Makers, hobbyists and local businesses who need a specific part.',
    examples: ['Replacement parts', 'Brackets and mounts', 'Clips and hinges'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA+ for everyday parts; PETG for outdoor, wet or load-bearing use',
    illustration: 'bracket',
  },
  {
    slug: 'college-projects',
    title: 'College Projects',
    summary: 'Final-year projects and robotics parts at student rates.',
    description: 'Parts for final-year projects, robotics teams, competitions and coursework — priced for student budgets.',
    audience: 'Students with a valid college ID — PLA at the ₹2.5/g student rate.',
    examples: ['Robot chassis parts', 'Sensor and PCB mounts', 'Project models'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA (student rate); PLA+ or PETG for moving parts',
    illustration: 'standoffs',
  },
  {
    slug: 'product-development',
    title: 'Product Development',
    summary: 'Print each revision as your product evolves.',
    description: 'Print successive design revisions as your product evolves, with a person reviewing every file for printability before it is quoted.',
    audience: 'Startups and small teams iterating toward a final design. Kolkata B2B drop-off and pickup, no minimum order.',
    examples: ['Iteration prototypes', 'Jigs and fixtures', 'Small-batch parts'],
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA+ and PETG',
    illustration: 'stepped',
  },
];
