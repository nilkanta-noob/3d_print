import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ServicesList from './ServicesList';

// Home page Services. There are no service pages, so each row opens in place and links to the quote form.
export default function ServicesSection() {
  return (
    <Section id="services" tone="band" afterHero>
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

      {/* The list is capped well inside the page frame. At the full width of a large screen an open row
          stretched its blue panel across nearly 1800px, and the description inside it ran to a measure no
          one wants to read — the row stopped being a card and became a band. Capping it keeps the open
          row a readable object; the heading above still runs the full frame, so the section keeps its
          editorial left edge and the list reads as a column set within it. */}
      <div className="mt-16 max-w-[72rem] md:mt-20 lg:mt-24">
        <ServicesList />
      </div>
    </Section>
  );
}
