/*
 * The gallery: photographs of prints that have actually come off our machine. Nothing here is a render
 * or a placeholder, which is why every item carries real image files and real dimensions.
 *
 * Dimensions are read off the files rather than guessed, so next/image can reserve the right box before
 * a photo arrives. The grid crops every cover to a square; the lightbox shows each photograph whole, at
 * its own ratio, which is what these dimensions are really for.
 *
 * The filenames below are matched to what is actually in each photograph rather than to the order the
 * camera happened to number them, so a re-export that renames the files can be reconciled by looking at
 * them rather than by guessing. Every path here must exist in public/all-images/3d-print-our-gallery.
 *
 * MATERIALS are deliberately absent. Every item used to carry material: 'PLA' marked "TODO: confirm",
 * which is a guess rather than a record — and a guess printed under a photograph on a page that sells
 * printing reads as a specification. The field is optional: fill one in and it appears in that item's
 * caption and in its lightbox; leave it out and nothing is shown in its place.
 */
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  /*
   * Where the square grid crop sits on the photograph. Defaults to the centre, which is right for most
   * of them. The portrait shots lose the most to the crop — set this per image when it takes a bite out
   * of the subject, e.g. 'center 30%' to favour the top of the frame.
   */
  objectPosition?: string;
}

export interface GalleryItem {
  slug: string;
  title: string;
  /** Omitted wherever it has not been confirmed. Nothing is rendered in its place. */
  material?: string;
  /** Shown in the lightbox only, under the title — never in the grid. */
  note?: string;
  images: GalleryImage[]; // images[0] is the cover
  /*
   * Show this one in the home page's preview row, using its cover. The home page renders the items
   * carrying this flag in the order they appear below, so reordering the preview means reordering them
   * here rather than keeping a second list somewhere that has to be kept in step with this one.
   */
  showOnHome?: boolean;
  /*
   * Which photograph the home page's preview row uses, as an index into images. Defaults to the cover.
   *
   * The two rows crop differently — the gallery is a square, the preview is 4:3 — so the frame that
   * leads an item in the grid is not always the one that survives the wider crop. Set this rather than
   * reordering images, which would change the gallery's cover as well.
   */
  homeCover?: number;
}

const SHOT = '/all-images/3d-print-our-gallery';

// The two shapes this batch came in at. Anything that is neither is written out in full below.
const landscape = (file: string): GalleryImage => ({ src: `${SHOT}/${file}`, width: 1600, height: 1200 });
const portrait = (file: string): GalleryImage => ({ src: `${SHOT}/${file}`, width: 1200, height: 1600 });

export const GALLERY_ITEMS: GalleryItem[] = [
    {
    slug: 'dino',
    showOnHome: true,
    title: 'Dino model',
    images: [
      landscape('dino-zoomed_result.webp'),
      landscape('dino-zoomed-out_result.webp'),
    ],
  },
  
  {
    slug: 'hoodie-pen-stand',
    showOnHome: true,
    title: 'Hoodie pen stand',
    // Each of these came off the camera at its own ratio rather than the flat 1600x1200 the rest of the
    // batch shares, so they are written out in full instead of going through the two helpers.
    images: [
      { src: `${SHOT}/hoodie-penstand-front1.webp`, width: 1600, height: 1254 },
      { src: `${SHOT}/hoodie-penstand-front2.webp`, width: 1600, height: 1256 },
      { src: `${SHOT}/hoodie-penstand-front3.webp`, width: 1263, height: 1600 },
      { src: `${SHOT}/hoodie-penstand-side.webp`, width: 1258, height: 1600 },
      { src: `${SHOT}/hoodie-penstand-back.webp`, width: 1600, height: 1296 },
    ],
  },
  {
    slug: 'phone-stand',
    showOnHome: true,
    // The demo shot leads the gallery, but it is portrait and the preview's 4:3 frame takes the top and
    // bottom off it. The landscape shot of the stand fills that frame as it was taken.
    homeCover: 0,
    title: 'Phone stand',
    images: [landscape('phone-stand.webp'), portrait('phone-stand-demo.webp'), portrait('phone-stand-top.webp')],
  },
  {
    slug: 'multi-part-bearing',
    title: 'Multi-part bearing',
    note: 'Rings and balls printed separately, then assembled.',
    images: [
      // 1600x1199, not the flat 1600x1200 the rest of the landscape shots came in at.
      { src: `${SHOT}/functionalparts1_result.webp`, width: 1600, height: 1199 },
      // The file on disk is spelled "paers", not "parts". Left as found rather than renamed, so the
      // path keeps matching the asset.
      { src: `${SHOT}/functionalpaers2_result.webp`, width: 1441, height: 1600 },
    ],
  },
  {
    slug: 'oval-tray',
    showOnHome: false,
    title: 'Oval tray',
    images: [
      // The top-down frame leads: it shows the whole oval and the ribbing in one look, which the
      // side-on shot cannot. That one follows, then the frame shared with the calibration cubes.
      landscape('cube-tray2.webp'),
      landscape('tray.webp'),
    ],
  },
  {
    slug: 'battery-case',
    title: 'Battery case',
    images: [portrait('battery-case.webp')],
  },
  {
    slug: 'pen-holder',
    title: 'Pen holder',
    images: [portrait('pen-holder-1.webp'), portrait('pen-holder-2.webp')],
  },
  {
    slug: 'silica-box',
    title: 'Silica box',
    images: [landscape('silica-box.webp')],
  },
  {
    slug: 'assembled-parts',
    // Placeholder: the photograph is a two-roller assembly behind a slotted grid, and this name is
    // standing in until it is given its real one.
    title: 'Assembled parts',
    images: [landscape('assembled-parts.webp')],
  },
  {
    slug: 'calibration-cubes',
    title: 'Calibration cubes',
    note: 'Dimensional accuracy test.',
    images: [
      landscape('calibaration-cubes.webp'),
      landscape('calibaration-cube-2.webp'),
      landscape('cube-tray.webp'),
    ],
  },
  
];

/*
 * The two-digit index a item is shown under — "01" through "08" — and the count in the page header.
 *
 * Both are computed from the array rather than written down, so adding a ninth print renumbers the grid
 * and updates the header without anything else being touched.
 */
export function indexLabel(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export const PRINT_COUNT = indexLabel(GALLERY_ITEMS.length - 1);

export function altFor(item: GalleryItem): string {
  return item.material ? `${item.title}, 3D printed in ${item.material}` : `${item.title}, 3D printed`;
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
