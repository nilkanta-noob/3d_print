import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { SITE, QUOTE_HREF, whatsappHref } from './content/site';

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

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { href: '/materials', label: 'Materials guide' },
      { href: '/#services', label: 'Services' },
      { href: '/#pricing', label: 'Pricing' },
      { href: '/explore', label: 'Explore ideas' },
      { href: '/gallery', label: 'Gallery' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/about#faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
      { href: QUOTE_HREF, label: 'Get a quote' },
    ],
  },
];

export default function Footer() {
  const whatsapp = whatsappHref(SITE.whatsappNumber);

  return (
    // The page's quietest surface: charcoal rather than the raised band, so the site closes by fading out
    // rather than by putting up one more panel. A single hairline separates it from the page.
    <footer className="border-t border-border bg-background pb-12 pt-24 text-text-secondary md:pt-32">
      <div className="site-frame">

        {/* The wordmark and the statement sit alone across the top — the footer's own masthead. */}
        <div className="grid gap-12 border-b border-border pb-16 lg:grid-cols-12 lg:gap-20 lg:pb-20">
          <div className="lg:col-span-5">
            <p className="font-display text-[15px] font-semibold uppercase tracking-[0.26em] text-text-primary">
              Print<span className="text-accent-primary">Warriors</span>
            </p>
            <p className="mt-8 max-w-[34ch] font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.035em] text-text-primary">
              We help turn ideas into real products.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label-micro text-text-muted">Precision · Speed · Reliability</p>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.75] text-text-secondary">
              Closing the cost gap for students and engineers to rapidly iterate from CAD to physical parts.
            </p>
          </div>
        </div>

        {/* Three link columns and contact, on one editorial grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {COLUMNS.map((column) => (
            <div key={column.title} className="lg:col-span-3">
              <h2 className="label-micro text-text-muted">{column.title}</h2>
              <nav aria-label={column.title} className="mt-8 flex flex-col items-start gap-4 text-[15px]">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="transition-colors duration-200 hover:text-text-primary">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Contact. min-w-0 lets this column shrink: grid items refuse to go below their content's
              width by default, and at 1024px the email address is wider than its column, which pushed the
              whole page 3px sideways. With the column free to shrink, the address wraps instead. */}
          <div className="flex min-w-0 flex-col items-start lg:col-span-3">
            <h2 className="label-micro text-text-muted">Contact</h2>
            <div className="mt-8 flex min-w-0 max-w-full flex-col gap-4 text-[15px]">
              {/* break-all, not break-words: an address is one unbroken word, and break-words still holds the
                  box open to its width. min-w-0 lets the flex item itself shrink. */}
              <a href={`mailto:${SITE.email}`} className="flex min-w-0 items-start gap-2.5 break-all transition-colors duration-200 hover:text-text-primary">
                <Mail className="mt-1 size-4 shrink-0" strokeWidth={1.5} /> {SITE.email}
              </a>
              {whatsapp && (
                <a href={whatsapp} className="flex items-center gap-2.5 transition-colors duration-200 hover:text-text-primary">
                  <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} /> WhatsApp
                </a>
              )}
              <span className="flex items-center gap-2.5 text-text-muted">
                <MapPin className="size-4 shrink-0" strokeWidth={1.5} /> {SITE.location}
              </span>
            </div>
          </div>

          {/* Social — square hairline tiles, matching the site's geometry */}
          <div className="flex gap-3 sm:col-span-2 lg:col-span-3 lg:justify-end">
            {[
              { label: 'Instagram', Icon: InstagramIcon },
              { label: 'LinkedIn', Icon: LinkedinIcon },
              { label: 'YouTube', Icon: YoutubeIcon },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="hover-lift grid size-10 place-items-center rounded-chip border border-border text-text-secondary [transition-property:transform,color,border-color] hover:border-text-primary/30 hover:text-text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-10 md:flex-row md:items-center">
          <p className="label-micro text-text-muted">
            © {new Date().getFullYear()} PrintWarriors
          </p>
          <div className="label-micro flex gap-8">
            <a href="#" className="text-text-muted transition-colors duration-200 hover:text-text-primary">Privacy Policy</a>
            <a href="#" className="text-text-muted transition-colors duration-200 hover:text-text-primary">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
