---
layout: post
title: "CSS Grid Fundamentals: A Beginner’s Guide"
date: 2025-07-02 22:44
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

- **Grid Container**: The parent element where grid is applied.
- **Grid Item**: The children of the grid container.
- **Grid Line**: The lines dividing the grid tracks.
- **Grid Track**: The space between two grid lines (either row or column).
- **Grid Cell**: The intersection of a grid row and a grid column.

## CSS Grid Properties

Here are some of the most commonly used properties for defining a grid layout:

- **display: grid;** - Turns the container into a grid layout.
- **grid-template-columns** - Defines the number and size of columns.
- **grid-template-rows** - Defines the number and size of rows.
- **gap** - Specifies the space between rows and columns in the grid.
- **grid-column** - Defines how many columns an item will span.
- **grid-row** - Defines how many rows an item will span.

### Grid Layout Example

Here’s an example of a simple 3-column grid layout:

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 1rem; /* Space between columns and rows */
}
{% endhighlight %}
{% endcodeblock %}

This layout has 3 columns of equal width (`1fr` stands for 1 fraction of the available space), and there’s a gap of `1rem` between both rows and columns.

### Understanding `fr` (Fractional Units)

The `fr` unit is a flexible length unit that allows us to create responsive grids. It distributes available space in a grid container proportionally.
In the example above, `1fr` means each column will take up an equal share of the available space.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* First column takes 2/3 of the space, second takes 1/3 */
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

In the above code, the first column will take up 2 parts and the second will take 1 part out of a total of 3 fractions.
The total available space is divided into 3 parts, with the first column getting 2 parts and the second getting 1.

### Auto-fit and Auto-fill

These keywords make grids flexible without media queries.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

- `auto-fit`: Collapses empty tracks.
- `auto-fill`: Keeps empty tracks reserved.

This helps create responsive card grids.

### Grid Template Areas

Define layout using named areas. Helps visually map sections of a page.

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

#### Visual Representation

```pgsql
+-----------------------------+
|          header             |
|  (grid-area: "header")      |
+------------+----------------+
|   main     |    sidebar     |
|  (main)    |   (sidebar)    |
+------------+----------------+
|          footer             |
|         (footer)            |
+-----------------------------+
```

### Item Alignment

#### `justify-items`

Aligns items horizontally within their grid cell.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  justify-items: center;
}
{% endhighlight %}
{% endcodeblock %}

#### `align-items`

Aligns items vertically within their grid cell.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  align-items: center;
}
{% endhighlight %}
{% endcodeblock %}

#### `justify-self`

Aligns a specific grid item horizontally within its grid cell.

{% codeblock %}
{% highlight css linenos %}
.item {
  justify-self: end;
}
{% endhighlight %}
{% endcodeblock %}

#### `align-self`

Aligns a specific grid item vertically within its grid cell.

{% codeblock %}
{% highlight css linenos %}
.item {
  align-self: start;
}
{% endhighlight %}
{% endcodeblock %}

#### `place-items / place-self` (Shorthands)

These shorthand properties combine `justify-*` and `align-*`

{% codeblock %}
{% highlight css linenos %}
.grid {
  place-items: center; /* center both horizontally and vertically */
}

.item {
  place-self: end start; /* aligns end horizontally, start vertically */
}
{% endhighlight %}
{% endcodeblock %}

## Explicit vs Implicit Grids

In CSS Grid, it’s important to understand the difference between `explicit` and `implicit` grids.

### Explicit Grids

You create an explicit grid when you define rows or columns using properties like:

- `grid-template-columns`
- `grid-template-rows`

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 100px;
  gap: 1rem;
}
{% endhighlight %}
{% endcodeblock %}

{% codeblock %}
{% highlight html linenos %}
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div> <!-- Overflows -->
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
  grid-template-columns: 1fr 1fr; /* Only 2 columns defined */
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

You can style the **implicit tracks** using:

{% codeblock %}
{% highlight css linenos %}
.grid {
  grid-auto-rows: 100px;
  grid-auto-columns: 200px;
}
{% endhighlight %}
{% endcodeblock %}

## Responsive Design with CSS Grid

CSS Grid makes responsive design easier than ever. You can modify your grid layout based on screen size using media queries.

{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr; /* Stack columns */
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
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

| Property | Description |
| -------- | ----------- |
| grid-template-columns | Defines column structure |
| grid-template-rows | Defines row structure |
| gap | Space between items |
| grid-template-areas | Defines named areas for grid items |
| justify-items | Aligns grid items horizontally |
| align-items | Aligns grid items vertically |
| place-items | Shorthand for horizontal and vertical alignment |

## Conclusion

CSS Grid makes layout development more accessible and powerful. By understanding and utilizing its properties, you can create complex layouts with minimal code. Mastering CSS Grid will significantly improve your UI skills, especially when dealing with complex designs.

> Note: CSS Grid is supported in all modern browsers including Chrome, Firefox, Edge, and Safari. IE11 has partial support with older syntax.
