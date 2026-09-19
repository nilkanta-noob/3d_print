import React from 'react';
import type { Metadata } from 'next';
import { Truck, MapPin, Info } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import PricingTable from '@/components/PricingTable';
import CtaBanner from '@/components/CtaBanner';
import { MATERIALS, formatRate } from '@/components/content/materials';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Pricing | PrintWarriors',
  description: 'Per-gram pricing for PLA, PLA Pro+ and PETG, student rates, and delivery charges across Kolkata and India.',
};

const HOW_PRICING_WORKS = [
  {
    title: 'Weight × rate',
    body: 'Your part is sliced and weighed; the price is its weight in grams times the material rate. Infill (20%, 50% or 100%) changes the weight.',
  },
  {
    title: 'No setup fees, no minimum',
    body: 'A single small part costs what it weighs. There is no minimum order size.',
  },
  {
    title: 'Confirmed before you pay',
    body: 'We email the exact price after reviewing your file. Delivery orders are prepaid via UPI; Kolkata pickups can pay by UPI or cash.',
  },
];

const DELIVERY = [
  {
    title: 'Local delivery — Kolkata',
    icon: MapPin,
    points: [
      'On-demand delivery via Porter — faster than courier',
      'B2B drop-off or pickup, with no minimum order',
      'Pickup orders pay by UPI or cash; a partial advance may be needed for larger or first-time orders',
    ],
  },
  {
    title: 'Pan-India shipping',
    icon: Truck,
    points: [
      'Standard courier to anywhere in India',
      'Typically 3–4 business days from order confirmation',
      'Prepaid via UPI',
    ],
  },
];

export default function PricingPage() {
  const pla = MATERIALS[0];
  const examplePlaStandard = 40 * pla.pricePerGram.standard;
  const examplePlaStudent = pla.pricePerGram.student !== null ? 40 * pla.pricePerGram.student : null;

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Transparent, per-gram pricing"
        description="You pay for the material your part uses — no setup fees and no minimum order."
      />

      <Section id="overview" tone="band">
        <SectionHeading eyebrow="Overview" title="How pricing works" />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {HOW_PRICING_WORKS.map((item, index) => (
            <li key={item.title} className="rounded-xl border border-border bg-elevated p-7">
              <span className="font-display text-4xl font-bold leading-none tabular-nums text-accent-primary">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-lg font-display font-bold text-text-primary">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="rates">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Rates" title="Price per gram" description="Standard and student rates by material." />
            <p className="mt-8 rounded-xl border border-border bg-elevated p-5 text-sm leading-relaxed text-text-secondary">
              <span className="font-semibold text-text-primary">Example:</span> a 40 g PLA part costs ₹{examplePlaStandard} at the standard rate
              {examplePlaStudent !== null && <> or ₹{examplePlaStudent} at the student rate</>}, plus delivery if the order is under ₹599.
            </p>
          </div>
          <PricingTable className="lg:col-span-7" />
        </div>
      </Section>

      <Section id="delivery" tone="band">
        <SectionHeading eyebrow="Delivery" title="Delivery charges" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {DELIVERY.map((option) => {
            const Icon = option.icon;
            return (
              <article key={option.title} className="rounded-xl border border-border bg-elevated p-7 md:p-9">
                <Icon className="size-6 text-accent-primary" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 text-xl font-display font-bold text-text-primary">{option.title}</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-text-secondary">
                  {option.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-text-muted" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-elevated p-5 text-sm leading-relaxed text-text-secondary">
          <Info className="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
          <span>
            <span className="font-semibold text-text-primary">Free delivery on orders above ₹599.</span> Below ₹599, delivery and packaging costs are added separately.
          </span>
        </p>
      </Section>

      <Section id="students">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Student program"
              title="Student pricing"
              description="Anyone can order. Students with a valid college ID or a referral pay less on PLA."
            />
          </div>
          <div className="space-y-6 lg:col-span-7">
            <ol className="space-y-4">
              {[
                'Tick “Apply Student Discount” in the quote form.',
                'Upload a photo of your valid college ID — or use a referral at checkout.',
                'Your quote is priced at the student rate.',
              ].map((step, index) => (
                <li key={step} className="flex gap-4 rounded-xl border border-border bg-elevated p-5">
                  <span className="font-display text-2xl font-bold leading-none tabular-nums text-accent-primary">{index + 1}</span>
                  <span className="text-[15px] leading-relaxed text-text-primary">{step}</span>
                </li>
              ))}
            </ol>
            <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              {MATERIALS.map((material) => (
                <div key={material.slug} className="bg-elevated p-5">
                  <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">{material.name}</dt>
                  <dd className="mt-2 text-sm text-text-secondary">
                    {material.pricePerGram.student !== null ? (
                      <>
                        <span className="font-display text-xl font-bold text-text-primary">{formatRate(material.pricePerGram.student)}/g</span>
                        <span className="text-text-muted"> instead of {formatRate(material.pricePerGram.standard)}/g</span>
                      </>
                    ) : (
                      'Student rate coming soon'
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <CtaBanner
        tone="band"
        title="Get an exact price for your part"
        description="Upload your CAD file and we'll email your quote — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
        secondary={{ href: '/materials', label: 'Compare materials' }}
      />
    </>
  );
}
