---
layout: post
title: "CSS Grid Fundamentals: A Beginner’s Guide"
date: 2025-07-04 22:43
tags: [css, grid, layout, responsive, web design, frontend]
categories: [css, beginner]
excerpt: "A beginner-friendly guide to CSS Grid covering all essential concepts and properties."
authors: [harshal]
slug: understanding-css-grid
cover_image:
  path: /assets/img/posts/css-grid-fundamentals/cover.png
  width: 1200
  height: 630
  alt: Visual layout of CSS Grid with header, main, sidebar, and footer areas
---

## Introduction

CSS Grid is one of the most powerful layout systems available in modern web development. In this article, we'll cover the fundamental concepts of CSS Grid and how it can be used to build responsive and flexible web layouts.

## Why CSS Grid?

CSS Grid allows you to create complex layouts using rows and columns with minimal code. Unlike Flexbox, which is one-dimensional and handles layout in either a row or a column at a time, Grid is two-dimensional—it can manage layout across both rows and columns simultaneously. This makes CSS Grid especially powerful for designing full-page layouts or components that require more intricate positioning.

## Basic Terminology

- **Grid Container:** The parent element on which `display: grid` or `display: inline-grid` is applied. It defines the grid context for its children.
- **Grid Item:** The direct child elements of the grid container. These are placed and aligned within the grid layout.
- **Grid Line:** The horizontal or vertical dividing lines that separate grid tracks. They're used for placing grid items.
- **Grid Track:** A row or column in the grid. It's the space between two adjacent grid lines.
- **Grid Cell:** The smallest unit of a grid layout — the space at the intersection of a single row and column.

## Building Layouts with CSS Grid

### Fundamental Properties

- **display: grid;** — Converts an element into a grid container, enabling grid-based layout for its direct children.
- **grid-template-columns** — Defines the number and width of columns in the grid. You can specify fixed sizes, percentages, or use flexible units
  like fr (fraction of available space).
- **grid-template-rows** — Defines the number and height of rows in the grid, using the same unit options as columns.
- **gap (or row-gap and column-gap)** — Sets the spacing between rows and columns of grid items. A shorthand that simplifies layout spacing.
- **grid-column / grid-row** — Specifies how many columns or rows an item should span, or where it should start and end within the grid.

### Grid Template Areas

The `grid-template-areas` property allows you to define your layout using named areas, making the grid structure more readable and easier to
maintain—especially for complex page layouts. It acts as a visual blueprint of your design and simplifies the placement of grid items.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: auto 1fr auto;
  padding: 1rem;
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

Each quoted line defines a row in the grid. The repeated area names indicate how many columns that area spans. You can then assign elements to these areas
using the `grid-area` property:

{% codeblock %}
{% highlight css linenos %}
.header {
  grid-area: header;
  background: #f8b400;
  padding: 1rem;
}

.main {
  grid-area: main;
  background: #4caf50;
  padding: 1rem;
}

.sidebar {
  grid-area: sidebar;
  background: #2196f3;
  padding: 1rem;
}

.footer {
  grid-area: footer;
  background: #9c27b0;
  padding: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

Here’s the HTML structure:

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main Content</main>
  <footer class="footer">Footer</footer>
</div>
{% endhighlight %}
{% endcodeblock %}

**Explaination:**

- The layout is visually defined using `grid-template-areas`, making it easier to understand and modify.
- The grid has **3 columns** and **3 rows**.
- Named areas like `"header"`, `"sidebar"`, `"main"`, and `"footer"` are assigned using `grid-area`, allowing semantic HTML elements to be positioned without relying on source order.
- The column layout uses `1fr 2fr 2fr`, giving the sidebar less space than the main content.
- This is a clean, semantic approach to building responsive page sections—no floats or nested containers needed.

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/JodQLgg)

### Column and Row Templates

CSS Grid gives you precise control over your layout's structure using the `grid-template-columns` and `grid-template-rows` properties.

- **grid-template-columns** — Defines the number and width of columns in the grid.
- **grid-template-rows** — Defines the number and height of rows.

Each value you specify represents the size of a single column or row, ordered left-to-right (for columns) or top-to-bottom (for rows). You can use:

- Flexible units like `fr` (fraction of available space),
- Fixed units like `px` or `em`,
- keywords like `auto`, which sizes based on content.

Here’s an example:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Three columns: middle column is twice as wide */
  grid-template-rows: 100px auto 50px; /* Three rows: fixed top & bottom, flexible middle */
  gap: 1rem;
}

.item {
  padding: 1rem;
  border: 1px solid #000
}
{% endhighlight %}
{% endcodeblock %}

Here’s the HTML structure:

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
</div>
{% endhighlight %}
{% endcodeblock %}

**Explaination:**

- The grid has three columns: the first and third are equal in width, while the middle column is twice as wide.

- The rows are defined as:
  + `100px` → a fixed-height top row
  + `auto` → a middle row that adjusts to content
  + `50px` → a fixed-height footer row

This layout gives you both **predictability** and **flexibility**, especially when paired with responsive design techniques.

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/raVEvMb)

### Aligning Grid Items

CSS Grid not only lets you organize content into rows and columns—it also gives you precise control over **how items are aligned within their grid cells**.

Alignment can be applied at two levels:

#### Container-Level Alignment

These properties are applied to the **grid container** and affect **all items** inside the grid:

- **justify-items** — Aligns items **horizontally** (inline axis) within each cell.
- **align-items** — Aligns items **vertically** (block axis) within each cell.
- **place-items** — A shorthand for combining both `align-items` and `justify-items`.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  justify-items: center; /* Horizontally center all grid items within their cells */
  align-items: center;   /* Vertically center all grid items within their cells */
}
{% endhighlight %}
{% endcodeblock %}

**Visual Reference (Centered Items)**

```
+-------------+-------------+-------------+
|             |             |             |
|     [ ]     |     [ ]     |     [ ]     |  ← centered in both directions
|             |             |             |
+-------------+-------------+-------------+
|             |             |             |
|     [ ]     |     [ ]     |     [ ]     |
|             |             |             |
+-------------+-------------+-------------+
```

You can also use `place-items` as a shorthand:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  place-items: end start; /* Aligns all grid items to the bottom (block-end) and left (inline-start) */
}
{% endhighlight %}
{% endcodeblock %}

**Visual Reference (Bottom-Left Aligned)**

```
+-------------+-------------+-------------+
|             |             |             |
|             |             |             |
| [ ]         | [ ]         | [ ]         |  ← bottom-left alignment
+-------------+-------------+-------------+
|             |             |             |
|             |             |             |
| [ ]         | [ ]         | [ ]         |
+-------------+-------------+-------------+
```

####  Item-Level Alignment

While container-level alignment applies to **all grid items, item-level alignment** lets you override alignment **per individual item**.
These properties are set directly on the grid items themselves:

- **justify-self** — Aligns an item **horizontally** (inline axis) within its grid cell.
- **align-self** — Aligns an item **vertically** (block axis) within its grid cell.
- **place-self** — A shorthand for combining `align-self` and `justify-self`.

{% codeblock %}
{% highlight css linenos %}
.item {
  justify-self: end; /* Aligns this item to the right (inline-end) of its cell */
  align-self: start; /* Aligns this item to the top (block-start) of its cell */
}
{% endhighlight %}
{% endcodeblock %}

**Visual Reference (Top-Right Alignment)**

```
+-------------+
|         [ ] |  ← aligned to top-right
|             |
|             |
+-------------+
```

You can also achieve the same alignment with `place-self`:

{% codeblock %}
{% highlight css linenos %}
.item {
  place-self: end start; /* Aligns this item to the bottom (block-end) and left (inline-start) */
}
{% endhighlight %}
{% endcodeblock %}

**Visual Reference (Bottom-Left Alignment)**

```
+-------------+
|             |
|             |
| [ ]         |  ← aligned to bottom-left
+-------------+
```

{% alert type:"accent" outlined:true markdown:true %}
**Pro Tip:** Even if you're using `place-items`, `align-items`, or `justify-items` on the grid container, you can still override alignment for
individual items using `place-self`, `align-self`, or `justify-self`.
{% endalert %}

👉 [Try these alignments on CodePen](https://codepen.io/shivam091/pen/bNdPMKj)

### Spanning Grid Items

CSS Grid allows items to span across multiple columns or rows using `grid-column` and `grid-row`. These properties let you define
where an item starts and ends in the grid layout.

{% codeblock %}
{% highlight css linenos %}
.item {
  grid-column: 1 / 3; /* Spans from column line 1 to 3 → covers columns 1 and 2 */
  grid-row: 2 / 4;    /* Spans from row line 2 to 4 → covers rows 2 and 3 */
}
{% endhighlight %}
{% endcodeblock %}

Imagine a 3×3 grid:

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div class="item">Spanning</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
{% endhighlight %}
{% endcodeblock %}

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-rows: repeat(3, 100px);   /* 3 equal rows */
  gap: 0.5rem;
}
{% endhighlight %}
{% endcodeblock %}

And you apply:

{% codeblock %}
{% highlight css linenos %}
.item {
  grid-column: 1 / 3; /* Spans from line 1 to 3, i.e., columns 1 and 2 */
  grid-row: 2 / 4;    /* Spans from line 2 to 4, i.e., rows 2 and 3 */
}
{% endhighlight %}
{% endcodeblock %}

**Visual Reference (Lines Shown)**

```
+------------+------------+------------+
|            |            |            |
|   Item 2   |   Item 3   |   Item 4   |
|            |            |            |
+------------+------------+------------+
|            |            |            |
|            |            |            |
|            |            |            |
+         Spanning        +------------+
|            |            |            |
|            |            |            |
|            |            |            |
+------------+------------+------------+
```

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/bNdPKwJ)

#### Shorthand vs Longhand

The `grid-column` and `grid-row` properties are shorthands for their respective **start** and **end** lines:

{% codeblock %}
{% highlight css linenos %}
.item {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
{% endhighlight %}
{% endcodeblock %}

This is functionally the same as:

{% codeblock %}
{% highlight css linenos %}
.item {
  grid-column-start: 2;
  grid-column-end: 4;

  grid-row-start: 1;
  grid-row-end: 3;
}
{% endhighlight %}
{% endcodeblock %}

#### Shorthand with `span`

Instead of specifying **start** and **end** lines manually, you can use the `span` keyword to make your code simpler and more flexible:

{% codeblock %}
{% highlight css linenos %}
.item {
  grid-column: span 2; /* Span 2 columns from auto-start */
  grid-row: span 2;    /* Span 2 rows from auto-start */
}
{% endhighlight %}
{% endcodeblock %}

This tells the grid item to span **2 columns and 2 rows** starting from its **auto-determined position** (i.e. where the browser places it in the flow).

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/raVEKzW)

##### When to Use It

Use `span` when:

- You **don’t need to control exact start/end line numbers**.
- You want the browser to determine the position automatically.
- You're working with **auto-placed items** in a dynamic or responsive layout.

### Grid Types

In CSS Grid, it's important to understand the two types of grids: **explicit** and **implicit**. These define how grid tracks (rows and columns)
are created—either by the developer or automatically by the browser.

#### Explicit Grids

An **explicit** grid is one that you define yourself using properties like `grid-template-columns` and `grid-template-rows`.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;   /* Two equal-width columns */
  grid-template-rows: 100px 100px;  /* Two fixed-height rows */
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
{% endhighlight %}
{% endcodeblock %}

In this case, you've explicitly created a **2×2 grid**, which gives you **4 cells**. Each of the 4 items is placed within this defined layout.

##### What Happens on Overflow?

If you add a 5th item:

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div> <!-- Doesn't fit in the defined 2×2 grid -->
</div>
{% endhighlight %}
{% endcodeblock %}

Since the defined grid only has 2 rows, the 5th item **overflows**—so the browser creates a **new row implicitly** to accommodate it.

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/jEPjpzL)

#### Implicit Grids

An **implicit grid** is automatically created by the browser when items exceed the boundaries of the explicit grid.

You only defined columns below, but didn't define rows:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Only columns defined */
}
{% endhighlight %}
{% endcodeblock %}

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
</div>
{% endhighlight %}
{% endcodeblock %}

Since only 2 columns are defined, the grid places 2 items per row, and implicitly **creates rows** as needed.

By default, the height of implicit rows is `auto`. You can control their size using `grid-auto-rows`:

{% codeblock %}
{% highlight css linenos %}
.grid {
  grid-auto-rows: 100px; /* Applies height to all implicit rows */
}
{% endhighlight %}
{% endcodeblock %}

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/bNdPjMq)

{% alert type:"accent" outlined:true markdown:true %}
**Note:** You rarely need to use `grid-auto-columns` unless your layout creates **implicit columns** (e.g., through manual placement or directional flow).
{% endalert %}

## Responsive Techniques with CSS Grid

Responsive design is where **CSS Grid truly shines**. You can build layouts that adapt seamlessly across screen sizes—with minimal effort
and often without needing media queries.

### Understanding `fr` (Fractional Units)

The `fr` unit stands for **fraction of available space**. It's a powerful tool for creating fluid, responsive layouts.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* First column takes 2/3, second takes 1/3 */
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

In this layout:

- The grid container's space is divided into **3 fractions**.
- The first column gets **2 parts**, the second column gets **1 part**.

#### Repeating Equal Columns

You can create equal-width columns easily with `repeat()` and `1fr`:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal columns */
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

This setup creates **3 columns of equal width**, with a `1rem` gap between both columns and rows. It’s clean and scalable.

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/LEVKBqw)

### Understanding `minmax()`

`minmax(min, max)` is a **CSS Grid function** that defines a track (row or column) with:

- A **minimum size** it can shrink to
- A **maximum size** it can grow to

It’s especially useful when building **responsive** layouts, because it allows a column or row to be flexible—but within limits.

**Syntax:**

`minmax(<min>, <max>)`

- **`<min>`** – the smallest the track can be (can be 0, 100px, min-content, etc.)
- **`<max>`** – the largest the track can be (can be 1fr, auto, max-content, etc.)

#### Real-World Use Case: Responsive Cards

{% codeblock %}
{% highlight css linenos %}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
{% endhighlight %}
{% endcodeblock %}

{% codeblock %}
{% highlight html linenos %}
<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>
{% endhighlight %}
{% endcodeblock %}

In this example, cards are laid out in rows on large screens and they stack neatly without overflow on small screens.

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/raVEZaP)

### Auto-fit vs Auto-fill

Want a grid that adapts to screen width _without media queries_? Use `auto-fit` or `auto-fill` along with `minmax()`:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

**What’s happening here?**

- `minmax(200px, 1fr)` ensures each column is at least `200px` wide but can grow to fill available space.
- `auto-fit` collapses empty tracks if there isn’t enough content.
- `auto-fill` reserves space for empty tracks, keeping the layout structure intact.

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/ogXrMmv)

**Clarification:**
- `auto-fit`: Shrinks or collapses unused columns when there's no content.
- `auto-fill`: Maintains the grid structure, even if columns are empty. Reserves space for empty columns.

### Responsive with Media Queries

Although CSS Grid handles many responsive scenarios on its own, media queries can still help for more precise control.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns on large screens */
  gap: 1rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr; /* Stacks items into a single column */
  }
}
{% endhighlight %}
{% endcodeblock %}

This layout shows:

- **3 columns** on desktop screens.
- A **single-column stacked layout** on tablets or phones (under 768px).

👉 [Try this on CodePen](https://codepen.io/shivam091/pen/yyNdqwj)

## Common CSS Grid Properties (Quick Reference)

Here's a concise summary of essential CSS Grid properties:

| Property              | Description                                                                      |
| --------------------- | -------------------------------------------------------------------------------- |
| grid-template-columns | Defines the number and width of columns in the grid                              |
| grid-template-rows    | Defines the number and height of rows in the grid                                |
| gap                   | Sets spacing between rows and columns (shorthand for `row-gap` and `column-gap`) |
| grid-template-areas   | Defines named areas for placing grid items visually                              |
| justify-items         | Aligns **all grid items** horizontally within their cells                        |
| align-items           | Aligns **all grid items** vertically within their cells                          |
| place-items           | Shorthand for setting both `align-items` and `justify-items`                     |
| justify-self          | Aligns an **individual item** horizontally                                       |
| align-self            | Aligns an **individual item** vertically                                         |
| place-self            | Shorthand for setting both `align-self` and `justify-self`                       |
| grid-auto-rows        | Defines row size for **implicitly created rows**                                 |
| grid-auto-columns     | Defines column size for **implicitly created columns**                           |
| grid-column           | Specifies how many columns an item spans or where it starts/ends                 |
| grid-row              | Specifies how many rows an item spans or where it starts/ends                    |

## Conclusion

CSS Grid gives you an incredibly powerful way to build layouts that are clean, responsive, and easy to maintain.

By mastering the **core concepts**—like tracks, lines, areas, alignment, and responsiveness—you unlock the full potential of modern layout design.

Whether you're building a simple card layout or a complex UI dashboard, CSS Grid can help you create adaptable, scalable structures with minimal code.
