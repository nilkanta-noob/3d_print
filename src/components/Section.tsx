import React from 'react';

interface SectionProps {
  id?: string;
  // base = page background; band = surface band with hairline edges. Alternate them down a page.
  tone?: 'base' | 'band';
  // compact: shorter vertical padding for strips (e.g. the trust strip)
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Page section with the site's spacing system and container. The scroll margin keeps anchor jumps clear of the
// fixed navbar (64px on phones and tablets, 80px from 1024px).
export default function Section({ id, tone = 'base', compact = false, className = '', children }: SectionProps) {
  const toneClass = tone === 'band' ? 'bg-surface border-y border-border' : 'bg-background';
  const spacing = compact ? 'py-16 md:py-20' : 'py-24 md:py-32';

  return (
    <section id={id} className={`scroll-mt-16 lg:scroll-mt-20 ${spacing} ${toneClass} ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
