import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import PartIllustration from './PartIllustration';
import { HOME_EXPLORE, type ExploreHighlight } from './content/explore';

// Growing sizes for `iterations` cards — the same part drawn as v1 → v3. Each drawing is limited by its column's
// width, so the steps scale the width (a height step alone would be capped by the column and look identical).
const ITERATION_WIDTHS = ['w-[62%]', 'w-[80%]', 'w-full'];

// Placeholder until the card has a photo: its drawings side by side, or one part in successive versions
function RenderPlaceholder({ item }: { item: ExploreHighlight }) {
  return (
    <div className="flex h-full w-full items-end justify-center gap-[6%]">
      {item.illustrations.map((variant, i) => (
        <div key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
          {item.iterations ? (
            <div className={`flex min-h-0 flex-1 items-end justify-center ${ITERATION_WIDTHS[i] ?? 'w-full'}`}>
              <PartIllustration variant={variant} className="h-auto max-h-full w-full" />
            </div>
          ) : (
            <div className="flex h-full w-full items-end justify-center">
              <PartIllustration variant={variant} className="h-full w-auto max-w-full" />
            </div>
          )}
          {item.iterations && <span className="mt-2 font-mono text-[11px] tracking-[0.1em] text-text-muted">v{i + 1}</span>}
        </div>
      ))}
    </div>
  );
}

// Image-first card: the photo (or, until one exists, studio-lit CAD renders) fills the card, a dark gradient
// rises from the bottom, and the title and description sit on it. The whole card is one link.
// Hover: the image zooms to 1.05, the border brightens and the card lifts 4px (movement only without reduced motion).
function ExploreCard({ item }: { item: ExploreHighlight }) {
  return (
    <Link
      href={item.href}
      className="group relative block overflow-hidden rounded-[20px] border border-border bg-background transition-[translate,border-color] duration-300 ease-out hover:border-text-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary motion-safe:hover:-translate-y-1"
    >
      {/* Taller on phones and 2-column tablets so the text overlay leaves room for the image.
          A flex column: the photo fills the whole card behind everything, while placeholder renders take only the
          space left above the text block — so they never run into the title, however many lines the text wraps to. */}
      <div className="relative flex aspect-[4/5] flex-col sm:aspect-[4/3] md:aspect-[4/5] lg:aspect-[4/3]">
        <div className="absolute inset-0 transition-transform duration-500 ease-out motion-safe:group-hover:scale-105">
          {item.image ? (
            <Image src={item.image} alt={item.alt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          ) : (
            // Studio lighting for the renders: a soft spotlight behind the parts
            <div className="absolute inset-0 bg-radial-[ellipse_75%_65%_at_50%_32%] from-elevated to-background" />
          )}
        </div>

        {/* Dark gradient under the text */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/85 via-black/45 to-transparent" aria-hidden="true" />

        <div
          className={`relative min-h-0 flex-1 ${
            item.image
              ? ''
              : 'px-[9%] pt-[8%] pb-3 text-text-secondary transition-[color,scale] duration-500 ease-out group-hover:text-text-primary motion-safe:group-hover:scale-105'
          }`}
        >
          {!item.image && <RenderPlaceholder item={item} />}
        </div>

        <div className="relative flex items-end justify-between gap-6 p-6 pt-0 md:p-8 md:pt-0">
          <div>
            <h3 className="text-2xl font-display font-bold tracking-tight text-text-primary lg:text-[1.75rem]">{item.title}</h3>
            <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-text-secondary">{item.description}</p>
          </div>
          <span
            className="grid size-11 shrink-0 place-items-center rounded-full border border-accent-primary/60 text-accent-primary transition-colors duration-300 group-hover:border-accent-primary group-hover:bg-accent-primary group-hover:text-on-accent"
            aria-hidden="true"
          >
            <ArrowRight className="size-5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Home page Explore: real-world uses of 3D printing as four image cards, each linking into the Explore page.
export default function ExplorePreview() {
  // Raised band, keeping the page alternating: Materials band → Pricing base → Explore band → CTA base
  return (
    <Section id="explore" tone="band">
      <SectionHeading accent eyebrow="Explore" title="What You Can Do with 3D Printing?" />

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
        {HOME_EXPLORE.map((item) => (
          <li key={item.title}>
            <ExploreCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
