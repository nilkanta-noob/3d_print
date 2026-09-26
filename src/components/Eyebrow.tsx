import React from 'react';

// The micro-label above every section and page title: a short accent rule, then 11px uppercase type at
// wide tracking. One size and one weight everywhere — a label is a label, whatever heading follows it.
// The label is accent-coloured throughout: the accent's job on this site is section labels, active states
// and CTAs, and a label is the smallest of those. `accent={false}` drops the words back to muted for the
// rare case where a label sits on an accent fill and cannot be accent itself.
export default function Eyebrow({ children, centered = false, accent = true }: { children: React.ReactNode; centered?: boolean; accent?: boolean }) {
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
