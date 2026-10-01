import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/components/content/site';

/*
 * Everything is open to crawlers except the two trees that exist for the business rather than for
 * visitors: the admin screens and the API handlers behind the forms.
 *
 * Both are written without a trailing slash, because robots.txt matches on prefix: "/admin/" would
 * block /admin/login but leave /admin itself crawlable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
