import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLUR, altFor, indexLabel, type GalleryItem } from './content/gallery';

/*
 * One gallery tile: a square crop of the item's cover photograph, with its index and title underneath.
 *
 * Two places show gallery items — the gallery's own grid, where a tile opens the lightbox, and the home
 * page's preview row, where it links through to the gallery. The only thing that differs between them is
 * what wraps the picture, so that is the only thing passed in; everything about how a tile LOOKS lives
 * here once. A second copy of this markup is how the two drift into being two different tiles.
 *
 * The crop is only the tile. Where a crop takes a bite out of a subject, the fix is the per-image
 * objectPosition in the data rather than a special case here.
 */
interface GalleryTileProps {
  item: GalleryItem;
  /** Position in the gallery, used for the "01" that opens the caption. Omitted by the preview row. */
  index?: number;
  /** The `sizes` hint for the breakpoints this tile is being laid out at. */
  sizes: string;
  /** The wrapper's accessible name — it names the picture, which has an empty alt of its own. */
  label: string;
  /** Set this and the tile is a link. Leave it out and it is a button that calls onClick. */
  href?: string;
  onClick?: () => void;
  /** So a button tile's owner can send focus back to whichever one opened its lightbox. */
  buttonRef?: (element: HTMLButtonElement | null) => void;
  /** Sizing for the figure itself — the preview row uses it to set the tile's width. */
  className?: string;
  /*
   * `default` is the gallery's own grid: a bordered frame, and a caption carrying the title and the
   * note. `preview` is the home page's row: the picture alone, unframed, with a gradient foot. The two
   * share the crop and the link behaviour and differ only in dress, which is the reason this is a
   * variant rather than a second component.
   *
   * The preview carries no caption at all. Its titles were three short labels repeating what the
   * pictures already show, under photographs that are the whole point of the row.
   */
  variant?: 'default' | 'preview';
}

// `group` is on the wrapper rather than the figure, so the hover scale answers the thing that is
// actually hoverable and not the caption beneath it.
const WRAPPER =
  'group relative block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary';

export default function GalleryTile({
  item,
  index,
  sizes,
  label,
  href,
  onClick,
  buttonRef,
  className = '',
  variant = 'default',
}: GalleryTileProps) {
  const preview = variant === 'preview';
  // The preview row may be pointed at a different frame from the one that leads the gallery.
  const cover = item.images[(preview && item.homeCover) || 0];
  // How many photographs are behind the cover. The chip is the grid's only sign that an item opens
  // into a set, so it is drawn whenever there is more than one.
  const extras = item.images.length - 1;

  const picture = (
    <span className={`relative block w-full overflow-hidden ${preview ? 'aspect-[4/3]' : 'aspect-square'}`}>
      <Image
        src={cover.src}
        alt={altFor(item)}
        fill
        sizes={sizes}
        placeholder="blur"
        blurDataURL={BLUR}
        style={{ objectPosition: cover.objectPosition ?? 'center' }}
        className={
          preview
            ? 'object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:group-hover:scale-[1.03]'
            : 'object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]'
        }
      />

      {/* "+2" rather than "1/3": the grid is showing one photograph, and what the chip has to say is how
          many more are behind it. Tailwind wraps hover: in @media (hover: hover) already, so the scale
          above answers a pointer and never a tap. */}
      {!preview && extras > 0 && (
        <span className="pointer-events-none absolute right-2 top-2 bg-black/55 px-1.5 py-0.5 font-mono text-[11px] leading-none text-white backdrop-blur-[2px]">
          +{extras}
        </span>
      )}
      {/* A foot of shadow on the picture itself, so a pale subject still has an edge against the page
          below it. Decorative and never over the caption, hence inset-0 on the frame rather than a
          wrapper around the whole tile. */}
      {preview && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.28),transparent_45%)]"
        />
      )}
    </span>
  );

  return (
    <figure className={className}>
      {href === undefined ? (
        <button type="button" ref={buttonRef} onClick={onClick} aria-label={label} className={WRAPPER}>
          {picture}
        </button>
      ) : (
        <Link href={href} aria-label={label} className={WRAPPER}>
          {picture}
        </Link>
      )}
      {/*
        One line, and it has to stay one line at 360px. min-w-0 lets the title shrink below its content
        width — without it a flex child refuses to, and a long title pushes the material off the tile
        instead of truncating. The material never shrinks and never wraps.
      */}
      {!preview && (
        <figcaption className="mt-3 flex items-baseline gap-[10px]">
          <span className="shrink-0 font-mono text-[12px] leading-none text-text-muted">
            {indexLabel(index ?? 0)}
          </span>
          <span className="min-w-0 flex-1 truncate text-[15px] font-medium leading-none text-text-primary">
            {item.title}
          </span>
          {item.material && (
            <span className="shrink-0 whitespace-nowrap font-mono text-[11px] uppercase leading-none tracking-[0.12em] text-text-muted">
              {item.material}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
