"use client";

import React, { useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, File as FileIcon } from 'lucide-react';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    material: 'PLA',
  });
  const [file, setFile] = useState<File | null>(null);

  // Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith('.stl')) {
      alert('Only .stl files are accepted.');
      e.target.value = '';
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      alert('File size must be under 100MB.');
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
  };

  const sendOtp = async () => {
    if (!formData.email) {
      alert('Please enter an email address first.');
      return;
    }
    
    // basic email validation
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsVerifying(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/quote/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
      } else {
        alert(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      alert('An error occurred while sending OTP.');
    } finally {
      setIsVerifying(false);
    }
  };

  const confirmOtp = async () => {
    if (!otp) return;
    setIsVerifying(true);
    try {
      const res = await fetch('/api/quote/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setVerifiedToken(data.verifiedToken);
      } else {
        alert(data.error || 'Invalid OTP');
      }
    } catch (err) {
      alert('An error occurred while verifying OTP.');
    } finally {
      setIsVerifying(false);
    }
  };

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifiedToken || !file || !formData.name || !formData.phone || !formData.material) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const submitData = new FormData();
      submitData.append('verifiedToken', verifiedToken);
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('material', formData.material);
      submitData.append('file', file);

      const res = await fetch('/api/quote/submit', {
        method: 'POST',
        body: submitData,
      });

      const data = await res.json();
      if (res.ok) {
        setOrderNumber(data.orderNumber);
      } else {
        setSubmitError(data.error || "Failed to submit request.");
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = !verifiedToken || !file || !formData.name || !formData.email || !formData.phone || isSubmitting;

  if (orderNumber) {
    return (
      <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center bg-surface border border-accent-primary/20 rounded-sm shadow-2xl">
        <CheckCircle className="w-16 h-16 text-accent-primary mb-6" strokeWidth={1.5} />
        <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-widest mb-4">Request Received</h3>
        <p className="text-text-muted font-sans text-lg mb-2">Thanks! We've received your request.</p>
        <p className="text-accent-primary font-mono text-xl mb-6">Order #{orderNumber}</p>
        <p className="text-sm text-text-muted opacity-80">We will email you a quote shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submitQuote} className="p-6 md:p-8 bg-surface rounded-sm shadow-2xl border border-border/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary-deep/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        
        {submitError && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{submitError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Full Name *</label>
            <input 
              name="name" type="text" required value={formData.name} onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary outline-none text-text-primary font-sans"
              placeholder="John Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Phone Number *</label>
            <input 
              name="phone" type="tel" required value={formData.phone} onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary outline-none text-text-primary font-sans"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        {/* Email & Verification (Inline) */}
        <div className="p-4 bg-background/50 border border-border/50 rounded-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Email Address *</label>
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              name="email" type="email" required value={formData.email} onChange={handleInputChange}
              disabled={!!verifiedToken || otpSent}
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary outline-none text-text-primary disabled:opacity-60 font-sans"
              placeholder="john@example.com"
            />
            
            {!verifiedToken && !otpSent && (
              <button 
                type="button" 
                onClick={sendOtp}
                disabled={isVerifying || !formData.email}
                className="px-6 py-2.5 bg-accent-primary/10 text-accent-primary border border-accent-primary/50 hover:bg-accent-primary hover:text-surface rounded-sm font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isVerifying ? 'Sending...' : 'Verify'}
              </button>
            )}

            {verifiedToken && (
              <div className="px-6 py-2.5 bg-green-500/10 border border-green-500/30 text-green-400 rounded-sm font-bold text-sm uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
                <CheckCircle className="w-4 h-4" /> Verified
              </div>
            )}
          </div>

          {otpSent && !verifiedToken && (
            <div className="mt-4 flex flex-col md:flex-row items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <input 
                type="text" 
                placeholder="Enter 6-digit OTP" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full md:w-auto flex-1 px-4 py-2.5 bg-background border border-accent-primary/50 rounded-sm focus:border-accent-primary outline-none text-text-primary text-center tracking-widest font-mono"
              />
              <button 
                type="button" 
                onClick={confirmOtp}
                disabled={isVerifying || otp.length < 6}
                className="w-full md:w-auto px-6 py-2.5 bg-accent-primary text-surface rounded-sm font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isVerifying ? 'Checking...' : 'Confirm OTP'}
              </button>
              <button 
                type="button"
                onClick={() => { setOtpSent(false); setOtp(''); }}
                className="text-xs text-text-muted hover:text-text-primary underline mt-2 md:mt-0"
              >
                Change Email
              </button>
            </div>
          )}
        </div>

        {/* Material Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Material Specification *</label>
          <select 
            name="material" required value={formData.material} onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary outline-none text-text-primary appearance-none font-sans"
          >
            <option value="PLA">PLA (Standard)</option>
            <option value="PLA Pro+">PLA Pro+ (Engineering-grade)</option>
            <option value="PETG">PETG (Durable / Water-resistant)</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">3D Model (.stl) *</label>
          <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed border-border rounded-sm hover:border-accent-primary/50 transition-colors bg-background/30 group">
            <div className="space-y-2 text-center">
              <FileIcon className="mx-auto h-8 w-8 text-text-muted group-hover:text-accent-primary transition-colors" strokeWidth={1.5} />
              <div className="flex text-sm text-text-muted justify-center">
                <label className="relative cursor-pointer rounded-sm font-bold text-accent-primary hover:text-accent-primary-deep uppercase tracking-wide">
                  <span>{file ? file.name : 'Select File'}</span>
                  <input name="file" type="file" className="sr-only" required accept=".stl" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-xs text-text-muted font-sans">Max size: 100MB</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-border mt-8">
          <button 
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full px-8 py-4 rounded-sm font-bold text-sm tracking-widest uppercase bg-accent-primary hover:bg-accent-primary-deep text-surface transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-5 h-5" strokeWidth={2} />
            {isSubmitting ? 'Submitting...' : 'Send Quotation'}
          </button>
          
          {!verifiedToken && (
             <p className="text-center text-xs text-red-400 mt-3">* Please verify your email before submitting.</p>
          )}
        </div>

      </div>
    </form>
  );
}
