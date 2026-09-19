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
    <section className="border-b border-border bg-background pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-text-primary text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-text-secondary">{description}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
