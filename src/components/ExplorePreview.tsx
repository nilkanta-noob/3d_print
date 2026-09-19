import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ImageSlot from './ImageSlot';
import { ArrowLink } from './ButtonLink';
import { HOME_EXPLORE } from './content/explore';

// Home page Explore: four large visual cards and a link to the gallery.
export default function ExplorePreview() {
  return (
    <Section id="explore">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Explore" title="What people print" />
        <ArrowLink href="/gallery" className="shrink-0 self-start md:self-auto">View gallery</ArrowLink>
      </div>

      <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
        {HOME_EXPLORE.map((item) => (
          <li key={item.title} className="overflow-hidden rounded-2xl border border-border bg-elevated">
            <ImageSlot
              image={item.image}
              alt={item.title}
              variant={item.illustration}
              className="aspect-[16/10] border-b border-border"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-display font-bold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
