import React from 'react';
import Image from 'next/image';
import PartIllustration, { type PartVariant } from './PartIllustration';

interface ImageSlotProps {
  image?: string;
  alt: string;
  variant: PartVariant;
  className?: string; // size / aspect ratio / rounding
  sizes?: string;
  badge?: boolean;
}

// Image area for cards and tiles. Shows the photo once one is set; until then a CAD-style line drawing,
// labelled "Render" so it's never mistaken for a photo of a real order.
export default function ImageSlot({ image, alt, variant, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', badge = true }: ImageSlotProps) {
  return (
    <div className={`relative overflow-hidden bg-background ${className}`}>
      {image ? (
        <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <>
          <div className="absolute inset-0 grid place-items-center p-[14%] text-text-secondary">
            <PartIllustration variant={variant} className="h-full max-h-60 w-auto max-w-full" />
          </div>
          {badge && (
            <span className="absolute left-3 top-3 rounded-full border border-border bg-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
              Render
            </span>
          )}
        </>
      )}
    </div>
  );
}
