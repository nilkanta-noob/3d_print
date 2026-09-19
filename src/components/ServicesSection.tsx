"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ImageSlot from './ImageSlot';
import { SERVICES } from './content/services';
import { QUOTE_HREF } from './content/site';

// Home page Services. There is no Services page, so "Learn more" expands each card's full details in place.
export default function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="What we print"
        description="From a single college part to repeated design revisions — the same per-gram pricing and human file review for every order."
      />

      <ul className="mt-14 grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {SERVICES.map((service) => {
          const isOpen = openSlug === service.slug;
          const detailsId = `service-details-${service.slug}`;
          return (
            <li key={service.slug} className="flex flex-col overflow-hidden rounded-xl border border-border bg-elevated">
              <ImageSlot
                image={service.image}
                alt={service.title}
                variant={service.illustration}
                className="aspect-[4/3] border-b border-border"
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="flex flex-col p-6">
                <h3 className="text-xl font-display font-bold text-text-primary">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{service.summary}</p>

                {/* Expanding details: grid-rows 0fr → 1fr animates the height; inert keeps hidden links out of the tab order */}
                <div id={detailsId} className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden" inert={!isOpen}>
                    <div className="mt-5 space-y-4 border-t border-border pt-5 text-sm">
                      <p className="leading-relaxed text-text-secondary">{service.description}</p>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Who it&apos;s for</dt>
                          <dd className="mt-1 text-text-primary">{service.audience}</dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Typical parts</dt>
                          <dd className="mt-1 text-text-primary">{service.examples.join(' · ')}</dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Materials</dt>
                          <dd className="mt-1 text-text-primary">{service.materials}</dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Turnaround</dt>
                          <dd className="mt-1 text-text-primary">{service.turnaround}</dd>
                        </div>
                      </dl>
                      <Link href={QUOTE_HREF} className="inline-flex text-sm font-semibold text-text-primary underline decoration-accent-primary decoration-2 underline-offset-[6px] hover:decoration-text-primary">
                        Get a quote
                      </Link>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? null : service.slug)}
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
                >
                  {isOpen ? 'Show less' : 'Learn more'}
                  <ChevronDown className={`size-4 text-accent-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
