import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Eyebrow from '@/components/Eyebrow';
import ButtonLink from '@/components/ButtonLink';
import { ArrowLink } from '@/components/ButtonLink';
import { QUOTE_HREF } from '@/components/content/site';

/*
 * The page for a URL that does not exist.
 *
 * It sits at the root of app/ rather than inside the (site) group because only a root not-found
 * catches an unmatched URL — a not-found inside the group would answer notFound() calls from its own
 * pages and nothing else. That also means the group's layout does not wrap it, so the navbar and the
 * footer are mounted here by hand. Without them a mistyped address would be a dead end with no way
 * back into the site, which is the whole reason this page exists.
 *
 * noindex because a 404 that search engines keep is a 404 they keep showing people. The status code
 * says so too, but the tag costs nothing and covers the case where something caches the body.
 */
export const metadata: Metadata = {
  title: 'Page not found | PrintWarriors',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-text-primary selection:bg-accent-primary/30">
      <Header />
      <main className="flex-1">
        <section className="bg-background">
          <div className="site-frame flex min-h-[60svh] flex-col justify-center pb-24 pt-[calc(var(--nav-height,72px)+64px)]">
            <Eyebrow>Error 404</Eyebrow>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(2.75rem,5.5vw,4.5rem)] text-text-primary text-balance">
              This page doesn&apos;t exist.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-text-secondary">
              The link may be out of date, or the address mistyped. Everything the site does is still a
              tap away.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ButtonLink href={QUOTE_HREF}>Get a quote</ButtonLink>
              <ArrowLink href="/">Back to home</ArrowLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
