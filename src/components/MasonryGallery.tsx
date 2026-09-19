import React from 'react';
import ImageSlot from './ImageSlot';
import type { GalleryTile } from './content/gallery';

// Visual-first masonry: CSS columns with varied tile heights, one short caption per tile.
export default function MasonryGallery({ tiles }: { tiles: GalleryTile[] }) {
  return (
    <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
      {tiles.map((tile) => (
        <li key={tile.title} className="mb-6 break-inside-avoid lg:mb-8">
          <figure>
            <ImageSlot
              image={tile.image}
              alt={tile.alt ?? tile.title}
              variant={tile.illustration}
              className={`${tile.aspect} rounded-xl border border-border`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
              <span className="text-text-primary">{tile.title}</span>
              <span className="text-text-muted">{tile.material}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
