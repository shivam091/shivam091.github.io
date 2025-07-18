# frozen_string_literal: true

module Jekyll
  class RecentlyUpdatedPostsGenerator < Generator
    safe true
    priority :low

    MAX_POSTS = 5

    def generate(site)
      all_posts = site.posts.docs

      # Ensure posts with last_modified_at only
      updated = all_posts.select { |p| p.data["last_modified_at"] }

      # Sort descending by last_modified_at (ISO 8601 strings sort lexically)
      sorted = updated.sort_by { |p| p.data["last_modified_at"] }.reverse

      # Limit to N
      site.config["recently_updated_posts"] = sorted.first(MAX_POSTS)
    end
  end
end
