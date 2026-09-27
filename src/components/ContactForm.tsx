"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE } from './content/site';
import { BUTTON_BASE, BUTTON_VARIANTS } from './ButtonLink';

/*
 * The form has no container. There is no panel behind it, no fill and no frame — each field is a line of
 * type sitting on a hairline rule, and the rules are the only marks on the page. A boxed form would have
 * put a second rectangle inside a page that is already one narrow column; the underline keeps the whole
 * thing at the weight of the text around it.
 *
 * Everything that gives the column its structure is structural: the rule under a field is that field's
 * edge, and the space between fields is the only separator. Nothing is drawn for effect.
 */
const FIELD =
  'w-full border-b border-border bg-transparent px-0 pb-3 pt-1 text-[17px] text-text-primary outline-none transition-colors placeholder:text-text-muted hover:border-text-muted focus:border-accent-primary';
const LABEL = 'label-micro mb-4 block text-text-muted';

// There is no contact endpoint on the server, so the form opens the visitor's email app with the message filled in
// (a mailto: link). Nothing is sent anywhere by the page itself.
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? '').trim();
    const name = read('name');

    const subject = `Website enquiry from ${name}`;
    const body = `${read('message')}\n\n— ${name}\n${read('email')}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-14 text-left">
      <div>
        <label htmlFor="contact-name" className={LABEL}>Name</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className={FIELD} />
      </div>

      <div>
        <label htmlFor="contact-email" className={LABEL}>Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className={FIELD} />
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL}>Message</label>
        {/* Four lines to start with, and it grows by the reader's hand rather than by script — a textarea
            that resizes itself would move the button while someone is still typing. */}
        <textarea id="contact-message" name="message" required rows={4} className={`${FIELD} resize-y leading-[1.7]`} />
      </div>

      <div className="pt-2 text-center">
        <button type="submit" className={`${BUTTON_BASE} ${BUTTON_VARIANTS.primary} px-10 py-4`}>
          Send message
          <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>

        <p className="mt-7 text-[13px] text-text-muted">
          This opens your own email app with the message ready to send.
        </p>

        {opened && (
          <p className="mt-4 text-[13px] text-text-secondary" role="status">
            If nothing opened, write to us at{' '}
            <a href={`mailto:${SITE.email}`} className="text-text-primary underline decoration-accent-primary underline-offset-4">{SITE.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
