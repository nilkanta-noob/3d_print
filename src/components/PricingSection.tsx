import React from 'react';
import { Check } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ButtonLink from './ButtonLink';
import { PRICING_NOTES, PRICING_PLANS } from './content/pricing';
import { QUOTE_HREF } from './content/site';

// Home page pricing: three simple plans instead of a rate table. id="pricing" is the navbar's Pricing target.
export default function PricingSection() {
  return (
    <Section id="pricing" tone="band">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple, per-gram pricing"
        description="You pay for the material your part uses. We email the exact price after reviewing your file."
      />

      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <li
            key={plan.title}
            className={`flex flex-col rounded-2xl border bg-elevated p-8 lg:p-10 ${plan.tag ? 'border-accent-primary/50' : 'border-border'}`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-display font-bold text-text-primary">{plan.title}</h3>
              {plan.tag && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  <span className="size-1.5 rounded-full bg-accent-primary" aria-hidden="true" />
                  {plan.tag}
                </span>
              )}
            </div>

            <p className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold tabular-nums tracking-tight text-text-primary">{plan.rate}</span>
              <span className="text-sm text-text-muted">{plan.rateLabel}</span>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">{plan.description}</p>

            <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-6 text-sm text-text-primary">
              {plan.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" strokeWidth={2.5} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <ButtonLink href={QUOTE_HREF} variant={plan.tag ? 'primary' : 'secondary'} className="mt-10">
              Get a quote
            </ButtonLink>
          </li>
        ))}
      </ul>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-text-muted">
        {PRICING_NOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </Section>
  );
}
