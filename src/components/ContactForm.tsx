"use client";

import React, { useState } from 'react';
import { SITE } from './content/site';
import { BUTTON_BASE, BUTTON_VARIANTS } from './ButtonLink';

const FIELD =
  'w-full rounded-md border border-border bg-background px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary';
const LABEL = 'mb-2 block text-sm font-medium text-text-primary';

// There is no contact endpoint on the server, so the form opens the visitor's email app with the message filled in
// (a mailto: link). Nothing is sent anywhere by the page itself.
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = `Website enquiry from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className={LABEL}>Name</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="contact-email" className={LABEL}>Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="contact-message" className={LABEL}>Message</label>
        <textarea id="contact-message" name="message" required rows={6} className={`${FIELD} resize-y`} placeholder="Tell us about your part, material and deadline." />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className={`${BUTTON_BASE} ${BUTTON_VARIANTS.primary}`}>Send message</button>
        <p className="text-sm text-text-muted">Opens your email app with the message ready to send.</p>
      </div>

      {opened && (
        <p className="text-sm text-text-secondary" role="status">
          If your email app didn&apos;t open, write to us directly at{' '}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-text-primary underline decoration-accent-primary underline-offset-4">{SITE.email}</a>.
        </p>
      )}
    </form>
  );
}
