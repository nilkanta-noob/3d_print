import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import MasonryGallery from '@/components/MasonryGallery';
import { GALLERY_TILES } from '@/components/content/gallery';

export const metadata: Metadata = {
  title: 'Gallery | PrintWarriors',
  description: 'Parts PrintWarriors prints: brackets, enclosures, desk accessories, decor and more.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Gallery"
        description="Renders for now — photos of finished prints are added as orders ship."
      />

      <Section tone="band">
        <MasonryGallery tiles={GALLERY_TILES} />
      </Section>
    </>
  );
}
