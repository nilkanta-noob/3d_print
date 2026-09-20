# Editorial redesign — progress note

Paused mid-way. This file records the system that was established and exactly what is left, so the
work can be picked up without re-deriving anything.

## The design system (already in place — follow it for the remaining files)

Reference measurements taken from driessenarchitectuur.nl at 1440px: display headings at **weight 500**,
letter-spacing **−0.03em to −0.04em**, line-height **~1.0**; tiny uppercase micro-labels (~11px);
**0px** radius on images and content containers; **~3px** radius on buttons; **~108px** of margin between
content blocks; body copy deliberately small against the headings. The charcoal/copper palette is unchanged.

Tokens and utilities live in `src/app/globals.css`:

| Utility | Use |
| --- | --- |
| `rounded-control` (5px) | buttons, inputs, selects, textareas, file pickers |
| `rounded-chip` (3px) | small badges, tags, square icon tiles |
| *(no radius class)* | every card, image, table, panel and the quote modal |
| `hover-lift` | the site's only hover movement: `translateY(-2px)`, 300ms `cubic-bezier(.22,1,.36,1)`, motion-safe |
| `label-micro` | 11px / 600 / uppercase / `0.22em` tracking — every micro-label on the site |

Conventions applied so far:

- **Headings** are `font-medium` (500), never bold or black. Tracking `-0.035em` (`-0.04em` at display sizes),
  leading `0.94`–`1.05`. Size and tracking carry the weight, not the font weight.
- **Body copy** is `text-base md:text-[17px]`, `leading-[1.75]`, measure capped around `60ch`.
- **Buttons** are `13px` uppercase at `tracking-[0.12em]`, `rounded-control`, no shadow, with `hover-lift`.
  Because `hover-lift` owns `transition-property: transform`, any colour transition on the same element must
  be re-declared, e.g. `[transition-property:transform,background-color]`.
- **Section rhythm** is `py-24 md:py-32 lg:py-40`; heading → content gap is `mt-16 md:mt-20 lg:mt-24`.
- **Shadows are gone.** Separation comes from hairline borders (`border-border`) and whitespace. Groups of
  cards prefer one continuous hairline grid (`divide-x`/`divide-y` inside a single border) over separate boxes.

## Done

- `src/app/globals.css` — tokens, `hover-lift`, `label-micro`, base heading tracking
- `src/components/Section.tsx` — new spacing scale; the `afterHero` gradient glow replaced by a hairline
- `src/components/Eyebrow.tsx`, `SectionHeading.tsx` — micro-label + weight-500 heading scale
- `src/components/ButtonLink.tsx` — button system (`BUTTON_BASE`, `BUTTON_VARIANTS`, `ArrowLink`)
- `src/components/Header.tsx` — 96px bar from 1024px, hairline active underline, `rounded-control` CTA,
  numbered mobile menu. Full desktop link row from 1024px up is preserved — no hamburger on laptops.
- `src/components/ScrollPrintSequence.tsx` — hero: micro-label added, headline to weight 500 /
  `tracking-[-0.04em]` / `leading-[0.9]`, buttons de-pilled and de-shadowed
- `src/components/ServicesList.tsx`, `ServicesSection.tsx`, `ServiceCard.tsx` — Services
- `src/components/MaterialsSection.tsx` — three cards as one continuous hairline grid; active state is a
  copper rule that draws across the card's top edge instead of a border swap
- `src/components/PricingSection.tsx` — rewritten as a rate card (hairline table, display-size numbers,
  footnote as fine print rather than an alert panel)
- `src/components/ExplorePreview.tsx` — rectangular cards, square arrow tile, `hover-lift`
- `src/components/CtaBanner.tsx` — unboxed: a rule, a large heading, and the actions in their own column
- `src/components/TrustTicker.tsx` — solid copper bar → charcoal band between hairlines with copper rules,
  so the open Services row stays the page's single strong colour plane
- `src/components/Footer.tsx` — rebuilt: footer masthead, editorial grid, square social tiles
- `src/components/QueryForm.tsx` — the Get a Quote form and its modal (all inputs `rounded-control`,
  rectangular panels, restrained type)
- `src/components/ContactForm.tsx`, `src/components/StepTimeline.tsx` (How It Works), `PageHeader.tsx`,
  `FAQSection.tsx`

## Remaining

Apply the same conventions to:

1. `src/components/AboutSection.tsx` — `rounded-2xl` on the video frame → none; `rounded-xl` on the
   "Who we print for" grid → plain bordered hairline grid; facts `dt` → `label-micro`; heading weights to 500
2. `src/components/MaterialDetail.tsx` — `rounded-2xl` → none, padding to `p-8 md:p-12`, name to
   `text-[2.5rem] font-medium tracking-[-0.04em]`, `DetailList` titles → `label-micro`
3. `src/components/MaterialComparison.tsx` — `rounded-xl` → none on both the table and the phone cards;
   column heads → `label-micro`; cell padding to `px-6 py-8`
4. `src/components/StrengthComparison.tsx` — bars `rounded-full` → square, `h-2.5` → `h-1.5`
5. `src/components/RatingMeter.tsx` — segments `rounded-full` → square, `h-1.5 w-3` → `h-1 w-4`
6. `src/components/MasonryGallery.tsx` — tile `rounded-xl` → none, column gaps to 8/10, caption material
   → `label-micro`
7. `src/components/ImageSlot.tsx` — the "Render" badge `rounded-full` → `rounded-chip` + `label-micro`
8. `src/app/(site)/explore/page.tsx` — card `rounded-2xl` → none, idea pills `rounded-full` → `rounded-chip`
9. `src/app/(site)/materials/page.tsx` — spec grid `rounded-xl` → none, `mt-14` gaps → `mt-16 md:mt-20 lg:mt-24`
10. `src/app/(site)/get-quote/page.tsx` — form wrapper `rounded-2xl` → none, note cards `rounded-xl` → none
11. `src/app/(site)/contact/page.tsx` — `InfoCard` `rounded-xl` → none, form panel `rounded-2xl` → none
12. `src/app/(site)/about/page.tsx` — Mission value cards `rounded-xl` → none, `mt-14` → `mt-16 md:mt-20 lg:mt-24`

Then: run `npm run dev`, verify in the browser at desktop, laptop (1280px) and mobile widths, and check the
Services rows still open correctly (only the clicked row grows — closed rows stay compact).

## Deliberately out of scope

- `src/app/admin/**` — internal tool, not the marketing site.
- `src/components/ModelCard.tsx` and `src/components/SectorSelector.tsx` — both unused (nothing imports
  them). `ModelCard` is also off-brand: it uses gray/orange Tailwind defaults rather than the site's tokens.
- `src/components/QuoteForm.tsx` — the older `/quote` page, outside the `(site)` route group.
