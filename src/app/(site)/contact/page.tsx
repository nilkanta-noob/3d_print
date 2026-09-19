import React from 'react';
import type { Metadata } from 'next';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { BUTTON_BASE, BUTTON_VARIANTS } from '@/components/ButtonLink';
import { SITE, whatsappHref } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Contact | PrintWarriors',
  description: 'Contact PrintWarriors in Kolkata by email, WhatsApp or the contact form. Delivery across India.',
};

function InfoCard({ icon: Icon, title, children }: { icon: typeof Mail; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-elevated p-6">
      <Icon className="size-5 text-accent-primary" strokeWidth={1.5} aria-hidden="true" />
      <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

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

            {/* WhatsApp CTA — the button appears once SITE.whatsappNumber is set in content/site.ts */}
            <InfoCard icon={MessageCircle} title="WhatsApp">
              {whatsapp ? (
                <a href={whatsapp} className={`${BUTTON_BASE} ${BUTTON_VARIANTS.primary} mt-2`}>Chat on WhatsApp</a>
              ) : (
                <p className="text-[15px] leading-relaxed text-text-secondary">Order updates are shared directly on WhatsApp.</p>
              )}
            </InfoCard>

            <InfoCard icon={Mail} title="Email">
              <a href={`mailto:${SITE.email}`} className="font-display text-lg font-bold text-text-primary underline decoration-accent-primary decoration-2 underline-offset-[6px] hover:decoration-text-primary">
                {SITE.email}
              </a>
            </InfoCard>

            <InfoCard icon={MapPin} title="Location">
              <p className="font-display text-lg font-bold text-text-primary">{SITE.location}</p>
              <p className="mt-1 text-[15px] text-text-secondary">Porter delivery and pickup in Kolkata · courier across India.</p>
            </InfoCard>

            {/* Shown once SITE.businessHours is set in content/site.ts */}
            {SITE.businessHours && (
              <InfoCard icon={Clock} title="Business hours">
                <p className="font-display text-lg font-bold text-text-primary">{SITE.businessHours}</p>
              </InfoCard>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-elevated p-6 md:p-10 lg:col-span-7">
            <h2 className="font-display text-2xl font-bold text-text-primary">Send a message</h2>
            <p className="mb-8 mt-2 text-[15px] text-text-secondary">For quotes, the quote form is faster — it includes your file.</p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
