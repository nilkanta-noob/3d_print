import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';

// Per-gram rates. Kept as data so the table below is pure layout.
const ROWS = [
  { material: 'PLA', note: null, standard: '₹3.5', student: '₹2.5', studentIsPrice: true },
  { material: 'PLA+', note: 'Engineering', standard: '₹4', student: 'Coming soon', studentIsPrice: false },
  { material: 'PETG', note: null, standard: '₹5.5', student: 'Coming soon', studentIsPrice: false },
] as const;

// Pricing as a rate card, not a set of plan cards: one rectangular table, hairline rules, and the
// numbers set large enough to be read as the content rather than as table cells.
export default function PricingSection() {
  // Page background: Materials above it is the raised band, so this sits back and the two stay apart
  return (
    <Section id="pricing" tone="emphasis">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <SectionHeading
          className="lg:col-span-5"
          accent
          eyebrow="Pricing"
          /* nowrap on "per-gram": in the narrow heading column the line would otherwise break at the
             hyphen, leaving "per-" hanging at the end of a line */
          title={<>Simple, <span className="whitespace-nowrap">per-gram</span> pricing</>}
          description="You pay for the material your part actually uses. No setup fee, no minimum order, no per-file charge."
        />

        <div className="lg:col-span-7">
          {/* The rate card. Column heads are micro-labels; the rates are display type. */}
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Per-gram printing rates by material</caption>
            <thead>
              <tr className="border-y border-border">
                <th scope="col" className="label-micro py-5 pr-6 text-text-muted">Material</th>
                <th scope="col" className="label-micro py-5 pr-6 text-text-muted">Standard</th>
                {/* The Student column is the offer this section exists to make, so it is picked out as a
                    column rather than a cell: a 6% accent wash with a hairline down each side, carried by
                    every cell in the column so the band runs unbroken from the head to the last row. */}
                <th
                  scope="col"
                  className="label-micro border-x border-accent-primary/[0.18] bg-accent-primary/[0.06] px-6 py-5 text-text-secondary"
                >
                  Student
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.material} className="border-b border-border align-baseline">
                  <th scope="row" className="py-8 pr-6 font-display text-2xl font-medium tracking-[-0.03em] text-text-primary">
                    {row.material}
                    {row.note && <span className="label-micro mt-2 block text-text-muted">{row.note}</span>}
                  </th>
                  <td className="py-8 pr-6 font-display text-2xl font-medium tracking-[-0.03em] text-text-secondary">
                    {row.standard}
                    <span className="text-base text-text-muted">/g</span>
                  </td>
                  <td
                    className={`border-x border-accent-primary/[0.18] bg-accent-primary/[0.06] px-6 ${
                      row.studentIsPrice
                        ? 'py-8 font-display text-2xl font-medium tracking-[-0.03em] text-accent-primary'
                        : 'py-8 text-sm text-text-muted'
                    }`}
                  >
                    {row.student}
                    {row.studentIsPrice && <span className="text-base text-accent-primary/70">/g</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footnote, set as fine print under the rule rather than boxed into an alert panel */}
          <div className="mt-10 grid gap-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
            <h3 className="label-micro text-text-muted sm:pt-1">Student rate</h3>
            <p className="max-w-[60ch] text-[15px] leading-[1.75] text-text-secondary">
              Requires a valid college ID or referral at checkout. The student rate currently applies to PLA only —
              PLA+ and PETG student pricing will be added later.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
