---
layout: page
title: Tags
permalink: /tags
---

<div class="tags">
  {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
    <a href="{{ '/tag/' | append: tag[0] | slugify | prepend: site.baseurl }}/" class="tag">
      <span class="name">{{ tag[0] }}</span>
      <span class="count">{{ tag[1].size }}</span>
    </a>
  {% endfor %}
</div>
<ul class="tag-list">
  {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
    <li class="tag-item">
      <a href="{{ site.baseurl }}/tag/{{ tag[0] | slugify }}/" class="tag-link">
        <span class="tag-name">#{{ tag[0] }}</span>
        <span class="tag-count">{{ tag[1].size }}</span>
      </a>
    </li>
  {% endfor %}
</ul>
