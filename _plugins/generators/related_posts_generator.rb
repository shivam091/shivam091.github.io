# frozen_string_literal: true

require_relative "./../helpers/posts_helper"
require_relative "./../helpers/logger_helper"

module Jekyll
  class RelatedPostsGenerator < Generator
    include PostsHelper, LoggerHelper

    safe true
    priority :low

    def generate(site)
      info("▶ RelatedPostsGenerator:", "Generating related posts")

      @config = setup_config(site)

      posts = site.posts.docs

      posts_meta = posts.each_with_object({}) do |post, meta|
        meta[post] = {
          tags: Set.new(Array(post.data["tags"])),
          categories: Set.new(Array(post.data["categories"]))
        }
      end

      posts.each do |post|
        related_scores = posts.each_with_object([]) do |other, scores|
          next if post == other

          tag_score = jaccard_similarity(posts_meta[post][:tags], posts_meta[other][:tags])
          category_score = jaccard_similarity(posts_meta[post][:categories], posts_meta[other][:categories])
          score = (tag_score * @config[:tag_weight]) + (category_score * @config[:category_weight])

          scores << { post: other, score: score } if score > 0
        end

        related = related_scores
                    .sort_by { |item| -item[:score] }
                    .map { |item| item[:post] }

        if related.size < @config[:limit] && @config[:fallback_to_recent]
          recent = recent_posts(posts, @config[:limit] * 2)
                     .reject { |p| p == post || related.include?(p) }
          related += recent.take(@config[:limit] - related.size)
        end

        post.data["related_posts"] = related.take(@config[:limit])
      end
    end

    private

    def setup_config(site)
      config = site.config.dig("related_post") || {}
      {
        limit: config.fetch("limit", 3),
        tag_weight: config.fetch("tag_score", 1.0),
        category_weight: config.fetch("category_score", 0.5),
        fallback_to_recent: config.fetch("fallback_to_recent", true)
      }
    end

    def jaccard_similarity(set1, set2)
      return 0.0 if set1.empty? && set2.empty?

      intersection = (set1 & set2).size
      union = (set1 | set2).size

      union.zero? ? 0.0 : intersection.to_f / union
    end
  end
end
