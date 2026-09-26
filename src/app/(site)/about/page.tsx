import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import StepTimeline from '@/components/StepTimeline';
import FAQSection from '@/components/FAQSection';
import { PROCESS_STEPS, VALUES } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'About | PrintWarriors',
  description: 'PrintWarriors is a Kolkata 3D printing service founded by an engineering student to make prototyping accessible.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About PrintWarriors"
        description="A Kolkata 3D printing service founded by an engineering student to make prototyping accessible — for students, makers, engineers and startups."
      />

      {/* Story */}
      <AboutSection />

      {/* Mission */}
      <Section id="mission">
        <SectionHeading
          eyebrow="Mission"
          title="Make prototyping accessible"
          description="Anyone with an idea worth building should be able to hold it in their hands without spending a fortune. These are the standards we hold ourselves to."
        />
        <ul className="mt-16 grid gap-px border border-border bg-border md:mt-20 md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {VALUES.map((value) => (
            <li key={value.title} className="bg-elevated p-8">
              <span className="block h-px w-7 bg-accent-primary" aria-hidden="true" />
              <h3 className="leading-[1.1] mt-8 text-xl text-text-primary">{value.title}</h3>
              <p className="mt-4 text-[15px] text-text-secondary">{value.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section id="process" tone="band">
        <SectionHeading
          eyebrow="Process"
          title="From CAD file to finished part"
          description="Four steps, with a person checking your file before anything is printed."
        />
        <StepTimeline steps={PROCESS_STEPS} className="mt-16 md:mt-20 lg:mt-24" />
      </Section>

      <FAQSection tone="base" />
    </>
  );
}
