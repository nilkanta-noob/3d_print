import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import { DEFAULT_THEME, THEME_INIT_SCRIPT } from "@/components/theme";
import InlineScript from "@/components/InlineScript";
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
    // data-theme is the server default; the inline script swaps in the saved theme before first paint,
    // so the DOM can differ from the server output here (hence suppressHydrationWarning).
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${outfit.variable} ${firaCode.variable} font-sans h-full antialiased`}
    >
      <head>
        <InlineScript html={THEME_INIT_SCRIPT} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary">{children}</body>
    </html>
  );
}
