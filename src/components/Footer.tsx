import React from 'react';
import Link from 'next/link';
import { SITE } from './content/site';

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

const NAV = [
  { href: '/materials', label: 'Materials' },
  { href: '/#services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const SOCIAL = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'LinkedIn', Icon: LinkedinIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
];

/*
 * Supporting information, not another page.
 *
 * It used to open with its own masthead — a wordmark, a 28px statement and a second standfirst beside it —
 * then a four-column link grid, then a bottom bar, on 96/128px of padding. That is a page's worth of
 * structure for a set of links. What is left is three columns, a rule and a line of small print, on the
 * darkest surface on the site so the page closes by going quiet rather than by putting up one more panel.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 bg-surface-deep pb-8 pt-14 text-text-secondary">
      <div className="site-frame">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">

          <div>
            <p className="font-display text-[19px] font-semibold uppercase tracking-[0.2em] text-text-primary">
              Print<span className="text-accent-primary">Warriors</span>
            </p>
            <p className="mt-3 max-w-[30ch] text-[15px]">
              Precision 3D printing for prototypes and functional parts.
            </p>
          </div>

          {/* The two link columns travel together, so the space between them is a value we set rather
              than whatever is left over after dividing the frame in three. */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-24">
          <div>
            <h2 className="label-micro text-text-muted">Navigation</h2>
            <nav aria-label="Footer" className="mt-3 flex flex-col items-start gap-2 text-[15px]">
              {NAV.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors duration-200 hover:text-text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* min-w-0 lets this column shrink: a grid item will not go below its content's width by
              default, and the address is wider than the column at some sizes, which pushed the whole
              page sideways. With the column free to shrink, the address wraps instead. */}
          <div className="flex min-w-0 flex-col items-start">
            <h2 className="label-micro text-text-muted">Contact</h2>
            <div className="mt-3 flex min-w-0 max-w-full flex-col gap-2 text-[15px]">
              <a href={`mailto:${SITE.email}`} className="min-w-0 break-all transition-colors duration-200 hover:text-text-primary">
                {SITE.email}
              </a>
              <span className="text-text-muted">{SITE.location}</span>
            </div>

            {/* Social sits with the contact details rather than in a row of its own. Given three small
                tiles, a dedicated bottom-right slot cost more vertical space than the icons occupy. */}
            <div className="mt-4 flex gap-2.5">
              {SOCIAL.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="hover-lift grid size-9 place-items-center rounded-chip border border-border text-text-secondary [transition-property:transform,color,border-color] hover:border-accent-primary/50 hover:text-accent-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="label-micro text-text-muted">
            © {new Date().getFullYear()} PrintWarriors
          </p>
        </div>

      </div>
    </footer>
  );
}
