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
  // large: the drawing fills most of the frame (Services cards), and brightens when its card (a `group`) is hovered
  size?: 'default' | 'large';
  // Which dark tone sits behind the drawing — elevated for tiles that float on another surface
  surface?: 'background' | 'elevated';
}

// Image area for cards and tiles. Shows the photo once one is set; until then a CAD-style line drawing,
// labelled "Render" (unless badge={false}) so it's never mistaken for a photo of a real order.
export default function ImageSlot({ image, alt, variant, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', badge = true, size = 'default', surface = 'background' }: ImageSlotProps) {
  const large = size === 'large';

  return (
    <div className={`relative overflow-hidden ${surface === 'elevated' ? 'bg-elevated' : 'bg-background'} ${className}`}>
      {image ? (
        <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <>
          <div
            className={`absolute inset-0 grid place-items-center text-text-secondary ${
              large ? 'p-[8%] transition-colors duration-300 group-hover:text-text-primary' : 'p-[14%]'
            }`}
          >
            <PartIllustration variant={variant} className={`h-full w-auto max-w-full ${large ? '' : 'max-h-60'}`} />
          </div>
          {badge && (
            <span className="label-micro absolute left-4 top-4 rounded-chip border border-border bg-elevated px-2.5 py-1 text-[10px] text-text-muted">
              Render
            </span>
          )}
        </>
      )}
    </div>
  );
}
