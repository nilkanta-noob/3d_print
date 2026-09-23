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

      {/* The hero used to pin its footage to the viewport as a fixed z-0 layer, and everything below it
          needed its own stacking layer to cover that. The footage is gone, and so is the wrapper. */}
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
    </>
  );
}
