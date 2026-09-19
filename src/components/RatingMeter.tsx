import React from 'react';
import type { Rating } from './content/materials';

// Five-segment meter for the materials comparison; the text label carries the meaning for screen readers.
export default function RatingMeter({ rating }: { rating: Rating }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((step) => (
          <span key={step} className={`h-1.5 w-3 rounded-full ${step <= rating.level ? 'bg-accent-primary' : 'bg-text-primary/15'}`} />
        ))}
      </div>
      <span className="text-xs text-text-secondary">
        {rating.label}
        <span className="sr-only"> ({rating.level} of 5)</span>
      </span>
    </div>
  );
}
