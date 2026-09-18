"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, HeartPulse, Component, Sparkles, GraduationCap, Hexagon } from 'lucide-react';

const SECTORS = [
  {
    id: 'engineering',
    name: 'Engineering',
    icon: Settings,
    tagline: 'Functional parts and mechanical assemblies.',
    material: 'Recommended: ABS / ASA / PC',
    imageBg: 'from-gray-800 to-gray-900',
    description: 'We print high-stress, dimensionally accurate parts for automotive, aerospace, and robotics applications.'
  },
  {
    id: 'medical',
    name: 'Medical',
    icon: HeartPulse,
    tagline: 'Anatomical models and custom fixtures.',
    material: 'Recommended: Biocompatible Resin / PETG',
    imageBg: 'from-zinc-800 to-zinc-900',
    description: 'Pre-surgical planning models and custom laboratory fixtures printed with extreme precision.'
  },
  {
    id: 'product',
    name: 'Product Design',
    icon: Component,
    tagline: 'Rapid prototyping and form-testing.',
    material: 'Recommended: PLA / Tough Resin',
    imageBg: 'from-slate-800 to-slate-900',
    description: 'Accelerate your hardware development cycle with overnight form and fit prototypes.'
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Art',
    icon: Sparkles,
    tagline: 'High-detail castable models.',
    material: 'Recommended: Castable Wax Resin',
    imageBg: 'from-stone-800 to-stone-900',
    description: 'Master patterns for investment casting with zero ash residue and microscopic detail.'
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    tagline: 'Student projects and research tools.',
    material: 'Recommended: PLA (Student Discount)',
    imageBg: 'from-neutral-800 to-neutral-900',
    description: 'Cost-effective printing for university projects, thesis models, and academic research.'
  }
];

export default function SectorSelector() {
  const [activeSectorId, setActiveSectorId] = useState(SECTORS[0].id);

  const activeSector = SECTORS.find(s => s.id === activeSectorId) || SECTORS[0];

  return (
    <section className="py-24 bg-background border-t border-border/50" id="services">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-text-primary uppercase tracking-tight mb-4">
            Solutions by <span className="text-accent-primary">Industry</span>
          </h2>
          <p className="text-text-muted text-lg font-sans">
            Select your sector to view capabilities and recommended materials.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Sector Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {SECTORS.map((sector) => {
              const Icon = sector.icon;
              const isActive = activeSector.id === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveSectorId(sector.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 border text-left
                    ${isActive 
                      ? 'bg-accent-primary/10 border-accent-primary/50 text-accent-primary' 
                      : 'bg-surface border-border text-text-muted hover:bg-surface/80 hover:text-text-primary'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-accent-primary' : 'text-text-muted'}`} strokeWidth={1.5} />
                  <div>
                    <div className={`font-display font-bold uppercase tracking-widest text-sm ${isActive ? 'text-accent-primary' : 'text-text-primary'}`}>
                      {sector.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Area */}
          <div className="w-full lg:w-2/3 relative h-[400px] rounded-sm overflow-hidden border border-border bg-surface">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col md:flex-row"
              >
                {/* Visual Placeholder for the Sector */}
                <div className={`w-full md:w-1/2 h-48 md:h-full bg-gradient-to-br ${activeSector.imageBg} relative flex items-center justify-center border-b md:border-b-0 md:border-r border-border`}>
                  <Hexagon className="w-32 h-32 text-text-muted/20 absolute" strokeWidth={0.5} />
                  <activeSector.icon className="w-16 h-16 text-text-muted relative z-10" strokeWidth={1} />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-surface">
                  <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-widest mb-2">
                    {activeSector.name}
                  </h3>
                  <p className="text-text-muted text-sm font-sans mb-6">
                    {activeSector.tagline}
                  </p>
                  
                  <p className="text-text-primary opacity-90 text-sm font-sans mb-8 leading-relaxed">
                    {activeSector.description}
                  </p>

                  <div className="mt-auto">
                    <div className="inline-flex items-center gap-2 text-accent-primary font-mono text-sm border border-accent-primary/30 bg-accent-primary/10 px-4 py-2 w-max rounded-sm">
                      <Settings className="w-4 h-4" />
                      {activeSector.material}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>

        </div>
      </div>
    </section>
  );
}
