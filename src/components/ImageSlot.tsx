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
  /*
   * How the photo is laid out. `fill` stretches it to the frame and needs the frame to have a size —
   * which is the right default, but wrong for a frame that is display:none at some breakpoint. A hidden
   * frame measures 0x0, and next/image then warns on every render that the image "has a height value of
   * 0" and that its `sizes` does not match the width it was given. `intrinsic` carries its own
   * dimensions instead, so a copy that is hidden at one breakpoint stays quiet at that breakpoint.
   */
  layout?: 'fill' | 'intrinsic';
  /** Aspect of the intrinsic layout, as width/height. Ignored when layout is `fill`. */
  ratio?: [number, number];
}

// Image area for cards and tiles. Shows the photo once one is set; until then a CAD-style line drawing,
// labelled "Render" (unless badge={false}) so it's never mistaken for a photo of a real order.
export default function ImageSlot({ image, alt, variant, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', badge = true, size = 'default', surface = 'background', layout = 'fill', ratio = [16, 9] }: ImageSlotProps) {
  const large = size === 'large';

  return (
    <div className={`relative overflow-hidden ${surface === 'elevated' ? 'bg-elevated' : 'bg-background'} ${className}`}>
      {image ? (
        layout === 'fill' ? (
          <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <Image
            src={image}
            alt={alt}
            width={ratio[0] * 80}
            height={ratio[1] * 80}
            sizes={sizes}
            className="h-full w-full object-cover"
          />
        )
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
