import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/components/content/site';

/*
 * The five pages a customer should be able to find. Four of them live in the (site) route group, which
 * shapes the layout but not the URL, so the path really is /about and not /(site)/about.
 *
 * Deliberately absent: /#services, /#materials and /#pricing are places on the home page rather than
 * pages of their own, and a fragment tells a crawler nothing the home page has not already said;
 * /get-quote?service=... is that same page with one field pre-filled, so listing the variants would be
 * four copies of one URL; /admin and /api exist for the business, not for visitors; and /quote is an
 * older, unlinked version of /get-quote that would read as a duplicate of it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build time — as close to "last changed" as a set of hand-written pages can honestly claim.
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/get-quote`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/gallery`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/favicon.ico`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
