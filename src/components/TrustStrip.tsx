import React from 'react';
import { Check } from 'lucide-react';
import Section from './Section';
import Eyebrow from './Eyebrow';
import { TRUST_POINTS } from './content/site';

// Horizontal strip of what customers can rely on — plain facts, no invented numbers.
export default function TrustStrip() {
  return (
    <Section tone="band" compact>
      <Eyebrow>Why PrintWarriors</Eyebrow>
      <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {TRUST_POINTS.map((point, index) => (
          <li
            key={point.title}
            className={`bg-surface p-6 ${index === TRUST_POINTS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <Check className="size-5 text-accent-primary" strokeWidth={2} aria-hidden="true" />
            <h3 className="mt-4 text-base font-display font-bold text-text-primary">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{point.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
