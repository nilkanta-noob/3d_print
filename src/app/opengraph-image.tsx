import { ImageResponse } from 'next/og';

/*
 * The card that shows when a link to the site is pasted into WhatsApp, LinkedIn or a chat.
 *
 * It sits at the root of app/, so every route inherits it and there is one card for the whole site
 * rather than a file per page. Next picks it up by filename and writes the og:image and twitter:image
 * tags itself; nothing references it by hand.
 *
 * It is generated rather than drawn in an image editor so it cannot drift from the site: the colours
 * are the page's own tokens and the composition is the hero's — a hairline, a label, the wordmark, one
 * line of plain text, and a great deal of space. The W is sliced the way the real wordmark is, by
 * laying two background-coloured bars across the letter: Satori, which renders this, has no mask
 * support, and two bars land in the same place for far less than a mask would cost.
 */

export const alt = 'PrintWarriors — 3D printing service in Kolkata, India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BACKGROUND = '#0F1218';
const TEXT = '#F5F7FA';
const MUTED = '#7C8593';
const ACCENT = '#A4C4F4';

export default function OpengraphImage() {
  // The W's bars: two gaps at a third and two thirds of the cap height, as .layered-w does in CSS.
  const slice = (top: string) => ({
    position: 'absolute' as const,
    left: 0,
    right: 0,
    top,
    height: 7,
    background: BACKGROUND,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BACKGROUND,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Eyebrow: the short accent rule the site puts above every section title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 2, background: ACCENT }} />
          <div
            style={{
              color: ACCENT,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            3D Printing
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: 10,
              textTransform: 'uppercase',
              color: TEXT,
            }}
          >
            <span>Print</span>
            <span style={{ display: 'flex', color: ACCENT }}>
              <span style={{ display: 'flex', position: 'relative' }}>
                W
                <div style={slice('37%')} />
                <div style={slice('55%')} />
              </span>
              <span>arriors</span>
            </span>
          </div>

          <div style={{ display: 'flex', color: MUTED, fontSize: 34, marginTop: 28 }}>
            Prototypes, engineering parts and custom components — from your CAD file.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid rgba(245, 247, 250, 0.08)`,
            paddingTop: 28,
            color: MUTED,
            fontSize: 24,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>Kolkata · Delivered across India</div>
          <div style={{ display: 'flex', color: TEXT }}>printwarriors.in</div>
        </div>
      </div>
    ),
    size,
  );
}
