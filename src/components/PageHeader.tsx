import React from 'react';
import Eyebrow from './Eyebrow';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode; // optional actions (buttons / links)
  /*
   * A shorter header, for a page that opens on an introduction rather than a proposition. Padding is
   * 35% off the standard, the title drops a step and the measure narrows, so the block reads as a way
   * in rather than as a landing page in its own right. Opt-in: five other pages share this component.
   */
  compact?: boolean;
}

// Title block for inner pages (the home page has the video hero instead). Top padding clears the fixed navbar.
export default function PageHeader({ eyebrow, title, description, children, compact = false }: PageHeaderProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-border bg-background ${
        compact
          ? 'pb-[3.25rem] pt-[5.85rem] md:pb-[4.55rem] md:pt-[7.8rem]' // the standard 80/144 and 112/192, less 35%
          : 'pb-20 pt-36 md:pb-28 md:pt-48'
      }`}
    >
      <div className="site-frame relative">
        <div className={compact ? 'max-w-[48rem]' : 'max-w-4xl'}>
          <Eyebrow>{eyebrow}</Eyebrow>
          {/* The page's largest type: weight 500, tracking -0.04em, leading just under 1 — the same
              masthead treatment the home page's section headings use, one step larger. */}
          <h1
            className={`text-text-primary text-balance ${
              compact
                ? 'mt-4 text-[clamp(2.125rem,7.5vw,2.5rem)] sm:text-[clamp(3rem,5vw,4.25rem)]'
                : 'mt-6 text-[clamp(2.5rem,9vw,3rem)] sm:text-[clamp(3.5rem,6vw,5rem)]'
            }`}
          >
            {title}
          </h1>
          {description && (
            <p className={`max-w-[60ch] text-base text-text-secondary md:text-[17px] ${compact ? 'mt-5' : 'mt-8'}`}>
              {description}
            </p>
          )}
          {children && <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}
