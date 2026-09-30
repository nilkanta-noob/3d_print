"use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE } from './content/site';

/*
 * Three rows, each one a name and a rule.
 *
 * Each label sits directly against its own rule rather than in a column of a fixed width. A fixed
 * column aligns the starts of the rules, but it also parks a short label like "Email" a hundred and
 * thirty pixels away from the field it names, which reads as two unrelated things on one line. Letting
 * the label set its own width keeps every pair exactly 48px apart, and the rules still share an edge —
 * the right one, where the eye ends up anyway.
 *
 * The label names the field permanently; the placeholder inside the rule is a hint and goes the moment
 * somebody types, so the two never say the same thing.
 *
 * Below 640px the label sits over its rule instead of beside it: at that width a fixed label column
 * would leave a rule too short to write in. The field takes a full basis there rather than relying on
 * the label's own length to push it down — otherwise the shortest label keeps its rule on the same
 * line and that one row sits out of step with the other two.
 */
const LABEL =
  'shrink-0 font-display text-[clamp(1.25rem,1.7vw,1.625rem)] font-medium leading-[1.3] tracking-[-0.02em] text-text-primary';

/*
 * The placeholder is set at 55% rather than at the muted token, so it reads as an instruction and not
 * as a disabled state, and it dims on focus rather than vanishing under the cursor.
 *
 * Chrome paints an autofilled field with its own background and text colour, applied by the user agent
 * and immune to `background` — the inset shadow is the only way to hold the field transparent.
 */
const FIELD =
  'min-w-0 flex-1 basis-full resize-none rounded-none border-0 border-b border-text-primary/[0.22] bg-transparent px-0 pb-4 text-[1.25rem] text-text-primary outline-none [transition:border-color_200ms_ease] placeholder:font-medium placeholder:text-text-primary/55 placeholder:opacity-100 placeholder:[transition:color_200ms_ease] hover:border-text-primary/35 focus:border-accent-primary focus:placeholder:text-text-primary/35 sm:basis-48 autofill:[-webkit-box-shadow:inset_0_0_0_100px_var(--background)] autofill:[-webkit-text-fill-color:var(--text)] autofill:[caret-color:var(--text)]';

const ROW = 'flex flex-wrap items-baseline gap-x-12 gap-y-3';

// The form sends a POST request to the /api/contact route which uses Resend to deliver the email.
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    
    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? '').trim();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: read('name'),
          email: read('email'),
          phone: read('phone'),
          project: read('project'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className={ROW}>
        <label htmlFor="contact-name" className={LABEL}>Your Name</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Full name" className={FIELD} />
      </div>

      <div className={ROW}>
        <label htmlFor="contact-email" className={LABEL}>Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={FIELD} />
      </div>

      <div className={ROW}>
        <label htmlFor="contact-phone" className={LABEL}>Phone</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="e.g. +91 9876543210" className={FIELD} />
      </div>

      <div className={ROW}>
        <label htmlFor="contact-project" className={`${LABEL} self-start`}>Project Details</label>
        <textarea
          id="contact-project"
          name="project"
          required
          rows={2}
          placeholder="Material, quantity, deadline"
          className={`${FIELD} leading-[1.6]`}
        />
      </div>

      {/* An action, not a block of colour: the accent is in the rule under the words, which is the same
          mark the site's inline links carry. The arrow leaves the line on hover rather than the whole
          control moving. */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group inline-flex items-center gap-2.5 text-[14px] font-semibold uppercase tracking-[0.12em] text-text-primary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="underline decoration-accent-primary decoration-1 underline-offset-[10px] transition-colors duration-200 group-hover:decoration-accent-primary">
            {status === 'loading' ? 'Sending...' : 'Send enquiry'}
          </span>
          <ArrowUpRight
            className="size-4 text-accent-primary transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>

        {status === 'success' && (
          <p className="mt-5 text-[13px] text-green-500 font-medium" role="status">
            Thanks! Your message has been sent successfully. We will get back to you soon.
          </p>
        )}
        
        {status === 'error' && (
          <p className="mt-5 text-[13px] text-red-500 font-medium" role="status">
            Something went wrong. Please try again or email us directly at{' '}
            <a href={`mailto:${SITE.email}`} className="text-text-primary underline decoration-accent-primary underline-offset-4">{SITE.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
