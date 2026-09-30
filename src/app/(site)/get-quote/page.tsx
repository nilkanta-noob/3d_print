import React from 'react';
import type { Metadata } from 'next';
import Eyebrow from '@/components/Eyebrow';
import { QuoteFormCore } from '@/components/QueryForm';

export const metadata: Metadata = {
  title: 'Get a Quote | PrintWarriors',
  description: 'Upload your CAD file, choose a material and get a 3D printing quote by email — usually within the hour.',
};

/*
 * A compact header and then the form, with nothing between them.
 *
 * PageHeader is not used here: its smallest title is still display size, and it carries a rule and its
 * own bottom padding, which together pushed the first field off a 768px-tall screen. The header is built
 * inline so the whole block is about 180px and the form starts on the first screen at 1366x768.
 *
 * There is no card around the form either. It used to sit in a bordered panel with its own bordered
 * boxes inside it; the steps and the summary carry their own structure now.
 */
export default function GetQuotePage() {
  return (
    <section className="bg-background">
      <div className="site-frame pb-28 pt-[calc(var(--nav-height,72px)+2rem)] md:pb-36">
        <header className="max-w-[46rem]">
          <Eyebrow>Get a quote</Eyebrow>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-text-primary">Start your print</h1>
          <p className="mt-4 text-[17px] leading-[1.6] text-text-secondary">
            Upload your file, pick your settings, and we&apos;ll email you the exact price within the hour.
          </p>
        </header>

        <div className="mt-12">
          <QuoteFormCore />
        </div>
      </div>
    </section>
  );
}
