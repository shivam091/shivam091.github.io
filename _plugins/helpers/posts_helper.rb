# frozen_string_literal: true

module Jekyll
  module PostsHelper
    # Builds a slug-to-post lookup map
    def build_slug_map(posts)
      posts.each_with_object({}) do |post, map|
        map[post.data["slug"]] = post
      end
    end

    # Returns sorted recent posts
    def recent_posts(posts, limit)
      posts
        .filter_map do |post|
          date = parse_date(post.data["last_modified_at"])
          date ? { post: post, date: date } : nil
        end
        .sort_by { |entry| -entry[:date].to_i }
        .take(limit)
        .map { |entry| entry[:post] }
    end

    # Parses an ISO8601 date string or returns nil
    def parse_date(raw_date)
      return unless raw_date

      Time.parse(raw_date) rescue nil
    end
  end
end
