import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ButtonLink from './ButtonLink';
import { MATERIALS, type Material } from './content/materials';

// One material as a compact showcase card: name, one line on what it's for, best uses, and a link to its full
// write-up on the Materials page (MaterialDetail's id). The link's ::after stretches over the card, so the whole
// card is clickable — the same pattern as ServiceCard's page link.
function MaterialCard({ material }: { material: Material }) {
  return (
    // The highlighted material (PLA+) gets a thin copper outline to match its copper tier capsule
    <article
      className={`group relative flex h-full flex-col rounded-2xl border bg-elevated p-7 transition-colors duration-300 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent-primary ${
        material.highlighted ? 'border-accent-primary/60 hover:border-accent-primary' : 'border-border hover:border-text-primary/20'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-4xl leading-none font-display font-extrabold tracking-[-0.03em] text-text-primary lg:text-[2.5rem]">{material.name}</h3>
        {/* Tier capsule — copper for the highlighted material (PLA+), a quiet outline for the others */}
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            material.highlighted ? 'border-accent-primary/60 bg-accent-primary/10 text-accent-hover' : 'border-border text-text-muted'
          }`}
        >
          {material.tag}
        </span>
      </div>
      {/* On phones the stacked cards reserve two lines so they stay the same height; wider stacked cards (tablets)
          fit everything on one line, and side by side (1024px+) the grid row equalises them */}
      <p className="mt-3 min-h-[2lh] text-base leading-relaxed text-text-secondary md:min-h-0">{material.summary}</p>

      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Best for</p>
        <p className="mt-1 min-h-[2lh] text-sm leading-relaxed text-text-primary md:min-h-0">{material.useCases.join(' · ')}</p>
      </div>

      <div className="mt-auto pt-6">
        <Link
          href={`/materials#${material.slug}`}
          className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-text-primary after:absolute after:inset-0 focus-visible:outline-none"
        >
          Learn More<span className="sr-only"> about {material.name}</span>
          <ArrowRight className="size-4 text-accent-primary transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

// Home page materials preview. id="materials" is the target of the hero's "Explore Materials" button.
export default function MaterialsSection() {
  return (
    <Section id="materials" tone="band">
      <SectionHeading accent eyebrow="Materials" title="Three materials, chosen for real parts" />

      <ul className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8">
        {MATERIALS.map((material) => (
          <li key={material.slug}>
            <MaterialCard material={material} />
          </li>
        ))}
      </ul>

      {/* Solid copper, like the hero's primary button; the arrow takes the button's text colour */}
      <ButtonLink href="/materials" className="group mt-12 lg:mt-14">
        Explore Materials
        <ArrowRight className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
      </ButtonLink>
    </Section>
  );
}
