import React from 'react';

/*
 * Four squares stepping diagonally out of a filled element's top-right corner, in white over the fill
 * so the tint belongs to the accent rather than being a second colour. Purely decorative.
 *
 * Shared by the PLA+ material card and the Student column's header, which carry the same mark at
 * different scales — 10px on the card, 6px in the table. The parent must be positioned.
 */
export default function CornerSteps({ size = 10, className = '' }: { size?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute right-0 top-0 block ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute block bg-white/30"
          style={{ width: size, height: size, right: i * size, top: i * size }}
        />
      ))}
    </span>
  );
}
