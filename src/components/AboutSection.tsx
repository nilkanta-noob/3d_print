import React from 'react';
import Section from './Section';
import Eyebrow from './Eyebrow';

const FACTS = [
  { label: 'Based in', value: 'Kolkata' },
  { label: 'Pan-India delivery', value: '3–4 days' },
  { label: 'Student rate from', value: '₹2.5/g' },
];

/*
 * The About page's opening: the story, and the three numbers that back it.
 *
 * Asymmetric on purpose. Every section on this page used to be an eyebrow, a centred heading, a
 * paragraph and a four-box grid, four times over, which read as a template rather than a page. Here the
 * label and heading hold a narrow left column and the prose runs in a wider one beside them — so the
 * section is a split, the stats below it are a row, and neither looks like what follows.
 *
 * The copy is one paragraph because it used to be two that said the same thing: both claimed the work
 * was "accessible" and both promised prototypes "without spending a fortune".
 */
export default function AboutSection() {
  return (
    <Section id="story" tone="band" compact>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)] lg:items-center lg:gap-16">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-6 text-[clamp(2rem,6vw,2.25rem)] sm:text-[clamp(2.5rem,4vw,3.5rem)] text-text-primary text-balance">
            Built to bring your ideas to life.
          </h2>

          <div className="mt-6 max-w-[58ch]">
            <p className="text-base text-text-secondary md:text-[17px]">
            PrintWarriors exists to make 3D printing affordable for anyone with an idea worth building.
            We print one-off parts at per-gram rates — no minimum order, no setup fees, and a quote by
              email before you pay.
            </p>
            <p className="mt-6 text-[15px] text-text-muted">
              Founded by an engineering student at Heritage Institute of Technology, Kolkata.
            </p>
          </div>
        </div>
        {/* Reserved for a photo of the workshop or a finished part. Drop an <Image fill> in here when
            one exists; the frame already holds its 3:4 shape so nothing reflows when it arrives. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-surface" />
      </div>
      {/* The strongest pattern on the page, kept as it was: three numbers on one rule. */}
      <div className="relative mt-12 md:mt-14">
        <dl className="relative grid grid-cols-3 gap-8 border-t border-border pt-8">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="label-micro text-text-muted">{fact.label}</dt>
              <dd className="mt-3 font-display text-xl font-medium tracking-[-0.03em] text-text-primary sm:text-2xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
