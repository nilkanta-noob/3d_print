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
 * Three layouts, and the middle one exists because of the headline. "YOU THINK," is set on one line at
 * ~4.8em wide, so between 760px and 1099px it needs most of the left column: there the canvas stays
 * inside its own column and the object is centred in it. Only from 1100px is the canvas widened past
 * the right edge of the viewport, where there is room for the object to run off the page without ever
 * reaching the text.
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
          can sit underneath. --nav-h is defined in globals.css and the header sizes itself from it.
          svh rather than vh: on mobile browsers vh is the height with the address bar collapsed, which is
          taller than what you can actually see, and the hero would be cut off until you scrolled. */}
      <section className="relative w-full overflow-hidden bg-background pt-[var(--nav-h)]">
        <div className="site-frame grid min-h-[calc(100svh-var(--nav-h))] items-center gap-y-10 pb-16 pt-10 min-[760px]:grid-cols-[45fr_55fr] min-[760px]:gap-x-8 min-[760px]:pb-20 min-[760px]:pt-12">

          {/* The object comes first in the DOM so it sits above the copy when the layout stacks on a
              phone. From 760px it is placed into the second column instead.
              --focus-x is where the object sits across the canvas: centred while the canvas is confined
              to its column, then pulled in toward the middle of the screen on desktop, where the canvas
              is wide enough that the object still runs past the right edge and is cropped there.
              Sizes are fixed per breakpoint — a square on phones, a 4:5 box on tablets, a measured
              height on desktop — so the space is reserved before the model arrives. */}
          {/* From lg the box stops being a grid cell and becomes the hero itself: absolutely positioned across
              all four edges, so the canvas is exactly as tall as the section and the build plate
              can run to the bottom border instead of stopping in mid-air two hundred pixels above it.
              Nothing here sizes the box any more — no aspect-ratio, no height — it comes from the hero.
              The object still sits on the right: --focus-x places it inside the canvas, which is what
              that variable is for, so a full-bleed canvas costs nothing in composition.
              --model-scale is read against the hero's full height now rather than a box two thirds of
              it, so the number had to come down to 0.45 to render at a sane size. It is the yardstick
              that got longer, not the object that shrank.
              pointer-events-none on the box with the canvas opting back in, plus z-10 on the copy below,
              keeps the CTA clickable through it.
              self-stretch is not decoration: align-self survives onto an absolutely positioned box, and
              the `center` inherited from the tablet rule makes it shrink-wrap its content between the
              insets rather than fill them. With the canvas sized at 100% of a parent that is sizing
              itself from the canvas, the two settled on 1426px — taller than the hero it was meant to
              match. */}
          <HeroModel
            className="
              mx-auto aspect-square w-[70vw] [--focus-x:0.5] [--model-scale:0.58]
              min-[760px]:mx-0 min-[760px]:aspect-[4/5] min-[760px]:w-full min-[760px]:self-center
              min-[760px]:col-start-2 min-[760px]:row-start-1 min-[760px]:[--model-scale:0.7]
              min-[1024px]:pointer-events-none min-[1024px]:absolute min-[1024px]:inset-0
              min-[1024px]:aspect-auto min-[1024px]:mx-0 min-[1024px]:h-auto min-[1024px]:w-auto
              min-[1024px]:self-stretch
              min-[1024px]:[--focus-x:0.72] min-[1024px]:[--model-scale:0.385]
              min-[1024px]:[--part-scale:1.2230]
            "
          />

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            /* z-10 puts the copy above the full-bleed canvas from lg — not for looks, but so the CTA
               stays clickable: hit testing follows stacking order, and the canvas is at z-1. */
            className="relative z-10 w-full min-[760px]:col-start-1 min-[760px]:row-start-1"
          >
            {/* The hero opens straight on the headline. Space Grotesk Bold, solid ivory and copper — no
                texture, no shadow, nothing between the letterforms and the page.
                Sized so "YOU THINK," always fits the left column: it sets at 4.82em wide in this face at
                this tracking, and the column is ~40% of the viewport, so 7.2vw leaves a margin at every
                two-column width. Also held to 12.5vh, which keeps the block clear of the navbar on a
                short laptop screen. Re-measure both numbers if the face or the tracking changes. */}
            <motion.h1
              variants={rise}
              className="text-[clamp(2.75rem,13vw,3.75rem)] font-bold uppercase leading-[1.04] tracking-[-0.045em] text-text-primary whitespace-nowrap min-[760px]:text-[clamp(3.25rem,min(7.2vw,12.5vh),8rem)]"
            >
              YOU THINK,
              <br />
              <span className="text-accent-primary">WE PRINT.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              /* One line from 1100px, where the column is wide enough to hold the sentence; it wraps on
                 narrower screens, where the column is not. */
              className="mt-8 max-w-[34ch] font-sans text-base leading-[1.75] text-text-secondary md:text-[17px] min-[760px]:mt-[clamp(2rem,5vh,3rem)] min-[1100px]:max-w-none"
            >
              Turn your CAD files into precision-engineered parts.
            </motion.p>

            <motion.div variants={rise} className="mt-9 min-[760px]:mt-[clamp(2.5rem,6vh,4rem)]">
              <button
                type="button"
                onClick={onOpenQuery}
                className="hover-lift group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-accent-primary px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-on-accent [transition-property:transform,background-color] hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              >
                Get Instant Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </MotionConfig>
  );
}
