---
layout: page
title: Tags
permalink: /tags
---

<ul class="tag-list">
  {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
  <li class="tag-item">
    <a href="/tag/{{ tag[0] | slugify | prepend: site.baseurl }}/" class="tag-link">
      <span class="tag-name">{{ tag[0] | prepend: "#"}}</span>
      <span class="tag-count">{{ tag[1].size }}</span>
    </a>
  </li>
  {% endfor %}
</ul>
