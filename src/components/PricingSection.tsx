import React from 'react';
import CornerSteps from './CornerSteps';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { MATERIALS, formatRate } from './content/materials';

/*
 * The rate card.
 *
 * It stays a real table — three materials against two rates is a comparison, and a comparison belongs
 * in rows and columns with headers a screen reader can announce. What it borrows from the material
 * cards above is the surface: one hairline rectangle, square corners, rules between rows, and the
 * Student column filled in the accent exactly as the PLA+ card is, down to the corner steps.
 *
 * Every figure is read from MATERIALS, which is also what the cards read, so a rate can only ever be
 * changed in one place.
 *
 * Fixed layout with declared column widths: left to itself the browser would size the columns from
 * their content, which makes the Material column wide enough for "PLA+" and nothing else, and moves
 * the rates around as the copy changes.
 */
// Inter, matching the section eyebrow rather than the mono used for the figures: the column heads name
// the table's parts, which is the eyebrow's job elsewhere on the page, while mono is reserved for rates.
const HEAD = 'font-semibold uppercase text-[10px] tracking-[0.08em] sm:text-[12px] sm:tracking-[0.12em]';
const CELL = 'px-3 py-3 align-middle sm:px-6 sm:py-4';

// The muted token measures 4.02:1 on the Student column's accent tint, which is below AA. Inside those
// cells the secondary tone carries the small print instead.
const FINE = 'font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary sm:tracking-[0.15em]';

// leading-none: these spans would otherwise inherit the body's 1.7, which makes a 20px figure occupy
// 34px and pushes the one row that also carries a "save" line past the row height.
function Rate({ amount, tone }: { amount: number; tone: 'standard' | 'student' }) {
  return (
    <span className="flex items-baseline gap-1 font-mono leading-none">
      <span
        className={`text-[16px] font-medium sm:text-[1.25rem] ${
          tone === 'student' ? 'text-accent-primary' : 'text-text-primary'
        }`}
      >
        {formatRate(amount)}
      </span>
      <span className={`text-[12px] sm:text-[13px] ${tone === 'student' ? 'text-accent-primary/70' : 'text-text-muted'}`}>
        /g
      </span>
    </span>
  );
}

export default function PricingSection() {
  return (
    // The bottom padding is cut to meet the gallery preview's top padding below it, instead of
    // Section's own 96/128/160 meeting the next section's and leaving twice the air after the student
    // rate note than there is above the heading.
    <Section id="pricing" tone="emphasis" className="[&>div]:pb-16 md:[&>div]:pb-24">
      {/* Two columns from 1024px: the argument on the left, the rate card beside it. items-start puts
          the table's top edge on the same line as the eyebrow rather than centring it against a much
          taller heading block. Below that the two stack with a 40px gap. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-[4.5rem] lg:gap-y-0">
        <SectionHeading
          className="lg:col-span-5"
          eyebrow="Pricing"
          /* nowrap on "per-gram": the line would otherwise break at the hyphen, leaving "per-" hanging */
          title={<>Simple, <span className="whitespace-nowrap">per-gram</span> pricing</>}
          description="You pay for the material your part actually uses."
        />

        <div className="lg:col-span-7">
      <table className="w-full table-fixed border-collapse border border-text-primary/10 text-left">
        <caption className="sr-only">Per-gram printing rates by material, standard and student</caption>
        <colgroup>
          <col className="w-[36%]" />
          <col className="w-[32%]" />
          <col className="w-[32%]" />
        </colgroup>
        <thead>
          <tr className="h-14">
            <th scope="col" className={`${HEAD} ${CELL} text-text-muted`}>Material</th>
            <th scope="col" className={`${HEAD} ${CELL} text-text-muted`}>Standard</th>
            <th scope="col" className={`${HEAD} ${CELL} relative bg-accent-primary text-on-accent`}>
              Student
              {/* Hidden on phones: at 6px in a 12px-padded cell it sits on top of the label. */}
              <CornerSteps size={6} className="hidden sm:block" />
            </th>
          </tr>
        </thead>
        <tbody>
          {MATERIALS.map((material) => {
            const { standard, student } = material.pricePerGram;
            // h-[72px] sets the row; the cells keep only the padding the spec asks for, since a table
            // row grows past a height set on it once its content plus padding exceeds that height.
            return (
              <tr key={material.slug} className="h-[72px] border-t border-text-primary/10">
                <th scope="row" className={`${CELL} font-display text-[17px] font-bold tracking-[-0.03em] text-text-primary sm:text-[1.375rem]`}>
                  {material.name}
                </th>

                <td className={CELL}>
                  <Rate amount={standard} tone="standard" />
                </td>

                <td className={`${CELL} bg-accent-primary/[0.06]`}>
                  {student !== null ? (
                    <>
                      <Rate amount={student} tone="student" />
                      <span className={`${FINE} mt-1.5 block leading-none`}>Save {formatRate(standard - student)}/g</span>
                    </>
                  ) : (
                    <>
                      {/* One word on a phone: "— Coming soon" wraps in a 32% column at 360px, and a
                          wrapped placeholder reads as missing data rather than as a note. */}
                      <span className={`${FINE} sm:hidden`}>Soon</span>
                      <span className="hidden items-baseline gap-2 sm:flex">
                        <span aria-hidden="true" className="text-[1.25rem] text-text-secondary">—</span>
                        <span className={FINE}>Coming soon</span>
                      </span>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

          {/* Under the table and on its left edge: the label names the condition, the sentence states
              it. "per-file" is held together — broken across a line it reads as two words. */}
          <div className="mt-6">
            <h3 className="label-micro text-text-muted">Student rate</h3>
            <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-text-secondary">
              Requires a valid college ID or referral. No setup fee, no minimum order, no{' '}
              <span className="whitespace-nowrap">per-file</span> charge.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
