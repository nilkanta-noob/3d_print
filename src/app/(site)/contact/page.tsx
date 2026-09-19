import React from 'react';
import type { Metadata } from 'next';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import { SITE, whatsappHref } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Contact | PrintWarriors',
  description: 'Contact PrintWarriors in Kolkata — email, WhatsApp order updates, and delivery across West Bengal and India.',
};

const COVERAGE = [
  { title: 'Kolkata', body: 'On-demand delivery via Porter, plus B2B drop-off and pickup with no minimum order. Pay by UPI or cash on pickup.' },
  { title: 'West Bengal', body: 'Courier delivery across the state, typically 3–4 business days from order confirmation.' },
  { title: 'Pan-India shipping', body: 'Standard courier anywhere in India. Prepaid via UPI, and free on orders above ₹599.' },
];

export default function ContactPage() {
  const whatsapp = whatsappHref(SITE.whatsappNumber);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        description="Questions about a part, a material or an order? Email us or send a message below."
      />

      <Section tone="band">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 lg:col-span-5">
            <h2 className="sr-only">Contact information</h2>
            <div className="rounded-xl border border-border bg-elevated p-6">
              <Mail className="size-5 text-accent-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Email</h3>
              <a href={`mailto:${SITE.email}`} className="mt-2 inline-block font-display text-lg font-bold text-text-primary underline decoration-accent-primary decoration-2 underline-offset-[6px] hover:decoration-text-primary">
                {SITE.email}
              </a>
            </div>
            <div className="rounded-xl border border-border bg-elevated p-6">
              <MessageCircle className="size-5 text-accent-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">WhatsApp</h3>
              {whatsapp ? (
                <a href={whatsapp} className="mt-2 inline-block font-display text-lg font-bold text-text-primary underline decoration-accent-primary decoration-2 underline-offset-[6px] hover:decoration-text-primary">
                  Message us on WhatsApp
                </a>
              ) : (
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">Order updates are shared directly on WhatsApp.</p>
              )}
            </div>
            <div className="rounded-xl border border-border bg-elevated p-6">
              <MapPin className="size-5 text-accent-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Service area</h3>
              <p className="mt-2 font-display text-lg font-bold text-text-primary">{SITE.location}</p>
              <p className="mt-1 text-[15px] text-text-secondary">Shipping across India.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-elevated p-6 md:p-10 lg:col-span-7">
            <h2 className="font-display text-2xl font-bold text-text-primary">Send a message</h2>
            <p className="mt-2 mb-8 text-[15px] text-text-secondary">For quotes, the quote form is faster — it includes your file.</p>
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section id="coverage">
        <SectionHeading eyebrow="Service coverage" title="Where we deliver" />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {COVERAGE.map((area) => (
            <li key={area.title} className="rounded-xl border border-border bg-elevated p-7">
              <span className="block h-px w-8 bg-accent-primary" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-display font-bold text-text-primary">{area.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{area.body}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
