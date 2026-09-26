import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Headings are General Sans, loaded from Fontshare rather than next/font.
//
// It is free for commercial use but is not on Google Fonts, so next/font/google cannot reach it and the
// stylesheet is linked instead. That costs a third-party connection on first paint, which preconnect
// below softens but does not remove. Self-hosting the .woff2 files through next/font/local would be
// faster and is the better end state — it needs the files downloading from Fontshare first.
// Everything else: body copy, navigation, labels, buttons. Inter is drawn for screen text at small sizes,
// which is the whole job here.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Every eyebrow and micro-label on the site, plus order numbers and the OTP input. IBM Plex Mono is a
// drawing-office monospace, which is the register those labels are meant to sit in.
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrintWarriors | Precision 3D Printing",
  description: "From CAD to physical part. Professional 3D printing for prototypes, engineering parts, and custom components.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} font-sans h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f%5B%5D=general-sans@500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary">{children}</body>
    </html>
  );
}
