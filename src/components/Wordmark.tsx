import React from 'react';

/*
 * The wordmark, shared by the navbar and the footer so the two can never drift apart.
 *
 * It owns its size and its tracking — and only those. The family, the weight, the case and the colour
 * stay on whichever element it sits in, because those differ by context (the navbar's is plain white,
 * the footer's takes the page's own primary) while the proportions must not.
 *
 * The W is real text with a mask over it, not an image or an SVG, so "PrintWarriors" is still read,
 * searched and selected as one word. Every measurement in `.layered-w` — its 1.2em size, its -0.07em
 * overlap and the 0.026em gaps in the mask — is in em, so the mark grows with the type exactly and none
 * of the sizes below need it restated.
 *
 * Tracking tightens as the type grows. 0.24em is airy at 15px and merely wide at 26px: the letters stop
 * reading as one word and start reading as a row of initials, and the mark runs out of bar to sit in.
 */
const SIZES = {
  /*
   * 18px on a phone, 20 from 760px, 22 from 1024.
   *
   * Tracking comes down by about 15% from where it started at every size — 0.24em was airy at 15px and
   * merely wide at 22px, where the letters stop reading as one word and start reading as a row of
   * initials. It is also what buys the desktop bar the clear space between the mark and the first nav
   * link, which is why the desktop value is trimmed rather than the size.
   */
  nav: 'text-[18px] tracking-[0.16em] min-[760px]:text-[20px] min-[760px]:tracking-[0.155em] lg:text-[22px] lg:tracking-[0.17em]',
  // The footer's mark is the larger one, but it takes the nav's tracking ratio so the two read as the
  // same logo at two sizes rather than as two logos.
  footer: 'text-[26px] tracking-[0.136em] lg:text-[34px] lg:tracking-[0.17em]',
} as const;

export default function Wordmark({ size = 'nav' }: { size?: keyof typeof SIZES }) {
  return (
    <span className={SIZES[size]}>
      Print
      <span className="text-accent-primary">
        <span className="layered-w">W</span>arriors
      </span>
    </span>
  );
}
