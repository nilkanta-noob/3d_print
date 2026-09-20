import React from 'react';
import Eyebrow from './Eyebrow';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode; // a node allows a deliberate <br /> in a two-line title
  description?: React.ReactNode;
  align?: 'left' | 'center';
  // display: the largest editorial header, for a section that opens a page (Services). Still clearly below
  // the hero headline, so it introduces the content instead of competing with the hero.
  size?: 'default' | 'display';
  // accent: copper eyebrow, for the sections that carry the page's main argument (Materials, Pricing,
  // Explore). Implied by size="display". It changes the label's colour only — the heading is the same.
  accent?: boolean;
  className?: string;
}

// Shared header for every section: the copper micro-label, the title, and an optional standfirst —
// so all sections read as one system.
//
// The headings are set in the display face at weight 500, not bold. Weight is not what makes a heading
// feel premium here — size, tight tracking (-0.035em) and leading just under 1 are. A heavier weight at
// these sizes reads as a marketing banner; this reads as a masthead.
export default function SectionHeading({ eyebrow, title, description, align = 'left', size = 'default', accent = false, className = '' }: SectionHeadingProps) {
  const centered = align === 'center';
  const display = size === 'display';

  return (
    <div className={`${display ? 'max-w-4xl' : 'max-w-3xl'} ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <Eyebrow centered={centered} accent={display || accent}>{eyebrow}</Eyebrow>
      {display ? (
        // Phones ~40px, 56px on tablets, 72px at 1280px, 88px from 1536px
        <h2 className="mt-6 lg:mt-8 text-[clamp(2.5rem,9vw,2.75rem)] sm:text-[clamp(3.5rem,5.6vw,5.5rem)] font-display font-medium leading-[0.94] tracking-[-0.04em] text-text-primary text-balance">
          {title}
        </h2>
      ) : (
        <h2 className="mt-6 text-[clamp(2rem,6vw,2.25rem)] sm:text-[clamp(2.5rem,4vw,3.5rem)] font-display font-medium leading-[0.98] tracking-[-0.035em] text-text-primary text-balance">
          {title}
        </h2>
      )}
      {description && (
        // The standfirst stays small against the heading — the contrast between the two is the hierarchy.
        // 60 characters is the measure; wider than that and the eye loses the line.
        <p
          className={`mt-6 lg:mt-8 max-w-[60ch] text-base leading-[1.75] text-pretty text-text-secondary md:text-[17px] ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
