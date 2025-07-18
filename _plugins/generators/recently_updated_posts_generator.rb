# frozen_string_literal: true

require_relative "./../helpers/posts_helper"

module Jekyll
  class RecentlyUpdatedPostsGenerator < Generator
    include PostsHelper

    safe true
    priority :low

    def generate(site)
      config = site.config.dig("home", "recently_updated_posts") || {}

      max_posts = config.fetch("limit", 5)

      site.data["recently_updated_posts"] = recent_posts(site.posts.docs, max_posts)
    end
  end
end
