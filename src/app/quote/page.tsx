import QuoteForm from '@/components/QuoteForm';

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 text-text-primary drop-shadow-lg">
            Initialize <span className="text-accent-primary">Manufacture</span>
          </h1>
          <p className="text-text-muted uppercase tracking-widest text-sm font-mono drop-shadow-md">
            Submit your geometry for an instant quotation.
          </p>
        </div>
        
        <QuoteForm />
      </div>
    </div>
  );
}
