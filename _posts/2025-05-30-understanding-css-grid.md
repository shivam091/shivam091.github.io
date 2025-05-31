---
layout: post
title: "Understanding CSS Grid: A Complete Guide"
date: 2025-05-30 01:00
tags: [CSS, Grid]
categories: [CSS]
excerpt: "CSS Grid is one of the most powerful tools for building web layouts."
---

Welcome to my blog! This is the **first post** in the `general` category. Here's what you'll find below:

## Table of Contents

1. [Introduction](#introduction)
2. [Types of Recommendation Systems](#Types-of-Recommendation-Systems)
    1. [Collaborative Filtering](#collaborative-filtering)
    2. [Content-Based Filtering](#content-based-filtering)
    3. [Hybrid Systems](#hybrid-systems)
3. [Impacts of Recommendation Systems](#impacts-of-Recommendation-Systems)
    1. [E-commerce](#e-commerce)
    2. [Entertainment](#entertainment)
    3. [News and Media](#news-and-media)
4. [Challenges and Future Directions](#challenges-and-Future-Directions)
5. [Conclusion](#conclusion)

## Introduction

This blog will cover topics in **software development**, side projects, and coding tips. I’ll also share insights on freelancing and tech tools I love.

> “Simplicity is the soul of efficiency.” – Austin Freeman

### Getting Started

If you're new here, check out the [About](/about) page to learn more about me and what this blog is about.

### Example: HTML Snippet

Here's a basic HTML example:

```html
<section>
  <h2>Welcome!</h2>
  <p>This is a simple HTML block inside a blog post.</p>
</section>
```

### Example: Ruby Snippet

Here's a basic Ruby example:

{% highlight ruby %}
# Gemfile
gem 'httparty'

# app/services/weather_api.rb
require 'httparty'

class WeatherApi
  API_KEY = 'your_api_key'
  BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

  def fetch_weather(city)
    url = "#{BASE_URL}?q=#{city}&appid=#{API_KEY}&units=metric"
    response = HTTParty.get(url)
    raise "API Error: #{response.code}" unless response.success?
    response.parsed_body
  end
end


# app/controllers/weather_controller.rb
def show
  city = params[:city]
  weather_data = WeatherApi.new.fetch_weather(city)
  @temperature = weather_data['main']['temp']
end
{% endhighlight %}


<h1>Understanding CSS Grid: A Complete Guide</h1>
  <p><strong>Published:</strong> <time datetime="2025-05-28">May 28, 2025</time> | <strong>Tags:</strong> <a href="#">CSS</a>, <a href="#">Grid</a></p>

  <p>CSS Grid is one of the most powerful tools for building web layouts. In this article, we'll explore all the fundamentals, from basic to advanced usage.</p>

  <h2>Why CSS Grid?</h2>
  <p>Grid allows you to design complex layouts using rows and columns with minimal code. Unlike flexbox, which is one-dimensional, grid is two-dimensional.</p>

  <h3>Basic Terminology</h3>
  <ul>
    <li><strong>Grid Container</strong>: The parent element where grid is applied.</li>
    <li><strong>Grid Item</strong>: The children of the grid container.</li>
    <li><strong>Grid Line</strong>: The lines dividing the grid tracks.</li>
  </ul>

  <h3>Sample Grid Code</h3>
  <pre><code>  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }</code></pre>

  <h4>Inline Code Example</h4>
  <p>You can use <code>display: grid;</code> to turn a container into a grid.</p>

  <blockquote>
    "The future of layout on the web is Grid, and it's already here." – A Web Developer
  </blockquote>

  <h3>Tables in Blog</h3>
  <table>
    <thead>
      <tr><th>Property</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>grid-template-columns</td><td>Defines column structure</td></tr>
      <tr><td>gap</td><td>Spacing between items</td></tr>
    </tbody>
  </table>

  <h3>Conclusion</h3>
  <p>CSS Grid makes layout development more accessible and powerful. Mastering it will significantly improve your UI skills.</p>
  <hr>
  <p><em>Written by Harshal Ladhe</em></p>
