import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { ArrowLink } from './ButtonLink';
import { MATERIALS } from './content/materials';

// Home page materials preview. id="materials" is the target of the hero's "Explore Materials" button.
export default function MaterialsSection() {
  return (
    <Section id="materials">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Materials"
          title="Choose the right material"
          description="Three FDM filaments, each suited to a different kind of part."
        />
        <ArrowLink href="/materials" className="shrink-0 self-start md:self-auto">View full materials guide</ArrowLink>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {MATERIALS.map((material) => (
          <article key={material.slug} className="flex flex-col rounded-xl border border-border bg-elevated p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-display font-bold text-text-primary">{material.name}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                {material.highlighted && <span className="size-1.5 rounded-full bg-accent-primary" aria-hidden="true" />}
                {material.tag}
              </span>
            </div>

            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-secondary">{material.description}</p>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">Best for</p>
              <p className="mt-2 text-sm font-medium text-text-primary">{material.bestFor}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
