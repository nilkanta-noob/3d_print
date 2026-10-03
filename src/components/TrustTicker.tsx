import React from 'react';
import { TRUST_ITEMS } from './content/site';

/*
 * The band under the hero: what to expect when ordering, scrolling rightwards on the accent.
 *
 * The track is the list six times over — three passes in each of two identical halves — because the
 * animation slides the track half its width, so the second half has to land exactly where the first
 * began for the loop to have no seam, and a half has to be wider than the widest screen or the loop
 * would drag empty space across the viewport before repeating.
 *
 * All of that repetition is for the eye only. One pass is left in the accessibility tree and the other
 * five are hidden, so the list is announced once rather than six times.
 */
export default function TrustTicker() {
  const passes = [0, 1, 2];

  return (
    // group: the animation lives on the track, but the strip's padding is not part of it, so the pause
    // is driven from the band the pointer is actually over.
    <div className="group relative w-full select-none overflow-hidden bg-accent-primary py-6">
      {/* motion-safe: with reduced motion the class is never applied, so the track simply sits still at
          the start of the loop and reads as a static row. */}
      <div className="flex w-max motion-safe:animate-ticker motion-safe:group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {passes.flatMap((pass) =>
              TRUST_ITEMS.map((title) => {
                const announced = copy === 0 && pass === 0;
                return (
                  <li
                    key={`${copy}-${pass}-${title}`}
                    aria-hidden={announced ? undefined : true}
                    className="label-micro flex items-center text-on-accent"
                  >
                    <span className="px-8 sm:px-10">{title}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-on-accent" />
                  </li>
                );
              }),
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}
