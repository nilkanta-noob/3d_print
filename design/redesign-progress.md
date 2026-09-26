# Editorial redesign — the design system

The public site was redesigned to read as a premium industrial design studio rather than a startup
landing page. This file is the reference for that system: follow it for any new component, so the site
stays one piece of work.

Reference measurements were taken from driessenarchitectuur.nl at 1440px — display headings at
**weight 500**, letter-spacing **−0.03em to −0.04em**, line-height **~1.0**; tiny uppercase micro-labels
(~11px); **0px** radius on images and content containers; **~3px** radius on buttons; **~108px** of margin
between content blocks; body copy deliberately small against the headings. The charcoal/copper palette is
unchanged — the redesign is typography, geometry and whitespace, not colour.

## Tokens and utilities

Defined in `src/app/globals.css`.

| Utility | Use |
| --- | --- |
| `rounded-control` (5px) | buttons, inputs, selects, textareas, file pickers |
| `rounded-chip` (3px) | small badges, tags, square icon tiles |
| *(no radius class)* | every card, image, table, panel and the quote modal |
| `hover-lift` | the site's only hover movement: `translateY(-2px)`, 300ms `cubic-bezier(.22,1,.36,1)`, motion-safe |
| `label-micro` | 11px / 600 / uppercase / `0.22em` tracking — every micro-label on the site |

## Rules

- **Headings** are `font-medium` (500), never bold, extrabold or black. Tracking `-0.035em`
  (`-0.04em` at display sizes), leading `0.94`–`1.05`. Size and tracking carry the weight, not the font weight.
- **Body copy** is `text-base md:text-[17px]`, `leading-[1.75]`, measure capped around `60ch`. The gap
  between heading size and body size *is* the hierarchy — the body never grows to meet the heading.
- **Buttons** are 13px uppercase at `tracking-[0.12em]`, `rounded-control`, no shadow, with `hover-lift`.
  Because `hover-lift` owns `transition-property: transform`, any colour transition on the same element
  must be re-declared, e.g. `[transition-property:transform,background-color]`.
- **Section rhythm** is `py-24 md:py-32 lg:py-40` (96/128/160px), so two adjacent sections are separated by
  320px on a desktop screen. Heading → content gap is `mt-16 md:mt-20 lg:mt-24`.
- **No shadows anywhere on the public site.** Separation comes from hairline borders (`border-border`) and
  whitespace. Groups of cards prefer one continuous hairline grid (`divide-x`/`divide-y`, or `gap-px` over
  `bg-border`, inside a single border) over separate boxes with gaps.
- **Colour is used sparingly.** The page has one strong copper plane — the open Services row. Everything
  else uses copper only for rules, micro-labels, the primary button and active states.

## Where the system is applied

Every file under `src/components/` and `src/app/(site)/`. Verified across all seven public routes:
no stray radius classes, no shadow classes, no bold/extrabold/black headings, all pages 200.

## Deliberately out of scope

- `src/app/admin/**` — internal tool, not the marketing site.
- `src/components/ModelCard.tsx` and `src/components/SectorSelector.tsx` — both unused (nothing imports
  them). `ModelCard` is also off-brand: it uses gray/orange Tailwind defaults rather than the site's tokens.
- `src/components/QuoteForm.tsx` — the older `/quote` page, outside the `(site)` route group.

## Known pre-existing gaps (not introduced by the redesign)

- `public/hero-poster.jpg` does not exist, so the hero video's poster request 404s and the browser falls
  back to the first frame. Export a still from `public/hero___video.mp4` to that path.
- `npx eslint src` reports 12 errors and 18 warnings; the count is identical before and after the redesign.
