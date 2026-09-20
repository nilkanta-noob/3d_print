import React from 'react';

// The micro-label above every section and page title: a short copper rule, then 11px uppercase type at
// wide tracking. One size and one weight everywhere — a label is a label, whatever heading follows it.
// The `accent` variant colours the words copper as well as the rule, for the sections that open a page.
export default function Eyebrow({ children, centered = false, accent = false }: { children: React.ReactNode; centered?: boolean; accent?: boolean }) {
  return (
    <p
      className={`label-micro flex items-center gap-4 ${accent ? 'text-accent-primary' : 'text-text-muted'} ${
        centered ? 'justify-center' : ''
      }`}
    >
      <span className="h-px w-7 shrink-0 bg-accent-primary" aria-hidden="true" />
      {children}
    </p>
  );
}
