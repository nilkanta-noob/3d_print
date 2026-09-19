import React from 'react';
import HomeHero from '@/components/HomeHero';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import StepTimeline from '@/components/StepTimeline';
import TrustStrip from '@/components/TrustStrip';
import MaterialsSection from '@/components/MaterialsSection';
import PricingSection from '@/components/PricingSection';
import CtaBanner from '@/components/CtaBanner';
import { PROCESS_STEPS, QUOTE_HREF } from '@/components/content/site';

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section id="how-it-works">
        <SectionHeading
          eyebrow="How it works"
          title="From CAD file to finished part"
          description="Four steps, with a person checking your file before anything is printed."
        />
        <StepTimeline steps={PROCESS_STEPS} className="mt-14" />
      </Section>

      <TrustStrip />

      <MaterialsSection />

      <PricingSection />

      <CtaBanner
        title="Ready to build your next prototype?"
        description="Upload your CAD file and get a quote by email — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get Quote' }}
        secondary={{ href: '/materials', label: 'Explore Materials' }}
      />
    </>
  );
}
