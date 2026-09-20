import React from 'react';
import { TRUST_ITEMS } from './content/site';

// Copper ticker between Pricing and Explore: what to expect when ordering, scrolling rightwards and
// separated by //. It runs the full width of the page and its colour belongs to neither section, so it
// reads as the break between them. Decorative, and hidden from screen readers: the same promises are
// made in the sections around it, and the track repeats itself twice over.
export default function TrustTicker() {
  // Each half of the track runs the list three times, so a half is always wider than the screen —
  // otherwise the loop would drag empty copper across the viewport before repeating.
  const half = [0, 1, 2].flatMap((pass) => TRUST_ITEMS.map((title) => ({ key: `${pass}-${title}`, title })));

  return (
    <div aria-hidden="true" className="relative w-full overflow-hidden bg-accent-primary py-4 select-none">
      {/* Two identical halves on one track: the animation slides it half its width, so the second half
          lands exactly where the first began and the loop has no seam. w-max keeps it all on one line.
          motion-safe: with reduced motion the track simply sits still at the start of the loop. */}
      <div className="flex w-max motion-safe:animate-ticker">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {half.map((item) => (
              <li
                key={item.key}
                className="flex items-center font-display text-sm font-bold uppercase tracking-[0.2em] text-on-accent sm:text-base"
              >
                <span className="px-6 sm:px-8">{item.title}</span>
                <span className="font-mono text-on-accent/50">{'\\\\'}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
