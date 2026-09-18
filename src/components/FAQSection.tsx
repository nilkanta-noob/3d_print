"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from './SectionHeading';

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Standard delivery across India typically takes 3–4 business days from order confirmation. Within Kolkata, we also offer B2B drop-off/pickup and on-demand delivery via Porter for faster turnaround."
  },
  {
    question: "What printer and settings do you use?",
    answer: "We print on a Creality CR-10 SE with a default layer height of 0.2mm, giving a solid balance of quality and speed for most prototyping and engineering needs. Finer layer heights (e.g. 0.12mm) can be requested for detail-critical parts — mention it in your quote request."
  },
  {
    question: "Do you deliver outside Kolkata?",
    answer: "Yes. We ship pan-India via standard courier (3–4 days). Within Kolkata, we also support B2B drop-offs/pickups and faster delivery via Porter."
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept .stl, .obj, .stp, .iges, and .3mf files, up to 100MB per upload."
  },
  {
    question: "How is pricing calculated?",
    answer: "Pricing is per gram of material used, based on your part's weight after slicing — not a flat fee. See our Pricing table for standard and student rates."
  },
  {
    question: "Do I need to be a student to order?",
    answer: "No — anyone can order. The student discount applies only if you upload a valid college ID or use a referral at checkout."
  },
  {
    question: "What's your minimum order size?",
    answer: "There's no minimum order size — you can order any quantity or weight, and we'll print it for you anywhere in India. Orders above ₹599 qualify for free delivery; below ₹599, delivery and packaging costs are added separately. For B2B within Kolkata, there's no minimum — just contact us and we'll arrange a drop-off or pickup location."
  },
  {
    question: "How do I pay?",
    answer: "Delivery orders (anywhere in India, or Kolkata delivery): Prepaid only, via UPI.\n\nB2B / pickup orders (Kolkata): Pay via UPI or cash. A partial advance may be required to confirm larger or first-time orders, with the balance payable on pickup."
  },
  {
    question: "Can I get a custom finish (sanding, priming, painting)?",
    answer: "Yes. Select your preferred finish under \"Finalize (Post-Processing)\" when submitting your quote — options include sanding & smoothing, priming, or full custom painting."
  },
  {
    question: "What if my print fails or has defects?",
    answer: "We only deliver quality-checked prints — we don't ship failed or defective prints. If an issue occurs on our end during production, it's reprinted at no extra cost to you before dispatch."
  },
  {
    question: "Can I track my order status?",
    answer: "Order status tracking is coming soon. For now, updates are shared directly via WhatsApp."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-surface border-y border-border" id="faq">
      <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about our services, pricing, and process."
        />

        <div className="lg:col-span-8">
          <div className="space-y-3">
            {(showAll ? faqs : faqs.slice(0, 2)).map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border bg-card overflow-hidden transition-colors duration-300 ${isOpen ? 'border-accent-primary/40' : 'border-border hover:border-text-primary/20'}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between gap-6 text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary"
                  >
                    <span className="text-base font-medium text-text-primary">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-text-muted'}`} />
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="border-t border-border pt-4 text-[15px] leading-relaxed text-text-muted whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {faqs.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-text-primary/40"
            >
              {showAll ? 'Show less' : 'View all FAQs'}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
