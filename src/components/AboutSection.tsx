import React from 'react';
import Image from 'next/image';
import PageTrail from './PageTrail';
import { formatRate, getMaterial } from './content/materials';

const PLA = getMaterial('pla');

// The claims that sit under the argument, at caption size. Three short ones on one line rather than a
// fourth paragraph: they are the terms of trade, not part of the prose.
const CLAIMS = ['No minimum order', 'Manual review', 'Fast delivery'];

const FACTS = [
  { label: 'Based in', value: 'Kolkata', accent: false },
  { label: 'Delivery', value: '3–4 days', accent: true },
  // Read from the materials data so the badge cannot disagree with the pricing section below it.
  { label: 'Student rate', value: `${formatRate(PLA.pricePerGram.student ?? PLA.pricePerGram.standard)}/g`, accent: true },
];

/*
 * The printer itself. The frame carries the photograph's own ratio — 1181x1600 — rather than a tidy 4:5,
 * because the machine fills its frame to all four edges: at 4:5 object-cover would take 124px off the
 * height, which is the light bar at the top and the base at the bottom. Matching the ratio means cover
 * crops nothing at any width.
 *
 * Replacing the photo means changing the ratio with it, or the crop comes back.
 */
const PORTRAIT = {
  src: '/explore_images/creality-3d_result.webp',
  alt: 'The studio printer part-way through a job, filament feeding into the hot end',
  ratio: '1181/1600',
};

/*
 * The whole of the About page's opening, in one section.
 *
 * It used to be two: a page header with a title and a standfirst, then a separate story section that
 * opened with its own eyebrow and its own heading and said much the same thing again. Two headings for
 * one idea is what made the page read as a template. Here the label, the heading and the argument hold
 * one 620px column, the photograph holds the column beside it, and the figures sit under both — one
 * statement, one piece of evidence, one set of numbers.
 *
 * The measure is deliberate. Prose set at 20px needs a column it can be read in: 620px is roughly 62
 * characters at this size, which is the width a paragraph wants, and it is why the text column is
 * capped rather than sharing the grid's spare space with the image.
 */
export default function AboutSection() {
  return (
    <section id="story" className="bg-surface">
      {/* 48px of air at each end on a phone. The top figure is 48px ON TOP OF --nav-height, not
          instead of it: the bar is fixed, so whatever this section reserves for it is the only thing
          keeping the heading out from under it. */}
      <div className="site-frame pb-12 pt-[calc(var(--nav-height,72px)+48px)] min-[760px]:pb-24 min-[760px]:pt-[calc(var(--nav-height,72px)+4rem)] md:pb-32 md:pt-[calc(var(--nav-height,72px)+5.5rem)]">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Tops aligned, not centres: the photograph starts on the same line as the eyebrow, so the
              two columns open together and the section has one top edge rather than two. */}
          <div className="grid gap-14 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] lg:items-start lg:gap-24 xl:gap-32">
            <div className="max-w-[620px]">
              <PageTrail eyebrow="About" page="About" />

              {/* Set to match the Mission heading further down the page exactly — the same size ramp,
                  and the h2 scale's weight, tracking and leading rather than the h1 scale's. The element
                  stays an h1 because it is the page's title; only its appearance is borrowed, and it is
                  done here so no other page's title moves.

                  The break is set rather than left to the balancer: the line wants to fall after
                  "bring" at every width wide enough to hold two lines. Below 640px it flows. */}
              <h1 className="mt-8 text-[clamp(2rem,6vw,2.25rem)] font-semibold leading-[1] tracking-[-0.03em] text-text-primary sm:text-[clamp(2.5rem,4vw,3.5rem)]">
                Built to bring <span className="sm:block">ideas to life.</span>
              </h1>

              <div className="mt-10 space-y-7 text-[1.25rem] leading-[1.7] text-text-secondary md:mt-12">
                <p>
                  PrintWarriors is a Kolkata-based 3D printing studio making prototyping accessible for
                  students, makers, engineers and startups.
                </p>
                <p>
                  We print one-off parts, prototypes and custom components with transparent pricing, fast
                  turnaround and no minimum order quantity.
                </p>
                <p>
                  Every file is reviewed manually before printing to check wall thickness, tolerances and
                  printability.
                </p>
              </div>

              <ul className="label-micro mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-text-muted md:mt-12">
                {CLAIMS.map((claim, i) => (
                  <li key={claim} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true">·</span>}
                    {claim}
                  </li>
                ))}
              </ul>
            </div>

            {/* priority: this sits at the top of the page beside the heading, so it is a candidate for
                the largest paint. Lazy-loading it would hold the section's right half empty until the
                observer fired. */}
            <div
              className="relative w-full overflow-hidden border border-border"
              style={{ aspectRatio: PORTRAIT.ratio }}
            >
              <Image
                src={PORTRAIT.src}
                alt={PORTRAIT.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* The three figures that back the argument above. They are the only concrete claims on the
              page, so they are set at display size with the label underneath, and the two a visitor is
              actually weighing up carry the accent. */}
          {/* Three columns at every width. On a phone they are held apart by a hairline between them
              rather than by a gap, which is what lets three figures share 312px of frame at 360px wide
              without any of them wrapping; from 760px the rule goes and the 40px gap comes back.
              24px of the 48px above them sits over the border and 24px under it, so the rule lands in
              the middle of the space rather than against the figures. */}
          <dl className="mt-6 grid grid-cols-3 border-t border-border pt-6 min-[760px]:mt-20 min-[760px]:gap-10 min-[760px]:pt-10 md:mt-24">
            {FACTS.map((fact, index) => (
              // Reversed, so the figure reads first and its label sits underneath — while the markup keeps
              // the term before its definition, which is the order a description list has to be written in.
              <div
                key={fact.label}
                className={`flex flex-col-reverse items-center px-3 text-center min-[760px]:items-start min-[760px]:px-0 min-[760px]:text-left ${
                  index > 0 ? 'border-l border-border min-[760px]:border-l-0' : ''
                }`}
              >
                {/* The properties are written out rather than taken from label-micro, because two of them
                    have to change on a phone and a utility competing with label-micro for font-size would
                    be settled by the order of the stylesheet rather than by this line. From 760px the
                    values are label-micro's own, so nothing moves there. */}
                <dt className="mt-1.5 text-[10px] font-medium uppercase leading-[1.2] tracking-[0.08em] text-text-muted min-[760px]:mt-3 min-[760px]:text-[11px] min-[760px]:tracking-[0.12em]">
                  {fact.label}
                </dt>
                <dd
                  className={`font-display text-[20px] font-bold leading-[1.05] tracking-[-0.035em] min-[760px]:text-[clamp(1.875rem,2.8vw,2.375rem)] min-[760px]:font-semibold ${
                    fact.accent ? 'text-accent-primary' : 'text-text-primary'
                  }`}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
