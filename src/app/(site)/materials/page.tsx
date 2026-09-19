import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import MaterialComparison from '@/components/MaterialComparison';
import MaterialDetail from '@/components/MaterialDetail';
import CtaBanner from '@/components/CtaBanner';
import { MATERIALS, PRINT_SPECS } from '@/components/content/materials';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Materials Guide | PrintWarriors',
  description: 'Compare PLA, PLA Pro+ and PETG: strength, print quality, heat resistance, flexibility and best uses.',
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
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Overview"
            title="Three filaments, one process"
            description="Every part is printed by FDM on our Creality CR-10 SE. Choose the filament by what the part has to handle — fine detail, impact, heat or water."
          />
          <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:col-span-7">
            {PRINT_SPECS.map((spec) => (
              <div key={spec.label} className="bg-elevated p-6">
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">{spec.label}</dt>
                <dd className="mt-2 font-display text-xl font-bold text-text-primary">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="compare">
        <SectionHeading eyebrow="Comparison" title="How they compare" />
        <div className="mt-14">
          <MaterialComparison />
        </div>
        <p className="mt-6 max-w-3xl text-sm text-text-muted">
          Ratings compare these three materials against each other. Exact properties vary with the filament brand and print settings such as infill.
        </p>
      </Section>

      <Section id="details" tone="band">
        <SectionHeading eyebrow="In detail" title="Material details" />
        <div className="mt-14 space-y-6">
          {MATERIALS.map((material) => (
            <MaterialDetail key={material.slug} material={material} />
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Ready to print?"
        description="Upload your CAD file, choose a material and get a quote by email — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
        secondary={{ href: '/pricing', label: 'View pricing' }}
      />
    </>
  );
}
