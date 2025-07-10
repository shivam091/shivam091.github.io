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

      title = meta["title"] || series_id

      self.data.merge!(
        "layout"        => "series",
        "title"         => title,
        "series_id"     => series_id,
        "series_meta"   => meta,
        "excerpt"       => meta["excerpt"],
        "description"   => meta["description"] || "Posts from the “#{title}” blog series.",
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
      Jekyll.logger.info "▶ Series:", "Generating series..."

      series_data = site.data["series"] || {}
      all_posts   = site.posts.docs

      # Build fast lookup for posts by slug
      post_map = all_posts.each_with_object({}) do |post, map|
        slug = post.data["slug"]
        map[slug] = post if slug
      end

      sorted_series = series_data.sort_by do |id, meta|
        [(meta["order"] || 99_999).to_i, meta["title"].to_s.downcase]
      end

      total_series = sorted_series.size

      sorted_series.each_with_index do |(series_id, meta), index|
        slugs = meta["parts"] || []
        posts = slugs.map { |slug| post_map[slug] }.compact

        if posts.empty?
          Jekyll.logger.warn "Series '#{series_id}' has no matching posts."
          next
        end

        dir  = File.join("series", series_id)
        page = SeriesPage.new(site, site.source, dir, series_id, meta, posts, index, total_series)

        # Series-to-series navigation
        page.data["previous"] = nav_info(sorted_series, index - 1) if index > 0
        page.data["next"]     = nav_info(sorted_series, index + 1) if index < total_series - 1

        site.pages << page
      end
    end

    private

    def nav_info(series_list, i)
      id, meta = series_list[i]
      {
        "url"   => "/series/#{id}",
        "title" => meta["title"] || id
      }
    end
  end
end
