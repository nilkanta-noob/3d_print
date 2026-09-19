import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import { SERVICES } from './content/services';

// Home page Services: four cards in a 2×2 grid (one column on phones), read left-to-right, top-to-bottom as
// a progression — Student Projects → Rapid Prototyping → Custom Parts → Product Development.
export default function ServicesSection() {
  return (
    <Section id="services" afterHero>
      <SectionHeading
        size="display"
        eyebrow="Services"
        title="What We Print"
        // The no-break space keeps the dash on the line it closes; "per-gram" never splits at its hyphen
        description={
          <>
            From a single college part to repeated design revisions&nbsp;— the same{' '}
            <span className="whitespace-nowrap">per-gram</span> pricing and human file review for every order.
          </>
        }
      />

      {/* items-start: opening one card's details grows only that card — its row-mate keeps its own height */}
      <ul className="mt-12 md:mt-14 lg:mt-16 grid items-start gap-6 md:grid-cols-2 lg:gap-8">
        {SERVICES.map((service, index) => (
          <li key={service.slug}>
            <ServiceCard service={service} step={index + 1} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
