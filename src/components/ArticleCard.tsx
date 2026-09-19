import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PartIllustration from './PartIllustration';
import type { Article } from './content/articles';

// Explore hub card. The whole card is clickable via the title link's overlay.
export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-elevated transition-colors hover:border-text-primary/25">
      {/* Thumbnail placeholder — swap for a real cover image when the article is written */}
      <div className="grid aspect-[16/9] place-items-center border-b border-border bg-surface text-text-secondary">
        <PartIllustration variant={article.illustration} className="h-3/5 w-auto" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          {article.category}
          {article.status === 'coming-soon' && <span className="font-medium normal-case tracking-normal"> · Coming soon</span>}
        </p>
        <h2 className="mt-3 text-xl font-display font-bold text-text-primary">
          <Link href={`/explore/${article.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-secondary">{article.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
          Read more
          <ArrowRight className="size-4 text-accent-primary transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
      {/* Keyboard focus ring for the card-wide link */}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-accent-primary group-has-[:focus-visible]:ring-2" aria-hidden="true" />
    </article>
  );
}
