import React from 'react';
import { Layers, Zap, Droplet } from 'lucide-react';

export default function MaterialsSection() {
  return (
    <section className="py-24 bg-transparent border-t border-border/50" id="materials">
      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-text-primary uppercase tracking-tight mb-4">
            Materials <span className="text-accent-primary">Guide</span>
          </h2>
          <p className="text-text-muted text-lg font-sans">
            Compare material properties to select the optimal filament for your engineering, prototyping, or display application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* PLA */}
          <div className="bg-surface border border-border hover:border-accent-primary/30 p-8 flex flex-col transition-colors duration-300">
            <div className="w-12 h-12 bg-accent-primary-deep/20 border border-accent-primary/20 rounded-sm flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-accent-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-display font-black text-text-primary tracking-widest uppercase mb-3">PLA</h3>
            <p className="text-text-muted mb-8 leading-relaxed flex-1">
              The industry standard for high-detail visual models and rapid non-functional prototyping. Excellent dimensional accuracy.
            </p>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">Applications</h4>
              <ul className="text-sm text-text-primary opacity-80 space-y-2">
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Visual prototypes and display models</li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Low-stress, easy-to-print parts</li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Best entry point — fast, cheap</li>
              </ul>
            </div>
          </div>

          {/* PLA Pro+ */}
          <div className="bg-surface border border-border hover:border-accent-primary/30 p-8 flex flex-col transition-colors duration-300 relative">
            <div className="absolute top-0 right-0 bg-accent-primary-deep/20 text-accent-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-b border-l border-accent-primary/20">
              Engineering
            </div>
            <div className="w-12 h-12 bg-accent-primary-deep/20 border border-accent-primary/20 rounded-sm flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-accent-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-display font-black text-text-primary tracking-widest uppercase mb-3">PLA Pro+</h3>
            <p className="text-text-muted mb-8 leading-relaxed flex-1">
              A step up in toughness and layer adhesion from standard PLA, while staying easy to print — the middle ground before PETG.
            </p>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">Applications</h4>
              <ul className="text-sm text-text-primary opacity-80 space-y-2">
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Functional prototypes (durability)</li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Brackets, enclosures, jigs</li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Light-mechanical-stress parts</li>
              </ul>
            </div>
          </div>

          {/* PETG */}
          <div className="bg-surface border border-border hover:border-accent-primary/30 p-8 flex flex-col transition-colors duration-300">
            <div className="w-12 h-12 bg-accent-primary-deep/20 border border-accent-primary/20 rounded-sm flex items-center justify-center mb-6">
              <Droplet className="w-6 h-6 text-accent-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-display font-black text-text-primary tracking-widest uppercase mb-3">PETG</h3>
            <p className="text-text-muted mb-8 leading-relaxed flex-1">
              More impact-resistant and flexible than PLA, better dimensional stability than ABS. Ideal for parts needing real durability.
            </p>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">Applications</h4>
              <ul className="text-sm text-text-primary opacity-80 space-y-2">
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Water-resistant containers</li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Snap-fit joints</li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-accent-primary">Mechanical parts (moderate stress)</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
