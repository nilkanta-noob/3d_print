import React from 'react';
import Section from './Section';
import ButtonLink from './ButtonLink';

interface Action {
  href: string;
  label: string;
}

interface CtaBannerProps {
  title: string;
  description?: string;
  primary: Action;
  secondary?: Action;
  tone?: 'base' | 'band';
}

// Closing call-to-action used at the bottom of pages.
export default function CtaBanner({ title, description, primary, secondary, tone = 'base' }: CtaBannerProps) {
  return (
    <Section tone={tone}>
      <div className="rounded-2xl border border-border bg-elevated px-6 py-10 text-center sm:px-12 md:py-14">
        <span className="mx-auto mb-6 block h-px w-10 bg-accent-primary" aria-hidden="true" />
        <h2 className="mx-auto max-w-3xl text-3xl md:text-5xl font-display font-bold tracking-tight text-text-primary text-balance">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-base md:text-lg leading-relaxed text-text-secondary">{description}</p>
        )}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
