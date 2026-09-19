import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import FAQSection from '@/components/FAQSection';
import CtaBanner from '@/components/CtaBanner';
import { QUOTE_HREF, VALUES } from '@/components/content/site';

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

      <AboutSection />

      <Section id="values">
        <SectionHeading eyebrow="Mission & values" title="What we hold ourselves to" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <li key={value.title} className="rounded-xl border border-border bg-elevated p-7">
              <span className="block h-px w-8 bg-accent-primary" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-display font-bold text-text-primary">{value.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{value.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <FAQSection />

      <CtaBanner
        title="Have a part to print?"
        description="Upload your CAD file and get a quote by email — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
        secondary={{ href: '/contact', label: 'Contact us' }}
      />
    </>
  );
}
