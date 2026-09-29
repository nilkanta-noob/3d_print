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

  // Photographs that used to carry the home page's Explore section. The section is gone; the pictures
  // are real work and belong here rather than in the repository doing nothing.
  {
    title: 'Drone frame',
    material: 'PLA+',
    illustration: 'bracket',
    aspect: 'aspect-[4/3]',
    image: '/all-images/product-imgs/droneframe-studentproject.webp',
    alt: 'A printed quadcopter frame built for a student robotics project',
  },
  {
    title: 'Design iterations',
    material: 'PLA',
    illustration: 'stepped',
    aspect: 'aspect-[4/3]',
    image: '/all-images/product-imgs/product deveploment.webp',
    alt: 'Successive printed revisions of one part, shown side by side',
  },
  {
    title: 'Prototype parts',
    material: 'PLA+',
    illustration: 'stand',
    aspect: 'aspect-[4/3]',
    image: '/all-images/product-imgs/rapidprototyping.webp',
    alt: 'A set of prototype components fresh off the printer',
  },
  {
    title: 'Desk pieces',
    material: 'PLA',
    illustration: 'organizer',
    aspect: 'aspect-[4/3]',
    image: '/all-images/product-imgs/hobbydiy.webp',
    alt: 'Printed desk accessories and hobby pieces',
  },
];
