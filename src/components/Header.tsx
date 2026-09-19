import React from 'react';
import { Menu, Layers } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onOpenQuery: () => void;
}

export default function Header({ onOpenQuery }: HeaderProps) {
  return (
    // Anchored, not floating: the theme background at 95% (dark: rgba(27,29,33,0.95)), 16px backdrop blur,
    // and the 8% warm-ivory hairline border
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button className="lg:hidden text-text-secondary hover:text-text-primary transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <a href="/" className="flex items-center gap-2.5 group min-w-0">
            {/* PrintWarriors Logo Mark */}
            <div className="hidden sm:flex items-center justify-center w-8 h-8 border border-border rounded-md group-hover:border-text-primary/40 transition-colors">
              <Layers className="w-4 h-4 text-text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-[13px] sm:text-sm font-display font-bold tracking-[0.14em] sm:tracking-[0.2em] text-text-primary uppercase whitespace-nowrap">
              Print<span className="text-text-secondary">Warriors</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-xs tracking-widest uppercase text-text-secondary">
          <a href="#services" className="hover:text-text-primary transition-colors">Services</a>
          <a href="#materials" className="hover:text-text-primary transition-colors">Materials</a>
          <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-text-primary transition-colors">FAQ</a>
        </nav>

        {/* Right Actions — deliberately low-weight: the hero owns the primary (red) CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            onClick={onOpenQuery}
            className="px-3.5 py-1.5 rounded-md border border-text-primary/20 hover:border-text-primary/50 bg-transparent text-[13px] font-medium text-text-primary whitespace-nowrap transition-colors duration-200"
          >
            Instant Quote
          </button>
        </div>
      </div>
    </header>
  );
}
