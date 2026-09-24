import React from 'react';

interface SectionProps {
  id?: string;
  // base = the page floor; band = one step up, for sections that should sit forward of it; emphasis = the
  // top step, reserved for pricing. Alternate base and band down a page and use emphasis sparingly — it
  // only reads as emphasis while it is the only one.
  tone?: 'base' | 'band' | 'emphasis';
  // afterHero: the first section under the home hero. The hero's footage fades into the same background
  // colour, so this section is separated by a single hairline rule rather than a tonal change.
  afterHero?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Page section with the site's spacing system and container. The scroll margin keeps anchor jumps clear of the
// fixed navbar (64px on phones and tablets, 80px from 1024px).
//
// Vertical rhythm — the site's single largest source of whitespace. 96px on phones, 128px on tablets and
// 160px from 1024px, top and bottom, so two adjacent sections are separated by 320px of empty space on a
// desktop screen. Sections never carry a smaller value: the air between blocks is what makes the page
// read as editorial rather than as a stack of panels.
export default function Section({ id, tone = 'base', afterHero = false, className = '', children }: SectionProps) {
  const toneClass =
    tone === 'emphasis' ? 'bg-elevated' : tone === 'band' ? 'bg-surface' : 'bg-background';
  // The hero already fades into the page background above this section, so it opens with less top padding
  // than a standard section — the fade supplies the air, and the hairline supplies the edge.
  const spacing = afterHero ? 'pt-20 pb-24 md:pt-24 md:pb-32 lg:pt-28 lg:pb-40' : 'py-24 md:py-32 lg:py-40';

  return (
    <section id={id} className={`scroll-mt-16 lg:scroll-mt-20 ${toneClass} ${className}`}>
      {/* site-frame, not the Tailwind `container`: the container caps at 1024px all the way up to a
          1279px screen, which parked ~118px of dead margin on each side of a laptop and left every
          section heading indented well inside the navbar's wordmark. Sharing the navbar's frame puts
          the whole page — bar, hero, sections, footer — on one left edge.
          The rule and the padding both live on this inner element rather than on the section, so the
          line stops where the content stops instead of bleeding to the edges of the screen. That is the
          difference between a divider that reads as architecture and one that reads as decoration. */}
      <div className={`site-frame border-t border-divider ${spacing}`}>{children}</div>
    </section>
  );
}
