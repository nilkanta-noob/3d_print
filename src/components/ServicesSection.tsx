import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ServicesList from './ServicesList';

// Home page Services. There are no service pages, so each row opens in place and links to the quote form.
export default function ServicesSection() {
  return (
    <Section id="services" afterHero>
      <SectionHeading
        size="display"
        eyebrow="Services"
        title="What We Print"
        /* The no-break space keeps the dash on the line it closes; "per-gram" never splits at its hyphen */
        description={
          <>
            From a single college part to repeated design revisions&nbsp;— the same{' '}
            <span className="whitespace-nowrap">per-gram</span> pricing and human file review for every order.
          </>
        }
      />

      <div className="mt-16 md:mt-20 lg:mt-24">
        <ServicesList />
      </div>
    </Section>
  );
}
