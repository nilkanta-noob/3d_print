import React from 'react';
import type { ProcessStep } from './content/site';

// How it works: four numbered steps, set as columns of one continuous hairline grid rather than as four
// separate cards. The number is the largest thing in each column — the sequence is the point — and the
// rule above it carries the eye across the row. No boxes, no connectors, no icons competing with the copy.
export default function StepTimeline({ steps, className = '' }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={`grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 ${className}`}>
      {steps.map((step, index) => (
        <li key={step.title} className="border-t border-border pt-8">
          <span className="label-micro block text-accent-primary">Step {String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-6 font-display text-[1.5rem] font-medium leading-[1.1] tracking-[-0.035em] text-text-primary">
            {step.title}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.75] text-text-secondary">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
