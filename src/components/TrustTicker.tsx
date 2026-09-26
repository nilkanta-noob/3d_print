import React from 'react';
import { TRUST_ITEMS } from './content/site';

// The band between Pricing and Explore: what to expect when ordering, scrolling rightwards and separated
// by a thin copper rule. It runs the full width of the page and belongs to neither section, so it reads as
// the break between them. Decorative, and hidden from screen readers: the same promises are made in the
// sections around it, and the track repeats itself twice over.
//
// Set in the page's own charcoal between two hairlines rather than as a solid copper bar — the copper is
// kept for the rules and reduced to a single accent, so the page has one strong colour plane (the open
// Services row) instead of two competing ones.
export default function TrustTicker() {
  // Each half of the track runs the list three times, so a half is always wider than the screen —
  // otherwise the loop would drag empty space across the viewport before repeating.
  const half = [0, 1, 2].flatMap((pass) => TRUST_ITEMS.map((title) => ({ key: `${pass}-${title}`, title })));

  return (
    <div aria-hidden="true" className="relative w-full select-none overflow-hidden bg-accent-primary py-6">
      {/* Two identical halves on one track: the animation slides it half its width, so the second half
          lands exactly where the first began and the loop has no seam. w-max keeps it all on one line.
          motion-safe: with reduced motion the track simply sits still at the start of the loop. */}
      <div className="flex w-max motion-safe:animate-ticker">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {half.map((item) => (
              <li key={item.key} className="label-micro flex items-center text-on-accent">
                <span className="px-8 sm:px-10">{item.title}</span>
                <span className="h-px w-6 bg-on-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
