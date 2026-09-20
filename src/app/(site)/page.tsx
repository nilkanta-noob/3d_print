import React from 'react';
import HomeHero from '@/components/HomeHero';
import ServicesSection from '@/components/ServicesSection';
import MaterialsSection from '@/components/MaterialsSection';
import ExplorePreview from '@/components/ExplorePreview';
import PricingSection from '@/components/PricingSection';
import TrustTicker from '@/components/TrustTicker';
import CtaBanner from '@/components/CtaBanner';
import { QUOTE_HREF } from '@/components/content/site';

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Everything below the hero rides over the hero's pinned footage, which is a fixed layer at z-0.
          This wrapper puts the whole rest of the page in one stacking layer above it. Without it the
          sections are unpositioned, and an unpositioned element's background paints *below* a positioned
          z-0 element however late it comes in the document — so the video showed straight through them. */}
      <div className="relative z-10">
        <ServicesSection />
        <MaterialsSection />
        <PricingSection />
        <TrustTicker />
        <ExplorePreview />
        <CtaBanner
          title="Ready to bring your idea to life?"
          description="Upload your CAD file and get a quote by email — usually within the hour."
          primary={{ href: QUOTE_HREF, label: 'Get a Quote' }}
        />
      </div>
    </>
  );
}
