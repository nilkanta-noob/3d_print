/*
 * The gallery: photographs of prints that have actually come off our machine. Nothing here is a render
 * or a placeholder, which is why every item carries real image files and real dimensions.
 *
 * Dimensions are stored rather than guessed so next/image can reserve the right box before a photo
 * arrives. The masonry sets no aspect ratio of its own — a tray and an upright bearing are different
 * shapes, and forcing both into one crop is how a gallery starts looking like a catalogue.
 *
 * PLACEHOLDERS: the values marked TODO are yours to fill. Everything else is live.
 */
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  /*
   * Where the 4:3 grid crop sits on the photograph. Defaults to the centre, which is right for most of
   * them; set it per image when the subject sits off-centre and the crop takes a bite out of it, e.g.
   * 'center 30%' to favour the top of the frame.
   */
  objectPosition?: string;
}

export interface GalleryItem {
  slug: string;
  title: string;
  material: string;
  note?: string;
  images: GalleryImage[]; // images[0] is the cover
  /*
   * Show this one in the home page's preview row, using its cover. The home page renders the items
   * carrying this flag in the order they appear below, so reordering the preview means reordering them
   * here rather than keeping a second list somewhere that has to be kept in step with this one.
   */
  showOnHome?: boolean;
}

const SHOT = '/all-images/3d-print-our-gallery';

// 4:3 landscape, the shape every phone photo in the first batch came in at.
const landscape = (file: string): GalleryImage => ({ src: `${SHOT}/${file}`, width: 1600, height: 1200 });

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: 'multi-part-bearing',
    showOnHome: true,
    title: 'Multi-part bearing',
    material: 'PLA', // TODO: confirm material
    // The note appears on /gallery only — the home page's preview caption is one line and carries the
    // material instead.
    note: 'Rings and balls printed separately, then assembled.',
    images: [
      { src: `${SHOT}/functionalparts1_result.webp`, width: 1199, height: 1600 },
      // The file on disk is spelled "paers", not "parts". Left as found rather than renamed, so the
      // path keeps matching the asset.
      { src: `${SHOT}/functionalpaers2_result.webp`, width: 1441, height: 1600 },
    ],
  },
  {
    slug: 'oval-tray',
    showOnHome: true,
    title: 'Oval tray',
    material: 'PLA', // TODO: confirm material
    images: [
      landscape('IMG-20260920-WA0014_result.webp'),
      landscape('IMG-20260920-WA0003_result.webp'),
      landscape('IMG-20260920-WA0006_result.webp'),
    ],
  },
  {
    slug: 'box-with-lid',
    showOnHome: true,
    title: 'Box with lid',
    material: 'PLA', // TODO: confirm material
    images: [landscape('IMG-20260920-WA0011_result.webp')],
  },
  {
    slug: 'calibration-cube',
    title: 'Calibration cube',
    material: 'PLA', // TODO: confirm material
    note: 'Dimensional accuracy test.',
    images: [
      landscape('IMG-20260920-WA0005_result.webp'),
      landscape('IMG-20260920-WA0002_result.webp'),
      landscape('IMG-20260920-WA0012_result.webp'),
    ],
  },
  {
    slug: 'item-five',
    title: 'Printed part', // TODO: name this one
    material: 'PLA', // TODO: confirm material
    images: [landscape('IMG-20260920-WA0010_result.webp')],
  },
];

// One line, built the same way everywhere it appears.
export function captionFor(item: GalleryItem): string {
  return item.note ? `${item.material} · ${item.note}` : item.material;
}

export function altFor(item: GalleryItem): string {
  return `${item.title}, 3D printed in ${item.material}`;
}

/*
 * A single opaque pixel of the page background, #0F1218, which next/image stretches and blurs under a
 * photograph until it loads.
 *
 * It is written out here rather than copied from the usual "1x1 transparent PNG" snippet found online:
 * that one decodes to rgba(0, 255, 0, 127), and next/image scaled it into a green wash that flashed over
 * every image on load. Decoded and checked: this is (15, 18, 24, 255).
 */
export const BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mPgF5IAAABtADoNxkFEAAAAAElFTkSuQmCC';
