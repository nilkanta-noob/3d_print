"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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

const MODELS = [
  { url: '/hero/benchy.glb', color: '#60a5fa', scaleFactor: 0.9 }, // Lighter blue benchy
  { url: '/hero/puppydog.glb', color: '#8b5cf6', scaleFactor: 0.72 }, // Purple dog (20% smaller)
  { url: '/hero/C17.glb', color: '#fffff0', scaleFactor: 0.7, rotation: [0, 0, 0] as [number, number, number] } // Ivory plane (no X rotation so it sits level)
];
const FALLBACK_IMAGE = '/hero/model-fallback.png';
// The fallback PNG is cropped tight to the part's own height and rendered from the scene's camera, so
// reading the same --model-scale the scene reads puts the still and the live part at the same size and
// the same angle. Its width follows from the image's own aspect.
const FALLBACK_SIZE = 'calc(var(--model-scale, 0.7) * 100%)';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextModel = () => {
    setCurrentIndex((prev) => (prev + 1) % MODELS.length);
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !supportsWebGL()) return;

    let scene: HeroScene | null = null;
    let cancelled = false;

    import('./heroModelScene')
      .then(({ mountHeroModel }) =>
        mountHeroModel({
          host,
          url: MODELS[currentIndex].url,
          color: MODELS[currentIndex].color,
          scaleFactor: MODELS[currentIndex].scaleFactor,
          rotation: MODELS[currentIndex].rotation,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          onReady: () => {
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
  }, [currentIndex]);

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
        className="pointer-events-none absolute top-1/2 w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-700"
        style={{
          left: 'calc(var(--focus-x, 0.5) * 100%)',
          height: FALLBACK_SIZE,
          opacity: (live || currentIndex !== 0) ? 0 : 1,
        }}
      />

      {live && (
        <button
          onClick={nextModel}
          aria-label="Next 3D model"
          className="pointer-events-auto absolute right-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-background/50 p-3 text-text-primary backdrop-blur-sm transition-colors hover:bg-accent-primary hover:text-on-accent md:right-8"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
