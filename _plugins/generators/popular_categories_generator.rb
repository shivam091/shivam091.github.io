# frozen_string_literal: true

require_relative "./../helpers/logger_helper"

module Jekyll
  class PopularCategoriesGenerator < Generator
    include LoggerHelper

    safe true
    priority :low

    def generate(site)
      info("▶ PopularCategoriesGenerator:", "Generating popular categories")

      config = site.config.dig("popular_categories") || {}

      max_categories = config.fetch("limit", 5)

      # Flatten all categories into one array and count their frequencies
      category_count = site.posts.docs
                         .flat_map { |post| Array(post.data["categories"]) }
                         .compact
                         .reject(&:empty?)
                         .tally

      # Sort and pick first N categories
      popular_categories = category_count
                             .max_by(max_categories) { |_, count| count }
                             .map { |name, count| {"name" => name, "posts_count" => count} }

      site.data["popular_categories"] = popular_categories
    end
  end
end
