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
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about our services, pricing, and process."
        />

        <div className="lg:col-span-8">
          <div className="space-y-3">
            {visible.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-xl border bg-elevated overflow-hidden transition-colors duration-300 ${isOpen ? 'border-accent-primary/40' : 'border-border hover:border-text-primary/20'}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between gap-6 text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary"
                  >
                    <span className="text-base font-medium text-text-primary">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-text-secondary'}`} />
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="border-t border-border pt-4 text-[15px] leading-relaxed text-text-secondary whitespace-pre-line">
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
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-text-primary/40"
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
