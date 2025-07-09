# frozen_string_literal: true

module Jekyll
  class SeriesPage < Page
    def initialize(site, base, dir, series_id, meta, posts)
      @site = site
      @base = base
      @dir  = dir
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "series.html")

      self.data.merge!(
        "layout"      => "series",
        "title"       => meta["title"] || series_id,
        "series_id"   => series_id,
        "series_meta" => meta,
        "excerpt"     => meta["excerpt"],
        "description" => meta["description"] || "Posts from the “#{meta["title"] || series_id}” blog series.",
        "cover_image" => meta["cover_image"],
        "posts"       => posts,
        "permalink"   => "/series/#{series_id}"
      )
    end
  end

  class SeriesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      Jekyll.logger.info "▶ Series:", "Generating series pages..."

      series_data = site.data["series"] || {}
      all_posts   = site.posts.docs

      # Build a hash map of slug → post for fast lookups
      post_map = all_posts.each_with_object({}) do |post, map|
        slug = post.data["slug"]
        map[slug] = post if slug
      end

      series_data.each do |series_id, meta|
        slugs = meta["parts"] || []

        # Map slugs to posts efficiently
        posts = slugs.map { |slug| post_map[slug] }.compact

        if posts.empty?
          Jekyll.logger.warn "Series '#{series_id}' has no matching posts"
          next
        end

        dir = File.join("series", series_id)
        site.pages << SeriesPage.new(site, site.source, dir, series_id, meta, posts)
      end
    end
  end
end
