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

// The four large cards in the home page Explore section
export const HOME_EXPLORE: { title: string; description: string; illustration: PartVariant; image?: string }[] = [
  { title: 'Functional Parts', description: 'Brackets, clips and replacement parts that do a job.', illustration: 'bracket' },
  { title: 'Desk Accessories', description: 'Stands, organisers and cable management for your setup.', illustration: 'organizer' },
  { title: 'Home Decor', description: 'Planters, vases and wall pieces.', illustration: 'planter' },
  { title: 'Engineering Prototypes', description: 'Enclosures and test parts for checking a design.', illustration: 'enclosure' },
];
