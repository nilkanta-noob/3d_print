"use client";

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, MotionConfig } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, QUOTE_HREF } from './content/site';

// The charcoal bar appears once the page has scrolled this far, and disappears again back at the very top
const SOLID_AFTER_PX = 24;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

const isScrolledPastTop = () => window.scrollY > SOLID_AFTER_PX;

function isActive(pathname: string, href: string) {
  if (href.includes('#')) return false; // home page sections, not pages
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolledPastTop, () => false);

  // The mobile menu belongs to the page it was opened on, so navigating anywhere closes it
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;
  const closeMenu = () => setMenuOpenOn(null);

  // Full-screen mobile menu: lock page scroll behind it and close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpenOn(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed top-0 z-50 w-full">
        {/* The charcoal bar: out of view at the top of the page, slides down once the page scrolls.
            rgba(27,29,33,0.95), 16px backdrop blur, 8% warm-ivory hairline. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 border-b border-border bg-background/95 backdrop-blur-lg"
          initial={false}
          animate={{ y: solid ? '0%' : '-100%', opacity: solid ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* site-frame: full-width with narrow gutters, so the wordmark and Get Quote sit near the screen edges.
            Desktop and laptops (lg, 1024px+): three columns — wordmark left, links centred, Get Quote right.
            Phones and tablets: wordmark left, Get Quote + menu button right. */}
        <div className="site-frame flex h-16 items-center justify-between gap-4 lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
          {/* Wordmark — text only, one element so PRINT and WARRIORS share a baseline.
              A touch smaller on 1024–1279px laptops so the centred links keep their room. */}
          <Link
            href="/"
            className="justify-self-start whitespace-nowrap font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-80 sm:text-base sm:tracking-[0.2em] lg:text-[15px] lg:tracking-[0.18em] xl:text-base xl:tracking-[0.2em]"
          >
            Print<span className="text-accent-primary">Warriors</span>
          </Link>

          {/* Desktop navigation — no menu button at any laptop/desktop width. Link gaps widen with the screen:
              24px (1024px, 11px type) → 32px (1152px, 12px type) → 40px (1216px) → 44px (1280px) → 64px (1440px) → 72px (1536px+).
              Each step keeps the space between the wordmark and the first link larger than the gaps between links. */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-6 text-[11px] font-medium uppercase tracking-[0.14em] text-text-secondary lg:flex min-[72rem]:gap-8 min-[72rem]:text-xs min-[72rem]:tracking-[0.16em] min-[76rem]:gap-10 xl:gap-11 min-[90rem]:gap-16 2xl:gap-18"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'text-accent-primary' : 'transition-colors hover:text-text-primary'}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Get Quote — the navbar's one solid CTA — and, on phones and tablets only, the menu button */}
          <div className="flex shrink-0 items-center gap-3 justify-self-end">
            <Link
              href={QUOTE_HREF}
              aria-current={isActive(pathname, QUOTE_HREF) ? 'page' : undefined}
              className="inline-flex h-9 items-center whitespace-nowrap rounded-md bg-accent-primary px-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary sm:px-4 lg:h-10 lg:px-5 lg:text-[13px] lg:tracking-[0.12em]"
            >
              Get Quote
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="-mr-2 p-2 text-text-secondary transition-colors hover:text-text-primary lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu, beneath the bar so the close button stays reachable */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background pt-16 lg:hidden">
          <ul className="container mx-auto px-4 py-4">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 border-b border-border py-4 font-display text-2xl font-bold transition-colors ${active ? 'text-accent-primary' : 'text-text-primary hover:text-text-secondary'}`}
                  >
                    <span className={`h-5 w-0.5 rounded-full ${active ? 'bg-accent-primary' : 'bg-transparent'}`} aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="container mx-auto mt-auto px-4 pb-8 pt-4">
            <Link
              href={QUOTE_HREF}
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-md bg-accent-primary px-6 py-4 text-base font-semibold text-on-accent transition-colors hover:bg-accent-hover"
            >
              Get a quote
            </Link>
          </div>
        </nav>
      )}
    </MotionConfig>
  );
}
