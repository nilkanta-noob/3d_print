"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, QUOTE_HREF } from './content/site';

function isActive(pathname: string, href: string) {
  if (href.includes('#')) return false; // home page sections, not pages
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

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

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed top-0 z-50 w-full">
        {/* The charcoal bar, solid from the top of the page with an 8% cool-white hairline under it.
            It used to stay transparent until the page scrolled, but the hero footage's top edge is bright
            orange and lime bokeh: over it the links fell to 1.5–2.8:1 and the accent "WARRIORS" to
            2.3–3.8:1. A solid bar is the clean fix — a crisp edge, not a gradient fading into the video —
            and it frames the footage as a rectangle below the navigation. Opaque rather than 95%, so no
            colour from the video tints through behind the links. No backdrop blur. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 border-b border-border bg-background" />

        {/* site-frame: full-width with narrow gutters, so the wordmark and Get Quote sit near the screen edges.
            Desktop and laptops (lg, 1024px+): three columns — wordmark left, links centred, Get Quote right.
            Phones and tablets: wordmark left, Get Quote + menu button right. */}
        {/* A taller bar from 1024px (96px) gives the links more air above and below than a standard navbar —
            the same restraint the sections below it use. Both heights live on --nav-h in globals.css,
            because the hero has to pad itself by exactly this much and the two must not drift apart. */}
        <div className="site-frame flex h-[var(--nav-h)] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Wordmark — text only, one element so PRINT and WARRIORS share a baseline.
              A touch smaller on 1024–1279px laptops so the centred links keep their room. */}
          <Link
            href="/"
            className="justify-self-start whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-70 sm:text-[15px] sm:tracking-[0.26em] lg:text-[15px] lg:tracking-[0.24em] xl:tracking-[0.26em]"
          >
            Print<span className="text-accent-primary">Warriors</span>
          </Link>

          {/* Desktop navigation — no menu button at any laptop/desktop width. Link gaps widen with the screen:
              24px (1024px, 11px type) → 32px (1152px, 12px type) → 40px (1216px) → 44px (1280px) → 64px (1440px) → 72px (1536px+).
              Each step keeps the space between the wordmark and the first link larger than the gaps between links. */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary lg:flex min-[72rem]:gap-6 min-[72rem]:tracking-[0.18em] min-[76rem]:gap-7 xl:gap-8 min-[90rem]:gap-10 2xl:gap-12"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                // The current page is marked by an accent hairline under the label rather than a filled
                // pill or a colour swap alone — the quietest marker that still reads at a glance.
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-1 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-accent-primary after:transition-opacity after:duration-300 ${
                    active ? 'text-text-primary after:opacity-100' : 'hover:text-text-primary after:opacity-0 hover:after:opacity-60'
                  }`}
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
              className="hover-lift inline-flex h-9 items-center whitespace-nowrap rounded-control bg-accent-primary px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-accent [transition-property:transform,background-color] hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary sm:px-5 lg:h-11 lg:px-6 lg:text-xs"
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
          <ul className="site-frame py-8">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-baseline gap-4 border-b border-border py-6 font-display text-3xl font-medium tracking-[-0.035em] transition-colors ${active ? 'text-accent-primary' : 'text-text-primary hover:text-text-secondary'}`}
                  >
                    <span className={`label-micro w-6 shrink-0 ${active ? 'text-accent-primary' : 'text-text-muted'}`} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="site-frame mt-auto pb-8 pt-4">
            <Link
              href={QUOTE_HREF}
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-control bg-accent-primary px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-on-accent transition-colors hover:bg-accent-hover"
            >
              Get a quote
            </Link>
          </div>
        </nav>
      )}
    </MotionConfig>
  );
}
