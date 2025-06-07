---
layout: page
title: Browse by category
permalink: /categories
---

<section class="categories-wrapper" aria-label="Browse by category">
  {% assign sorted_categories = site.categories | sort %}
  {% for category in sorted_categories %}
    {% assign posts = category[1] %}
    {% assign count = posts | size %}
    <div class="category-list__item" data-category>
      <div class="category-list__header" id="toggle-{{ forloop.index }}">
        <div class="category-list__title-group">
          <a href="/category/{{ category[0] | slugify | prepend: site.baseurl }}/" class="category-list__title">
            {{ category[0] }}
          </a>
          <small class="category-list__count">{{ count }} post{% if count != 1 %}s{% endif %}</small>
        </div>

        <button type="button" class="btn category-list__toggle" aria-expanded="false" aria-controls="posts-{{ forloop.index }}" aria-label="Toggle posts in {{ category[0] }}"
          data-tooltip="Hold Ctrl (or Cmd) to keep others open" data-tooltip-position="left">
          <svg class="category-list__icon" aria-hidden="true">
            <use xlink:href="#icon-fold-down"></use>
          </svg>
        </button>
      </div>

      <ul id="posts-{{ forloop.index }}" class="category-list__posts" role="region" aria-labelledby="toggle-{{ forloop.index }}" hidden>
        {% for post in category[1] %}
          <li class="category-list__post">
            <a href="{{ post.url }}" class="category-list__post-title">{{ post.title }}</a>
            <span class="category-list__dash"></span>
            <small class="category-list__date">{{ post.date | date: "%B %d, %Y" }}</small>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</section>
