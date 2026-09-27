import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { SITE, telHref } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Contact | PrintWarriors',
  description: 'Contact PrintWarriors in Kolkata by phone, email or the contact form. Delivery across India.',
};

/*
 * One screen, two columns, nothing boxed.
 *
 * The page is the height of the window and does not scroll: the title holds the left third, the form
 * holds the rest, and a hairline strip of details closes it at the foot. There is no page header
 * component here, because the title and the form are one composition and the space between them is the
 * layout — splitting it across a header's bottom padding and a section's top padding would put the two
 * halves on separate rhythms.
 *
 * The label sits under the title rather than over it. Above, it would be the third small uppercase line
 * on a page that already has one in the navbar; below, it reads as a caption to the title — which is
 * what it is.
 */
// Understated by default and accent on hover — the page's one piece of colour stays on the send action.
const LINK = 'text-text-primary transition-colors duration-200 hover:text-accent-primary';

// A typographic mark, not an icon: it belongs to the line of text it closes.
function OutArrow() {
  return <span className="ml-1.5 align-baseline text-[0.8em]" aria-hidden="true">↗</span>;
}

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

        {/* The foot of the page: three centred lines between two rules, at reading size rather than at
            caption size. It carries what somebody might want instead of the form — a number and an
            address — and it closes the page on its own centre line. */}
        <div className="mx-auto w-full max-w-[48rem] border-y border-border py-8 text-center">
          <h2 className="sr-only">Contact details</h2>
          <p className="text-[1.125rem] leading-[1.4] text-text-secondary">Based in Kolkata, India.</p>
          <p className="mt-3 text-[1.125rem] leading-[1.4]">
            <a href={telHref(SITE.phone)} className={LINK}>
              {SITE.phone}
              <OutArrow />
            </a>
          </p>
          <p className="mt-1.5 text-[1.125rem] leading-[1.4]">
            <a href={`mailto:${SITE.email}`} className={LINK}>
              {SITE.email}
              <OutArrow />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
