# frozen_string_literal: true

require "jekyll/utils"

require_relative "./../helpers/logger_helper"

module Jekyll
  class TagPage < Page
    def initialize(site, base, dir, tag, posts)
      @site = site
      @base = base
      @dir  = dir
      @name = "index.html"

      tag_slug = Jekyll::Utils.slugify(tag, mode: "default", cased: false)

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "archive.html")
      self.data["tag"] = tag
      self.data["title"] = "Posts tagged with: #{tag}"
      self.data["permalink"] = "/tag/#{tag_slug}"
      self.data["posts"] = posts
    end
  end

  class TagGenerator < Generator
    include LoggerHelper

    safe true
    priority :high

    def generate(site)
      info("▶ TagGenerator:", "Generating tag pages")

      site.tags.each do |tag, posts|
        site.pages << TagPage.new(site, site.source, "tags", tag, posts)
      end
    end
  end
end
