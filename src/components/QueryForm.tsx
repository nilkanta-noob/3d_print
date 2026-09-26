"use client";

import React, { useState, useEffect } from 'react';
import { X, UploadCloud, File, CheckCircle, Check, ShieldCheck, Mail } from 'lucide-react';
import ModelViewer from './ModelViewer';
import { useUploadThing } from '@/lib/uploadthing';

export function QuoteFormCore({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isStudent, setIsStudent] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [studentIdUrl, setStudentIdUrl] = useState<string | null>(null);

  const { startUpload, isUploading } = useUploadThing("cadUploader", {
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setUploadedFileUrl(res[0].url);
      }
    },
    onUploadError: (e) => {
      alert("Upload failed: " + e.message);
    }
  });

  const { startUpload: startStudentIdUpload, isUploading: isStudentIdUploading } = useUploadThing("cadUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setStudentIdUrl(res[0].url);
      }
    },
    onUploadError: (e) => {
      alert("Student ID upload failed: " + e.message);
    }
  });

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
      
      // Start upload to cloud immediately
      setUploadProgress(0);
      setUploadedFileUrl(null);
      startUpload([file]);
      
    } else {
      setFileUrl(null);
      setFileName('');
      setUploadedFileUrl(null);
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

    if (!uploadedFileUrl) {
      if (isUploading) {
        return alert("Please wait for the 3D file to finish uploading before submitting!");
      }
      return alert("Please select and upload a 3D file.");
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
      
      // Don't send the physical files, send the cloud URLs
      formData.delete('file');
      formData.delete('studentId');
      
      formData.append('fileUrl', uploadedFileUrl);
      
      if (isStudent) {
        if (!studentIdUrl) {
          if (isStudentIdUploading) {
            return alert("Please wait for the Student ID image to finish uploading.");
          }
          return alert("Please upload your Student ID.");
        }
        formData.append('studentIdUrl', studentIdUrl);
      }

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
      <div className="flex h-full flex-col items-center justify-center border border-accent-primary/20 bg-surface p-12 text-center">
        <CheckCircle className="w-16 h-16 text-accent-primary mb-4 animate-pulse" strokeWidth={1.5} />
        <h3 className="mb-4 text-[2rem] text-text-primary">Request logged</h3>
        <p className="mb-10 max-w-[52ch] text-[15px] text-text-secondary">After review, you will get a price quotation on your registered email ID. We will reach out to you within 30 minutes to 1 hour.</p>

        <button
          onClick={() => {
            setIsSuccess(false);
            if (onSuccess) onSuccess();
          }}
          className="hover-lift whitespace-nowrap rounded-control border border-accent-primary/50 bg-accent-primary/10 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-primary [transition-property:transform,background-color,color] hover:bg-accent-primary hover:text-on-accent"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex min-h-full flex-col overflow-hidden bg-surface p-6 lg:p-10">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 flex-grow">

        {/* Left Column: Form Details (6 cols to give viewer more space) */}
        <div className="lg:col-span-6 space-y-6 flex flex-col">

          <div className="space-y-4">
            <h3 className="label-micro border-b border-border pb-4 text-text-muted">Client Details</h3>

            <div>
              <label className="label-micro mb-2.5 block text-text-muted">Full Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                placeholder="John Doe"
              />
            </div>

            {/* Email & OTP Section */}
            <div className="space-y-4 border border-border bg-background/30 p-5">
              <label className="label-micro block text-text-muted">Email Verification</label>

              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isOtpVerified || isOtpSent}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
                {!isOtpVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || isOtpSent || !email}
                    className="rounded-control border border-border bg-elevated px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-primary transition-colors duration-200 hover:border-accent-primary hover:text-accent-primary disabled:opacity-50"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary outline-none text-text-primary font-sans text-center tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || otp.length < 5}
                    className="whitespace-nowrap rounded-control bg-accent-primary px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-accent transition-colors duration-200 hover:bg-accent-hover disabled:opacity-50"
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify"}
                  </button>
                </div>
              )}

              {isOtpVerified && (
                <div className="flex items-center gap-2 text-text-primary text-xs font-bold uppercase tracking-wider mt-2 animate-in fade-in">
                  <ShieldCheck className="w-4 h-4 text-accent-primary" /> Email Verified Successfully
                </div>
              )}
            </div>

            <div>
              <label className="label-micro mb-2.5 block text-text-muted">Phone Number</label>
              <input
                name="phone"
                type="tel"
                className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                placeholder="+91 98765 43210 (Optional)"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="label-micro border-b border-border pb-4 text-text-muted">Billing & Shipping</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label-micro mb-2.5 block text-text-muted">State/Province</label>
                <input
                  name="state" type="text" required
                  className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                  placeholder="Maharashtra"
                />
              </div>
              <div>
                <label className="label-micro mb-2.5 block text-text-muted">City</label>
                <input
                  name="city" type="text" required
                  className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="label-micro mb-2.5 block text-text-muted">Pin/Zip Code</label>
                <input
                  name="pincode" type="text" required
                  className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors font-sans"
                  placeholder="400001"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="label-micro border-b border-border pb-4 text-text-muted">Printing Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-micro mb-2.5 block text-text-muted">Material</label>
                <select
                  name="material"
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors appearance-none font-sans"
                >
                  {/* The materials we print and price — same values as the /quote form. "PLA+" is shown to
                      customers, but the submitted value stays "PLA Pro+" so existing orders remain consistent. */}
                  <option value="PLA">PLA (Standard)</option>
                  <option value="PLA Pro+">PLA+ (Engineering-grade)</option>
                  <option value="PETG">PETG (Durable / Water-resistant)</option>
                </select>
              </div>

              <div>
                <label className="label-micro mb-2.5 block text-text-muted">Infill Density</label>
                <select
                  name="infill"
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors appearance-none font-sans"
                >
                  <option value="20%">20% (Standard - Fast & Cheap)</option>
                  <option value="50%">50% (Strong - Functional Parts)</option>
                  <option value="100%">100% (Solid - Maximum Strength)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-micro mb-2.5 block text-text-muted">Finalize (Post-Processing)</label>
              <select
                name="finalize"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-control focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none text-text-primary transition-colors appearance-none font-sans"
              >
                <option value="Standard">Standard (Support Removal Only)</option>
                <option value="Sanding">Sanding & Smoothing</option>
                <option value="Priming">Priming (Ready for Paint)</option>
                <option value="Painting">Painting (Custom Finish)</option>
              </select>
            </div>
          </div>

          <label className="mt-2 flex cursor-pointer items-center gap-3 border border-border bg-background/50 p-4">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                name="isStudent"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="peer h-4 w-4 appearance-none rounded-chip border border-border bg-background text-accent-primary transition-colors checked:bg-accent-primary focus:ring-accent-primary focus:ring-offset-background"
              />
              <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-on-accent opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="text-sm font-medium text-text-primary opacity-90 font-sans">Apply Student Discount</span>
          </label>

          {isStudent && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 pt-2">
              <label className="label-micro mb-2.5 block text-text-muted">Verification: College ID</label>
              <div className="flex flex-col gap-2">
                <input
                  name="studentId"
                  type="file"
                  accept="image/*"
                  required={isStudent && !studentIdUrl}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 16 * 1024 * 1024) {
                        alert("Student ID image must be under 16MB.");
                        e.target.value = "";
                        return;
                      }
                      setStudentIdUrl(null);
                      startStudentIdUpload([file]);
                    }
                  }}
                  className="w-full text-sm text-text-secondary file:mr-4 file:py-2.5 file:px-4 file:rounded-chip file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-surface file:text-text-primary hover:file:bg-border transition-colors font-sans"
                />
                {isStudentIdUploading && (
                  <span className="text-xs text-text-secondary animate-pulse">Uploading ID...</span>
                )}
                {studentIdUrl && (
                  <span className="text-xs text-text-primary font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-accent-primary" /> ID Uploaded Successfully
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 3D Viewer & Upload (Expanded to 6 cols, increased height) */}
        <div className="lg:col-span-6 space-y-5 flex flex-col h-full min-h-[500px]">
          <h3 className="label-micro border-b border-border pb-4 text-text-muted">3D Model Asset</h3>

          <div className="flex flex-col gap-4 flex-grow">
            <div className={`relative flex items-center justify-center px-6 py-4 border border-dashed rounded-control transition-colors group bg-background/50 ${fileUrl ? 'border-accent-primary/30' : 'border-border hover:border-accent-primary/50'}`}>
              <input
                name="file"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                required
                accept=".stl,.obj,.stp,.step,.igs,.iges,.3mf,.zip"
                onChange={handleFileChange}
              />
              <div className="text-center pointer-events-none relative z-10 flex flex-col items-center gap-2">
                <File className={`h-6 w-6 transition-colors ${fileUrl ? 'text-accent-primary' : 'text-text-secondary group-hover:text-accent-primary'}`} strokeWidth={1.5} />
                <div className="text-sm">
                  {fileName ? (
                    <span className="font-bold text-accent-primary">{fileName}</span>
                  ) : (
                    <span className="font-bold text-text-secondary uppercase tracking-wide">Select or Drop 3D File</span>
                  )}
                </div>
                <p className="text-xs text-text-secondary font-sans mt-1">.stl, .obj, .stp, .iges, .3mf, .zip (Max: 100MB)</p>
              </div>
            </div>

            <div className="flex min-h-[400px] flex-grow flex-col overflow-hidden border border-border bg-background">
              {fileUrl ? (
                <ModelViewer fileUrl={fileUrl} fileName={fileName} />
              ) : (
                <div className="flex items-center justify-center w-full h-full p-8 text-center text-text-secondary flex-col">
                  <div className="mb-5 flex size-16 items-center justify-center rounded-chip border border-border bg-surface/50">
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
          className={`flex w-full items-center justify-center gap-2.5 rounded-control px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 md:w-auto ${
            !isOtpVerified
              ? 'cursor-not-allowed border border-border bg-background text-text-secondary'
              : 'hover-lift bg-accent-primary text-on-accent [transition-property:transform,background-color] hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50'
          }`}
        >
          {isSubmitting || isUploading || isStudentIdUploading ? (
            <>
              <UploadCloud className="w-5 h-5 animate-pulse" strokeWidth={2} />
              {isUploading ? `Uploading File: ${uploadProgress}%` : isStudentIdUploading ? 'Uploading ID...' : 'Processing Request...'}
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden border border-border bg-surface duration-200 animate-in fade-in lg:h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface p-6 lg:px-10">
          <div>
            <h2 className="leading-[1] text-2xl text-text-primary">Job specifications</h2>
            <p className="mt-2 text-sm text-text-secondary">Configure parameters and preview geometry</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-chip p-2 text-text-secondary transition-colors hover:bg-elevated hover:text-text-primary"
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
