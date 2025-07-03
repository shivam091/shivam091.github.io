---
layout: post
title: "CSS Grid Fundamentals: A Beginner’s Guide"
date: 2025-07-03 18:44
tags: [css, grid, layout, responsive, web design, frontend]
categories: [css, beginner]
excerpt: "A beginner-friendly guide to CSS Grid covering all essential concepts and properties."
authors: [harshal]
---

## Introduction

CSS Grid is one of the most powerful tools for building web layouts. In this article, we'll explore all the fundamentals of the grid layouts.

## Why CSS Grid?

Grid allows you to design complex layouts using rows and columns with minimal code. Unlike flexbox, which is one-dimensional, grid is two-dimensional. This makes CSS Grid extremely powerful for both horizontal and vertical layout management.

## Basic Terminology

- **Grid Container:** The parent element where grid is applied.
- **Grid Item:** The children of the grid container.
- **Grid Line:** The lines dividing the grid tracks.
- **Grid Track:** The space between two grid lines (either row or column).
- **Grid Cell:** The intersection of a grid row and a grid column.

## Building Layouts with CSS Grid

### Fundamental Properties

- **display: grid;** — Turns the container into a grid layout.
- **grid-template-columns** — Defines the number and size of columns.
- **grid-template-rows** — Defines the number and size of rows.
- **gap** — Specifies the space between rows and columns in the grid.
- **grid-column / grid-row** — Defines how many rows or columns an item will span.

### Grid Template Areas

Define a grid using named areas. This helps visually map sections of a page and makes positioning easier.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "main main sidebar"
    "footer footer footer";
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

**ASCII Illustration**

```pgsql
+---------------------------------------------+
|                   [header]                  |
+--------------------------+------------------+
|           [main]         |   [sidebar]      |
+--------------------------+------------------+
|                   [footer]                  |
+---------------------------------------------+
```

### Column and Row Templates

CSS Grid gives you fine-grained control over the structure and sizing of your layout using `grid-template-columns` and `grid-template-rows`.

- **grid-template-columns** — defines the number and width of columns.
- **grid-template-rows** — defines the number and height of rows.

Each value corresponds to one column or row, and you can use flexible units like `fr`, fixed units like `px`, or even keywords like `auto`.

Here’s an example:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Three columns: middle is twice as wide */
  grid-template-rows: 100px auto 50px; /* Three rows: header, content, footer */
}
{% endhighlight %}
{% endcodeblock %}

In this example, the first and third columns take up equal space (`1fr`), and the middle column takes up twice that space (`2fr`). The first row is 100px tall
(e.g., a header), the second row grows to fit content (`auto`), and the third row is 50px tall (e.g., a footer).

This lets you design layouts that are both predictable and flexible, especially when combined with responsive techniques.

### Aligning Grid Items

Grid layout not only lets you structure content into rows and columns—it also gives you precise control over how items are aligned within those grid cells. There are two levels at which you can apply alignment:

#### Container-level Alignment

Container-level alignment affects all grid items inside the grid. You apply these properties directly to the grid container:

- **justify-items** — aligns items horizontally within their grid cell.
- **align-items** — aligns items vertically within their grid cell.
- **place-items** — aligns items along both the block and inline directions at once. a shorthand for combining both align-items and justify-items.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  justify-items: center; /* Centers all grid items horizontally within their cells */
  align-items: center; /* Centers all grid items vertically within their cells */
}
{% endhighlight %}
{% endcodeblock %}

**ASCII Illustration**

```pgsql
+-------------+-------------+-------------+
|             |             |             |
|     [ ]     |     [ ]     |     [ ]     |
|             |             |             |
+-------------+-------------+-------------+
|             |             |             |
|     [ ]     |     [ ]     |     [ ]     |
|             |             |             |
+-------------+-------------+-------------+
```

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  place-items: end start; /* Aligns all grid items to the bottom (block-end) and left (inline-start) */
}
{% endhighlight %}
{% endcodeblock %}

**ASCII Illustration**

```pgsql
+-------------+-------------+-------------+
|             |             |             |
|             |             |             |
| [ ]         | [ ]         | [ ]         |  ← items in bottom-left
+-------------+-------------+-------------+
|             |             |             |
|             |             |             |
| [ ]         | [ ]         | [ ]         |
+-------------+-------------+-------------+
```

#### Item-level Alignment

Item-level alignment lets you override the container's alignment per item. These properties are set on individual grid items:

- **justify-self** — aligns an individual item horizontally within its grid cell.
- **align-self** — aligns an individual item vertically within its grid cell.
- **place-self** — aligns an individual item in both the block and inline directions at once. a shorthand for both align-self and justify-self.

{% codeblock %}
{% highlight css linenos %}
.item {
  justify-self: end; /* Aligns this item to the right (inline-end) of its cell */
  align-self: start; /* Aligns this item to the top (block-start) of its cell */
}
{% endhighlight %}
{% endcodeblock %}

**ASCII Illustration**

```pgsql
+-------------+
|         [ ] |  ← top-right (start row, end column)
|             |
|             |
+-------------+
```

{% codeblock %}
{% highlight css linenos %}
.item {
  place-self: end start; /* Aligns this item to the bottom (block-end) and left (inline-start) */
}
{% endhighlight %}
{% endcodeblock %}

**ASCII Illustration**

```pgsql
+-------------+
|             |
|             |
| [ ]         |  ← bottom-left (end row, start column)
+-------------+
```

## Grid Types

In CSS Grid, it’s important to understand the difference between `explicit` and `implicit` grids.

### Explicit Grids

You create an explicit grid when you define rows or columns using properties like:

- `grid-template-columns`
- `grid-template-rows`

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Two equal-width columns */
  grid-template-rows: 100px 100px; /* Two fixed-height rows */
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div> <!-- Overflows: falls into an implicitly created row -->
</div>
{% endhighlight %}
{% endcodeblock %}

In this example, we’ve defined a grid with **2 columns and 2 rows**, but **3 items** are placed. So the 3rd item **falls into the implicit grid**.

### Implicit Grids

The **implicit grid** is created automatically when content exceeds the explicitly defined tracks.

CSS Grid will automatically create **extra rows or columns** to fit the overflow items.

If we use the same CSS as above:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Only two columns defined */
}
{% endhighlight %}
{% endcodeblock %}

But add **5 items**, Grid auto-creates new rows:

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

More than four items will exceed the 2×2 grid and cause new rows to be automatically created (implicitly).

You can style the **implicit tracks** using:

{% codeblock %}
{% highlight css linenos %}
.grid {
  grid-auto-rows: 100px; /* Sets height for implicit rows */
  grid-auto-columns: 200px; /* Sets width for implicit columns (if needed) */
}
{% endhighlight %}
{% endcodeblock %}

## Responsive Techniques

### Understanding `fr` (Fractional Units)

The `fr` unit is a flexible length unit that allows us to create responsive grids. It distributes available space in a grid container proportionally.
In the example above, `1fr` means each column will take up an equal share of the available space.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Two columns: first takes 2/3, second takes 1/3 */
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

In this layout, the first column will take up 2 parts and the second will take 1 part out of a total of 3 fractions.
that is, the total available space is divided into 3 parts, with the first column getting 2 parts and the second getting 1.

Here’s an another example of a simple 3-column grid layout:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal-width columns */
  gap: 1rem; /* Spacing between rows and columns */
}
{% endhighlight %}
{% endcodeblock %}

This layout has 3 columns of equal width (`1fr` stands for 1 fraction of the available space), and there’s a gap of `1rem` between both rows and columns.

### Auto-fit and Auto-fill

These keywords make grids flexible without media queries.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive grid layout */
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

**Clarification:**
- `auto-fit`: Collapses empty grid columns if there’s not enough content.
- `auto-fill`: Reserves space for empty columns, keeping the structure.

### Responsive Media Queries

CSS Grid makes responsive design easier than ever. You can modify your grid layout based on screen size using media queries.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal columns on large screens */
  gap: 1rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr; /* Stack items in one column on smaller screens */
  }
}
{% endhighlight %}
{% endcodeblock %}

In this example, the grid has 3 columns on larger screens, but on screens smaller than `768px`, the grid switches to 1 column.

## Real-World Layout Example

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
{% endhighlight %}
{% endcodeblock %}

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive columns */
  gap: 1rem; /* Space between cards */
}

.card {
  background: #eee;
  padding: 1rem;
  border-radius: 0.5rem;
}
{% endhighlight %}
{% endcodeblock %}

## Common CSS Grid Properties (Quick Reference)

Here’s a simple table summarizing key grid properties:

| Property              | Description                                     |
| --------------------- | ----------------------------------------------- |
| grid-template-columns | Defines column structure                        |
| grid-template-rows    | Defines row structure                           |
| gap                   | Space between items                             |
| grid-template-areas   | Defines named areas for grid items              |
| justify-items         | Aligns items horizontally                       |
| align-items           | Aligns items vertically                         |
| place-items           | Shorthand for horizontal and vertical alignment |
| grid-auto-rows        | Defines row size for implicit rows              |
| grid-auto-columns     | Defines column size for implicit columns        |
| grid-column           | Defines how many columns an item will span.     |
| grid-row              | Defines how many rows an item will span.        |

## Conclusion

CSS Grid makes layout development more accessible and powerful. By understanding and using its core properties, you can create flexible, maintainable layouts with minimal effort.
