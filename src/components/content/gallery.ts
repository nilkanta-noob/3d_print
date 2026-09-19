import type { PartVariant } from '../PartIllustration';

// Gallery masonry tiles. Until real photos exist each tile shows a labelled CAD-style drawing;
// set `image` (a file in /public, e.g. '/gallery/planter.jpg') and `alt` to show the photo instead.
export interface GalleryTile {
  title: string;
  material: string;
  illustration: PartVariant;
  aspect: string; // Tailwind aspect-ratio class — varied heights make the masonry
  image?: string;
  alt?: string;
}

export const GALLERY_TILES: GalleryTile[] = [
  { title: 'Planter', material: 'PLA', illustration: 'planter', aspect: 'aspect-[4/5]' },
  { title: 'Mounting bracket', material: 'PLA+', illustration: 'bracket', aspect: 'aspect-[4/3]' },
  { title: 'Dice tower', material: 'PLA', illustration: 'tower', aspect: 'aspect-[3/4]' },
  { title: 'Desk organiser', material: 'PLA', illustration: 'organizer', aspect: 'aspect-square' },
  { title: 'Electronics enclosure', material: 'PETG', illustration: 'enclosure', aspect: 'aspect-[4/5]' },
  { title: 'Phone stand', material: 'PLA+', illustration: 'stand', aspect: 'aspect-[4/3]' },
  { title: 'PCB mounting plate', material: 'PLA', illustration: 'standoffs', aspect: 'aspect-square' },
  { title: 'Stepped housing', material: 'PLA+', illustration: 'stepped', aspect: 'aspect-[3/4]' },
];
