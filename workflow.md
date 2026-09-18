# Development Workflow & Checkpoints

This file tracks the upcoming milestones for the 3D Printing application. Mark items with `[x]` as they are completed.

## Phase 1: Authentication & Email Verification
- [x] Set up email utility (mocked/ready for Resend) for transactional emails.
- [x] Update Quote Form to include inline OTP verification (`QuoteForm.tsx`).
- [x] Create `/api/quote/send-otp` to generate and email a 6-digit OTP.
- [x] Create `/api/quote/verify-otp` to validate the OTP and return a secure JWT token.

## Phase 2: Database Integration
- [x] Create `/api/quote/submit` to verify the security token before accepting the upload.
- [x] Use Prisma logic in `/api/quote/submit` to create/update a `User` and create an `Order` in the MySQL database.
- [x] Save the uploaded file's metadata to the `File` table securely.

## Phase 3: Cloud Storage Integration
- [ ] Local `uploads/` folders are deleted on serverless platforms (like Vercel). Integrate AWS S3, Cloudinary, or Vercel Blob.
- [ ] Update the `/api/quote` endpoint to stream uploaded `.stl` files directly to the cloud bucket.
- [ ] Save the returned cloud URL to the database instead of the local file path.

## Phase 4: Dashboards
- [x] Implement NextAuth.js Credentials provider for Admin login.
- [x] **Admin Login:** Secure route (`/admin/login`) with middleware/layout redirect for unauthenticated users.
- [x] **Admin Dashboard:** Secure route (`/admin/quotes`) for admins to view all incoming quotes and related data.
- [x] **Secure Downloads:** Create `/api/admin/files/[fileId]/download` to serve STL files securely only to logged-in admins.

## Phase 5: Production Deployment
- [ ] Connect the GitHub repository to Vercel (or Hostinger).
- [ ] Add production environment variables (Database URL, Resend Key, NextAuth Secret, Cloud Storage Keys).
- [ ] Test the full end-to-end flow on the live URL.
