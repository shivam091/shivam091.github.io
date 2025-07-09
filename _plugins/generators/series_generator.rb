# frozen_string_literal: true

module Jekyll
  class SeriesPage < Page
    def initialize(site, base, dir, series_id, meta, posts, index, total)
      @site = site
      @base = base
      @dir  = dir
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "series.html")

      self.data.merge!(
        "layout"        => "series",
        "title"         => meta["title"] || series_id,
        "series_id"     => series_id,
        "series_meta"   => meta,
        "excerpt"       => meta["excerpt"],
        "description"   => meta["description"] || "Posts from the “#{meta["title"] || series_id}” blog series.",
        "cover_image"   => meta["cover_image"],
        "posts"         => posts,
        "series_index"  => index + 1,
        "series_total"  => total,
        "permalink"     => "/series/#{series_id}"
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

      post_map = all_posts.each_with_object({}) do |post, map|
        slug = post.data["slug"]
        map[slug] = post if slug
      end

      # Sort series by custom `order`, then title fallback
      sorted_series = series_data.sort_by do |id, meta|
        [meta["order"] || 9999, meta["title"].to_s.downcase]
      end

      total_series = sorted_series.size

      sorted_series.each_with_index do |(series_id, meta), index|
        slugs = meta["parts"] || []
        posts = slugs.map { |slug| post_map[slug] }.compact

        if posts.empty?
          Jekyll.logger.warn "Series '#{series_id}' has no matching posts"
          next
        end

        # Add previous/next and meta info to posts
        posts.each_with_index do |post, i|
          post.data["previous_in_series"] = posts[i - 1] if i > 0
          post.data["next_in_series"]     = posts[i + 1] if i < posts.length - 1
          post.data["series"]             = {
            "id"         => series_id,
            "meta"       => meta,
            "index"      => i + 1,
            "total"      => posts.length,
            "page_url"   => "/series/#{series_id}"
          }
        end

        dir = File.join("series", series_id)
        page = SeriesPage.new(site, site.source, dir, series_id, meta, posts, index, total_series)

        # Add previous/next series navigation
        if index > 0
          prev_id, prev_meta = sorted_series[index - 1]
          page.data["previous_series"] = {
            "url"   => "/series/#{prev_id}",
            "title" => prev_meta["title"] || prev_id
          }
        end

        if index < total_series - 1
          next_id, next_meta = sorted_series[index + 1]
          page.data["next_series"] = {
            "url"   => "/series/#{next_id}",
            "title" => next_meta["title"] || next_id
          }
        end

        site.pages << page
      end
    end
  end
end
