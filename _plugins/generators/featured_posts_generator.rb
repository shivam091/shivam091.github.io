# frozen_string_literal: true

require_relative "slug_based_posts_generator"
require_relative "./../helpers/logger_helper"

module Jekyll
  class FeaturedPostsGenerator < Generator
    include SlugBasedPostsGenerator, LoggerHelper

    safe true
    priority :low

    def generate(site)
      info("▶ FeaturedPostsGenerator:", "Generating featured posts")

      generate_posts(site, "featured", "featured_posts")
    end
  end
end
