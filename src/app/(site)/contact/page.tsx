import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import { SITE, whatsappHref } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Contact | PrintWarriors',
  description: 'Contact PrintWarriors in Kolkata by email, WhatsApp or the contact form. Delivery across India.',
};

/*
 * One column, one axis, no containers.
 *
 * The page used to be four bordered cards beside a bordered form panel — six rectangles for a page whose
 * whole job is three fields and an address. Everything that was a box is now either a line of type or a
 * hairline rule: the fields sit on rules, the details sit on one line under a rule, and the page carries
 * no fill of its own anywhere. What separates the parts is distance, not edges.
 */
const COLUMN = 'mx-auto w-full max-w-[36rem]';

// The details that used to be cards. A strip, not a grid: three short facts on one line, divided by
// hairlines, at the weight of a caption — the page's smallest type doing the page's smallest job.
function Detail({ children }: { children: React.ReactNode }) {
  return <span className="text-[15px] text-text-secondary">{children}</span>;
}

function Divider() {
  return <span className="hidden h-4 w-px shrink-0 bg-border sm:block" aria-hidden="true" />;
}

export default function ContactPage() {
  const whatsapp = whatsappHref(SITE.whatsappNumber);

  return (
    <>
      <PageHeader
        compact
        align="center"
        spaceAfter="tight"
        eyebrow="Contact"
        title="Talk to us"
        description="Questions about a part, a material or an order? Tell us what you need and we'll come back to you with a straight answer."
        note={
          <>
            Based in {SITE.location}, printing and shipping across India. Prefer email? Write to{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-text-secondary underline decoration-accent-primary underline-offset-4 hover:text-text-primary"
            >
              {SITE.email}
            </a>
            .
          </>
        }
      />

      <section className="bg-background">
        <div className="site-frame pb-28 pt-16 md:pb-36 md:pt-20">
          <h2 className="sr-only">Send a message</h2>
          <div className={COLUMN}>
            <ContactForm />
          </div>

          {/* The one rule on the page that is not a field: it closes the form and opens the details, and
              it is set to the column rather than to the screen so it measures the same thing the form
              does. */}
          <div className={`${COLUMN} mt-24 border-t border-border pt-10 md:mt-28`}>
            <h2 className="sr-only">Contact details</h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Detail>{SITE.location}</Detail>
              <Divider />
              <Detail>
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline decoration-accent-primary decoration-1 underline-offset-[6px] transition-colors hover:text-text-primary"
                >
                  {SITE.email}
                </a>
              </Detail>
              <Divider />
              <Detail>Delivery across India</Detail>
              {/* Appears once SITE.whatsappNumber is set in content/site.ts */}
              {whatsapp && (
                <>
                  <Divider />
                  <Detail>
                    <a href={whatsapp} className="underline decoration-accent-primary decoration-1 underline-offset-[6px] transition-colors hover:text-text-primary">
                      WhatsApp
                    </a>
                  </Detail>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
