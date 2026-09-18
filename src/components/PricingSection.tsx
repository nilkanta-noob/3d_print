import React from 'react';
import { Info } from 'lucide-react';

export default function PricingSection() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-border/50" id="pricing">
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-text-primary uppercase tracking-tight mb-4">
            Transparent <span className="text-accent-primary">Pricing</span>
          </h2>
          <p className="text-text-muted text-lg">
            Priced by material, per gram. No hidden setup fees.
          </p>
        </div>

        <div className="bg-background border border-border rounded-sm overflow-hidden shadow-2xl">
          <table className="w-full text-left font-sans">
            <thead className="bg-surface border-b border-border text-xs font-bold uppercase tracking-widest text-text-muted">
              <tr>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4">Standard Rate</th>
                <th className="px-6 py-4 text-text-primary">Student Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
              <tr className="hover:bg-surface/50 transition-colors">
                <td className="px-6 py-5 font-bold text-text-primary">PLA</td>
                <td className="px-6 py-5 text-text-muted">₹3.5 <span className="text-xs uppercase tracking-widest">/ gram</span></td>
                <td className="px-6 py-5 text-accent-primary font-bold">₹2.5 <span className="text-xs uppercase tracking-widest font-normal">/ gram</span></td>
              </tr>
              <tr className="hover:bg-surface/50 transition-colors">
                <td className="px-6 py-5 font-bold text-text-primary flex items-center gap-2">
                  PLA Pro+
                  <span className="text-[10px] bg-accent-primary-deep/20 text-accent-primary px-2 py-0.5 rounded-sm uppercase tracking-widest">Engineering</span>
                </td>
                <td className="px-6 py-5 text-text-muted">₹4 <span className="text-xs uppercase tracking-widest">/ gram</span></td>
                <td className="px-6 py-5 text-text-muted italic opacity-70 text-xs uppercase tracking-widest">Coming soon</td>
              </tr>
              <tr className="hover:bg-surface/50 transition-colors">
                <td className="px-6 py-5 font-bold text-text-primary">PETG</td>
                <td className="px-6 py-5 text-text-muted">₹5.5 <span className="text-xs uppercase tracking-widest">/ gram</span></td>
                <td className="px-6 py-5 text-text-muted italic opacity-70 text-xs uppercase tracking-widest">Coming soon</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-start gap-3 bg-accent-primary-deep/10 border border-accent-primary/20 p-4 rounded-sm">
          <Info className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
          <p className="text-sm text-text-muted font-sans leading-relaxed">
            <strong className="text-accent-primary">Student eligibility:</strong> Student rate requires a valid college ID or referral at checkout. Simply check the "Apply Student Discount" box and upload your ID when requesting a quote.
          </p>
        </div>

      </div>
    </section>
  );
}
