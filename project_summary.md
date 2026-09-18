# PrintWarriors - Project Summary

This document outlines exactly what has been built in the project as of the current clean state (rollback to `eb733c3`).

## 1. Technology Stack
- **Framework:** Next.js 16 (App Router)
- **UI/Styling:** React 19, Tailwind CSS v4
- **Animations:** Framer Motion & GSAP
- **Icons:** Lucide React
- **Database/ORM:** PostgreSQL with Prisma Client

## 2. Frontend (User Interface)
The frontend is heavily focused on a rich, animated user experience. The main landing page (`src/app/page.tsx`) incorporates:
- **Global Video Background:** A cinematic loop (`hero___video.mp4`) covering the main view.
- **ScrollPrintSequence:** Interactive scroll-driven animations showing the 3D printing process.
- **Informational Sections:** `AboutSection`, `MaterialsSection`, and `PricingSection` outlining the services provided.
- **Quotation Form (`QueryForm.tsx`):** A beautiful glass-morphism modal where users can enter their Name, Email, Phone, Material preference, apply a student discount, and upload `.stl` or `.obj` files.

## 3. Backend (API Routes)
- **`/api/quote`:** A single API endpoint that handles the quotation form submission. 
  - **Current State:** It successfully receives the form data and saves the uploaded 3D model files locally to an `uploads/` folder on the server.
  - **Pending:** The code to save the user's data to the database is currently *commented out* and disabled, waiting for proper Authentication and Schema alignment.

## 4. Database Schema (`prisma/schema.prisma`)
The database schema is fully defined and ready for integration, featuring:
- **Authentication Models:** Standard models for NextAuth (`User`, `Account`, `Session`, `VerificationToken`).
- **`Order` Model:** To track quote requests, pricing, billing information, and status (`QUOTE_REQUESTED`, `PRINTING`, `DELIVERED`, etc.).
- **`File` Model:** To store references to uploaded STL files.
- **`OrderStatusHistory`:** An audit log for tracking status changes over time.
