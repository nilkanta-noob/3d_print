import React from 'react';
import type { Metadata } from 'next';
import CtaBanner from '@/components/CtaBanner';
import PageTrail from '@/components/PageTrail';
import MasonryGallery from '@/components/MasonryGallery';
import { GALLERY_ITEMS, PRINT_COUNT } from '@/components/content/gallery';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Gallery | 3D Printed Parts by PrintWarriors, Kolkata',
  description:
    'Photographs of real parts printed by PrintWarriors in Kolkata: functional prints, prototypes and everyday pieces.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery | 3D Printed Parts by PrintWarriors, Kolkata',
    description:
      'Photographs of real parts printed by PrintWarriors in Kolkata: functional prints, prototypes and everyday pieces.',
    url: '/gallery',
    // Spelled out because a page-level openGraph replaces the inherited one wholesale, taking the
    // root segment's auto-attached card with it. Next serves the generated image at this path.
    images: ['/opengraph-image'],
  },
};

/*
 * The count that sits opposite the title.
 *
 * It is rendered twice because it belongs in two different places: on a phone it rides the breadcrumb
 * row above the heading, and from 1024px it moves into the right-hand column and sits on the heading's
 * baseline. One element cannot be in both, and a count is two words — cheaper to write twice than to
 * move with grid ordering that has to be read twice to be understood.
 */
function PrintCount({ className = '' }: { className?: string }) {
  return (
    <p className={`font-mono text-[12px] uppercase leading-none tracking-[0.12em] text-accent-primary ${className}`}>
      {PRINT_COUNT} Prints
    </p>
  );
}

/*
 * A compact header and then the pictures.
 *
 * PageHeader is not used here for the same reason it is not used on the quote page: its smallest title
 * is display size and it carries a rule and its own bottom padding, which pushed the first photograph
 * well below the fold. The header is built inline and comes to about 180px.
 */
export default function GalleryPage() {
  return (
    <>
    <section className="bg-background">
      <div className="site-frame pb-28 pt-[calc(var(--nav-height,72px)+2rem)] md:pb-36">
        <header>
          {/* PageTrail is the eyebrow from 760px and the breadcrumb below it; the count rides whichever
              one is showing on a phone, pushed to the far end of the same row. */}
          <div className="flex items-center justify-between gap-4">
            <PageTrail eyebrow="Gallery" page="Gallery" />
            <PrintCount className="lg:hidden" />
          </div>

          {/*
            Two columns from 1024px, and items-end is what puts the right-hand block on the heading's
            baseline rather than level with its top. The right column is auto-width so the heading keeps
            the rest, and minmax(0,1fr) lets the heading's column actually shrink to it.
          */}
          <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-text-primary text-balance">
              Things we&apos;ve printed
            </h1>

            <div className="mt-5 lg:mt-0 lg:text-right">
              <PrintCount className="max-lg:hidden" />
              <p className="mt-3 max-w-[32ch] text-[15px] leading-[1.6] text-text-secondary lg:ml-auto">
                Every photo here is a real print from our team.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 lg:mt-12">
          <MasonryGallery items={GALLERY_ITEMS} />
        </div>

      </div>
    </section>

    {/* The site's own closing band, not a second version of it: same component as the home page, with
        this page's wording passed in. */}
    <CtaBanner
      title="Want something like this printed?"
      description="Send us your file and we'll email you a price within the hour."
      primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
    />
    </>
  );
}
