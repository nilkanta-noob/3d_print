"use client";

import { useEffect } from 'react';

/*
 * Keeps the page where it should be across a reload.
 *
 * Two different things are wanted from one load, and the browser gets both of them wrong here:
 *
 *  - Arriving at /#materials from a link should land on that section. The browser jumps as soon as it
 *    parses the element, which is well before the page is its final height — the hero's canvas mounts,
 *    next/font swaps both faces, and the photographs resolve, each adding height below the scroll
 *    position. The anchor slides down, the scroll does not follow, and the visitor is left above their
 *    target, in the previous section or at the very top.
 *
 *  - Reloading should leave the visitor exactly where they were. The browser's own restoration loses to
 *    the hash: with #materials in the address bar it jumps to the anchor instead of restoring, so
 *    somebody reading half-way down the section is thrown back to its top edge.
 *
 * So the position is written to sessionStorage as the page scrolls, and on a reload that offset is put
 * back rather than the anchor. A fresh navigation has no stored offset for the page and lands on the
 * anchor as it should.
 *
 * Either way the scroll is re-applied at three points, because one is never enough: after the first
 * frame, once the fonts have finished loading, and at 400ms for anything late.
 */
const key = () => `pw:scroll:${window.location.pathname}`;

export default function HashScroll() {
  useEffect(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigation?.type === 'reload';

    const stored = Number(sessionStorage.getItem(key()));
    const restoreTo = isReload && Number.isFinite(stored) && stored > 0 ? stored : null;

    const hash = window.location.hash.slice(1);
    let anchorId = '';
    try {
      anchorId = decodeURIComponent(hash);
    } catch {
      anchorId = hash;
    }

    // Record the position as it changes, so the next reload has something to go back to.
    //
    // Throttled on a timestamp rather than requestAnimationFrame: rAF does not run while the tab is in
    // the background, and it certainly does not run during unload — an rAF-deferred write on pagehide
    // is a write that never happens, which is exactly the position most worth keeping. The listeners
    // below all write synchronously.
    let lastWrite = 0;
    const save = () => {
      try {
        sessionStorage.setItem(key(), String(Math.round(window.scrollY)));
      } catch {
        /* private mode, or storage is full — the reload falls back to the browser's own guess */
      }
    };
    const onScroll = () => {
      const now = Date.now();
      if (now - lastWrite < 150) return;
      lastWrite = now;
      save();
    };
    const onHide = () => {
      if (document.visibilityState === 'hidden') save();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', onHide);
    const stopRemembering = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', save);
      document.removeEventListener('visibilitychange', onHide);
    };

    if (restoreTo === null && !anchorId) return stopRemembering;

    // Take restoration off the browser while we settle the page, then hand it straight back — leaving it
    // on `manual` for the life of the page would quietly disable it for every later navigation. Recorded
    // as a flag rather than read back later: React invokes this effect twice in development, and the
    // second run would otherwise read the 'manual' the first run set.
    const tookControl = history.scrollRestoration === 'auto';
    if (tookControl) history.scrollRestoration = 'manual';

    let cancelled = false;
    const land = () => {
      if (cancelled) return;
      if (restoreTo !== null) {
        window.scrollTo({ top: restoreTo, behavior: 'auto' });
        return;
      }
      document.getElementById(anchorId)?.scrollIntoView({ block: 'start', behavior: 'auto' });
    };

    const frame = requestAnimationFrame(land);
    const timer = window.setTimeout(() => {
      land();
      if (tookControl) history.scrollRestoration = 'auto';
    }, 400);
    document.fonts?.ready.then(land).catch(() => {});

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      stopRemembering();
      if (tookControl) history.scrollRestoration = 'auto';
    };
  }, []);

  return null;
}
