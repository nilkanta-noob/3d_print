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

// Closing call-to-action used at the bottom of pages. Not a boxed panel: a rule, a large heading and the
// buttons, sitting in the page's own whitespace. The only frame is the hairline above it.
export default function CtaBanner({ title, description, primary, secondary, tone = 'base' }: CtaBannerProps) {
  return (
    <Section tone={tone}>
      <div className="border-t border-border pt-16 md:pt-20 lg:grid lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <h2 className="max-w-[16ch] text-[clamp(2.25rem,7vw,2.75rem)] sm:text-[clamp(3rem,5vw,4.5rem)] font-display font-medium leading-[0.96] tracking-[-0.04em] text-text-primary text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-8 max-w-[52ch] text-base leading-[1.75] text-text-secondary md:text-[17px]">{description}</p>
          )}
        </div>

        {/* On desktop the actions sit in their own column, aligned to the bottom of the heading block */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:mt-0 lg:flex-col lg:items-start lg:justify-end lg:gap-5">
          <ButtonLink href={primary.href} className="w-full justify-center sm:w-auto">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="secondary" className="w-full justify-center sm:w-auto">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
