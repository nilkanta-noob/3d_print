import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Action {
  href: string;
  label: string;
}

interface CtaBannerProps {
  title: string;
  description?: string;
  primary: Action;
  secondary?: Action;
}

/*
 * The page's closing conversion block, and the one place on the site that inverts.
 *
 * Everything above it is dark, so the accent fill is doing the work a full-height section used to do:
 * it stops the scroll by contrast rather than by taking up a screen. That is why the padding here is
 * ~88px rather than the 96/128/160 the standard Section applies — this deliberately does not go through
 * Section, because its spacing and its background are both the point of the redesign.
 *
 * One centred column at a 700px measure. Anything wider and a two-line heading starts reading as a
 * paragraph; centred, it reads as a statement with a button under it.
 */
export default function CtaBanner({ title, description, primary, secondary }: CtaBannerProps) {
  return (
    <section className="bg-accent-primary py-[5.5rem] text-on-accent">
      <div className="site-frame">
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          {/* Sized well under the section headings above: this block earns attention from the colour it
              sits on, so the type does not have to shout as well. */}
          <h2 className="text-[clamp(1.875rem,5vw,2.5rem)] text-on-accent text-balance">{title}</h2>

          {description && (
            <p className="mt-5 max-w-[46ch] text-base text-on-accent/75 md:text-[17px]">{description}</p>
          )}

          <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            {/* Dark on light — the inverse of every other button on the site, because the surface is
                inverted too. Same geometry, same tracking, same 2px lift. */}
            <Link
              href={primary.href}
              className="hover-lift group inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-background px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-primary [transition-property:transform,background-color] hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background sm:w-auto"
            >
              {primary.label}
              <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
            </Link>

            {secondary && (
              <Link
                href={secondary.href}
                className="hover-lift inline-flex w-full items-center justify-center whitespace-nowrap rounded-control border border-on-accent/25 px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-on-accent [transition-property:transform,border-color] hover:border-on-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background sm:w-auto"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
