"use client";

import React, { useEffect, useRef, useState } from 'react';
import type { HeroScene } from './heroModelScene';

/*
 * The hero object: a 10mm XYZ calibration cube, the part every printer owner has run.
 *
 * This component owns everything except the three.js itself, which lives behind a dynamic import so it
 * stays out of the initial bundle. Until that import resolves — and permanently, if WebGL is missing or
 * the import fails — the static render of the same model in the same pose is what is on screen. The box
 * is a fixed aspect ratio at every breakpoint, so nothing moves when the live model takes over.
 */

const MODEL_URL = '/hero/model.stl';
const FALLBACK_IMAGE = '/hero/model-fallback.png';
// The fallback PNG is square with the model's bounding sphere inscribed, so matching the scene's own
// MODEL_SCALE here puts the still and the live object at exactly the same size.
const FALLBACK_SIZE = '82%';

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

interface HeroModelProps {
  /** Sizing and `--focus-x` for the breakpoint — see the hero section. */
  className?: string;
}

export default function HeroModel({ className = '' }: HeroModelProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  // The only state that matters is whether the live object has taken over. Every failure path — no
  // WebGL, a chunk that will not load, a missing STL — simply leaves this false, which keeps the static
  // image on screen and the drag hint hidden. There is nothing to drag, so there is nothing to say.
  const [live, setLive] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !supportsWebGL()) return;

    let scene: HeroScene | null = null;
    let cancelled = false;

    import('./heroModelScene')
      .then(({ mountHeroModel }) =>
        mountHeroModel({
          host,
          url: MODEL_URL,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          onReady: () => {
            if (!cancelled) setLive(true);
          },
          onFirstInteraction: () => {
            if (!cancelled) setInteracted(true);
          },
        }),
      )
      .then((mounted) => {
        if (cancelled) {
          mounted.dispose();
          return;
        }
        scene = mounted;
      })
      .catch(() => {
        // A failed chunk, a missing STL, a WebGL context that refuses to come up: `live` stays false and
        // the hero keeps the static image rather than a hole.
      });

    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, []);

  return (
    // Decorative: the headline beside it carries the meaning, so the whole thing is hidden from
    // assistive technology and nothing inside it is focusable.
    <div ref={hostRef} aria-hidden="true" className={`relative ${className}`}>
      {/* A plain <img>, not next/image: this is a fixed-size decorative asset that has to sit at an
          exact transformed position, and at 12KB there is nothing for an optimiser to win. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK_IMAGE}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-700"
        style={{
          left: 'calc(var(--focus-x, 0.5) * 100%)',
          height: FALLBACK_SIZE,
          opacity: live ? 0 : 1,
        }}
      />

      {live && (
        <span
          aria-hidden="true"
          className="label-micro pointer-events-none absolute bottom-0 -translate-x-1/2 text-text-muted transition-opacity duration-500"
          style={{ left: 'calc(var(--focus-x, 0.5) * 100%)', opacity: interacted ? 0 : 1 }}
        >
          Drag to rotate
        </span>
      )}
    </div>
  );
}
