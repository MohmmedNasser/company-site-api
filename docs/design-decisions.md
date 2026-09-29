# Design Decisions

This project ran on a violet-accented design system ("Violet Issue") from
Phase 0 through the first build of the Process section. That system, and
every decision record written against it, has been fully replaced by the
monochrome system below and is not reproduced here — it remains completely
recoverable via git history (the file that defined it, `violet-issue-
DESIGN.md`, was last present at commit `59abd91`), so nothing is lost, it's
just no longer the active contract. What follows documents the CURRENT
system only.

---

## 1. Colour system

**Source:** a monochrome reference site, analyzed by extracting frames from
a walkthrough video at 1/second (55 frames) and pixel-sampling the actual
rendered colours — not estimated from a screenshot. Light mode has no
equivalent source (the reference is dark-mode only) and is derived; every
derived value is flagged as such in `palette.css`.

**Governing principle, replacing "background-layering, not shadows":**
elevation is expressed by a **border**, not a lightness step. Cards and
surfaces sit at the same fill as the page background (darker than or equal
to it in dark mode, lighter than or equal to it in light mode) and are
separated from it — and from each other — by a low-opacity 1px line. This
is a real behavioural change from the old system, where `--card` →
`--surface` → `--surface-raised` was a monotonic lightness ramp. There is
no longer a distinct fill for a "raised" tier: dropdowns, modals, and the
command palette reuse `--surface` and lean on the existing glass/blur
treatment plus literal occlusion to read as floating, not a lighter fill.

### Dark theme (measured)

| Token                                                  | Value                    | Source                                                                       |
| ------------------------------------------------------ | ------------------------ | ---------------------------------------------------------------------------- |
| `--bg`                                                 | `#0A0A0A`                | measured — "base background", consistent across the whole reference page     |
| `--card` / `--surface` / `--surface-raised`            | `#050505`                | measured — "cards/surfaces... darker than or equal to the background"        |
| `--border`                                             | `rgba(255,255,255,0.10)` | measured range `0.08–0.12`; one representative value                         |
| `--text-primary`                                       | `#FFFFFF`                | measured — "primary text, near-pure white"                                   |
| `--text-secondary`                                     | `#9A9A9A`                | measured range `#8F8F8F–#9A9A9A`; the higher-margin end (see contrast table) |
| `--text-decorative` (large de-emphasized numbers only) | `#3A3A3A`                | measured — "very faint text", explicitly NOT AA-checked                      |
| `--primary` (CTA fill)                                 | `#FFFFFF`                | measured — "a solid white button is the only CTA style"                      |
| `--on-primary` (CTA text)                              | `#0A0A0A`                | measured — "black text" on the CTA                                           |
| `--primary-hover`                                      | `#E5E5E5`                | derived — the reference has no captured hover state                          |
| `--secondary` (hero gradient's second blob, etc.)      | `#9A9A9A`                | reused from text-secondary; the reference has no equivalent element          |

### Light theme (derived — no source video)

Same governing principle, mirrored: elevation moves toward the _light_
extreme instead of the dark one.

| Token                                       | Value              | Derivation                                                                                                                                                  |
| ------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--bg`                                      | `#FAFAFA`          | a hair off pure white, mirroring dark mode's bg/card relationship                                                                                           |
| `--card` / `--surface` / `--surface-raised` | `#FFFFFF`          | pure white — "elevated" toward the light extreme, separated from bg by border only                                                                          |
| `--border`                                  | `rgba(0,0,0,0.10)` | same principle, black-based since a white-alpha line is invisible on white                                                                                  |
| `--text-primary`                            | `#0A0A0A`          | reuses dark mode's `--bg` value — one grayscale ramp can serve both themes, unlike a hued palette                                                           |
| `--text-secondary`                          | `#666666`          | chosen for AA margin: 5.50:1 on bg, 5.74:1 on card (bar 4.5:1)                                                                                              |
| `--text-decorative`                         | `#C4C4C4`          | contrast-matched to dark mode's ~1.7:1 de-emphasis ratio against its own background, not eyeballed                                                          |
| `--primary` (CTA fill)                      | `#0A0A0A`          | inverts dark mode's white fill — the CTA is always "the maximum-contrast extreme for this theme", and that extreme is a different physical colour per theme |
| `--on-primary`                              | `#FFFFFF`          | inverts with it                                                                                                                                             |
| `--primary-hover`                           | `#1A1A1A`          | derived, mirrors dark mode's hover-lightens-slightly with hover-darkens-slightly                                                                            |
| `--secondary`                               | `#666666`          | reused from text-secondary                                                                                                                                  |

**This is a real behavioural change from the old system**, not just new
numbers: `--primary` used to be the same saturated violet in both themes
(only its light-mode shade was darkened for AA). Now `--primary` is a
_different physical colour per theme_ — white in dark mode, near-black in
light — because "maximum contrast" in a true monochrome ramp means
different things depending which end of the ramp you're standing on. Focus
rings (`:focus-visible`, built from `--color-primary`) inherit this for
free: they're now a high-contrast neutral outline in both themes, not a
coloured glow, with no separate code change required.

### Contrast — verified live against the rendered tokens, not hand-computed

Read directly off `/styleguide`'s contrast table (which reads the actual
resolved CSS custom properties via `getComputedStyle`, not hardcoded
numbers) after the migration:

| Pair                        | Dark    | Light   | Bar   |
| --------------------------- | ------- | ------- | ----- |
| text-secondary on bg        | 7.04:1  | 5.50:1  | 4.5:1 |
| text-secondary on card      | 7.24:1  | 5.74:1  | 4.5:1 |
| text-primary on bg          | 19.80:1 | 18.97:1 | 4.5:1 |
| text-primary on surface     | 20.38:1 | 19.80:1 | 4.5:1 |
| on-primary on primary       | 19.80:1 | 19.80:1 | 4.5:1 |
| on-primary on primary-hover | 15.72:1 | 17.40:1 | 4.5:1 |

All six pairs clear AA with large margin in both themes. The styleguide's
own contrast-checker had a latent bug this migration surfaced: browsers can
serialize a resolved custom property as 3-digit hex shorthand (`#fff` for a
declared `#ffffff`), which its `hexToRgb` only accepted at 6 digits —
harmless in the old palette (no token happened to collapse to 3 digits) but
broke silently for `--color-primary`/`--color-text-primary`/etc. everywhere
pure white is now used far more. Fixed to expand 3-digit hex, mirroring the
identical fix `Silk.jsx` already carried for the same browser behaviour.

**Hero Silk re-spot-check:** the shader's tonal ramp (`--hero-silk-low/
high`) recolours from violet-derived to pure grey (dark: `#0A0A0A` →
`#787878`; light: `#FAFAFA` → `#FFFFFF`). `#787878` is a deliberate
luminance-matched replacement for the previous ceiling (`#747880`, a
slightly cool-tinted grey) so the headline's contrast against the shader's
worst frame carries over rather than needing re-derivation — sampled live
on a rendered frame post-migration at ~6.7:1 dark / ~16.5:1 light (bar
3:1), and the subtitle-under-scrim at ~6.1:1 dark / ~5.3:1 light (bar
4.5:1) — both with more margin than the pre-migration values, since the
ramp only got lighter/purer, never darker.

**Status colours (`--success`/`--warning`/`--error`) are intentionally
unchanged** — still green/gold/red. See the open question below.

### Light-mode hero silk — the ramp was invisible, and the earlier note said it couldn't be

The light hero rendered as a flat white rectangle. The cause was not the
shader failing to run: `--hero-silk-low`/`high` were `mono-25` → `mono-0`
(`#FAFAFA` → `#FFFFFF`), a **1.04:1** ramp. The shader was animating the
whole time with no tonal range to draw with, against dark mode's 4.48:1
(`mono-950` → `mono-500`).

Fixed by adding `--palette-mono-300` (`#B4B4B4`) as the light floor —
ramp now **2.07:1**.

**Why not a symmetric mirror of the dark ramp.** Mirroring dark mode's span
in CIE L\* lands on ~`#747474`. That measures 4.31:1 for the subtitle and
**fails** the 4.5:1 body-text bar. Light mode has less headroom to spend
than dark mode does — the near-black headline and the `#666666` subtitle
both sit on it — so the light silk is legitimately softer rather than
symmetric. This is the same asymmetry the palette already documents
elsewhere: light mode is derived, not measured, and its constraints are its
own.

**The floor is bounded on both sides.** Visibility pushes it darker; the
subtitle's AA bar stops it. Computed against the ramp's darkest point (the
worst case for both):

| Floor         | Ramp   | Headline (bar 3:1) | Subtitle @ 80% scrim (bar 4.5:1) |
| ------------- | ------ | ------------------ | -------------------------------- |
| `#FAFAFA` old | 1.04:1 | 18.97:1            | 5.50:1                           |
| `#C4C4C4`     | 1.74:1 | 11.35:1            | 4.99:1                           |
| **`#B4B4B4`** | 2.07:1 | 9.55:1             | **4.86:1**                       |
| `#A4A4A4`     | 2.49:1 | 7.94:1             | 4.73:1                           |
| `#747474`     | 4.67:1 | 4.24:1             | 4.31:1 ✗                         |

**The subtitle is the binding constraint, and `HeroScrim` is coupled to
this value.** At 4.86:1 it has ~8% headroom. Darkening the silk further
requires strengthening the scrim in the same change, not treating the two as
independent — `hero-scrim.tsx` now says so at the top.

**A correction to the record:** the previous spot-check note in
`hero-scrim.tsx` reported light-mode figures of ~16.5:1 / ~5.3:1 and reasoned
they were safe because "the ramp only got lighter/purer... not darker, so
the worst case couldn't have gotten meaningfully closer to either bar."
This change moved it darker — the one direction that reasoning excluded — so
those numbers described a ramp that no longer exists and have been replaced
rather than carried forward.

---

## 2. The one exception: violet lives only in the logo mark

Every other colour on the site is white, black, or grey. The logo mark
(`public/brand/codexa-mark.svg`, `codexa-lockup.svg`, `codexa-favicon.svg`)
keeps its original violet strokes (`#5E6AD2` outer arc, `#6E79D6` inner
arc) as **fixed, hardcoded SVG values — never `currentColor`, never
referenced from tokens.css.**

This is a single, named, intentional exception, not a reopening of the
palette. Two consequences that follow directly from "fixed, not
`currentColor`":

- It does not respond to a future rebrand. `palette.css` keeps the same two
  hex values in a clearly quarantined, commented-off section specifically
  so there's a documented source of truth to compare the SVGs against — not
  because any semantic token maps to them. Reaching for
  `--palette-brand-500`/`400` from `tokens.css` is the exact bug that
  quarantine exists to catch.
- It does not follow theme. The header previously served a `currentColor`
  "mono" variant in light mode and a hardcoded-white variant in dark mode,
  swapped via a `mounted`/`resolvedTheme` check — theme-reactive, in other
  words, and the one place in the header doing that dance. It now serves
  `codexa-mark.svg` unconditionally, same asset Footer already used
  correctly, removing the theme branch (and its hydration-mismatch guard)
  entirely rather than reconciling it with a colour that isn't supposed to
  change with theme.

**Everything else — buttons, focus rings, hero background, badges, chips,
icons — is monochrome.** If a future change wants to add colour anywhere
else, that's a new decision to make explicitly, not an extension of this
one.

---

## 3. Typography — Inter Display and Noto Kufi Arabic retained

**Decision, made before this task started:** keep Inter Display (Latin) and
Noto Kufi Arabic exactly as currently installed. The monochrome reference's
own type family — a bold geometric grotesk resembling General Sans/Aeonik —
is a different typeface, and was explicitly NOT sourced or installed.
Everything the reference does typographically is reproduced as an _effect_,
using the fonts already in the project:

- **Very bold weights.** Inter Display is loaded at 400/500/600 (see
  `src/app/fonts.ts`) — no 700/800 face exists. Headings and CTA labels use
  `font-semibold` (600), the heaviest available weight, rather than
  `font-bold` (700), which has no matching face and would either fall back
  to a different family or render synthetically bolded by the browser.
- **Large display numbers.** The type scale's 96/120px steps (added for the
  hero's one-word-per-line mega headline) are the vehicle for this — no new
  sizes needed. `--text-decorative` (§1) exists specifically for a future
  giant, intentionally-low-contrast number treatment (the reference's
  large, semi-transparent step numbers behind process cards), exempted from
  the AA obligation every other text token carries.
- **The white-to-transparent text-gradient heading effect.** Reproducible
  with a `background-clip: text` gradient from `--color-text-primary` to
  transparent (or to `--color-text-secondary`) — a CSS technique, not a
  font dependency. Not yet built anywhere; noted here so a future section
  reaches for this instead of a new font or a hardcoded gradient.

**Arabic-specific rules are unchanged**: Noto Kufi Arabic needs `0`
letter-spacing on headings (negative Latin tracking damages connected
Arabic letterforms), `1.8` body line-height, and `0.95em` optical sizing
relative to Inter Display at the same pixel value — all still applied via
`[lang="ar"]` in `globals.css`. None of this is colour-related, so the
monochrome migration didn't touch it.

---

## 4. Section-label pattern

The reference's core repeating identity element — and now this project's
required pattern for every future hand-built section — is a bracketed
index, the section name, and a thin divider that fills the rest of the row:

```
[01]  Services ─────────────────────────────────────────
```

Built as `src/components/ui/section-label.tsx`. Logical/RTL-correct by
construction rather than by special-casing: it's one `flex` row, which
reorders itself for reading direction automatically (no `rtl:` variant, no
`flex-row-reverse`), and the literal `[`/`]` characters mirror automatically
under the Unicode bidi algorithm in an RTL context. The only thing that
changes per locale is the section-name text the caller passes in, which
arrives already translated.

Demoed on `/styleguide` §18.

---

## 5. Explicitly retired

- **The raster 3D glass hero mark** (`public/brand/codexa-hero-mark-3d.webp`
  /`.png`, an AI-generated 3D rendering of the logo's arc geometry) — its
  colours were baked at generation time and could never follow a palette
  change, which directly contradicts §2 ("colour lives only in the logo
  mark's SVGs, nowhere else, nothing baked"). **Already removed in an
  earlier session, not by this task** — the component and both asset files
  were deleted outright (not merely unreferenced) before the monochrome
  reset began. Recoverable via git history if a future hero decoration
  wants to revisit raster assets vs. token-driven shapes.
- **Its light-mode flat-SVG fallback** (an `AmbientArc` ring stroke) — went
  with it, same prior session, same reasoning: nothing left to fall back
  for once the raster mark it stood in for was gone.
- **The first-card warm-glow exception**, added earlier this session as a
  deliberately-scoped one-off (a red/orange/yellow gradient behind the
  first process-section card, matching a different reference's colours
  exactly). Removed outright by this task rather than converted to a
  neutral white/grey: colour now exists nowhere on the site except the logo
  mark, and a converted glow would have been an arbitrary, unexplained
  visual outlier next to the other two (colourless) cards in the same row —
  there's no equivalent element in the monochrome reference to justify
  keeping a lone decorative glow on one specific card.

---

## 6. Inner pages — the shared page conventions

Established while building `/about` and `/services`; every subsequent inner
page follows them rather than inventing its own.

**Every page opens with `PageIntro`** (`src/components/ui/page-intro.tsx`),
which is the home page's section opener, not a new "page header" style:
`SectionLabel`, then the same heading/description block at the same type
steps (`text-48 md:text-64 lg:text-80`, `text-14 md:text-16`). Two
differences, both consequences of being a page rather than a section — the
heading is an `<h1>`, and it carries `pt-128 md:pt-160` to clear the fixed
header pill. `header.tsx` had noted it was removed from normal flow
"because this project's other pages don't yet exist to need compensating
top clearance"; this is that clearance, and it lives in `PageIntro` rather
than in `header.tsx` so the home page's full-bleed hero keeps sitting
behind the header as designed.

Start-aligned, not centered, following the FAQ section's heading treatment:
a centered block reads as a section _inside_ a longer page, while a page
opener is the top of the reading order.

**Section numbering restarts per page.** `[01]` is the page itself (labelled
with its nav name), then `[02]`, `[03]`… for that page's own sections. A
detail page's `[01]` names the section it belongs to, not the record —
`[01] Services` above an `<h1>` of "Web Development" — so a visitor arriving
from search can tell where in the site they landed. A page whose whole body
is one list (`/services`) gets no second label: numbering the list `[02]`
would imply a sibling section that doesn't exist.

**Vertical rhythm is identical to home**: `py-80 md:py-96` per section,
`mt-32 md:mt-48` under each label, same `Container`.

**Long-form prose is one string, split at render.** `Service.body`,
`Post.body`, and `SiteSettings.pages.*.story.body` store paragraphs as a
single `Localized` string separated by blank lines; `toParagraphs()`
(`src/lib/content/paragraphs.ts`) splits it. The alternative — `Localized`
of `string[]` — would make `Localized` mean two different shapes depending
on the field, and the Phase 14 admin panel edits these in a textarea, which
needs a join/split convention either way. **Splitting happens in the page,
never inside a section component**: sections render what they're given.

**`localeAlternates(path, locale)`** (`src/lib/metadata.ts`) derives
canonical + all hreflang from `routing.locales`/`defaultLocale`, extending
the locale layout's pattern to any route. Retyping three entries per page is
the kind of thing that fails silently until a search console flags it.

**Inner-page copy lives in `SiteSettings.pages.<page>`**, separate from
`sections`. `sections` means "the home page's section copy, keyed by home
section"; folding inner pages in would make that key mean two things. A page
whose every block comes from a collection — any detail page — gets no entry.

### Index pages are rows; detail pages are intro → image → body → tail

`/services`, `/portfolio`, and `/blog` are all full-width rows separated by
a `border-t`, with hover brightening that border — the elevation-is-a-border
rule applied to a list instead of a card. Deliberately not card grids: the
home page already renders services and projects as cards, and repeating that
shape on the index makes it read as a duplicate of a section the visitor
just scrolled past. A row also gives the excerpt and the chips room a card
doesn't, which is the reason to open an index at all. `/portfolio` is the
exception that proves it — a filterable grid needs cards to re-flow.

Detail pages run: `PageIntro` → lead image → body (in a two-column split
with the record's facts) → a short tail of sibling records, so a page ends
on a route onward rather than a dead stop.

**The page's primary content gets no SectionLabel.** `[01]` already
announced it. A section only earns a number when it sits _beside_ something
else — `/services/[slug]`'s body has a capabilities column next to it,
`/portfolio/[slug]`'s has a facts list, so both are `[02]`. A blog article
has no sibling column, so its body is unlabelled and "More reading" takes
`[02]` rather than `[03]`.

### Pagination lives in the path, not a query string

`/blog` is page 1; `/blog/page/2` and up are their own routes with their own
`generateStaticParams`. Reading a `?page=` search param would opt the route
out of static rendering, and a pager is not a reason to break the one
property every other route on this site has. Page 1 keeps the bare `/blog`
URL — `/blog/page/1` is a 404, not an alias, so the index has one canonical
address rather than two serving identical content.

The pager renders nothing at all when there is one page. A disabled
prev/next pair for a single page of posts is chrome that tells the reader
nothing, and a disabled arrow is a non-interactive `<span>`, never a
`<button disabled>` or a link to nowhere — there is no destination, so
there should be nothing in the tab order.

### The /portfolio filter is client state, and filtering is not a remount

Category state lives in `useState`, not the URL, for the same static-
rendering reason as pagination — but with a real cost: a filtered view isn't
linkable. If sharing "just the mobile work" ever matters, the fix is moving
the filter into the path (`/portfolio/mobile`) so it stays static, not into
a query string.

Cards that survive a filter change keep their DOM node and slide to their
new grid position via motion's `layout`, instead of every card fading out
and a new set fading in. That is what makes the control read as re-arranging
one body of work rather than loading a different page. The buttons are a
`role="group"` of `aria-pressed` toggles — not a tablist, because they
filter content in place rather than switching between panels — and the
result count sits in an `aria-live="polite"` region, since a grid changing
silently below is not feedback.

### Dates: two defaults that are both wrong

`formatPostDate` (`src/lib/format-date.ts`) pins two things Intl would
otherwise decide badly:

- **`-u-nu-latn` on Arabic.** Intl defaults Arabic to Eastern Arabic
  numerals (٠١٢). This project's numeral decision is Western digits in both
  locales — the same rule `hero.trust` and `TimelineEntry.year` follow by
  storing plain strings — so the numbering system is pinned rather than
  inherited.
- **`timeZone: "UTC"`.** `"2026-06-15"` parses as UTC midnight, so
  formatting it in a zone behind UTC renders the 14th — and differently on
  the server than in the visitor's browser, which is a hydration mismatch on
  every post.

### Two colour-adjacent decisions this forced

**`StatusCircle` gained a `tone` prop** (`"status"` | `"mono"`, defaulting to
`"status"`). `/about`'s timeline needed it, and its `done`/`in-progress`
states render `--color-success`/`--color-warning` — colour on a marketing
page, which §2 forbids. Restricting the timeline to the already-grey states
was rejected: a shipped 2019 milestone rendering as a hollow "todo" ring is
semantically false. `"mono"` maps `done`/`in-progress` to
`--color-text-primary` and the rest to `--color-text-secondary`.

Nothing is lost by dropping the colour, because colour was never the only
channel: the five states are distinguished by **shape** (dashed ring, hollow
ring, half-filled, filled + check, filled + slash). And no new colour
pairing is introduced — `--color-text-primary` behind the check's
`--color-on-primary` stroke resolves to the same two hex values as the
already-verified `primary`/`on-primary` pair (19.80:1 both themes).

The default staying `"status"` is the point: **§7's open question is not
answered by this prop.** Whether the admin panel keeps colour status
semantics is still open; this only says the marketing site can't use them.

**Photography outside the home services section is grayscale, with one
known inconsistency.** The
full-colour photography exception (`Service.image`, see
`src/lib/content/types.ts`) is scoped to the home Services section, and
"exactly as scoped" means it does not extend to `/services`,
`/services/[slug]`, or `/about`'s team portraits. Those render the same
assets with a CSS `grayscale` filter — a filter, not a colour token, and
the source asset is untouched, so restoring colour anywhere is a one-class
change if that exception is ever widened deliberately.

The inconsistency: the HOME page's portfolio section renders the same
`Project.coverImage` files in full colour, while `/portfolio` and
`/portfolio/[slug]` render them grey. That section is hand-built and was
left alone deliberately rather than edited in passing — but the same
photograph appearing in colour on one page and grey on another is worse than
either choice made consistently, so it wants a decision. Adding `grayscale`
to the one `<Image>` in `portfolio-section.tsx` settles it in the direction
everything else already went.

Note also that `next.config.ts`'s `remotePatterns` comment still describes
picsum.photos as "a placeholder photography source for the Services section
only" — team portraits, project covers, and post covers all use the same
host now. The comment is narrower than the actual usage; worth correcting
whenever real assets replace the placeholders.

---

## 7. Open question — the admin panel (RESOLVED 2026-09-26, see §11)

> **Resolved at Phase 12:** the admin inherits the monochrome system, with
> no colour anywhere — status and destructive semantics included. The text
> below is kept as the record of what was open.

The future Laravel/Inertia admin panel (Phase 12-13, not yet built) has not
been decided one way or the other: it may keep the original dense
Violet-Issue-derived spec (32px controls, 36px rows, 150ms motion, violet
accent) as a deliberately separate density/colour system from the
marketing site, or it may inherit this monochrome system, or something
between the two. **Explicitly deferred, not decided by this task.**

Bundled into this same open question: **`--success`/`--warning`/`--error`
staying colour.** `StatusCircle` (backlog/todo/in-progress/done/cancelled)
is issue-tracker language belonging conceptually to the admin panel, not
the marketing site — and today it's used nowhere but `/styleguide`, on no
built marketing page. Rather than guess which way the admin decision will
land and recolour status semantics to match, they were left exactly as
they were. Revisit both together in whichever future session actually
scopes the admin panel.

Flagged here so it isn't silently forgotten and isn't accidentally decided
by omission.

---

## 8. Backend auth scaffold — simplified to email/password only

**Decision:** the Laravel React starter kit (Inertia 2 + Fortify) was
installed and merged in with Two-Factor Authentication and Passkeys removed
entirely, not left disabled-but-present. Kept: registration, login, password
reset, email verification, password confirmation. See
`docs/learning/02-fortify-role.md` for the full why. **Superseded in part by
§11:** registration has since been removed too (single admin).

In short: this is a small/single-admin dashboard (Phase 12-13's Inertia
admin panel), not a multi-tenant SaaS product where WebAuthn/2FA earn their
complexity. `laravel/fortify` hard-requires `laravel/passkeys` in its own
`composer.json` (`require`, not `suggest`), so that PHP package still sits
in `vendor/` — it can't be excluded without dropping Fortify itself — but
nothing in `app/`, `routes/`, `config/`, or `resources/js/` references it or
any 2FA code. `php artisan route:list` and a repo-wide grep both confirm no
passkey/two-factor route, controller, or component survives (see the
learning doc for the exact commands run).

### `HandleInertiaRequests` shared-props gap — real, but narrower than first
thought

`app/Http/Middleware/HandleInertiaRequests.php` shares only `name`,
`auth.user`, and `sidebarOpen`. **Correction to the initial scaffold-diff
report:** that report flagged "no flash prop" as a gap alongside "no locale
prop" — that was wrong. Reading the installed
`vendor/inertiajs/inertia-laravel/src/Response.php` shows flash messages are
a core Inertia protocol feature, not an app-level shared prop:
`resolveFlashData()` pulls session data written by `Inertia::flash()` (used
already in `ProfileController::update()` and `SecurityController::update()`)
and bakes it into the page response's top-level `flash` key unconditionally
— the same place `resources/js/hooks/use-flash-toast.ts`'s
`router.on('flash', ...)` listener reads from. That already works with zero
changes.

**The actual gap is `locale` only.** Nothing shares the current app locale
to the frontend, which the PROJECT-PLAN.md bilingual requirement (`ar`/`en`
content) will need once the admin panel starts rendering translated
fields. **Closed at Phase 12** — `locale` and `contentLocales` are now
shared (§11).

---

## 9. Phase 10 data model — the real table list, superseding PROJECT-PLAN.md's sketch

`docs/PROJECT-PLAN.md` §"Phase 10" sketched eight tables (`services`
`projects` `testimonials` `clients` `posts` `categories` `contact_messages`
`settings` `users`) as a placeholder before the frontend's content
contract (`docs/content-reference/`) existed. That sketch is now
superseded by what was actually built, read directly off
`docs/content-reference/types.ts`, `repository.ts`, and `mock-repository.ts`:

| Table                       | Notable columns                                                                                | Notes                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `clients`                    | `id` (string PK), `logo`, `url`, `order`, `name` (json)                                          | no dependents seeded before it                                     |
| `services`                   | `id` (string PK), `slug` (unique), `icon`, `image`, `categories` (json array), `order`, `title`/`excerpt`/`body` (json) | `categories` is plain English tags, not localized, no separate tags table |
| `projects`                   | `id` (string PK), `slug` (unique), `category`, `status` (enum), `client_id` (FK → `clients.id`), `cover_image`, `order`, `title`/`summary`/`description` (json) | |
| `testimonials`               | `id` (string PK), `client_id` (FK → `clients.id`), `avatar`, `rating` (decimal 2,1), `order`, `author`/`role`/`quote` (json) | |
| `process_steps`              | `id` (string PK), `icon`, `order`, `title`/`description` (json)                                 | no slug/body — no detail page                                      |
| `faq_items`                  | `id` (string PK), `order`, `question`/`answer` (json)                                            | no slug/body — no detail page                                      |
| `posts`                      | `id` (string PK), `slug` (unique), `cover_image`, `published_at` (date), `order`, `author` (json), `title`/`excerpt`/`body` (json) | |
| `team_members`               | `id` (string PK), `avatar`, `order`, `name`/`role`/`bio` (json)                                  | `/about` page content                                              |
| `values`                     | `id` (string PK), `icon`, `order`, `title`/`description` (json)                                  | `/about` page content; model is `ValueItem`, table stays `values`   |
| `timeline`                   | `id` (string PK), `year` (string, Western digits), `status` (enum), `order`, `title`/`description` (json) | `/about` page content; model is `TimelineEntry`, table stays `timeline` |
| `site_settings`              | `id` (int, `CHECK (id = 1)`), `hero`/`sections`/`pages`/`contact`/`newsletter`/`social` (json)   | singleton — see `docs/learning/08-settings-singleton.md`            |
| `contact_messages`           | `id` (auto-increment), `name`, `email`, `service`, `budget`, `message`, `read_at`, `archived_at`, `created_at` (no `updated_at`) | Phase 13 admin inbox; endpoint not built yet                       |
| `newsletter_subscriptions`   | `id` (auto-increment), `email` (unique), `created_at` (no `updated_at`)                          | endpoint not built yet                                              |

**No `categories` table.** `Service.categories` is a plain JSON array of
practitioner-term tags (`"Next.js"`, `"CI/CD"`) cast to a PHP array — not a
relational lookup table, since the mock data never treats them as a shared,
queryable taxonomy.

**No `settings` table** in the PROJECT-PLAN.md sense of scattered rows —
it's `site_settings`, a one-row table (§ above).

**`users`** already existed from Phase 9's Laravel scaffold and needed no
changes for this phase.

### The snake_case-DB / camelCase-API naming split

Every column and table in the list above is `snake_case`
(`client_id`, `cover_image`, `published_at`) — ordinary Laravel/MySQL
convention. `docs/content-reference/types.ts` uses `camelCase` for the same
concepts (`clientId`, `coverImage`, `publishedAt`). This is a deliberate,
deferred translation, not an inconsistency to fix now: Phase 11's API
Resource layer is where `snake_case` columns become `camelCase` JSON keys
(`ProjectResource` reading `$this->cover_image` and emitting
`"coverImage"`), matching `docs/content-reference/types.ts` field-for-field
on the wire while the database underneath keeps the naming convention
every other Laravel file in this project already uses. Fighting Laravel's
`snake_case` convention inside the schema itself — naming a column
`coverImage` to save a rename later — was rejected because every Eloquent
default (relationship method names, `casts()` keys, migration helpers)
assumes `snake_case`, and camelCase columns would fight that convention on
every other file, not just this one.

---

## 10. Phase 11 public JSON API — decisions and Phase 14 follow-ups

The full wire contract is `docs/api-contract.md`; this section records only
the choices behind it, so they aren't relitigated.

**CORS is an explicit allow-list, currently dev-only.** `config/cors.php`
was published (the framework default is `allowed_origins: ['*']`) and now
allows exactly `http://localhost:3000`, methods `GET`/`POST`, no
credentials. **The production frontend origin must be added to
`allowed_origins` at Phase 14, not before** — adding it now would allow an
origin whose integration nothing yet exercises. Note that CORS only governs
browser-initiated requests: Server Components and Server Actions call the
API server-to-server and are unaffected by this list either way.

**Rate limits (revised 2026-09-29): reads 600/min, submissions 5/min.**
The `api` limiter is now method-aware: `GET`/`HEAD` get **600/min per IP**
(bucket `read|ip`); every other method keeps 120/min (bucket `write|ip`);
`POST /contact` and `POST /newsletter` still stack `submissions` (5/min per
route) on top, unchanged. Why 600: Phase 14 measured ~350 GETs from one IP
for a single `pnpm build` (~10 calls per page render, no request caching
yet), and that burst has to coexist with live page loads (~10 calls each) and
revalidation traffic in the same minute. 600 gives that build ~70% headroom
(~10 req/s sustained) while still stopping a runaway loop. The endpoints are
public, read-only and cheap, so a high ceiling costs little; the abuse-prone
surface is the two writes, which is why those stay at 5/min. Once the
frontend caches reads (`"use cache"`), real traffic falls well below this.
`PublicApiTest` covers a 350-request burst (no 429), the 601st read (429),
and that reads don't consume the submission budget. This is fix 2 of the
frontend's three required-together fixes (its `design-decisions.md` §9).

**The key is still the client IP, and that still needs revisiting.** Once the
frontend calls the API from Vercel's edge (or the Next.js server is the only
caller), every visitor shares that egress IP: the 600/min read budget becomes
site-wide, and the 5/min contact/newsletter budget becomes five submissions
per minute for *all* visitors combined. Deliberately not solved here. When
real production traffic arrives: forward the visitor's IP from the Server
Action (e.g. `X-Forwarded-For`), configure trusted proxies so
`$request->ip()` reads it only from the trusted hop, and exempt or raise the
limit for authenticated build-time traffic.

**Every success is `{ data: T }`, where `T` is the repository method's return
type.** That one rule makes the Phase 14 `api-repository.ts` a thin unwrap.
The only addition is `meta` on `GET /posts`.

**`getPostCount()` has no route; it reads `meta.total` from `GET /posts`.**
A `/posts/count` route would collide with `/posts/{slug}` (a post slugged
`count` would become unreachable), and the count is a by-product of the
paginated query anyway.

**Posts pagination uses a hand-built camelCase `meta`, not Laravel's default
paginated envelope** (`current_page`, `links`, …), which would be the one
place snake_case leaked onto the wire. Page size is fixed at 6 =
`POSTS_PER_PAGE`; the client can't change it, because the frontend computes
page counts from its own constant.

**Projects are not paginated**, overriding PROJECT-PLAN.md's
`/projects?category=&page=` sketch: `ProjectFilter` has no page field and
every frontend caller needs the whole set (§6: the portfolio filter is
client state over the full list).

**Relations are ids, not embedded objects.** `Project.client` and
`Testimonial.clientId` are `Client.id` strings, per `types.ts`; the
frontend joins them against `GET /clients` (`clientNameById`). Embedding a
client object would change the key's type and break that lookup silently.

**One error envelope, rendered in one place**
(`app/Exceptions/ApiExceptionRenderer.php`, registered in
`bootstrap/app.php`). It always returns generic status text as `message`,
never the exception's own message, so a failed slug lookup doesn't reveal
model class names and a 500 doesn't reveal SQL — even with `APP_DEBUG=true`
locally. The trade-off: API 500s no longer show Laravel's debug JSON in the
browser; the stack trace is in `storage/logs/laravel.log`.

**Newsletter subscribe is idempotent** (same 200 for a new or existing
address, emails lower-cased) rather than a `unique` validation error, so the
endpoint can't be used to test whether an address is subscribed.

**Static analysis needs `parseModelCastsMethod: true`.** Without it,
Larastan reads only the declared return type of the models' `casts(): array`
methods, ignores every cast, and types `published_at` / `status` as the raw
column string. If a `phpstan.neon` is added to the repo, it needs this
option.

---

## 11. Phase 12 admin panel (2026-09-26)

### `docs/learning/` is discontinued — explanations move to the chat

**Decision:** no new `docs/learning/NN-topic.md` files. The `laravel-teach`
skill (`.claude/skills/laravel-teach/SKILL.md`, re-enabled) now requires
the same four answers — what it is, why it's here, the rejected
alternative, what breaks without it — **in the chat response** for every
non-trivial Laravel change, for a reader who knows PHP/JS but not Laravel.
Notes 01–08 stay as a historical record; the Arabic Phase 11 notes (09–11)
were deleted.

**Why:** the Phase 11 notes being in Arabic while every other doc is
English is what surfaced it, but the language was the symptom. The real
cost was that a committed note per concept — numbered, cross-linked, with
line references that rot on every edit — is heavy process for a small
single-admin panel, and the explanation is most useful at the moment the
code is reviewed, which is the chat, not a file read later. Reversible: if
a topic deserves a durable write-up, ask for one explicitly.

### The admin inherits the monochrome palette — shadcn token mapping

The admin is Vite, the site is Next.js, so the frontend's
`palette.css`/`tokens.css` can't be imported. Their **values** are
re-declared by hand on shadcn's variable names in
`resources/css/app.css`. **If the frontend palette changes, update this
table and that file together.**

| shadcn variable                            | Dark                     | Light                | Frontend source (§1)                          |
| ------------------------------------------ | ------------------------ | -------------------- | --------------------------------------------- |
| `--background`                             | `#0A0A0A`                | `#FAFAFA`            | `--bg`                                        |
| `--foreground`, `*-foreground` on surfaces | `#FFFFFF`                | `#0A0A0A`            | `--text-primary`                              |
| `--card`, `--popover`, `--sidebar`         | `#050505`                | `#FFFFFF`            | `--card` / `--surface` (elevation by border)  |
| `--border`, `--sidebar-border`             | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.10)`   | `--border`                                    |
| `--input`                                  | `rgba(255,255,255,0.12)` | `rgba(0,0,0,0.12)`   | top of the measured 0.08–0.12 border range    |
| `--primary`, `--sidebar-primary`           | `#FFFFFF`                | `#0A0A0A`            | `--primary` (solid CTA)                       |
| `--primary-foreground`                     | `#0A0A0A`                | `#FFFFFF`            | `--on-primary`                                |
| `--muted-foreground`                       | `#9A9A9A`                | `#666666`            | `--text-secondary`                            |
| `--secondary`, `--muted`                   | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.04)`   | **admin-only**, derived                       |
| `--accent`, `--sidebar-accent`             | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.05)`   | **admin-only**, derived                       |
| `--ring`, `--sidebar-ring`                 | `#FFFFFF`                | `#0A0A0A`            | focus ring built from `--primary`, as on site |
| `--destructive` / `--destructive-foreground` | `#FFFFFF` / `#0A0A0A`  | `#0A0A0A` / `#FFFFFF` | none — see below                             |
| `--chart-1` … `--chart-5`                  | `#FFFFFF` → `#3A3A3A`    | `#0A0A0A` → `#C4C4C4` | grey ramp from the palette                   |
| `--radius`                                 | `8px`                    | `8px`                | gives lg/md/sm = 8/6/4, the site's radii      |

The two **admin-only** rows exist because shadcn's primitives need a
hover/selected fill (ghost buttons, the active sidebar item, tab lists)
and the marketing palette has no fill tiers. A low-alpha tint of the
foreground is the closest thing to "no new colour": it's the border's own
recipe at a different strength.

**No hue anywhere, including destructive and errors.** This resolves §7
(and the bundled status-colour question) for the admin: `--destructive` is
monochrome, so a destructive button looks like a primary one. What carries
"danger" instead is the `AlertDialog` every delete goes through — it names
exactly what is deleted and says it can't be undone — plus the trash icon.
Invalid inputs get a full-strength border (`aria-invalid` → `--destructive`),
validation messages are `font-medium` foreground text, and a language tab
hiding an error gets a dot. Two primitives changed to make that possible:
`button.tsx`'s destructive variant used a literal `text-white` (white on
white now) and reads `text-destructive-foreground` instead; `input-error.tsx`
used `text-red-600`. The auth pages' `text-green-600` status lines became
foreground text for the same reason.

**Dark by default**, matching the site's `defaultTheme="dark"`; light and
system stay selectable under Settings → Appearance. Not adopted in this
phase: the site's Inter Display / Noto Kufi Arabic fonts (the admin still
loads the starter kit's Instrument Sans) and its logo — both belong to a
separate branding pass.

### Single admin: no registration, no roles, no policies

- `Features::registration()` is removed from `config/fortify.php`, which
  removes the `/register` routes entirely (a 404, not a hidden link). The
  `CreateNewUser` action and `auth/register` page went with it.
- The one account is created by `AdminUserSeeder` from `ADMIN_*` env vars
  (`config/admin.php`). It uses `firstOrCreate` on the email, so reseeding
  never resets a changed password, and it refuses the default password
  outside `local`/`testing`.
- **The account can't delete itself** — the starter kit's "Delete account"
  route and component are removed. With registration off, deleting the
  sole admin would lock everyone out with no way back but the CLI.
- **Authorization is the `auth` (+ `verified`) middleware on the admin
  route group, nothing more.** No Policy classes, no Gates: with one user,
  "logged in" and "allowed" are the same fact, and a Policy that always
  returns true is code that looks like a safeguard without being one. If a
  second role ever appears, that's when policies earn their place.
- The starter kit's public welcome page is gone; `/` redirects to
  `/dashboard`, so guests land on `/login`.

### One CRUD pattern for ten content types

Each collection is a small `App\Admin\ContentType` subclass (fields,
index columns, search field, page size, id prefix) registered in
`App\Admin\ContentTypes`. One `ContentController`, one `ContentRequest`,
one `admin/content/index` page and one `admin/content/form` page serve all
ten; `{type}` in the URL is bound to the definition. `App\Admin\Field`
produces both the validation rules and the schema the React form renders,
so the two can't describe different shapes. Every localized field goes
through the one `<LocalizedField>` component.

- **Reorder is up/down buttons, not drag-and-drop**, for every type. Each
  move renumbers the collection 1..n, which also repairs duplicate or
  gapped `order` values. Drag-and-drop would add a dependency and a
  keyboard story for lists of three to eight items; buttons are
  keyboard-accessible as-is. Move buttons hide while a search is active
  (the row above isn't the real neighbour then).
- **Ids keep the seeded `<prefix>-<slug>` convention** (`svc-…`, `team-…`),
  suffixed `-2`, `-3` on collision, and never change after creation.
- **Search** lowercases both sides explicitly: MySQL compares extracted
  JSON strings with a binary collation, so a plain `LIKE` on `title->en`
  would be case-sensitive.
- **A client referenced by projects/testimonials can't be deleted** — the
  foreign keys have no cascade; the admin gets a readable toast instead of
  a 500.

### Images: disk paths for uploads, legacy values untouched

Uploads go to the `public` disk (`storage:link` required) and the column
stores the disk path (`services/01k….webp`). Seeded values are left
exactly as they are until someone uploads a replacement: absolute
`picsum.photos` URLs **and** site-relative paths like
`/clients/ferry-logistics.svg` that the Next.js app serves from its own
`public/`. `App\Support\Media` tells them apart (scheme or leading slash =
legacy), resolves only disk paths to URLs — in the admin and in the six
API resources that emit an image — and only ever deletes disk paths. No
forced migration.

SVG is accepted only on `client.logo` (`image:allow_svg`): SVG can carry
script, and logos are the one field where a vector format is the norm.

**Phase 14 note:** uploaded images resolve against `APP_URL`, so the
frontend's `next.config.ts` `remotePatterns` must include the API host.

### Flash messages and locale

Flash was already wired end to end (§8): `Inertia::flash('toast', …)` →
the page's top-level `flash` key → `useFlashToast()` → sonner. Phase 12
only types it (`flashDataType` in `global.d.ts`) and uses it; adding flash
to shared props as well would have sent it twice. `locale` (UI language,
the tab `<LocalizedField>` opens on) and `contentLocales` (`['en','ar']`)
are new shared props. The active language tab is shared by every field on
the page and persists across admin pages, so an editor can review a whole
record — or several — in one language.

### Not done in Phase 12, though PROJECT-PLAN.md lists them

Command palette (Cmd+K), a rich-text editor for posts, the queued email on
new contact messages, and an image thumbnail pipeline. Roles/policies are
intentionally dropped (above). Ziggy is replaced by Wayfinder, which the
starter kit ships.
