import type React from 'react';
import { Gauge, GraduationCap, Wrench, GitBranch } from 'lucide-react';

type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

export interface Service {
  slug: string;
  title: string;
  description: string;
  audience: string;
  turnaround: string;
  materials: string;
  icon: Icon;
}

const STANDARD_TURNAROUND = 'Quote within the hour; delivered in 3–4 business days after confirmation (faster in Kolkata via Porter).';

export const SERVICES: Service[] = [
  {
    slug: 'rapid-prototyping',
    title: 'Rapid prototyping',
    description: 'Turn a CAD model into a part you can hold, fit-check and test — a one-off or a few revisions side by side.',
    audience: 'Engineers and product designers validating form, fit and function.',
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA for form checks, PLA Pro+ for functional tests',
    icon: Gauge,
  },
  {
    slug: 'college-projects',
    title: 'College projects',
    description: 'Parts for final-year projects, robotics teams, competitions and coursework, priced for student budgets.',
    audience: 'Students with a valid college ID — PLA at the ₹2.5/g student rate.',
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA (student rate); PLA Pro+ or PETG for moving parts',
    icon: GraduationCap,
  },
  {
    slug: 'custom-parts',
    title: 'Custom parts',
    description: 'Replacement parts, brackets, mounts, enclosures and one-off designs printed from your file.',
    audience: 'Makers, hobbyists and small businesses who need a specific part.',
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA Pro+ for everyday parts; PETG for outdoor, wet or load-bearing use',
    icon: Wrench,
  },
  {
    slug: 'product-development',
    title: 'Product development support',
    description: 'Print each design revision as your product evolves, with a person reviewing every file for printability before it is quoted.',
    audience: 'Startups and small teams iterating toward a final design. Kolkata B2B drop-off and pickup, no minimum order.',
    turnaround: STANDARD_TURNAROUND,
    materials: 'PLA Pro+ and PETG',
    icon: GitBranch,
  },
];
