"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import ImageSlot from './ImageSlot';
import useMediaQuery from './useMediaQuery';
import { SERVICES } from './content/services';
import { QUOTE_HREF } from './content/site';

// One duration and one easing for everything that moves when a row opens — the row's height, the band,
// the copy and the tile all travel together, which is what makes it read as a single glide.
const OPEN_MS = 420;

export default function ServicesList() {
  // Behaviour only — everything about how the list *looks* is done with CSS media queries, so the
  // server-rendered HTML is already right and there is nothing for hydration to correct.
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // No row is active on the server, which is what a mouse should see. Touch devices open the first
  // row just after hydration (below), so the two HTML outputs still match.
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const headerRefs = useRef(new Map<string, HTMLButtonElement>());

  // A touch device opens the first row; a mouse starts with none open. matchMedia is read here rather
  // than from the hook's value, because during hydration the hook still reports the server's "no match".
  useEffect(() => {
    const touch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setActiveSlug((current) => (touch ? current ?? SERVICES[0].slug : null));
  }, [canHover]);

  // If a taller row above collapses, the row you just opened can be dragged up past the navbar. Only that
  // case scrolls — a tall open row whose bottom runs past the fold is left alone, since scrolling the page
  // for it would feel like the list jumping out from under the click.
  useEffect(() => {
    if (!activeSlug) return;
    const header = headerRefs.current.get(activeSlug);
    if (!header) return;

    const timer = window.setTimeout(() => {
      if (header.getBoundingClientRect().top < 64) {
        header.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }, reducedMotion ? 0 : OPEN_MS);

    return () => window.clearTimeout(timer);
  }, [activeSlug, reducedMotion]);

  // A row opens on click/tap/Enter/Space only — never on hover or on being tabbed onto — so the list
  // never changes under the pointer. Clicking the open row closes it again, which is what the × offers.
  const handleSelect = (slug: string) => {
    setActiveSlug((current) => (current === slug ? null : slug));
  };

  return (
    <div className="relative">
      <ul className="border-t border-border">
        {SERVICES.map((service) => {
          const active = activeSlug === service.slug;
          const detailId = `service-detail-${service.slug}`;

          return (
            <li
              key={service.slug}
              /* Columns: title, a gap the tile floats in, the description, the indicator */
              className="relative border-b border-border md:grid md:grid-cols-[34%_190px_minmax(0,1fr)_2.5rem] lg:grid-cols-[36%_280px_minmax(0,1fr)_2.75rem] xl:grid-cols-[36%_300px_minmax(0,1fr)_3rem]"
            >
              {/* Copper band. It bleeds 16px past the text on both sides — exactly the section's own
                  gutter — so the row reads as a full band rather than a box around the words. It only
                  fades: the row's own height animation supplies the movement, and a second animation on
                  the same box (scaling it open) is what made this feel like a jump. */}
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 -left-4 -right-4 bg-accent-primary motion-safe:transition-opacity motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* The illustration tile, anchored to the middle of its own row. Its size is fixed and only
                  its position follows the row as it grows: a tile that resized every frame meant the
                  drawing and its shadow were re-rendered on each one, which is what made this stutter.
                  Each size is taller than that breakpoint's open row, so it overhangs the band. */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute left-[34%] top-1/2 z-20 ml-[10px] hidden h-[200px] w-[170px] -translate-y-1/2 overflow-hidden rounded-lg border border-border shadow-2xl shadow-black/50 will-change-transform md:block lg:left-[36%] lg:h-[300px] lg:w-[260px] xl:h-[275px] xl:w-[280px] motion-safe:transition-[opacity,transform] motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
              >
                <ImageSlot
                  image={service.image}
                  alt=""
                  variant={service.illustration}
                  surface="elevated"
                  badge={false}
                  sizes="280px"
                  className="h-full w-full"
                />
              </div>

              {/* The trigger covers the whole row (subgrid keeps its parts on the same columns as the
                  text beside it). The quote link can't live inside a button, so the detail block is a
                  sibling that sits on top and lets clicks through everywhere except the link itself. */}
              <button
                ref={(el) => {
                  if (el) headerRefs.current.set(service.slug, el);
                  else headerRefs.current.delete(service.slug);
                }}
                type="button"
                aria-expanded={active}
                aria-controls={detailId}
                onClick={() => handleSelect(service.slug)}
                className={`relative z-10 flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left scroll-mt-20 focus-visible:outline-2 focus-visible:outline-offset-[-4px] md:col-start-1 md:col-end-5 md:row-start-1 md:grid md:grid-cols-subgrid md:items-start md:gap-0 md:py-8 xl:py-10 ${
                  active ? 'focus-visible:outline-on-accent' : 'focus-visible:outline-accent-primary'
                }`}
              >
                <span className="flex min-w-0 items-baseline gap-3 pr-2 md:gap-4 md:pr-6">
                  <span className={`font-mono text-xs tabular-nums ${active ? 'text-on-accent' : 'text-text-muted'}`}>
                    {service.index}
                  </span>
                  <span
                    /* Each word gets its own line from tablets up. Every title is two words, so every row
                       has a two-line title and they all end up the same height — and a single word is
                       narrow enough for the type to be much larger than a one-line title allowed. */
                    className={`font-display text-xl font-bold uppercase leading-[1.05] tracking-[-0.02em] md:text-[1.375rem] lg:text-[1.875rem] xl:text-[2.5rem] 2xl:text-[2.75rem] ${
                      active ? 'text-on-accent' : 'text-text-primary'
                    }`}
                  >
                    {service.title.split(' ').map((word, i) => (
                      <span key={word} className="md:block">
                        {i > 0 && ' '}
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
                {/* Empty cells: the tile floats over this one, the detail block sits on that one */}
                <span aria-hidden="true" className="hidden md:block" />
                <span aria-hidden="true" className="hidden md:block" />
                <span className={`shrink-0 md:justify-self-end md:pt-1 ${active ? 'text-on-accent' : 'text-text-muted'}`}>
                  <Plus
                    aria-hidden="true"
                    className={`size-5 motion-safe:transition-transform motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? 'rotate-45' : ''}`}
                    strokeWidth={1.75}
                  />
                </span>
              </button>

              {/* Closed state: the description on its own. It shares one grid cell with the block below and
                  sets the row's compact height — a closed row reserves no room for the hidden detail. */}
              <p
                aria-hidden={active}
                inert={active}
                className={`hidden text-[15px] leading-relaxed text-text-secondary md:col-start-3 md:row-start-1 md:block md:py-8 md:pr-6 xl:py-10 motion-safe:transition-opacity motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {/* Three lines of room, on an inner box so the row's padding isn't counted towards it
                    (these boxes are border-box, so a min-height on the padded element reserves nothing).
                    That keeps every closed row the same height whether the copy runs to two lines or three. */}
                <span className="md:block md:min-h-[3lh]">{service.description}</span>
              </p>

              {/* Open state: description, the short facts and the quote link — plus the drawing on phones,
                  where there is no floating tile. The height animates open from nothing at every screen
                  size, so only the row you clicked takes up the extra space. */}
              <div
                id={detailId}
                inert={!active}
                className={`pointer-events-none relative z-10 grid md:col-start-3 md:row-start-1 md:py-8 md:pr-6 xl:py-10 motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active ? 'grid-rows-[1fr] md:opacity-100' : 'grid-rows-[0fr] md:opacity-0'
                }`}
              >
                {/* The padding lives on the inner box: padding on the clipped element itself would still
                    add height to a closed row. */}
                <div className="overflow-hidden">
                  {/* The copy rises into place as the panel opens. Un-clipping it alone read as a flash,
                      because the two-line title already sets most of the row's height — so the row itself
                      barely moves and there was little motion to see. */}
                  <div
                    className={`pb-6 md:pb-0 motion-safe:transition-[opacity,transform] motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}
                  >
                  {/* From tablets up the description and the facts hold a fixed number of lines, so an open
                      row comes out the same height — and its copper band the same size — whichever service
                      it is, whether that service's copy runs to two lines or three. */}
                  <p className="text-[15px] leading-relaxed text-on-accent md:min-h-[3lh] xl:min-h-[2lh]">{service.description}</p>

                  {/* The facts and the link share a line from tablets up, which keeps the row short enough
                      for the floating tile to overhang it top and bottom. */}
                  {/* Facts above the button on tablets, beside it on wide screens. Never wrapping means a
                      long facts line can't push the button onto its own row and make that row taller. */}
                  <div className="mt-3 md:mt-4 md:flex md:flex-col md:items-start md:gap-4 xl:flex-row xl:flex-nowrap xl:items-center xl:gap-6">
                    <ul className="flex min-w-0 flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.12em] text-on-accent md:min-h-[3lh]">
                      {service.meta.map((fact, i) => (
                        <li key={fact} className="flex items-center gap-2">
                          {i > 0 && <span aria-hidden="true">·</span>}
                          {fact}
                        </li>
                      ))}
                    </ul>

                    {/* Phones get the drawing inside the panel. The fixed ratio keeps the panel from
                        jumping while the image loads. */}
                    <div aria-hidden="true" className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border md:hidden">
                      <ImageSlot
                        image={service.image}
                        alt=""
                        variant={service.illustration}
                        surface="elevated"
                        badge={false}
                        sizes="100vw"
                        className="h-full w-full"
                      />
                    </div>

                    {/* TODO: the quote form has no service field yet, so ?service= is only carried in the
                        URL. Read it in QueryForm (and preselect a material) when that field exists. */}
                    <Link
                    href={`${QUOTE_HREF}?service=${service.slug}`}
                    tabIndex={active ? undefined : -1}
                      className="pointer-events-auto mt-6 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-on-accent px-5 py-3 text-sm font-semibold text-text-primary transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent md:mt-0"
                    >
                      Get a quote for this
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
