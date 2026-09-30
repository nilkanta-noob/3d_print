import React from 'react';
import type { Metadata } from 'next';
import CtaBanner from '@/components/CtaBanner';
import PageTrail from '@/components/PageTrail';
import MasonryGallery from '@/components/MasonryGallery';
import { GALLERY_ITEMS } from '@/components/content/gallery';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Gallery | PrintWarriors',
  description: 'Photographs of parts printed by PrintWarriors: functional prints, prototypes and everyday pieces.',
};

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
        <header className="max-w-[46rem]">
          <PageTrail eyebrow="Gallery" page="Gallery" />
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-text-primary">Things we&apos;ve printed</h1>
          <p className="mt-4 text-[17px] leading-[1.6] text-text-secondary">
            Every photo here is a real print from our team.
          </p>
        </header>

        <div className="mt-12">
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
