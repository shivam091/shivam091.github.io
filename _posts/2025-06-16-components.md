---
layout: post
title: "Components"
date: 2025-06-16 18:20
tags: [typography, design, styleguide]
categories: [blogging, components]
excerpt: This post is a comprehensive test of various components. It includes alerts, code blocks, buttons, and more.
---

## Codeblocks

{% codeblock %}
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
{% endcodeblock %}

## Alerts

### Default

{% alert %}
This is default alert.
{% endalert %}

### With icon, heading, and dismiss

{% alert type:"accent" dismissible:true %}
<h4 class="alert-heading">Information</h4>
This is just for your information.
{% endalert %}

{% alert type:"success" dismissible:true %}
<h4 class="alert-heading">Heads Up!</h4>
Your profile has been updated successfully.
{% endalert %}

{% alert type:"danger" dismissible:true %}
<h4 class="alert-heading">Error :(</h4>
Failed to save your changes. Please try again.
{% endalert %}

{% alert type:"attention" dismissible:true %}
<h4 class="alert-heading">Attention</h4>
This action requires confirmation.
{% endalert %}

### With icon, outline, and dismiss

{% alert type:"accent" dismissible:true outlined:true %}
An example outlined accent alert with an icon.
{% endalert %}

{% alert type:"success" dismissible:true outlined:true %}
An example outlined success alert with an icon.
{% endalert %}

{% alert type:"danger" dismissible:true outlined:true %}
An example outlined danger alert with an icon.
{% endalert %}

{% alert type:"attention" dismissible:true outlined:true %}
An example outlined attention alert with an icon.
{% endalert %}

### With links

{% alert type:"accent" %}
<h4 class="alert-heading">Information</h4>
This is an <a href="#">important notification</a> that requires your attention.
You can <a href="/settings">update your settings here</a>.
An example showing the <code class="language-plaintext highlighter-rouge">warning</code> type prompt.
{% endalert %}

### Markdown support

{% alert type:"danger" markdown:true %}
### Markdown enabled alert
{:.alert-heading}

This content is **processed** as _Markdown_.
{% endalert %}

## Icons

{% assign a = "Open folder" %}
{% icon folder-open class:"custom-class" size:20 label:"{{ a }}" id:"custom-id" %}

### Available icons

{% icon adjust %}
{% icon arrow-up %}
{% icon bulb %}
{% icon calendar %}
{% icon code %}
{% icon check %}
{% icon circle-fill %}
{% icon clock %}
{% icon copy %}
{% icon device-desktop %}
{% icon emoji-sad %}
{% icon envelope %}
{% icon exclamation-triangle %}
{% icon facebook %}
{% icon file %}
{% icon fold-down %}
{% icon fold-up %}
{% icon folder %}
{% icon folder-open %}
{% icon github %}
{% icon hash %}
{% icon history %}
{% icon home %}
{% icon info-circle %}
{% icon instagram %}
{% icon link %}
{% icon list %}
{% icon linkedin %}
{% icon moon %}
{% icon sun %}
{% icon tag %}
{% icon telegram %}
{% icon times %}
{% icon twitter %}
{% icon whatsapp %}
