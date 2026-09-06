"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import ScrollPrintSequence from '@/components/ScrollPrintSequence';
import AboutSection from '@/components/AboutSection';
import PricingSection from '@/components/PricingSection';
import MaterialsSection from '@/components/MaterialsSection';
import QueryFormModal, { QuoteFormCore } from '@/components/QueryForm';
import { Layers, Mail } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Home() {
  const [isQueryFormOpen, setIsQueryFormOpen] = useState(false);

  return (
    <div className="min-h-screen text-text-primary font-sans selection:bg-accent-primary/30 relative">
      
      {/* GLOBAL FIXED BACKGROUND VIDEO */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video 
          src="/hero___video.mp4" 
          className="w-full h-full object-cover brightness-[0.4]"
          playsInline
          autoPlay
          muted
          loop
        />
        {/* Dark overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-background/50 z-10"></div>
        <div className="absolute inset-0 bg-accent-primary-deep/5 mix-blend-overlay z-10"></div>
      </div>

      <div className="relative z-10">
        <Header onOpenQuery={() => setIsQueryFormOpen(true)} />
        
        <main>
          <ScrollPrintSequence />
          <AboutSection />
          <MaterialsSection />
          <PricingSection />

          {/* Embedded Form Section */}
          <section className="py-24 relative overflow-hidden border-t border-border/50 bg-transparent" id="quote">
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary uppercase tracking-tight mb-4 drop-shadow-lg">
                  Initialize <span className="text-accent-primary">Manufacture</span>
                </h2>
                <p className="text-text-primary/80 uppercase tracking-widest text-sm font-mono drop-shadow-md">
                  Upload geometry. Receive quotation. Deploy part.
                </p>
              </div>
              
              {/* Embedded core form */}
              <div className="shadow-2xl rounded-sm overflow-hidden border border-border/50 backdrop-blur-xl bg-surface/40">
                 <QuoteFormCore />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-background/80 backdrop-blur-md text-text-muted pt-20 pb-10 border-t border-border/50">
          <div className="container mx-auto px-4">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              
              {/* Brand Column */}
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-3 mb-4 group">
                  <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden bg-background border border-border/50 rounded-sm group-hover:border-accent-primary/50 transition-colors">
                    <Layers className="w-4 h-4 text-accent-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </div>
                  <span className="font-display font-bold tracking-widest text-text-primary uppercase text-lg group-hover:text-accent-primary transition-colors">
                    PrintWarriors
                  </span>
                </div>
                <p className="uppercase tracking-widest text-xs text-accent-primary font-mono mb-4">Precision. Speed. Reliability.</p>
                <p className="text-sm font-sans opacity-80 max-w-xs leading-relaxed">
                  Closing the cost gap for students and engineers to rapidly iterate from CAD to physical parts.
                </p>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col items-start">
                <h4 className="font-bold text-xs uppercase tracking-widest text-text-primary mb-6">Quick Links</h4>
                <nav className="flex flex-col gap-4 text-sm">
                  <a href="#materials" className="hover:text-accent-primary transition-colors">Materials Guide</a>
                  <a href="#pricing" className="hover:text-accent-primary transition-colors">Transparent Pricing</a>
                  <a href="#quote" className="hover:text-accent-primary transition-colors">Get a Quote</a>
                  <a href="#about" className="hover:text-accent-primary transition-colors">About</a>
                </nav>
              </div>

              {/* Contact & Social */}
              <div className="flex flex-col items-start">
                <h4 className="font-bold text-xs uppercase tracking-widest text-text-primary mb-6">Contact & Service Area</h4>
                <div className="flex flex-col gap-4 text-sm mb-8">
                  <a href="mailto:hello@printwarriors.com" className="hover:text-accent-primary transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" /> hello@printwarriors.com
                  </a>
                  <span className="flex items-center gap-2 opacity-80">
                    Kolkata, West Bengal
                  </span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-background border border-border/50 rounded-sm text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all">
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 bg-background border border-border/50 rounded-sm text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 bg-background border border-border/50 rounded-sm text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all">
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-text-muted font-sans opacity-80 uppercase tracking-widest">
                © {new Date().getFullYear()} PrintWarriors. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs uppercase tracking-widest">
                <a href="#" className="hover:text-accent-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent-primary transition-colors">Terms of Service</a>
              </div>
            </div>

          </div>
        </footer>
      </div>

      <QueryFormModal 
        isOpen={isQueryFormOpen} 
        onClose={() => setIsQueryFormOpen(false)} 
      />
    </div>
  );
}
