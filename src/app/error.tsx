'use client';

import React, { useEffect } from 'react';
import Eyebrow from '@/components/Eyebrow';
import { SITE } from '@/components/content/site';

/*
 * What a visitor sees when a page throws while rendering.
 *
 * An error boundary has to be a client component and has to accept `reset`, which re-renders the
 * segment that failed — often enough to clear a transient fault without a full reload, so it is
 * offered first.
 *
 * The navbar and footer are deliberately not mounted here. This boundary catches errors from the
 * layout's own children, and a layout that is itself mid-failure is the last thing to re-run inside
 * the error screen; keeping this page self-contained means it renders even when the thing that broke
 * is part of the shell. A plain link home covers the way out.
 *
 * The message stays generic: `error.message` from a server component is replaced with a digest in
 * production anyway, and showing internals to a visitor helps nobody. The real detail goes to the
 * console, and the digest is printed so a report can be matched to a server log.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-background font-sans text-text-primary selection:bg-accent-primary/30">
      <div className="site-frame flex min-h-svh flex-col justify-center py-24">
        <Eyebrow>Something broke</Eyebrow>
        <h1 className="mt-4 max-w-[20ch] text-[clamp(2.25rem,4.5vw,3.5rem)] text-text-primary text-balance">
          This page didn&apos;t load.
        </h1>
        <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-[1.65] text-text-secondary">
          Something on our side failed. Trying again often clears it. If it keeps happening, email us at{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-text-primary underline decoration-accent-primary underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <button
            type="button"
            onClick={reset}
            className="hover-lift inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-accent-primary px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-on-accent [transition-property:transform,background-color] hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          >
            Try again
          </button>
          {/* A plain anchor, not next/link, and the lint rule is waived for exactly that reason: a
              client-side navigation re-runs the same React tree that has just failed, so if the fault
              is in the shell rather than the page it lands the visitor straight back here. A hard load
              throws the broken tree away, which is the only escape that always works. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="group inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-primary underline decoration-accent-primary decoration-1 underline-offset-[8px] transition-colors duration-200 hover:decoration-text-primary"
          >
            Back to home
          </a>
        </div>

        {/* Printed so a visitor can quote it and we can find the matching server log. */}
        {error.digest && (
          <p className="label-micro mt-10 text-text-muted">Reference {error.digest}</p>
        )}
      </div>
    </section>
  );
}
