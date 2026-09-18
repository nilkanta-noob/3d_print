import React, { useState } from 'react';
import { Menu, Layers } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface HeaderProps {
  onOpenQuery: () => void;
}

export default function Header({ onOpenQuery }: HeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 border-b ${isScrolled
        ? 'bg-background/85 backdrop-blur-md border-border'
        : 'bg-transparent border-transparent'
        }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button className="lg:hidden text-text-muted hover:text-text-primary transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <a href="/" className="flex items-center gap-2.5 group min-w-0">
            {/* PrintWarriors Logo Mark */}
            <div className="hidden sm:flex items-center justify-center w-8 h-8 border border-border rounded-md group-hover:border-text-primary/40 transition-colors">
              <Layers className="w-4 h-4 text-text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-[13px] sm:text-sm font-display font-bold tracking-[0.14em] sm:tracking-[0.2em] text-text-primary uppercase whitespace-nowrap">
              Print<span className="text-text-muted">Warriors</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-xs tracking-widest uppercase text-text-muted">
          <a href="#services" className="hover:text-text-primary transition-colors">Services</a>
          <a href="#materials" className="hover:text-text-primary transition-colors">Materials</a>
          <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-text-primary transition-colors">FAQ</a>
        </nav>

        {/* Right Actions — deliberately low-weight: the hero owns the primary (red) CTA */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenQuery}
            className="px-3.5 py-1.5 rounded-md border border-text-primary/20 hover:border-text-primary/50 bg-transparent text-[13px] font-medium text-text-primary whitespace-nowrap transition-colors duration-200"
          >
            Instant Quote
          </button>
        </div>
      </div>
    </motion.header>
  );
}
