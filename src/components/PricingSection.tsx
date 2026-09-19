import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import PricingTable from './PricingTable';
import { ArrowLink } from './ButtonLink';

// Home page pricing preview — the full breakdown lives on /pricing.
export default function PricingSection() {
  return (
    <Section id="pricing" tone="band">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Pricing"
            title="Priced per gram"
            description="You pay for the material your part uses. No setup fees, no minimum order."
          />
          <ArrowLink href="/pricing" className="mt-8">View full pricing</ArrowLink>
        </div>
        <PricingTable className="lg:col-span-7" />
      </div>
    </Section>
  );
}
