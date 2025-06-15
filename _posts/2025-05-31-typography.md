---
layout: post
title: "Text and Typography"
date: 2025-05-31 01:00
tags: [typography, design, styleguide]
categories: [blogging, typography]
excerpt: This post is a comprehensive test of various HTML elements. It includes headings, paragraphs, lists, tables, forms, code, and more.
---

## Headings

# H1 Heading (usually reserved for post title)
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Paragraphs

Lorem ipsum dolor sit amet, **consectetur** adipiscing elit. Nulla *vehicula*, `inline code`, [external link](https://example.com), and a line break:<br>
New line here.

## Blockquote

> “Design is not just what it looks like and feels like. Design is how it works.”  
> — *Steve Jobs*

## Links

[External Link](https://example.com)  
[Internal Link](/about/)  
Mailto: [Send Email](mailto:test@example.com)

## Lists

### Unordered List

- Apples
- Oranges
  - Navel
  - Blood
- Bananas

### Ordered List

1. First item
2. Second item
   1. Nested
   2. Nested again
3. Third item

### Description Lists

<dl>
  <dt>HTML</dt>
  <dd>Hypertext Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>

## Inline Elements

**bold text**,
*italic text*,
`code`,
~~strikethrough~~,
<u>underlined</u>,
<small>small text</small>
<mark>highlighted</mark> text.
<abbr title="attribute">attr</abbr>

## Code Blocks

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

Inline `console.log("Hi")` inside text.

{% capture code %}
{% highlight ruby linenos %}
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
{% endcapture %}
{% include codeblock.html content = code %}

## Details / Summary

<details>
  <summary>Click to expand</summary>
  <p>This is hidden content revealed with HTML <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags.</p>
</details>

## Figures and Images

### Image with Caption

<figure>
  <img src="https://via.placeholder.com/600x200" alt="Example Image">
  <figcaption>This is a caption below the image.</figcaption>
</figure>

### Simple Image

![Alt text](https://via.placeholder.com/400x200)

## Task List

- [x] Create base layout
- [x] Add dark mode
- [ ] Finalize footer

## Tables

| Feature     | Supported | Notes              |
|------------:|:---------:|:-------------------|
| Tables      | ✅        | Markdown & HTML    |
| GFM         | ✅        | Supported on GitHub|
| Footnotes   | ✅        | In Markdown config |

## Footnotes

This sentence has a footnote.[^1]

This sentence has an another footnote.[^2]

[^1]: This is the footnote content.
[^2]: This is the another footnote content.

## Misc elements

**Abbreviation:**  
The abbreviation for HyperText Markup Language is <abbr title="HyperText Markup Language">HTML</abbr>.

**Keyboard Input:**  
To save, press <kbd>Ctrl</kbd> + <kbd>S</kbd>.

**Subscript/Superscript:**  
H<sub>2</sub>O and E = mc<sup>2</sup>

**Time Tag:**  
<time datetime="2025-05-31">May 31, 2025</time>
