# frozen_string_literal: true

module Jekyll
  class RelatedPostsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      config = site.config.dig("post", "related") || {}

      tag_weight = config.fetch("tag_score", 1.0)
      category_weight = config.fetch("category_score", 0.5)
      max_related = config.fetch("max_related", 3)
      fallback_to_recent = config.fetch("fallback_to_recent", true)

      posts = site.posts.docs

      posts.each do |post|
        post_tags = Set.new(Array(post.data["tags"]))
        post_categories = Set.new(Array(post.data["categories"]))

        related_scores = []

        posts.each do |other|
          next if post == other

          other_tags = Set.new(Array(other.data["tags"]))
          other_categories = Set.new(Array(other.data["categories"]))

          tag_jaccard = jaccard_similarity(post_tags, other_tags)
          category_jaccard = jaccard_similarity(post_categories, other_categories)

          score = (tag_jaccard * tag_weight) + (category_jaccard * category_weight)

          related_scores << {post: other, score: score} if score > 0
        end

        related = related_scores.sort_by { |item| -item[:score] }
                                .map { |item| item[:post] }

        if related.size < max_related && fallback_to_recent
          recent_posts = posts.reject { |p| p == post || related.include?(p) }
                              .sort_by { |p| -p.date.to_i }
          related += recent_posts.take(max_related - related.size)
        end

        post.data["related_posts"] = related.take(max_related)
      end
    end

    private

    def jaccard_similarity(set1, set2)
      return 0.0 if set1.empty? && set2.empty?
      intersection = (set1 & set2).size
      union = (set1 | set2).size
      union.zero? ? 0.0 : intersection.to_f / union
    end
  end
end
