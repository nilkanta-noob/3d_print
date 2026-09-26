"use client";

import React, { useState } from 'react';
import type { TitledText } from './content/site';

interface ValueChipsProps {
  values: TitledText[];
}

/*
 * The four values as a row of chips with one shared detail line, instead of four boxes each carrying a
 * sentence that was on screen whether or not anyone wanted it.
 *
 * Selection is on click rather than hover. Hover-only detail is unreachable on a phone — there is no
 * hover there, so the sentence would simply never be readable — and these are buttons in a list, so tap,
 * Enter and Space all work. Hover still lights the chip; it just does not change what is written below.
 *
 * The detail line reserves its height, so switching chips never moves the section under the reader.
 */
export default function ValueChips({ values }: ValueChipsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 md:mt-16">
      <ul className="flex flex-wrap gap-2.5">
        {values.map((value, index) => {
          const selected = index === active;
          return (
            <li key={value.title}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={selected}
                className={`label-micro rounded-control border px-4 py-2.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary ${
                  selected
                    ? 'border-accent-primary/50 bg-accent-primary/[0.08] text-accent-primary'
                    : 'border-border text-text-secondary hover:border-text-primary/30 hover:text-text-primary'
                }`}
              >
                {value.title}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 max-w-[52ch] min-h-[3lh] text-base text-text-secondary md:min-h-[2lh] md:text-[17px]">
        {values[active].body}
      </p>
    </div>
  );
}
