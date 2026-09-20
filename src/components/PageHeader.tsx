import React from 'react';
import Eyebrow from './Eyebrow';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode; // optional actions (buttons / links)
}

// Title block for inner pages (the home page has the video hero instead). Top padding clears the fixed navbar.
export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-background pb-20 pt-36 md:pb-28 md:pt-48">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          {/* The page's largest type: weight 500, tracking -0.04em, leading just under 1 — the same
              masthead treatment the home page's section headings use, one step larger. */}
          <h1 className="mt-6 text-[clamp(2.5rem,9vw,3rem)] sm:text-[clamp(3.5rem,6vw,5rem)] font-display font-medium leading-[0.94] tracking-[-0.04em] text-text-primary text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-8 max-w-[60ch] text-base leading-[1.75] text-text-secondary md:text-[17px]">{description}</p>
          )}
          {children && <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}
