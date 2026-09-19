import type { PartVariant } from '../PartIllustration';

// Explore = inspiration: kinds of things people print. Add `image` (a photo in /public) to replace a drawing.
export interface InspirationCategory {
  slug: string;
  title: string;
  description: string;
  ideas: string[];
  materials: string;
  illustration: PartVariant;
  image?: string;
}

export const INSPIRATION: InspirationCategory[] = [
  {
    slug: 'decor',
    title: 'Decor',
    description: 'Pieces for the home that are hard to find in the exact size or shape you want.',
    ideas: ['Planters and pots', 'Vases', 'Wall hooks', 'Lamp shades'],
    materials: 'PLA',
    illustration: 'planter',
  },
  {
    slug: 'desk-setup',
    title: 'Desk Setup',
    description: 'Stands, holders and organisers made to fit your desk and your devices.',
    ideas: ['Phone and headphone stands', 'Cable organisers', 'Pen holders', 'Monitor accessories'],
    materials: 'PLA, PLA+',
    illustration: 'organizer',
  },
  {
    slug: 'gaming',
    title: 'Gaming',
    description: 'Accessories for tabletop and console setups.',
    ideas: ['Dice towers', 'Controller stands', 'Card and token holders', 'Terrain pieces'],
    materials: 'PLA',
    illustration: 'tower',
  },
  {
    slug: 'education',
    title: 'Education',
    description: 'Models and parts for classrooms, labs and student projects.',
    ideas: ['STEM teaching models', 'Robotics parts', 'Architecture models', 'Science fair builds'],
    materials: 'PLA (student rate)',
    illustration: 'stepped',
  },
  {
    slug: 'functional-parts',
    title: 'Functional Parts',
    description: 'Parts that have to fit, hold or move — printed from your own file.',
    ideas: ['Brackets and mounts', 'Replacement parts', 'Enclosures', 'Clips and hinges'],
    materials: 'PLA+, PETG',
    illustration: 'bracket',
  },
  {
    slug: 'tools',
    title: 'Tools',
    description: 'Workshop aids that make repeat jobs faster and more accurate.',
    ideas: ['Jigs and fixtures', 'Tool holders', 'Drill guides', 'Organiser trays'],
    materials: 'PLA+, PETG',
    illustration: 'standoffs',
  },
];

// The four image cards in the home page Explore section ("What You Can Do with 3D Printing").
// Add `image` — a photo in /public, e.g. '/explore/student-projects.jpg', landscape around 1600×1200 with the
// subject in the upper two-thirds (the title sits over the bottom) — to replace the placeholder drawings.
export interface ExploreHighlight {
  title: string;
  description: string;
  href: string; // the whole card links here
  illustrations: PartVariant[]; // placeholder drawings, shown side by side until there's a photo
  iterations?: boolean; // draw the illustrations as growing versions of one part (v1 → v3)
  image?: string;
  alt?: string;
}

export const HOME_EXPLORE: ExploreHighlight[] = [
  {
    title: 'Student Projects',
    description: 'Robotics, IoT builds, final-year projects and hackathon prototypes.',
    href: '/explore#education',
    illustrations: ['standoffs', 'enclosure'],
  },
  {
    title: 'Product Development',
    description: 'Validate concepts, test designs and iterate before manufacturing.',
    href: '/explore',
    illustrations: ['stepped', 'stepped', 'stepped'],
    iterations: true,
  },
  {
    title: 'Functional Parts',
    description: 'Brackets, mounts, enclosures and replacement components built to solve problems.',
    href: '/explore#functional-parts',
    illustrations: ['bracket', 'stand'],
  },
  {
    title: 'Hobby & DIY',
    description: 'Desk accessories, gaming upgrades, organizers and personal creations.',
    href: '/explore#desk-setup',
    illustrations: ['organizer', 'tower'],
  },
];
