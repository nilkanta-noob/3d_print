import React from 'react';
import HomeHero from '@/components/HomeHero';
import ServicesSection from '@/components/ServicesSection';
import MaterialsSection from '@/components/MaterialsSection';
import PricingSection from '@/components/PricingSection';
import GalleryPreview from '@/components/GalleryPreview';
import TrustTicker from '@/components/TrustTicker';
import CtaBanner from '@/components/CtaBanner';
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd';
import { QUOTE_HREF } from '@/components/content/site';

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomeHero />

      {/* The hero used to pin its footage to the viewport as a fixed z-0 layer, and everything below it
          needed its own stacking layer to cover that. The footage is gone, and so is the wrapper. */}
      {/* Directly under the hero, so it is the first thing a scroll reveals. */}
      <TrustTicker />
      <ServicesSection />
      <MaterialsSection />
      <PricingSection />
      <GalleryPreview />
      <CtaBanner
        title="Turn Your Design Into Something Real."
        description="Upload your CAD file and receive a quote within hours."
        primary={{ href: QUOTE_HREF, label: 'Get a Quote' }}
      />
    </>
  );
}
