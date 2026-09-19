import React from 'react';

// Small uppercase label with the accent rule — used above every section and page title.
// accent: the display version (see SectionHeading size="display") — smaller, wider-spaced, and copper instead of grey.
export default function Eyebrow({ children, centered = false, accent = false }: { children: React.ReactNode; centered?: boolean; accent?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-semibold uppercase ${
        accent ? 'text-[11px] tracking-[0.3em] text-accent-primary' : 'text-xs tracking-[0.18em] text-text-secondary'
      } ${centered ? 'justify-center' : ''}`}
    >
      <span className={`h-px bg-accent-primary ${accent ? 'w-8' : 'w-6'}`} aria-hidden="true" />
      {children}
    </p>
  );
}
