---
layout: post
title: "Unleashing CSS Logical Properties: Future-Proof Your Layouts"
date: 2025-08-10 18:28
description: "Learn how CSS Logical Properties help you build layouts that adapt seamlessly to different writing modes, including RTL and vertical text. Includes comparisons, fallbacks, and a visual cheat sheet."
excerpt: "Master CSS Logical Properties to create truly global, adaptable web layouts—no more messy RTL hacks or duplicate stylesheets."
tags: [css, web-development, layout, responsive, rtl, logical-properties, writing-modes, internationalization, i18n, frontend]
categories: [CSS]
slug: unleashing-css-logical-properties
---

## Introduction

> Designing for multiple languages shouldn’t mean rewriting your CSS for every direction or writing mode. CSS Logical Properties
> let your layouts adapt automatically to RTL, vertical text, and more — with just one set of styles.

In modern web design, layouts must seamlessly adapt to different languages and writing modes — **CSS Logical Properties** offer a future-proof way
to style elements that respect **writing direction**, **text flow**, and **orientation**.

Whether it’s **right-to-left (RTL)** languages like Arabic and Hebrew, or vertical writing in Japanese, logical properties let you create one
stylesheet that works everywhere.

Instead of tying layout to fixed physical directions (`left`, `right`, `top`, `bottom`), they use logical directions: **start**, **end**, **inline**, and **block**.

**Example:**

{% highlight css %}
/* Instead of */
padding-left: 1rem;

/* Use */
padding-inline-start: 1rem;
{% endhighlight %}

If the document switches to RTL, `padding-inline-start` automatically applies to the right — no extra styles needed.

## Why CSS Logical Properties Matter

Traditionally, CSS positioning and spacing relied on physical properties like `margin-left`, `padding-top`, and `width`. While effective, these are
tied to the visual layout and can’t adapt automatically when the writing mode or text direction changes.

**With physical properties:**

{% highlight css %}
/* Physical properties */
margin-left: 1rem; /* Always on the left side */
{% endhighlight %}

In an RTL layout, `margin-left` still applies to the left side — which may no longer be the “start” of the text.

**With logical properties:**

{% highlight css %}
/* Logical equivalent */
margin-inline-start: 1rem; /* Adapts to start side based on writing mode */
{% endhighlight %}

This ensures your layout is **writing-mode-aware**.

**Browser support:**

Logical properties are supported in all major browsers — Chrome, Edge, Firefox, and Safari — over the last 3 years, making them ready for production.

## Benefits of Logical Properties

1. **Internationalization Ready** – Works for RTL and vertical writing without needing separate stylesheets.
2. **Consistent Layouts** – Automatically adjusts for writing mode changes, keeping design predictable.
3. **Cleaner Code** – Reduces redundancy and removes the need for duplicated directional styles.
4. **Accessibility Friendly** – Plays nicely with screen readers in RTL and vertical text contexts.
5. **Performance Friendly** – Fewer overrides and media queries improve maintainability.
6. **Future-Proof** – Ready for expanded language and writing system support as browsers evolve.

## Understanding Inline vs Block Axes

**Inline axis** — the direction in which text flows.
**Block axis** — the direction perpendicular to the inline axis, where blocks (paragraphs, divs) stack.

**Key idea**: Logical properties use `inline` / `block` combined with `start` / `end`:
- `inline-start` – leading edge of the inline axis (left in LTR, right in RTL, top in some vertical modes).
- `inline-end` – trailing edge of the inline axis.
- `block-start` – leading edge of the block axis (top in horizontal writing).
- `block-end` – trailing edge of the block axis.

### horizontal-tb (LTR) (typical English)

```
+-----------------------------------------+
| inline-start                 inline-end |
|    (left)         ← inline →   (right)  |
| block-start (top)                       |
|                                         |
|        ↓                                |
|                                         |
| block-end (bottom)                      |
+-----------------------------------------+
```

### horizontal-tb (RTL) (Arabic, Hebrew)

```
+-----------------------------------------+
| inline-end                 inline-start |
|   (left)          ← inline →   (right)  |
| block-start (top)                       |
|                                         |
|        ↓                                |
|                                         |
| block-end (bottom)                      |
+-----------------------------------------+
```

> In RTL: inline axis flows **right** → **left**, so `inline-start` = right, `inline-end` = left.

### vertical-rl

```
+----------------+
| block-start  → |  (right)
| inline-start   |  (top)
|                |
|       ↓        |
|                |
| inline-end     |  (bottom)
| block-end    ← |  (left)
+----------------+
```

### vertical-lr

```
+----------------+
| block-start  ← |  (left)
| inline-start   |  (top)
|                |
|       ↓        |
|                |
| inline-end     |  (bottom)
| block-end    → |  (right)
+----------------+
```

### Quick Reference: Logical vs Physical Mappings

| Writing mode        | Inline axis  | Block axis   | inline-start | inline-end | block-start | block-end |
| ------------------- | ------------ | ------------ | ------------ | ---------- | ----------- | --------- |
| `horizontal-tb` LTR | left → right | top → bottom | left         | right      | top         | bottom    |
| `horizontal-tb` RTL | right → left | top → bottom | right        | left       | top         | bottom    |
| `vertical-rl`       | top → bottom | right → left | top          | bottom     | right       | left      |
| `vertical-lr`       | top → bottom | left → right | top          | bottom     | left        | right     |

**Visual key:**

```
horizontal-tb (LTR)         horizontal-tb (RTL)         vertical-rl               vertical-lr
------------------          ------------------          ------------------        ------------------
block-start = top           block-start = top           block-start = right       block-start = left
block-end   = bottom        block-end   = bottom        block-end   = left        block-end   = right
inline-start = left         inline-start = right        inline-start = top        inline-start = top
inline-end   = right        inline-end   = left         inline-end   = bottom     inline-end   = bottom
```

> Think of `inline-*` as “text flow direction” and `block-*` as “line stacking direction.”

### Short Examples

**Example 1 — Inline / Block sizing**

{% highlight css %}
.box {
  inline-size: 40ch;    /* horizontal-tb: width; vertical-rl/lr: height */
  block-size: 10rem;    /* horizontal-tb: height; vertical-rl/lr: width */
  padding-inline: 1rem; /* horizontal-tb: left & right; vertical: top & bottom */
  padding-block: 0.5rem;/* horizontal-tb: top & bottom; vertical: right & left */
}
{% endhighlight %}

**Example 2 — Direction-aware margins**

{% highlight css %}
.card {
  margin-inline-start: 1rem; /* horizontal LTR: left; horizontal RTL: right; vertical: top */
  margin-block-start: 2rem;  /* horizontal: top; vertical-rl: right; vertical-lr: left */
}
{% endhighlight %}

**Example 3 — Switching writing modes**

{% highlight css %}
/* Default: horizontal LTR */
.article {
  writing-mode: horizontal-tb;
  direction: ltr;
}

/* Vertical (e.g., Japanese-style) */
.vertical {
  writing-mode: vertical-rl;
  direction: rtl; /* common for certain East Asian vertical layouts */
}
{% endhighlight %}

## Categories of Logical Properties

Logical properties can be grouped into several categories:

### Dimension

| # | Logical Property      | Description                      | Physical LTR Equivalent | Physical RTL Equivalent |
| - | --------------------- | -------------------------------- | ----------------------- | ----------------------- |
| 1 | **`inline-size`**     | Logical width in the inline axis | `width`                 | `width`                 |
| 2 | **`block-size`**      | Logical height in the block axis | `height`                | `height`                |
| 3 | **`min-inline-size`** | Minimum width in the inline axis | `min-width`             | `min-width`             |
| 4 | **`max-inline-size`** | Maximum width in the inline axis | `max-width`             | `max-width`             |
| 5 | **`min-block-size`**  | Minimum height in the block axis | `min-height`            | `min-height`            |
| 6 | **`max-block-size`**  | Maximum height in the block axis | `max-height`            | `max-height`            |

### Margin

| # | Logical Property          | Description                                                      | Physical LTR Equivalent        | Physical RTL Equivalent        |
| - | ------------------------- | ---------------------------------------------------------------- | ------------------------------ | ------------------------------ |
| 1 | **`margin-inline-start`** | Margin at the start of the inline axis                           | `margin-left`                  | `margin-right`                 |
| 2 | **`margin-inline-end`**   | Margin at the end of the inline axis                             | `margin-right`                 | `margin-left`                  |
| 3 | **`margin-inline`**       | Shorthand for both `margin-inline-start` and `margin-inline-end` | `margin-left` + `margin-right` | `margin-right` + `margin-left` |
| 4 | **`margin-block-start`**  | Margin at the start of the block axis                            | `margin-top`                   | `margin-top`                   |
| 5 | **`margin-block-end`**    | Margin at the end of the block axis                              | `margin-bottom`                | `margin-bottom`                |
| 6 | **`margin-block`**        | Shorthand for both `margin-block-start` and `margin-block-end`   | `margin-top` + `margin-bottom` | `margin-top` + `margin-bottom` |

### Padding

| # | Logical Property           | Description                                                        | Physical LTR Equivalent          | Physical RTL Equivalent          |
| - | -------------------------- | ------------------------------------------------------------------ | -------------------------------- | -------------------------------- |
| 1 | **`padding-inline-start`** | Padding at the start of the inline axis                            | `padding-left`                   | `padding-right`                  |
| 2 | **`padding-inline-end`**   | Padding at the end of the inline axis                              | `padding-right`                  | `padding-left`                   |
| 3 | **`padding-inline`**       | Shorthand for both `padding-inline-start` and `padding-inline-end` | `padding-left` + `padding-right` | `padding-right` + `padding-left` |
| 4 | **`padding-block-start`**  | Padding at the start of the block axis                             | `padding-top`                    | `padding-top`                    |
| 5 | **`padding-block-end`**    | Padding at the end of the block axis                               | `padding-bottom`                 | `padding-bottom`                 |
| 6 | **`padding-block`**        | Shorthand for both `padding-block-start` and `padding-block-end`   | `padding-top` + `padding-bottom` | `padding-top` + `padding-bottom` |

### Borders

| #  | Logical Property                | Description                                                      | Physical LTR Equivalent        | Physical RTL Equivalent        |
| -- | ------------------------------- | ---------------------------------------------------------------- | ------------------------------ | ------------------------------ |
| 1  | **`border-inline-start`**       | Border at the start of the inline axis                           | `border-left`                  | `border-right`                 |
| 2  | **`border-inline-end`**         | Border at the end of the inline axis                             | `border-right`                 | `border-left`                  |
| 3  | **`border-inline`**             | Shorthand for both `border-inline-start` and `border-inline-end` | `border-left` + `border-right` | `border-right` + `border-left` |
| 4  | **`border-block-start`**        | Border at the start of the block axis                            | `border-top`                   | `border-top`                   |
| 5  | **`border-block-end`**          | Border at the end of the block axis                              | `border-bottom`                | `border-bottom`                |
| 6  | **`border-block`**              | Shorthand for both `border-block-start` and `border-block-end`   | `border-top` + `border-bottom` | `border-top` + `border-bottom` |
| 7  | **`border-inline-start-width`** | Width of the border at inline-start                              | `border-left-width`            | `border-right-width`           |
| 8  | **`border-inline-start-color`** | Color of the border at inline-start                              | `border-left-color`            | `border-right-color`           |
| 9  | **`border-inline-start-style`** | Style of the border at inline-start                              | `border-left-style`            | `border-right-style`           |
| 10 | **`border-inline-end-width`**   | Width of the border at inline-end                                | `border-right-width`           | `border-left-width`            |
| 11 | **`border-inline-end-color`**   | Color of the border at inline-end                                | `border-right-color`           | `border-left-color`            |
| 12 | **`border-inline-end-style`**   | Style of the border at inline-end                                | `border-right-style`           | `border-left-style`            |
| 13 | **`border-block-start-width`**  | Width of the border at block-start                               | `border-top-width`             | `border-top-width`             |
| 14 | **`border-block-start-color`**  | Color of the border at block-start                               | `border-top-color`             | `border-top-color`             |
| 15 | **`border-block-start-style`**  | Style of the border at block-start                               | `border-top-style`             | `border-top-style`             |
| 16 | **`border-block-end-width`**    | Width of the border at block-end                                 | `border-bottom-width`          | `border-bottom-width`          |
| 17 | **`border-block-end-color`**    | Color of the border at block-end                                 | `border-bottom-color`          | `border-bottom-color`          |
| 18 | **`border-block-end-style`**    | Style of the border at block-end                                 | `border-bottom-style`          | `border-bottom-style`          |

> Note — be aware that border shorthand logical equivalents (`border-inline`, `border-block`) are not supported in older Safari.

### Border Radius

| # | Logical Property                | Description                                                   | Physical LTR Equivalent      | Physical RTL Equivalent      |
| - | ------------------------------- | ------------------------------------------------------------- | ---------------------------- | ---------------------------- |
| 1 | **`border-start-start-radius`** | Radius for the corner where block-start and inline-start meet | `border-top-left-radius`     | `border-top-right-radius`    |
| 2 | **`border-start-end-radius`**   | Radius for the corner where block-start and inline-end meet   | `border-top-right-radius`    | `border-top-left-radius`     |
| 3 | **`border-end-start-radius`**   | Radius for the corner where block-end and inline-start meet   | `border-bottom-left-radius`  | `border-bottom-right-radius` |
| 4 | **`border-end-end-radius`**     | Radius for the corner where block-end and inline-end meet     | `border-bottom-right-radius` | `border-bottom-left-radius`  |

### Positioning / Offsets

| # | Logical Property         | Description                                                    | Physical LTR Equivalent             | Physical RTL Equivalent             |
| - | ------------------------ | -------------------------------------------------------------- | ----------------------------------- | ----------------------------------- |
| 1 | **`inset-inline-start`** | Offset from the inline-start edge                              | `left`                              | `right`                             |
| 2 | **`inset-inline-end`**   | Offset from the inline-end edge                                | `right`                             | `left`                              |
| 3 | **`inset-inline`**       | Shorthand for both `inset-inline-start` and `inset-inline-end` | `left` + `right`                    | `right` + `left`                    |
| 4 | **`inset-block-start`**  | Offset from the block-start edge                               | `top`                               | `top`                               |
| 5 | **`inset-block-end`**    | Offset from the block-end edge                                 | `bottom`                            | `bottom`                            |
| 6 | **`inset-block`**        | Shorthand for both `inset-block-start` and `inset-block-end`   | `top` + `bottom`                    | `top` + `bottom`                    |
| 7 | **`inset`**              | Shorthand for all four logical inset properties                | `top` + `right` + `bottom` + `left` | `top` + `left` + `bottom` + `right` |

> Note — `inset-*` and `block/inline-size` have less support in older mobile browsers and pre-Chromium Edge.

### Floats & Clears

| # | Logical Property / Value  | Description                                                                         | Physical LTR Equivalent | Physical RTL Equivalent |
| - | ------------------------- | ----------------------------------------------------------------------------------- | ----------------------- | ----------------------- |
| 1 | **`float: inline-start`** | Floats an element to the start side of the inline axis (like `float: left` in LTR). | `float: left`           | `float: right`          |
| 2 | **`float: inline-end`**   | Floats an element to the end side of the inline axis.                               | `float: right`          | `float: left`           |
| 3 | **`clear: inline-start`** | Prevents floating elements on the start side.                                       | `clear: left`           | `clear: right`          |
| 4 | **`clear: inline-end`**   | Prevents floating elements on the end side.                                         | `clear: right`          | `clear: left`           |

### Text Alignment

| # | Logical Property / Value | Description                                       | Physical LTR Equivalent | Physical RTL Equivalent |
| - | ------------------------ | ------------------------------------------------- | ----------------------- | ----------------------- |
| 1 | **`text-align: start`**  | Aligns text to the start side of the inline axis. | `text-align: left`      | `text-align: right`     |
| 2 | **`text-align: end`**    | Aligns text to the end side of the inline axis.   | `text-align: right`     | `text-align: left`      |

> Note: `text-align: start/end` is not supported in IE11, needs fallback.

### Tables

| # | Logical Property / Value         | Description                                   | Physical LTR Equivalent | Physical RTL Equivalent |
| - | -------------------------------- | --------------------------------------------- | ----------------------- | ----------------------- |
| 1 | **`caption-side: block-start`**  | Places table caption before table block axis. | `caption-side: top`     | `caption-side: top`     |
| 2 | **`caption-side: block-end`**    | Places table caption after table block axis.  | `caption-side: bottom`  | `caption-side: bottom`  |
| 3 | **`caption-side: inline-start`** | Places caption at inline start of table.      | `caption-side: left`    | `caption-side: right`   |
| 4 | **`caption-side: inline-end`**   | Places caption at inline end of table.        | `caption-side: right`   | `caption-side: left`    |

### Backgrounds

| # | Logical Property / Value         | Description                                           | Physical LTR Equivalent      | Physical RTL Equivalent      |
| - | -------------------------------- | ----------------------------------------------------- | ---------------------------- | ---------------------------- |
| 1 | **`background-position-inline`** | Background position along inline axis                 | `background-position-x`      | `background-position-x`      |
| 2 | **`background-position-block`**  | Background position along block axis                  | `background-position-y`      | `background-position-y`      |
| 3 | **`background-position: start`** | Places background image at inline start horizontally. | `background-position: left`  | `background-position: right` |
| 4 | **`background-position: end`**   | Places background image at inline end horizontally.   | `background-position: right` | `background-position: left`  |

### Scroll Margin

| # | Logical Property                 | Description                                        | Physical LTR Equivalent                      | Physical RTL Equivalent                      |
| - | -------------------------------- | -------------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| 1 | **`scroll-margin-inline-start`** | Scroll margin at inline start edge                 | `scroll-margin-left`                         | `scroll-margin-right`                        |
| 2 | **`scroll-margin-inline-end`**   | Scroll margin at inline end edge                   | `scroll-margin-right`                        | `scroll-margin-left`                         |
| 3 | **`scroll-margin-inline`**       | Shorthand for both `inline-start` and `inline-end` | `scroll-margin-left` + `scroll-margin-right` | `scroll-margin-right` + `scroll-margin-left` |
| 4 | **`scroll-margin-block-start`**  | Scroll margin at block start edge                  | `scroll-margin-top`                          | `scroll-margin-top`                          |
| 5 | **`scroll-margin-block-end`**    | Scroll margin at block end edge                    | `scroll-margin-bottom`                       | `scroll-margin-bottom`                       |
| 6 | **`scroll-margin-block`**        | Shorthand for both `block-start` and `block-end`   | `scroll-margin-top` + `scroll-margin-bottom` | `scroll-margin-top` + `scroll-margin-bottom` |

### Scroll Padding

| # | Logical Property                  | Description                                        | Physical LTR Equivalent                        | Physical RTL Equivalent                        |
| - | --------------------------------- | -------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| 1 | **`scroll-padding-inline-start`** | Scroll padding at inline start edge                | `scroll-padding-left`                          | `scroll-padding-right`                         |
| 2 | **`scroll-padding-inline-end`**   | Scroll padding at inline end edge                  | `scroll-padding-right`                         | `scroll-padding-left`                          |
| 3 | **`scroll-padding-inline`**       | Shorthand for both `inline-start` and `inline-end` | `scroll-padding-left` + `scroll-padding-right` | `scroll-padding-right` + `scroll-padding-left` |
| 4 | **`scroll-padding-block-start`**  | Scroll padding at block start edge                 | `scroll-padding-top`                           | `scroll-padding-top`                           |
| 5 | **`scroll-padding-block-end`**    | Scroll padding at block end edge                   | `scroll-padding-bottom`                        | `scroll-padding-bottom`                        |
| 6 | **`scroll-padding-block`**        | Shorthand for both `block-start` and `block-end`   | `scroll-padding-top` + `scroll-padding-bottom` | `scroll-padding-top` + `scroll-padding-bottom` |

### Resizing

| # | Logical Property / Value | Description                        | Physical LTR Equivalent | Physical RTL Equivalent |
| - | ------------------------ | ---------------------------------- | ----------------------- | ----------------------- |
| 1 | **`resize: block`**      | Allows resize in block axis only.  | `resize: vertical`      | `resize: vertical`      |
| 2 | **`resize: inline`**     | Allows resize in inline axis only. | `resize: horizontal`    | `resize: horizontal`    |

### Overscroll Behavior

| # | Logical Property                 | Description                        | Physical LTR Equivalent | Physical RTL Equivalent |
| - | -------------------------------- | ---------------------------------- | ----------------------- | ----------------------- |
| 1 | **`overscroll-behavior-inline`** | Overscroll behavior in inline axis | `overscroll-behavior-x` | `overscroll-behavior-x` |
| 2 | **`overscroll-behavior-block`**  | Overscroll behavior in block axis  | `overscroll-behavior-y` | `overscroll-behavior-y` |

### Transform Origin

| # | Logical Property / Value             | Description                                 | Physical LTR Equivalent    | Physical RTL Equivalent    |
| - | ------------------------------------ | ------------------------------------------- | -------------------------- | -------------------------- |
| 1 | **`transform-origin: inline-start`** | Sets transform origin at inline start side. | `transform-origin: left`   | `transform-origin: right`  |
| 2 | **`transform-origin: inline-end`**   | Sets transform origin at inline end side.   | `transform-origin: right`  | `transform-origin: left`   |
| 3 | **`transform-origin: block-start`**  | Sets transform origin at block start side.  | `transform-origin: top`    | `transform-origin: top`    |
| 4 | **`transform-origin: block-end`**    | Sets transform origin at block end side.    | `transform-origin: bottom` | `transform-origin: bottom` |

### Offset (Motion Path)

| # | Logical Property          | Description                             | Physical LTR Equivalent | Physical RTL Equivalent |
| - | ------------------------- | --------------------------------------- | ----------------------- | ----------------------- |
| 1 | **`offset-inline-start`** | Starting offset position in inline axis | `offset-left`           | `offset-right`          |
| 2 | **`offset-inline-end`**   | Ending offset position in inline axis   | `offset-right`          | `offset-left`           |
| 3 | **`offset-block-start`**  | Starting offset position in block axis  | `offset-top`            | `offset-top`            |
| 4 | **`offset-block-end`**    | Ending offset position in block axis    | `offset-bottom`         | `offset-bottom`         |

## Interactive Example

Now that we’ve seen the different categories of logical properties, let’s try a small live example to see them in action.

{% highlight html %}
<!-- Logical padding & margin example -->
<article class="card">
  <header class="card-header">
    <div class="avatar"></div>
    <div>
      <div class="title">Logical padding &amp; margin</div>
      <div class="meta">Uses <code>padding-inline</code> &amp; <code>margin-block</code></div>
    </div>
  </header>

  <div class="card-body">
    Logical properties adapt based on writing mode & direction.
  </div>
</article>
{% endhighlight %}

{% highlight css %}
.card {
  padding-block: 1rem;
  padding-inline: 1rem;
}
{% endhighlight %}

👉 [View Full Interactive Demo on CodePen](https://codepen.io/shivam091/pen/NPGavRO)

## Best Practices & Reminders

- **Fallbacks first** — For older browsers, write the physical property first, then override with the logical equivalent.
- **Be consistent** — Avoid mixing physical and logical for the same property unless intentionally layering fallbacks.
- **Test multiple flows** — Check both `horizontal-tb` and `vertical-rl` modes to catch axis-mapping quirks.
- **Prefer explicit props** — Use individual logical properties (`margin-inline-start`) over shorthands for better browser reach.
- **Switch direction** — Use `direction: rtl` for horizontal RTL layouts (Arabic, Hebrew).
- **Change flow** — Use `writing-mode` for vertical layouts; remember that `inline` and `block` axes swap roles.
- **Alignment shortcuts** — Use `text-align: start` / `end` for automatic LTR/RTL alignment.
- **Logical positioning** — Replace fixed sides (`top`, `right`, `bottom`, `left`) with `inset-block` / `inset-inline`.
- **Check compatibility** — Always verify on [MDN’s compatibility tables](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values#browser_compatibility) before relying on lesser-known logical props.

## Fallbacks for Non-Supporting Browsers

If you need to support older browsers that don’t recognize logical properties, you can define physical property fallbacks first, followed by
your logical properties. This ensures that browsers without logical property support (e.g., Internet Explorer) still display layouts correctly.

**Without Logical Properties (LTR & RTL handled separately):**

{% highlight css %}
/* LTR */
.card {
  margin-left: 1rem;
  padding-left: 1rem;
  text-align: left;
}

/* RTL */
html[dir="rtl"] .card {
  margin-right: 1rem;
  padding-right: 1rem;
  text-align: right;
}
{% endhighlight %}

**With Logical Properties (Single stylesheet):**

{% highlight css %}
.card {
  margin-inline-start: 1rem;
  padding-inline-start: 1rem;
  text-align: start;
}
{% endhighlight %}

**Hybrid Approach (Fallback + Logical):**

{% highlight css %}
.card {
  /* Physical property fallbacks */
  margin-left: 1rem;
  padding-left: 1rem;
  text-align: left;

  /* Logical properties override when supported */
  margin-inline-start: 1rem;
  padding-inline-start: 1rem;
  text-align: start;
}
{% endhighlight %}

**`@supports`-Based Approach (Clean separation)**

{% highlight css %}
/* Physical property fallbacks */
.card {
  margin-left: 1rem;
  padding-left: 1rem;
  text-align: left;
}

/* Apply logical properties only if supported */
@supports (margin-inline-start: 1rem) {
  .card {
    margin-inline-start: 1rem;
    padding-inline-start: 1rem;
    text-align: start;
  }
}
{% endhighlight %}

**Why use `@supports?`**
- Keeps fallback styles intact for older browsers without relying solely on cascade overrides.
- Ensures logical properties are parsed only when supported.
- Makes debugging easier by clearly separating legacy and modern styles.

## Conclusion

CSS Logical Properties are the future of responsive, internationalized web design. They eliminate the need for duplicate styles for different
writing directions, ensuring your layouts adapt naturally to any language or script.

By adopting them now, you’re creating layouts that are **direction-aware**, **international-ready**, and **easy to maintain**—without the extra headaches.
