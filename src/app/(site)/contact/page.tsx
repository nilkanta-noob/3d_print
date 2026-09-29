import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | PrintWarriors',
  description: 'Contact PrintWarriors in Kolkata by phone, email or the contact form. Delivery across India.',
};

/*
 * One screen, two columns, nothing boxed.
 *
 * The page is the height of the window and does not scroll: the title holds the left third and the form
 * holds the rest. There is no page header component here, because the title and the form are one
 * composition and the space between them is the layout — splitting it across a header's bottom padding
 * and a section's top padding would put the two halves on separate rhythms.
 *
 * The label sits under the title rather than over it. Above, it would be the third small uppercase line
 * on a page that already has one in the navbar; below, it reads as a caption to the title — which is
 * what it is.
 *
 * The number and address that used to close the page are gone; the footer carries them on every page,
 * and a second copy directly above it was the same information twice.
 */
export default function ContactPage() {
  return (
    <section className="bg-background">
      <div className="site-frame flex min-h-svh flex-col pb-8 pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="flex flex-1 items-center py-10">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] lg:items-start lg:gap-20">
            <div>
              <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] text-text-primary text-balance">Let&apos;s talk.</h1>
              <p className="label-micro mt-6 text-text-muted">Project enquiry</p>
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
