import React from 'react';
import Eyebrow from './Eyebrow';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode; // a node allows a deliberate <br /> in a two-line title
  description?: React.ReactNode;
  align?: 'left' | 'center';
  // display: larger editorial header for a section that should read as a major block (Services) —
  // still clearly below the hero headline, so it introduces the content instead of competing with the hero
  size?: 'default' | 'display';
  // accent: the Services look (copper label, extra-bold tight heading) at the standard size, with room for a
  // one-line title on desktop (Materials). Implied by size="display".
  accent?: boolean;
  className?: string;
}

// Shared header for every section: the accent-ruled label, the title, and an optional description —
// so all sections read as one system.
export default function SectionHeading({ eyebrow, title, description, align = 'left', size = 'default', accent = false, className = '' }: SectionHeadingProps) {
  const centered = align === 'center';
  const display = size === 'display';

  return (
    <div className={`${display ? 'max-w-3xl' : accent ? 'max-w-4xl' : 'max-w-2xl'} ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <Eyebrow centered={centered} accent={display || accent}>{eyebrow}</Eyebrow>
      {display ? (
        // Phones 36–42px (scales with the screen) → clamp(3rem, 5vw, 4.5rem) from 640px:
        // 48px on tablets, ~51px at 1024px, 64px at 1280px, 72px from 1440px
        <h2 className="mt-4 lg:mt-5 text-[clamp(2.25rem,11vw,2.625rem)] sm:text-[clamp(3rem,5vw,4.5rem)] font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-text-primary text-balance">
          {title}
        </h2>
      ) : (
        <h2
          className={`mt-4 text-3xl md:text-5xl font-display text-text-primary text-balance ${
            accent ? 'font-extrabold leading-[1.05] tracking-[-0.03em]' : 'font-bold tracking-tight'
          }`}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className={
            display || accent
              ? `mt-5 lg:mt-6 max-w-[550px] text-lg md:text-[1.3125rem] leading-[1.7] text-pretty text-text-secondary ${centered ? 'mx-auto' : ''}`
              : 'mt-4 text-base md:text-lg leading-relaxed text-text-secondary'
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}
