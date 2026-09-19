import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

// Shared header for every homepage section: a small label with a red accent rule, the title,
// and an optional description — so all sections read as one system.
export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-6 bg-accent-primary" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight text-text-primary text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
