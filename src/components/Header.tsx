"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Layers } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS, QUOTE_HREF } from './content/site';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  // The mobile menu belongs to the page it was opened on, so navigating anywhere closes it automatically
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;
  const closeMenu = () => setMenuOpenOn(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpenOn(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const quoteActive = isActive(pathname, QUOTE_HREF);

  return (
    // Anchored, not floating: the theme background at 95% (dark: rgba(27,29,33,0.95)), 16px backdrop blur,
    // and the 8% warm-ivory hairline border
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="xl:hidden text-text-secondary hover:text-text-primary transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2.5 group min-w-0">
            {/* PrintWarriors Logo Mark */}
            <div className="hidden sm:flex items-center justify-center w-8 h-8 border border-border rounded-md group-hover:border-text-primary/40 transition-colors">
              <Layers className="w-4 h-4 text-text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-[13px] sm:text-sm font-display font-bold tracking-[0.14em] sm:tracking-[0.2em] text-text-primary uppercase whitespace-nowrap">
              Print<span className="text-text-secondary">Warriors</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden xl:flex items-center gap-7 font-medium text-xs tracking-widest uppercase text-text-secondary">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={active ? 'text-accent-primary' : 'hover:text-text-primary transition-colors'}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions — deliberately low-weight: the hero owns the primary CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <Link
            href={QUOTE_HREF}
            aria-current={quoteActive ? 'page' : undefined}
            className={`px-3.5 py-1.5 rounded-md border bg-transparent text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${quoteActive
              ? 'border-accent-primary text-accent-primary'
              : 'border-text-primary/20 hover:border-text-primary/50 text-text-primary'
              }`}
          >
            Get Quote
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="xl:hidden max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-background">
          <ul className="container mx-auto px-4 py-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 border-b border-border py-3.5 text-base font-medium transition-colors ${active ? 'text-accent-primary' : 'text-text-primary hover:text-text-secondary'}`}
                  >
                    <span className={`h-4 w-0.5 rounded-full ${active ? 'bg-accent-primary' : 'bg-transparent'}`} aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="container mx-auto px-4 pb-6 pt-2">
            <Link
              href={QUOTE_HREF}
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-md bg-accent-primary px-6 py-3.5 text-base font-semibold text-on-accent transition-colors hover:bg-accent-hover"
            >
              Get a quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
