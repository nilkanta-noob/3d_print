"use client";

// Inline <script> for code that must run during HTML parsing (before first paint). Per the Next.js
// "preventing flash before hydration" guide: text/javascript in the server HTML so it executes, text/plain
// when React renders it in the browser so it's inert and React doesn't warn about rendering a <script>.
// It's a client component so this check actually runs in the browser; suppressHydrationWarning covers the type mismatch.
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
