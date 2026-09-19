import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import RatingMeter from './RatingMeter';
import { ArrowLink } from './ButtonLink';
import { MATERIALS } from './content/materials';

// Home page materials preview. id="materials" is the target of the hero's "Explore Materials" button.
export default function MaterialsSection() {
  return (
    <Section id="materials" tone="band">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Materials" title="Three materials, chosen for real parts" />
        <ArrowLink href="/materials" className="shrink-0 self-start md:self-auto">View all materials</ArrowLink>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {MATERIALS.map((material) => (
          <article key={material.slug} className="flex flex-col rounded-xl border border-border bg-elevated p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-3xl font-display font-bold text-text-primary">{material.name}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                {material.highlighted && <span className="size-1.5 rounded-full bg-accent-primary" aria-hidden="true" />}
                {material.tag}
              </span>
            </div>

            <dl className="mt-8 space-y-6 border-t border-border pt-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Best use</dt>
                <dd className="mt-2 text-[15px] font-medium text-text-primary">{material.bestFor}</dd>
              </div>
              <div>
                <dt className="mb-2 text-xs uppercase tracking-[0.14em] text-text-muted">Strength</dt>
                <dd><RatingMeter rating={material.ratings.strength} /></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Surface finish</dt>
                <dd className="mt-2 text-[15px] text-text-secondary">{material.surfaceFinish}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
