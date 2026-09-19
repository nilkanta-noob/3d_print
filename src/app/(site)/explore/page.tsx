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
        <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {INSPIRATION.map((category) => (
            <li key={category.slug} id={category.slug} className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-elevated">
              <ImageSlot
                image={category.image}
                alt={category.title}
                variant={category.illustration}
                className="aspect-[16/10] border-b border-border"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl font-display font-bold text-text-primary">{category.title}</h2>
                  <span className="text-sm text-text-muted">{category.materials}</span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{category.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {category.ideas.map((idea) => (
                    <li key={idea} className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary">{idea}</li>
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
