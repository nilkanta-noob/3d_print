import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

// The original PrintWarriors typeface: a geometric sans (variable, weights 100–900) for body and headings
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Monospace labels (order numbers, OTP input)
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrintWarriors | Precision 3D Printing",
  description: "From CAD to physical part. Professional 3D printing for prototypes, engineering parts, and custom components.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary">{children}</body>
    </html>
  );
}
