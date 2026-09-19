import React from 'react';
import HomeHero from '@/components/HomeHero';
import TrustStrip from '@/components/TrustStrip';
import ServicesSection from '@/components/ServicesSection';
import MaterialsSection from '@/components/MaterialsSection';
import ExplorePreview from '@/components/ExplorePreview';
import PricingSection from '@/components/PricingSection';
import CtaBanner from '@/components/CtaBanner';
import { QUOTE_HREF } from '@/components/content/site';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ServicesSection />
      <MaterialsSection />
      <ExplorePreview />
      <PricingSection />
      <CtaBanner
        title="Ready to bring your idea to life?"
        description="Upload your CAD file and get a quote by email — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a Quote' }}
      />
    </>
  );
}
