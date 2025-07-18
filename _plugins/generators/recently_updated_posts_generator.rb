# frozen_string_literal: true

require_relative "./../helpers/posts_helper"
require_relative "./../helpers/logger_helper"

module Jekyll
  class RecentlyUpdatedPostsGenerator < Generator
    include PostsHelper, LoggerHelper

    safe true
    priority :low

    def generate(site)
      info("▶ RecentlyUpdatedPostsGenerator:", "Generating recent posts")

      config = site.config.dig("recently_updated_posts") || {}

      max_posts = config.fetch("limit", 5)

      site.data["recently_updated_posts"] = recent_posts(site.posts.docs, max_posts)
    end
  end
end
