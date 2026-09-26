import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import MaterialComparison from '@/components/MaterialComparison';
import StrengthComparison from '@/components/StrengthComparison';
import MaterialDetail from '@/components/MaterialDetail';
import CtaBanner from '@/components/CtaBanner';
import { MATERIALS, PRINT_SPECS, RECOMMENDATIONS } from '@/components/content/materials';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Materials Guide | PrintWarriors',
  description: 'Compare PLA, PLA+ and PETG: strength, print quality, heat resistance, flexibility, use cases and which to choose.',
};

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Materials"
        title="Materials guide"
        description="What each filament is good at, where it falls short, and which one your part needs."
      />

      <Section id="overview" tone="band">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-20">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Overview"
            title="Three filaments, one process"
            description="Every part is printed by FDM on our Creality CR-10 SE. Choose the filament by what the part has to handle — fine detail, impact, heat or water."
          />
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:col-span-7">
            {PRINT_SPECS.map((spec) => (
              <div key={spec.label} className="bg-elevated p-8">
                <dt className="label-micro text-text-muted">{spec.label}</dt>
                <dd className="mt-4 font-display text-2xl font-medium tracking-[-0.03em] text-text-primary">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="compare">
        <SectionHeading eyebrow="Comparison" title="How they compare" />
        <div className="mt-16 md:mt-20 lg:mt-24">
          <MaterialComparison />
        </div>
        <p className="mt-10 max-w-[62ch] text-sm text-text-muted">
          Ratings compare these three materials against each other. Exact properties vary with the filament brand and print settings such as infill.
        </p>
      </Section>

      <Section id="choose" tone="band">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading eyebrow="Strength" title="Strength comparison" />
            <div className="mt-16">
              <StrengthComparison />
            </div>
            <p className="mt-10 max-w-[52ch] text-[15px] text-text-secondary">
              PLA is stiff but brittle. PLA+ adds toughness and layer adhesion. PETG absorbs impact and flexes before it breaks.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Recommendations" title="Which should I choose?" />
            <ul className="mt-16 divide-y divide-border border-y border-border">
              {RECOMMENDATIONS.map((item) => (
                <li key={item.need} className="grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                  <div>
                    <p className="text-[15px] text-text-primary">{item.need}</p>
                    <p className="mt-2 text-sm leading-[1.7] text-text-muted">{item.why}</p>
                  </div>
                  <p className="font-display text-xl font-medium tracking-[-0.03em] text-text-primary">{item.pick}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="details">
        <SectionHeading eyebrow="Use cases" title="Material details" />
        <div className="mt-16 space-y-8 md:mt-20 lg:mt-24">
          {MATERIALS.map((material) => (
            <MaterialDetail key={material.slug} material={material} />
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Ready to print?"
        description="Upload your CAD file, choose a material and get a quote by email — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
        secondary={{ href: '/#pricing', label: 'View pricing' }}
      />
    </>
  );
}
