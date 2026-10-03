import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import GalleryCarousel from './GalleryCarousel';
import Section from './Section';
import { GALLERY_ITEMS } from './content/gallery';

// Whichever items the data marks for the home page, in the order they are written there.
const PREVIEW = GALLERY_ITEMS.filter((item) => item.showOnHome);

/*
 * The link out to the gallery, beside the heading at every width.
 *
 * The words shorten on a phone rather than the link disappearing: at 32px the heading leaves room for
 * "See all" but not for the full label, and a heading with nothing opposite it reads as an unfinished
 * row. Only the visible span is in the accessible name — the other is display:none.
 */
function HeaderLink() {
  return (
    <Link
      href="/gallery"
      className="group -my-[10px] inline-flex items-center gap-2 py-[10px] text-[14px] text-text-primary underline underline-offset-4 transition-colors hover:text-accent-primary focus-visible:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
    >
      <span className="min-[760px]:hidden">See all</span>
      <span className="max-[759.98px]:hidden">See all prints</span>
      <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

/*
 * Three prints on the home page, as a taste of the gallery.
 *
 * On the page background rather than a surface: it sits between the pricing table, which is the only
 * section on the elevated tone, and the accent band that closes the page, so it needs to be clearly
 * neither.
 *
 * Section's own rhythm is 96/128/160, which is more air than this section wants between a heading and
 * three pictures, so the padding is overridden to a flat 56 on phones and 88 above. The override has to
 * reach the inner frame, which is where Section puts its padding, hence the child selector.
 */
export default function GalleryPreview() {
  return (
    <Section tone="base" className="[&>div]:py-14 md:[&>div]:py-[88px]">
      {/* items-end rather than items-baseline: the left side is a block of two lines, and baseline
          alignment would hang the link off the eyebrow's baseline rather than the heading's. */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="mt-6 text-[32px] text-text-primary text-balance md:text-[40px]">Printed by us</h2>
        </div>
        <HeaderLink />
      </div>

      <GalleryCarousel items={PREVIEW} />

    </Section>
  );
}
