# frozen_string_literal: true

module Jekyll
  class PinnedPostsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      pinned_slugs = site.data.dig("posts", "pinned") || []

      # Build a slug lookup map for fast access
      slug_map = site.posts.docs.each_with_object({}) do |post, map|
        slug = post.data["slug"]
        map[slug] = post if slug
      end

      # Pick pinned posts by matching slugs (preserves order)
      pinned_posts = pinned_slugs.filter_map { |slug| slug_map[slug] }

      site.config["pinned_posts"] = pinned_posts
    end
  end
end
