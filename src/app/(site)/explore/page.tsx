import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import ImageSlot from '@/components/ImageSlot';
import CtaBanner from '@/components/CtaBanner';
import { INSPIRATION } from '@/components/content/explore';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Explore | PrintWarriors',
  description: 'Ideas for 3D printing: decor, desk setup, gaming, education, functional parts and tools.',
};

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Ideas worth printing"
        description="Six kinds of things people print — and the material each one usually needs."
      />

      <Section tone="band">
        <ul className="grid items-start gap-8 md:grid-cols-2 lg:gap-10">
          {INSPIRATION.map((category) => (
            <li key={category.slug} id={category.slug} className="scroll-mt-24 overflow-hidden border border-border bg-elevated">
              <ImageSlot
                image={category.image}
                alt={category.title}
                variant={category.illustration}
                className="aspect-[16/10] border-b border-border"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h2 className="font-display text-[1.75rem] font-medium leading-[1.05] tracking-[-0.035em] text-text-primary lg:text-[2rem]">{category.title}</h2>
                  <span className="label-micro text-text-muted">{category.materials}</span>
                </div>
                <p className="mt-5 text-[15px] leading-[1.75] text-text-secondary">{category.description}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {category.ideas.map((idea) => (
                    <li key={idea} className="label-micro rounded-chip border border-border px-3 py-1.5 text-text-secondary">{idea}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title="Have an idea of your own?"
        description="Upload your CAD file and get a quote by email — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
        secondary={{ href: '/gallery', label: 'View gallery' }}
      />
    </>
  );
}
