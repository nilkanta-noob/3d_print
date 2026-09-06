import React, { useState } from 'react';
import { Menu, Upload, Layers } from 'lucide-react';
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
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
        ? 'bg-surface/90 backdrop-blur-md border-border shadow-lg'
        : 'bg-transparent border-transparent'
        }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">

        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-text-muted hover:text-text-primary transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <a href="/" className="flex items-center gap-3 group">
            {/* PrintWarriors Logo Mark */}
            <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden bg-surface border border-border rounded-lg group-hover:border-accent-primary/50 transition-colors shadow-lg">
              <Layers className="w-5 h-5 text-accent-primary group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"></div>
            </div>
            <span className="text-xl font-display font-black tracking-widest text-text-primary transition-colors uppercase">
              Print<span className="text-accent-primary">Warriors</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-xs tracking-widest uppercase text-text-muted">
          <a href="#services" className="hover:text-accent-primary transition-colors">Services</a>
          <a href="#materials" className="hover:text-accent-primary transition-colors">Materials</a>
          <a href="#pricing" className="hover:text-accent-primary transition-colors">Pricing</a>
          <a href="#projects" className="hover:text-accent-primary transition-colors">Projects</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center">
          <button
            onClick={onOpenQuery}
            className="group relative flex items-center gap-2 bg-accent-primary hover:bg-accent-primary-deep text-surface px-6 py-2.5 rounded-sm font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
            <Upload className="w-4 h-4" />
            <span>Instant Quote</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
