# frozen_string_literal: true

require "time"

module Jekyll
  class TrendingTagsGenerator < Generator
    safe true
    priority :low

    MAX_TAGS = 10
    MAX_RECENT = 15

    def generate(site)
      posts = site.posts.docs

      # Use last_modified_at if available, else fallback to post.date
      posts_with_dates = posts.map do |post|
        raw_date = post.data["last_modified_at"] || post.date.iso8601
        begin
          date = Time.parse(raw_date)
          { post: post, date: date }
        rescue ArgumentError
          nil
        end
      end.compact

      # Sort by recency (most recent first)
      sorted = posts_with_dates.sort_by { |p| -p[:date].to_i }

      # Take N recent posts
      recent = sorted.take(MAX_RECENT)

      tag_score = Hash.new(0)

      recent.each_with_index do |entry, i|
        weight = MAX_RECENT - i # newer = higher weight
        Array(entry[:post].data["tags"]).each do |tag|
          tag_score[tag] += weight
        end
      end

      # Sort tags by score and pick top N
      trending = tag_score.sort_by { |_tag, score| -score }.first(MAX_TAGS).map(&:first)

      site.config["trending_tags"] = trending
    end
  end
end
