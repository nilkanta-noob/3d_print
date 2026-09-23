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
 * ~5.1em wide, so between 760px and 1099px it needs most of the left column: there the canvas stays
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
      {/* overflow-hidden is what crops the object at the right edge of the viewport on desktop. */}
      <section className="relative w-full overflow-hidden bg-background">
        <div className="site-frame grid min-h-svh items-center gap-y-10 pb-16 pt-28 min-[760px]:grid-cols-[45fr_55fr] min-[760px]:gap-x-8 min-[760px]:pb-20 min-[760px]:pt-24">

          {/* The object comes first in the DOM so it sits above the copy when the layout stacks on a
              phone. From 760px it is placed into the second column instead.
              --focus-x is where the object sits across the canvas: centred until the canvas can bleed,
              then pushed right so its far side is cropped by the edge of the screen.
              Sizes are fixed per breakpoint — a square on phones, a 4:5 box on tablets, a measured
              height on desktop — so the space is reserved before the model arrives. */}
          <HeroModel
            className="
              mx-auto aspect-square w-[70vw] [--focus-x:0.5]
              min-[760px]:mx-0 min-[760px]:aspect-[4/5] min-[760px]:w-full min-[760px]:self-center
              min-[760px]:col-start-2 min-[760px]:row-start-1
              min-[1100px]:aspect-auto min-[1100px]:h-[clamp(26rem,72svh,45rem)] min-[1100px]:w-[calc(100%+12vw)]
              min-[1100px]:[--focus-x:0.7]
            "
          />

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="w-full min-[760px]:col-start-1 min-[760px]:row-start-1"
          >
            <motion.p variants={rise} className="label-micro flex items-center gap-4 text-text-secondary">
              <span className="h-px w-7 shrink-0 bg-accent-primary" aria-hidden="true" />
              Precision 3D Printing · Kolkata
            </motion.p>

            {/* Sized so "YOU THINK," always fits the left column: it sets at about 5.1em wide, and the
                column is ~40% of the viewport, so 6.6vw leaves a margin at every two-column width. Also
                held to 12vh, which keeps the block clear of the navbar on a short laptop screen.
                filament-text gives the letters their printed layer lines (see globals.css) and owns the
                colour, which is why there is no text-* colour class here. */}
            <motion.h1
              variants={rise}
              className="filament-text mt-7 text-[clamp(2.5rem,12vw,3.5rem)] font-medium uppercase leading-none tracking-[-0.04em] whitespace-nowrap min-[760px]:mt-[clamp(1.5rem,4.5vh,2.5rem)] min-[760px]:text-[clamp(3rem,min(6.6vw,12vh),7.5rem)]"
            >
              YOU THINK,
              <br />
              <span className="filament-text filament-accent">WE PRINT.</span>
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
