import React from 'react';
import RatingMeter from './RatingMeter';
import { MATERIALS, RATING_ATTRIBUTES } from './content/materials';

// Side-by-side comparison: a table on large screens, one card per material below that.
export default function MaterialComparison() {
  return (
    <>
      <div className="hidden border border-border bg-elevated lg:block">
        <table className="w-full text-left">
          <caption className="sr-only">Material comparison: strength, print quality, heat resistance, flexibility and recommended use</caption>
          <thead>
            <tr className="border-b border-border text-text-muted">
              <th scope="col" className="label-micro px-6 py-5 xl:px-8">Material</th>
              {RATING_ATTRIBUTES.map((attribute) => (
                <th key={attribute.key} scope="col" className="label-micro px-6 py-5 xl:px-8">{attribute.label}</th>
              ))}
              <th scope="col" className="label-micro px-6 py-5 xl:px-8">Recommended use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MATERIALS.map((material) => (
              <tr key={material.slug}>
                <th scope="row" className="px-6 py-8 font-display text-xl font-medium tracking-[-0.03em] text-text-primary xl:px-8">{material.name}</th>
                {RATING_ATTRIBUTES.map((attribute) => (
                  <td key={attribute.key} className="px-6 py-8 xl:px-8">
                    <RatingMeter rating={material.ratings[attribute.key]} />
                  </td>
                ))}
                <td className="px-6 py-8 text-sm leading-[1.7] text-text-secondary xl:px-8">{material.recommendedUse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="border-t border-border lg:hidden">
        {MATERIALS.map((material) => (
          <li key={material.slug} className="border-x border-b border-border bg-elevated p-8">
            <h3 className="font-display text-2xl font-medium tracking-[-0.03em] text-text-primary">{material.name}</h3>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
              {RATING_ATTRIBUTES.map((attribute) => (
                <div key={attribute.key}>
                  <dt className="label-micro mb-3 text-text-muted">{attribute.label}</dt>
                  <dd><RatingMeter rating={material.ratings[attribute.key]} /></dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 border-t border-border pt-6 text-sm leading-[1.7] text-text-secondary">
              <span className="text-text-muted">Recommended use: </span>{material.recommendedUse}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
