import React from 'react';
import { MATERIALS, formatRate } from './content/materials';

// Per-gram rates by material — shared by the home pricing preview and the Pricing page.
export default function PricingTable({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-elevated ${className}`}>
      <table className="w-full text-left">
        <caption className="sr-only">Price per gram by material, standard and student rates</caption>
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-text-muted">
            <th scope="col" className="px-3 sm:px-6 py-4 font-medium">Material</th>
            <th scope="col" className="px-3 sm:px-6 py-4 font-medium">Standard</th>
            <th scope="col" className="px-3 sm:px-6 py-4 font-medium">Student</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {MATERIALS.map((material) => (
            <tr key={material.slug}>
              <th scope="row" className="px-3 sm:px-6 py-5 font-semibold text-text-primary">
                <span className="flex flex-wrap items-center gap-2">
                  {material.name}
                  {/* Hidden on phones: the tag can't wrap and would push the table past its card */}
                  <span className="hidden sm:inline rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                    {material.tag}
                  </span>
                </span>
              </th>
              <td className="px-3 sm:px-6 py-5 tabular-nums">
                <span className="font-display text-xl font-bold text-text-primary">{formatRate(material.pricePerGram.standard)}</span>
                <span className="text-sm text-text-muted"> /g</span>
              </td>
              <td className="px-3 sm:px-6 py-5 tabular-nums">
                {material.pricePerGram.student !== null ? (
                  <>
                    {/* Highlighted value: accent at 20px bold counts as large text for contrast */}
                    <span className="font-display text-xl font-bold text-accent-primary">{formatRate(material.pricePerGram.student)}</span>
                    <span className="text-sm text-text-muted"> /g</span>
                  </>
                ) : (
                  <span className="text-sm text-text-muted">Coming soon</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
