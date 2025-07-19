# frozen_string_literal: true

require_relative "slug_based_posts_generator"

module Jekyll
  class FeaturedPostsGenerator < Generator
    include SlugBasedPostsGenerator

    safe true
    priority :low

    def generate(site)
      generate_posts(site, "featured", "featured_posts")
    end
  end
end
