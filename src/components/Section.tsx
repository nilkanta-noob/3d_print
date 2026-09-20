import React from 'react';

interface SectionProps {
  id?: string;
  // base = page background; band = surface band with hairline edges. Alternate them down a page.
  tone?: 'base' | 'band';
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
  const toneClass = tone === 'band' ? 'bg-surface border-y border-border' : 'bg-background';
  // The hero already fades into the page background above this section, so it opens with less top padding
  // than a standard section — the fade supplies the air, and the hairline supplies the edge.
  const spacing = afterHero ? 'pt-20 pb-24 md:pt-24 md:pb-32 lg:pt-28 lg:pb-40' : 'py-24 md:py-32 lg:py-40';

  return (
    <section
      id={id}
      className={`scroll-mt-16 lg:scroll-mt-20 ${afterHero ? 'border-t border-border' : ''} ${spacing} ${toneClass} ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
