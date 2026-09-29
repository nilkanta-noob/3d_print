import Wordmark from './Wordmark';
import React from 'react';
import Link from 'next/link';
import { NAV_LINKS, SITE, WHATSAPP_HREF } from './content/site';

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

/*
 * WhatsApp's mark from simple-icons, since lucide has none. It is a filled glyph where the three beside
 * it are stroked, so it carries currentColor as a fill and inherits the same monochrome treatment rather
 * than the brand green.
 */
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

// WhatsApp leads: it is the number people actually reach us on, so it takes the first box.
const SOCIAL = [
  { label: 'Chat with PrintWarriors on WhatsApp', Icon: WhatsappIcon, href: WHATSAPP_HREF, external: true },
  { label: 'Instagram', Icon: InstagramIcon, href: '#', external: false },
  { label: 'LinkedIn', Icon: LinkedinIcon, href: '#', external: false },
  { label: 'YouTube', Icon: YoutubeIcon, href: '#', external: false },
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
  <footer className="relative z-10 border-t border-white/5 bg-[#0D1118] pb-8 pt-14 text-text-secondary">      
  <div className="site-frame">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">

          <div>
            <p className="font-display text-[19px] font-semibold uppercase tracking-[0.2em] text-text-primary">
              <Wordmark />
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
              {NAV_LINKS.map((link) => (
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
              {SOCIAL.map(({ label, Icon, href, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
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
