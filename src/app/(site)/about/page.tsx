import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import StepTimeline from '@/components/StepTimeline';
import FAQSection from '@/components/FAQSection';
import ValueChips from '@/components/ValueChips';
import CtaBanner from '@/components/CtaBanner';
import { PROCESS_STEPS, VALUES, QUOTE_HREF } from '@/components/content/site';

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

      {/* Story — an asymmetric text split, then the stats row */}
      <AboutSection />

      {/* Values — a row of chips, so the sentence is on demand rather than always on screen */}
      <Section id="mission">
        {/* A foundation under the heading rather than a field behind it — the bands rise from the base
            of the block and fade out before they reach the type. Building from the ground up. */}
        <div className="relative">
          <div className="relative">
            <SectionHeading
              eyebrow="Mission"
              title="Make prototyping accessible"
            />
            <ValueChips values={VALUES} />
          </div>
        </div>
      </Section>

      {/* Process — a connected horizontal stepper */}
      <Section id="process" tone="band">
        <SectionHeading
          eyebrow="Process"
          title="From CAD file to finished part"
        />
        <StepTimeline steps={PROCESS_STEPS} className="mt-14 md:mt-16" />
      </Section>

      <FAQSection tone="base" initialCount={5} />

      <CtaBanner
        title="Ready to print something real?"
        description="Upload your CAD file and get a quote by email."
        primary={{ href: QUOTE_HREF, label: 'Get a Quote' }}
        secondary={{ href: '/gallery', label: 'View Gallery' }}
      />
    </>
  );
}
