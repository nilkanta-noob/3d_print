"use client";

import React, { useState, useEffect } from 'react';
import { X, UploadCloud, CheckCircle, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import ModelViewer from './ModelViewer';
import { PROJECT_TYPES } from './content/services';
import { WHATSAPP_HREF } from './content/site';
import { useUploadThing } from '@/lib/uploadthing';

// Sentence case, Inter, 14px. Uppercase is kept for the eyebrow and the buttons only.
const LABEL = 'mb-2 block text-[14px] font-medium text-text-secondary min-[760px]:mb-2.5';

/*
 * The card keeps the page's own colour. Only its edge is lifted: a white hairline rather than the 8%
 * --border, so the panels are drawn by their outline instead of by a change of tone.
 */
const CARD =
  'border-y border-white/[0.12] bg-background px-5 py-7 -mx-[var(--frame-gutter)] ' +
  'min-[760px]:mx-0 min-[760px]:border min-[760px]:p-6 lg:p-12';

/*
 * Fields carry no fill at all. Against a card this faint, a filled control was the heaviest thing on the
 * page; an outline on the card's own surface is enough to say where to type.
 */
const FIELD =
  'w-full rounded-control border border-white/[0.12] bg-transparent px-4 py-3 text-[16px] h-[50px] min-[760px]:h-auto font-sans text-text-primary outline-none transition-colors placeholder:text-text-muted hover:border-white/20 focus:border-accent-primary focus:ring-[3px] focus:ring-accent-primary/20';
const HINT = 'mt-2 text-[13px] text-text-muted';

/*
 * FIELD with its text colour swapped, for a select that has nothing chosen yet.
 *
 * Swapped rather than appended. Adding text-text-muted after FIELD would leave two text-colour utilities
 * on one element, and those resolve by their order in the generated stylesheet — not by the order they
 * appear in the class attribute — so which one lands would not be something this file decides. Replacing
 * the token means there is only ever one.
 */
const FIELD_EMPTY = FIELD.replace('text-text-primary', 'text-text-muted');

/*
 * The verify controls. Outlined at the same height as the field beside them, and only lit once there is
 * something worth sending to: an enabled-looking button that does nothing is worse than a dim one.
 */
const ACTION =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control border px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary';
const ACTION_ON = 'cursor-pointer border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-on-accent';
const ACTION_OFF = 'cursor-not-allowed border-white/[0.12] text-text-muted';

function Spinner() {
  return <span aria-hidden="true" className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />;
}

const MATERIAL_LABELS: Record<string, string> = {
  PLA: 'PLA',
  'PLA Pro+': 'PLA+',
  PETG: 'PETG',
};

const FINISH_LABELS: Record<string, string> = {
  Standard: 'Standard, supports removed',
  Sanding: 'Sanded and smoothed',
  Priming: 'Primed, ready for paint',
  Painting: 'Painted',
};

/*
 * A step is a card, carrying the same hairline and square corners as the summary panel beside it.
 *
 * The number is swapped for a check once the step is satisfied, in a slot wide enough for either, so
 * the title never shifts as the marks appear. It goes back to the number if a field is emptied again.
 */
function Step({
  number,
  title,
  complete,
  children,
}: {
  number: string;
  title: string;
  complete: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={CARD}>
      <h3 className="flex items-baseline gap-4">
        <span className="w-[1.25rem] shrink-0 font-mono text-[13px] tabular-nums text-text-muted">
          {complete ? (
            <Check className="size-4 text-accent-primary" strokeWidth={3} aria-label="Step complete" />
          ) : (
            number
          )}
        </span>
        <span className="text-[20px] font-semibold text-text-primary min-[760px]:text-[22px]">{title}</span>
      </h3>
      <div className="mt-5 space-y-[22px] min-[760px]:mt-8 min-[760px]:space-y-7">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value, tone }: { label: string; value: string; tone?: 'accent' | 'pending' }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
      <span className="text-[13px] text-text-muted">{label}</span>
      <span
        className={`text-right text-[14px] ${
          tone === 'accent' ? 'text-accent-primary' : tone === 'pending' ? 'text-[#D9A441]' : 'text-text-primary'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function QuoteFormCore({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // The service a visitor arrived from, when they came through a "Get a quote for this" link. Read from
  // the query string in an effect rather than with useSearchParams, which would force this form — and so
  // the whole page — behind a Suspense boundary for a value that is only a convenience.
  const [projectType, setProjectType] = useState('');
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('service');
    if (slug && PROJECT_TYPES.some((type) => type.slug === slug)) setProjectType(slug);
  }, []);

  // Controlled only so the summary panel can read them. The name attributes are unchanged, so what the
  // form submits is exactly what it submitted before.
  const [material, setMaterial] = useState('PLA');
  const [infill, setInfill] = useState('20%');
  const [finish, setFinish] = useState('Standard');
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  /*
   * Mirrors of the four uncontrolled text fields in step 03, kept only so the step can show whether it
   * is complete. The inputs stay uncontrolled — they have no value prop — so the form still submits
   * straight from the DOM and nothing about the payload changes.
   */
  const [details, setDetails] = useState({ name: '', state: '', city: '', pincode: '' });
  const track = (field: keyof typeof details) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDetails((current) => ({ ...current, [field]: e.target.value }));

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
  // Inline messages replace the alert()s around the code exchange: an alert interrupts the page to say
  // something about one field, and leaves nothing behind once dismissed.
  const [otpError, setOtpError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [verifyPrompt, setVerifyPrompt] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const emailRef = React.useRef<HTMLInputElement>(null);

  // The resend cooldown. Counts down only while it is running, and clears itself on unmount.
  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = window.setInterval(() => setResendIn((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [resendIn]);

  // Editing the address after verifying invalidates the verification: the token belongs to the address
  // that was checked, not to whatever is in the field now.
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (isOtpVerified || isOtpSent) {
      setIsOtpVerified(false);
      setVerifiedToken(null);
      setIsOtpSent(false);
      setOtp('');
      setOtpError(null);
      setSentTo(null);
    }
  };

  // The button is live only when there is a plausible address to send to, and never while a request is
  // in flight or the resend cooldown is running.
  const emailLooksValid = /^\S+@\S+\.\S+$/.test(email);
  const canSend = emailLooksValid && !isSendingOtp && resendIn === 0;

  const resetVerification = () => {
    setIsOtpVerified(false);
    setVerifiedToken(null);
    setIsOtpSent(false);
    setOtp('');
    setOtpError(null);
    setSentTo(null);
    setResendIn(0);
  };

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
      setFileSize(file.size);

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
    if (!email) {
      setOtpError("Enter your email first.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setOtpError("That does not look like an email address.");
      return;
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
        setSentTo(email);
        setOtpError(null);
        setVerifyPrompt(false);
        setResendIn(30);
      } else {
        const data = await res.json();
        setOtpError(data.error || "We could not send the code. Try again.");
      }
    } catch (e) {
      setOtpError("We could not send the code. Try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError("Enter the code we emailed you.");
      return;
    }
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
        setOtpError(null);
        setVerifyPrompt(false);
      } else {
        setOtpError(data.error || "That code is not right. Check it and try again.");
      }
    } catch (e) {
      setOtpError("We could not check that code. Try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submitting never starts the code exchange. It says what is missing, and puts the cursor there.
    if (!isOtpVerified || !verifiedToken) {
      setVerifyPrompt(true);
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailRef.current?.focus({ preventScroll: true });
      return;
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

      // set, not append: both fields carry a name attribute, so the constructor has already put them in
      // the payload. Appending would send each one twice, and the server reads the first entry.
      formData.set('notes', notes.trim());
      formData.set('projectType', projectType);

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
            // These two are the only fields held in state rather than by the DOM, so resetting the form
            // does not clear them on its own.
            setNotes('');
            setProjectType('');
            if (onSuccess) onSuccess();
          }}
          className="hover-lift whitespace-nowrap rounded-control border border-accent-primary/50 bg-accent-primary/10 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-primary [transition-property:transform,background-color,color] hover:bg-accent-primary hover:text-on-accent"
        >
          Go Back
        </button>
      </div>
    );
  }

  const projectLabel = PROJECT_TYPES.find((type) => type.slug === projectType)?.label ?? 'Not chosen yet';

  const stepOneDone = Boolean(uploadedFileUrl);
  const stepTwoDone = Boolean(projectType) && Boolean(material);
  const stepThreeDone =
    Boolean(details.name.trim()) &&
    isOtpVerified &&
    Boolean(details.state.trim()) &&
    Boolean(details.city.trim()) &&
    Boolean(details.pincode.trim());

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/*
        Three grid items rather than two columns of content: the steps, the summary, and the submit. On a
        phone that DOM order is the layout, which puts the summary between the last field and the button,
        where it was asked to sit. From 1024px the summary takes the second column and spans both rows, so
        it can stick while the steps scroll past it.
      */}
      <div className="grid gap-4 min-[760px]:gap-8 lg:grid-cols-[minmax(0,62fr)_minmax(0,38fr)] lg:items-start lg:gap-x-16 lg:gap-y-8">
        <div className="space-y-4 min-[760px]:space-y-10 lg:col-start-1 lg:row-start-1">
          <Step number="01" title="Your file" complete={stepOneDone}>
            {/*
              One area, two states. Before a file is chosen it is the drop target; after, the preview
              renders inside the same box, so nothing appears or disappears around it. The input covers
              the box only while it is empty — once a model is loaded the pointer belongs to the viewer,
              and "Replace file" is the way back.
            */}
            <div
              // Drag state is tracked by hand because :hover does not fire while a file is being
              // dragged, and the drop target should answer to the drag, not to the pointer alone.
              onDragEnter={() => setIsDragging(true)}
              onDragOver={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={() => setIsDragging(false)}
              className={`relative rounded-control border border-dashed bg-transparent transition-colors ${
                fileUrl
                  ? 'border-white/[0.15]'
                  : `min-h-[160px] min-[760px]:min-h-[220px] hover:border-accent-primary hover:bg-accent-primary/5 ${
                      isDragging ? 'border-accent-primary bg-accent-primary/5' : 'border-white/[0.15]'
                    }`
              }`}
            >
              <input
                name="file"
                type="file"
                required
                accept=".stl,.obj,.stp,.step,.igs,.iges,.3mf,.zip"
                onChange={handleFileChange}
                className={`absolute inset-0 h-full w-full cursor-pointer opacity-0 ${fileUrl ? 'pointer-events-none' : 'z-20'}`}
              />

              {fileUrl ? (
                <div className="p-4">
                  <div className="h-[360px] overflow-hidden border border-border bg-background">
                    <ModelViewer fileUrl={fileUrl} fileName={fileName} />
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <p className="min-w-0 text-[15px] text-text-primary">
                      <span className="break-all">{fileName}</span>
                      {fileSize !== null && (
                        <span className="ml-3 font-mono text-[13px] text-text-muted">{formatSize(fileSize)}</span>
                      )}
                    </p>
                    <label className="cursor-pointer text-[14px] text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary">
                      Replace file
                      <input
                        type="file"
                        accept=".stl,.obj,.stp,.step,.igs,.iges,.3mf,.zip"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className={HINT}>Drag to rotate, scroll to zoom.</p>
                  {isUploading && (
                    <p className="mt-1 font-mono text-[13px] text-text-muted">Uploading {uploadProgress}%</p>
                  )}
                </div>
              ) : (
                <div className="pointer-events-none flex min-h-[160px] min-[760px]:min-h-[220px] flex-col items-center justify-center p-8 text-center">
                  {/* A finger cannot drop a file and has nothing to hover, so a touch device is told
                      what it can actually do: the whole zone is the target. */}
                  <p className="text-[16px] text-text-primary">
                    <span className="[@media(hover:none)_and_(pointer:coarse)]:hidden">
                      Drop your file here, or <span className="underline underline-offset-4">browse</span>
                    </span>
                    <span className="hidden [@media(hover:none)_and_(pointer:coarse)]:inline">Tap to choose a file</span>
                  </p>
                  {/* Non-breaking spaces so the size never wraps to leave "MB" alone on its own line. */}
                  <p className="mt-2 text-[13px] text-text-muted">
                    STL, OBJ, STEP, IGES, 3MF or ZIP · up to 100 MB
                  </p>
                </div>
              )}
            </div>
          </Step>

          <Step number="02" title="Print settings" complete={stepTwoDone}>
            <div className="grid gap-x-6 gap-y-[22px] min-[760px]:gap-y-7 md:grid-cols-2">
              <div>
                <label htmlFor="q-project" className={LABEL}>Project type</label>
                {/* The only select on the page that starts empty, so the only one that needs the closed
                    field to read as a placeholder rather than as an answer. text-text-muted while the
                    value is "", the field's normal colour once something real is chosen. */}
                <select
                  id="q-project"
                  name="projectType"
                  required
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className={`${projectType ? FIELD : FIELD_EMPTY} appearance-none`}
                >
                  {/* hidden as well as disabled: disabled alone still lists it as a greyed row that
                      cannot be picked, which is just clutter once the real options are on screen. */}
                  <option value="" disabled hidden>Select project type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type.slug} value={type.slug}>{type.label}</option>
                  ))}
                </select>
                {projectType === 'student-projects' && !isStudent && (
                  <p className={HINT}>Student? Tick the student discount below. College ID required.</p>
                )}
              </div>

              <div>
                <label htmlFor="q-material" className={LABEL}>Material</label>
                <select
                  id="q-material"
                  name="material"
                  required
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className={`${FIELD} appearance-none`}
                >
                  {/* "PLA+" is shown to customers, but the submitted value stays "PLA Pro+" so existing
                      orders remain consistent. */}
                  <option value="PLA">PLA, standard</option>
                  <option value="PLA Pro+">PLA+, engineering grade</option>
                  <option value="PETG">PETG, durable and water resistant</option>
                </select>
              </div>

              <div>
                <label htmlFor="q-infill" className={LABEL}>Infill</label>
                <select
                  id="q-infill"
                  name="infill"
                  required
                  value={infill}
                  onChange={(e) => setInfill(e.target.value)}
                  className={`${FIELD} appearance-none`}
                >
                  <option value="20%">20% · Standard</option>
                  <option value="50%">40% · Strong</option>
                  <option value="100%">100% · Solid</option>
                </select>
                <p className={HINT}>How solid the inside of the part is.</p>
              </div>

              <div>
                <label htmlFor="q-finish" className={LABEL}>Finish</label>
                <select
                  id="q-finish"
                  name="finalize"
                  required
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className={`${FIELD} appearance-none`}
                >
                  <option value="Standard">Standard, supports removed</option>
                  <option value="Sanding">Sanding and smoothing</option>
                  <option value="Priming">Priming, ready for paint</option>
                  <option value="Painting">Painting, custom finish</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="q-notes" className={LABEL}>Notes</label>
              <textarea
                id="q-notes"
                name="notes"
                rows={3}
                maxLength={1000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Colour, deadline, tolerances, anything we should know"
                className={`${FIELD} h-auto resize-y placeholder:text-text-muted`}
              />
              {/* Amber near the ceiling rather than only at it, so the limit is visible before it bites. */}
              <p
                className={`mt-2 text-right font-mono text-[12px] ${
                  notes.length >= 900 ? 'text-[#D9A441]' : 'text-text-muted'
                }`}
              >
                {notes.length} / 1000
              </p>
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <span className="relative mt-0.5 flex items-center">
                <input
                  type="checkbox"
                  name="isStudent"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="peer h-4 w-4 appearance-none rounded-chip border border-border bg-background text-accent-primary transition-colors checked:bg-accent-primary focus:ring-accent-primary focus:ring-offset-background"
                />
                <Check className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-on-accent opacity-0 peer-checked:opacity-100" />
              </span>
              <span>
                <span className="block text-[14px] font-medium text-text-primary">Apply student discount</span>
                <span className="mt-1 block text-[13px] text-text-muted">PLA only · college ID required</span>
              </span>
            </label>

            {isStudent && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className={LABEL}>College ID</label>
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
                    className="w-full font-sans text-sm text-text-secondary transition-colors file:mr-4 file:rounded-chip file:border-0 file:bg-surface file:px-4 file:py-2.5 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-text-primary hover:file:bg-border"
                  />
                  {isStudentIdUploading && (
                    <span className="animate-pulse text-xs text-text-secondary">Uploading ID...</span>
                  )}
                  {studentIdUrl && (
                    <span className="flex items-center gap-1 text-xs font-bold text-text-primary">
                      <CheckCircle className="h-3 w-3 text-accent-primary" /> ID uploaded
                    </span>
                  )}
                </div>
              </div>
            )}
          </Step>

          <Step number="03" title="Your details" complete={stepThreeDone}>
            <div className="grid gap-x-6 gap-y-[22px] min-[760px]:gap-y-7 md:grid-cols-2">
              <div>
                <label htmlFor="q-name" className={LABEL}>Name</label>
                <input id="q-name" name="name" type="text" required onChange={track('name')} placeholder="Your name" className={`${FIELD} placeholder:text-text-muted`} />
              </div>

              <div>
                <label htmlFor="q-phone" className={LABEL}>Phone (optional)</label>
                <input id="q-phone" name="phone" type="tel" placeholder="10-digit mobile" className={`${FIELD} placeholder:text-text-muted`} />
              </div>
            </div>

            {/* Email takes its own full-width row: paired with the name it had half the line, and a
                35-character address ran out of field before it ran out of characters. */}
            <div>
              <label htmlFor="q-email" className={LABEL}>Email</label>

              {/* The button is attached to the field rather than boxed with it: one row, one control,
                  and the states that follow appear underneath instead of opening a panel. On a phone the
                  row becomes a column and the button takes the full width under the input. */}
              <div className="flex flex-col items-stretch gap-2 sm:flex-row">
                  <input
                    ref={emailRef}
                    id="q-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    readOnly={isOtpVerified}
                    placeholder="you@email.com"
                    className={`${FIELD} min-w-0 flex-1 placeholder:text-text-muted read-only:text-text-secondary`}
                  />

                  {isOtpVerified ? (
                    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap px-1 text-[14px] text-accent-primary">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!canSend}
                      className={`${ACTION} ${canSend ? ACTION_ON : ACTION_OFF}`}
                    >
                      {isSendingOtp ? (
                        <>
                          <Spinner /> Sending…
                        </>
                      ) : isOtpSent ? (
                        resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend'
                      ) : (
                        'Verify email'
                      )}
                    </button>
                  )}
                </div>

                {isOtpVerified ? (
                  <p className={HINT}>
                    <button
                      type="button"
                      onClick={resetVerification}
                      className="underline underline-offset-4 transition-colors hover:text-text-primary"
                    >
                      Change
                    </button>
                  </p>
                ) : (
                  <>
                    {sentTo && !otpError && <p className={HINT}>Code sent to {sentTo}</p>}

                    {isOtpSent && (
                      <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                        <div className="flex flex-col items-stretch gap-2 sm:flex-row">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={otp}
                            onChange={(e) => {
                              setOtp(e.target.value);
                              if (otpError) setOtpError(null);
                            }}
                            maxLength={6}
                            aria-label="6-digit code"
                            className={`${FIELD} min-w-0 flex-1 text-center font-mono tracking-[0.3em] sm:max-w-[14rem]`}
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp || otp.length < 5}
                            className={`${ACTION} ${isVerifyingOtp || otp.length < 5 ? ACTION_OFF : ACTION_ON}`}
                          >
                            {isVerifyingOtp ? (
                              <>
                                <Spinner /> Checking…
                              </>
                            ) : (
                              'Verify'
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {otpError && <p className="mt-2 text-[13px] text-text-primary">{otpError}</p>}
                    {verifyPrompt && !otpError && (
                      <p className="mt-2 text-[13px] text-text-primary">Verify your email to continue</p>
                    )}
                  </>
                )}
            </div>

            <div className="grid gap-x-6 gap-y-[22px] min-[760px]:gap-y-7 md:grid-cols-3">
              <div>
                <label htmlFor="q-state" className={LABEL}>State</label>
                <input id="q-state" name="state" type="text" required onChange={track('state')} className={FIELD} />
              </div>
              <div>
                <label htmlFor="q-city" className={LABEL}>City</label>
                <input id="q-city" name="city" type="text" required onChange={track('city')} className={FIELD} />
              </div>
              <div>
                <label htmlFor="q-pincode" className={LABEL}>PIN</label>
                <input id="q-pincode" name="pincode" type="text" required onChange={track('pincode')} className={FIELD} />
              </div>
            </div>
          </Step>
        </div>

        {/* The panel sticks below the navbar rather than at the top of the viewport, which is what the
            24px on top of --nav-height is for. */}
        <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-[calc(var(--nav-height,72px)+1.5rem)]">
          <div className={CARD}>
            <h3 className="text-[16px] font-semibold text-text-primary">Your print</h3>

            <div className="mt-5 flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center border border-border font-mono text-[11px] uppercase text-text-muted">
                {fileName ? (fileName.split('.').pop() || '3D') : '3D'}
              </span>
              <span className="min-w-0 break-all text-[14px] text-text-primary">
                {fileName || <span className="text-text-muted">No file yet</span>}
              </span>
            </div>

            <div className="mt-5">
              <SummaryRow label="Project" value={projectLabel} />
              <SummaryRow label="Material" value={MATERIAL_LABELS[material] ?? material} />
              <SummaryRow label="Infill" value={infill} />
              <SummaryRow label="Finish" value={FINISH_LABELS[finish] ?? finish} />
              {/* The one amber on the site. It is not a palette colour, and it is here because a pending
                  state is neither neutral nor an error, and the accent is already spoken for. */}
              <SummaryRow
                label="Email"
                value={isOtpVerified ? 'Verified' : 'Not verified'}
                tone={isOtpVerified ? 'accent' : 'pending'}
              />
            </div>

            <h4 className="mt-7 text-[13px] font-medium text-text-secondary">What happens next</h4>
            <ol className="mt-3 space-y-2.5">
              {[
                'We check your file.',
                'You get the exact price by email, usually within the hour.',
                'Pay by UPI and we print and ship.',
              ].map((line, i) => (
                <li key={line} className="flex gap-3 text-[14px] leading-[1.6] text-text-secondary">
                  <span className="font-mono text-[13px] text-text-muted">{i + 1}.</span>
                  {line}
                </li>
              ))}
            </ol>

            <p className="mt-6 text-[13px] text-text-muted">
              Rather chat?{' '}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary underline underline-offset-4 transition-colors hover:text-accent-primary"
              >
                WhatsApp us your file
              </a>
            </p>
          </div>
        </aside>

        <div className="-mx-[var(--frame-gutter)] mt-6 px-5 min-[760px]:mx-0 min-[760px]:mt-0 min-[760px]:px-0 lg:col-start-1 lg:row-start-2">
          {/*
            One button. Until the address is verified it sends the code and the input appears under it;
            after that the same button submits. The old second button that only said "verify email to
            submit" is gone, along with the box that used to hold the whole exchange.
          */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="hover-lift group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-control bg-accent-primary px-10 min-[760px]:h-auto min-[760px]:py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-on-accent [transition-property:transform,background-color] hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isSubmitting || isUploading || isStudentIdUploading ? (
              <>
                <UploadCloud className="h-5 w-5 animate-pulse" strokeWidth={2} />
                {isUploading ? `Uploading file ${uploadProgress}%` : isStudentIdUploading ? 'Uploading ID' : 'Sending'}
              </>
            ) : (
              <>
                Send for review
                <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </button>

          {verifyPrompt && !isOtpVerified && (
            <p className="mt-3 text-[13px] text-text-muted">Verify your email in step 03 to continue.</p>
          )}
        </div>
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

        <div className="overflow-y-auto flex-grow p-6 lg:p-10">
          <QuoteFormCore onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
