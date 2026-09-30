import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLUR, altFor, captionFor, type GalleryItem } from './content/gallery';

/*
 * One gallery tile: a 4:3 crop of the item's cover photograph, with its title and material underneath.
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
  sizes,
  label,
  href,
  onClick,
  buttonRef,
  className = '',
  variant = 'default',
}: GalleryTileProps) {
  const cover = item.images[0];
  const preview = variant === 'preview';

  const picture = (
    <span className={`relative block aspect-[4/3] w-full overflow-hidden ${preview ? '' : 'border border-border'}`}>
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
            : 'object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]'
        }
      />
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
      {!preview && (
        <figcaption className="mt-3">
          <span className="block text-[18px] font-medium text-text-primary">{item.title}</span>
          <span className="mt-1 block text-[14px] text-text-muted">{captionFor(item)}</span>
        </figcaption>
      )}
    </figure>
  );
}
