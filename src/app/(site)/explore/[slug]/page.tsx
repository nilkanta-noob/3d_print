import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { ArrowLink } from '@/components/ButtonLink';
import { ARTICLES, getArticle } from '@/components/content/articles';
import { QUOTE_HREF } from '@/components/content/site';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Only the articles listed in content/articles.ts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? { title: `${article.title} | PrintWarriors`, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageHeader eyebrow={article.category} title={article.title} description={article.excerpt}>
        <ArrowLink href="/explore">All guides</ArrowLink>
      </PageHeader>

      <Section tone="band">
        <div className="mx-auto max-w-3xl">
          {article.status === 'published' && article.body ? (
            <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-text-primary/20 bg-elevated p-8 md:p-10">
              <p className="font-display text-xl font-bold text-text-primary">This guide is being written.</p>
              <p className="mt-3 text-text-secondary">Check back soon. In the meantime, these pages cover the essentials:</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                <ArrowLink href="/materials">Materials guide</ArrowLink>
                <ArrowLink href="/pricing">Pricing</ArrowLink>
                <ArrowLink href={QUOTE_HREF}>Get a quote</ArrowLink>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
