import React from 'react';

// Small uppercase label with the accent rule — used above every section and page title.
export default function Eyebrow({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary ${centered ? 'justify-center' : ''}`}>
      <span className="h-px w-6 bg-accent-primary" aria-hidden="true" />
      {children}
    </p>
  );
}
