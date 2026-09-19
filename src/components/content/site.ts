import type React from 'react';
import { Upload, ClipboardCheck, Layers, Truck } from 'lucide-react';

type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

export const SITE = {
  name: 'PrintWarriors',
  email: 'hello@printwarriors.com',
  // PLACEHOLDER: no WhatsApp number is published anywhere yet. Add it here as digits with the country code
  // (e.g. '919876543210') and the Contact page button and footer link appear automatically.
  whatsappNumber: null as string | null,
  // PLACEHOLDER: add opening hours (e.g. 'Mon–Sat, 10:00–19:00') and the Contact page shows a Business hours card.
  businessHours: null as string | null,
  location: 'Kolkata, West Bengal',
};

export const QUOTE_HREF = '/get-quote';

// Services and Pricing live on the home page (/#services, /#pricing); the rest are pages. The logo links home.
export const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/about', label: 'About' },
  { href: '/materials', label: 'Materials' },
  { href: '/#services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/explore', label: 'Explore' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export interface ProcessStep {
  title: string;
  body: string;
  icon: Icon;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Upload CAD file',
    body: 'Send an STL, OBJ, STEP, IGES or 3MF file up to 100 MB and check it in the 3D preview before you submit.',
    icon: Upload,
  },
  {
    title: 'Review & validation',
    body: 'A person reviews every file for printability, then emails your quote — usually within the hour.',
    icon: ClipboardCheck,
  },
  {
    title: 'Printing & quality check',
    body: 'Printed at 0.2 mm layers by default (0.12 mm on request). Every part is checked; anything that fails on our side is reprinted free.',
    icon: Layers,
  },
  {
    title: 'Delivery',
    body: 'Courier anywhere in India in 3–4 business days, or Porter delivery and pickup in Kolkata. Free above ₹599.',
    icon: Truck,
  },
];

export interface TitledText {
  title: string;
  body: string;
}

export const AUDIENCES: TitledText[] = [
  { title: 'Students', body: 'Final-year projects, robotics teams and coursework, at student rates.' },
  { title: 'Makers', body: 'Replacement parts, mods and personal projects — no minimum order.' },
  { title: 'Engineers', body: 'Functional prototypes, brackets and fixtures in PLA+ and PETG.' },
  { title: 'Startups', body: 'Design revisions printed while you are still refining the product.' },
];

export const VALUES: TitledText[] = [
  { title: 'Accessibility', body: 'Student pricing, no minimum order and no setup fees — a one-off part costs what it weighs.' },
  { title: 'Reliability', body: 'Every print is quality-checked, and anything that fails on our side is reprinted at no cost before dispatch.' },
  { title: 'Transparency', body: 'Published per-gram rates and an exact quote by email before you pay. No hidden fees.' },
  { title: 'Speed', body: 'Quotes within the hour and delivery across India in 3–4 business days.' },
];

export function whatsappHref(number: string | null): string | null {
  return number ? `https://wa.me/${number}` : null;
}
