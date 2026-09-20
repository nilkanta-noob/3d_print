import React from 'react';
import Link from 'next/link';
import { Layers, Mail, MessageCircle, MapPin } from 'lucide-react';
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
    <footer className="bg-surface text-text-secondary pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 gap-12 mb-16 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand Column */}
          <div className="flex flex-col items-start text-left sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 border border-border rounded-md">
                <Layers className="w-4 h-4 text-text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-display font-bold tracking-widest text-text-primary uppercase text-lg">
                PrintWarriors
              </span>
            </div>
            <p className="uppercase tracking-[0.18em] text-xs font-semibold text-text-primary mb-4">Precision. Speed. Reliability.</p>
            <p className="text-sm font-sans text-text-muted max-w-xs leading-relaxed">
              Closing the cost gap for students and engineers to rapidly iterate from CAD to physical parts.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col items-start">
              <h4 className="font-bold text-xs uppercase tracking-widest text-text-primary mb-6">{column.title}</h4>
              <nav aria-label={column.title} className="flex flex-col gap-4 text-sm">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Contact & Social. min-w-0 lets this column shrink: grid items refuse to go below their content's
              width by default, and at 1024px the email address is wider than its column, which pushed the
              whole page 3px sideways. With the column free to shrink, the address wraps instead. */}
          <div className="flex min-w-0 flex-col items-start">
            <h4 className="font-bold text-xs uppercase tracking-widest text-text-primary mb-6">Contact</h4>
            <div className="flex min-w-0 max-w-full flex-col gap-4 text-sm mb-8">
              {/* break-all, not break-words: an address is one unbroken word, and break-words still holds the
                  box open to its width. min-w-0 lets the flex item itself shrink. */}
              <a href={`mailto:${SITE.email}`} className="hover:text-text-primary transition-colors flex min-w-0 items-start gap-2 break-all">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" /> {SITE.email}
              </a>
              {whatsapp && (
                <a href={whatsapp} className="hover:text-text-primary transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp
                </a>
              )}
              <span className="flex items-center gap-2 text-text-muted">
                <MapPin className="w-4 h-4 shrink-0" /> {SITE.location}
              </span>
            </div>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="p-2 bg-elevated border border-border rounded-full text-text-secondary hover:text-text-primary transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 bg-elevated border border-border rounded-full text-text-secondary hover:text-text-primary transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 bg-elevated border border-border rounded-full text-text-secondary hover:text-text-primary transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-sans uppercase tracking-widest">
            © {new Date().getFullYear()} PrintWarriors. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
