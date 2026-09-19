import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { ProcessStep } from './content/site';

// Numbered process steps: a row of four on desktop with connectors, stacked on mobile.
export default function StepTimeline({ steps, className = '' }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="relative flex flex-col rounded-xl border border-border bg-elevated p-7">
            <div className="flex items-start justify-between">
              {/* 36px bold — large text, so the accent meets contrast on the card */}
              <span className="font-display text-4xl font-bold leading-none tabular-nums text-accent-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <Icon className="size-5 text-text-muted" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="mt-8 text-lg font-display font-bold text-text-primary">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{step.body}</p>
            {index < steps.length - 1 && (
              <ChevronRight
                aria-hidden="true"
                className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full border border-border bg-background p-1 text-text-muted lg:block"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
