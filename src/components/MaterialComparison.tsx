import React from 'react';
import RatingMeter from './RatingMeter';
import { MATERIALS, RATING_ATTRIBUTES } from './content/materials';

// Side-by-side comparison: a table on large screens, one card per material below that.
export default function MaterialComparison() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-elevated lg:block">
        <table className="w-full text-left">
          <caption className="sr-only">Material comparison: strength, print quality, heat resistance, flexibility and recommended use</caption>
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-text-muted">
              <th scope="col" className="px-5 xl:px-6 py-4 font-medium">Material</th>
              {RATING_ATTRIBUTES.map((attribute) => (
                <th key={attribute.key} scope="col" className="px-5 xl:px-6 py-4 font-medium">{attribute.label}</th>
              ))}
              <th scope="col" className="px-5 xl:px-6 py-4 font-medium">Recommended use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MATERIALS.map((material) => (
              <tr key={material.slug}>
                <th scope="row" className="px-5 xl:px-6 py-6 font-display text-lg font-bold text-text-primary">{material.name}</th>
                {RATING_ATTRIBUTES.map((attribute) => (
                  <td key={attribute.key} className="px-5 xl:px-6 py-6">
                    <RatingMeter rating={material.ratings[attribute.key]} />
                  </td>
                ))}
                <td className="px-5 xl:px-6 py-6 text-sm text-text-secondary">{material.recommendedUse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-4 lg:hidden">
        {MATERIALS.map((material) => (
          <li key={material.slug} className="rounded-xl border border-border bg-elevated p-6">
            <h3 className="font-display text-xl font-bold text-text-primary">{material.name}</h3>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
              {RATING_ATTRIBUTES.map((attribute) => (
                <div key={attribute.key}>
                  <dt className="mb-2 text-xs uppercase tracking-[0.14em] text-text-muted">{attribute.label}</dt>
                  <dd><RatingMeter rating={material.ratings[attribute.key]} /></dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 border-t border-border pt-4 text-sm text-text-secondary">
              <span className="text-text-muted">Recommended use: </span>{material.recommendedUse}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
