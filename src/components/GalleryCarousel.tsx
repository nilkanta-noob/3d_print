"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import GalleryTile from './GalleryTile';
import type { GalleryItem } from './content/gallery';

/*
 * The home page's three prints: a three-column grid from 760px, and below that a snapping scroll row
 * that advances itself.
 *
 * One element carries both, because they are the same three tiles either way and a second copy of them
 * would be a second thing to keep in step. Everything timed in here is gated on the row actually being
 * the scroller — see `isPhone` — so nothing runs on the grid.
 */

const AUTO_ADVANCE_MS = 4000;
// How long after the last touch, drag or tap before the row starts moving again. Longer than the
// advance interval on purpose: the point is that it does not take the row back the instant a thumb
// lifts, while someone is still looking at what they scrolled to.
const RESUME_AFTER_MS = 5000;
// A programmatic smooth scroll fires the same scroll events a finger does, and there is no flag on the
// event to tell them apart. So one is set here: scroll events are ignored as interactions until this
// long after the row was told to move. Comfortably longer than a smooth scroll across one tile.
const PROGRAMMATIC_SCROLL_MS = 700;
const PHONE = '(max-width: 759.98px)';

export default function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Every condition that has to hold before the row may advance itself. Kept apart rather than folded
  // into one boolean so each can be answered by the thing that actually knows it.
  const [isPhone, setIsPhone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticUntil = useRef(0);

  // ── What kind of row is this, and is anyone looking at it ─────────────────────────────────────
  useEffect(() => {
    const phone = window.matchMedia(PHONE);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const readPhone = () => setIsPhone(phone.matches);
    const readMotion = () => setReducedMotion(motion.matches);
    readPhone();
    readMotion();
    phone.addEventListener('change', readPhone);
    motion.addEventListener('change', readMotion);
    return () => {
      phone.removeEventListener('change', readPhone);
      motion.removeEventListener('change', readMotion);
    };
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    // Half of it on screen. Below that the row is a strip at the edge of the viewport and advancing it
    // is motion in the corner of someone's eye while they read something else.
    const observer = new IntersectionObserver((entries) => setOnScreen(entries[0]?.isIntersecting ?? false), {
      threshold: 0.5,
    });
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const read = () => setTabVisible(document.visibilityState === 'visible');
    read();
    document.addEventListener('visibilitychange', read);
    return () => document.removeEventListener('visibilitychange', read);
  }, []);

  // ── Moving the row ────────────────────────────────────────────────────────────────────────────
  /*
   * scrollTo on the row itself, never scrollIntoView and never focus(). scrollIntoView would scroll the
   * page vertically as well as the row horizontally, and focus() would drag the caret and the viewport
   * to a tile nobody asked to go to — the one thing an automatic movement must not do.
   *
   * The offset is measured between the tiles rather than from the container, so it is right whatever
   * padding the row is carrying to line its first tile up with the page.
   */
  const scrollToIndex = useCallback((next: number, behavior: ScrollBehavior) => {
    const row = rowRef.current;
    if (!row) return;
    const target = row.children[next] as HTMLElement | undefined;
    const first = row.children[0] as HTMLElement | undefined;
    if (!target || !first) return;
    programmaticUntil.current = Date.now() + PROGRAMMATIC_SCROLL_MS;
    row.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior });
  }, []);

  const noteInteraction = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  // ── The clock ─────────────────────────────────────────────────────────────────────────────────
  const running = isPhone && !reducedMotion && onScreen && tabVisible && !paused;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      const next = (index + 1) % items.length;
      // Wrapping back to the first is a scroll like any other, so the row glides back rather than
      // jumping — which is what makes the last tile feel like part of a loop instead of a dead end.
      scrollToIndex(next, 'smooth');
      setIndex(next);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [running, index, items.length, scrollToIndex]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  // ── Following the row when a finger moves it ──────────────────────────────────────────────────
  const onScroll = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const first = row.children[0] as HTMLElement | undefined;
    const second = row.children[1] as HTMLElement | undefined;
    if (!first || !second) return;
    const step = second.offsetLeft - first.offsetLeft;
    if (step > 0) setIndex(Math.min(items.length - 1, Math.max(0, Math.round(row.scrollLeft / step))));
    // Only a scroll this component did not ask for counts as someone taking over.
    if (Date.now() > programmaticUntil.current) noteInteraction();
  }, [items.length, noteInteraction]);

  return (
    <>
      {/*
        Below 760px: a snapping scroll row. The tiles are 86vw so the next one is always part-visible at
        the right edge, which is what says "there is more" without an arrow to say it.
        The negative inline margin cancels the frame's gutter so the row reaches the edge of the screen,
        and the matching padding puts the first tile back on the page's left edge; scroll-px repeats the
        gutter for the snap positions so a snapped tile lands on that same edge.
        From 760px every bit of that is switched off and it is an ordinary three-column grid.
      */}
      <div
        ref={rowRef}
        onScroll={onScroll}
        onPointerDown={noteInteraction}
        onTouchStart={noteInteraction}
        aria-roledescription={isPhone ? 'carousel' : undefined}
        className="mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto mx-[calc(var(--frame-gutter)*-1)] px-[var(--frame-gutter)] scroll-px-[var(--frame-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[760px]:mx-0 min-[760px]:mt-10 min-[760px]:grid min-[760px]:grid-cols-3 min-[760px]:gap-3 min-[760px]:overflow-visible min-[760px]:px-0"
      >
        {items.map((item) => (
          <GalleryTile
            key={item.slug}
            item={item}
            variant="preview"
            sizes="(min-width: 760px) 33vw, 86vw"
            className="w-[86vw] shrink-0 snap-start min-[760px]:w-auto min-[760px]:shrink min-[760px]:snap-align-none"
            href="/gallery"
            label={`${item.title}, view in gallery`}
          />
        ))}
      </div>

      {/* Phones only: where the row is and how long until it moves. Segments rather than dots, because a
          segment can show the wait as well as the position. */}
      <div className="mt-4 flex gap-1.5 min-[760px]:hidden">
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => {
              noteInteraction();
              setIndex(i);
              scrollToIndex(i, 'smooth');
            }}
            aria-label={`Show ${item.title}, ${i + 1} of ${items.length}`}
            aria-current={i === index ? 'true' : undefined}
            className="group h-6 w-6 shrink-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          >
            {/* The target is 24px tall for a thumb; the mark inside it is the 2px the design asks for. */}
            <span className="block h-[3px] w-6 overflow-hidden bg-white/[0.18]">
              <span
                /* Remounted on every change of active tile, so the fill restarts from empty rather than
                   carrying on from wherever the last one had got to. */
                key={`${index}-${running}`}
                className={`block h-full w-full origin-left bg-accent-primary ${
                  i === index ? 'animate-[gallery-progress_4s_linear_forwards]' : ''
                }`}
                style={{
                  transform: i < index ? 'scaleX(1)' : i > index ? 'scaleX(0)' : undefined,
                  // A stopped row should not keep filling its bar: frozen where it got to, and it picks
                  // up from there when the row starts again.
                  animationPlayState: running ? 'running' : 'paused',
                }}
              />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
