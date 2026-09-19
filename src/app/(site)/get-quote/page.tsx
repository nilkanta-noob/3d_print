import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { QuoteFormCore } from '@/components/QueryForm';
import { SITE } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Get a Quote | PrintWarriors',
  description: 'Upload your CAD file, choose a material and get a 3D printing quote by email — usually within the hour.',
};

export default function GetQuotePage() {
  const notes = [
    {
      title: 'What happens next',
      body: 'A person reviews your file and emails the exact price — usually within the hour. Delivery orders are prepaid via UPI.',
    },
    {
      title: 'Special requirements',
      body: (
        <>
          Finishing (sanding, priming, painting) and infill are set in the form. For anything else — a colour, a tolerance, a deadline — email{' '}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-text-primary underline decoration-accent-primary underline-offset-4">{SITE.email}</a>{' '}
          after submitting.
        </>
      ),
    },
    {
      title: 'Student discount',
      body: 'Tick “Apply Student Discount” and upload your college ID to get PLA at ₹2.5/g.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Get a quote"
        title="Start your print"
        description="Upload your model, choose your settings, and we'll review the file and email your quote — usually within the hour."
      />

      <Section>
        <div className="mx-auto max-w-6xl">
          {/* The existing quote form: upload + 3D preview, contact details with email verification, material and finish, student ID */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <QuoteFormCore />
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {notes.map((note) => (
              <li key={note.title} className="rounded-xl border border-border bg-elevated p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">{note.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{note.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
