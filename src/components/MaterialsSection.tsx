"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ButtonLink from './ButtonLink';
import { MATERIALS, type Material } from './content/materials';

// One material as a rectangular specimen card: the tag, the name at display size, one line on what it's
// for, best uses, and a link to its full write-up on the Materials page (MaterialDetail's id). The link's
// ::after stretches over the card, so the whole card is clickable.
//
// The three cards share one continuous hairline grid — a single rectangle divided twice, rather than
// three boxes with gaps between them. No radius, no shadow, no fill change: the only hover signal is a
// accent rule that draws itself across the top of the card, which is enough on a surface this quiet.
function MaterialCard({
  material,
  activeMaterial,
  setActiveMaterial
}: {
  material: Material;
  activeMaterial: string;
  setActiveMaterial: (slug: string) => void;
}) {
  const isActive = activeMaterial === material.slug;

  return (
    <article
      onMouseEnter={() => setActiveMaterial(material.slug)}
      className="group relative flex h-full w-full min-w-0 flex-col bg-surface p-8 lg:p-10"
    >
      {/* The active rule: 2px of copper along the top edge of the card, drawn from the left */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-accent-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isActive ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      {/* Spec label, set flush with the copy rather than boxed into a corner badge */}
      <p className={`label-micro transition-colors duration-300 ${isActive ? 'text-accent-primary' : 'text-text-muted'}`}>
        {material.tag}
      </p>

      <h3 className="mt-8 text-[2.5rem] text-text-primary lg:text-[3rem]">
        {material.name}
      </h3>

      {/* On phones the stacked cards reserve two lines so they stay the same height; wider stacked cards (tablets)
          fit everything on one line, and side by side (1024px+) the grid row equalises them */}
      <p className="mt-6 min-h-[2lh] text-base text-text-secondary md:min-h-0">{material.summary}</p>

      <div className="mt-8 border-t border-border pt-6">
        <p className="label-micro text-text-muted">Best for</p>
        <p className="mt-3 min-h-[2lh] text-[15px] leading-[1.7] text-text-primary md:min-h-0">{material.useCases.join(' · ')}</p>
      </div>

      <div className="mt-auto pt-10">
        <Link
          href={`/materials#${material.slug}`}
          className="group/cta inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-primary after:absolute after:inset-0 focus-visible:outline-none"
        >
          Learn More<span className="sr-only"> about {material.name}</span>
          <ArrowRight className="size-4 text-accent-primary transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

// Home page materials preview. id="materials" is the target of the hero's "Explore Materials" button.
export default function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState("pla-plus");

  return (
    <Section id="materials">
      <SectionHeading
        eyebrow="Materials"
        title="Three materials, chosen for real parts"
        description="Each filament is stocked for what it is actually good at — fine detail, impact strength or heat and water resistance. Choose by what the part has to survive."
      />

      <ul
        className="mt-16 grid divide-y divide-border border border-border md:mt-20 lg:mt-24 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        onMouseLeave={() => setActiveMaterial("pla-plus")}
      >
        {MATERIALS.map((material) => (
          <li key={material.slug} className="flex">
            <MaterialCard
              material={material}
              activeMaterial={activeMaterial}
              setActiveMaterial={setActiveMaterial}
            />
          </li>
        ))}
      </ul>

      <ButtonLink href="/materials" className="group mt-16 lg:mt-20">
        Explore Materials
        <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
      </ButtonLink>
    </Section>
  );
}
