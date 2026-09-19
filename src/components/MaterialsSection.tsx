import React from 'react';
import { Check } from 'lucide-react';
import SectionHeading from './SectionHeading';

const MATERIALS = [
  {
    name: 'PLA',
    tag: 'Standard',
    description: 'The industry standard for high-detail visual models and rapid non-functional prototyping. Excellent dimensional accuracy.',
    applications: ['Visual prototypes and display models', 'Low-stress, easy-to-print parts', 'Best entry point — fast, cheap'],
  },
  {
    name: 'PLA Pro+',
    tag: 'Engineering',
    highlighted: true,
    description: 'A step up in toughness and layer adhesion from standard PLA, while staying easy to print — the middle ground before PETG.',
    applications: ['Functional prototypes (durability)', 'Brackets, enclosures, jigs', 'Light-mechanical-stress parts'],
  },
  {
    name: 'PETG',
    tag: 'Durable',
    description: 'More impact-resistant and flexible than PLA, better dimensional stability than ABS. Ideal for parts needing real durability.',
    applications: ['Water-resistant containers', 'Snap-fit joints', 'Mechanical parts (moderate stress)'],
  },
];

export default function MaterialsSection() {
  return (
    <section className="py-24 md:py-32 bg-surface border-y border-border" id="materials">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Materials"
          title="Materials guide"
          description="Compare material properties to select the optimal filament for your engineering, prototyping, or display application."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {MATERIALS.map((material) => (
            <article key={material.name} className="flex flex-col rounded-xl border border-border bg-elevated p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-display font-bold text-text-primary">{material.name}</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  {material.highlighted && <span className="size-1.5 rounded-full bg-accent-primary" aria-hidden="true" />}
                  {material.tag}
                </span>
              </div>

              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-secondary">
                {material.description}
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">Applications</h4>
                <ul className="mt-4 space-y-3 text-sm text-text-primary">
                  {material.applications.map((application) => (
                    <li key={application} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-text-muted" strokeWidth={2} aria-hidden="true" />
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
