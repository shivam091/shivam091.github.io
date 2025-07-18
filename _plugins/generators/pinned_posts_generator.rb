# frozen_string_literal: true

require_relative "slug_based_posts_generator"

module Jekyll
  class PinnedPostsGenerator < Generator
    include SlugBasedPostsGenerator

    safe true
    priority :low

    def generate(site)
      generate_posts(site, "pinned", "pinned_posts")
    end
  end
end
