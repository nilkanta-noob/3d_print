"use client";

import React, { useState, useEffect } from 'react';
import { X, UploadCloud, File, CheckCircle, Check, ShieldCheck, Mail } from 'lucide-react';
import ModelViewer from './ModelViewer';

export function QuoteFormCore({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  // OTP State
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Cleanup object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert("File size exceeds 100MB limit.");
        e.target.value = '';
        setFileUrl(null);
        setFileName('');
        return;
      }

      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileName(file.name);
    } else {
      setFileUrl(null);
      setFileName('');
    }
  };

  const handleSendOtp = async () => {
    if (!email) return alert("Please enter your email first.");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return alert("Please enter a valid email address.");
    }

    setIsSendingOtp(true);
    try {
      const res = await fetch('/api/quote/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setIsOtpSent(true);
        alert("OTP sent to your email!");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to send OTP");
      }
    } catch (e) {
      alert("Error sending OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP.");
    setIsVerifyingOtp(true);
    try {
      const res = await fetch('/api/quote/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsOtpVerified(true);
        setVerifiedToken(data.verifiedToken);
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (e) {
      alert("Error verifying OTP");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOtpVerified || !verifiedToken) {
      return alert("Please verify your email with the OTP before submitting.");
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const phone = formData.get('phone') as string;
      const phoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
      if (phone && !phoneRegex.test(phone)) {
        setIsSubmitting(false);
        return alert("Please enter a valid Indian phone number.");
      }

      formData.append('verifiedToken', verifiedToken); // Attach verified token
      // Ensure email in formData matches verified email just in case
      formData.set('email', email);

      const response = await fetch('/api/quote', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          alert(errorData?.error || "Failed to submit request. Please try again.");
        } catch {
          alert(`Server Error (${response.status} ${response.statusText}):\n\n${text.substring(0, 100)}...`);
        }
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
        <p className="text-text-muted font-sans mb-8">After review, you will get a price quotation on your registered email ID. We will reach out to you within 30 minutes to 1 hour.</p>

        <button
          onClick={() => {
            setIsSuccess(false);
            if (onSuccess) onSuccess();
          }}
          className="px-8 py-3 bg-accent-primary/10 text-accent-primary border border-accent-primary/50 hover:bg-accent-primary hover:text-surface rounded-sm font-bold text-sm uppercase tracking-wider transition-colors whitespace-nowrap"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 lg:p-8 bg-surface rounded-sm relative overflow-hidden flex flex-col min-h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary-deep/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 flex-grow">

        {/* Left Column: Form Details (6 cols to give viewer more space) */}
        <div className="lg:col-span-6 space-y-6 flex flex-col">

          <div className="space-y-4">
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

            {/* Email & OTP Section */}
            <div className="p-4 border border-border/50 bg-background/30 rounded-sm space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted">Email Verification</label>

              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isOtpVerified || isOtpSent}
                    className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
                {!isOtpVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || isOtpSent || !email}
                    className="px-4 py-2.5 bg-surface border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-text-primary hover:text-accent-primary hover:border-accent-primary transition-colors disabled:opacity-50"
                  >
                    {isSendingOtp ? "Sending..." : isOtpSent ? "Sent" : "Send OTP"}
                  </button>
                )}
              </div>

              {isOtpSent && !isOtpVerified && (
                <div className="flex gap-2 animate-in fade-in slide-in-from-top-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-2 bg-background border border-border rounded-sm focus:border-accent-primary outline-none text-text-primary font-sans text-center tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || otp.length < 5}
                    className="px-4 py-2 bg-accent-primary text-surface rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-accent-primary-deep transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify"}
                  </button>
                </div>
              )}

              {isOtpVerified && (
                <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-wider mt-2 animate-in fade-in">
                  <ShieldCheck className="w-4 h-4" /> Email Verified Successfully
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Phone Number</label>
              <input
                name="phone"
                type="tel"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                placeholder="+91 98765 43210 (Optional)"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">Billing & Shipping</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">State/Province</label>
                <input
                  name="state" type="text" required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                  placeholder="Maharashtra"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">City</label>
                <input
                  name="city" type="text" required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Pin/Zip Code</label>
                <input
                  name="pincode" type="text" required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                  placeholder="400001"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">Printing Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Material</label>
                <select
                  name="material"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors appearance-none font-sans"
                >
                  <option value="PLA">PLA (Standard)</option>
                  <option value="ABS">ABS (Tough)</option>
                  <option value="PETG">PETG (Durable / Water-resistant)</option>
                  <option value="TPU">TPU (Flexible)</option>
                  <option value="Resin (Standard)">Resin (Standard Detail)</option>
                  <option value="Resin (Tough)">Resin (Tough Engineering)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Infill Density</label>
                <select
                  name="infill"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors appearance-none font-sans"
                >
                  <option value="20%">20% (Standard - Fast & Cheap)</option>
                  <option value="50%">50% (Strong - Functional Parts)</option>
                  <option value="100%">100% (Solid - Maximum Strength)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Finalize (Post-Processing)</label>
              <select
                name="finalize"
                required
                className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors appearance-none font-sans"
              >
                <option value="Standard">Standard (Support Removal Only)</option>
                <option value="Sanding">Sanding & Smoothing</option>
                <option value="Priming">Priming (Ready for Paint)</option>
                <option value="Painting">Painting (Custom Finish)</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer mt-2 p-3 border border-border bg-background/50 rounded-sm">
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

          {isStudent && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 pt-2">
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

        {/* Right Column: 3D Viewer & Upload (Expanded to 6 cols, increased height) */}
        <div className="lg:col-span-6 space-y-5 flex flex-col h-full min-h-[500px]">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">3D Model Asset</h3>

          <div className="flex flex-col gap-4 flex-grow">
            <div className={`relative flex items-center justify-center px-6 py-4 border-2 border-dashed rounded-sm transition-colors group bg-background/50 ${fileUrl ? 'border-accent-primary/30' : 'border-border hover:border-accent-primary/50'}`}>
              <input
                name="file"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                required
                accept=".stl,.obj,.stp,.step,.igs,.iges,.3mf"
                onChange={handleFileChange}
              />
              <div className="text-center pointer-events-none relative z-10 flex flex-col items-center gap-2">
                <File className={`h-6 w-6 transition-colors ${fileUrl ? 'text-accent-primary' : 'text-text-muted group-hover:text-accent-primary'}`} strokeWidth={1.5} />
                <div className="text-sm">
                  {fileName ? (
                    <span className="font-bold text-accent-primary">{fileName}</span>
                  ) : (
                    <span className="font-bold text-text-muted uppercase tracking-wide">Select or Drop 3D File</span>
                  )}
                </div>
                <p className="text-xs text-text-muted font-sans mt-1">.stl, .obj, .stp, .iges, .3mf (Max: 100MB)</p>
              </div>
            </div>

            <div className="flex-grow rounded-sm overflow-hidden border border-border/50 bg-background flex flex-col min-h-[400px]">
              {fileUrl ? (
                <ModelViewer fileUrl={fileUrl} fileName={fileName} />
              ) : (
                <div className="flex items-center justify-center w-full h-full p-8 text-center text-text-muted flex-col">
                  <div className="w-16 h-16 rounded-full border border-border/50 flex items-center justify-center mb-4 bg-surface/50">
                    <span className="text-xs font-bold uppercase">3D</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold mb-2">Awaiting Upload</p>
                  <p className="text-xs font-sans opacity-70">Upload a 3D model above to generate an interactive preview and verify your geometry before quoting.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex justify-end relative z-10 shrink-0">
        <button
          type="submit"
          disabled={isSubmitting || !isOtpVerified}
          className={`group relative w-full md:w-auto px-10 py-4 rounded-3xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 overflow-hidden ${
            !isOtpVerified 
              ? 'bg-background text-text-muted border border-border cursor-not-allowed' 
              : 'bg-text-primary hover:bg-black text-surface shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
          {isSubmitting ? (
            <>
              <UploadCloud className="w-5 h-5 animate-pulse" strokeWidth={2} />
              Processing Request...
            </>
          ) : !isOtpVerified ? (
            <>
              <ShieldCheck className="w-5 h-5" strokeWidth={2} />
              Verify Email to Submit
            </>
          ) : (
            <>
              <UploadCloud className="w-5 h-5" strokeWidth={2} />
              Submit For Quoting
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-background border border-border rounded-sm w-full max-w-6xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col h-[95vh] lg:h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0 bg-surface/50">
          <div>
            <h2 className="text-xl font-display font-black text-text-primary uppercase tracking-widest">Job Specifications</h2>
            <p className="text-xs text-text-muted uppercase tracking-widest mt-1">Configure parameters & preview geometry</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow p-0">
          <QuoteFormCore onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
