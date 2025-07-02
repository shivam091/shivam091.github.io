---
layout: post
title: "Understanding CSS Grid: A Complete Guide"
date: 2025-06-07 18:40
tags: [css, grid]
categories: [css]
excerpt: "CSS Grid is one of the most powerful tools for building web layouts."
authors: [harshal]
---

## Introduction

CSS Grid is one of the most powerful tools for building web layouts. In this article, we'll explore all the fundamentals, from basic to advanced usage.

## Why CSS grid?

Grid allows you to design complex layouts using rows and columns with minimal code. Unlike flexbox, which is one-dimensional, grid is two-dimensional. This makes CSS Grid extremely powerful for both horizontal and vertical layout management.

## Basic terminology

- **Grid Container**: The parent element where grid is applied.
- **Grid Item**: The children of the grid container.
- **Grid Line**: The lines dividing the grid tracks.
- **Grid Track**: The space between two grid lines (either row or column).
- **Grid Cell**: The intersection of a grid row and a grid column.

## CSS grid properties

Here are some of the most commonly used properties for defining a grid layout:

- **display: grid;** - Turns the container into a grid layout.
- **grid-template-columns** - Defines the number and size of columns.
- **grid-template-rows** - Defines the number and size of rows.
- **gap** - Specifies the space between rows and columns in the grid.
- **grid-column** - Defines how many columns an item will span.
- **grid-row** - Defines how many rows an item will span.

### Grid layout example

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

In the above code, the first column will take up 2 fractions of the available space, and the second will take 1 fraction.
The total available space is divided into 3 parts, with the first column getting 2 parts and the second getting 1.

### Other useful properties

**grid-template-areas** - Defines a grid using named areas. This can make positioning easier.
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

**justify-items** - Aligns items horizontally within their grid cell.
{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  justify-items: center; /* Centers grid items horizontally */
}
{% endhighlight %}
{% endcodeblock %}

**align-items** - Aligns items vertically within their grid cell.
{% codeblock %}
{% highlight css linenos %}
.grid {
  display: grid;
  align-items: center; /* Centers grid items vertically */
}
{% endhighlight %}
{% endcodeblock %}

**justify-self** - Aligns a specific grid item horizontally within its grid cell.
{% codeblock %}
{% highlight css linenos %}
.item {
  justify-self: end; /* Aligns this specific item to the right */
}
{% endhighlight %}
{% endcodeblock %}

**align-self** - Aligns a specific grid item vertically within its grid cell.
{% codeblock %}
{% highlight css linenos %}
.item {
  align-self: start; /* Aligns this specific item to the top */
}
{% endhighlight %}
{% endcodeblock %}

### Responsive design with CSS grid

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
    grid-template-columns: 1fr; /* Stack columns on small screens */
  }
}
{% endhighlight %}
{% endcodeblock %}

In this example, the grid has 3 columns on larger screens, but on screens smaller than `768px`, the grid switches to 1 column.

## Common CSS grid properties

Here’s a simple table summarizing key grid properties:

| Property | Description |
| -------- | ----------- |
| grid-template-columns | Defines column structure |
| grid-template-rows | Defines row structure |
| gap | Space between items |
| grid-template-areas | Defines named areas for grid items |
| justify-items | Aligns grid items horizontally |
| align-items | Aligns grid items vertically |

## Conclusion

CSS Grid makes layout development more accessible and powerful. By understanding and utilizing its properties, you can create complex layouts with minimal code. Mastering CSS Grid will significantly improve your UI skills, especially when dealing with complex designs.
