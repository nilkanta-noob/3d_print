import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Shared shell for the public website: navbar + footer around every page in this route group.
// /admin and the older /quote page sit outside the group, so they keep their own layouts.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col font-sans text-text-primary selection:bg-accent-primary/30">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
