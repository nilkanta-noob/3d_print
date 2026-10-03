"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { FAQS, type Faq } from './content/faqs';

interface FAQSectionProps {
  items?: Faq[];
  // Show only this many until "View all" is clicked; omit to show every question
  initialCount?: number;
  tone?: 'base' | 'band';
}

export default function FAQSection({ items = FAQS, initialCount, tone = 'band' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  /*
   * Collapsing the list pulls every row below the button upward, which would otherwise slide the page
   * out from under whoever just clicked it — the button can end up somewhere else entirely, or off
   * screen. Its distance from the top of the viewport is recorded on click and restored once the new
   * rows have laid out, so the control stays exactly where the pointer left it and only the list moves.
   *
   * useLayoutEffect rather than useEffect: this has to happen before the browser paints, or the jump is
   * visible for a frame before being corrected.
   */
  const toggleRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<number | null>(null);

  const handleToggle = () => {
    anchorRef.current = toggleRef.current?.getBoundingClientRect().top ?? null;
    setShowAll((current) => !current);
  };

  useLayoutEffect(() => {
    if (anchorRef.current === null || !toggleRef.current) return;
    const shift = toggleRef.current.getBoundingClientRect().top - anchorRef.current;
    anchorRef.current = null;
    if (shift) window.scrollBy({ top: shift, behavior: 'instant' as ScrollBehavior });
  }, [showAll]);

  const collapsible = initialCount !== undefined && items.length > initialCount;
  const visible = collapsible && !showAll ? items.slice(0, initialCount) : items;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <SectionHeading
          className="lg:col-span-5 lg:self-start"
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about our services, pricing, and process."
        />

        <div className="lg:col-span-7">
          <div className="border-t border-border">
            {visible.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`border-b ${(index + 1) % 4 === 0 ? 'border-b-2 border-text-primary/15' : 'border-border'}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-8 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary"
                  >
                    <span className={`font-display text-[1.125rem] font-medium tracking-[-0.02em] transition-colors duration-300 md:text-[1.25rem] ${isOpen ? 'text-accent-primary' : 'text-text-primary'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-text-secondary'}`} />
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="max-w-[62ch] overflow-hidden whitespace-pre-line text-[15px] text-text-secondary">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {collapsible && (
            <button
              ref={toggleRef}
              onClick={handleToggle}
              className="label-micro mt-10 inline-flex items-center gap-2 border-b border-accent-primary pb-1.5 text-accent-primary transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
            >
              {showAll ? 'Show less' : 'View all FAQs'}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
