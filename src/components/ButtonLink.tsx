import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 py-3.5 text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary';

export const BUTTON_VARIANTS = {
  primary: 'bg-accent-primary text-on-accent shadow-lg shadow-black/20 hover:bg-accent-hover',
  secondary: 'border border-text-primary/30 text-text-primary hover:border-text-primary/70 hover:bg-text-primary/5',
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

// Inline text link with an accent underline and arrow — ivory text keeps it readable at small sizes.
export function ArrowLink({ href, className = '', children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold text-text-primary underline decoration-accent-primary decoration-2 underline-offset-[6px] transition-colors hover:decoration-text-primary ${className}`}
    >
      {children}
      <ArrowRight className="size-4 text-accent-primary transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
