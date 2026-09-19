import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import ArticleCard from '@/components/ArticleCard';
import { ARTICLES } from '@/components/content/articles';

export const metadata: Metadata = {
  title: 'Explore | PrintWarriors',
  description: 'Guides on 3D printing materials, costs, college project ideas and designing parts for printing.',
};

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Guides & articles"
        description="Practical guides on materials, costs and designing parts for 3D printing."
      />

      <Section tone="band">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>
    </>
  );
}
