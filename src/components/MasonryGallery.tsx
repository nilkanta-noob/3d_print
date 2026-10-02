"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import GalleryTile from './GalleryTile';
import { BLUR, altFor, indexLabel, type GalleryItem } from './content/gallery';

/*
 * A grid of photographs, and a lightbox for looking at them properly.
 *
 * Every tile is the same square with the picture cropped to fill it, so the grid reads as a set rather
 * than as a pile of different shapes. Where a crop takes a bite out of the subject, the fix is the
 * per-image objectPosition in the data rather than a special case here.
 *
 * The crop is only the tile. The lightbox shows each photograph whole, uncropped, at its own ratio.
 */
export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [shot, setShot] = useState(0);

  // Where to send focus back to when the lightbox closes.
  const triggers = useRef(new Map<number, HTMLButtonElement>());
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const open = (index: number) => {
    setOpenIndex(index);
    setShot(0);
  };

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) triggers.current.get(current)?.focus();
      return null;
    });
  }, []);

  const item = openIndex === null ? null : items[openIndex];
  // Narrowed for the caption: inside the dialog openIndex is never null, but it is typed as
  // nullable and nothing here tells the compiler that the dialog only renders when it is set.
  const activeIndex = openIndex ?? 0;
  const total = item?.images.length ?? 0;

  const step = useCallback(
    (delta: number) => {
      if (!total) return;
      setShot((current) => (current + delta + total) % total);
    },
    [total],
  );

  // Keyboard: arrows move through the set, Escape closes, and Tab is kept inside the dialog while it is
  // open — a focus ring wandering onto the page behind a full-screen overlay is a trap of its own.
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowRight') {
        step(1);
      } else if (e.key === 'ArrowLeft') {
        step(-1);
      } else if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('button')?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  return (
    <>
      {/* Uniform grid. Items flow left to right and the last row is simply short — nothing stretches
          to fill it, which is what a grid does by default and what a flex row would not. */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-6 lg:grid-cols-4 lg:gap-x-3 lg:gap-y-8">
        {items.map((entry, index) => (
          <GalleryTile
            key={entry.slug}
            item={entry}
            index={index}
            sizes="(min-width: 1024px) 25vw, 50vw"
            label={`Open ${entry.title}`}
            onClick={() => open(index)}
            buttonRef={(el) => {
              if (el) triggers.current.set(index, el);
              else triggers.current.delete(index);
            }}
          />
        ))}
      </div>

      {item && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            // 48px, so a tap or a vertical scroll is not read as a swipe.
            if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
          className="fixed inset-0 z-[80] flex flex-col bg-background/95 p-4 backdrop-blur-sm md:p-8"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-chip p-2 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-2 md:gap-6">
            {total > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="shrink-0 rounded-chip border border-border p-2 text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              >
                <ChevronLeft className="size-5" />
              </button>
            )}

            <div className="relative min-h-0 flex-1 self-stretch">
              <Image
                key={item.images[shot].src}
                src={item.images[shot].src}
                alt={altFor(item)}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-contain"
              />
            </div>

            {total > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="shrink-0 rounded-chip border border-border p-2 text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              >
                <ChevronRight className="size-5" />
              </button>
            )}
          </div>

          {/* The index is carried through from the grid so the thing on screen is still identifiably
              the fourth print, and the note — which the grid never shows — lands here under the title. */}
          <div className="mt-6 shrink-0 text-center">
            <p className="text-[18px] font-medium text-text-primary">
              <span className="font-mono text-text-muted">{indexLabel(activeIndex)}</span>
              <span className="mx-2 text-text-muted" aria-hidden="true">·</span>
              {item.title}
            </p>
            {item.material && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                {item.material}
              </p>
            )}
            {item.note && <p className="mt-1 text-[14px] text-text-muted">{item.note}</p>}
          </div>
        </div>
      )}
    </>
  );
}
