import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PageTrail from '@/components/PageTrail';

export const metadata: Metadata = {
  title: 'Contact PrintWarriors | 3D Printing in Kolkata',
  description:
    'Contact PrintWarriors in Kolkata by phone, email or the enquiry form. 3D printing delivered across India.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact PrintWarriors | 3D Printing in Kolkata',
    description:
      'Contact PrintWarriors in Kolkata by phone, email or the enquiry form. 3D printing delivered across India.',
    url: '/contact',
    // Spelled out because a page-level openGraph replaces the inherited one wholesale, taking the
    // root segment's auto-attached card with it. Next serves the generated image at this path.
    images: ['/opengraph-image'],
  },
};

/*
 * Two columns from lg, one column below it.
 *
 * From lg the page is the height of the window and does not scroll: the title holds the left third and
 * the form holds the rest, centred between the bar and the footer. Below lg none of that applies — the
 * page is an ordinary stacked one whose height comes from its content. A full-screen floor there, with
 * the content centred inside it, was what put a band of empty page above the title on a phone: there is
 * less content than screen, and every spare pixel went into the gap above and below it.
 *
 * There is no page header component here, because the title and the form are one composition and the
 * space between them is the layout — splitting it across a header's bottom padding and a section's top
 * padding would put the two halves on separate rhythms.
 *
 * The label is the site's shared Eyebrow — short accent rule, then small uppercase type — and so it sits
 * above the title, which is where that component is built to go and where every other page puts it.
 *
 * The number and address that used to close the page are gone, and nothing of that kind belongs above
 * the form either: the footer carries them on every page, and a second copy on this one is the same
 * information twice.
 */
export default function ContactPage() {
  return (
    <section className="bg-background">
      <div className="site-frame flex flex-col pb-16 pt-[calc(var(--nav-height,72px)+40px)] lg:min-h-svh lg:pb-8">
        <div className="flex items-start lg:flex-1 lg:items-center lg:py-10">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] lg:items-start lg:gap-20">
            <div>
              <PageTrail eyebrow="Project enquiry" page="Contact" />
              <h1 className="mt-4 text-[clamp(2.75rem,5.5vw,4.5rem)] text-text-primary text-balance">Let&apos;s talk.</h1>
            </div>

            <div>
              <h2 className="sr-only">Send an enquiry</h2>
              <ContactForm />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
