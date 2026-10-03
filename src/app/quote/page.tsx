import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';

/*
 * An older version of /get-quote that nothing links to. It stays reachable so any bookmark still
 * works, but it is kept out of search: it duplicates /get-quote, and it renders outside the (site)
 * route group, so it has no navbar and no footer and would be a dead end for anyone who landed on it
 * from a search result.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="leading-[0.92] text-3xl md:text-4xl uppercase tracking-tight mb-3 text-text-primary drop-shadow-lg">
            Initialize <span className="text-accent-primary">Manufacture</span>
          </h1>
          <p className="text-text-secondary uppercase tracking-widest text-xs font-mono drop-shadow-md">
            Submit your geometry for an instant quotation.
          </p>
        </div>
        
        <QuoteForm />
      </div>
    </div>
  );
}
