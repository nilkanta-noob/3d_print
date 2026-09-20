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
      className="group relative flex aspect-[16/10] w-full flex-col justify-end overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
    >
      <div className="absolute inset-0 z-0">
        {item.image ? (
          <Image 
            src={item.image} 
            alt={item.alt ?? ''} 
            fill 
            sizes="(min-width: 768px) 50vw, 100vw" 
            className="object-cover brightness-[0.65] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-100" 
          />
        ) : (
          <div className="absolute inset-0 bg-radial-[ellipse_75%_65%_at_50%_32%] from-elevated to-background brightness-[0.65] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-100">
            <RenderPlaceholder item={item} />
          </div>
        )}
      </div>

      {/* Gradient overlay: 75% black at bottom → 35% at 40% → 10% at top */}
      <div 
        className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_40%,rgba(0,0,0,0.10)_100%)] transition-opacity duration-700 ease-out group-hover:opacity-80" 
        aria-hidden="true" 
      />

      <div className="relative z-20 flex w-full items-end justify-between gap-8 p-10 lg:p-12">
        <div className="max-w-[70%]">
          <h3 className="text-[1.75rem] font-display font-medium leading-[1.05] tracking-[-0.035em] text-white lg:text-[2.25rem]">
            {item.title}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-white/70">
            {item.description}
          </p>
        </div>
        
        <span
          className="grid size-16 shrink-0 place-items-center border border-white/25 text-white transition-colors duration-300 group-hover:border-accent-primary group-hover:bg-accent-primary group-hover:text-on-accent"
          aria-hidden="true"
        >
          <ArrowRight className="size-5 transition-transform duration-700 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function ExplorePreview() {
  return (
    <Section id="explore" tone="band">
      <SectionHeading
        accent
        eyebrow="Explore"
        title="What you can do with 3D printing"
        description="Four of the things people bring us most often — from a one-off replacement part to a run of concept models."
      />

      <ul className="mt-16 grid gap-8 md:grid-cols-2 md:mt-20 lg:mt-24 lg:gap-12">
        {HOME_EXPLORE.map((item) => (
          <li key={item.title}>
            <ExploreCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
