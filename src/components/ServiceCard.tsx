"use client";

import React, { useId, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ImageSlot from './ImageSlot';
import type { Service } from './content/services';
import { QUOTE_HREF } from './content/site';

interface ServiceCardProps {
  service: Service;
  step: number; // position in the Student Projects → Product Development progression, shown as 01–04
}

const CTA = 'group/cta inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-primary';
const DETAIL_TERM = 'label-micro text-text-muted';

// One service: a large CAD drawing, the step number, title, one-line description and "View Service".
// With service.href the whole card links to that service's page (the link's ::after stretches over the card).
// Without one, "View Service" opens the service's details inside the card instead.
export default function ServiceCard({ service, step }: ServiceCardProps) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const linked = Boolean(service.href);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border border-border bg-elevated transition-colors duration-300 hover:border-text-primary/25 ${
        linked ? 'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent-primary' : ''
      }`}
    >
      <ImageSlot
        image={service.image}
        alt={service.title}
        variant={service.illustration}
        size="large"
        badge={false}
        className="aspect-[4/3] border-b border-border md:aspect-[16/10]"
        sizes="(min-width: 768px) 50vw, 100vw"
      />

      <div className="@container flex flex-1 flex-col p-8 md:p-10">
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent-primary" aria-hidden="true">
          {String(step).padStart(2, '0')}
        </p>
        <h3 className="mt-5 text-[1.75rem] text-text-primary lg:text-[2rem]">{service.title}</h3>
        {/* Closed cards stay the same height by reserving the longest description's lines (3 on phones and
            tablets, 2 from 1024px) — the grid doesn't stretch cards, so opening one never resizes its neighbour */}
        <p className="mt-4 min-h-[3lh] max-w-[46ch] text-base text-text-secondary lg:min-h-[2lh] lg:text-[17px]">{service.description}</p>

        {!linked && (
          // Expanding details: grid-rows 0fr → 1fr animates the height; inert keeps the hidden link out of the tab order
          <div id={detailsId} className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden" inert={!open}>
              <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-border pt-6 text-sm @md:grid-cols-2">
                <div>
                  <dt className={DETAIL_TERM}>Who it&apos;s for</dt>
                  <dd className="mt-1 text-text-primary">{service.audience}</dd>
                </div>
                <div>
                  <dt className={DETAIL_TERM}>Typical parts</dt>
                  <dd className="mt-1 text-text-primary">{service.examples.join(' · ')}</dd>
                </div>
                <div>
                  <dt className={DETAIL_TERM}>Materials</dt>
                  <dd className="mt-1 text-text-primary">{service.materials}</dd>
                </div>
                <div>
                  <dt className={DETAIL_TERM}>Turnaround</dt>
                  <dd className="mt-1 text-text-primary">{service.turnaround}</dd>
                </div>
              </dl>
              <Link
                href={QUOTE_HREF}
                className="mt-8 inline-flex text-[13px] font-semibold uppercase tracking-[0.12em] text-text-primary underline decoration-accent-primary decoration-1 underline-offset-[8px] hover:decoration-text-primary"
              >
                Get a quote
              </Link>
            </div>
          </div>
        )}

        {/* Pinned to the bottom, so the CTAs line up across a row whatever the text length */}
        <div className="mt-auto pt-10">
          {service.href ? (
            <Link href={service.href} className={`${CTA} after:absolute after:inset-0 focus-visible:outline-none`}>
              View Service
              <ArrowRight className="size-4 text-accent-primary transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls={detailsId}
              className={`${CTA} rounded-chip transition-colors hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary`}
            >
              {open ? 'Hide details' : 'View Service'}
              <ArrowRight
                className={`size-4 text-accent-primary transition-transform duration-300 ${open ? '-rotate-90' : 'motion-safe:group-hover/cta:translate-x-1'}`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
