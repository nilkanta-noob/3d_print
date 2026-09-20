"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ButtonLink from './ButtonLink';
import { MATERIALS, type Material } from './content/materials';

// One material as a compact showcase card: name, one line on what it's for, best uses, and a link to its full
// write-up on the Materials page (MaterialDetail's id). The link's ::after stretches over the card, so the whole
// card is clickable — the same pattern as ServiceCard's page link.
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
      className={`
        group relative flex h-full flex-col
        rounded-2xl border
        bg-[#1B1D21]
        p-7
        transition-colors duration-300
        ${isActive ? 'border-accent-primary' : 'border-white/5'}
      `}
    >
      <span
        className={`
          absolute right-0 top-0
          rounded-bl-xl rounded-tr-2xl border-b border-l
          px-4 py-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          transition-colors duration-300
          ${
            isActive
              ? 'border-accent-primary/50 bg-accent-primary/10 text-accent-primary'
              : 'border-white/10 bg-white/[0.03] text-text-muted'
          }
        `}
      >
        {material.tag}
      </span>

      <h3
        className="
        mt-6
        text-4xl
        leading-none
        font-display
        font-extrabold
        tracking-[-0.03em]
        text-text-primary
        lg:text-[2.5rem]"
      >
        {material.name}
      </h3>
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
  const [activeMaterial, setActiveMaterial] = useState("pla-plus");

  return (
    <Section id="materials" tone="band">
      <SectionHeading accent eyebrow="Materials" title="Three materials, chosen for real parts" />

      <ul 
        className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8"
        onMouseLeave={() => setActiveMaterial("pla-plus")}
      >
        {MATERIALS.map((material) => (
          <li key={material.slug}>
            <MaterialCard 
              material={material} 
              activeMaterial={activeMaterial}
              setActiveMaterial={setActiveMaterial}
            />
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
