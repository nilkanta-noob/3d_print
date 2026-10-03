import { ImageResponse } from 'next/og';

/*
 * The icon iOS uses when the site is saved to a home screen. 180x180 is the size Apple asks for, and
 * Next writes the apple-touch-icon link itself from this filename.
 *
 * It is the W alone rather than the whole wordmark: at this size "PrintWarriors" would be unreadable,
 * and the sliced W is the part of the mark that is recognisable on its own. The slices are two bars in
 * the background colour laid across the letter, which is how the mark is built everywhere it cannot
 * use a CSS mask.
 *
 * Unlike the favicon this one is not transparent — iOS composites a home-screen icon onto white, so a
 * transparent background would leave a pale blue W floating on a white tile instead of the dark square
 * the brand uses.
 */

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const BACKGROUND = '#0F1218';
const ACCENT = '#A4C4F4';

export default function AppleIcon() {
  const slice = (top: string) => ({
    position: 'absolute' as const,
    left: 0,
    right: 0,
    top,
    height: 9,
    background: BACKGROUND,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BACKGROUND,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'relative',
            color: ACCENT,
            fontSize: 124,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          W
          <div style={slice('32%')} />
          <div style={slice('62%')} />
        </div>
      </div>
    ),
    size,
  );
}
