"use client";

import React, { useState } from 'react';
import Eyebrow from './Eyebrow';
import ButtonLink from './ButtonLink';
import type { ProcessStep } from './content/site';

interface ProcessShowcaseProps {
  steps: ProcessStep[];
  eyebrow: string;
  title: string;
  description: string;
  action: { href: string; label: string };
}

/*
 * Mission and process in one section: the argument on the left, the four steps on the right.
 *
 * They used to be two sections that each opened with an eyebrow, a display heading and a row of four
 * things — the same shape twice in a row, which is what made the page read as a template. Here the
 * heading states the aim once and the steps sit beside it as the evidence, so the section makes its
 * point in one movement rather than two.
 *
 * Only the open step carries its description. The others are a number and a name, which is enough to
 * show how many there are and where you are in them; a paragraph on each was four paragraphs competing
 * for the same attention. The first step is open on load and nothing moves on its own — the section
 * only ever changes because someone clicked it.
 */
export default function ProcessShowcase({ steps, eyebrow, title, description, action }: ProcessShowcaseProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-24">
      {/* The paragraph and the button sit at the foot of the column, so the heading has air under it and
          the two columns agree at the bottom rather than at the top. */}
      <div className="lg:flex lg:flex-col">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-[clamp(2rem,6vw,2.25rem)] sm:text-[clamp(2.5rem,4vw,3.5rem)] text-text-primary text-balance">
            {title}
          </h2>
        </div>

        <div className="mt-10 lg:mt-auto lg:pt-16">
          <p className="max-w-[46ch] text-base text-text-secondary md:text-[17px]">{description}</p>
          <ButtonLink href={action.href} className="mt-8">
            {action.label}
          </ButtonLink>
        </div>
      </div>

      <ol>
        {steps.map((step, index) => {
          const open = index === active;
          return (
            <li key={step.title} className="border-b border-border last:border-b-0">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-expanded={open}
                className="block w-full py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent-primary"
              >
                <span className="grid grid-cols-[1.875rem_minmax(0,1fr)] items-baseline gap-x-6 md:grid-cols-[2.125rem_minmax(0,1fr)] md:gap-x-7">
                  {/* The number holds its own column and the copy holds the next one, so the title, the
                      description and the bar all start on one edge instead of hanging under the numeral.
                      The column is a fixed width rather than auto because General Sans has no tabular
                      figures — font-variant-numeric had no effect and 01 measured 7px narrower than 04,
                      which left the four titles on a ragged edge. */}
                  <span
                    className={`font-display text-[1.375rem] tracking-[-0.02em] transition-colors duration-300 md:text-[1.7rem] ${
                      open ? 'text-accent-primary' : 'text-text-muted'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="block">
                    <span
                      className={`block font-display text-xl tracking-[-0.02em] transition-colors duration-300 md:text-2xl ${
                        open ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {step.title}
                    </span>

                    {/* Height animates from nothing, so a closed row reserves no space for the copy it is
                        not showing and only the open one grows. */}
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[46ch] pt-3 text-[15px] text-text-secondary">
                          {step.body}
                        </span>

                        {/* How far through the four this step is — one quarter at 01, all of it at 04 —
                            rather than a countdown to the next one. It says where you are in the process,
                            which is the thing the list is describing. */}
                        <span className="mt-5 block h-px w-full bg-border">
                          <span
                            className="block h-px origin-left bg-accent-primary transition-transform duration-500 ease-out"
                            style={{ transform: `scaleX(${(index + 1) / steps.length})` }}
                          />
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
