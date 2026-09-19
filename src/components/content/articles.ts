import type { PartVariant } from '../PartIllustration';

// Explore hub. To publish an article, add its paragraphs to `body` and set status to 'published' —
// /explore/[slug] renders it; until then the page shows a "being written" notice instead of a 404.
export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  illustration: PartVariant;
  status: 'published' | 'coming-soon';
  body?: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'what-can-be-made-with-3d-printing',
    title: 'What can be made with 3D printing?',
    category: 'Basics',
    excerpt: 'From brackets and enclosures to scale models — what FDM printing does well, and when a different process is the better tool.',
    illustration: 'enclosure',
    status: 'coming-soon',
  },
  {
    slug: 'college-project-ideas',
    title: 'Best college project ideas',
    category: 'Students',
    excerpt: 'Printable ideas for mechanical, electronics and design coursework — and how to keep them within a student budget.',
    illustration: 'standoffs',
    status: 'coming-soon',
  },
  {
    slug: 'pla-vs-petg',
    title: 'PLA vs PETG',
    category: 'Materials',
    excerpt: 'Strength, heat resistance, finish and cost side by side, with a simple way to choose between them.',
    illustration: 'bracket',
    status: 'coming-soon',
  },
  {
    slug: 'how-much-does-3d-printing-cost',
    title: 'How much does 3D printing cost?',
    category: 'Pricing',
    excerpt: 'How per-gram pricing works, what drives a part’s weight, and practical ways to bring the cost down.',
    illustration: 'stepped',
    status: 'coming-soon',
  },
  {
    slug: 'how-to-design-for-3d-printing',
    title: 'How to design for 3D printing',
    category: 'Design',
    excerpt: 'Wall thickness, overhangs, tolerances and orientation — practical rules for parts that print right the first time.',
    illustration: 'bracket',
    status: 'coming-soon',
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
