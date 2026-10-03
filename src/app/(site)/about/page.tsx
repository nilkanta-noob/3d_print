import React from 'react';
import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import Section from '@/components/Section';
import FAQSection from '@/components/FAQSection';
import ProcessShowcase from '@/components/ProcessShowcase';
import CtaBanner from '@/components/CtaBanner';
import { PROCESS_STEPS, QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'About PrintWarriors | 3D Printing in Kolkata',
  description:
    'PrintWarriors is a Kolkata 3D printing service founded by an engineering student to make prototyping accessible across India.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About PrintWarriors | 3D Printing in Kolkata',
    description:
      'PrintWarriors is a Kolkata 3D printing service founded by an engineering student to make prototyping accessible across India.',
    url: '/about',
    // Spelled out because a page-level openGraph replaces the inherited one wholesale, taking the
    // root segment's auto-attached card with it. Next serves the generated image at this path.
    images: ['/opengraph-image'],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* The page opens straight into the About section: it carries the eyebrow, the h1 and the
          standfirst that used to live in a separate page header above it, so the page states its case
          once instead of twice. It also pads for the fixed navbar, which the header used to do. */}
      <AboutSection />

      {/* Mission and process, merged. One section: the aim on the left, the four steps beside it.
          Tones alternate down the page — header base, story band, this base, FAQ band — using the site's
          own three surfaces rather than a set of colours particular to this page. */}
      {/* Section keeps its padding on the inner frame rather than on the <section>, so a phone-only
          override has to reach that child. Scoped to below 760px and left alone above it, where the
          site's standard 96/128/160 rhythm still applies. */}
      <Section
        id="process"
        className="max-[759.98px]:[&>div]:pb-12 max-[759.98px]:[&>div]:pt-14"
      >
        <ProcessShowcase
          steps={PROCESS_STEPS}
          eyebrow="Mission"
          title="Make prototyping accessible"
          description="Student pricing, no minimum order and an exact quote before you pay. Every part is checked before it ships, and delivered across India in three to four days."
          action={{ href: QUOTE_HREF, label: 'Get a quote' }}
        />
      </Section>

      <FAQSection tone="band" initialCount={5} />

      <CtaBanner
        title="Ready to print something real?"
        description="Upload your CAD file and get a quote by email."
        primary={{ href: QUOTE_HREF, label: 'Get a Quote' }}
        secondary={{ href: '/gallery', label: 'View Gallery' }}
      />
    </>
  );
}
