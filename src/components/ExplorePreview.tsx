import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import PartIllustration from './PartIllustration';
import { HOME_EXPLORE, type ExploreHighlight } from './content/explore';

// Growing sizes for `iterations` cards
const ITERATION_WIDTHS = ['w-[62%]', 'w-[80%]', 'w-full'];

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

function ExploreCard({ item }: { item: ExploreHighlight }) {
  return (
    <Link
      href={item.href}
      /* Height is set by a min-height rather than an aspect ratio, so the photograph keeps its room at
         every column width: a ratio would shrink the card back to ~300px on a 1024px screen, which is
         what made the copy feel packed into the bottom edge. The values stay deliberately short of
         square from tablets up, so the cards read as landscape plates — 1.22:1 at 1024px, 1.5:1 at
         1280px. Phones get a taller card because there the column is the full width of the screen. */
      className="group relative flex min-h-[400px] w-full flex-col justify-end overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary md:min-h-[360px] lg:min-h-[380px] xl:min-h-[400px]"
    >
      <div className="absolute inset-0 z-0">
        {item.image ? (
          <Image 
            src={item.image} 
            alt={item.alt ?? ''} 
            fill 
            sizes="(min-width: 768px) 50vw, 100vw" 
            className="object-cover brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
          />
        ) : (
          <div className="absolute inset-0 bg-radial-[ellipse_75%_65%_at_50%_32%] from-elevated to-background brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <RenderPlaceholder item={item} />
          </div>
        )}
      </div>

      {/* Gradient overlay: 78% black at bottom → 45% at 45% → 10% at top. The middle stop is carried
          higher than the card's old height needed, so the description still sits on a dark enough field
          now that the copy starts further up the image. */}
      <div
        className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.10)_100%)] "
        aria-hidden="true"
      />

      {/* Extra bottom padding over the sides lifts the copy clear of the card's edge, so it reads as
          sitting on the photograph rather than resting on the bottom of the frame. */}
      <div className="relative z-20 w-full p-8 pb-10 md:p-12 md:pb-14">
        {/* The title has the card's full width to itself — sharing a row with the arrow is what forced
            "Product Development" onto two lines. Only the description sits beside the arrow. */}
        <h3 className="text-[1.75rem] font-display font-medium leading-[1.05] tracking-[-0.035em] text-white text-balance lg:text-[2.25rem]">
          {item.title}
        </h3>

        <div className="mt-6 flex items-end justify-between gap-10 md:gap-12">
          <p className="max-w-[46ch] text-[15px] leading-[1.7] text-white/70">
            {item.description}
          </p>

          {/* The least important thing on the card: a 52px hairline square with a small glyph, held back
              to 20% white so it reads as an affordance rather than a button. Copper only on hover. */}
          <span
            className="grid size-[52px] shrink-0 place-items-center border border-white/20 text-white/80 transition-colors duration-300 group-hover:border-accent-primary group-hover:bg-accent-primary group-hover:text-on-accent"
            aria-hidden="true"
          >
            <ArrowRight className="size-4 transition-transform duration-700 ease-out group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ExplorePreview() {
  return (
    <Section id="explore">
      <SectionHeading
        accent
        eyebrow="Explore"
        title="What you can do with 3D printing"
        description="Four of the things people bring us most often — from a one-off replacement part to a run of concept models."
      />

      {/* Section now runs in the site frame, so the photographs get the full page width without this
          grid needing a wrapper of its own — a card is 575px wide at a 1260px screen, up from 480px. */}
      <ul className="mt-16 grid gap-8 md:mt-20 md:grid-cols-2 lg:mt-24">
        {HOME_EXPLORE.map((item) => (
          <li key={item.title}>
            <ExploreCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
