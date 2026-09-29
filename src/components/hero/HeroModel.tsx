"use client";

import React, { useEffect, useRef, useState } from 'react';
import type { HeroScene } from './heroModelScene';

/*
 * The hero object: 3DBenchy, the torture-test boat every printer owner has run.
 *
 * The mesh is a decimated copy of the uploaded model — 225,706 triangles at 11.3MB is a slicer's file,
 * not a hero's. Vertex-clustered to 40,174 at 2.0MB, which at the size this renders is the same
 * silhouette. The original is kept in public/uploads if it is ever needed at full resolution.
 *
 * This component owns everything except the three.js itself, which lives behind a dynamic import so it
 * stays out of the initial bundle. Until that import resolves — and permanently, if WebGL is missing or
 * the import fails — the static render of the same model in the same pose is what is on screen. The box
 * is a fixed aspect ratio at every breakpoint, so nothing moves when the live model takes over.
 */

// The one object in the hero. It used to be a pair with an arrow to cycle between them; the second
// model and its control are gone, so there is no index to track and nothing to swap.
const MODEL = { url: '/hero/benchy.glb', color: '#C9CED6', scaleFactor: 0.9 };
const FALLBACK_IMAGE = '/hero/model-fallback.png';
/*
 * The fallback PNG is cropped tight to the part and rendered from the scene's camera in the scene's
 * resting pose, so sizing it from the same variable the scene frames itself with puts the still and the
 * live part at the same size and the same angle, and the handover is a straight cut.
 *
 * Two variables, because the scene frames on one axis or the other — see modelFillX in heroModelScene.
 * The breakpoint that measures across the canvas sets --fallback-w to its own --model-scale-x as a
 * percentage and --fallback-h to auto; everywhere else these are unset and the height leads, as it
 * always has, with the width following from the image's own aspect.
 */
const FALLBACK_HEIGHT = 'var(--fallback-h, calc(var(--model-scale, 0.7) * 100%))';
const FALLBACK_WIDTH = 'var(--fallback-w, auto)';

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

  /*
   * The scene once it is mounted, held only so the unmount effect below can dispose of it. Nothing
   * swaps it any more: there is a single object, mounted once.
   */
  const sceneRef = useRef<HeroScene | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !supportsWebGL()) return;

    let cancelled = false;

    import('./heroModelScene')
      .then(({ mountHeroModel }) =>
        mountHeroModel({
          host,
          url: MODEL.url,
          color: MODEL.color,
          scaleFactor: MODEL.scaleFactor,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          onReady: () => {
            // Fires synchronously from inside mountHeroModel, after its first draw — the earliest
            // moment the live object has something on screen, and so the moment to fade the still out.
            if (!cancelled) setLive(true);
          },
          // Nothing listens for the first drag any more — the prompt that used to disappear on it is
          // gone — but the scene still announces it, so this absorbs the call.
          onFirstInteraction: () => {},
        }),
      )
      .then((mounted) => {
        if (cancelled) {
          mounted.dispose();
          return;
        }
        sceneRef.current = mounted;
      })
      .catch(() => {
        // A failed chunk, a missing model, a WebGL context that refuses to come up: the static image
        // stays on screen, which is the whole point of having it.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Teardown on unmount. Kept out of the effect above so a re-run of that effect in development does
  // not tear down the canvas it is still bringing up.
  useEffect(
    () => () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    },
    [],
  );

  return (
    // Decorative: the headline beside it carries the meaning, so the whole thing is hidden from
    // assistive technology and nothing inside it is focusable.
    <div ref={hostRef} aria-hidden="true" className={`relative ${className}`}>
      {/* A plain <img>, not next/image: this is a fixed-size decorative asset that has to sit at an
          exact transformed position, which next/image's own layout would fight.
          It is also the page's real Largest Contentful Paint — measured at 1136ms on a cold load at the
          top of the page, the largest thing in the viewport until the canvas takes over — so it carries
          fetchPriority="high". Without the hint the browser ranks a parser-discovered image below the
          fonts and the route's JS, and the hero's only visible content waits behind them. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK_IMAGE}
        alt=""
        aria-hidden="true"
        draggable={false}
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-700"
        style={{
          left: 'calc(var(--focus-x, 0.5) * 100%)',
          height: FALLBACK_HEIGHT,
          width: FALLBACK_WIDTH,
          opacity: live ? 0 : 1,
        }}
      />
    </div>
  );
}
