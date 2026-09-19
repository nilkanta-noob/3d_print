import React from 'react';
import { Check } from 'lucide-react';
import { TRUST_ITEMS } from './content/site';

// Slim strip of plain facts directly under the hero.
export default function TrustStrip() {
  return (
    <section aria-label="Why PrintWarriors" className="border-b border-border bg-surface">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 py-6 sm:grid-cols-3 xl:flex xl:items-center xl:justify-between xl:py-5">
          {TRUST_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-text-primary">
              <Check className="size-4 shrink-0 text-accent-primary" strokeWidth={2.5} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
