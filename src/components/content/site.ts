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

// The accent ticker between Pricing and Explore runs these after the service names.
export const TRUST_ITEMS: string[] = [
  'Pan-India Delivery',
  '3–4 Day Turnaround',
  'Student Discounts',
  'No Minimum Order',
  'Upload STL',
  'Transparent Per-Gram Pricing',
];

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
    body: 'STL, STEP or 3MF, up to 100 MB.',
    icon: Upload,
  },
  {
    title: 'Review & validation',
    body: 'A person checks it and emails a quote.',
    icon: ClipboardCheck,
  },
  {
    title: 'Printing & quality check',
    body: 'Printed at 0.2 mm, then inspected.',
    icon: Layers,
  },
  {
    title: 'Delivery',
    body: 'Couriered across India in 3–4 days.',
    icon: Truck,
  },
];

export interface TitledText {
  title: string;
  body: string;
}

export const VALUES: TitledText[] = [
  { title: 'Accessibility', body: 'Student pricing, no minimum order, no setup fees.' },
  { title: 'Reliability', body: 'Every part is checked, and reprinted free if it fails on our side.' },
  { title: 'Transparency', body: 'Published per-gram rates, and an exact quote before you pay.' },
  { title: 'Speed', body: 'Quotes within the hour, delivery in 3–4 days.' },
];

export function whatsappHref(number: string | null): string | null {
  return number ? `https://wa.me/${number}` : null;
}
