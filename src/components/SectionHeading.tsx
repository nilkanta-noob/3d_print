import React from 'react';
import Eyebrow from './Eyebrow';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

// Shared header for every section: the accent-ruled label, the title, and an optional description —
// so all sections read as one system.
export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <Eyebrow centered={centered}>{eyebrow}</Eyebrow>
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
