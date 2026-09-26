import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// The site's button. Architectural rather than app-like: a 5px radius (never a pill), no shadow, a
// 13px uppercase label at wide tracking, and a single 2px rise on hover. Both variants share the shape
// and the motion, so primary and secondary read as the same object in two weights.
export const BUTTON_BASE =
  'hover-lift inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-control px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary';

export const BUTTON_VARIANTS = {
  primary: 'bg-accent-primary text-on-accent [transition-property:transform,background-color] hover:bg-accent-hover',
  secondary:
    'border border-text-primary/25 text-text-primary [transition-property:transform,border-color,background-color] hover:border-text-primary/60 hover:bg-text-primary/5',
} as const;

interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof BUTTON_VARIANTS;
  className?: string;
  children: React.ReactNode;
}

export default function ButtonLink({ href, variant = 'primary', className = '', children }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}

// Inline text link: the accent rule sits under the words rather than around them, so it reads as a
// continuation of the copy instead of a second button.
export function ArrowLink({ href, className = '', children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-primary underline decoration-accent-primary decoration-1 underline-offset-[8px] transition-colors duration-200 hover:decoration-text-primary ${className}`}
    >
      {children}
      <ArrowRight className="size-4 text-accent-primary transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
