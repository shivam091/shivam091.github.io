# frozen_string_literal: true

module Jekyll
  class PopularCategoriesGenerator < Generator
    safe true
    priority :low

    MAX_CATEGORIES = 5

    def generate(site)
      # Flatten all categories into one array and count their frequencies
      category_count = site.posts.docs
                         .flat_map { |post| Array(post.data["categories"]) }
                         .compact
                         .reject(&:empty?)
                         .tally

      # Sort and pick first N categories
      popular_categories = category_count
                             .max_by(MAX_CATEGORIES) { |_, count| count }
                             .map { |name, count| {"name" => name, "posts_count" => count} }

      site.config["popular_categories"] = popular_categories
    end
  end
end
