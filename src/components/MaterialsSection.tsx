import React from 'react';
import { Check } from 'lucide-react';
import CornerSteps from './CornerSteps';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { MATERIALS, formatRate, type Material } from './content/materials';

/*
 * One material as a card.
 *
 * Three separate cards with air between them rather than one rectangle divided twice. The featured card
 * carries its emphasis entirely in the colour inversion — it is filled with the accent and its type is
 * the page's own dark navy. It is not lifted, not scaled and casts nothing; it is the same box as the
 * other two, inverted.
 *
 * The mono face is the site's IBM Plex Mono, already loaded, and it is used for two things only: the
 * category label and the rate. Everything else stays on the sans.
 */
function MaterialCard({ material }: { material: Material }) {
  const featured = material.highlighted === true;
  const muted = featured ? 'text-on-accent/70' : 'text-text-muted';

  return (
    <article
      className={`relative flex w-full min-w-0 flex-col p-7 lg:p-10 ${
        featured ? 'bg-accent-primary text-on-accent' : 'border border-text-primary/10'
      }`}
    >
      {featured && <CornerSteps />}

      <p className={`font-mono text-[11px] uppercase tracking-[0.15em] ${muted}`}>{material.tag}</p>

      {/* The name is the hero of the card and keeps the size it has always had. */}
      <h3 className={`mt-8 text-[2.5rem] lg:text-[3rem] ${featured ? 'text-on-accent' : 'text-text-primary'}`}>
        {material.name}
      </h3>

      {/* The rate sits directly under the name at roughly 45% of its size and a lighter weight, so it
          reads as a figure attached to the name rather than as a second heading. */}
      <p className="mt-4 flex items-baseline gap-1 font-mono">
        <span className={`text-[1.375rem] font-medium ${featured ? 'text-on-accent' : 'text-text-primary'}`}>
          {formatRate(material.pricePerGram.standard)}
        </span>
        <span className={`text-[13px] ${muted}`}>/g</span>
      </p>

      <p className={`mt-6 text-[15px] leading-[1.7] ${featured ? 'text-on-accent/80' : 'text-text-secondary'}`}>
        <strong className={`font-semibold ${featured ? 'text-on-accent' : 'text-text-primary'}`}>
          {material.summaryLead}
        </strong>
        {material.summary.slice(material.summaryLead.length)}
      </p>

      {/* The checklist replaces the old "Best for" label and the rule above it: each use gets its own
          row, which is what the label and the dot-separated line were standing in for. */}
      <ul className="mt-7 space-y-2.5">
        {material.useCases.map((use) => (
          <li
            key={use}
            className={`flex items-start gap-3 text-[15px] ${featured ? 'text-on-accent' : 'text-text-secondary'}`}
          >
            <Check
              aria-hidden="true"
              strokeWidth={2.5}
              className={`mt-[5px] size-3 shrink-0 ${featured ? 'text-on-accent/70' : 'text-accent-primary'}`}
            />
            {use}
          </li>
        ))}
      </ul>
    </article>
  );
}

// Home page materials preview. id="materials" is the target of the navbar's Materials link.
export default function MaterialsSection() {
  return (
    <Section id="materials">
      <SectionHeading
        eyebrow="Materials"
        title="Three materials, chosen for real parts"
        description="Each filament is stocked for what it is actually good at — fine detail, impact strength or heat and water resistance. Choose by what the part has to survive."
      />

      <div className="mt-16 grid gap-5 md:mt-20 lg:mt-24 lg:grid-cols-3">
        {MATERIALS.map((material) => (
          <MaterialCard key={material.slug} material={material} />
        ))}
      </div>

      {/* Reading text rather than another micro-label: the labels inside the cards are there to name
          fields, and a sentence set the same way would read as one more of them. */}
      <p className="mt-6 text-[15px] leading-[1.6] text-text-secondary">
        Priced per gram of printed part. Final cost confirmed in your quote.
      </p>
    </Section>
  );
}
