import React from 'react';
import Section from './Section';
import Eyebrow from './Eyebrow';

const FACTS = [
  { label: 'Based in', value: 'Kolkata', accent: false },
  { label: 'Delivery', value: '3–4 days', accent: true },
  { label: 'Student rate', value: '₹2.5/g', accent: true },
];

/*
 * The About page's opening: the story, and the three figures that back it.
 *
 * Asymmetric on purpose. Every section on this page used to be an eyebrow, a centred heading, a
 * paragraph and a four-box grid, four times over, which read as a template rather than a page. Here the
 * label and heading hold a narrow left column and the prose runs in a wider one beside them — so the
 * section is a split, the figures below it are a row, and neither looks like what follows.
 *
 * Those figures are the loudest thing in the section by design: they are the only concrete claims on the
 * page, so they are set at display size with the label underneath, and the two a visitor is actually
 * weighing up carry the accent. They stay inside this section rather than becoming one of their own —
 * they are evidence for the paragraph above them, not a separate argument.
 */
export default function AboutSection() {
  return (
    <Section id="story" tone="band" compact>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)] lg:items-center lg:gap-24">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-8 text-[clamp(2rem,6vw,2.25rem)] sm:text-[clamp(2.5rem,4vw,3.5rem)] text-text-primary text-balance">
            Built to bring your ideas to life.
          </h2>

          <div className="mt-8 max-w-[58ch]">
            <p className="text-base text-text-secondary md:text-[17px]">
              PrintWarriors exists to make 3D printing affordable for anyone with an idea worth building.
              We print one-off parts at per-gram rates — no minimum order, no setup fees, and a quote by
              email before you pay.
            </p>
            <p className="mt-7 text-[15px] text-text-muted">
              Founded by an engineering student at Heritage Institute of Technology, Kolkata.
            </p>
          </div>
        </div>

        {/* Reserved for a photo of the workshop or a finished part. Drop an <Image fill> in here when
            one exists; the frame already holds its 4:5 shape so nothing reflows when it arrives. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]" />
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3">
        {FACTS.map((fact) => (
          // Reversed, so the figure reads first and its label sits underneath — while the markup keeps
          // the term before its definition, which is the order a description list has to be written in.
          <div key={fact.label} className="flex flex-col-reverse items-start">
            <dt className="label-micro mt-3 text-text-muted">{fact.label}</dt>
            <dd
              className={`font-display text-[clamp(1.875rem,2.8vw,2.375rem)] font-semibold leading-[1.05] tracking-[-0.035em] ${
                fact.accent ? 'text-accent-primary' : 'text-text-primary'
              }`}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
