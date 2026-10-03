import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Eyebrow from './Eyebrow';

/*
 * The line above a page's title: the section eyebrow on a tablet or a desktop, and a way back to the
 * home page on a phone.
 *
 * Phones are the only place that needs it. From 760px the navbar carries the whole set of links, so a
 * trail would be a second route to a page already one tap away; below it the links are folded into the
 * menu, and the wordmark — which does go home — is small and not obviously a button. This puts one
 * plain way back in the place the eye already goes first.
 *
 * The two never appear together, so the eyebrow is untouched at every width it was showing at before.
 */
export default function PageTrail({ eyebrow, page }: { eyebrow: string; page: string }) {
  return (
    <>
      <div className="max-[759.98px]:hidden">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>

      <nav aria-label="Breadcrumb" className="min-[760px]:hidden">
        <ol className="label-micro flex items-center text-[12px] text-text-muted">
          <li>
            {/*
              The padding makes the tap target 44px tall; the matching negative margin takes that height
              back out of the layout, so the row still occupies exactly the line the eyebrow did and the
              heading below it does not move.
            */}
            <Link
              href="/"
              className="-my-[15px] inline-flex items-center gap-2 py-[15px] transition-colors hover:text-text-primary focus-visible:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Home
            </Link>
          </li>
          {/* Decorative: the separator is punctuation between two names, not something to read out. */}
          <li aria-hidden="true" className="px-2">
            /
          </li>
          <li aria-current="page" className="text-accent-primary">
            {page}
          </li>
        </ol>
      </nav>
    </>
  );
}
