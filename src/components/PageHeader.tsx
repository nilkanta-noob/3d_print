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
  /*
   * Centred variant, for a page that is one column of its own — the Contact form, where the header and
   * the form share a single axis. Left is the default: five other pages open on the site's left edge
   * and must not move.
   */
  align?: 'left' | 'center';
  /* Fine print under the description — a condition, a caveat or a direct line, smaller and dimmer than
     the body copy. It sits apart from the description so it reads as a footnote, not as a third sentence. */
  note?: React.ReactNode;
  /*
   * 'tight' closes the gap to whatever comes next and drops the rule under the header, for a page where
   * the next block is part of the same unit rather than a new section — Contact, where the form belongs
   * to the title above it. 'standard' is the site's page rhythm and stays the default.
   */
  spaceAfter?: 'standard' | 'tight';
  /*
   * The title's step, separated from `compact` so a page can take the shorter header padding without
   * also dropping its headline a size — Contact, where the hero has to stay the largest type on the page
   * while the form sits close under it. Left unset it follows `compact`, so nothing else moves.
   */
  titleSize?: 'compact' | 'standard';
}

// Title block for inner pages (the home page has the video hero instead). Top padding clears the fixed navbar.
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
  compact = false,
  align = 'left',
  note,
  spaceAfter = 'standard',
  titleSize,
}: PageHeaderProps) {
  const centred = align === 'center';
  const titleScale = titleSize ?? (compact ? 'compact' : 'standard');
  return (
    <section
      className={`relative overflow-hidden bg-background ${spaceAfter === 'tight' ? '' : 'border-b border-border'} ${
        compact
          ? 'pb-[3.25rem] pt-[5.85rem] md:pb-[4.55rem] md:pt-[7.8rem]' // the standard 80/144 and 112/192, less 35%
          : 'pb-20 pt-36 md:pb-28 md:pt-48'
      } ${spaceAfter === 'tight' ? '!pb-12 md:!pb-14' : ''}`}
    >
      <div className="site-frame relative">
        <div className={`${compact ? 'max-w-[48rem]' : 'max-w-4xl'} ${centred ? 'mx-auto text-center' : ''}`}>
          <Eyebrow centered={centred}>{eyebrow}</Eyebrow>
          {/* The page's largest type: weight 500, tracking -0.04em, leading just under 1 — the same
              masthead treatment the home page's section headings use, one step larger. */}
          <h1
            className={`text-text-primary text-balance ${
              titleScale === 'compact'
                ? 'mt-4 text-[clamp(2.125rem,7.5vw,2.5rem)] sm:text-[clamp(3rem,5vw,4.25rem)]'
                : 'mt-6 text-[clamp(2.5rem,9vw,3rem)] sm:text-[clamp(3.5rem,6vw,5rem)]'
            }`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`text-base text-text-secondary md:text-[17px] ${compact ? 'mt-5' : 'mt-8'} ${
                centred ? 'mx-auto max-w-[55ch]' : 'max-w-[60ch]'
              }`}
            >
              {description}
            </p>
          )}
          {note && (
            <p className={`mt-7 text-[15px] text-text-muted ${centred ? 'mx-auto max-w-[62ch]' : 'max-w-[62ch]'}`}>
              {note}
            </p>
          )}
          {children && (
            <div className={`mt-12 flex flex-wrap items-center gap-4 sm:gap-5 ${centred ? 'justify-center' : ''}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
