import React from 'react';
import ImageSlot from './ImageSlot';
import type { GalleryTile } from './content/gallery';

// Visual-first masonry: CSS columns with varied tile heights, one short caption per tile.
export default function MasonryGallery({ tiles }: { tiles: GalleryTile[] }) {
  return (
    <ul className="columns-1 gap-8 sm:columns-2 lg:columns-3 lg:gap-10">
      {tiles.map((tile) => (
        <li key={tile.title} className="mb-8 break-inside-avoid lg:mb-10">
          <figure>
            <ImageSlot
              image={tile.image}
              alt={tile.alt ?? tile.title}
              variant={tile.illustration}
              className={`${tile.aspect} border border-border`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <figcaption className="mt-5 flex items-baseline justify-between gap-4 text-sm">
              <span className="text-text-primary">{tile.title}</span>
              <span className="label-micro text-text-muted">{tile.material}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
