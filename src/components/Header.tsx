"use client";

import Wordmark from './Wordmark';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { HERO_CTA_ID, NAV_LINKS, QUOTE_HREF } from './content/site';

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

  /*
   * Whether the bar carries its own quote button. Phones only — from 760px it is always there, and
   * these classes simply do not apply.
   *
   * A phone's bar has room for about two things, so the button earns its place rather than holding it:
   * on the home page it is the hero button's understudy and appears exactly when the hero's own leaves
   * the screen, so the same offer is never on screen twice; elsewhere there is no hero button to
   * watch, so it arrives once the page has clearly been scrolled; and on the quote page itself it
   * never appears, because the page IS the offer.
   */
  const onQuotePage = pathname === QUOTE_HREF;
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    // Nothing to watch on the quote page: the class list hides the button there outright, so the
    // state it would read is never consulted.
    if (onQuotePage) return;

    const heroCta = document.getElementById(HERO_CTA_ID);
    if (heroCta) {
      const observer = new IntersectionObserver(([entry]) => setShowQuote(!entry.isIntersecting));
      observer.observe(heroCta);
      return () => observer.disconnect();
    }

    // No hero button on this page — fall back to distance scrolled.
    const onScroll = () => setShowQuote(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname, onQuotePage]);

  // The bar is invisible over the top of the hero and materialises as a card once the page moves. 8px
  // rather than 0 so a trackpad's rubber-band at the top of the page does not flicker it on and off.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      {/* The bar floats: inset from the top and both sides so it reads as a card laid over the page rather
          than a band bolted to it. Over the hero it is invisible and the links sit straight on the
          artwork; the moment the page scrolls it fills in, takes its hairline and carries the content
          past it. Opaque, not translucent, and no backdrop blur — the design system's rule. */}
      <header
        className="fixed inset-x-0 top-0 z-50 px-[var(--nav-inset)] pt-[var(--nav-inset)]"
      >
        <div className="mx-auto w-full max-w-[120rem]">
          <div
            className={`flex h-[var(--nav-bar-h)] items-center justify-between gap-1 min-[760px]:gap-4 rounded-control border px-2 min-[760px]:px-5 lg:px-7 [transition-property:background-color,border-color] duration-300 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
              scrolled ? 'border-border bg-surface' : 'border-transparent bg-transparent'
            }`}
          >
          {/* Wordmark — text only, one element so PRINT and WARRIORS share a baseline.
              A touch smaller on 1024–1279px laptops so the centred links keep their room. */}
          <Link
            href="/"
            className="justify-self-start whitespace-nowrap font-display font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-70"
          >
            <Wordmark size="nav" />
          </Link>

          {/* Desktop navigation — no menu button at any laptop/desktop width. Link gaps widen with the screen:
              24px (1024px, 11px type) → 32px (1152px, 12px type) → 40px (1216px) → 44px (1280px) → 64px (1440px) → 72px (1536px+).
              Each step keeps the space between the wordmark and the first link larger than the gaps between links. */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white lg:flex min-[72rem]:gap-[1.125rem] min-[72rem]:tracking-[0.15em] min-[76rem]:gap-5 xl:gap-[1.375rem] min-[90rem]:gap-6 2xl:gap-7"
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
                    active ? 'after:opacity-100' : 'hover:opacity-70 after:opacity-0 hover:after:opacity-60'
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
              /*
                It keeps its place in the row whether or not it is showing, so nothing moves when it
                arrives: the right-hand group grows leftward and the menu icon stays on the bar's edge.
                visibility rather than opacity alone, so a button nobody can see is also a button nobody
                can tab to. `translate` rather than a transform, because hover-lift owns the transform.
              */
              className={`hover-lift inline-flex h-9 items-center whitespace-nowrap rounded-control bg-accent-primary px-2.5 min-[400px]:px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-accent [transition-property:translate,opacity,visibility,transform,background-color] duration-200 motion-reduce:transition-none hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary min-[760px]:visible min-[760px]:h-8 min-[760px]:px-4 min-[760px]:opacity-100 min-[760px]:[translate:0_0] lg:h-9 lg:px-5 lg:text-xs ${
                onQuotePage ? 'max-[759.98px]:hidden' : ''
              } ${showQuote ? 'visible opacity-100 [translate:0_0]' : 'invisible opacity-0 [translate:8px_0]'}`}
            >
              {/* 360px phones have about 320px of bar, and the wordmark and a 44px tap
                  target claim most of it. The short label is what makes the three fit on
                  one row with 12px between them; the full one returns when there is room. */}
              <span className="min-[400px]:hidden">Quote</span>
              <span className="hidden min-[400px]:inline">Get Quote</span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="-mr-2.5 grid size-11 shrink-0 place-items-center text-text-secondary transition-colors hover:text-text-primary lg:hidden"
            >
              {/* The two icons are stacked in one box and swapped by opacity rather than by replacing the
                  node. Swapping the element makes the glyph appear at full strength on the same frame the
                  old one vanishes, which reads as a click even though the button itself has not moved;
                  crossing them over the same 300ms as the panel keeps the whole bar on one clock. */}
              <span className="relative block h-5 w-5" aria-hidden="true">
                <Menu
                  className={`absolute inset-0 h-5 w-5 transition-opacity duration-300 motion-reduce:transition-none ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <X
                  className={`absolute inset-0 h-5 w-5 transition-opacity duration-300 motion-reduce:transition-none ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                />
              </span>
            </button>
          </div>
          </div>
        </div>
      </header>

      {/*
        Full-screen mobile menu, beneath the bar so the close button stays reachable.

        It is always mounted and hidden with opacity instead of being conditionally rendered. Mounting it
        on open is what made it snap: the panel arrived fully painted on a single frame, with no state to
        transition from, so there was nothing for a duration to apply to. Kept in the tree it simply
        cross-fades, which is the whole of the effect — it does not slide, scale or wipe, and the links do
        not stagger. They are laid out at their final positions before the fade begins, so nothing moves
        while it plays and there is no reflow to go wrong.

        visibility rather than display, because display cannot be transitioned: it would cut the fade off
        at the first frame. visibility also takes the closed panel out of hit-testing, so it cannot
        swallow a tap on the page behind it, and inert plus aria-hidden take it out of the tab order and
        the accessibility tree — none of which a plain opacity-0 would do.

        300ms, the same as the bar's own colour transition above, so the bar and the panel move on one
        clock. That single shared duration is what the whole thing rests on.
      */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background pt-16 [transition-property:opacity,visibility] duration-300 motion-reduce:transition-none lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
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
        {/* The menu's own closing action. Dropped on the quote page, where it would be an invitation
            to the page already underneath the menu. */}
        {!onQuotePage && (
          <div className="site-frame mt-auto pb-8 pt-4">
            <Link
              href={QUOTE_HREF}
              onClick={closeMenu}
              className="group flex w-full items-center justify-center gap-2.5 rounded-control bg-accent-primary px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-on-accent transition-colors hover:bg-accent-hover"
            >
              Get a quote
              <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        )}
      </nav>
    </MotionConfig>
  );
}
