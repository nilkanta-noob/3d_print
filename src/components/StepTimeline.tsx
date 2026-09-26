import React from 'react';
import type { ProcessStep } from './content/site';

/*
 * The four steps, drawn as a print accumulating.
 *
 * The connector between steps used to be a single rail, which said "these are in order" and nothing
 * else. Here each step carries a stack of layers — one at Step 01, four at Step 04 — sitting on a shared
 * baseline and growing upward. Read left to right, the row is a part being built: the same thing the
 * process itself describes, said by the layout rather than by a caption.
 *
 * The stacks are the connector. There is no rail.
 */
export default function StepTimeline({ steps, className = '' }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={`grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <li key={step.title}>
            {/* Fixed height with the lines bottom-aligned, so every stack stands on the same line and
                only its height changes across the row. */}
            <span aria-hidden="true" className="flex h-8 flex-col justify-end gap-[3px]">
              {Array.from({ length: index + 1 }).map((_, layer) => (
                <span key={layer} className="block h-px w-full bg-accent-primary/25" />
              ))}
            </span>

            <div className="mt-6 flex items-center gap-3">
              <Icon className="size-5 shrink-0 text-accent-primary" strokeWidth={1.5} />
              <span className="label-micro text-text-muted">
                Step {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-4 text-lg text-text-primary">{step.title}</h3>
            <p className="mt-1.5 max-w-[26ch] text-[15px] text-text-secondary">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
