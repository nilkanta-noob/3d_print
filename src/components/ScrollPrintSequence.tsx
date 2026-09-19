"use client";

import React, { useEffect, useRef } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

// PLACEHOLDER: public/hero-poster.jpg does not exist yet. Export a still frame
// from public/hero___video.mp4 and save it at exactly this path. Until then the
// poster request 404s and the browser falls back to the video's first frame.
const HERO_POSTER = '/hero-poster.jpg';

const TRUST_POINTS = ['Fast Turnaround', 'Multiple Materials', 'Engineering-Grade Precision'];

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
      {/* data-theme="dark": the hero is always dark (light text over footage), whichever theme the site is in */}
      <section data-theme="dark" className="relative min-h-svh w-full flex items-start lg:items-center overflow-hidden bg-background">

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
          {/* Charcoal overlay: linear-gradient(rgba(27,29,33,0.65), rgba(27,29,33,0.55)) via the dark background token */}
          <div className="absolute inset-0 bg-linear-to-b from-background/65 to-background/55"></div>
          {/* Legibility scrim behind the copy only — top band on mobile, left side on desktop. Charcoal too,
              and it fades to nothing before the print head, so the machine keeps the base overlay alone. */}
          <div className="absolute inset-0 bg-linear-to-b from-background/60 from-40% to-transparent to-65% lg:bg-linear-to-r lg:from-background/50 lg:from-20% lg:to-transparent lg:to-50%"></div>
        </div>

        {/* pt/pb offset by the 64px navbar, so the content is centred in the visible area below it */}
        <div className="container relative z-20 mx-auto px-4 pt-32 pb-16">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {/* Original brand headline: Outfit Black (900), uppercase, tight tracking, always exactly two lines.
                Phones: 60px (text-6xl) from ~375px wide, scaling down below that so "YOU THINK," never clips.
                The soft neutral shadow keeps the red line legible over bright spots in the video. */}
            <motion.h1
              variants={rise}
              className="text-[clamp(2.75rem,16vw,3.75rem)] md:text-7xl xl:text-[6rem] font-black uppercase tracking-[-0.05em] leading-[0.88] text-text-primary whitespace-nowrap [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
            >
              YOU THINK,
              <br />
              <span className="text-accent-primary">WE PRINT.</span>
            </motion.h1>

            {/* 550px reading width; at 18px the longer sentence (~28em) fits, so it stays on two lines */}
            <motion.p
              variants={rise}
              className="mt-8 lg:mt-10 max-w-[550px] font-sans font-medium leading-relaxed text-text-secondary text-base sm:text-lg"
            >
              Turn your CAD files into precision-engineered parts.
              <br className="hidden sm:block" />
              {' '}Fast quotes. Multiple materials. Reliable results.
            </motion.p>

            <motion.div variants={rise} className="mt-10 lg:mt-12 flex flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenQuery}
                className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-6 py-3.5 rounded-md border border-transparent bg-accent-primary text-on-accent font-semibold text-sm sm:text-base shadow-lg shadow-black/30 transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-hover hover:shadow-xl hover:shadow-black/50 motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              >
                Get Instant Quote
                <ArrowRight className="hidden sm:block w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
              </button>
              <a
                href="#materials"
                className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap px-4 sm:px-6 py-3.5 rounded-md border border-text-primary/30 bg-transparent text-text-primary font-semibold text-sm sm:text-base transition-colors duration-200 hover:border-text-primary/70 hover:bg-text-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              >
                Explore Materials
              </a>
            </motion.div>

            <motion.ul variants={rise} className="mt-10 lg:mt-12 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-text-muted">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <Check className="w-3 h-3 shrink-0 opacity-70" strokeWidth={2} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

      </section>
    </MotionConfig>
  );
}
