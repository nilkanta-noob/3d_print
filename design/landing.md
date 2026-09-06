Redesign the homepage completely. The current design feels like a generic AI-generated SaaS landing page and is not visually distinctive enough for a professional 3D-printing/manufacturing business.
Use the following websites as design references:
Formlabs: [https://formlabs.com/](https://formlabs.com/)
Bambu Lab: [https://bambulab.com/](https://bambulab.com/)
Prusa Research: [https://www.prusa3d.com/](https://www.prusa3d.com/)
Xometry: [https://www.xometry.com/](https://www.xometry.com/)
Protolabs: [https://www.protolabs.com/](https://www.protolabs.com/)
Do NOT copy their designs, layouts, branding, images, or text. Study their visual hierarchy, typography, spacing, photography, technical presentation, and manufacturing-focused UX.
The goal is to create an original visual identity for a premium local 3D-printing service in Kolkata.
Design Direction
Move away from the current:
Generic dark hero
Orange gradient text
Giant printer icon
Excessive rounded cards
SaaS-style appearance
Generic AI-generated visual language
The website should feel like:
A professional digital manufacturing studio
Engineering-focused
Premium
Modern
Precise
Technically credible
Visually sophisticated
It should NOT feel like a hobbyist 3D-printing shop or a generic SaaS dashboard.
Hero
Completely redesign the hero section.
Use a strong visual focal point instead of the current Lucide printer icon.
Prefer a high-quality 3D-printing object, mechanical component, prototype, or realistic 3D-rendered manufactured part.
The hero should communicate:
"From CAD to physical part."
Possible hierarchy:
PRECISION 3D PRINTING
KOLKATA
From CAD to physical part.
Professional 3D printing for prototypes, engineering parts, student projects, custom components and functional models.
[ Upload Your Model ]
[ Explore Materials ]
Do not blindly use this exact copy. Improve it if you have a stronger alternative.
Homepage Structure
Redesign the entire homepage, not only the hero.
Use this general content structure:
Hero
Trust / capability strip
How it works
What we print
Materials
Why choose us
Printed-project showcase
Quote CTA
Footer
Visual Storytelling
Use large visual sections rather than filling the page with small cards.
Use strong whitespace.
Use varied section heights.
Use asymmetric layouts where appropriate.
Avoid making every section look like:
rounded rectangle + shadow + icon + heading + paragraph.
Use actual visual hierarchy.
Typography
Use a modern professional typeface.
Typography should have:
Strong display heading
Clean body text
Clear hierarchy
Good line height
Proper letter spacing
Use a font that is available through Next.js font optimization or another production-safe method.
Do not use excessive font weights.
Color
Do not make orange the dominant visual element.
Use a restrained technical palette.
Possible direction:
Off-white / warm white backgrounds
Deep charcoal
Graphite
Black
One controlled accent color
The accent should be used strategically for CTAs and important interactive elements.
Motion
Add subtle, purposeful animations:
Hero visual entrance
Scroll reveal
Hover interactions
Button transitions
Image movement where appropriate
Do NOT use excessive animations or distracting effects.
Respect prefers-reduced-motion.
3D Printing Visual Language
The design should visually communicate:
Layering
Precision
CAD
Manufacturing
Materials
Physical objects
Engineering
Use subtle visual references to these concepts rather than decorative random gradients.
Responsive Design
The redesign must work beautifully on:
Desktop
Laptop
Tablet
Mobile
Do not simply scale down the desktop design.
Reconsider layouts for mobile.
Existing Functionality
IMPORTANT:
Do not break existing functionality.
Preserve:
Header
Quote form
QueryFormModal
PricingSection
MaterialsSection
Upload STL functionality
Existing routes
Authentication-related functionality if already implemented
Only redesign the presentation unless a structural change is genuinely necessary.
Before Coding
First inspect the existing components and determine:
Which components control the homepage
Which components contain reusable UI
Which components contain business logic
Which components can be redesigned safely
Then explain your proposed visual system briefly.
After that, implement the redesign.
Do not replace working business logic with mock functionality.
The final result should look like a real professional manufacturing company website, not a template.
 i want the landing page to have a video the scrol wheen will print the video is 10 sec long and it will play when the user scrolls to the hero section.
 # PrintWarriors — Website Rebuild Brief

**Read this whole document before writing any code.** This is a design + engineering brief for a premium, interactive marketing site for a 3D printing service. It is not a generic template job — the scroll-driven hero is the centerpiece of the site and should be treated as the hardest, most important part of the build.

---

## 1. What this business is

PrintWarriors is a 3D printing service bureau: customers upload an STL file, get an instant/near-instant quote, choose materials, and receive a physical printed part. The existing (placeholder) site has: a hero, a pricing section, a materials section, a quote-request form (modal + embedded), and a footer. Treat those as the functional skeleton — the content and structure below supersede the placeholder's visual execution, not necessarily its component boundaries.

Target audience: engineers, product designers, students, hobbyists, and small businesses in and around Kolkata who need rapid prototyping or short-run manufacturing.

**Naming note for whoever builds this:** the "Warriors" name is a deliberate departure from the generic "PrintHub/Print-[City]" pattern — lean into it a little. It licenses a slightly bolder, more confident tone than a typical print-bureau site (assertive headline copy, a mark/wordmark with some edge to it) without tipping into gimmicky gamer/esports aesthetics. Keep the visual system from Section 2 (moody, cinematic, precision-engineering) as the anchor — "Warriors" should read as *precision and grit*, not cartoon swords-and-shields.

---

## 2. Design language (derived from reference footage)

A reference video (`hero___video.mp4`) was supplied and defines the visual DNA of the site. Its characteristics, precisely:

- **Color grade:** teal/cyan shadows and highlights on metal surfaces, warm amber/orange in the blurred background — a classic cinematic teal-and-orange grade, not a flat/neutral corporate look.
- **Depth of field:** very shallow. Foreground (nozzle, hotend, fan shroud) is razor sharp; background printer and room fall into soft bokeh.
- **Subject:** real, physical FDM printer hardware — visible stepper motors, belts, wiring looms, heat-sink fans, aluminum extrusion frame. Not a toy, not a cartoon, not a generic stock render.
- **Camera behavior:** slow, deliberate drift/orbit around the print head. No frantic cuts, no shake. Feels observational, like a documentary macro shot, not an ad jingle.
- **Lighting:** low-key, moody workshop lighting with practical light sources (the printer's own LEDs and heat visible as light sources), not bright flat studio lighting.

**Design directive:** the entire site's visual system should feel like it was color-graded from that footage — dark, moody base UI (near-black backgrounds), teal/cyan as the primary accent (not the orange currently used in the placeholder `page.tsx` — replace the orange-600 accent system with a teal/cyan one, keep a small amount of warm amber as a secondary/contrast accent only), generous negative space, large confident typography, and restraint. Avoid:
- Generic SaaS gradients, glassmorphism cliché cards, neon glow buttons
- Cartoonish 3D printer icons/illustrations
- Cramming multiple competing visual effects into one viewport — **one strong idea per section**, with real breathing room between sections. If a section doesn't need a graphic, it shouldn't have one bolted on.

Typography: one confident display sans-serif for headlines (large, tight tracking, black/bold weight), a plain, highly legible body sans for text. Avoid decorative fonts.

---

## 3. Critical honesty note about the reference asset

The supplied `hero___video.mp4` is a **10-second, 1920×1080, 25fps loop** of the print head in motion — a mood/beauty shot. It does **not** show a build progressing from an empty plate to a finished object. That matters because the scroll-driven concept below (Section 4) requires scroll position to map to *print progress* (0% = empty bed, 100% = finished part).

Give the engine both paths so it can build the right thing depending on what asset ends up being available:

- **Path A — footage like the one supplied is the only asset available:** Use it as an ambient, slow-motion, looping background element (e.g., behind a headline in the hero's top band, or as a full-bleed loop in an "About our process" or "Our workshop" section) with real page content laid over/beside it. Do **not** try to force scroll-scrubbing on it, since it has no real start→finish progression to scrub through — scrubbing a loop just looks like random jitter. Instead this clip can autoplay muted on loop with normal CSS/opacity treatment.
- **Path B (preferred, if new footage/renders can be produced) — build the real scroll-scrubbed print sequence** described in Section 4, using one of:
  1. A **Blender-rendered image sequence** (empty plate → finished part, ~150–300 frames, exported as WebP/AVIF) — best quality, best control, most work.
  2. A **real timelapse video** shot of an actual print job start to finish, re-encoded for scrubbing (ffmpeg settings below).
  3. **Three.js/React Three Fiber real-time model** of a printer + growing part, scroll-driven — most flexible, most engineering effort, no rendering/reshooting needed later.

Tell the engine to build the scroll-driven section's *architecture* now (Section 4) against a clearly-labeled placeholder asset, so a real Path-B asset can be dropped in later without re-architecting. This should not block launch — Path A can ship first, Path B can replace it later behind the same component interface.

---

## 4. Centerpiece feature: scroll-driven "digital → physical" print sequence

This is the single most important interactive element on the site. It should communicate, viscerally, without needing to be read: *upload a digital design → the machine manufactures it → you receive a real object.*

### 4.1 Core mechanic

- As the visitor scrolls through this section, a 3D printer progressively prints a physical object. Scroll position directly and continuously controls print progress (0 → 100%).
- Scrolling back up must **reverse** the animation smoothly — this is a scrubber, not a video that "plays once."
- The section pins/sticks in the viewport while scrubbing is in progress; once progress hits 100% scrolling down releases the pin and normal page scroll continues into the next section (and symmetrically in reverse at 0%).
- No visible snapping between states at any scroll speed — must interpolate smoothly whether the user scrolls fast, slow, or stops mid-way.

### 4.2 Composition

- Large, cinematic, full-viewport (or near full-viewport) section.
- Printer + growing object are the primary visual focus, large and centered or off-center per whatever composition looks best — don't force the ASCII layout below literally, it's just intent:

```
FROM DIGITAL                 37% COMPLETE
TO PHYSICAL
                    [ printer / part, large, centered-right ]
        SCROLL TO PRINT
```

- Progress indicator: subtle, technical-feeling — e.g. "PRINTING — 37%" or "LAYER 42 / 112" — not a generic loading bar. Updates smoothly with scroll, no discrete jumps.
- Short copy beats that change as progress advances (don't overload with text):
  - Start: "FROM DIGITAL" / "Every part starts with an idea."
  - Mid: "BUILT LAYER BY LAYER" / "Precision takes shape one layer at a time."
  - End: "TO PHYSICAL" / "Your idea is now a real part."
- On completion: short pause on the finished object, then transition into the next section (e.g. services/capabilities), ideally with the finished object visually leading the eye into what's next.

### 4.3 Technical implementation

Recommended stack: **GSAP + ScrollTrigger**, using `scrub: true` (or a small numeric scrub value like `0.3`–`1` for a touch of catch-up smoothing) on a pinned trigger. This is the standard, battle-tested approach for exactly this effect.

If implementing as **scroll-controlled video** (Path B option 2 above):
- Map scroll progress to `video.currentTime`, not `video.play()`. The video must never autoplay independently of scroll.
- Preprocess the source video so every frame is a keyframe, which is required for frame-accurate scrubbing without stutter:
  ```
  ffmpeg -i input.mp4 -vf scale=1280:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4
  ```
- Wait for `loadedmetadata` before wiring up the ScrollTrigger tween so `video.duration` is known.
- On touch devices, some browsers block `currentTime` scrubbing until the video has been "primed" — call `.play()` immediately followed by `.pause()` on load as a workaround.

If implementing as an **image sequence** (Path B option 1):
- Preload strategically (not all frames at once) — e.g. eagerly load the first N frames needed for above-the-fold, lazily fetch the rest, and consider a low-res/blurred placeholder while higher-res frames stream in.
- Use `requestAnimationFrame` to paint the current frame to a `<canvas>`, not raw scroll-event handlers directly manipulating the DOM on every pixel of scroll (throttle/rAF this).
- Keep frame count and per-frame size only as large as needed for visual smoothness — this is a performance-critical asset, don't ship hundreds of full-resolution PNGs.

If implementing as **real-time 3D** (Path B option 3):
- Three.js / React Three Fiber, scroll progress drives a uniform/state variable controlling the visible "printed height" of the object (e.g. via clip planes, a shader, or morph/scale of a partial mesh) plus the print head's position.
- Keep the model optimized (low poly, compressed textures/Draco) for mobile.

### 4.4 Mobile

Do not simply scale the desktop version down. If the full composition is too heavy for mobile:
- Simplify camera framing/composition
- Reduce frame count/resolution for image-sequence approach, or serve a shorter/lower-res video
- Preserve the *core* scroll-to-print interaction — this is the one thing that shouldn't be cut, even if everything else about it gets simpler on mobile.

### 4.5 Performance requirements (non-negotiable)

- Don't destroy page performance for this effect. Optimize image dimensions/format, cap frame counts, lazy-load what's not immediately needed, and avoid expensive work directly inside raw scroll listeners — use `requestAnimationFrame` or GSAP's own scheduling.
- This section should not meaningfully hurt Core Web Vitals (especially LCP/CLS) on a mid-range mobile device.

### 4.6 Accessibility

- The section's meaning must not depend on the animation alone — include real descriptive text (the copy beats in 4.2 count toward this, but make sure the *concept* — digital design becomes a physical object — is stated in plain text somewhere in or near the section).
- Respect `prefers-reduced-motion`: when set, replace the full scroll-scrub with a simple static image of the finished object, or at most a short, subtle cross-fade — never force the full pinned scrubbing experience on users who've asked for reduced motion.

---

## 5. Sector/industry-aware presentation

The client wants the site to feel tailored across different industries the print service serves (e.g. Product Design & Prototyping, Engineering/Automotive, Architecture & Models, Jewelry & Art, Education, Medical/Anatomical models — adjust this list to whatever the real business actually serves). Build this as an **interactive sector selector**, not six near-duplicate landing pages:

- A row/carousel of sector "chips" or tabs (icons + short labels).
- Selecting a sector updates: the example part/render shown near the hero or in a dedicated "Solutions by industry" section, a short supporting line of copy, and optionally the material/finish recommendation shown in the pricing or materials section.
- This should feel like a single elegant, reactive component — not a page reload, not six stacked identical blocks. Transition between sectors with a quick, tasteful crossfade/slide, not a jarring cut.
- Keep the underlying data (sector name, icon, example image/model, one-line description, recommended material) in a simple typed array/config so content can be edited without touching layout code.

---

## 6. Site structure

Keep the placeholder's component boundaries as a starting point (`Header`, hero, `PricingSection`, `MaterialsSection`, sector selector (new), scroll-print feature (new, Section 4), embedded quote form via `QuoteFormCore`, modal via `QueryFormModal`, footer) but rebuild the visual language throughout per Section 2. Suggested order:

1. **Header** — sticky, minimal, becomes solid/blurred on scroll rather than sitting on a busy background from the start.
2. **Hero** — headline + subhead + two CTAs ("Upload STL" / "View pricing"), restrained use of the reference-video mood (Path A treatment, Section 3) as an ambient background element, not competing with text legibility.
3. **Scroll-driven print sequence** (Section 4) — the centerpiece.
4. **Sector selector** (Section 5).
5. **Materials** — keep information-dense but visually calm; this is a spec-lookup section, not a spectacle section.
6. **Pricing** — clear, scannable, no more than one strong visual idea (e.g. a subtle animated indicator of instant-quote speed) — don't over-decorate a pricing table.
7. **Quote form** — embedded `QuoteFormCore`, generous spacing, clear multi-step or single clean form (not cramped).
8. **Footer** — simple, calm, matches the dark base palette.

**General rule across all sections:** not every section needs a big interactive effect. Section 4 is the one place to spend the "wow" budget. Everywhere else should feel confident, clean, and fast — good typography and spacing do more work than another animation. Cramming multiple competing effects onto one screen is explicitly what to avoid.

---

## 7. Tech stack assumptions

- Next.js (App Router) + TypeScript + Tailwind CSS (matches the existing `page.tsx`).
- `lucide-react` for icons (already in use).
- GSAP + ScrollTrigger for the scroll-scrub mechanic (Section 4).
- Framer Motion (or GSAP, pick one and be consistent) for smaller UI transitions — sector selector crossfade, header state change, on-scroll reveal of section headings, button hover states.
- Optional: React Three Fiber + drei if the Path B "real-time 3D" route is chosen for the hero.
- Keep bundle size and performance in mind — this is a marketing site, first-load performance matters.

---

## 8. Deliverable expectations for whoever builds this

- Replace the orange accent system in the current `page.tsx`/components with the teal/cyan-led dark palette described in Section 2 (small amount of warm amber allowed as secondary contrast, echoing the reference video's background tones).
- Build Section 4 with the placeholder-asset architecture described in 4.3, clearly commented/labeled as using placeholder footage until Path-B assets are produced, so the real asset can be swapped in later without refactoring.
- Do not stop at "looks plausible" — the scroll-scrub interaction (forward, reverse, fast, slow, mid-scroll stop) needs to actually feel physically responsive, not like a video vaguely playing in the background.
- Ship mobile and reduced-motion variants, not just a desktop demo.