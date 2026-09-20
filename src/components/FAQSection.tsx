"use client";

import React, { useState } from 'react';
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

  const collapsible = initialCount !== undefined && items.length > initialCount;
  const visible = collapsible && !showAll ? items.slice(0, initialCount) : items;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <SectionHeading
          className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
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
                  className="border-b border-border"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-8 py-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary"
                  >
                    <span className={`font-display text-[1.125rem] font-medium tracking-[-0.02em] transition-colors duration-300 md:text-[1.25rem] ${isOpen ? 'text-accent-primary' : 'text-text-primary'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-text-secondary'}`} />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="max-w-[62ch] whitespace-pre-line text-[15px] leading-[1.75] text-text-secondary">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {collapsible && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="hover-lift mt-10 inline-flex items-center gap-2.5 rounded-control border border-border px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-primary [transition-property:transform,border-color] hover:border-text-primary/40"
            >
              {showAll ? 'Show less' : 'View all FAQs'}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
