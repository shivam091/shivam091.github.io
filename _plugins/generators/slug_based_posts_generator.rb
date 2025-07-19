# frozen_string_literal: true

require_relative "./../helpers/posts_helper"
require_relative "./../helpers/logger_helper"

module Jekyll
  module SlugBasedPostsGenerator
    include PostsHelper, LoggerHelper

    def generate_posts(site, key, output_key)
      slugs = site.data.dig("posts", key) || []

      @slug_map ||= build_slug_map(site.posts.docs)

      matched, missing = slugs.partition { |slug| @slug_map.key?(slug) }

      posts = matched.map { |slug| @slug_map[slug] }

      unless missing.empty?
        warn("SlugBasedPostsGenerator:", "No posts found for the following slugs: #{missing.map(&:inspect).join(', ')}")
      end

      site.data[output_key] = posts
    end
  end
end
