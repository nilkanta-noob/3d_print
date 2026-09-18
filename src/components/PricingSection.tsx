import React from 'react';
import { Info } from 'lucide-react';
import SectionHeading from './SectionHeading';

const RATES = [
  { material: 'PLA', standard: '₹3.5', student: '₹2.5' },
  { material: 'PLA Pro+', tag: 'Engineering', standard: '₹4', student: null },
  { material: 'PETG', standard: '₹5.5', student: null },
];

export default function PricingSection() {
  return (
    <section className="py-24 md:py-32 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        {/* One large surface container holds the whole section; the rate table is a card inside it */}
        <div className="rounded-2xl border border-border bg-surface px-4 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">

            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Pricing"
                title="Transparent pricing"
                description="Priced by material, per gram. No hidden setup fees."
              />
              <div className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <p>
                  <strong className="font-semibold text-text-primary">Student eligibility:</strong> Student rate requires a valid college ID or referral at checkout. Simply check the &quot;Apply Student Discount&quot; box and upload your ID when requesting a quote.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-text-muted">
                    <th scope="col" className="px-3 sm:px-6 py-4 font-medium">Material</th>
                    <th scope="col" className="px-3 sm:px-6 py-4 font-medium">Standard</th>
                    <th scope="col" className="px-3 sm:px-6 py-4 font-medium">Student</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {RATES.map((rate) => (
                    <tr key={rate.material}>
                      <th scope="row" className="px-3 sm:px-6 py-5 font-semibold text-text-primary">
                        <span className="flex flex-wrap items-center gap-2">
                          {rate.material}
                          {/* Hidden on phones: the tag can't wrap and would push the table past the card (it's also on the material card) */}
                          {rate.tag && (
                            <span className="hidden sm:inline rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                              {rate.tag}
                            </span>
                          )}
                        </span>
                      </th>
                      <td className="px-3 sm:px-6 py-5 tabular-nums">
                        <span className="font-display text-xl font-bold text-text-primary">{rate.standard}</span>
                        <span className="text-sm text-text-muted"> /g</span>
                      </td>
                      <td className="px-3 sm:px-6 py-5 tabular-nums">
                        {rate.student ? (
                          <>
                            {/* The one highlighted value: red at 20px bold counts as large text for contrast */}
                            <span className="font-display text-xl font-bold text-accent-primary">{rate.student}</span>
                            <span className="text-sm text-text-muted"> /g</span>
                          </>
                        ) : (
                          <span className="text-sm text-text-muted">Coming soon</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
