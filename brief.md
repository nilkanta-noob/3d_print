# PrintWarriors — work brief

**Project:** `D:\Print-Warriors\3d_print` — Next.js 16 (Turbopack) · React 19 · Tailwind v4 (CSS-first) · TypeScript · three.js 0.186
**Branch:** `frontend-redesign` — 1 commit ahead of `origin/frontend-redesign`
**Range covered:** `dd00899` (Sep 24) → `e0ebc3e` (Sep 27) — 13 commits
**Tree state:** clean. `npx tsc --noEmit` passes.

---

## 1. Where things stand

The site has been taken from a generic dark-SaaS template to a deliberate engineering/architectural look. The
three largest pieces of work were the **3D hero**, a **site-wide colour and type system**, and a
**de-templatising pass over the About page**. Everything below is committed and verified in the browser unless
stated otherwise.

---

## 2. What changed, by area

### Hero / 3D viewer — `src/components/hero/`

The single most-iterated part of the project.

| Change | Detail |
|---|---|
| Grid rewritten | `GridHelper` replaced with a shader-faded plane. `fract()` + `fwidth()` for the lines, two tiers (minor / major every 4), radial alpha falloff, screen-space edge fade. This removed the hard cut at the section edge. |
| Framing | Camera frames the part's **bounding sphere**, not its box, so nothing clips at any rotation. `--model-scale` is solved by bisection through the real camera, plus a 216-pose sweep (24 yaw × 9 pitch) capped at `POSE_LIMIT`. |
| Container | Headline clipping fixed by reading nav height from the component into `--nav-h` and padding by it; hero uses `svh`. |
| Part size | Tuned repeatedly on request. `GRID_CELL` untied from the model distance `D`, so the grid no longer resizes with the part. |
| Models | `puppydog.glb` removed. Benchy + C17 remain, both recoloured to `PART_COLOUR = #F2F4F7`. C17 sits level (no X rotation). |
| Mesh weight | Uploaded Benchy was 225,706 tris / 11.3 MB. Decimated to **114,087 tris / 5.7 MB** (0.14 mm vertex clustering, 0.0035-unit bbox drift). |
| Model swap | Grid no longer disappears while the next `.glb` loads — see §4. |
| Grid prominence | Line opacities lifted 5% on request (`0.12` minor / `0.19` major). |

### Design system — `src/app/globals.css`

- **Colour:** orange removed site-wide. `--accent: #A4C4F4`, `--accent-hover: #8FB4EB`, `--accent-dark: #7EA6E0`,
  `--on-accent: #121417` (10.4:1). Hover goes *darker*, because the accent is already light — lightening it
  washed it out toward the page's white text.
- **Surfaces:** three tones — `--background #0F1218` → `--surface #141923` → `--elevated #171D28`, plus
  `--surface-deep #0A0F1C` for the footer only.
- **Type:** General Sans (display) + Inter (body) + IBM Plex Mono. The heading scale lives in `@layer base` and
  nowhere else; components set size and colour only. It used to be spread across ~30 files.
- **Layout token:** `--frame-gutter: max(1.5rem, 5.6%)` — one proportional gutter, so the wordmark, the hero
  headline and every section heading start on the same line at every width.
- The 3D object was deliberately left **neutral grey** rather than accented.

### Navigation — `src/components/Header.tsx`

Floating inset card (driessenarchitectuur.nl reference): thinner and longer, tighter link spacing, wordmark hard
left at 19px, *Get a Quote* hard right, links pure white, social icons accent on hover.

### Section hierarchy — `src/components/Section.tsx`

`tone: 'base' | 'band' | 'emphasis'` plus a `compact` flag. Alternating backgrounds and a 1px accent divider
(`rgba(164,196,244,0.12)`) at each section start. Divider and padding both sit on the inner `site-frame`, so the
rule spans the content container rather than the viewport.

### Pricing — `src/components/PricingSection.tsx`

- Standard prices lifted to white for legibility.
- PLA+ / PETG student cells now read **"To be discussed"** instead of "Coming soon".
- Student column closed into a **box**: borders on all four sides, `bg-accent-primary/[0.06]`.
- A margin in front of the box: a `<td>` cannot take a margin, so the Standard column's right padding went
  `24px → 48px` and the box's inner padding `24px → 32px`. Verified in-browser.

### Services — `src/components/ServicesSection.tsx`, `ImageSlot.tsx`

Four product photos wired in, layout narrowed from the original over-wide version, description padding
increased, `border: 1px solid rgba(255,255,255,0.08)` on the frames. Student Project opens by default on load.
`ImageSlot` gained `layout: 'fill' | 'intrinsic'` and `ratio` to fix next/image warnings (§3).

### About page — `src/app/(site)/about/`, `AboutSection.tsx`, `ProcessShowcase.tsx`

The page used to be the same shape four times: eyebrow → centred heading → paragraph → four-box grid. Rebuilt as
an asymmetric Story split with a 4:5 image frame and the stats inline, then a merged **Mission + Process**
section — argument on the left (48%), four numbered steps on the right (52%), only the open step carrying its
description, with a progress bar showing sequence position (1/4 … 4/4). Auto-advance stops permanently once
someone clicks. A "layer line" motif was built and then removed on request.

### CTA + footer — `CtaBanner.tsx`, `Footer.tsx`

Combined height cut roughly 40–50%. CTA is now an accent block (`#A4C4F4` background, dark text, 700px centred).
Footer compacted to three columns on `#0A0F1C`, 56px top / 32px bottom padding, social icons moved into the
Contact column, copyright alone on the bottom row.

### FAQ — `src/components/FAQSection.tsx`

No longer scrolls inside itself. Answers use the `grid-rows-[0fr] → [1fr]` collapse pattern — the old `max-h-96`
was truncating long answers. Expand is an underlined accent button, and expanding is scroll-anchored via
`useLayoutEffect` so the page does not jump.

### Performance — `hero/HeroModel.tsx`

Next warned that an Explore photo "was detected as the LCP". That warning was **not** followed literally: the
image is in the sixth section of the page and is never above the fold, so eager-loading it would have preloaded
four large photos on every load. The real LCP was measured instead:

```
before:  1136 ms  → /hero/model-fallback.png  (plain <img>, 118 KB, no priority hint)
after:    832 ms  → same element, now fetchPriority="high" decoding="async"
                    (asset responseEnd 360 ms, comfortably before first paint)
```

All 12 `next/image` instances confirmed still `loading="lazy"`.

---

## 3. Notable fixes and what actually caused them

| Symptom | Actual cause |
|---|---|
| Part rendered dull grey, not white | `scene.fog` (near 2 / far 6.5) with the camera ~4 units back put the part *inside* the fog range. Fixed with `fog: false` on the part material. |
| Grid lines vanished after the shader rewrite | The antialiased line profile quantised away at 0.07 alpha. Fixed with a flat 1px core (`LINE_CORE` / `LINE_EDGE`). |
| `lg:aspect-auto` had no effect | **Tailwind v4 emits arbitrary `min-[…]` variants *after* named breakpoints**, so `min-[760px]:aspect-[4/5]` was winning. All hero classes switched to `min-[1024px]:`. |
| Hero wrapper measured 1426px instead of 900px | `align-self: center` survived onto the absolutely positioned box, making it shrink-wrap its own canvas — which was sizing from the wrapper. Fixed with `min-[1024px]:self-stretch`. |
| 500 on `/about` — "Functions cannot be passed directly to Client Components" | `PROCESS_STEPS` carried lucide component references in an `icon` field, passed from a Server Component into the client `ProcessShowcase`. Nothing rendered them; the field was removed entirely. |
| next/image: "height value of 0", "sizes of 100vw" | The `md:hidden` phone copy measured 0×0 with `fill`. Fixed with `layout="intrinsic"` and a breakpoint-aware `sizes`. |

---

## 4. What failed, and what it cost

Recorded honestly, because several of these were avoidable.

**Grid disappearing on model swap — three attempts.**

1. Guessed at a shader `uResolution` guard. Wrong; the user reported no change.
2. Instrumented properly and found a *real* bug — `camera.far` was 6.14 (C17) / 7.96 (Benchy) against a 12-unit
   plate, so the plate was being clipped. Fixed by sizing the clip planes to `PLATE_SIZE`. But this was not the
   bug that had been reported.
3. The user clarified: the grid vanished **during the load between two files**. `mountHeroModel` is async, and
   cleanup disposed the old canvas immediately — leaving nothing rendered for the whole download. Fixed by
   retiring the outgoing scene inside the incoming scene's `onReady` and overlapping the canvases
   (`absolute inset-0`). Verified with a cache-busted 746 KB fetch: 359 samples at 10 ms, `everEmpty: false`.

**Model framing solved the wrong way twice.** Closed-form estimates overshot (91%, then 81%) and then undershot.
Replaced with exact bisection projecting bounding-box corners through the real camera.

**Reported working code as broken — twice.**

- A `ResizeObserver` appeared never to fire, including its initial callback. It was fine: **the hidden Browser
  pane freezes rAF, ResizeObserver and IntersectionObserver.** Forcing a paint proved the path worked.
- Walking `document.styleSheets` read only 105 rules and missed demonstrably-working classes, which led to
  briefly reporting the social-icon accent hover as not generated. The authoritative test is hovering and
  reading the computed colour.

**A measurement stated with false confidence.** Reported that the headline "fits exactly" in its column using
`getBoundingClientRect()` on a block-level `<h1>` — which measures the *box*, not the text. Re-measured the text
ink with a `Range`: 517/555, 395/419, 287/299. There was margin all along, and a code comment had already
encoded the wrong conclusion.

**A codemod that silently half-worked.** A trailing `\b` can never match after `]`, so `tracking-[…]` and
`leading-[…]` survived while `font-display` was stripped. Fixed with a `(?<![\w-])` lookbehind.

**Mesh decimation overshot once.** Vertex clustering at 0.4 mm visibly terraced the Benchy's hull. Settled at
0.14 mm.

**Process mistakes.**

- Produced a plan instead of executing a mechanical colour spec — "u didnt change the colours site wide".
- Misread which element took the accent on the CTA band, putting the colour on the wrong layer.
- Several rounds were spent reverting grid-cell experiments the user disliked, across `8e28617` and `dd00899`.
  The explicit restore-point commit was worth having.

**Tooling friction worth knowing.** The Browser pane crops screenshots to roughly the top-left quadrant at 2×
device-pixel-ratio, times out under load, and freezes rendering while hidden. DOM measurement through
`javascript_tool` was the reliable path throughout; capturing anything below or right of the fold needed a
scaled, fixed-position probe element.

---

## 5. Open items

| # | Item | Notes |
|---|---|---|
| 1 | **FAQ shows 13 of 14 entries** | Something upstream filters one out. Flagged, not yet traced. |
| 2 | "To be discussed" cells sit at `text-text-muted` | Noticeably dimmer than the accent price above them; worth lifting to `text-text-secondary`. |
| 3 | A FAQ answer still says student pricing "will be added later" | Inconsistent with the new "To be discussed" wording in the table. |
| 4 | Per-model `color` fields in `MODELS` are redundant | Both now equal `PART_COLOUR`. |
| 5 | Hero fallback PNG is 118 KB | As WebP it would be roughly a quarter of that, pulling LCP down further. |
| 6 | Optional: `border-separate` on the pricing table | Would give the Student box a real gap on *both* sides instead of borrowing the neighbour's padding — but it also re-spaces the Material and Standard columns. |

---

## 6. How things were verified

- **Layout and spacing:** DOM measurement via `javascript_tool` — computed styles, `getBoundingClientRect`,
  `Range`-based text-ink measurement — rather than screenshots.
- **3D scene:** temporary instrumentation (`window.__heroDebug`, boosted grid opacities, cache-busted model
  URLs, debug outlines), each removed afterwards. Framing was additionally replicated numerically in Python
  (`crop_and_scale.py`, `verify_framing.py`) when the pane was unusable.
- **Performance:** `PerformanceObserver` with `buffered: true` for LCP; `performance.getEntriesByType('resource')`
  for asset timing.
- **Types:** `npx tsc --noEmit` after each change set.

> Note: `/public/uploads` is gitignored, so hero assets must live in `public/hero/`.
