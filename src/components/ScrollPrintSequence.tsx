"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollPrintSequence() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-transparent overflow-hidden">
      
      <div className="container relative z-20 mx-auto px-4 flex flex-col justify-center items-start h-full text-left">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold text-text-primary uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
            You think, <br/> 
            <span className="text-accent-primary">we print.</span>
          </h1>
          <p className="mt-8 text-xl text-text-primary/90 max-w-xl font-sans drop-shadow-lg">
            Upload your CAD geometry. Our industrial machines handle the rest.
          </p>
        </motion.div>

      </div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center drop-shadow-lg"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">Scroll To Explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent"></div>
      </motion.div>

    </section>
  );
}
