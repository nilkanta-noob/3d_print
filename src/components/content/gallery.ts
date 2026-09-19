import type { PartVariant } from '../PartIllustration';

// Showcase placeholders: illustrations of the kinds of parts we print, clearly labelled as renders.
// Replace with real project photos by filling GALLERY_ITEMS below.
export interface ShowcaseItem {
  title: string;
  category: string;
  material: string;
  variant: PartVariant;
}

export const SHOWCASE: ShowcaseItem[] = [
  { title: 'Mounting bracket', category: 'Engineering parts', material: 'PLA Pro+', variant: 'bracket' },
  { title: 'Electronics enclosure', category: 'Prototypes', material: 'PETG', variant: 'enclosure' },
  { title: 'PCB mounting plate', category: 'College projects', material: 'PLA', variant: 'standoffs' },
  { title: 'Stepped housing', category: 'Custom designs', material: 'PLA Pro+', variant: 'stepped' },
];

export interface ProjectCategory {
  title: string;
  description: string;
  examples: string[];
  materials: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    title: 'Engineering parts',
    description: 'Parts that have to fit and hold: brackets, mounts, jigs and fixtures.',
    examples: ['Brackets and mounts', 'Jigs and fixtures', 'Snap-fit joints'],
    materials: 'PLA Pro+, PETG',
  },
  {
    title: 'Prototypes',
    description: 'Form-and-fit models for checking a design before committing to it.',
    examples: ['Enclosures and housings', 'Fit-check parts', 'Design revisions'],
    materials: 'PLA, PLA Pro+',
  },
  {
    title: 'College projects',
    description: 'Robotics parts, project housings and coursework models on a student budget.',
    examples: ['Robot chassis parts', 'Sensor and PCB mounts', 'Final-year project models'],
    materials: 'PLA (student rate)',
  },
  {
    title: 'Custom designs',
    description: 'One-off parts, replacements and personal projects printed from your own file.',
    examples: ['Replacement parts', 'Custom organisers', 'Display models'],
    materials: 'PLA, PLA Pro+, PETG',
  },
];

// Future gallery: add real photos from /public (e.g. /gallery/robot-arm-base.jpg) and they appear in the grid.
export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  category: string;
  material: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [];
