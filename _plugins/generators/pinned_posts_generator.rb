# frozen_string_literal: true

require_relative "slug_based_posts_generator"
require_relative "./../helpers/logger_helper"

module Jekyll
  class PinnedPostsGenerator < Generator
    include SlugBasedPostsGenerator, LoggerHelper

    safe true
    priority :normal

    def generate(site)
      info("▶ PinnedPostsGenerator:", "Generating pinned posts")

      generate_posts(site, "pinned", "pinned_posts")
    end
  end
end
