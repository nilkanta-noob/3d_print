"use client";

import { useCallback, useSyncExternalStore } from 'react';

// Reads a media query as React state. The server snapshot is always false, so the server-rendered HTML is
// the "no match" case and hydration can't mismatch — components decide what to do once the real value arrives.
// Use CSS media queries for looks, and this only for behaviour (e.g. whether hovering should select a row).
export default function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
