# frozen_string_literal: true

require_relative "./../helpers/logger_helper"

module Jekyll
  class TrendingTagsGenerator < Generator
    include LoggerHelper

    safe true
    priority :normal

    def generate(site)
      info("▶ TrendingTagsGenerator:", "Generating trending tags")

      @config = setup_config(site)

      recent_posts = fetch_recent_posts(site.posts.docs)
      return if recent_posts.empty?

      tag_stats = analyze_tags(recent_posts)

      site.data["trending_tags"] = build_trending_tags(tag_stats)
    end

    private

    def setup_config(site)
      config = site.config.dig("trending_tags") || {}
      {
        limit: config.fetch("limit", 10),
        max_posts: config.fetch("max_posts", 15),
        strategy: config.fetch("decay_strategy", "linear"),
        normalize: config.fetch("normalization", true)
      }
    end

    def fetch_recent_posts(posts)
      posts.filter_map do |post|
        begin
          date = Time.parse(post.data["last_modified_at"].to_s)
          { post: post, date: date } if date
        rescue ArgumentError, TypeError
          warn("TrendingTagsGenerator:", "Invalid date in #{post.path}")
          nil
        end
      end.sort_by { |entry| -entry[:date].to_i }.take(@config[:max_posts])
    end

    def analyze_tags(posts)
      stats = Hash.new { |hash, key| hash[key] = { count: 0, score: 0, categories: Set.new } }
      weights = Array.new(@config[:max_posts]) { |i| compute_weight(i) }

      posts.each_with_index do |entry, index|
        weight = weights[index]
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

      # Normalize scores if enabled
      if @config[:normalize]
        max_score = stats.values.map { |s| s[:score] }.max.to_f
        stats.each_value { |s| s[:score] = (s[:score] * 100.0 / max_score).round(2) } if max_score > 0
      end

      stats
    end

    def compute_weight(index)
      case @config[:strategy]
      when "exponential"
        Math.exp(-(index.to_f / @config[:max_posts]))
      when "log"
        Math.log(@config[:max_posts] - index + 1)
      else # default: linear
        @config[:max_posts] - index
      end
    end

    def sanitize_tag(tag, post)
      return tag.to_s if tag.respond_to?(:to_s)

      warn("TrendingTagsGenerator:", "Skipping invalid tag in #{post.path}: #{tag.inspect}")
      nil
    end

    def build_trending_tags(tag_stats)
      tag_stats
        .sort_by { |_tag, stat| -stat[:score] }
        .take(@config[:limit])
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
