import React from 'react';
import { Info } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';

export default function PricingSection() {
  // Page background: Materials above it is the raised band, so this sits back and the two stay apart
  return (
    <Section id="pricing">
      <SectionHeading
        accent
        eyebrow="Pricing"
        title="Simple, per-gram pricing"
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#17191D]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-black/20">
                  <th className="whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wider text-text-primary">Material</th>
                  <th className="whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wider text-text-primary">Standard Rate</th>
                  <th className="whitespace-nowrap px-6 py-5 text-sm font-semibold tracking-wider text-text-primary">Student Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm md:text-base">
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-6 py-5 font-display text-lg font-bold text-text-primary">PLA</td>
                  <td className="whitespace-nowrap px-6 py-5 text-text-muted">₹3.5/g</td>
                  <td className="whitespace-nowrap px-6 py-5 font-medium text-accent-primary">₹2.5/g</td>
                </tr>
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-bold text-text-primary">PLA+</span>
                      <span className="inline-flex items-center rounded-bl-lg rounded-tr-lg border border-accent-primary/50 bg-accent-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-primary">
                        Engineering
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-text-muted">₹4/g</td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm italic text-text-muted">Coming Soon</td>
                </tr>
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-6 py-5 font-display text-lg font-bold text-text-primary">PETG</td>
                  <td className="whitespace-nowrap px-6 py-5 text-text-muted">₹5.5/g</td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm italic text-text-muted">Coming Soon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#17191D] p-5 sm:flex-row sm:items-start sm:gap-4 sm:p-6">
          <Info className="mt-0.5 size-5 shrink-0 text-accent-primary" aria-hidden="true" />
          <div>
            <h4 className="font-semibold text-text-primary">Student Eligibility</h4>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              Student pricing requires a valid college ID or referral at checkout. Student discount currently applies only to PLA. PLA+ and PETG student pricing will be added later.
            </p>
          </div>
        </div>

      </div>
    </Section>
  );
}
