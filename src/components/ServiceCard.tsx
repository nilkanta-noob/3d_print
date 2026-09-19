import React from 'react';
import ButtonLink from './ButtonLink';
import type { Service } from './content/services';
import { QUOTE_HREF } from './content/site';

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <article id={service.slug} className="flex scroll-mt-24 flex-col rounded-2xl border border-border bg-elevated p-7 md:p-9">
      <Icon className="size-6 text-accent-primary" strokeWidth={1.5} aria-hidden="true" />
      <h2 className="mt-6 text-2xl font-display font-bold text-text-primary">{service.title}</h2>
      <p className="mt-3 text-base leading-relaxed text-text-secondary">{service.description}</p>

      <dl className="mt-8 flex-1 space-y-5 border-t border-border pt-6 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Who it&apos;s for</dt>
          <dd className="mt-1.5 text-text-primary">{service.audience}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Typical turnaround</dt>
          <dd className="mt-1.5 text-text-primary">{service.turnaround}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Recommended materials</dt>
          <dd className="mt-1.5 text-text-primary">{service.materials}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <ButtonLink href={QUOTE_HREF}>Get a quote</ButtonLink>
      </div>
    </article>
  );
}
