import React from 'react';
import { SITE, SITE_URL, telHref } from './content/site';

/*
 * The structured description of the business that search engines read, rendered once on the home page.
 *
 * Every value here is already stated somewhere a visitor can see — the footer carries the email, the
 * phone number and the city, and the three social links are the footer's own. Nothing is invented for
 * the crawler's benefit: a LocalBusiness record that claims an address, an opening time or a rating the
 * site does not show is the kind of thing that gets a listing penalised rather than promoted, so the
 * fields we cannot honestly fill are simply absent.
 *
 * `addressLocality` is Kolkata and `areaServed` is India because those are two different claims: the
 * workshop is in one city, and the courier reaches the whole country. A single `address` would have
 * said only the first.
 *
 * Next renders this as a plain script tag. dangerouslySetInnerHTML is the documented way to emit JSON-LD
 * in React — the content is our own object, serialised here, never anything a visitor supplied.
 */
export default function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE_URL,
    email: SITE.email,
    telephone: telHref(SITE.phone).replace('tel:', ''),
    description:
      '3D printing service in Kolkata delivering across India. Prototypes, engineering parts and custom components printed from your CAD file.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [
      'https://www.linkedin.com/in/nilkanta-dinda/',
      'https://www.youtube.com/channel/UCMAHetZ_k6MWnGYiVCYhuKg',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
