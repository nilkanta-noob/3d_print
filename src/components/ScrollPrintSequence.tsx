"use client";

import React, { useEffect, useRef } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// PLACEHOLDER: public/hero-poster.jpg does not exist yet. Export a still frame
// from public/hero___video.mp4 and save it at exactly this path. Until then the
// poster request 404s and the browser falls back to the video's first frame.
const HERO_POSTER = '/hero-poster.jpg';

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
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoPlay starts the loop as soon as the page loads, like the original hero. This effect then pauses it
  // for users who ask for reduced motion, and restarts it whenever the hero is back on screen — browsers
  // can pause muted video that was scrolled away or loaded in a hidden window, and not resume it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browsers only allow unprompted play() on muted video; set the property
    // explicitly since React doesn't always reflect `muted` as an attribute.
    video.muted = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;

    const syncPlayback = () => {
      if (reducedMotion.matches || !inView || document.hidden) {
        video.pause();
      } else {
        // Rejects if the browser still blocks autoplay (e.g. iOS Low Power Mode) — the current frame stays up.
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);

    syncPlayback();
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    // reducedMotion="user": entrance animations drop their movement when the OS asks for reduced motion
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-svh w-full flex items-start lg:items-center overflow-hidden bg-background">

        {/* Hero background video — contained to this section only. The print head sits right of
            centre in the footage, so the crop leans right to keep it in frame on portrait screens.
            The filter warms the footage's own teal grade so no cyan reads through (blue cast measured ~50% lower). */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <video
            ref={videoRef}
            src="/hero___video.mp4"
            poster={HERO_POSTER}
            className="w-full h-full object-cover object-[65%_50%] [filter:saturate(0.8)_sepia(0.2)]"
            autoPlay
            playsInline
            muted
            loop
          />
          {/* Cinematic grade: black layers, not a charcoal wash. A flat charcoal overlay lifts the footage's shadows
              to grey (the "faded" look); black keeps them deep while the print head's metal still catches the light.
              Measured on the footage: the frame averages ~45% darker than the old 0.76/0.66 charcoal overlay
              (~60% on phones), copper "WE PRINT." goes from 2.8:1 to 4.4:1 against the footage behind it and the
              paragraph from 6.2:1 to 10:1. Effective darkening: ~55% on the printer, ~90% behind the copy. */}
          {/* 1. Base: 55% black over the whole frame */}
          <div className="absolute inset-0 bg-black/55"></div>
          {/* 2. Behind the copy: top band on phones, left side on desktop — gone before the print head */}
          <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/55 via-50% to-transparent to-72% lg:bg-linear-to-r lg:from-black/75 lg:via-black/55 lg:via-30% lg:to-transparent lg:to-62%"></div>
          {/* 3. Vignette: clear around the print head, closing in to 60–70% black at the edges */}
          <div className="absolute inset-0 bg-radial-[ellipse_90%_50%_at_50%_72%] from-transparent from-40% to-black/60 lg:bg-radial-[ellipse_60%_85%_at_66%_50%] lg:to-black/70"></div>
          {/* 4. Shade under the navbar  5. Fade into the page background below the hero */}
          <div className="absolute inset-x-0 top-0 h-[22%] bg-linear-to-b from-black/55 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-[22%] bg-linear-to-t from-background to-transparent"></div>
        </div>

        {/* site-frame: same full-width frame as the navbar, so the headline lines up under the wordmark.
            Top padding clears the navbar; the extra top vs bottom padding sets the block just below centre. */}
        <div className="site-frame relative z-20 pt-32 pb-24 lg:pt-36 lg:pb-28">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {/* Micro-label: the studio's discipline, stated flatly above the headline. The copper rule
                anchors the whole column to the left edge of the frame, which is where every heading on
                the page below also starts. */}
            <motion.p variants={rise} className="label-micro flex items-center gap-4 text-text-secondary">
              <span className="h-px w-7 shrink-0 bg-accent-primary" aria-hidden="true" />
              Precision 3D Printing · Kolkata
            </motion.p>

            {/* Brand headline: uppercase at weight 500, not black. At this scale the size and the -0.04em
                tracking carry the weight on their own, and the lighter cut is what makes it read as a
                studio masthead rather than a poster. Always exactly two lines: 104px on tablets, 112px
                from 1024px, 128px on laptops/desktops, 152px from 1536px, 168px on 1800px+ screens — the
                first line ends a little past the middle of the screen. Leading 0.9 closes the two lines up
                into one block (the comma clears line two, which is shorter). Phones scale with the screen
                (~62px at 375px) so "YOU THINK," never clips. The soft shadow separates it from bright spots. */}
            <motion.h1
              variants={rise}
              className="mt-10 md:mt-12 text-[clamp(2.75rem,16.5vw,4rem)] md:text-[6.5rem] lg:text-[7rem] xl:text-[8rem] 2xl:text-[9.5rem] min-[112.5rem]:text-[10.5rem] font-medium uppercase tracking-[-0.04em] leading-[0.9] text-text-primary whitespace-nowrap [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
            >
              YOU THINK,
              <br />
              <span className="text-accent-primary">WE PRINT.</span>
            </motion.h1>

            {/* 520px reading width, small against the headline — the gap between the two sizes is the
                hierarchy, so the paragraph never grows to meet it. */}
            <motion.p
              variants={rise}
              className="mt-12 md:mt-14 xl:mt-16 max-w-[520px] font-sans leading-[1.75] text-text-secondary text-base md:text-[17px]"
            >
              Turn your CAD files into precision-engineered parts.
              <br className="hidden sm:block" />
              {' '}Fast quotes. Multiple materials. Reliable results.
            </motion.p>

            {/* Vertical rhythm: label → 40/48px → headline → 48/56/64px → paragraph → 56/64/72px → buttons */}
            <motion.div variants={rise} className="mt-14 md:mt-16 xl:mt-18 flex flex-wrap gap-4 sm:gap-5">
              <button
                type="button"
                onClick={onOpenQuery}
                className="hover-lift group flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 whitespace-nowrap px-6 sm:px-8 py-4 rounded-control bg-accent-primary text-on-accent font-semibold text-[13px] uppercase tracking-[0.12em] [transition-property:transform,background-color] hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              >
                Get Instant Quote
                <ArrowRight className="hidden sm:block w-4 h-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
              </button>
              <a
                href="#materials"
                className="hover-lift flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap px-6 sm:px-8 py-4 rounded-control border border-text-primary/25 bg-transparent text-text-primary font-semibold text-[13px] uppercase tracking-[0.12em] [transition-property:transform,border-color,background-color] hover:border-text-primary/60 hover:bg-text-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              >
                Explore Materials
              </a>
            </motion.div>
          </motion.div>
        </div>

      </section>
    </MotionConfig>
  );
}
