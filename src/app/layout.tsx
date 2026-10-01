import type { Metadata } from "next";
import { SITE_URL } from "@/components/content/site";
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

/*
 * The metadata every page starts from.
 *
 * metadataBase is what lets each page write `alternates: { canonical: '/about' }` and have it come out
 * as an absolute https://www URL. Without it Next resolves relative canonicals against localhost in
 * development and drops them in production, which is the quiet way to ship a site with no canonicals at
 * all.
 *
 * The Open Graph and Twitter blocks are defaults, not final values: each page overrides the title and
 * description, and all of them share the one generated card from opengraph-image.tsx, which Next finds
 * by file convention and lists here automatically.
 *
 * There is deliberately no title template. A template would turn each page's own title into
 * "About | PrintWarriors | PrintWarriors", and the titles below are written whole so each can say where
 * we are and what we do in the roughly sixty characters Google shows.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PrintWarriors | Cheapest 3D Printing Service in India",
  description:
    "Looking for an affordable 3D printing service in India? We offer the cheapest and high-quality 3D printing with pan-India delivery. Get a quote today!",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "PrintWarriors",
    locale: "en_IN",
    url: SITE_URL,
    title: "PrintWarriors | Cheapest 3D Printing Service in India",
    description:
      "Looking for an affordable 3D printing service in India? We offer the cheapest and high-quality 3D printing with pan-India delivery.",
  },
  // Card type only. With no title or description here, Next falls each page's twitter:title and
  // twitter:description back to its own openGraph values — set a title here and every page would
  // share this one.
  twitter: { card: "summary_large_image" },
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
