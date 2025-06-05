---
layout: page
title: All Blog Posts
permalink: /posts
---
<section style="max-width: 800px; margin: 2rem auto; padding: 1rem;">
  <ul style="list-style: none; padding: 0; display: grid; gap: 1.5rem;">
    {% for post in site.posts %}
      <li style="padding: 1.5rem; background: white; border-radius: 0.5rem; border: 1px solid #ddd;">
        <h2 style="margin: 0 0 0.5rem;">
          <a href="{{ post.url | relative_url }}" style="text-decoration: none; color: #222;">{{ post.title }}</a>
        </h2>
        {% if post.excerpt %}
          <p style="margin: 0; color: #555;">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
        {% endif %}
        <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #999; display: flex; align-items: center; gap: 0.5rem;">
          <div style="display: inline-flex; align-items: center; gap: 0.25rem;">
            <svg><use xlink:href="#icon-calendar"></use></svg>
            {{ post.date | date: "%B %d, %Y" }}
          </div>
          {% if post.tags %}
            <div style="display: inline-flex; align-items: center; gap: 0.25rem;">
              <svg><use xlink:href="#icon-tag"></use></svg>
              {% for tag in post.tags %}
                <a href="/tags/#{{ tag | slugify }}">{{ tag }}</a>{% unless forloop.last %}, {% endunless %}
              {% endfor %}
            </div>
          {% endif %}
          {% if post.categories %}
            <div style="display: inline-flex; align-items: center; gap: 0.25rem;">
              <svg><use xlink:href="#icon-folder"></use></svg>
              {% for category in post.categories %}
                <a href="{{ '/categories/' | append: category | downcase | relative_url }}">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </li>
    {% endfor %}
  </ul>
</section>
