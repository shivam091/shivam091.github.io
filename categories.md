---
layout: page
title: Browse by Category
permalink: /categories
---

<ul>
  {% assign categories = site.categories %}
  {% for category in categories %}
    {% assign slug_parts = category[0] | split: '/' %}
    {% assign slug_path = slug_parts | join: '/' | slugify: 'pretty' %}
    <li>
      <strong>
        <a href="{{ '/category/' | append: slug_path | prepend: site.baseurl }}/">
          {{ category[0] }}
        </a>
      </strong>
      <ul>
        {% for post in category[1] %}
          <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
      </ul>
    </li>
  {% endfor %}
</ul>
<ul>
  {% assign categories = site.categories %}
  {% for category in categories %}
    {% assign parts = category[0] | split: '/' %}
    {% assign slug_parts = "" %}
    {% for part in parts %}
      {% assign slug_parts = slug_parts | append: "/" | append: part | slugify %}
    {% endfor %}

    <li>
      <a href="{{ site.baseurl }}/category/{{ slug_parts }}/">
        {{ category[0] }}
      </a>
    </li>
  {% endfor %}
</ul>



<section class="category-accordion">
  <h2>Browse by Category</h2>

  <details>
    <summary>Design (3)</summary>
    <ul>
      <li><a href="/blog/design-system">Creating a Design System</a></li>
      <li><a href="/blog/ui-principles">UI Principles for Beginners</a></li>
      <li><a href="/blog/colors">Color Theory Basics</a></li>
    </ul>
  </details>

  <details>
    <summary>Development (4)</summary>
    <ul>
      <li><a href="/blog/js-modules">Modern JavaScript Modules</a></li>
      <li><a href="/blog/jekyll-tips">Jekyll Tips & Tricks</a></li>
      <li><a href="/blog/scss-architecture">SCSS Architecture Guide</a></li>
      <li><a href="/blog/performance">Improving Web Performance</a></li>
    </ul>
  </details>

  <details>
    <summary>Freelancing (2)</summary>
    <ul>
      <li><a href="/blog/finding-clients">Finding Clients as a Freelancer</a></li>
      <li><a href="/blog/contracts">Writing Clear Contracts</a></li>
    </ul>
  </details>
</section>
