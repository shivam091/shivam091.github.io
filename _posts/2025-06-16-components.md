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
