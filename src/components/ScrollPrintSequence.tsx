"use client";

import React from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroModel from './hero/HeroModel';

/*
 * The hero: headline left, the printed object right.
 *
 * (The file name is historical — this was the scrolling video hero. The background footage and its
 * whole grade are gone; the object is the hero's only image now.)
 *
 * Three layouts. On a phone it is a plain column — headline, subtext, CTA, object, hint — and the object
 * takes whatever height the copy leaves. The middle one exists because of the headline: "YOU THINK," is
 * set on one line at ~4.8em wide, so between 760px and 1099px it needs most of the left column, and
 * there the canvas stays inside its own column with the object centred in it. Only from 1100px is the
 * canvas widened past the right edge of the viewport, where there is room for the object to run off the
 * page without ever reaching the text.
 */

const reveal: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

interface ScrollPrintSequenceProps {
  // Same handler as the Header's quote button — opens QueryFormModal
  onOpenQuery: () => void;
}

export default function ScrollPrintSequence({ onOpenQuery }: ScrollPrintSequenceProps) {
  return (
    // reducedMotion="user": entrance animations drop their movement when the OS asks for reduced motion
    <MotionConfig reducedMotion="user">
      {/* overflow-hidden is what crops the object at the right edge of the viewport on desktop.
          The padding, not a margin, reserves the fixed header's height — so the section still starts at
          the top of the page and its background runs full-bleed behind the bar, while nothing inside it
          can sit underneath. --nav-height is defined in globals.css and the header sizes itself from it.
          svh rather than vh: on mobile browsers vh is the height with the address bar collapsed, which is
          taller than what you can actually see, and the hero would be cut off until you scrolled. */}
      <section className="relative w-full overflow-hidden bg-background pt-[var(--nav-height,72px)]">
        {/* Two layouts in one container. Below 760px it is a flex column and what is on screen is the
            order of the source: headline, subtext, CTA, object, hint. From 760px it is the two-column
            grid it has always been, and both children are placed explicitly — col-start-1 for the copy,
            col-start-2 for the object, same row — so the source order stops mattering there and the
            object returns to the right-hand column.
            The top padding is the one number that keeps the headline clear of the bar: --nav-height is
            everything the bar occupies, and 48px (64 from 760px) is the breathing room under it. The
            section itself pads by --nav-height as well, so the background still runs full-bleed behind
            the bar while nothing inside it can sit underneath. */}
        <div className="site-frame flex flex-col pb-14 pt-10 min-[760px]:grid min-[760px]:min-h-[calc(100svh-var(--nav-height,72px))] min-[760px]:grid-cols-[45fr_55fr] min-[760px]:items-center min-[760px]:gap-x-8 min-[760px]:gap-y-10 min-[760px]:pb-20 min-[760px]:pt-16">

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            /* z-10 puts the copy above the full-bleed canvas from lg — not for looks, but so the CTA
               stays clickable: hit testing follows stacking order, and the canvas is at z-1. */
            className="relative z-10 w-full min-[760px]:col-start-1 min-[760px]:row-start-1"
          >
            {/* The hero opens straight on the headline. Space Grotesk Bold, solid ivory and copper — no
                texture, no shadow, nothing between the letterforms and the page. */}
            <motion.h1
              variants={rise}
              /* The one heading on the site that overrides the base scale, and deliberately so. At the
                 shared h1 weight of 700 it read as a poster and flattened the object beside it; 600 holds
                 the line without shouting, and the second line drops again to 500 so the accent carries
                 the emphasis rather than the weight. Leading is 0.98 — a lighter face needs more air
                 between lines, not less. The letter-spacing is untouched.
                 The phone clamp is capped at 64px rather than by a column, because there is no column
                 there: 13vw sets "YOU THINK," at 245px of ink inside 342px of frame at 390px wide, and
                 the 64px cap binds from 492px up — well before the two-column layout begins.
                 The 6.8vw ceiling from 760px keeps that same line inside the left column at every
                 two-column width — measured ink, not the element box, which is block-level and fills the
                 column either way: 517px of text in 555px at 1440, 395 in 419 at 1100, 287 in 299 at 800.
                 That is the binding constraint on that clamp, since whitespace-nowrap means the line
                 overhangs rather than wraps once it runs out. Re-measure both the same way if the face,
                 the tracking or the wording changes. */
              className="text-[clamp(44px,13vw,64px)] font-semibold leading-[0.98] uppercase text-text-primary whitespace-nowrap min-[760px]:text-[clamp(3.08rem,min(6.8vw,11.9vh),7.55rem)]"
            >
              YOU THINK,
              <br />
              <span className="font-medium text-accent-primary">WE PRINT.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              /* 34ch is what holds it to two lines on a phone. It goes to one line from 1100px, where the
                 column is wide enough for the sentence, and wraps in between, where it is not. */
              className="mt-5 max-w-[34ch] font-sans text-[17px] text-text-secondary min-[760px]:mt-[clamp(1.25rem,3vh,1.75rem)] min-[1100px]:max-w-none"
            >
              Turn your CAD files into precision-engineered parts.
            </motion.p>

            {/* The hero's one call to action. It shrink-wraps rather than running the full width: at
                52px tall with 24px either side it is already a comfortable target, and a button stretched
                across the screen reads as a form control rather than as an invitation. */}
            <motion.div variants={rise} className="mt-8 min-[760px]:mt-[clamp(2.5rem,6vh,4rem)]">
              <button
                type="button"
                onClick={onOpenQuery}
                className="hover-lift group inline-flex h-[52px] items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-accent-primary px-6 text-[14px] font-semibold uppercase tracking-[0.08em] text-on-accent [transition-property:transform,background-color] hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary min-[760px]:h-auto min-[760px]:px-7 min-[760px]:py-3.5 min-[760px]:text-[13px] min-[760px]:tracking-[0.12em]"
              >
                {/* Short on a phone, where the bar above it already says GET QUOTE and the longer wording
                    was the only thing on the screen set in sentence case. Both are in the DOM and the one
                    that does not apply is display:none, which keeps it out of the accessible name as well
                    as off the screen — so the button is named by whichever label is actually showing. */}
                <span className="min-[760px]:hidden">Get quote</span>
                <span className="hidden min-[760px]:inline">Get instant quote</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* --focus-x is where the object sits across the canvas: centred while the canvas is confined
              to its column, then pulled in toward the middle of the screen on desktop, where the canvas
              is wide enough that the object still runs past the right edge and is cropped there.
              On a phone the box is a square: its height follows its width rather than whatever height
              the copy happened to leave over, which is what lets one still line up with the live part
              at every phone size instead of only the one it was measured at. From 760px it is the 4:5
              box, and from 1024px the full bleed described below.
              --fallback-scale is how tall the still has to be for the PART inside it to come out at
              --model-scale of the box — see CAPTURE_FILL in HeroModel. On the phone the box is square
              and the still is square, so it is 1 and the image simply fills the box. */}
          {/* From lg the box stops being a grid cell and becomes the hero itself: absolutely positioned across
              all four edges, so the canvas is exactly as tall as the section and the build plate
              can run to the bottom border instead of stopping in mid-air two hundred pixels above it.
              Nothing here sizes the box any more — no aspect-ratio, no height — it comes from the hero.
              The object still sits on the right: --focus-x places it inside the canvas, which is what
              that variable is for, so a full-bleed canvas costs nothing in composition.
              --model-scale is read against the hero's full height now rather than a box two thirds of
              it, so the number had to come down to 0.45 to render at a sane size. It is the yardstick
              that got longer, not the object that shrank.
              pointer-events-none on the box with the canvas opting back in, plus z-10 on the copy above,
              keeps the CTA clickable through it.
              self-stretch is not decoration: align-self survives onto an absolutely positioned box, and
              the center inherited from the tablet rule makes it shrink-wrap its content between the
              insets rather than fill them. With the canvas sized at 100% of a parent that is sizing
              itself from the canvas, the two settled on 1426px — taller than the hero it was meant to
              match. */}
          <HeroModel
            className="
              mt-10 aspect-square w-full [--focus-x:0.5]
              max-[759.98px]:[--model-scale-x:0.8] max-[759.98px]:[--pose-limit:4]
              min-[760px]:mt-0 min-[760px]:aspect-[4/5] min-[760px]:w-full min-[760px]:self-center
              min-[760px]:col-start-2 min-[760px]:row-start-1 min-[760px]:[--model-scale:0.7]
              min-[760px]:[--pose-limit:0.94]
              min-[760px]:[--fallback-scale:calc(0.7/var(--capture-fill))]
              min-[1024px]:pointer-events-none min-[1024px]:absolute min-[1024px]:inset-0
              min-[1024px]:aspect-auto min-[1024px]:h-auto min-[1024px]:w-auto
              min-[1024px]:self-stretch
              min-[1024px]:[--focus-x:0.72] min-[1024px]:[--model-scale:0.462]
              min-[1024px]:[--fallback-scale:calc(0.462/var(--capture-fill))]
              min-[1024px]:[--part-scale:1.4676]
            "
          />

          {/* Phones only. On a pointer device the cursor over the canvas already says it — it is a grab
              hand — and from 1024px the canvas covers the whole hero, so a line of text under it would be
              a line of text stranded in the middle of the page.
              Mono, because the first half of it is the part's name rather than an instruction, and the
              site sets specimen labels in mono everywhere else. */}
          <p className="mt-3 text-center font-mono text-[12px] text-text-muted min-[760px]:hidden">
            3DBenchy · drag to rotate
          </p>

        </div>
      </section>
    </MotionConfig>
  );
}
