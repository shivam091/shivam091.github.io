# frozen_string_literal: true

require_relative "./../helpers/logger_helper"

module Jekyll
  class TrendingTagsGenerator < Generator
    include LoggerHelper

    safe true
    priority :low

    def generate(site)
      config = site.config.dig("home", "trending_tags") || {}
      max_tags = config.fetch("max_tags", 10)
      max_posts = config.fetch("max_posts", 15)

      recent_posts = fetch_recent_posts(site.posts.docs, max_posts)
      return if recent_posts.empty?

      tag_stats = analyze_tags(recent_posts, max_posts)

      site.data["trending_tags"] = build_trending_tags(tag_stats, max_tags)
    end

    private

    def fetch_recent_posts(posts, max_posts)
      posts.filter_map do |post|
        begin
          date = Time.parse(post.data["last_modified_at"].to_s)
          { post: post, date: date } if date
        rescue ArgumentError, TypeError
          warn("TrendingTagsGenerator:", "Invalid date in #{post.path}")
          nil
        end
      end.sort_by { |entry| -entry[:date].to_i }.take(max_posts)
    end

    def analyze_tags(posts, max_posts)
      stats = Hash.new { |hash, key| hash[key] = { count: 0, score: 0, categories: Set.new } }

      posts.each_with_index do |entry, index|
        weight = max_posts - index
        post = entry[:post]

        Array(post.data["tags"]).each do |tag|
          tag = sanitize_tag(tag, post)
          next unless tag

          stat = stats[tag]
          stat[:count] += 1
          stat[:score] += weight
          Array(post.data["categories"]).each { |cat| stat[:categories] << cat.to_s }
        end
      end

      stats
    end

    def sanitize_tag(tag, post)
      return tag.to_s if tag.is_a?(String) || tag.is_a?(Symbol)

      warn("TrendingTagsGenerator:", "Skipping invalid tag in #{post.path}: #{tag.inspect}")
      nil
    end

    def build_trending_tags(tag_stats, max_tags)
      tag_stats
        .sort_by { |_tag, stat| -stat[:score] }
        .take(max_tags)
        .map do |tag, stat|
          {
            "name" => tag,
            "posts_count" => stat[:count],
            "score" => stat[:score],
            "categories" => stat[:categories].to_a.sort
          }
        end
    end
  end
end
