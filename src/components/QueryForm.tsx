"use client";

import React, { useState } from 'react';
import { X, UploadCloud, File, CheckCircle, Check } from 'lucide-react';

export function QuoteFormCore({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch('/api/quote', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          if (onSuccess) onSuccess();
        }, 3000);
      } else {
        alert("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center bg-surface border border-accent-primary/20 rounded-sm h-full">
        <CheckCircle className="w-16 h-16 text-accent-primary mb-4 animate-pulse" strokeWidth={1.5} />
        <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-widest mb-2">Request Logged</h3>
        <p className="text-text-muted font-sans">Your files have been received into the queue. A quotation will be generated shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-surface rounded-sm relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary-deep/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Contact Info */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">Client Details</h3>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Full Name</label>
            <input 
              name="name"
              type="text" 
              required
              className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Phone Number</label>
            <input 
              name="phone"
              type="tel"
              required
              className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Material Spec</label>
            <select 
              name="material"
              required
              className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors appearance-none font-sans"
            >
              <option value="PLA">PLA (Standard)</option>
              <option value="PLA Pro+">PLA Pro+ (Engineering-grade)</option>
              <option value="PETG">PETG (Durable / Water-resistant)</option>
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer mt-6 p-3 border border-border bg-background/50 rounded-sm">
            <div className="relative flex items-center">
              <input 
                type="checkbox" 
                name="isStudent"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="peer w-4 h-4 text-accent-primary bg-background border-border rounded-sm focus:ring-accent-primary focus:ring-offset-background appearance-none checked:bg-accent-primary transition-colors"
              />
              <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-background opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="text-sm font-medium text-text-primary opacity-90 font-sans">Apply Student Discount</span>
          </label>
        </div>

        {/* Uploads */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">Project Assets</h3>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">3D Model (.stl, .obj)</label>
            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed border-border rounded-sm hover:border-accent-primary/50 transition-colors bg-background/50 group">
              <div className="space-y-2 text-center">
                <File className="mx-auto h-8 w-8 text-text-muted group-hover:text-accent-primary transition-colors" strokeWidth={1.5} />
                <div className="flex text-sm text-text-muted justify-center">
                  <label className="relative cursor-pointer rounded-sm font-bold text-accent-primary hover:text-accent-primary-deep uppercase tracking-wide">
                    <span>Select File</span>
                    <input name="file" type="file" className="sr-only" required accept=".stl,.obj" />
                  </label>
                </div>
                <p className="text-xs text-text-muted font-sans">Max size: 50MB</p>
              </div>
            </div>
          </div>

          {isStudent && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-accent-secondary mb-1.5">Verification: College ID</label>
              <input 
                name="studentId"
                type="file" 
                accept="image/*"
                required={isStudent}
                className="w-full text-sm text-text-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-surface file:text-text-primary hover:file:bg-border transition-colors font-sans"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex justify-end relative z-10">
        <button 
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full md:w-auto px-8 py-3.5 rounded-sm font-bold text-sm tracking-widest uppercase bg-accent-primary hover:bg-accent-primary-deep text-surface transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
          {isSubmitting ? (
            <>
              <UploadCloud className="w-4 h-4 animate-pulse" strokeWidth={2} />
              Processing...
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4" strokeWidth={2} />
              Initialize Quote
            </>
          )}
        </button>
      </div>
    </form>
  );
}


// The Modal version of the form
interface QueryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QueryFormModal({ isOpen, onClose }: QueryFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-background border border-border rounded-sm w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0 bg-surface/50">
          <div>
            <h2 className="text-xl font-display font-black text-text-primary uppercase tracking-widest">Job Specifications</h2>
            <p className="text-xs text-text-muted uppercase tracking-widest mt-1">Provide project details for an automated quote</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto">
          <QuoteFormCore onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
