import React from 'react';

interface SectionProps {
  id?: string;
  // base = page background; band = surface band with hairline edges. Alternate them down a page.
  tone?: 'base' | 'band';
  // afterHero: the first section under the home hero. The hero's footage fades into the same background
  // colour, so this section gets a softly lit top edge to set it apart, and a little less top padding
  // than a standard section (the fade above already adds air).
  afterHero?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Page section with the site's spacing system and container. The scroll margin keeps anchor jumps clear of the
// fixed navbar (64px on phones and tablets, 80px from 1024px).
export default function Section({ id, tone = 'base', afterHero = false, className = '', children }: SectionProps) {
  const toneClass = tone === 'band' ? 'bg-surface border-y border-border' : 'bg-background';
  const spacing = afterHero ? 'pt-20 pb-24 md:pt-28 md:pb-32' : 'py-24 md:py-32';

  return (
    <section id={id} className={`scroll-mt-16 lg:scroll-mt-20 ${afterHero ? 'relative' : ''} ${spacing} ${toneClass} ${className}`}>
      {afterHero && (
        // Lit top edge: a hairline that fades out toward both sides, and below it a faint lift of the surface
        // tone that falls back to the page background — separation without a hard divider.
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-surface/50 to-transparent">
          <div className="h-px bg-linear-to-r from-transparent via-text-primary/10 to-transparent" />
        </div>
      )}
      <div className={`container mx-auto px-4 ${afterHero ? 'relative' : ''}`}>{children}</div>
    </section>
  );
}
