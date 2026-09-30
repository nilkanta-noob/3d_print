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
 * How long the still takes to hand over to the canvas. The scene waits the same 300ms before it starts
 * the object turning, so the two pictures are still the same picture for as long as both are visible.
 */
const CROSSFADE_MS = 300;

/*
 * The fraction of the fallback PNG's height that the part occupies.
 *
 * The still is a square frame of the whole canvas, not a crop of the part, which is the point: an image
 * cropped to the silhouette has to be scaled by the part's bounding box to line up, and a bounding box
 * is not a silhouette — that gap is what used to make the still and the live part disagree. A full frame
 * has no such gap. The cost is that the part no longer fills its own image, so a breakpoint that wants
 * the part at `--model-scale` of the box has to ask for the IMAGE at --model-scale / this.
 *
 * Measured off the generated asset: see `npm run dev` + ?capture-fallback below. Re-measure it if the
 * still is ever regenerated at a different CAPTURE_FILL_X.
 */
const CAPTURE_FILL = 0.8824;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/*
 * Development helper. Visit the home page as
 *
 *     http://localhost:3000/?capture-fallback
 *
 * and the scene renders one square 1200x1200 frame of the part on a transparent background, in the
 * resting pose, and downloads it as model-fallback.png. Drop that file into public/hero/ to replace the
 * still. It is gated on NODE_ENV so the query string does nothing in a production build.
 */
function captureRequested(): boolean {
  if (process.env.NODE_ENV !== 'development') return false;
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('capture-fallback');
}

function downloadStill(dataUrl: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'model-fallback.png';
  document.body.appendChild(link);
  link.click();
  link.remove();
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
    const capture = captureRequested();

    import('./heroModelScene')
      .then(({ mountHeroModel }) =>
        mountHeroModel({
          host,
          url: MODEL.url,
          color: MODEL.color,
          scaleFactor: MODEL.scaleFactor,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          capture,
          onReady: () => {
            // Fires synchronously from inside mountHeroModel, after its first draw — the earliest
            // moment the live object has something on screen, and so the moment to start the handover.
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
        if (capture) downloadStill(mounted.captureStill(1200));
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
    //
    // --capture-fill is published here rather than in globals.css because it is a property of the PNG,
    // not of the design: the breakpoints below divide their --model-scale by it to turn "how big the
    // part should be" into "how big the image should be".
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`relative ${className}`}
      style={{ '--capture-fill': CAPTURE_FILL } as React.CSSProperties}
    >
      {/* A plain <img>, not next/image: this is a decorative asset that has to sit at an exact
          transformed position, which next/image's own layout would fight.
          It is also the page's real Largest Contentful Paint — measured at 1136ms on a cold load at the
          top of the page, the largest thing in the viewport until the canvas takes over — so it carries
          fetchPriority="high". Without the hint the browser ranks a parser-discovered image below the
          fonts and the route's JS, and the hero's only visible content waits behind them.

          Sized on height and placed on --focus-x, because that is how the scene frames itself: the
          camera sets the part's size as a fraction of the canvas HEIGHT and its position across the
          canvas from --focus-x. Fitting the image to the box instead would only agree with the scene
          where the box happens to be square — which is the phone, where --fallback-scale is 1 and this
          collapses to exactly "fill the box" anyway. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK_IMAGE}
        alt=""
        aria-hidden="true"
        draggable={false}
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain transition-opacity"
        style={{
          left: 'calc(var(--focus-x, 0.5) * 100%)',
          height: 'calc(var(--fallback-scale, 1) * 100%)',
          width: 'auto',
          opacity: live ? 0 : 1,
          transitionDuration: `${CROSSFADE_MS}ms`,
        }}
      />
    </div>
  );
}
