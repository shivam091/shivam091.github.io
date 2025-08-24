# frozen_string_literal: true

require "jekyll/utils"

require_relative "./../helpers/logger_helper"

module Jekyll
  class CategoryPage < Page
    def initialize(site, base, dir, category, posts)
      @site = site
      @base = base
      @dir  = dir
      @name = "index.html"

      category_slug = Jekyll::Utils.slugify(category, mode: "default", cased: false)

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "archive.html")
      self.data["category"] = category
      self.data["title"] = "Posts in category: #{category}"
      self.data["permalink"] = "/category/#{category_slug}"
      self.data["posts"] = posts
    end
  end

  class CategoryGenerator < Generator
    include LoggerHelper

    safe true
    priority :high

    def generate(site)
      info("▶ CategoryGenerator:", "Generating category pages")

      site.categories.each do |category, posts|
        site.pages << CategoryPage.new(site, site.source, "categories", category, posts)
      end
    end
  end
end
