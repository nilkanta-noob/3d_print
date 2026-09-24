import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fira_Code } from "next/font/google";
import "./globals.css";

// Headings. Space Grotesk is a technical grotesque — squared-off bowls, a single-storey `a`, drafting-table
// numerals — which is what gives the headline its engineered feel. Variable, and its range stops at 700:
// Bold is the heaviest weight it has, so there is no ExtraBold to reach for.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Everything else: body copy, navigation, labels, buttons. Inter is drawn for screen text at small sizes,
// which is the whole job here.
const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary">{children}</body>
    </html>
  );
}
