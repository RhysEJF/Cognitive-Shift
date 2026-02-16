# The Cognitive Shift — Design System

> Extracted from `concept-e.html` (single source of truth).
> All future pages must reference these tokens and patterns exactly.

---

## 1. CSS Custom Properties (Color Tokens)

Defined in `:root`. Naming convention: descriptive, lowercase with hyphens.

```css
:root {
  /* Backgrounds */
  --bg: #1a2a22;              /* Page background — deep forest green */
  --surface: #1f3028;         /* Elevated surface (below-fold sections, cards) */
  --panel: #243830;           /* Panel background (unused in current page but reserved) */

  /* Borders */
  --border: #2e4a3a;          /* Default border */
  --border-light: #3a5a48;    /* Lighter border variant (unused in current page but reserved) */

  /* Cream palette (text hierarchy) */
  --cream: #f0e8d8;           /* Primary text — headings, strong labels */
  --cream-dim: #c8bfa8;       /* Body text default (body color) */
  --cream-muted: #988f7a;     /* Secondary body text, descriptions */

  /* Gold accent */
  --gold: #c8a45c;            /* Primary accent — buttons, eyebrows, diamonds, numerals */
  --gold-light: #daba72;      /* Hover/emphasis variant of gold */
  --gold-glow: rgba(200, 164, 92, 0.08);   /* Subtle gold background glow */
  --gold-border: rgba(200, 164, 92, 0.2);  /* Semi-transparent gold for borders (topbar badge) */

  /* Greens (muted UI text) */
  --green-text: #5a7a68;      /* Green-tinted text (unused in current page but reserved) */
  --muted: #4a6a58;           /* Muted labels, placeholders, section labels, footer text */

  /* White */
  --white: #f5efe5;           /* Warm white (unused in current page but reserved) */
}
```

### Token Usage Map

| Token | Used By |
|-------|---------|
| `--bg` | `body` background, `signup-form input` background, `signup-form button` text color |
| `--surface` | `.signup-card` background, `.below-fold` background, `.bottom-cta .signup-form input` background |
| `--border` | `.topbar` border-bottom, `.signup-card` border, `.signup-form input` border, `.reading-item` borders, `.below-fold` border-top, `.footer` border-top, `.bottom-cta input` border |
| `--cream` | `.topbar-mark`, `.hero-title`, `.signup-form input` text, `.reading-item h3` |
| `--cream-dim` | `body` text color (default for all body text) |
| `--cream-muted` | `.hero-body`, `.reading-item p`, `.bottom-epigraph` |
| `--gold` | `.topbar-badge`, `.hero-eyebrow`, `.topbar-diamond`, `.footer-diamond`, `.reading-num`, `.signup-form button` background, `.gold-rule` gradient, `.hero-crest` SVG strokes |
| `--gold-light` | `.hero-title em`, `.signup-form button:hover` background |
| `--gold-border` | `.topbar-badge` border |
| `--muted` | `.signup-card-header`, `.signup-card-note`, `.section-label`, `.signup-form input::placeholder`, `.bottom-attribution`, `.footer-text` |

---

## 2. Typography

### Font Stack

| Role | Font | Fallback | Weight(s) | Loaded via |
|------|------|----------|-----------|------------|
| Headings / Display | Playfair Display | Georgia, serif | 400, 500 (+ italic 400, 500) | Google Fonts |
| Body / UI | Libre Franklin | sans-serif | 300, 400, 500 | Google Fonts |

Google Fonts embed URL:
```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Libre+Franklin:wght@300;400;500&display=swap
```

### Body Defaults

```css
body {
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
  color: var(--cream-dim);
  -webkit-font-smoothing: antialiased;
}
```

### Type Scale

| Element | Font | Size | Weight | Style | Line-height | Letter-spacing | Color |
|---------|------|------|--------|-------|-------------|----------------|-------|
| `.topbar-mark` | Playfair Display | 1.05rem | 400 | normal | — | 0.02em | `--cream` |
| `.topbar-badge` | Libre Franklin | 0.55rem | 500 | uppercase | — | 0.12em | `--gold` |
| `.hero-eyebrow` | Libre Franklin | 0.6rem | 500 | uppercase | — | 0.2em | `--gold` |
| `.hero-title` | Playfair Display | clamp(2.2rem, 5vw, 3.2rem) | 400 | normal | 1.2 | -0.01em | `--cream` |
| `.hero-title em` | Playfair Display | (inherited) | (inherited) | italic | — | — | `--gold-light` |
| `.hero-body` | Libre Franklin | 1.05rem | 300 (inherited) | normal | 1.8 | — | `--cream-muted` |
| `.section-label` | Libre Franklin | 0.6rem | 500 | uppercase | — | 0.22em | `--muted` |
| `.reading-num` | Playfair Display | 0.85rem | 400 | italic | — | — | `--gold` |
| `.reading-item h3` | Playfair Display | 1rem | 400 | normal | — | — | `--cream` |
| `.reading-item p` | Libre Franklin | 0.85rem | 300 (inherited) | normal | 1.6 | — | `--cream-muted` |
| `.bottom-epigraph` | Playfair Display | 1.15rem | 400 | italic | — | — | `--cream-muted` |
| `.bottom-attribution` | Libre Franklin | 0.65rem | 300 (inherited) | normal | — | 0.1em | `--muted` |
| `.signup-card-header` | Libre Franklin | 0.6rem | 500 | uppercase | — | 0.15em | `--muted` |
| `.signup-form input` | Libre Franklin | 0.85rem | 300 | normal | — | — | `--cream` |
| `.signup-form button` | Libre Franklin | 0.7rem | 500 | uppercase | — | 0.1em | `--bg` |
| `.signup-card-note` | Libre Franklin | 0.68rem | 300 (inherited) | italic | — | — | `--muted` |
| `.footer-text` | Libre Franklin | 0.6rem | 300 (inherited) | uppercase | — | 0.12em | `--muted` |

### Typography Conventions

- **Headings** always use Playfair Display, weight 400, no bold
- **Italic headings** use Playfair Display italic for emphasis (`.hero-title em`, `.bottom-epigraph`, `.reading-num`)
- **Body text** uses Libre Franklin weight 300 (light)
- **UI labels** use Libre Franklin weight 500, uppercase, wide letter-spacing
- **Fluid sizing** only on `.hero-title`: `clamp(2.2rem, 5vw, 3.2rem)`

---

## 3. Spacing Patterns

### Section Padding

| Section | Padding |
|---------|---------|
| `.hero` | `10rem 2rem 5rem` (top accounts for fixed topbar) |
| `.below-fold` | `5rem 2rem 6rem` |
| `.bottom-cta` | `4rem 2rem 5rem` |
| `.footer` | `2rem` |
| `.topbar` | `0.9rem 2.5rem` |

### Component Internal Spacing

| Component | Property | Value |
|-----------|----------|-------|
| `.signup-card` | padding | `1.5rem` |
| `.signup-card-header` | margin-bottom | `1rem` |
| `.signup-card-header` | padding-bottom | `0.75rem` |
| `.signup-card-note` | margin-top | `0.75rem` |
| `.signup-form` | gap | `0.5rem` |
| `.signup-form input` | padding | `0.8rem 1rem` |
| `.signup-form button` | padding | `0.8rem 1.4rem` |
| `.reading-item` | padding | `1.25rem 0` |
| `.reading-item` | gap (to number) | `1.5rem` |
| `.topbar-right` | gap | `1rem` |
| `.topbar-badge` | padding | `0.25rem 0.6rem` |

### Key Margins

| Element | Margin | Value |
|---------|--------|-------|
| `.hero-crest` | margin-bottom | `2.5rem` |
| `.hero-eyebrow` | margin-bottom | `1.75rem` |
| `.hero-title` | margin-bottom | `1.5rem` |
| `.gold-rule` | margin (vertical) | `2.5rem auto` |
| `.section-label` | margin-bottom | `3rem` |
| `.reading-item h3` | margin-bottom | `0.3rem` |
| `.bottom-epigraph` | margin-bottom | `0.5rem` |
| `.bottom-attribution` | margin-bottom | `2rem` |

### Content Max-Widths

| Element | max-width |
|---------|-----------|
| `.hero-content` | 620px |
| `.hero-body` | 480px |
| `.signup-card` | 440px |
| `.below-content` | 520px |
| `.bottom-epigraph` | 380px |
| `.bottom-cta .signup-form` | 420px |

---

## 4. Component Patterns

### 4.1 Topbar

Fixed navigation bar with frosted glass effect.

```
┌─────────────────────────────────────────────────────┐
│  [Topbar Mark]                [Badge] [Diamond]     │
└─────────────────────────────────────────────────────┘
```

- **Position**: `fixed`, top: 0, z-index: 100
- **Background**: `rgba(26, 42, 34, 0.92)` — semi-transparent `--bg`
- **Blur**: `backdrop-filter: blur(16px)`
- **Border**: 1px solid `--border` on bottom
- **Layout**: flexbox, `justify-content: space-between`, `align-items: center`
- **Mark**: Playfair Display, 1.05rem, `--cream`
- **Badge**: uppercase micro-text with `--gold-border` outline
- **Diamond**: 6×6px gold square rotated 45deg, opacity 0.6

### 4.2 Hero Section

Full-viewport centered content with radial vignette overlay.

- **Layout**: flexbox column, centered, `min-height: 100vh`
- **Vignette**: `::before` pseudo-element with `radial-gradient(ellipse at center, transparent 50%, rgba(16, 24, 18, 0.4) 100%)`
- **Content stack** (top to bottom):
  1. Hero crest (SVG, 64×64px)
  2. Eyebrow label
  3. Title (h1)
  4. Body paragraph
  5. Gold rule divider
  6. Signup card

### 4.3 Signup Card

Email capture form in a bordered card.

```
┌──────────────────────────────────────┐
│  JOIN THE WORKSHOP                   │
│  ─────────────────────               │
│  [email input        ] [Join free]   │
│  Italic note text                    │
└──────────────────────────────────────┘
```

- **Background**: `--surface`
- **Border**: 1px solid `--border`
- **Header**: uppercase label with border-bottom separator
- **Form**: horizontal flex (input + button), 0.5rem gap
- **Input**: `--bg` background, `--border` border, `--cream` text
- **Input focus**: `--gold` border + gold box-shadow glow
- **Button**: `--gold` background, `--bg` text, uppercase
- **Button hover**: `--gold-light` background
- **Note**: italic, `--muted` color, below form

### 4.4 Below-Fold / Reading List

Numbered list of content topics on elevated surface.

- **Section**: `--surface` background, top border
- **Label**: centered uppercase section label ("THE READING LIST")
- **Items**: stacked vertically, separated by `--border` top/bottom borders
- **Each item**: flex row with `1.5rem` gap
  - **Number**: Playfair italic numeral in `--gold` (roman: i., ii., iii.)
  - **Content**: h3 heading + description paragraph

### 4.5 Bottom CTA

Epigraph quote followed by a repeated signup form.

- **Epigraph**: Playfair italic, `--cream-muted`, centered
- **Attribution**: micro uppercase text, `--muted`
- **Form**: same signup-form pattern, input uses `--surface` background (not `--bg`)

### 4.6 Footer

Minimal footer with centered text and decorative diamond.

```
         The Cognitive Shift ◇ © 2026
```

- **Layout**: centered flex row with `1rem` gap
- **Text**: 0.6rem uppercase, `--muted`
- **Diamond**: 4×4px (smaller than topbar diamond), opacity 0.3
- **Border**: 1px solid `--border` on top

---

## 5. Motifs & Decorative Elements

### 5.1 Gold Rule

A 60px-wide horizontal gradient line used as a section divider.

```css
.gold-rule {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 2.5rem auto;
}
```

Used between hero body text and signup card. Fades from transparent → gold → transparent.

### 5.2 Diamonds

Small squares rotated 45 degrees, used as decorative punctuation.

| Location | Size | Opacity | Color |
|----------|------|---------|-------|
| Topbar | 6×6px | 0.6 | `--gold` |
| Footer | 4×4px | 0.3 | `--gold` |

```css
.topbar-diamond {
  width: 6px; height: 6px;
  background: var(--gold);
  transform: rotate(45deg);
  opacity: 0.6;
}
```

### 5.3 Uppercase Labels

A recurring text treatment for UI labels and section markers:

```css
/* Pattern: micro uppercase label */
font-size: 0.55rem–0.6rem;
font-weight: 500;
letter-spacing: 0.12em–0.22em;
text-transform: uppercase;
color: var(--gold) or var(--muted);
```

Instances:
- `.topbar-badge` — 0.55rem, 0.12em spacing, `--gold`
- `.hero-eyebrow` — 0.6rem, 0.2em spacing, `--gold`
- `.section-label` — 0.6rem, 0.22em spacing, `--muted`
- `.signup-card-header` — 0.6rem, 0.15em spacing, `--muted`
- `.signup-form button` — 0.7rem, 0.1em spacing, `--bg` (on gold)
- `.footer-text` — 0.6rem, 0.12em spacing, `--muted`
- `.bottom-attribution` — 0.65rem, 0.1em spacing, `--muted`

### 5.4 Hero Crest (SVG)

A 64×64px geometric emblem composed of:
- Outer diamond (rotated square) — stroke `#c8a45c`, 0.8 width, opacity 0.3
- Inner diamond — stroke `#c8a45c`, 0.8 width, opacity 0.5
- Circle — stroke `#c8a45c`, 1 width, r=6
- Center dot — filled `#c8a45c`, r=2, opacity 0.6
- Cross-hair lines — 4 lines radiating from center, stroke 0.5, opacity 0.3

### 5.5 Radial Vignette

Applied to hero `::before`:
```css
background: radial-gradient(ellipse at center, transparent 50%, rgba(16, 24, 18, 0.4) 100%);
```
Darkens edges to create depth focus on center content.

---

## 6. Responsive Breakpoints

Single breakpoint at **600px** (mobile).

```css
@media (max-width: 600px) {
  .topbar { padding: 0.75rem 1.25rem; }
  .hero { padding: 8rem 1.5rem 3rem; }
  .signup-form { flex-direction: column; }
}
```

### Changes at ≤600px

| Element | Desktop | Mobile |
|---------|---------|--------|
| `.topbar` padding | `0.9rem 2.5rem` | `0.75rem 1.25rem` |
| `.hero` padding | `10rem 2rem 5rem` | `8rem 1.5rem 3rem` |
| `.signup-form` layout | horizontal (row) | vertical (column) |

No other breakpoints are defined. The layout relies on:
- `clamp()` for fluid hero title sizing
- `max-width` constraints for content containers
- Natural content reflow for narrow viewports

---

## 7. Global Reset & Base Styles

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
```

No additional reset is used. All spacing is explicitly set per element.

---

## 8. Transitions

| Element | Property | Duration |
|---------|----------|----------|
| `.signup-form input` | border-color, box-shadow | 0.2s |
| `.signup-form button` | background | 0.2s |

All transitions use default easing (ease).

---

## 9. Z-Index Scale

| Layer | z-index |
|-------|---------|
| `.topbar` | 100 |
| `.hero-content` | 1 (relative, above ::before vignette) |
| `.hero::before` | auto (stacking context via position: absolute) |

---

## Quick Reference: Page Sections (top to bottom)

1. **Topbar** — fixed, frosted glass nav
2. **Hero** — full viewport, crest → eyebrow → title → body → gold-rule → signup-card
3. **Below-fold** — elevated surface, section label → reading list (3 items)
4. **Bottom CTA** — epigraph quote → attribution → signup form
5. **Footer** — minimal centered text with diamond separator
