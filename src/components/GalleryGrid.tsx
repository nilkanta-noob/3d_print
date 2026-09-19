import React from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import type { GalleryItem } from './content/gallery';

// Photo grid for finished prints. Renders an honest empty state until real photos are added to GALLERY_ITEMS.
export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) {
    return (
      <div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {[0, 1, 2].map((slot) => (
            <li key={slot} className="grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-text-primary/20 bg-surface">
              <Camera className="size-6 text-text-muted" strokeWidth={1.5} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-text-muted">Photos of finished prints will appear here as orders ship.</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.src}>
          <figure className="overflow-hidden rounded-xl border border-border bg-elevated">
            <div className="relative aspect-[4/3]">
              <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="p-5">
              <p className="font-display font-bold text-text-primary">{item.title}</p>
              <p className="mt-1 text-sm text-text-muted">{item.category} · {item.material}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
