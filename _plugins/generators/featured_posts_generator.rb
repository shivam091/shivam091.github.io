# frozen_string_literal: true

module Jekyll
  class FeaturedPostsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      featured_slugs = site.data.dig("posts", "featured") || []

      # Build a slug lookup map for fast access
      slug_map = site.posts.docs.each_with_object({}) do |post, map|
        slug = post.data["slug"]
        map[slug] = post if slug
      end

      # Pick featured posts by matching slugs (preserves order)
      featured_posts = featured_slugs.filter_map { |slug| slug_map[slug] }

      site.config["featured_posts"] = featured_posts
    end
  end
end
