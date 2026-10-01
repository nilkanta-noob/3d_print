export const SITE = {
  name: 'PrintWarriors',
  email: 'printwarriors.in@gmail.com',
  // PLACEHOLDER: no WhatsApp number is published anywhere yet. Add it here as digits with the country code
  // (e.g. '919876543210') and the Contact page button and footer link appear automatically.
  whatsappNumber: null as string | null,
  // PLACEHOLDER: add opening hours (e.g. 'Mon–Sat, 10:00–19:00') and the Contact page shows a Business hours card.
  businessHours: null as string | null,
  location: 'Kolkata, West Bengal',
  // Printed as written and dialled with the spaces stripped — see telHref below.
  phone: '+91 8335910068',
};

/*
 * WhatsApp, in one place: the number, how it is written for a reader, and the message a chat opens with.
 * Both footer links — the text one and the icon — build their href from WHATSAPP_HREF, so the number and
 * the greeting are only ever set here.
 *
 * encodeURIComponent leaves an apostrophe alone, since it is an unreserved mark; WhatsApp's own links
 * escape it, so it is replaced explicitly and the URL matches the one they generate.
 */
export const WHATSAPP = {
  number: '918335910068',
  display: '+91 83359 10068',
  message: "Hi PrintWarriors, I'd like a quote for a 3D print.",
};

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message).replace(/'/g, '%27')}`;

/*
 * The canonical origin, and the only place it is written.
 *
 * The bare domain redirects to www, so every absolute URL the site hands out — canonicals, the
 * sitemap, robots, Open Graph — uses the www host. Pointing any of them at the apex would spend a
 * redirect on every fetch and split the ranking signal across two hostnames.
 */
export const SITE_URL = 'https://www.printwarriors.in';

export const QUOTE_HREF = '/get-quote';

// The accent ticker under the hero runs these after the service names.
export const TRUST_ITEMS: string[] = [
  'Pan-India Delivery',
  '3–4 Day Turnaround',
  'Student Discounts',
  'No Minimum Order',
  'STL · STEP · 3MF Accepted',
  'Transparent Per-Gram Pricing',
];

// Services and Pricing live on the home page (/#services, /#pricing); the rest are pages. The logo links home.
/*
 * The hero's own "Get quote" button. The navbar watches this element so its own button can stand in
 * only once the hero's has scrolled away — see Header.
 */
export const HERO_CTA_ID = 'hero-quote-cta';

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/about', label: 'About' },
  { href: '/#services', label: 'Services' },
  // The materials write-up lives in the home page section, not on a page of its own.
  { href: '/#materials', label: 'Materials' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export interface ProcessStep {
  title: string;
  body: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Upload CAD files',
    body: 'STL, STEP or 3MF, up to 100 MB.',
  },
  {
    title: 'Review & validation',
    body: 'A person checks it and emails a quote.',
  },
  {
    title: 'Printing & quality check',
    body: 'Printed at 0.2 mm, then inspected.',
  },
  {
    title: 'Delivery',
    body: 'Couriered across India in 3–4 days.',
  },
];

export interface TitledText {
  title: string;
  body: string;
}

export function whatsappHref(number: string | null): string | null {
  return number ? `https://wa.me/${number}` : null;
}

// tel: takes digits and a leading +, nothing else, so the display spacing is stripped rather than kept in
// a second copy of the number.
export function telHref(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, '')}`;
}
