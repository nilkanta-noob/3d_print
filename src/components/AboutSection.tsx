import React from 'react';
import SectionHeading from './SectionHeading';

const FACTS = [
  { label: 'Based in', value: 'Kolkata' },
  { label: 'Pan-India delivery', value: '3–4 days' },
  { label: 'Student rate from', value: '₹2.5/g' },
];

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-background" id="about">
      <div className="container mx-auto px-4 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* Company story */}
        <div>
          <SectionHeading eyebrow="About us" title="Built to bring your ideas to life." />
          <div className="mt-6 max-w-xl space-y-5 text-base md:text-lg leading-relaxed text-text-secondary">
            <p>
              PrintWarriors was started to make 3D printing more accessible for anyone with an idea worth building. Founded by an engineering student at Heritage Institute of Technology, Kolkata, we understand the challenges of turning digital designs into physical prototypes without spending a fortune.
            </p>
            <p>
              Whether you&apos;re working on a college project, developing a prototype, creating a custom part, or simply bringing an idea to life, we provide affordable and reliable 3D printing to help you build, test, and iterate with confidence.
            </p>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs sm:text-sm text-text-secondary">{fact.label}</dt>
                <dd className="mt-1 font-display text-xl sm:text-2xl font-bold text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Brand visual.
            PLACEHOLDER: a still frame of the hero footage (#t=6), cropped close on the print head, because the
            site has no photos yet. Replace with a real workshop or team photo (e.g. public/about-workshop.jpg
            via next/image) — that is what will make this section feel human. */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-elevated">
          <video
            src="/hero___video.mp4#t=6"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[70%_60%] scale-[1.35] origin-[70%_60%]"
          />
          {/* Neutral photo vignette — not the theme background, which would wash the image out in light mode */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

      </div>
    </section>
  );
}
