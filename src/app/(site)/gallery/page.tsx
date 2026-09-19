import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import PartIllustration from '@/components/PartIllustration';
import GalleryGrid from '@/components/GalleryGrid';
import CtaBanner from '@/components/CtaBanner';
import { SHOWCASE, PROJECT_CATEGORIES, GALLERY_ITEMS } from '@/components/content/gallery';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Gallery | PrintWarriors',
  description: 'The kinds of parts PrintWarriors prints: engineering parts, prototypes, college projects and custom designs.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Parts we print"
        description="Photos of finished prints are on the way. Until then, these renders show the kinds of parts we make."
      />

      <Section id="showcase" tone="band">
        <SectionHeading
          eyebrow="Project showcase"
          title="Example part types"
          description="Placeholder CAD renders — not photos of customer orders."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE.map((item) => (
            <li key={item.title}>
              <figure className="overflow-hidden rounded-xl border border-border bg-elevated">
                <div className="relative grid aspect-[4/3] place-items-center border-b border-border bg-background text-text-secondary">
                  <PartIllustration variant={item.variant} className="h-3/4 w-auto" />
                  <span className="absolute left-3 top-3 rounded-full border border-border bg-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                    Render
                  </span>
                </div>
                <figcaption className="p-5">
                  <p className="font-display font-bold text-text-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.category} · {item.material}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="categories">
        <SectionHeading eyebrow="Categories" title="Project categories" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECT_CATEGORIES.map((category) => (
            <li key={category.title} className="rounded-xl border border-border bg-elevated p-7 md:p-9">
              <h3 className="text-xl font-display font-bold text-text-primary">{category.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{category.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {category.examples.map((example) => (
                  <li key={example} className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary">{example}</li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-4 text-sm text-text-muted">
                Typical materials: <span className="text-text-primary">{category.materials}</span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="finished-prints" tone="band">
        <SectionHeading eyebrow="Finished prints" title="Recent work" />
        <div className="mt-14">
          <GalleryGrid items={GALLERY_ITEMS} />
        </div>
      </Section>

      <CtaBanner
        title="Want your part printed?"
        description="Upload your CAD file and get a quote by email — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
        secondary={{ href: '/materials', label: 'Explore materials' }}
      />
    </>
  );
}
