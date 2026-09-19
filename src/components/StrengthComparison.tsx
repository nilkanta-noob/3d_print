import React from 'react';
import { MATERIALS } from './content/materials';

// Horizontal bars comparing strength across the three materials (relative, 5-point scale).
export default function StrengthComparison() {
  return (
    <div className="space-y-7">
      {MATERIALS.map((material) => {
        const { level, label } = material.ratings.strength;
        return (
          <div key={material.slug} className="grid grid-cols-[4.5rem_1fr] items-center gap-x-5 gap-y-2 sm:grid-cols-[5.5rem_1fr_5rem]">
            <span className="font-display text-lg font-bold text-text-primary">{material.name}</span>
            <div className="h-2.5 overflow-hidden rounded-full bg-text-primary/10" role="img" aria-label={`${material.name} strength: ${label}, ${level} of 5`}>
              <div className="h-full rounded-full bg-accent-primary" style={{ width: `${level * 20}%` }} />
            </div>
            <span className="col-start-2 text-sm text-text-secondary sm:col-start-auto">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
