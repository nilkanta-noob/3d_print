import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { AUDIENCES } from './content/site';

const FACTS = [
  { label: 'Based in', value: 'Kolkata' },
  { label: 'Pan-India delivery', value: '3–4 days' },
  { label: 'Student rate from', value: '₹2.5/g' },
];

// "Our story" on the About page: founder story and mission, key facts, and who we print for.
export default function AboutSection() {
  return (
    <Section id="story" tone="band">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

        {/* Company story */}
        <div>
          <SectionHeading eyebrow="Our story" title="Built to bring your ideas to life." />
          <div className="mt-8 max-w-[60ch] space-y-6 text-base leading-[1.75] text-text-secondary md:text-[17px]">
            <p>
              PrintWarriors was started to make 3D printing more accessible for anyone with an idea worth building. Founded by an engineering student at Heritage Institute of Technology, Kolkata, we understand the challenges of turning digital designs into physical prototypes without spending a fortune.
            </p>
            <p>
              Our mission is to make prototyping accessible. Whether you&apos;re working on a college project, developing a prototype, creating a custom part, or simply bringing an idea to life, we provide affordable and reliable 3D printing to help you build, test, and iterate with confidence.
            </p>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-8 border-t border-border pt-10">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="label-micro text-text-muted">{fact.label}</dt>
                <dd className="mt-3 font-display text-xl font-medium tracking-[-0.03em] text-text-primary sm:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Brand visual.
            PLACEHOLDER: a still frame of the hero footage (#t=6), cropped close on the print head, because the
            site has no photos yet. Replace with a real workshop or team photo (e.g. public/about-workshop.jpg
            via next/image) — that is what will make this section feel human. */}
        <div className="relative aspect-[4/3] overflow-hidden border border-border bg-elevated">
          <video
            src="/hero/hero___video.mp4#t=6"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[70%_60%] scale-[1.35] origin-[70%_60%]"
          />
          {/* Neutral photo vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Who we print for */}
      <div className="mt-24 lg:mt-32">
        <h3 className="label-micro text-text-muted">Who we print for</h3>
        <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((audience) => (
            <li key={audience.title} className="bg-surface p-8">
              <p className="font-display text-xl font-medium tracking-[-0.03em] text-text-primary">{audience.title}</p>
              <p className="mt-4 text-sm leading-[1.75] text-text-secondary">{audience.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
